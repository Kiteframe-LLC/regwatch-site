# Administrative Rulemaking Structural Review

**Rule:** *Hazardous and Solid Waste Management System: Disposal of Coal Combustion Residuals from Electric Utilities; Legacy/CCRMU Amendments; Public Hearing*  
**Agency:** Environmental Protection Agency  
**Docket:** EPA-HQ-OLEM-2020-0107  
**Document type:** Proposed Rule

## Phase 1 — Docket Integrity Check

### Classification

Partial analytical spine

### Observed Facts

The selected document `EPA-HQ-OLEM-2020-0107-1376` is the substantive NPRM. Its title is a proposed rule with a public hearing, and the notice text lays out a multi-part proposal rather than merely extending deadlines or correcting prior text.

The notice states that EPA is proposing several revisions to the federal coal combustion residuals (CCR) regulations, including exempting CCR dewatering structures, modifying the legacy CCR surface impoundment and CCR management unit provisions, creating a new permitting pathway for site-specific decisions, and revising beneficial-use rules.

The controller rerun of `make export-chatgpt-skill DOC_ID=EPA-HQ-OLEM-2020-0107-1376` returned `status: ready_for_review`, `missing_required_doc_ids: []`, and `supporting_ingested_count: 8`. The combined export also appends support-document extracts, including a Regulatory Impact Analysis for legacy CCR surface impoundments and related risk/economic materials.

The metadata lists 408 supporting or related materials. That is a large docket, but the export logic did not classify any currently missing document as required for continuation.

The notice text sets a June 12, 2026 comment deadline and a virtual public hearing for May 28, 2026.

### Inference

This is not a thin notice. EPA is relying on a pre-existing analytical record for CCR regulation, especially the legacy-impoundment and CCRMU risk/economic work done in the 2023-2024 rulemaking cycle, and is carrying that technical history forward into a new amendment package.

At the same time, the available package is only a partial window into that larger record. The notice itself summarizes the proposed changes clearly, and the export includes several support extracts, but the docket appears to contain many more technical memoranda, presentations, and prior-response volumes than are actually loaded into the current review packet.

That makes the record usable for structural review, but not fully reproducible from the supplied materials alone.

### Attachment Assessment

- The export status did not identify any `missing_required_doc_ids`, so an attachment-fetch handoff is not currently triggered by the pipeline.
- The support extracts include at least one RIA and related risk/economic materials, which is enough to verify that EPA has some analytical spine behind the proposal.
- Additional attachments would likely sharpen comment quality on specific technical points, especially risk modeling, closure timing, and beneficial-use thresholds, but they are not presently controller-blocking.

### Unknown

Whether EPA prepared a proposal-specific technical support document for the 2026 site-specific permitting pathway and beneficial-use revisions, separate from the legacy-impoundment and CCRMU materials already in the docket.

## Phase 2 — Claim-Centered Analysis

## Step 0 — Extract Agency Reasoning Claims

### Claim 1

**Category:** CONCLUSION  
**Quoted sentence:** "The Environmental Protection Agency (EPA or the Agency) is proposing several revisions to the existing federal CCR regulations, including exempting CCR dewatering structures and modifying the legacy coal combustion residual (CCR) surface impoundment and CCR management unit provisions."  
**Location:** Summary section at the start of the notice.  
**Procedural relevance:** Establishes the core scope of the proposal.  
**Support type:** Preamble explanation.

### Claim 2

**Category:** METHOD / CONCLUSION  
**Quoted sentence:** "Additionally, EPA is proposing to establish a new compliance pathway that allows for site-specific considerations during permitting regarding the groundwater monitoring points of compliance, the cleanup levels for corrective action, the appropriate closure requirements, closure timeframes, and allowing CCR extraction for beneficial use during the post-closure care period."  
**Location:** Summary section.  
**Procedural relevance:** This is the proposal's main flex mechanism and likely the most comment-sensitive part of the rule.  
**Support type:** Preamble explanation, with broader docket support likely.

