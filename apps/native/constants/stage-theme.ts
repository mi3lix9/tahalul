import type { CityStage } from '@/types/entities';

export interface StageTheme {
  bgColor: string;
  gridBg: string;
  emptyTileColor: string;
  textColor: string;
  accentColor: string;
  smogOpacity: number;
}

export const STAGE_THEMES: Record<CityStage, StageTheme> = {
  wasteland: { bgColor: '#1a1a1a', gridBg: '#2a2a2a', emptyTileColor: '#3a3a3a', textColor: '#9ca3af', accentColor: '#6b7280', smogOpacity: 0.6 },
  recovering: { bgColor: '#1a2e1a', gridBg: '#2a3e2a', emptyTileColor: '#3a4e3a', textColor: '#86efac', accentColor: '#4ade80', smogOpacity: 0.4 },
  neutral: { bgColor: '#1e293b', gridBg: '#334155', emptyTileColor: '#475569', textColor: '#cbd5e1', accentColor: '#38bdf8', smogOpacity: 0.2 },
  green: { bgColor: '#052e16', gridBg: '#064e3b', emptyTileColor: '#065f46', textColor: '#a7f3d0', accentColor: '#34d399', smogOpacity: 0.05 },
  utopia: { bgColor: '#042f2e', gridBg: '#0f766e', emptyTileColor: '#0d9488', textColor: '#ccfbf1', accentColor: '#2dd4bf', smogOpacity: 0 },
};
