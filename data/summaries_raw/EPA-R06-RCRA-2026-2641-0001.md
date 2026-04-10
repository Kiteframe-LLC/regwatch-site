# Administrative Rulemaking Structural Review

EPA-R06-RCRA-2026-2641-0001

---

## Phase 1 — Docket Integrity Check

**Classification:** Partial analytical spine

**Observed Fact**

The selected document is a substantive NPRM proposing a continuous delisting for WRB Refining LP's stormwater tank solids, not an extension, correction, or reopening notice. The controller-provided metadata and `data/step1_dockets.json` already align `subject_document_id`, `summary_source_document_id`, and `comment_document_id` to `EPA-R06-RCRA-2026-2641-0001`.

The available record includes the NPRM text and metadata for two supporting items: `EPA-R06-RCRA-2026-2641-0002` ("WRB Petition Evaluation") and `EPA-R06-RCRA-2026-2641-0003` ("Sampling and Analysis Plan Stormwater Solids Delisting Petition Project"). Export diagnostics show both supporting files failed download with `http_403`, but both were classified as optional and `missing_required_doc_ids` is empty.

The notice itself contains the central reasoning spine: it identifies the petitioned waste, explains how the waste is generated, reports that EPA considered eight acceptable sample results, states that EPA modeled landfill disposal using DRAS, and proposes specific delisting conditions including testing, reporting, annual volume limits, and reopener language.

The preamble cites an older internal docket reference, `EPA-R06-RCRA-2025-13174`, but the selected Regulations.gov document and step-1 record consistently treat `EPA-R06-RCRA-2026-2641-0001` as the active subject and comment document.

**Inference**

This is not a record-free proposal, but it is still only a partial analytical spine. EPA gives enough information to understand the proposal's theory, yet much of the key support is summarized at a high level instead of being surfaced through attached analytical discussion in the accessible record. The supporting documents might sharpen the evaluation, but on the current record they do not appear mandatory to produce a defensible first-round summary because EPA already discloses the waste type, sample count, modeling framework, disposal scenario, and proposed operating conditions.

**Why that matters**

For a facility-specific delisting NPRM, the best public comments are usually not abstract attacks on EPA's authority. The higher-value questions are whether EPA adequately explains why a continuous delisting is justified from a limited sample record, whether the monitoring and trend-reporting conditions are strong enough, and whether the disposal and reopener conditions are precise enough to manage variability over time.

## Phase 2 — Claim-Centered Analysis

## Step 0 — Extract Agency Reasoning Claims

### Claim 1

**Category:** CONCLUSION
**Quoted sentence:** "The EPA is proposing to grant a continuous delisting to clean out stormwater tanks annually."
**Location:** Section I, Overview Information
**Procedural relevance:** Core regulatory action
**Support type:** preamble explanation

### Claim 2

**Category:** DATA / METHOD
**Quoted sentence:** "A total of eight acceptable sample results were provided by the Petitioner."
**Location:** Section III.C
**Procedural relevance:** Identifies the empirical basis for the proposal
**Support type:** preamble explanation

### Claim 3

**Category:** METHOD / CONCLUSION
**Quoted sentence:** "The EPA considered all eight samples of the stormwater tank solids, and the landfill disposal scenario was modeled using the Delisting Risk Assessment Software (DRAS)."
**Location:** Section III.C
**Procedural relevance:** Describes the analytical method supporting delisting
**Support type:** preamble explanation

### Claim 4

**Category:** CONCLUSION
**Quoted sentence:** "Based on this review, the EPA agrees with the Petitioner that the petitioned waste is nonhazardous with respect to the original listing criteria."
**Location:** Section III.F
**Procedural relevance:** Central substantive conclusion
**Support type:** preamble explanation

### Claim 5

**Category:** LEGAL / CONCLUSION
**Quoted sentence:** "The EPA believes that the petitioned waste does not meet the listing criteria and thus, should not be a listed waste."
**Location:** Section III.F
**Procedural relevance:** Legal and technical conclusion supporting delisting
**Support type:** preamble explanation

### Claim 6

**Category:** SCOPE
**Quoted sentence:** "The annual volume of solids generated from the tank clean outs may not exceed 700 cubic yards."
**Location:** Section IV.C
**Procedural relevance:** Defines the proposed scope and condition of exclusion
**Support type:** preamble explanation

