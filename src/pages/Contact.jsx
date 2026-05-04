import { useState } from "react";
import { useFadeIn } from "../hooks/useFadeIn";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Contact() {
  useDocumentTitle("Submit an Inquiry");
  const formRef = useFadeIn();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    nature: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, POST to Formspree or backend endpoint
    setSubmitted(true);
  };

  return (
    <div className="page page-contact">
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="/images/office-tower.jpg"
            alt="Glass and steel office tower facade reflecting overcast sky, converging vertical lines viewed from street level"
            loading="eager"
          />
        </div>
        <div className="page-hero-content">
          <h1>Submit an Inquiry</h1>
        </div>
      </section>

      <div className="contact-body fade-in" ref={formRef}>
        <div className="contact-info">
          <p>
            Glover, Mast &amp; Purl does not accept walk-in consultations.
            All matters begin with a written inquiry.
          </p>
          <p>
            To submit an inquiry, complete the form. Please describe the matter
            in general terms, the nature of your client's situation, and the
            relief sought. A member of the firm will respond within three
            business days.
          </p>
          <p>
            We request that you not submit sensitive client information via this
            form. A secure channel will be provided upon initial response.
          </p>
          <div className="contact-note">
            <p>
              <strong>Please note:</strong> We represent puppet entities
              exclusively. We do not represent human plaintiffs, handlers acting
              in their individual capacity, puppet manufacturers, felt
              distributors, or any party whose interests are adverse to those of
              a puppet client. If you are unsure whether your matter is
              appropriate for our firm, submit an inquiry and we will advise.
            </p>
          </div>
          <div className="contact-offices">
            <p>Offices: New York &middot; London &middot; Geneva</p>
            <p>All meetings by appointment.</p>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="form-success">
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>
                Inquiry received.
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-text-light)" }}>
                A member of the firm will respond within three business days.
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="nature">Nature of Matter</label>
                <input
                  type="text"
                  id="nature"
                  name="nature"
                  value={form.nature}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Describe the Matter Briefly</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="If you are not the client, please indicate who is operating on the client's behalf."
                />
              </div>
              <button type="submit" className="form-submit">
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
