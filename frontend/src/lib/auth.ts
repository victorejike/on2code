// Auth utility functions
export const getToken = (): string | null =>
  typeof window !== 'undefined' ? localStorage.getItem('on2code_token') : null;

export const setToken = (token: string): void =>
  localStorage.setItem('on2code_token', token);

export const removeToken = (): void =>
  localStorage.removeItem('on2code_token');

export const isAuthenticated = (): boolean => !!getToken();

export const getRefreshToken = (): string | null =>
  typeof window !== 'undefined' ? localStorage.getItem('on2code_refresh_token') : null;

export const setRefreshToken = (token: string): void =>
  localStorage.setItem('on2code_refresh_token', token);

export const removeRefreshToken = (): void =>
  localStorage.removeItem('on2code_refresh_token');

export const clearAuth = (): void => {
  removeToken();
  removeRefreshToken();
  if (typeof window !== 'undefined') {
    localStorage.removeItem('on2code_user');
  }
};
