"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "../../i18n";
import { useWebAuth } from "../../hooks/useWebAuth";
import { Users, BookOpen, TrendingUp, Search, Menu, Bell, Flame, Settings2, PanelLeftClose, LogOut, User } from "lucide-react";

const API_BASE = "http://localhost:3001/api";

interface StudentRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  initials: string;
  hue: number;
  completed: number;
  total: number;
  avgScore: number;
  lastActivity: string | null;
}

interface TeacherStats {
  totalStudents: number;
  avgClassProgress: number;
  totalCompleted: number;
}

export default function TeacherPage() {
  const { t, locale, setLocale } = useTranslation();
  const { user, token, loading: authLoading, login, logout } = useWebAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const [students, setStudents] = useState<StudentRow[]>([]);
  const [stats, setStats] = useState<TeacherStats>({ totalStudents: 0, avgClassProgress: 0, totalCompleted: 0 });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isTeacher = user?.role === "TEACHER";

  useEffect(() => {
    if (!isTeacher || !token) return;
    setLoading(true);
    fetch(`${API_BASE}/teachers/me/students`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && Array.isArray(data.students)) {
          const rows: StudentRow[] = data.students.map((s: Record<string, unknown>) => {
            const userObj = s.user as Record<string, unknown> | undefined;
            const progress = Array.isArray(s.progress) ? s.progress as Array<Record<string, unknown>> : [];
            const completed = progress.filter((p) => p.status === "COMPLETED").length;
            const scores = progress.filter((p) => typeof p.score === "number").map((p) => p.score as number);
            const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
            const name = (userObj?.name as string) || "Student";
            const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
            const hue = Math.abs(name.charCodeAt(0) * 7 + (name.charCodeAt(1) || 0) * 13) % 360;
            const lastProg = progress.length > 0 ? progress[0].completedAt as string | null : null;
            return {
              id: s.id as string,
              name,
              email: (userObj?.email as string) || "",
              phone: (s.phone as string) || null,
              initials,
              hue,
              completed,
              total: progress.length,
              avgScore,
              lastActivity: lastProg,
            };
          });

          const totalCompleted = rows.reduce((sum, r) => sum + r.completed, 0);
          const avgProgress = rows.length > 0
            ? Math.round(rows.reduce((sum, r) => sum + (r.total > 0 ? (r.completed / r.total) * 100 : 0), 0) / rows.length)
            : 0;

          setStudents(rows);
          setStats({ totalStudents: rows.length, avgClassProgress: avgProgress, totalCompleted });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isTeacher, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(false);
    try {
      await login(email, password);
    } catch {
      setLoginError(true);
    } finally {
      setLoggingIn(false);
    }
  };

  if (authLoading) {
    return (
      <div className="app-shell">
        <div className="main-col" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ opacity: 0.6 }}>{t("auth.loading")}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app-shell">
        <div className="main-col" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <form onSubmit={handleLogin} className="login-form" style={{ maxWidth: 360, width: "100%" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎹</div>
              <h2 style={{ margin: 0 }}>{t("auth.adminLogin")}</h2>
            </div>
            {loginError && <div className="login-error">{t("auth.error")}</div>}
            <label style={{ display: "block", marginBottom: 12 }}>
              <span style={{ display: "block", fontSize: 13, marginBottom: 4 }}>{t("auth.email")}</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%" }} required />
            </label>
            <label style={{ display: "block", marginBottom: 16 }}>
              <span style={{ display: "block", fontSize: 13, marginBottom: 4 }}>{t("auth.password")}</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%" }} required />
            </label>
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={loggingIn}>
              {loggingIn ? t("auth.loading") : t("auth.login")}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!isTeacher) {
    return (
      <div className="app-shell">
        <div className="main-col" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
          <p style={{ opacity: 0.6 }}>This page is for teachers only.</p>
          <button className="btn btn-primary" onClick={logout}>{t("auth.logout")}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="sidebar-top">
          <div className="brand">
            <svg viewBox="0 0 28 28" className="brand-key">
              <rect x="2" y="2" width="24" height="24" rx="6" className="brand-key-bg" />
              <rect x="7" y="7" width="4" height="14" rx="1.5" className="brand-key-white" />
              <rect x="12" y="7" width="4" height="14" rx="1.5" className="brand-key-white-2" />
              <rect x="17" y="7" width="4" height="9" rx="1.5" className="brand-key-black" />
            </svg>
            <span className="brand-name">PlayingKeys</span>
          </div>
          <button className="icon-btn sidebar-toggle" aria-label={t("nav.collapse")} onClick={() => setSidebarOpen(false)}>
            <PanelLeftClose />
          </button>
        </div>

        <nav className="nav" aria-label={t("nav.mainAria")}>
          <div className="nav-item is-active">
            <Users /><span>{t("nav.teacher")}</span>
          </div>
        </nav>

        <div className="sidebar-bottom">
          <div className="user-card">
            <div className="avatar avatar-md" style={{ "--h": "265" } as React.CSSProperties}>
              {user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div className="user-meta">
              <span className="user-name">{user.name}</span>
              <span className="user-plan">{user.role}</span>
            </div>
            <button className="icon-btn ghost" onClick={logout} aria-label={t("auth.logout")} title={t("auth.logout")}>
              <LogOut />
            </button>
          </div>
        </div>
      </aside>

      <div className="main-col">
        <header className="topbar">
          <button className="icon-btn mobile-only" onClick={() => setSidebarOpen(true)} aria-label={t("nav.openMenu")}>
            <Menu />
          </button>
          <div className="topbar-title">
            <h1>{t("view.teacher.title")}</h1>
            <p>{t("view.teacher.subtitle")}</p>
          </div>
          <div className="topbar-actions">
            <label className="search">
              <Search />
              <input type="text" placeholder={t("search.placeholder")} aria-label={t("search.label")} />
            </label>
            <button
              className="icon-btn"
              onClick={() => setLocale(locale === "es" ? "en" : "es")}
              title={locale === "es" ? "Switch to English" : "Cambiar a español"}
              aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}
            >
              {locale === "es" ? "EN" : "ES"}
            </button>
          </div>
        </header>

        <main className="view is-active">
          {loading ? (
            <p style={{ opacity: 0.6 }}>{t("auth.loading")}</p>
          ) : (
            <>
              <section className="stat-grid">
                <div className="stat-card">
                  <div className="stat-icon stat-icon-violet"><Users /></div>
                  <div className="stat-num">{stats.totalStudents}</div>
                  <div className="stat-label">{t("teacher.totalStudents")}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon stat-icon-blue"><TrendingUp /></div>
                  <div className="stat-num">{stats.avgClassProgress}%</div>
                  <div className="stat-label">{t("teacher.avgClassProgress")}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon stat-icon-green"><BookOpen /></div>
                  <div className="stat-num">{stats.totalCompleted}</div>
                  <div className="stat-label">{t("teacher.totalCompleted")}</div>
                </div>
              </section>

              <section style={{ marginTop: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 600 }}>{t("teacher.myStudents")}</h2>
                  <span style={{ fontSize: 13, opacity: 0.5 }}>
                    {t("teacher.studentCount", { count: String(students.length) })}
                  </span>
                </div>

                {students.length === 0 ? (
                  <div style={{ padding: 40, textAlign: "center", opacity: 0.4 }}>
                    <User size={40} style={{ marginBottom: 12 }} />
                    <p>{t("teacher.noStudents")}</p>
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                          <th style={thStyle}>{t("teacher.tableStudent")}</th>
                          <th style={thStyle}>{t("teacher.tableProgress")}</th>
                          <th style={thStyle}>{t("teacher.tableCompleted")}</th>
                          <th style={thStyle}>{t("teacher.tableAvgScore")}</th>
                          <th style={thStyle}>{t("teacher.tableStatus")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((s) => {
                          const pct = s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0;
                          const isActive = s.lastActivity && new Date(s.lastActivity).getTime() > Date.now() - 7 * 86400000;
                          return (
                            <tr key={s.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                              <td style={tdStyle}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                  <div className="avatar avatar-sm" style={{ "--h": String(s.hue) } as React.CSSProperties}>
                                    {s.initials}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 500 }}>{s.name}</div>
                                    <div style={{ fontSize: 12, opacity: 0.5 }}>{s.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td style={tdStyle}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <div className="progress-track" style={{ flex: 1, maxWidth: 120 }}>
                                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                                  </div>
                                  <span style={{ fontSize: 12, opacity: 0.6 }}>{pct}%</span>
                                </div>
                              </td>
                              <td style={tdStyle}>
                                {t("teacher.completedLessons", { count: String(s.completed), total: String(Math.max(s.total, 1)) })}
                              </td>
                              <td style={tdStyle}>
                                {s.avgScore > 0 ? t("teacher.avgScore", { score: String(s.avgScore) }) : "—"}
                              </td>
                              <td style={tdStyle}>
                                <span style={{
                                  display: "inline-block",
                                  padding: "2px 8px",
                                  borderRadius: 10,
                                  fontSize: 12,
                                  background: isActive ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
                                  color: isActive ? "#22c55e" : "rgba(255,255,255,0.4)",
                                }}>
                                  {isActive ? t("teacher.statusActive") : t("teacher.statusInactive")}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 12px",
  fontSize: 12,
  fontWeight: 500,
  opacity: 0.5,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  verticalAlign: "middle",
};
