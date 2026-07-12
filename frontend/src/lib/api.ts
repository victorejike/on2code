import { getToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  avatar?: string;
  bio?: string;
  githubUsername?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  xp: number;
  level: number;
  streak: number;
  emailVerified: boolean;
  hasActiveSubscription?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  price: number;
  thumbnail?: string;
  instructorId: string;
  instructor?: User;
  published: boolean;
  enrollmentCount: number;
  totalLessons: number;
  totalDuration: number;
  rating?: number;
  tags: string[];
  requirements: string[];
  objectives: string[];
  modules?: Module[];
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  videoUrl?: string;
  notes?: string;
  transcript?: string;
  duration?: number;
  order: number;
  isFree: boolean;
  completed?: boolean;
  quiz?: Quiz;
  assignment?: Assignment;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  lessonId: string;
  title: string;
  url: string;
  type: 'FILE' | 'LINK' | 'VIDEO';
}

export interface Quiz {
  id: string;
  lessonId?: string;
  courseId?: string;
  title: string;
  description?: string;
  timeLimit?: number;
  passingScore: number;
  allowRetry: boolean;
  questions: Question[];
  createdAt: string;
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_BLANK' | 'CODE_OUTPUT';
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  order: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  passed: boolean;
  answers: Record<string, string>;
  completedAt: string;
  timeTaken?: number;
}

