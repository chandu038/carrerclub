import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactView({ T, isMobile }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("darapanenic1@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Satoshi',sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: isMobile ? "2rem 1.25rem" : "3rem 2rem" }}>

        {/* Back */}
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: T.a3, fontSize: 13, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
          ← Back to Home
        </button>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: T.text, marginBottom: "0.5rem" }}>
            Contact Us
          </div>
          <div style={{ fontSize: 15, color: T.text2 }}>
            Have a question, suggestion, or want to post a job? Reach out!
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: "1.5rem" }}>

          {/* Email */}
          <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 16, padding: "1.5rem" }}>
            <div style={{ fontSize: 28, marginBottom: "0.75rem" }}>✉️</div>
            <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 16, fontWeight: 700, color: T.text, marginBottom: "0.5rem" }}>Email</div>
            <div style={{ fontSize: 13, color: T.text2, marginBottom: "1rem" }}>Send us an email anytime. We reply within 24 hours.</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: T.bg3, borderRadius: 8, border: `1px solid ${T.border2}`, marginBottom: "0.75rem" }}>
              <span style={{ fontSize: 13, color: T.text, flex: 1 }}>darapanenic1@gmail.com</span>
              <button onClick={copyEmail} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.a3, fontFamily: "'Satoshi',sans-serif", fontWeight: 600, flexShrink: 0 }}>
                {copied ? "✅ Copied" : "Copy"}
              </button>
            </div>
            <a href="mailto:darapanenic1@gmail.com"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px", borderRadius: 8, background: T.accent, color: T.accentFg, textDecoration: "none", fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" }}>
              Send Email
            </a>
          </div>

          {/* Telegram */}
          <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 16, padding: "1.5rem" }}>
            <div style={{ fontSize: 28, marginBottom: "0.75rem" }}>✈️</div>
            <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 16, fontWeight: 700, color: T.text, marginBottom: "0.5rem" }}>Telegram</div>
            <div style={{ fontSize: 13, color: T.text2, marginBottom: "1rem" }}>Message us on Telegram for faster responses.</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: T.bg3, borderRadius: 8, border: `1px solid ${T.border2}`, marginBottom: "0.75rem" }}>
              <span style={{ fontSize: 13, color: T.text }}>@undefined890</span>
            </div>
            <a href="https://t.me/undefined890" target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px", borderRadius: 8, background: T.a3, color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" }}>
              Open Telegram
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 16, padding: isMobile ? "1.5rem" : "2rem" }}>
          <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700, color: T.text, marginBottom: "1.25rem" }}>
            ❓ Frequently Asked Questions
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["How do I post a job?", "Contact us via email or Telegram with job details and we'll post it for you."],
              ["Is CarrerClub free?", "Yes! CarrerClub is completely free for job seekers."],
              ["How often are jobs updated?", "We add new jobs daily. Turn on alerts to get notified instantly."],
              ["How do I report a wrong job listing?", "Email us with the job title and issue and we'll fix it right away."],
            ].map(([q, a]) => (
              <div key={q} style={{ padding: "1rem", background: T.bg3, borderRadius: 10, border: `1px solid ${T.border2}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 6 }}>🔹 {q}</div>
                <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.6 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}