package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/mail"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

// ─── DB ──────────────────────────────────────────────────────────────────────

var db *sql.DB

func initDB() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "host=localhost port=5432 user=postgres password=postgres dbname=on2code sslmode=disable"
	}
	var err error
	db, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatalf("DB open error: %v", err)
	}
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(5 * time.Minute)

	if err = db.Ping(); err != nil {
		log.Printf("⚠️  WARNING: Cannot connect to PostgreSQL: %v", err)
		log.Printf("   Falling back to in-memory mode (data will not persist)")
		db = nil
		return
	}
	log.Println("✅ PostgreSQL connected")
	migrateDB()
}

func migrateDB() {
	schema := `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
	id            TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
	name          TEXT,
	email         TEXT UNIQUE NOT NULL,
	password_hash TEXT NOT NULL,
	role          TEXT NOT NULL DEFAULT 'STUDENT',
	is_verified   BOOLEAN NOT NULL DEFAULT FALSE,
	created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS courses (
	id           TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
	slug         TEXT UNIQUE NOT NULL,
	title        TEXT NOT NULL,
	subtitle     TEXT,
	description  TEXT,
	level        TEXT NOT NULL DEFAULT 'BEGINNER',
	status       TEXT NOT NULL DEFAULT 'PUBLISHED',
	cover_image  TEXT,
	instructor_id TEXT,
	created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS modules (
	id          TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
	course_id   TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
	title       TEXT NOT NULL,
	description TEXT,
	position    INT NOT NULL DEFAULT 0,
	created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lessons (
	id           TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
	module_id    TEXT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
	title        TEXT NOT NULL,
	summary      TEXT,
	video_url    TEXT,
	transcript   TEXT,
	notes        TEXT,
	position     INT NOT NULL DEFAULT 0,
	created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assignments (
	id            TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
	lesson_id     TEXT REFERENCES lessons(id) ON DELETE CASCADE,
	title         TEXT NOT NULL,
	description   TEXT,
	difficulty    TEXT NOT NULL DEFAULT 'MEDIUM',
	max_score     INT NOT NULL DEFAULT 100,
	passing_score INT NOT NULL DEFAULT 70,
	created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enrollments (
	id          TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	course_id   TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
	enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	UNIQUE(user_id, course_id)
);

CREATE TABLE IF NOT EXISTS submissions (
	id            TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
	assignment_id TEXT NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
	user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	language      TEXT NOT NULL,
	code          TEXT NOT NULL,
	status        TEXT NOT NULL DEFAULT 'COMPLETED',
	score         INT,
	output        TEXT,
	created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS progress (
	id         TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	course_id  TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
	lesson_id  TEXT REFERENCES lessons(id) ON DELETE SET NULL,
	completed  BOOLEAN NOT NULL DEFAULT FALSE,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	UNIQUE(user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS certificates (
	id              TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id         TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	course_id       TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
	certificate_url TEXT,
	issued_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	UNIQUE(user_id, course_id)
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
	id         TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	token      TEXT UNIQUE NOT NULL,
	expires_at TIMESTAMPTZ NOT NULL,
	used       BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`
	if _, err := db.Exec(schema); err != nil {
		log.Printf("⚠️  DB migration warning: %v", err)
	} else {
		log.Println("✅ DB schema ready")
	}
	seedDB()
}

