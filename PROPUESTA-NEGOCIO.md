# PlayingKeys — Propuesta de Desarrollo

**Plataforma de Aprendizaje de Piano | App Móvil + Admin Web + API**

---

## Resumen Ejecutivo

PlayingKeys es una plataforma completa para aprender piano, diseñada para escuelas de música, profesores independientes y estudiantes autodidactas. Incluye una **app móvil** (Android), un **panel web para administradores y profesores**, y un **backend robusto** con base de datos PostgreSQL.

**Modelo de pago propuesto:**
- **Pago inicial:** $300 (para iniciar el proyecto)
- **6 pagos mensuales de $120:** $720
- **Total:** $1,020
- **Tiempo de desarrollo:** 1 mes
- **Soporte post-entrega:** 15 días adicionales
- **A cargo del cliente:** dominio, hosting, publicación en Google Play Store ($25 único)

> El desarrollo se completa en el primer mes + 15 días de soporte. Los pagos restantes son por comodidad, no porque se requiera trabajo adicional.

---

## Funcionalidades Completas

### App Móvil (React Native Expo)

| Módulo | Pantallas | Descripción |
|--------|-----------|-------------|
| **Autenticación** | Login, Registro | Email + contraseña, JWT, persistencia de sesión |
| **Home / Dashboard** | Pantalla principal | Estadísticas del estudiante, racha de práctica, progreso semanal |
| **Cursos** | Lista de unidades, Lecciones | Acordeón de unidades, lista de lecciones por unidad, navegación a detalle |
| **Lección** | Vista de lección individual | Contenido pedagógico, notación musical, instrucciones, piano interactivo, grabación de audio, detección de tono |
| **Practice Lab** | Práctica libre | Piano interactivo de 2 octavas (C4-C6), metrónomo (40-240 BPM), juego de precisión de tono, temporizador, waveform animado |
| **Progreso** | Dashboard de progreso | Gráfico de barras semanal (7 semanas), mapa de calor de 84 días, estadísticas: completados, puntaje promedio, racha |
| **Perfil** | Configuración de usuario | Avatar, nombre/email/rol, notificaciones push, selector de idioma (es/en), membresía, logout |
| **Admin** | Panel de administración | Conteo de estudiantes/profesores/pagos, acceso a CRUD de gestión |
| **Teacher** | Panel de profesor | Lista de estudiantes asignados, barra de progreso por estudiante, estadísticas |

### Backend API (NestJS)

| Módulo | Endpoints | Descripción |
|--------|-----------|-------------|
| **Auth** | `POST /auth/login`, `POST /auth/register`, `GET /auth/profile` | JWT, roles (STUDENT, TEACHER, ADMIN) |
| **Units** | `GET /units`, `GET /units/:id` | Catálogo de unidades didácticas |
| **Lessons** | `GET /lessons`, `GET /lessons/:id`, `POST/PATCH/DELETE /lessons/:id` | CRUD de lecciones con contenido JSON (notación, instrucciones, digitación) |
| **Progress** | `POST /progress`, `GET /progress/student/:id`, `GET /progress/lesson/:id` | Seguimiento de progreso por estudiante/lección, upsert automático |
| **Students** | `GET /students/:id`, `POST/PATCH/DELETE /students/:id` (admin) | Gestión de estudiantes |
| **Teachers** | `GET /teachers/:id`, `GET /teachers/me/students`, `PATCH /teachers/me/students/:id/notes` | Gestión de profesores y sus estudiantes |
| **Payments** | `GET /payments`, `POST/PATCH/DELETE /payments/:id` (admin) | Gestión de pagos y facturación |

### Panel Web (Next.js)

| Ruta | Función |
|------|---------|
| `/admin` | Dashboard administrador: estadísticas, gestión de usuarios |
| `/teacher` | Dashboard profesor: lista de estudiantes, progreso, notas |

### Base de Datos (PostgreSQL + Prisma)

**Modelos:** User, Student, Teacher, Admin, Unit, Lesson, Progress, Payment, Note

Relaciones: Usuarios con roles, estudiantes asignados a profesores, progreso por lección, pagos por estudiante, notas del profesor.

### Funcionalidades Técnicas Clave

- **Piano interactivo:** 26 notas WAV reales (C4-C6), reproducción con `expo-av` (nativo) y Web Audio API (web)
- **Grabación de audio:** Captura de micrófono, reproducción, análisis de tono por autocorrelación
- **Detección de tono:** Algoritmo de autocorrelación en dominio del tiempo, coincidencia contra notas objetivo
- **Metrónomo:** 40-240 BPM, generación WAV en memoria para nativo, OscillatorNode para web
- **Notificaciones push:** Recordatorio diario de práctica a las 18:00
- **i18n:** Español e inglés completos (~124 claves cada uno)
- **Modo offline:** Lecciones descargables para práctica sin conexión (planificado)

---

## Investigación de Mercado — Costo en Costa Rica

### Referencias de mercado 2026

| Fuente | Tipo de App | Rango USD |
|--------|-------------|-----------|
| **Sirius (CR)** | App con pagos + roles | $3,500 - $7,000 |
| **Sirius (CR)** | Plataforma con módulos | $7,000 - $25,000+ |
| **Sirius (CR)** | Educación/e-learning | $3,000 - $20,000 |
| **Broditec (CR)** | App móvil completa | $13,500 - $45,000 |
| **Broditec (CR)** | Mantenimiento mensual | $1,000 - $5,400/mes |
| **NexgenPixels (LATAM)** | App con backend + pagos | $8,000 - $25,000 |
| **NexgenPixels (LATAM)** | Marketplace/Plataforma | $25,000 - $60,000 |
| **GooApps (España)** | App mediana | €30,000 - €50,000 |
| **RichestSoft** | App tipo Simply Piano | $25,000 - $100,000+ |

