import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const matters = [
  {
    slug: "hoa-fraud-defense",
    description:
      "Defense of a foam entity against fraud claims stemming from a six-year HOA board tenure. Plaintiff claimed client operated without legal authority.",
    type: "Puppet Defense",
    outcome:
      "All claims dismissed. Plaintiff sanctioned for filing frivolous matter.",
  },
  {
    slug: "wrongful-termination-hand-puppet",
    description:
      "Wrongful termination claim on behalf of a hand puppet terminated from a children's television production after 11 years. Producer claimed \"creative direction change.\"",
    type: "Wrongful Termination",
    outcome: "Settlement: confidential. Client returned to production.",
  },
  {
    slug: "attributed-speech-defamation",
    description:
      "Attributed speech defamation claim. Handler publicly blamed client for statements client did not consent to make.",
    type: "Defamation Defense",
    outcome:
      "Judgment for client. Handler ordered to issue public retraction.",
  },
  {
    slug: "cross-border-likeness-rights",
    description:
      "Cross-border likeness rights claim. Client's character reproduced in six countries without authorization or compensation.",
    type: "Intellectual Property",
    outcome:
      "Injunction granted across all six jurisdictions. Licensing agreement executed.",
  },
  {
    slug: "entity-personhood-amicus",
    description:
      "Entity personhood amicus brief in state appellate proceeding. Question: whether client constitutes a \"person\" for purposes of standing in civil proceedings.",
    type: "Personhood",
    outcome:
      "Proceeding ongoing. Firm's brief cited by two circuit judges.",
  },
  {
    slug: "marionette-personal-injury-defense",
    description:
      "Defense of marionette client against personal injury claims arising from a 2019 incident at a private event. Plaintiff claimed client acted intentionally.",
    type: "Puppet Defense — PI",
    outcome: "Verdict for client. Court found strings, not agency.",
  },
];

export default function Results() {
  useDocumentTitle("Selected Representations");
  const tableRef = useFadeIn();

  return (
    <div className="page page-results">
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="/images/courtroom.jpg"
            alt="Empty courtroom interior with dark wood paneling, witness stand, and judicial bench in low ambient light"
            loading="eager"
          />
        </div>
        <div className="page-hero-content">
          <h1>Selected Representations</h1>
          <p>Client names are withheld per confidentiality agreement.</p>
        </div>
      </section>

      <div className="results-table-wrap fade-in" ref={tableRef}>
        <table className="results-table">
          <thead>
            <tr>
              <th scope="col">Matter</th>
              <th scope="col">Type</th>
              <th scope="col">Outcome</th>
            </tr>
          </thead>
          <tbody>
            {matters.map((m) => (
              <tr key={m.slug}>
                <td>
                  <Link to={`/results/${m.slug}`} className="results-matter-link">
                    {m.description}
                  </Link>
                </td>
                <td><span className="results-type">{m.type}</span></td>
                <td>{m.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="results-disclaimer">
        Results depend on individual facts and circumstances. Prior results do
        not guarantee future outcomes.
      </p>
    </div>
  );
}
