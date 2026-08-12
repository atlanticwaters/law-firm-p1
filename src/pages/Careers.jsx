import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import CareersForm from "../components/CareersForm";

const positions = [
  {
    title: "Associate, Entity Defense Litigation",
    location: "New York",
    type: "Full-time",
    description: "The firm seeks a litigation associate with 3-5 years of experience to join its puppet defense practice. The associate will handle all phases of civil litigation, from pre-suit investigation through trial, on behalf of entity defendants in state and federal courts. Candidates should have strong deposition skills and be comfortable taking testimony from witnesses whose accounts of entity conduct may reflect fundamental misunderstandings of how the defendant operates. Prior experience with entity clients is not required but is valued.",
    requirements: [
      "J.D. from an accredited law school; admission to the New York Bar or eligibility for admission",
      "3-5 years of civil litigation experience, preferably in defense-side personal injury, fraud, or defamation matters",
      "Demonstrated ability to manage a caseload independently while coordinating with senior partners on strategy",
      "Comfort advocating for clients who cannot attend depositions, provide verbal instructions, or offer real-time feedback during proceedings",
      "Willingness to develop expertise in the biomechanical and structural characteristics relevant to the firm's client population",
      "Strong legal writing and oral advocacy skills",
    ],
  },
  {
    title: "Associate, Employment & Entity Rights",
    location: "New York",
    type: "Full-time",
    description: "The firm seeks an associate with 2-4 years of employment law experience to support its wrongful termination and entity rights practices. The associate will draft EEOC complaints, conduct discovery in employment discrimination matters, and contribute to the firm's amicus brief program. This position involves close collaboration with partners across multiple practice areas and offers significant client-facing responsibility early in tenure.",
    requirements: [
      "J.D. from an accredited law school; admission to the New York Bar",
      "2-4 years of employment law experience, preferably including EEOC proceedings and federal employment litigation",
      "Experience with pattern-and-practice discrimination claims is strongly preferred",
      "Comfort working on behalf of clients whose employment grievances may not be immediately legible to tribunals unfamiliar with entity labor issues",
      "Aptitude for quantitative analysis; the firm's employment practice relies heavily on data-driven case evaluation",
      "Interest in the intersection of employment law, civil rights, and emerging questions of entity personhood",
    ],
  },
  {
    title: "Legal Secretary / Client Liaison",
    location: "New York",
    type: "Full-time",
    description: "The firm seeks an experienced legal secretary to provide administrative support to the partners and associates and to serve as a point of contact for clients and their authorized representatives. This role requires discretion, organizational skill, and a professional demeanor. The successful candidate will manage correspondence, schedule consultations, and coordinate the logistics of client interactions, which may involve accommodations not typically required in general legal practice.",
    requirements: [
      "5+ years of experience as a legal secretary, paralegal, or legal administrative assistant in a litigation-focused law firm",
      "Excellent written and verbal communication skills",
      "Ability to communicate effectively with authorized representatives who are acting on behalf of clients who cannot correspond independently",
      "Comfort with the physical presence of clients during office consultations; familiarity with the firm's client population is helpful but not required",
      "Proficiency in legal document management, calendaring, and court filing systems",
      "Unimpeachable discretion regarding client identity and case details",
    ],
  },
  {
    title: "Research Fellow, Entity Personhood (12-month term)",
    location: "New York / Remote",
    type: "Fellowship",
    description: "The firm offers a 12-month research fellowship for a recent law graduate or doctoral candidate with a background in legal theory, comparative law, or philosophy of law. The fellow will contribute to the firm's ongoing scholarship on entity personhood, support the amicus brief program, and assist with the preparation of Mr. Purl's forthcoming monograph on standing and non-human agency. This is not a litigation position. It is a research and writing position with the potential to shape a rapidly evolving area of law.",
    requirements: [
      "J.D., LLM, or doctoral candidacy in law, philosophy, or a related discipline",
      "Demonstrated research interest in legal personhood, non-human rights, comparative entity law, or related topics",
      "Exceptional legal writing ability; writing samples will be evaluated closely",
      "Ability to work independently on long-term research projects while meeting interim deadlines",
      "Familiarity with the firm's published scholarship is expected; candidates who have not read Mr. Purl's monograph or Ms. Mast's foundational article will not be competitive",
      "The fellow will interact with clients and their representatives in the course of research; professional sensitivity to the firm's client population is essential",
    ],
  },
];

