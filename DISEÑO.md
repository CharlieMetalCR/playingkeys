# PlayingKeys — Especificación de Diseño Frontend

**Propósito:** Documento para que Claude genere un HTML/CSS completo de todas las pantallas de PlayingKeys, tanto mobile como web dashboard.

---

## 1. Sistema de Diseño (Design Tokens)

### Colores

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg` | `#0B0F17` | Fondo principal |
| `--bg-2` | `#111827` | Fondo secundario (sidebar, inputs) |
| `--card` | `#1A2233` | Tarjetas, paneles |
| `--card-hover` | `#202B41` | Hover de tarjetas |
| `--border` | `#273244` | Bordes, separadores |
| `--text` | `#F9FAFB` | Texto principal |
| `--text-2` | `#9CA3AF` | Texto secundario |
| `--text-3` | `#6B7686` | Texto terciario (muted) |
| `--violet` | `#7C3AED` | Color primario (accent) |
| `--violet-soft` | `rgba(124,58,237,.16)` | Fondo violeta suave |
| `--violet-text` | `#C4B5FD` | Texto violeta claro |
| `--green` | `#22C55E` | Éxito, correcto |
| `--green-soft` | `rgba(34,197,94,.14)` | Fondo verde suave |
| `--blue` | `#38BDF8` | Información, enlaces |
| `--blue-soft` | `rgba(56,189,248,.14)` | Fondo azul suave |
| `--amber` | `#F59E0B` | Advertencia, racha |
| `--amber-soft` | `rgba(245,158,11,.16)` | Fondo ámbar suave |
| `--red` | `#EF4444` | Error, incorrecto |
| `--red-soft` | `rgba(239,68,68,.14)` | Fondo rojo suave |

### Tipografía

| Rol | Font | Pesos |
|-----|------|-------|
| Display (headings) | `Manrope` | 500, 700, 800 |
| Body | `Inter` | 400, 500, 600 |
| Mono (números) | `JetBrains Mono` | 500, 600 |

### Radios

| Token | Valor |
|-------|-------|
| `--radius-sm` | `10px` |
| `--radius-md` | `16px` |
| `--radius-lg` | `22px` |
| `--radius-full` | `999px` |

### Sombras

`0 1px 0 rgba(255,255,255,.03) inset, 0 12px 28px -18px rgba(0,0,0,.65)`

### Background global

```
radial-gradient(1200px 600px at 85% -10%, rgba(124,58,237,.10), transparent 60%),
radial-gradient(900px 500px at -10% 110%, rgba(245,158,11,.06), transparent 55%),
var(--bg)
```

---

## 2. Routing y Arquitectura de Navegación

### Mobile (React Native Expo Router)

```
_ layout.tsx (I18nProvider > AuthProvider > AuthGate)
├── login.tsx          → Stack (no autenticado)
├── register.tsx       → Stack (no autenticado)
└── (tabs)/            → Tab Navigator (autenticado)
    ├── index.tsx      → Tab: Home (LayoutGrid)
    ├── practice.tsx   → Tab: Practice (Piano)
    ├── courses.tsx    → Tab: Courses (LibraryBig)
    ├── progress.tsx   → Tab: Progress (ChartNoAxesCombined)
    ├── admin.tsx      → Tab: Admin (ShieldHalf) — solo ADMIN
    ├── teacher.tsx    → Tab: Teacher (Users) — solo TEACHER
    └── profile.tsx    → Tab: Profile (User) — siempre visible
    └── lesson/[id].tsx → Stack interno desde courses
```

### Web Dashboard (Next.js App Router)

```
/                   → Landing page pública
/admin              → Dashboard web completo (SPA con vistas internas)
  ├── dashboard     → Vista: Dashboard principal (default)
  ├── practice      → Vista: Practice Lab
  ├── courses       → Vista: Cursos
  │   └── lesson/:id → Vista detalle de lección (inline)
  ├── progress      → Vista: Progreso
  └── admin         → Vista: Admin panel (solo rol ADMIN)
/teacher            → Página separada para profesores
```

---

## 3. Pantallas Mobile — Wireframes Detallados

### 3.1 Login (`login.tsx`)

