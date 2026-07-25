# PlayingKeys Specification

Canonical product and engineering contract for PlayingKeys.

## Metadata

- Project: PlayingKeys
- Owner: Carlo
- Status: active
- Last reviewed: 2026-07-25
- Product/domain in focus: Piano education platform

## Product

### Problem

Learning piano traditionally requires expensive in-person lessons, scheduling coordination, and limited access to structured curriculum. Students often struggle with consistent practice, tracking progress, and maintaining motivation without immediate feedback.

### Outcome

A mobile-first piano learning platform that provides interactive lessons, real-time feedback, progress tracking, and teacher-student connectivity — making quality piano education accessible, engaging, and measurable.

### Users And Roles

| Role | Goal | Allowed actions | Forbidden actions |
| --- | --- | --- | --- |
| Student | Learn piano through structured lessons | Practice lessons, track progress, view assignments, play piano keys with sound | Access other students' data, modify lessons, manage payments |
| Teacher | Manage students, assign lessons, track progress | View student progress, assign lessons, add notes/grades, manage schedule | Access payment data, modify system settings |
| Admin | Manage platform, teachers, students, billing | Full CRUD on all entities, manage subscriptions, view analytics | None (full access within business rules) |

### Scope

- In: Interactive piano lessons with sound, progress tracking, teacher dashboard, student management, membership status
- Out for now: Payment gateway integration (manual tracking initially), real-time video lessons, AI-powered lesson generation
- Success signal: Students complete lessons consistently, teachers actively manage students, no critical bugs in production

## Business Rules And Invariants

| ID | Rule | Enforcement | Evidence |
| --- | --- | --- | --- |
| BR-001 | Each lesson belongs to exactly one unit | Database constraint | Schema migration |
| BR-002 | Student progress is cumulative; cannot skip prerequisites | Server validation | API tests |
| BR-003 | Teachers can only access their assigned students | Server authorization | Integration tests |
| BR-004 | Payment status must be verified before lesson access | Server middleware | E2E tests |
| BR-005 | Lesson content is immutable once published | Database constraint | Schema tests |
| BR-006 | Piano keys produce accurate sound frequencies | Client validation | Unit tests |

## User Flows

### Student Practice Flow

1. Student opens app → sees dashboard with assigned lessons
2. Selects lesson → reads instructions, views notation
3. Practices on interactive piano → hears accurate sound
4. Completes lesson → progress updates automatically
5. Teacher reviews progress and adds feedback

### Teacher Management Flow

1. Teacher logs in → sees assigned students
2. Selects student → views progress, notes, grades
3. Assigns new lesson → student receives notification
4. Reviews completed work → adds feedback and grades

### Admin Operations Flow

1. Admin logs in → sees platform analytics
2. Manages teachers → assigns students
3. Manages students → views payment status
4. Creates/modifies lessons → publishes to curriculum

## Architecture

- Stack: React Native Expo (mobile), Next.js (web dashboard), NestJS (API), PostgreSQL
- Runtime/deployment: Expo Go (dev) → EAS (production), Vercel (web), Railway/Render (API)
- Package manager: npm
- System boundaries: Mobile app, Web dashboard, API server, PostgreSQL database
- Source of truth: PostgreSQL for all persistent data, API for business logic
- Heavy or irreversible decisions: Payment gateway selection deferred to Phase 2

```txt
playingkeys/
├── apps/
│   ├── mobile/          # React Native Expo
│   ├── web/             # Next.js admin dashboard & showcase
│   └── api/             # NestJS backend
├── packages/
│   ├── domain/          # Shared business logic
│   ├── contracts/       # API contracts, types
│   └── database/        # Prisma schema, migrations
├── docs/
├── _bmad-output/
├── .codegraph/
└── .agents/skills/
```

## Code Semantics

- Names express domain intent: Lesson, Unit, Student, Teacher, Progress, Payment
- UI renders, services own workflows, repositories persist and validators guard boundaries
- Keep derived state derived; do not duplicate server state in client stores
- `GET` operations are read-only. Mutations use explicit commands/endpoints
- Public contracts change additively unless a migration and impact audit approve a break
- Unknown external data enters as `unknown` and is narrowed or schema-validated
- Background and retry-prone operations are idempotent

## Data

| Entity | Owner/scope | Key invariants | Retention/audit |
| --- | --- | --- | --- |
| Unit | System | Unique ordering, non-deletable when lessons exist | Permanent |
| Lesson | System | Belongs to exactly one unit, immutable when published | Permanent |
| Student | Tenant | Unique email, belongs to one teacher | Permanent with audit |
| Teacher | Tenant | Unique email, has assigned students | Permanent with audit |
| Progress | Student | One record per student-lesson pair, cumulative | Permanent with timestamps |
| Payment | Student | Status must be current, manual update initially | Permanent with audit |
| Note | Teacher-Student | Text content, timestamped | Permanent |

- PostgreSQL constraints enforce important invariants
- Tenant-owned queries include tenant ownership server-side
- Migrations are additive by default, reviewed before apply and paired with rollback/recovery notes
- Seeds are idempotent, clearly non-production and removable
- Caches and vector stores are rebuildable indexes, never silent authorities

## API And Integrations

