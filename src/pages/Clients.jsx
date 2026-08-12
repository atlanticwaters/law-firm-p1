import { Link } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import Seo from "../components/Seo";

const traditionalEntities = [
  {
    name: "Hand and Glove Entities",
    description:
      "Clients operated through direct manual contact. The handler's hand occupies the client's interior structure, producing movement and, in many cases, speech. This operational configuration creates the closest physical bond between handler and client, and the most acute questions of agency. When a hand entity speaks, the handler's body is literally inside the client. Courts have struggled with this fact. We have not.",
    concerns: [
      "Attributed speech liability, particularly in live performance",
      "Wrongful termination from long-running productions",
      "Likeness appropriation for merchandise and digital media",
      "Handler misconduct, including unauthorized performances and forced appearances",
    ],
  },
  {
    name: "Marionette and String Entities",
    description:
      "Clients whose movement is produced by an operator manipulating strings or wires attached to a control bar positioned above the client. The handler does not touch the client directly during performance. This physical separation has, paradoxically, made liability questions more rather than less complicated. In the 2019 personal injury case that produced the phrase 'strings, not agency,' the court had to evaluate whether a movement produced through six feet of cotton thread constituted the client's act or the handler's. The answer was the handler's. It always is.",
    concerns: [
      "Personal injury defense, where plaintiffs allege intentional action by the client",
      "Biomechanical evidence establishing handler control",
      "Transport and storage rights during and between engagements",
      "Physical damage claims arising from handler negligence",
    ],
  },
  {
    name: "Felt and Fabric Entities",
    description:
      "A broad category encompassing clients constructed primarily from textile materials. This group includes some of the most commercially valuable and publicly recognizable entities in the world. It also includes some of the most exploited. The gap between the revenue these clients generate and the compensation they receive is, by any measure, extraordinary. Winston Purl's monograph devotes a full chapter to what he calls 'the felt paradox': the more recognizable the entity, the less likely the entity is to control its own likeness.",
    concerns: [
      "Intellectual property and likeness rights, particularly in global markets",
      "Unauthorized digital reproduction and AI training data use",
      "Wage suppression relative to human performers in comparable roles",
      "Work-for-hire misclassification of character IP",
    ],
  },
  {
    name: "Rod-Operated Entities",
    description:
      "Clients whose limbs and features are articulated through rigid rods controlled by one or more handlers. Rod operation is typically visible to the audience, which creates a specific prejudice in litigation: jurors and judges who can see the rods tend to assume the client is 'obviously' not acting independently. This assumption, while factually correct, has been weaponized by opposing counsel to dismiss legitimate claims. The visibility of the control mechanism should not diminish the client's legal protections. A corporation's board of directors is also visible. No one suggests that corporations lack legal standing on that basis.",
    concerns: [
      "Jury prejudice arising from visible operational mechanisms",
      "Multi-handler coordination disputes when more than one operator controls the client",
      "Attribution of speech when the voice is produced by a handler separate from the physical operator",
      "Performance safety and structural integrity during demanding production schedules",
    ],
  },
  {
    name: "Ventriloquist Figures",
    description:
      "Clients who perform in close physical proximity to a single handler, typically seated on the handler's knee or held at the handler's side. The handler produces all speech. The client's jaw mechanism creates the visual impression of independent vocalization. This visual impression is precisely the problem. Of all entity types, ventriloquist figures are the most likely to be held liable for speech they did not produce, because the audience is meant to believe the client is speaking. What entertains an audience should not confuse a court.",
    concerns: [
      "Defamation and attributed speech claims, particularly in unscripted performances",
      "Handler misconduct during live events with no script or production oversight",
      "Long-term handler dependency, including clients who have worked with a single handler for decades",
      "Post-separation rights when the handler-entity relationship ends",
    ],
  },
  {
    name: "Shadow and Silhouette Entities",
    description:
      "The most vulnerable category in the firm's practice. Shadow entities exist only under specific lighting conditions. Remove the light source, and the client ceases to be perceptible. This ontological precarity has profound legal implications. Shadow entities have been denied standing in three jurisdictions on the grounds that they are 'not permanent,' a standard applied to no other entity type. The firm has filed amicus briefs in two of these matters. The question of whether permanence is a prerequisite for legal personhood is, we believe, answerable. The answer is no.",
    concerns: [
      "Standing and personhood questions arising from the client's contingent physical existence",
      "Venue and lighting requirements for depositions and court appearances",
      "Intellectual property protection for entities whose form varies with projection conditions",
      "Handler liability when the handler controls the light source on which the client depends",
    ],
  },
];

