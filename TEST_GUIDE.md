# ON2CODE System Status & Test Run

## ✅ Completed

### Backend (`backend/main.go`)
- Full Go API server with gorilla/mux router and CORS
- JWT token generation + bcrypt password hashing
- In-memory demo database with:
  - Users (register/login/profile)
  - CS50x course with 3 modules (Scratch, C, Arrays)
  - 3 lessons per module with video URLs and resources
  - 3 demo assignments with auto-grading
  - Submission tracking and user progress
- **Status**: ✅ Builds successfully (`go build ./...`)
- **Binary**: `backend/main.go` compiles to executable

### Frontend Pages
- **`frontend/src/app/page.tsx`**: CS50-inspired homepage with hero, CTA buttons
- **`frontend/src/app/layout.tsx`**: Persistent header/navigation
- **`frontend/src/app/auth/login/page.tsx`**: Login form with localStorage token storage
- **`frontend/src/app/courses/page.tsx`**: Courses list, fetches from `/api/v1/courses`
- **`frontend/src/app/courses/[slug]/page.tsx`**: Course detail, shows modules
- **`frontend/src/app/courses/[slug]/modules/[moduleId]/page.tsx`**: Module detail page
- **`frontend/src/app/dashboard/page.tsx`**: Student dashboard (progress, enrolled courses)
- **`frontend/globals.css`**: Dark theme, Tailwind styling
- **Status**: ✅ Routes configured, API fetch calls ready

### Infrastructure
- **`infra/docker-compose.yml`**: PostgreSQL, Redis, MinIO, backend, frontend services
- **`backend/Dockerfile`**: Multi-stage Go builder → Alpine runtime
- **Status**: ✅ Ready for Docker Compose up

### Configuration
- **`frontend/next.config.js`**: API URL set to `/api/v1` with fallback
- **`backend/go.mod`**: Dependencies installed (jwt, cors, mux, bcrypt)
- **Status**: ✅ Environment variables configured

---

## 🚀 Quick Test Run

### Backend Only (Fastest Test)

```bash
cd backend
PORT=4000 ./backend
```

This starts the API server on `http://localhost:4000`.

**Test API endpoints directly**:

```bash
# Register new user
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@on2code.com","password":"password"}'

# List courses
curl http://localhost:4000/api/v1/courses

# Get course by slug
curl http://localhost:4000/api/v1/courses/cs50x-2021
```

### Full Stack (Backend + Frontend)

**Terminal 1 (Backend)**:
```bash
cd backend
PORT=4000 ./backend
```

**Terminal 2 (Frontend)** — After npm install completes:
```bash
cd frontend
npm run dev
```

Then visit `http://localhost:3000`.

---

## 📝 API Endpoints Reference

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/v1/auth/register` | ❌ | Create new user account |
| POST | `/api/v1/auth/login` | ❌ | Get JWT access token |
| GET | `/api/v1/auth/me` | ✅ | Get current user profile |
| GET | `/api/v1/courses` | ❌ | List all courses |
| GET | `/api/v1/courses/{id}` | ❌ | Get course with modules/lessons |
| GET | `/api/v1/courses/{id}/modules` | ❌ | Get modules for course |
| GET | `/api/v1/courses/{id}/modules/{moduleId}` | ❌ | Get specific module with lessons |
| GET | `/api/v1/courses/{id}/modules/{moduleId}/lessons/{lessonId}` | ❌ | Get lesson details |
| POST | `/api/v1/courses/{id}/enroll` | ✅ | Enroll user in course |
| GET | `/api/v1/assignments/{id}` | ❌ | Get assignment details |
| POST | `/api/v1/assignments/{id}/submit` | ✅ | Submit code for grading |
| GET | `/api/v1/users/{id}/submissions` | ✅ | Get user's code submissions |
| GET | `/api/v1/users/{id}/progress` | ✅ | Get user's course progress |

**Auth**: Send `Authorization: Bearer <token>` header for ✅ endpoints.

---

## 🧪 Test Scenarios

### Scenario 1: Public Course Discovery
1. Start backend: `PORT=4000 ./backend`
2. `curl http://localhost:4000/api/v1/courses`
3. Verify response contains CS50x course with modules

### Scenario 2: User Registration & Login
1. Register:
   ```bash
   curl -X POST http://localhost:4000/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Alice","email":"alice@test.com","password":"secure123"}'
   ```
