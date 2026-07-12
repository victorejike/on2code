'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authApi, User } from '@/lib/api';
import { getToken, removeToken, removeRefreshToken } from '@/lib/auth';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  logout: () => void;
  refetch: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.me();
      if (response.success && response.data) {
        setUser(response.data);
        setError(null);
      }
    } catch (err: any) {
      if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
        removeToken();
        removeRefreshToken();
        setUser(null);
        router.push('/auth/login');
      } else {
        setError(err.message || 'Failed to fetch user');
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {}
    removeToken();
    removeRefreshToken();
    if (typeof window !== 'undefined') {
      document.cookie = 'on2code_token=; path=/; max-age=0';
    }
    setUser(null);
    router.push('/auth/login');
  }, [router]);

  return { user, loading, error, logout, refetch: fetchUser };
}
