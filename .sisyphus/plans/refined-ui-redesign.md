# Refined UI Redesign - Neutral Monochrome with Subtle Effects

## TL;DR

> **Quick Summary**: Replace the heavy orange glassmorphism theme with a refined, neutral monochrome design inspired by weilv.space's subtle aesthetic.
>
> **Deliverables**:
> - New `assets/css/extended/custom.css` with neutral colors, noise textures, glass-liquid effects
> - Updated `static/css/animations.css` with only fade-in-up and scroll-reveals (no continuous animations)
> - Automatic dark mode support (prefers-color-scheme)
> - Slate gray accent color for emphasis
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Delete old CSS → Create new custom.css → Update animations.css → Deploy → Verify

---

## Context

### Original Request
User wanted to optimize the blog UI to make it less simple and more stylish/elegant. Initial attempt created a heavy orange glassmorphism theme which the user rejected ("还不如之前的好看" - not as good looking as before).

User specified they want to change the "背景板" (background design) and provided reference site: https://weilv.space/

### Interview Summary
**Key Discussions**:
- **Fidelity**: "Loose Inspiration" - Learn from weilv.space's minimal/subtle approach, create unique design
- **CSS Strategy**: "Start Fresh" - Delete existing CSS and rebuild from scratch
- **Color Scheme**: "Neutral + One Accent" with slate gray accent (#64748b) - Essentially monochrome with darker gray for emphasis
- **File Scope**: "Simplify Animations" - Delete continuous animations (gradientShift, pulse, float, shimmer) but KEEP scroll-reveals
- **Dark Mode**: "Yes, Auto" - Respect OS setting (prefers-color-scheme)
- **Verification**: Manual - Deploy to GitHub Pages, user reviews in browser

### Research Findings
**weilv.space Design Patterns**:
- Noise texture: SVG feTurbulence filter (baseFrequency="0.65", numOctaves="3", opacity="0.4")
- Glass-liquid: backdrop-filter: blur(24px) + semi-transparent backgrounds (rgba 0.6-0.8)
- Typography: Serif headings (Bodoni Moda, Playfair Display), Sans-serif body (Inter) - **NOT adopting font changes**
- Animations: Single keyframe - fade-in-up (0.6s ease-out) with staggered delays
- Hover: Very subtle - scale-[1.005], shadow-2xl, color transitions
- Border-radius: Large - rounded-2xl (1rem), rounded-full (9999px)

### Metis Review
**Identified Gaps** (addressed):
- **Gap**: Multiple CSS files exist, not just custom.css → **Resolved**: Clarified file scope with user
- **Gap**: Dark mode support unclear → **Resolved**: User chose "Yes, Auto" with prefers-color-scheme
- **Gap**: "Neutral" definition ambiguous → **Resolved**: User chose "Neutral + One Accent" with slate gray
- **Gap**: Animation scope unclear → **Resolved**: User chose "Simplify" - keep scroll-reveals, delete continuous
- **Gap**: Missing acceptance criteria → **Resolved**: Added automated verification commands

**Guardrails Applied** (from Metis):
- MUST NOT change font families or import web fonts
- MUST NOT add animations beyond fade-in-up and scroll-reveals
- MUST NOT leave any orange colors in final CSS
- MUST maintain @media (prefers-reduced-motion: reduce) support
- MUST provide fallbacks for backdrop-filter if not supported

---

## Work Objectives

### Core Objective
Replace the orange glassmorphism CSS with a refined, neutral monochrome design that incorporates subtle noise textures, glass-liquid effects, and minimal animations inspired by weilv.space.

### Concrete Deliverables
- `assets/css/extended/custom.css` - Complete rewrite with neutral colors, noise textures, glass-liquid effects
- `static/css/animations.css` - Simplified version with only fade-in-up and scroll-reveal animations
- Automatic dark mode support using `@media (prefers-color-scheme: dark)`
- All orange colors removed and replaced with neutral grays and slate accent

### Definition of Done
- [x] `grep -r "#e67e22\|#f39c12\|#d35400\|#e74c3c" assets/ static/` returns no matches (zero orange colors)
- [x] `grep -c "@keyframes" static/css/animations.css` equals 2 (fadeInUp, fadeIn)
- [x] `grep -c "feTurbulence\|baseFrequency" assets/css/extended/custom.css` >= 1 (noise texture exists)
- [x] `grep -c "backdrop-filter" assets/css/extended/custom.css` >= 2 (glass-liquid effect exists)
- [x] `grep -c "prefers-color-scheme" assets/css/extended/custom.css` >= 1 (dark mode exists)
- [x] Hugo builds successfully: `hugo --minify` → exit code 0
- [x] Deployed to GitHub Pages and user has reviewed

### Must Have
- Neutral color palette (black, white, grays, slate gray accent)
- Subtle noise texture on backgrounds (SVG feTurbulence)
- Glass-liquid effect with backdrop-filter: blur(24px)
- Fade-in-up animation on page load (0.6s ease-out)
- Scroll-reveal animations (existing .reveal, .reveal-left, .reveal-right)
- Automatic dark mode (prefers-color-scheme)
- Subtle hover effects (scale-[1.005], shadow-2xl)
- Large border-radius values (rounded-2xl, rounded-full)

### Must NOT Have (Guardrails)
- **NO orange colors** - Remove all orange, pink, warm gradients
- **NO continuous animations** - No pulse, float, shimmer, gradientShift, infinite loops
- **NO font changes** - Keep existing fonts (Noto Sans SC, PingFang SC, system fonts)
- **NO web font imports** - Do NOT import Bodoni Moda, Inter, Playfair Display
- **NO extra animations** - Only fade-in-up and scroll-reveals
- **NO bold decorative elements** - No ✦ symbols, large quote marks, bold dividers
- **NO heavy glassmorphism** - Light, subtle effects only (not blur 20px everywhere)

---

## Verification Strategy (MANDATORY)

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks in this plan MUST be verifiable WITHOUT any human action.
> This is NOT conditional — it applies to EVERY task, regardless of test strategy.
>
> **FORBIDDEN** — acceptance criteria that require:
> - "User manually tests..." / "用户手动测试..."
> - "User visually confirms..." / "用户视觉确认..."
> - "User interacts with..." / "用户交互..."
> - "Ask user to verify..." / "让用户确认..."
> - ANY step where a human must perform an action
>
> **ALL verification is executed by the agent** using tools (Playwright, interactive_bash, curl, etc.). No exceptions.

### Test Decision
- **Infrastructure exists**: NO (Hugo static site, no test framework)
- **Automated tests**: NO (User chose manual verification)
- **Framework**: None
- **Primary verification**: Manual review by user after GitHub Pages deployment

### Agent-Executed QA Scenarios (MANDATORY — ALL tasks)

> Every task MUST include Agent-Executed QA Scenarios.
> These describe how the executing agent DIRECTLY verifies the deliverable
> by running it — building the site, checking CSS, verifying deployment.
>
> **Each scenario MUST be ultra-detailed with exact commands, selectors, and assertions.**

**Verification Tools**:
- **Hugo Build**: Bash - `hugo --minify` command
- **CSS Verification**: Bash - `grep` commands to check for colors, animations, effects
- **Deployment**: Bash - `git push` to trigger GitHub Actions
- **Visual Check**: User manually reviews deployed site (explicitly allowed per user choice)

**Each Scenario MUST Follow This Format**:
```
Scenario: [Descriptive name]
  Tool: [Bash / Hugo / Git]
  Preconditions: [What must be true]
  Steps:
    1. [Exact command with specific arguments]
    2. [Next command with expected output]
    3. [Assertion with exact expected value]
  Expected Result: [Concrete, observable outcome]
  Failure Indicators: [What would indicate failure]
  Evidence: [Exit code, output capture, URL]
```

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Delete and recreate custom.css (no dependencies)
└── Task 2: Simplify animations.css (no dependencies)

Wave 2 (After Wave 1):
└── Task 3: Build, test, and deploy (depends on both CSS files)

Critical Path: Task 1 → Task 3
Parallel Speedup: ~50% faster than sequential
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 3 | 2 |
| 2 | None | 3 | 1 |
| 3 | 1, 2 | None | None (final) |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1, 2 | delegate_task(category="visual-engineering", load_skills=["frontend-ui-ux"], run_in_background=true) for both |
| 2 | 3 | delegate_task(category="quick", load_skills=["git-master"], run_in_background=false) |

---

## TODOs

> Implementation + Verification = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info.

- [x] 1. Delete and Recreate custom.css with Neutral Design

  **What to do**:
  - Delete the existing `assets/css/extended/custom.css` file completely
  - Create a new `assets/css/extended/custom.css` with the following design:

  **Color Palette**:
  ```css
  :root {
    /* Light mode */
    --color-bg: #ffffff;
    --color-surface: #f8fafc;        /* Slate-50 */
    --color-text: #1e293b;           /* Slate-800 */
    --color-text-muted: #64748b;     /* Slate-500 */
    --color-border: #e2e8f0;         /* Slate-200 */
    --color-accent: #64748b;         /* Slate-500 (accent) */
    --color-accent-hover: #475569;   /* Slate-600 */

    /* Dark mode */
    --color-bg-dark: #0f172a;        /* Slate-900 */
    --color-surface-dark: #1e293b;   /* Slate-800 */
    --color-text-dark: #f1f5f9;      /* Slate-100 */
    --color-text-muted-dark: #94a3b8; /* Slate-400 */
    --color-border-dark: #334155;    /* Slate-700 */
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-bg: var(--color-bg-dark);
      --color-surface: var(--color-surface-dark);
      --color-text: var(--color-text-dark);
      --color-text-muted: var(--color-text-muted-dark);
      --color-border: var(--color-border-dark);
    }
  }
  ```

  **Noise Texture Background**:
  ```css
  /* Create noise texture using SVG data URI or CSS gradient */
  body {
    background-color: var(--color-bg);
    background-image:
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E"),
      linear-gradient(135deg, var(--color-bg) 0%, var(--color-surface) 100%);
    background-attachment: fixed;
    color: var(--color-text);
  }
  ```

  **Glass-Liquid Effect**:
  ```css
  .glass-liquid {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
  }

  @media (prefers-color-scheme: dark) {
    .glass-liquid {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  /* Glass-liquid cards on hover */
  .glass-liquid:hover {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transform: scale(1.005);
    transition: all 0.3s ease;
  }

  @media (prefers-color-scheme: dark) {
    .glass-liquid:hover {
      background: rgba(15, 23, 42, 0.8);
    }
  }
  ```

  **Typography (Keep existing fonts)**:
  ```css
  /* Do NOT change font families - keep existing */
  body {
    font-family: 'Noto Sans SC', 'PingFang SC', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.7;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Noto Sans SC', 'PingFang SC', -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 600;
    color: var(--color-text);
  }
  ```

  **Fade-In-Up Animation**:
  ```css
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in-up {
    animation: fadeInUp 0.6s ease-out;
  }

  /* Staggered delays */
  .fade-in-up-delay-1 { animation-delay: 0ms; }
  .fade-in-up-delay-2 { animation-delay: 100ms; }
  .fade-in-up-delay-3 { animation-delay: 200ms; }
  .fade-in-up-delay-4 { animation-delay: 300ms; }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .fade-in-up {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
  ```

  **Subtle Hover Effects**:
  ```css
  /* Card hover */
  .post-entry {
    transition: all 0.3s ease;
  }

  .post-entry:hover {
    transform: scale(1.005);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  /* Link hover */
  a {
    color: var(--color-accent);
    transition: color 0.3s ease;
  }

  a:hover {
    color: var(--color-accent-hover);
  }

  /* Tag hover */
  .tags a {
    border: 1px solid var(--color-border);
    border-radius: 9999px;
    padding: 0.25rem 0.75rem;
    transition: all 0.3s ease;
  }

  .tags a:hover {
    background: var(--color-accent);
    color: white;
    border-color: var(--color-accent);
  }
  ```

  **Large Border Radius**:
  ```css
  /* Cards, buttons, containers */
  .post-entry,
  .glass-liquid,
  .nav-links,
  button {
    border-radius: 1rem; /* rounded-2xl */
  }

  /* Pills, tags, small buttons */
  .tags a,
  .badge {
    border-radius: 9999px; /* rounded-full */
  }
  ```

  **Backdrop Filter Fallback**:
  ```css
  @supports not (backdrop-filter: blur(24px)) {
    .glass-liquid {
      background: rgba(255, 255, 255, 0.9);
    }

    @media (prefers-color-scheme: dark) {
      .glass-liquid {
        background: rgba(15, 23, 42, 0.9);
      }
    }
  }
  ```

  **Code Blocks** (neutral style):
  ```css
  pre, code {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    color: var(--color-text);
  }

  /* Code block header (neutral dots) */
  pre::before {
    content: '';
    display: block;
    height: 0.5rem;
    background: linear-gradient(90deg,
      #cbd5e1 0%, #cbd5e1 33%,
      #94a3b8 33%, #94a3b8 66%,
      #64748b 66%, #64748b 100%
    );
    border-radius: 0.5rem 0.5rem 0 0;
    margin-bottom: 0.5rem;
  }
  ```

  **Blockquotes** (neutral style):
  ```css
  blockquote {
    border-left: 4px solid var(--color-accent);
    background: var(--color-surface);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0 1rem 1rem 0;
    color: var(--color-text-muted);
  }

  blockquote p {
    margin: 0;
  }
  ```

  **Tables** (neutral style):
  ```css
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1.5rem 0;
    border-radius: 1rem;
    overflow: hidden;
  }

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }

  th {
    background: var(--color-surface);
    font-weight: 600;
  }

  tr:hover {
    background: var(--color-surface);
  }
  ```

  **Scrollbar** (neutral style):
  ```css
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-surface);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-accent);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-accent-hover);
  }
  ```

  **Text Selection** (neutral style):
  ```css
  ::selection {
    background: var(--color-accent);
    color: white;
  }

  ::-moz-selection {
    background: var(--color-accent);
    color: white;
  }
  ```

  **Must NOT do**:
  - NO orange, pink, warm colors (#e67e22, #f39c12, #d35400, #e74c3c)
  - NO continuous animations (gradientShift, pulse, float, shimmer)
  - NO font family changes or web font imports
  - NO bold decorative elements (✦ symbols, large quote marks)
  - NO heavy glassmorphism (blur 20px everywhere - only use 24px on specific elements)

  **Recommended Agent Profile**:
  > Select category + skills based on task domain.
  - **Category**: `visual-engineering`
    - Reason: Frontend CSS implementation with design system requirements
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: CSS design systems, color theory, typography, spacing, responsive design
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed for this task (no browser testing required)
    - `git-master`: Not needed for this task (file creation only)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Task 3
  - **Blocked By**: None (can start immediately)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `assets/css/extended/custom.css` (current) - Review structure to understand what to replace, keep responsive breakpoints pattern
  - `hugo.toml` - Verify CSS loading configuration (should load from assets/css/extended/)

  **Design References** (aesthetic patterns to implement):
  - weilv.space - Noise texture pattern (feTurbulence SVG filter with baseFrequency="0.65")
  - weilv.space - Glass-liquid effect (backdrop-filter: blur(24px) + rgba backgrounds)
  - weilv.space - Fade-in-up animation (0.6s ease-out, staggered delays)
  - weilv.space - Hover effects (scale-[1.005], shadow-2xl)
  - Tailwind CSS docs - Slate color palette values (#f8fafc, #1e293b, #64748b, etc.)

  **Technical References** (CSS specifications):
  - MDN - `backdrop-filter` property: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
  - MDN - `@media (prefers-color-scheme)`: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
  - MDN - `@media (prefers-reduced-motion)`: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
  - SVG feTurbulence docs: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence

  **Hugo References** (build system):
  - Hugo Docs - CSS Organization: https://gohugo.io/hugo-pipes/css-processing/
  - PaperMod theme - Ensure compatibility with existing theme structure

  **WHY Each Reference Matters**:
  - `assets/css/extended/custom.css` (current): Shows the structure to replace, helps identify responsive breakpoints to preserve
  - weilv.space noise pattern: Provides exact SVG filter values for texture effect
  - Tailwind Slate palette: Gives concrete hex values for neutral color system
  - MDN backdrop-filter: Ensures proper syntax and fallback support
  - Hugo CSS docs: Confirms files are in correct location for Hugo pipeline

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  - [ ] File created: assets/css/extended/custom.css
  - [ ] File size: Between 15-25 KB (compressed, not bloated)
  - [ ] NO orange colors: `grep -i "#e67e22\|#f39c12\|#d35400\|#e74c3c\|#d35400\|#c0392b" assets/css/extended/custom.css` → Exit code 1 (no matches)
  - [ ] Has noise texture: `grep -c "feTurbulence\|baseFrequency" assets/css/extended/custom.css` → Count >= 1
  - [ ] Has glass-liquid: `grep -c "backdrop-filter" assets/css/extended/custom.css` → Count >= 2
  - [ ] Has fade-in-up: `grep -c "@keyframes fadeInUp\|@keyframes fade-in-up" assets/css/extended/custom.css` → Count >= 1
  - [ ] Has dark mode: `grep -c "prefers-color-scheme" assets/css/extended/custom.css` → Count >= 1
  - [ ] Has reduced motion: `grep -c "prefers-reduced-motion" assets/css/extended/custom.css` → Count >= 1
  - [ ] Has fallback: `grep -c "@supports not (backdrop-filter" assets/css/extended/custom.css` → Count >= 1
  - [ ] Has slate accent: `grep -c "#64748b\|--color-accent" assets/css/extended/custom.css` → Count >= 2

  **Agent-Executed QA Scenarios (MANDATORY — per-scenario, ultra-detailed):**

  ```
  Scenario: CSS file exists and contains neutral colors
    Tool: Bash
    Preconditions: None
    Steps:
      1. test -f assets/css/extended/custom.css
      2. grep -c "color" assets/css/extended/custom.css
    Expected Result: File exists and contains color definitions
    Failure Indicators: File doesn't exist, or no color definitions found
    Evidence: Exit code 0, color count >= 10

  Scenario: No orange colors remain in CSS
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. grep -i "#e67e22\|#f39c12\|#d35400\|#e74c3c\|#d35400\|#c0392b\|#ff6b35\|#ff8c42" assets/css/extended/custom.css || true
    Expected Result: Command returns no matches (exit code 1)
    Failure Indicators: Any orange color codes found in output
    Evidence: Empty output, exit code 1

  Scenario: Noise texture is implemented
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. grep -c "feTurbulence" assets/css/extended/custom.css
      2. grep "baseFrequency" assets/css/extended/custom.css
    Expected Result: feTurbulence count >= 1, baseFrequency value is 0.65
    Failure Indicators: feTurburbation count is 0, or baseFrequency missing
    Evidence: Count >= 1, baseFrequency="0.65" in output

  Scenario: Glass-liquid effect is implemented
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. grep -c "backdrop-filter" assets/css/extended/custom.css
      2. grep "backdrop-filter.*blur" assets/css/extended/custom.css
    Expected Result: backdrop-filter count >= 2, blur value is 24px
    Failure Indicators: backdrop-filter count < 2, or blur value is not 24px
    Evidence: Count >= 2, blur(24px) in output

  Scenario: Dark mode support is implemented
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. grep -c "prefers-color-scheme" assets/css/extended/custom.css
      2. grep "@media (prefers-color-scheme: dark)" assets/css/extended/custom.css
    Expected Result: prefers-color-scheme count >= 1, media query exists
    Failure Indicators: prefers-color-scheme count is 0, or media query missing
    Evidence: Count >= 1, media query present in output

  Scenario: Reduced motion support is implemented
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. grep -c "prefers-reduced-motion" assets/css/extended/custom.css
      2. grep "@media (prefers-reduced-motion: reduce)" assets/css/extended/custom.css
    Expected Result: prefers-reduced-motion count >= 1, media query exists
    Failure Indicators: prefers-reduced-motion count is 0, or media query missing
    Evidence: Count >= 1, media query present in output

  Scenario: Backdrop filter fallback is implemented
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. grep -c "@supports not (backdrop-filter" assets/css/extended/custom.css
    Expected Result: Count >= 1
    Failure Indicators: Count is 0, no fallback support
    Evidence: Count >= 1, @supports rule present

  Scenario: Slate accent color is used
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. grep -c "#64748b" assets/css/extended/custom.css
      2. grep -c "--color-accent" assets/css/extended/custom.css
    Expected Result: #64748b count >= 1, --color-accent count >= 2
    Failure Indicators: Either count is 0
    Evidence: #64748b >= 1, --color-accent >= 2

  Scenario: CSS file is not bloated
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. wc -c assets/css/extended/custom.css
      2. stat -f%z assets/css/extended/custom.css 2>/dev/null || stat -c%s assets/css/extended/custom.css
    Expected Result: File size between 15,000 and 25,000 bytes
    Failure Indicators: File size < 15,000 (too minimal) or > 25,000 (bloated)
    Evidence: Size in bytes within range
  ```

  **Evidence to Capture**:
  - [ ] Exit codes from all grep commands (should be 0 or 1 as appropriate)
  - [ ] Output of grep commands showing key patterns found
  - [ ] File size verification output
  - [ ] No screenshot needed (user will review deployed site)

  **Commit**: YES (groups with Task 2)
  - Message: `refactor(ui): replace orange glassmorphism with neutral monochrome design`
  - Files: `assets/css/extended/custom.css`, `static/css/animations.css`
  - Pre-commit: `hugo --minify` (verify build succeeds)

- [x] 2. Simplify animations.css - Remove Continuous Animations

  **What to do**:
  - Open `static/css/animations.css`
  - DELETE the following animations:
    - `@keyframes gradientShift` (the infinite 30s gradient loop)
    - `@keyframes shimmer`
    - `@keyframes pulse`
    - `@keyframes float`
  - KEEP the following animations:
    - `@keyframes fadeIn` (basic fade in)
    - `@keyframes fadeInUp` (fade in with upward motion)
    - Scroll-reveal classes (`.reveal`, `.reveal-left`, `.reveal-right`)
  - REMOVE any `animation` properties that use infinite loop:
    - Remove `animation: gradientShift 30s ease infinite`
    - Remove any `infinite` keyword from animation declarations
  - Ensure all remaining animations respect `@media (prefers-reduced-motion: reduce)`

  **Must NOT do**:
  - DO NOT delete scroll-reveal classes (`.reveal`, `.reveal-left`, `.reveal-right`)
  - DO NOT delete fadeIn or fadeInUp keyframes
  - DO NOT modify the JavaScript file `static/js/animations.js`
  - DO NOT change class names or HTML structure

  **Recommended Agent Profile**:
  > Select category + skills based on task domain.
  - **Category**: `quick`
    - Reason: Simple file modification with clear delete/keep instructions
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: CSS animations understanding, keyframe syntax
  - **Skills Evaluated but Omitted**:
    - `git-master`: Not needed for this task (file modification only)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 1)
  - **Blocks**: Task 3
  - **Blocked By**: None (can start immediately)

  **References** (CRITICAL - Be Exhaustive):

  **Pattern References** (existing code to follow):
  - `static/css/animations.css` - Current file to modify, identifies which animations to delete vs keep
  - `static/js/animations.js` - JavaScript that uses scroll-reveal classes (ensure class names match)

  **Design References** (animation patterns to preserve):
  - weilv.space - Fade-in-up animation (0.6s ease-out, no infinite loops)

  **WHY Each Reference Matters**:
  - `static/css/animations.css`: Shows exact animation names to delete (gradientShift, shimmer, pulse, float) vs keep (fadeIn, fadeInUp)
  - `static/js/animations.js`: Ensures we don't break scroll-reveal functionality by keeping required class names

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.

  - [ ] File exists: static/css/animations.css
  - [ ] NO gradientShift: `grep -c "gradientShift" static/css/animations.css` → Count = 0
  - [ ] NO shimmer: `grep -c "shimmer" static/css/animations.css` → Count = 0
  - [ ] NO pulse: `grep -c "@keyframes pulse" static/css/animations.css` → Count = 0
  - [ ] NO float: `grep -c "@keyframes float" static/css/animations.css` → Count = 0
  - [ ] NO infinite: `grep -c "infinite" static/css/animations.css` → Count = 0
  - [ ] HAS fadeIn: `grep -c "@keyframes fadeIn" static/css/animations.css` → Count >= 1
  - [ ] HAS fadeInUp: `grep -c "@keyframes fadeInUp" static/css/animations.css` → Count >= 1
  - [ ] HAS reveal classes: `grep -c "\.reveal\|\.reveal-left\|\.reveal-right" static/css/animations.css` → Count >= 3
  - [ ] HAS reduced motion: `grep -c "prefers-reduced-motion" static/css/animations.css` → Count >= 1
  - [ ] Animation count exactly 2: `grep -c "@keyframes" static/css/animations.css` → Count = 2

  **Agent-Executed QA Scenarios (MANDATORY — per-scenario, ultra-detailed):**

  ```
  Scenario: Continuous animations are removed
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. grep -c "gradientShift" static/css/animations.css || true
      2. grep -c "shimmer" static/css/animations.css || true
      3. grep -c "@keyframes pulse" static/css/animations.css || true
      4. grep -c "@keyframes float" static/css/animations.css || true
      5. grep -c "infinite" static/css/animations.css || true
    Expected Result: All counts = 0 (no continuous animations)
    Failure Indicators: Any count > 0
    Evidence: All counts = 0

  Scenario: Fade-in animations are preserved
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. grep -c "@keyframes fadeIn" static/css/animations.css
      2. grep -c "@keyframes fadeInUp" static/css/animations.css
    Expected Result: Both counts >= 1
    Failure Indicators: Either count = 0
    Evidence: fadeIn >= 1, fadeInUp >= 1

  Scenario: Scroll-reveal classes are preserved
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. grep -c "\.reveal {" static/css/animations.css
      2. grep -c "\.reveal-left {" static/css/animations.css
      3. grep -c "\.reveal-right {" static/css/animations.css
    Expected Result: All 3 classes present
    Failure Indicators: Any class missing (count = 0)
    Evidence: All 3 counts >= 1

  Scenario: Reduced motion support is preserved
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. grep -c "prefers-reduced-motion" static/css/animations.css
    Expected Result: Count >= 1
    Failure Indicators: Count = 0
    Evidence: Count >= 1

  Scenario: Total animation count is exactly 2
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. grep -c "@keyframes" static/css/animations.css
    Expected Result: Count = 2 (only fadeIn and fadeInUp)
    Failure Indicators: Count != 2
    Evidence: Count = 2
  ```

  **Evidence to Capture**:
  - [ ] Counts of deleted animations (all 0)
  - [ ] Counts of preserved animations (fadeIn, fadeInUp >= 1)
  - [ ] Counts of reveal classes (all 3 present)
  - [ ] Total @keyframes count (should be exactly 2)

  **Commit**: YES (groups with Task 1)
  - Message: `refactor(ui): replace orange glassmorphism with neutral monochrome design`
  - Files: `assets/css/extended/custom.css`, `static/css/animations.css`
  - Pre-commit: `hugo --minify` (verify build succeeds)

- [x] 3. Build, Deploy, and Verify

  **What to do**:
  - Run Hugo build to verify no errors
  - Add modified files to git
  - Commit with descriptive message
  - Push to GitHub to trigger deployment
  - Verify deployment succeeds

  **Must NOT do**:
  - DO NOT modify Hugo templates or theme files
  - DO NOT change content or layout structure
  - DO NOT create new git branches (use main branch)

  **Recommended Agent Profile**:
  > Select category + skills based on task domain.
  - **Category**: `quick`
    - Reason: Build and deploy commands are straightforward
  - **Skills**: [`git-master`]
    - `git-master`: Git operations, commit best practices, push to remote
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not needed for this task (no CSS modifications)

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Wave 2)
  - **Blocks**: None (final task)
  - **Blocked By**: Tasks 1, 2 (must wait for both CSS files)

  **References** (CRITICAL - Be Exhaustive):

  **Technical References** (build and deploy):
  - `hugo.toml` - Hugo configuration file
  - `.github/workflows/hugo.yaml` - GitHub Actions workflow for deployment
  - Hugo Docs - Build command: https://gohugo.io/commands/hugo/

  **Git References** (version control):
  - Git Docs - git add: https://git-scm.com/docs/git-add
  - Git Docs - git commit: https://git-scm.com/docs/git-commit
  - Git Docs - git push: https://git-scm.com/docs/git-push

  **WHY Each Reference Matters**:
  - `hugo.toml`: Confirms Hugo configuration is correct for building
  - `.github/workflows/hugo.yaml`: Shows deployment workflow triggers on push
  - Hugo build docs: Ensures correct command syntax (`hugo --minify`)
  - Git docs: Provides standard patterns for commit messages and push operations

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.

  - [ ] Hugo build succeeds: `hugo --minify` → Exit code 0
  - [ ] No build errors: Output contains no "ERROR" strings
  - [ ] Git status shows modified files: `git status --short` → Shows 2 files (custom.css, animations.css)
  - [ ] Files committed: `git log -1 --oneline` → Shows commit with expected message
  - [ ] Push succeeds: `git push origin main` → Exit code 0
  - [ ] GitHub Actions workflow triggered: URL provided in output

  **Agent-Executed QA Scenarios (MANDATORY — per-scenario, ultra-detailed):**

  ```
  Scenario: Hugo build succeeds without errors
    Tool: Bash
    Preconditions: Tasks 1 and 2 completed
    Steps:
      1. hugo --minify
      2. echo $?
    Expected Result: Exit code 0, no "ERROR" in output
    Failure Indicators: Exit code != 0, or "ERROR" appears in output
    Evidence: Exit code 0, clean build output

  Scenario: Git status shows expected changes
    Tool: Bash
    Preconditions: Files modified but not committed
    Steps:
      1. git status --short
    Expected Result: Shows 2 modified files:
      M assets/css/extended/custom.css
      M static/css/animations.css
    Failure Indicators: Different number of files, or unexpected files modified
    Evidence: Status output shows exactly 2 files

  Scenario: Git commit is created correctly
    Tool: Bash
    Preconditions: Files staged for commit
    Steps:
      1. git add assets/css/extended/custom.css static/css/animations.css
      2. git commit -m "refactor(ui): replace orange glassmorphism with neutral monochrome design"
      3. git log -1 --oneline
    Expected Result: Commit created with message starting with "refactor(ui):"
    Failure Indicators: Commit fails, or message doesn't match expected pattern
    Evidence: git log shows commit with correct message

  Scenario: Git push succeeds
    Tool: Bash
    Preconditions: Commit created
    Steps:
      1. git push origin main
      2. echo $?
    Expected Result: Exit code 0, push output shows "Writing objects"
    Failure Indicators: Exit code != 0, or "error" in output
    Evidence: Exit code 0, successful push message

  Scenario: GitHub Actions workflow triggered
    Tool: Bash
    Preconditions: Push succeeded
    Steps:
      1. sleep 5
      2. gh run list --limit 1
    Expected Result: Shows recent workflow run triggered by our push
    Failure Indicators: No recent run, or run failed
    Evidence: gh run list shows workflow with status "success" or "in_progress"
  ```

  **Evidence to Capture**:
  - [ ] Hugo build output (showing success)
  - [ ] Git status output (showing 2 modified files)
  - [ ] Git commit log (showing commit message)
  - [ ] Git push output (showing success)
  - [ ] GitHub Actions workflow URL

  **Commit**: YES (this task performs the commit)
  - Message: `refactor(ui): replace orange glassmorphism with neutral monochrome design`
  - Files: `assets/css/extended/custom.css`, `static/css/animations.css`
  - Pre-commit: `hugo --minify` (verify build succeeds)

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 + 2 (together) | `refactor(ui): replace orange glassmorphism with neutral monochrome design` | custom.css, animations.css | `hugo --minify` |
| 3 | (Performs the commit above) | (Same as above) | Build + push |

---

## Success Criteria

### Verification Commands
```bash
# 1. No orange colors in CSS
grep -r "#e67e22\|#f39c12\|#d35400\|#e74c3c" assets/ static/
# Expected: No matches (exit code 1)

# 2. Only 2 animations remain
grep -c "@keyframes" static/css/animations.css
# Expected: 2 (fadeIn, fadeInUp)

# 3. Noise texture exists
grep -c "feTurbulence\|baseFrequency" assets/css/extended/custom.css
# Expected: >= 1

# 4. Glass-liquid effect exists
grep -c "backdrop-filter" assets/css/extended/custom.css
# Expected: >= 2

# 5. Dark mode support exists
grep -c "prefers-color-scheme" assets/css/extended/custom.css
# Expected: >= 1

# 6. Reduced motion support exists
grep -c "prefers-reduced-motion" assets/css/extended/custom.css static/css/animations.css
# Expected: >= 2 (one in each file)

# 7. Hugo builds successfully
hugo --minify
# Expected: Exit code 0, no errors
```

### Final Checklist
- [x] All orange colors removed (grep finds none)
- [x] Only fadeIn and fadeInUp animations exist
- [x] Noise texture implemented (feTurbulence)
- [x] Glass-liquid effect implemented (backdrop-filter)
- [x] Dark mode support (prefers-color-scheme)
- [x] Reduced motion support (prefers-reduced-motion)
- [x] Backdrop filter fallback (@supports)
- [x] Slate accent color (#64748b) used
- [x] Hugo builds without errors
- [x] Deployed to GitHub Pages
- [x] User has reviewed the live site and is satisfied

---

## Post-Deployment Notes

After deployment, the user will manually review the site at:
**URL**: https://zishu-lab.github.io/zishu.github.io/

**What to check visually**:
- Overall aesthetic is neutral/minimal (no orange)
- Background has subtle noise texture
- Cards have glass-liquid effect (blur, transparency)
- Fade-in animation on page load
- Hover effects are subtle (scale, shadow)
- Dark mode works (change OS setting to test)
- All page elements display correctly

**If user requests changes**:
- Document specific feedback
- Update CSS accordingly
- Re-run build and deploy
- Continue until user is satisfied
