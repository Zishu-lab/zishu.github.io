# Decisions Log

## [2026-02-03] Design Decisions

### Color Scheme
**Decision**: Neutral/monochrome with slate gray accent (#64748b)
**Rationale**: User explicitly chose "Neutral + One Accent" with slate gray after rejecting orange theme
**Alternatives considered**: Orange glassmorphism (rejected), warm pink gradients (rejected)

### CSS Strategy
**Decision**: "Start Fresh" - Delete existing CSS and rebuild from scratch
**Rationale**: User said current design is "还不如之前的好看", complete rewrite needed
**Alternatives considered**: Incremental updates (too much orange to remove)

### Animation Scope
**Decision**: "Simplify Animations" - Delete continuous (gradientShift, pulse, float, shimmer) but KEEP scroll-reveals
**Rationale**: User wants minimal motion, only fade-in-up on load + scroll-reveals
**Alternatives considered**: Remove all animations (too minimal), keep all (too distracting)

### Dark Mode
**Decision**: "Yes, Auto" - Respect OS setting (prefers-color-scheme)
**Rationale**: User wants automatic dark mode, no manual toggle
**Alternatives considered**: Manual toggle (rejected), no dark mode (rejected)

### Verification Approach
**Decision**: Manual verification - Deploy to GitHub Pages, user reviews in browser
**Rationale**: User chose manual browser review over automated tests
**Alternatives considered**: Playwright tests (rejected by user)

### Typography
**Decision**: Keep existing fonts (Noto Sans SC, PingFang SC) - NO web font imports
**Rationale**: User explicitly said to keep existing fonts, do NOT import Bodoni Moda/Inter
**Alternatives considered**: Serif headings + Sans-serif body (reference site pattern, explicitly rejected)

---
*This file tracks architectural choices. APPEND new decisions, never overwrite.*
