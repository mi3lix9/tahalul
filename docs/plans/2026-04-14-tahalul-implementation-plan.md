# Tahalul Implementation Plan

**Date:** 2026-04-14  
**Product:** Tahalul  
**Platform:** Expo React Native prototype in `apps/native`  
**Inputs:** Accepted design doc at `docs/plans/2026-04-14-tahalul-design.md`, current Expo Router starter in `apps/native`  
**Assumption:** No separate PRD file was present in the repository during scan, so this plan treats the accepted design doc as the source of truth for PRD-derived scope and calls out any places where hidden PRD details could still change implementation.

## Objective

Replace the current Expo Router starter in `apps/native` with a demo-ready, offline-first Tahalul app that:

1. is Arabic-first with full RTL support,
2. persists all user progress locally,
3. covers the full planned product surface (onboarding, city, action logging, challenges, impact, profile, map, shop, story, assistant, badges),
4. avoids backend requirements,
5. keeps business logic testable outside RN UI.

## Current State

The current app is still the Better-T-Stack Expo starter:

- Expo Router is wired through `apps/native/app/_layout.tsx`
- the active IA is a drawer + two-tab demo under `apps/native/app/(drawer)`
- HeroUI Native + Uniwind are already installed and should remain the UI foundation
- there is no app-specific state layer, persistence layer, i18n layer, or test setup in `apps/native`
- Bun workspaces are already in place at repo root

## Implementation Principles

1. **Shared foundations first.** Build routing, persistence, i18n, domain logic, and seed data before feature-heavy UI.
2. **YAGNI on infra.** No backend, no auth, no live social, no map SDK, no realtime timers, no extra UI library.
3. **Keep business logic pure.** Points, XP, streaks, city growth, challenge refresh, badge unlocks, QR parsing, and assistant rules should live in pure TS modules.
4. **Persist facts, not everything.** Store user-generated state in SQLite/AsyncStorage; keep seeded definitions in code.
5. **Use the existing stack.** Keep Expo Router, HeroUI Native, Uniwind, Reanimated, SVG, Haptics, and Bottom Sheet.
6. **Prefer deterministic simulation.** Group progress, city placement, and story unlocks should be date- and rule-driven, not timer-driven.

## Target Architecture

### App shell

- Replace the drawer starter with tab-first routing under `apps/native/app/(tabs)`.
- Keep `apps/native/app/_layout.tsx` as the provider/bootstrap root.
- Use stack screens above tabs for `map`, `shop`, `story`, `assistant`, and `badge/[id]`.
- Gate entry through onboarding using a root redirect screen.

### State and persistence

- **Zustand**: app-facing hydrated store and feature actions.
- **SQLite**: durable entities (`user_profile`, `action_logs`, `city_tiles`, `challenge_progress`, `badge_unlocks`, `reward_redemptions`).
- **AsyncStorage**: lightweight preferences (`language`, `onboardingComplete`, `reminderEnabled`, `lastDailyRefreshKey`).

### Domain split

- `apps/native/lib/domain/*`: pure app rules and calculators.
- `apps/native/lib/db/*`: database client, migrations, repositories.
- `apps/native/features/*`: UI + feature-specific seed/config files.
- `apps/native/stores/*`: orchestration only, not raw business rules.

### YAGNI decisions

- **Do not add a backend.**
- **Do not add `react-native-maps`.** Implement `Map` as seeded location cards + deep links to native maps.
- **Do not add React Native UI test infrastructure first.** Use Vitest for pure logic and rely on diagnostics/smoke validation for screens.
- **Do not over-normalize seeded content into SQLite.** Keep badges, rewards, stories, assistant prompts, map locations, and challenge definitions in code unless user-specific state must persist.

## Dependency Plan

Run these in `apps/native`.

### Required additions

```bash
bunx expo install @react-native-async-storage/async-storage expo-camera expo-file-system expo-image-picker expo-localization expo-notifications expo-splash-screen expo-sqlite
bun add i18n-js zustand
bun add -d vitest
```