```
┌─────────────────────────────────────┐
│                                     │
│   ┌───────────────────────────┐     │
│   │       PlayingKeys         │     │
│   │    Inicia sesión para     │     │
│   │   continuar aprendiendo   │     │
│   │                           │     │
│   │   CORREO ELECTRÓNICO      │     │
│   │   ┌───────────────────┐   │     │
│   │   │ email@ejemplo.com │   │     │
│   │   └───────────────────┘   │     │
│   │                           │     │
│   │   CONTRASEÑA              │     │
│   │   ┌───────────────────┐   │     │
│   │   │    ••••••         │   │     │
│   │   └───────────────────┘   │     │
│   │                           │     │
│   │   ┌───────────────────┐   │     │
│   │   │   Iniciar sesión  │   │     │
│   │   └───────────────────┘   │     │
│   │                           │     │
│   │   ¿No tienes cuenta?     │     │
│   │   ────────────────────   │     │
│   └───────────────────────────┘     │
│                                     │
└─────────────────────────────────────┘
```

- Fondo `--bg`
- Card centrado con `--card` background, `--border` border, `--radius-lg`
- Título "PlayingKeys" 28px bold centered
- Inputs estilo oscuro: `--bg-2` bg, `--border` border, `--radius` 12px
- Botón primario: `--violet` bg, `--radius-full`, 14px padding vertical
- Link a registro: `--violet-text` color

### 3.2 Register (`register.tsx`)

Misma estructura que login pero con 3 campos (nombre, email, password) y título "Crear cuenta".

### 3.3 Home Dashboard (`(tabs)/index.tsx`)

```
┌─────────────────────────────────────┐
│  [Status Bar]                       │
├─────────────────────────────────────┤
│  ¡Hola de nuevo!         🔥 3 días  │
│  Listo para practicar?              │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐  │
│  │ CONTINUAR                     │  │
│  │                               │  │
│  │ Lección 5: Acordes mayores   │  │
│  │ Sigue practicando acordes    │  │
│  │ mayores en posición abierta. │  │
│  │                               │  │
│  │ ████████████░░░░ 60%         │  │
│  │ 60% · Restante               │  │
│  │                               │  │
│  │ ┌─────────────────────────┐   │  │
│  │ │ 🎵 Continuar lección    │   │  │
│  │ └─────────────────────────┘   │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌──────┐ ┌──────┐                  │
│  │ 📚   │ │ 🎵   │                  │
│  │   7  │ │  128 │                  │
│  │ Cursos│ │Lecc. │                  │
│  └──────┘ └──────┘                  │
│  ┌──────┐ ┌──────┐                  │
│  │ ⏱️   │ │ ⚡   │                  │
│  │ 87%  │ │  12  │                  │
│  │Precis.│ │Racha │                  │
│  └──────┘ └──────┘                  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ ACTIVIDAD RECIENTE    Semana  │  │
│  │                               │  │
│  │ 🎵 Práctica diaria    Agendada│  │
│  │ 📚 Lección 4          Siguien.│  │
│  │ 🔥 Revisión semanal  Pendien.│  │
│  └───────────────────────────────┘  │
│                                     │
│  [Tab Bar: Home, Practice,          │
│   Courses, Progress, Profile]       │
└─────────────────────────────────────┘
```

**Elementos:**
- Saludo con nombre y chip de racha (icono llama + número, fondo `--amber-soft`)
- Tarjeta "Continuar" con barra de progreso, botón primario con icono Music
- Grid 2×2 de estadísticas con iconos en fondos coloreados
- Panel actividad reciente con 3 items (icono, texto, chip de estado)
- ScrollView con contentContainerStyle paddingBottom 40

### 3.4 Practice Lab (`(tabs)/practice.tsx`)