### Claim 3

**Category:** SCOPE / CONCLUSION  
**Quoted sentence:** "The Agency is also proposing to revise the definition of beneficial use by eliminating the requirement for an environmental demonstration for the non-roadway use of more than 12,400 tons of unencapsulated CCR on land, as well as proposing a definition of CCR storage pile, and proposing to exclude specific beneficial uses from federal CCR regulations."  
**Location:** Summary section.  
**Procedural relevance:** Reframes the line between regulated disposal and exempt beneficial use.  
**Support type:** Preamble explanation, with support likely in docketed background materials.

### Claim 4

**Category:** PROCEDURE / SCOPE  
**Quoted sentence:** "Lastly, EPA is providing notice that EPA will reopen the public comment period for the Federal CCR permit program proposed rule, published on February 20, 2020, for a period of 30 days in a future separate action."  
**Location:** Summary section.  
**Procedural relevance:** Clarifies that this notice is doing two things at once: proposing amendments here and flagging a separate reopening for the federal permit proposal.  
**Support type:** Preamble explanation.

### Claim 5

**Category:** DATA / METHOD  
**Quoted sentence:** "Need for Regulatory Action (RIA Chapter 1) ... Regulatory Requirements and Costs (RIA Chapter 4) ... Monetized and Non-monetized Benefits (RIA Chapter 5) ... Distributional and Executive Order Analyses (RIA Chapter 6)."  
**Location:** Appended support extract from the docketed Regulatory Impact Analysis.  
**Procedural relevance:** Shows EPA is relying on a cost/benefit and distributional framework, not only narrative judgment.  
**Support type:** Docket cited in supplied support extracts.

### Claim 6

**Category:** DATA / METHOD  
**Quoted sentence:** "Benefits Associated with Additional Avoided Cancer Types ... Regulatory Options Considered ... Regulatory Requirements and Costs ... Monetized and Non-monetized Benefits."  
**Location:** Appended RIA table of contents extract.  
**Procedural relevance:** Indicates that the benefits case depends on modeled health outcomes and option comparison.  
**Support type:** Docket cited in supplied support extracts.

### Claim 7

**Category:** DATA / METHOD  
**Quoted sentence:** "Uncertainty ... Regulatory Options Considered ... Documentation of Baseline Practices and Assessment of Costs Associated with the Final Rule."  
**Location:** Appended RIA extract.  
**Procedural relevance:** Signals that EPA recognizes uncertainty and baseline assumptions, but the current packet only exposes that recognition at a high level.  
**Support type:** Docket cited in supplied support extracts.

### Claim 8

**Category:** LEGAL / IMPACT  
**Quoted sentence:** "Small Business Impact Analysis (RFA/SBREFA) ... Assessment of Equity and Environmental Justice Impacts ... Assessment of Impacts on Children's Health ... Unfunded Mandates Reform Act (UMRA) and Federalism Implications Analysis."  
**Location:** Appended RIA extract.  
**Procedural relevance:** Indicates EPA believes the proposal can be defended across the standard review frameworks.  
**Support type:** Docket cited in supplied support extracts.

## Step 1 — Claim Stress Test

### Claim

**Claim:** Exempting dewatering structures is a justified narrowing of CCR regulation.  
**Underlying assumption:** Dewatering structures are materially different from regulated CCR disposal units in the ways that matter for risk, closure, and monitoring.  
**Failure scenario:** If dewatering structures can function in practice like waste-management units or prolong storage in ways that resemble disposal, the exemption may create a loophole rather than a clarifying carveout.  
**Procedural implication:** Commenters can ask EPA to define the limiting criteria for the exemption and explain how regulators will distinguish dewatering from disposal.

### Claim

