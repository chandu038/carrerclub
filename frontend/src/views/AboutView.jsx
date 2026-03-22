import { useNavigate } from "react-router-dom";

export default function AboutView({ T, isMobile }) {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Satoshi',sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: isMobile ? "2rem 1.25rem" : "3rem 2rem" }}>

        {/* Back */}
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: T.a3, fontSize: 13, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
          ← Back to Home
        </button>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: isMobile ? 32 : 44, fontWeight: 700, color: T.text, marginBottom: "1rem" }}>
            About <span style={{ color: T.accent }}>CarrerClub</span>
          </div>
          <div style={{ fontSize: 16, color: T.text2, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Your go-to platform for finding the best job opportunities across India — from freshers to experienced professionals.
          </div>
        </div>

        {/* Mission */}
        <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 16, padding: isMobile ? "1.5rem" : "2rem", marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700, color: T.text, marginBottom: "1rem", display: "flex", alignItems: "center", gap: 8 }}>
            🎯 Our Mission
          </div>
          <div style={{ fontSize: 14, color: T.text2, lineHeight: 1.8 }}>
            CarrerClub was built with one simple goal — to make job hunting easier for everyone in India. We curate the latest job openings from top companies, government organizations, and startups so you never miss an opportunity. Whether you're a fresher looking for your first job or an experienced professional seeking a career change, we've got you covered.
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
          {[
            ["💼", "500+", "Jobs Listed"],
            ["🏢", "100+", "Companies"],
            ["🌍", "50+", "Cities"],
            ["👥", "Free", "Always Free"],
          ].map(([emoji, val, label]) => (
            <div key={label} style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 14, padding: "1.25rem", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{emoji}</div>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 24, fontWeight: 700, color: T.accent, marginBottom: 4 }}>{val}</div>
              <div style={{ fontSize: 12, color: T.text2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* What we offer */}
        <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 16, padding: isMobile ? "1.5rem" : "2rem", marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700, color: T.text, marginBottom: "1.25rem" }}>
            ✨ What We Offer
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["💼", "Full-time & Part-time Jobs", "Browse thousands of full-time and part-time opportunities across all industries."],
              ["🏛️", "Government Jobs", "Stay updated with the latest govt job openings, exams, and notifications."],
              ["🌐", "Remote Jobs", "Find work-from-home and remote opportunities from top companies."],
              ["🎓", "Fresher Friendly", "Special focus on entry-level jobs and internships for fresh graduates."],
              ["🔔", "Job Alerts", "Set up alerts and never miss a job that matches your profile."],
            ].map(([emoji, title, desc]) => (
              <div key={title} style={{ display: "flex", gap: 14, padding: "1rem", background: T.bg3, borderRadius: 10, border: `1px solid ${T.border2}` }}>
                <div style={{ fontSize: 22, flexShrink: 0 }}>{emoji}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 16, padding: isMobile ? "1.5rem" : "2rem" }}>
          <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700, color: T.text, marginBottom: "1rem" }}>
            📬 Get in Touch
          </div>
          <div style={{ fontSize: 14, color: T.text2, lineHeight: 1.8, marginBottom: "1rem" }}>
            Have a job to post or a suggestion? We'd love to hear from you!
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="mailto:darapanenic1@gmail.com"
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10, background: T.bg3, border: `1px solid ${T.border2}`, color: T.text, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
              ✉️ Email Us
            </a>
            <a href="https://t.me/undefined890" target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10, background: T.bg3, border: `1px solid ${T.border2}`, color: T.text, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
              ✈️ Telegram
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}