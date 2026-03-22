export const I = {
  home:     "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  search:   "M11 19A8 8 0 1 0 11 3a8 8 0 0 0 0 16z M21 21l-4.35-4.35",
  bookmark: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
  bell:     "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  grid:     "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  plus:     "M12 5v14 M5 12h14",
  list:     "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
  trash:    "M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  edit:     "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  close:    "M18 6L6 18 M6 6l12 12",
  warn:     "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
  check:    "M20 6L9 17l-5-5",
  bars:     "M3 12h18 M3 6h18 M3 18h18",
  map:      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  briefcase:"M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  tag:      "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01",
  clock:    "M12 22A10 10 0 1 0 12 2a10 10 0 0 0 0 20z M12 6v6l4 2",
  money:    "M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  chart:    "M18 20V10 M12 20V4 M6 20v-6",
  govt:     "M3 22V9l9-7 9 7v13 M9 22V14h6v8",
};

export const CATS = [
  { id:"all",     label:"All Jobs",    ic:"search",    color: null },
  { id:"tech",    label:"Tech & Dev",  ic:"settings",  color:"a3" },
  { id:"design",  label:"Design & UI", ic:"eye",       color:"a4" },
  { id:"mktg",    label:"Marketing",   ic:"chart",     color:"a2" },
  { id:"fin",     label:"Finance",     ic:"money",     color:"accent" },
  { id:"hr",      label:"HR & Ops",    ic:"briefcase", color:"a5" },
  { id:"content", label:"Content",     ic:"list",      color:"a3" },
  { id:"sales",   label:"Sales",       ic:"check",     color:"a2" },
  { id:"govt",    label:"Govt Jobs",   ic:"govt",      color:"a6" },
];

export const NAV_ITEMS = [
  { id:"home",   label:"Home",        ic:"home",     color:"accent" },
  { id:"browse", label:"Browse Jobs", ic:"search",   color:"a3" },
  { id:"saved",  label:"Saved",       ic:"bookmark", color:"a4" },
  { id:"alerts", label:"Alerts",      ic:"bell",     color:"a5" }
];

export const ADMIN_TABS = [
  { id:"dashboard", label:"Dashboard", ic:"grid" },
  { id:"addjob",    label:"Add Job",   ic:"plus" },
  { id:"manage",    label:"Manage",    ic:"list" },
  { id:"settings",  label:"Settings",  ic:"settings" },
];
export function formatPosted(posted) {
  if (!posted) return "";
 
 
  if (
    posted === "Today"     ||
    posted === "Yesterday" ||
    /^\d+ days? ago$/i.test(posted)  ||
    /^\d+ weeks? ago$/i.test(posted) ||
    /^\d+ months? ago$/i.test(posted)
  ) return posted;
 
  // Try to parse as a date
  const date = new Date(posted);
  if (isNaN(date.getTime())) return posted; // unparseable → show raw string
 
  const now      = new Date();
  const diffMs   = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHrs  = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
 
  if (diffMins < 1)   return "Just now";
  if (diffHrs  < 1)   return `${diffMins} min ago`;
  if (diffHrs  < 24)  return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7)   return `${diffDays} days ago`;
  if (diffDays < 14)  return "1 week ago";
  if (diffDays < 30)  return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60)  return "1 month ago";
  return `${Math.floor(diffDays / 30)} months ago`;
}
export function cleanSalary(salary) {
  if (!salary) return "";

  // Remove any existing currency symbols ($, ₹, €, £)
  const cleaned = salary.replace(/[₹$€£]/g, "").trim();
  return `₹${cleaned}`;
}