### Why these are needed

- `zustand`: app state orchestration
- `expo-sqlite`: durable local entities
- `@react-native-async-storage/async-storage`: lightweight preferences and refresh metadata
- `expo-localization` + `i18n-js`: Arabic/English localization
- `expo-splash-screen`: block initial paint until hydration finishes
- `expo-notifications`: local reminders
- `expo-image-picker`: photo verification flow
- `expo-camera`: QR scanner flow
- `expo-file-system`: lightweight local file checks for photo simulation
- `vitest`: pure domain tests

### Files to modify for dependencies/config

- `apps/native/package.json`
- `apps/native/app.json`
- `packages/env/src/native.ts`

### Dependency-related config changes

- Add app scripts to `apps/native/package.json`:
  - `check-types`: `tsc --noEmit`
  - `test`: `vitest run`
  - `test:watch`: `vitest`
- Extend `packages/env/src/native.ts` to support optional `EXPO_PUBLIC_ANTHROPIC_API_KEY`
- Update `apps/native/app.json` with the required Expo config/plugins and permission copy for camera, photos, and notifications

## Proposed File Layout

Use this as the implementation target unless a touched phase proves a simpler layout.

```text
apps/native/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── +not-found.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── challenges.tsx
│   │   ├── actions.tsx
│   │   ├── impact.tsx
│   │   └── profile.tsx
│   ├── onboarding/
│   │   ├── language.tsx
│   │   ├── intro.tsx
│   │   └── profile.tsx
│   ├── map.tsx
│   ├── shop.tsx
│   ├── story.tsx
│   ├── assistant.tsx
│   └── badge/[id].tsx
├── components/
│   ├── app-screen.tsx
│   ├── empty-state.tsx
│   ├── loading-screen.tsx
│   ├── section-header.tsx
│   └── ui/... (shared HeroUI wrappers only if repetition appears)
├── constants/
│   ├── stage-theme.ts
│   ├── routes.ts
│   └── app-config.ts
├── features/
│   ├── actions/
│   ├── assistant/
│   ├── challenges/
│   ├── city/
│   ├── impact/
│   ├── map/
│   ├── profile/
│   ├── shop/
│   └── story/
├── lib/
│   ├── db/
│   ├── domain/
│   ├── haptics/
│   ├── i18n/
│   ├── notifications/
│   └── storage/
├── providers/
│   ├── app-bootstrap-provider.tsx
│   ├── i18n-provider.tsx
│   └── notification-provider.tsx
├── stores/
│   └── app-store.ts
└── types/
    ├── entities.ts
    └── domain.ts
```

## Phase Plan

---

## Phase 0 — Replace the starter shell and install foundations

### Goal

Turn the current demo shell into a real Tahalul app skeleton with the right dependencies, route groups, scripts, and provider entry points.

### Tasks

1. Install the dependency set above.
2. Replace the current drawer starter route tree with a tabs-first tree.
3. Add app/test/typecheck scripts to `apps/native/package.json`.
4. Add Expo config needed for camera/photos/notifications.
5. Add root redirect screen so onboarding vs app entry is controlled in one place.

### Files to create

- `apps/native/app/index.tsx`
- `apps/native/app/(tabs)/_layout.tsx`
- `apps/native/app/(tabs)/index.tsx`
- `apps/native/app/(tabs)/challenges.tsx`
- `apps/native/app/(tabs)/actions.tsx`
- `apps/native/app/(tabs)/impact.tsx`
- `apps/native/app/(tabs)/profile.tsx`
- `apps/native/providers/app-bootstrap-provider.tsx`
- `apps/native/components/loading-screen.tsx`
- `apps/native/constants/routes.ts`

### Files to modify

- `apps/native/app/_layout.tsx`
- `apps/native/app/+not-found.tsx`
- `apps/native/package.json`
- `apps/native/app.json`

### Files to remove/replace