### Claim 7

**Category:** METHOD / DATA
**Quoted sentence:** "Prior to disposal of any future tank cleanouts, the Petitioner must conduct sampling and analysis as described in the delisting sampling and analysis plan and ensure that the waste does not exceed the delisting parameters."
**Location:** Section IV.C
**Procedural relevance:** Monitoring and verification condition
**Support type:** preamble explanation with docket likely but not identified

### Claim 8

**Category:** CONCLUSION / IMPACT
**Quoted sentence:** "The Petitioner should monitor and report increasing trends of constituents which will affect the overall compliance with the stormwater discharge permit."
**Location:** Section IV.C
**Procedural relevance:** Indicates that variability and trend management matter to continued compliance
**Support type:** preamble explanation

## Step 1 — Claim Stress Test

### Major claim: eight samples plus DRAS are enough to support a continuous delisting

**Underlying assumption**

The eight acceptable samples are sufficiently representative of the stormwater tank solids that will be generated and removed on an ongoing annual basis, not just of the sampled period.

**Failure scenario**

Waste composition shifts over time because of operational changes, stormwater conditions, tank accumulation patterns, or changing carry-over from oily dry-weather flows, so the future annual cleanouts are more variable than the historical sample set suggests.

**Procedural implication**

Commenters can ask EPA to explain why eight samples are enough for a continuing exclusion rather than only a limited-duration or more conditional delisting.

### Major claim: the landfill disposal scenario adequately captures risk

**Underlying assumption**

The Subtitle D landfill scenario modeled through DRAS is the relevant and protective real-world management scenario for this waste stream.

**Failure scenario**

Actual handling, storage, dewatering, transport, or on-site disposal conditions differ in ways that increase exposure or release potential relative to the modeled assumptions.

**Procedural implication**

The record would be stronger if EPA explained why the landfill scenario remains protective for the particular handling and disposal pathway it expects WRB to use, especially given the possibility of on-site disposal.

### Major claim: annual verification testing and reporting are enough to control ongoing risk

**Underlying assumption**

Testing "as generated" and reporting annual results will reliably detect meaningful changes before noncompliant waste is managed as nonhazardous.

**Failure scenario**

Sampling frequency or composite design is too coarse to capture localized variability across multiple tanks or across multiple cleanout campaigns within a year.

**Procedural implication**

Commenters can request clearer explanation of sampling frequency, representativeness, and what constitutes an increasing trend that triggers concern.

### Major claim: process-change and reopener provisions are sufficient backstops

**Underlying assumption**

WRB will identify and report process changes that materially affect waste composition, and EPA will receive enough information quickly enough to intervene when necessary.

**Failure scenario**

Process or influent changes occur gradually or indirectly, creating drift in waste composition without a clear single "process change" event or rapid regulatory response.

**Procedural implication**

The record would benefit from more concrete explanation of how EPA expects those backstops to operate in practice.

## Step 2 — Essence of the Rule

### Observed Facts

EPA proposes to grant WRB Refining LP in Borger, Texas a continuous delisting for up to 700 cubic yards per year of F037 stormwater tank solids removed from four wastewater-system tanks. EPA says the waste is listed because of mixture and derived-from rules tied to refinery oily wastewater management, but concludes from petitioner-supplied data and DRAS modeling that the waste does not warrant continued listing if specified conditions are met. Those conditions include TCLP-based verification testing before disposal, a 700-cubic-yard annual volume cap, reporting of annual testing and disposal volume, process-change notification, and a reopener if later information shows exceedances or other relevant environmental data.

### Inference

This is a deregulatory carveout for one refinery's recurring waste stream, not a sector-wide revision. The practical issue for commenters is whether EPA has adequately justified converting a prior one-time delisting into an ongoing annual delisting, and whether the monitoring conditions are robust enough to address variability rather than assuming the future will resemble the sampled past.

## Step 3 — Agency Argument Tree

**Regulatory objective**
Allow WRB to manage qualifying stormwater tank solids as nonhazardous waste rather than listed hazardous waste.

**Problem definition**
WRB's stormwater tank solids are treated as F037 because of refinery wastewater-system routing and mixture/derived-from rules, even though EPA now believes the specific waste stream may not warrant continued listing.

