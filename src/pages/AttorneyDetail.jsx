import { useParams, Link } from "react-router-dom";
import AttorneyPortrait from "../components/AttorneyPortrait";
import { useFadeIn } from "../hooks/useFadeIn";
import Seo from "../components/Seo";
import attorneysData, { slugs } from "../data/attorneys";

const attorneys = Object.fromEntries(attorneysData.map((a) => [a.slug, a]));
const slugOrder = slugs;

export { attorneys, slugOrder };

export default function AttorneyDetail() {
  const { slug } = useParams();
  const attorney = attorneys[slug];
  const contentRef = useFadeIn();

  if (!attorney) {
    return (
      <div className="page">
        <Seo title="Not Found" canonicalPath="/404" />
        <section className="page-hero">
          <div className="page-hero-content">
            <h1>Attorney Not Found</h1>
            <p>This profile is not currently in the production.</p>
          </div>
        </section>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "var(--space-2xl) var(--space-xl)" }}>
          <Link to="/attorneys" style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Return to Attorneys
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = slugOrder.indexOf(slug);
  const prevSlug = currentIndex > 0 ? slugOrder[currentIndex - 1] : null;
  const nextSlug = currentIndex < slugOrder.length - 1 ? slugOrder[currentIndex + 1] : null;

  const canonicalUrl = `https://glovermastpurl.com/attorneys/${slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: attorney.name,
      jobTitle: attorney.role,
      worksFor: { '@type': 'LegalService', name: 'Glover, Mast & Purl LLP' },
      url: canonicalUrl,
      ...(attorney.email ? { email: attorney.email } : {}),
      ...(attorney.phone ? { telephone: attorney.phone } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://glovermastpurl.com/' },
        { '@type': 'ListItem', position: 2, name: 'Attorneys', item: 'https://glovermastpurl.com/attorneys' },
        { '@type': 'ListItem', position: 3, name: attorney.name, item: canonicalUrl },
      ],
    },
  ];

  return (
    <div className="page page-attorney-detail">
      <Seo
        title={attorney.name}
        description={`${attorney.name}, ${attorney.role} at Glover, Mast & Purl — representing entities in complex litigation.`}
        canonicalPath={`/attorneys/${slug}`}
        image={`/images/portraits/${slug}.png`}
        jsonLd={jsonLd}
      />
      <section className="page-hero">
        <div className="page-hero-content">
          <h1>{attorney.name}</h1>
          <p>{attorney.role}</p>
        </div>
      </section>

      <div className="attorney-detail-body fade-in" ref={contentRef}>
        {/* Sidebar */}
        <aside className="attorney-detail-sidebar">
          <div className="attorney-detail-portrait">
            <AttorneyPortrait slug={slug} name={attorney.name} size={180} />
          </div>

          <div className="attorney-sidebar-block">
            <div className="attorney-sidebar-label">Contact</div>
            <a href={`mailto:${attorney.email}`} className="attorney-sidebar-link">
              {attorney.email}
            </a>
            <div className="attorney-sidebar-value">{attorney.phone}</div>
          </div>

          <div className="attorney-sidebar-block">
            <div className="attorney-sidebar-label">Practice Areas</div>
            <div className="attorney-practice-tags">
              {attorney.practices.map((p) => (
                <Link to="/practice" key={p} className="attorney-practice-tag">
                  {p}
                </Link>
              ))}
            </div>
          </div>

          <div className="attorney-sidebar-block">
            <div className="attorney-sidebar-label">Admissions</div>
            {attorney.admitted.map((a) => (
              <div className="attorney-sidebar-value" key={a}>{a}</div>
            ))}
          </div>

          <div className="attorney-sidebar-block">
            <div className="attorney-sidebar-label">Education</div>
            {attorney.education.map((e) => (
              <div className="attorney-education-item" key={e.degree}>
                <div className="attorney-sidebar-value attorney-ed-degree">{e.degree}</div>
                <div className="attorney-ed-honors">{e.honors}</div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="attorney-detail-main">
          {/* Bio */}
          <section className="attorney-detail-section">
            {attorney.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {attorney.quote && (
              <blockquote className="attorney-quote">
                "{attorney.quote}"
              </blockquote>
            )}
          </section>

          {/* Selected Matters */}
          <section className="attorney-detail-section">
            <h2>Selected Representations</h2>
            <ul className="attorney-matters-list">
              {attorney.selectedMatters.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
            <p className="attorney-matters-disclaimer">
              Results depend on individual facts and circumstances. Prior results
              do not guarantee future outcomes.
            </p>
          </section>

          {/* Publications */}
          {attorney.publications && attorney.publications.length > 0 && (
            <section className="attorney-detail-section">
              <h2>Publications</h2>
              <ul className="attorney-publications-list">
                {attorney.publications.map((pub) => (
                  <li key={pub.title}>
                    <span className="pub-title">{pub.title}</span>
                    <span className="pub-source">{pub.publication}, {pub.year}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Recognition */}
          {attorney.recognition && attorney.recognition.length > 0 && (
            <section className="attorney-detail-section">
              <h2>Recognition</h2>
              <ul className="attorney-recognition-list">
                {attorney.recognition.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Prev / Next Navigation */}
          <nav className="attorney-detail-nav">
            {prevSlug ? (
              <Link to={`/attorneys/${prevSlug}`} className="attorney-nav-link">
                &larr; {attorneys[prevSlug].name}
              </Link>
            ) : <span />}
            {nextSlug ? (
              <Link to={`/attorneys/${nextSlug}`} className="attorney-nav-link">
                {attorneys[nextSlug].name} &rarr;
              </Link>
            ) : <span />}
          </nav>
        </div>
      </div>
    </div>
  );
}