```
┌─────────────────────────────────────┐
│  [Status Bar]                       │
├─────────────────────────────────────┤
│  Práctica                 ⏱️ 100 ▲ │
│  Lección 3 · Acordes        🔊    │
│                                     │
│  ┌────────────┐ ┌────────────────┐  │
│  │ NOTA       │ │ MONITOR        │  │
│  │ OBJETIVO   │ │ ▄▄▄▄▄▄▄▄▄▄▄▄▄▄ │  │
│  │            │ │ ███▄█▄█▄██▄█▄▄ │  │
│  │    G       │ │ ██████████████ │  │
│  │            │ │ ██████████████ │  │
│  │ ┌────────┐ │ │                │  │
│  │ │✓ Corre.│ │ │ 09:42    91%  │  │
│  │ └────────┘ │ │                │  │
│  │ ⚡ 6 racha │ └────────────────┘  │
│  └────────────┘                     │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ ┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐⋯  │    │
│  │ │C││D││E││F││G││A││B│⋯  │    │
│  │ └─┘└─┘└─┘└─┘└─┘└─┘└─┘⋯  │    │
│  │   ┌┘  ┌┘      ┌┘  ┌┘  ┌┘     │    │
│  │   │C#│ │D#│    │F#│ │G#│ │A#│    │    │
│  │   └─┘ └─┘    └─┘ └─┘ └─┘    │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Tab Bar]                          │
└─────────────────────────────────────┘
```

**Elementos:**
- Header con título, lección actual, control de tempo (botones +/-, valor BPM), botón metrónomo
- Panel izquierdo: nota objetivo (label pequeño, nota grande 44px, feedback con animación, racha)
- Panel derecho: monitor con waveform animado (30 barras de altura variable), timer y precisión
- Piano interactivo: 12 teclas (7 blancas + 5 negras), whites flex, blacks positioned absolute
- Tecla activa: fondo azul `#38BDF8` (blancas) o violeta `#7C3AED` (negras)

### 3.5 Courses (`(tabs)/courses.tsx`)

```
┌─────────────────────────────────────┐
│  [Status Bar]                       │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐  │
│  │ [cover gradient]        📚   │  │
│  │ [Unidad 1 badge]             │  │
│  ├───────────────────────────────┤  │
│  │ Fundamentos del piano        │  │
│  │ Postura, lectura de          │  │
│  │ pentagrama...                │  │
│  │ 12 lecciones             ▸   │  │
│  │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │  │
│  │ (expanded)                   │  │
│  │ ① Introducción          ▸   │  │
│  │ ② Postura correcta      ▸   │  │
│  │ ③ Mano derecha          ▸   │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ [cover gradient]        🎼   │  │
│  │ [Unidad 2 badge]             │  │
│  ├───────────────────────────────┤  │
│  │ Armonía básica               │  │
│  │ Acordes mayores y            │  │
│  │ menores...                   │  │
│  │ 8 lecciones              ▸   │  │
│  └───────────────────────────────┘  │
│                                     │
│  [Tab Bar]                          │
└─────────────────────────────────────┘
```

**Elementos:**
- Cards de unidad con cover gradient (6 colores distintos), icono, badge de número
- Body: título, descripción (2 líneas), footer con count de lecciones + chevron
- Expandible: al presionar, muestra lista de lecciones con número circular y título
- Cada lección navega a `lesson/[id]`
- Estados: loading (spinner), error (mensaje rojo + botón reintentar), empty (mensaje)

### 3.6 Lesson Detail (`lesson/[id].tsx`)

