import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const API_BASE_URL = 'https://personal-ai-finance-tracker.onrender.com';

export const useApi = () => {
  const { user } = useAuth();

  const apiCall = useCallback(async (
    endpoint: string,
    options: RequestInit = {}
  ) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(user?.token && { 'x-auth-token': user.token }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  }, [user?.token]);

  return apiCall;
};