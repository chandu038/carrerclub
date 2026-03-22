import { useEffect } from "react";
import Icon from "../shared/Icon";
import { I } from "../../constants";

export default function ConfirmDialog({ title, message, onConfirm, onCancel, T }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onCancel]);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onCancel()}
      style={{
        position: "fixed", inset: 0, zIndex: 700,
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem",
      }}
    >
      <div style={{
        background: T.bg2, border: `1px solid ${T.border2}`,
        borderRadius: 16, width: "100%", maxWidth: 400, padding: "1.75rem",
        animation: "dlg 0.22s cubic-bezier(0.34,1.4,0.64,1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem" }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: T.dangerBg,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon path={I.warn} size={20} color={T.dangerFg} />
          </div>
          <div>
            <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 16, fontWeight: 700, color: T.text }}>
              {title}
            </div>
            <div style={{ fontSize: 13, color: T.text2, marginTop: 3 }}>{message}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "8px 16px", borderRadius: 8,
              background: "transparent", border: `1px solid ${T.border2}`,
              color: T.text2, fontSize: 13, cursor: "pointer",
              fontFamily: "'Satoshi',sans-serif",
            }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "8px 16px", borderRadius: 8,
              background: T.dangerBg, border: `1px solid ${T.dangerFg}`,
              color: T.dangerFg, fontSize: 13, fontWeight: 700, cursor: "pointer",
              fontFamily: "'Clash Display',sans-serif",
              display: "flex", alignItems: "center", gap: 6,
            }}>
            <Icon path={I.trash} size={14} color={T.dangerFg} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}