**Claim:** A site-specific permitting pathway will improve fit without undermining environmental protection.  
**Underlying assumption:** Permit writers will have usable criteria for changing points of compliance, cleanup levels, closure requirements, and closure timeframes on a facility-specific basis.  
**Failure scenario:** If the rule gives broad discretion without clear floor criteria, similar sites may receive materially different outcomes and the protective baseline may weaken.  
**Procedural implication:** The rule becomes vulnerable on reasoned-explanation and line-drawing grounds unless EPA identifies limiting principles.

### Claim

**Claim:** Removing the environmental-demonstration requirement for large unencapsulated non-roadway uses is appropriate.  
**Underlying assumption:** EPA has enough evidence that this category of use is generally safe or low-risk without case-specific demonstrations.  
**Failure scenario:** If some non-roadway uses behave more like disposal or create site-specific exposure pathways, removing the demonstration requirement could shift risk screening from ex ante review to after-the-fact dispute.  
**Procedural implication:** Commenters can demand the evidence basis for replacing an individualized safeguard with a categorical rule.

### Claim

**Claim:** The broader CCR amendment package is supported by a cost/benefit and risk-analysis record.  
**Underlying assumption:** The legacy RIA and risk materials can be carried forward to support the 2026 amendments without major new sensitivity work.  
**Failure scenario:** If the new site-specific pathway and beneficial-use revisions change the relevant baseline or create new behavioral responses, reliance on the earlier analytical record may not fully fit the new proposal.  
**Procedural implication:** EPA may need to show where the old analysis still applies and where new proposal-specific assumptions were introduced.

## Step 2 — Essence of the Rule

### Observed Facts

EPA proposes a package of CCR amendments rather than a single narrow change.

The notice text identifies four main buckets:

- exemption of CCR dewatering structures,
- modifications to legacy CCR surface impoundment and CCRMU provisions,
- a new permitting pathway allowing site-specific decisions on monitoring, cleanup, and closure issues,
- revisions to beneficial-use definitions and exclusions.

The notice also states that EPA plans a separate future reopening of the comment period for the 2020 federal CCR permit program proposal.

The export package confirms that the docket includes a substantial economic/risk record, including at least one RIA extract that covers need for action, costs, benefits, options considered, uncertainty, small-business analysis, and environmental-justice analysis.

### Inference

The proposal's practical direction is deregulatory or flexibility-expanding in several places, but not in a simple across-the-board way. EPA appears to be trying to preserve the CCR program while loosening or customizing several compliance triggers that utilities and other docket participants have likely argued are overbroad or poorly fitted to site conditions.

The most important question for commenters is whether the package clarifies the rule while preserving clear minimum protections, or instead creates enough discretion and categorical carveouts to blur the line between regulated disposal and exempt handling/use.

### Evidence Quotes

- "including exempting CCR dewatering structures and modifying the legacy coal combustion residual (CCR) surface impoundment and CCR management unit provisions."
- "EPA is proposing to establish a new compliance pathway that allows for site-specific considerations during permitting..."
- "eliminating the requirement for an environmental demonstration for the non-roadway use of more than 12,400 tons of unencapsulated CCR on land..."

## Step 3 — Agency Argument Tree

**Regulatory objective**  
Refine the federal CCR framework so that the program better distinguishes between high-risk disposal settings and lower-risk or site-specific circumstances, while reducing what EPA appears to view as overinclusive burdens.

**Problem definition**  
The current CCR rules may treat some structures, closure situations, groundwater-corrective-action settings, and beneficial uses too rigidly or too broadly.

**Data used**  
The available record shows reliance on the NPRM preamble plus docketed RIA/risk materials addressing need for action, options considered, benefits, costs, uncertainty, and distributional analysis.

**Analytical method**  
EPA appears to rely on a combination of legal interpretation, prior CCR risk/economic analysis, and case-by-case permitting logic.

**Alternatives considered**  
The support extracts indicate regulatory options were considered, but the available packet does not expose a proposal-specific comparison of narrower versus broader flexibility options for each amendment.

