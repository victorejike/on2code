package models

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
	"time"
)

// ─── JSONB helper ─────────────────────────────────────────────────────────────

// JSONMap stores arbitrary key-value pairs in a JSONB column.
type JSONMap map[string]interface{}

func (j JSONMap) Value() (driver.Value, error) {
	if j == nil {
		return nil, nil
	}
	b, err := json.Marshal(j)
	return string(b), err
}

func (j *JSONMap) Scan(src interface{}) error {
	if src == nil {
		*j = nil
		return nil
	}
	switch v := src.(type) {
	case []byte:
		return json.Unmarshal(v, j)
	case string:
		return json.Unmarshal([]byte(v), j)
	default:
		return fmt.Errorf("cannot scan %T into JSONMap", src)
	}
}

// ─── User ─────────────────────────────────────────────────────────────────────

type UserRole string

const (
	RoleStudent    UserRole = "STUDENT"
	RoleInstructor UserRole = "INSTRUCTOR"
	RoleAdmin      UserRole = "ADMIN"
	RoleSuperAdmin UserRole = "SUPER_ADMIN"
)

type User struct {
	ID             string     `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Name           string     `gorm:"type:varchar(255);not null" json:"name"`
	Email          string     `gorm:"type:varchar(255);uniqueIndex;not null" json:"email"`
	PasswordHash   string     `gorm:"type:text;not null" json:"-"`
	Role           UserRole   `gorm:"type:varchar(20);default:'STUDENT';not null" json:"role"`
	AvatarURL      string     `gorm:"type:text" json:"avatar_url,omitempty"`
	Bio            string     `gorm:"type:text" json:"bio,omitempty"`
	GithubUsername string     `gorm:"type:varchar(100)" json:"github_username,omitempty"`
	GithubID       string     `gorm:"type:varchar(100)" json:"github_id,omitempty"`
	GoogleID       string     `gorm:"type:varchar(100)" json:"google_id,omitempty"`
	IsVerified     bool       `gorm:"default:false;not null" json:"is_verified"`
	IsActive       bool       `gorm:"default:true;not null" json:"is_active"`
	CreatedAt      time.Time  `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt      time.Time  `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt      *time.Time `gorm:"index" json:"-"`

	// Associations
	Courses       []Course       `gorm:"foreignKey:InstructorID" json:"-"`
	Enrollments   []Enrollment   `gorm:"foreignKey:UserID" json:"-"`
	Submissions   []Submission   `gorm:"foreignKey:UserID" json:"-"`
	Certificates  []Certificate  `gorm:"foreignKey:UserID" json:"-"`
	Notifications []Notification `gorm:"foreignKey:UserID" json:"-"`
	Discussions   []Discussion   `gorm:"foreignKey:UserID" json:"-"`
	XP            *UserXP        `gorm:"foreignKey:UserID" json:"-"`
}

// ─── Course ───────────────────────────────────────────────────────────────────

type CourseLevel string

const (
	LevelBeginner     CourseLevel = "BEGINNER"
	LevelIntermediate CourseLevel = "INTERMEDIATE"
	LevelAdvanced     CourseLevel = "ADVANCED"
)

type CourseStatus string

const (
	StatusDraft     CourseStatus = "DRAFT"
	StatusPublished CourseStatus = "PUBLISHED"
	StatusArchived  CourseStatus = "ARCHIVED"
)

type Course struct {
	ID           string       `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Slug         string       `gorm:"type:varchar(255);uniqueIndex;not null" json:"slug"`
	Title        string       `gorm:"type:varchar(500);not null" json:"title"`
	Subtitle     string       `gorm:"type:varchar(1000)" json:"subtitle,omitempty"`
	Description  string       `gorm:"type:text" json:"description,omitempty"`
	Level        CourseLevel  `gorm:"type:varchar(20);default:'BEGINNER';not null" json:"level"`
	Status       CourseStatus `gorm:"type:varchar(20);default:'DRAFT';not null" json:"status"`
	CoverImage   string       `gorm:"type:text" json:"cover_image,omitempty"`
	InstructorID string       `gorm:"type:uuid;not null" json:"instructor_id"`
	Price        float64      `gorm:"type:decimal(10,2);default:0" json:"price"`
	IsFree       bool         `gorm:"default:true;not null" json:"is_free"`
	CreatedAt    time.Time    `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt    time.Time    `gorm:"autoUpdateTime" json:"updated_at"`

	// Associations
	Instructor  User         `gorm:"foreignKey:InstructorID" json:"instructor,omitempty"`
	Modules     []Module     `gorm:"foreignKey:CourseID;constraint:OnDelete:CASCADE" json:"modules,omitempty"`
	Enrollments []Enrollment `gorm:"foreignKey:CourseID" json:"-"`
}

// ─── Module ───────────────────────────────────────────────────────────────────

type Module struct {
	ID          string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	CourseID    string    `gorm:"type:uuid;not null;index" json:"course_id"`
	Title       string    `gorm:"type:varchar(500);not null" json:"title"`
	Description string    `gorm:"type:text" json:"description,omitempty"`
	Position    int       `gorm:"default:0;not null" json:"position"`
	IsPublished bool      `gorm:"default:false;not null" json:"is_published"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`

	// Associations
	Course  Course   `gorm:"foreignKey:CourseID" json:"-"`
	Lessons []Lesson `gorm:"foreignKey:ModuleID;constraint:OnDelete:CASCADE" json:"lessons,omitempty"`
	Quizzes []Quiz   `gorm:"foreignKey:ModuleID" json:"quizzes,omitempty"`
}

// ─── Lesson ───────────────────────────────────────────────────────────────────

type Lesson struct {
	ID            string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	ModuleID      string    `gorm:"type:uuid;not null;index" json:"module_id"`
	Title         string    `gorm:"type:varchar(500);not null" json:"title"`
	Summary       string    `gorm:"type:text" json:"summary,omitempty"`
	VideoURL      string    `gorm:"type:text" json:"video_url,omitempty"`
	VideoDuration int       `gorm:"default:0" json:"video_duration"`
	Transcript    string    `gorm:"type:text" json:"transcript,omitempty"`
	Notes         string    `gorm:"type:text" json:"notes,omitempty"`
	Position      int       `gorm:"default:0;not null" json:"position"`
	IsFreePreview bool      `gorm:"default:false;not null" json:"is_free_preview"`
	IsPublished   bool      `gorm:"default:false;not null" json:"is_published"`
	CreatedAt     time.Time `gorm:"autoCreateTime" json:"created_at"`

	// Associations
	Module      Module           `gorm:"foreignKey:ModuleID" json:"-"`
	Assignments []Assignment     `gorm:"foreignKey:LessonID" json:"assignments,omitempty"`
	Quizzes     []Quiz           `gorm:"foreignKey:LessonID" json:"quizzes,omitempty"`
	Progress    []LessonProgress `gorm:"foreignKey:LessonID" json:"-"`
	Discussions []Discussion     `gorm:"foreignKey:LessonID" json:"-"`
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────

type Quiz struct {
	ID               string     `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	LessonID         *string    `gorm:"type:uuid;index" json:"lesson_id,omitempty"`
	ModuleID         *string    `gorm:"type:uuid;index" json:"module_id,omitempty"`
	Title            string     `gorm:"type:varchar(500);not null" json:"title"`
	Description      string     `gorm:"type:text" json:"description,omitempty"`
	TimeLimitMinutes int        `gorm:"default:30" json:"time_limit_minutes"`
	PassingScore     int        `gorm:"default:70;not null" json:"passing_score"`
	AllowRetakes     bool       `gorm:"default:true;not null" json:"allow_retakes"`
	MaxAttempts      int        `gorm:"default:3" json:"max_attempts"`
	CreatedAt        time.Time  `gorm:"autoCreateTime" json:"created_at"`

	// Associations
	Lesson    *Lesson        `gorm:"foreignKey:LessonID" json:"-"`
	Module    *Module        `gorm:"foreignKey:ModuleID" json:"-"`
	Questions []QuizQuestion `gorm:"foreignKey:QuizID;constraint:OnDelete:CASCADE" json:"questions,omitempty"`
	Attempts  []QuizAttempt  `gorm:"foreignKey:QuizID" json:"-"`
}

