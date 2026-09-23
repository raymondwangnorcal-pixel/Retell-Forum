# Project Decisions

## DEC-0001 — Make community support the primary forum journey

- Date: 2026-09-23
- Owner: user
- Status at record: active
- Decision: Make support resolution the forum's primary job, product feedback the secondary job, and give guests a task-first homepage that becomes personalized after onboarding.
- Rationale: First-time users need a clear route to a useful answer before being asked to understand the forum structure or create an account.
- Scope: Homepage hierarchy, navigation, onboarding, guest access, support discovery, and success metrics.
- Implementation: pending
- Recorded against HEAD: `a3c770e4dae627770f41c1c8f2c8e9167972d9fa`
- Supersedes: none
- Evidence: Approved UX direction implemented in `index.html`, `styles.css`, and `README.md`.
- Privacy waivers: none

## DEC-0002 — Unify search, AI assistance, and community escalation

- Date: 2026-09-23
- Owner: user
- Status at record: active
- Decision: Use one help composer that returns a concise sourced answer alongside relevant community discussions and offers a clear escalation to ask the community.
- Rationale: Separate search, AI, and posting entry points competed for attention and made new users choose a channel before describing their problem.
- Scope: Header search, homepage composer, answer results, support routing, and community post creation.
- Implementation: pending
- Recorded against HEAD: `a3c770e4dae627770f41c1c8f2c8e9167972d9fa`
- Supersedes: none
- Evidence: Approved interaction model implemented in `index.html` and `app.js`.
- Privacy waivers: none

## DEC-0003 — Detect and redact public support identifiers

- Date: 2026-09-23
- Owner: user
- Status at record: active
- Decision: Warn when a public draft contains organization, agent, call, or phone identifiers, offer one-click redaction, and route billing, identity verification, and account-access issues to private support.
- Rationale: Existing public support previews expose operational identifiers that users may not realize are sensitive.
- Scope: Public post composer, private-support routing, content safety, and moderation expectations.
- Implementation: pending
- Recorded against HEAD: `a3c770e4dae627770f41c1c8f2c8e9167972d9fa`
- Supersedes: none
- Evidence: Approved safety behavior implemented in `index.html` and `app.js`.
- Privacy waivers: none

## Update — 2026-09-23 — DEC-0001

- Type: implementation
- Implementation commit: `566beba776f56145bad4c47af2de06a2dc027df0` — feat(forum): add responsive community redesign prototype
- Superseded by: none
- Note: The committed prototype implements the support-first guest journey, simplified navigation, onboarding, and responsive layouts.
- Privacy waivers: none

## Update — 2026-09-23 — DEC-0002

- Type: implementation
- Implementation commit: `566beba776f56145bad4c47af2de06a2dc027df0` — feat(forum): add responsive community redesign prototype
- Superseded by: none
- Note: The committed prototype implements the unified help composer, contextual answer, related discussions, and community escalation.
- Privacy waivers: none

## Update — 2026-09-23 — DEC-0003

- Type: implementation
- Implementation commit: `566beba776f56145bad4c47af2de06a2dc027df0` — feat(forum): add responsive community redesign prototype
- Superseded by: none
- Note: The committed prototype implements identifier detection, one-click redaction, and private-support routing.
- Privacy waivers: none

## DEC-0004 — Use a flat editorial visual system

- Date: 2026-09-23
- Owner: user
- Status at record: active
- Decision: Preserve Retell's black, white, navy, and periwinkle palette while removing decorative gradients, glows, glass effects, uniform rounded cards, stock-style boxed icons, generic marketing copy, and single-family typography.
- Rationale: The previous treatment used common generated-site conventions that made the forum feel templated rather than specific to a technical voice-agent community.
- Scope: Homepage, navigation, topic lists, category headers, dialogs, typography, spacing, interaction states, and visible copy.
- Implementation: pending
- Recorded against HEAD: `691082fc32613f26726f9fb4a5849f3f9dada2a1`
- Supersedes: none
- Evidence: User-approved visual constraints implemented in `index.html`, `styles.css`, and `app.js`.
- Privacy waivers: none
