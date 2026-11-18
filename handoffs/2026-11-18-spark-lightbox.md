# Handoff: GitHub Spark profile lightbox (2026-11-18)

Treat this as context, not truth: check it against the current code before acting. Project rules are in `CLAUDE.md`; don't repeat them here.

## 1. Goal of the next chat
Prototype the Hinge-style profile lightbox for **GitHub Spark** (`src/content/work/github-spark.md`), filled out the way QINSIGHT's is, from Jan's long article. Ship it as a branch + PR with a Cloudflare preview. **Do not merge to `main`.** Jan reviews first.

## 2. Where things stand
- `main` @ `022d255` "Lighter lightbox top: facts move to 'The basics' (#3)" is live at jan.bitbypixel.com.
- Spark today: only the basic frontmatter (`problem`, `role`, `short`, `metric`). `lesson` is still `[One honest reflection.]`. No `story`, `summary`, `results`, `flagItems`, `timeline`, `closing`. Hero is the coded `spark-logo` demo plus stage backgrounds in `public/work/github-spark/`. The body has `[Details ...]` placeholders.
- **QINSIGHT (`src/content/work/qin-dashboard.md`) is the only case study using the full lightbox fields.** Copy its shape.
- Other remote branches exist (`lightbox-basics`, `lightbox-foot`, `play-pixels`, `qinsight-facts`). Not checked; don't build on them unless Jan says so.
- This note lives on branch `spark-lightbox` (off `main`). Keep working there.

## 3. Decisions made
- **Prototype on a branch, open a PR, don't merge.** Jan asked for this explicitly.
- **Content only, no new layout.** The lightbox (`Profile.astro`) and schema (`src/content.config.ts`) already support everything needed (`story` with `media`, `flagItems`, `flagNote`, `closing`, etc.).
- **Source = Jan's article**, saved in [`2026-11-18-github-spark-source.md`](2026-11-18-github-spark-source.md). Numbers in it come from Jan, so they count as verified: 387 survey responses, 7 founder interviews, 6 AI tools compared, 3 rounds of concept testing, 4 recommendations, 3 long-term opportunities.
- **Say "concept testing", not "usability testing" for the design rounds.** Jan's own accuracy note.

## 4. Open questions (NOT decided; explore with Jan)
- **How strong a claim about the launch?** The site now says "My design became part of the features launched with GitHub Spark." Jan's article says to use "aligned with / informed" unless GitHub confirmed it. Pick wording with her.
- **Mention that Spark was retired (Aug 2026)?** Maybe in the "basics" list or the full story, or not at all.
- **Team:** site says "Team of 3"; article table says "Designer + Researcher". Which is right?
- **Timeline:** "2025" vs "Dec 2024 – Jun 2025" (UW MS HCDE capstone).
- **Green flag:** which number leads? (e.g. 387 responses, or 4 concepts, or the launch line). `stat` is currently just `'2025'`.
- **Lesson / "What I'd do differently":** still empty. The article's reflection is about growth, not a do-over. A candidate is "test with a working AI prototype instead of concepts", but Jan has to choose.
- **Visuals:** no screenshots of the 4 concepts (Explain/Iterate mode, component select, diff history, technical level) are in the repo. Coded demos (like the QIN ones in `src/components/demos/`) vs. images from Jan?

## 5. Next steps
1. `git checkout spark-lightbox`, `npm install`, `npm run dev`.
2. Read the design system README + tokens (links in `CLAUDE.md`) and Board 07, then open QINSIGHT's lightbox to see the target.
3. Ask Jan the open questions above that block copy (launch claim, team, green flag) — one short round.
4. Fill Spark frontmatter: `summary`, `results`, `roleTitle`, `timeline`, `teamSub`, `story` (problem → research → insight quote → 4 concepts → impact), `flagItems`, `flagNote`, `lesson`, `closing`. Keep it short; the lightbox is a profile, not the article. Leave unknowns in `[BRACKETS]`.
5. Optionally tighten the body at `/work/github-spark/` from the same source.
6. `npm run build`, check at 1280–1440px, then phone; both themes; reduced motion.
7. Commit as Jan (see `CLAUDE.md` › Git), push, open a PR, share the preview link. Don't merge.

## 6. Key files
- `src/content/work/github-spark.md`: the file to fill.
- `src/content/work/qin-dashboard.md`: the worked example.
- `src/content.config.ts`: every lightbox field and its fallback.
- `src/components/Profile.astro`: the lightbox markup.
- `src/components/demos/SparkLogo.astro`, `Demo.astro`: hero demo; pattern for any new concept demos.
- `handoffs/2026-11-18-github-spark-source.md`: Jan's full article.

## 7. Suggested skills
`anthropic-skills:frontend-design` (only if a new demo/visual is needed). `anthropic-skills:built-in-browser` to check the preview.

## 8. Waiting on Jan
- Answers to the open questions (launch wording, team size, timeline, green flag, lesson).
- Screenshots or sketches of the 4 concepts, if she wants images rather than coded demos.
- Approval before anything merges.