```
┌─────────────────────────────────────┐
│  ← Atrás                            │
├─────────────────────────────────────┤
│                                     │
│  UNIDAD 1 · FUNDAMENTOS             │
│                                     │
│  Lección 3: Mano Derecha           │
│  ★★☆                                │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ INSTRUCCIONES                 │  │
│  │                               │  │
│  │ Coloca la mano derecha...    │  │
│  └───────────────────────────────┘  │
│                                     │
│  ARMADURA          DIGITACIÓN      │
│  ┌────────┐       ┌──────────┐     │
│  │ Do Mayor│       │ 1-2-3-4-5 │    │
│  └────────┘       └──────────┘     │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ PIANO DE PRÁCTICA             │  │
│  │ ┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐      │  │
│  │ │C││D││E││F││G││A││B│      │  │
│  │ └─┘└─┘└─┘└─┘└─┘└─┘└─┘      │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ GRABACIÓN                     │  │
│  │                               │  │
│  │   Toca para empezar a grabar │  │
│  │                               │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │ 🎤 Iniciar grabación    │  │  │
│  │  └─────────────────────────┘  │  │
│  │                               │  │
│  │  (estados: recording →        │  │
│  │   recorded → playback/analyze │  │
│  │   → result with pitch)        │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ ▶ Marcar como completada      │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Elementos:**
- Botón "Atrás" con ArrowLeft y texto
- Header con unidad, título de lección, dificultad (estrellas)
- Secciones condicionales: instrucciones, armadura, digitación, dinámicas
- Piano mini (7 teclas blancas, display-only, no interactivo)
- Módulo de grabación con 4 estados (idle, recording, recorded, result)
- Botón completar — cambia a verde con checkmark cuando se completa

### 3.7 Progress (`(tabs)/progress.tsx`)

```
┌─────────────────────────────────────┐
│  [Status Bar]                       │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐  │
│  │ PROGRESO SEMANAL              │  │
│  │   ██                           │  │
│  │ ████ ██                        │  │
│  │ ████ ████ ██                   │  │
│  │ ████ ████ ████ ████           │  │
│  │ ████ ████ ██████████ ████     │  │
│  │ █████████████████████████████  │  │
│  │ S1  S2  S3  S4  S5  S6  S7   │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ HISTORIAL (84 días)           │  │
│  │ ██░░█░█░███░░█░██░░░█░░█░   │  │
│  │ █░░██░█░░██████░██░██░░█░   │  │
│  │ ██░░░░░░██░░█░░█░███░░░░░   │  │
│  │ ░██░██░░██░█░░█░░██░░██░█   │  │
│  │ ░░░░░████░██░░█░████░░░░░   │  │
│  │ █████░░█░██████████░██░██   │  │
│  │ Menos          Más           │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌──────┐ ┌──────┐                  │
│  │ 🏆   │ │ 🎯   │                  │
│  │  14  │ │ 87%  │                  │
│  │Comple.│ │Punt.p.│                  │
│  └──────┘ └──────┘                  │
│  ┌──────┐ ┌──────┐                  │
│  │ 🔥   │ │ ⭐   │                  │
│  │  5   │ │  32  │                  │
│  │Racha │ │Total │                  │
│  └──────┘ └──────┘                  │
│                                     │
│  [Tab Bar]                          │
└─────────────────────────────────────┘
```

**Elementos:**
- Gráfico de barras semanal (7 semanas, colores: gradiente violeta-azul)
- Mapa de calor 84 días (14×6 grid, 5 niveles de intensidad: `#111827` → `#7C3AED`)
- Leyenda del heatmap con swatches
- Grid 2×2 estadísticas (completados, puntaje promedio, racha, total)

### 3.8 Profile (`(tabs)/profile.tsx`)

```
┌─────────────────────────────────────┐
│  ┌───────────────────────────────┐  │
│  │        [Avatar 80px]          │  │
│  │         Carlos Pérez          │  │
│  │       carlos@email.com        │  │
│  │       ┌──────────────┐        │  │
│  │       │  ESTUDIANTE   │        │  │
│  │       └──────────────┘        │  │
│  └───────────────────────────────┘  │
│                                     │
│  CUENTA                            │
│  ⚙️ Configuración           ▸     │
│  🔔 Notificaciones    [Activo] ▸  │
│  💳 Membresía         [Activo] ▸  │
│                                     │
│  SOPORTE                           │
│  ❓ Ayuda                   ▸     │
│  🛡️ Privacidad             ▸     │
│                                     │
│  IDIOMA                            │
│  ⚙️ Seleccionar idioma      En ▸  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ 🚪 Cerrar sesión              │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Elementos:**
- Sección de avatar (80px círculo violeta con inicial)
- Grupos de menú con secciones "CUENTA", "SOPORTE", "IDIOMA"
- Cada item: icono en caja coloreada (32px), label, badge o chevron
- Botón cerrar sesión con icono rojo

### 3.9 Admin (`(tabs)/admin.tsx`)

```
┌─────────────────────────────────────┐
│  Admin Panel                        │
│  PlayingKeys Platform               │
├─────────────────────────────────────┤
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ 👥   │ │ 📚   │ │ 💳   │        │
│  │  15  │ │   3  │ │  45  │        │
│  │Estud. │ │Prof. │ │Pagos │        │
│  └──────┘ └──────┘ └──────┘        │
│                                     │
│  ACCIONES                           │
│  👥 Gestionar Estudiantes    ▸     │
│  📚 Gestionar Profesores     ▸     │
│  💳 Gestionar Pagos          ▸     │
└─────────────────────────────────────┘
```

- Stats en cards horizontales
- Menú de acciones para CRUD

### 3.10 Teacher (`(tabs)/teacher.tsx`)

```
┌─────────────────────────────────────┐
│  Panel de Profesor                  │
├─────────────────────────────────────┤
│  ┌────────┐ ┌────────┐ ┌────────┐   │
│  │ 👥  3  │ │ 📈 72%│ │ 📚  45│   │
│  │Estud.  │ │Prog.  │ │Comple.│   │
│  └────────┘ └────────┘ └────────┘   │
│                                     │
│  MIS ESTUDIANTES                    │
│  ┌───────────────────────────────┐  │
│  │ [MP] Mateo Pineda             │  │
│  │      mateo@email.com          │  │
│  │      ████████░░ 8/10          │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ [LR] Lucía Ramírez            │  │
│  │      lucia@email.com          │  │
│  │      ████░░░░░░ 4/10          │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

