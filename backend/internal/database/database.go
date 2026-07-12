package database

import (
    "context"
    "fmt"
    "log"
    "time"

    "github.com/redis/go-redis/v9"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "gorm.io/gorm/logger"
    "golang.org/x/crypto/bcrypt"

    "github.com/on2code/backend/internal/config"
    "github.com/on2code/backend/internal/models"
)

func Connect(cfg *config.Config) (*gorm.DB, *redis.Client, error) {
    db, err := gorm.Open(postgres.Open(cfg.DatabaseURL), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    })
    if err != nil {
        return nil, nil, fmt.Errorf("unable to connect to PostgreSQL: %w", err)
    }

    if err := db.AutoMigrate(
        &models.User{},
        &models.Course{},
        &models.Module{},
        &models.Lesson{},
        &models.Assignment{},
        &models.Enrollment{},
        &models.Submission{},
        &models.Certificate{},
        &models.Quiz{},
        &models.QuizQuestion{},
        &models.QuestionOption{},
        &models.QuizAttempt{},
        &models.QuizAnswer{},
        &models.LessonProgress{},
        &models.Notification{},
        &models.UserXP{},
    ); err != nil {
        return nil, nil, fmt.Errorf("failed to migrate database schema: %w", err)
    }

    if err := seedDemoData(db); err != nil {
        log.Printf("⚠️  demo seed warning: %v", err)
    }

    redisClient, err := connectRedis(cfg)
    if err != nil {
        log.Printf("⚠️  Redis connection warning: %v", err)
    }

    return db, redisClient, nil
}

func connectRedis(cfg *config.Config) (*redis.Client, error) {
    if cfg.RedisURL == "" {
        return nil, nil
    }

    opt, err := redis.ParseURL(cfg.RedisURL)
    if err != nil {
        return nil, fmt.Errorf("invalid redis url: %w", err)
    }

    client := redis.NewClient(opt)
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    if err := client.Ping(ctx).Err(); err != nil {
        return nil, err
    }

    return client, nil
}

func seedDemoData(db *gorm.DB) error {
    var count int64
    if err := db.Model(&models.Course{}).Count(&count).Error; err != nil {
        return err
    }
    if count > 0 {
        return nil
    }

    passwordHash, err := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.DefaultCost)
    if err != nil {
        return err
    }

    instructor := models.User{
        Name:         "Demo Instructor",
        Email:        "instructor@on2code.com",
        PasswordHash: string(passwordHash),
        Role:         models.RoleInstructor,
        IsVerified:   true,
    }
    if err := db.Where("email = ?", instructor.Email).FirstOrCreate(&instructor).Error; err != nil {
        return err
    }

    student := models.User{
        Name:         "Demo Student",
        Email:        "student@on2code.com",
        PasswordHash: string(passwordHash),
        Role:         models.RoleStudent,
        IsVerified:   true,
    }
    if err := db.Where("email = ?", student.Email).FirstOrCreate(&student).Error; err != nil {
        return err
    }

    course := models.Course{
        Slug:         "go-backend-engineering",
        Title:        "Go Backend Engineering",
        Subtitle:     "Build production-ready backends with Go, Gin, GORM and Redis",
        Description:  "A complete Go backend course with modern architecture, auth, caching, and deployment.",
        Level:        models.LevelIntermediate,
        Status:       models.StatusPublished,
        Price:        0,
        IsFree:       true,
        InstructorID: instructor.ID,
    }
    if err := db.Create(&course).Error; err != nil {
        return err
    }

    modules := []models.Module{
        {CourseID: course.ID, Title: "Go Fundamentals", Description: "Go syntax, types, and functions.", Position: 0, IsPublished: true},
        {CourseID: course.ID, Title: "Web APIs with Gin", Description: "Build HTTP services using Gin.", Position: 1, IsPublished: true},
        {CourseID: course.ID, Title: "Databases with GORM", Description: "Persist data with PostgreSQL and GORM.", Position: 2, IsPublished: true},
    }

    for i := range modules {
        if err := db.Create(&modules[i]).Error; err != nil {
            return err
        }
        lesson := models.Lesson{
            ModuleID:    modules[i].ID,
            Title:       "Intro Lesson",
            Summary:     "A practical introduction to the module.",
            VideoURL:    "https://www.example.com/lesson.mp4",
            Position:    0,
            IsPublished: true,
        }
        if err := db.Create(&lesson).Error; err != nil {
            return err
        }
        assignment := models.Assignment{
            LessonID:     &lesson.ID,
            Title:        "Starter Assignment",
            Description:  "Submit your first Go backend exercise.",
            Difficulty:   models.DiffEasy,
            MaxScore:     100,
            PassingScore: 70,
            AllowGitHub:  true,
        }
        if err := db.Create(&assignment).Error; err != nil {
            return err
        }
    }

    return nil
}