### Desglose por componente (mercado CR)

| Componente | Horas estimadas | Costo CR ($35-70/h) |
|------------|-----------------|---------------------|
| Diseño UI/UX (10 pantallas) | 40-60h | $1,400 - $4,200 |
| App móvil (React Native) | 200-300h | $7,000 - $21,000 |
| Backend API (NestJS) | 120-180h | $4,200 - $12,600 |
| Panel web (Next.js) | 60-100h | $2,100 - $7,000 |
| Base de datos + Prisma | 30-50h | $1,050 - $3,500 |
| Audio engine + pitch detection | 40-60h | $1,400 - $4,200 |
| QA + testing | 30-50h | $1,050 - $3,500 |
| Project management | 20-30h | $700 - $2,100 |
| **Total mercado CR** | **540-830h** | **$15,000 - $58,000** |

### Comparativa con el modelo propuesto

| Concepto | Mercado CR (agencia) | Nuestra propuesta |
|----------|---------------------|-------------------|
| Desarrollo | $15,000 - $58,000 | $1,020 |
| Tiempo de entrega | 3-5 meses | 1 mes + 15 días soporte |
| Pago inicial | 40-50% ($6,000-$29,000) | $300 |
| Cuotas mensuales | N/A | 6 cuotas de $120 |
| Dominio/hosting | Cliente (~$150-300/año) | Cliente |
| Publicación stores | Cliente ($25 único) | Cliente |
| Mantenimiento mensual | $1,000 - $5,400/mes | No requerido |

> **Ahorro para el cliente:** 94-98% vs agencia tradicional en CR

---

## Propuesta Económica

### Plan de Pagos

| Evento | Monto | Momento |
|--------|-------|---------|
| **Pago inicial** | **$300** | Al firmar contrato |
| **Pago 2** | **$120** | Mes 2 |
| **Pago 3** | **$120** | Mes 3 |
| **Pago 4** | **$120** | Mes 4 |
| **Pago 5** | **$120** | Mes 5 |
| **Pago 6** | **$120** | Mes 6 |
| **Pago 7** | **$120** | Mes 7 |
| **Total** | **$1,020** | |

### Cronograma

```
Semana 1-2: Configuración inicial + diseño UI/UX
Semana 3:   Desarrollo backend (API + BD)
Semana 4:   Desarrollo app móvil + panel web
Semana 5-6: QA, correcciones, publicación
─────────────────────────────────────
Semana 7-8: Soporte post-entrega (bugs menores)
```

> El desarrollo completo toma **4 semanas** más **15 días de soporte**.
> Los pagos restantes son únicamente por conveniencia del cliente, no porque se requiera trabajo continuo.

### ¿Qué cubre el cliente aparte?

| Concepto | Costo estimado (anual) |
|----------|----------------------|
| Dominio (.com) | $12 - $30/año |
| Hosting (API + BD) | $150 - $300/año |
| Google Play Developer | $25 (único) |
| **Total cliente** | **~$187 - $355/año** |

---

## Por qué esta propuesta es superior

### Vs Agencia Tradicional en Costa Rica

| Factor | Agencia ($15K-58K) | Esta propuesta ($1,020) |
|--------|-------------------|----------------------|
| Inversión inicial | $6,000 - $29,000 | $300 |
| Tiempo de desarrollo | 3-5 meses | 1 mes |
| Riesgo para el cliente | Alto (paga mucho upfront) | Mínimo (paga por resultado) |
| Flexibilidad | Contratos rígidos | Pago mes a mes |
| Soporte post-entrega | Facturado aparte | Incluido 15 días |

### Vs Contratar Freelancer Individual

| Factor | Freelancer ($5K-15K) | Esta propuesta ($1,020) |
|--------|---------------------|----------------------|
| Confiabilidad | Variable (riesgo de abandono) | Alta (desarrollador verificado) |
| Stack técnico | Limitado | Completo (React Native, NestJS, Prisma, Next.js) |
| Entrega | Incierta | Fecha fija |
| Código fuente | Negociable | 100% del cliente |

---

## Stack Tecnológico

| Capa | Tecnología | Beneficio |
|------|-----------|-----------|
| **App Móvil** | React Native + Expo SDK 57 | Android, despliegue OTA (EAS Update) |
| **Backend** | NestJS + TypeScript | Arquitectura modular, OpenAPI, escalable |
| **Base de Datos** | PostgreSQL + Prisma | ORM, migraciones, relaciones complejas |
| **Panel Web** | Next.js 14 + Tailwind | Admin dashboard, server components |
| **Audio** | expo-av + Web Audio API | Piano samples reales, grabación, análisis de tono |
| **Autenticación** | JWT + Passport | Seguro, stateless, roles |
| **Notificaciones** | expo-notifications | Recordatorios push locales |
| **i18n** | Context API propio | Español/Inglés completos |
| **Hosting** | Vercel (web), EAS (app), Railway/Cloudflare (API) | Costo mínimo, escalable |

---

## Entregables

1. **Código fuente completo** (repo privado del cliente)
2. **App móvil** compilable para Android (APK)
3. **Panel web** administrador + profesor
4. **API documentada** con Swagger/OpenAPI
5. **Base de datos** con seed de datos de prueba
6. **Manual básico de uso**
7. **15 días de soporte** post-entrega

---

## Términos y Condiciones

- **Pago inicial** no reembolsable cubre el arranque del proyecto
- **Cambios de alcance** durante desarrollo se cotizan por separado
- **Soporte** incluye corrección de bugs, no nuevas features
- **Propiedad intelectual** 100% transferida al cliente al finalizar
- **Confidencialidad** total sobre el código y datos del proyecto

---

> Propuesta válida por 15 días a partir de: **Julio 2026**