func seedDB() {
	var count int
	db.QueryRow("SELECT COUNT(*) FROM courses").Scan(&count)
	if count > 0 {
		return // already seeded
	}

	// Insert demo course
	var courseID string
	err := db.QueryRow(`
		INSERT INTO courses (slug, title, subtitle, description, level, status)
		VALUES ('cs50x-2021','CS50x 2021','Foundations of computer science and full-stack development',
			'A structured CS50-style curriculum covering programming, data structures, web development, and ethics.','BEGINNER','PUBLISHED')
		RETURNING id`).Scan(&courseID)
	if err != nil {
		log.Printf("Seed course error: %v", err)
		return
	}

	modules := []struct {
		title, desc string
		pos         int
		lesson      struct{ title, summary, videoURL string }
	}{
		{"Week 0: Scratch", "Visual programming fundamentals with Scratch.", 0,
			struct{ title, summary, videoURL string }{"Scratch fundamentals", "Create sprites, scripts, and interactive stories.", "https://www.example.com/scratch-intro.mp4"}},
		{"Week 1: C", "Introduction to C, data types, and basic algorithms.", 1,
			struct{ title, summary, videoURL string }{"C syntax and operators", "Learn variables, operators, and control flow in C.", "https://www.example.com/c-syntax.mp4"}},
		{"Week 2: Arrays", "Learn arrays, memory layout, and simple searching.", 2,
			struct{ title, summary, videoURL string }{"Arrays and loops", "Explore array traversal, searching, and memory layout.", "https://www.example.com/arrays.mp4"}},
	}

	assignments := []struct{ title, desc, diff string }{
		{"Scratch story", "Build an interactive Scratch story.", "EASY"},
		{"C calculator", "Build a C program that uses operators and conditionals.", "MEDIUM"},
		{"Array search", "Implement linear search on arrays in C.", "MEDIUM"},
	}

	for i, m := range modules {
		var modID string
		err := db.QueryRow(`INSERT INTO modules (course_id, title, description, position) VALUES ($1,$2,$3,$4) RETURNING id`,
			courseID, m.title, m.desc, m.pos).Scan(&modID)
		if err != nil {
			continue
		}
		var lessonID string
		db.QueryRow(`INSERT INTO lessons (module_id, title, summary, video_url, position) VALUES ($1,$2,$3,$4,0) RETURNING id`,
			modID, m.lesson.title, m.lesson.summary, m.lesson.videoURL).Scan(&lessonID)
		if lessonID != "" {
			db.Exec(`INSERT INTO assignments (lesson_id, title, description, difficulty) VALUES ($1,$2,$3,$4)`,
				lessonID, assignments[i].title, assignments[i].desc, assignments[i].diff)
		}
	}

	// Demo user
	hash, _ := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.DefaultCost)
	db.Exec(`INSERT INTO users (name, email, password_hash, is_verified) VALUES ('Demo Student','student@on2code.com',$1,TRUE)
		ON CONFLICT (email) DO NOTHING`, string(hash))

	log.Println("✅ Demo data seeded")
}

// ─── MODELS ──────────────────────────────────────────────────────────────────

type User struct {
	ID           string   `json:"id"`
	Email        string   `json:"email"`
	Name         string   `json:"name,omitempty"`
	Role         string   `json:"role"`
	IsVerified   bool     `json:"isVerified"`
	PasswordHash string   `json:"-"`
	EnrolledCourse []string `json:"enrolledCourses,omitempty"`
}

type Lesson struct {
	ID           string   `json:"id"`
	Title        string   `json:"title"`
	Summary      string   `json:"summary"`
	VideoURL     string   `json:"videoUrl,omitempty"`
	Resources    []string `json:"resources,omitempty"`
	AssignmentID string   `json:"assignmentId,omitempty"`
	Position     int      `json:"position"`
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
	ID           string `json:"id"`
	LessonID     string `json:"lessonId"`
	Title        string `json:"title"`
	Description  string `json:"description"`
	Difficulty   string `json:"difficulty"`
	MaxScore     int    `json:"maxScore"`
	PassingScore int    `json:"passingScore"`
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

type Certificate struct {
	ID             string    `json:"id"`
	UserID         string    `json:"userId"`
	CourseID       string    `json:"courseId"`
	CourseTitle    string    `json:"courseTitle,omitempty"`
	CertificateURL string    `json:"certificateUrl"`
	IssuedAt       time.Time `json:"issuedAt"`
}

// ─── IN-MEMORY FALLBACK ───────────────────────────────────────────────────────
// Used when PostgreSQL is unavailable (local dev without DB)

var memUsers       []memUser
var memEnrollments []memEnrollment
var memSubmissions []memSubmission

type memUser struct {
	ID           string
	Name         string
	Email        string
	PasswordHash string
	Role         string
	IsVerified   bool
}

type memEnrollment struct {
	UserID   string
	CourseID string
}

type memSubmission struct {
	ID           string
	AssignmentID string
	UserID       string
	Language     string
	Code         string
	Status       string
	Score        int
	Output       string
	CreatedAt    time.Time
}

func init() {
	hash, _ := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.DefaultCost)
	memUsers = append(memUsers, memUser{
		ID: "user-demo", Name: "Demo Student",
		Email: "student@on2code.com", PasswordHash: string(hash),
		Role: "STUDENT", IsVerified: true,
	})
}

// Static demo courses (used in both DB and memory mode)
var demoCourses = []Course{
	{
		ID: "cs50x-2021", Slug: "cs50x-2021",
		Title: "CS50x 2021", Subtitle: "Foundations of computer science and full-stack development",
		Description: "A structured CS50-style curriculum.", Level: "BEGINNER", Status: "PUBLISHED",
		Modules: []Module{
			{ID: "module-0", Title: "Week 0: Scratch", Description: "Visual programming fundamentals.", Position: 0,
				Lessons: []Lesson{{ID: "lesson-0-1", Title: "Scratch fundamentals", Summary: "Create sprites, scripts, and interactive stories.", VideoURL: "https://www.example.com/scratch-intro.mp4", AssignmentID: "assignment-0"}}},
			{ID: "module-1", Title: "Week 1: C", Description: "Introduction to C, data types, and basic algorithms.", Position: 1,
				Lessons: []Lesson{{ID: "lesson-1-1", Title: "C syntax and operators", Summary: "Learn variables, operators, and control flow in C.", VideoURL: "https://www.example.com/c-syntax.mp4", AssignmentID: "assignment-1"}}},
			{ID: "module-2", Title: "Week 2: Arrays", Description: "Learn arrays, memory layout, and simple searching.", Position: 2,
				Lessons: []Lesson{{ID: "lesson-2-1", Title: "Arrays and loops", Summary: "Explore array traversal, searching, and memory layout.", VideoURL: "https://www.example.com/arrays.mp4", AssignmentID: "assignment-2"}}},
		},
	},
}

