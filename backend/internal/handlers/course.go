package handlers

import (
    "errors"
    "net/http"
    "os"
    "path/filepath"
    "strings"

    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
    "gorm.io/gorm/clause"

    "github.com/on2code/backend/internal/config"
    "github.com/on2code/backend/internal/models"
)

type CourseHandler struct {
    cfg *config.Config
    db  *gorm.DB
}

func NewCourseHandler(cfg *config.Config, db *gorm.DB) *CourseHandler {
    return &CourseHandler{cfg: cfg, db: db}
}

func (h *CourseHandler) ListCourses(c *gin.Context) {
    var courses []models.Course
    if err := h.db.Preload("Instructor").Preload("Modules.Lessons").Find(&courses).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load courses"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "success": true,
        "data":    courses,
        "courses": courses,
    })
}

func (h *CourseHandler) SearchCourses(c *gin.Context) {
    query := c.Query("q")
    var courses []models.Course
    dbQuery := h.db.Preload("Instructor").Preload("Modules.Lessons").Where("status = ?", models.StatusPublished)
    if query != "" {
        dbQuery = dbQuery.Where("title ILIKE ? OR subtitle ILIKE ? OR description ILIKE ?", "%"+query+"%", "%"+query+"%", "%"+query+"%")
    }
    if err := dbQuery.Find(&courses).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to search courses"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"success": true, "data": courses, "courses": courses})
}

func (h *CourseHandler) ListEnrolled(c *gin.Context) {
    user, err := authorizeRequest(c, h.db, h.cfg)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "unauthorized"})
        return
    }

    var enrollments []models.Enrollment
    if err := h.db.Where("user_id = ?", user.ID).Preload("Course.Instructor").Find(&enrollments).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load enrolled courses"})
        return
    }

    courses := make([]models.Course, 0, len(enrollments))
    for _, enrollment := range enrollments {
        courses = append(courses, enrollment.Course)
    }

    c.JSON(http.StatusOK, gin.H{"success": true, "data": courses})
}

func (h *CourseHandler) EnrollCourse(c *gin.Context) {
    user, err := authorizeRequest(c, h.db, h.cfg)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "unauthorized"})
        return
    }

    courseId := c.Param("courseId")
    var course models.Course
    if err := h.db.Where("id = ?", courseId).First(&course).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "course not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load course"})
        return
    }

    enrollment := models.Enrollment{UserID: user.ID, CourseID: course.ID}
    if err := h.db.FirstOrCreate(&enrollment, models.Enrollment{UserID: user.ID, CourseID: course.ID}).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to enroll user"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"success": true, "data": enrollment})
}

func (h *CourseHandler) GetCurriculum(c *gin.Context) {
    _, err := authorizeActiveSubscriberRequest(c, h.db, h.cfg)
    if err != nil {
        if strings.Contains(err.Error(), "active subscription required") {
            c.JSON(http.StatusForbidden, gin.H{"success": false, "message": "active subscription required"})
            return
        }
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "unauthorized"})
        return
    }

    slug := c.Param("slug")
    var course models.Course
    if err := h.db.Where("slug = ?", slug).First(&course).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "course not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load course"})
        return
    }

    var modules []models.Module
    if err := h.db.Preload("Lessons").Where("course_id = ?", course.ID).Order("position asc").Find(&modules).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load curriculum"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"success": true, "data": modules})
}

func (h *CourseHandler) GetCurriculumModule(c *gin.Context) {
    _, err := authorizeActiveSubscriberRequest(c, h.db, h.cfg)
    if err != nil {
        if strings.Contains(err.Error(), "active subscription required") {
            c.JSON(http.StatusForbidden, gin.H{"success": false, "message": "active subscription required"})
            return
        }
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "unauthorized"})
        return
    }

    moduleName := filepath.Clean(c.Param("module"))
    moduleName = strings.TrimSuffix(moduleName, ".md")
    if moduleName == "" || strings.Contains(moduleName, "..") || !strings.HasPrefix(moduleName, "module-") {
        c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "invalid module identifier"})
        return
    }

    curriculumRoot, err := findCurriculumRoot()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to locate curriculum root"})
        return
    }

    modulePath := filepath.Join(curriculumRoot, moduleName+".md")
    modulePath = filepath.Clean(modulePath)
    if !strings.HasPrefix(modulePath, curriculumRoot) {
        c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "invalid module path"})
        return
    }

    content, err := os.ReadFile(modulePath)
    if err != nil {
        if os.IsNotExist(err) {
            c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "module content not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to read module content"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"success": true, "data": gin.H{"module": moduleName, "content": string(content)}})
}

func findCurriculumRoot() (string, error) {
    cwd, err := os.Getwd()
    if err != nil {
        return "", err
    }
    for {
        candidate := filepath.Join(cwd, "curriculum")
        info, err := os.Stat(candidate)
        if err == nil && info.IsDir() {
            return filepath.Clean(candidate), nil
        }
        parent := filepath.Dir(cwd)
        if parent == cwd {
            break
        }
        cwd = parent
    }
    return "", errors.New("curriculum root not found")
}

func (h *CourseHandler) GetCourse(c *gin.Context) {
    slug := c.Param("slug")
    var course models.Course
    if err := h.db.Preload("Instructor").Preload("Modules.Lessons").Where("slug = ?", slug).First(&course).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "course not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load course"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"success": true, "data": course})
}

func (h *CourseHandler) ListModules(c *gin.Context) {
    slug := c.Param("slug")
    var course models.Course
    if err := h.db.Where("slug = ?", slug).First(&course).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "course not found"})
        return
    }

    var modules []models.Module
    if err := h.db.Preload("Lessons").Where("course_id = ?", course.ID).Order("position asc").Find(&modules).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load modules"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"success": true, "data": modules})
}

func (h *CourseHandler) GetModule(c *gin.Context) {
    moduleId := c.Param("moduleId")
    var module models.Module
    if err := h.db.Preload("Lessons").Where("id = ?", moduleId).First(&module).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "module not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load module"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"success": true, "data": module})
}

func (h *CourseHandler) GetLesson(c *gin.Context) {
    lessonId := c.Param("lessonId")
    var lesson models.Lesson
    if err := h.db.Where("id = ?", lessonId).First(&lesson).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "lesson not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load lesson"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"success": true, "data": lesson})
}

func (h *CourseHandler) CompleteLesson(c *gin.Context) {
    user, err := authorizeRequest(c, h.db, h.cfg)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "unauthorized"})
        return
    }

    lessonId := c.Param("lessonId")
    var lesson models.Lesson
    if err := h.db.Where("id = ?", lessonId).First(&lesson).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "lesson not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to load lesson"})
        return
    }

    progress := models.LessonProgress{
        UserID:    user.ID,
        LessonID:  lesson.ID,
        Completed: true,
    }

    if err := h.db.Clauses(clause.OnConflict{
        Columns:   []clause.Column{{Name: "user_id"}, {Name: "lesson_id"}},
        DoUpdates: clause.AssignmentColumns([]string{"completed", "updated_at"}),
    }).Create(&progress).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to mark lesson complete"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"success": true, "data": progress})
}