// ─── QuizQuestion ─────────────────────────────────────────────────────────────

type QuestionType string

const (
	QTypeMultipleChoice QuestionType = "MULTIPLE_CHOICE"
	QTypeTrueFalse      QuestionType = "TRUE_FALSE"
	QTypeFillBlank      QuestionType = "FILL_BLANK"
	QTypeCodeOutput     QuestionType = "CODE_OUTPUT"
	QTypeDebugging      QuestionType = "DEBUGGING"
)

type QuizQuestion struct {
	ID           string       `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	QuizID       string       `gorm:"type:uuid;not null;index" json:"quiz_id"`
	QuestionText string       `gorm:"type:text;not null" json:"question_text"`
	QuestionType QuestionType `gorm:"type:varchar(30);not null" json:"question_type"`
	Position     int          `gorm:"default:0;not null" json:"position"`
	Points       int          `gorm:"default:10;not null" json:"points"`
	Explanation  string       `gorm:"type:text" json:"explanation,omitempty"`

	// Associations
	Quiz    Quiz             `gorm:"foreignKey:QuizID" json:"-"`
	Options []QuestionOption `gorm:"foreignKey:QuestionID;constraint:OnDelete:CASCADE" json:"options,omitempty"`
}

// ─── QuestionOption ───────────────────────────────────────────────────────────

type QuestionOption struct {
	ID         string `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	QuestionID string `gorm:"type:uuid;not null;index" json:"question_id"`
	OptionText string `gorm:"type:text;not null" json:"option_text"`
	IsCorrect  bool   `gorm:"default:false;not null" json:"is_correct"`
	Position   int    `gorm:"default:0;not null" json:"position"`

	// Associations
	Question QuizQuestion `gorm:"foreignKey:QuestionID" json:"-"`
}