**Data used**
Petitioner descriptions of waste generation, eight acceptable sample results, analytical tables, and DRAS modeling of a landfill disposal scenario.

**Analytical method**
EPA evaluates the waste against original listing criteria, considers additional factors required by HSWA and 40 CFR 260.22, models constituent release through DRAS, and proposes exclusion conditions intended to keep future waste within the evaluated bounds.

**Alternatives considered**
The visible record mainly presents a binary choice between granting the continuous delisting with conditions or not granting it. The notice references a prior one-time delisting but does not meaningfully compare that more limited approach with other possible intermediate options.

**Agency conclusion**
The petitioned stormwater tank solids do not meet the listing criteria and may be delisted continuously, up to 700 cubic yards annually, if WRB follows the proposed verification, reporting, and notification conditions.

### Missing links / unsupported premises / logical jumps

The main jumps are:

1. from eight samples to confidence in an ongoing annual delisting,
2. from a landfill DRAS scenario to assurance that real-world handling and disposal pathways remain bounded by the model,
3. from general references to a sampling and analysis plan to public confidence that the sampling design is sufficiently representative,
4. from trend-reporting language to an operationally clear compliance backstop.

## Step 4 — Analysis Obligations Review

**Adequate data:** Partially satisfied
EPA provides analytical tables, sample count, and a named risk model, but the public-facing record does not deeply explain representativeness or variability across future annual cleanouts.

**Transparent methodology:** Partially satisfied
EPA identifies DRAS and describes exposure pathways at a high level, yet it does not surface enough of the modeling assumptions or sampling-design rationale to make the method easy to evaluate from the NPRM alone.

**Evaluation of reasonable alternatives:** Not demonstrated
The notice does not meaningfully analyze intermediate options such as a time-limited renewal, tighter monitoring triggers, or staged approval before a full continuous exclusion.

**Explanation of analytical thresholds:** Partially satisfied
The proposal lists delisting levels and explains why some DRAS-derived limits above 100% of waste are not physically meaningful, but it gives less explanation for why the selected verification framework is sufficient for ongoing annual generation.

**Consideration of foreseeable impacts:** Partially satisfied
EPA addresses landfill disposal, reporting, and reopener authority, but the record is thinner on foreseeable variability, implementation friction, and how trend detection will work in practice.

## Step 5 — Missing Alternatives Detector

### Regulatory objective: allow recurring management of one refinery waste stream as nonhazardous waste while remaining protective

**Alternatives evaluated**

The visible record mainly presents approval versus denial of the continuous delisting request. It references the earlier one-time delisting as background but does not treat that narrower approach as a live alternative in the current analysis.

**Plausible alternatives not analyzed**

Continue using one-time or short-duration delistings until more years of sampling data accumulate.
Approve the continuous delisting but require more frequent or tank-specific verification before disposal.
Approve only off-site Subtitle D disposal rather than suggesting likely use of an on-site landfill.
Specify quantitative triggers for "increasing trends" that require additional review or sampling.

**Evidence suggesting feasibility**

EPA already distinguishes between a prior one-time delisting and the newly proposed continuous delisting, which shows narrower approaches are administratively available. The notice also proposes detailed conditions, which suggests EPA could have discussed stronger monitoring or trigger-based alternatives without changing the basic delisting framework.

**Stage-aware classification**

**Potential unacknowledged weakness.** EPA is making a firm proposal for an ongoing exclusion but does not show much analysis of less permissive options that might address uncertainty about future variability.

## Step 6 — Technical Coherence

**Observed Fact**

The notice is internally coherent at a high level. It explains what the waste is, why it is currently listed, how the petitioner sampled it, what model EPA used, and what conditions EPA proposes to impose on future management.

**Inference**

The main weakness is not contradiction. It is analytical compression. The proposal asks readers to accept that the combination of eight samples, a landfill model, and future testing conditions adequately supports a continuing exclusion, but much of the reasoning behind that judgment is summarized rather than shown.

**Unknown**

The surfaced record does not show the underlying sampling plan details, tank-by-tank variability treatment, or sensitivity of the DRAS results to different disposal or concentration assumptions.

## Step 7 — Legal Grounding

**Observed Fact**

