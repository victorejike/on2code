package handlers

import (
    "errors"
    "net/http"
    "strings"

    "github.com/gin-gonic/gin"
    "gorm.io/gorm"

    "github.com/on2code/backend/internal/config"
    "github.com/on2code/backend/internal/models"
    "github.com/on2code/backend/pkg/jwt"
)

func authorizeRequest(c *gin.Context, db *gorm.DB, cfg *config.Config) (*models.User, error) {
    authHeader := c.GetHeader("Authorization")
    if authHeader == "" {
        return nil, http.ErrNoCookie
    }

    parts := strings.SplitN(authHeader, " ", 2)
    if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
        return nil, http.ErrNoCookie
    }

    claims, err := jwt.ParseToken(parts[1], cfg.JWTSecret)
    if err != nil {
        return nil, err
    }

    userID, ok := claims["sub"].(string)
    if !ok || userID == "" {
        return nil, http.ErrNoCookie
    }

    var user models.User
    if err := db.Where("id = ?", userID).First(&user).Error; err != nil {
        return nil, err
    }

    return &user, nil
}

func authorizeActiveSubscriberRequest(c *gin.Context, db *gorm.DB, cfg *config.Config) (*models.User, error) {
    user, err := authorizeRequest(c, db, cfg)
    if err != nil {
        return nil, err
    }

    active, err := userHasActiveSubscription(db, user.ID)
    if err != nil {
        return nil, err
    }
    if !active {
        return nil, errors.New("active subscription required")
    }

    return user, nil
}

func userHasActiveSubscription(db *gorm.DB, userID string) (bool, error) {
    var count int64
    if err := db.Model(&models.Subscription{}).
        Where("user_id = ? AND status = ?", userID, models.SubActive).
        Count(&count).Error; err != nil {
        return false, err
    }

    return count > 0, nil
}