export interface Assignment {
  id: string;
  lessonId?: string;
  courseId?: string;
  title: string;
  description: string;
  instructions: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  dueDate?: string;
  maxScore: number;
  rubric?: string;
  starterCode?: string;
  language?: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  userId: string;
  code?: string;
  githubUrl?: string;
  score?: number;
  feedback?: string;
  status: 'PENDING' | 'GRADED' | 'REJECTED';
  createdAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  course?: Course;
  issuedAt: string;
  verifyUrl: string;
  certificateNumber: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  course?: Course;
  progress: number;
  completedLessons: string[];
  lastLessonId?: string;
  enrolledAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface Discussion {
  id: string;
  courseId?: string;
  lessonId?: string;
  userId: string;
  user?: User;
  title: string;
  body: string;
  category: 'QUESTION' | 'SHOWCASE' | 'STUDY_GROUP' | 'GENERAL';
  tags: string[];
  replyCount: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Reply {
  id: string;
  discussionId: string;
  userId: string;
  user?: User;
  body: string;
  isAccepted: boolean;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  user: User;
  xp: number;
  streak: number;
  coursesCompleted: number;
}

export interface AdminStats {
  totalUsers: number;
  activeStudents: number;
  totalRevenue: number;
  coursesPublished: number;
  enrollmentsThisMonth: number;
  submissionsThisWeek: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Base fetch function
async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = `HTTP ${response.status}`;
    try {
      const err = await response.json();
      errorMsg = err.message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  return response.json();
}

// ─── AUTH ───────────────────────────────────────────────────────────────────

export const authApi = {
  login: (email: string, password: string) =>
    apiFetch<ApiResponse<{ token: string; refreshToken: string; user: User }>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    apiFetch<ApiResponse<{ token: string; refreshToken: string; user: User }>>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  logout: () =>
    apiFetch<ApiResponse<null>>('/auth/logout', { method: 'POST' }),

  me: () =>
    apiFetch<ApiResponse<User>>('/auth/me'),

  refreshToken: (refreshToken: string) =>
    apiFetch<ApiResponse<{ token: string }>>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }),

  forgotPassword: (email: string) =>
    apiFetch<ApiResponse<null>>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token: string, password: string) =>
    apiFetch<ApiResponse<null>>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    }),

  verifyEmail: (token: string) =>
    apiFetch<ApiResponse<null>>('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),

  resendVerification: (email: string) =>
    apiFetch<ApiResponse<null>>('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

// ─── COURSES ─────────────────────────────────────────────────────────────────

export const coursesApi = {
  list: (params?: { level?: string; search?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return apiFetch<ApiResponse<Course[]>>(`/courses${query ? `?${query}` : ''}`);
  },

  getBySlug: (slug: string) =>
    apiFetch<ApiResponse<Course>>(`/courses/${slug}`),

  enroll: (courseId: string) =>
    apiFetch<ApiResponse<Enrollment>>(`/courses/${courseId}/enroll`, { method: 'POST' }),

  getProgress: (courseId: string) =>
    apiFetch<ApiResponse<Enrollment>>(`/courses/${courseId}/progress`),

  curriculum: (slug: string) =>
    apiFetch<ApiResponse<Module[]>>(`/courses/${slug}/curriculum`),

  getEnrolled: () =>
    apiFetch<ApiResponse<Enrollment[]>>('/courses/enrolled'),

  search: (query: string) =>
    apiFetch<ApiResponse<Course[]>>(`/courses/search?q=${encodeURIComponent(query)}`),
};

// ─── LESSONS ─────────────────────────────────────────────────────────────────

export const lessonsApi = {
  get: (lessonId: string) =>
    apiFetch<ApiResponse<Lesson>>(`/lessons/${lessonId}`),

  complete: (lessonId: string) =>
    apiFetch<ApiResponse<{ xpEarned: number }>>(`/lessons/${lessonId}/complete`, { method: 'POST' }),

  getDiscussions: (lessonId: string) =>
    apiFetch<ApiResponse<Discussion[]>>(`/lessons/${lessonId}/discussions`),
};

// ─── QUIZZES ─────────────────────────────────────────────────────────────────

export const quizzesApi = {
  get: (quizId: string) =>
    apiFetch<ApiResponse<Quiz>>(`/quizzes/${quizId}`),

  startAttempt: (quizId: string) =>
    apiFetch<ApiResponse<QuizAttempt>>(`/quizzes/${quizId}/attempt`, { method: 'POST' }),

  submitAttempt: (quizId: string, answers: Record<string, string>) =>
    apiFetch<ApiResponse<QuizAttempt>>(`/quizzes/${quizId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    }),

  getAttempts: (quizId: string) =>
    apiFetch<ApiResponse<QuizAttempt[]>>(`/quizzes/${quizId}/attempts`),
};

// ─── ASSIGNMENTS ─────────────────────────────────────────────────────────────

export const assignmentsApi = {
  get: (id: string) =>
    apiFetch<ApiResponse<Assignment>>(`/assignments/${id}`),

  submit: (id: string, data: { code?: string; githubUrl?: string; language?: string }) =>
    apiFetch<ApiResponse<Submission>>(`/assignments/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getSubmissions: (id: string) =>
    apiFetch<ApiResponse<Submission[]>>(`/assignments/${id}/submissions`),
};

// ─── USERS ───────────────────────────────────────────────────────────────────

export const usersApi = {
  getProfile: (id: string) =>
    apiFetch<ApiResponse<User>>(`/users/${id}`),

  updateProfile: (data: Partial<User>) =>
    apiFetch<ApiResponse<User>>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  getNotifications: () =>
    apiFetch<ApiResponse<Notification[]>>('/users/notifications'),

  markNotificationRead: (id: string) =>
    apiFetch<ApiResponse<null>>(`/users/notifications/${id}/read`, { method: 'PATCH' }),

  markAllNotificationsRead: () =>
    apiFetch<ApiResponse<null>>('/users/notifications/read-all', { method: 'PATCH' }),

  getXP: () =>
    apiFetch<ApiResponse<{ xp: number; level: number; nextLevelXp: number; streak: number }>>('/users/xp'),

  getDashboardStats: () =>
    apiFetch<ApiResponse<{
      xp: number;
      level: number;
      streak: number;
      coursesEnrolled: number;
      assignmentsDone: number;
      certificatesEarned: number;
      recentActivity: Array<{ type: string; description: string; createdAt: string }>;
      upcomingAssignments: Assignment[];
      continueLesson?: Lesson & { course: Course };
    }>>('/users/dashboard'),
};

// ─── CERTIFICATES ─────────────────────────────────────────────────────────────

export const certificatesApi = {
  list: () =>
    apiFetch<ApiResponse<Certificate[]>>('/certificates'),

  get: (id: string) =>
    apiFetch<ApiResponse<Certificate>>(`/certificates/${id}`),

  generate: (courseId: string) =>
    apiFetch<ApiResponse<Certificate>>(`/certificates/generate/${courseId}`, { method: 'POST' }),

  verify: (certificateNumber: string) =>
    apiFetch<ApiResponse<Certificate>>(`/certificates/verify/${certificateNumber}`),
};

// ─── LEADERBOARD ─────────────────────────────────────────────────────────────

export const leaderboardApi = {
  global: (page = 1) =>
    apiFetch<ApiResponse<LeaderboardEntry[]>>(`/leaderboard?page=${page}`),

  weekly: () =>
    apiFetch<ApiResponse<LeaderboardEntry[]>>('/leaderboard/weekly'),

  monthly: () =>
    apiFetch<ApiResponse<LeaderboardEntry[]>>('/leaderboard/monthly'),

  myRank: () =>
    apiFetch<ApiResponse<{ rank: number; entry: LeaderboardEntry }>>('/leaderboard/my-rank'),
};

// ─── DISCUSSIONS ──────────────────────────────────────────────────────────────

export const discussionsApi = {
  list: (params?: { category?: string; search?: string; page?: number }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return apiFetch<ApiResponse<Discussion[]>>(`/discussions${query ? `?${query}` : ''}`);
  },

  get: (id: string) =>
    apiFetch<ApiResponse<Discussion>>(`/discussions/${id}`),

  create: (data: { title: string; body: string; category: string; tags?: string[]; courseId?: string }) =>
    apiFetch<ApiResponse<Discussion>>('/discussions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getReplies: (id: string) =>
    apiFetch<ApiResponse<Reply[]>>(`/discussions/${id}/replies`),

  addReply: (id: string, body: string) =>
    apiFetch<ApiResponse<Reply>>(`/discussions/${id}/replies`, {
      method: 'POST',
      body: JSON.stringify({ body }),
    }),

  acceptReply: (discussionId: string, replyId: string) =>
    apiFetch<ApiResponse<Reply>>(`/discussions/${discussionId}/replies/${replyId}/accept`, {
      method: 'PATCH',
    }),
};

// ─── ADMIN ────────────────────────────────────────────────────────────────────

export const adminApi = {
  getStats: () =>
    apiFetch<ApiResponse<AdminStats>>('/admin/stats'),

  getUsers: (params?: { search?: string; role?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return apiFetch<ApiResponse<User[]>>(`/admin/users${query ? `?${query}` : ''}`);
  },

  updateUser: (id: string, data: Partial<User & { banned: boolean }>) =>
    apiFetch<ApiResponse<User>>(`/admin/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  deleteUser: (id: string) =>
    apiFetch<ApiResponse<null>>(`/admin/users/${id}`, { method: 'DELETE' }),

  getCourses: (params?: { page?: number; published?: boolean }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return apiFetch<ApiResponse<Course[]>>(`/admin/courses${query ? `?${query}` : ''}`);
  },

  createCourse: (data: Partial<Course>) =>
    apiFetch<ApiResponse<Course>>('/admin/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateCourse: (id: string, data: Partial<Course>) =>
    apiFetch<ApiResponse<Course>>(`/admin/courses/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  deleteCourse: (id: string) =>
    apiFetch<ApiResponse<null>>(`/admin/courses/${id}`, { method: 'DELETE' }),

  createModule: (courseId: string, data: { title: string; order: number }) =>
    apiFetch<ApiResponse<Module>>(`/admin/courses/${courseId}/modules`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createLesson: (moduleId: string, data: Partial<Lesson>) =>
    apiFetch<ApiResponse<Lesson>>(`/admin/modules/${moduleId}/lessons`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateLesson: (id: string, data: Partial<Lesson>) =>
    apiFetch<ApiResponse<Lesson>>(`/admin/lessons/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  getGrowthData: () =>
    apiFetch<ApiResponse<Array<{ date: string; users: number; enrollments: number }>>>('/admin/analytics/growth'),

  getGradingQueue: () =>
    apiFetch<ApiResponse<Submission[]>>('/admin/grading-queue'),

  gradeSubmission: (id: string, score: number, feedback: string) =>
    apiFetch<ApiResponse<Submission>>(`/admin/submissions/${id}/grade`, {
      method: 'POST',
      body: JSON.stringify({ score, feedback }),
    }),
};
