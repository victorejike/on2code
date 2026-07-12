package router

import (
    "time"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"

    "github.com/on2code/backend/internal/config"
    "github.com/on2code/backend/internal/handlers"
)

func NewRouter(cfg *config.Config, db *gorm.DB) *gin.Engine {
    r := gin.New()
    r.Use(gin.Recovery())
    r.Use(gin.Logger())
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{cfg.FrontendURL},
        AllowMethods:     []string{"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Authorization", "Content-Type"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }))

    authHandler := handlers.NewAuthHandler(cfg, db)
    courseHandler := handlers.NewCourseHandler(cfg, db)
    userHandler := handlers.NewUserHandler(cfg, db)
    assignmentHandler := handlers.NewAssignmentHandler(cfg, db)

    api := r.Group("/api/v1")
    api.GET("/health", func(c *gin.Context) {
        c.JSON(200, gin.H{"status": "ok"})
    })

    auth := api.Group("/auth")
    auth.POST("/register", authHandler.Register)
    auth.POST("/login", authHandler.Login)
    auth.POST("/refresh", authHandler.Refresh)
    auth.POST("/logout", authHandler.Logout)
    auth.GET("/me", authHandler.Me)

    courses := api.Group("/courses")
    courses.GET("", courseHandler.ListCourses)
    courses.GET("/search", courseHandler.SearchCourses)
    courses.GET("/enrolled", courseHandler.ListEnrolled)
    courses.POST("/:courseId/enroll", courseHandler.EnrollCourse)
    courses.GET("/:slug/curriculum", courseHandler.GetCurriculum)
    courses.GET("/:slug", courseHandler.GetCourse)
    courses.GET("/:slug/modules", courseHandler.ListModules)
    courses.GET("/:slug/modules/:moduleId", courseHandler.GetModule)
    courses.GET("/:slug/modules/:moduleId/lessons/:lessonId", courseHandler.GetLesson)

    api.GET("/curriculum/modules/:module", courseHandler.GetCurriculumModule)

    api.GET("/lessons/:lessonId", courseHandler.GetLesson)
    api.POST("/lessons/:lessonId/complete", courseHandler.CompleteLesson)

    users := api.Group("/users")
    users.PATCH("/:id", userHandler.UpdateProfile)
    users.GET("/:id/progress", userHandler.GetProgress)
    users.GET("/:id/submissions", userHandler.GetSubmissions)

    assignments := api.Group("/assignments")
    assignments.POST("/:id/submit", assignmentHandler.SubmitAssignment)
    assignments.GET("/:id/submissions", assignmentHandler.GetSubmissions)

    return r
}
