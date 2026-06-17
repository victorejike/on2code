package main

import (
    "encoding/json"
    "log"
    "net/http"
    "os"
    "time"

    "github.com/golang-jwt/jwt/v5"
    "github.com/gorilla/mux"
    "github.com/rs/cors"
)

type User struct {
    ID    string `json:"id"`
    Email string `json:"email"`
    Name  string `json:"name,omitempty"`
}

type Course struct {
    ID          string `json:"id"`
    Slug        string `json:"slug"`
    Title       string `json:"title"`
    Description string `json:"description"`
}

type LoginRequest struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

type LoginResponse struct {
    AccessToken string `json:"accessToken"`
}

var demoUser = User{
    ID:    "user-1",
    Email: "student@on2code.com",
    Name:  "Demo Student",
}

var demoCourses = []Course{
    {ID: "course-1", Slug: "cs101", Title: "CS101: Intro to Code", Description: "A hands-on intro to programming and system design."},
    {ID: "course-2", Slug: "web101", Title: "Web Development Basics", Description: "Learn HTML, CSS, JavaScript, and build a full-stack app."},
}

func main() {
    router := mux.NewRouter()
    api := router.PathPrefix("/api/v1").Subrouter()

    api.HandleFunc("/auth/login", loginHandler).Methods(http.MethodPost)
    api.HandleFunc("/courses", coursesHandler).Methods(http.MethodGet)
    api.HandleFunc("/courses/{id}", courseHandler).Methods(http.MethodGet)
    api.HandleFunc("/users/{id}", userHandler).Methods(http.MethodGet)
    api.HandleFunc("/", rootHandler).Methods(http.MethodGet)

    handler := cors.New(cors.Options{
        AllowedOrigins:   []string{"*"},
        AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodOptions},
        AllowedHeaders:   []string{"*"},
        AllowCredentials: true,
    }).Handler(router)

    port := os.Getenv("PORT")
    if port == "" {
        port = "4000"
    }

    srv := &http.Server{
        Handler:      handler,
        Addr:         ":" + port,
        WriteTimeout: 15 * time.Second,
        ReadTimeout:  15 * time.Second,
    }

    log.Printf("Backend running on http://localhost:%s", port)
    log.Fatal(srv.ListenAndServe())
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
    writeJSON(w, http.StatusOK, map[string]string{"message": "Welcome to On2Code backend"})
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
    var req LoginRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
        return
    }

    if req.Email != demoUser.Email || req.Password != "password" {
        writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "invalid credentials"})
        return
    }

    token, err := generateJWT(demoUser)
    if err != nil {
        writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "failed to generate token"})
        return
    }

    writeJSON(w, http.StatusOK, LoginResponse{AccessToken: token})
}

func coursesHandler(w http.ResponseWriter, r *http.Request) {
    writeJSON(w, http.StatusOK, map[string]any{"courses": demoCourses})
}

func courseHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id := vars["id"]
    for _, course := range demoCourses {
        if course.ID == id || course.Slug == id {
            writeJSON(w, http.StatusOK, course)
            return
        }
    }
    writeJSON(w, http.StatusNotFound, map[string]string{"error": "course not found"})
}

func userHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id := vars["id"]
    if id == demoUser.ID {
        writeJSON(w, http.StatusOK, demoUser)
        return
    }
    writeJSON(w, http.StatusNotFound, map[string]string{"error": "user not found"})
}

func generateJWT(user User) (string, error) {
    secret := os.Getenv("JWT_SECRET")
    if secret == "" {
        secret = "supersecret"
    }

    claims := jwt.MapClaims{
        "sub":   user.ID,
        "email": user.Email,
        "exp":   time.Now().Add(24 * time.Hour).Unix(),
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(secret))
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    _ = json.NewEncoder(w).Encode(payload)
}