- `apps/native/app/(drawer)/_layout.tsx`
- `apps/native/app/(drawer)/index.tsx`
- `apps/native/app/(drawer)/(tabs)/_layout.tsx`
- `apps/native/app/(drawer)/(tabs)/index.tsx`
- `apps/native/app/(drawer)/(tabs)/two.tsx`
- `apps/native/app/modal.tsx` if no longer used

### Architecture notes

- Keep `apps/native/app/_layout.tsx` thin: providers + stack registration only.
- Do not put hydration, DB init, and localization logic directly inside route components.
- Keep ephemeral sheet/modal state local to screens; do not create a giant UI store.

### Validation

```bash
bun run --filter native check-types
bun run dev:native
```

Manual check:

- app boots into a loading/bootstrap state, then redirects cleanly
- no old drawer routes remain addressable

---

## Phase 1 — Add localization, RTL, onboarding, and bootstrapping

### Goal

Make the app Arabic-first, persist onboarding/language preferences, and ensure the initial launch flow is product-specific.

### Tasks

1. Build `lib/i18n` with Arabic and English translation dictionaries.
2. Persist language + onboarding completion in AsyncStorage.
3. Default first launch to Arabic + RTL.
4. Create a short onboarding flow:
   - language selection
   - brief intro to the city concept
   - basic profile setup
5. Redirect users into tabs after onboarding completion.
6. Add settings entry points in profile for language and reminders.

### Files to create

- `apps/native/lib/i18n/index.ts`
- `apps/native/lib/i18n/translations/ar.ts`
- `apps/native/lib/i18n/translations/en.ts`
- `apps/native/lib/storage/preferences.ts`
- `apps/native/providers/i18n-provider.tsx`
- `apps/native/app/onboarding/language.tsx`
- `apps/native/app/onboarding/intro.tsx`
- `apps/native/app/onboarding/profile.tsx`
- `apps/native/components/app-screen.tsx`
- `apps/native/components/section-header.tsx`

### Files to modify

- `apps/native/app/_layout.tsx`
- `apps/native/app/index.tsx`
- `apps/native/app/(tabs)/profile.tsx`
- `apps/native/contexts/app-theme-context.tsx` (only if theme/provider wiring must move)

### Architecture notes

- Treat language choice as a bootstrap concern, not a screen-only concern.
- If runtime RTL flipping is unstable, apply the new direction on next cold launch instead of adding reload complexity.
- Use system fonts first. Do not block implementation on custom Arabic font assets.

### Validation

```bash
bun run --filter native check-types
```

Manual smoke:

- first launch opens onboarding
- Arabic strings render first
- layout is RTL in Arabic mode
- onboarding completion survives app relaunch
- English selection persists

---

## Phase 2 — Build persistence, seed data, and the pure domain engine

### Goal

Create the durable app core before feature screens depend on it.

### Tasks

1. Add SQLite client, schema creation/migrations, and repository helpers.
2. Add AsyncStorage preference helpers.
3. Define app entities and domain types.
4. Add seed/config files for:
   - action definitions
   - challenge definitions
   - rewards
   - badges
   - story chapters
   - assistant prompt/tip rules
   - map locations
   - city building catalog
5. Build pure domain modules for:
   - points + XP
   - level curve
   - impact conversions
   - streaks + freeze handling
   - city stage thresholds + deterministic placement
   - challenge refresh and completion
   - badge unlock rules
6. Add a single transaction-style domain entry point for verified actions.

### Files to create

