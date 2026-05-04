import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const articles = [
  {
    slug: "attributed-speech-limits-of-agency",
    title: "Attributed Speech and the Limits of Agency: A Primer",
    author: "Victoria C. Mast, J.D.",
    publication: "Puppet Entity Law Review, Vol. 12",
    date: "Spring 2018",
    description:
      "The foundational piece on the doctrine that changed how courts evaluate puppet defamation claims. Proposes a tripartite taxonomy of facilitated speech and argues that liability cannot attach where agency does not exist.",
  },
  {
    slug: "entity-standing-post-personhood",
    title: "Who May Sue? Entity Standing in the Post-Personhood Era",
    author: "Winston A. Purl, LLM",
    publication: "Harvard Law Review (forthcoming)",
    date: "2024",
    description:
      "An examination of how the concept of legal standing must evolve to account for non-human entities. Proposes a modified four-part standing framework that preserves Article III rigor while accounting for structural realities of entity litigation.",
  },
  {
    slug: "handler-problem-vicarious-liability",
    title:
      "The Handler Problem: Rethinking Vicarious Liability in Felt-Entity Relationships",
    author: "Reginald H. Glover, Esq.",
    publication: "Internal publication",
    date: "2021",
    description:
      "Mr. Glover's definitive treatment of when handlers are — and are not — responsible for their clients' conduct. Proposes a four-category taxonomy of handler liability and argues that the current framework inverts the actual power dynamic.",
  },
  {
    slug: "employment-discrimination-non-human-entities",
    title:
      "Employment Discrimination Against Non-Human Entities: A Growing Crisis",
    author: "Serena Nap, Esq.",
    publication: "National Employment Law Project",
    date: "October 2023",
    description:
      "A data-driven look at termination rates, EEOC filings, and systemic bias in the entertainment sector. Documents patterns of pretextual termination, wage suppression, and occupational segregation across 340 documented cases.",
  },
  {
    slug: "why-courts-get-puppet-ip-wrong",
    title: "Why Courts Get Puppet IP Wrong — And How to Fix It",
    author: "Theodore Scrim, J.D.",
    publication: "IP Quarterly",
    date: "Summer 2022",
    description:
      "The case for stronger protections and how to pursue them under existing law. Examines three recurring judicial errors — conflation, likeness undervaluation, and work-for-hire misapplication — and proposes specific doctrinal corrections.",
  },
];

export default function Perspectives() {
  useDocumentTitle("Perspectives");
  const listRef = useFadeIn();

  return (
    <div className="page page-perspectives">
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
