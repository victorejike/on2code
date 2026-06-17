# On2Code Architecture and Product Blueprint

## 1. Executive Summary

On2Code is designed as a modular, enterprise-grade coding education platform built for long-term growth and future mobile expansion.

Core principles:
- API-first backend with Next.js frontend and future React Native / Flutter mobile compatibility
- Secure, scalable microservices-style backend
- Production-ready data model and sandboxed code execution
- Modern UX with dark/light themes, responsive layouts, and AI-assisted learning
- Full DevOps foundation using Docker, Docker Compose, cloud-ready infrastructure, and Kubernetes-ready design

This document defines the architecture, schema, APIs, folder structure, security model, scaling plan, and MVP roadmap.

---

## 2. System Architecture

### 2.1 Logical Layers

- **Presentation Layer**: Next.js frontend, Tailwind CSS, shadcn/ui, React Query, Zustand, Monaco Editor
- **API Layer**: NestJS REST API, versioned endpoints, authentication, authorization, validation, Swagger
- **Domain Layer**: business services, RBAC, course engine, grading engine, progress engine, AI tutor integration
- **Integration Layer**: PostgreSQL, Redis, S3-compatible storage, message queue, audit logs
- **Execution Layer**: code execution sandbox worker fleet running in isolated Docker containers controlled by a queue
- **Observability Layer**: logging, metrics, tracing, error reporting, alerting

### 2.2 Deployment Topology

- `frontend/`: Next.js statically generated and server-rendered experience
- `backend/`: NestJS API server with modules for auth, courses, grading, progress, admin, AI, notifications
- `sandbox-worker/`: isolated execution workers that run code in Docker sandbox environments
- `infra/`: Docker Compose, environment, and Kubernetes-ready manifests
- `db/`: PostgreSQL primary, replica pattern, backups
- `cache/`: Redis for session state, rate limiting, task queue, leaderboard, AI response caching
- `storage/`: AWS S3-compatible secure object storage for media, certificates, course assets

### 2.3 Execution Flow

1. Frontend calls `/api/v1/...` endpoints.
2. Backend validates request, authenticates user, and enforces RBAC.
3. Backend persists state to PostgreSQL and caches to Redis.
4. For code runs / grading, backend enqueues requests into Redis / queue system.
5. Worker service consumes the queue, launches sandboxed container, executes code, captures output, enforces limits, and stores results.
6. Backend returns run status and final grade via polling or WebSocket updates.

---

## 3. Database Schema

### 3.1 Core Entities

- `users`
- `roles`
- `permissions`
- `user_roles`
- `courses`
- `modules`
- `lessons`
- `lectures`
- `lecture_notes`
- `code_examples`
- `assignments`
- `assignment_starter_code`
- `assignment_test_cases`
- `submissions`
- `submission_results`
- `quizzes`
- `quiz_questions`
- `question_options`
- `quiz_attempts`
- `quiz_answers`
- `progress_records`
- `certificates`
- `badges`
- `achievements`
- `leaderboards`
- `comments`
- `notifications`
- `oauth_accounts`
- `sessions`
- `audit_logs`

### 3.2 Example Schema Outline

#### users
- `id` UUID PK
- `email` TEXT UQ
- `name` TEXT
- `password_hash` TEXT
- `locale` TEXT
- `profile_photo_url` TEXT
- `is_verified` BOOL
- `status` ENUM(`active`,`suspended`,`deleted`)
- `created_at`, `updated_at`

#### roles
- `id` UUID PK
- `name` TEXT UQ (`student`, `instructor`, `admin`)
- `description` TEXT

#### courses
- `id` UUID PK
- `slug` TEXT UQ
- `title` TEXT
- `subtitle` TEXT
- `description` TEXT
- `language` TEXT
- `level` ENUM(`beginner`,`intermediate`,`advanced`)
- `status` ENUM(`draft`,`published`,`archived`)
- `published_at`
- `instructor_id` FK users
- `learning_path` JSONB
- `metadata` JSONB
- `created_at`, `updated_at`

#### modules
- `id` UUID PK
- `course_id` FK courses
- `title` TEXT
- `description` TEXT
- `position` INT
- `created_at`, `updated_at`