EPA grounds the proposal in RCRA delisting authority under 40 CFR 260.20 and 260.22, refers to RCRA section 3001(f), and discusses the original listing framework in 40 CFR 261.31 together with mixture and derived-from rules under 40 CFR 261.3.

**Inference**

The likely legal vulnerability is not lack of authority to grant a delisting. It is whether EPA's explanation and record support are sufficiently concrete for an ongoing exclusion rather than a one-time determination.

**Unknown**

The available record does not show whether EPA considered additional permit or landfill-specific legal constraints beyond the general Subtitle D disposal assumption.

## Step 8 — Procedural Normalcy

**Classification:** Normal

**Observed Fact**

This is an ordinary NPRM with a public comment period, standard docket instructions, and conventional statutory and executive-order review language. EPA expressly says final action will follow consideration of public comments.

**Inference**

The procedural leverage here is not about an unusual notice process. It is about using the comment period to push EPA to explain representativeness, future variability, and monitoring design more concretely before finalizing the exclusion.

## Step 9 — Failure Modes

The sample set may underrepresent variability across tanks, seasons, or future operational conditions.

The landfill scenario may not fully capture real-world handling, storage, dewatering, or disposal conditions for all future cleanouts.

Trend reporting may be too vague if EPA does not define what counts as a meaningful increasing trend or what consequence follows.

The proposed annual volume cap may constrain quantity but not necessarily compositional variability.

The process-change trigger may miss gradual or indirect waste-composition drift that does not present as a discrete operational change.

## Step 10 — Regulatory Incentives

**Observed Fact**

If finalized, the proposal would allow WRB to send qualifying future stormwater tank solids to a Subtitle D landfill rather than manage them as listed hazardous waste.

**Inference**

That creates a straightforward incentive to maintain the exclusion and to characterize future waste within the delisting envelope. That is not improper by itself, but it increases the importance of a verification regime that is specific, representative, and difficult to game through selective sampling or overaggregation of tank cleanout material.

## Step 11 — Evidentiary Strength

**Overall assessment:** Moderate

**Strengths**

The notice gives the basic technical theory of the proposal, identifies the waste stream, discloses that EPA relied on eight acceptable samples, names the DRAS model, lists many analytical results and delisting levels, and proposes an enforceable set of exclusion conditions.

**Weaknesses**

The most contestable parts of the proposal are:

* the leap from a limited sample record to a continuous annual delisting,
* the high-level treatment of the sampling and analysis plan rather than surfacing its design,
* the thin explanation of how representative the future verification regime will be across multiple tanks and cleanouts,
* the vague instruction to monitor and report "increasing trends" without much operational detail,
* the limited discussion of narrower alternatives between denial and a full continuous exclusion.

## Step 12 — Administrative Record Gaps

### Gap 1

**Gap type:** Representativeness of the sample record
**Why this matters for commenters now:** The proposal depends heavily on eight acceptable samples, but the public-facing record does not clearly explain why those samples are enough for a continuing annual exclusion.
**Agency already solicits input on this point?** No

### Gap 2

**Gap type:** Sampling-plan transparency
**Why this matters:** EPA says future waste must be sampled "as described in the delisting sampling and analysis plan," but the NPRM does not summarize the plan in enough detail for readers to judge representativeness.
**Agency already solicits input?** No

### Gap 3

**Gap type:** Disposal-scenario specificity
**Why this matters:** EPA models landfill disposal and says the likely landfill may be onsite, yet the record gives limited public-facing discussion of why the assumed management scenario is fully protective.
**Agency already solicits input?** No

### Gap 4

**Gap type:** Trend and trigger clarity
**Why this matters:** The notice says WRB should monitor and report increasing constituent trends, but it does not make the threshold or consequence of a concerning trend very legible.
**Agency already solicits input?** No

### Gap 5

**Gap type:** Alternative-design analysis
**Why this matters:** The record does not explain why EPA chose a continuous delisting rather than a narrower or staged approach that could better manage uncertainty.
**Agency already solicits input?** No

## Step 13 — Litigation Vulnerabilities

The likely vulnerability theme is explanation sufficiency, not agency power.

Potential pressure points:

