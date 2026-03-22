import Icon from "../components/shared/Icon";
import JobCard from "../components/shared/JobCard";
import { I } from "../constants";
import { useWindowWidth } from "../hooks/useWindowWidth";

export default function SavedView({ jobs, T, isMobile, setSelJob, onSave }) {
  const saved = jobs.filter((j) => j.saved);
  const w = useWindowWidth();

  return (
    <div style={{ flex: 1, minWidth: 0, padding: isMobile ? "1.25rem 1rem" : "1.5rem 2rem" }}>
      <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color: T.text, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 10 }}>
        <Icon path={I.bookmark} size={20} color={T.a4} /> Saved Jobs
        <span style={{ fontSize: 16, color: T.text2, fontWeight: 400 }}>({saved.length})</span>
      </div>

      {saved.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : w < 1000 ? "1fr 1fr" : "repeat(3,1fr)", gap: "0.85rem" }}>
          {saved.map((j) => (
            <JobCard key={j.id} job={j} onClick={setSelJob} onSave={onSave} T={T} isMobile={isMobile} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "5rem 1rem" }}>
          <Icon path={I.bookmark} size={52} color={T.text3} />
          <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 8, marginTop: 14 }}>
            No saved jobs yet
          </div>
          <div style={{ fontSize: 14, color: T.text2 }}>
            Click the bookmark icon on any job card to save it here
          </div>
        </div>
      )}
    </div>
  );
}