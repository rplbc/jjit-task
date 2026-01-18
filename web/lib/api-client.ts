import { env } from '@/env';

export type ApiError = {
  message?: string | null;
};

export type Result<T> = { ok: true; data: T } | { ok: false; error: ApiError };

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<Result<T>> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${endpoint}`, options);

    if (!response.ok) {
      const message = `${response.status} ${response.statusText}`;

      return {
        ok: false,
        error: { message },
      };
    }

    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: { message: error instanceof Error ? error.message : 'An unknown error occurred' },
    };
  }
}