| Contract | Auth/role | Input/output | Failure behavior | Evidence |
| --- | --- | --- | --- | --- |
| GET /api/lessons | Student, Teacher, Admin | List of lessons with progress | 500 with retry | Integration tests |
| GET /api/lessons/:id | Student, Teacher, Admin | Lesson detail with content | 404 if not found | Integration tests |
| POST /api/progress | Student | Progress update | 400 validation, 409 duplicate | Integration tests |
| GET /api/students | Teacher, Admin | Student list with filters | 500 with retry | Integration tests |
| PUT /api/students/:id | Admin | Student update | 404, 400 validation | Integration tests |
| POST /api/notes | Teacher | Note creation | 400 validation | Integration tests |
| GET /api/payments | Admin | Payment status list | 500 with retry | Integration tests |
| PUT /api/payments/:id | Admin | Payment status update | 404, 400 validation | Integration tests |

External integrations must define timeout, retry, rate-limit, fallback, secret ownership and observability behavior.

## Security And Privacy

- Trust boundaries: Student data isolated by teacher assignment, admin has full access
- Sensitive data: Student PII encrypted at rest, payment status audited
- Authorization: Server-side RBAC with teacher-student relationship verification
- Destructive actions: Require confirmation, audit logged, rollback available
- Logs: Structured logs with correlation IDs, no secrets or PII in logs
- Abuse/rate limits: API rate limiting per user, brute force protection on auth

UI hiding is not authorization. Destructive or financial actions require explicit confirmation and auditable outcomes.

## UI And Styling Contract

- Design tokens: NativeWind theme with custom piano-specific colors
- Approved icon library: Lucide; no emoji as product icons
- Navigation exposes only complete, permitted workflows
- Every visible control performs a useful, verifiable action
- Every async surface models loading, empty, error, success, disabled and permission states where relevant
- Styling-only work cannot alter data, routes, permissions or APIs or behavior
- Responsive behavior is defined per workflow; mobile is primary, tablet and desktop are secondary
- Long localized text, overflow, focus, contrast, hit targets and reduced motion are verified
- Theme toggles remain hidden until every surface supports each offered theme
- Piano keys must be touchable with accurate sound feedback
- Lesson content must be readable and pedagogically clear

## Performance And Reliability

- Budgets: < 2s initial load, < 100ms key press response, < 500ms API response
- Expected scale: 1000 concurrent students, 100 teachers, 50,000 lessons
- Expensive paths: Lesson content rendering, audio playback initialization
- Failure isolation: Audio failures degrade gracefully, API timeouts retry with backoff

Profile before memoizing or virtualizing. Parallelize independent I/O. Lazy-load genuinely heavy routes, editors, maps, charts and media.

## Observability And Operations

- Health/readiness: GET /api/health returns 200 with DB connection status
- Structured logs and correlation IDs: Request ID middleware, user context logging
- Metrics/alerts: API response times, error rates, active users
- Backup/restore: Daily PostgreSQL backups, 7-day retention
- Deployment and rollback: EAS for mobile, Vercel for web, Railway for API
- Environment ownership: Development (local), Staging (pre-prod), Production

## BMAD Governance

Before generating multiple stories or tasks, ask exactly:

```txt
Como queres revisar este trabajo?
1. Una historia/task a la vez
2. En bloques de X historias/tasks
3. Por sprint completo
4. Solo al final como borrador
```

Record the answer here:

- Review mode: `por-sprint`
- Block size when applicable: `3`
- Sprint length: `15 working days, Monday through Friday`
- Gross capacity: `8 hours/day, 40 hours/week, 120 hours/sprint`
- WIP limit: `3 concurrent tasks`
- Last reviewed artifact: `none`

Rules:

- `una-a-una`: stop after each story/task for review.
- `bloques`: stop after exactly `X` new artifacts.
- `por-sprint`: confirm objective, real capacity, risks and WIP before generation; review at planning close.
- `solo-al-final`: generated work remains a draft until explicit review.
- High-risk auth, money, permissions, destructive data, migration and production work is reviewed individually regardless of cadence.
- Changing cadence never deletes or silently rewrites accepted work.

## Delivery States

`idea -> brief -> specified -> ready -> in-progress -> review -> accepted -> released`

### Definition Of Ready

- Outcome, role, scope and business rules are clear.
- Dependencies and risk are classified.
- Data, permissions, states and acceptance criteria are defined.
- Review cadence permits the item to start.

### Definition Of Done

- Observable acceptance criteria pass.
- Typecheck/lint/build and focused tests pass where available.
- Security, accessibility, responsive and failure states were checked for the changed scope.
- Docs and BMAD status match implementation.
- Deployment, migration and rollback evidence exists when relevant.
- No known broken workflow or undeclared production blocker remains.

## Risks, Decisions And Deferred Work

| ID | Type | Description | Owner | Trigger/review date |
| --- | --- | --- | --- | --- |
| R-001 | deferred | Payment gateway integration (manual tracking initially) | Carlo | Phase 2 planning |
| R-002 | decision | Use Expo Go for development, EAS for production | Carlo | Confirmed |
| R-003 | decision | PostgreSQL with Prisma ORM | Carlo | Confirmed |
| R-004 | decision | Biome JS for linting/formatting | Carlo | Confirmed |
| R-005 | risk | OCR extraction quality from PDF lessons | Carlo | Verify after first lesson import |

Repeated rules become framework candidates only after they prove useful in multiple real projects. Project-specific behavior stays in the project.