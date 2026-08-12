import React from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo";
import perspectivesData, { slugs } from "../data/perspectives";

const articles = Object.fromEntries(perspectivesData.map((a) => [a.slug, a]));

export { articles, slugs };

export default function PerspectiveDetail() {
  const { slug } = useParams();
  const article = articles[slug];

  if (!article) {
    return (
      <div className="page page-article-detail">
        <Seo title="Not Found" canonicalPath="/404" />
        <section className="article-detail-hero">
          <h1>Article Not Found</h1>
        </section>
        <div className="article-detail-body">
          <p>
            The requested article could not be located. Please return to{" "}
            <Link to="/perspectives">Perspectives</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-article-detail">
      <Seo
        title={article.title}
        description={article.abstract || article.title}
        canonicalPath={`/perspectives/${slug}`}
        type="article"
      />
      <section className="article-detail-hero">
        {article.heroImage && (
          <div className="article-detail-hero-bg">
            <img
              src={article.heroImage.src}
              alt={article.heroImage.alt}
              loading="eager"
            />
          </div>
        )}
        <div className="article-detail-hero-inner">
          <div className="article-detail-pub">{article.publication}</div>
          <h1>{article.title}</h1>
          <div className="article-detail-byline">
            <span className="article-detail-author">{article.author}</span>
            <span className="article-detail-role">{article.authorRole}</span>
          </div>
          <div className="article-detail-date">{article.date}</div>
        </div>
      </section>

      <div className="article-detail-body">
        <div className="article-detail-abstract">
          <div className="article-detail-abstract-label">Abstract</div>
          <p>{article.abstract}</p>
        </div>

        {article.sections.map((section, i) => (
          <React.Fragment key={i}>
            <section className="article-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
            {article.breakImage &&
              i === article.breakImage.insertAfterSection && (
                <div className="article-visual-break">
                  <img
                    src={article.breakImage.src}
                    alt={article.breakImage.alt}
                    loading="lazy"
                  />
                </div>
              )}
          </React.Fragment>
        ))}

        {article.footnotes && article.footnotes.length > 0 && (
          <section className="article-footnotes">
            <h2>Notes</h2>
            <ol>
              {article.footnotes.map((fn, i) => (
                <li key={i}>{fn}</li>
              ))}
            </ol>
          </section>
        )}

        <div className="article-detail-back">
          <Link to="/perspectives">Return to Perspectives</Link>
        </div>
      </div>
    </div>
  );
}
