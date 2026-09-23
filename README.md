# Retell Forum redesign

Standalone front end for a support-first redesign of the Retell AI community forum.

## Run locally

```bash
cd /Applications/Recruiting/retell-forum-prototype
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Included flows

- Unified community search and AI answer composer
- Task-first guest homepage
- Simplified five-destination navigation
- Responsive mobile navigation drawer
- Support filters and issue states
- Verified links to Retell feature requests and roadmap topics
- New-member checklist
- Direct handoff to the official forum for sign-in, posting, and voting
- Status-first incident flow
- Official Retell documentation links for every guide

The site uses public Retell forum topics and documentation. Actions that require a Retell account continue on the official community forum so the static site never simulates publishing, voting, or authentication.

## Deploy to Vercel

Import the repository in Vercel and keep the project root as the deployment root. The site is static and does not require a build command or output-directory override.
