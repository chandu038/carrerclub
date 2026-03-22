export const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Satoshi:wght@400;500;700&display=swap');`;

export const DARK = {
  bg:"#0a0e1a", bg2:"#111827", bg3:"#1a2235", bg4:"#1f2a42",
  text:"#e8eeff", text2:"#8896b3", text3:"#3d4f6e",
  border:"rgba(100,130,255,0.14)", border2:"rgba(100,130,255,0.26)",
  accent:"#7c6dff", accentFg:"#fff",
  a2:"#ff5279", a3:"#38bdf8", a4:"#a78bfa", a5:"#fbbf24", a6:"#34d399",
  navBg:"rgba(10,14,26,0.96)", inputBg:"#1a2235", cardBg:"#111827",
  ftBg:"rgba(124,109,255,0.14)", ftFg:"#a99fff",
  inBg:"rgba(56,189,248,0.13)",  inFg:"#38bdf8",
  ptBg:"rgba(255,82,121,0.13)",  ptFg:"#ff5279",
  ctBg:"rgba(167,139,250,0.13)", ctFg:"#a78bfa",
  gbBg:"rgba(52,211,153,0.13)",  gbFg:"#34d399",
  ms1:"rgba(56,189,248,0.10)",   ms2:"rgba(124,109,255,0.10)",
  ms3:"rgba(167,139,250,0.10)",  ms4:"rgba(52,211,153,0.10)",
  dangerBg:"rgba(255,82,121,0.13)", dangerFg:"#ff5279",
};

export const LIGHT = {
  bg:"#f0f4ff", bg2:"#ffffff", bg3:"#e6eaf5", bg4:"#d8dff0",
  text:"#0d1117", text2:"#3a4560", text3:"#8892b0",
  border:"rgba(99,120,200,0.15)", border2:"rgba(99,120,200,0.30)",
  accent:"#5b4eff", accentFg:"#ffffff",
  a2:"#f43f5e", a3:"#0ea5e9", a4:"#8b5cf6", a5:"#f59e0b", a6:"#10b981",
  navBg:"rgba(240,244,255,0.96)", inputBg:"#e6eaf5", cardBg:"#ffffff",
  ftBg:"rgba(91,78,255,0.10)",   ftFg:"#5b4eff",
  inBg:"rgba(14,165,233,0.10)",  inFg:"#0284c7",
  ptBg:"rgba(244,63,94,0.10)",   ptFg:"#e11d48",
  ctBg:"rgba(139,92,246,0.10)",  ctFg:"#7c3aed",
  gbBg:"rgba(16,185,129,0.10)",  gbFg:"#059669",
  ms1:"rgba(14,165,233,0.08)",   ms2:"rgba(91,78,255,0.07)",
  ms3:"rgba(139,92,246,0.08)",   ms4:"rgba(16,185,129,0.08)",
  dangerBg:"rgba(244,63,94,0.10)", dangerFg:"#e11d48",
};

export const TYPE_COLORS = (T) => ({
  "Full-time":  { bg: T.ftBg, fg: T.ftFg },
  "Internship": { bg: T.inBg, fg: T.inFg },
  "Part-time":  { bg: T.ptBg, fg: T.ptFg },
  "Contract":   { bg: T.ctBg, fg: T.ctFg },
  "Govt":       { bg: T.gbBg, fg: T.gbFg },
});