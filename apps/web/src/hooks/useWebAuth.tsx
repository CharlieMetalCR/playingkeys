"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

const API_BASE = "http://localhost:3001/api";

interface WebUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface WebAuthContextValue {
  user: WebUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const WebAuthContext = createContext<WebAuthContextValue>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export function WebAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<WebUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("pk_web_token");
    if (stored) {
      setToken(stored);
      fetch(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${stored}` },
      })
        .then((r) => {
          if (!r.ok) throw new Error("invalid");
          return r.json();
        })
        .then((data) => setUser({ id: data.id, email: data.email, name: data.name, role: data.role }))
        .catch(() => {
          localStorage.removeItem("pk_web_token");
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("pk_web_token", data.token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("pk_web_token");
  }, []);

  return (
    <WebAuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </WebAuthContext.Provider>
  );
}

export function useWebAuth() {
  return useContext(WebAuthContext);
}