// ─── QuizAttempt ──────────────────────────────────────────────────────────────

type QuizAttempt struct {
	ID            string     `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	QuizID        string     `gorm:"type:uuid;not null;index" json:"quiz_id"`
	UserID        string     `gorm:"type:uuid;not null;index" json:"user_id"`
	Score         int        `gorm:"default:0" json:"score"`
	MaxScore      int        `gorm:"default:0" json:"max_score"`
	Passed        bool       `gorm:"default:false" json:"passed"`
	StartedAt     time.Time  `gorm:"autoCreateTime" json:"started_at"`
	CompletedAt   *time.Time `json:"completed_at,omitempty"`
	AttemptNumber int        `gorm:"default:1;not null" json:"attempt_number"`

	// Associations
	Quiz    Quiz         `gorm:"foreignKey:QuizID" json:"-"`
	User    User         `gorm:"foreignKey:UserID" json:"-"`
	Answers []QuizAnswer `gorm:"foreignKey:AttemptID;constraint:OnDelete:CASCADE" json:"answers,omitempty"`
}

// ─── QuizAnswer ───────────────────────────────────────────────────────────────

type QuizAnswer struct {
	ID               string          `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	AttemptID        string          `gorm:"type:uuid;not null;index" json:"attempt_id"`
	QuestionID       string          `gorm:"type:uuid;not null;index" json:"question_id"`
	SelectedOptionID *string         `gorm:"type:uuid" json:"selected_option_id,omitempty"`
	TextAnswer       *string         `gorm:"type:text" json:"text_answer,omitempty"`
	IsCorrect        bool            `gorm:"default:false" json:"is_correct"`
	PointsEarned     int             `gorm:"default:0" json:"points_earned"`

	// Associations
	Attempt        QuizAttempt     `gorm:"foreignKey:AttemptID" json:"-"`
	Question       QuizQuestion    `gorm:"foreignKey:QuestionID" json:"-"`
	SelectedOption *QuestionOption `gorm:"foreignKey:SelectedOptionID" json:"-"`
}

