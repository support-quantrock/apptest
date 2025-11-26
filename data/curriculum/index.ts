// Curriculum Data - Main exports and helper functions

import type {
  TradingCurriculum,
  CurriculumDay,
  CurriculumLesson,
  Objective,
  ScreenConfig,
  ScreenType,
} from '../../types/curriculum';

import { week1Days } from './week1';
import { week2Days } from './week2';
import { week3Days } from './week3';
import { week4Days } from './week4';

// ==================== FULL CURRICULUM ====================

export const tradingCurriculum: TradingCurriculum = {
  id: 'trading-challenge-v1',
  name: '28-Day Trading Challenge',
  version: '1.0.0',
  totalDays: 28,
  lessonsPerDay: 3,
  objectivesPerLesson: 3,
  days: [...week1Days, ...week2Days, ...week3Days, ...week4Days],
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Get a specific day from the curriculum
 */
export function getCurriculumDay(dayNumber: number): CurriculumDay | undefined {
  return tradingCurriculum.days.find((day) => day.dayNumber === dayNumber);
}

/**
 * Get a specific lesson from the curriculum
 */
export function getCurriculumLesson(
  dayNumber: number,
  lessonNumber: number
): CurriculumLesson | undefined {
  const day = getCurriculumDay(dayNumber);
  if (!day) return undefined;
  return day.lessons.find((lesson) => lesson.lessonNumber === lessonNumber);
}

/**
 * Get a specific objective from the curriculum
 */
export function getCurriculumObjective(
  dayNumber: number,
  lessonNumber: number,
  objectiveIndex: number
): Objective | undefined {
  const lesson = getCurriculumLesson(dayNumber, lessonNumber);
  if (!lesson) return undefined;
  return lesson.objectives[objectiveIndex];
}

/**
 * Map 10 screens to 3 objectives
 * Screens 1-3: Objective 1 (Intro -> Content -> Task)
 * Screens 4-6: Objective 2 (Intro -> Content -> Task)
 * Screens 7-9: Objective 3 (Intro -> Content -> Task)
 * Screen 10: Summary
 */
export function mapScreensToObjectives(): ScreenConfig[] {
  const screenTypes: ScreenType[] = ['intro', 'content', 'task'];
  const configs: ScreenConfig[] = [];

  // Screens 0-8: Map to 3 objectives (3 screens each)
  for (let obj = 0; obj < 3; obj++) {
    for (let screen = 0; screen < 3; screen++) {
      configs.push({
        screenIndex: obj * 3 + screen,
        objectiveIndex: obj,
        type: screenTypes[screen],
      });
    }
  }

  // Screen 9: Summary
  configs.push({
    screenIndex: 9,
    objectiveIndex: -1, // N/A for summary
    type: 'summary',
  });

  return configs;
}

/**
 * Get screen configuration for a specific screen index
 */
export function getScreenConfig(screenIndex: number): ScreenConfig {
  const configs = mapScreensToObjectives();
  return configs[screenIndex] || configs[0];
}

/**
 * Check if a day is unlocked based on previous day completion
 */
export function isDayUnlocked(dayNumber: number, completedDays: number[]): boolean {
  if (dayNumber === 1) return true;
  return completedDays.includes(dayNumber - 1);
}

/**
 * Get the theme color for a day based on its theme
 */
export function getDayThemeColor(theme: CurriculumDay['theme']): string {
  const themeColors: Record<CurriculumDay['theme'], string> = {
    basics: '#5b5fff',
    indicators: '#22c55e',
    multi_market: '#f59e0b',
    advanced: '#ef4444',
  };
  return themeColors[theme];
}

/**
 * Calculate total XP for completing days
 */
export function calculateTotalXp(completedDays: number[]): number {
  return completedDays.reduce((total, dayNum) => {
    const day = getCurriculumDay(dayNum);
    return total + (day?.rewards.xp || 0);
  }, 0);
}

/**
 * Get all earned badges
 */
export function getEarnedBadges(completedDays: number[]): string[] {
  return completedDays
    .map((dayNum) => {
      const day = getCurriculumDay(dayNum);
      return day?.rewards.badge.id;
    })
    .filter((id): id is string => id !== undefined);
}

// Re-export types
export type {
  TradingCurriculum,
  CurriculumDay,
  CurriculumLesson,
  Objective,
  ScreenConfig,
} from '../../types/curriculum';
