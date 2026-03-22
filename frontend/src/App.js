import { useState, useCallback, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation }   from "react-router-dom";
import { FONTS, DARK, LIGHT }                        from "./themes";
import { I }                                         from "./constants";
import { useWindowWidth }                            from "./hooks/useWindowWidth";
import { useAuth }                                   from "./hooks/useAuth";
import { fetchJobs, createJob, updateJob, deleteJob } from "./firebase/jobService";

import Icon          from "./components/shared/Icon";
import JobDialog     from "./components/dialogs/JobDialog";
import Footer        from "./components/shared/Footer";

import HomeView      from "./views/HomeView";
import BrowseView    from "./views/BrowseView";
import SavedView     from "./views/SavedView";
import AlertsView    from "./views/AlertsView";
import AdminView     from "./views/AdminView";
import LoginView     from "./views/LoginView";
import NotFoundView  from "./views/NotFoundView";
import PrivacyView   from "./views/PrivacyView";
import AboutView     from "./views/AboutView";
import ContactView   from "./views/Contactview";

export default function App() {
  const [isDark,      setIsDark]      = useState(true);
  const [jobs,        setJobs]        = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [selJob,      setSelJob]      = useState(null);
  const [toast,       setToast]       = useState({ on: false, msg: "" });
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [suggOpen,    setSuggOpen]    = useState(false);
  const suggTimer                     = useRef(null);

  const navigate   = useNavigate();
  const location   = useLocation();
  const w          = useWindowWidth();
  const isMobile   = w < 768;
  const T          = isDark ? DARK : LIGHT;
  const isAdmin    = location.pathname.startsWith("/admin");
  const savedCount = jobs.filter((j) => j.saved).length;

  const { user, loading: authLoading, logout } = useAuth();

  useEffect(() => {
    fetchJobs()
      .then((data) => setJobs(data))
      .catch(() => showToast("Failed to load jobs. Check connection."))
      .finally(() => setJobsLoading(false));
  }, []);

  const showToast = (msg) => {
    setToast({ on: true, msg });
    setTimeout(() => setToast({ on: false, msg: "" }), 2800);
  };

  const handleSave = useCallback((id) => {
    let wasSaved = false;
    setJobs((js) => {
      const job = js.find((j) => j.id === id);
      if (job) wasSaved = job.saved;
      return js.map((j) => j.id === id ? { ...j, saved: !j.saved } : j);
    });
    setSelJob((prev) => prev?.id === id ? { ...prev, saved: !prev.saved } : prev);
    setTimeout(() => showToast(wasSaved ? "Unsaved." : "Saved!"), 0);
  }, []);

  const handleAddJob = async (data) => {
    const postedISO = new Date().toISOString();
    const id = await createJob(data);
    setJobs((prev) => [{ id, ...data, posted: postedISO, saved: false }, ...prev]);
    showToast("Job posted!");
  };

  const handleUpdateJob = async (id, data) => {
    await updateJob(id, data);
    setJobs((prev) => prev.map((j) => j.id === id ? { ...j, ...data } : j));
    showToast("Job updated!");
  };

  const handleDeleteJob = async (id) => {
    await deleteJob(id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
    showToast("Job deleted.");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/flashfeed2025");
      showToast("Logged out successfully.");
    } catch {
      showToast("Logout failed. Try again.");
    }
  };

  const onSuggEnter = () => { clearTimeout(suggTimer.current); setSuggOpen(true); };
  const onSuggLeave = () => { suggTimer.current = setTimeout(() => setSuggOpen(false), 120); };

  const NAV_LINKS = [
    { label: "Home",        path: "/",       ic: I.home     },
    { label: "Browse Jobs", path: "/browse", ic: I.search   },
    { label: "Saved",       path: "/saved",  ic: I.bookmark },
    { label: "Alerts",      path: "/alerts", ic: I.bell     },
  ];
  const NAV_COLORS = [T.accent, T.a3, T.a4, T.a5];

  const SUGG_LINKS = [
    { label: "Send Mail", emoji: "✉️", color: T.a2, bg: "rgba(255,100,80,0.10)", brd: "rgba(255,100,80,0.25)", href: "https://mail.google.com/mail/?view=cm&to=darapanenic1@gmail.com&su=Job Suggestion — CarrerClub" },
    { label: "Telegram",  emoji: "✈️", color: T.a3, bg: "rgba(56,189,248,0.10)", brd: "rgba(56,189,248,0.25)", href: "https://t.me/undefined890" },
  ];

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", background: isDark ? "#141414" : "#e8e4dd", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 36, height: 36, border: "3px solid rgba(255,255,255,0.15)", borderTopColor: "#c8ff00", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Satoshi',sans-serif", background: T.bg, color: T.text, minHeight: "100vh", display: "flex", flexDirection: "column", transition: "background 0.22s,color 0.22s" }}>
      <style>{FONTS}{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-thumb{background:rgba(128,128,128,0.25);border-radius:3px}
        @keyframes blink  {0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes dlg    {from{opacity:0;transform:translateY(24px) scale(0.97)}to{opacity:1;transform:none}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes fadeUp {from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin   {to{transform:rotate(360deg)}}
      `}</style>

      {/* ── NAV ── */}
      {!isAdmin && (
        <nav style={{ position: "sticky", top: 0, zIndex: 300, backdropFilter: "blur(20px)", background: T.navBg, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", height: 56, flexShrink: 0 }}>
          <div onClick={() => navigate("/")} style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: -0.5, color: T.text, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            Carrer<span style={{ color: T.accent }}>Club</span>
            <span style={{ fontSize: 10, fontWeight: 700, background: T.ftBg, color: T.ftFg, padding: "2px 7px", borderRadius: 20 }}>JOBS</span>
          </div>

          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {NAV_LINKS.map((n, idx) => {
                const active = location.pathname === n.path || (n.path === "/browse" && location.pathname.startsWith("/browse"));
                const col    = NAV_COLORS[idx];
                return (
                  <button key={n.path} onClick={() => navigate(n.path)}
                    style={{ padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", border: "none", background: active ? col : "transparent", color: active ? "#fff" : T.text2, transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6, position: "relative" }}>
                    <Icon path={n.ic} size={14} color={active ? "#fff" : T.text2} />
                    {n.label}
                    {n.path === "/saved" && savedCount > 0 && (
                      <span style={{ position: "absolute", top: 0, right: 0, width: 17, height: 17, borderRadius: "50%", background: T.a2, color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{savedCount}</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {!isMobile && (
              <div style={{ position: "relative" }} onMouseEnter={onSuggEnter} onMouseLeave={onSuggLeave}>
                <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 20, background: T.ms2, border: `1px solid ${T.accent}44`, color: T.accent, fontSize: 13, fontWeight: 600, cursor: "default", fontFamily: "'Satoshi',sans-serif", whiteSpace: "nowrap" }}>
                  💡 Any Suggestions
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5" strokeLinecap="round" style={{ transition: "transform 0.2s", transform: suggOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {suggOpen && (
                  <div onMouseEnter={onSuggEnter} onMouseLeave={onSuggLeave}
                    style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, width: 248, background: T.bg2, border: `1px solid ${T.border2}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.32)", animation: "fadeUp 0.18s ease", zIndex: 500 }}>
                    <div style={{ padding: "10px 14px", fontSize: 11, textTransform: "uppercase", letterSpacing: 1.4, color: T.text3, fontWeight: 700, borderBottom: `1px solid ${T.border}`, background: T.bg3 }}>Reach out via</div>
                    {SUGG_LINKS.map((s, i) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderBottom: i < SUGG_LINKS.length - 1 ? `1px solid ${T.border}` : "none", textDecoration: "none", transition: "background 0.15s", background: "transparent" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = T.bg3; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, border: `1px solid ${s.brd}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{s.emoji}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.label}</div>
                          <div style={{ fontSize: 11, color: T.text3, marginTop: 2 }}>{s.sub}</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.text3} strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7 M7 7h10v10" /></svg>
                      </a>
                    ))}
                    <div style={{ padding: "8px 14px", fontSize: 11, color: T.text3, textAlign: "center", background: T.bg3, borderTop: `1px solid ${T.border}` }}>We read every message 🙏</div>
                  </div>
                )}
              </div>
            )}

            <button onClick={() => setIsDark((d) => !d)}
              style={{ padding: "7px 14px", borderRadius: 20, border: "none", cursor: "pointer", background: isDark ? "linear-gradient(135deg,#7c6dff,#38bdf8)" : "linear-gradient(135deg,#5b4eff,#0ea5e9)", color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, fontFamily: "'Satoshi',sans-serif", flexShrink: 0 }}>
              {isDark ? "☀" : "🌙"}
            </button>

            {isMobile && (
              <button onClick={() => setMenuOpen((o) => !o)}
                style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(124,109,255,0.12)", border: "1px solid rgba(124,109,255,0.25)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon path={I.bars} size={20} color={T.accent} />
              </button>
            )}
          </div>
        </nav>
      )}

      {/* ── MOBILE DRAWER ── */}
      {isMobile && menuOpen && (
        <div>
          <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }} />
          <div style={{ position: "fixed", top: 0, right: 0, zIndex: 500, width: 280, height: "100vh", background: "rgba(10,14,26,0.97)", backdropFilter: "blur(20px)", borderLeft: "1px solid rgba(100,130,255,0.18)", display: "flex", flexDirection: "column", animation: "slideIn 0.25s ease" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", borderBottom: "1px solid rgba(100,130,255,0.12)", background: "rgba(124,109,255,0.08)" }}>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 18, fontWeight: 700, color: "#e8eeff" }}>Carrer<span style={{ color: T.accent }}>Club</span></div>
              <button onClick={() => setMenuOpen(false)} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon path={I.close} size={16} color="#8896b3" />
              </button>
            </div>
            <div style={{ padding: "1rem 0.75rem", flex: 1, overflowY: "auto" }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "#3d4f6e", padding: "0 0.5rem", marginBottom: "0.5rem", fontWeight: 600 }}>Menu</div>
              {NAV_LINKS.map((n, idx) => {
                const active = location.pathname === n.path;
                const col    = NAV_COLORS[idx];
                return (
                  <button key={n.path} onClick={() => { navigate(n.path); setMenuOpen(false); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", marginBottom: 4, fontSize: 14, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", border: "none", textAlign: "left", background: active ? `${col}18` : "transparent", color: active ? col : "#8896b3", borderRadius: 10, borderLeft: `3px solid ${active ? col : "transparent"}`, transition: "all 0.15s" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: active ? `${col}22` : "rgba(255,255,255,0.05)", border: `1px solid ${active ? col + "44" : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon path={n.ic} size={16} color={active ? col : "#8896b3"} />
                    </div>
                    {n.label}
                    {n.path === "/saved" && savedCount > 0 && (
                      <span style={{ marginLeft: "auto", background: T.a2, color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{savedCount}</span>
                    )}
                  </button>
                );
              })}
              <div style={{ height: 1, background: "rgba(100,130,255,0.12)", margin: "1rem 0" }} />
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "#3d4f6e", padding: "0 0.5rem", marginBottom: "0.5rem", fontWeight: 600 }}>Contact</div>
              {SUGG_LINKS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", marginBottom: 8, borderRadius: 10, background: s.bg, border: `1px solid ${s.brd}`, color: s.color, textDecoration: "none", fontFamily: "'Satoshi',sans-serif", fontSize: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: s.bg, border: `1px solid ${s.brd}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{s.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700 }}>{s.label}</div>
                    <div style={{ fontSize: 11, opacity: 0.7, marginTop: 1 }}>{s.sub}</div>
                  </div>
                </a>
              ))}
              <div style={{ height: 1, background: "rgba(100,130,255,0.12)", margin: "1rem 0" }} />
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "#3d4f6e", padding: "0 0.5rem", marginBottom: "0.5rem", fontWeight: 600 }}>Info</div>
              {[
                { label: "About Us",       path: "/about"   },
                { label: "Contact Us",     path: "/contact" },
                { label: "Privacy Policy", path: "/privacy" },
              ].map((n) => (
                <button key={n.path} onClick={() => { navigate(n.path); setMenuOpen(false); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", marginBottom: 4, fontSize: 14, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", border: "none", textAlign: "left", background: "transparent", color: "#8896b3", borderRadius: 10, transition: "all 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = T.accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#8896b3"; }}>
                  → {n.label}
                </button>
              ))}
            </div>
            <div style={{ padding: "1rem", borderTop: "1px solid rgba(100,130,255,0.12)" }}>
              <button onClick={() => setIsDark((d) => !d)} style={{ width: "100%", padding: "10px", borderRadius: 10, border: "1px solid rgba(124,109,255,0.25)", cursor: "pointer", background: "rgba(124,109,255,0.1)", color: "#e8eeff", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'Satoshi',sans-serif" }}>
                {isDark ? "☀️ Switch to Light" : "🌙 Switch to Dark"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── LOADING BAR ── */}
      {jobsLoading && !isAdmin && (
        <div style={{ background: T.accent, color: T.accentFg, fontSize: 12, fontWeight: 700, textAlign: "center", padding: "5px", fontFamily: "'Clash Display',sans-serif" }}>
          Loading jobs...
        </div>
      )}

      {/* ── ROUTES ── */}
      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Routes>
          <Route path="/"                    element={<HomeView    jobs={jobs} T={T} isMobile={isMobile} setSelJob={setSelJob} onSave={handleSave} />} />
          <Route path="/browse"              element={<BrowseView  jobs={jobs} T={T} isMobile={isMobile} setSelJob={setSelJob} onSave={handleSave} />} />
          <Route path="/browse/:catId"       element={<BrowseView  jobs={jobs} T={T} isMobile={isMobile} setSelJob={setSelJob} onSave={handleSave} />} />
          <Route path="/saved"               element={<SavedView   jobs={jobs} T={T} isMobile={isMobile} setSelJob={setSelJob} onSave={handleSave} />} />
          <Route path="/alerts"              element={<AlertsView  jobs={jobs} T={T} isMobile={isMobile} />} />
          <Route path="/about"               element={<AboutView   T={T} isMobile={isMobile} />} />
          <Route path="/contact"             element={<ContactView T={T} isMobile={isMobile} />} />
          <Route path="/privacy"             element={<PrivacyView T={T} isMobile={isMobile} />} />
          <Route path="/admin/flashfeed2025" element={
            user
              ? <AdminView
                  jobs={jobs}
                  setJobs={setJobs}
                  showToast={showToast}
                  T={T}
                  isMobile={isMobile}
                  setSelJob={setSelJob}
                  isDark={isDark}
                  setIsDark={setIsDark}
                  onAddJob={handleAddJob}
                  onUpdateJob={handleUpdateJob}
                  onDeleteJob={handleDeleteJob}
                  onLogout={handleLogout}
                />
              : <LoginView T={T} />
          } />
          <Route path="*" element={<NotFoundView T={T} />} />
        </Routes>
      </main>

      {!isAdmin && <Footer T={T} />}

      {selJob && (
        <JobDialog
          job={jobs.find((j) => j.id === selJob.id) || selJob}
          onClose={() => setSelJob(null)}
          onSave={handleSave}
          T={T}
          isMobile={isMobile}
        />
      )}

      <div style={{ position: "fixed", bottom: 22, right: 22, zIndex: 999, background: `linear-gradient(135deg,${T.a3},${T.a4})`, color: "#fff", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif", transform: toast.on ? "translateY(0)" : "translateY(60px)", opacity: toast.on ? 1 : 0, transition: "all 0.28s ease", pointerEvents: "none", display: "flex", alignItems: "center", gap: 8, maxWidth: 320 }}>
        <Icon path={I.check} size={16} color="#fff" />{toast.msg}
      </div>
    </div>
  );
}