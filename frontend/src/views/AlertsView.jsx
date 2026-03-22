import { useState, useEffect } from "react";
import Icon from "../components/shared/Icon";
import { I } from "../constants";

export default function AlertsView({ jobs, T, isMobile }) {
  const savedJobs = jobs.filter((j) => j.saved);

  const [alerts, setAlerts] = useState([
    { id: 1, keyword: "React Developer", location: "Bengaluru", freq: "Daily",   active: true,  auto: false },
    { id: 2, keyword: "SSC CGL",         location: "All India", freq: "Instant", active: true,  auto: false },
    { id: 3, keyword: "MBA Finance",     location: "Mumbai",    freq: "Weekly",  active: false, auto: false },
  ]);
  const [kw,   setKw]   = useState("");
  const [loc,  setLoc]  = useState("");
  const [freq, setFreq] = useState("Daily");

  useEffect(() => {
    setAlerts((prev) => {
      const toAdd = savedJobs
        .filter((j) => !prev.some((a) => a.auto && a.keyword === j.title))
        .map((j) => ({
          id: Date.now() + j.id + Math.random(),
          keyword: j.title, location: j.location,
          freq: "Daily", active: true, auto: true,
        }));
      const filtered = prev.filter((a) => !a.auto || savedJobs.some((j) => j.title === a.keyword));
      return [...filtered, ...toAdd];
    });
  }, [jobs]);

  const addAlert = () => {
    if (!kw.trim()) return;
    setAlerts((a) => [...a, { id: Date.now(), keyword: kw, location: loc || "All India", freq, active: true, auto: false }]);
    setKw(""); setLoc("");
  };

  const IS = {
    background: T.inputBg, border: `1px solid ${T.border2}`,
    borderRadius: 8, padding: "9px 12px", fontSize: 13, color: T.text,
    fontFamily: "'Satoshi',sans-serif", outline: "none", width: "100%",
  };

  return (
    <div style={{ flex: 1, minWidth: 0, padding: isMobile ? "1.25rem 1rem" : "1.5rem 2rem" }}>
      <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color: T.text, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 10 }}>
        <Icon path={I.bell} size={20} color={T.a5} />Job Alerts
      </div>

      {/* Auto alert notice */}
      {savedJobs.length > 0 && (
        <div style={{ background: T.ms2, border: `1px solid ${T.border2}`, borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 12 }}>
          <Icon path={I.bookmark} size={20} color={T.accent} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>
              Auto-alerts created for {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}
            </div>
            <div style={{ fontSize: 12, color: T.text2, marginTop: 2 }}>
              Alerts are removed automatically when you unsave a job.
            </div>
          </div>
        </div>
      )}

      {/* Create alert form */}
      <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 14, padding: "1.25rem", marginBottom: "1.25rem" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: "1rem", display: "flex", alignItems: "center", gap: 6 }}>
          <Icon path={I.plus} size={14} color={T.a3} />Create new alert
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: T.text2, fontWeight: 600, marginBottom: 5 }}>Keyword *</div>
            <input value={kw} onChange={(e) => setKw(e.target.value)} placeholder="e.g. React Developer, SSC CGL" style={IS} />
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: T.text2, fontWeight: 600, marginBottom: 5 }}>Location</div>
            <input value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="e.g. Bengaluru, All India" style={IS} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["Instant", "Daily", "Weekly"].map((f) => (
              <button key={f} onClick={() => setFreq(f)}
                style={{
                  padding: "5px 12px", borderRadius: 20, fontSize: 12,
                  fontWeight: 500, cursor: "pointer", fontFamily: "'Satoshi',sans-serif",
                  border: `1px solid ${freq === f ? T.a3 : T.border}`,
                  background: freq === f ? T.inBg : "transparent",
                  color: freq === f ? T.a3 : T.text2,
                }}>
                {f}
              </button>
            ))}
          </div>
          <button onClick={addAlert}
            style={{ padding: "8px 18px", borderRadius: 8, background: `linear-gradient(135deg,${T.a3},${T.a4})`, color: "#fff", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Clash Display',sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
            <Icon path={I.plus} size={14} color="#fff" />Create Alert
          </button>
        </div>
      </div>

      {/* Alerts list */}
      <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "0.9rem 1.1rem", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Your alerts ({alerts.length})</span>
          <span style={{ fontSize: 11, color: T.text2 }}>{alerts.filter((a) => a.active).length} active</span>
        </div>
        <div style={{ padding: "0.5rem 1.1rem 0.75rem" }}>
          {alerts.map((a) => (
            <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: a.active ? T.a3 : T.text3, animation: a.active ? "blink 2s infinite" : "none" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, display: "flex", alignItems: "center", gap: 6 }}>
                  {a.keyword}
                  {a.auto && (
                    <span style={{ fontSize: 10, background: T.ftBg, color: T.ftFg, padding: "1px 6px", borderRadius: 10, fontWeight: 600 }}>Auto</span>
                  )}
                </div>
                <div style={{ fontSize: 11, color: T.text2 }}>{a.location} · {a.freq}</div>
              </div>
              <button
                onClick={() => setAlerts((al) => al.map((x) => x.id === a.id ? { ...x, active: !x.active } : x))}
                style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, cursor: "pointer", border: `1px solid ${a.active ? T.a3 : T.border2}`, fontFamily: "'Satoshi',sans-serif", background: a.active ? T.inBg : "transparent", color: a.active ? T.a3 : T.text2 }}>
                {a.active ? "On" : "Off"}
              </button>
              <button onClick={() => setAlerts((al) => al.filter((x) => x.id !== a.id))}
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                <Icon path={I.close} size={16} color={T.text3} />
              </button>
            </div>
          ))}
          {alerts.length === 0 && (
            <div style={{ fontSize: 13, color: T.text2, padding: "1rem 0" }}>No alerts yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}