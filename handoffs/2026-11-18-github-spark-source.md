# GitHub Spark: source material from Jan (pasted 2026-11-18)

Jan's own text, kept as pasted (stray image-number lines removed). Source for the Spark lightbox. Not site copy as-is: it's long and some claims need softening (see the handoff note).

---

## Short card version (from the old site)

GitHub Spark: Overcoming Iteration Barriers in AI Code Generation

- Client: GitHub · Platform: AI Web Application · Led: UX Research, Product Design, Prototyping · Year: 2025 · Team: Team of 3
- About this product: I worked with GitHub to research and design for non-technical users of vibe coding tools.
- My approach to messy problems: I led the team through different research methods to find answers. Online Observation, Survey, User Interviews, Competitive Analysis, Usability Testing.
- What we discovered: Participants feel the lack of control over AI. "I'm just asking a question or changing one thing. Why did it change everything?"
- How I solve it: I designed features that gave users more control.
- The part I'm proud of: The design became part of the features launched with GitHub Spark.

---

## Long article: Master Project Article · UW MS HCDE · December 2024 – June 2025

### 1. Project overview
GitHub partnered with graduate students from UW's MS in Human Centered Design & Engineering (HCDE) to explore the next generation of AI-powered development tools. Focus: how AI coding tools could better serve non-technical creators, especially early-stage startup founders turning ideas into working digital products without deep programming knowledge. Goal: identify gaps in the AI development experience and turn research into design principles, guidelines and product recommendations for GitHub Spark.

| Category | Details |
|---|---|
| Client | GitHub |
| Product | GitHub Spark |
| Academic program | UW MS HCDE |
| Timeline | Dec 2024 – Jun 2025 |
| My role | Project Lead / Design Research Lead |
| Team | Designer + Researcher |
| Stakeholders | GitHub Research Team, GitHub Spark Team |
| Platform | Web application |

Mission: explore how AI development tools can empower non-technical creators to build, understand and customize software with greater confidence.

### 2. Challenge: the gap between building with AI and building independently
Generating the first app was only part of the experience. Customizing features, fixing errors, understanding generated code or making small changes caused real friction.

1. Building is easy, but customization is hard. Users struggled to go beyond AI defaults: small tweaks, complex interactions, advanced data handling, third-party integrations.
2. Technical language and errors leave users stuck. Unfamiliar terms; AI explanations didn't help them find or fix the problem.
3. Iteration lacks clarity and control. Users couldn't tell what the AI changed, how components connected, or whether a question or small tweak might break their work.

HMW: help non-technical creators move beyond generating an app to confidently understanding and improving it?

### 3. My role
Project Lead and Design Research Lead.
- Defined the target audience and narrowed the research scope.
- Led user research and comparative usability studies.
- Synthesized findings into three key insights.
- Established design principles and guidelines to align the team.
- Facilitated ideation, design workshops and concept testing.
- Led communication with GitHub stakeholders and presented findings.
- Turned insights into recommendations and long-term product opportunities.

"My biggest responsibility was turning an ambiguous AI design challenge into a focused, research-backed product direction."

### 4. Research
**Research 1: Understanding non-technical creators.** 387 survey responses, 7 interviews.
- Online observation + four-day screener survey (387 responses): who builds with AI, what, and what blocks them.
- 7 one-on-one semi-structured interviews with early-stage non-technical startup founders: motivations, products, where AI tools get stuck, how they test/customize/improve.
- Why non-technical founders: (1) GitHub Research had historically focused on technical developers; AI opened a broader audience. (2) Observations and survey showed growing interest from this underserved group.

Agreed scope with GitHub: non-technical startup founders · digital products · solo / 2–5 people · idea / early build · design tools / no-code / AI dev tools · basic or no coding skills.

**Research 2: Comparative usability testing of AI development tools.** Question: are current AI dev tools actually designed for non-technical creators?
- Group A: technical users. Group B: non-technical users.
- Tools: Vercel v0, Lovable, Bolt, Firebase, Replit, GitHub Spark.
- Both groups did the same app-building tasks in all six tools.

**Three key insights**
1. Speed matters, but so does validation: founders want working prototypes fast to test with users, show investors, judge scalability.
2. Building is easy, but customization is hard.
3. Technical language and errors leave users stuck.

**Opportunity: the iteration cycle.** Idea → Prompt → Test → Refine (Build → Test → Refine → Repeat). After discussing with the Spark team, Jan proposed prioritizing the build–test–refine cycle.

### 5. Design strategy: principles before solutions
Four design directions:
1. Separate learning from editing.
2. Make components understandable and actionable.
3. Make AI changes transparent (what changed, why, how to reverse).
4. Adapt explanations to user expertise.

### 6. Ideation and concept testing
Heuristic evaluation workshop on Spark → sketching → lightweight prototypes → 3 rounds of concept testing with the same participants → refinement. Concept testing, not usability testing, because a fully interactive AI prototype wasn't feasible in the time; "without pretending we had validated a fully functional AI experience."

### 7. Four design recommendations
1. Explain mode vs. Iterate mode: ask and learn without changing the app; suggested questions in Explain mode.
2. Select components to inspect, edit or ask questions: connect UI with underlying logic.
3. History and version control: green = added code, red = deleted, version history.
4. Technical level setting: Beginner / Intermediate / Advanced, so explanations match the user.

### 8. Long-term opportunities
1. Simplify API and database integration. 2. Streamline deployment and sharing. 3. Clarify scaling and cost expectations. Strongest reactions at the Capstone Showcase.

### 9. Impact
- Shared research and recommendations with GitHub stakeholders; the Spark PM reached out through the mentor; the team presented to GitHub.
- GitHub announced Spark's public preview in July 2025. Interaction concepts that aligned with Explain/Iterate mode were seen in the released experience.
- Jan's own caveat: "We observed similarities ... We cannot establish that our recommendations directly caused those product decisions."
- Strong engagement at the UW Capstone Showcase.

### 10. Reflection
1. Navigated complexity, found focus. 2. Established principles, aligned direction. 3. Led collaboration, expanded influence (team disagreements, stakeholders, presenting).

### 11. Fact sheet
387 survey responses · 7 founder interviews · 4-day survey · 6 AI tools compared · technical + non-technical groups · 3 insights · build–test–refine · 3 rounds of concept testing · 4 recommendations · 3 long-term opportunities.

### 12. Accuracy notes (Jan's)
1. Public preview announced July 23, 2025 (not July 26).
2. Say "informing / aligning with / influencing" unless GitHub confirmed adoption.
3. Concept testing, not full interactive AI usability testing.
4. GitHub announced the retirement of the Spark experience on github.com in August 2026; apps could be exported before August 31, 2026.
