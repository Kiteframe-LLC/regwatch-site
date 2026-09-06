# Administrative Rulemaking Structural Review

**Document ID:** `TREAS_FRDOC_0001-0493`

**Document type:** `NPRM`

## Computed Scoring Summary
- Pass 4 raw/scaled: 5 / 0.494
- Pass 4 primary concern: The proposal leaves location-control and offer-participation boundaries consequential but insufficiently specified for consistent compliance and fair notice.
- Pass 5 assessment/scaled: 🚩 Nuts · Burden and Consequence Handling / 1.000
- Pass 5 base defect score: 0.975
- Pass 5 context pressure: 0.490
- Pass 5 scrutiny/risk multipliers: 1.150 / 1.400
- Pass 5 worst family: Burden and Consequence Handling (burden_and_consequence_handling)
- Core structural concern: The proposal is coherent overall, but private location controls and broad conduct examples can become consequential access and enforcement gates before a correction pathway is specified.
- Procedural concern score: 5.400/10
- Analysis score multiplier: 1.343

# Phase 1 — Docket Integrity Check

**Classification:** Full analytical spine present in the notice text; proposal-specific attachments were not needed for the principal findings

**Observed Facts**
- The metadata identifies a Department of the Treasury Proposed Rule titled GENIUS Act Regulations on Payment Stablecoin Issuance, Offer, and Sale.
- The notice states ACTION: Notice of proposed rulemaking and proposes new 12 CFR part 1523 under 12 U.S.C. 5901 et seq.
- The notice includes statutory background, proposed regulatory text, alternatives and safe-harbor questions, Regulatory Flexibility Act, Unfunded Mandates, Paperwork Reduction Act, and Executive Order discussions.
- The notice text contains 87 numbered questions, including questions on extraterritoriality, definitions, foreign issuers, location controls, safe harbors, alternatives, costs, benefits, and information collections.
- The metadata reports 311 related materials, but the four ingested supporting texts in the supplied export concern unrelated older Treasury and Customs matters and were not used as evidence.
- The metadata comment deadline is October 20, 2026, while the notice body states October 19, 2026; this date discrepancy should be corrected or clarified in the final notice and docket metadata.

**Inferences**
- The selected document is the substantive NPRM; no override to another document is warranted.
- The available notice text is sufficient for a public structural review because the central statutory, definitional, operational, and impact claims are stated in the proposal itself.
- The unrelated ingested texts should not be treated as supporting materials for this NPRM; attachment-specific findings are therefore limited to gaps visible in the notice.
- The rule has a substantial analytical spine, but technical implementation evidence and proposal-specific quantitative support are less developed than the legal and definitional discussion.

**Supporting Materials**
**Listed In Metadata:** 311

**Ingested:** 4

**Blocking:** False

**Notes:** The ingested items do not match the selected stablecoin proposal. No required attachment was identified from the first-pass reading; comments should request any underlying ANPRM comment record, implementation analysis, or technical materials needed to substantiate unresolved claims.

# Phase 2 — Claim-Centered Analysis

## Step 0 — Extract Agency Reasoning Claims

- **Id:** claim_statutory_architecture
  
  **Category:** LEGAL
  
  **Quoted Sentence:** Section 3 of the Act (12 U.S.C. 5902) delineates the fundamental architecture of the payment stablecoin market in the United States, prescribing who may issue, offer, sell, or otherwise make available payment stablecoins.
  
  **Location:** I. Background and Authority
  
  **Procedural Relevance:** Provides the statutory premise for the proposed prohibitions.
  
  **Support Type:** preamble explanation
- **Id:** claim_extraterritoriality
  
  **Category:** SCOPE
  
  **Quoted Sentence:** This part is intended to have extraterritorial effect if conduct involves the offer or sale of a payment stablecoin to a person located in the United States.
  
  **Location:** Proposed § 1523.1(b)
  
  **Procedural Relevance:** Defines the geographic reach of the framework and its effect on offshore conduct.
  
  **Support Type:** preamble explanation
