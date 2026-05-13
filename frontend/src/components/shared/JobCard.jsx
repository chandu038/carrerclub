import { useState } from "react";
import Icon from "./Icon";
import { I, cleanSalary, formatShortDate } from "../../constants";

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
  const _isNew   = isNew(job.posted);
  const isGovt   = job.cat === "govt";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: T.bg2,
        border: `1px solid ${hovered ? (isGovt ? T.a6 : T.a3) : T.border2}`,
        borderRadius: 12,
        padding: "12px",
        cursor: "pointer",
        transition: "all 0.2s",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? `0 8px 24px ${isGovt ? "rgba(52,211,153,0.15)" : "rgba(14,165,233,0.15)"}` : "none",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
      }}
    >
      {_isNew && (
        <div style={{ position: "absolute", top: -8, left: 16, background: "linear-gradient(135deg,#ff5279,#ff8c42)", color: "#fff", fontSize: 10, fontWeight: 800, padding: "2px 10px", borderRadius: 20, letterSpacing: 1, zIndex: 2, boxShadow: "0 2px 8px rgba(255,82,121,0.4)" }}>
          ✦ NEW
        </div>
      )}

      <button
        onClick={(e) => { e.stopPropagation(); onSave(job.id); }}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 32,
          height: 32,
          borderRadius: 8,
          background: job.saved ? T.a3 : "transparent",
          border: `1px solid ${job.saved ? T.a3 : T.border2}`,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s",
          flexShrink: 0,
        }}
      >
        <Icon path={I.bookmark} size={14} color={job.saved ? T.bg : T.text2} fill={job.saved} />
      </button>

      <div onClick={() => onClick(job)}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: T.bg3,
              border: `1px solid ${T.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            {job.logo ? (
              <img
                src={job.logo}
                alt={job.company}
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4 }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <span style={{ display: job.logo ? "none" : "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
              {job.emoji}
            </span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.a3,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 3,
              }}
            >
              {job.type}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: T.text,
                lineHeight: 1.3,
              }}
            >
              {job.title}
            </div>
            <div
              style={{
                fontSize: 12,
                color: T.text2,
                marginTop: 2,
              }}
            >
              {job.company}
            </div>
          </div>
        </div>

        {isGovt ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
              <Icon path={I.map} size={12} color={T.text3} />
              <span style={{ fontSize: 12, color: T.text2 }}>{job.location}</span>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
              {job.vacancies && (
                <span
                  style={{
                    background: "rgba(52,211,153,0.12)",
                    border: "1px solid rgba(52,211,153,0.3)",
                    color: "#34d399",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 6,
                  }}
                >
                  🏛️ {job.vacancies} Posts
                </span>
              )}
              {job.startDate && (
                <span
                  style={{
                    background: "rgba(56,189,248,0.12)",
                    border: "1px solid rgba(56,189,248,0.3)",
                    color: "#38bdf8",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: 6,
                  }}
                >
                  🟢 {formatShortDate(job.startDate)}
                </span>
              )}
              {job.lastDate && (
                <span
                  style={{
                    background: isExpired(job.lastDate) ? "rgba(255,82,121,0.12)" : "rgba(251,146,60,0.12)",
                    border: `1px solid ${isExpired(job.lastDate) ? "rgba(255,82,121,0.3)" : "rgba(251,146,60,0.3)"}`,
                    color: isExpired(job.lastDate) ? "#ff5279" : "#fb923c",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: 6,
                  }}
                >
                  {isExpired(job.lastDate) ? "⛔ Expired" : `⏰ ${formatShortDate(job.lastDate)}`}
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
              <span
                style={{
                  fontSize: 11,
                  background: T.ms2,
                  color: T.a5,
                  padding: "3px 8px",
                  borderRadius: 5,
                  border: `1px solid rgba(16,185,129,0.2)`,
                }}
              >
                📍 {job.location}
              </span>
              <span
                style={{
                  fontSize: 11,
                  background: T.ms1,
                  color: T.a3,
                  padding: "3px 8px",
                  borderRadius: 5,
                  border: `1px solid rgba(14,165,233,0.2)`,
                }}
              >
                💰 {cleanSalary(job.salary)}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: T.text3,
                  padding: "3px 8px",
                }}
              >
                {job.exp}
              </span>
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
              {job.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    background: T.bg3,
                    color: T.text2,
                    padding: "2px 6px",
                    borderRadius: 4,
                    border: `1px solid ${T.border}`,
                  }}
                >
                  {tag}
                </span>
              ))}
              {job.tags?.length > 2 && (
                <span
                  style={{
                    fontSize: 10,
                    color: T.text3,
                    padding: "2px 6px",
                  }}
                >
                  +{job.tags.length - 2}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}