#### lectures
- `id` UUID PK
- `module_id` FK modules
- `title` TEXT
- `summary` TEXT
- `video_url` TEXT
- `transcript_url` TEXT
- `notes` TEXT
- `duration_seconds` INT
- `position` INT
- `created_at`, `updated_at`

#### assignments
- `id` UUID PK
- `lecture_id` FK lectures
- `title` TEXT
- `description` TEXT
- `difficulty` ENUM(`easy`,`medium`,`hard`)
- `languages` TEXT[]
- `starter_code` JSONB
- `grading_policy` JSONB
- `max_score` INT
- `passing_score` INT
- `created_at`, `updated_at`

#### submissions
- `id` UUID PK
- `assignment_id` FK assignments
- `user_id` FK users
- `language` TEXT
- `code` TEXT
- `status` ENUM(`pending`,`running`,`passed`,`failed`,`error`)
- `score` INT
- `output` JSONB
- `started_at`, `completed_at`

#### progress_records
- `id` UUID PK
- `user_id` FK users
- `course_id` FK courses
- `module_id` FK modules NULLABLE
- `lecture_id` FK lectures NULLABLE
- `assignment_id` FK assignments NULLABLE
- `quiz_id` FK quizzes NULLABLE
- `completed` BOOL
- `progress_value` NUMERIC
- `updated_at`

#### certificates
- `id` UUID PK
- `user_id` FK users
- `course_id` FK courses
- `certificate_url` TEXT
- `issued_at`
- `expires_at` NULLABLE

#### audit_logs
- `id` UUID PK
- `actor_id` FK users
- `action` TEXT
- `resource_type` TEXT
- `resource_id` UUID
- `ip_address` TEXT
- `meta` JSONB
- `created_at`

### 3.3 Indexing and Performance

- Unique indexes on `users.email`, `courses.slug`, `roles.name`
- Partial indexes on active content and published courses
- Foreign-key indexes for `modules.course_id`, `lectures.module_id`, `assignments.lecture_id`
- GIN indexes for JSONB metadata and search fields
- Materialized views for leaderboards and course analytics
- Connection pooling with PgBouncer in production

---

## 4. API Specifications

### 4.1 Versioned API Pattern

All endpoints live under `/api/v1/`
- `/api/v1/auth/...`
- `/api/v1/users/...`
- `/api/v1/courses/...`
- `/api/v1/lectures/...`
- `/api/v1/assignments/...`
- `/api/v1/submissions/...`
- `/api/v1/quizzes/...`
- `/api/v1/progress/...`
- `/api/v1/certificates/...`
- `/api/v1/gamification/...`
- `/api/v1/comments/...`
- `/api/v1/admin/...`

### 4.2 Authentication / Authorization

- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`
- POST `/api/v1/auth/logout`
- POST `/api/v1/auth/refresh`
- POST `/api/v1/auth/password/forgot`
- POST `/api/v1/auth/password/reset`
- GET `/api/v1/auth/verify-email?token=...`
- POST `/api/v1/auth/oauth/google`
- POST `/api/v1/auth/oauth/github`

### 4.3 Courses and Content

- GET `/api/v1/courses`
- GET `/api/v1/courses/:courseId`
- GET `/api/v1/courses/:courseId/modules`
- GET `/api/v1/courses/:courseId/progress`
- POST `/api/v1/courses/:courseId/enroll`
- GET `/api/v1/courses/:courseId/lectures/:lectureId`
- GET `/api/v1/lectures/:lectureId/content`

### 4.4 Assignments and Grading

- GET `/api/v1/assignments/:assignmentId`
- POST `/api/v1/assignments/:assignmentId/submit`
- GET `/api/v1/submissions/:submissionId`
- GET `/api/v1/users/:userId/submissions`
- GET `/api/v1/assignments/:assignmentId/results`

### 4.5 Quiz System

- GET `/api/v1/quizzes/:quizId`
- POST `/api/v1/quizzes/:quizId/attempt`
- GET `/api/v1/quizzes/:quizId/results`
- GET `/api/v1/users/:userId/quiz-attempts`

### 4.6 Progress and Achievements

- GET `/api/v1/progress/course/:courseId`
- GET `/api/v1/progress/user/:userId`
- GET `/api/v1/gamification/leaderboard`
- GET `/api/v1/gamification/badges`

### 4.7 Discussion and AI

- GET `/api/v1/comments?targetType=lecture&targetId=...`
- POST `/api/v1/comments`
- PATCH `/api/v1/comments/:commentId`
- POST `/api/v1/ai/tutor/question`
- POST `/api/v1/ai/tutor/review-code`
- POST `/api/v1/ai/tutor/hint`

### 4.8 Admin APIs

- GET `/api/v1/admin/users`
- PATCH `/api/v1/admin/users/:userId`
- GET `/api/v1/admin/courses`
- PATCH `/api/v1/admin/courses/:courseId`
- GET `/api/v1/admin/audit-logs`
- POST `/api/v1/admin/settings`

### 4.9 API Contracts

- Use DTO validation with `class-validator` and `class-transformer`
- Return structured responses: `{ data, errors, meta }`
- Standardize error codes and pagination metadata
- Support query filters, sorting, and cursor-based pagination
- Provide OpenAPI docs via Swagger in NestJS

---

## 5. Frontend Architecture

### 5.1 Technical Stack

- `frontend/`: Next.js + TypeScript
- Styling: Tailwind CSS, shadcn/ui primitives
- State: Zustand for global state, React Query for server state
- Editor: Monaco Editor for code playground and assignments
- Forms: React Hook Form + zod validation
- Authentication: JWT stored in cookies, secure HttpOnly refresh token flow
- Data fetching: API client with centralized fetch / axios wrapper
- Mobile-first responsive design with dark/light mode

### 5.2 Major Modules

- `app/auth/` — login, register, forgot/reset, verify email
- `app/dashboard/` — student overview, progress, achievements
- `app/courses/` — course catalog, search, course detail
- `app/learning/` — lecture page, notes, playground
- `app/assignments/` — submission workflows, feedback
- `app/quizzes/` — attempt interface, review screens
- `app/profile/` — user settings, certificates
- `app/admin/` — instructor/admin portals
- `components/` — design system, cards, tables, modals, shell
- `lib/` — API client, auth utilities, hooks, state management
- `components/editor/` — sandbox editor, run button, output console

### 5.3 UI Patterns

- Global app shell with header, sidebar, responsive drawer
- Dark / light toggle with local storage persistence
- Data-rich dashboard cards and chart widgets
- Lecture experience split into video + notes + code playground
- Assignment experience with starter code and grading details
- Quiz experience with progressive reveal and instant scoring
- Progress bars for courses / modules / lessons
- Badge and certificate cards with download buttons

### 5.4 Mobile Compatibility

- Use shared API contracts for web + future mobile
- Keep UI state separate from backend concerns
- Use responsive grids and adaptive navigation patterns
- Define mobile-specific page variants in architecture

---

## 6. Backend Architecture

### 6.1 NestJS Module Layout

- `src/app.module.ts`
- `src/auth/auth.module.ts`
- `src/users/users.module.ts`
- `src/courses/courses.module.ts`
- `src/lectures/lectures.module.ts`
- `src/assignments/assignments.module.ts`
- `src/submissions/submissions.module.ts`
- `src/quizzes/quizzes.module.ts`
- `src/progress/progress.module.ts`
- `src/certificates/certificates.module.ts`
- `src/gamification/gamification.module.ts`
- `src/comments/comments.module.ts`
- `src/notifications/notifications.module.ts`
- `src/ai/ai.module.ts`
- `src/admin/admin.module.ts`
- `src/shared/database.module.ts`
- `src/shared/cache.module.ts`
- `src/shared/logger.module.ts`
- `src/shared/validation.pipe.ts`
- `src/shared/rbac.guard.ts`

### 6.2 Core Services

- AuthService: email auth, social login, JWT, refresh tokens
- UsersService: user profiles, roles, permissions
- CoursesService: course creation, module ordering
- LecturesService: lecture content, notes, transcripts
- AssignmentsService: evaluation definitions, starter assets
- SubmissionsService: queue requests, result aggregation
- QuizzesService: scoring and feedback
- ProgressService: completion tracking and statistics
- CertificatesService: certificate issuance and storage
- GamificationService: XP, badge rules, leaderboard calculations
- CommentsService: threaded discussion and moderation
- AIService: OpenAI integration adapters, prompt templates
- SandboxService: submission queueing and worker orchestration

### 6.3 Security and Middleware

- Global validation pipe with whitelist and transform
- JWT Auth guard and refresh token guard
- RBAC guard with permission metadata
- Rate-limit middleware on auth and submission endpoints
- Helmet for headers and CSP
- CORS configured for allowed origins
- Request logging and audit event interceptors
- Sanitization helpers for HTML content

---

## 7. Recommended Folder Structure

```
no2code/
├── ARCHITECTURE.md
├── backend/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── auth/
│   │   ├── users/
│   │   ├── courses/
│   │   ├── lectures/
│   │   ├── assignments/
│   │   ├── submissions/
│   │   ├── quizzes/
│   │   ├── progress/
│   │   ├── certificates/
│   │   ├── gamification/
│   │   ├── comments/
│   │   ├── notifications/
│   │   ├── ai/
│   │   ├── shared/
│   │   └── config/
│   ├── prisma/ or orm/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── Dockerfile
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── hooks/
│   │   ├── styles/
│   │   └── pages/ or app/
│   ├── package.json
│   └── tsconfig.json
├── infra/
│   ├── docker-compose.yml
│   ├── env.example
│   ├── k8s/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── ingress.yaml
│   │   ├── configmap.yaml
│   │   ├── secret.yaml
│   │   └── cronjob.yaml
│   └── terraform/ (future)
└── README.md
```

---

## 8. UI Page Structure

### 8.1 Public / Marketing
- `/` - Home / landing page
- `/courses` - course catalog
- `/courses/:slug` - course detail
- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`
- `/auth/reset-password`

