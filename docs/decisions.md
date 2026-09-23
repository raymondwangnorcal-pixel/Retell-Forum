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

## Update — 2026-09-23 — DEC-0004

- Type: implementation
- Implementation commit: `ce49521204de384c82ec91766bc1eda2a7ddec0f` — refactor(ui): replace generated-site visual patterns
- Superseded by: none
- Note: The committed redesign replaces gradient-heavy generic styling with the approved flat editorial system across desktop and mobile views.
- Privacy waivers: none

## DEC-0005 — Hand authenticated actions to the official Retell forum

- Date: 2026-09-23
- Owner: shared
- Status at record: active
- Decision: Keep discovery and filtering inside the static redesign, but send sign-in, posting, voting, documentation, roadmap, and status actions to verified official Retell destinations.
- Rationale: A Vercel-hosted static front end must not imply that account-bound actions succeeded locally, and authoritative Retell pages keep those workflows accurate and secure.
- Scope: Account access, support and feature-request submission, feature voting, guide links, topic links, roadmap links, service status, and Vercel deployment behavior.
- Implementation: pending
- Recorded against HEAD: `35e2a272c9494f172f67591770b8237743e8db5d`
- Supersedes: DEC-0003
- Evidence: User requested real redirects for the Vercel deployment; implemented in `index.html`, `app.js`, `styles.css`, and `README.md`.
- Privacy waivers: none

## Update — 2026-09-23 — DEC-0003

- Type: supersession
- Implementation commit: not applicable
- Superseded by: DEC-0005
- Note: The local public-post composer and identifier-redaction flow were replaced by direct handoff to the official Retell forum.
- Privacy waivers: none

## Update — 2026-09-23 — DEC-0005

- Type: implementation
- Implementation commit: `617707e3af590cd1ca1fc701d719a8ee0e88be46` — feat(links): connect actions to official Retell resources
- Superseded by: none
- Note: The static redesign now uses verified Retell forum, documentation, roadmap, account, and status destinations instead of simulated account-bound actions.
- Privacy waivers: none

## DEC-0006 — Suggest verified resources while users type

- Date: 2026-09-23
- Owner: shared
- Status at record: active
- Decision: Show up to four ranked, verified Retell resources after two typed characters, add a full-forum search fallback, and support arrow-key selection, Enter, Escape, and pointer navigation.
- Rationale: First-time users should see useful destinations before submitting a broad query, without turning the static Vercel prototype into a misleading live search service.
- Scope: Homepage help composer, suggestion ranking, keyboard accessibility, result destinations, and forum-search fallback.
- Implementation: pending
- Recorded against HEAD: `73710917ec00a6177f106f585f38fe0f41c0deeb`
- Supersedes: none
- Evidence: User-approved type-ahead behavior implemented in `index.html`, `styles.css`, and `app.js`.
- Privacy waivers: none

## Update — 2026-09-23 — DEC-0006

- Type: implementation
- Implementation commit: `17e97e00149cf14c74468eec3b8797f27b26f3f4` — feat(search): add linked typeahead suggestions
- Superseded by: none
- Note: The homepage composer now presents verified, ranked Retell destinations with accessible keyboard controls and a full-forum search fallback.
- Privacy waivers: none

## DEC-0007 — Add restrained pointer-responsive motion

- Date: 2026-09-23
- Owner: user
- Status at record: active
- Decision: Give fine-pointer desktop wheel input slower weighted inertia and add a subtle periwinkle cursor spotlight, while preserving native touch, keyboard, nested-scroll, zoom-gesture, and reduced-motion behavior.
- Rationale: The requested physical weight and localized pointer feedback make the forum feel more deliberate without sacrificing accessibility or turning the glow into persistent decoration.
- Scope: Page scrolling, pointer feedback, desktop interaction, nested scroll containers, and reduced-motion behavior.
- Implementation: pending
- Recorded against HEAD: `70affbbd7502d3a8d9312146411de90f30be6cee`
- Supersedes: none
- Evidence: User-approved motion direction implemented in `app.js` and `styles.css`; the cursor spotlight is a scoped interaction exception to the decorative-glow restriction in DEC-0004.
- Privacy waivers: none

## Update — 2026-09-23 — DEC-0007

- Type: implementation
- Implementation commit: `abb6c55b069bfbd9e0a5b55ca5119a6c23edcba5` — feat(motion): add weighted scrolling and cursor glow
- Superseded by: none
- Note: Desktop wheel input now follows a controlled inertia curve and a low-opacity periwinkle spotlight tracks fine-pointer movement without intercepting interaction.
- Privacy waivers: none

## DEC-0008 — Use the official Retell wordmark in forum navigation

- Date: 2026-09-23
- Owner: user
- Status at record: active
- Decision: Replace the constructed navigation mark with the supplied Retell logo-and-name wordmark and append a separate Forum label in both desktop and mobile headers.
- Rationale: The navigation should use recognizable Retell branding while keeping the product name Retell Forum explicit.
- Scope: Desktop sidebar branding, mobile top-bar branding, accessible home labels, and the bundled SVG asset.
- Implementation: pending
- Recorded against HEAD: `69e407e39ff2217e89d1b9d3d5e1a2dc5cf06d55`
- Supersedes: none
- Evidence: User-approved branding direction implemented in `index.html`, `styles.css`, and `retell-wordmark.svg`.
- Privacy waivers: none