**Agency conclusion**  
EPA should revise the current framework by carving out dewatering structures, broadening site-specific permitting discretion, and relaxing some beneficial-use requirements while retaining the overall CCR regulatory structure.

### Missing links

1. The notice clearly states what EPA wants to change, but the available packet only partially explains why the specific boundaries of each carveout were selected.
2. The permitting-flexibility proposal identifies the topics that can vary site by site, but the current packet does not clearly show the floor principles that would constrain that discretion.
3. The beneficial-use revisions appear consequential, yet the export package does not surface the proposal-specific evidence that justified dropping the large-use environmental demonstration requirement.

## Step 4 — Analysis Obligations Review

### Adequate data

**Classification:** Partially satisfied  
**Tag:** unacknowledged_gap

EPA plainly has a large docket and at least some risk/economic support documents. But the available review packet does not fully expose how the specific 2026 amendment choices were tested against current data.

### Transparent methodology

**Classification:** Partially satisfied  
**Tag:** unacknowledged_gap

The record shows that EPA has an RIA and uncertainty discussion, but commenters cannot reproduce the proposal-specific logic for the new carveouts and site-specific pathway from the available text alone.

### Evaluation of reasonable alternatives

**Classification:** Partially satisfied  
**Tag:** unacknowledged_gap

The support extracts confirm that regulatory options were considered, but the available materials do not clearly compare obvious intermediate options such as narrower exemptions, conditional permitting criteria, or more limited beneficial-use exclusions.

### Explanation of analytical thresholds

**Classification:** Partially satisfied  
**Tag:** unacknowledged_gap

The proposal uses several important thresholds or categorical lines, including the 12,400-ton beneficial-use benchmark and the definition boundary for excluded or exempt structures, but the current packet only partially explains why those exact lines remain appropriate.

### Consideration of foreseeable impacts

**Classification:** Partially satisfied  
**Tag:** solicited_by_agency

The RIA extract indicates that EPA considered costs, benefits, small-business effects, equity/environmental-justice implications, and children’s health. But the available packet leaves room to question how those impacts change once more site-specific discretion is introduced.

## Step 5 — Missing Alternatives Detector

### Alternatives evaluated

- EPA appears to have evaluated at least some regulatory options, as shown in the appended RIA extract.
- The proposal itself chooses a mixed path of selective exemption, selective flexibility, and continued baseline regulation.

### Plausible alternatives not analyzed

- A narrower dewatering-structure exemption tied to objective operating conditions.
- Site-specific permitting discretion only after a threshold showing or with mandatory protective floor criteria.
- Retaining some form of environmental demonstration for very large unencapsulated non-roadway uses, even if simplified.
- Phased or pilot treatment of post-closure CCR extraction before making it broadly available.
- Definitions that exclude only specifically enumerated beneficial uses rather than creating broader categorical exclusions.

### Evidence suggesting feasibility

The structure of the proposal itself shows EPA knows how to combine categorical rules with permitting discretion. That makes narrower or conditional alternatives plausible, even if they are not fully developed in the available packet.

## Step 6 — Technical Coherence

### Observed Fact

The proposal links multiple technically different topics in one package: waste-unit categorization, groundwater monitoring, corrective action cleanup levels, closure design/timeframes, post-closure extraction, and beneficial-use definitions.

The appended support extracts show EPA has underlying risk/economic material, but the visible packet does not provide a single integrated technical explanation for how these topics fit together.

### Inference

The rule is technically coherent at the policy level, because each piece concerns the outer boundary of CCR regulation. But the technical coherence is weaker at the implementation level, where commenters need to know how EPA will prevent flexible permitting decisions from eroding comparability across sites.

### Unknown

Whether EPA has proposal-specific technical criteria, matrices, or examples for deciding when alternate points of compliance, alternate cleanup levels, or extended closure timeframes are justified.

## Step 7 — Legal Grounding

