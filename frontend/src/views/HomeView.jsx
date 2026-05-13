import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/shared/Icon";
import JobCard from "../components/shared/JobCard";
import { isNew } from "../components/shared/JobCard";
import { I, CATS } from "../constants";
import { useWindowWidth } from "../hooks/useWindowWidth";

export default function HomeView({ jobs, T, isMobile, setSelJob, onSave }) {
  const navigate = useNavigate();
  const w = useWindowWidth();
  const scrollRef = useRef(null);

  const isToday = (posted) => {
    if (!posted) return false;
    if (posted === "Today") return true;
    const d = new Date(posted);
    if (isNaN(d.getTime())) return false;
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  const featured = jobs.filter((j) => isToday(j.posted)).slice(0, 6);
  const display = featured.length > 0 ? featured : jobs.slice(0, 6);
  const govtJobs = jobs.filter((j) => j.cat === "govt").slice(0, 3);
  const savedCount = jobs.filter((j) => j.saved).length;
  const recent = jobs.filter((j) => isToday(j.posted)).slice(0, 12);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || recent.length === 0) return;

    let paused = false;

    const tick = () => {
      if (!paused) {
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
    };

    const id = setInterval(tick, 20);

    const pause = () => {
      paused = true;
    };

    const resume = () => {
      paused = false;
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });

    return () => {
      clearInterval(id);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, [recent.length]);

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          padding: isMobile ? "2rem 1rem" : "0",
          minHeight: isMobile ? "auto" : 520,
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${T.ms1} 0%, ${T.bg} 55%, ${T.ms3}22 100%)`,
            borderBottom: `1px solid ${T.border}`,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: isMobile ? "0" : "4rem 2rem",
            display: "flex",
            flexDirection: w < 900 ? "column" : "row",
            alignItems: "center",
            gap: isMobile ? "2rem" : "4rem",
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 0,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: T.accent,
                fontWeight: 700,
                marginBottom: "1rem",
                background: `${T.accent}12`,
                border: `1px solid ${T.accent}33`,
                padding: "5px 12px",
                borderRadius: 20,
              }}
            >
              <Icon path={I.bell} size={12} color={T.accent} />
              Updated daily
            </div>

            <h1
              style={{
                fontFamily: "'Clash Display',sans-serif",
                fontSize: isMobile ? "2.3rem" : "4rem",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: -2,
                color: T.text,
                marginBottom: "1rem",
              }}
            >
              Find your
              <br />
              next{" "}
              <span
                style={{
                  color: T.a3,
                }}
              >
                opportunity.
              </span>
            </h1>

            <p
              style={{
                color: T.text2,
                fontSize: isMobile ? 13 : 15,
                lineHeight: 1.7,
                marginBottom: "1.5rem",
                maxWidth: 500,
              }}
            >
              {jobs.length}+ fresh listings across tech, design,
              marketing, finance, government & more.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: "1.5rem",
              }}
            >
              {[
                {
                  l: `${jobs.filter((j) => isToday(j.posted)).length} today`,
                  bg: T.ftBg,
                  fg: T.ftFg,
                },
                {
                  l: `${jobs.filter((j) => j.cat === "govt").length} govt`,
                  bg: T.gbBg,
                  fg: T.gbFg,
                },
                {
                  l: `${jobs.filter((j) => j.location === "Remote").length} remote`,
                  bg: T.inBg,
                  fg: T.inFg,
                },
                {
                  l: `${savedCount} saved`,
                  bg: T.ms3,
                  fg: T.a4,
                },
              ].map((p) => (
                <span
                  key={p.l}
                  style={{
                    background: p.bg,
                    color: p.fg,
                    fontWeight: 700,
                    fontSize: 11,
                    padding: "6px 12px",
                    borderRadius: 20,
                    border: `1px solid ${T.border2}`,
                  }}
                >
                  {p.l}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <button
                onClick={() => navigate("/browse")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "12px 20px",
                  borderRadius: 12,
                  background: `linear-gradient(135deg,${T.a3},${T.a4})`,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  flex: isMobile ? 1 : "unset",
                  minWidth: isMobile ? 0 : 180,
                }}
              >
                <Icon path={I.search} size={15} color="#fff" />
                Browse Jobs
              </button>

              <button
                onClick={() => navigate("/browse/govt")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "12px 20px",
                  borderRadius: 12,
                  background: T.gbBg,
                  color: T.a6,
                  fontSize: 14,
                  fontWeight: 700,
                  border: `1px solid ${T.a6}44`,
                  cursor: "pointer",
                  flex: isMobile ? 1 : "unset",
                  minWidth: isMobile ? 0 : 180,
                }}
              >
                <Icon path={I.govt} size={15} color={T.a6} />
                Govt Jobs
              </button>
            </div>
          </div>

          {w > 900 && (
            <div
              style={{
                width: "100%",
                maxWidth: 420,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 360,
                  borderRadius: 28,
                  background: `linear-gradient(135deg,${T.bg2},${T.bg3})`,
                  border: `1px solid ${T.border2}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    padding: 30,
                  }}
                >
                  <div
                    style={{
                      fontSize: 64,
                      marginBottom: 20,
                    }}
                  >
                    💼
                  </div>

                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: T.text,
                      marginBottom: 10,
                    }}
                  >
                    {jobs.length}+ Jobs
                  </div>

                  <div
                    style={{
                      fontSize: 14,
                      color: T.text2,
                    }}
                  >
                    Updated Daily
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          padding: isMobile ? "1rem" : "2rem",
          maxWidth: 1280,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {recent.length > 0 && (
          <div
            style={{
              marginBottom: "2rem",
              background: T.bg2,
              border: `1px solid ${T.border}`,
              borderRadius: 14,
              padding: "1rem",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: T.text3,
                fontWeight: 600,
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon path={I.bell} size={12} color={T.text3} />
              Recently published
            </div>

            <div
              ref={scrollRef}
              style={{
                display: "flex",
                gap: "0.75rem",
                overflowX: "auto",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
                paddingBottom: 4,
              }}
            >
              {[...recent, ...recent].map((j, i) => {
                const _isNew = isNew(j.posted);

                return (
                  <div
                    key={i}
                    onClick={() => setSelJob(j)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexShrink: 0,
                      background: T.bg3,
                      border: `1px solid ${
                        _isNew ? "#ff527966" : T.border2
                      }`,
                      borderRadius: 10,
                      padding: "8px 12px",
                      cursor: "pointer",
                      minWidth: isMobile ? 180 : 220,
                      maxWidth: 240,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: T.bg2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        overflow: "hidden",
                      }}
                    >
                      {j.logo ? (
                        <img
                          src={j.logo}
                          alt={j.company}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <span>{j.emoji}</span>
                      )}
                    </div>

                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: T.text,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {j.title}
                      </div>

                      <div
                        style={{
                          fontSize: 11,
                          color: T.text2,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {j.company}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontFamily: "'Clash Display',sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: T.text,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Icon path={I.bell} size={18} color={T.a5} />
              Featured today
            </div>

            <button
              onClick={() => navigate("/browse")}
              style={{
                fontSize: 13,
                color: T.a3,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              See all →
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                w < 640
                  ? "1fr"
                  : w < 1000
                  ? "1fr 1fr"
                  : "repeat(3,1fr)",
              gap: "1rem",
            }}
          >
            {display.map((j) => (
              <JobCard
                key={j.id}
                job={j}
                onClick={setSelJob}
                onSave={onSave}
                T={T}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              fontFamily: "'Clash Display',sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: T.text,
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon path={I.grid} size={18} color={T.a3} />
            Browse by category
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                w < 500
                  ? "1fr 1fr"
                  : w < 900
                  ? "repeat(3,1fr)"
                  : "repeat(4,1fr)",
              gap: 12,
            }}
          >
            {CATS.slice(1).map((c) => {
              const col = c.color ? T[c.color] : T.a3;
              const cnt = jobs.filter((j) => j.cat === c.id).length;

              return (
                <button
                  key={c.id}
                  onClick={() => navigate(`/browse/${c.id}`)}
                  style={{
                    background: T.cardBg,
                    border: `1px solid ${T.border}`,
                    borderRadius: 14,
                    padding: "1rem",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 11,
                      background: `${col}18`,
                      border: `1px solid ${col}33`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon path={I[c.ic]} size={22} color={col} />
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: T.text,
                        marginBottom: 4,
                      }}
                    >
                      {c.label}
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        color: col,
                        fontWeight: 600,
                      }}
                    >
                      {cnt} jobs →
                    </div>
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