- **Id:** claim_location_standard
  
  **Category:** METHOD
  
  **Quoted Sentence:** A person will be considered to have issued a payment stablecoin in the United States only if, at the time of issuance, the person is located in the United States or the person issues the payment stablecoin to a person located in the United States.
  
  **Location:** Proposed § 1523.2(b)
  
  **Procedural Relevance:** Creates the central jurisdictional test for issuance.
  
  **Support Type:** preamble explanation
- **Id:** claim_foreign_issuer
  
  **Category:** LEGAL
  
  **Quoted Sentence:** Treasury believes that the best reading of the Act, considered as a whole, is that foreign payment stablecoin issuers that meet the criteria set out in section 18(a) may issue payment stablecoins in the United States.
  
  **Location:** II.C.1, Proposed § 1523.2(a)
  
  **Procedural Relevance:** Exercises interpretive authority on a major market-access question.
  
  **Support Type:** preamble explanation
- **Id:** claim_anti_evasion_controls
  
  **Category:** CONCLUSION
  
  **Quoted Sentence:** The person has adopted and implemented policies, procedures, and controls reasonably designed to avoid issuing the payment stablecoin to any person located in the United States.
  
  **Location:** Proposed § 1523.2(c)(3)
  
  **Procedural Relevance:** Makes compliance systems and location detection central to the offshore safe harbor.
  
  **Support Type:** preamble explanation
- **Id:** claim_offer_examples
  
  **Category:** SCOPE
  
  **Quoted Sentence:** Examples of activities that constitute the offer or sale of payment stablecoins include directly soliciting a person located in the United States, advertising a payment stablecoin as available for purchase by persons located in the United States, and advising potential purchasers on how to evade generally applicable location detection or restriction mechanisms.
  
  **Location:** II.B and Proposed § 1523.3(d)
  
  **Procedural Relevance:** Extends the rule from transactions to solicitation, advertising, and advice.
  
  **Support Type:** preamble explanation
- **Id:** claim_impact_analysis
  
  **Category:** DATA
  
  **Quoted Sentence:** What are the potential costs and benefits of the implementation of section 3 of the Act as proposed in part 1523, beyond costs and benefits imposed by the Act itself?
  
  **Location:** Questions 83-87
  
  **Procedural Relevance:** Shows Treasury is soliciting evidence on incremental impacts, but also indicates that some estimates remain open.
  
  **Support Type:** preamble explanation

## Step 1 — Claim Stress Test

- **Claim Id:** claim_extraterritoriality
  
  **Underlying Assumption:** A person located in the United States can be identified reliably enough for an extraterritorial offer or sale rule.
  
  **Failure Scenario:** A dual-resident individual, traveling customer, VPN user, institutional account, or multi-entity intermediary falls into a disputed location category.
  
  **Procedural Implication:** Treasury should define evidence, safe reliance, and correction procedures before exposure turns on an uncertain location determination.
- **Claim Id:** claim_location_standard
  
  **Underlying Assumption:** The issuer's location or the recipient's location is a workable proxy for where issuance occurs.
  
  **Failure Scenario:** A foreign issuer, U.S. service provider, wallet provider, and beneficial user occupy different jurisdictions and perform different issuance steps.
  
  **Procedural Implication:** The final rule should map responsibility across intermediaries and explain how conflicting facts are resolved.
- **Claim Id:** claim_foreign_issuer
  
  **Underlying Assumption:** Section 18(a), section 4(a)(12)(C), and the secondary-market provisions jointly authorize the proposed foreign-issuer interpretation.
  
  **Failure Scenario:** The final interpretation is challenged as allowing issuance under section 3(a) without clearly stated prerequisites or as relying on practical consequences to resolve statutory ambiguity.
  
  **Procedural Implication:** Treasury should address the strongest competing textual reading and identify every prerequisite that remains applicable.
