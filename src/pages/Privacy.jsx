import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Privacy() {
  useDocumentTitle("Privacy Policy");

  return (
    <div className="page page-privacy">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1>Privacy Policy</h1>
        </div>
      </section>

      <div className="privacy-body">
        <h2>Introduction</h2>
        <p>
          Glover, Mast &amp; Purl LLP ("the Firm," "we," "our") is committed to
          protecting the privacy of all individuals and entities who interact
          with our website and services. This Privacy Policy describes how we
          collect, use, and protect information provided through
          glovermastpurl.com.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect information you voluntarily provide when submitting an
          inquiry through our contact form, including:
        </p>
        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Nature of the legal matter</li>
          <li>Description of the matter as provided in the inquiry form</li>
        </ul>
        <p>
          We do not collect information through cookies, tracking pixels, or
          third-party analytics services. We do not use advertising technologies.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          Information submitted through our contact form is used solely for the
          purpose of evaluating and responding to your legal inquiry. We do not
          sell, share, or distribute your information to third parties. Your
          information is treated with the same confidentiality standards we apply
          to all client communications.
        </p>

        <h2>Attorney-Client Privilege</h2>
        <p>
          Submitting an inquiry through our website does not establish an
          attorney-client relationship. An attorney-client relationship is
          formed only upon the Firm's explicit written acceptance of
          representation. However, all inquiries are treated as confidential
          and are not disclosed to third parties.
        </p>

        <h2>Data Retention</h2>
        <p>
          Inquiry data is retained for a period necessary to respond to your
          inquiry and for our internal records. If no attorney-client
          relationship is established, inquiry data is securely deleted within
          twelve months of our final communication.
        </p>

        <h2>Security</h2>
        <p>
          We employ industry-standard security measures to protect the
          information submitted through our website. Inquiry form submissions
          are encrypted in transit using TLS. We maintain strict internal access
          controls consistent with our obligations under applicable rules of
          professional conduct.
        </p>

        <h2>Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of any personal
          information we hold about you by contacting us at{" "}
          <a href="mailto:inquiries@glovermastpurl.com">
            inquiries@glovermastpurl.com
          </a>
          . We will respond to such requests within thirty days.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated effective date. Your continued use
          of the website constitutes acceptance of any changes.
        </p>

        <h2>Contact</h2>
        <p>
          For questions regarding this Privacy Policy, please contact us at{" "}
          <a href="mailto:inquiries@glovermastpurl.com">
            inquiries@glovermastpurl.com
          </a>
          .
        </p>

        <p style={{ marginTop: "var(--space-2xl)", color: "var(--color-muted)", fontSize: "0.8125rem" }}>
          Effective date: January 1, 2024. Last updated: April 2026.
        </p>
      </div>
    </div>
  );
}
