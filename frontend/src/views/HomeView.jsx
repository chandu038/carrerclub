import { useNavigate } from "react-router-dom";
import Icon from "../components/shared/Icon";
import JobCard from "../components/shared/JobCard";
import { I, CATS } from "../constants";
import { useWindowWidth } from "../hooks/useWindowWidth";

export default function HomeView({ jobs, T, isMobile, setSelJob, onSave }) {
  const navigate   = useNavigate();
  const w          = useWindowWidth();

  // Check if a posted date string is from today — works for both ISO and legacy "Today"
  const isToday = (posted) => {
    if (!posted) return false;
    if (posted === "Today") return true;
    const d = new Date(posted);
    if (isNaN(d.getTime())) return false;
    const now = new Date();
    return d.getFullYear() === now.getFullYear() &&
           d.getMonth()    === now.getMonth()    &&
           d.getDate()     === now.getDate();
  };

  const featured   = jobs.filter((j) => isToday(j.posted)).slice(0, 6);
  // fallback: if no jobs posted today, show the 6 most recent jobs
  const display    = featured.length > 0 ? featured : jobs.slice(0, 6);
  const govtJobs   = jobs.filter((j) => j.cat === "govt").slice(0, 3);
  const savedCount = jobs.filter((j) => j.saved).length;

  return (
    <div style={{ flex: 1, minWidth: 0 }}>

      {/* ── HERO ── */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        padding: isMobile ? "3rem 1.5rem 2.5rem" : "0",
        minHeight: isMobile ? "auto" : 520,
        display: "flex",
        alignItems: "stretch",
      }}>
        {/* full-width BG gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${T.ms1} 0%, ${T.bg} 55%, ${T.ms3}22 100%)`,
          borderBottom: `1px solid ${T.border}`,
        }} />
        {/* blob top right */}
        <div style={{ position: "absolute", width: 700, height: 600, borderRadius: "50%", background: `radial-gradient(ellipse,${T.ms3} 0%,transparent 65%)`, top: -200, right: -200, pointerEvents: "none" }} />
        {/* blob bottom left */}
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(ellipse,${T.ms2} 0%,transparent 70%)`, bottom: -120, left: -80, pointerEvents: "none" }} />

        {/* inner content row */}
        <div style={{
          position: "relative", zIndex: 2,
          width: "100%", maxWidth: 1280, margin: "0 auto",
          padding: isMobile ? "0" : "4rem 3rem",
          display: "flex", alignItems: "center",
          gap: isMobile ? 0 : "4rem",
          flexDirection: isMobile ? "column" : "row",
        }}>

          {/* ── LEFT: text ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* eyebrow */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, textTransform: "uppercase", letterSpacing: 2.5, color: T.accent, fontWeight: 700, marginBottom: "1rem", background: `${T.accent}12`, border: `1px solid ${T.accent}33`, padding: "5px 12px", borderRadius: 20 }}>
              <Icon path={I.bell} size={12} color={T.accent} />
              Updated daily
            </div>

            <h1 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: isMobile ? "2.8rem" : "4.2rem", fontWeight: 700, lineHeight: 1.0, letterSpacing: -2.5, color: T.text, marginBottom: "1.25rem" }}>
              Find your<br />
              next{" "}
              <span style={{
                color: T.a3,
                textShadow: `0 0 60px ${T.a3}55`,
              }}>opportunity.</span>
            </h1>

            <p style={{ color: T.text2, fontSize: isMobile ? 14 : 15, lineHeight: 1.75, marginBottom: "2rem", maxWidth: 460 }}>
              {jobs.length}+ fresh listings across tech, design, marketing, finance, government & more — updated every day.
            </p>

            {/* stat pills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "2rem" }}>
              {[
                { l: `${jobs.filter(j => isToday(j.posted)).length} today`,      bg: T.ftBg, fg: T.ftFg },
                { l: `${jobs.filter(j => j.cat === "govt").length} govt`,           bg: T.gbBg, fg: T.gbFg },
                { l: `${jobs.filter(j => j.location === "Remote").length} remote`,  bg: T.inBg, fg: T.inFg },
                { l: `${savedCount} saved`,                                          bg: T.ms3,  fg: T.a4  },
              ].map((p) => (
                <span key={p.l} style={{ background: p.bg, color: p.fg, fontWeight: 700, fontSize: 12, padding: "6px 14px", borderRadius: 20, border: `1px solid ${T.border2}` }}>
                  {p.l}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => navigate("/browse")} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 28px", borderRadius: 12,
                background: `linear-gradient(135deg,${T.a3},${T.a4})`,
                color: "#fff", fontSize: 14, fontWeight: 700, border: "none",
                cursor: "pointer", fontFamily: "'Clash Display',sans-serif",
                boxShadow: `0 8px 28px ${T.a3}44`,
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 36px ${T.a3}66`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 8px 28px ${T.a3}44`; }}>
                <Icon path={I.search} size={15} color="#fff" />
                Browse All Jobs
              </button>
              <button onClick={() => navigate("/browse/govt")} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 24px", borderRadius: 12,
                background: T.gbBg, color: T.a6,
                fontSize: 14, fontWeight: 700,
                border: `1px solid ${T.a6}44`, cursor: "pointer",
                fontFamily: "'Clash Display',sans-serif",
                transition: "transform 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}>
                <Icon path={I.govt} size={15} color={T.a6} />
                Govt Jobs
              </button>
            </div>
          </div>

          {/* ── RIGHT: illustration (desktop only) ── */}
          {w > 860 && (
            <div style={{ width: 440, flexShrink: 0, position: "relative" }}>
              {/* main card */}
              <div style={{
                width: "100%", height: 400,
                borderRadius: 28,
                background: `linear-gradient(135deg,${T.bg2},${T.bg3})`,
                border: `1px solid ${T.border2}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
                boxShadow: `0 24px 80px rgba(0,0,0,0.25)`,
              }}>
                {/* inner glow */}
                <div style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", background: `radial-gradient(ellipse,${T.ms2} 0%,transparent 70%)`, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

                <svg viewBox="0 0 400 300" width="380" height="280" xmlns="http://www.w3.org/2000/svg">
                  {/* Monitor frame */}
                  <rect x="118" y="52" width="204" height="148" rx="10" fill="none" stroke={T.a3} strokeWidth="1.8" opacity="0.55"/>
                  <rect x="118" y="52" width="204" height="24" rx="10" fill={T.a3} opacity="0.2"/>
                  <circle cx="131" cy="64" r="4" fill={T.a2} opacity="0.85"/>
                  <circle cx="145" cy="64" r="4" fill={T.a5} opacity="0.85"/>
                  <circle cx="159" cy="64" r="4" fill={T.a6} opacity="0.85"/>
                  {/* Screen content */}
                  <rect x="133" y="87" width="80" height="8" rx="4" fill={T.a3} opacity="0.45"/>
                  <rect x="133" y="102" width="120" height="5" rx="2.5" fill={T.text2} opacity="0.15"/>
                  <rect x="133" y="113" width="100" height="5" rx="2.5" fill={T.text2} opacity="0.12"/>
                  <rect x="133" y="124" width="110" height="5" rx="2.5" fill={T.text2} opacity="0.12"/>
                  {/* Chart */}
                  <rect x="244" y="112" width="14" height="36" rx="3.5" fill={T.a3} opacity="0.5"/>
                  <rect x="262" y="100" width="14" height="48" rx="3.5" fill={T.accent} opacity="0.5"/>
                  <rect x="280" y="90" width="14" height="58" rx="3.5" fill={T.a6} opacity="0.5"/>
                  {/* Stand */}
                  <rect x="208" y="200" width="7" height="28" rx="3" fill={T.border2} opacity="0.7"/>
                  <rect x="186" y="226" width="52" height="7" rx="3.5" fill={T.border2} opacity="0.7"/>

                  {/* Person left */}
                  <circle cx="86" cy="126" r="19" fill={T.a4} opacity="0.65"/>
                  <rect x="72" y="146" width="28" height="54" rx="10" fill={T.a4} opacity="0.45"/>
                  <line x1="86" y1="160" x2="118" y2="128" stroke={T.a4} strokeWidth="8" strokeLinecap="round" opacity="0.45"/>

                  {/* Person centre — laptop */}
                  <circle cx="200" cy="194" r="16" fill={T.a5} opacity="0.65"/>
                  <rect x="188" y="211" width="24" height="34" rx="8" fill={T.a5} opacity="0.45"/>
                  <rect x="172" y="240" width="56" height="7" rx="3" fill={T.border2} opacity="0.6"/>
                  <rect x="177" y="224" width="46" height="20" rx="4" fill={T.bg3} stroke={T.border2} strokeWidth="1.5" opacity="0.9"/>
                  <rect x="181" y="228" width="38" height="13" rx="2" fill={T.a3} opacity="0.18"/>

                  {/* Person right */}
                  <circle cx="324" cy="120" r="19" fill={T.a2} opacity="0.65"/>
                  <rect x="310" y="140" width="28" height="56" rx="10" fill={T.a2} opacity="0.45"/>
                  <line x1="310" y1="156" x2="320" y2="142" stroke={T.a2} strokeWidth="8" strokeLinecap="round" opacity="0.45"/>

                  {/* Floating icon — chart */}
                  <rect x="50" y="54" width="40" height="40" rx="12" fill={T.ms2} stroke={T.a3} strokeWidth="1.5" opacity="0.95"/>
                  <rect x="62" y="78" width="5" height="10" rx="2.5" fill={T.a3}/>
                  <rect x="71" y="72" width="5" height="16" rx="2.5" fill={T.a3}/>
                  <rect x="80" y="65" width="5" height="23" rx="2.5" fill={T.a3}/>

                  {/* Floating icon — briefcase */}
                  <rect x="322" y="50" width="40" height="40" rx="12" fill={T.ms1} stroke={T.a4} strokeWidth="1.5" opacity="0.95"/>
                  <rect x="333" y="65" width="18" height="14" rx="3" fill="none" stroke={T.a4} strokeWidth="1.5"/>
                  <rect x="336" y="61" width="12" height="5" rx="2.5" fill="none" stroke={T.a4} strokeWidth="1.5"/>

                  {/* Floating icon — bell */}
                  <rect x="50" y="190" width="36" height="36" rx="11" fill={T.ms4} stroke={T.a6} strokeWidth="1.5" opacity="0.9"/>
                  <path d="M68 197 C64 197 61 200 61 204 L61 213 L75 213 L75 204 C75 200 72 197 68 197Z" fill="none" stroke={T.a6} strokeWidth="1.5"/>
                  <circle cx="68" cy="216" r="2.2" fill={T.a6}/>

                  {/* Stars */}
                  <text x="44"  y="162" fontSize="18" fill={T.a5} opacity="0.4">✦</text>
                  <text x="360" y="185" fontSize="12" fill={T.a3} opacity="0.4">✦</text>
                  <text x="166" y="46"  fontSize="14" fill={T.a4} opacity="0.4">✦</text>
                  <text x="346" y="168" fontSize="10" fill={T.accent} opacity="0.5">✦</text>
                  <text x="98"  y="250" fontSize="10" fill={T.a3} opacity="0.35">✦</text>
                </svg>
              </div>

              {/* Floating card — bottom left */}
              <div style={{
                position: "absolute", bottom: -20, left: -22,
                background: T.bg2, border: `1px solid ${T.border2}`,
                borderRadius: 16, padding: "12px 16px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                display: "flex", alignItems: "center", gap: 10,
                backdropFilter: "blur(12px)",
                minWidth: 180,
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: T.gbBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🎯</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{jobs.length}+ listings</div>
                  <div style={{ fontSize: 11, color: T.a6, display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.a6, animation: "blink 2s infinite" }} />
                    Updated today
                  </div>
                </div>
              </div>

              {/* Badge — top right */}
              <div style={{
                position: "absolute", top: -16, right: -16,
                background: `linear-gradient(135deg,${T.a3},${T.a4})`,
                borderRadius: 22, padding: "8px 18px",
                fontSize: 12, fontWeight: 700, color: "#fff",
                boxShadow: `0 6px 20px ${T.a3}55`,
              }}>
                🔥 Hot Jobs
              </div>

              {/* Badge — bottom right */}
              <div style={{
                position: "absolute", bottom: 56, right: -22,
                background: T.bg2, border: `1px solid ${T.border2}`,
                borderRadius: 14, padding: "9px 14px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
              }}>
                <div style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>
                  <span style={{ color: T.accent, fontWeight: 700 }}>{jobs.filter(j => isToday(j.posted)).length}+</span> jobs posted
                </div>
                <div style={{ fontSize: 11, color: T.text2, marginTop: 2 }}>today</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: isMobile ? "1.5rem 1rem" : "2.5rem 3rem", maxWidth: 1280, margin: "0 auto", width: "100%" }}>

        {/* ── MARQUEE ── */}
        {(() => {
          const recent = jobs.filter((j) => isToday(j.posted)).slice(0, 10);
          if (!recent.length) return null;
          const items = [...recent, ...recent];
          return (
            <div style={{ marginBottom: "2.5rem", overflow: "hidden", background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 14, padding: "1rem" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: T.text3, fontWeight: 600, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 6 }}>
                <Icon path={I.bell} size={12} color={T.text3} /> Recently published
              </div>
              <div style={{ overflow: "hidden" }}>
                <div style={{ display: "flex", gap: "1rem", animation: "marquee 28s linear infinite", whiteSpace: "nowrap" }}>
                  {items.map((j, i) => (
                    <div key={i} onClick={() => setSelJob(j)}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0, background: T.bg3, border: `1px solid ${T.border2}`, borderRadius: 10, padding: "7px 12px", cursor: "pointer", transition: "border-color 0.15s" }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = T.a3}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = T.border2}>
                      <div style={{ width: 26, height: 26, borderRadius: 6, background: T.bg2, border: `1px solid ${T.border2}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, overflow: "hidden", flexShrink: 0 }}>
                        {j.logo ? <img src={j.logo} alt={j.company} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 2 }} onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} /> : null}
                        <span style={{ display: j.logo ? "none" : "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>{j.emoji}</span>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 12, fontWeight: 600, color: T.text, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis" }}>{j.title}</div>
                        <div style={{ fontSize: 11, color: T.text2 }}>{j.company}</div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: T.a3, flexShrink: 0 }}>{j.salary}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── FEATURED TODAY ── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700, color: T.text, display: "flex", alignItems: "center", gap: 8 }}>
              <Icon path={I.bell} size={18} color={T.a5} /> Featured today
            </div>
            <button onClick={() => navigate("/browse")} style={{ fontSize: 13, color: T.a3, background: "none", border: "none", cursor: "pointer", fontFamily: "'Satoshi',sans-serif" }}>
              See all →
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : w < 1000 ? "1fr 1fr" : "repeat(3,1fr)", gap: "1rem" }}>
            {display.map((j) => (
              <JobCard key={j.id} job={j} onClick={setSelJob} onSave={onSave} T={T} isMobile={isMobile} />
            ))}
          </div>
        </div>

        {/* ── GOVT SPOTLIGHT ── */}
        <div style={{ background: `linear-gradient(135deg,${T.ms4},${T.ms1})`, borderRadius: 16, padding: "1.5rem", marginBottom: "2.5rem", border: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700, color: T.text, display: "flex", alignItems: "center", gap: 8 }}>
              <Icon path={I.govt} size={18} color={T.a6} /> Govt jobs spotlight
            </div>
            <button onClick={() => navigate("/browse/govt")} style={{ fontSize: 13, color: T.a6, background: "none", border: "none", cursor: "pointer", fontFamily: "'Satoshi',sans-serif" }}>
              See all →
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {govtJobs.map((j) => (
              <div key={j.id} onClick={() => setSelJob(j)}
                style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, transition: "border-color 0.15s" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = T.a6}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = T.border}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{j.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 14, fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{j.title}</div>
                  <div style={{ fontSize: 12, color: T.text2, marginTop: 3 }}>{j.company} · {j.location}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.a6 }}>{j.salary}</div>
                  <div style={{ fontSize: 11, color: T.text3, marginTop: 2 }}>{j.posted}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BROWSE BY CATEGORY ── */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700, color: T.text, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <Icon path={I.grid} size={18} color={T.a3} /> Browse by category
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : w < 900 ? "repeat(3,1fr)" : "repeat(4,1fr)", gap: 12 }}>
            {CATS.slice(1).map((c) => {
              const col = c.color ? T[c.color] : T.a3;
              const cnt = jobs.filter((j) => j.cat === c.id).length;
              return (
                <button key={c.id}
                  onClick={() => navigate(`/browse/${c.id}`)}
                  style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 14, padding: "1.25rem", cursor: "pointer", textAlign: "left", transition: "all 0.18s", display: "flex", flexDirection: "column", gap: 10 }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = col; e.currentTarget.style.background = T.bg3; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.cardBg; e.currentTarget.style.transform = "none"; }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: `${col}18`, border: `1px solid ${col}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon path={I[c.ic]} size={22} color={col} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontSize: 12, color: col, fontWeight: 600 }}>{cnt} jobs →</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}