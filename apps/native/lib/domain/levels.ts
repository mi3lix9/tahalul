export function xpForLevel(level: number): number {
  return level * level * 100;
}

export function totalXpForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i <= level; i++) {
    total += xpForLevel(i);
  }
  return total;
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
