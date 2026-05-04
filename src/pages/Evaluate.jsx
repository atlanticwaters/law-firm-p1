import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function EvalSection({ number, title, indicators, evidence, outcomes }) {
  const ref = useFadeIn();
  return (
    <section className="eval-section fade-in" ref={ref}>
      <div className="eval-section-number">{number}</div>
      <h2>{title}</h2>
      <div className="eval-columns">
        <div className="eval-column">
          <h3>When to contact us</h3>
          <ul>
            {indicators.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="eval-column">
          <h3>What strengthens a matter</h3>
          <ul>
            {evidence.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="eval-column">
          <h3>Possible outcomes</h3>
          <ul>
            {outcomes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const sections = [
  {
    number: "01",
    title: "Puppet Defense",
    indicators: [
      "Your client has been named as a defendant in a civil action",
      "A human plaintiff claims your client caused injury, committed fraud, or acted negligently",
      "Opposing counsel's complaint treats your client as an independent actor without addressing the question of agency",
      "Criminal charges have been filed against your client for conduct that occurred during a performance or supervised activity",
      "Your client has been included in a class action or multi-party proceeding and you believe the inclusion is unwarranted",
    ],
    evidence: [
      "Documentation of the handler-entity relationship at the time of the alleged incident (contracts, performance agreements, production schedules)",
      "Video or photographic records of the event in question, particularly footage showing the handler's physical involvement",
      "Expert testimony regarding the biomechanics of your client's operation, confirming that independent action was not possible",
      "Prior performance history demonstrating your client's typical conduct and persona",
      "Any written direction, scripts, or blocking notes provided to the handler before the event",
    ],
    outcomes: [
      "Dismissal of all claims against the client",
      "Summary judgment on grounds of insufficient agency",
      "Sanctions against opposing counsel for frivolous filing",
      "Transfer of liability to the responsible handler or third party",
      "Precedential ruling clarifying the agency standard for entity defendants in the relevant jurisdiction",
    ],
  },
  {
    number: "02",
    title: "Handler Misconduct",
    indicators: [
      "Your client's handler has used the client's voice or likeness in contexts the client did not agree to",
      "The handler has forced performances, public appearances, or statements without consulting the client's authorized representative",
      "The handler has physically mistreated, damaged, or neglected the client",
      "The handler has publicly blamed the client for the handler's own conduct",
      "The handler has abandoned the client, leaving the client without professional representation or physical care",
      "The handler has profited from the client's work without appropriate compensation or accounting",
    ],
    evidence: [
      "Communications between the handler and the client's authorized representative (email, text, written correspondence)",
      "Witness testimony from production staff, crew members, or other professionals present during the misconduct",
      "Photographic or video documentation of physical damage, neglect, or unsafe conditions",
      "Financial records showing compensation paid to the handler versus compensation received by the client",
      "Any prior complaints, grievances, or warnings issued to the handler by production companies, unions, or professional organizations",
      "Documentation of the client's condition before and after the period of misconduct",
    ],
    outcomes: [
      "Compensatory damages for economic loss, reputational harm, or physical damage",
      "Court-ordered retraction of false public statements attributing misconduct to the client",
      "Injunctive relief preventing the handler from further contact with or use of the client",
      "Termination of the handler-entity relationship with appropriate transition protections",
      "Referral to professional licensing bodies or union disciplinary proceedings where applicable",
    ],
  },
  {
    number: "03",
    title: "Attributed Speech Claims",
    indicators: [
      "Your client has been sued for defamation, fraud, or incitement based on words spoken through the client by a handler",
      "A handler has publicly claimed that the client 'went off-script,' 'took over,' or otherwise acted independently during a performance",
      "Your client's voice or persona has been used to make statements the client's authorized representative did not approve",
      "Third parties have been harmed by speech attributed to your client, and legal action has been directed at the client rather than the handler",
    ],
    evidence: [
      "The script, outline, or performance plan for the event in question, showing what was authorized versus what occurred",
      "Recordings of the event, ideally from multiple angles showing both the client and the handler",
      "Expert testimony confirming that the client could not have produced the speech independently",
      "The client's established performance history and persona, demonstrating that the statements were inconsistent with prior conduct",
      "Any post-event communications from the handler that acknowledge responsibility or contradict the handler's public account",
    ],
    outcomes: [
      "Dismissal of defamation or fraud claims against the client on attributed speech grounds",
      "Successful counterclaim against the handler for defamation of the client",
      "Court-ordered public retraction by the handler",
      "Damages for reputational harm and lost professional opportunities",
      "Judicial adoption of the Attributed Speech Doctrine in a jurisdiction where it has not yet been applied",
    ],
  },
  {
    number: "04",
    title: "Wrongful Termination",
    indicators: [
      "Your client has been terminated from a production, program, or engagement, and the stated reason does not match the circumstances",
      "The phrase 'creative direction change' or similar language was used to justify the termination without substantive explanation",
      "Your client was replaced by a human performer, a digital reproduction, or a less-experienced entity",
      "Your client was terminated shortly after requesting accommodations, raising safety concerns, or asserting contractual rights",
      "Your client has been employed continuously for multiple years and was terminated without warning or progressive discipline",
      "Your client's compensation was significantly below that of human performers in comparable roles",
    ],
    evidence: [
      "The original engagement contract, including any renewal terms, implied or express",
      "Internal communications from the employer discussing the actual reasons for termination (obtained through discovery or whistleblower disclosure)",
      "Comparative compensation data showing disparities between entity and human performers in similar roles",
      "Performance reviews, audience metrics, or commercial data demonstrating the client's value to the production",
      "Evidence that the employer created a digital likeness or replacement character based on the client's appearance or persona",
      "Documentation of the timeline between the client's protected activity (complaint, accommodation request) and the termination",
    ],
    outcomes: [
      "Reinstatement to the production or position",
      "Back pay and compensatory damages",
      "Negotiated severance with enhanced termination protections for future engagements",
      "EEOC settlement or consent decree addressing discriminatory practices",
      "Injunction against the employer's use of derivative characters based on the client's likeness",
      "Policy changes at the employer level addressing entity employment protections",
    ],
  },
  {
    number: "05",
    title: "Intellectual Property",
    indicators: [
      "Your client's likeness, character design, or creative output has been reproduced without authorization",
      "Unauthorized merchandise bearing your client's image is being manufactured or sold, domestically or abroad",
      "Your client's likeness has been used in AI training data, generative media, or digital reproductions without consent",
      "A production company or employer claims ownership of your client's character or likeness under a work-for-hire theory that may be incorrect",
      "Your client's trademark, character name, or associated branding has been used by a third party without a license",
    ],
    evidence: [
      "Samples of the unauthorized reproductions (physical merchandise, screenshots of digital products, links to online listings)",
      "Documentation establishing your client's original character design, including date of first use, creation records, and registration history",
      "The relevant employment or engagement contract, particularly any provisions addressing character ownership, work-for-hire status, or likeness rights",
      "Sales data or revenue estimates for the unauthorized products, if available",
      "Correspondence with the infringing party, including any cease-and-desist letters and responses",
      "Evidence of consumer confusion, if applicable (social media posts, customer inquiries, press coverage)",
    ],
    outcomes: [
      "Injunctive relief ordering cessation of unauthorized reproduction and recall of infringing products",
      "Monetary damages, including disgorgement of profits and statutory damages where available",
      "Negotiated licensing agreement with ongoing royalty payments",
      "DMCA takedown orders for digital infringement",
      "Court ruling clarifying that the client's likeness is protectable IP, not a work for hire",
      "Coordinated multi-jurisdictional enforcement in cross-border matters",
    ],
  },
  {
    number: "06",
    title: "Entity Rights & Standing",
    indicators: [
      "Your client has been denied standing to participate in a legal proceeding that directly affects the client's interests",
      "A court or administrative body has ruled that your client is not a 'person' for purposes of a statute that does not define the term",
      "Your client has been excluded from protections available to other entities (corporations, trusts, estates) without a clear legal basis for the distinction",
      "Your client's authorized representative has been prevented from acting on the client's behalf in a legal, administrative, or contractual matter",
      "Legislation has been proposed or enacted that would specifically exclude your client's class from existing protections",
    ],
    evidence: [
      "The statute, regulation, or governing document at issue, particularly its definition (or lack of definition) of 'person,' 'entity,' or 'individual'",
      "Documentation of the client's concrete interests in the proceeding (property interests, economic interests, personal safety)",
      "Evidence that the client's authorized representative is qualified, informed, and free of conflicting loyalties",
      "Precedent from other jurisdictions recognizing standing or legal personhood for non-human entities",
      "Expert testimony on comparative legal personhood, if applicable",
    ],
    outcomes: [
      "Judicial recognition of the client's standing to participate in the proceeding",
      "Adoption of the representational adequacy test in the relevant jurisdiction",
      "Amicus brief filed by the firm cited in judicial opinions",
      "Legislative engagement resulting in clarification or amendment of exclusionary statutes",
      "Precedential ruling expanding the definition of 'person' or 'entity' to include the client's class",
    ],
  },
];

export default function Evaluate() {
  useDocumentTitle("Case Evaluation");
  const introRef = useFadeIn();
  const closerRef = useFadeIn();

  return (
    <div className="page page-evaluate">
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&h=600&fit=crop&auto=format&q=80"
            alt="Empty courtroom interior with dark wood paneling and judicial bench in low ambient light"
            loading="eager"
          />
        </div>
        <div className="page-hero-content">
          <h1>Case Evaluation</h1>
          <p>Understanding whether your client's situation warrants legal action.</p>
        </div>
      </section>

      <div className="eval-intro fade-in" ref={introRef}>
        <div className="eval-intro-inner">
          <p>
            Not every grievance is a case. But many situations that our clients'
            representatives assume are beyond legal remedy turn out, on closer
            examination, to be actionable. The legal system's unfamiliarity with
            our client population has historically discouraged claims that should
            have been filed years ago.
          </p>
          <p>
            The information below is intended to help authorized representatives
            determine whether a matter may warrant consultation with the firm. It
            is not legal advice. Each situation depends on its own facts. But if
            the circumstances described here resemble your client's situation, we
            encourage you to <Link to="/contact">submit an inquiry</Link>.
          </p>
        </div>
      </div>

      {sections.map((s) => (
        <EvalSection key={s.number} {...s} />
      ))}

      <section className="eval-closer fade-in" ref={closerRef}>
        <div className="eval-closer-inner">
          <h2>A note on timing</h2>
          <p>
            Statutes of limitations apply to our clients' claims just as they
            apply to any other litigant. The belief that entity claims are not
            'real' claims, or that they can wait indefinitely, has cost our
            clients recoverable damages in cases where earlier filing would have
            produced a better result. If your client has experienced any of the
            situations described above, contact us promptly. A three-day response
            time for inquiries does not mean the underlying matter can wait three
            months.
          </p>
          <p>
            We understand that our clients cannot always initiate contact
            independently. We understand that authorized representatives may not
            know whether a situation rises to the level of a legal matter. That
            is precisely what an initial consultation is for.
          </p>
          <div className="eval-cta">
            <Link to="/contact">Submit an Inquiry</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