- **Claim Id:** claim_anti_evasion_controls
  
  **Underlying Assumption:** Reasonably designed controls can prevent U.S. issuance without imposing disproportionate surveillance or denying legitimate users.
  
  **Failure Scenario:** Providers over-block customers based on weak indicators or under-block sophisticated evasion, while enforcement later treats either result as a compliance failure.
  
  **Procedural Implication:** The rule should state minimum control expectations, reliance protections, recordkeeping, and remediation pathways.
- **Claim Id:** claim_offer_examples
  
  **Underlying Assumption:** Examples involving advertising and advice give fair notice without converting ordinary neutral infrastructure into an offer or sale.
  
  **Failure Scenario:** A search engine, software provider, liquidity venue, or analytics service is treated as participating because its content could facilitate a transaction.
  
  **Procedural Implication:** Treasury should distinguish purposeful solicitation from neutral technical, informational, or user-directed activity.

## Step 2 — Essence of the Rule

**Regulatory Action:** Treasury proposes new 12 CFR part 1523 to implement section 3 of the GENIUS Act by defining payment-stablecoin issuance, offers, sales, U.S. location, foreign-issuer treatment, exemptions, safe harbors, and examples of participation.

**Affected Entities**
- payment stablecoin issuers and prospective issuers
- foreign payment stablecoin issuers
- digital asset exchanges, custodians, transfer providers, and other digital asset service providers
- wallet, software, infrastructure, advertising, and liquidity providers
- U.S. consumers, businesses, and institutional users of payment stablecoins
- OCC and other primary Federal payment stablecoin regulators
- foreign regulators and cross-border market participants

**Statutory Authority:** 12 U.S.C. 5901 et seq., especially section 3 (12 U.S.C. 5902), with related foreign-issuer and safe-harbor provisions.

**Key Regulatory Change:** The proposal operationalizes statutory prohibitions through location tests, compliance-control safe harbors, foreign-issuer eligibility, offer-and-sale examples, and an appendix of scenario interpretations.

**Core Tradeoff:** Treasury seeks a workable national and cross-border stablecoin market while relying on private location controls and broad conduct examples that may increase compliance uncertainty and over-blocking risk.

**Observed Facts**
- The proposal would add part 1523 with §§ 1523.1 through 1523.5 and Appendix A.
- The proposal permits qualifying foreign issuers to issue in the United States and creates a location-based offshore issuance safe harbor.
- The proposal asks whether to use a more Regulation S-like framework, a per se location approach, different due-diligence requirements, and additional safe harbors.

**Inference:** The most consequential design choice is not the statutory prohibition itself but how Treasury allocates error, evidence, and enforcement risk among issuers, service providers, and users.

## Step 3 — Agency Argument Tree

**Summary:** Treasury moves from section 3's statutory prohibitions to a location-based and conduct-based framework, then uses controls, exemptions, and examples to make cross-border compliance workable. The chain is strongest on statutory architecture and weakest where private controls must translate uncertain real-world facts into enforceable location decisions.

**Nodes**
- **Id:** N1
  
  **Label:** GENIUS Act section 3
  
  **Node Type:** legal_premise
  
  **Chain Role:** premise
  
  **Text:** Section 3 limits who may issue, offer, sell, or make available payment stablecoins in the United States.
  
  **Support Status:** supported by notice text
  
  **Evidence**
  - I. Background and Authority
- **Id:** N2
  
  **Label:** U.S. market and cross-border objective
  
  **Node Type:** policy_objective
  
  **Chain Role:** objective
  
  **Text:** Treasury reads the Act as enabling payment and settlement, including across borders, while protecting U.S. markets.
  
  **Support Status:** supported by notice text
  
  **Evidence**
  - II.A Treasury's Approach
- **Id:** N3
  
  **Label:** Location-based jurisdiction
  
  **Node Type:** method
  
  **Chain Role:** analytical_method
  
  **Text:** Issuance turns on issuer location or the location of the recipient; offers and sales focus on conduct involving a person located in the United States.
  
  **Support Status:** supported by notice text
  
  **Evidence**
  - Proposed §§ 1523.1(b), 1523.2(b), 1523.3