// ─── Assignment ───────────────────────────────────────────────────────────────

type AssignmentDifficulty string

const (
	DiffEasy   AssignmentDifficulty = "EASY"
	DiffMedium AssignmentDifficulty = "MEDIUM"
	DiffHard   AssignmentDifficulty = "HARD"
)

type Assignment struct {
	ID             string               `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	LessonID       *string              `gorm:"type:uuid;index" json:"lesson_id,omitempty"`
	Title          string               `gorm:"type:varchar(500);not null" json:"title"`
	Description    string               `gorm:"type:text" json:"description,omitempty"`
	Instructions   string               `gorm:"type:text" json:"instructions,omitempty"`
	Difficulty     AssignmentDifficulty `gorm:"type:varchar(10);default:'MEDIUM';not null" json:"difficulty"`
	MaxScore       int                  `gorm:"default:100;not null" json:"max_score"`
	PassingScore   int                  `gorm:"default:70;not null" json:"passing_score"`
	DueDate        *time.Time           `json:"due_date,omitempty"`
	StarterRepoURL string               `gorm:"type:text" json:"starter_repo_url,omitempty"`
	Rubric         string               `gorm:"type:text" json:"rubric,omitempty"`
	AllowGitHub    bool                 `gorm:"default:true" json:"allow_github"`
	CreatedAt      time.Time            `gorm:"autoCreateTime" json:"created_at"`

	// Associations
	Lesson      *Lesson      `gorm:"foreignKey:LessonID" json:"-"`
	Submissions []Submission `gorm:"foreignKey:AssignmentID" json:"-"`
}

// ─── Submission ───────────────────────────────────────────────────────────────

type SubmissionStatus string

const (
	SubmissionPending SubmissionStatus = "PENDING"
	SubmissionRunning SubmissionStatus = "RUNNING"
	SubmissionPassed  SubmissionStatus = "PASSED"
	SubmissionFailed  SubmissionStatus = "FAILED"
	SubmissionError   SubmissionStatus = "ERROR"
)

type Submission struct {
	ID           string           `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	AssignmentID string           `gorm:"type:uuid;not null;index" json:"assignment_id"`
	UserID       string           `gorm:"type:uuid;not null;index" json:"user_id"`
	Language     string           `gorm:"type:varchar(50);not null" json:"language"`
	Code         string           `gorm:"type:text;not null" json:"code"`
	GithubURL    *string          `gorm:"type:text" json:"github_url,omitempty"`
	Status       SubmissionStatus `gorm:"type:varchar(20);default:'PENDING';not null" json:"status"`
	Score        int              `gorm:"default:0" json:"score"`
	Output       string           `gorm:"type:text" json:"output,omitempty"`
	Feedback     string           `gorm:"type:text" json:"feedback,omitempty"`
	CreatedAt    time.Time        `gorm:"autoCreateTime" json:"created_at"`

	// Associations
	Assignment Assignment  `gorm:"foreignKey:AssignmentID" json:"-"`
	User       User        `gorm:"foreignKey:UserID" json:"-"`
	GradingJob *GradingJob `gorm:"foreignKey:SubmissionID" json:"grading_job,omitempty"`
}

// ─── Enrollment ───────────────────────────────────────────────────────────────

type Enrollment struct {
	ID         string     `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID     string     `gorm:"type:uuid;not null;uniqueIndex:idx_user_course" json:"user_id"`
	CourseID   string     `gorm:"type:uuid;not null;uniqueIndex:idx_user_course" json:"course_id"`
	EnrolledAt time.Time  `gorm:"autoCreateTime" json:"enrolled_at"`
	ExpiresAt  *time.Time `json:"expires_at,omitempty"`

	// Associations
	User   User   `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Course Course `gorm:"foreignKey:CourseID" json:"course,omitempty"`
}

