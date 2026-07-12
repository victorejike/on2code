package jwt

import (
    "fmt"
    "time"

    "github.com/golang-jwt/jwt/v5"

    "github.com/on2code/backend/internal/config"
    "github.com/on2code/backend/internal/models"
)

type Claims jwt.MapClaims

func GenerateAccessToken(user *models.User, cfg *config.Config) (string, error) {
    claims := jwt.MapClaims{
        "sub":   user.ID,
        "email": user.Email,
        "role":  user.Role,
        "exp":   time.Now().Add(15 * time.Minute).Unix(),
        "iat":   time.Now().Unix(),
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(cfg.JWTSecret))
}

func GenerateRefreshToken(user *models.User, cfg *config.Config) (string, error) {
    claims := jwt.MapClaims{
        "sub": user.ID,
        "exp": time.Now().Add(7 * 24 * time.Hour).Unix(),
        "iat": time.Now().Unix(),
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(cfg.JWTRefreshSecret))
}

func ParseToken(tokenString, secret string) (jwt.MapClaims, error) {
    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
        }
        return []byte(secret), nil
    })
    if err != nil {
        return nil, err
    }

    claims, ok := token.Claims.(jwt.MapClaims)
    if !ok || !token.Valid {
        return nil, fmt.Errorf("invalid token")
    }
    return claims, nil
}