- `apps/native/types/entities.ts`
- `apps/native/types/domain.ts`
- `apps/native/lib/db/client.ts`
- `apps/native/lib/db/migrations.ts`
- `apps/native/lib/db/schema.ts`
- `apps/native/lib/db/repositories/user-repository.ts`
- `apps/native/lib/db/repositories/actions-repository.ts`
- `apps/native/lib/db/repositories/city-repository.ts`
- `apps/native/lib/db/repositories/challenges-repository.ts`
- `apps/native/lib/db/repositories/badges-repository.ts`
- `apps/native/lib/db/repositories/rewards-repository.ts`
- `apps/native/lib/domain/points.ts`
- `apps/native/lib/domain/levels.ts`
- `apps/native/lib/domain/impact.ts`
- `apps/native/lib/domain/streaks.ts`
- `apps/native/lib/domain/city.ts`
- `apps/native/lib/domain/challenges.ts`
- `apps/native/lib/domain/badges.ts`
- `apps/native/lib/domain/apply-verified-action.ts`
- `apps/native/features/actions/data/action-definitions.ts`
- `apps/native/features/challenges/data/challenge-definitions.ts`
- `apps/native/features/shop/data/rewards.ts`
- `apps/native/features/profile/data/badges.ts`
- `apps/native/features/story/data/story-chapters.ts`
- `apps/native/features/assistant/data/tips.ts`
- `apps/native/features/map/data/locations.ts`
- `apps/native/features/city/data/buildings.ts`
- `apps/native/stores/app-store.ts`

### Architecture notes

- Keep definitions in code; persist only mutable user state.
- Make `applyVerifiedAction()` the critical pure entry point. That function should accept normalized current state + verified action input and return all domain deltas.
- Repositories should be thin IO wrappers. They should not implement scoring logic.
- Zustand should orchestrate hydration and persistence calls, not duplicate domain rules.

### Initial SQLite tables

- `user_profile`
- `action_logs`
- `city_tiles`
- `challenge_progress`
- `badge_unlocks`
- `reward_redemptions`

### Validation

Create and run pure logic tests as soon as the modules exist.

### Test files to create

- `apps/native/lib/domain/__tests__/points.test.ts`
- `apps/native/lib/domain/__tests__/levels.test.ts`
- `apps/native/lib/domain/__tests__/impact.test.ts`
- `apps/native/lib/domain/__tests__/streaks.test.ts`
- `apps/native/lib/domain/__tests__/city.test.ts`
- `apps/native/lib/domain/__tests__/challenges.test.ts`
- `apps/native/lib/domain/__tests__/badges.test.ts`
- `apps/native/lib/domain/__tests__/apply-verified-action.test.ts`

### Validation commands

```bash
bun run --filter native test
bun run --filter native check-types
```

---

## Phase 3 — Implement action logging and verification flows

### Goal

Ship the core product loop: log an action, verify it locally, award progress, persist it, and surface feedback.

### Tasks

1. Build the `Actions` tab as the primary logging entry.
2. Support three methods:
   - photo
   - QR scan
   - manual logging
3. Add QR parsing for `ECOCITY:BIN:{city}:{id}`.
4. Add local photo verification simulation:
   - require an image
   - check lightweight file metadata where possible
   - collect user checklist confirmation
   - show timed “AI analyzing” state
5. Normalize all successful flows into one verified action payload.
6. Call the domain transaction function and persist results.
7. Trigger haptics and UI feedback on success.

### Files to create

- `apps/native/features/actions/components/action-method-sheet.tsx`
- `apps/native/features/actions/components/photo-action-form.tsx`
- `apps/native/features/actions/components/qr-scanner-view.tsx`
- `apps/native/features/actions/components/manual-action-form.tsx`
- `apps/native/features/actions/components/verification-status-card.tsx`
- `apps/native/features/actions/domain/qr-parser.ts`
- `apps/native/features/actions/domain/normalize-action.ts`
- `apps/native/features/actions/domain/photo-verification.ts`
- `apps/native/features/actions/domain/manual-verification.ts`
- `apps/native/features/actions/domain/verified-action.ts`
- `apps/native/features/actions/domain/__tests__/qr-parser.test.ts`
- `apps/native/features/actions/domain/__tests__/normalize-action.test.ts`
- `apps/native/lib/haptics/index.ts`

### Files to modify

