# Tahalul Product Design

**Date:** 2026-04-14
**Product:** Tahalul
**Platform:** Expo React Native prototype (iOS + Android)

## Goal

Build a demo-ready, offline-first mobile app that turns eco actions into the growth of a virtual city. The app must feel polished, be Arabic-first with full RTL support, persist all progress locally, and cover the full PRD scope without requiring any backend.

## Chosen Approach

Tahalul will be implemented as a feature-first Expo Router app inside `apps/native`, replacing the existing starter shell. The app will use Zustand for app state orchestration, SQLite for durable entities, AsyncStorage for lightweight preferences and daily refresh metadata, and modular feature folders to keep the codebase readable.

This approach keeps the current Expo/React Native foundation while avoiding monolithic code. It also supports a full-PRD implementation without introducing backend complexity.

## Architecture

### App shell and routing

The existing drawer starter will be replaced with a route structure centered on the product IA:

- `app/_layout.tsx` for providers, theme, i18n, RTL, hydration, notifications
- `app/(tabs)/index.tsx` for Home / city
- `app/(tabs)/challenges.tsx`
- `app/(tabs)/actions.tsx`
- `app/(tabs)/impact.tsx`
- `app/(tabs)/profile.tsx`
- `app/map.tsx`
- `app/shop.tsx`
- `app/story.tsx`
- `app/assistant.tsx`
- `app/badge/[id].tsx`
- `app/onboarding/*` for first-launch language, onboarding, and profile setup

Bottom tabs will expose Home, Challenges, Log, Impact, and Profile. Home will provide shortcut entry points into Map, Shop, Story, and Assistant.

### Feature modules

Implementation will be organized around feature folders:

- `features/city`
- `features/actions`
- `features/challenges`
- `features/impact`
- `features/story`
- `features/shop`
- `features/assistant`
- `features/profile`
- `features/map`

Shared concerns will live in:

- `stores`
- `lib/db`
- `lib/i18n`
- `lib/notifications`
- `lib/audio`
- `lib/haptics`
- `components`
- `constants`
- `types`

### State and persistence

SQLite will hold core entities: user, actions, city tiles, challenge progress, badge unlocks, and redemption history. AsyncStorage will hold lightweight values such as selected language, onboarding completion, reminder registration state, and daily challenge refresh timestamps.

Zustand will expose a single app-facing state layer with feature slices/actions. Hydration will happen on app launch through a bootstrap provider so screens can read normalized, ready-to-render state.

### Data flow

The main loop is:

1. User logs an action through photo, QR, or manual flow.
2. Verification logic produces a verified action payload.
3. Domain logic awards points, XP, impact metrics, challenge progress, streak updates, and badge unlock checks.
4. City progression logic places the next building deterministically.
5. SQLite persists the updated entities.
6. Zustand updates the UI immediately.
7. UX feedback runs: shimmer, haptics, sound, animation, celebration modal.

## Product decisions

### City view

The city will use a top-down 6×6 grid rather than isometric. This matches the PRD recommendation, is faster to implement cleanly, and makes tile state deterministic and easy to animate. The stage system will be based on total EcoPoints thresholds:

- Wasteland
- Recovering
- Neutral
- Green
- Utopia

Each verified action will unlock the next build slot via a deterministic placement function so the city always evolves in a stable, demo-friendly way.

### Verification

Photo verification remains fully local and simulated. The app will validate that a photo exists, run lightweight metadata checks where possible, and combine that with user-confirmed checklist input. A timed “AI analyzing” state will provide perceived intelligence without external calls.

QR verification will parse seeded codes in the `ECOCITY:BIN:{city}:{id}` format. Manual logging will support action types like plastic-free day and walking.

### Assistant

The assistant, خضار, will default to a local rule-based engine using seeded Arabic/English tips. If `EXPO_PUBLIC_ANTHROPIC_API_KEY` exists, the app may call Claude Haiku as an optional enhancement, but the offline engine remains the default and supported path.

### Challenges and social simulation

Daily, weekly, and group challenges will be driven by local seeded definitions. Group challenges will simulate activity from fake friends over time using deterministic pseudo-random progress updates computed from dates, not live timers, so the app still feels alive after relaunch without background services.

## UX and visual system

The app will be Arabic-first and RTL-first by default. English is fully supported and switchable from settings. The palette will shift from dusty muted tones to saturated greens and sky blues based on city stage. The UI will emphasize reward feedback with spring-based building reveals, streak glow, confetti celebrations, and subtle sound/haptic responses.

The city/home screen must explain itself in under 60 seconds. That means the first-launch experience will be short, clear, and immediately show the polluted city plus the primary “log action” call to action.

## Offline and local-first rules

- No backend requirement for any core feature
- All prototype data persists locally
- Seeded map locations, challenges, rewards, stories, badges, and assistant prompts ship with the app
- Any optional remote integration must be defensive and non-blocking

## Testing and verification strategy

The implementation will prioritize clean module boundaries so domain logic can be tested independently from UI. The most important verified logic areas are:

- points / XP calculations
- level curve
- impact conversions
- streak logic and freeze handling
- city stage transitions and build placement
- QR parsing and action normalization
- challenge refresh rules
- badge unlock conditions

UI verification will rely on TypeScript strictness, language-server diagnostics, and targeted runtime smoke validation through Expo commands where feasible.

## Risks and mitigations

### Scope risk

The full PRD is broad. To keep the implementation clean, work will be split into foundation, core loop, progression systems, expansion screens, and polish. Shared primitives will be built first to avoid repetitive screen-specific logic.

### Expo compatibility risk

Some libraries listed in the PRD may need Expo-55-compatible versions. Dependency additions will be selected to work with the current Expo version and existing styling stack.

### Asset availability risk

Where custom illustration assets are not already present, the prototype will use polished component-driven visuals, gradients, icons, SVG shapes, and stateful cards so the product still feels complete without blocking on bespoke art.

## Success criteria

The finished prototype should let a demo user:

1. complete onboarding,
2. log 3 actions through different methods,
3. watch the city visibly improve,
4. unlock rewards and badges,
5. view their impact dashboard,
6. browse map, shop, story, and assistant,
7. relaunch the app and retain all state.

## Implementation handoff

Next step: produce a detailed implementation plan for Tahalul, then execute it in this session with subagents for bounded implementation work and orchestration-level verification.
