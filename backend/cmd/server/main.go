package main

import (
    "log"

    "github.com/on2code/backend/internal/config"
    "github.com/on2code/backend/internal/database"
    "github.com/on2code/backend/internal/router"
)

func main() {
    cfg := config.Load()

    db, redisClient, err := database.Connect(cfg)
    if err != nil {
        log.Fatalf("failed to initialize database: %v", err)
    }
    if redisClient != nil {
        log.Println("✅ Redis connected")
    }

    r := router.NewRouter(cfg, db)
    log.Printf("🚀 On2Code backend running on http://localhost:%s", cfg.Port)
    if err := r.Run(":" + cfg.Port); err != nil {
        log.Fatalf("server error: %v", err)
    }
}
