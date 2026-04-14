export function xpForLevel(level: number): number {
  return level * level * 100;
}

export function computeLevel(currentLevel: number, currentXp: number, xpGained: number): { level: number; xp: number } {
  let level = currentLevel;
  let xp = currentXp + xpGained;

  while (xp >= xpForLevel(level + 1)) {
    xp -= xpForLevel(level + 1);
    level++;
    if (level >= 50) {
      level = 50;
      break;
    }
  }

  return { level, xp };
}
