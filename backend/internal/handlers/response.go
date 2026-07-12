package handlers

import (
    "encoding/json"
    "net/http"

    "github.com/gin-gonic/gin"
)

func respondWithObject(c *gin.Context, status int, payload interface{}) {
    bytes, err := json.Marshal(payload)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "failed to marshal response"})
        return
    }

    var payloadMap map[string]interface{}
    if err := json.Unmarshal(bytes, &payloadMap); err != nil {
        c.JSON(status, gin.H{"success": true, "data": payload})
        return
    }

    payloadMap["success"] = true
    payloadMap["data"] = payload
    c.JSON(status, payloadMap)
}

func respondWithList(c *gin.Context, status int, key string, payload interface{}) {
    c.JSON(status, gin.H{"success": true, "data": payload, key: payload})
}