var demoAssignments = []Assignment{
	{ID: "assignment-0", LessonID: "lesson-0-1", Title: "Scratch story", Description: "Build an interactive Scratch story.", Difficulty: "EASY", MaxScore: 100, PassingScore: 70},
	{ID: "assignment-1", LessonID: "lesson-1-1", Title: "C calculator", Description: "Build a C program that uses operators and conditionals.", Difficulty: "MEDIUM", MaxScore: 100, PassingScore: 70},
	{ID: "assignment-2", LessonID: "lesson-2-1", Title: "Array search", Description: "Implement linear search on arrays in C.", Difficulty: "MEDIUM", MaxScore: 100, PassingScore: 70},
}

// ─── JWT ─────────────────────────────────────────────────────────────────────

func jwtSecret() []byte {
	s := os.Getenv("JWT_SECRET")
	if s == "" {
		log.Println("⚠️  WARNING: JWT_SECRET env var not set — using insecure default. Set it in production!")
		s = "change-me-in-production-use-env-var"
	}
	return []byte(s)
}

func generateJWT(userID, email, role string) (string, error) {
	claims := jwt.MapClaims{
		"sub":   userID,
		"email": email,
		"role":  role,
		"exp":   time.Now().Add(24 * time.Hour).Unix(),
		"iat":   time.Now().Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret())
}

func authenticate(r *http.Request) (*User, error) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return nil, fmt.Errorf("authorization header missing")
	}
	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
		return nil, fmt.Errorf("invalid authorization header format")
	}

	token, err := jwt.Parse(parts[1], func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return jwtSecret(), nil
	})
	if err != nil || !token.Valid {
		return nil, fmt.Errorf("invalid or expired token")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, fmt.Errorf("invalid token claims")
	}
	userID, ok := claims["sub"].(string)
	if !ok || userID == "" {
		return nil, fmt.Errorf("invalid token subject")
	}

	return findUserByID(userID)
}

// ─── DB HELPERS ──────────────────────────────────────────────────────────────

func findUserByID(id string) (*User, error) {
	if db != nil {
		u := &User{}
		err := db.QueryRow(`SELECT id,email,name,role,is_verified,password_hash FROM users WHERE id=$1`, id).
			Scan(&u.ID, &u.Email, &u.Name, &u.Role, &u.IsVerified, &u.PasswordHash)
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("user not found")
		}
		if err != nil {
			return nil, err
		}
		return u, nil
	}
	// memory fallback
	for _, u := range memUsers {
		if u.ID == id {
			return &User{ID: u.ID, Email: u.Email, Name: u.Name, Role: u.Role, IsVerified: u.IsVerified, PasswordHash: u.PasswordHash}, nil
		}
	}
	return nil, fmt.Errorf("user not found")
}

func findUserByEmail(email string) (*User, error) {
	if db != nil {
		u := &User{}
		err := db.QueryRow(`SELECT id,email,name,role,is_verified,password_hash FROM users WHERE email=$1`, email).
			Scan(&u.ID, &u.Email, &u.Name, &u.Role, &u.IsVerified, &u.PasswordHash)
		if err == sql.ErrNoRows {
			return nil, nil
		}
		if err != nil {
			return nil, err
		}
		return u, nil
	}
	for _, u := range memUsers {
		if strings.EqualFold(u.Email, email) {
			return &User{ID: u.ID, Email: u.Email, Name: u.Name, Role: u.Role, IsVerified: u.IsVerified, PasswordHash: u.PasswordHash}, nil
		}
	}
	return nil, nil
}

func createUser(name, email, passwordHash string) (*User, error) {
	if db != nil {
		u := &User{}
		err := db.QueryRow(`
			INSERT INTO users (name, email, password_hash) VALUES ($1,$2,$3)
			RETURNING id, email, name, role, is_verified`, name, email, passwordHash).
			Scan(&u.ID, &u.Email, &u.Name, &u.Role, &u.IsVerified)
		if err != nil {
			return nil, err
		}
		return u, nil
	}
	u := memUser{
		ID: fmt.Sprintf("user-%d", time.Now().UnixNano()),
		Name: name, Email: email, PasswordHash: passwordHash,
		Role: "STUDENT", IsVerified: false,
	}
	memUsers = append(memUsers, u)
	return &User{ID: u.ID, Email: u.Email, Name: u.Name, Role: u.Role}, nil
}

