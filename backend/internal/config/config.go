package config

import (
	"os"

	"github.com/joho/godotenv"
)

// Config holds all application configuration loaded from environment variables.
type Config struct {
	Port               string
	DatabaseURL        string
	RedisURL           string
	JWTSecret          string
	JWTRefreshSecret   string
	AllowedOrigin      string
	SMTPHost           string
	SMTPPort           string
	SMTPUser           string
	SMTPPass           string
	SMTPFrom           string
	MinIOEndpoint      string
	MinIOAccessKey     string
	MinIOSecretKey     string
	MinIOBucket        string
	GitHubClientID     string
	GitHubClientSecret string
	GoogleClientID     string
	GoogleClientSecret string
	FrontendURL        string
	AppEnv             string
}

// C is the global singleton config instance.
var C *Config

// Load reads environment variables (and an optional .env file) and
// returns a populated Config. It also sets the package-level C pointer.
func Load() *Config {
	_ = godotenv.Load()
	C = &Config{
		Port:               getEnv("PORT", "4000"),
		DatabaseURL:        getEnv("DATABASE_URL", "host=localhost port=5432 user=postgres password=postgres dbname=on2code sslmode=disable"),
		RedisURL:           getEnv("REDIS_URL", "redis://localhost:6379"),
		JWTSecret:          getEnv("JWT_SECRET", "change-me-in-production-32chars!!"),
		JWTRefreshSecret:   getEnv("JWT_REFRESH_SECRET", "refresh-secret-change-me-32chars"),
		AllowedOrigin:      getEnv("ALLOWED_ORIGIN", "http://localhost:3000"),
		SMTPHost:           getEnv("SMTP_HOST", ""),
		SMTPPort:           getEnv("SMTP_PORT", "587"),
		SMTPUser:           getEnv("SMTP_USER", ""),
		SMTPPass:           getEnv("SMTP_PASS", ""),
		SMTPFrom:           getEnv("SMTP_FROM", "noreply@on2code.com"),
		MinIOEndpoint:      getEnv("MINIO_ENDPOINT", "localhost:9000"),
		MinIOAccessKey:     getEnv("MINIO_ACCESS_KEY", "minioadmin"),
		MinIOSecretKey:     getEnv("MINIO_SECRET_KEY", "minioadmin"),
		MinIOBucket:        getEnv("MINIO_BUCKET", "on2code"),
		GitHubClientID:     getEnv("GITHUB_CLIENT_ID", ""),
		GitHubClientSecret: getEnv("GITHUB_CLIENT_SECRET", ""),
		GoogleClientID:     getEnv("GOOGLE_CLIENT_ID", ""),
		GoogleClientSecret: getEnv("GOOGLE_CLIENT_SECRET", ""),
		FrontendURL:        getEnv("FRONTEND_URL", "http://localhost:3000"),
		AppEnv:             getEnv("APP_ENV", "development"),
	}
	return C
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
