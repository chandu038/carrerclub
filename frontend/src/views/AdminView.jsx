// src/views/AdminView.jsx
import { useState }              from "react";
import Icon                      from "../components/shared/Icon";
import ConfirmDialog             from "../components/dialogs/ConfirmDialog";
import { I, CATS, ADMIN_TABS }  from "../constants";
import { TYPE_COLORS }          from "../themes";
import { useWindowWidth }        from "../hooks/useWindowWidth";

function Field({ label, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: error ? "#ff7070" : "#8896b3", fontWeight: 600 }}>
        {label}{error ? " *" : ""}
      </label>
      {children}
      {error && <div style={{ fontSize: 11, color: "#ff7070", display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>⚠ {error}</div>}
    </div>
  );
}

const BADGE_OPTIONS = [
  { id: "fresher",  label: "Fresher OK",          color: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.35)"  },
  { id: "anygrad",  label: "Any Graduate",         color: "#38bdf8", bg: "rgba(56,189,248,0.12)",  border: "rgba(56,189,248,0.35)"  },
  { id: "remote",   label: "Remote OK",            color: "#a78bfa", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.35)" },
  { id: "noexp",    label: "No Experience Needed", color: "#fb923c", bg: "rgba(251,146,60,0.12)",  border: "rgba(251,146,60,0.35)"  },
  { id: "parttime", label: "Part-time OK",         color: "#f472b6", bg: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.35)" },
  { id: "walkin",   label: "Walk-in",              color: "#facc15", bg: "rgba(250,204,21,0.12)",  border: "rgba(250,204,21,0.35)"  },
];

const currentYear = new Date().getFullYear();
const PRESET_YEARS = Array.from({ length: 6 }, (_, i) => currentYear - 1 + i);
const BATCH_COLOR = "#c084fc";
const BATCH_BG    = "rgba(192,132,252,0.12)";
const BATCH_BRD   = "rgba(192,132,252,0.35)";