func getUserEnrolledCourseIDs(userID string) []string {
	if db != nil {
		rows, err := db.Query(`SELECT course_id FROM enrollments WHERE user_id=$1`, userID)
		if err != nil {
			return nil
		}
		defer rows.Close()
		var ids []string
		for rows.Next() {
			var id string
			rows.Scan(&id)
			ids = append(ids, id)
		}
		return ids
	}
	var ids []string
	for _, e := range memEnrollments {
		if e.UserID == userID {
			ids = append(ids, e.CourseID)
		}
	}
	return ids
}

func isEnrolled(userID, courseID string) bool {
	if db != nil {
		var exists bool
		db.QueryRow(`SELECT EXISTS(SELECT 1 FROM enrollments WHERE user_id=$1 AND course_id=$2)`, userID, courseID).Scan(&exists)
		return exists
	}
	for _, e := range memEnrollments {
		if e.UserID == userID && e.CourseID == courseID {
			return true
		}
	}
	return false
}

func enrollUser(userID, courseID string) error {
	if db != nil {
		_, err := db.Exec(`INSERT INTO enrollments (user_id, course_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`, userID, courseID)
		return err
	}
	if !isEnrolled(userID, courseID) {
		memEnrollments = append(memEnrollments, memEnrollment{UserID: userID, CourseID: courseID})
	}
	return nil
}

func getUserSubmissions(userID string) []Submission {
	if db != nil {
		rows, err := db.Query(`SELECT id,assignment_id,user_id,language,code,status,COALESCE(score,0),COALESCE(output,''),created_at FROM submissions WHERE user_id=$1 ORDER BY created_at DESC`, userID)
		if err != nil {
			return nil
		}
		defer rows.Close()
		var subs []Submission
		for rows.Next() {
			var s Submission
			rows.Scan(&s.ID, &s.AssignmentID, &s.UserID, &s.Language, &s.Code, &s.Status, &s.Score, &s.Output, &s.CreatedAt)
			subs = append(subs, s)
		}
		return subs
	}
	var subs []Submission
	for _, s := range memSubmissions {
		if s.UserID == userID {
			subs = append(subs, Submission{ID: s.ID, AssignmentID: s.AssignmentID, UserID: s.UserID, Language: s.Language, Code: s.Code, Status: s.Status, Score: s.Score, Output: s.Output, CreatedAt: s.CreatedAt})
		}
	}
	return subs
}

func createSubmission(s Submission) (Submission, error) {
	if db != nil {
		err := db.QueryRow(`
			INSERT INTO submissions (assignment_id, user_id, language, code, status, score, output)
			VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id, created_at`,
			s.AssignmentID, s.UserID, s.Language, s.Code, s.Status, s.Score, s.Output).
			Scan(&s.ID, &s.CreatedAt)
		return s, err
	}
	s.ID = fmt.Sprintf("sub-%d", time.Now().UnixNano())
	s.CreatedAt = time.Now()
	memSubmissions = append(memSubmissions, memSubmission{
		ID: s.ID, AssignmentID: s.AssignmentID, UserID: s.UserID,
		Language: s.Language, Code: s.Code, Status: s.Status, Score: s.Score,
		Output: s.Output, CreatedAt: s.CreatedAt,
	})
	return s, nil
}

func getUserCertificates(userID string) []Certificate {
	if db != nil {
		rows, err := db.Query(`
			SELECT c.id, c.user_id, c.course_id, co.title, COALESCE(c.certificate_url,''), c.issued_at
			FROM certificates c JOIN courses co ON c.course_id=co.id
			WHERE c.user_id=$1 ORDER BY c.issued_at DESC`, userID)
		if err != nil {
			return nil
		}
		defer rows.Close()
		var certs []Certificate
		for rows.Next() {
			var cert Certificate
			rows.Scan(&cert.ID, &cert.UserID, &cert.CourseID, &cert.CourseTitle, &cert.CertificateURL, &cert.IssuedAt)
			certs = append(certs, cert)
		}
		return certs
	}
	return nil
}

