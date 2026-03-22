import { useState }                   from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth }                       from "../firebase/firebase";
import Icon                           from "../components/shared/Icon";
import { I }                          from "../constants";

export default function LoginView({ T }) {
  const [email,   setEmail]   = useState("");
  const [pw,      setPw]      = useState("");
  const [err,     setErr]     = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw,  setShowPw]  = useState(false);

  const IS = {
    background: T.inputBg, border: `1px solid ${T.border2}`,
    borderRadius: 10, padding: "11px 14px", fontSize: 14,
    color: T.text, width: "100%",
    fontFamily: "'Satoshi',sans-serif", outline: "none",
    boxSizing: "border-box",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    if (!email.trim() || !pw.trim()) { setErr("Enter email and password."); return; }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pw);
    } catch (error) {
      const MAP = {
        "auth/invalid-credential":     "Wrong email or password.",
        "auth/user-not-found":         "No account with this email.",
        "auth/wrong-password":         "Wrong password.",
        "auth/too-many-requests":      "Too many attempts. Try later.",
        "auth/network-request-failed": "Network error. Check connection.",
      };
      setErr(MAP[error.code] || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: T.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1.5rem", fontFamily: "'Satoshi',sans-serif",
    }}>
      <div style={{
        width: "100%", maxWidth: 400,
        background: T.bg2, border: `1px solid ${T.border2}`,
        borderRadius: 18, padding: "2rem",
        boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 28, fontWeight: 700, letterSpacing: -1, color: T.text, marginBottom: 6 }}>
            Carrer<span style={{ color: T.accent }}>Club</span>
          </div>
          <span style={{ background: T.ftBg, color: T.ftFg, fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 20, letterSpacing: 1.5, display: "inline-block", marginBottom: 12 }}>
            ADMIN
          </span>
          <div style={{ fontSize: 14, color: T.text2 }}>Sign in to manage listings</div>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8, color: T.text2, fontWeight: 600 }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email" style={IS} autoComplete="email" />
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8, color: T.text2, fontWeight: 600 }}>Password</label>
            <div style={{ position: "relative" }}>
              <input type={showPw ? "text" : "password"} value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Enter password"
                style={{ ...IS, paddingRight: 44 }}
                autoComplete="current-password" />
              <button type="button" onClick={() => setShowPw((v) => !v)}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: T.text3, fontSize: 15, padding: 0 }}>
                {showPw ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Error */}
          {err && (
            <div style={{ background: T.dangerBg, border: `1px solid ${T.dangerFg}44`, borderRadius: 8, padding: "9px 12px", fontSize: 13, color: T.dangerFg, display: "flex", alignItems: "center", gap: 6 }}>
              ⚠ {err}
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={loading} style={{
            background: loading ? T.bg3 : T.accent,
            color: loading ? T.text2 : T.accentFg,
            border: "none", padding: "12px", borderRadius: 10,
            fontSize: 14, fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'Clash Display',sans-serif",
            marginTop: 4, transition: "all 0.2s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            {loading ? (
              <>
                <span style={{ width: 14, height: 14, border: `2px solid ${T.text3}`, borderTopColor: T.text2, borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                Signing in...
              </>
            ) : (
              <><Icon path={I.check} size={14} color={T.accentFg} /> Sign In</>
            )}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
          <a href="/" style={{ color: T.a3, fontSize: 13, fontFamily: "'Satoshi',sans-serif", textDecoration: "none" }}>
            ← Back to CarrerClub
          </a>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}