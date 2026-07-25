import { Platform } from 'react-native';

const API_URL = Platform.select({
  android: 'http://10.0.2.2:3001/api',
  ios: 'http://localhost:3001/api',
  default: 'http://localhost:3001/api',
});

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
