import { useEffect, useState } from 'react';

export type User = { name: string; email: string; role: 'buyer' | 'seller' };

const KEY = 'contnr_user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem(KEY, JSON.stringify(user));
    else localStorage.removeItem(KEY);
  }, [user]);

  const login = (u: User) => setUser(u);
  const logout = () => setUser(null);

  return { user, login, logout };
}

export default useAuth;