- **Id:** N4
  
  **Label:** Foreign-issuer interpretation
  
  **Node Type:** legal_conclusion
  
  **Chain Role:** agency_conclusion
  
  **Text:** Qualifying foreign payment stablecoin issuers may issue in the United States under Treasury's reading of sections 3, 4(a)(12)(C), and 18(a).
  
  **Support Status:** agency interpretation with competing readings possible
  
  **Evidence**
  - II.C.1
- **Id:** N5
  
  **Label:** Private compliance controls
  
  **Node Type:** implementation_mechanism
  
  **Chain Role:** implementation
  
  **Text:** Offshore actors can avoid deemed U.S. issuance through reasonable beliefs, policies, procedures, controls, and no U.S.-targeted advertising.
  
  **Support Status:** supported by proposed regulatory text
  
  **Evidence**
  - Proposed § 1523.2(c)
- **Id:** N6
  
  **Label:** Conduct examples and safe harbors
  
  **Node Type:** enforcement_mechanism
  
  **Chain Role:** implementation
  
  **Text:** The proposal specifies solicitation, advertising, evasion advice, exemptions, and safe harbors to clarify covered conduct.
  
  **Support Status:** supported by notice text
  
  **Evidence**
  - Proposed §§ 1523.3 and 1523.4; Appendix A
- **Id:** N7
  
  **Label:** Market clarity and lawful access
  
  **Node Type:** policy_conclusion
  
  **Chain Role:** conclusion
  
  **Text:** Treasury expects the framework to reduce uncertainty and permit innovation while preventing prohibited U.S. issuance and offers.
  
  **Support Status:** partly supported; benefits not fully quantified
  
  **Evidence**
  - II.A; Questions 83-87

**Edges**
- **From:** N1
  
  **To:** N2
  
  **Relationship:** defines statutory purpose
  
  **Basis:** preamble interpretation
  
  **Strength:** moderate
- **From:** N2
  
  **To:** N3
  
  **Relationship:** supports jurisdictional design
  
  **Basis:** cross-border payment rationale
  
  **Strength:** moderate
- **From:** N1
  
  **To:** N3
  
  **Relationship:** implements prohibition
  
  **Basis:** section 3 and proposed §§ 1523.1-1523.3
  
  **Strength:** strong
- **From:** N1
  
  **To:** N4
  
  **Relationship:** supports statutory interpretation
  
  **Basis:** sections 3, 4(a)(12)(C), and 18(a)
  
  **Strength:** moderate
- **From:** N3
  
  **To:** N5
  
  **Relationship:** requires operational proxy
  
  **Basis:** location-based safe harbor
  
  **Strength:** moderate
- **From:** N3
  
  **To:** N6
  
  **Relationship:** translates scope into examples
  
  **Basis:** offer, sale, and issuance provisions
  
  **Strength:** moderate
- **From:** N4
  
  **To:** N7
  
  **Relationship:** expands lawful market access
  
  **Basis:** foreign-issuer interpretation
  
  **Strength:** moderate
- **From:** N5
  
  **To:** N7
  
  **Relationship:** offers compliance pathway
  
  **Basis:** policies, controls, and non-targeting conditions
  
  **Strength:** moderate
- **From:** N6
  
  **To:** N7
  
  **Relationship:** promises clarity
  
  **Basis:** examples, exemptions, and Appendix A
  
  **Strength:** moderate

**Missing Links**
- The notice does not fully quantify how often location uncertainty occurs or how proposed controls perform across user and intermediary types.
- The connection between the foreign-issuer statutory interpretation and the complete set of approval, registration, prudential, and enforcement prerequisites should be made explicit.
- The proposal does not provide a detailed correction, appeal, or safe-reliance process when a provider makes a disputed location determination.

