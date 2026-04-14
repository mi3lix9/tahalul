export function getDailyPeriodKey(date: string): string {
  return `daily:${date.slice(0, 10)}`;
}

export function getWeeklyPeriodKey(date: string): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  return `weekly:${monday.toISOString().slice(0, 10)}`;
}

export function shouldRefreshChallenges(lastRefreshKey: string | null, currentKey: string): boolean {
  return lastRefreshKey !== currentKey;
}

export function pickDailyChallenges(allDailies: string[], date: string, count: number = 3): string[] {
  const seed = hashString(date.slice(0, 10));
  const shuffled = [...allDailies].sort((a, b) => {
    const ha = hashString(a + seed.toString()) % 1000;
    const hb = hashString(b + seed.toString()) % 1000;
    return ha - hb;
  });
  return shuffled.slice(0, count);
}

function hashString(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function computeFakeGroupProgress(friendSeed: string, periodKey: string, goal: number): number {
  const h = hashString(friendSeed + periodKey);
  const progress = h % (goal + 1);
  return Math.min(progress, goal);
}
