import { useEffect, useState } from "react";
import Icon from "../shared/Icon";
import { I, CATS, formatPosted, cleanSalary, formatShortDate } from "../../constants";
import { TYPE_COLORS } from "../../themes";
import { isNew, BADGE_STYLES, BATCH_STYLE } from "../shared/JobCard";

const SITE_URL = "https://carrerclub.in";

function makeSlug(title, company) {
  return [title, company]
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

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

function isExpired(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

function ShareSheet({ job, T, isMobile, onClose }) {
  const [copied, setCopied] = useState(false);

  const slug     = makeSlug(job.title, job.company);
  const shareUrl = `${SITE_URL}/browse?job=${slug}`;
  const cleanLoc = job.location ? job.location.replace(/_/g, " ") : "";
  const shareMsg = [
    `🔔 ${job.title}${job.company ? ` at ${job.company}` : ""}`,
    cleanLoc ? `📍 ${cleanLoc}` : null,
    job.cat !== "govt" && job.salary ? `💰 ${cleanSalary(job.salary)}` : null,
    `\n🔗 ${shareUrl}`,
    `\nvia CarrerClub`,
  ].filter(Boolean).join("\n");

  const encMsg = encodeURIComponent(shareMsg);
  const encUrl = encodeURIComponent(shareUrl);

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const OPTIONS = [
    { label: "WhatsApp",    emoji: "💬", color: "#25d366", bg: "rgba(37,211,102,0.1)",   brd: "rgba(37,211,102,0.3)",   href: `https://wa.me/?text=${encMsg}` },
    { label: "Telegram",    emoji: "✈️", color: "#38bdf8", bg: "rgba(56,189,248,0.1)",   brd: "rgba(56,189,248,0.3)",   href: `https://t.me/share/url?url=${encUrl}&text=${encMsg}` },
    { label: "Twitter / X", emoji: "𝕏",  color: "#e2e8f0", bg: "rgba(226,232,240,0.08)", brd: "rgba(226,232,240,0.2)",  href: `https://twitter.com/intent/tweet?text=${encMsg}` },
    { label: "LinkedIn",    emoji: "💼", color: "#60a5fa", bg: "rgba(10,102,194,0.12)",  brd: "rgba(10,102,194,0.35)",  href: `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}` },
  ];

  if (isMobile) {
    return (
      <>
        <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} />
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 901, background: T.bg2, borderRadius: "20px 20px 0 0", border: `1px solid ${T.border2}`, paddingBottom: "env(safe-area-inset-bottom,16px)", animation: "slideUp 0.25s cubic-bezier(0.34,1.4,0.64,1)" }}>
          <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
          <div style={{ width: 40, height: 4, background: T.border2, borderRadius: 4, margin: "12px auto 0" }} />
          <div style={{ padding: "12px 16px 2px", fontFamily: "'Clash Display',sans-serif", fontSize: 15, fontWeight: 700, color: T.text }}>Share this job</div>
          <div style={{ fontSize: 11, color: T.text3, padding: "2px 16px 12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {shareUrl}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, padding: "0 16px 16px" }}>
            {OPTIONS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" onClick={onClose}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "12px 4px", borderRadius: 14, background: s.bg, border: `1px solid ${s.brd}`, textDecoration: "none" }}>
                <span style={{ fontSize: 24 }}>{s.emoji}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: s.color, textAlign: "center" }}>{s.label}</span>
              </a>
            ))}
          </div>
          <div style={{ margin: "0 16px 20px", borderRadius: 12, background: T.bg3, border: `1px solid ${T.border2}`, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px" }}>
            <span style={{ flex: 1, fontSize: 12, color: T.text2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{shareUrl}</span>
            <button onClick={copyLink}
              style={{ background: copied ? "rgba(52,211,153,0.15)" : T.accent + "22", border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : T.accent + "44"}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, color: copied ? "#34d399" : T.accent, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", whiteSpace: "nowrap" }}>
              {copied ? "✅ Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 240, background: T.bg2, border: `1px solid ${T.border2}`, borderRadius: 14, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.4)", animation: "fadeUp 0.18s ease", zIndex: 800 }}>
      <div style={{ padding: "8px 12px", fontSize: 11, textTransform: "uppercase", letterSpacing: 1.4, color: T.text3, fontWeight: 700, borderBottom: `1px solid ${T.border}`, background: T.bg3 }}>
        Share this job
      </div>
      {OPTIONS.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noreferrer" onClick={onClose}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderBottom: `1px solid ${T.border}`, textDecoration: "none", background: "transparent", transition: "background 0.15s" }}
          onMouseEnter={(e) => e.currentTarget.style.background = T.bg3}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: s.bg, border: `1px solid ${s.brd}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{s.emoji}</div>
          <span style={{ fontSize: 13, fontWeight: 600, color: s.color }}>{s.label}</span>
          <svg style={{ marginLeft: "auto" }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.text3} strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10" /></svg>
        </a>
      ))}
      <button onClick={copyLink}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Satoshi',sans-serif", transition: "background 0.15s" }}
        onMouseEnter={(e) => e.currentTarget.style.background = T.bg3}
        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: copied ? "rgba(52,211,153,0.12)" : "rgba(124,109,255,0.1)", border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(124,109,255,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
          {copied ? "✅" : "🔗"}
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: copied ? "#34d399" : T.text }}>{copied ? "Copied!" : "Copy Job Link"}</span>
      </button>
    </div>
  );
}

export default function JobDialog({ job, onClose, onSave, T, isMobile }) {
  const [shareOpen, setShareOpen] = useState(false);

  const tc             = TYPE_COLORS(T)[job.type] || TYPE_COLORS(T)["Full-time"];
  const cat            = CATS.find((c) => c.id === job.cat);
  const catColor       = cat?.color ? T[cat.color] : T.a3;
  const _isNew         = isNew(job.posted);
  const badges         = Array.isArray(job.badges)  ? job.badges  : [];
  const batches        = Array.isArray(job.batches) ? job.batches : [];
  const isGovt         = job.cat === "govt";
  const displayLocation = job.location ? job.location.replace(/_/g, " ") : "";

  return (
    <Dialog onClose={onClose} T={T} isMobile={isMobile}>
      <div style={{ background: `linear-gradient(135deg,${T.ms1},${T.ms3})`, borderBottom: `1px solid ${T.border}`, padding: isMobile ? "1.25rem 1rem 1rem" : "1.5rem 1.25rem 1.25rem", position: "relative" }}>
        {_isNew && (
          <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#ff5279,#ff8c42)", color: "#fff", fontSize: 11, fontWeight: 800, padding: "3px 14px", borderRadius: 20, letterSpacing: 1, boxShadow: "0 2px 10px rgba(255,82,121,0.45)", whiteSpace: "nowrap", zIndex: 1 }}>
            ✦ JUST POSTED
          </div>
        )}

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginTop: _isNew ? 28 : 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flex: 1, minWidth: 0 }}>
            <div style={{ width: isMobile ? 44 : 54, height: isMobile ? 44 : 54, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border2}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 22 : 26, flexShrink: 0, overflow: "hidden" }}>
              {job.logo && <img src={job.logo} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />}
              <span style={{ display: job.logo ? "none" : "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>{job.emoji}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.4, fontWeight: 700, color: catColor, marginBottom: 3, display: "flex", alignItems: "center", gap: 5 }}>
                <Icon path={I[cat?.ic || "briefcase"]} size={11} color={catColor} />{cat?.label}
              </div>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: isMobile ? 16 : 21, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.25, color: T.text, wordBreak: "break-word" }}>
                {job.title}
              </div>
              <div style={{ fontSize: 12, color: T.text2, marginTop: 4, display: "flex", alignItems: "center", gap: 4, overflow: "hidden" }}>
                <Icon path={I.map} size={11} color={T.text3} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {job.company}{displayLocation ? ` · ${displayLocation}` : ""}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
            <button onClick={() => onSave(job.id)}
              style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${job.saved ? T.accent : T.border2}`, background: job.saved ? T.accent : T.bg3, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon path={I.bookmark} size={15} color={job.saved ? T.accentFg : T.text2} fill={job.saved} />
            </button>
            <div style={{ position: "relative" }}>
              <button onClick={() => setShareOpen((o) => !o)}
                style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${shareOpen ? T.accent : T.border2}`, background: shareOpen ? T.accent + "22" : T.bg3, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={shareOpen ? T.accent : T.text2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </button>
              {shareOpen && (
                <>
                  {!isMobile && <div onClick={() => setShareOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 799 }} />}
                  <ShareSheet job={job} T={T} isMobile={isMobile} onClose={() => setShareOpen(false)} />
                </>
              )}
            </div>
            <button onClick={onClose}
              style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border2}`, background: T.bg3, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon path={I.close} size={15} color={T.text2} />
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "0.85rem" }}>
          {!isGovt && <>
            <span style={{ background: tc.bg, color: tc.fg, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{job.type}</span>
            <span style={{ background: T.ms2, color: T.a3, border: `1px solid ${T.border}`, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{cleanSalary(job.salary)}</span>
            <span style={{ background: T.ms1, color: catColor, border: `1px solid ${T.border}`, fontSize: 11, padding: "4px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 }}>
              <Icon path={I.clock} size={10} color={catColor} />{job.exp}
            </span>
          </>}
          {isGovt && job.vacancies && <span style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.35)", color: "#34d399", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>🏛️ {job.vacancies} Vacancies</span>}
          {isGovt && job.startDate  && <span style={{ background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.3)", color: "#38bdf8", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>🟢 {formatShortDate(job.startDate)}</span>}
          {isGovt && job.lastDate   && <span style={{ background: isExpired(job.lastDate) ? "rgba(255,82,121,0.15)" : "rgba(251,146,60,0.15)", border: `1px solid ${isExpired(job.lastDate) ? "rgba(255,82,121,0.35)" : "rgba(251,146,60,0.35)"}`, color: isExpired(job.lastDate) ? "#ff5279" : "#fb923c", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{isExpired(job.lastDate) ? "⛔ Expired" : `⏰ ${formatShortDate(job.lastDate)}`}</span>}
          {badges.map((id) => { const b = BADGE_STYLES[id]; if (!b) return null; return <span key={id} style={{ background: b.bg, border: `1px solid ${b.border}`, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, color: b.color }}>✓ {b.label}</span>; })}
          {batches.map((yr) => <span key={yr} style={{ background: BATCH_STYLE.bg, border: `1px solid ${BATCH_STYLE.border}`, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, color: BATCH_STYLE.color }}>🎓 {yr}</span>)}
        </div>
      </div>

      <div style={{ padding: isMobile ? "0 1rem 1.5rem" : "0 1.25rem 1.75rem" }}>

        {isGovt && (job.vacancies || job.startDate || job.lastDate || job.notificationLink) && (
          <div style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 10, padding: "0.85rem 1rem", margin: "1rem 0 0" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: "#34d399", fontWeight: 700, marginBottom: 10 }}>🏛️ Government Job Info</div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr", gap: 8 }}>
              {job.vacancies && <div style={{ background: T.bg3, border: "1px solid rgba(52,211,153,0.2)", borderRadius: 8, padding: "9px 11px" }}><div style={{ fontSize: 11, color: T.text2, marginBottom: 3 }}>Vacancies</div><div style={{ fontSize: 15, fontWeight: 800, color: "#34d399" }}>{job.vacancies}</div></div>}
              {job.startDate  && <div style={{ background: T.bg3, border: "1px solid rgba(56,189,248,0.2)", borderRadius: 8, padding: "9px 11px" }}><div style={{ fontSize: 11, color: T.text2, marginBottom: 3 }}>Start Date</div><div style={{ fontSize: 12, fontWeight: 700, color: "#38bdf8" }}>{formatShortDate(job.startDate)}</div></div>}
              {job.lastDate   && <div style={{ background: T.bg3, border: `1px solid ${isExpired(job.lastDate) ? "rgba(255,82,121,0.3)" : "rgba(251,146,60,0.3)"}`, borderRadius: 8, padding: "9px 11px" }}><div style={{ fontSize: 11, color: T.text2, marginBottom: 3 }}>Last Date</div><div style={{ fontSize: 12, fontWeight: 700, color: isExpired(job.lastDate) ? "#ff5279" : "#fb923c" }}>{formatShortDate(job.lastDate)}</div><div style={{ fontSize: 10, color: isExpired(job.lastDate) ? "#ff5279" : T.text3 }}>{isExpired(job.lastDate) ? "⛔ Passed" : "Don't miss!"}</div></div>}
            </div>
            {job.notificationLink && (
              <a href={job.notificationLink} target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, padding: "9px 14px", borderRadius: 8, background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399", textDecoration: "none", fontSize: 13, fontWeight: 700 }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(52,211,153,0.18)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(52,211,153,0.1)"}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                View Official Notification / PDF
                <svg style={{ marginLeft: "auto" }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10" /></svg>
              </a>
            )}
          </div>
        )}

        {!isGovt && job.tags?.length > 0 && (
          <div style={{ background: T.ms1, borderRadius: 10, padding: "0.85rem 1rem", margin: "1rem 0 0" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: T.a3, fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
              <Icon path={I.tag} size={12} color={T.a3} />Skills & tags
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {job.tags.map((t) => <span key={t} style={{ background: T.bg3, border: `1px solid ${T.border2}`, padding: "4px 12px", borderRadius: 20, fontSize: 12, color: T.text }}>{t}</span>)}
            </div>
          </div>
        )}

        <div style={{ background: T.ms2, borderRadius: 10, padding: "0.85rem 1rem", margin: "0.75rem 0 0" }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: T.accent, fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}>
            <Icon path={I.briefcase} size={12} color={T.accent} />Job details
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {(isGovt
              ? [["Location", I.map, displayLocation, false], ["Posted", I.clock, formatPosted(job.posted), false], ["Org", I.govt, job.company, false]]
              : [["Location", I.map, displayLocation, false], ["Salary", I.money, cleanSalary(job.salary), true], ["Type", I.briefcase, job.type, false], ["Experience", I.clock, job.exp, false], ["Company", I.govt, job.company, false], ["Posted", I.clock, formatPosted(job.posted), false]]
            ).map(([label, icon, value, accent]) => !value ? null : (
              <div key={label} style={{ background: T.bg3, border: `1px solid ${T.border2}`, borderRadius: 8, padding: "9px 11px", minWidth: 0 }}>
                <div style={{ fontSize: 11, color: T.text2, marginBottom: 3, display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon path={icon} size={11} color={T.text2} />{label}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: accent ? T.a3 : T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {job.desc && (
          <div style={{ background: T.ms3, borderRadius: 10, padding: "0.85rem 1rem", margin: "0.75rem 0 0" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: T.a4, fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}>
              <Icon path={I.list} size={12} color={T.a4} />About this role
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.78, color: T.text2, whiteSpace: "pre-line", wordBreak: "break-word" }}>{job.desc}</div>
          </div>
        )}

        {job.applyLink ? (
          <a href={job.applyLink} target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: 14, borderRadius: 10, marginTop: "1rem", background: isGovt ? `linear-gradient(135deg,${T.a6},${T.a3})` : `linear-gradient(135deg,${T.a3},${T.a4})`, color: "#fff", fontSize: 15, fontWeight: 700, textDecoration: "none", fontFamily: "'Clash Display',sans-serif", boxSizing: "border-box" }}>
            <Icon path={I.check} size={16} color="#fff" />
            {isGovt ? "Apply on Official Site →" : "Apply Now →"}
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