### Observed Fact

The notice is an EPA proposed rule under the CCR program in 40 CFR part 257. The table of contents includes statutory-authority discussion and the usual executive-order and cross-cutting review sections.

### Inference

The main legal risk visible from the available packet is not obvious lack of authority, but possible under-explanation of how EPA is drawing the lines for exemptions and permitting flexibility. In other words, the legal question is more APA-style reasoned decision-making than raw statutory power.

## Step 8 — Procedural Normalcy

### Classification

Complex but normal NPRM

### Observed Fact

The docket includes a proposed rule, a hearing date, a standard comment process, and a large body of supporting materials. The NPRM also announces a separate future comment reopening for a related federal permitting rule.

### Inference

This looks like an ordinary major-rule proposal process, not a procedurally anomalous shortcut. The main concerns are record clarity and analytical fit, not procedural irregularity.

## Step 9 — Failure Modes

- Operators may characterize dewatering structures as exempt even when their real-world function resembles regulated CCR handling or storage.
- Site-specific permitting decisions may become inconsistent across states or permitting authorities if EPA does not specify minimum criteria.
- More flexible cleanup levels or closure timeframes may shift residual risk onto nearby communities without a comparably transparent explanation.
- Post-closure extraction for beneficial use may create disputes about when a closed unit is truly stabilizing versus being reopened in substance.
- Relaxed beneficial-use demonstrations may allow large unencapsulated uses that are difficult to distinguish from disposal placements.

## Step 10 — Regulatory Incentives

- **Classification incentives:** Facilities may have stronger incentives to characterize activities as dewatering, storage, or beneficial use rather than disposal.
- **Permitting incentives:** Regulated parties may seek site-specific outcomes that move compliance points farther from receptors or extend cleanup/closure timelines.
- **Record-shaping incentives:** Because EPA is using a large pre-existing CCR record, commenters have incentive to press for proposal-specific evidence rather than letting older analyses do all the work.

## Step 11 — Evidentiary Strength

### Assessment

Moderate

### Observed Fact

The available packet shows that EPA is not acting without analysis. The docket contains RIA and risk materials, and the combined export includes excerpts confirming work on costs, benefits, options, uncertainty, small-business effects, and EJ analysis.

### Inference

The record looks strongest on the existence of analysis and weakest on the visible explanation for why these exact amendment boundaries are the right ones. That is enough for meaningful comments, but not enough to call the current packet fully transparent.

## Step 12 — Administrative Record Gaps

- Proposal-specific criteria for when alternate monitoring points of compliance are appropriate.
- Proposal-specific criteria for when alternate cleanup levels and closure timeframes remain protective.
- A clearer explanation of why the 12,400-ton unencapsulated-use safeguard can be dropped for non-roadway uses.
- A more explicit line between exempt dewatering structures, CCR storage piles, beneficial use, and regulated disposal.
- A clearer showing of whether EPA's earlier legacy-impoundment and CCRMU analyses map cleanly onto the 2026 amendment package.

## Step 13 — Litigation Vulnerabilities

- Under-explained line drawing around exempt structures and excluded beneficial uses.
- Incomplete visible explanation for proposal-specific alternatives to broad site-specific permitting flexibility.
- Potential mismatch between prior legacy-rule analysis and the new amendment package if EPA does not show how the earlier analytical record still fits.
- Possible arbitrariness challenges if cleanup-level or closure-timeframe flexibility is authorized without clear limiting criteria.

## Phase 3 — Comment Generation

## Step 14 — Commentable Sentences

1. "including exempting CCR dewatering structures and modifying the legacy coal combustion residual (CCR) surface impoundment and CCR management unit provisions."
2. "EPA is proposing to establish a new compliance pathway that allows for site-specific considerations during permitting..."
3. "eliminating the requirement for an environmental demonstration for the non-roadway use of more than 12,400 tons of unencapsulated CCR on land..."
4. "proposing a definition of CCR storage pile, and proposing to exclude specific beneficial uses from federal CCR regulations."
5. "EPA is providing notice that EPA will reopen the public comment period for the Federal CCR permit program proposed rule..."

