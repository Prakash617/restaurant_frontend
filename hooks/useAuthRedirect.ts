'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/config';

export function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me/`, {
          credentials: 'include',
        });

        if (res.status === 401 || res.status === 403) {
          router.replace('/login');
        }
      } catch {
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router]);
}