- Stats row: estudiantes, progreso promedio, completados
- Lista de estudiantes con avatar circular (color por hash de nombre), nombre, email, barra de progreso

---

## 4. Dashboard Web — Wireframes Detallados

### 4.1 Layout General (`/admin`)

```
┌──────────────────────────────────────────────────────┐
│ ┌──────────┐ ┌──────────────────────────────────────┐│
│ │ SIDEBAR  │ │ TOPBAR                                ││
│ │ 248px    │ │ [Search...]     🔥 12 d   🔔   EN  ││
│ │          │ ├──────────────────────────────────────┤│
│ │ 🏠 Dash   │ │                                      ││
│ │ 🎹 Pract │ │           VIEW CONTENT                ││
│ │ 📚 Curs  │ │                                      ││
│ │ 📊 Progr │ │                                      ││
│ │          │ │                                      ││
│ │ ──────── │ │                                      ││
│ │ ⚙️ Admin │ │                                      ││
│ │          │ │                                      ││
│ │ ──────── │ │                                      ││
│ │ 🔄 Role  │ │                                      ││
│ │ ┌──────┐ │ │                                      ││
│ │ │[AV] A.│ │ │                                      ││
│ │ │Vargas │ │ │                                      ││
│ │ │ ADMIN │ │ │                                      ││
│ │ └──────┘ │ │                                      ││
│ └──────────┘ └──────────────────────────────────────┘│
└──────────────────────────────────────────────────────┘
```

**Sidebar:**
- Brand: icono SVG de tecla de piano (violeta) + "PlayingKeys"
- Nav items con iconos Lucide + label
- Divider + role switch (Student/Admin toggle)
- User card abajo: avatar gradient con iniciales, nombre, rol

**Topbar:**
- Título + subtítulo de vista actual
- Search bar (solo desktop)
- Streak chip (llama + días)
- Notificaciones (icono + dot badge)
- Language toggle (ES/EN)
- Avatar pequeño

### 4.2 Dashboard View (`/admin`, default)

```
┌──────────────────────────────────────────────────────┐
│ CONTINUAR APRENDIENDO                                │
│ ┌─────────────────────────┐ ┌──────────────────────┐ │
│ │ 💿 Módulo 3             │ │  [Mini piano visual] │ │
│ │                         │ │  ┌─┐┌─┐┌─┐┌─┐⋯    │ │
│ │ Lección 7: Acordes      │ │  └─┘└─┘└─┘└─┘      │ │
│ │ en posición abierta     │ │   ┌┘ ┌┘   ┌┘       │ │
│ │                         │ │                      │ │
│ │ ████████████░░ 64%     │ │                      │ │
│ │ 64% · Restante          │ │                      │ │
│ │                         │ │                      │ │
│ │ [▶ Continuar] [📋 Plan]│ │                      │ │
│ └─────────────────────────┘ └──────────────────────┘│
│                                                      │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                │
│ │🎓 7  │ │✓ 128 │ │⏱️34h │ │🔥 12 │                │
│ │Cursos│ │Lecc. │ │Tiempo│ │Racha │                │
│ └──────┘ └──────┘ └──────┘ └──────┘                │
│                                                      │
│ ┌──────────────────┐ ┌──────────────────┐           │
│ │ ACTIVIDADES      │ │ RACHA SEMANAL    │           │
│ │                  │ │                   │           │
│ │ 🎹 Escalas  Hoy │ │ L ✓ │ M ✓ │ M ✓  │           │
│ │ 🎼 Teoría  Mañan│ │ J ✓ │ V ✓ │ S ●  │           │
│ │ 🎤 Grabación  Ju│ │ D ○                │           │
│ │                  │ │                   │           │
│ │ [Ver todo]      │ │ ✨ Buen trabajo!  │           │
│ └──────────────────┘ └──────────────────┘           │
└──────────────────────────────────────────────────────┘
```