## Step 15 — Procedural Concern Score

**Score:** 6 / 10

The record is not empty or obviously defective. The concern level is moderate because the proposal uses consequential categorical lines and permitting discretion, while the currently visible packet only partially shows the criteria that will keep those choices bounded and reviewable.

## Step 16 — Evidence Requests

- The technical basis for exempting dewatering structures rather than regulating them under narrower conditions.
- Any proposal-specific modeling or examples showing how alternate points of compliance and alternate cleanup levels remain protective.
- Criteria or decision matrices for approving alternative closure requirements and extended closure timeframes.
- The evidence basis for removing the environmental-demonstration requirement for large unencapsulated non-roadway uses.
- A side-by-side explanation of how EPA's prior legacy-impoundment/CCRMU analyses support the 2026 amendment package.

## Step 17 — High-Leverage Comment Angles

1. **Draw the dewatering exemption boundary more clearly**  
Why it matters: if the exemption line is fuzzy, facilities may route regulated waste handling through less regulated structures.  
Specific ask: require objective criteria that distinguish temporary dewatering from longer-term CCR management or disposal.

2. **Impose protective floor criteria on site-specific permitting**  
Why it matters: flexibility without limiting principles can produce inconsistent and weaker outcomes across sites.  
Specific ask: identify minimum findings, data requirements, and public-record explanations for alternate points of compliance, cleanup levels, closure requirements, and closure timeframes.

3. **Retain a safeguard for very large unencapsulated uses**  
Why it matters: removing the environmental-demonstration requirement may blur the line between beneficial use and disposal-like placement.  
Specific ask: keep a simplified demonstration, numeric screening, or rebuttable presumption for very large non-roadway placements.

4. **Explain how old analysis supports new amendments**  
Why it matters: much of the visible analytical spine is tied to the legacy-impoundment and CCRMU record rather than obviously to each 2026 amendment.  
Specific ask: specify which earlier analyses EPA is relying on for each new amendment and identify any proposal-specific updates.

5. **Clarify post-closure extraction conditions**  
Why it matters: extraction during post-closure care could undermine closure assumptions if not carefully bounded.  
Specific ask: define when extraction is allowed, what monitoring must continue, and how EPA will determine whether the unit remains protective during and after extraction.

## Step 18 — Decision Brief

### Leverage Point

Site-specific permitting flexibility needs clearer protective limits.

### Key sentence

"EPA is proposing to establish a new compliance pathway that allows for site-specific considerations during permitting regarding the groundwater monitoring points of compliance, the cleanup levels for corrective action, the appropriate closure requirements, closure timeframes..."

### Routine description

EPA is not simply revising paperwork or deadlines. It is proposing to let core groundwater, cleanup, and closure decisions vary site by site. That may be sensible in some cases, but the available packet only partially shows the criteria that would keep this discretion from becoming inconsistent or underprotective.

### Assessment

- **Regulatory effectiveness:** Potentially improved if flexibility is tightly bounded by transparent criteria.
- **Statutory compliance:** Likely defensible on authority grounds from the available record, but vulnerable if line drawing and permitting criteria remain under-explained.
- **Procedural adequacy:** Moderate. EPA has analysis, but commenters have strong grounds to ask for more proposal-specific explanation.

### Real-world consequence

If EPA leaves these flexibilities broad and poorly cabined, similarly situated facilities may receive different monitoring, cleanup, and closure outcomes, and communities near CCR units may have a harder time understanding whether protections are being relaxed in practice.

### Worth a comment?

**High**

This proposal creates several concrete, commentable leverage points for technically grounded public input, especially on line drawing, permitting criteria, and the distinction between beneficial use and disposal.