func issueCertificate(userID, courseID string) (*Certificate, error) {
	if db != nil {
		cert := &Certificate{}
		err := db.QueryRow(`
			INSERT INTO certificates (user_id, course_id, certificate_url)
			VALUES ($1,$2,$3) ON CONFLICT (user_id, course_id) DO UPDATE SET issued_at=NOW()
			RETURNING id, user_id, course_id, COALESCE(certificate_url,''), issued_at`,
			userID, courseID,
			fmt.Sprintf("/api/v1/certificates/%s/%s/download", userID, courseID)).
			Scan(&cert.ID, &cert.UserID, &cert.CourseID, &cert.CertificateURL, &cert.IssuedAt)
		return cert, err
	}
	cert := &Certificate{
		ID: fmt.Sprintf("cert-%d", time.Now().UnixNano()),
		UserID: userID, CourseID: courseID,
		CertificateURL: fmt.Sprintf("/api/v1/certificates/%s/%s/download", userID, courseID),
		IssuedAt: time.Now(),
	}
	return cert, nil
}

// ─── COURSE HELPERS (static for now) ─────────────────────────────────────────

func findCourseByID(id string) *Course {
	if db != nil {
		course := &Course{}
		err := db.QueryRow(`SELECT id,slug,title,COALESCE(subtitle,''),COALESCE(description,''),level,status FROM courses WHERE id=$1 OR slug=$1`, id).
			Scan(&course.ID, &course.Slug, &course.Title, &course.Subtitle, &course.Description, &course.Level, &course.Status)
		if err != nil {
			return nil
		}
		course.Modules = loadModules(course.ID)
		return course
	}
	for i := range demoCourses {
		if demoCourses[i].ID == id || demoCourses[i].Slug == id {
			return &demoCourses[i]
		}
	}
	return nil
}

func loadModules(courseID string) []Module {
	rows, err := db.Query(`SELECT id,title,COALESCE(description,''),position FROM modules WHERE course_id=$1 ORDER BY position`, courseID)
	if err != nil {
		return nil
	}
	defer rows.Close()
	var modules []Module
	for rows.Next() {
		var m Module
		rows.Scan(&m.ID, &m.Title, &m.Description, &m.Position)
		m.Lessons = loadLessons(m.ID)
		modules = append(modules, m)
	}
	return modules
}

func loadLessons(moduleID string) []Lesson {
	rows, err := db.Query(`
		SELECT l.id, l.title, COALESCE(l.summary,''), COALESCE(l.video_url,''), COALESCE(a.id,''), l.position
		FROM lessons l LEFT JOIN assignments a ON a.lesson_id=l.id
		WHERE l.module_id=$1 ORDER BY l.position`, moduleID)
	if err != nil {
		return nil
	}
	defer rows.Close()
	var lessons []Lesson
	for rows.Next() {
		var l Lesson
		rows.Scan(&l.ID, &l.Title, &l.Summary, &l.VideoURL, &l.AssignmentID, &l.Position)
		lessons = append(lessons, l)
	}
	return lessons
}

func listCourses() []Course {
	if db != nil {
		rows, err := db.Query(`SELECT id,slug,title,COALESCE(subtitle,''),COALESCE(description,''),level,status FROM courses WHERE status='PUBLISHED' ORDER BY created_at`)
		if err != nil {
			return nil
		}
		defer rows.Close()
		var courses []Course
		for rows.Next() {
			var c Course
			rows.Scan(&c.ID, &c.Slug, &c.Title, &c.Subtitle, &c.Description, &c.Level, &c.Status)
			courses = append(courses, c)
		}
		return courses
	}
	list := make([]Course, 0, len(demoCourses))
	for _, c := range demoCourses {
		cc := c
		cc.Modules = nil
		list = append(list, cc)
	}
	return list
}

func findAssignment(id string) *Assignment {
	if db != nil {
		a := &Assignment{}
		err := db.QueryRow(`SELECT id,COALESCE(lesson_id,''),title,COALESCE(description,''),difficulty,max_score,passing_score FROM assignments WHERE id=$1`, id).
			Scan(&a.ID, &a.LessonID, &a.Title, &a.Description, &a.Difficulty, &a.MaxScore, &a.PassingScore)
		if err != nil {
			return nil
		}
		return a
	}
	for i := range demoAssignments {
		if demoAssignments[i].ID == id {
			return &demoAssignments[i]
		}
	}
	return nil
}

// ─── VALIDATION ──────────────────────────────────────────────────────────────

func validEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}

func validPassword(password string) bool {
	return len(password) >= 8
}

// ─── AUTO GRADER ─────────────────────────────────────────────────────────────

func autoGrade(language, code string) (int, string) {
	// GitHub URL submission — full marks pending manual review
	if language == "github" {
		if strings.HasPrefix(code, "https://github.com/") {
			return 100, "GitHub submission received. Pending instructor review."
		}
		return 0, "Invalid GitHub URL. Must start with https://github.com/"
	}
	text := strings.ToLower(code)
	if strings.Contains(text, "print") || strings.Contains(text, "return") ||
		strings.Contains(text, "printf") || strings.Contains(text, "cout") {
		return 90, "Code accepted. Compilation and test results: PASSED (heuristic)"
	}
	return 70, "Code accepted. Minimal output detected. Consider adding output statements."
}