- `apps/native/app/(tabs)/actions.tsx`
- `apps/native/stores/app-store.ts`
- `apps/native/lib/domain/apply-verified-action.ts`

### Architecture notes

- Keep method-specific capture code separate from the verified action shape.
- Do not scatter point awarding across form components.
- The `Actions` tab should be able to run the whole loop even if Home also exposes shortcuts.
- Use the existing `@gorhom/bottom-sheet` dependency for method selection or confirmations where it simplifies the UI.

### Validation

```bash
bun run --filter native test
bun run --filter native check-types
bun run dev:native
```

Manual smoke:

- manual action succeeds and persists
- valid seeded QR code parses and succeeds
- photo flow shows simulated analysis state
- points/XP/streak/city update immediately after success

---

## Phase 4 — Build Home/city progression, badges, and reward feedback

### Goal

Make the home screen visually explain the product in under 60 seconds and show visible city growth.

### Tasks

1. Build the `Home` tab around the city.
2. Render a top-down 6×6 city grid.
3. Add city stage thresholds:
   - Wasteland
   - Recovering
   - Neutral
   - Green
   - Utopia
4. Add deterministic build placement so each verified action reveals the next slot.
5. Surface stage-aware palette shifts and reward feedback.
6. Add badge unlock surfacing and badge detail navigation.
7. Add quick links from Home to Map, Shop, Story, and Assistant.

### Files to create

- `apps/native/features/city/components/city-grid.tsx`
- `apps/native/features/city/components/city-tile.tsx`
- `apps/native/features/city/components/city-stage-header.tsx`
- `apps/native/features/city/components/city-summary-card.tsx`
- `apps/native/features/city/components/building-reveal-modal.tsx`
- `apps/native/features/profile/components/badge-strip.tsx`
- `apps/native/constants/stage-theme.ts`
- `apps/native/app/badge/[id].tsx`

### Files to modify

- `apps/native/app/(tabs)/index.tsx`
- `apps/native/features/city/data/buildings.ts`
- `apps/native/stores/app-store.ts`

### Architecture notes

- Use SVG + simple shapes/components before custom art.
- Keep city tile state deterministic from persisted tile data; do not derive placement on every render from raw action count alone.
- Stage color theming should be a simple lookup table, not a new theme system.

### Validation

```bash
bun run --filter native check-types
```

Manual smoke:

- city starts polluted
- after multiple actions, tiles reveal in a stable order
- stage visuals change when thresholds are crossed
- badge detail route opens with the correct badge

---

## Phase 5 — Implement challenges, impact dashboard, and profile progression

### Goal

Complete the progression screens that turn activity into goals, metrics, and identity.

### Tasks

1. Build the `Challenges` tab with local daily, weekly, and group challenges.
2. Refresh daily/weekly challenge state from date keys, not timers.
3. Simulate friend/group progress deterministically from seeded profiles + date hashes.
4. Build the `Impact` tab from persisted actions and pure conversion functions.
5. Build the `Profile` tab with:
   - level
   - XP
   - streak
   - unlocked badges
   - language setting
   - reminder toggle
6. Add streak freeze handling if required by the PRD; otherwise implement a single simple freeze rule and do not invent a deeper inventory system.

### Files to create

- `apps/native/features/challenges/components/challenge-list.tsx`
- `apps/native/features/challenges/components/challenge-card.tsx`
- `apps/native/features/challenges/components/group-progress-card.tsx`
- `apps/native/features/impact/components/impact-summary-card.tsx`
- `apps/native/features/impact/components/impact-chart-card.tsx`
- `apps/native/features/profile/components/profile-header.tsx`
- `apps/native/features/profile/components/streak-card.tsx`
- `apps/native/features/profile/components/settings-list.tsx`

### Files to modify

- `apps/native/app/(tabs)/challenges.tsx`
- `apps/native/app/(tabs)/impact.tsx`
- `apps/native/app/(tabs)/profile.tsx`
- `apps/native/stores/app-store.ts`
- `apps/native/lib/domain/challenges.ts`
- `apps/native/lib/domain/impact.ts`
- `apps/native/lib/domain/streaks.ts`