**Componentes:**
- **Continue Card** — 2 columnas (info + mini piano visual), gradiente de card a azul oscuro
  - Eyebrow: disco + "Módulo 3"
  - Título grande, descripción, progress bar gradiente, metadata, botones
  - Mini piano: 7 teclas blancas + posiciones negras, una activa azul
- **Stat Grid** — 4 cards con icono coloreado, número mono, label
- **Two-col panel**:
  - Panel izquierdo: lista de actividades con iconos, chips de fecha
  - Panel derecho: week tracker (7 círculos L M M J V S D), done/today states, callout

### 4.3 Practice View

```
┌──────────────────────────────────────────────────────┐
│ Práctica de piano                        ⏱️ 72   🔉│
│ Lección 7 · Acordes en posición abierta   [-]72[+]  │
│                                                     │
│ ┌──────────────────┐ ┌──────────────────┐          │
│ │ NOTA OBJETIVO    │ │ MONITOR          │          │
│ │                  │ │ ▄▄▄▄▄▄▄▄▄▄▄     │          │
│ │    Sol (G4)      │ │ ██▄████▄██▄     │          │
│ │                  │ │ ████████████     │          │
│ │ ┌──────────────┐ │ │ ████████████     │          │
│ │ │✓ Correcto!   │ │ │                  │          │
│ │ └──────────────┘ │ │ ⏱️ 09:42  🏅 91%│          │
│ │ ⚡ 6 streak     │ └──────────────────┘          │
│ └──────────────────┘                               │
│                                                     │
│ ┌─────────────────────────────────────────────┐     │
│ │ 🎹 Piano Interactivo         Usa teclas A-J│     │
│ │                                             │     │
│ │ ┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐         ┌─┐       │     │
│ │ │C││D││E││F││G││A││B│        │C│       │     │
│ │ └─┘└─┘└─┘└─┘└─┘└─┘└─┘       └─┘       │     │
│ │  ┌┘  ┌┘      ┌┘  ┌┘  ┌┘                  │     │
│ │  │C#│ │D#│    │F#│ │G#│ │A#│            │     │
│ │  └─┘ └─┘    └─┘ └─┘ └─┘            │     │
│ └─────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────┘
```

**Elementos web adicionales vs mobile:**
- Labels de teclado (A-J) en las teclas blancas
- Hover states en teclas
- Práctica head con metrónomo toggle (botón con icono Activity)
- Note panel con feedback en vivo (correct/wrong)
- Waveform animado con AudioLines

### 4.4 Courses View

```
┌──────────────────────────────────────────────────────┐
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │
│ │ [gradient]   │ │ [gradient]   │ │ [gradient]   │  │
│ │     ✨       │ │     🎨       │ │     🔊       │  │
│ │ PRINCIPIANTE│ │ PRINCIPIANTE│ │ INTERMEDIO  │  │
│ │              │ │              │ │              │  │
│ │ Fundamentos  │ │ Armonía      │ │ Ritmo y      │  │
│ │ del piano    │ │ básica       │ │ compás       │  │
│ │ Postura...   │ │ Acordes...   │ │ Subdivis...  │  │
│ │ ████████ 100%│ │ ██████░░ 64% │ │ ███░░░░░ 30% │  │
│ │ [▶ Continuar]│ │ [▶ Continuar]│ │ [▶ Continuar]│  │
│ └──────────────┘ └──────────────┘ └──────────────┘  │
│                                                      │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │
│ │ [gradient]   │ │ [gradient]   │ │ [gradient]   │  │
│ │     🤍       │ │     🏛️       │ │     🌙       │  │
│ │ INTERMEDIO  │ │ INTERMEDIO  │ │ AVANZADO     │  │
│ │ [🔒 locked]  │ │              │ │ [🔒 locked]  │  │
│ │ Improvisaci  │ │ Piano        │ │ Piano jazz   │  │
│ │ Escalas...   │ │ Repertorio..│ │ Voicings...  │  │
│ │ ░░░░░░░░ 0%  │ │ ██░░░░░░ 12%│ │ ░░░░░░░░ 0%  │  │
│ │ [🔒 Bloquead]│ │ [▶ Continuar]│ │ [🔒 Bloquead]│  │
│ └──────────────┘ └──────────────┘ └──────────────┘  │
└──────────────────────────────────────────────────────┘
```