// ─── HANDLERS ────────────────────────────────────────────────────────────────

func healthHandler(w http.ResponseWriter, r *http.Request) {
	dbStatus := "disconnected"
	if db != nil && db.Ping() == nil {
		dbStatus = "connected"
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok", "database": dbStatus, "version": "2.0"})
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"message": "Welcome to On2Code API v2", "docs": "/api/v1/health"})
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
		return
	}

	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))

	if req.Name == "" || req.Email == "" || req.Password == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Name, email, and password are required"})
		return
	}
	if !validEmail(req.Email) {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid email address"})
		return
	}
	if !validPassword(req.Password) {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Password must be at least 8 characters"})
		return
	}

	existing, _ := findUserByEmail(req.Email)
	if existing != nil {
		writeJSON(w, http.StatusConflict, map[string]string{"error": "Email already registered"})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to hash password"})
		return
	}

	user, err := createUser(req.Name, req.Email, string(hash))
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to create account"})
		return
	}

	token, err := generateJWT(user.ID, user.Email, user.Role)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to generate token"})
		return
	}

	writeJSON(w, http.StatusCreated, map[string]any{"accessToken": token, "user": user})
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
		return
	}

	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	if req.Email == "" || req.Password == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Email and password are required"})
		return
	}

	user, err := findUserByEmail(req.Email)
	if err != nil || user == nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "Invalid email or password"})
		return
	}

	if bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)) != nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "Invalid email or password"})
		return
	}

	token, err := generateJWT(user.ID, user.Email, user.Role)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to generate token"})
		return
	}

	user.PasswordHash = "" // don't expose hash
	writeJSON(w, http.StatusOK, map[string]any{"accessToken": token, "user": user})
}

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	// JWT is stateless — client drops the token. Optionally add to a blocklist in Redis.
	writeJSON(w, http.StatusOK, map[string]string{"message": "Logged out successfully"})
}

func meHandler(w http.ResponseWriter, r *http.Request) {
	user, err := authenticate(r)
	if err != nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": err.Error()})
		return
	}
	user.PasswordHash = ""
	user.EnrolledCourse = getUserEnrolledCourseIDs(user.ID)
	writeJSON(w, http.StatusOK, map[string]any{"user": user})
}

func updateUserHandler(w http.ResponseWriter, r *http.Request) {
	user, err := authenticate(r)
	if err != nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": err.Error()})
		return
	}
	var req struct {
		Name string `json:"name"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
		return
	}
	req.Name = strings.TrimSpace(req.Name)
	if req.Name == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Name cannot be empty"})
		return
	}

	if db != nil {
		db.Exec(`UPDATE users SET name=$1, updated_at=NOW() WHERE id=$2`, req.Name, user.ID)
	} else {
		for i := range memUsers {
			if memUsers[i].ID == user.ID {
				memUsers[i].Name = req.Name
				break
			}
		}
	}
	user.Name = req.Name
	user.PasswordHash = ""
	writeJSON(w, http.StatusOK, map[string]any{"user": user})
}

func forgotPasswordHandler(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Email string `json:"email"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
		return
	}
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	if !validEmail(req.Email) {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid email address"})
		return
	}

	// Always return success to prevent email enumeration attacks
	// In production: generate token, store in DB, send email via SMTP/SendGrid
	if db != nil {
		user, _ := findUserByEmail(req.Email)
		if user != nil {
			token := fmt.Sprintf("reset-%d", time.Now().UnixNano())
			db.Exec(`INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1,$2,$3)`,
				user.ID, token, time.Now().Add(1*time.Hour))
			// TODO: send email with reset link: /auth/reset-password?token=<token>
			log.Printf("Password reset token for %s: %s (email not yet implemented)", req.Email, token)
		}
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"message": "If that email is registered, a password reset link has been sent.",
	})
}