**Logical Jumps**
- Practical efficiency and market-innovation concerns are used to reinforce a statutory interpretation without fully resolving the competing textual reading.
- Examples intended to improve clarity may still leave the boundary between purposeful participation and neutral infrastructure uncertain.
- The existence of reasonable controls is treated as a sufficient safe harbor concept without a fully specified evidentiary or monitoring standard.

## Step 4 — Analysis Obligations Review

**Observed Facts**
- The notice includes RFA, UMRA, PRA, and Executive Order discussions and asks for costs, benefits, and burden information.
- The notice distinguishes costs and benefits of part 1523 from those imposed by the Act and related regulatory proposals in Question 84.

**Assessment:** Partial analytical spine. The notice identifies major obligations and asks targeted questions, but proposal-specific quantitative estimates, distributional effects, and implementation-error costs are not fully developed in the supplied text.

**Unknown**
- Whether a separate Treasury economic analysis or technical compliance study exists among the 311 related materials.

## Step 5 — Missing Alternatives Detector

**Observed Facts**
- Treasury expressly requests comment on a per se location-based approach, a Regulation S-like offshore framework, more or less prescriptive due diligence, and additional safe harbors.
- The notice does not present a full comparative table quantifying each alternative's compliance, access, enforcement, and error costs.

**Inference:** Alternative solicitation is deliberate and normal at NPRM stage, but commenters can improve the record by comparing bright-line rules, rebuttable presumptions, tiered controls, and correction procedures.

**Commentable Gap:** The proposal should explain which alternatives were rejected, why, and how their tradeoffs compare for small providers, foreign issuers, and U.S. users.

## Step 6 — Technical Coherence

**Assessment:** Moderate technical coherence. The proposed definitions and sections form a recognizable framework, but operational coherence depends on reliable identity, residency, entity-location, advertising-targeting, and transaction-role determinations.

**Strengths**
- The rule separates issuance from offer/sale and identifies examples and exemptions.
- The rule acknowledges that an issuer may also be a digital asset service provider.

**Stress Points**
- Individual temporary presence and entity principal-place-of-business tests may be difficult to apply in real time.
- The interaction of issuer, service-provider, intermediary, and wallet roles needs concrete scenarios and safe reliance rules.
- The meaning of 'could be reasonably expected to have the effect of targeting' may be difficult to implement consistently.

## Step 7 — Legal Grounding

**Observed Facts**
- The proposal cites 12 U.S.C. 5901 et seq. and relies especially on sections 3, 4, 5, and 18.
- Treasury acknowledges that payment stablecoins are distinguished from securities and commodities and asks whether a Regulation S-like approach should be used.

**Inference:** The statutory grounding is substantial, but the foreign-issuer interpretation, extraterritorial application, and criminal-participation examples are the areas where a more complete competing-interpretation analysis would strengthen the record.

**Legal Questions**
- How does the proposed issuance rule preserve every statutory prerequisite outside part 1523?
- What limits prevent examples of participation from expanding criminal exposure beyond knowing participation?
- What is the legal basis for applying the issuance location test to offshore issuances to U.S. persons?

## Step 8 — Procedural Normalcy

**Assessment:** Generally normal NPRM procedure with a material metadata inconsistency.

**Observed Facts**
- The proposal invites numbered questions and identifies comment channels.
- The metadata and body state different comment deadlines: October 20 versus October 19, 2026.

**Inference:** The discrepancy could confuse commenters and should be corrected or prominently clarified; otherwise the notice uses ordinary proposal-stage solicitation rather than treating requests for comment as proof of a defect.

## Step 9 — Failure Modes

**Failure Modes**
- **Mode:** overblocking
  
  **Mechanism:** Providers deny legitimate users based on uncertain location signals to preserve a safe harbor.
  
  **Detectability:** moderate
  
  **Mitigation:** minimum evidence, safe reliance, correction records, and aggregate error reporting
