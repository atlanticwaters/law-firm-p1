import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import matters from "../data/results";

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