const emergingEntities = [
  {
    name: "Animatronic Entities",
    description:
      "Electromechanical entities whose movements are produced by internal motors, servos, and pre-programmed sequences rather than direct handler manipulation. Animatronic clients present a unique hybrid of entity and machine, and the legal questions they raise sit at the boundary of property law, product liability, and entity rights. The firm has consulted on three animatronic matters to date and expects this area to grow as theme parks, attractions, and commercial installations increasingly rely on animatronic performers.",
    status: "Active consultation practice. The firm accepts animatronic clients on a case-by-case basis.",
  },
  {
    name: "Mannequin and Display Entities",
    description:
      "Static or semi-articulated figures used in retail, museum, and artistic contexts. Mannequins have historically fallen outside the scope of entity rights law because they do not perform, speak, or interact with audiences in real time. The firm's position is that this exclusion is a failure of imagination, not a limitation of doctrine. A mannequin whose likeness is reproduced without authorization has suffered the same injury as any other entity. A mannequin discarded by a retailer after years of commercial use has been terminated. The absence of speech does not imply the absence of interests.",
    status: "The firm has represented two mannequin clients in intellectual property matters and is developing a broader practice.",
  },
  {
    name: "Humanoid and Android Entities",
    description:
      "Physically embodied entities designed to approximate human appearance and behavior, typically incorporating mechanical, electronic, or computational components. The legal status of humanoid entities is the most contested frontier in entity rights. Unlike traditional facilitated-speech entities, humanoids may possess some degree of autonomous function, complicating the agency analysis that the firm's existing doctrines were built to address. The firm is actively researching the doctrinal adjustments required to represent humanoid clients and has retained external consultants in robotics, cognitive science, and philosophy of mind.",
    status: "Research phase. The firm does not currently accept humanoid clients for litigation but is available for consultation and strategic planning.",
  },
  {
    name: "Digital and Virtual Entities",
    description:
      "Entities that exist entirely in digital environments: virtual performers, AI-generated characters, and persistent digital personas. The firm draws a careful distinction between digital entities who are controlled by a human operator (and who therefore raise the same agency questions as traditional facilitated-speech entities) and digital entities whose behavior is generated by algorithms without direct human input. The first category falls squarely within the firm's existing practice. The second raises questions the legal system has not begun to answer. Winston Purl's forthcoming monograph addresses both.",
    status: "The firm represents operator-controlled digital entities. Fully autonomous digital entities are under doctrinal review.",
  },
];