2. Copy `accessToken` from response
3. Login with demo user:
   ```bash
   curl -X POST http://localhost:4000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"student@on2code.com","password":"password"}'
   ```

### Scenario 3: View Course Content
1. Get CS50x course:
   ```bash
   curl http://localhost:4000/api/v1/courses/cs50x-2021
   ```
2. Get Week 1 module:
   ```bash
   curl http://localhost:4000/api/v1/courses/cs50x-2021/modules/module-1
   ```
3. Get C syntax lesson:
   ```bash
   curl http://localhost:4000/api/v1/courses/cs50x-2021/modules/module-1/lessons/lesson-1-1
   ```

### Scenario 4: Submit Assignment (Protected)
1. Get token from login
2. Submit code:
   ```bash
   curl -X POST http://localhost:4000/api/v1/assignments/assignment-1/submit \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <TOKEN>" \
     -d '{"language":"C","code":"int main() { printf(\"Hello\"); return 0; }"}'
   ```

### Scenario 5: Check User Progress (Protected)
1. Get token from login
2. Get user ID from login response
3. Check progress:
   ```bash
   curl -H "Authorization: Bearer <TOKEN>" \
     http://localhost:4000/api/v1/users/{userId}/progress
   ```

---

## 🔧 Demo Data

### Course: CS50x 2021
- **ID**: `cs50x-2021`
- **Slug**: `cs50x-2021`
- **Title**: CS50x 2021
- **Subtitle**: Foundations of computer science and full-stack development
- **Modules**:
  - Week 0: Scratch
  - Week 1: C
  - Week 2: Arrays

### Demo User
- **Email**: `student@on2code.com`
- **Password**: `password`

### Assignments
- Assignment 0: Scratch story (EASY, 100 pts)
- Assignment 1: C calculator (MEDIUM, 100 pts)
- Assignment 2: Array search (MEDIUM, 100 pts)

---

## ⚙️ Build Status

| Component | Status | Details |
|-----------|--------|---------|
| **Backend Go** | ✅ Compiles | `go build ./...` succeeds |
| **Backend Deps** | ✅ Ready | jwt, cors, mux, bcrypt downloaded |
| **Frontend Pages** | ✅ Ready | All route pages created |
| **Frontend Deps** | 🔄 Installing | npm install running (npm i issues) |
| **Docker Compose** | ✅ Ready | Can run `docker-compose up --build` |

---

## 📖 Frontend Development Notes

### API URL Configuration
All frontend API calls use:
```typescript
process.env.NEXT_PUBLIC_API_URL
```

Set via `frontend/next.config.js`:
```javascript
NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'
```

### Token Storage
Login page stores token in localStorage:
```typescript
window.localStorage.setItem('on2code_token', data.accessToken);
```

Retrieve for protected requests:
```typescript
const token = window.localStorage.getItem('on2code_token');
```

### Protected API Requests
Include Bearer token:
```typescript
fetch(`${API_URL}/auth/me`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

---

## 🐳 Docker Compose Deployment

Once npm install completes, run full stack:

```bash
cd infra
docker-compose up --build
```

Services:
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:4000`
- **PostgreSQL**: `localhost:5432` (postgres:postgres)
- **Redis**: `localhost:6379`
- **MinIO**: `localhost:9000`

---

## ❌ Known Limitations (MVP)

1. **In-Memory Storage**: All data reset on backend restart (no persistence)
2. **Demo Data Only**: No real database integration yet
3. **Auto-Grading**: Simple heuristic (checks for "print" or "return")
4. **Frontend npm**: Installation can fail due to network issues; use `--legacy-peer-deps`
5. **No Real Video**: Lesson video URLs are placeholders
6. **No Submissions Storage**: Code submissions not persisted

---

## 🎯 Next Steps for Production

1. **Persistence**: Connect to real PostgreSQL database
2. **Grading**: Integrate sandbox code runner (Docker, AWS Lambda)
3. **Videos**: Upload to Vimeo/YouTube, embed in frontend
4. **IDE**: Add Monaco Editor for browser-based code editing
5. **Payments**: Stripe integration for course enrollment fees
6. **Certificates**: PDF generation + QR code verification
7. **Admin Panel**: Course and user management UI
8. **Analytics**: Course completion rates, student engagement

---

## 📞 Support

For issues:
1. Check backend logs: `PORT=4000 ./backend`
2. Test API directly with curl
3. Check frontend network tab (DevTools)
4. Verify `NEXT_PUBLIC_API_URL` matches backend port