- **Mode:** underblocking
  
  **Mechanism:** Sophisticated offshore actors evade controls while ordinary providers bear enforcement risk.
  
  **Detectability:** low to moderate
  
  **Mitigation:** risk-based controls and clearly bounded anti-evasion examples
- **Mode:** role_uncertainty
  
  **Mechanism:** Neutral infrastructure or advisory services are treated as offer/sale participation.
  
  **Detectability:** moderate
  
  **Mitigation:** role-specific examples and a knowledge/purpose boundary
- **Mode:** cross-border_conflict
  
  **Mechanism:** Foreign legal requirements and U.S. lawful-order or reciprocal-arrangement requirements conflict.
  
  **Detectability:** moderate
  
  **Mitigation:** coordination procedures and publicly stated decision criteria

## Step 10 — Regulatory Incentives

**Observed Facts**
- The proposal uses compliance controls and non-targeting conditions as an offshore safe harbor.
- It treats advertising, solicitation, and advice as relevant to whether conduct reaches U.S. persons.

**Inference:** The design incentivizes providers to collect more location and transaction data, narrow public-facing services, and avoid ambiguous U.S. activity. It may also incentivize migration to less transparent venues if compliance costs are materially asymmetric.

**Comment Focus:** Ask Treasury to compare privacy, access, competition, and evasion incentives under different control designs.

## Step 11 — Evidentiary Strength

**Strengths**
- The notice provides extensive statutory citations and proposed text.
- The proposal identifies concrete questions and scenarios rather than relying only on general policy statements.

**Limitations**
- The supplied packet does not include a relevant proposal-specific technical or economic attachment.
- Benefits, error rates, implementation costs, and distributional effects are largely left for comment.
- The notice relies on practical consequences to support the foreign-issuer interpretation without a quantified comparison.

**Overall:** Strong textual evidence; moderate empirical evidence; limited evidence on operational performance and distributional consequences.

## Step 12 — Administrative Record Gaps

- A mapping from each major definition and safe-harbor condition to observed market practices or compliance data.
- A quantitative assessment of false positives, false negatives, and costs of location-detection controls.
- A comparison of the proposed rule with a Regulation S-like framework and a bright-line per se location test.
- A proposal-specific distributional analysis for consumers, small service providers, foreign issuers, and cross-border remittance users.
- A clear process for correcting mistaken location determinations and documenting reliance on a safe harbor.
- A reconciliation of the comment deadline stated in metadata and the deadline stated in the notice body.

## Step 13 — Litigation Vulnerabilities

- **Issue:** foreign-issuer statutory interpretation
  
  **Assessment:** Potentially contestable; the notice should confront the strongest competing reading and specify how all other statutory prerequisites remain operative.
  
  **Support:** Sections 3, 4(a)(12)(C), and 18(a) discussion
- **Issue:** extraterritorial scope and fair notice
  
  **Assessment:** Potentially contestable if the rule reaches offshore issuance or neutral services without sufficiently concrete standards.
  
  **Support:** Proposed § 1523.1(b), §§ 1523.2-1523.3, Questions 1-2
- **Issue:** criminal participation examples
  
  **Assessment:** Requires careful limiting language so examples do not blur knowing participation and ordinary service provision.
  
  **Support:** Proposed § 1523.2(d) and section 3(f) discussion
- **Issue:** reasoned explanation and impact analysis
  
  **Assessment:** The open questions on costs, benefits, alternatives, and information burdens create an opportunity to supplement the record before final action.
  
  **Support:** Questions 83-87 and procedural-analysis sections

## Step 13A — Structural Integrity / Nonsense Detector

**Assessment:** No overall structural nonsense detected. The proposal has a coherent objective-to-mechanism chain, but several control points are underspecified.

**Observed Facts**
- The rule connects statutory prohibitions to definitions, issuance and offer/sale provisions, exemptions, safe harbors, and an appendix.
- The notice separately identifies questions about scope, implementation, alternatives, and impacts.

**Inference:** The central structural risk is not incoherence but conversion of uncertain location facts into private gatekeeping decisions before a review or correction path is available.