### Architecture notes

- Store user challenge progress in SQLite; keep challenge definitions in code.
- Compute fake friend progress from stable seeds and the current period key so relaunching feels alive without background work.
- Impact metrics should be derived from action logs and conversion tables, not manually duplicated onto the profile row.

### Validation

```bash
bun run --filter native test
bun run --filter native check-types
```

Manual smoke:

- daily/weekly/group lists render
- challenge completion updates after actions
- impact metrics match logged actions
- streak data survives relaunch

---

## Phase 6 — Implement map, shop, story, and assistant

### Goal

Complete the broader product surface without adding unjustified complexity.

### Tasks

1. Build `Map` as a seeded location browser with filters and external map deep links.
2. Build `Shop` as a local rewards catalog backed by point redemption history.
3. Build `Story` as seeded narrative chapters unlocked by progression thresholds.
4. Build `Assistant` with an offline-first rule engine and optional Anthropic enhancement.
5. Keep the optional remote assistant path defensive and entirely non-blocking.

### Files to create

- `apps/native/app/map.tsx`
- `apps/native/app/shop.tsx`
- `apps/native/app/story.tsx`
- `apps/native/app/assistant.tsx`
- `apps/native/features/map/components/location-list.tsx`
- `apps/native/features/map/components/location-card.tsx`
- `apps/native/features/shop/components/reward-grid.tsx`
- `apps/native/features/shop/components/reward-card.tsx`
- `apps/native/features/story/components/story-chapter-list.tsx`
- `apps/native/features/story/components/story-chapter-card.tsx`
- `apps/native/features/assistant/components/assistant-chat.tsx`
- `apps/native/features/assistant/components/assistant-tip-card.tsx`
- `apps/native/features/assistant/lib/assistant-engine.ts`
- `apps/native/features/assistant/lib/local-assistant.ts`
- `apps/native/features/assistant/lib/anthropic-assistant.ts`

### Files to modify

- `packages/env/src/native.ts`
- `apps/native/stores/app-store.ts`
- `apps/native/app/(tabs)/index.tsx`

### Architecture notes

- **Map:** use `expo-linking` + native map URLs; do not add a map rendering SDK.
- **Shop:** persist only redemptions; reward definitions stay seeded in code.
- **Story:** persist unlock/read state only if needed; otherwise derive unlocks from progression.
- **Assistant:** local rules first. Remote AI should be feature-detected by env var and wrapped in timeout/error guards.

### Validation

```bash
bun run --filter native check-types
```

Manual smoke:

- map entries open external maps
- reward redemption deducts points and persists
- story chapters unlock as progression changes
- assistant returns local help offline
- assistant still works when API key is absent

---

## Phase 7 — Polish, reminders, accessibility, and final verification

### Goal

Make the prototype demo-ready without overbuilding.

### Tasks

1. Add local reminder scheduling and settings persistence.
2. Add finishing feedback:
   - subtle haptics
   - motion polish with Reanimated
   - optional lightweight sound only if Expo-55-compatible setup stays simple
3. Add accessibility and resilience polish:
   - proper labels for tabs/buttons
   - empty/error states
   - loading states
   - permission denial handling
4. Replace starter metadata/assets as needed in `app.json` and `assets/images`.
5. Remove any unused starter helpers/components left behind.

### Files to create

- `apps/native/lib/notifications/reminders.ts`
- `apps/native/providers/notification-provider.tsx`
- `apps/native/components/empty-state.tsx`

### Files to modify

- `apps/native/app/_layout.tsx`
- `apps/native/app.json`
- `apps/native/app/(tabs)/index.tsx`
- `apps/native/app/(tabs)/actions.tsx`
- `apps/native/app/(tabs)/profile.tsx`

### Architecture notes

