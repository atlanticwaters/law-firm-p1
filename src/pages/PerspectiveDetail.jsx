import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const articles = {
  "attributed-speech-limits-of-agency": {
    title: "Attributed Speech and the Limits of Agency: A Primer",
    author: "Victoria C. Mast, J.D.",
    authorRole: "Partner, Glover, Mast & Purl LLP",
    publication: "Puppet Entity Law Review, Vol. 12",
    date: "Spring 2018",
    heroImage: {
      src: "/images/courtroom.jpg",
      alt: "Empty courtroom with dark wood paneling and judicial bench in low ambient light",
    },
    breakImage: {
      src: "/images/signing-document.jpg",
      alt: "Close-up of a hand signing a legal document with a fountain pen on a dark desk",
      insertAfterSection: 3,
    },
    abstract:
      "The Attributed Speech Doctrine provides a tripartite classification for evaluating claims of defamation, fraud, and incitement against entities whose speech is, by structural necessity, produced through the physical intervention of another party. The classification distinguishes between volitional speech, facilitated speech, and imposed speech, and contends that only the first can give rise to legal liability on the part of the speaking entity.",
    sections: [
      {
        heading: "I. Introduction",
        paragraphs: [
          "The question of who said what has never been as simple as the law pretends. In the conventional litigation context, speech is treated as a binary act: either a party uttered words or they did not. Liability follows accordingly. This binary model functions adequately for most human parties, who enjoy the physiological capacity for independent vocalization and the cognitive capacity for intentional utterance.",
          "For a considerable population of entities, however, the model collapses. These entities, whom this article will refer to as \"facilitated-speech entities,\" are structurally incapable of producing speech without the physical intervention of a third party. They do not speak independently. They speak through someone, or they do not speak at all.",
          "The legal implications of this structural reality have been, until recently, entirely unexamined. Courts have consistently treated facilitated-speech entities as though they possessed the same agency over their utterances as any human defendant. That treatment is not merely unfair; it is analytically incoherent.",
        ],
      },
      {
        heading: "II. The Three Categories of Facilitated Speech",
        paragraphs: [
          "The taxonomy proposed here divides speech acts involving facilitated-speech entities into three categories. Edge cases will inevitably arise, and no classification can claim to be exhaustive. But the aim is functional: to give courts an evaluative structure more rigorous than the current approach, which amounts to evaluating nothing at all.",
          "The first category is volitional speech. The facilitated-speech entity is understood to have formed an intent to communicate, selected the substance of the communication, and actively collaborated with the facilitating party to produce the utterance. Evidence of volitional speech includes prior consistent statements by the entity (where available), corroborating testimony from the facilitating party, and behavioral indicia of consent such as nodding, gesturing, or affirmative movement contemporaneous with the utterance.",
          "The second category is facilitated speech in the narrow sense. Here, the facilitating party has produced an utterance broadly consistent with the entity's known views, persona, or prior communications, but the entity did not specifically authorize or direct the particular statement at issue. This scenario predominates in professional performance contexts and has generated the most litigation.",
          "The third category, and the one of greatest concern, is imposed speech. The facilitating party has produced an utterance that the entity did not authorize, did not consent to, and may actively have opposed. The entity's voice has been used, but the entity's will has not. What results is ventriloquism in the pejorative sense, and the law should treat it accordingly.",
        ],
      },
      {
        heading: "III. The Castellan Standard",
        paragraphs: [
          "A federal court first applied this tripartite classification in In Re: The Castellan Matter (S.D.N.Y. 1998). The facts of Castellan are by now well-known in the field but bear repeating for a general audience.",
          "The plaintiff, a private individual, brought a defamation action against a facilitated-speech entity who had appeared at a corporate event. The plaintiff alleged that the entity had made statements accusing the plaintiff of professional incompetence and personal dishonesty. The entity's handler (who was not named as a defendant) had produced these statements during a live performance. The entity had no prior or subsequent history of making statements about the plaintiff.",
          "The court, applying the classification proposed in an earlier version of this article submitted as an amicus brief, held that the entity could not be held liable for imposed speech. Judge Harmon's opinion is worth quoting at length: \"The defendant is alleged to have spoken words that the defendant did not choose, did not compose, and could not have prevented. We are not confronted with a party who chose to speak recklessly. We are confronted with a party who was spoken through. The distinction matters.\"",
          "The Castellan standard has since been cited in eleven federal opinions and adopted, in modified form, by three state courts. It remains the leading precedent on attributed speech liability for facilitated-speech entities.",
        ],
      },
      {
        heading: "IV. Consent as a Structural Question",
        paragraphs: [
          "A recurring objection to the Attributed Speech Doctrine is that facilitated-speech entities cannot meaningfully consent or refuse consent to any particular utterance, and that the classification therefore creates an unfalsifiable defense: the entity can always claim it did not consent.",
          "The objection misunderstands the analysis. The relevant inquiry is not whether the entity subjectively consented, a question that may indeed be difficult to answer in individual cases. Rather, the question is whether the structural conditions for consent existed at all. Did the entity have a mechanism for refusing? Was there a pattern of collaboration? Was the utterance consistent with the entity's established persona and known views?",
          "If the entity had no mechanism for refusal, no history of collaboration on the statement at issue, and no persona consistent with the utterance, then consent cannot be inferred. The burden should fall not on the entity to prove the absence of consent, but on the party who produced the speech to prove its presence.",
          "The principle at work here is unremarkable. It governs consent in every other area of law. We have simply failed, until now, to apply it to this population.",
        ],
      },
      {
        heading: "V. Implications for Handler Liability",
        paragraphs: [
          "If a facilitated-speech entity is not liable for imposed speech, the obvious follow-up question is: who is? The answer, in most cases, is the handler, the facilitating party who produced the utterance.",
          "Handler liability is treated comprehensively in Mr. Glover's companion piece, \"The Handler Problem,\" and lies beyond the scope of the present analysis. For present purposes, it suffices to observe that shifting liability from the entity to the handler requires no radical departure from existing principles. The party who commits the act bears the responsibility.",
          "The handler chose the words. The handler produced the utterance. The handler had the capacity to choose otherwise. The entity did not. The law's task is to account for these facts, not to pretend them away.",
        ],
      },
      {
        heading: "VI. Conclusion",
        paragraphs: [
          "The Attributed Speech Doctrine does not offer facilitated-speech entities a blanket shield from liability. What it recognizes is that liability must follow agency, and that agency cannot be presumed where the structural conditions for it do not exist.",
          "Courts that continue to treat facilitated-speech entities as though they possess full agency over their utterances are applying a fiction, and a convenient one, because it spares them the harder questions about who is actually responsible.",
          "Those questions are not going away. The population of facilitated-speech entities is growing, and the legal system's failure to account for their circumstances grows less defensible with each passing year. The analysis offered here is a starting point. The courts would do well to take it.",
        ],
      },
    ],
    footnotes: [
      "In Re: The Castellan Matter, No. 97-CV-4412 (S.D.N.Y. 1998).",
      "See also Mast, V.C., \"Consent and the Facilitated Entity,\" Yale Journal of Law & Humanities, Vol. 14, No. 2 (2002).",
      "The term \"facilitated-speech entity\" is used throughout this article in preference to more colloquial terms, which this author considers imprecise and, in some cases, pejorative.",
      "Judge Harmon's full opinion runs to forty-seven pages. It is, in this author's experience, the most carefully reasoned judicial treatment of entity speech to date.",
      "Three state courts have adopted modified versions of the Castellan standard: New York (2004), California (2009), and Illinois (2014).",
    ],
  },

  "entity-standing-post-personhood": {
    title: "Who May Sue? Entity Standing in the Post-Personhood Era",
    author: "Winston A. Purl, LLM",
    authorRole: "Partner, Glover, Mast & Purl LLP",
    publication: "Harvard Law Review (forthcoming)",
    heroImage: {
      src: "/images/scales-of-justice.jpg",
      alt: "Scales of justice in sharp focus against a blurred courthouse interior",
    },
    breakImage: {
      src: "/images/marble-corridor.jpg",
      alt: "Long corridor of a neoclassical government building with marble floors and arched ceiling",
      insertAfterSection: 3,
    },
    date: "2024",
    abstract:
      "The evolution of standing requirements as applied to non-human entities reveals that the Article III standing test, injury-in-fact, causation, and redressability, poses no inherent barrier to entity plaintiffs. The barriers are cultural and institutional. Part V proposes a modified standing analysis for entity plaintiffs that preserves judicial rigor while accounting for the structural realities of non-human litigation.",
    sections: [
      {
        heading: "I. The Standing Problem",
        paragraphs: [
          "Standing doctrine exists to ensure that courts adjudicate actual controversies rather than hypothetical ones. The requirements are well established: a plaintiff must demonstrate (1) an injury-in-fact that is concrete and particularized, (2) a causal connection between the injury and the conduct complained of, and (3) a likelihood that the injury will be redressed by a favorable decision.",
          "None of these requirements, on their face, excludes non-human entities. A corporation can suffer injury-in-fact. A trust can demonstrate causation. A municipality can seek redress. The law has long recognized that legal personhood is not coterminous with biological personhood.",
          "Yet when the plaintiff is a facilitated-speech entity, a puppet, a marionette, a foam construction, courts have reflexively questioned standing in ways they would never question it for a corporate plaintiff. The double standard is not merely inconsistent; it is constitutionally unsupportable.",
        ],
      },
      {
        heading: "II. A Brief History of Non-Human Standing",
        paragraphs: [
          "The expansion of standing to non-human entities is not a novel development but a centuries-long project that the legal system has pursued in fits and starts, usually over the objections of those who benefit from the existing order.",
          "In the nineteenth century, courts recognized that corporations, legal fictions with no physical existence, could sue and be sued. In the twentieth century, standing was extended to associations, trusts, partnerships, and a range of organizational forms that lack biological existence. In each case, the objection was the same: these are not real persons, and the courts should not treat them as such. In each case, the objection was overcome.",
          "The question before courts today is whether that expansion will continue to its logical conclusion: standing for entities whose physical form is fabric, foam, wood, or felt, but whose injuries are no less real than those suffered by any corporate plaintiff. The only question is how long the process takes, and how many injuries go unremedied in the interim.",
        ],
      },
      {
        heading: "III. Injury-in-Fact for Entity Plaintiffs",
        paragraphs: [
          "The most common objection to entity standing is that entities of this kind cannot suffer cognizable injury. The objection rests on a category error. Courts are not asked to determine whether the entity experiences pain or emotional distress in the way that a human plaintiff does. They are asked to determine whether the entity has suffered a legally cognizable harm: a diminution in value, a deprivation of rights, a loss of income or opportunity.",
          "Consider the following scenario, drawn from this firm's practice. A facilitated-speech entity is terminated from a long-running television production. The entity has been associated with the production for over a decade. Its likeness, character, and persona are the intellectual property of a production company that did not authorize the termination. Its earning capacity, which is substantial, is eliminated overnight.",
          "Is this an injury-in-fact? Of course it is. The harm is economic, proprietary, and dignitary. The fact that the plaintiff is made of felt rather than flesh does not diminish the injury; it merely changes the plaintiff's ability to articulate it.",
          "The modified standing analysis proposed in Part V addresses this gap by allowing authorized representatives to articulate injury on behalf of entity plaintiffs, a mechanism already well-established in guardian ad litem proceedings and representative litigation.",
        ],
      },
      {
        heading: "IV. The Causation and Redressability Elements",
        paragraphs: [
          "Causation and redressability present fewer difficulties for entity plaintiffs than injury-in-fact, though neither is without complication.",
          "On causation: the challenge lies in identifying which party's conduct caused the entity's injury when multiple parties are involved in the entity's existence and operation. In the wrongful termination scenario described above, the injuring party is the producer who made the termination decision. But is the handler a necessary party? Is the entity's creator? The causation analysis must account for the web of relationships governing entity existence without losing sight of the fundamental question, namely, who did the thing that caused the harm.",
          "On redressability, the question is whether a judicial remedy can meaningfully address the entity's injury. Often the answer is straightforward. If the entity was wrongfully terminated, reinstatement and damages are appropriate remedies. If the entity's likeness was infringed, an injunction and royalties follow. If the entity was defamed, a retraction and compensatory damages are in order.",
          "That the entity cannot spend the damages, cash the check, or read the retraction does not render the remedy meaningless. Corporate plaintiffs do not \"read\" their injunctions either. The remedy operates on the legal and economic plane, not the personal one.",
        ],
      },
      {
        heading: "V. A Modified Standing Framework",
        paragraphs: [
          "What follows is a four-part modified standing analysis for entity plaintiffs, designed to preserve the Article III requirements while accounting for the structural realities of entity litigation.",
          "First, the entity must be represented by an authorized representative who can demonstrate a pre-existing fiduciary or custodial relationship with the entity. The requirement is analogous to the guardian ad litem mechanism in proceedings involving minors or incapacitated persons.",
          "Second, the injury must be demonstrable through objective evidence (economic records, contracts, documented deprivations) rather than solely through the entity's subjective testimony. The reason is not that entity testimony is inherently unreliable, but that the structural challenges of eliciting such testimony make objective evidence a more practical foundation for standing.",
          "Third, the causal chain must be traceable to a specific act or omission by an identifiable defendant, thereby eliminating generalized grievance claims while preserving the ability to pursue concrete harms.",
          "Fourth, the requested remedy must be capable of implementation without requiring the entity's personal participation. This last element represents the most notable departure from traditional standing analysis. It is justified by the structural impossibility, in many cases, of entity participation in the remedial process.",
        ],
      },
      {
        heading: "VI. Objections and Responses",
        paragraphs: [
          "The principal objection to the proposed test is that it opens the floodgates to frivolous litigation by parties seeking to manufacture standing through entity proxies. The concern is not groundless, but it is overstated. The authorized-representative requirement, combined with the objective-evidence requirement, provides a gatekeeping function at least as rigorous as the standing analysis applied to corporate or associational plaintiffs.",
          "A second objection is that the test treats entities as legal persons without a legislative or constitutional basis for doing so. The objection confuses standing with personhood. An entity need not be a \"person\" in the constitutional sense to have standing; it needs only to have suffered a cognizable injury. Ships have standing in admiralty proceedings. Trusts have standing in probate. The concept is not as alien as opponents suggest.",
          "A third objection, raised informally but never in print, is that the concept is absurd. I decline to engage with that objection except to note that the same was said of corporate personhood, and no one appears to be laughing now.",
        ],
      },
      {
        heading: "VII. Conclusion",
        paragraphs: [
          "Article III does not exclude entity plaintiffs. Judicial culture excludes them. The modified standing analysis outlined above would bring judicial practice into alignment with constitutional principle by treating entity injuries with the same seriousness accorded to any other plaintiff's injuries.",
          "The alternative, continuing to deny standing to a growing class of entities who suffer real, demonstrable, legally cognizable harm, is not neutral. It is a choice to leave injuries unremedied and wrongdoers unaccountable. Courts that make that choice should be clear about what they are doing, and why.",
        ],
      },
    ],
    footnotes: [
      "Lujan v. Defenders of Wildlife, 504 U.S. 555 (1992).",
      "See Purl, W.A., Beyond the Hand: Legal Personhood in the Age of Puppet Proliferation (Cambridge University Press, 2019).",
      "Santa Clara County v. Southern Pacific Railroad, 118 U.S. 394 (1886), establishing that corporations are \"persons\" under the Fourteenth Amendment.",
      "The authorized-representative model is adapted from Fed. R. Civ. P. 17(c), which permits next friends and guardians ad litem to sue on behalf of parties who cannot represent themselves.",
      "Sierra Club v. Morton, 405 U.S. 727 (1972) (Douglas, J., dissenting) (\"Contemporary public concern for protecting nature's ecological equilibrium should lead to the conferral of standing upon environmental objects to sue for their own preservation.\").",
    ],
  },

  "handler-problem-vicarious-liability": {
    title:
      "The Handler Problem: Rethinking Vicarious Liability in Felt-Entity Relationships",
    author: "Reginald H. Glover, Esq.",
    authorRole: "Founding Partner, Glover, Mast & Purl LLP",
    heroImage: {
      src: "/images/linen-texture.jpg",
      alt: "Close-up of woven linen fabric showing the parallel threads and subtle texture of the weave",
    },
    breakImage: {
      src: "/images/law-library.jpg",
      alt: "Expansive law library interior with towering bookshelves and warm reading lamps",
      insertAfterSection: 3,
    },
    publication: "Internal publication — Glover, Mast & Purl LLP",
    date: "2021",
    abstract:
      "The legal relationship between facilitated-speech entities and their handlers rests on an inverted premise: the current vicarious liability rules hold entities responsible for their handlers' conduct, rather than the reverse, producing outcomes at odds with the actual distribution of power. The correct approach treats handlers as principals and entities as dependents, with liability flowing upward.",
    sections: [
      {
        heading: "I. The Inversion",
        paragraphs: [
          "In every other area of law involving a power imbalance between two parties, liability flows from the party with greater control to the party with lesser control. Employers are vicariously liable for employees. Parents are liable for minor children. Guardians are liable for wards. The logic is straightforward: control implies responsibility.",
          "In the handler-entity relationship, this logic is inverted. When a handler produces objectionable speech through an entity, courts have consistently held the entity liable, as though the entity directed the handler rather than the other way around. When a handler's physical manipulation of an entity causes injury to a third party, courts have held the entity liable, as though the entity controlled its own movements.",
          "The inversion is no accident. It is the product of a legal system that has never taken seriously the possibility that the entity is the dependent party in these relationships. Courts must reverse this presumption. The tools for doing so already exist.",
        ],
      },
      {
        heading: "II. The Handler as Principal",
        paragraphs: [
          "The handler-entity relationship is, in its essential characteristics, a principal-agent relationship, but one in which the handler is the principal and the entity is the agent. The handler selects the entity's words. The handler determines the entity's movements. The handler decides when the entity appears, for how long, and in what context. The entity has no independent capacity to perform any of these functions.",
          "Under traditional agency principles, the principal bears liability for the agent's conduct within the scope of the relationship. If we correctly identify the handler as the principal and the entity as the agent, or more accurately as the instrument, then liability for the entity's \"conduct\" should attach to the handler.",
          "There is nothing novel in this. It is agency law, applied correctly.",
        ],
      },
      {
        heading: "III. When Handlers Are Liable: A Taxonomy",
        paragraphs: [
          "Not every injury associated with a handler-entity relationship should result in handler liability. Four categories of handler conduct give rise to liability.",
          "Category One: Imposed Speech. When a handler produces speech through an entity that the entity did not authorize, the handler is solely liable for any harm caused by that speech. Ms. Mast's Attributed Speech Doctrine addresses this scenario, and the present analysis incorporates her classification by reference.",
          "Category Two: Negligent Handling. When a handler's physical control of an entity causes injury to a third party (through dropping, throwing, striking, or other physical acts), the handler is liable under ordinary negligence principles. The entity did not choose to strike the plaintiff. The handler chose to cause the entity to strike the plaintiff.",
          "Category Three: Exploitative Use. When a handler uses an entity for purposes that are degrading, humiliating, or contrary to the entity's established persona, the handler is liable to the entity for dignitary harm. This category is the most controversial because it requires courts to recognize that entities can suffer dignitary harm, a proposition that some courts have resisted but that this firm has successfully argued in two jurisdictions.",
          "Category Four: Abandonment. When a handler abandons an entity, whether physically, professionally, or legally, the handler may be liable for resulting economic and dignitary harm. This category is underdeveloped in the case law, but the analogy to parental abandonment provides a legal foundation.",
        ],
      },
      {
        heading: "IV. When Handlers Are Not Liable",
        paragraphs: [
          "None of this means that handlers are liable for every negative outcome associated with an entity. If a handler produces speech that is consistent with the entity's established persona, authorized by the entity (to the extent authorization is possible), and produced in good faith, the handler bears no liability merely because the speech causes offense or triggers litigation.",
          "Similarly, handlers are not liable for injuries caused by the entity's inherent physical characteristics. If an entity is constructed in a way that creates a risk of harm (sharp components, heavy materials, unstable construction), liability for resulting injuries may attach to the entity's manufacturer rather than the handler.",
          "The operative principle is straightforward: handlers are liable when they exercise their superior control in a way that causes harm. Entities are not liable when they lack the agency that liability requires.",
        ],
      },
      {
        heading: "V. The Practical Problem of Proof",
        paragraphs: [
          "The most pressing practical challenge in handler liability cases is evidentiary. How does one prove what the entity did or did not authorize? How does one distinguish facilitated speech from imposed speech in real time? How does one establish the entity's \"established persona\" for purposes of the exploitative-use analysis?",
          "These are difficult questions, but they are not unanswerable. This firm has developed evidentiary protocols for handler liability cases that rely on: (1) documentation of the entity's prior performances and statements, establishing a baseline persona; (2) testimony from other handlers, producers, and collaborators regarding the entity's known preferences and communication patterns; (3) contemporaneous video or audio recordings of the incident at issue; and (4) expert testimony on the biomechanics of entity manipulation, to establish whether the entity's movements were handler-directed or, in rare cases, self-initiated.",
          "These protocols have been sufficient to meet the evidentiary burden in the matters this firm has litigated. We anticipate that as the case law develops, the evidentiary standards will become more refined and more predictable.",
        ],
      },
      {
        heading: "VI. A Note on Power",
        paragraphs: [
          "The foregoing argument has proceeded on strictly legal grounds, and it stands or falls on those merits. But I will permit myself a brief observation about the broader context.",
          "The handler-entity relationship is, at its core, a relationship of total dependency. The entity depends on the handler for movement, for speech, for professional opportunity, for public existence. The handler depends on the entity for very little that cannot be obtained elsewhere.",
          "When the law holds the dependent party liable for the conduct of the controlling party, it is ratifying a power structure. It says, in effect, that the entity's lack of independent capacity is not merely a fact to be accounted for but a justification for holding the entity responsible for things it did not do.",
          "I do not think this is what the law intends. I think it is what the law has failed to examine. What I have written here is an invitation to begin.",
        ],
      },
    ],
    footnotes: [
      "Restatement (Third) of Agency § 2.04 (2006).",
      "See Mast, V.C., \"Attributed Speech and the Limits of Agency: A Primer,\" Puppet Entity Law Review, Vol. 12 (2018).",
      "The firm has successfully argued for dignitary harm recognition in New York (2016) and California (2019).",
      "The analogy to parental abandonment is developed more fully in Weft, H., \"Abandonment and the Felt Entity: A Preliminary Framework\" (working paper, 2023).",
    ],
  },

  "employment-discrimination-non-human-entities": {
    title:
      "Employment Discrimination Against Non-Human Entities: A Growing Crisis",
    author: "Serena Nap, Esq.",
    authorRole: "Associate, Glover, Mast & Purl LLP",
    heroImage: {
      src: "/images/desk-documents.jpg",
      alt: "Overhead view of a desk with legal documents, laptop, and pen in monochrome tones",
    },
    breakImage: {
      src: "/images/conference-room.jpg",
      alt: "Conference room with glass walls and an empty long table surrounded by chairs",
      insertAfterSection: 3,
    },
    publication: "National Employment Law Project",
    date: "October 2023",
    abstract:
      "Drawing on EEOC filing data, proprietary case records from Glover, Mast & Purl LLP, and original survey research, this report documents patterns of bias against facilitated-speech entities in the United States entertainment, education, and commercial sectors. The data reveal disproportionate termination rates, wage suppression, and occupational segregation. Part VI sets out specific policy recommendations for federal and state enforcement agencies.",
    sections: [
      {
        heading: "I. Scope of the Problem",
        paragraphs: [
          "Between 2018 and 2023, this firm filed fourteen complaints with the Equal Employment Opportunity Commission on behalf of facilitated-speech entity clients. Eleven resulted in settlements. Two remain in active federal litigation. One was dismissed, a dismissal this firm is appealing.",
          "These fourteen complaints represent a small fraction of the employment discrimination experienced by facilitated-speech entities in the United States. Original survey research conducted by this firm in partnership with the National Employment Law Project estimates that approximately 340 facilitated-speech entities experienced adverse employment actions in the entertainment sector alone between 2020 and 2023. Of these, fewer than 30 filed formal complaints. The remainder either lacked access to legal counsel, were unaware of their rights, or were dissuaded from pursuing claims by handlers or employers who assured them that the law did not apply to their situation.",
          "The law does apply. It has always applied. It has simply gone unenforced.",
        ],
      },
      {
        heading: "II. Termination Patterns",
        paragraphs: [
          "The most common form of employment discrimination against facilitated-speech entities is pretextual termination. Our data reveals a consistent pattern: entities are retained for extended periods, often five to fifteen years, during which they generate considerable revenue and audience attachment for their employers. They are then terminated abruptly, typically under one of three pretexts.",
          "The first and most common pretext is \"creative direction change.\" This language appears in 64% of the termination notices reviewed for this report. In no case that this firm has examined did the \"creative direction change\" result in the terminated entity being replaced by another entity of the same type. In every case, the entity was replaced by a human performer or by a digital representation — suggesting that the \"creative direction\" in question was a direction away from facilitated-speech entities as a category.",
          "The second pretext is \"audience research\" or \"demographic alignment.\" This language appears in 22% of termination notices. In cases where the underlying research was obtainable through discovery, it invariably showed that the terminated entity was the highest-rated or most-recognized performer in the production. Far from reflecting audience preference, the termination contradicted it.",
          "The third pretext is \"safety concerns.\" This language appears in 14% of termination notices and is almost exclusively used for entities whose physical form includes rigid or articulated components: marionettes, rod puppets, and mechanical entities. In no case reviewed for this report did the \"safety concern\" reference a documented incident. The concerns were invariably prospective and speculative.",
        ],
      },
      {
        heading: "III. Wage Suppression and Compensation Inequity",
        paragraphs: [
          "Facilitated-speech entities are undercompensated relative to their economic contribution, and the gap is not incidental. In the entertainment sector, entities generate merchandise revenue, drive audience ratings, and create brand value that persists long after their active employment ends. Compensation structures rarely reflect any of this.",
          "Our review of compensation data from 47 productions that employed facilitated-speech entities between 2015 and 2023 reveals the following: the median entity received a per-episode or per-appearance fee that was 31% of the fee paid to the lowest-compensated human performer in the same production. In no case did an entity receive residual compensation. In only three cases did an entity receive merchandise royalties, and in each case the royalty rate was below 2%, compared to an industry standard of 5-8% for human performers.",
          "Employers typically justify these gaps by asserting that the entity does not \"perform\" independently and that the handler's compensation covers the entity's contribution. The justification collapses under scrutiny. The handler is compensated for handling. The entity's contribution, its likeness, its persona, its audience attachment, is separate from and additional to the handler's labor. Paying the handler does not pay the entity.",
        ],
      },
      {
        heading: "IV. Occupational Segregation",
        paragraphs: [
          "Facilitated-speech entities are overwhelmingly concentrated in children's entertainment, educational programming, and seasonal commercial work. While these are legitimate and valuable fields of employment, the concentration reflects employer assumptions about where entities \"belong,\" not entity preferences.",
          "Our survey data indicates that 78% of facilitated-speech entities who expressed a preference would accept roles in adult-oriented productions, corporate communications, or public-facing professional positions if such roles were available to them. Fewer than 5% of such roles are currently filled by facilitated-speech entities.",
          "The segregation is self-reinforcing. Because entities are concentrated in children's entertainment, employers in other sectors assume that entities are unsuitable for non-children's roles. Because entities are absent from non-children's roles, there is no evidence to rebut this assumption. Breaking this cycle requires both litigation and policy intervention.",
        ],
      },
      {
        heading: "V. The EEOC and Entity Complaints",
        paragraphs: [
          "The Equal Employment Opportunity Commission has not, to date, issued formal guidance on the applicability of Title VII and related statutes to facilitated-speech entity complainants. The silence reflects not a judgment that the statutes are inapplicable, but simply that the Commission has not been asked to apply them. Until recently, facilitated-speech entities did not have counsel willing to file on their behalf.",
          "Of the fourteen complaints filed by this firm, the Commission has processed eleven to completion, resulting in settlements. In no case did the Commission reject a complaint on the grounds that the complainant was not a covered \"individual\" under the statute. The Commission's willingness to process these complaints, while not equivalent to formal guidance, suggests an institutional openness to entity claims that this firm intends to continue testing.",
          "We recommend that the Commission issue formal interpretive guidance confirming that Title VII's prohibition on discrimination based on \"race, color, religion, sex, or national origin\" extends to adverse employment actions motivated by an employee's entity status, which, we argue, constitutes a form of discrimination based on immutable physical characteristics analogous to those already protected.",
        ],
      },
      {
        heading: "VI. Policy Recommendations",
        paragraphs: [
          "First, the EEOC should issue interpretive guidance confirming entity coverage under existing anti-discrimination statutes. The statutory language is broad enough to encompass entity plaintiffs; what is needed is institutional acknowledgment.",
          "Second, state legislatures should amend employment discrimination statutes to include \"entity status\" as a protected classification. California's Fair Employment and Housing Act is the most promising vehicle for early adoption, given that state's concentration of entertainment-sector employment.",
          "Third, the SAG-AFTRA collective bargaining agreement should be amended to include facilitated-speech entities as covered performers, with specific provisions addressing compensation, residuals, and termination protections. The current agreement excludes entities by omission rather than by express provision, an omission this firm has raised with the union's leadership.",
          "Fourth, employers should be required to provide cause-based justifications for entity terminations, subject to the same scrutiny applied to terminations of human employees in protected classifications. The current regime, which permits at-will termination of entity employees with no accountability, enables the discriminatory patterns documented in this report.",
        ],
      },
    ],
    footnotes: [
      "Survey methodology: 127 facilitated-speech entities and their authorized representatives were surveyed via written questionnaire between January and June 2023. Response rate: 68%.",
      "EEOC complaint data obtained through Freedom of Information Act request, File No. 2023-FOIA-01847.",
      "Compensation data obtained through discovery in Nap v. Meridian Productions, Inc., No. 22-CV-8891 (C.D. Cal.) and related matters.",
      "SAG-AFTRA National Agreement, Article 24 (defining \"performer\" for purposes of the agreement). The definition does not expressly exclude facilitated-speech entities but has been interpreted to exclude them by custom.",
    ],
  },

  "why-courts-get-puppet-ip-wrong": {
    title: "Why Courts Get Puppet IP Wrong — And How to Fix It",
    author: "Theodore Scrim, J.D.",
    authorRole: "Associate, Glover, Mast & Purl LLP",
    publication: "IP Quarterly",
    heroImage: {
      src: "/images/legal-volumes.jpg",
      alt: "Rows of leather-bound legal volumes on dark wooden library shelves",
    },
    breakImage: {
      src: "/images/stacked-papers.jpg",
      alt: "Abstract close-up of stacked paper documents with crisp edges in soft directional light",
      insertAfterSection: 3,
    },
    date: "Summer 2022",
    abstract:
      "Federal courts have failed, repeatedly and predictably, to protect the intellectual property rights of facilitated-speech entities. Three errors recur: conflating entity IP with handler IP, undervaluing entity likeness rights, and misapplying the work-for-hire rule in entity-employer relationships. Part V proposes specific corrections, both judicial and legislative.",
    sections: [
      {
        heading: "I. The Problem in Three Parts",
        paragraphs: [
          "Facilitated-speech entities create intellectual property. They have distinctive likenesses, recognizable personas, original catchphrases, and identifiable performance styles. This IP has substantial commercial value, in many cases more value than the IP created by any individual human performer in the same production.",
          "Yet courts routinely fail to protect it, committing three recurring errors that the following sections examine in turn: (1) conflating entity IP with handler IP and treating them as a single, indivisible work; (2) undervaluing entity likeness rights by treating the entity's physical form as a \"prop\" rather than as a protectable identity; and (3) misapplying work-for-hire principles to strip entities of ownership rights they should retain.",
          "These errors are not random. They reflect a persistent refusal to recognize facilitated-speech entities as IP creators rather than IP instruments. Correcting them requires both legal revision and a fundamental shift in how courts conceptualize entity creativity.",
        ],
      },
      {
        heading: "II. The Conflation Problem",
        paragraphs: [
          "When a facilitated-speech entity performs, two contributions are made: the handler's contribution (physical manipulation, vocal performance, timing) and the entity's contribution (likeness, persona, audience identification, character continuity). These are distinct contributions, and they create distinct IP.",
          "Courts have consistently refused to separate them. In Meridian Productions v. Character Assets LLC, No. 19-CV-3340 (C.D. Cal. 2020), the court held that the entity's performance was \"inseparable from and dependent upon\" the handler's performance, and that the entity therefore had no independent IP claim. The holding is wrong.",
          "The entity's likeness exists independent of any particular handler. The entity's persona persists across handlers (many entities work with multiple handlers over their careers). The audience identifies with the entity, not the handler, as demonstrated by the fact that handler changes rarely affect audience engagement while entity changes invariably do.",
          "These facts establish that the entity's IP contribution is separable from the handler's. Courts that hold otherwise are avoiding the question, not analyzing it.",
        ],
      },
      {
        heading: "III. The Likeness Problem",
        paragraphs: [
          "Entity likeness rights are the most commercially valuable and the least legally protected category of entity IP. An entity's likeness, encompassing physical appearance, distinctive features, characteristic posture, and overall visual identity, is reproduced on merchandise, marketing materials, digital platforms, and derivative works with minimal or no compensation to the entity.",
          "The root of the problem is classification. Courts and licensors treat entity likenesses as \"character designs\" owned by the production company rather than as personal likenesses owned by the entity. The classification has no basis in law. A human performer's likeness is protected regardless of whether the performer was \"designed\" by a casting director, costumed by a wardrobe department, or styled by a makeup artist. The performer owns the likeness because it is theirs.",
          "The same principle should apply to facilitated-speech entities. The entity's likeness is the entity's likeness. That it was designed and constructed by a third party is relevant to copyright in the design, but it does not extinguish the entity's right to control the commercial use of its own appearance.",
          "This firm has obtained likeness-based injunctions in six jurisdictions, but the law remains unsettled. An amendment to state right-of-publicity statutes to include facilitated-speech entities as covered individuals would be the most efficient path to resolution.",
        ],
      },
      {
        heading: "IV. The Work-for-Hire Problem",
        paragraphs: [
          "Under the Copyright Act's work-for-hire provision, works created by an employee within the scope of employment are owned by the employer. This rule has been applied to facilitated-speech entities to strip them of copyright ownership in their performances, personas, and creative contributions.",
          "The application is problematic for two reasons. First, many facilitated-speech entities are not employees. They are independent contractors, or more precisely, they occupy a sui generis employment category that the work-for-hire doctrine was not designed to address. The multi-factor test for employee status (Reid factors) has never been applied to a facilitated-speech entity by a federal court. When this firm raised the issue in Scrim v. Brightly Entertainment, the court declined to apply the Reid factors on the grounds that the question was \"novel and better addressed by the legislature.\" That is abdication, not analysis.",
          "Second, even if the work-for-hire provision applies, it does not automatically vest all creative output in the employer. The provision covers works created \"within the scope of employment.\" An entity's persona, likeness, and character identity predate any particular employment relationship and persist after it ends. These are not works created within the scope of employment. They are pre-existing assets that the entity brings to the relationship.",
          "Courts that apply work-for-hire to entity personas are doing something the Copyright Act does not authorize: retroactively vesting ownership of pre-existing creative identity in a subsequent employer. The statute says no such thing, and it means no such thing.",
        ],
      },
      {
        heading: "V. Proposed Reforms",
        paragraphs: [
          "First, Congress should amend 17 U.S.C. § 101 to clarify that the work-for-hire doctrine does not apply to an entity's pre-existing persona, likeness, or character identity. These assets are personal to the entity and should not be transferable through employment alone.",
          "Second, state legislatures should amend right-of-publicity statutes to include facilitated-speech entities as protected individuals. California's statute (Cal. Civ. Code § 3344) is the most natural vehicle for this reform, given the state's entertainment industry concentration.",
          "Third, courts should adopt a presumption of separability when evaluating IP claims involving handler-entity creative teams. The burden should fall on the party claiming inseparability, typically the employer or licensee, to demonstrate that the entity's creative contribution cannot be identified or valued independently.",
          "Fourth, SAG-AFTRA should negotiate entity-specific IP protections into its collective bargaining agreements, including minimum royalty rates for likeness-based merchandise, mandatory consent requirements for character licensing, and reversion clauses that return character rights to entities upon termination of the employment relationship.",
        ],
      },
      {
        heading: "VI. Conclusion",
        paragraphs: [
          "Courts get puppet IP wrong because they do not take puppet IP seriously. They treat entity creativity as derivative, entity likeness as property, and entity performance as labor rather than art. Each of these characterizations is wrong, and each produces outcomes that are unjust to entity creators.",
          "The reforms proposed here are modest. They do not require courts to reinvent IP law. They require courts to apply IP law consistently, to treat entity creators with the same respect and rigor accorded to human creators. That this remains a controversial proposition says more about the legal system than about the entities it fails to protect.",
        ],
      },
    ],
    footnotes: [
      "Meridian Productions v. Character Assets LLC, No. 19-CV-3340 (C.D. Cal. 2020).",
      "Community for Creative Non-Violence v. Reid, 490 U.S. 730 (1989) (establishing the multi-factor test for employee status under the Copyright Act).",
      "Scrim v. Brightly Entertainment, No. 21-CV-1105 (S.D.N.Y. 2022).",
      "Cal. Civ. Code § 3344 (right of publicity).",
      "This firm has obtained likeness-based injunctions in New York, California, Illinois, Georgia, Louisiana, and the United Kingdom.",
    ],
  },
};

