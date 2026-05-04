/**
 * AttorneyPortrait — SVG portrait placeholder per brief spec.
 *
 * Easter Egg 1: A nearly invisible vertical line extends upward from the
 * portrait circle (~40px), terminating in a small horizontal crossbar
 * (~12px wide). Stroke is antique gold (#8B7340) at opacity 0.07.
 * At normal viewing distance it reads as a decorative frame-hanging detail.
 * On close inspection: a marionette string with a control bar crosspiece.
 * No tooltip. No label. No acknowledgment anywhere.
 *
 * Easter Egg 2: On hover, the SVG plays a pendulum sway (±1deg, 2.4s,
 * ease-in-out, transform-origin: top center). A puppet swaying from
 * its string.
 *
 * Props:
 *   initials — two-letter monogram (e.g. "RG")
 *   size     — scales proportionally from the 160×220 base (default 160)
 */
export default function AttorneyPortrait({ initials, size = 160 }) {
  // Base spec: 160×220 viewBox. Scale everything proportionally.
  const scale = size / 160;
  const w = size;
  const h = Math.round(220 * scale);
  const cx = Math.round(80 * scale);

  // String line: y=0 to y=36 in base spec
  const stringEnd = Math.round(36 * scale);
  // Crossbar at y=2, extending 12px each side of center in base spec
  const barY = Math.round(2 * scale);
  const barLeft = Math.round(68 * scale);
  const barRight = Math.round(92 * scale);
  // Circle: center at (80, 116), radius 64
  const circleY = Math.round(116 * scale);
  const r = Math.round(64 * scale);
  // Text baseline at y=122
  const textY = Math.round(122 * scale);
  const fontSize = Math.round(28 * scale);

  return (
    <svg
      className="attorney-portrait"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
    >
      {/* The string — faint */}
      <line
        x1={cx} y1="0"
        x2={cx} y2={stringEnd}
        stroke="#8B7340"
        strokeWidth="1"
        opacity="0.07"
      />
      {/* The control bar crosspiece */}
      <line
        x1={barLeft} y1={barY}
        x2={barRight} y2={barY}
        stroke="#8B7340"
        strokeWidth="1"
        opacity="0.07"
      />
      {/* Portrait circle — charcoal */}
      <circle
        cx={cx}
        cy={circleY}
        r={r}
        fill="#1C1C1E"
      />
      {/* Monogram initials — gold */}
      <text
        x={cx}
        y={textY}
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize={fontSize}
        fontWeight="300"
        fill="#8B7340"
        letterSpacing="0.05em"
      >
        {initials}
      </text>
    </svg>
  );
}
