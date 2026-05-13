import { useState } from "react";
import Icon from "./Icon";
import { I, CATS, formatPosted, cleanSalary, formatShortDate } from "../../constants";
import { TYPE_COLORS } from "../../themes";

export function isNew(posted) {
  if (!posted) return false;
  const d = new Date(posted);
  if (isNaN(d.getTime())) return false;
  return (Date.now() - d.getTime()) < 60 * 60 * 1000;
}

export const BADGE_STYLES = {
  fresher:  { label: "Fresher OK",          color: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.35)"  },
  anygrad:  { label: "Any Graduate",         color: "#38bdf8", bg: "rgba(56,189,248,0.12)",  border: "rgba(56,189,248,0.35)"  },
  remote:   { label: "Remote OK",            color: "#a78bfa", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.35)" },
  noexp:    { label: "No Experience Needed", color: "#fb923c", bg: "rgba(251,146,60,0.12)",  border: "rgba(251,146,60,0.35)"  },
  parttime: { label: "Part-time OK",         color: "#f472b6", bg: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.35)" },
  walkin:   { label: "Walk-in",              color: "#facc15", bg: "rgba(250,204,21,0.12)",  border: "rgba(250,204,21,0.35)"  },
};

export const BATCH_STYLE = { color: "#c084fc", bg: "rgba(192,132,252,0.12)", border: "rgba(192,132,252,0.35)" };

function isExpired(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

export default function JobCard({ job, onClick, onSave, T }) {
  const [hovered, setHovered] = useState(false);
  const tc       = TYPE_COLORS(T)[job.type] || TYPE_COLORS(T)["Full-time"];
  const cat      = CATS.find((c) => c.id === job.cat);
  const catColor = cat?.color ? T[cat.color] : T.a3;
  const _isNew   = isNew(job.posted);
  const badges   = Array.isArray(job.badges)  ? job.badges  : [];
  const batches  = Array.isArray(job.batches) ? job.batches : [];
  const isGovt   = job.cat === "govt";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? T.bg4 : T.cardBg,
        border: `1px solid ${hovered ? (isGovt ? T.a6 : T.border2) : T.border}`,
        borderRadius: 12,
        padding: "1rem",
        cursor: "pointer",
        transition: "all 0.18s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        display: "flex",
        flexDirection: "column",
        gap: 9,
        position: "relative",
        boxSizing: "border-box",
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      {_isNew && (
        <div style={{ position: "absolute", top: -9, left: 12, background: "linear-gradient(135deg,#ff5279,#ff8c42)", color: "#fff", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 20, letterSpacing: 1, zIndex: 2, boxShadow: "0 2px 8px rgba(255,82,121,0.4)" }}>
          ✦ NEW
        </div>
      )}

      <button
        onClick={(e) => { e.stopPropagation(); onSave(job.id); }}
        style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, borderRadius: 6, background: job.saved ? T.accent : "transparent", border: `1px solid ${job.saved ? T.accent : T.border2}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", flexShrink: 0 }}
      >
        <Icon path={I.bookmark} size={14} color={job.saved ? T.accentFg : T.text3} fill={job.saved} />
      </button>

      <div onClick={() => onClick(job)} style={{ minWidth: 0, width: "100%" }}>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, paddingRight: 36 }}>
          <div style={{ width: 42, height: 42, borderRadius: 9, background: isGovt ? "rgba(52,211,153,0.08)" : T.bg3, border: `1px solid ${isGovt ? "rgba(52,211,153,0.25)" : T.border2}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, overflow: "hidden" }}>
            {job.logo && (
              <img
                src={job.logo}
                alt={job.company}
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4 }}
                onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
              />
            )}
            <span style={{ display: job.logo ? "none" : "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>{job.emoji}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 14, fontWeight: 600, color: T.text, lineHeight: 1.3, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{job.title}</div>
            <div style={{ fontSize: 12, color: T.text2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{job.company}</div>
          </div>
        </div>

        {isGovt ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
              <Icon path={I.map} size={12} color={T.text3} />
              <span style={{ fontSize: 12, color: T.text2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{job.location}</span>
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 }}>
              {job.vacancies && (
                <span style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20 }}>
                  🏛️ {job.vacancies} Posts
                </span>
              )}
              {job.startDate && (
                <span style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)", color: "#38bdf8", fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20 }}>
                  🟢 Start: {formatShortDate(job.startDate)}
                </span>
              )}
              {job.lastDate && (
                <span style={{
                  background: isExpired(job.lastDate) ? "rgba(255,82,121,0.12)" : "rgba(251,146,60,0.12)",
                  border: `1px solid ${isExpired(job.lastDate) ? "rgba(255,82,121,0.3)" : "rgba(251,146,60,0.3)"}`,
                  color: isExpired(job.lastDate) ? "#ff5279" : "#fb923c",
                  fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20
                }}>
                  {isExpired(job.lastDate) ? "⛔ Expired" : `⏰ End: ${formatShortDate(job.lastDate)}`}
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, minWidth: 0, gap: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.a3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{cleanSalary(job.salary)}</div>
              <div style={{ fontSize: 11, color: T.text3, flexShrink: 0 }}>{formatPosted(job.posted)}</div>
            </div>

            <div style={{ display: "flex", gap: 6, marginTop: 4, alignItems: "center", minWidth: 0, overflow: "hidden" }}>
              <Icon path={I.map} size={12} color={T.text3} />
              <span style={{ fontSize: 12, color: T.text2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{job.location}</span>
              <span style={{ color: T.text3, flexShrink: 0 }}>·</span>
              <span style={{ fontSize: 12, color: T.text2, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "40%" }}>{job.exp}</span>
            </div>

            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 }}>
              {job.tags?.slice(0, 3).map((tag, i) => (
                <span key={`tag-${i}`} style={{ background: T.bg3, border: `1px solid ${T.border2}`, padding: "2px 8px", borderRadius: 20, fontSize: 11, color: T.text2, whiteSpace: "nowrap" }}>{tag}</span>
              ))}
            </div>

            {(badges.length > 0 || batches.length > 0) && (
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 6 }}>
                {badges.map((id, i) => {
                  const b = BADGE_STYLES[id];
                  if (!b) return null;
                  return (
                    <span key={`badge-${i}`} style={{ background: b.bg, border: `1px solid ${b.border}`, padding: "2px 8px", borderRadius: 20, fontSize: 11, color: b.color, fontWeight: 700, whiteSpace: "nowrap" }}>✓ {b.label}</span>
                  );
                })}
                {batches.map((yr, i) => (
                  <span key={`batch-${i}`} style={{ background: BATCH_STYLE.bg, border: `1px solid ${BATCH_STYLE.border}`, padding: "2px 8px", borderRadius: 20, fontSize: 11, color: BATCH_STYLE.color, fontWeight: 700, whiteSpace: "nowrap" }}>🎓 {yr}</span>
                ))}
              </div>
            )}
          </>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}`, minWidth: 0, gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0, overflow: "hidden" }}>
            <Icon path={I[cat?.ic || "briefcase"]} size={11} color={catColor} />
            <span style={{ fontSize: 11, color: catColor, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cat?.label}</span>
          </div>
          {!isGovt && (
            <span style={{ background: tc.bg, color: tc.fg, fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 20, flexShrink: 0, whiteSpace: "nowrap" }}>{job.type}</span>
          )}
          {isGovt && (
            <span style={{ background: "rgba(52,211,153,0.12)", color: "#34d399", fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 20, flexShrink: 0 }}>Govt</span>
          )}
        </div>
      </div>
    </div>
  );
}