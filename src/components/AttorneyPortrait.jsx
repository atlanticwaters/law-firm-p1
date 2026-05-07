/**
 * AttorneyPortrait — photographic portrait in a rounded-corner frame.
 *
 * Photos live at /images/portraits/{slug}.png and follow the 11:8
 * (220:160) aspect ratio of the previous SVG placeholder.
 *
 * Props:
 *   slug — attorney slug, used to resolve the portrait file
 *   name — full name, used for alt text
 *   size — width in px; height scales to preserve aspect ratio (default 160)
 */
export default function AttorneyPortrait({ slug, name, size = 160 }) {
  const w = size;
  const h = Math.round((220 / 160) * size);

  return (
    <div className="attorney-portrait" style={{ width: w, height: h }}>
      <img
        src={`/images/portraits/${slug}.png`}
        alt={name ? `Portrait of ${name}` : ""}
        width={w}
        height={h}
        loading="lazy"
        draggable="false"
      />
    </div>
  );
}
