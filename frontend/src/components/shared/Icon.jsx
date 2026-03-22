export default function Icon({ path, size = 16, color = "currentColor", fill = false }) {
  const segments = path.includes(" M")
    ? path.split(" M").map((d, i) => (i === 0 ? d : "M" + d))
    : [path];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? color : "none"}
      stroke={fill ? "none" : color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, display: "block" }}
    >
      {segments.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}