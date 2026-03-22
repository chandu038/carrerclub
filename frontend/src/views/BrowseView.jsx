import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Icon from "../components/shared/Icon";
import JobCard from "../components/shared/JobCard";
import { I, CATS } from "../constants";
import { useWindowWidth } from "../hooks/useWindowWidth";

// Same slug function as JobDialog
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

export default function BrowseView({ jobs, T, isMobile, setSelJob, onSave }) {
  const { catId }  = useParams();
  const navigate   = useNavigate();
  const location   = useLocation();
  const w          = useWindowWidth();

  const [cat,        setCat]        = useState(catId || "all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [search,     setSearch]     = useState("");

  // Auto-open job from ?job=SLUG or ?job=ID in URL
  useEffect(() => {
    if (jobs.length === 0) return;
    const params = new URLSearchParams(location.search);
    const jobParam = params.get("job");
    if (!jobParam) return;

    // Try match by ID first, then by slug
    const found =
      jobs.find((j) => j.id === jobParam) ||
      jobs.find((j) => makeSlug(j.title, j.company) === jobParam);

    if (found) {
      setSelJob(found);
      // Clean URL
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, jobs]);

  // Sync category from URL param
  useEffect(() => {
    if (catId && CATS.find((c) => c.id === catId)) setCat(catId);
    else setCat("all");
  }, [catId]);

  const handleCatChange = (id) => {
    setCat(id);
    if (id === "all") navigate("/browse");
    else navigate(`/browse/${id}`);
  };

  const filtered = jobs.filter((j) => {
    const matchCat    = cat === "all" || j.cat === cat;
    const matchType   = typeFilter === "all" || j.type === typeFilter;
    const matchSearch = !search || [j.title, j.company, j.location, ...(j.tags || [])]
      .some((s) => s?.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchType && matchSearch;
  });

  const activeCat      = CATS.find((c) => c.id === cat);
  const activeCatColor = activeCat?.color ? T[activeCat.color] : T.a3;

  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

      {/* Page header */}
      <div style={{ padding: "1.5rem 2rem 0", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 24, fontWeight: 700, color: T.text, marginBottom: "1rem", display: "flex", alignItems: "center", gap: 10 }}>
          <Icon path={I[activeCat?.ic || "search"]} size={22} color={activeCatColor} />
          {cat === "all" ? "All Jobs" : activeCat?.label}
          <span style={{ fontSize: 14, fontWeight: 400, color: T.text2 }}>({filtered.length})</span>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "1rem" }}>
          <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
            <Icon path={I.search} size={15} color={T.text3} />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs, companies, skills..."
            style={{ background: T.bg3, border: `1px solid ${T.border2}`, borderRadius: 10, padding: "10px 16px 10px 38px", fontSize: 14, color: T.text, width: "100%", fontFamily: "'Satoshi',sans-serif", outline: "none" }}
          />
          {search && (
            <button onClick={() => setSearch("")}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <Icon path={I.close} size={14} color={T.text3} />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", overflowX: "auto", gap: 2, scrollbarWidth: "none", marginBottom: -1 }}>
          {CATS.map((c) => {
            const active = cat === c.id;
            const col    = c.color ? T[c.color] : T.text2;
            return (
              <button key={c.id} onClick={() => handleCatChange(c.id)}
                style={{ flexShrink: 0, padding: "9px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", background: "none", fontFamily: "'Satoshi',sans-serif", whiteSpace: "nowrap", color: active ? col : T.text2, borderBottom: `2px solid ${active ? col : "transparent"}`, marginBottom: -1, transition: "all 0.15s", display: "flex", alignItems: "center", gap: 5 }}>
                <Icon path={I[c.ic]} size={13} color={active ? col : T.text2} />
                {c.label}
                {c.id !== "all" && (
                  <span style={{ fontSize: 10, fontWeight: 400, color: active ? col : T.text3 }}>
                    {jobs.filter((j) => j.cat === c.id).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Type filters */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 2rem", flexWrap: "wrap", gap: 8, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["all", "Full-time", "Internship", "Part-time", "Contract", "Govt"].map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", border: `1px solid ${typeFilter === t ? T.border2 : T.border}`, background: typeFilter === t ? T.bg3 : "transparent", color: typeFilter === t ? T.text : T.text2 }}>
              {t === "all" ? "All types" : t}
              <span style={{ marginLeft: 4, color: T.text3, fontSize: 11 }}>
                {t === "all" ? jobs.length : jobs.filter((j) => j.type === t).length}
              </span>
            </button>
          ))}
        </div>
        <span style={{ fontSize: 13, color: T.text2 }}>
          {filtered.length} listing{filtered.length !== 1 ? "s" : ""}{search ? ` for "${search}"` : ""}
        </span>
      </div>

      {/* Job grid */}
      <div style={{ padding: isMobile ? "1rem" : "1.5rem 2rem", flex: 1 }}>
        {filtered.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : w < 1000 ? "1fr 1fr" : "repeat(3,1fr)", gap: "1rem" }}>
            {filtered.map((j) => (
              <JobCard key={j.id} job={j} onClick={setSelJob} onSave={onSave} T={T} isMobile={isMobile} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "5rem 1rem" }}>
            <Icon path={I.search} size={52} color={T.text3} />
            <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 600, color: T.text, marginBottom: 8, marginTop: 16 }}>No jobs found</div>
            <div style={{ fontSize: 14, color: T.text2, marginBottom: 20 }}>Try changing the filters or search term</div>
            <button onClick={() => { setSearch(""); setTypeFilter("all"); handleCatChange("all"); }}
              style={{ padding: "10px 24px", borderRadius: 20, background: T.accent, color: T.accentFg, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Clash Display',sans-serif" }}>
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}