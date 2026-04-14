export function isSameDay(date1: string, date2: string): boolean {
  return date1.slice(0, 10) === date2.slice(0, 10);
}

export function isConsecutiveDay(lastDate: string, currentDate: string): boolean {
  const last = new Date(lastDate.slice(0, 10));
  const current = new Date(currentDate.slice(0, 10));
  const diffMs = current.getTime() - last.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

export function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1.slice(0, 10));
  const d2 = new Date(date2.slice(0, 10));
  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export interface StreakResult {
  newStreak: number;
  continued: boolean;
  freezeUsed: boolean;
  remainingFreezes: number;
}

export function computeStreak(
  currentStreak: number,
  lastActionDate: string | null,
  currentDate: string,
  streakFreezes: number,
): StreakResult {
  if (!lastActionDate) {
    return { newStreak: 1, continued: false, freezeUsed: false, remainingFreezes: streakFreezes };
  }

  if (isSameDay(lastActionDate, currentDate)) {
    return { newStreak: currentStreak, continued: true, freezeUsed: false, remainingFreezes: streakFreezes };
  }

  if (isConsecutiveDay(lastActionDate, currentDate)) {
    return { newStreak: currentStreak + 1, continued: true, freezeUsed: false, remainingFreezes: streakFreezes };
  }

  const gap = daysBetween(lastActionDate, currentDate);
  if (gap === 2 && streakFreezes > 0) {
    return { newStreak: currentStreak + 1, continued: true, freezeUsed: true, remainingFreezes: streakFreezes - 1 };
  }

  return { newStreak: 1, continued: false, freezeUsed: false, remainingFreezes: streakFreezes };
}

export function getWeeklyFreezeAllowance(): number {
  return 1;
}
