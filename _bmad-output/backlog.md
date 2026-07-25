# PlayingKeys — Product Backlog

## Sprint 1: Foundation (current)

### Story 1.1: Dark theme app shell ✅
**As** a user, **I want** a polished dark-themed interface matching the reference design.
**Status:** Done. CSS ported exactly. Sidebar, topbar, 5 views.

### Story 1.2: Interactive piano with sound ✅
**As** a student, **I want** to tap piano keys and hear accurate sound.
**Status:** Done. Web Audio API (web), expo-av + WAV files (native).

### Story 1.3: Note practice game ✅
**As** a student, **I want** a target note game with feedback and streak.
**Status:** Done. Random target, correct/wrong feedback, streak counter.

### Story 1.4: API serves lessons and units ✅
**As** a platform, **I want** NestJS API serving curriculum data from PostgreSQL.
**Status:** Done. `/api/units`, `/api/lessons` CRUD. 9 units, 7 lessons seeded.

### Story 1.5: Mobile fetches from API
**As** a student, **I want** my courses screen to show real curriculum data.
**Status:** Done. `fetchUnits()` wired. Loading/error/empty states.

### Story 1.6: Metronome
**As** a student, **I want** a tempo control and metronome during practice.
**Status:** Done (web). Mobile has UI but no actual metronome audio yet.

### Story 1.7: Course cards from API
**As** a student, **I want** to see all available courses/units as cards.
**Status:** Done. Web fetches from API, mobile fetches from API.

---

## Sprint 2: Core Learning Flow

### Story 2.1: Lesson detail with content from API
**As** a student, **I want** to open a lesson and see its instructions, notation info, and fingering.
**Status:** Partial. Mobile fetches from API. Web needs lesson detail view.

### Story 2.2: Mark lesson complete (progress tracking)
**As** a student, **I want** to mark a lesson as complete and see my progress update.
**Status:** Partial. Button exists but doesn't persist to DB. Need `POST /api/progress` endpoint.

### Story 2.3: Progress dashboard
**As** a student, **I want** to see my practice stats (minutes, streak, accuracy).
**Status:** UI exists (bar chart, heatmap, stat cards). All dummy data. Need real tracking.

### Story 2.4: Mobile metronome audio
**As** a student, **I want** the metronome to actually tick on mobile.
**Status:** Not started. Need expo-av tick sound.

---

## Sprint 3: Auth & Users

### Story 3.1: User registration
**As** a new student, **I want** to create an account with email/password.
**Status:** Not started. Schema exists (User model). Need auth module.

### Story 3.2: Login + JWT
**As** a user, **I want** to log in and receive a JWT token.
**Status:** Not started. Need AuthModule, login endpoint, JWT strategy.

### Story 3.3: Role-based routing
**As** an admin/teacher/student, **I want** to see only my allowed views.
**Status:** Not started. Need guard + role check.

---

## Sprint 4: Admin Management

### Story 4.1: Admin student management
**As** an admin, **I want** to view, create, edit students.
**Status:** UI table exists. Need CRUD endpoints.

### Story 4.2: Admin teacher management
**As** an admin, **I want** to manage teachers and assign students.
**Status:** UI cards exist. Need CRUD endpoints.

### Story 4.3: Payment tracking
**As** an admin, **I want** to track student payments and due dates.
**Status:** UI table exists. Need Payment CRUD + integration.

---

## Deferred

- Sheet music rendering (complex, defer to Sprint 5+)
- Audio recording/evaluation
- Push notifications
- EAS production builds
- CI/CD pipeline
