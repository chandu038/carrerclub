import { useState }               from "react";
import Icon                       from "./Icon";
import { I, CATS, formatPosted, cleanSalary }  from "../../constants";
import { TYPE_COLORS }            from "../../themes";

export default function JobCard({ job, onClick, onSave, T }) {
  const [hovered, setHovered] = useState(false);
  const tc       = TYPE_COLORS(T)[job.type] || TYPE_COLORS(T)["Full-time"];
  const cat      = CATS.find((c) => c.id === job.cat);
  const catColor = cat?.color ? T[cat.color] : T.a3;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? T.bg4 : T.cardBg,
        border: `1px solid ${hovered ? T.border2 : T.border}`,
        borderRadius: 12,
        padding: "1rem 1.1rem",
        cursor: "pointer",
        transition: "all 0.18s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        display: "flex",
        flexDirection: "column",
        gap: 9,
        position: "relative",
      }}
    >
      {/* Bookmark */}
      <button
        onClick={(e) => { e.stopPropagation(); onSave(job.id); }}
        style={{
          position: "absolute", top: 12, right: 12,
          width: 28, height: 28, borderRadius: 6,
          background: job.saved ? T.accent : "transparent",
          border: `1px solid ${job.saved ? T.accent : T.border2}`,
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s",
        }}
      >
        <Icon path={I.bookmark} size={14} color={job.saved ? T.accentFg : T.text3} fill={job.saved} />
      </button>

      <div onClick={() => onClick(job)}>
        {/* Logo + title */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, paddingRight: 34 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 9,
            background: T.bg3, border: `1px solid ${T.border2}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, flexShrink: 0, overflow: "hidden",
          }}>
            {job.logo && (
              <img src={job.logo} alt={job.company}
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4 }}
                onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
              />
            )}
            <span style={{ display: job.logo ? "none" : "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
              {job.emoji}
            </span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 14, fontWeight: 600, color: T.text, lineHeight: 1.3, marginBottom: 2 }}>
              {job.title}
            </div>
            <div style={{ fontSize: 12, color: T.text2 }}>{job.company}</div>
          </div>
        </div>

        {/* Salary + posted */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.a3 }}>
            {cleanSalary(job.salary)}
          </div>
          {/* ✅ converts "3 Dec 2025" → "Today" / "2 days ago" etc. */}
          <div style={{ fontSize: 11, color: T.text3 }}>{formatPosted(job.posted)}</div>
        </div>

        {/* Location + exp */}
        <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center" }}>
          <Icon path={I.map} size={12} color={T.text3} />
          <span style={{ fontSize: 12, color: T.text2 }}>{job.location}</span>
          <span style={{ color: T.text3 }}>·</span>
          <span style={{ fontSize: 12, color: T.text2 }}>{job.exp}</span>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 }}>
          {job.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{
              background: T.bg3, border: `1px solid ${T.border2}`,
              padding: "2px 8px", borderRadius: 20, fontSize: 11, color: T.text2,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Icon path={I[cat?.ic || "briefcase"]} size={11} color={catColor} />
            <span style={{ fontSize: 11, color: catColor, fontWeight: 600 }}>{cat?.label}</span>
          </div>
          <span style={{ background: tc.bg, color: tc.fg, fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 20 }}>
            {job.type}
          </span>
        </div>
      </div>
    </div>
  );
}