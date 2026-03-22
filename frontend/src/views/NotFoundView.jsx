import { useNavigate } from "react-router-dom";

export default function NotFoundView({ T }) {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh", background: T.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem", fontFamily: "'Satoshi',sans-serif",
      flexDirection: "column", textAlign: "center",
    }}>

      {/* Big 404 */}
      <div style={{
        fontFamily: "'Clash Display',sans-serif",
        fontSize: "clamp(80px, 20vw, 160px)",
        fontWeight: 700, lineHeight: 1,
        background: `linear-gradient(135deg, ${T.accent}, ${T.a3})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        marginBottom: "1rem",
        userSelect: "none",
      }}>
        404
      </div>

      {/* Icon */}
      <div style={{
        width: 64, height: 64, borderRadius: 16,
        background: T.bg2, border: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 30, marginBottom: "1.5rem",
      }}>
        🔍
      </div>

      {/* Title */}
      <div style={{
        fontFamily: "'Clash Display',sans-serif",
        fontSize: "clamp(20px, 5vw, 28px)",
        fontWeight: 700, color: T.text,
        marginBottom: "0.75rem",
      }}>
        Page not found
      </div>

      {/* Subtitle */}
      <div style={{
        fontSize: 15, color: T.text2, maxWidth: 380,
        lineHeight: 1.6, marginBottom: "2rem",
      }}>
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={() => navigate("/")}
          style={{
            background: T.accent, color: T.accentFg,
            border: "none", padding: "10px 24px",
            borderRadius: 10, fontSize: 14, fontWeight: 700,
            cursor: "pointer", fontFamily: "'Clash Display',sans-serif",
            display: "flex", alignItems: "center", gap: 8,
          }}>
          🏠 Back to Home
        </button>
        <button onClick={() => navigate("/browse")}
          style={{
            background: T.bg2, color: T.text,
            border: `1px solid ${T.border2}`, padding: "10px 24px",
            borderRadius: 10, fontSize: 14, fontWeight: 600,
            cursor: "pointer", fontFamily: "'Satoshi',sans-serif",
            display: "flex", alignItems: "center", gap: 8,
          }}>
          💼 Browse Jobs
        </button>
      </div>

      {/* Bottom branding */}
      <div style={{ marginTop: "3rem", fontSize: 13, color: T.text3 }}>
        <span style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 700, color: T.text2 }}>
          Career<span style={{ color: T.accent }}>Club</span>
        </span>
        {" "}· Find your next opportunity
      </div>
    </div>
  );
}