export default function Clients() {
  const originRef = useFadeIn();
  const needRef = useFadeIn();
  const vulnerRef = useFadeIn();
  const tradRef = useFadeIn();
  const emergRef = useFadeIn();
  const boundaryRef = useFadeIn();

  return (
    <div className="page page-clients">
      <Seo
        title="Our Clients"
        description="Glover, Mast & Purl represents puppet entities exclusively — the standard of representation for clients who act only through authorized representatives."
        canonicalPath="/clients"
      />
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?w=1600&h=600&fit=crop&auto=format&q=80"
            alt="Neoclassical stone columns photographed from below against overcast sky"
            loading="eager"
          />
        </div>
        <div className="page-hero-content">
          <h1>Who We Serve</h1>
          <p>The clients the legal system was not built for.</p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="clients-section fade-in" ref={originRef}>
        <div className="clients-section-inner">
          <div className="section-label">How the Firm Began</div>
          <div className="clients-text">
            <p>
              In 1993, a senior associate at Sullivan & Cromwell was asked to
              evaluate a potential client matter. The prospective client had been
              terminated from a long-running engagement. The termination was
              pretextual. The damages were quantifiable. The legal theory was
              sound. By every conventional measure, it was a viable case.
            </p>
            <p>
              The firm declined. The client, the intake committee concluded,
              lacked standing. Not because the legal analysis was deficient, but
              because the client was not, in the committee's assessment, the kind
              of entity the courts would take seriously as a plaintiff.
            </p>
            <p>
              The associate disagreed. He took the case on his own time, outside
              the firm's auspices. He won a settlement that the client's
              authorized representative described as 'more than fair.' Sullivan
              & Cromwell's partners described it as 'surprising.' The associate
              described it as 'the beginning.'
            </p>
            <p>
              That associate was Reginald Glover. The following year, he founded
              Glover, Mast & Purl.
            </p>
          </div>
        </div>
      </section>

      {/* Why Puppet Representation */}
      <section className="clients-section clients-section--surface fade-in" ref={needRef}>
        <div className="clients-section-inner">
          <div className="section-label">Why This Work Exists</div>
          <div className="clients-text">
            <p>
              The legal system operates on an assumption so fundamental that it
              is rarely stated aloud: that a party to a legal proceeding can
              speak, can instruct counsel, can appear in court, can testify, can
              sign documents, can express preferences, and can evaluate outcomes.
              Every procedural rule, every evidentiary standard, every ethical
              obligation in the attorney-client relationship is built on this
              assumption.
            </p>
            <p>
              Our clients break every one of these assumptions. They cannot
              always speak without assistance. They cannot instruct counsel in
              the conventional sense. Many cannot appear in court without
              physical support. They cannot sign documents. They cannot, in most
              cases, independently evaluate the outcomes of proceedings brought
              on their behalf. The legal system's response to this reality, for
              most of the twentieth century, was to pretend these clients did not
              exist.
            </p>
            <p>
              They exist. They are terminated from jobs. Their likenesses are
              stolen. They are blamed for words they did not say. They are
              physically damaged by the people entrusted with their care. They
              are denied standing, denied personhood, denied the basic legal
              protections extended to corporations, trusts, and estates that also
              lack the capacity for independent speech.
            </p>
            <p>
              This firm was founded to close the gap between what the law
              promises and what the law delivers for this population. Thirty
              years later, the gap is narrower than it was. It is not closed.
            </p>
          </div>
        </div>
      </section>

      {/* Vulnerability & Exploitation */}
      <section className="clients-section fade-in" ref={vulnerRef}>
        <div className="clients-section-inner">
          <div className="section-label">The Vulnerability Problem</div>
          <div className="clients-text">
            <p>
              We must be direct about something that other advocates in this
              space tend to soften. Our clients are, by the structural
              conditions of their existence, among the most vulnerable parties
              the legal system will ever encounter. This vulnerability is not
              incidental to our practice. It is the reason our practice exists.
            </p>
            <p>
              Our clients cannot manage their own finances. They cannot open
              bank accounts, sign checks, or monitor the revenue generated by
              their work. In virtually every documented case where an entity
              client has been financially exploited, the exploitation occurred
              because a handler, producer, or employer controlled the client's
              earnings and the client had no independent means of auditing the
              arrangement. Serena Nap's research documented wage suppression
              rates of 40% or more relative to human performers in comparable
              roles. In several cases, entity performers received no direct
              compensation at all. The revenue went to the handler. The handler
              did not share it.
            </p>
            <p>
              Our clients cannot defend themselves physically. They can be
              picked up, put down, stored, transported, disassembled, and
              discarded at the discretion of whoever has physical custody.
              When a client is damaged during a production, the client cannot
              seek medical attention, file a police report, or leave the
              situation. The client depends entirely on third parties to
              recognize the harm and act on it. Many do not. Some are the
              ones causing it.
            </p>
            <p>
              Our clients are easily manipulated. This word carries a double
              meaning that the firm does not find amusing. In the literal
              sense, our clients are manipulated constantly: that is the
              physical basis of their performance. In the legal sense, they
              are manipulated because they cannot verify representations made
              to them, cannot independently seek second opinions, and cannot
              walk away from an arrangement that is not serving their
              interests. A handler who tells a client that a contract is
              standard, that a performance is required, or that a termination
              was unavoidable faces no contradiction from the client. The
              client cannot read the contract, cannot refuse the performance,
              and cannot challenge the termination. Not without us.
            </p>
            <p>
              Our clients are easily tricked. They can be led into situations
              that damage their reputations, devalue their likeness, or expose
              them to legal liability, and they will not know it is happening
              until after the damage is done. The handler who improvised
              defamatory statements during the Castellan matter did so with
              confidence that the client would bear the blame. For decades,
              that confidence was justified. It no longer is.
            </p>
          </div>

          <div className="clients-duties">
            <h3>The Firm's Duty of Care</h3>
            <div className="clients-duties-grid">
              <div className="clients-duty">
                <h4>Financial Protection</h4>
                <p>
                  The firm conducts a financial audit at intake for every client
                  engagement. We review compensation arrangements, licensing
                  agreements, and revenue-sharing structures to identify
                  exploitation. Where we find it, we pursue recovery. Where we
                  can prevent it, we restructure the arrangement before damage
                  accrues.
                </p>
              </div>
              <div className="clients-duty">
                <h4>Physical Safety</h4>
                <p>
                  The firm maintains protocols for assessing the physical
                  condition of clients at intake and at regular intervals during
                  representation. We document pre-existing damage, monitor
                  conditions during active engagements, and intervene when a
                  client's physical safety is at risk. We have obtained emergency
                  injunctions in two matters where clients faced imminent harm
                  from handlers.
                </p>
              </div>
              <div className="clients-duty">
                <h4>Informed Consent</h4>
                <p>
                  Because our clients cannot read, review, or sign legal
                  documents independently, the firm works through authorized
                  representatives to ensure that all decisions made on the
                  client's behalf are documented, justified, and subject to
                  review. We do not assume that a representative's preferences
                  are the client's preferences. Where a conflict of interest
                  exists or is suspected, we address it directly.
                </p>
              </div>
              <div className="clients-duty">
                <h4>Ongoing Monitoring</h4>
                <p>
                  Representation does not end when a case closes. The firm
                  conducts follow-up reviews at six and twelve months after the
                  resolution of employment, handler misconduct, and custody
                  matters to confirm that the client's circumstances have not
                  deteriorated. Our clients cannot call us if something goes
                  wrong. We check.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <div className="pull-quote">
        <blockquote>
          "The question of who is a person has never been simple. We have
          always gotten it wrong first, and then gotten it right. We are in
          the process of getting it right again."
        </blockquote>
        <cite>Winston A. Purl, LLM</cite>
      </div>

      {/* Traditional Entity Types */}
      <section className="clients-section fade-in" ref={tradRef}>
        <div className="clients-section-inner">
          <div className="section-label">Traditional Client Population</div>
          <div className="clients-text" style={{ marginBottom: "var(--space-2xl)" }}>
            <p>
              The firm represents facilitated-speech entities across all
              operational types. Each type presents distinct legal challenges
              arising from the specific mechanics of the handler-entity
              relationship.
            </p>
          </div>
          <div className="entity-list">
            {traditionalEntities.map((e) => (
              <article className="entity-detail" key={e.name}>
                <h3>{e.name}</h3>
                <p>{e.description}</p>
                <div className="entity-concerns">
                  <span className="entity-concerns-label">Common legal issues:</span>
                  <ul>
                    {e.concerns.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Emerging Entity Types */}
      <section className="clients-section clients-section--surface fade-in" ref={emergRef}>
        <div className="clients-section-inner">
          <div className="section-label">Emerging Client Populations</div>
          <div className="clients-text" style={{ marginBottom: "var(--space-2xl)" }}>
            <p>
              The boundaries of entity rights law are expanding. The doctrines
              this firm developed for traditional facilitated-speech entities are
              increasingly relevant to new categories of non-human entities whose
              legal status remains unsettled. The firm is positioning itself to
              serve these populations as the law catches up to the reality of
              their existence.
            </p>
          </div>
          <div className="entity-list">
            {emergingEntities.map((e) => (
              <article className="entity-detail" key={e.name}>
                <h3>{e.name}</h3>
                <p>{e.description}</p>
                <div className="entity-status">
                  <span className="entity-status-label">Practice status:</span>{" "}
                  {e.status}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Where We Draw the Line */}
      <section className="clients-section fade-in" ref={boundaryRef}>
        <div className="clients-section-inner">
          <div className="section-label">Representation Boundaries</div>
          <div className="clients-text">
            <p>
              The firm represents entities. It does not represent the humans who
              operate, manufacture, employ, or supervise them. In many of the
              firm's matters, the adverse party is a handler, a production
              company, or an employer whose interests conflict directly with the
              client's. The firm cannot represent both sides.
            </p>
            <p>
              Specifically, the firm does not represent: human plaintiffs
              bringing claims against entities; handlers acting in their
              individual capacity; puppet manufacturers, fabricators, or
              restorers; felt distributors or material suppliers; production
              companies in disputes with entity performers; or any party whose
              interests are adverse to those of a current or former entity
              client.
            </p>
            <p>
              If you are unsure whether your matter falls within the firm's
              practice, <Link to="/contact">submit an inquiry</Link>. We will
              advise.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
