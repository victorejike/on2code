package handlers

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "gorm.io/gorm"

    "github.com/on2code/backend/internal/config"
    "github.com/on2code/backend/internal/models"
)

type UserHandler struct {
    cfg *config.Config
    db  *gorm.DB
}

type updateUserRequest struct {
    Name      string `json:"name,omitempty"`
    Bio       string `json:"bio,omitempty"`
    AvatarURL string `json:"avatarUrl,omitempty"`
}

type userProgressResponse struct {
    EnrolledCourses    []string `json:"enrolledCourses"`
    CompletedModules   int      `json:"completedModules"`
    CompletedAssignments int    `json:"completedAssignments"`
    Points             int      `json:"points"`
}

func NewUserHandler(cfg *config.Config, db *gorm.DB) *UserHandler {
    return &UserHandler{cfg: cfg, db: db}
}

func (h *UserHandler) UpdateProfile(c *gin.Context) {
    authenticatedUser, err := authorizeRequest(c, h.db, h.cfg)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "unauthorized"})
        return
    }

    userID := c.Param("id")
    if userID != authenticatedUser.ID {
        c.JSON(http.StatusForbidden, gin.H{"success": false, "message": "forbidden"})
        return
    }

    var req updateUserRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": err.Error()})
        return
    }

    updateData := make(map[string]interface{})
    if req.Name != "" {
        updateData["name"] = req.Name
    }
    if req.Bio != "" {
        updateData["bio"] = req.Bio
    }
    if req.AvatarURL != "" {
        updateData["avatar_url"] = req.AvatarURL
    }

    if len(updateData) == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "no fields to update"})
        return
    }

    if err := h.db.Model(&models.User{}).Where("id = ?", authenticatedUser.ID).Updates(updateData).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to update profile"})
        return
    }

    var user models.User
    if err := h.db.Where("id = ?", authenticatedUser.ID).First(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load user"})
        return
    }

    respondWithObject(c, http.StatusOK, gin.H{"user": createUserPayload(&user, h.db)})
}

func (h *UserHandler) GetProgress(c *gin.Context) {
    authenticatedUser, err := authorizeRequest(c, h.db, h.cfg)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "unauthorized"})
        return
    }

    userID := c.Param("id")
    if userID != authenticatedUser.ID {
        c.JSON(http.StatusForbidden, gin.H{"success": false, "message": "forbidden"})
        return
    }

    var enrollments []models.Enrollment
    if err := h.db.Where("user_id = ?", authenticatedUser.ID).Find(&enrollments).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load enrollments"})
        return
    }

    enrolledCourses := make([]string, 0, len(enrollments))
    for _, enrollment := range enrollments {
        enrolledCourses = append(enrolledCourses, enrollment.CourseID)
    }

    var completedModules int64
    if err := h.db.Model(&models.LessonProgress{}).Where("user_id = ? AND completed = ?", authenticatedUser.ID, true).Count(&completedModules).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load progress"})
        return
    }

    var completedAssignments int64
    if err := h.db.Model(&models.Submission{}).Where("user_id = ?", authenticatedUser.ID).Count(&completedAssignments).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load submissions"})
        return
    }

    var xp models.UserXP
    if err := h.db.Where("user_id = ?", authenticatedUser.ID).First(&xp).Error; err != nil && err != gorm.ErrRecordNotFound {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load xp"})
        return
    }

    points := int(xp.TotalXP)
    if xp.ID == "" {
        points = int(completedModules)*10 + int(completedAssignments)*15
    }

    respondWithObject(c, http.StatusOK, userProgressResponse{
        EnrolledCourses:      enrolledCourses,
        CompletedModules:     int(completedModules),
        CompletedAssignments: int(completedAssignments),
        Points:               points,
    })
}

func (h *UserHandler) GetSubmissions(c *gin.Context) {
    authenticatedUser, err := authorizeRequest(c, h.db, h.cfg)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "unauthorized"})
        return
    }

    userID := c.Param("id")
    if userID != authenticatedUser.ID {
        c.JSON(http.StatusForbidden, gin.H{"success": false, "message": "forbidden"})
        return
    }

    var submissions []models.Submission
    if err := h.db.Where("user_id = ?", authenticatedUser.ID).Order("created_at desc").Find(&submissions).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load submissions"})
        return
    }

    respondWithList(c, http.StatusOK, "submissions", submissions)
}