- Keep sound optional. If the simplest Expo-compatible package path is messy, skip sound and ship haptics + motion.
- Avoid Lottie unless final assets arrive and the dependency earns its keep.
- Permission errors must degrade gracefully; no dead-end flows.

### Validation

```bash
bun run --filter native test
bun run --filter native check-types
bunx expo-doctor
bun run dev:native
```

Final manual smoke on simulator/device:

1. complete onboarding,
2. log one manual action,
3. log one QR action,
4. log one photo action,
5. confirm city visibly improves,
6. confirm badge/reward/challenge/impact updates,
7. browse map/shop/story/assistant,
8. relaunch app and confirm persistence,
9. toggle reminder setting and verify scheduling path,
10. verify English mode still works.

## Verification Strategy

### What must be tested with Vitest

- `apps/native/lib/domain/points.ts`
- `apps/native/lib/domain/levels.ts`
- `apps/native/lib/domain/impact.ts`
- `apps/native/lib/domain/streaks.ts`
- `apps/native/lib/domain/city.ts`
- `apps/native/lib/domain/challenges.ts`
- `apps/native/lib/domain/badges.ts`
- `apps/native/lib/domain/apply-verified-action.ts`
- `apps/native/features/actions/domain/qr-parser.ts`
- `apps/native/features/actions/domain/normalize-action.ts`

### What should not get heavy UI tests yet

- complex screen layout snapshots
- onboarding visual flows
- city grid rendering details
- assistant chat UI chrome

Reason: RN UI TDD here is likely to add more maintenance cost than signal. Rely instead on:

- TypeScript strictness
- language-server diagnostics on touched files
- Expo runtime smoke checks
- manual end-to-end demo-path validation

## Implementation Order Constraints

These dependencies matter:

1. **Phase 0 before everything** — route tree, scripts, and dependencies unblock the rest.
2. **Phase 1 and 2 before feature work** — onboarding, i18n, persistence, and domain logic must exist before screens can be wired cleanly.
3. **Phase 3 before 4/5/6** — action logging drives most downstream progression.
4. **Phase 4 and 5 before final polish** — they are core to demo value.
5. **Phase 7 last** — polish should not hide unresolved domain issues.

## Commands Checklist

### Repo root

```bash
bun install
bun run dev:native
```

### `apps/native`

```bash
bunx expo install @react-native-async-storage/async-storage expo-camera expo-file-system expo-image-picker expo-localization expo-notifications expo-splash-screen expo-sqlite
bun add i18n-js zustand
bun add -d vitest
bun run check-types
bun run test
```

### Full verification pass

```bash
bun run --filter native test
bun run --filter native check-types
bunx expo-doctor
bun run dev:native
```

## Major Risks and Mitigations

### 1. Hidden PRD mismatch

Risk: the repository does not currently expose a separate PRD file, so unseen requirements may still exist.

Mitigation: implement the accepted design doc exactly, and validate any ambiguous scope before Phase 6 polish work.

### 2. Scope breadth across many screens

Risk: the surface area is large for a prototype.

Mitigation: do foundation first, keep seeded content in code, and avoid nonessential infra.

### 3. RTL/runtime language switching edge cases

Risk: switching direction at runtime can be brittle on React Native.

Mitigation: persist preference immediately, and allow direction changes to fully apply on next cold launch if needed.

### 4. Camera/QR/notification environment variability

Risk: simulator vs device support may differ.

Mitigation: validate those flows on a real device before calling the prototype demo-ready.

### 5. Asset polish pressure

Risk: waiting for bespoke art can stall delivery.

Mitigation: use SVG, gradients, stage-aware color, and motion-first polish.

## Definition of Done

The implementation is done when a new contributor can run the app and complete this demo path without backend support:

1. complete onboarding,
2. land on an Arabic-first city home screen,
3. log three action types,
4. see points, XP, challenges, badges, and city progression update,
5. browse impact, profile, map, shop, story, and assistant,
6. relaunch and retain state,
7. pass domain tests and type checks.
