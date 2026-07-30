import { API_URL } from '../constants/config';
export { API_URL };

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  studentId?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export async function authLogin(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  return res.json();
}

export async function authRegister(email: string, name: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, password }),
  });
  if (!res.ok) throw new Error(`Register failed: ${res.status}`);
  return res.json();
}

export async function authProfile(token: string): Promise<AuthUser> {
  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Profile fetch failed: ${res.status}`);
  const data = await res.json();
  return { id: data.id, email: data.email, name: data.name, role: data.role, studentId: data.student?.id };
}

export interface ApiUnit {
  id: string;
  number: number;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiLesson {
  id: string;
  unitId: string;
  number: number;
  title: string;
  content: {
    description?: string;
    instructions?: string;
    notation?: Record<string, unknown>;
    keySignature?: string;
    fingering?: string;
    lyrics?: string;
    dynamics?: string;
  };
  difficulty: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  unit?: ApiUnit;
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchUnits(): Promise<ApiUnit[]> {
  return apiFetch<ApiUnit[]>('/units');
}

export async function fetchLessons(): Promise<ApiLesson[]> {
  return apiFetch<ApiLesson[]>('/lessons');
}

export async function fetchLesson(id: string): Promise<ApiLesson> {
  return apiFetch<ApiLesson>(`/lessons/${id}`);
}

export interface ApiProgress {
  id: string;
  studentId: string;
  lessonId: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'NEEDS_REVIEW';
  score: number | null;
  completedAt: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  lesson?: ApiLesson;
}

export async function createProgress(data: {
  studentId: string;
  lessonId: string;
  status?: string;
  score?: number;
}, token?: string): Promise<ApiProgress> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_URL}/progress`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchStudentProgress(studentId: string): Promise<ApiProgress[]> {
  return apiFetch<ApiProgress[]>(`/progress/student/${studentId}`);
}

export interface StudentStats {
  completedLessons: number;
  totalLessons: number;
  streak: number;
  avgScore: number;
}

export async function fetchStudentStats(studentId: string, token?: string): Promise<StudentStats> {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const [progress, units] = await Promise.all([
    apiFetch<ApiProgress[]>(`/progress/student/${studentId}`),
    apiFetch<(ApiUnit & { lessons: { id: string }[] })[]>('/units'),
  ]);

  const completed = progress.filter((p) => p.status === 'COMPLETED');
  const totalLessons = units.reduce((sum, u) => sum + (u.lessons?.length ?? 0), 0);

  const scores = completed.filter((p) => p.score != null).map((p) => p.score!);
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  const completedDates = completed
    .filter((p) => p.completedAt)
    .map((p) => new Date(p.completedAt!).toDateString())
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let streak = 0;
  if (completedDates.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let checkDate = new Date(today);
    for (const dateStr of completedDates) {
      const d = new Date(dateStr);
      d.setHours(0, 0, 0, 0);
      if (d.getTime() === checkDate.getTime()) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (d.getTime() < checkDate.getTime()) {
        break;
      }
    }
  }

  return { completedLessons: completed.length, totalLessons, streak, avgScore };
}
