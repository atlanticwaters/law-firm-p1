import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import Seo from "../components/Seo";
import articles from "../data/perspectives";

export default function Perspectives() {
  const listRef = useFadeIn();

  return (
    <div className="page page-perspectives">
      <Seo
        title="Perspectives"
        description="Writing from the firm on entity rights, the attributed speech doctrine, and the evolving law of representation for non-speaking clients."
        canonicalPath="/perspectives"
      />
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="/images/legal-volumes.jpg"
            alt="Rows of leather-bound legal volumes on dark wooden library shelves, spines aligned with embossed lettering"
            loading="eager"
          />
        </div>
        <div className="page-hero-content">
          <h1>Perspectives</h1>
          <p>
            Selected publications and internal analyses from the attorneys of
            Glover, Mast &amp; Purl LLP.
          </p>
        </div>
      </section>

      <div className="perspectives-list fade-in" ref={listRef}>
        {articles.map((a) => (
          <article className="perspective-item" key={a.slug}>
            <div className="perspective-item-meta">
              <div className="perspective-item-author">{a.author}</div>
              <div className="perspective-item-pub">{a.publication}</div>
              <div className="perspective-item-date">{a.date}</div>
            </div>
            <div>
              <h2>
                <Link to={`/perspectives/${a.slug}`}>{a.title}</Link>
              </h2>
              <p>{a.description}</p>
              <Link
                to={`/perspectives/${a.slug}`}
                className="perspective-read-more"
              >
                Read Full Article
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