**Red Flags**
- uncertain location evidence
- broad participation examples
- unclear correction and safe-reliance pathway

# Phase 3 — Comment Generation

## Step 14 — Commentable Sentences

- **Id:** C14-1
  
  **Text:** Treasury should clarify how the extraterritorial rule applies when issuer, intermediary, wallet, and user locations differ.
  
  **Source:** Proposed §§ 1523.1(b), 1523.2(b), and Questions 1-2
- **Id:** C14-2
  
  **Text:** Treasury should identify the evidence and documentation that a provider may rely on when determining whether an individual or entity is located in the United States.
  
  **Source:** Proposed §§ 1523.1(c) and 1523.2(c)
- **Id:** C14-3
  
  **Text:** Treasury should distinguish purposeful U.S. solicitation from neutral infrastructure, public information, software, and user-directed technical services.
  
  **Source:** Proposed § 1523.3(d) and Question 30
- **Id:** C14-4
  
  **Text:** Treasury should compare the proposed foreign-issuer interpretation with the strongest competing statutory reading and list all prerequisites that remain applicable.
  
  **Source:** II.C.1 and Questions 33-34
- **Id:** C14-5
  
  **Text:** Treasury should quantify the costs, benefits, false-positive risks, privacy effects, and distributional impacts of the proposed location-control framework.
  
  **Source:** Questions 83-87

## Step 15 — Procedural Concern Score

**Score:** 5.4

**Weighted Sum:** 21

**Max Weighted Sum:** 39

**Categories**
**Data Issues**
**Severity:** 2

**Weight:** 2

**Rationale:** The notice does not quantify operational error rates, control performance, or distributional effects.

**Linked Nodes**
- N5
- N7

**Methodology Gaps**
**Severity:** 2

**Weight:** 3

**Rationale:** The proposal requests evidence on alternatives and incremental costs without presenting a full comparative method or baseline.

**Linked Nodes**
- N3
- N6
- N7

**Missing Alternatives**
**Severity:** 1

**Weight:** 4

**Rationale:** Alternatives are expressly solicited, so this is a comment opportunity rather than an unacknowledged omission.

**Linked Nodes**
- N3
- N6

**Scope Exclusions**
**Severity:** 2

**Weight:** 3

**Rationale:** The boundary for neutral infrastructure, advertising, advice, and offshore conduct remains consequential but incompletely specified.

**Linked Nodes**
- N3
- N6

**Unsupported Conclusions**
**Severity:** 1

**Weight:** 1

**Rationale:** The foreign-issuer interpretation and expected market benefits would benefit from fuller competing-interpretation and quantitative support.

**Linked Nodes**
- N4
- N7

## Step 16 — Evidence Requests

- **Id:** E16-1
  
  **Priority:** high
  
  **Request:** Provide test results or observed data on location-control accuracy, false positives, false negatives, and remediation time by user and provider type.
  
  **Why It Matters:** These controls determine whether the safe harbor is workable and whether lawful access is denied.
  
  **Supporting Evidence:** Proposed § 1523.2(c); Questions 86-87
  
  **Score Drivers**
  - pass4.data_quality_uncertainty_handling
  - pass5.implementation_fantasy
- **Id:** E16-3
  
  **Priority:** moderate
  
  **Request:** Provide role-specific examples showing when issuers, exchanges, wallets, advertisers, advisers, software providers, and liquidity providers are or are not covered.
  
  **Why It Matters:** Actor-role uncertainty can produce overbroad withdrawal of services.
  
  **Supporting Evidence:** Proposed §§ 1523.2(d) and 1523.3(d)
  
  **Score Drivers**
  - pass4.enforcement_clarity_risk
  - pass5.consequence_class_ambiguity
- **Id:** E16-2
  
  **Priority:** high
  
  **Request:** Provide a comparative analysis of the proposed location framework, a per se location test, and a Regulation S-like offshore framework.
  
  **Why It Matters:** The alternatives affect market access, enforcement, privacy, and compliance costs.
  
  **Supporting Evidence:** Questions 19-20 and 83-85
  
  **Score Drivers**
  - pass4.alternatives_analysis_adequacy