* whether EPA adequately explains why eight samples support a continuous annual exclusion,
* whether the record sufficiently justifies the representativeness and frequency of verification sampling,
* whether the landfill disposal scenario and likely on-site management assumptions are described concretely enough,
* whether the vague trend-reporting condition is too underexplained to serve as a meaningful backstop,
* whether EPA should have addressed narrower alternatives before proposing a full continuous delisting.

# Phase 3 — Comment Generation

## Step 14 — Commentable Sentences

1. "The EPA is proposing to grant a continuous delisting to clean out stormwater tanks annually."
2. "A total of eight acceptable sample results were provided by the Petitioner."
3. "The EPA considered all eight samples of the stormwater tank solids, and the landfill disposal scenario was modeled using the Delisting Risk Assessment Software (DRAS)."
4. "Based on this review, the EPA agrees with the Petitioner that the petitioned waste is nonhazardous with respect to the original listing criteria."
5. "Prior to disposal of any future tank cleanouts, the Petitioner must conduct sampling and analysis as described in the delisting sampling and analysis plan and ensure that the waste does not exceed the delisting parameters."
6. "The Petitioner should monitor and report increasing trends of constituents which will affect the overall compliance with the stormwater discharge permit."

## Step 15 — Procedural Concern Score

**Score: 5.5 / 10**

Reasoning:
This is a procedurally normal facility-specific NPRM with a meaningful core record, so the score is not high. It moves into the middle range because EPA is proposing a continuing deregulatory exclusion based on a relatively compressed public explanation of sample representativeness, variability management, and monitoring sufficiency.

## Step 16 — Evidence Requests

A commenter could request:

* a clearer explanation of why eight acceptable samples are sufficient to support a continuous delisting rather than only a limited-duration exclusion,
* a public summary of the sampling and analysis plan showing how samples are taken across the four tanks and across future cleanout events,
* more detail on the landfill management scenario used in DRAS, including why likely on-site Subtitle D disposal remains within the modeled protective assumptions,
* clarification of what EPA means by "increasing trends" and what reporting or corrective consequences follow when those trends appear,
* explanation of whether EPA considered tighter monitoring, staged approval, or a renewed one-time approach before selecting a full continuous delisting,
* any supporting memo or evaluation document explaining how EPA assessed waste variability over time.

## Step 17 — High-Leverage Comment Angles

### 1. Ask EPA to justify the move from one-time to continuous delisting more explicitly

A constructive comment can focus on the transition from the 2025 one-time delisting to the proposed annual exclusion and ask EPA to explain why the available record supports that broader step.

### 2. Ask EPA to make the sampling design more legible

Commenters can request a summary of how future verification samples will represent four tanks, different cleanout conditions, and possible variability over time.

### 3. Ask EPA to define its monitoring backstop

The current trend-reporting language is a useful opening, but commenters can ask for clearer triggers, follow-up expectations, and how EPA will treat worsening constituent patterns before a formal exceedance occurs.

### 4. Ask EPA to explain the disposal assumptions with more specificity

Because the notice points to Subtitle D disposal and likely on-site landfill use, commenters can request a clearer connection between the assumed management scenario and the modeled protective conclusions.

### 5. Ask EPA to address narrower alternatives

The record would be stronger if EPA explained why stronger monitoring, staged approval, or a limited-duration extension was unnecessary.

## Step 18 — Decision Brief

### Strongest leverage point

"The EPA considered all eight samples of the stormwater tank solids, and the landfill disposal scenario was modeled using the Delisting Risk Assessment Software (DRAS)."

### Routine description situated in context

EPA has authority to grant facility-specific delistings under RCRA when the record shows a particular waste stream no longer warrants listing and the exclusion conditions remain protective. For this NPRM, the central public-interest question is not whether delisting authority exists, but whether EPA has shown enough to support an ongoing annual exclusion rather than a narrower, more conditional approach.

### Regulatory effectiveness / statutory compliance / procedural adequacy

The proposal is facially adequate enough to support comment, but the administrative record would be stronger if EPA better explained representativeness, future variability, and the practical operation of its monitoring backstops. Those are commentable weaknesses that could be cured without changing the agency's overall analytical framework.

### Real-world consequence of invoking the leverage

If commenters press this point well, EPA may supplement the final record with clearer sampling-plan discussion, variability reasoning, or stronger verification conditions. That would make the final exclusion easier to evaluate and more resilient if challenged later.