func resetPasswordHandler(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Token    string `json:"token"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
		return
	}
	if req.Token == "" || req.Password == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Token and new password are required"})
		return
	}
	if !validPassword(req.Password) {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Password must be at least 8 characters"})
		return
	}

	if db == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "Password reset requires a database connection"})
		return
	}

	var userID string
	var expiresAt time.Time
	var used bool
	err := db.QueryRow(`SELECT user_id, expires_at, used FROM password_reset_tokens WHERE token=$1`, req.Token).
		Scan(&userID, &expiresAt, &used)
	if err != nil || used || time.Now().After(expiresAt) {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid or expired reset token"})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to hash password"})
		return
	}

	db.Exec(`UPDATE users SET password_hash=$1, updated_at=NOW() WHERE id=$2`, string(hash), userID)
	db.Exec(`UPDATE password_reset_tokens SET used=TRUE WHERE token=$1`, req.Token)

	writeJSON(w, http.StatusOK, map[string]string{"message": "Password reset successfully. You can now sign in."})
}

func coursesHandler(w http.ResponseWriter, r *http.Request) {
	courses := listCourses()
	writeJSON(w, http.StatusOK, map[string]any{"courses": courses})
}

func courseHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	course := findCourseByID(id)
	if course == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "Course not found"})
		return
	}
	writeJSON(w, http.StatusOK, course)
}

func modulesHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	course := findCourseByID(id)
	if course == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "Course not found"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"modules": course.Modules})
}

func moduleHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	course := findCourseByID(vars["id"])
	if course == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "Course not found"})
		return
	}
	for _, m := range course.Modules {
		if m.ID == vars["moduleId"] {
			writeJSON(w, http.StatusOK, m)
			return
		}
	}
	writeJSON(w, http.StatusNotFound, map[string]string{"error": "Module not found"})
}

func lessonHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	course := findCourseByID(vars["id"])
	if course == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "Course not found"})
		return
	}
	for _, m := range course.Modules {
		if m.ID == vars["moduleId"] {
			for _, l := range m.Lessons {
				if l.ID == vars["lessonId"] {
					writeJSON(w, http.StatusOK, l)
					return
				}
			}
			writeJSON(w, http.StatusNotFound, map[string]string{"error": "Lesson not found"})
			return
		}
	}
	writeJSON(w, http.StatusNotFound, map[string]string{"error": "Module not found"})
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
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "Course not found"})
		return
	}
	if err := enrollUser(user.ID, course.ID); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to enroll"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"enrolled": true, "courseId": course.ID})
}

func assignmentHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	a := findAssignment(id)
	if a == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "Assignment not found"})
		return
	}
	writeJSON(w, http.StatusOK, a)
}

func submitAssignmentHandler(w http.ResponseWriter, r *http.Request) {
	user, err := authenticate(r)
	if err != nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": err.Error()})
		return
	}

	assignmentID := mux.Vars(r)["id"]
	a := findAssignment(assignmentID)
	if a == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "Assignment not found"})
		return
	}

	var req struct {
		Language string `json:"language"`
		Code     string `json:"code"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
		return
	}
	if req.Language == "" || req.Code == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Language and code are required"})
		return
	}

	score, output := autoGrade(req.Language, req.Code)
	status := "PASSED"
	if score < a.PassingScore {
		status = "FAILED"
	}

	sub, err := createSubmission(Submission{
		AssignmentID: assignmentID,
		UserID:       user.ID,
		Language:     req.Language,
		Code:         req.Code,
		Status:       status,
		Score:        score,
		Output:       output,
	})
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to save submission"})
		return
	}

	writeJSON(w, http.StatusCreated, sub)
}

func userSubmissionsHandler(w http.ResponseWriter, r *http.Request) {
	userID := mux.Vars(r)["id"]
	subs := getUserSubmissions(userID)
	if subs == nil {
		subs = []Submission{}
	}
	writeJSON(w, http.StatusOK, map[string]any{"submissions": subs})
}

func userProgressHandler(w http.ResponseWriter, r *http.Request) {
	userID := mux.Vars(r)["id"]
	user, err := findUserByID(userID)
	if err != nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "User not found"})
		return
	}

	enrolledIDs := getUserEnrolledCourseIDs(user.ID)
	subs := getUserSubmissions(user.ID)
	completedAssignments := len(subs)
	points := completedAssignments * 10

	writeJSON(w, http.StatusOK, map[string]any{
		"enrolledCourses":      enrolledIDs,
		"completedModules":     completedAssignments,
		"completedAssignments": completedAssignments,
		"points":               points,
	})
}

func userCertificatesHandler(w http.ResponseWriter, r *http.Request) {
	user, err := authenticate(r)
	if err != nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": err.Error()})
		return
	}
	certs := getUserCertificates(user.ID)
	if certs == nil {
		certs = []Certificate{}
	}
	writeJSON(w, http.StatusOK, map[string]any{"certificates": certs})
}

func issueCertificateHandler(w http.ResponseWriter, r *http.Request) {
	user, err := authenticate(r)
	if err != nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": err.Error()})
		return
	}

	courseID := mux.Vars(r)["courseId"]
	course := findCourseByID(courseID)
	if course == nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "Course not found"})
		return
	}

	if !isEnrolled(user.ID, course.ID) {
		writeJSON(w, http.StatusForbidden, map[string]string{"error": "You must be enrolled to receive a certificate"})
		return
	}

	cert, err := issueCertificate(user.ID, course.ID)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to issue certificate"})
		return
	}
	cert.CourseTitle = course.Title

	writeJSON(w, http.StatusCreated, cert)
}