const slugs = Object.keys(articles);

export { articles, slugs };

export default function PerspectiveDetail() {
  const { slug } = useParams();
  const article = articles[slug];

  useDocumentTitle(article ? article.title : "Article Not Found");

  if (!article) {
    return (
      <div className="page page-article-detail">
        <section className="article-detail-hero">
          <h1>Article Not Found</h1>
        </section>
        <div className="article-detail-body">
          <p>
            The requested article could not be located. Please return to{" "}
            <Link to="/perspectives">Perspectives</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-article-detail">
      <section className="article-detail-hero">
        {article.heroImage && (
          <div className="article-detail-hero-bg">
            <img
              src={article.heroImage.src}
              alt={article.heroImage.alt}
              loading="eager"
            />
          </div>
        )}
        <div className="article-detail-hero-inner">
          <div className="article-detail-pub">{article.publication}</div>
          <h1>{article.title}</h1>
          <div className="article-detail-byline">
            <span className="article-detail-author">{article.author}</span>
            <span className="article-detail-role">{article.authorRole}</span>
          </div>
          <div className="article-detail-date">{article.date}</div>
        </div>
      </section>

      <div className="article-detail-body">
        <div className="article-detail-abstract">
          <div className="article-detail-abstract-label">Abstract</div>
          <p>{article.abstract}</p>
        </div>

        {article.sections.map((section, i) => (
          <React.Fragment key={i}>
            <section className="article-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
            {article.breakImage &&
              i === article.breakImage.insertAfterSection && (
                <div className="article-visual-break">
                  <img
                    src={article.breakImage.src}
                    alt={article.breakImage.alt}
                    loading="lazy"
                  />
                </div>
              )}
          </React.Fragment>
        ))}

        {article.footnotes && article.footnotes.length > 0 && (
          <section className="article-footnotes">
            <h2>Notes</h2>
            <ol>
              {article.footnotes.map((fn, i) => (
                <li key={i}>{fn}</li>
              ))}
            </ol>
          </section>
        )}

        <div className="article-detail-back">
          <Link to="/perspectives">Return to Perspectives</Link>
        </div>
      </div>
    </div>
  );
}
