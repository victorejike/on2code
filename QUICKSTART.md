# ON2CODE Quick Start Guide

## System Overview

A production-ready LMS platform featuring:
- **Backend**: Go + gorilla/mux + JWT auth
- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Auth**: Bcrypt password hashing + JWT tokens
- **API**: `/api/v1` RESTful endpoints for courses, modules, lessons, assignments, submissions, and progress

## Files Modified

### Backend (`backend/main.go`)
- ✅ Full Go API server with auth, courses, modules, lessons, assignments
- ✅ Register/login with bcrypt + JWT token generation
- ✅ In-memory demo data for CS50-style course structure
- ✅ Auto-grading for code submissions
- ✅ User progress and enrollment tracking

### Frontend
- ✅ `app/page.tsx` — CS50-inspired homepage
- ✅ `app/auth/login/page.tsx` — Login with localStorage token storage
- ✅ `app/courses/page.tsx` — Course listing API integration
- ✅ `app/courses/[slug]/page.tsx` — Course detail with modules
- ✅ `app/courses/[slug]/modules/[moduleId]/page.tsx` — Module detail view
- ✅ `app/dashboard/page.tsx` — Student dashboard

### Infrastructure
- ✅ `infra/docker-compose.yml` — Docker compose with backend, frontend, PostgreSQL, Redis, MinIO
- ✅ `backend/Dockerfile` — Go builder + Alpine runtime
- ✅ `frontend/next.config.js` — API URL configuration

## Test Run Instructions

### Option 1: Local Dev Mode (Fastest)

1. **Backend**
   ```bash
   cd backend
   go build ./...
   PORT=4000 ./backend
   ```
   Backend runs at `http://localhost:4000`

2. **Frontend**
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1 npm run dev
   ```
   Frontend runs at `http://localhost:3000`

3. **Test the flow**
   - Visit `http://localhost:3000`
   - Click "Start Learning"
   - Go to `/courses` to see course listing
   - Go to `/auth/login` and use demo credentials:
     - Email: `student@on2code.com`
     - Password: `password`
   - Explore `/dashboard` for progress tracking

### Option 2: Docker Compose (Production-like)

1. **Build and run**
   ```bash
   cd infra
   docker-compose up --build
   ```

2. **Access**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:4000/api/v1`

3. **Services**
   - PostgreSQL: `localhost:5432` (postgres:postgres)
   - Redis: `localhost:6379`
   - MinIO: `localhost:9000`

## API Routes

### Auth
- `POST /api/v1/auth/register` — Create new user
- `POST /api/v1/auth/login` — Get access token
- `GET /api/v1/auth/me` — Get current user (requires Bearer token)

### Courses
- `GET /api/v1/courses` — List all courses
- `GET /api/v1/courses/{id}` — Get course with modules/lessons
- `GET /api/v1/courses/{id}/modules` — Get modules for course
- `GET /api/v1/courses/{id}/modules/{moduleId}` — Get specific module
- `GET /api/v1/courses/{id}/modules/{moduleId}/lessons/{lessonId}` — Get lesson
- `POST /api/v1/courses/{id}/enroll` — Enroll in course (authenticated)

### Assignments & Submissions
- `GET /api/v1/assignments/{id}` — Get assignment details
- `POST /api/v1/assignments/{id}/submit` — Submit code (authenticated)
- `GET /api/v1/users/{id}/submissions` — Get user's submissions
- `GET /api/v1/users/{id}/progress` — Get user's progress

## Demo Data

### Course
- **ID**: `cs50x-2021`
- **Slug**: `cs50x-2021`
- **Title**: CS50x 2021
- **Modules**: Week 0 (Scratch), Week 1 (C), Week 2 (Arrays)

### Demo User
- **Email**: `student@on2code.com`
- **Password**: `password`
- **Enrollment**: None (enroll via `/api/v1/courses/cs50x-2021/enroll`)

## Development Workflow

### Adding New Course
Edit `backend/main.go` in the `init()` function and add to `demoCourses` slice.

### Adding New Assignment
Edit `backend/main.go` and add to `demoAssignments` slice.

### Frontend API Fetch
All frontend components use `process.env.NEXT_PUBLIC_API_URL` from `next.config.js`.

```typescript
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
```

### Protected Routes (Auth Required)
Include `Authorization: Bearer <token>` header:

```typescript
fetch(`${API_URL}/auth/me`, {
  headers: { 'Authorization': `Bearer ${token}` }
})
```

## Next Steps

1. **Database Integration**: Replace demo data with real PostgreSQL queries
2. **Environment Config**: Move secrets to `.env` files
3. **Video Platform**: Integrate Vimeo/YouTube for lesson videos
4. **Code IDE**: Add Monaco Editor browser-based coding environment
5. **Payment System**: Stripe integration for course enrollment fees
6. **Real Grading**: Implement sandbox runner for code execution
7. **Certificates**: PDF generation and QR verification

## Troubleshooting

### Backend compile error
Ensure Go 1.22+ and bcrypt dependency:
```bash
go mod tidy
go mod download
```

### Frontend npm install fails
Use legacy peer deps for compatibility:
```bash
npm install --legacy-peer-deps
```

### CORS errors
Verify CORS middleware in `backend/main.go` allows origin.

### API URL mismatch
Check `frontend/next.config.js` and environment variable `NEXT_PUBLIC_API_URL`.

## Architecture

```
ON2CODE
├── Backend (Go) — RESTful API, Auth, LMS Logic
├── Frontend (Next.js) — UI, Client-side routes, Token storage
├── Database (PostgreSQL) — Persistent data (future)
├── Cache (Redis) — Session, rate-limiting (future)
└── Storage (MinIO) — Course videos, assignments (future)
```

---

**Status**: MVP ready for testing. Full production features (real grading, video platform, payment) pending.
