"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "../../i18n";
import {
  LayoutGrid,
  Piano,
  LibraryBig,
  ChartNoAxesCombined,
  ShieldHalf,
  Repeat,
  Settings2,
  PanelLeftClose,
  Menu,
  Search,
  Flame,
  Bell,
  Disc3,
  Play,
  ListMusic,
  GraduationCap,
  CheckCheck,
  Timer,
  CalendarClock,
  Music4,
  Mic2,
  Target,
  Check,
  Sparkles,
  Ear,
  AudioLines,
  Clock,
  BadgeCheck,
  Minus,
  Plus,
  Activity,
  Square,
  CircleDashed,
  CircleX,
  CheckCircle2,
  Landmark,
  Lock,
  BarChart3,
  Grid3x3,
  Trophy,
  TrendingUp,
  CalendarCheck2,
  Star,
  Users,
  Server,
  Ticket,
  UserRound,
  Megaphone,
  Clock4,
  PencilLine,
  Layers,
  MoonStar,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ViewId = "dashboard" | "practice" | "courses" | "progress" | "admin";

interface PianoKeyDef {
  note: string;
  label: string;
  type: "white" | "black";
  freq: number;
  keyboardKey?: string;
}

interface CourseDef {
  title: string;
  desc: string;
  level: "courses.level.beginner" | "courses.level.intermediate" | "courses.level.advanced";
  progress: number;
  locked: boolean;
  coverClass: string;
  icon: LucideIcon;
}

interface AdminStudentRow {
  initials: string;
  hue: number;
  name: string;
  course: string;
  progress: number;
  status: "online" | "idle";
  statusLabel: string;
  idleDays?: number;
}

const API_BASE = "http://localhost:3001/api";

const PIANO_KEYS: PianoKeyDef[] = [
  { note: "C4", label: "Do", type: "white", freq: 261.63, keyboardKey: "a" },
  { note: "C#4", label: "Do#", type: "black", freq: 277.18, keyboardKey: "w" },
  { note: "D4", label: "Re", type: "white", freq: 293.66, keyboardKey: "s" },
  { note: "D#4", label: "Re#", type: "black", freq: 311.13, keyboardKey: "e" },
  { note: "E4", label: "Mi", type: "white", freq: 329.63, keyboardKey: "d" },
  { note: "F4", label: "Fa", type: "white", freq: 349.23, keyboardKey: "f" },
  { note: "F#4", label: "Fa#", type: "black", freq: 369.99, keyboardKey: "t" },
  { note: "G4", label: "Sol", type: "white", freq: 392.0, keyboardKey: "g" },
  { note: "G#4", label: "Sol#", type: "black", freq: 415.3, keyboardKey: "y" },
  { note: "A4", label: "La", type: "white", freq: 440.0, keyboardKey: "h" },
  { note: "A#4", label: "La#", type: "black", freq: 466.16, keyboardKey: "u" },
  { note: "B4", label: "Si", type: "white", freq: 493.88, keyboardKey: "j" },
];

const BLACK_POSITIONS = [12.5, 25, 51, 63.5, 76];

const STATIC_COURSES: CourseDef[] = [
  { title: "Fundamentos del piano", desc: "Postura, lectura de pentagrama y tus primeras cinco notas.", level: "courses.level.beginner", progress: 100, locked: false, coverClass: "cv-1", icon: Sparkles },
  { title: "Armonía básica", desc: "Acordes mayores y menores, e inversiones esenciales.", level: "courses.level.beginner", progress: 64, locked: false, coverClass: "cv-2", icon: Layers },
  { title: "Ritmo y compás", desc: "Subdivisiones, síncopa y lectura rítmica con el metrónomo.", level: "courses.level.intermediate", progress: 30, locked: false, coverClass: "cv-3", icon: Activity },
  { title: "Improvisación básica", desc: "Escalas pentatónicas aplicadas sobre progresiones simples.", level: "courses.level.intermediate", progress: 0, locked: true, coverClass: "cv-4", icon: Sparkles },
  { title: "Piano clásico I", desc: "Repertorio guiado: Bach, Clementi y piezas de nivel inicial.", level: "courses.level.intermediate", progress: 12, locked: false, coverClass: "cv-5", icon: Landmark },
  { title: "Piano jazz para principiantes", desc: "Voicings, swing feel y tu primer solo de 12 compases.", level: "courses.level.advanced", progress: 0, locked: true, coverClass: "cv-6", icon: MoonStar },
];

const ADMIN_STUDENTS: AdminStudentRow[] = [
  { initials: "MP", hue: 210, name: "Mateo Pineda", course: "Armonía básica", progress: 82, status: "online", statusLabel: "admin.statusOnline" },
  { initials: "LR", hue: 330, name: "Lucía Ramírez", course: "Ritmo y compás", progress: 45, status: "online", statusLabel: "admin.statusOnline" },
  { initials: "JG", hue: 45, name: "Julián Gómez", course: "Fundamentos del piano", progress: 97, status: "idle", statusLabel: "admin.statusIdle", idleDays: 3 },
  { initials: "NA", hue: 150, name: "Nadia Ayala", course: "Piano clásico I", progress: 20, status: "online", statusLabel: "admin.statusOnline" },
  { initials: "DC", hue: 265, name: "Diego Castro", course: "Armonía básica", progress: 12, status: "idle", statusLabel: "admin.statusIdle", idleDays: 6 },
];

const WEEKS_DATA = [
  { label: "S1", minutes: 42 },
  { label: "S2", minutes: 58 },
  { label: "S3", minutes: 35 },
  { label: "S4", minutes: 71 },
  { label: "S5", minutes: 64 },
  { label: "S6", minutes: 88 },
  { label: "S7", minutes: 76 },
];

const WEEK_DAYS = [
  { label: "L", done: true },
  { label: "M", done: true },
  { label: "M", done: true },
  { label: "J", done: true },
  { label: "V", done: true },
  { label: "S", today: true },
  { label: "D", done: false },
];

function getViewMeta(t: (key: string) => string): Record<ViewId, { title: string; subtitle: string }> {
  return {
    dashboard: { title: t("view.dashboard.title"), subtitle: t("view.dashboard.subtitle") },
    practice: { title: t("view.practice.title"), subtitle: t("view.practice.subtitle") },
    courses: { title: t("view.courses.title"), subtitle: t("view.courses.subtitle") },
    progress: { title: t("view.progress.title"), subtitle: t("view.progress.subtitle") },
    admin: { title: t("view.admin.title"), subtitle: t("view.admin.subtitle") },
  };
}

export default function AdminPage() {
  const { t, locale, setLocale } = useTranslation();
  const [view, setViewState] = useState<ViewId>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bpm, setBpm] = useState(72);
  const [metroBtnOn, setMetroBtnOn] = useState(false);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [targetIndex, setTargetIndex] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(6);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("feedback.start");
  const [feedbackIcon, setFeedbackIcon] = useState<"circle-dashed" | "check-circle-2" | "circle-x">("circle-dashed");
  const [waveHeights, setWaveHeights] = useState<number[]>([]);
  const [heatmapCells, setHeatmapCells] = useState<number[]>([]);
  const [courses, setCourses] = useState<CourseDef[]>(STATIC_COURSES);
  const [courseUnits, setCourseUnits] = useState<Array<{ id: string; title: string; description: string | null; lessons: Array<{ id: string; title: string; number: number }> }>>([]);
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [lessonDetail, setLessonDetail] = useState<Record<string, unknown> | null>(null);
  const [lessonLoading, setLessonLoading] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const metroTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const targetIndexRef = useRef(targetIndex);

  useEffect(() => { targetIndexRef.current = targetIndex; }, [targetIndex]);

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AC();
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback(
    (freq: number) => {
      const ctx = getAudioCtx();
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.1);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.15);
    },
    [getAudioCtx],
  );

  const handleNotePlayed = useCallback(
    (key: PianoKeyDef) => {
      const target = PIANO_KEYS[targetIndexRef.current];
      if (key.note === target.note) {
        setCorrectStreak((s) => s + 1);
        setFeedbackCorrect(true);
        setFeedbackIcon("check-circle-2");
        setFeedbackMsg(t("feedback.correct", { label: target.label, note: target.note }));
        setTimeout(() => {
          setFeedbackCorrect(false);
          setFeedbackIcon("circle-dashed");
          setFeedbackMsg(t("feedback.continue"));
          setTargetIndex(Math.floor(Math.random() * PIANO_KEYS.length));
        }, 900);
      } else {
        setCorrectStreak(0);
        setFeedbackCorrect(false);
        setFeedbackIcon("circle-x");
        setFeedbackMsg(t("feedback.wrong", { label: target.label, note: target.note }));
      }
    },
    [t],
  );

  const pressKey = useCallback(
    (note: string) => {
      const key = PIANO_KEYS.find((k) => k.note === note);
      if (!key) return;
      setActiveKeys((prev) => new Set(prev).add(note));
      playTone(key.freq);
      handleNotePlayed(key);
      setTimeout(() => {
        setActiveKeys((prev) => {
          const next = new Set(prev);
          next.delete(note);
          return next;
        });
      }, 160);
    },
    [playTone, handleNotePlayed],
  );

  const setView = useCallback((id: ViewId) => {
    setViewState(id);
    setSidebarOpen(false);
    setSelectedLessonId(null);
    setLessonDetail(null);
  }, []);

  const handleLessonClick = useCallback((lessonId: string) => {
    setSelectedLessonId(lessonId);
    setLessonLoading(true);
    setLessonDetail(null);
    fetch(`${API_BASE}/lessons/${lessonId}`)
      .then((r) => r.json())
      .then((data) => { setLessonDetail(data as Record<string, unknown>); })
      .catch(() => {})
      .finally(() => { setLessonLoading(false); });
  }, []);

  const toggleRole = useCallback(() => {
    setIsAdmin((prev) => {
      if (prev) setViewState("dashboard");
      return !prev;
    });
  }, []);

  const tempoDown = useCallback(() => setBpm((b) => Math.max(40, b - 4)), []);
  const tempoUp = useCallback(() => setBpm((b) => Math.min(208, b + 4)), []);

  const tick = useCallback(() => {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 1000;
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  }, [getAudioCtx]);

  const toggleMetronome = useCallback(() => {
    setMetroBtnOn((prev) => {
      const next = !prev;
      if (next) {
        tick();
        metroTimerRef.current = setInterval(tick, (60 / bpm) * 1000);
      } else if (metroTimerRef.current) {
        clearInterval(metroTimerRef.current);
      }
      return next;
    });
  }, [bpm, tick]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = PIANO_KEYS.find((k) => k.keyboardKey === e.key.toLowerCase());
      if (key) pressKey(key.note);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pressKey]);

  useEffect(() => {
    setWaveHeights(Array.from({ length: 48 }, () => 8 + Math.random() * 84));
    setHeatmapCells(Array.from({ length: 84 }, () => Math.floor(Math.random() * 5)));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/units`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const cvClasses = ["cv-1", "cv-2", "cv-3", "cv-4", "cv-5", "cv-6"];
          const icons: LucideIcon[] = [Sparkles, Layers, Activity, Sparkles, Landmark, MoonStar];
          setCourses(
            data.map((u: Record<string, unknown>, i: number) => ({
              title: (u.title as string) || (u.name as string) || `Unidad ${i + 1}`,
              desc: (u.description as string) || "Continúa tu aprendizaje.",
              level: "courses.level.beginner" as const,
              progress: 0,
              locked: false,
              coverClass: cvClasses[i % cvClasses.length],
              icon: icons[i % icons.length],
            })),
          );
          setCourseUnits(
            data.map((u: Record<string, unknown>) => ({
              id: u.id as string,
              title: (u.title as string) || "Unidad",
              description: (u.description as string) || null,
              lessons: Array.isArray(u.lessons)
                ? (u.lessons as Array<Record<string, unknown>>).map((l) => ({
                    id: l.id as string,
                    title: (l.title as string) || "Lección",
                    number: (l.number as number) || 0,
                  }))
                : [],
            })),
          );
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (metroBtnOn && metroTimerRef.current) {
      clearInterval(metroTimerRef.current);
      metroTimerRef.current = setInterval(tick, (60 / bpm) * 1000);
    }
  }, [bpm, metroBtnOn, tick]);

  useEffect(() => {
    return () => {
      if (metroTimerRef.current) clearInterval(metroTimerRef.current);
    };
  }, []);

  const meta = getViewMeta(t)[view];
  const barMax = Math.max(...WEEKS_DATA.map((w) => w.minutes));

  const FeedbackIconComp =
    feedbackIcon === "check-circle-2" ? CheckCircle2 :
    feedbackIcon === "circle-x" ? CircleX : CircleDashed;

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
          <button className="icon-btn sidebar-toggle" aria-label={t("nav.collapse")}>
            <PanelLeftClose />
          </button>
        </div>

        <nav className="nav" aria-label={t("nav.mainAria")}>
          <button className={`nav-item ${view === "dashboard" ? "is-active" : ""}`} onClick={() => setView("dashboard")}>
            <LayoutGrid /><span>{t("nav.dashboard")}</span>
          </button>
          <button className={`nav-item ${view === "practice" ? "is-active" : ""}`} onClick={() => setView("practice")}>
            <Piano /><span>{t("nav.practice")}</span>
          </button>
          <button className={`nav-item ${view === "courses" ? "is-active" : ""}`} onClick={() => setView("courses")}>
            <LibraryBig /><span>{t("nav.courses")}</span>
          </button>
          <button className={`nav-item ${view === "progress" ? "is-active" : ""}`} onClick={() => setView("progress")}>
            <ChartNoAxesCombined /><span>{t("nav.progress")}</span>
          </button>
          {isAdmin && <div className="nav-divider" />}
          {isAdmin && (
            <button className={`nav-item ${view === "admin" ? "is-active" : ""}`} onClick={() => setView("admin")}>
              <ShieldHalf /><span>{t("nav.admin")}</span>
            </button>
          )}
        </nav>

        <div className="sidebar-bottom">
          <button className="role-switch" onClick={toggleRole} title={t("role.switchTitle")}>
            <Repeat />
            <span>{isAdmin ? t("role.student") : t("role.admin")}</span>
          </button>
          <div className="user-card">
            <div className="avatar avatar-md" style={{ "--h": "265" } as React.CSSProperties}>SL</div>
            <div className="user-meta">
              <span className="user-name">Sofía Larios</span>
              <span className="user-plan">{t("user.plan")}</span>
            </div>
            <button className="icon-btn ghost" aria-label={t("user.settings")}>
              <Settings2 />
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
            <h1>{meta.title}</h1>
            <p>{meta.subtitle}</p>
          </div>
          <div className="topbar-actions">
            <label className="search">
              <Search />
              <input type="text" placeholder={t("search.placeholder")} aria-label={t("search.label")} />
            </label>
            <div className="streak-chip" title={t("streak.title")}>
              <Flame />
              <span>{t("streak.days")}</span>
            </div>
            <button className="icon-btn" aria-label={t("notifications")}>
              <Bell />
              <span className="dot-badge"></span>
            </button>
            <button
              className="icon-btn"
              onClick={() => setLocale(locale === "es" ? "en" : "es")}
              title={locale === "es" ? "Switch to English" : "Cambiar a español"}
              aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}
            >
              {locale === "es" ? "EN" : "ES"}
            </button>
            <div className="avatar avatar-sm" style={{ "--h": "265" } as React.CSSProperties}>SL</div>
          </div>
        </header>

        {/* DASHBOARD */}
        <main className={`view ${view === "dashboard" ? "is-active" : ""}`}>
          <section className="continue-card">
            <div className="continue-info">
              <span className="eyebrow"><Disc3 /> {t("continue.module")}</span>
              <h2>{t("continue.lesson")}</h2>
              <p>{t("continue.desc")}</p>
              <div className="progress-track" role="progressbar" aria-valuenow={64} aria-valuemin={0} aria-valuemax={100}>
                <div className="progress-fill" style={{ width: "64%" }}></div>
              </div>
              <div className="continue-meta">
                <span>{t("continue.completed")}</span>
                <span>·</span>
                <span>{t("continue.remaining")}</span>
              </div>
              <div className="continue-actions">
                <button className="btn btn-primary" onClick={() => setView("practice")}>
                  <Play /> {t("continue.lessonBtn")}
                </button>
                <button className="btn btn-ghost">
                  <ListMusic /> {t("continue.planBtn")}
                </button>
              </div>
            </div>
            <div className="continue-visual" aria-hidden="true">
              <div className="mini-piano">
                <div className="mini-key w"></div><div className="mini-key w"></div>
                <div className="mini-key w is-active"></div><div className="mini-key w"></div>
                <div className="mini-key w"></div><div className="mini-key w"></div><div className="mini-key w"></div>
                <div className="mini-key b" style={{ left: "11%" }}></div>
                <div className="mini-key b is-active" style={{ left: "25%" }}></div>
                <div className="mini-key b" style={{ left: "53%" }}></div>
                <div className="mini-key b" style={{ left: "67%" }}></div>
                <div className="mini-key b" style={{ left: "81%" }}></div>
              </div>
            </div>
          </section>

          <section className="stat-grid">
            <div className="stat-card">
              <div className="stat-icon stat-icon-violet"><GraduationCap /></div>
              <div className="stat-num">7</div>
              <div className="stat-label">{t("stat.coursesCompleted")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-blue"><CheckCheck /></div>
              <div className="stat-num">128</div>
              <div className="stat-label">{t("stat.lessonsDone")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-green"><Timer /></div>
              <div className="stat-num">34h 10m</div>
              <div className="stat-label">{t("stat.practiceTime")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-amber"><Flame /></div>
              <div className="stat-num">12</div>
              <div className="stat-label">{t("stat.streakDays")}</div>
            </div>
          </section>

          <section className="two-col">
            <div className="panel">
              <div className="panel-head">
                <h3><CalendarClock /> {t("activities.upcoming")}</h3>
                <button className="link-btn">{t("activities.viewAll")}</button>
              </div>
              <ul className="activity-list">
                <li className="activity-item">
                  <div className="activity-icon"><Piano /></div>
                  <div className="activity-body">
                    <span className="activity-title">{t("activity.scales")}</span>
                    <span className="activity-sub">{t("activity.scalesSub")}</span>
                  </div>
                  <span className="chip chip-blue">{t("activity.today")}</span>
                </li>
                <li className="activity-item">
                  <div className="activity-icon"><Music4 /></div>
                  <div className="activity-body">
                    <span className="activity-title">{t("activity.theory")}</span>
                    <span className="activity-sub">{t("activity.theorySub")}</span>
                  </div>
                  <span className="chip chip-violet">{t("activity.tomorrow")}</span>
                </li>
                <li className="activity-item">
                  <div className="activity-icon"><Mic2 /></div>
                  <div className="activity-body">
                    <span className="activity-title">{t("activity.recording")}</span>
                    <span className="activity-sub">{t("activity.recordingSub")}</span>
                  </div>
                  <span className="chip chip-muted">{t("activity.thursday")}</span>
                </li>
              </ul>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3><Target /> {t("streak.weekly")}</h3>
                <span className="panel-head-meta">{t("streak.progress")}</span>
              </div>
              <div className="week-track">
                {WEEK_DAYS.map((d, i) => (
                  <div key={i} className={`week-day ${d.done ? "is-done" : ""} ${d.today ? "is-today" : ""}`}>
                    <span>{d.label}</span>
                    {d.done && <Check />}
                  </div>
                ))}
              </div>
              <div className="callout">
                <Sparkles />
                <p dangerouslySetInnerHTML={{ __html: t("streak.callout") }} />
              </div>
            </div>
          </section>
        </main>

        {/* PRACTICE */}
        <main className={`view ${view === "practice" ? "is-active" : ""}`}>
          <section className="practice-head">
            <div>
              <span className="eyebrow"><Disc3 /> {t("continue.module")}</span>
              <h2>{t("continue.lesson")}</h2>
            </div>
            <div className="practice-controls">
              <div className="tempo-control">
                <span>{t("practice.tempo")}</span>
                <button className="icon-btn ghost" onClick={tempoDown} aria-label={t("practice.tempoDown")}><Minus /></button>
                <span className="tempo-value">{bpm} BPM</span>
                <button className="icon-btn ghost" onClick={tempoUp} aria-label={t("practice.tempoUp")}><Plus /></button>
              </div>
              <button className={`btn ${metroBtnOn ? "btn-primary" : "btn-ghost"}`} onClick={toggleMetronome}>
                {metroBtnOn ? <><Square /> {t("practice.stop")}</> : <><Activity /> {t("practice.metronome")}</>}
              </button>
            </div>
          </section>

          <section className="practice-grid">
            <div className="panel note-panel">
              <div className="panel-head">
                <h3><Ear /> {t("practice.targetNote")}</h3>
                <span className="chip chip-green">{t("practice.streakLabel", { count: correctStreak })}</span>
              </div>
              <div className="note-target">
                <span className="note-target-label">{t("practice.targetLabel")}</span>
                <span className="note-target-value">{PIANO_KEYS[targetIndex].label} ({PIANO_KEYS[targetIndex].note})</span>
              </div>
              <div className={`feedback-row ${feedbackCorrect ? "is-correct" : ""}`} aria-live="polite">
                <FeedbackIconComp />
                <span>{feedbackMsg}</span>
              </div>
            </div>

            <div className="panel waveform-panel">
              <div className="panel-head">
                <h3><AudioLines /> {t("practice.monitor")}</h3>
              </div>
              <div className="waveform" aria-hidden="true">
                {waveHeights.map((h, i) => (
                  <div key={i} className="wave-bar" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="waveform-meta">
                <span><Clock /> {t("practice.practiceToday", { time: "09:42" })}</span>
                <span><BadgeCheck /> {t("practice.precision", { pct: 91 })}</span>
              </div>
            </div>
          </section>

          <section className="panel piano-panel">
            <div className="panel-head">
              <h3><Piano /> {t("practice.interactivePiano")}</h3>
              <span className="panel-head-meta">{t("practice.pianoHint")}</span>
            </div>
            <div className="piano" aria-label={t("practice.pianoAria")}>
              {PIANO_KEYS.filter((k) => k.type === "white").map((key) => (
                <div
                  key={key.note}
                  className={`key white ${activeKeys.has(key.note) ? "is-active" : ""}`}
                  onMouseDown={() => pressKey(key.note)}
                  onTouchStart={(e) => { e.preventDefault(); pressKey(key.note); }}
                >
                  <span>{key.keyboardKey?.toUpperCase() ?? ""}</span>
                </div>
              ))}
              {PIANO_KEYS.filter((k) => k.type === "black").map((key, i) => (
                <div
                  key={key.note}
                  className={`key black ${activeKeys.has(key.note) ? "is-active" : ""}`}
                  style={{ left: `${BLACK_POSITIONS[i]}%` }}
                  onMouseDown={() => pressKey(key.note)}
                  onTouchStart={(e) => { e.preventDefault(); pressKey(key.note); }}
                >
                  <span>{key.keyboardKey?.toUpperCase() ?? ""}</span>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* COURSES */}
        <main className={`view ${view === "courses" ? "is-active" : ""}`}>
          {selectedLessonId ? (
            <section className="panel" style={{ maxWidth: 720 }}>
              <div className="panel-head">
                <h3><BookOpen /> {t("lesson.instructions")}</h3>
                <button className="link-btn" onClick={() => { setSelectedLessonId(null); setLessonDetail(null); }}>
                  ← {t("lesson.back")}
                </button>
              </div>
              {lessonLoading ? (
                <p style={{ color: "#9CA3AF", padding: 16 }}>{t("lesson.loading")}</p>
              ) : lessonDetail ? (
                <div style={{ padding: 16 }}>
                  <h2 style={{ color: "#F9FAFB", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                    {(lessonDetail.title as string) || ""}
                  </h2>
                  {lessonDetail.content != null && typeof lessonDetail.content === "object" && (
                    <>
                      {((lessonDetail.content as Record<string, unknown>).instructions as string) && (
                        <p style={{ color: "#D1D5DB", lineHeight: 1.7, marginTop: 12 }}>
                          {((lessonDetail.content as Record<string, unknown>).instructions as string)}
                        </p>
                      )}
                      {((lessonDetail.content as Record<string, unknown>).keySignature as string) && (
                        <div style={{ marginTop: 16 }}>
                          <span style={{ color: "#9CA3AF", fontWeight: 600, fontSize: 12, textTransform: "uppercase" as const }}>{t("lesson.keySignature")}: </span>
                          <span style={{ color: "#C4B5FD", fontWeight: 600 }}>{((lessonDetail.content as Record<string, unknown>).keySignature as string)}</span>
                        </div>
                      )}
                      {((lessonDetail.content as Record<string, unknown>).fingering as string) && (
                        <div style={{ marginTop: 8 }}>
                          <span style={{ color: "#9CA3AF", fontWeight: 600, fontSize: 12, textTransform: "uppercase" as const }}>{t("lesson.fingering")}: </span>
                          <span style={{ color: "#C4B5FD", fontWeight: 600 }}>{((lessonDetail.content as Record<string, unknown>).fingering as string)}</span>
                        </div>
                      )}
                      {((lessonDetail.content as Record<string, unknown>).dynamics as string) && (
                        <div style={{ marginTop: 8 }}>
                          <span style={{ color: "#9CA3AF", fontWeight: 600, fontSize: 12, textTransform: "uppercase" as const }}>{t("lesson.dynamics")}: </span>
                          <span style={{ color: "#C4B5FD", fontWeight: 600 }}>{((lessonDetail.content as Record<string, unknown>).dynamics as string)}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <p style={{ color: "#6B7686", padding: 16 }}>{t("lesson.notFound")}</p>
              )}
            </section>
          ) : (
            <section className="course-grid">
              {courses.map((c, i) => {
                const IconComp = c.icon;
                const unit = courseUnits[i];
                const isExpanded = expandedUnitId === unit?.id;
                return (
                  <article key={i} className="course-card">
                    <div className={`course-cover ${c.coverClass}`}>
                      <IconComp />
                      <span className="course-level">{t(c.level)}</span>
                      {c.locked && <span className="course-lock"><Lock /></span>}
                    </div>
                    <div className="course-body">
                      <span className="course-title">{c.title}</span>
                      <p className="course-desc">{c.desc}</p>
                      <div className="course-progress-row">
                        <div className="progress-track"><div className="progress-fill" style={{ width: `${c.progress}%` }}></div></div>
                        <span>{c.progress}%</span>
                      </div>
                      <button
                        className={`btn ${c.locked ? "btn-ghost" : "btn-primary"}`}
                        disabled={c.locked}
                        style={c.locked ? { opacity: 0.55, cursor: "not-allowed" } : undefined}
                        onClick={() => unit && setExpandedUnitId(isExpanded ? null : unit.id)}
                      >
                        {c.locked ? <Lock /> : c.progress > 0 ? <Play /> : <Sparkles />}
                        {c.locked ? t("courses.locked") : c.progress > 0 ? t("courses.continue") : t("courses.start")}
                      </button>
                    </div>
                    {isExpanded && unit && unit.lessons.length > 0 && (
                      <div style={{ borderTop: "1px solid #273244", padding: 12 }}>
                        {unit.lessons.map((l) => (
                          <button
                            key={l.id}
                            className="nav-item"
                            style={{ width: "100%", textAlign: "left", justifyContent: "flex-start", gap: 10, padding: "8px 12px", borderRadius: 8, marginBottom: 4, cursor: "pointer" }}
                            onClick={() => handleLessonClick(l.id)}
                          >
                            <span style={{ color: "#C4B5FD", fontWeight: 700, fontSize: 12, minWidth: 24 }}>{l.number}</span>
                            <span>{l.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}
            </section>
          )}
        </main>

        {/* PROGRESS */}
        <main className={`view ${view === "progress" ? "is-active" : ""}`}>
          <section className="two-col">
            <div className="panel">
              <div className="panel-head">
                <h3><BarChart3 /> {t("progress.practiceMinutes")}</h3>
              </div>
              <div className="bar-chart">
                {WEEKS_DATA.map((w, i) => (
                  <div key={i} className="bar-col">
                    <div className="bar-fill" style={{ height: `${(w.minutes / barMax) * 100}%` }} title={`${w.minutes} min`}></div>
                    <span>{w.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="panel">
              <div className="panel-head">
                <h3><Grid3x3 /> {t("progress.consistency")}</h3>
              </div>
              <div className="heatmap">
                {heatmapCells.map((level, i) => (
                  <div key={i} className={`heat-cell h${level}`} title={t("progress.level", { level })} />
                ))}
              </div>
              <div className="heatmap-legend">
                <span>{t("progress.less")}</span>
                <div className="heat-swatch h0"></div>
                <div className="heat-swatch h1"></div>
                <div className="heat-swatch h2"></div>
                <div className="heat-swatch h3"></div>
                <div className="heat-swatch h4"></div>
                <span>{t("progress.more")}</span>
              </div>
            </div>
          </section>

          <section className="stat-grid">
            <div className="stat-card">
              <div className="stat-icon stat-icon-violet"><Trophy /></div>
              <div className="stat-num">14</div>
              <div className="stat-label">{t("progress.badges")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-blue"><TrendingUp /></div>
              <div className="stat-num">+18%</div>
              <div className="stat-label">{t("progress.precisionVsLastMonth")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-green"><CalendarCheck2 /></div>
              <div className="stat-num">21</div>
              <div className="stat-label">{t("progress.longestStreak")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-amber"><Star /></div>
              <div className="stat-num">4.8</div>
              <div className="stat-label">{t("progress.teacherRating")}</div>
            </div>
          </section>
        </main>

        {/* ADMIN */}
        <main className={`view ${view === "admin" ? "is-active" : ""}`}>
          <section className="stat-grid">
            <div className="stat-card">
              <div className="stat-icon stat-icon-violet"><Users /></div>
              <div className="stat-num">3,482</div>
              <div className="stat-label">{t("admin.activeStudents")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-blue"><LibraryBig /></div>
              <div className="stat-num">46</div>
              <div className="stat-label">{t("admin.publishedCourses")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-green"><Server /></div>
              <div className="stat-num">99.98%</div>
              <div className="stat-label">{t("admin.platformUptime")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-amber"><Ticket /></div>
              <div className="stat-num">7</div>
              <div className="stat-label">{t("admin.openTickets")}</div>
            </div>
          </section>

          <section className="two-col">
            <div className="panel">
              <div className="panel-head">
                <h3><UserRound /> {t("admin.recentStudents")}</h3>
                <button className="link-btn">{t("admin.viewAll")}</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr><th>{t("admin.tableStudent")}</th><th>{t("admin.tableCourse")}</th><th>{t("admin.tableProgress")}</th><th>{t("admin.tableStatus")}</th></tr>
                </thead>
                <tbody>
                  {ADMIN_STUDENTS.map((s, i) => (
                    <tr key={i}>
                      <td>
                        <div className="table-user">
                          <div className="avatar avatar-sm" style={{ "--h": String(s.hue) } as React.CSSProperties}>{s.initials}</div>
                          <span>{s.name}</span>
                        </div>
                      </td>
                      <td>{s.course}</td>
                      <td>
                        <div className="mini-progress"><div className="mini-progress-fill" style={{ width: `${s.progress}%` }}></div></div>
                      </td>
                      <td><span className={`status-dot ${s.status}`}>{s.status === "idle" ? t(s.statusLabel, { days: s.idleDays ?? 0 }) : t(s.statusLabel)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3><Megaphone /> {t("admin.contentStatus")}</h3>
              </div>
              <ul className="content-status-list">
                <li>
                  <div className="content-status-icon status-live"><CheckCircle2 /></div>
                  <div className="activity-body">
                    <span className="activity-title">{t("admin.module4")}</span>
                    <span className="activity-sub">{t("admin.module4Sub")}</span>
                  </div>
                </li>
                <li>
                  <div className="content-status-icon status-review"><Clock4 /></div>
                  <div className="activity-body">
                    <span className="activity-title">{t("admin.module5")}</span>
                    <span className="activity-sub">{t("admin.module5Sub")}</span>
                  </div>
                </li>
                <li>
                  <div className="content-status-icon status-draft"><PencilLine /></div>
                  <div className="activity-body">
                    <span className="activity-title">{t("admin.courseJazz")}</span>
                    <span className="activity-sub">{t("admin.courseJazzSub")}</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>

      <div
        className={`mobile-overlay ${sidebarOpen ? "is-open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
    </div>
  );
}