**Elementos:**
- Grid 3 columnas (responsive: 2 → 1)
- Course cards con cover gradient (6 colores), icono, badge de nivel
- Lock overlay para cursos bloqueados
- Progress bar, botón primario/ghost según estado
- Al expandir: lista de lecciones inline (ver mobile)

### 4.5 Progress View

```
┌──────────────────────────────────────────────────────┐
│ ┌──────────────────┐ ┌──────────────────┐           │
│ │ 📊 MINUTOS       │ │ 📶 CONSISTENCIA  │           │
│ │ DE PRÁCTICA      │ │                  │           │
│ │                  │ │ ██░░█░███░█░░░░ │           │
│ │   ██             │ │ █░░████░░██░░░░ │           │
│ │ ████ ██          │ │ ██░█░░░██░░█░█  │           │
│ │ ████ ██████ ██   │ │ ░██░█░░██░░░░░  │           │
│ │ █████████████████│ │ ░░░████░░██░░░  │           │
│ │ █████████████████│ │ ██████░████████  │           │
│ │ S1 S2 S3 S4 S5 S6│ │ Menos      Más  │           │
│ └──────────────────┘ └──────────────────┘           │
│                                                      │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                │
│ │🏆 14 │ │📈+18%│ │📅 21 │ │⭐ 4.8│                │
│ │Insig.│ │Prec. │ │Récord│ │Rating│                │
│ └──────┘ └──────┘ └──────┘ └──────┘                │
└──────────────────────────────────────────────────────┘
```

### 4.6 Admin View

```
┌──────────────────────────────────────────────────────┐
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                │
│ │👥 15 │ │📚 24 │ │🖥️ 99% │ │🎫 7  │                │
│ │Estud.│ │Lecc. │ │Uptime│ │Tique.│                │
│ └──────┘ └──────┘ └──────┘ └──────┘                │
│                                                      │
│ ┌──────────────────┐ ┌──────────────────┐           │
│ │ 👤 ESTUDIANTES   │ │ 📢 ESTADO DEL    │           │
│ │                  │ │    CONTENIDO     │           │
│ │ [Search...]      │ │                  │           │
│ │                  │ │ ✓ Módulo 4 Live │           │
│ │ Estudiante    Pr │ │ ⏳ Módulo 5 Rev │           │
│ │ ──────────── ─── │ │ ✏️ Curso Jazz Dr│           │
│ │ [MP] Mateo    82%│ │                  │           │
│ │ [LR] Lucía    45%│ │                  │           │
│ │ [JG] Julián   97%│ │                  │           │
│ │ [NA] Nadia    20%│ │                  │           │
│ └──────────────────┘ └──────────────────┘           │
└──────────────────────────────────────────────────────┘
```

**Elementos:**
- Stat grid: students, lessons, uptime, tickets
- Data table: student name (con avatar), course, progress bar, status dot (online/idle)
- Search/filter field
- Content status list con iconos (live/review/draft)

### 4.7 Landing Page (`/`)

```
┌──────────────────────────────────────────────────────┐
│ [Logo] PK     Características  Cómo funciona [Panel] │
│                                                      │
│            PlayingKeys                               │
│     Aprende piano interactivo                        │
│                                                      │
│   Practica con teclado virtual, sigue lecciones      │
│   guiadas y mide tu progreso.                        │
│                                                      │
│       [▶ Empezar ahora]    [Saber más]              │
│                                                      │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │
│ │ 🎹 Piano    │ │ 📚 Lecciones│ │ 👥 Profesores│  │
│ │ interactivo │ │ guiadas      │ │ panel        │  │
│ └──────────────┘ └──────────────┘ └──────────────┘  │
│                                                      │
│  1. Regístrate     2. Practica     3. Progresa      │
│                                                      │
│  PlayingKeys. Plataforma de aprendizaje de piano.   │
└──────────────────────────────────────────────────────┘
```

