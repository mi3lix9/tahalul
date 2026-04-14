import { describe, expect, it } from 'vitest';
import { getCityStage, getNextBuildSlot, getPollutionPercent, GRID_SIZE } from '@/lib/domain/city';

describe('city', () => {
  it('returns city stages by thresholds', () => {
    expect(getCityStage(0)).toBe('wasteland');
    expect(getCityStage(100)).toBe('recovering');
    expect(getCityStage(5000)).toBe('utopia');
  });

  it('returns the first build slot from center area', () => {
    expect(getNextBuildSlot(0)).toEqual({ x: 3, y: 3, type: 'tree' });
  });

  it('returns subsequent build slots in placement order', () => {
    expect(getNextBuildSlot(1)).toEqual({ x: 3, y: 4, type: 'house' });
    expect(getNextBuildSlot(2)).toEqual({ x: 4, y: 4, type: 'tree' });
  });

  it('returns null when grid is full', () => {
    expect(getNextBuildSlot(GRID_SIZE * GRID_SIZE)).toBeNull();
  });

  it('computes pollution percent', () => {
    expect(getPollutionPercent(0)).toBe(100);
    expect(getPollutionPercent(2500)).toBe(50);
    expect(getPollutionPercent(5000)).toBe(0);
  });
});
