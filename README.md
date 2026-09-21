# Preflop Trainer

A phone-friendly trainer for memorizing preflop opening ranges. Single self-contained `index.html` — no build step, no dependencies.

**Four tabs:**
- **Drill** — deal a hand, tap **Fold** or **Raise**. Correct answers advance instantly; a miss pauses to explain the category threshold (e.g. "you open suited kings only down to K9s").
- **Flash** — a study mode that auto-cycles every hand you *should* open from a seat, so you learn a range by sight. Play/pause, three speeds, tap to step.
- **Chart** — the classic 13×13 range grid for any seat/style, with open % and per-category breakdown.
- **Misses** — logs every hand you get wrong, sorted by frequency, with a **Practice these** button that re-deals only your misses until you clear them.

**Live app:** https://claude.ai/artifact/RBa8gwA9m8jUvFeW1b6mxU (private artifact)

## What it drills

Open-raise / **RFI** only ("raise first in"): the pot is unopened and folded to you — do you open or fold? This is the single most important preflop skill for a beginner. Facing a raise (3-bet/call/fold) is intentionally out of scope for now.

> The Big Blind has **no** open-raise range — if it folds to the BB, they already win the pot uncontested — so the BB is not drilled. That's correct, not a missing feature.

## Toggles (behind the gear icon)

- **Format** — `6-max` (UTG, HJ, CO, BTN, SB), `Full ring` (adds UTG+1, MP), `Heads-up` (SB only).
- **Style** — `TAG` (Tight-Aggressive, default, beginner-recommended) or `GTO / Balanced` (solver baseline).
- **Position** — `Random (all)` to test across every seat, or lock to one seat to grind it.
- **Category** — drill `All hands` or focus one: Pairs, Suited Aces, Suited Broadways, Suited Connectors, Offsuit Aces, Offsuit Broadways, Other.

## Styles & the pocket-pairs question

- **TAG** tightens early-position pairs the way most beginner coaching does: **77+ UTG, 55+ middle, 22+ late** — lower variance, fewer tough spots out of position.
- **GTO** opens **22+ from every seat in 6-max**, which is what a low-rake solver actually does; small pairs are marginally profitable opens even under the gun.

Pick one and train it consistently. TAG is the recommended starting point.

## Where the ranges come from

These are **standard ~100bb reference opening charts** for learning — the kind published in beginner GTO charts — encoded as clean yes/no decisions (real solver ranges have mixed-frequency hands; a two-button drill rounds them). They approximate solver output and are correct for learning, but they are **not** read live from a specific solver run. Open frequencies were sanity-checked per seat (e.g. 6-max GTO: UTG ~16%, CO ~24%, BTN ~46%, SB ~38%).

To adjust a range, edit the `DATA` object in `index.html` — ranges use a compact token DSL: `22+`, `A2s+` (suited aces, kicker and up), `KTs+`, `76s`, `AJo+`, `KQo`. The app computes the open % from whatever you set.

## Local use

Open `index.html` in any browser. Progress (score, streak, best, last settings) is saved in the browser via `localStorage`.

## License

Personal project. Not affiliated with any poker site or solver.
