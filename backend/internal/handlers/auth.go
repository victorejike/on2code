package handlers

import (
    "net/http"
    "strings"

    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
    "gorm.io/gorm"

    "github.com/on2code/backend/internal/config"
    "github.com/on2code/backend/internal/models"
    "github.com/on2code/backend/pkg/jwt"
)

type AuthHandler struct {
    cfg *config.Config
    db  *gorm.DB
}

type registerRequest struct {
    Name     string `json:"name" binding:"required"`
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required,min=8"`
}

type loginRequest struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required"`
}

type refreshRequest struct {
    RefreshToken string `json:"refreshToken" binding:"required"`
}

type authResponse struct {
    AccessToken  string      `json:"accessToken"`
    Token        string      `json:"token"`
    RefreshToken string      `json:"refreshToken"`
    User         userPayload `json:"user"`
}

type authResponseEnvelope struct {
    Success bool        `json:"success"`
    authResponse `json:",inline"`
    Data        authResponse `json:"data"`
}

type userPayload struct {
    ID                    string `json:"id"`
    Name                  string `json:"name"`
    Email                 string `json:"email"`
    Role                  string `json:"role"`
    AvatarURL             string `json:"avatarUrl,omitempty"`
    Bio                   string `json:"bio,omitempty"`
    Github                string `json:"githubUsername,omitempty"`
    IsVerified            bool   `json:"isVerified"`
    HasActiveSubscription bool   `json:"hasActiveSubscription"`
    CreatedAt             string `json:"createdAt"`
    UpdatedAt             string `json:"updatedAt"`
}

func NewAuthHandler(cfg *config.Config, db *gorm.DB) *AuthHandler {
    return &AuthHandler{cfg: cfg, db: db}
}

func (h *AuthHandler) Register(c *gin.Context) {
    var req registerRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": err.Error()})
        return
    }

    req.Email = strings.TrimSpace(strings.ToLower(req.Email))
    if req.Email == "" || req.Name == "" {
        c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "name and email are required"})
        return
    }

    var existing models.User
    if err := h.db.Where("email = ?", req.Email).First(&existing).Error; err == nil {
        c.JSON(http.StatusConflict, gin.H{"success": false, "message": "email already registered"})
        return
    }

    hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to hash password"})
        return
    }

    user := models.User{
        Name:         req.Name,
        Email:        req.Email,
        PasswordHash: string(hashed),
        Role:         models.RoleStudent,
        IsVerified:   false,
    }
    if err := h.db.Create(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to create user"})
        return
    }

    token, err := jwt.GenerateAccessToken(&user, h.cfg)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to generate token"})
        return
    }
    refreshToken, err := jwt.GenerateRefreshToken(&user, h.cfg)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to generate refresh token"})
        return
    }

    payload := authResponse{
        AccessToken:  token,
        Token:        token,
        RefreshToken: refreshToken,
        User:         createUserPayload(&user, h.db),
    }
    c.JSON(http.StatusCreated, gin.H{
        "success":      true,
        "accessToken":  payload.AccessToken,
        "token":        payload.Token,
        "refreshToken": payload.RefreshToken,
        "user":         payload.User,
        "data":         payload,
    })
}

func (h *AuthHandler) Login(c *gin.Context) {
    var req loginRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": err.Error()})
        return
    }

    var user models.User
    if err := h.db.Where("email = ?", strings.TrimSpace(strings.ToLower(req.Email))).First(&user).Error; err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "invalid credentials"})
        return
    }

    if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "invalid credentials"})
        return
    }

    accessToken, err := jwt.GenerateAccessToken(&user, h.cfg)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to generate token"})
        return
    }
    refreshToken, err := jwt.GenerateRefreshToken(&user, h.cfg)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to generate refresh token"})
        return
    }

    payload := authResponse{
        AccessToken:  accessToken,
        Token:        accessToken,
        RefreshToken: refreshToken,
        User:         createUserPayload(&user, h.db),
    }
    c.JSON(http.StatusOK, gin.H{
        "success":      true,
        "accessToken":  payload.AccessToken,
        "token":        payload.Token,
        "refreshToken": payload.RefreshToken,
        "user":         payload.User,
        "data":         payload,
    })
}

func (h *AuthHandler) Me(c *gin.Context) {
    user, err := h.authorize(c)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": err.Error()})
        return
    }

    payload := createUserPayload(user, h.db)
    c.JSON(http.StatusOK, gin.H{
        "success": true,
        "user":    payload,
        "data":    payload,
    })
}

func (h *AuthHandler) Refresh(c *gin.Context) {
    var req refreshRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": err.Error()})
        return
    }

    claims, err := jwt.ParseToken(req.RefreshToken, h.cfg.JWTRefreshSecret)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "invalid refresh token"})
        return
    }

    userID, ok := claims["sub"].(string)
    if !ok || userID == "" {
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "invalid refresh token payload"})
        return
    }

    var user models.User
    if err := h.db.Where("id = ?", userID).First(&user).Error; err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "user not found"})
        return
    }

    accessToken, err := jwt.GenerateAccessToken(&user, h.cfg)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "unable to issue new access token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "success": true,
        "token":   accessToken,
        "data":    gin.H{"token": accessToken},
    })
}

func (h *AuthHandler) Logout(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"success": true, "message": "logged out"})
}

func (h *AuthHandler) authorize(c *gin.Context) (*models.User, error) {
    authHeader := c.GetHeader("Authorization")
    if authHeader == "" {
        return nil, http.ErrNoCookie
    }

    parts := strings.SplitN(authHeader, " ", 2)
    if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
        return nil, http.ErrNoCookie
    }

    claims, err := jwt.ParseToken(parts[1], h.cfg.JWTSecret)
    if err != nil {
        return nil, err
    }

    userID, ok := claims["sub"].(string)
    if !ok || userID == "" {
        return nil, http.ErrNoCookie
    }

    var user models.User
    if err := h.db.Where("id = ?", userID).First(&user).Error; err != nil {
        return nil, err
    }

    return &user, nil
}

func createUserPayload(u *models.User, db *gorm.DB) userPayload {
    active, _ := userHasActiveSubscription(db, u.ID)
    return userPayload{
        ID:                    u.ID,
        Name:                  u.Name,
        Email:                 u.Email,
        Role:                  string(u.Role),
        AvatarURL:             u.AvatarURL,
        Bio:                   u.Bio,
        Github:                u.GithubUsername,
        IsVerified:            u.IsVerified,
        HasActiveSubscription: active,
        CreatedAt:             u.CreatedAt.Format("2006-01-02T15:04:05Z07:00"),
        UpdatedAt:             u.UpdatedAt.Format("2006-01-02T15:04:05Z07:00"),
    }
}
