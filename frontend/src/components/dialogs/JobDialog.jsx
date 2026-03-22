import { useEffect } from "react";
import Icon from "../shared/Icon";
import { I, CATS, formatPosted, cleanSalary } from "../../constants";
import { TYPE_COLORS } from "../../themes";
import { isNew, BADGE_STYLES, BATCH_STYLE } from "../shared/JobCard";

function Dialog({ children, onClose, T, isMobile }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, zIndex: 600, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)", display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", padding: isMobile ? 0 : "1.5rem" }}>
      <div style={{ background: T.bg2, border: `1px solid ${T.border2}`, width: "100%", maxWidth: 640, borderRadius: isMobile ? "20px 20px 0 0" : 18, maxHeight: isMobile ? "93vh" : "88vh", overflowY: "auto", animation: "dlg 0.28s cubic-bezier(0.34,1.4,0.64,1)" }}>
        {isMobile && <div style={{ width: 40, height: 4, background: T.border2, borderRadius: 4, margin: "10px auto 0" }} />}
        {children}
      </div>
    </div>
  );
}

export default function JobDialog({ job, onClose, onSave, T, isMobile }) {
  const tc      = TYPE_COLORS(T)[job.type] || TYPE_COLORS(T)["Full-time"];
  const cat     = CATS.find((c) => c.id === job.cat);
  const catColor = cat?.color ? T[cat.color] : T.a3;
  const _isNew  = isNew(job.posted);
  const badges  = Array.isArray(job.badges) ? job.badges : [];
  const batches = Array.isArray(job.batches) ? job.batches : [];

  return (
    <Dialog onClose={onClose} T={T} isMobile={isMobile}>
      <div style={{ background: `linear-gradient(135deg, ${T.ms1}, ${T.ms3})`, borderBottom: `1px solid ${T.border}`, padding: "1.5rem 1.25rem 1.25rem", position: "relative" }}>
        {_isNew && (
          <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#ff5279,#ff8c42)", color: "#fff", fontSize: 11, fontWeight: 800, padding: "3px 14px", borderRadius: 20, letterSpacing: 1, boxShadow: "0 2px 10px rgba(255,82,121,0.45)", whiteSpace: "nowrap" }}>
            ✦ JUST POSTED
          </div>
        )}

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginTop: _isNew ? 28 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 54, height: 54, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border2}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, overflow: "hidden" }}>
              {job.logo && <img src={job.logo} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />}
              <span style={{ display: job.logo ? "none" : "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>{job.emoji}</span>
            </div>
            <div>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.4, fontWeight: 700, color: catColor, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <Icon path={I[cat?.ic || "briefcase"]} size={12} color={catColor} />{cat?.label}
              </div>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: isMobile ? 17 : 21, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.2, color: T.text }}>{job.title}</div>
              <div style={{ fontSize: 13, color: T.text2, marginTop: 4, display: "flex", alignItems: "center", gap: 5 }}>
                <Icon path={I.map} size={12} color={T.text3} />{job.company} · {job.location}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button onClick={() => onSave(job.id)} style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${job.saved ? T.accent : T.border2}`, background: job.saved ? T.accent : T.bg3, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon path={I.bookmark} size={16} color={job.saved ? T.accentFg : T.text2} fill={job.saved} />
            </button>
            <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${T.border2}`, background: T.bg3, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon path={I.close} size={16} color={T.text2} />
            </button>
          </div>
        </div>

        {/* All badges row */}
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: "1rem" }}>
          <span style={{ background: tc.bg, color: tc.fg, fontSize: 11, fontWeight: 700, padding: "4px 11px", borderRadius: 20 }}>{job.type}</span>
          <span style={{ background: T.ms2, color: T.a3, border: `1px solid ${T.border}`, fontSize: 11, fontWeight: 700, padding: "4px 11px", borderRadius: 20 }}>{cleanSalary(job.salary)}</span>
          <span style={{ background: T.ms1, color: catColor, border: `1px solid ${T.border}`, fontSize: 11, padding: "4px 11px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 }}>
            <Icon path={I.clock} size={11} color={catColor} />{job.exp}
          </span>
          {badges.map((id) => {
            const b = BADGE_STYLES[id];
            if (!b) return null;
            return <span key={id} style={{ background: b.bg, border: `1px solid ${b.border}`, fontSize: 11, fontWeight: 700, padding: "4px 11px", borderRadius: 20, color: b.color }}>✓ {b.label}</span>;
          })}
          {batches.map((yr) => (
            <span key={yr} style={{ background: BATCH_STYLE.bg, border: `1px solid ${BATCH_STYLE.border}`, fontSize: 11, fontWeight: 700, padding: "4px 11px", borderRadius: 20, color: BATCH_STYLE.color }}>🎓 Batch {yr}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 1.25rem 1.75rem" }}>
        {job.tags?.length > 0 && (
          <div style={{ background: T.ms1, borderRadius: 10, padding: "0.85rem 1rem", margin: "1rem 0 0" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: T.a3, fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
              <Icon path={I.tag} size={12} color={T.a3} />Skills & tags
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {job.tags.map((t) => (
                <span key={t} style={{ background: T.bg3, border: `1px solid ${T.border2}`, padding: "4px 12px", borderRadius: 20, fontSize: 12, color: T.text }}>{t}</span>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: T.ms2, borderRadius: 10, padding: "0.85rem 1rem", margin: "0.75rem 0 0" }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: T.accent, fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}>
            <Icon path={I.briefcase} size={12} color={T.accent} />Job details
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              ["Location",   I.map,       job.location,             false],
              ["Salary",     I.money,     cleanSalary(job.salary),  true ],
              ["Type",       I.briefcase, job.type,                 false],
              ["Experience", I.clock,     job.exp,                  false],
              ["Company",    I.govt,      job.company,              false],
              ["Posted",     I.clock,     formatPosted(job.posted), false],
            ].map(([label, icon, value, accent]) => (
              <div key={label} style={{ background: T.bg3, border: `1px solid ${T.border2}`, borderRadius: 8, padding: "9px 11px" }}>
                <div style={{ fontSize: 11, color: T.text2, marginBottom: 3, display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon path={icon} size={11} color={T.text2} />{label}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: accent ? T.a3 : T.text }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {job.desc && (
          <div style={{ background: T.ms3, borderRadius: 10, padding: "0.85rem 1rem", margin: "0.75rem 0 0" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: T.a4, fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}>
              <Icon path={I.list} size={12} color={T.a4} />About this role
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.78, color: T.text2, whiteSpace: "pre-line" }}>{job.desc}</div>
          </div>
        )}

        {job.applyLink ? (
          <a href={job.applyLink} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: 14, borderRadius: 10, marginTop: "1rem", background: job.cat === "govt" ? `linear-gradient(135deg,${T.a6},${T.a3})` : `linear-gradient(135deg,${T.a3},${T.a4})`, color: "#fff", fontSize: 15, fontWeight: 700, textDecoration: "none", fontFamily: "'Clash Display',sans-serif", boxSizing: "border-box" }}>
            <Icon path={I.check} size={16} color="#fff" />
            {job.cat === "govt" ? "Apply on Official Site →" : "Apply Now →"}
          </a>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: 14, borderRadius: 10, marginTop: "1rem", background: T.bg3, border: `1px solid ${T.border}`, color: T.text3, fontSize: 14, fontFamily: "'Satoshi',sans-serif" }}>
            Apply link not added yet
          </div>
        )}
      </div>
    </Dialog>
  );
}