// ─── LessonProgress ───────────────────────────────────────────────────────────

type LessonProgress struct {
	ID               string     `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID           string     `gorm:"type:uuid;not null;uniqueIndex:idx_user_lesson" json:"user_id"`
	LessonID         string     `gorm:"type:uuid;not null;uniqueIndex:idx_user_lesson" json:"lesson_id"`
	Completed        bool       `gorm:"default:false;not null" json:"completed"`
	CompletedAt      *time.Time `json:"completed_at,omitempty"`
	WatchTimeSeconds int        `gorm:"default:0" json:"watch_time_seconds"`

	// Associations
	User   User   `gorm:"foreignKey:UserID" json:"-"`
	Lesson Lesson `gorm:"foreignKey:LessonID" json:"-"`
}

// ─── Certificate ─────────────────────────────────────────────────────────────

type Certificate struct {
	ID             string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID         string    `gorm:"type:uuid;not null;uniqueIndex:idx_cert_user_course" json:"user_id"`
	CourseID       string    `gorm:"type:uuid;not null;uniqueIndex:idx_cert_user_course" json:"course_id"`
	CertificateURL string    `gorm:"type:text" json:"certificate_url,omitempty"`
	IssuedAt       time.Time `gorm:"autoCreateTime" json:"issued_at"`

	// Associations
	User   User   `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Course Course `gorm:"foreignKey:CourseID" json:"course,omitempty"`
}

// ─── UserXP ───────────────────────────────────────────────────────────────────

type UserXP struct {
	ID               string     `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID           string     `gorm:"type:uuid;uniqueIndex;not null" json:"user_id"`
	TotalXP          int        `gorm:"default:0;not null" json:"total_xp"`
	CurrentStreak    int        `gorm:"default:0;not null" json:"current_streak"`
	LongestStreak    int        `gorm:"default:0;not null" json:"longest_streak"`
	LastActivityDate *time.Time `json:"last_activity_date,omitempty"`

	// Associations
	User User `gorm:"foreignKey:UserID" json:"-"`
}

// ─── XPEvent ──────────────────────────────────────────────────────────────────

type XPEventType string

const (
	XPLessonComplete XPEventType = "LESSON_COMPLETE"
	XPQuizPass       XPEventType = "QUIZ_PASS"
	XPAssignmentPass XPEventType = "ASSIGNMENT_PASS"
	XPStreakBonus    XPEventType = "STREAK_BONUS"
	XPEnrollment     XPEventType = "ENROLLMENT"
)

type XPEvent struct {
	ID          string      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID      string      `gorm:"type:uuid;not null;index" json:"user_id"`
	EventType   XPEventType `gorm:"type:varchar(30);not null" json:"event_type"`
	XPEarned    int         `gorm:"not null" json:"xp_earned"`
	Description string      `gorm:"type:text" json:"description,omitempty"`
	CreatedAt   time.Time   `gorm:"autoCreateTime" json:"created_at"`

	// Associations
	User User `gorm:"foreignKey:UserID" json:"-"`
}

// ─── Notification ─────────────────────────────────────────────────────────────

type NotificationType string

const (
	NotifInfo        NotificationType = "INFO"
	NotifSuccess     NotificationType = "SUCCESS"
	NotifWarning     NotificationType = "WARNING"
	NotifAssignment  NotificationType = "ASSIGNMENT"
	NotifQuiz        NotificationType = "QUIZ"
	NotifCertificate NotificationType = "CERTIFICATE"
	NotifLeaderboard NotificationType = "LEADERBOARD"
)

type Notification struct {
	ID        string           `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID    string           `gorm:"type:uuid;not null;index" json:"user_id"`
	Title     string           `gorm:"type:varchar(500);not null" json:"title"`
	Body      string           `gorm:"type:text;not null" json:"body"`
	Type      NotificationType `gorm:"type:varchar(30);default:'INFO';not null" json:"type"`
	IsRead    bool             `gorm:"default:false;not null" json:"is_read"`
	Link      *string          `gorm:"type:text" json:"link,omitempty"`
	CreatedAt time.Time        `gorm:"autoCreateTime" json:"created_at"`

	// Associations
	User User `gorm:"foreignKey:UserID" json:"-"`
}

