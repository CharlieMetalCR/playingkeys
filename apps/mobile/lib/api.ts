import { Platform } from 'react-native';

const API_URL = Platform.select({
  android: 'http://10.0.2.2:3001/api',
  ios: 'http://localhost:3001/api',
  default: 'http://localhost:3001/api',
});

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
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
  return { id: data.id, email: data.email, name: data.name, role: data.role };
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
