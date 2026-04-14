# Tahalul (تهلل)

Turn real-world eco-friendly actions into the growth of a personal virtual city. Every bottle recycled, every plastic-free day, every verified green action rebuilds a polluted city into a thriving green metropolis.

## Features

- **Virtual Smart City** — 6x6 top-down city grid that evolves through 5 stages: Wasteland → Recovering → Neutral → Green → Utopia
- **Real-World Verification** — Log eco actions via photo (simulated AI), QR code scanning, or manual entry
- **Challenges** — Daily, weekly, and group challenges with simulated friend competition
- **Achievements** — 15 badges with unlock celebrations, level system (1–50)
- **Rewards Shop** — Redeem eco points for simulated rewards and tree donations
- **Impact Dashboard** — Track CO₂ saved, waste diverted, trees equivalent, water saved with 30-day chart
- **Recycling Map** — 20 locations across 5 Saudi cities with Google Maps deep links
- **Story Mode** — 5 chapters unlocked by city progression, Arabic narrative
- **AI Eco Assistant** — Chat with "خضار" (Khudar) for eco tips via keyword matching
- **Streaks** — Daily streak tracking with weekly freeze, notification reminders
- **Arabic-First** — Full RTL support with Arabic primary, English secondary
- **Offline-First** — All data persisted locally via SQLite + AsyncStorage, no backend required

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Expo SDK 55 + React Native |
| Language | TypeScript (strict) |
| Navigation | expo-router (file-based) |
| State | Zustand |
| Persistence | expo-sqlite + AsyncStorage |
| Styling | HeroUI Native + Uniwind (Tailwind for RN) |
| Animations | react-native-reanimated |
| i18n | i18n-js |
| Camera/QR | expo-camera + expo-image-picker |
| Notifications | expo-notifications |
| Haptics | expo-haptics |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.3+)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator or Android Emulator (or physical device)

### Install

```bash
bun install
```

### Run

```bash
# Start Expo dev server
bun run dev:native

# Or build a native development client (recommended for camera/QR/notifications)
cd apps/native
bunx expo prebuild
bunx expo run:ios     # or run:android
```

### Test

```bash
cd apps/native
bun run test          # 33 domain logic tests
bun run check-types   # TypeScript strict check
```

## Project Structure

```
apps/native/
├── app/                    # Expo Router routes
│   ├── (tabs)/             # Bottom tab screens (home, challenges, actions, impact, profile)
│   ├── onboarding/         # Language, intro carousel, profile setup
│   ├── map.tsx             # Recycling locations (modal)
│   ├── shop.tsx            # Rewards shop (modal)
│   ├── story.tsx           # Story chapters (modal)
│   ├── assistant.tsx       # AI eco assistant (modal)
│   └── badge/[id].tsx      # Badge detail (modal)
├── features/               # Feature modules
│   ├── actions/            # Action logging components + domain
│   ├── assistant/          # Chat UI + tip engine
│   ├── challenges/         # Challenge cards + group progress
│   ├── city/               # City grid + tiles + stage theming
│   ├── impact/             # Impact summary + chart
│   ├── map/                # Location cards + filters
│   ├── profile/            # Profile header, streak, badges, settings
│   ├── shop/               # Reward cards + redemption
│   └── story/              # Chapter cards + unlock logic
├── lib/
│   ├── domain/             # Pure business logic (tested)
│   │   ├── points.ts       # Action → points/XP/CO₂ mapping
│   │   ├── levels.ts       # XP curve (level² × 100)
│   │   ├── impact.ts       # Impact aggregation
│   │   ├── streaks.ts      # Streak + freeze logic
│   │   ├── city.ts         # Stage thresholds + spiral placement
│   │   ├── challenges.ts   # Period keys + refresh + fake progress
│   │   ├── badges.ts       # 15 badge definitions + unlock checks
│   │   └── apply-verified-action.ts  # Core transaction function
│   ├── db/                 # SQLite schema + repositories
│   ├── i18n/               # Arabic + English translations
│   ├── haptics/            # Haptic feedback helpers
│   ├── notifications/      # Daily reminder scheduling
│   └── storage/            # AsyncStorage preferences
├── stores/
│   └── app-store.ts        # Zustand store with SQLite persistence
├── providers/              # React context providers
├── components/             # Shared UI components
├── constants/              # Stage themes, app config, routes
└── types/                  # Entity + domain type definitions
```

## Demo Flow

1. Launch → language picker (AR/EN) → 3-screen onboarding → name input
2. Land on polluted city home screen
3. Tap "Log" tab → choose Photo/QR/Manual → complete verification → earn points
4. Watch city tile animate in, streak update, badge unlock
5. Browse challenges, impact dashboard, map, shop, story, assistant
6. Force-close and relaunch — all progress persists

## Available Scripts

| Script | Description |
|---|---|
| `bun run dev:native` | Start Expo dev server |
| `bun run check-types` | TypeScript check across all packages |
| `cd apps/native && bun run test` | Run 33 domain logic tests |
| `cd apps/native && bun run test:watch` | Watch mode for tests |

## Target Users

Environmentally curious youth and students (ages 12–25) in Saudi Arabia who want a fun, gamified reason to develop green habits.

## License

Private — demo/prototype only.
