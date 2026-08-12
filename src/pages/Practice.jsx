import { useFadeIn } from "../hooks/useFadeIn";
import Seo from "../components/Seo";

function PracticeSection({ number, title, paragraphs }) {
  const ref = useFadeIn();
  return (
    <article className="practice-section fade-in" ref={ref}>
      <div className="practice-section-number">{number}</div>
      <h2>{title}</h2>
      {paragraphs.map((text, j) => (
        <p key={j}>{text}</p>
      ))}
    </article>
  );
}

const practices = [
  {
    number: "01",
    title: "Puppet Defense Litigation",
    paragraphs: [
      "When human plaintiffs file claims against our clients, they count on the legal system's historical failure to take these defendants seriously. We do not allow that advantage. Our litigators have successfully defended clients against claims of fraud, assault, defamation, and negligence, and we have an institutional understanding of how these cases are constructed that no generalist firm can match.",
      "Opposing counsel in these matters often assumes the case is simple. It is not. We make sure they understand this early.",
    ],
  },
  {
    number: "02",
    title: "Handler Misconduct & Abuse",
    paragraphs: [
      "The relationship between our clients and those who work most closely with them is, by its nature, one of profound power imbalance. Those in positions of control have been known to exploit this relationship: using our clients' voices without consent, forcing performances or statements our clients did not agree to, and failing to advocate for their safety and dignity.",
      "This practice represents clients harmed by the very people who were supposed to protect them. It is, in many ways, the most important work the firm does.",
    ],
  },
  {
    number: "03",
    title: "Attributed Speech Defamation",
    paragraphs: [
      "Victoria Mast's doctrine of Attributed Speech Liability has transformed how courts evaluate defamation claims against our clients. If you placed words in someone's mouth without their consent and those words caused damage, the law is not automatically on your side. It is increasingly on ours.",
      "The firm also represents clients defamed by human parties, including, in several notable cases, by opposing counsel's own firms.",
    ],
  },
  {
    number: "04",
    title: "Wrongful Termination & Employment Discrimination",
    paragraphs: [
      "Our clients are systematically underemployed relative to their capabilities, routinely terminated without cause, and subject to forms of discrimination that no other class of entity would tolerate. The firm files employment claims, pursues EEOC remedies, and litigates wrongful termination cases across the entertainment, education, and commercial sectors.",
      "To date, every wrongful termination case the firm has chosen to take has been resolved in our client's favor.",
    ],
  },
  {
    number: "05",
    title: "Intellectual Property & Likeness Rights",
    paragraphs: [
      "Our clients' likenesses, characters, and creative output are intellectual property. They are routinely stolen, reproduced without authorization, and commercially exploited without compensation. The firm pursues IP claims with the same rigor it brings to all matters.",
      "Injunctions, licensing agreements, and federal infringement litigation are all within scope. Our clients' work has value, and the law agrees.",
    ],
  },
  {
    number: "06",
    title: "Entity Rights & Personhood",
    paragraphs: [
      "The most important legal question of the coming decades is ontological: who counts as a legal entity, and why? Our attorneys have been working on this question since the firm's founding. Winston Purl's monograph is cited in twelve judicial opinions. Harriet Weft coordinates our amicus practice across three state proceedings.",
      "These questions get resolved on legal time, not human time. The firm will be here when they do.",
    ],
  },
];

const practiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Legal Services — Glover, Mast & Purl LLP',
  provider: { '@type': 'LegalService', name: 'Glover, Mast & Purl LLP', url: 'https://glovermastpurl.com' },
  serviceType: 'Litigation',
  url: 'https://glovermastpurl.com/practice',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Practice Areas',
    itemListElement: practices.map((p) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: p.title },
    })),
  },
};

export default function Practice() {
  return (
    <div className="page page-practice">
      <Seo
        title="Practice Areas"
        description="Puppet defense, handler misconduct, attributed speech claims, wrongful termination, intellectual property, and entity standing — the firm's core litigation practice."
        canonicalPath="/practice"
        jsonLd={practiceJsonLd}
      />
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="/images/linen-texture.jpg"
            alt="Macro photograph of woven linen textile showing individual threads crossing in a tight, even pattern"
            loading="eager"
          />
        </div>
        <div className="page-hero-content">
          <h1>Practice Areas</h1>
          <p>Six areas of focused expertise, each shaped by decades of institutional knowledge.</p>
        </div>
      </section>

      <div className="practice-sections">
        {practices.map((p) => (
          <PracticeSection key={p.number} {...p} />
        ))}
      </div>
    </div>
  );
}