- Header sticky con blur, brand + nav links + CTA button
- Hero section centrado con headline grande
- Features grid (3 columnas responsive)
- Cómo funciona (3 pasos numerados)
- Footer simple

---

## 5. Iconos (Lucide)

| Contexto | Icono |
|----------|-------|
| Nav Home | `LayoutGrid` |
| Nav Practice | `Piano` |
| Nav Courses | `LibraryBig` |
| Nav Progress | `ChartNoAxesCombined` |
| Nav Admin | `ShieldHalf` |
| Nav Teacher | `Users` |
| Nav Profile | `User` |
| Streak/Racha | `Flame` |
| Continuar | `Play`, `Music` |
| Notificaciones | `Bell` |
| Búsqueda | `Search` |
| Metrónomo | `Activity` |
| Tempo | `Minus`, `Plus` |
| Feedback correcto | `CheckCircle`, `CheckCircle2` |
| Feedback incorrecto | `XCircle`, `CircleX` |
| Grabación | `Mic`, `Square`, `RotateCcw`, `AudioWaveform` |
| Reproducir | `Play` |
| Stats | `BookOpen`, `Clock`, `Zap`, `Award`, `Target`, `Star` |
| Charts | `BarChart3`, `Grid3x3`, `TrendingUp` |
| Admin | `Users`, `Server`, `Ticket`, `Megaphone` |
| Lección | `BookOpen`, `ListMusic`, `Disc3` |
| Diversos | `ArrowLeft`, `ChevronRight`, `RefreshCw`, `AlertCircle`, `Lock`, `GraduationCap`, `Timer`, `CalendarClock`, `Ear`, `AudioLines`, `BadgeCheck`, `Landmark`, `Trophy`, `CalendarCheck2`, `Repeat`, `Settings2`, `PanelLeftClose`, `Menu`, `Search`, `Sparkles`, `PencilLine`, `Layers`, `MoonStar`, `Music4`, `Mic2`, `Target`, `Check`, `CircleDashed` |

---

## 6. Estados Comunes

### Loading
```
┌─────────────────────┐
│                     │
│    [Spinner]        │
│   Cargando...       │
│                     │
└─────────────────────┘
```

### Error
```
┌─────────────────────┐
│    ⚠️               │
│ Mensaje de error    │
│ [↻ Reintentar]      │
└─────────────────────┘
```

### Empty
```
┌─────────────────────┐
│   No hay datos      │
│   aún.              │
└─────────────────────┘
```

---

## 7. Animaciones

- **View transitions:** fade in + translateY(6px), 250ms ease
- **Card hover:** translateY(-2px), border-color change
- **Button press:** scale(0.97)
- **Week day active:** box-shadow glow
- **Mini piano key active:** gradient brightness shift
- **Waveform bars:** random height on note press (no smooth animation needed)

---

## 8. Responsive Breakpoints (Web)

| Breakpoint | Cambios |
|------------|---------|
| ≤1080px | Two-col → single, practice-grid single, course-grid 2 cols, continue-card single, hide continue-visual |
| ≤820px | Sidebar overlay, search hidden, stat-grid 2 cols, course-grid single, topbar compact |

---

## 9. Instrucciones para Claude

Generar un HTML autónomo (`diseño.html`) que contenga:

1. Renderizar **TODAS las pantallas** en un solo documento usando CSS class toggling para cambiar de vista
2. Usar **exactamente los tokens de diseño** especificados arriba
3. Todos los iconos deben ser Lucide (importar desde CDN: `https://unpkg.com/lucide@latest/dist/umd/lucide.js`)
4. Layout web completo con sidebar, topbar y 4 vistas (dashboard, practice, courses, progress, admin)
5. Representación mobile (opcional, en vista responsive o mockup phone)
6. Fuentes: Google Fonts (Manrope, Inter, JetBrains Mono)
7. Sin frameworks CSS externos — solo CSS nativo con variables
8. Todos los estados: loading, error, empty, hover, active, disabled
