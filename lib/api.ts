// lib/api.ts
import { API_BASE_URL } from './config';

interface FetchOptions extends Omit<RequestInit, 'headers'> {
  headers?: HeadersInit;
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: 'include',  // important for cookie-based auth
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    const errorMessage = errorBody?.detail || res.statusText || 'API request failed';
    throw new Error(errorMessage);
  }

  return res.json();
}
