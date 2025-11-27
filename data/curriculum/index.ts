// Curriculum Data - Main exports and helper functions

import type {
  TradingCurriculum,
  CurriculumDay,
  CurriculumLesson,
  Objective,
  ScreenConfig,
  ScreenType,
  DailyTest,
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
  defaultLessonsPerDay: 3,
  testsPerDay: 1,
  defaultObjectivesPerLesson: 3,
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
 * Map screens to objectives dynamically based on objective count
 * Each objective gets 3 screens: Intro -> Content -> Task
 * Final screen is Summary
 *
 * @param objectiveCount - Number of objectives in the lesson (default: 3)
 */
export function mapScreensToObjectives(objectiveCount: number = 3): ScreenConfig[] {
  const screenTypes: ScreenType[] = ['intro', 'content', 'task'];
  const configs: ScreenConfig[] = [];

  // Map each objective to 3 screens
  for (let obj = 0; obj < objectiveCount; obj++) {
    for (let screen = 0; screen < 3; screen++) {
      configs.push({
        screenIndex: obj * 3 + screen,
        objectiveIndex: obj,
        type: screenTypes[screen],
      });
    }
  }

  // Add Summary screen at the end
  configs.push({
    screenIndex: objectiveCount * 3,
    objectiveIndex: -1, // N/A for summary
    type: 'summary',
  });

  return configs;
}

/**
 * Get screen configuration for a specific screen index
 * @param screenIndex - The current screen index
 * @param objectiveCount - Number of objectives in the lesson (default: 3)
 */
export function getScreenConfig(screenIndex: number, objectiveCount: number = 3): ScreenConfig {
  const configs = mapScreensToObjectives(objectiveCount);
  return configs[screenIndex] || configs[0];
}

/**
 * Calculate total screens for a lesson based on objective count
 * Each objective has 3 screens (intro, content, task) + 1 summary screen
 * @param objectiveCount - Number of objectives in the lesson
 */
export function getTotalScreens(objectiveCount: number): number {
  return objectiveCount * 3 + 1; // 3 screens per objective + 1 summary
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

/**
 * Get the daily test for a specific day
 * If no test is defined, generates a default one from the lesson objectives
 */
export function getDailyTest(dayNumber: number): DailyTest | undefined {
  const day = getCurriculumDay(dayNumber);
  if (!day) return undefined;

  // If test exists, return it
  if (day.test) return day.test;

  // Generate a default test from lesson objectives (one question per lesson)
  const questions = day.lessons.map((lesson, lessonIdx) => {
    const obj = lesson.objectives[0]; // Use first objective from each lesson
    return {
      id: `day${dayNumber}_auto_q${lessonIdx + 1}`,
      type: obj.task.type,
      config: obj.task.config,
      feedback: obj.task.feedback,
      points: Math.floor(100 / 3)
    };
  });

  return {
    id: `day${dayNumber}_auto_test`,
    dayNumber,
    title: `Day ${dayNumber} Challenge`,
    description: `Test your knowledge from Day ${dayNumber}: ${day.title}`,
    questions: questions as DailyTest['questions'],
    passingScore: 70,
    estimatedMinutes: 5
  };
}

// Re-export types
export type {
  TradingCurriculum,
  CurriculumDay,
  CurriculumLesson,
  Objective,
  ScreenConfig,
  DailyTest,
} from '../../types/curriculum';
