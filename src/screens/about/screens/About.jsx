import { FEATURES, STACK } from "../config";
import "./styles/about.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-orb orb-1" />
      <div className="about-orb orb-2" />

      <div className="about-hero">
        <div className="about-hero-badge">v1.0 · Production</div>
        <h1 className="about-title">My Workspace</h1>
        <p className="about-subtitle">
          A full-stack productivity app — built to plan, track, and ship tasks
          without friction.
        </p>
        <div className="about-hero-pills">
          <span className="hero-pill">⏳ Task Management</span>
          <span className="hero-pill">📋 Kanban Board</span>
          <span className="hero-pill">📊 Live Stats</span>
          <span className="hero-pill">🔁 Repeat Tasks</span>
        </div>
      </div>

      <section className="about-section">
        <div className="section-label">What's inside</div>
        <h2 className="section-title">Everything you need</h2>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div className="feature-card" key={i} style={{ "--i": i }}>
              <div className="feature-icon">{f.icon}</div>
              <div>
                <h4 className="feature-title">{f.title}</h4>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="section-label">Built with</div>
        <h2 className="section-title">Tech Stack</h2>
        <div className="stack-grid">
          {STACK.map((s, i) => (
            <div
              className="stack-card"
              key={i}
              style={{ "--s-color": s.color }}
            >
              <span className="stack-icon">{s.icon}</span>
              <span className="stack-name">{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="about-footer">
        <div className="footer-divider" />
        <p className="footer-text">
          Crafted with <span className="heart">❤️</span> by{" "}
          <strong>Prabal</strong>
        </p>
        <p className="footer-sub">React · Node · Express · MongoDB</p>
      </footer>
    </div>
  );
};

export { AboutPage };
