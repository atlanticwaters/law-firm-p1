import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo";
import resultsData, { slugs as resultSlugs } from "../data/results";

const cases = Object.fromEntries(resultsData.map((r) => [r.slug, r]));
const slugs = resultSlugs;

export { cases, slugs };

export default function ResultDetail() {
  const { slug } = useParams();
  const matter = cases[slug];

  if (!matter) {
    return (
      <div className="page page-case-detail">
        <Seo title="Not Found" canonicalPath="/404" />
        <section className="case-detail-hero">
          <h1>Matter Not Found</h1>
        </section>
        <div className="case-detail-body">
          <p>
            The requested matter could not be located. Please return to{" "}
            <Link to="/results">Selected Representations</Link>.
          </p>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://glovermastpurl.com/results/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://glovermastpurl.com/' },
      { '@type': 'ListItem', position: 2, name: 'Representative Matters', item: 'https://glovermastpurl.com/results' },
      { '@type': 'ListItem', position: 3, name: matter.title, item: canonicalUrl },
    ],
  };

  return (
    <div className="page page-case-detail">
      <Seo
        title={matter.title}
        description={matter.shortDescription || 'A representative matter handled by Glover, Mast & Purl.'}
        canonicalPath={`/results/${slug}`}
        image={matter.heroImage?.src}
        jsonLd={jsonLd}
      />
      <section className="case-detail-hero">
        {matter.heroImage && (
          <div className="case-detail-hero-bg">
            <img
              src={matter.heroImage.src}
              alt={matter.heroImage.alt}
              loading="eager"
            />
          </div>
        )}
        <div className="case-detail-hero-inner">
          <span className="case-detail-type">{matter.type}</span>
          <h1>{matter.title}</h1>
          <p className="case-detail-short">{matter.shortDescription}</p>
        </div>
      </section>

      <div className="case-detail-body">
        <aside className="case-detail-sidebar">
          <div className="case-sidebar-block">
            <div className="case-sidebar-label">Jurisdiction</div>
            <div className="case-sidebar-value">{matter.jurisdiction}</div>
          </div>
          <div className="case-sidebar-block">
            <div className="case-sidebar-label">Year</div>
            <div className="case-sidebar-value">{matter.year}</div>
          </div>
          <div className="case-sidebar-block">
            <div className="case-sidebar-label">Attorneys</div>
            {matter.attorneys.map((a) => (
              <div className="case-sidebar-value" key={a}>
                {a}
              </div>
            ))}
          </div>
          <div className="case-sidebar-block case-sidebar-outcome">
            <div className="case-sidebar-label">Outcome</div>
            <div className="case-sidebar-value">{matter.outcome}</div>
          </div>
        </aside>

        <div className="case-detail-content">
          {matter.sections.map((section, i) => (
            <section className="case-section" key={i}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="case-detail-disclaimer">
          <p>
            Results depend on individual facts and circumstances. Prior results
            do not guarantee future outcomes. Client names are withheld per
            confidentiality agreement.
          </p>
        </div>

        <div className="case-detail-back">
          <Link to="/results">Return to Selected Representations</Link>
        </div>
      </div>
    </div>
  );
}