// ─── Discussion ───────────────────────────────────────────────────────────────

type Discussion struct {
	ID         string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	LessonID   *string   `gorm:"type:uuid;index" json:"lesson_id,omitempty"`
	CourseID   *string   `gorm:"type:uuid;index" json:"course_id,omitempty"`
	UserID     string    `gorm:"type:uuid;not null;index" json:"user_id"`
	Title      string    `gorm:"type:varchar(500);not null" json:"title"`
	Body       string    `gorm:"type:text;not null" json:"body"`
	IsPinned   bool      `gorm:"default:false" json:"is_pinned"`
	ReplyCount int       `gorm:"default:0" json:"reply_count"`
	CreatedAt  time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt  time.Time `gorm:"autoUpdateTime" json:"updated_at"`

	// Associations
	User    User              `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Replies []DiscussionReply `gorm:"foreignKey:DiscussionID;constraint:OnDelete:CASCADE" json:"replies,omitempty"`
}

// ─── DiscussionReply ──────────────────────────────────────────────────────────

type DiscussionReply struct {
	ID           string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	DiscussionID string    `gorm:"type:uuid;not null;index" json:"discussion_id"`
	UserID       string    `gorm:"type:uuid;not null;index" json:"user_id"`
	Body         string    `gorm:"type:text;not null" json:"body"`
	IsAccepted   bool      `gorm:"default:false" json:"is_accepted"`
	CreatedAt    time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt    time.Time `gorm:"autoUpdateTime" json:"updated_at"`

	// Associations
	Discussion Discussion `gorm:"foreignKey:DiscussionID" json:"-"`
	User       User       `gorm:"foreignKey:UserID" json:"user,omitempty"`
}

// ─── PasswordResetToken ───────────────────────────────────────────────────────

type PasswordResetToken struct {
	ID        string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID    string    `gorm:"type:uuid;not null;index" json:"user_id"`
	Token     string    `gorm:"type:varchar(255);uniqueIndex;not null" json:"token"`
	ExpiresAt time.Time `gorm:"not null" json:"expires_at"`
	Used      bool      `gorm:"default:false;not null" json:"used"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`

	// Associations
	User User `gorm:"foreignKey:UserID" json:"-"`
}

// ─── EmailVerificationToken ───────────────────────────────────────────────────

type EmailVerificationToken struct {
	ID        string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID    string    `gorm:"type:uuid;not null;index" json:"user_id"`
	Token     string    `gorm:"type:varchar(255);uniqueIndex;not null" json:"token"`
	ExpiresAt time.Time `gorm:"not null" json:"expires_at"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`

	// Associations
	User User `gorm:"foreignKey:UserID" json:"-"`
}

// ─── Plan ─────────────────────────────────────────────────────────────────────

type Plan struct {
	ID           string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Name         string    `gorm:"type:varchar(100);not null" json:"name"`
	Slug         string    `gorm:"type:varchar(100);uniqueIndex;not null" json:"slug"`
	PriceMonthly float64   `gorm:"type:decimal(10,2);default:0" json:"price_monthly"`
	PriceYearly  float64   `gorm:"type:decimal(10,2);default:0" json:"price_yearly"`
	Features     JSONMap   `gorm:"type:jsonb" json:"features,omitempty"`
	MaxCourses   int       `gorm:"default:-1" json:"max_courses"`
	IsActive     bool      `gorm:"default:true;not null" json:"is_active"`

	// Associations
	Subscriptions []Subscription `gorm:"foreignKey:PlanID" json:"-"`
}

// ─── Subscription ─────────────────────────────────────────────────────────────

type SubscriptionStatus string

const (
	SubActive    SubscriptionStatus = "ACTIVE"
	SubCancelled SubscriptionStatus = "CANCELLED"
	SubExpired   SubscriptionStatus = "EXPIRED"
)

type Subscription struct {
	ID                   string             `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID               string             `gorm:"type:uuid;not null;index" json:"user_id"`
	PlanID               string             `gorm:"type:uuid;not null;index" json:"plan_id"`
	Status               SubscriptionStatus `gorm:"type:varchar(20);default:'ACTIVE';not null" json:"status"`
	StartedAt            time.Time          `gorm:"autoCreateTime" json:"started_at"`
	ExpiresAt            *time.Time         `json:"expires_at,omitempty"`
	StripeSubscriptionID string             `gorm:"type:varchar(255)" json:"stripe_subscription_id,omitempty"`

	// Associations
	User User `gorm:"foreignKey:UserID" json:"-"`
	Plan Plan `gorm:"foreignKey:PlanID" json:"plan,omitempty"`
}

