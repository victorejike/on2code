package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID             string   `json:"id"`
	Email          string   `json:"email"`
	Name           string   `json:"name,omitempty"`
	PasswordHash   string   `json:"-"`
	EnrolledCourse []string `json:"enrolledCourses,omitempty"`
}

type Lesson struct {
	ID           string   `json:"id"`
	Title        string   `json:"title"`
	Summary      string   `json:"summary"`
	VideoURL     string   `json:"videoUrl,omitempty"`
	Resources    []string `json:"resources,omitempty"`
	AssignmentID string   `json:"assignmentId,omitempty"`
}

type Module struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Position    int      `json:"position"`
	Lessons     []Lesson `json:"lessons,omitempty"`
}

type Course struct {
	ID          string   `json:"id"`
	Slug        string   `json:"slug"`
	Title       string   `json:"title"`
	Subtitle    string   `json:"subtitle"`
	Description string   `json:"description"`
	Level       string   `json:"level"`
	Status      string   `json:"status"`
	Modules     []Module `json:"modules,omitempty"`
}

type Assignment struct {
	ID          string `json:"id"`
	CourseID    string `json:"courseId"`
	ModuleID    string `json:"moduleId"`
	LessonID    string `json:"lessonId"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Difficulty  string `json:"difficulty"`
	MaxScore    int    `json:"maxScore"`
}

type Submission struct {
	ID           string    `json:"id"`
	AssignmentID string    `json:"assignmentId"`
	UserID       string    `json:"userId"`
	Language     string    `json:"language"`
	Code         string    `json:"code"`
	Status       string    `json:"status"`
	Score        int       `json:"score"`
	Output       string    `json:"output"`
	CreatedAt    time.Time `json:"createdAt"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RegisterRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthResponse struct {
	AccessToken string `json:"accessToken"`
	User        User   `json:"user"`
}

var demoUsers []User
var demoCourses []Course
var demoAssignments []Assignment
var demoSubmissions []Submission

func init() {
	demoUsers = []User{
		newUser("Demo Student", "student@on2code.com", "password"),
	}

	demoCourses = []Course{
		{
			ID:          "cs50x-2021",
			Slug:        "cs50x-2021",
			Title:       "CS50x 2021",
			Subtitle:    "Foundations of computer science and full-stack development",
			Description: "A structured CS50-style curriculum covering programming, data structures, web development, and ethics.",
			Level:       "BEGINNER",
			Status:      "PUBLISHED",
			Modules: []Module{
				{
					ID:          "module-0",
					Title:       "Week 0: Scratch",
					Description: "Visual programming fundamentals with Scratch.",
					Position:    0,
					Lessons: []Lesson{
						{
							ID:           "lesson-0-1",
							Title:        "Scratch fundamentals",
							Summary:      "Create sprites, scripts, and interactive stories.",
							VideoURL:     "https://www.example.com/scratch-intro.mp4",
							Resources:    []string{"Scratch tutorial", "Design principles"},
							AssignmentID: "assignment-0",
						},
					},
				},
				{
					ID:          "module-1",
					Title:       "Week 1: C",
					Description: "Introduction to C, data types, and basic algorithms.",
					Position:    1,
					Lessons: []Lesson{
						{
							ID:           "lesson-1-1",
							Title:        "C syntax and operators",
							Summary:      "Learn variables, operators, and control flow in C.",
							VideoURL:     "https://www.example.com/c-syntax.mp4",
							Resources:    []string{"C reference", "Problem set 1"},
							AssignmentID: "assignment-1",
						},
					},
				},
				{
					ID:          "module-2",
					Title:       "Week 2: Arrays",
					Description: "Learn arrays, memory layout, and simple searching.",
					Position:    2,
					Lessons: []Lesson{
						{
							ID:           "lesson-2-1",
							Title:        "Arrays and loops",
							Summary:      "Explore array traversal, searching, and memory layout.",
							VideoURL:     "https://www.example.com/arrays.mp4",
							Resources:    []string{"Array exercises", "Memory model"},
							AssignmentID: "assignment-2",
						},
					},
				},
			},
		},
	}

	demoAssignments = []Assignment{
		{ID: "assignment-0", CourseID: "cs50x-2021", ModuleID: "module-0", LessonID: "lesson-0-1", Title: "Scratch story", Description: "Build an interactive Scratch story.", Difficulty: "EASY", MaxScore: 100},
		{ID: "assignment-1", CourseID: "cs50x-2021", ModuleID: "module-1", LessonID: "lesson-1-1", Title: "C calculator", Description: "Build a C program that uses operators and conditionals.", Difficulty: "MEDIUM", MaxScore: 100},
		{ID: "assignment-2", CourseID: "cs50x-2021", ModuleID: "module-2", LessonID: "lesson-2-1", Title: "Array search", Description: "Implement linear search on arrays in C.", Difficulty: "MEDIUM", MaxScore: 100},
	}
}

func main() {
	router := mux.NewRouter()
	api := router.PathPrefix("/api/v1").Subrouter()

	api.HandleFunc("/auth/register", registerHandler).Methods(http.MethodPost)
	api.HandleFunc("/auth/login", loginHandler).Methods(http.MethodPost)
	api.HandleFunc("/auth/me", meHandler).Methods(http.MethodGet)

	api.HandleFunc("/courses", coursesHandler).Methods(http.MethodGet)
	api.HandleFunc("/courses/{id}", courseHandler).Methods(http.MethodGet)
	api.HandleFunc("/courses/{id}/modules", modulesHandler).Methods(http.MethodGet)
	api.HandleFunc("/courses/{id}/modules/{moduleId}", moduleHandler).Methods(http.MethodGet)
	api.HandleFunc("/courses/{id}/modules/{moduleId}/lessons/{lessonId}", lessonHandler).Methods(http.MethodGet)
	api.HandleFunc("/courses/{id}/enroll", enrollHandler).Methods(http.MethodPost)

	api.HandleFunc("/assignments/{id}", assignmentHandler).Methods(http.MethodGet)
	api.HandleFunc("/assignments/{id}/submit", submitAssignmentHandler).Methods(http.MethodPost)
	api.HandleFunc("/users/{id}/submissions", userSubmissionsHandler).Methods(http.MethodGet)

	api.HandleFunc("/users/{id}/progress", userProgressHandler).Methods(http.MethodGet)
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

func registerHandler(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}

	if req.Name == "" || req.Email == "" || req.Password == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "name, email, and password are required"})
		return
	}

	if findUserByEmail(req.Email) != nil {
		writeJSON(w, http.StatusConflict, map[string]string{"error": "email already registered"})
		return
	}

	user := newUser(req.Name, req.Email, req.Password)
	demoUsers = append(demoUsers, user)

	token, err := generateJWT(user)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "failed to generate token"})
		return
	}

	writeJSON(w, http.StatusCreated, AuthResponse{AccessToken: token, User: user})
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}

	user := findUserByEmail(req.Email)
	if user == nil || bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)) != nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "invalid credentials"})
		return
	}

	token, err := generateJWT(*user)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "failed to generate token"})
		return
	}

	writeJSON(w, http.StatusOK, AuthResponse{AccessToken: token, User: *user})
}

