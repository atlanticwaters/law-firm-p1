import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page Not Found");

  return (
    <div className="page page-not-found">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1>Page Not Found</h1>
        </div>
      </section>

      <div style={{
        maxWidth: "var(--max-width)",
        margin: "0 auto",
        padding: "var(--space-3xl) var(--space-xl)",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.25rem",
          color: "var(--color-text-dark)",
          marginBottom: "var(--space-md)",
        }}>
          The page you are looking for is not currently in the production.
        </p>
        <p style={{
          fontSize: "0.9375rem",
          color: "var(--color-text-light)",
          marginBottom: "var(--space-2xl)",
        }}>
          It may have been removed, or the URL may be incorrect.
        </p>
        <Link
          to="/"
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--color-accent)",
            textDecoration: "none",
            borderBottom: "1px solid var(--color-accent)",
            paddingBottom: "2px",
          }}
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