// ─── AuditLog ─────────────────────────────────────────────────────────────────

type AuditLog struct {
	ID         string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID     *string   `gorm:"type:uuid;index" json:"user_id,omitempty"`
	Action     string    `gorm:"type:varchar(100);not null" json:"action"`
	EntityType string    `gorm:"type:varchar(100)" json:"entity_type,omitempty"`
	EntityID   string    `gorm:"type:varchar(255)" json:"entity_id,omitempty"`
	Metadata   JSONMap   `gorm:"type:jsonb" json:"metadata,omitempty"`
	IPAddress  string    `gorm:"type:varchar(50)" json:"ip_address,omitempty"`
	CreatedAt  time.Time `gorm:"autoCreateTime" json:"created_at"`

	// Associations
	User *User `gorm:"foreignKey:UserID" json:"-"`
}

// ─── GitHubConnection ─────────────────────────────────────────────────────────

type GitHubConnection struct {
	ID                   string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID               string    `gorm:"type:uuid;uniqueIndex;not null" json:"user_id"`
	GithubUsername       string    `gorm:"type:varchar(100);not null" json:"github_username"`
	GithubID             string    `gorm:"type:varchar(100);not null" json:"github_id"`
	AccessTokenEncrypted string    `gorm:"type:text;not null" json:"-"`
	ConnectedAt          time.Time `gorm:"autoCreateTime" json:"connected_at"`

	// Associations
	User User `gorm:"foreignKey:UserID" json:"-"`
}

// ─── GradingJob ───────────────────────────────────────────────────────────────

type GradingJobStatus string

const (
	GradingQueued    GradingJobStatus = "QUEUED"
	GradingRunning   GradingJobStatus = "RUNNING"
	GradingCompleted GradingJobStatus = "COMPLETED"
	GradingFailed    GradingJobStatus = "FAILED"
)

type GradingJob struct {
	ID           string           `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	SubmissionID string           `gorm:"type:uuid;not null;index" json:"submission_id"`
	Status       GradingJobStatus `gorm:"type:varchar(20);default:'QUEUED';not null" json:"status"`
	StartedAt    *time.Time       `json:"started_at,omitempty"`
	CompletedAt  *time.Time       `json:"completed_at,omitempty"`
	DockerOutput string           `gorm:"type:text" json:"docker_output,omitempty"`
	TestsPassed  int              `gorm:"default:0" json:"tests_passed"`
	TestsTotal   int              `gorm:"default:0" json:"tests_total"`
	CreatedAt    time.Time        `gorm:"autoCreateTime" json:"created_at"`

	// Associations
	Submission Submission `gorm:"foreignKey:SubmissionID" json:"-"`
}