func meHandler(w http.ResponseWriter, r *http.Request) {
	user, err := authenticate(r)
	if err != nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"user": user})
}

func coursesHandler(w http.ResponseWriter, r *http.Request) {
	list := make([]Course, 0, len(demoCourses))
	for _, course := range demoCourses {
		copyCourse := course
		copyCourse.Modules = nil
		list = append(list, copyCourse)
	}
	writeJSON(w, http.StatusOK, map[string]any{"courses": list})
}

func courseHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	course := findCourseByID(id)
	if course == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "course not found"})
		return
	}
	writeJSON(w, http.StatusOK, course)
}

func modulesHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	course := findCourseByID(id)
	if course == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "course not found"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"modules": course.Modules})
}

func moduleHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	course := findCourseByID(vars["id"])
	if course == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "course not found"})
		return
	}
	module := findModule(course, vars["moduleId"])
	if module == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "module not found"})
		return
	}
	writeJSON(w, http.StatusOK, module)
}

func lessonHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	course := findCourseByID(vars["id"])
	if course == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "course not found"})
		return
	}
	module := findModule(course, vars["moduleId"])
	if module == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "module not found"})
		return
	}
	lesson := findLesson(module, vars["lessonId"])
	if lesson == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "lesson not found"})
		return
	}
	writeJSON(w, http.StatusOK, lesson)
}

func enrollHandler(w http.ResponseWriter, r *http.Request) {
	user, err := authenticate(r)
	if err != nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": err.Error()})
		return
	}

	courseID := mux.Vars(r)["id"]
	course := findCourseByID(courseID)
	if course == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "course not found"})
		return
	}

	if !stringContains(user.EnrolledCourse, courseID) {
		for i := range demoUsers {
			if demoUsers[i].ID == user.ID {
				demoUsers[i].EnrolledCourse = append(demoUsers[i].EnrolledCourse, courseID)
				user = &demoUsers[i]
				break
			}
		}
	}

	writeJSON(w, http.StatusOK, map[string]any{"enrolledCourses": user.EnrolledCourse})
}

func assignmentHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	assignment := findAssignmentByID(id)
	if assignment == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "assignment not found"})
		return
	}
	writeJSON(w, http.StatusOK, assignment)
}

func submitAssignmentHandler(w http.ResponseWriter, r *http.Request) {
	user, err := authenticate(r)
	if err != nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": err.Error()})
		return
	}

	assignmentID := mux.Vars(r)["id"]
	assignment := findAssignmentByID(assignmentID)
	if assignment == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "assignment not found"})
		return
	}

	var req struct {
		Language string `json:"language"`
		Code     string `json:"code"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}

	score := autoGrade(req.Code)
	submission := Submission{
		ID:           fmt.Sprintf("submission-%d", time.Now().UnixNano()),
		AssignmentID: assignmentID,
		UserID:       user.ID,
		Language:     req.Language,
		Code:         req.Code,
		Status:       "COMPLETED",
		Score:        score,
		Output:       "Auto-grade completed",
		CreatedAt:    time.Now(),
	}
	demoSubmissions = append(demoSubmissions, submission)
	writeJSON(w, http.StatusCreated, submission)
}

func userSubmissionsHandler(w http.ResponseWriter, r *http.Request) {
	userID := mux.Vars(r)["id"]
	submissions := filterSubmissionsByUser(userID)
	writeJSON(w, http.StatusOK, map[string]any{"submissions": submissions})
}

func userProgressHandler(w http.ResponseWriter, r *http.Request) {
	userID := mux.Vars(r)["id"]
	user := findUserByID(userID)
	if user == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "user not found"})
		return
	}

	completedAssignments := len(filterSubmissionsByUser(userID))
	progress := map[string]any{
		"enrolledCourses":      user.EnrolledCourse,
		"completedModules":     completedAssignments,
		"completedAssignments": completedAssignments,
		"points":               completedAssignments * 10,
	}
	writeJSON(w, http.StatusOK, progress)
}

func autoGrade(code string) int {
	text := strings.ToLower(code)
	if strings.Contains(text, "print") || strings.Contains(text, "return") {
		return 90
	}
	return 70
}

func authenticate(r *http.Request) (*User, error) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return nil, fmt.Errorf("authorization header missing")
	}
	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
		return nil, fmt.Errorf("invalid authorization header")
	}

	token, err := jwt.Parse(parts[1], func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method")
		}
		secret := os.Getenv("JWT_SECRET")
		if secret == "" {
			secret = "supersecret"
		}
		return []byte(secret), nil
	})
	if err != nil || !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, fmt.Errorf("invalid token claims")
	}
	userID, ok := claims["sub"].(string)
	if !ok {
		return nil, fmt.Errorf("invalid token subject")
	}
	user := findUserByID(userID)
	if user == nil {
		return nil, fmt.Errorf("user not found")
	}
	return user, nil
}

func newUser(name, email, password string) User {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		hash = []byte("")
	}
	return User{
		ID:           fmt.Sprintf("user-%d", time.Now().UnixNano()),
		Name:         name,
		Email:        email,
		PasswordHash: string(hash),
	}
}

func findUserByEmail(email string) *User {
	for i := range demoUsers {
		if demoUsers[i].Email == email {
			return &demoUsers[i]
		}
	}
	return nil
}

func findUserByID(id string) *User {
	for i := range demoUsers {
		if demoUsers[i].ID == id {
			return &demoUsers[i]
		}
	}
	return nil
}

func findCourseByID(id string) *Course {
	for i := range demoCourses {
		if demoCourses[i].ID == id || demoCourses[i].Slug == id {
			return &demoCourses[i]
		}
	}
	return nil
}

func findModule(course *Course, moduleID string) *Module {
	for i := range course.Modules {
		if course.Modules[i].ID == moduleID {
			return &course.Modules[i]
		}
	}
	return nil
}

func findLesson(module *Module, lessonID string) *Lesson {
	for i := range module.Lessons {
		if module.Lessons[i].ID == lessonID {
			return &module.Lessons[i]
		}
	}
	return nil
}

func findAssignmentByID(id string) *Assignment {
	for i := range demoAssignments {
		if demoAssignments[i].ID == id {
			return &demoAssignments[i]
		}
	}
	return nil
}

func filterSubmissionsByUser(userID string) []Submission {
	results := make([]Submission, 0)
	for _, submission := range demoSubmissions {
		if submission.UserID == userID {
			results = append(results, submission)
		}
	}
	return results
}

func stringContains(list []string, value string) bool {
	for _, item := range list {
		if item == value {
			return true
		}
	}
	return false
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