- **Id:** E16-4
  
  **Priority:** moderate
  
  **Request:** Correct or explain the October 19 versus October 20, 2026 comment deadline discrepancy.
  
  **Why It Matters:** A conflicting deadline can impair meaningful participation.
  
  **Supporting Evidence:** Notice DATES section and metadata
  
  **Score Drivers**
  - pass4.procedural_compliance_risk

## Step 17 — High-Leverage Comment Angles

- **Id:** A17-1
  
  **Priority:** high
  
  **Posture:** request clarification and safeguards
  
  **Issue:** Location-control safe harbor
  
  **Why It Matters:** The safe harbor may become the practical compliance standard even though location facts are uncertain.
  
  **Ask Agency To:** Define minimum evidence, safe reliance, recordkeeping, correction, and good-faith error protections.
  
  **Supporting Evidence:** Proposed § 1523.2(c)
  
  **Score Drivers**
  - pass4.enforcement_clarity_risk
  - pass5.self_policing_substitution
  - pass5.safeguard_absence
- **Id:** A17-2
  
  **Priority:** high
  
  **Posture:** request narrower boundary
  
  **Issue:** Offer, advertising, and participation examples
  
  **Why It Matters:** Broad examples can reach neutral infrastructure and ordinary public communications.
  
  **Ask Agency To:** Add objective purpose, knowledge, and targeting limits plus role-specific safe harbors.
  
  **Supporting Evidence:** Proposed § 1523.3(d)
  
  **Score Drivers**
  - pass4.enforcement_clarity_risk
  - pass5.targetability_abuse_surface
- **Id:** A17-4
  
  **Priority:** moderate
  
  **Posture:** submit data and request analysis
  
  **Issue:** Incremental costs and distributional effects
  
  **Why It Matters:** The rule may shift privacy, compliance, and access costs among users and smaller providers.
  
  **Ask Agency To:** Disaggregate costs, benefits, burdens, and market-participation effects and explain the baseline.
  
  **Supporting Evidence:** Questions 83-87
  
  **Score Drivers**
  - pass4.cost_benefit_transparency
  - pass4.distributional_omission_risk
- **Id:** A17-3
  
  **Priority:** high
  
  **Posture:** request comparative analysis
  
  **Issue:** Foreign-issuer interpretation
  
  **Why It Matters:** The interpretation determines who may access the U.S. market and which prerequisites apply.
  
  **Ask Agency To:** Explain the competing statutory reading and identify every remaining approval, registration, and supervision condition.
  
  **Supporting Evidence:** II.C.1; Questions 33-34
  
  **Score Drivers**
  - pass4.statutory_authority_fit

## Step 18 — Decision Brief

- **Id:** D18-1
  
  **Decision:** Whether to support the objective while requesting a narrower, more reviewable location-control safe harbor
  
  **Tradeoff:** A more specific safe harbor may increase compliance detail but reduce overblocking and inconsistent enforcement.
  
  **Recommended Record Action:** Submit concrete user and transaction scenarios, control-error evidence, and a proposed correction process.
- **Id:** D18-2
  
  **Decision:** Whether to support qualifying foreign-issuer access under the proposed interpretation
  
  **Tradeoff:** Access may promote competition and cross-border settlement, while unclear prerequisites may increase legal and supervisory risk.
  
  **Recommended Record Action:** Request a complete statutory explanation and a checklist of all conditions that remain applicable.
- **Id:** D18-3
  
  **Decision:** Whether to ask for staged implementation and measurable feedback
  
  **Tradeoff:** Phasing may delay uniform application but allows Treasury to detect error, burden, and market-access problems.
  
  **Recommended Record Action:** Request metrics, reporting, periodic review, and non-punitive remediation for good-faith implementation errors.