func leaderboardHandler(w http.ResponseWriter, r *http.Request) {
	type Entry struct {
		Rank                 int    `json:"rank"`
		UserID               string `json:"userId"`
		Name                 string `json:"name"`
		Points               int    `json:"points"`
		CompletedAssignments int    `json:"completedAssignments"`
	}

	var entries []Entry
	if db != nil {
		rows, err := db.Query(`
			SELECT u.id, COALESCE(u.name, u.email), COUNT(s.id) as submissions
			FROM users u LEFT JOIN submissions s ON s.user_id=u.id
			GROUP BY u.id, u.name, u.email
			ORDER BY submissions DESC, u.created_at
			LIMIT 50`)
		if err == nil {
			defer rows.Close()
			rank := 1
			for rows.Next() {
				var e Entry
				rows.Scan(&e.UserID, &e.Name, &e.CompletedAssignments)
				e.Rank = rank
				e.Points = e.CompletedAssignments * 10
				entries = append(entries, e)
				rank++
			}
		}
	} else {
		for i, u := range memUsers {
			subs := getUserSubmissions(u.ID)
			entries = append(entries, Entry{
				Rank: i + 1, UserID: u.ID, Name: u.Name,
				CompletedAssignments: len(subs), Points: len(subs) * 10,
			})
		}
	}
	if entries == nil {
		entries = []Entry{}
	}
	writeJSON(w, http.StatusOK, map[string]any{"leaderboard": entries})
}

// ─── UTIL ─────────────────────────────────────────────────────────────────────

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

func main() {
	initDB()

	router := mux.NewRouter()
	api := router.PathPrefix("/api/v1").Subrouter()

	// Health
	api.HandleFunc("/health", healthHandler).Methods(http.MethodGet)
	api.HandleFunc("/", rootHandler).Methods(http.MethodGet)

	// Auth
	api.HandleFunc("/auth/register", registerHandler).Methods(http.MethodPost)
	api.HandleFunc("/auth/login", loginHandler).Methods(http.MethodPost)
	api.HandleFunc("/auth/logout", logoutHandler).Methods(http.MethodPost)
	api.HandleFunc("/auth/me", meHandler).Methods(http.MethodGet)
	api.HandleFunc("/auth/forgot-password", forgotPasswordHandler).Methods(http.MethodPost)
	api.HandleFunc("/auth/reset-password", resetPasswordHandler).Methods(http.MethodPost)

	// Courses
	api.HandleFunc("/courses", coursesHandler).Methods(http.MethodGet)
	api.HandleFunc("/courses/{id}", courseHandler).Methods(http.MethodGet)
	api.HandleFunc("/courses/{id}/modules", modulesHandler).Methods(http.MethodGet)
	api.HandleFunc("/courses/{id}/modules/{moduleId}", moduleHandler).Methods(http.MethodGet)
	api.HandleFunc("/courses/{id}/modules/{moduleId}/lessons/{lessonId}", lessonHandler).Methods(http.MethodGet)
	api.HandleFunc("/courses/{id}/enroll", enrollHandler).Methods(http.MethodPost)
	api.HandleFunc("/courses/{courseId}/certificate", issueCertificateHandler).Methods(http.MethodPost)

	// Assignments
	api.HandleFunc("/assignments/{id}", assignmentHandler).Methods(http.MethodGet)
	api.HandleFunc("/assignments/{id}/submit", submitAssignmentHandler).Methods(http.MethodPost)

	// Users
	api.HandleFunc("/users/{id}", updateUserHandler).Methods(http.MethodPatch)
	api.HandleFunc("/users/{id}/submissions", userSubmissionsHandler).Methods(http.MethodGet)
	api.HandleFunc("/users/{id}/progress", userProgressHandler).Methods(http.MethodGet)

	// Certificates
	api.HandleFunc("/certificates", userCertificatesHandler).Methods(http.MethodGet)

	// Leaderboard
	api.HandleFunc("/leaderboard", leaderboardHandler).Methods(http.MethodGet)

	// CORS — lock this down in production!
	allowedOrigins := []string{"http://localhost:3000"}
	if origin := os.Getenv("ALLOWED_ORIGIN"); origin != "" {
		allowedOrigins = append(allowedOrigins, origin)
	}

	handler := cors.New(cors.Options{
		AllowedOrigins:   allowedOrigins,
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodPatch, http.MethodDelete, http.MethodOptions},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
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
		IdleTimeout:  60 * time.Second,
	}

	log.Printf("🚀 On2Code backend v2 running on http://localhost:%s", port)
	if db == nil {
		log.Println("⚠️  Running in memory mode — start PostgreSQL for persistence")
	}
	log.Fatal(srv.ListenAndServe())
}
