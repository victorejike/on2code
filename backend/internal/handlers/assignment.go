package handlers

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "gorm.io/gorm"

    "github.com/on2code/backend/internal/config"
    "github.com/on2code/backend/internal/models"
)

type AssignmentHandler struct {
    cfg *config.Config
    db  *gorm.DB
}

type submitAssignmentRequest struct {
    Language  string  `json:"language" binding:"required"`
    Code      string  `json:"code"`
    GithubURL *string `json:"githubUrl,omitempty"`
}

func NewAssignmentHandler(cfg *config.Config, db *gorm.DB) *AssignmentHandler {
    return &AssignmentHandler{cfg: cfg, db: db}
}

func (h *AssignmentHandler) SubmitAssignment(c *gin.Context) {
    user, err := authorizeRequest(c, h.db, h.cfg)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "unauthorized"})
        return
    }

    assignmentID := c.Param("id")
    var assignment models.Assignment
    if err := h.db.Where("id = ?", assignmentID).First(&assignment).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "assignment not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load assignment"})
        return
    }

    var req submitAssignmentRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": err.Error()})
        return
    }

    submission := models.Submission{
        AssignmentID: assignment.ID,
        UserID:       user.ID,
        Language:     req.Language,
        Code:         req.Code,
        GithubURL:    req.GithubURL,
        Status:       models.SubmissionPending,
        Score:        0,
        Output:       "Submission received and queued for review.",
        Feedback:     "Your work is being reviewed by the On2Code grading engine.",
    }

    if err := h.db.Create(&submission).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to save submission"})
        return
    }

    respondWithObject(c, http.StatusCreated, submission)
}

func (h *AssignmentHandler) GetSubmissions(c *gin.Context) {
    user, err := authorizeRequest(c, h.db, h.cfg)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "unauthorized"})
        return
    }

    assignmentID := c.Param("id")
    var submissions []models.Submission
    if err := h.db.Where("assignment_id = ? AND user_id = ?", assignmentID, user.ID).Order("created_at desc").Find(&submissions).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load submissions"})
        return
    }

    respondWithList(c, http.StatusOK, "submissions", submissions)
}