### 8.2 Student Experience
- `/dashboard`
- `/dashboard/courses`
- `/courses/:slug/learn`
- `/courses/:slug/modules/:moduleId/lectures/:lectureId`
- `/assignments/:assignmentId`
- `/quizzes/:quizId`
- `/profile`
- `/certificates`
- `/leaderboard`

### 8.3 Instructor / Admin
- `/instructor/courses`
- `/instructor/courses/:slug/edit`
- `/instructor/courses/:slug/modules/new`
- `/instructor/assignments`
- `/admin/users`
- `/admin/analytics`
- `/admin/settings`

---

## 9. Component Hierarchy

### 9.1 Shared Components
- `AppShell`
- `Header`
- `Sidebar`
- `PageHeader`
- `Card`
- `Button`
- `Modal`
- `Tabs`
- `ProgressBar`
- `Badge`
- `Avatar`
- `Table`
- `Alert`

### 9.2 Learning Components
- `CourseCard`
- `LectureCard`
- `CourseProgressPanel`
- `VideoPlayer`
- `LectureNotes`
- `CodePlayground`
- `AssignmentEditor`
- `QuizQuestion`
- `CertificateCard`
- `LeaderboardTable`
- `DiscussionThread`

### 9.3 Data / State Components
- `AuthProvider`
- `ApiClient`
- `useAuth`
- `useCourseQuery`
- `useSubmissionMutation`
- `useProgressTracker`
- `useTheme`

---

## 10. Docker Setup

### 10.1 Core Containers

- `backend`: NestJS API
- `frontend`: Next.js app
- `db`: PostgreSQL
- `cache`: Redis
- `storage`: localstack / minio (development)
- `sandbox-worker`: code execution worker

### 10.2 Docker Compose Pattern

- `docker-compose.yml` orchestrates app services, database, cache, and local object storage
- `backend/Dockerfile` is multi-stage and optimized for production
- `frontend/Dockerfile` builds static assets and serves them using Next.js or a lightweight web server
- `infra/env.example` defines environment variables, secrets, database URIs, token keys, S3 credentials

### 10.3 Kubernetes Readiness

- Use config maps and secrets
- Separate `Deployment`, `Service`, `Ingress`, `HorizontalPodAutoscaler`
- Use persistent volumes for PostgreSQL and MinIO in staging
- Use jobs/cronjobs for backups and report generation

