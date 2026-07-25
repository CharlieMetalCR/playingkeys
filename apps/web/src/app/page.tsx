import Link from "next/link";
import { Music, Play, BookOpen, Users, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 32px",
          borderBottom: "1px solid var(--border)",
          background: "rgba(11,15,23,.85)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 5,
        }}
      >
        <div className="brand">
          <Music style={{ width: 24, height: 24, color: "#C4B5FD" }} />
          <span className="brand-name">PlayingKeys</span>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a
            href="#features"
            style={{
              color: "var(--text-2)",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Características
          </a>
          <a
            href="#how-it-works"
            style={{
              color: "var(--text-2)",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Cómo funciona
          </a>
          <Link href="/admin" className="btn btn-primary">
            <Play style={{ width: 16, height: 16 }} />
            Panel Admin
          </Link>
        </nav>
      </header>

      <section
        style={{
          padding: "80px 32px",
          maxWidth: 960,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 16 }}>
          <Music style={{ width: 13, height: 13 }} />
          Plataforma de piano interactivo
        </div>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: 18,
            letterSpacing: "-0.03em",
          }}
        >
          PlayingKeys —<br />
          <span style={{ color: "#C4B5FD" }}>Aprende piano interactivo</span>
        </h1>
        <p
          style={{
            color: "var(--text-2)",
            fontSize: 17,
            lineHeight: 1.6,
            maxWidth: 540,
            margin: "0 auto 32px",
          }}
        >
          Practica con un teclado virtual, sigue lecciones guiadas y mide tu
          progreso. Todo desde tu navegador, sin necesidad de piano físico.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <Link href="/admin" className="btn btn-primary" style={{ padding: "14px 28px", fontSize: 15 }}>
            <Play style={{ width: 18, height: 18 }} />
            Empezar ahora
          </Link>
          <a href="#features" className="btn btn-ghost" style={{ padding: "14px 28px", fontSize: 15 }}>
            Saber más
          </a>
        </div>
      </section>

      <section
        id="features"
        style={{ padding: "64px 32px", maxWidth: 1100, margin: "0 auto" }}
      >
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>
          Todo lo que necesitas
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          {[
            {
              icon: Music,
              title: "Piano interactivo",
              desc: "Toca teclas reales con sonido preciso. Practica en cualquier lugar sin un piano físico.",
              color: "var(--violet-soft)",
              iconColor: "#C4B5FD",
            },
            {
              icon: BookOpen,
              title: "Lecciones guiadas",
              desc: "Sigue un currículo progresivo desde lo básico hasta técnicas avanzadas.",
              color: "var(--blue-soft)",
              iconColor: "var(--blue)",
            },
            {
              icon: Users,
              title: "Panel de profesores",
              desc: "Los profesores gestionan estudiantes, rastrean progreso y asignan lecciones.",
              color: "var(--green-soft)",
              iconColor: "var(--green)",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="panel"
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <div
                className="stat-icon"
                style={{ background: f.color, color: f.iconColor, marginBottom: 0 }}
              >
                <f.icon style={{ width: 18, height: 18 }} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>{f.title}</h3>
              <p style={{ color: "var(--text-2)", fontSize: 13.5, lineHeight: 1.55 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        style={{ padding: "64px 32px", maxWidth: 800, margin: "0 auto" }}
      >
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>
          Cómo funciona
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {[
            { step: "1", title: "Regístrate", desc: "Crea tu cuenta y accede a tu panel personalizado." },
            { step: "2", title: "Practica", desc: "Sigue lecciones interactivas con el teclado virtual." },
            { step: "3", title: "Progresa", desc: "Rastrea tu mejora y desbloquea insignias." },
          ].map((s) => (
            <div key={s.step} style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--violet), #9F67F2)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {s.step}
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{s.title}</h3>
                <p style={{ color: "var(--text-2)", fontSize: 14 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "32px",
          textAlign: "center",
          color: "var(--text-3)",
          fontSize: 13,
        }}
      >
        PlayingKeys. Plataforma de aprendizaje de piano.
      </footer>
    </div>
  );
}
