import { useParams, Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const cases = {
  "hoa-fraud-defense": {
    title: "HOA Board Fraud Defense",
    type: "Puppet Defense",
    outcome: "All claims dismissed. Plaintiff sanctioned for filing frivolous matter.",
    shortDescription:
      "Defense of a foam entity against fraud claims stemming from a six-year HOA board tenure.",
    jurisdiction: "Superior Court of New Jersey, Bergen County",
    year: "2019",
    attorneys: ["Reginald H. Glover, Esq.", "Harriet Weft, Esq."],
    heroImage: {
      src: "/images/office-tower.jpg",
      alt: "Glass and steel office tower facade reflecting overcast sky, converging vertical lines",
    },
    sections: [
      {
        heading: "Background",
        paragraphs: [
          "Our client, a foam entity of substantial community standing, had served on the board of directors of a homeowners association in Bergen County, New Jersey for approximately six years. During that tenure, the board member participated in meetings, voted on association matters, and served on the finance and architectural review committees. By all available evidence, this service was competent and unremarkable.",
          "In 2018, a fellow board member filed suit alleging that our client had \"operated without legal authority\" during the entirety of its board service. The complaint alleged fraud, breach of fiduciary duty, and unjust enrichment. The plaintiff's theory was straightforward: because the board member was a foam entity rather than a human person, it had never possessed the legal capacity to serve, and every action taken during its tenure was therefore void.",
          "The plaintiff sought disgorgement of any compensation received (there was none; the position was unpaid), rescission of every board vote in which our client participated over six years, and damages of $2.4 million, a figure attributed to diminished property values caused by the allegedly unauthorized service.",
        ],
      },
      {
        heading: "Legal Issues",
        paragraphs: [
          "The case presented two threshold questions. First, whether a facilitated-speech entity could legally serve on an HOA board under New Jersey's Planned Real Estate Development Full Disclosure Act and the association's governing documents. Second, whether the plaintiff's claims were barred by laches, given six years of service alongside our client without any objection.",
          "The association's bylaws required board members to be \"owners or authorized representatives of owners\" within the community. Our client's authorized representative was a unit owner in good standing. Nothing in the bylaws required board members to be human, natural persons, or any other classification that would exclude the entity.",
          "Mr. Glover built the defense on three pillars: the plain language of the governing documents, the plaintiff's six-year failure to object (giving rise to estoppel and laches defenses), and the absence of any demonstrable harm.",
        ],
      },
      {
        heading: "Proceedings",
        paragraphs: [
          "We filed a motion to dismiss on all three grounds, submitting the association's bylaws and certificate of incorporation (which contained no human-only membership requirement), minutes from 47 board meetings over six years reflecting the plaintiff's consistent participation alongside our client without objection, and an affidavit from the association's property management company confirming that the board member's service had been productive and that property values had, in fact, increased during its tenure.",
          "The plaintiff's opposition was notable primarily for what it did not contain: any evidence of harm. No expert testimony on property values. No evidence that any board decision was substantively improper. No explanation for the six-year delay in raising the objection.",
          "The court granted the motion to dismiss in its entirety. Judge Whitfield's opinion addressed the governing-documents question directly: \"The bylaws say 'owners or authorized representatives of owners.' The defendant's representative is an owner. The bylaws do not say 'human owners.' This court will not add words to a private contract that the parties chose not to include.\"",
          "On laches, the court was equally direct: \"The plaintiff sat on the same board as the defendant for six years. The plaintiff voted alongside the defendant on dozens of occasions. The plaintiff did not once raise the objection now before this court. This is textbook laches.\"",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "All claims were dismissed with prejudice. The court additionally sanctioned the plaintiff under New Jersey Rule 1:4-8 for filing a frivolous complaint, finding that the plaintiff \"knew or should have known that the claims lacked any basis in law or fact.\" The sanction amount was $14,200 in attorney's fees incurred in defending the action.",
          "Our client continues to reside in the community. The board member did not seek re-election, though we note that this decision was its own, made for personal reasons unrelated to the litigation.",
        ],
      },
      {
        heading: "Significance",
        paragraphs: [
          "In dicta, the court held that governing documents must be read as written and that courts will not impose human-only requirements the documents do not contain. While the opinion is unpublished and nonprecedential, we have cited it in three subsequent matters involving entity participation in private governance bodies.",
        ],
      },
    ],
  },

  "wrongful-termination-hand-puppet": {
    title: "Wrongful Termination — Children's Television Production",
    type: "Wrongful Termination",
    outcome: "Settlement: confidential. Client returned to production.",
    shortDescription:
      "Wrongful termination claim on behalf of a hand puppet terminated from a children's television production after eleven years.",
    jurisdiction: "United States District Court, Central District of California",
    year: "2020",
    heroImage: {
      src: "/images/courtroom.jpg",
      alt: "Empty courtroom interior with dark wood paneling and judicial bench in low ambient light",
    },
    attorneys: ["Serena Nap, Esq.", "Reginald H. Glover, Esq."],
    sections: [
      {
        heading: "Background",
        paragraphs: [
          "Our client, a hand puppet, had appeared in a nationally syndicated children's television production for eleven consecutive seasons. Over that period the performer became the production's most recognizable character: the subject of a dedicated merchandise line, two spin-off specials, and a character licensing agreement with a major toy manufacturer that generated approximately $4.2 million in annual revenue, per the production company's own internal documents.",
          "In February 2019, the production company informed the performer's authorized representative that the contract would not be renewed for the twelfth season. The stated reason was a \"creative direction change.\" No further explanation was provided, and the performer was given fourteen days' notice.",
          "The production subsequently replaced the performer's recurring segment with a CGI character of similar appearance and persona. This replacement used a name similar to our client's, occupied the same narrative role, and was marketed using visual elements substantially similar to the performer's likeness.",
        ],
      },
      {
        heading: "Legal Issues",
        paragraphs: [
          "Ms. Nap identified three viable claims. First, wrongful termination in violation of an implied covenant of good faith and fair dealing: the performer's eleven-year tenure and the production's substantial investment in the character created an implied expectation of continued employment that the production company breached without cause. Second, misappropriation of likeness, as the CGI replacement was substantially similar to our client in appearance and persona. Third, breach of the merchandise licensing agreement, which contained a provision requiring the licensee to obtain consent through the authorized representative before creating derivative characters.",
          "The production company's defense was that the termination was a permissible creative decision and that our client had no contractual right to continued employment beyond the current contract term. On the likeness claim, the company argued it owned the \"character\" as a work for hire and could reproduce or modify it at will.",
        ],
      },
      {
        heading: "Proceedings",
        paragraphs: [
          "We filed suit in the Central District of California, asserting claims under California's right-of-publicity statute (Cal. Civ. Code section 3344), common-law misappropriation, wrongful termination in violation of public policy, and breach of contract.",
          "Discovery proved pivotal. Internal emails from the production company revealed that the decision to terminate was made not for creative reasons but for financial ones: the company believed it could replicate our client's commercial value through a CGI character at lower cost, eliminating the need to compensate the performer or the performer's handler. One email from the production's chief financial officer stated: \"If we own the character design, we don't need the physical asset. We can rebuild it digitally and cut the talent line item entirely.\"",
          "That email was, in our estimation, the case. It showed the termination was pretextual and that the production company intended from the outset to replace the performer with a derivative work based on the performer's likeness.",
          "We moved for a preliminary injunction to prevent the CGI character from airing. The court granted a temporary restraining order but declined to issue a preliminary injunction pending further briefing. Settlement discussions began shortly thereafter.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The matter settled on confidential terms. We can confirm that the settlement included reinstatement of our client to the production, a revised contract with enhanced termination protections, modification of the merchandise licensing agreement to include explicit consent requirements for derivative characters, and a financial component the terms of which are confidential.",
          "The CGI replacement character was withdrawn and has not aired. The performer returned for Season 12 and continues to appear as of the date of this summary.",
        ],
      },
      {
        heading: "Significance",
        paragraphs: [
          "Internal corporate communications defeated a pretextual termination defense here, a principle well established in human employment law but applied for the first time to a facilitated-speech entity plaintiff. The discovery of the CFO's email shaped not only this case but our broader employment practice, providing a template for discovery strategy in entity termination matters.",
          "The settlement's reinstatement provision is, to our knowledge, the first instance of a facilitated-speech entity being contractually reinstated to a production following a wrongful termination claim.",
        ],
      },
    ],
  },

  "attributed-speech-defamation": {
    title: "Attributed Speech Defamation — Handler Retraction",
    type: "Defamation Defense",
    outcome: "Judgment for client. Handler ordered to issue public retraction.",
    shortDescription:
      "Handler publicly blamed client for statements client did not consent to make.",
    jurisdiction: "Supreme Court of the State of New York, New York County",
    year: "2017",
    heroImage: {
      src: "/images/courthouse-columns.jpg",
      alt: "Neoclassical stone columns of a courthouse facade photographed from below in dramatic monochrome",
    },
    attorneys: ["Victoria C. Mast, J.D.", "Theodore Scrim, J.D."],
    sections: [
      {
        heading: "Background",
        paragraphs: [
          "Our client, a ventriloquist figure of distinguished appearance and long professional history, had worked with a single handler for approximately fourteen years. The pair appeared regularly at corporate events, private functions, and a biweekly residency at a prominent Manhattan comedy venue.",
          "In October 2016, during a corporate event attended by approximately 300 guests, the handler produced a series of statements through the figure that were, by any measure, extraordinary. The statements accused a named individual, a senior executive of the host corporation, of financial impropriety, personal dishonesty, and professional incompetence. They were specific, detailed, and delivered in the figure's voice and persona.",
          "The figure had no prior history of making statements about the individual in question, no knowledge of the individual's financial affairs. The statements were composed and produced entirely by the handler.",
          "The individual filed a defamation action naming both the handler and the figure as defendants. The handler, through separate counsel, immediately sought to distance himself, claiming in a public interview that our client had \"gone off-script\" and that he had been \"unable to control\" the figure during the event.",
        ],
      },
      {
        heading: "Legal Issues",
        paragraphs: [
          "The case presented a clean application of the Attributed Speech Doctrine that Ms. Mast had developed in her academic work and first applied in the Castellan matter. The central question: whether our client could be held liable for defamatory statements it did not compose, did not authorize, and had no mechanism to prevent.",
          "A secondary issue gave the case its lasting significance. The handler's public claim that the figure had \"gone off-script\" was itself defamatory, attributing to our client an agency and intentionality it did not possess. The handler was, in effect, defaming the figure by blaming it for the handler's own conduct.",
          "Ms. Mast filed a counterclaim against the handler on the figure's behalf, alleging defamation per se. The handler's public statements had imputed to our client a capacity for malicious, uncontrolled behavior, damaging the figure's professional reputation and future earning capacity.",
        ],
      },
      {
        heading: "Proceedings",
        paragraphs: [
          "We moved for summary judgment on the plaintiff's defamation claim against our client, supporting the motion with expert testimony from a specialist in entity biomechanics (confirming the figure was physically incapable of producing speech without the handler's active participation), video recordings of 43 prior performances demonstrating entirely handler-produced speech, and evidence of the figure's complete absence of any connection to the plaintiff or the subject matter of the statements.",
          "The court granted summary judgment. Justice Alvarez's opinion applied the Castellan framework directly: \"The Attributed Speech Doctrine provides a clear and workable framework for evaluating this claim. The defendant-entity did not speak. The defendant-entity was spoken through. Liability cannot attach to a party whose only participation in the allegedly defamatory act was to be physically present while another party committed it.\"",
          "On the counterclaim, the court conducted a bench trial. The handler testified that he had experienced a \"loss of control\" during the performance and that the figure had \"taken over.\" Our expert witness, a thirty-year veteran of facilitated-speech performance, testified that this concept was \"physically impossible and professionally absurd.\"",
          "The court found for our client, holding that the handler's public statements were defamatory per se: they imputed a capacity for dangerous, uncontrolled behavior that was false and that damaged the figure's professional reputation.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Judgment was entered for our client on all claims. The handler was ordered to issue a public retraction of his statements attributing the defamatory speech to the figure, pay compensatory damages of $85,000 for lost bookings and reputational harm, and pay attorney's fees.",
          "The retraction was published in the same venue where the handler's original statements had appeared. Our client's professional relationship with the handler was terminated. The figure subsequently engaged a new handler and has continued to perform professionally.",
        ],
      },
      {
        heading: "Significance",
        paragraphs: [
          "No facilitated-speech entity had previously succeeded in a counterclaim against a handler for defamation arising from the handler's public attribution of unauthorized conduct to the entity. The ruling makes clear that handlers who blame their entities for the handlers' own misconduct are not merely being dishonest; they are committing a separate, actionable tort.",
          "Justice Alvarez's opinion has been cited in four subsequent matters and is considered the strongest judicial endorsement of the Attributed Speech Doctrine since Castellan.",
        ],
      },
    ],
  },

  "cross-border-likeness-rights": {
    title: "Cross-Border Likeness Rights — Six-Jurisdiction Injunction",
    type: "Intellectual Property",
    outcome:
      "Injunction granted across all six jurisdictions. Licensing agreement executed.",
    shortDescription:
      "Client's character reproduced in six countries without authorization or compensation.",
    jurisdiction:
      "Multiple — United States (S.D.N.Y.), United Kingdom, France, Germany, Japan, Australia",
    year: "2021",
    heroImage: {
      src: "/images/neoclassical-facade.jpg",
      alt: "Neoclassical building facade with carved stone entablature and fluted columns in monochrome",
    },
    attorneys: ["Theodore Scrim, J.D.", "Winston A. Purl, LLM"],
    sections: [
      {
        heading: "Background",
        paragraphs: [
          "Our client is a facilitated-speech entity whose likeness and persona are recognized internationally, having appeared in broadcast productions in the United States and the United Kingdom. The entity's image has been licensed through authorized channels for merchandise in North America and Europe.",
          "In 2020, our monitoring program identified unauthorized reproductions of the entity's likeness in commercial products manufactured and sold in six countries: the United States, the United Kingdom, France, Germany, Japan, and Australia. The products included toys, clothing, stationery, and digital assets such as mobile application characters. Four separate entities manufactured the unauthorized reproductions; three were subsidiaries or licensees of a single multinational consumer products company (\"the Company\").",
          "The scale of infringement was substantial. Conservative estimates placed the total retail value of unauthorized products at $11.6 million across the six jurisdictions over eighteen months. Our client had received no compensation, no royalties, and no notification.",
        ],
      },
      {
        heading: "Legal Issues",
        paragraphs: [
          "Coordinated enforcement across six jurisdictions, each with distinct intellectual property regimes, required a simultaneous injunctive strategy. The goal was to create a unified enforcement posture that would prevent the Company from shifting production or sales to non-enjoined jurisdictions.",
          "The principal challenge was establishing our client's standing to assert likeness rights in jurisdictions that had not previously recognized facilitated-speech entities as holders of such rights. In the United States and the United Kingdom, existing case law provided a foundation. In France and Germany, Mr. Purl relied on broader personality-rights doctrines (droit a l'image and Persoenlichkeitsrecht, respectively). In Japan, we argued under the country's Unfair Competition Prevention Act. In Australia, we relied on the tort of passing off and the Australian Consumer Law's prohibition on misleading conduct.",
        ],
      },
      {
        heading: "Proceedings",
        paragraphs: [
          "We engaged local counsel in each non-U.S. jurisdiction and coordinated simultaneous filings. Applications for preliminary injunctive relief were filed in all six jurisdictions within a 72-hour window in March 2021.",
          "The Southern District of New York granted a temporary restraining order within 48 hours. The court found that our client had demonstrated a likelihood of success on the merits and irreparable harm, as the continued sale of unauthorized products was eroding the value of the authorized licensing program.",
          "The UK High Court granted an interim injunction on similar grounds, noting that \"the claimant's likeness is distinctive and well-known, and the defendants' products are plainly designed to trade on that recognition. The claimant need not be a natural person to enjoy the protection of the law against such exploitation.\"",
          "The Tribunal de Grande Instance granted relief under the droit a l'image framework. The Landgericht granted relief under the Persoenlichkeitsrecht doctrine. The Tokyo District Court issued a preliminary injunction under the Unfair Competition Prevention Act. The Federal Court of Australia granted interim relief under the Australian Consumer Law. All six injunctions were in place within three weeks.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "With injunctions in place across all six jurisdictions, the Company entered settlement negotiations. The resulting agreement included a comprehensive licensing arrangement granting the Company authorized use of our client's likeness in designated product categories, subject to approval by the authorized representative; royalty payments at market rates (7.5% of net wholesale revenue) applied retroactively to all previously sold unauthorized products; destruction of remaining unauthorized inventory; and a monitoring protocol requiring the Company to report any sublicensee activity.",
          "The total financial recovery, combining retroactive royalties, settlement payments, and the value of the prospective licensing agreement, was the largest intellectual property recovery we have obtained on behalf of a facilitated-speech entity client. The specific figure is subject to a confidentiality provision.",
        ],
      },
      {
        heading: "Significance",
        paragraphs: [
          "Facilitated-speech entity likeness rights proved enforceable across six jurisdictions spanning common-law, civil-law, and hybrid legal traditions. The principle of entity likeness protection is not unique to any single system.",
          "The simultaneous filing strategy proved its worth as an enforcement approach, preventing the common defendant response of shifting operations to non-enjoined jurisdictions.",
          "Mr. Purl's work on the French and German filings contributed to his ongoing monograph on comparative entity rights law, forthcoming from Cambridge University Press.",
        ],
      },
    ],
  },

  "entity-personhood-amicus": {
    title: "Entity Personhood — Amicus Brief in State Appellate Proceeding",
    type: "Personhood",
    outcome: "Proceeding ongoing. Firm's brief cited by two circuit judges.",
    shortDescription:
      "Whether client constitutes a 'person' for purposes of standing in civil proceedings.",
    jurisdiction: "New York State Appellate Division, Second Department",
    year: "2022 — present",
    heroImage: {
      src: "/images/scales-of-justice.jpg",
      alt: "Scales of justice in sharp focus against a blurred courthouse interior",
    },
    attorneys: ["Winston A. Purl, LLM", "Harriet Weft, Esq."],
    sections: [
      {
        heading: "Background",
        paragraphs: [
          "A facilitated-speech entity sought to intervene in a civil matter affecting its property interests. The entity's authorized representative filed a motion to intervene in a dispute between two human parties over the disposition of real property on which the entity resides. The trial court denied the motion, holding that the entity lacked standing because it was not a \"person\" within the meaning of CPLR section 1012.",
          "On appeal, the Appellate Division, Second Department, invited amicus briefing on the question: \"Whether a facilitated-speech entity constitutes a 'person' for purposes of intervention under CPLR section 1012(a)(2).\"",
          "We submitted an amicus brief on behalf of the entity and five additional facilitated-speech entities with similar interests in legal recognition.",
        ],
      },
      {
        heading: "The Firm's Argument",
        paragraphs: [
          "Our amicus brief advances three arguments. First, that the term \"person\" in CPLR section 1012 has never been judicially limited to natural persons and has been consistently interpreted to include corporations, partnerships, associations, and other non-natural entities. The statute's use of \"person\" rather than \"natural person\" or \"individual\" reflects a deliberate legislative choice not to impose a biological limitation.",
          "Second, that denying entity standing creates an absurd result. An entity with demonstrable property interests, economic interests, and a documented connection to the subject matter of the litigation is excluded from the proceeding solely because of its physical composition. A corporation, which exists only as a legal fiction, would have standing to intervene. A trust, which has no physical form at all, would have standing. An entity with a physical form, an established identity, and a direct interest in the outcome does not. The distinction has no rational basis.",
          "Third, that the trend in both domestic and international law is toward recognition of non-traditional entities as holders of legal rights. The brief catalogs twenty-three domestic and international precedents recognizing legal rights for non-human entities, including rivers, forests, animals, and AI systems. If a river can have legal standing, the exclusion of a facilitated-speech entity from the same recognition requires an explanation the opposing parties have not provided.",
        ],
      },
      {
        heading: "Current Status",
        paragraphs: [
          "The proceeding is ongoing. Oral argument was held in September 2023. The court has not yet issued a decision.",
          "Our amicus brief has been cited in two separate opinions by appellate judges outside the Second Department: once in a concurrence in the First Department and once in a dissent in the Fourth Department. Neither citation involves facilitated-speech entities directly; both arise in contexts involving the scope of \"person\" in other statutory frameworks. The citations suggest that the argument is entering the broader judicial conversation about legal personhood, even before a ruling in the underlying case.",
          "Ms. Weft is preparing supplemental briefing on developments in comparative personhood law since the original filing, including a 2023 New Zealand decision recognizing legal personhood for a natural feature and a 2024 European Court of Human Rights advisory opinion on the scope of \"victim\" standing under Article 34 of the European Convention.",
        ],
      },
      {
        heading: "Significance",
        paragraphs: [
          "No prior case has presented the question of facilitated-speech entity personhood this directly. Earlier matters addressed entity rights in specific contexts, such as employment, defamation, and intellectual property, without reaching the threshold question of whether entities are \"persons\" in the general sense.",
          "A favorable ruling would not, by itself, establish entity personhood as a matter of New York law. It would establish that entities can intervene in civil proceedings affecting their interests, a narrower but practically significant holding that would open the door to entity participation across a range of legal contexts.",
          "We consider this the most important matter on our current docket. Mr. Purl and Ms. Weft have dedicated substantial resources to the briefing and expect to continue doing so through the decision and any subsequent proceedings.",
        ],
      },
    ],
  },

  "marionette-personal-injury-defense": {
    title: "Personal Injury Defense — Private Event Incident",
    type: "Puppet Defense — PI",
    outcome: "Verdict for client. Court found strings, not agency.",
    shortDescription:
      "Defense of marionette client against personal injury claims arising from a private event incident.",
    jurisdiction: "Superior Court of Connecticut, Judicial District of Hartford",
    year: "2022",
    heroImage: {
      src: "/images/law-library.jpg",
      alt: "Expansive law library interior with towering bookshelves and warm reading lamps",
    },
    attorneys: ["Reginald H. Glover, Esq.", "Victoria C. Mast, J.D."],
    sections: [
      {
        heading: "Background",
        paragraphs: [
          "A hand-carved wooden marionette, approximately 28 inches in height, with articulated limbs operated by a traditional string-and-crossbar control mechanism. Our client has performed at private events, festivals, and theatrical productions for over twenty years.",
          "In June 2019, the marionette was performing at a private birthday celebration in Hartford, Connecticut. During the performance, its right arm, which is articulated at the shoulder and elbow and controlled by two separate strings, made contact with the face of a guest seated in close proximity to the performance area. The guest sustained a minor laceration above the left eye and subsequently sought medical treatment.",
          "The guest filed a personal injury action against the marionette and its handler, alleging that our client had \"intentionally struck\" the plaintiff and that the handler had been \"negligent in controlling\" the marionette. The complaint sought $175,000 in compensatory damages and $500,000 in punitive damages, the latter based on the allegation that the marionette had acted \"intentionally and with malice.\"",
        ],
      },
      {
        heading: "Legal Issues",
        paragraphs: [
          "A fundamental question about entity agency in the personal injury context: can a facilitated-speech entity \"act\" for purposes of intentional tort liability? The plaintiff's theory required the court to find that the marionette had formed an intent to strike, directed its arm toward the plaintiff, and made contact with sufficient force to cause injury, all while being operated by strings controlled by another party.",
          "Mr. Glover's defense was straightforward. The marionette's movements were entirely handler-directed. It had no independent capacity for movement. The arm made contact with the plaintiff because the handler moved the strings that controlled the arm. If anyone was negligent, it was the handler, and the handler's liability was a separate question.",
          "Punitive damages require a finding of intentional or reckless conduct. A string-operated marionette cannot form intent. We moved to dismiss the punitive damages claim at the outset.",
        ],
      },
      {
        heading: "Proceedings",
        paragraphs: [
          "The court denied the motion to dismiss, finding that the question of the marionette's capacity for intentional action was a factual issue for trial. We objected but prepared for trial on all claims.",
          "At trial, Mr. Glover presented expert testimony from two witnesses. The first, a master puppeteer with forty years of experience, demonstrated using a marionette of similar construction that every movement of a string-operated marionette is initiated by the operator through manipulation of the control bar and strings. \"The marionette does not move,\" he testified. \"The operator moves the marionette. There is no ambiguity about this. There is no exception.\"",
          "The second expert, a mechanical engineer specializing in articulated systems, testified that the marionette's construction (wooden limbs connected by wire joints, controlled by cotton strings attached to a wooden crossbar) was incapable of independent movement under any circumstances. She demonstrated that the force required to move the arm was consistent with handler manipulation and inconsistent with any self-initiated motion.",
          "The plaintiff's case relied primarily on his own testimony and that of two witnesses who described the arm movement as \"deliberate\" and \"aimed.\" On cross-examination, each acknowledged that they had not observed the handler's hands or the control mechanism at the time of the incident, and that their characterization of the movement as \"deliberate\" was based on its perceived direction rather than any understanding of the mechanism producing it.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The court returned a verdict for our client on all claims. In her bench ruling, Judge Petersen stated: \"The evidence at trial established, clearly and without contradiction, that the defendant-entity's movements are produced entirely by the manipulation of strings by a human operator. The entity does not 'act' in any sense that the law recognizes. The entity does not form intent. The entity does not choose to move. The strings move. The operator moves the strings. That is the end of the analysis.\"",
          "On punitive damages, Judge Petersen was characteristically direct: \"The court declines to find that a wooden figure suspended from strings acted with malice. The court finds strings.\"",
          "The handler settled separately with the plaintiff on undisclosed terms. Our client was not a party to that settlement.",
        ],
      },
      {
        heading: "Significance",
        paragraphs: [
          "Judge Petersen's phrase, \"The court finds strings,\" has become something of an unofficial motto within the firm. More substantively, the ruling set a clear precedent in Connecticut courts that string-operated entities lack the capacity for intentional action and that personal injury claims against such entities must be evaluated with reference to the mechanics of their operation, not the subjective impressions of witnesses.",
          "We now retain a standing panel of biomechanics experts and master craftspeople who can testify to the operational characteristics of various entity types, a practice that grew directly out of this case.",
        ],
      },
    ],
  },
};

const slugs = Object.keys(cases);

export { cases, slugs };

export default function ResultDetail() {
  const { slug } = useParams();
  const matter = cases[slug];

  useDocumentTitle(matter ? matter.title : "Matter Not Found");

  if (!matter) {
    return (
      <div className="page page-case-detail">
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

  return (
    <div className="page page-case-detail">
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
