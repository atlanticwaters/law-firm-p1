import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const entityTypes = [
  { type: "Hand and glove entities", pct: 28 },
  { type: "Marionette and string entities", pct: 22 },
  { type: "Felt and fabric entities", pct: 19 },
  { type: "Rod-operated entities", pct: 12 },
  { type: "Ventriloquist figures", pct: 11 },
  { type: "Shadow and silhouette entities", pct: 5 },
  { type: "Other or unclassified", pct: 3 },
];

const milestones = [
  { year: "1994", text: "Firm founded by Reginald H. Glover after identifying systemic exclusion of facilitated-speech entities from legal representation." },
  { year: "1996", text: "Victoria C. Mast joins as named partner, establishing the firm's attributed speech practice." },
  { year: "1998", text: "In Re: The Castellan Matter decided. First judicial recognition that physical co-location with speech does not establish authorship. Attributed Speech Doctrine born." },
  { year: "2001", text: "Winston A. Purl joins the firm from London, opening the international entity rights practice." },
  { year: "2006", text: "Firm files its first amicus brief in a state personhood proceeding." },
  { year: "2012", text: "Petrov v. Unnamed Entertainment Entity. Second Circuit extends attributed speech doctrine to promotional appearances and social media." },
  { year: "2015", text: "Publication of Mr. Purl's monograph, Beyond the Hand: Legal Personhood in the Age of Puppet Proliferation." },
  { year: "2018", text: "Serena Nap joins as the firm's first dedicated employment law associate. Fourteen EEOC complaints will follow over the next six years." },
  { year: "2019", text: "Theodore Scrim and Harriet Weft join the firm. IP and personhood practices expand." },
  { year: "2021", text: "Cross-border likeness rights enforcement: injunctions obtained in six jurisdictions within three weeks." },
  { year: "2022", text: "Verdict for client in marionette personal injury defense. Court finds 'strings, not agency.'" },
  { year: "2023", text: "Firm's amicus brief cited by New York Law Journal as one of the 'Ten Most Significant Filings' of the year." },
  { year: "2024", text: "Entity personhood amicus brief cited by two appellate judges. Proceeding ongoing." },
];

