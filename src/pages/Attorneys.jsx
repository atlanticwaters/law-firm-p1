import { Link } from "react-router-dom";
import AttorneyPortrait from "../components/AttorneyPortrait";
import { useFadeIn } from "../hooks/useFadeIn";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import allAttorneys from "../data/attorneys";

export default function Attorneys() {
  useDocumentTitle("Our Attorneys");
  const gridRef = useFadeIn();

  return (
    <div className="page page-attorneys">
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="/images/neoclassical-facade.jpg"
            alt="Neoclassical building facade with carved stone entablature and fluted columns in monochrome"
            loading="eager"
          />
        </div>
        <div className="page-hero-content">
          <h1>Our Attorneys</h1>
          <p>Our Clients Speak For Themselves.</p>
        </div>
      </section>

      <section className="attorneys-grid fade-in" ref={gridRef}>
        {allAttorneys.map((a) => (
          <Link
            to={`/attorneys/${a.slug}`}
            className="attorney-card"
            key={a.initials}
          >
            <div className="attorney-portrait-wrap">
              <AttorneyPortrait slug={a.slug} name={a.name} />
            </div>
            <h3>{a.name}</h3>
            <div className="attorney-title">{a.role}</div>
            <div className="attorney-specialty">{a.specialty}</div>
            <span className="attorney-view-profile">View Profile</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