export default function Careers() {
  useDocumentTitle("Careers");
  const introRef = useFadeIn();
  const valuesRef = useFadeIn();

  return (
    <div className="page page-careers">
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&h=600&fit=crop&auto=format&q=80"
            alt="Neoclassical building facade with carved stone entablature and fluted columns"
            loading="eager"
          />
        </div>
        <div className="page-hero-content">
          <h1>Working at the Firm</h1>
          <p>Positions for attorneys and staff who find this work necessary.</p>
        </div>
      </section>

      <div className="careers-intro fade-in" ref={introRef}>
        <div className="careers-intro-inner">
          <p>
            Glover, Mast & Purl does not recruit. The attorneys and staff who
            work here sought out the firm because they recognized that its client
            population was underserved and that the work required a particular
            kind of commitment. We continue to hire on this basis.
          </p>
          <p>
            We do not expect candidates to arrive with prior experience in entity
            law. We do expect them to arrive with the conviction that this work
            matters, the humility to learn a field that no law school teaches
            adequately, and the professional discipline to represent clients
            whose interests must often be inferred rather than stated.
          </p>
          <p>
            Compensation is competitive with peer firms in Manhattan. Benefits
            include health insurance, retirement contributions, and a continuing
            legal education budget. We do not offer signing bonuses, summer
            associate programs, or branded merchandise. We offer the work.
          </p>
        </div>
      </div>

      <div className="careers-expectations fade-in" ref={valuesRef}>
        <div className="careers-expectations-inner">
          <div className="section-label">What We Ask</div>
          <div className="careers-values-grid">
            <div className="careers-value">
              <h3>Client Sensitivity</h3>
              <p>
                Our clients cannot always attend meetings, provide verbal
                instructions, review documents, or express satisfaction with
                case outcomes. Attorneys and staff must be comfortable
                advocating for clients whose participation in the
                attorney-client relationship differs from what other firms
                consider standard.
              </p>
            </div>
            <div className="careers-value">
              <h3>Representative Collaboration</h3>
              <p>
                Communication with clients is conducted through authorized
                representatives. Attorneys must develop productive working
                relationships with representatives while maintaining independent
                professional judgment about the client's best interests, which
                may not always align with the representative's preferences.
              </p>
            </div>
            <div className="careers-value">
              <h3>Physical Accommodation</h3>
              <p>
                Client consultations sometimes require physical accommodations
                that are not typical in general legal practice. The firm
                maintains consultation environments suitable for clients of
                varying physical configurations and operational requirements.
                Staff should be prepared to work in these environments without
                discomfort or condescension.
              </p>
            </div>
            <div className="careers-value">
              <h3>Institutional Patience</h3>
              <p>
                Many of the firm's most consequential matters take years to
                resolve. The personhood cases, the amicus program, and the
                ongoing development of entity rights doctrine all require
                attorneys who measure their careers in decades, not billing
                cycles. We are building something. It is not finished.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="careers-positions">
        <div className="careers-positions-inner">
          <div className="section-label">Current Openings</div>
          {positions.map((pos, i) => {
            const ref = useFadeIn();
            return (
              <article className="career-listing fade-in" ref={ref} key={i}>
                <div className="career-listing-header">
                  <h2>{pos.title}</h2>
                  <div className="career-listing-meta">
                    <span>{pos.location}</span>
                    <span>{pos.type}</span>
                  </div>
                </div>
                <p className="career-listing-description">{pos.description}</p>
                <h3>Requirements</h3>
                <ul className="career-requirements">
                  {pos.requirements.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>

      <div className="careers-apply">
        <div className="careers-apply-inner">
          <h2>To Apply</h2>
          <p>
            Submit a cover letter, resume, and writing sample to{" "}
            <a href="mailto:inquiries@glovermastpurl.com">inquiries@glovermastpurl.com</a>{" "}
            with the position title in the subject line. Writing samples should
            demonstrate analytical rigor and clarity. We do not accept
            applications through third-party recruiting platforms.
          </p>
          <p>
            Candidates who require accommodations during the application process
            should note this in their cover letter. The firm can arrange
            interviews in accessible formats, including written exchanges,
            recorded submissions, and consultations conducted through an
            authorized representative. In-person interviews are not required
            for any position. We recognize that not all qualified candidates
            can attend a conventional interview, produce a handwritten
            signature, or operate standard office equipment, and we do not
            treat these as barriers to employment.
          </p>
          <p>
            Application materials submitted on behalf of a candidate by an
            authorized representative are accepted and evaluated on the same
            basis as materials submitted directly. Please indicate the
            relationship between the representative and the candidate in the
            cover letter. We understand that some candidates may not be in a
            position to submit materials independently.
          </p>
          <p>
            The firm does not discriminate on the basis of race, gender, national
            origin, sexual orientation, disability, age, entity status, material
            composition, operational type, or method of articulation. All
            candidates are evaluated on qualifications, professional competence,
            and commitment to the firm's client population.
          </p>
        </div>
      </div>

      <div className="careers-form">
        <div className="careers-form-inner">
          <CareersForm />
        </div>
      </div>
    </div>
  );
}
