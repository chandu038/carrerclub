import { useNavigate } from "react-router-dom";
import Icon from "./Icon";

const I_MAIL = "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6";
const I_SEND = "M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z";

export default function Footer({ T }) {
  const navigate = useNavigate();

  return (
    <footer style={{
      background: T.bg2,
      borderTop: `1px solid ${T.border}`,
      padding: "2.5rem 2rem 2rem",
      marginTop: "auto",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "2rem",
      }}>

        {/* Brand */}
        <div>
          <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color: T.text, marginBottom: 8, cursor: "pointer" }}
            onClick={() => navigate("/")}>
            Flash<span style={{ color: T.accent }}>Feed</span>
            <span style={{ fontSize: 10, fontWeight: 700, background: T.ftBg, color: T.ftFg, padding: "2px 7px", borderRadius: 20, marginLeft: 8 }}>JOBS</span>
          </div>
          <p style={{ fontSize: 13, color: T.text2, lineHeight: 1.7, maxWidth: 240 }}>
            Fresh job listings updated daily across tech, design, finance, marketing and government sectors.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: T.text3, fontWeight: 700, marginBottom: 14 }}>
            Quick Links
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Browse All Jobs", path: "/browse" },
              { label: "Saved Jobs",      path: "/saved"  },
              { label: "Job Alerts",      path: "/alerts" },
            ].map((link) => (
              <span
                key={link.label}
                onClick={() => navigate(link.path)}
                style={{ fontSize: 13, color: T.text2, cursor: "pointer", transition: "color 0.15s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = T.accent}
                onMouseLeave={(e) => e.currentTarget.style.color = T.text2}>
                → {link.label}
              </span>
            ))}
          </div>
        </div>

        {/* Contact + Suggest */}
        <div>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: T.text3, fontWeight: 700, marginBottom: 14 }}>
            Contact & Suggest
          </div>
          <p style={{ fontSize: 13, color: T.text2, lineHeight: 1.7, marginBottom: 16 }}>
            Know a job we missed? Suggest a listing or reach out directly.
          </p>

          {/* Email */}
          <a href="https://mail.google.com/mail/?view=cm&to=darapanenic1@gmail.com&su=Job Suggestion — FlashFeed"
  target="_blank"
  rel="noreferrer"
  style={{
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 16px", borderRadius: 10, marginBottom: 10,
    background: T.ms2, border: `1px solid ${T.accent}44`,
    color: T.accent, fontSize: 13, fontWeight: 600,
    textDecoration: "none", transition: "all 0.15s",
    fontFamily: "'Satoshi',sans-serif",
  }}
  onMouseEnter={(e) => e.currentTarget.style.background = T.bg3}
  onMouseLeave={(e) => e.currentTarget.style.background = T.ms2}>
  <Icon path={I_MAIL} size={16} color={T.accent} />
  Suggest via Email
</a>

          {/* Telegram */}
          <a href="https://t.me/undefined890"
  target="_blank"
  rel="noreferrer"
  style={{
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 16px", borderRadius: 10,
    background: T.inBg, border: `1px solid ${T.a3}44`,
    color: T.a3, fontSize: 13, fontWeight: 600,
    textDecoration: "none", transition: "all 0.15s",
    fontFamily: "'Satoshi',sans-serif",
  }}
  onMouseEnter={(e) => e.currentTarget.style.background = T.bg3}
  onMouseLeave={(e) => e.currentTarget.style.background = T.inBg}>
  <Icon path={I_SEND} size={16} color={T.a3} />
  Suggest via Telegram
</a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1100, margin: "2rem auto 0",
        paddingTop: "1.25rem", borderTop: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 8,
      }}>
        <span style={{ fontSize: 12, color: T.text3 }}>
          © {new Date().getFullYear()} FlashFeed Jobs. All rights reserved.
        </span>
        <span style={{ fontSize: 12, color: T.text3 }}>
          Updated daily · Made with ❤️ for job seekers
        </span>
      </div>
    </footer>
  );
}