---

## 11. Security Architecture

### 11.1 Authentication
- JWT access tokens with short TTL
- HttpOnly secure refresh tokens
- OAuth login via Google and GitHub
- Email verification and password reset flows

### 11.2 Authorization
- RBAC based on roles and permissions
- `@Roles()` metadata in Nest controllers
- Admin and instructor scopes enforced at route level

### 11.3 Data Protection
- Parameterized queries / ORM protections against SQL injection
- Input validation and sanitization on all DTOs
- Content policy and escaping for comment/discussion content

### 11.4 Runtime Security
- Rate limiting for auth, grading, AI, submission endpoints
- Request size limits and JSON payload limits
- CSRF protection for browser-based flows
- Secure headers with Helmet
- CORS restricted to frontend domains

### 11.5 Sandbox Security
- Sandbox worker runs code in separate containers
- CPU, memory, and wall-clock limits enforced
- Network disabled inside execution container
- Containers destroyed after each run
- Submission artifacts stored only if safe

### 11.6 Infrastructure Security
- Secrets in environment variables / vault / Kubernetes secrets
- Database credentials and S3 keys never committed
- Audit logs for all admin actions
- Vulnerability scanning in CI

---

## 12. Scaling Strategy

### 12.1 Horizontal Scaling

- Stateless backend pods behind load balancer
- Frontend served from CDN or edge network
- Database read replicas for analytics and reporting
- Redis cluster for caching, session limits, queue state
- Sandbox workers scaled by queue depth

### 12.2 Performance

- Redis caching for course catalog, user dashboard data, leaderboard
- Use server-side rendering for key pages and incremental static regeneration for marketing pages
- Background jobs for certificate generation, email delivery, leaderboard calculations
- Query optimization and indexes for progress and submission queries

### 12.3 Resilience

- Health checks for API and worker services
- Circuit breakers on downstream dependencies
- Job retries and dead-letter queue for failed sandbox tasks
- Observability with logs, metrics, alerts

---

## 13. Development Roadmap

### 13.1 MVP Scope

- User registration/login/email verification
- Course catalog and enrollment
- Lecture viewing with notes and video placeholders
- Interactive code playground with JS/TS and sandboxed execution
- Assignment submission and grading queue
- Progress tracker and basic dashboard
- Certificate issuance for course completion
- RBAC for student/instructor/admin
- Docker Compose local dev environment

### 13.2 Phase 2

- Quiz engine and scoring
- Discussion threads and moderation
- Gamification with XP, streaks, badges
- AI tutor question and code review flows
- Social login and refresh token management
- PostgreSQL optimization and caching

### 13.3 Phase 3

- Production-grade scaling and Kubernetes deployment
- Full media storage and S3 asset support
- Advanced analytics and instructor dashboards
- Mobile app readiness and API stabilization
- OpenAI integration and AI tutor enhancement

---

## 14. Production Deployment Plan

### 14.1 Stages
- `development` — Docker Compose local workbench
- `staging` — near-production environment with real database and object storage
- `production` — Kubernetes cluster or managed cloud service

### 14.2 CI/CD
- `frontend` build, lint, test, static analysis
- `backend` build, lint, unit tests, integration tests
- `sandbox-worker` build and security scan
- Deploy to staging on merge to `main`
- Promote to production after manual review and smoke testing

### 14.3 Observability
- Central logging using ELK / Loki
- Metrics via Prometheus / Grafana
- Error reporting via Sentry or similar
- Alerting for CPU, memory, error-rate, queue lag

### 14.4 Backups and DR
- Nightly PostgreSQL backups to object storage
- Regular Redis snapshot backups
- Automated certificate and content backups
- Restore playbooks for database, storage, and service recovery

---

## 15. Recommended Immediate Actions

1. Create the backend NestJS scaffold with the module layout above.
2. Create the frontend Next.js app with the shared UI component architecture.
3. Add Docker Compose and local object storage support.
4. Build core database schema and initial seed data.
5. Implement auth, courses, and sandbox submission workflow as MVP.

This architecture is designed to deliver a polished, scalable, secure, and extensible On2Code platform that can evolve into a global learning system.