function BadgePicker({ value = [], onChange, T }) {
  const toggle = (id) => onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {BADGE_OPTIONS.map((b) => {
        const active = value.includes(b.id);
        return (
          <button key={b.id} type="button" onClick={() => toggle(b.id)}
            style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${active ? b.border : T.border2}`, background: active ? b.bg : "transparent", color: active ? b.color : T.text3, transition: "all 0.15s", fontFamily: "'Satoshi',sans-serif" }}>
            {active ? "✓ " : ""}{b.label}
          </button>
        );
      })}
    </div>
  );
}

function BatchPicker({ value = [], onChange, T, IS }) {
  const [customInput, setCustomInput] = useState("");

  const toggle = (yr) => onChange(value.includes(yr) ? value.filter((v) => v !== yr) : [...value, yr]);

  const addCustom = () => {
    const yr = parseInt(customInput.trim(), 10);
    if (!isNaN(yr) && yr > 2000 && yr < 2100 && !value.includes(yr)) {
      onChange([...value, yr]);
    }
    setCustomInput("");
  };

  const handleKey = (e) => { if (e.key === "Enter") { e.preventDefault(); addCustom(); } };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Preset year buttons */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {PRESET_YEARS.map((yr) => {
          const active = value.includes(yr);
          return (
            <button key={yr} type="button" onClick={() => toggle(yr)}
              style={{ padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: "pointer", border: `1px solid ${active ? BATCH_BRD : T.border2}`, background: active ? BATCH_BG : "transparent", color: active ? BATCH_COLOR : T.text3, transition: "all 0.15s", fontFamily: "'Satoshi',sans-serif" }}>
              {active ? "🎓 " : ""}{yr}
            </button>
          );
        })}
      </div>

      {/* Manual entry */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          style={{ ...IS, flex: 1, fontSize: 12 }}
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Enter any year e.g. 2027, 2028..."
          type="number"
          min="2000" max="2100"
        />
        <button type="button" onClick={addCustom}
          style={{ padding: "7px 14px", borderRadius: 7, background: BATCH_BG, border: `1px solid ${BATCH_BRD}`, color: BATCH_COLOR, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", whiteSpace: "nowrap" }}>
          + Add
        </button>
      </div>

      {/* Selected years as removable pills */}
      {value.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {value.map((yr, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 5, background: BATCH_BG, border: `1px solid ${BATCH_BRD}`, padding: "3px 10px", borderRadius: 20, fontSize: 12, color: BATCH_COLOR, fontWeight: 700 }}>
              🎓 {yr}
              <button type="button" onClick={() => onChange(value.filter((v) => v !== yr))}
                style={{ background: "none", border: "none", cursor: "pointer", color: BATCH_COLOR, fontSize: 14, lineHeight: 1, padding: 0, display: "flex", alignItems: "center" }}>
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminView({
  jobs, setJobs,
  showToast, T, isMobile, setSelJob,
  isDark, setIsDark,
  onAddJob, onUpdateJob, onDeleteJob, onLogout,
}) {
  const [tab,        setTab]        = useState("dashboard");
  const [confirmDel, setConfirmDel] = useState(null);
  const [editJob,    setEditJob]    = useState(null);
  const [saving,     setSaving]     = useState(false);
  const [sideOpen,   setSideOpen]   = useState(false);
  const w        = useWindowWidth();
  const isTablet = w < 900;

  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const emptyForm = {
    title: "", company: "", location: "", salary: "",
    tags: "", emoji: "💼", type: "Full-time",
    exp: "0–2 yrs", cat: "tech", desc: "",
    posted: today, logo: "", applyLink: "",
    badges: [], batches: [],
  };
  const [jf, setJf] = useState(emptyForm);

  const IS = {
    background: T.inputBg, border: `1px solid ${T.border2}`,
    borderRadius: 7, padding: "8px 11px", fontSize: 13,
    color: T.text, width: "100%",
    fontFamily: "'Satoshi',sans-serif", outline: "none",
  };

  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const e = {};
    if (!data.title.trim())    e.title    = "Job title is required";
    if (!data.company.trim())  e.company  = "Company name is required";
    if (!data.location.trim()) e.location = "Location is required";
    if (!data.salary.trim())   e.salary   = "Salary is required";
    if (!data.exp.trim())      e.exp      = "Experience is required";
    if (!data.desc.trim())     e.desc     = "Job description is required";
    if (!data.tags.trim())     e.tags     = "Add at least one tag";
    return e;
  };

  const openEdit = (job) => {
    setErrors({});
    setEditJob({
      ...job,
      tags:    Array.isArray(job.tags)    ? job.tags.join(", ")    : job.tags,
      badges:  Array.isArray(job.badges)  ? job.badges  : [],
      batches: Array.isArray(job.batches) ? job.batches : [],
    });
  };

  const addJob = async () => {
    const errs = validate(jf);
    if (Object.keys(errs).length > 0) { setErrors(errs); showToast("Please fill all required fields."); return; }
    setErrors({});
    setSaving(true);
    try {
      await onAddJob({ ...jf, tags: jf.tags.split(",").map((t) => t.trim()).filter(Boolean) });
      setJf(emptyForm);
      setTab("manage");
    } catch { showToast("Failed to post job."); }
    finally { setSaving(false); }
  };

  const saveEdit = async () => {
    if (!editJob?.title.trim()) return;
    setSaving(true);
    try {
      const updated = {
        ...editJob,
        tags:    typeof editJob.tags === "string" ? editJob.tags.split(",").map((t) => t.trim()).filter(Boolean) : editJob.tags,
        badges:  Array.isArray(editJob.badges)  ? editJob.badges  : [],
        batches: Array.isArray(editJob.batches) ? editJob.batches : [],
      };
      await onUpdateJob(editJob.id, updated);
      setEditJob(null);
    } catch { showToast("Failed to update job."); }
    finally { setSaving(false); }
  };

  const doDelete = async () => {
    if (!confirmDel) return;
    try { await onDeleteJob(confirmDel.id); }
    catch { showToast("Failed to delete job."); }
    finally { setConfirmDel(null); }
  };

  const TAB_COLORS = { dashboard: T.a3, addjob: T.accent, manage: T.a4, settings: T.a5 };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column" }}>

      {/* NAV */}
      <div style={{ background: "rgba(10,14,26,0.96)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(100,130,255,0.18)", padding: "0 1rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 200, flexShrink: 0, gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {isTablet && (
            <button onClick={() => setSideOpen((o) => !o)} style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(124,109,255,0.15)", border: "1px solid rgba(124,109,255,0.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon path={I.bars} size={17} color="#a99fff" />
            </button>
          )}
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#38bdf8,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon path={I.settings} size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 15, fontWeight: 700, color: "#e8eeff", lineHeight: 1.1 }}>Career Club <span style={{ color: "#38bdf8" }}>Admin</span></div>
            {!isMobile && <div style={{ fontSize: 10, color: "#3d4f6e" }}>Management Panel</div>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {!isMobile && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 20, padding: "4px 10px", fontSize: 11, color: "#34d399", fontWeight: 600, whiteSpace: "nowrap" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", animation: "blink 2s infinite" }} />Secret Access
              </div>
              <button onClick={() => setIsDark((d) => !d)} style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(124,109,255,0.15)", border: "1px solid rgba(124,109,255,0.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{isDark ? "☀️" : "🌙"}</button>
              <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 6, height: 34, padding: "0 14px", borderRadius: 9, background: "rgba(255,82,121,0.12)", border: "1px solid rgba(255,82,121,0.3)", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#ff5279", fontFamily: "'Satoshi',sans-serif", whiteSpace: "nowrap" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff5279" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                Logout
              </button>
            </>
          )}
          {isMobile && (
            <button onClick={onLogout} style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(255,82,121,0.12)", border: "1px solid rgba(255,82,121,0.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff5279" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </button>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        {isTablet && sideOpen && <div onClick={() => setSideOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 150, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />}

        {/* SIDEBAR */}
        <aside style={{ width: 220, flexShrink: 0, background: "rgba(10,14,26,0.97)", backdropFilter: "blur(20px)", borderRight: "1px solid rgba(100,130,255,0.12)", display: "flex", flexDirection: "column", padding: "1.25rem 0", position: isTablet ? "fixed" : "sticky", top: isTablet ? 0 : 56, left: 0, zIndex: isTablet ? 160 : "auto", height: isTablet ? "100vh" : "calc(100vh - 56px)", overflowY: "auto", transition: "transform 0.25s ease", transform: isTablet && !sideOpen ? "translateX(-100%)" : "translateX(0)" }}>
          {isTablet && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", borderBottom: "1px solid rgba(100,130,255,0.12)", marginBottom: "0.5rem" }}>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 16, fontWeight: 700, color: "#e8eeff" }}>Career<span style={{ color: "#38bdf8" }}>Club</span></div>
              <button onClick={() => setSideOpen(false)} style={{ width: 30, height: 30, borderRadius: 7, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon path={I.close} size={15} color="#8896b3" />
              </button>
            </div>
          )}
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "#3d4f6e", padding: "0 1rem", marginBottom: "0.5rem", fontWeight: 600 }}>Navigation</div>
          {ADMIN_TABS.map((p) => {
            const active = tab === p.id;
            const col    = TAB_COLORS[p.id];
            return (
              <button key={p.id} onClick={() => { setTab(p.id); setSideOpen(false); }}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 1rem", fontSize: 13, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", border: "none", textAlign: "left", background: active ? `${col}18` : "transparent", color: active ? col : "#8896b3", borderLeft: `2px solid ${active ? col : "transparent"}`, transition: "all 0.15s" }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: active ? `${col}22` : "rgba(255,255,255,0.05)", border: `1px solid ${active ? col + "44" : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon path={I[p.ic]} size={14} color={active ? col : "#8896b3"} />
                </div>
                {p.label}
              </button>
            );
          })}
          <div style={{ height: 1, background: "rgba(100,130,255,0.1)", margin: "1rem 0" }} />
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "#3d4f6e", padding: "0 1rem", marginBottom: "0.5rem", fontWeight: 600 }}>Site</div>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 1rem", fontSize: 13, fontFamily: "'Satoshi',sans-serif", textDecoration: "none", color: "#8896b3", borderLeft: "2px solid transparent", transition: "all 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#38bdf8"; e.currentTarget.style.borderLeftColor = "#38bdf8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#8896b3"; e.currentTarget.style.borderLeftColor = "transparent"; }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon path={I.home} size={14} color="#38bdf8" />
            </div>
            Back to Home
          </a>
          {isTablet && (
            <button onClick={() => setIsDark((d) => !d)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 1rem", fontSize: 13, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", border: "none", background: "transparent", color: "#8896b3", width: "100%", textAlign: "left", marginTop: 4 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(124,109,255,0.08)", border: "1px solid rgba(124,109,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{isDark ? "☀️" : "🌙"}</div>
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          )}
          <div style={{ height: 1, background: "rgba(100,130,255,0.1)", margin: "0.75rem 0" }} />
          <button onClick={onLogout}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 1rem", fontSize: 13, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", border: "none", background: "transparent", color: "#ff5279", width: "100%", textAlign: "left", borderLeft: "2px solid transparent", transition: "all 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,82,121,0.08)"; e.currentTarget.style.borderLeftColor = "#ff5279"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderLeftColor = "transparent"; }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,82,121,0.1)", border: "1px solid rgba(255,82,121,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff5279" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </div>
            Logout
          </button>
          <div style={{ height: 1, background: "rgba(100,130,255,0.1)", margin: "0.75rem 0" }} />
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "#3d4f6e", padding: "0 1rem", marginBottom: "0.75rem", fontWeight: 600 }}>Quick Stats</div>
          <div style={{ padding: "0 1rem", display: "flex", flexDirection: "column", gap: 8 }}>
            {[["Total", jobs.length, "#38bdf8"], ["Govt", jobs.filter((j) => j.cat === "govt").length, "#34d399"], ["Full-time", jobs.filter((j) => j.type === "Full-time").length, "#a99fff"], ["Remote", jobs.filter((j) => j.location === "Remote").length, "#ff5279"]].map(([l, v, c]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: 12, color: "#8896b3" }}>{l}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: c }}>{v}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* CONTENT */}
        <div style={{ flex: 1, minWidth: 0, padding: isMobile ? "1.25rem 1rem" : "1.75rem 2rem", overflowY: "auto" }}>

          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700, color: T.text, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 10 }}>
                <Icon path={I.grid} size={20} color={T.a3} />Dashboard
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 12, marginBottom: "1.5rem" }}>
                {[["Total Jobs", jobs.length, T.a3, T.inBg, I.briefcase], ["Full-time", jobs.filter((j) => j.type === "Full-time").length, T.accent, T.ftBg, I.check], ["Govt Jobs", jobs.filter((j) => j.cat === "govt").length, T.a6, T.gbBg, I.govt], ["Remote", jobs.filter((j) => j.location === "Remote").length, T.a2, T.ptBg, I.map]].map(([l, v, c, bg, ic]) => (
                  <div key={l} style={{ background: bg, border: `1px solid ${T.border}`, borderRadius: 14, padding: "1.1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 7, background: `${c}22`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon path={ic} size={14} color={c} /></div>
                      <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: T.text2 }}>{l}</span>
                    </div>
                    <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 34, fontWeight: 700, color: c }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "0.9rem 1.1rem", borderBottom: `1px solid ${T.border}`, fontSize: 13, fontWeight: 600, color: T.text, display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon path={I.list} size={14} color={T.a4} />Recent listings
                </div>
                <div style={{ padding: "0.25rem 1.1rem 0.5rem" }}>
                  {jobs.slice(0, 8).map((j) => {
                    const tc = TYPE_COLORS(T)[j.type] || TYPE_COLORS(T)["Full-time"];
                    return (
                      <div key={j.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${T.border}`, cursor: "pointer", transition: "background 0.15s" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = T.bg3}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        onClick={() => setSelJob(j)}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: T.bg3, border: `1px solid ${T.border2}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, overflow: "hidden" }}>
                          {j.logo ? <img src={j.logo} alt={j.company} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 3 }} onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} /> : null}
                          <span style={{ display: j.logo ? "none" : "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>{j.emoji}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{j.title}</span>
                            <span style={{ fontSize: 10, padding: "1px 7px", borderRadius: 20, fontWeight: 700, background: tc.bg, color: tc.fg, whiteSpace: "nowrap", flexShrink: 0 }}>{j.type}</span>
                          </div>
                          <div style={{ fontSize: 11, color: T.text2, display: "flex", gap: 6 }}>
                            <span>{j.company}</span><span style={{ color: T.text3 }}>·</span><span>{j.location}</span><span style={{ color: T.text3 }}>·</span><span style={{ color: T.a3, fontWeight: 600 }}>{j.salary}</span>
                          </div>
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => openEdit(j)} style={{ background: T.ms2, border: `1px solid ${T.accent}55`, color: T.accent, padding: "5px 10px", borderRadius: 7, fontSize: 11, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
                            <Icon path={I.edit} size={12} color={T.accent} />Edit
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* ADD JOB */}
          {tab === "addjob" && (
            <>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700, color: T.text, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 10 }}>
                <Icon path={I.plus} size={20} color={T.accent} />Post a Job
              </div>
              <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 14 }}>
                <div style={{ padding: "0.9rem 1.1rem", borderBottom: `1px solid ${T.border}`, fontSize: 13, fontWeight: 600, color: T.text, display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon path={I.plus} size={14} color={T.accent} />Job details
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    <Field label="Job Title" error={errors.title}><input style={{ ...IS, border: `1px solid ${errors.title ? "#ff7070" : T.border2}` }} value={jf.title} onChange={(e) => { setJf((f) => ({ ...f, title: e.target.value })); setErrors((er) => ({ ...er, title: "" })); }} placeholder="e.g. Frontend Developer" /></Field>
                    <Field label="Company" error={errors.company}><input style={{ ...IS, border: `1px solid ${errors.company ? "#ff7070" : T.border2}` }} value={jf.company} onChange={(e) => { setJf((f) => ({ ...f, company: e.target.value })); setErrors((er) => ({ ...er, company: "" })); }} placeholder="e.g. Zoho" /></Field>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    <Field label="Location" error={errors.location}><input style={{ ...IS, border: `1px solid ${errors.location ? "#ff7070" : T.border2}` }} value={jf.location} onChange={(e) => { setJf((f) => ({ ...f, location: e.target.value })); setErrors((er) => ({ ...er, location: "" })); }} placeholder="Chennai / Remote" /></Field>
                    <Field label="Salary" error={errors.salary}><input style={{ ...IS, border: `1px solid ${errors.salary ? "#ff7070" : T.border2}` }} value={jf.salary} onChange={(e) => { setJf((f) => ({ ...f, salary: e.target.value })); setErrors((er) => ({ ...er, salary: "" })); }} placeholder="6-9 LPA" /></Field>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    <Field label="Category" error={errors.cat}>
                      <select style={IS} value={jf.cat} onChange={(e) => { setJf((f) => ({ ...f, cat: e.target.value })); setErrors((er) => ({ ...er, cat: "" })); }}>
                        {CATS.slice(1).map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                    </Field>
                    <Field label="Work Type" error={errors.type}>
                      <select style={IS} value={jf.type} onChange={(e) => { setJf((f) => ({ ...f, type: e.target.value })); setErrors((er) => ({ ...er, type: "" })); }}>
                        <option>Full-time</option><option>Part-time</option><option>Internship</option><option>Contract</option><option>Govt</option>
                      </select>
                    </Field>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    <Field label="Experience" error={errors.exp}><input style={{ ...IS, border: `1px solid ${errors.exp ? "#ff7070" : T.border2}` }} value={jf.exp} onChange={(e) => { setJf((f) => ({ ...f, exp: e.target.value })); setErrors((er) => ({ ...er, exp: "" })); }} placeholder="0–2 yrs / Any Graduate" /></Field>
                    <Field label="Posted Date">
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 7, background: T.bg3, border: `1px solid ${T.border2}`, fontSize: 13, color: T.text2 }}>📅 Auto-set to today when posted</div>
                    </Field>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <Field label="Apply Link *"><input style={IS} value={jf.applyLink} onChange={(e) => setJf((f) => ({ ...f, applyLink: e.target.value }))} placeholder="https://careers.company.com/apply/job-id" /></Field>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <Field label="Eligible Badges (click to select)">
                      <div style={{ padding: "10px 12px", background: T.bg3, borderRadius: 8, border: `1px solid ${T.border2}` }}>
                        <BadgePicker value={jf.badges} onChange={(v) => setJf((f) => ({ ...f, badges: v }))} T={T} />
                      </div>
                    </Field>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <Field label="Eligible Batch Years">
                      <div style={{ padding: "10px 12px", background: T.bg3, borderRadius: 8, border: `1px solid ${T.border2}` }}>
                        <BatchPicker value={jf.batches} onChange={(v) => setJf((f) => ({ ...f, batches: v }))} T={T} IS={IS} />
                      </div>
                    </Field>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <Field label="Company Logo URL">
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div style={{ width: 48, height: 48, borderRadius: 10, background: T.bg3, border: `1px solid ${T.border2}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                          {jf.logo ? <img src={jf.logo} alt="preview" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4 }} onError={(e) => e.target.style.display = "none"} /> : <span style={{ fontSize: 22 }}>{jf.emoji || "💼"}</span>}
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                          <input style={IS} value={jf.logo} onChange={(e) => setJf((f) => ({ ...f, logo: e.target.value }))} placeholder="https://logo.clearbit.com/zoho.com" />
                          <div style={{ fontSize: 11, color: T.text3 }}>Tip: use <span style={{ color: T.a3 }}>logo.clearbit.com/companyname.com</span></div>
                        </div>
                      </div>
                    </Field>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    <Field label="Emoji (fallback)"><input style={IS} value={jf.emoji} onChange={(e) => setJf((f) => ({ ...f, emoji: e.target.value }))} placeholder="💼" /></Field>
                    <Field label="Tags (comma separated)" error={errors.tags}><input style={{ ...IS, border: `1px solid ${errors.tags ? "#ff7070" : T.border2}` }} value={jf.tags} onChange={(e) => { setJf((f) => ({ ...f, tags: e.target.value })); setErrors((er) => ({ ...er, tags: "" })); }} placeholder="React, Fresher OK, Full-time" /></Field>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <Field label="Job Description" error={errors.desc}>
                      <textarea style={{ ...IS, minHeight: 130, resize: "vertical", border: `1px solid ${errors.desc ? "#ff7070" : T.border2}` }} value={jf.desc} onChange={(e) => { setJf((f) => ({ ...f, desc: e.target.value })); setErrors((er) => ({ ...er, desc: "" })); }} placeholder="Responsibilities, eligibility, selection process..." />
                    </Field>
                  </div>
                  {Object.keys(errors).some(k => errors[k]) && (
                    <div style={{ background: "rgba(255,112,112,0.1)", border: "1px solid rgba(255,112,112,0.35)", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#ff7070", display: "flex", alignItems: "center", gap: 8 }}>⚠ Please fill all required fields before posting.</div>
                  )}
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <button onClick={() => { setJf(emptyForm); setErrors({}); }} style={{ background: T.bg3, color: T.text2, border: `1px solid ${T.border2}`, padding: "8px 14px", borderRadius: 7, fontSize: 13, cursor: "pointer", fontFamily: "'Satoshi',sans-serif" }}>Clear</button>
                    <button onClick={addJob} disabled={saving} style={{ background: saving ? T.bg3 : T.accent, color: saving ? T.text2 : T.accentFg, border: "none", padding: "8px 20px", borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Clash Display',sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon path={I.plus} size={14} color={saving ? T.text2 : T.accentFg} />{saving ? "Posting..." : "Post Job"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* MANAGE */}
          {tab === "manage" && (
            <>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700, color: T.text, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 10 }}>
                <Icon path={I.list} size={20} color={T.a4} />Manage Jobs
              </div>
              <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "0.9rem 1.1rem", borderBottom: `1px solid ${T.border}`, fontSize: 13, fontWeight: 600, color: T.text }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon path={I.list} size={14} color={T.a3} />All listings ({jobs.length})</div>
                </div>
                <div>
                  {jobs.map((j) => {
                    const tc = TYPE_COLORS(T)[j.type] || TYPE_COLORS(T)["Full-time"];
                    return (
                      <div key={j.id} style={{ borderBottom: `1px solid ${T.border}`, transition: "background 0.15s" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = T.bg3}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 1.1rem 6px" }}>
                          <div style={{ width: 38, height: 38, borderRadius: 9, background: T.bg3, border: `1px solid ${T.border2}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, overflow: "hidden" }}>
                            {j.logo ? <img src={j.logo} alt={j.company} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 3 }} onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} /> : null}
                            <span style={{ display: j.logo ? "none" : "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>{j.emoji}</span>
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2, flexWrap: "wrap" }}>
                              <span style={{ fontSize: 13, fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: isMobile ? "180px" : "420px" }}>{j.title}</span>
                              <span style={{ fontSize: 10, padding: "1px 7px", borderRadius: 20, fontWeight: 700, background: tc.bg, color: tc.fg, whiteSpace: "nowrap", flexShrink: 0 }}>{j.type}</span>
                            </div>
                            <div style={{ fontSize: 11, color: T.text2, display: "flex", gap: 4, flexWrap: "wrap" }}>
                              <span>{j.company}</span><span style={{ color: T.text3 }}>·</span><span>{j.location}</span><span style={{ color: T.text3 }}>·</span><span style={{ color: T.a3, fontWeight: 600 }}>{j.salary}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 6, padding: "4px 1.1rem 10px", justifyContent: isMobile ? "flex-start" : "flex-end" }}>
                          <button onClick={() => setSelJob(j)} style={{ background: T.inBg, border: `1px solid ${T.border2}`, color: T.a3, padding: "6px 12px", borderRadius: 7, fontSize: 12, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", display: "flex", alignItems: "center", gap: 4, flex: isMobile ? "1" : "0", justifyContent: "center" }}>
                            <Icon path={I.eye} size={13} color={T.a3} />View
                          </button>
                          <button onClick={() => openEdit(j)} style={{ background: T.ms2, border: `1px solid ${T.accent}55`, color: T.accent, padding: "6px 12px", borderRadius: 7, fontSize: 12, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", display: "flex", alignItems: "center", gap: 4, flex: isMobile ? "1" : "0", justifyContent: "center" }}>
                            <Icon path={I.edit} size={13} color={T.accent} />Edit
                          </button>
                          <button onClick={() => setConfirmDel(j)} style={{ background: T.dangerBg, border: `1px solid ${T.dangerFg}33`, color: T.dangerFg, padding: "6px 12px", borderRadius: 7, fontSize: 12, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", display: "flex", alignItems: "center", gap: 4, flex: isMobile ? "1" : "0", justifyContent: "center" }}>
                            <Icon path={I.trash} size={13} color={T.dangerFg} />Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* SETTINGS */}
          {tab === "settings" && (
            <>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700, color: T.text, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 10 }}>
                <Icon path={I.settings} size={20} color={T.a5} />Settings
              </div>
              <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 14, padding: "1.25rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[["Site name","Career Club"],["Contact Email","darapanenic1@gmail.com"],["Telegram","@undefined890"],["Admin URL","/admin/flashfeed2025"]].map(([l, ph]) => (
                    <Field key={l} label={l}><input style={IS} defaultValue={ph} /></Field>
                  ))}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button onClick={() => showToast("Settings saved!")} style={{ background: T.accent, color: T.accentFg, border: "none", padding: "8px 18px", borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Clash Display',sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon path={I.check} size={14} color={T.accentFg} />Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {confirmDel && <ConfirmDialog title="Delete this job?" message={`"${confirmDel.title}" will be permanently removed.`} onConfirm={doDelete} onCancel={() => setConfirmDel(null)} T={T} />}

      {/* EDIT MODAL */}
      {editJob && (
        <div onClick={(e) => e.target === e.currentTarget && setEditJob(null)}
          style={{ position: "fixed", inset: 0, zIndex: 700, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)", display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", padding: isMobile ? 0 : "1.5rem" }}>
          <div style={{ background: T.bg2, border: `1px solid ${T.border2}`, width: "100%", maxWidth: 660, borderRadius: isMobile ? "20px 20px 0 0" : 16, maxHeight: isMobile ? "95vh" : "90vh", overflowY: "auto", animation: "dlg 0.28s cubic-bezier(0.34,1.4,0.64,1)" }}>
            {isMobile && <div style={{ width: 40, height: 4, background: T.border2, borderRadius: 4, margin: "10px auto 0" }} />}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 1.25rem", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: T.ms2, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon path={I.edit} size={16} color={T.accent} /></div>
                <div>
                  <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 16, fontWeight: 700, color: T.text }}>Edit Job</div>
                  <div style={{ fontSize: 11, color: T.text2 }}>{editJob.company}</div>
                </div>
              </div>
              <button onClick={() => setEditJob(null)} style={{ background: T.bg3, border: `1px solid ${T.border2}`, borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon path={I.close} size={16} color={T.text2} />
              </button>
            </div>
            <div style={{ padding: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <Field label="Job Title *"><input style={IS} value={editJob.title} onChange={(e) => setEditJob((j) => ({ ...j, title: e.target.value }))} /></Field>
                <Field label="Company *"><input style={IS} value={editJob.company} onChange={(e) => setEditJob((j) => ({ ...j, company: e.target.value }))} /></Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <Field label="Location"><input style={IS} value={editJob.location} onChange={(e) => setEditJob((j) => ({ ...j, location: e.target.value }))} /></Field>
                <Field label="Salary"><input style={IS} value={editJob.salary} onChange={(e) => setEditJob((j) => ({ ...j, salary: e.target.value }))} placeholder="6-9 LPA" /></Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <Field label="Category">
                  <select style={IS} value={editJob.cat} onChange={(e) => setEditJob((j) => ({ ...j, cat: e.target.value }))}>
                    {CATS.slice(1).map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </Field>
                <Field label="Work Type">
                  <select style={IS} value={editJob.type} onChange={(e) => setEditJob((j) => ({ ...j, type: e.target.value }))}>
                    <option>Full-time</option><option>Part-time</option><option>Internship</option><option>Contract</option><option>Govt</option>
                  </select>
                </Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <Field label="Experience"><input style={IS} value={editJob.exp} onChange={(e) => setEditJob((j) => ({ ...j, exp: e.target.value }))} /></Field>
                <Field label="Posted Date">
                  <input type="date" style={IS} value={editJob.posted ? new Date(editJob.posted).toISOString().split("T")[0] : ""} onChange={(e) => setEditJob((j) => ({ ...j, posted: new Date(e.target.value).toISOString() }))} />
                </Field>
              </div>
              <div style={{ marginBottom: 10 }}>
                <Field label="Company Logo URL">
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: T.bg3, border: `1px solid ${T.border2}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                      {editJob.logo ? <img src={editJob.logo} alt="preview" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 3 }} onError={(e) => e.target.style.display = "none"} /> : <span style={{ fontSize: 20 }}>{editJob.emoji}</span>}
                    </div>
                    <input style={{ ...IS, flex: 1 }} value={editJob.logo || ""} onChange={(e) => setEditJob((j) => ({ ...j, logo: e.target.value }))} placeholder="https://logo.clearbit.com/company.com" />
                  </div>
                </Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <Field label="Tags"><input style={IS} value={editJob.tags || ""} onChange={(e) => setEditJob((j) => ({ ...j, tags: e.target.value }))} /></Field>
                <Field label="Emoji"><input style={IS} value={editJob.emoji} onChange={(e) => setEditJob((j) => ({ ...j, emoji: e.target.value }))} /></Field>
              </div>
              <div style={{ marginBottom: 10 }}>
                <Field label="Eligible Badges">
                  <div style={{ padding: "10px 12px", background: T.bg3, borderRadius: 8, border: `1px solid ${T.border2}` }}>
                    <BadgePicker value={editJob.badges || []} onChange={(v) => setEditJob((j) => ({ ...j, badges: v }))} T={T} />
                  </div>
                </Field>
              </div>
              <div style={{ marginBottom: 10 }}>
                <Field label="Eligible Batch Years">
                  <div style={{ padding: "10px 12px", background: T.bg3, borderRadius: 8, border: `1px solid ${T.border2}` }}>
                    <BatchPicker value={editJob.batches || []} onChange={(v) => setEditJob((j) => ({ ...j, batches: v }))} T={T} IS={IS} />
                  </div>
                </Field>
              </div>
              <div style={{ marginBottom: 14 }}>
                <Field label="Job Description"><textarea style={{ ...IS, minHeight: 120, resize: "vertical" }} value={editJob.desc || ""} onChange={(e) => setEditJob((j) => ({ ...j, desc: e.target.value }))} /></Field>
              </div>
              <div style={{ marginBottom: 14 }}>
                <Field label="Apply Link *"><input style={IS} value={editJob.applyLink || ""} onChange={(e) => setEditJob((j) => ({ ...j, applyLink: e.target.value }))} placeholder="https://careers.company.com/..." /></Field>
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <button onClick={() => setEditJob(null)} style={{ background: T.bg3, color: T.text2, border: `1px solid ${T.border2}`, padding: "8px 16px", borderRadius: 7, fontSize: 13, cursor: "pointer", fontFamily: "'Satoshi',sans-serif" }}>Cancel</button>
                <button onClick={saveEdit} disabled={saving} style={{ background: saving ? T.bg3 : T.accent, color: saving ? T.text2 : T.accentFg, border: "none", padding: "8px 20px", borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Clash Display',sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon path={I.check} size={14} color={saving ? T.text2 : T.accentFg} />{saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}