export default function Community() {
  useDocumentTitle("Community & Pro Bono");
  const deiRef = useFadeIn();
  const statsRef = useFadeIn();
  const probonoRef = useFadeIn();
  const timelineRef = useFadeIn();
  const accessRef = useFadeIn();

  return (
    <div className="page page-community">
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?w=1600&h=600&fit=crop&auto=format&q=80"
            alt="Neoclassical stone columns photographed from below against overcast sky"
            loading="eager"
          />
        </div>
        <div className="page-hero-content">
          <h1>Community &amp; Pro Bono</h1>
          <p>The firm's obligations extend beyond its paying clients.</p>
        </div>
      </section>

      {/* DEI Statement */}
      <section className="community-section fade-in" ref={deiRef}>
        <div className="community-section-inner">
          <div className="section-label">Commitment to Client Diversity</div>
          <div className="community-text">
            <p>
              Glover, Mast & Purl represents the full spectrum of the
              facilitated-speech entity community. The firm does not limit its
              practice to any single entity type, operational configuration, or
              material composition. We have represented clients constructed from
              foam, felt, wood, fabric, latex, silicone, paper, and composite
              materials. We have represented clients who are operated by hand,
              by rod, by string, by breath, and by shadow. We have represented
              clients ranging in age from three months to ninety-four years.
            </p>
            <p>
              This breadth of representation is deliberate. The legal challenges
              faced by a hand-operated entity differ meaningfully from those
              faced by a string-operated marionette, and both differ from those
              encountered by a ventriloquist figure whose handler speaks in a
              public forum. Each operational type presents distinct questions of
              agency, consent, and liability. The firm's expertise spans all of
              them.
            </p>
            <p>
              We recognize that within the entity community, some groups face
              compounded disadvantage. Shadow entities and silhouette performers,
              whose very existence is contingent on specific lighting conditions,
              have historically had the least access to legal counsel. Rod
              entities whose operational mechanisms are visible to audiences face
              particular prejudice in liability proceedings. The firm has made a
              deliberate effort to ensure these populations are represented in
              its caseload and in its pro bono commitments.
            </p>
          </div>
        </div>
      </section>

      {/* Entity Type Breakdown */}
      <section className="community-stats fade-in" ref={statsRef}>
        <div className="community-stats-inner">
          <div className="section-label">Client Representation by Entity Type</div>
          <p className="community-stats-note">Cumulative client base, 1994 to present.</p>
          <div className="entity-type-grid">
            {entityTypes.map((e) => (
              <div className="entity-type-row" key={e.type}>
                <div className="entity-type-label">{e.type}</div>
                <div className="entity-type-bar-wrap">
                  <div
                    className="entity-type-bar"
                    style={{ width: `${e.pct}%` }}
                  />
                </div>
                <div className="entity-type-pct">{e.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Bono */}
      <section className="community-section community-probono fade-in" ref={probonoRef}>
        <div className="community-section-inner">
          <div className="section-label">Pro Bono Practice</div>
          <div className="community-text">
            <p>
              The firm commits a minimum of 200 pro bono hours annually to the
              representation of entity clients who cannot afford private counsel.
              This commitment is not aspirational. It is a standing allocation,
              tracked and reported internally on a quarterly basis.
            </p>
            <p>
              Pro bono matters at this firm present a particular challenge. Many
              entity clients who qualify for pro bono representation lack not
              only financial resources but an authorized representative to act
              on their behalf. In these cases, the firm must first identify and
              qualify a representative before substantive legal work can begin.
              This process, while time-consuming, is essential. An entity
              without a representative is an entity without a voice in any
              sense of the word.
            </p>
            <p>
              In 2016, Reginald Glover received the New York State Bar
              Association's Pro Bono Service Award for the firm's work
              representing indigent entity clients in housing, employment, and
              custody-adjacent disputes. He accepted the award. He did not give
              a speech.
            </p>
            <p>
              Referrals for pro bono representation may be submitted through
              the firm's standard{" "}
              <Link to="/contact">inquiry process</Link>. Please indicate that
              the client lacks financial resources and, if applicable, that the
              client lacks an authorized representative. We will respond within
              three business days.
            </p>
          </div>
        </div>
      </section>

      {/* Firm History Timeline */}
      <section className="community-timeline fade-in" ref={timelineRef}>
        <div className="community-timeline-inner">
          <div className="section-label">Firm History</div>
          <div className="timeline">
            {milestones.map((m) => (
              <div className="timeline-item" key={m.year}>
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-text">{m.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Accessibility */}
      <section className="community-section fade-in" ref={accessRef}>
        <div className="community-section-inner">
          <div className="section-label">Client Accessibility</div>
          <div className="community-text">
            <p>
              The firm maintains consultation environments at each of its three
              offices designed to accommodate clients of varying physical
              configurations, material compositions, and operational
              requirements. Consultations can be arranged in standard conference
              settings, in modified environments with appropriate support
              structures, or in portable configurations for clients who cannot
              travel to firm offices.
            </p>
            <p>
              Temperature, humidity, and lighting conditions in consultation
              rooms can be adjusted for clients with material-specific
              sensitivities. Storage facilities are available for clients who
              require secure housing between proceedings. The firm does not
              charge for these accommodations.
            </p>
            <p>
              Clients who require transport assistance between the firm's
              offices and courthouses, deposition sites, or other legal venues
              should communicate these needs through their authorized
              representative at the time of engagement. The firm will arrange
              appropriate transport. Our clients arrive at proceedings in
              condition to participate. We consider this a baseline professional
              obligation, not a special service.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
