import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Home() {
  useDocumentTitle(null); // uses default site title

  const philRef = useFadeIn();
  const breakRef1 = useFadeIn();
  const practiceRef = useFadeIn();
  const resultRef = useFadeIn();
  const breakRef2 = useFadeIn();
  const perspRef = useFadeIn();
  const testRef = useFadeIn();
  const faqRef = useFadeIn();
  const contactRef = useFadeIn();

  return (
    <div className="page page-home">
      {/* ——— §1 Hero ——— */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="/images/courthouse-columns.jpg"
            alt="Neoclassical stone columns of a courthouse facade, photographed from below in dramatic monochrome"
            loading="eager"
          />
        </div>
        <div className="hero-content">
          <h1>Representation Without Reservation.</h1>
          <p className="hero-sub">
            For thirty years, Glover, Mast &amp; Purl has represented those
            the legal system overlooked.
          </p>
          <div className="hero-rule" aria-hidden="true"></div>
          <p className="hero-tagline">Our Clients Speak For Themselves.</p>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <svg viewBox="0 0 20 20">
            <polyline points="4,7 10,13 16,7" />
          </svg>
        </div>
      </section>

      {/* ——— §2 Firm Philosophy ——— */}
      <section className="philosophy fade-in" ref={philRef}>
        <div className="philosophy-inner">
          <div className="philosophy-year" aria-hidden="true">1994</div>
          <div className="philosophy-text">
            <p>
              For thirty years, this firm has represented a client population that
              the legal system was not built to serve. Our clients often cannot
              initiate contact directly. They cannot always instruct us in the
              conventional sense. They depend entirely on our judgment, our ethics,
              and our commitment to their interests.
            </p>
            <p>
              We do not find this burden unusual. We find it clarifying.
            </p>
          </div>
        </div>
      </section>

      {/* ——— Pull Quote ——— */}
      <div className="pull-quote">
        <blockquote>
          "Consent is not a complicated concept. If your client could not say
          no, they did not say yes."
        </blockquote>
        <cite>Victoria C. Mast, J.D.</cite>
      </div>

      {/* ——— Visual Break: Textile Texture ——— */}
      <div className="visual-break fade-in" ref={breakRef1}>
        <img
          src="/images/linen-texture.jpg"
          alt="Close-up of woven linen fabric in monochrome, showing the parallel threads and subtle texture of the weave"
          loading="lazy"
        />
        <span className="visual-break-caption">New York &middot; London &middot; Geneva</span>
      </div>

      {/* ——— §3 Practice Overview ——— */}
      <section className="practice-overview fade-in" ref={practiceRef}>
        <div className="practice-overview-inner">
          <div className="section-label">Practice Areas</div>
          <div className="practice-grid">
            <div className="practice-grid-item">
              <div className="practice-number">01</div>
              <h3>Puppet Defense Litigation</h3>
              <p>Defending clients against claims the legal system was never designed to evaluate fairly.</p>
            </div>
            <div className="practice-grid-item">
              <div className="practice-number">02</div>
              <h3>Handler Misconduct &amp; Abuse</h3>
              <p>Representing clients harmed by those in positions of control and trust.</p>
            </div>
            <div className="practice-grid-item">
              <div className="practice-number">03</div>
              <h3>Attributed Speech Defamation</h3>
              <p>Holding accountable those who place words in others without consent.</p>
            </div>
            <div className="practice-grid-item">
              <div className="practice-number">04</div>
              <h3>Wrongful Termination</h3>
              <p>Pursuing claims for clients terminated without cause from productions and positions.</p>
            </div>
            <div className="practice-grid-item">
              <div className="practice-number">05</div>
              <h3>Intellectual Property &amp; Likeness</h3>
              <p>Protecting creative output, character IP, and likeness rights from exploitation.</p>
            </div>
            <div className="practice-grid-item">
              <div className="practice-number">06</div>
              <h3>Entity Rights &amp; Personhood</h3>
              <p>Advancing the legal question of who counts as an entity, and why.</p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "var(--space-2xl)" }}>
            <Link
              to="/practice"
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
              View All Practice Areas
            </Link>
          </div>
        </div>
      </section>

      {/* ——— §4 Featured Result ——— */}
      <section className="featured-result fade-in" ref={resultRef}>
        <div className="featured-result-inner">
          <div className="section-label">Selected Representation</div>
          <h2>
            Wrongful termination claim on behalf of a hand puppet terminated from
            a children's television production after eleven years. Producer claimed
            "creative direction change."
          </h2>
          <div className="featured-result-meta">
            Settlement: Confidential &middot; Client returned to production
          </div>
        </div>
      </section>

      {/* ——— Visual Break: Legal / Architectural ——— */}
      <div className="visual-break fade-in" ref={breakRef2}>
        <img
          src="/images/legal-volumes.jpg"
          alt="Rows of leather-bound legal volumes on dark wooden library shelves, spines aligned and embossed with gold text"
          loading="lazy"
        />
        <span className="visual-break-caption">Established 1994</span>
      </div>

      {/* ——— §5 Perspectives Preview ——— */}
      <section className="perspectives-preview fade-in" ref={perspRef}>
        <div className="perspectives-preview-inner">
          <div className="section-label">Perspectives</div>
          <div className="perspectives-grid">
            <div className="perspective-card">
              <h3>
                <Link to="/perspectives/attributed-speech-limits-of-agency">
                  Attributed Speech and the Limits of Agency: A Primer
                </Link>
              </h3>
              <div className="perspective-author">Victoria C. Mast, J.D.</div>
              <div className="perspective-pub">Puppet Entity Law Review, Vol. 12</div>
            </div>
            <div className="perspective-card">
              <h3>
                <Link to="/perspectives/entity-standing-post-personhood">
                  Who May Sue? Entity Standing in the Post-Personhood Era
                </Link>
              </h3>
              <div className="perspective-author">Winston A. Purl, LLM</div>
              <div className="perspective-pub">Harvard Law Review (forthcoming)</div>
            </div>
            <div className="perspective-card">
              <h3>
                <Link to="/perspectives/handler-problem-vicarious-liability">
                  The Handler Problem: Rethinking Vicarious Liability
                </Link>
              </h3>
              <div className="perspective-author">Reginald H. Glover, Esq.</div>
              <div className="perspective-pub">Internal publication</div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Testimonials ——— */}
      <section className="testimonials fade-in" ref={testRef}>
        <div className="testimonials-inner">
          <div className="section-label">On Behalf of Our Clients</div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-type">HOA Fraud Defense — Foam Entity</div>
              <blockquote>
                "The firm understood our situation immediately and without the
                skepticism we had encountered elsewhere. Every claim against our
                client was dismissed. We would not work with any other firm."
              </blockquote>
              <div className="testimonial-attribution">
                Submitted by authorized representative
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-type">Wrongful Termination — Marionette</div>
              <blockquote>
                "After eleven years, they said it was a 'creative direction change.'
                We knew what it was. Glover, Mast &amp; Purl knew what it was. Our
                client is back at work. The settlement is confidential. We are satisfied."
              </blockquote>
              <div className="testimonial-attribution">
                Submitted by authorized representative
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-type">Defamation — Ventriloquist Dummy</div>
              <blockquote>
                "He said everything that happened was the puppet's fault. For the
                first time, someone in the legal system asked: but did the puppet
                consent to say it? The answer was no. The court agreed."
              </blockquote>
              <div className="testimonial-attribution">
                Submitted by authorized representative
              </div>
            </div>
          </div>
          <p style={{
            fontSize: "0.75rem",
            color: "var(--color-muted)",
            fontStyle: "italic",
            textAlign: "center",
            marginTop: "var(--space-xl)",
          }}>
            The above testimonials were submitted on behalf of clients by
            authorized representatives. The firm's clients cannot submit
            testimonials independently.
          </p>
        </div>
      </section>

      {/* ——— FAQ ——— */}
      <section className="faq fade-in" ref={faqRef}>
        <div className="faq-inner">
          <div className="section-label">Frequently Asked Questions</div>
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-question">
                What types of clients does Glover, Mast &amp; Purl represent?
              </div>
              <div className="faq-answer">
                We represent a specific and underserved client population that has,
                historically, been denied meaningful access to legal counsel. We do
                not discuss the specifics of our client base beyond what is necessary.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                Are your attorneys available to meet in person?
              </div>
              <div className="faq-answer">
                Initial consultations are conducted in writing. We find this produces
                better outcomes for all parties. In-person meetings are arranged on a
                matter-by-matter basis, by appointment, at a location of the firm's
                choosing.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                Are your attorneys human?
              </div>
              <div className="faq-answer">
                Our attorneys are members in good standing of the New York Bar, the
                D.C. Bar, and the England &amp; Wales roll of solicitors. We consider
                that question answered.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                Do you work with opposing counsel who represents human plaintiffs?
              </div>
              <div className="faq-answer">
                We do. It tends to resolve matters efficiently.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                How do I submit an inquiry on behalf of a client?
              </div>
              <div className="faq-answer">
                Complete the <Link to="/contact">inquiry form</Link>. A member of
                the firm will respond within three business days. Please submit the
                inquiry in writing on behalf of your client. We understand that
                clients may not be able to submit inquiries independently.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— §6 Contact Prompt ——— */}
      <section className="contact-prompt fade-in" ref={contactRef}>
        <p>To discuss a matter, submit a written inquiry.</p>
        <Link to="/contact">Submit an Inquiry</Link>
      </section>
    </div>
  );
}
