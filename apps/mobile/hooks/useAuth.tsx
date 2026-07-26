import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authLogin, authRegister, authProfile, AuthUser } from '../lib/api';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

const TOKEN_KEY = 'pk_auth_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(TOKEN_KEY).then((stored) => {
      if (stored) {
        setToken(stored);
        authProfile(stored)
          .then((u) => setUser(u))
          .catch(() => { AsyncStorage.removeItem(TOKEN_KEY); setToken(null); })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authLogin(email, password);
    setToken(res.token);
    setUser(res.user);
    await AsyncStorage.setItem(TOKEN_KEY, res.token);
  }, []);

  const register = useCallback(async (email: string, name: string, password: string) => {
    const res = await authRegister(email, name, password);
    setToken(res.token);
    setUser(res.user);
    await AsyncStorage.setItem(TOKEN_KEY, res.token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    AsyncStorage.removeItem(TOKEN_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
