// DynamicLessonScreen - Orchestrator for dynamic curriculum lessons
// Routes through screens based on curriculum data

import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

import {
  getCurriculumLesson,
  getScreenConfig,
  mapScreensToObjectives,
  getTotalScreens,
} from '../../data/curriculum';
import type { CurriculumLesson, Objective, ScreenConfig } from '../../types/curriculum';

import { IntroScreen, ContentScreen, TaskScreen, SummaryScreen } from './screens';
import { taskComponentMap } from './tasks';
import { ProgressIndicator } from './shared';

// ==================== TYPES ====================

interface DynamicLessonScreenProps {
  dayNumber: number;
  lessonNumber: number;
  onFinish: () => void;
}

interface LessonState {
  currentScreen: number;
  completedObjectives: boolean[];
  taskResults: Array<{ correct: boolean; response: unknown } | null>;
}

// ==================== MAIN COMPONENT ====================

export const DynamicLessonScreen = ({
  dayNumber,
  lessonNumber,
  onFinish,
}: DynamicLessonScreenProps) => {
  const lesson = getCurriculumLesson(dayNumber, lessonNumber);

  // Get objective count dynamically from lesson data
  const objectiveCount = lesson?.objectives.length || 3;
  const totalScreens = getTotalScreens(objectiveCount);

  const [state, setState] = useState<LessonState>(() => ({
    currentScreen: 0,
    completedObjectives: Array(objectiveCount).fill(false),
    taskResults: Array(objectiveCount).fill(null),
  }));

  const screenConfigs = mapScreensToObjectives(objectiveCount);
  const currentConfig = getScreenConfig(state.currentScreen, objectiveCount);

  // Navigation handlers
  const goToNextScreen = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentScreen: Math.min(prev.currentScreen + 1, totalScreens - 1),
    }));
  }, [totalScreens]);

  const handleTaskComplete = useCallback(
    (objectiveIndex: number, result: { correct: boolean; response: unknown }) => {
      setState((prev) => {
        const newCompleted = [...prev.completedObjectives];
        const newResults = [...prev.taskResults];

        // Mark objective as completed (regardless of correct/incorrect for progress)
        newCompleted[objectiveIndex] = true;
        newResults[objectiveIndex] = result;

        return {
          ...prev,
          completedObjectives: newCompleted,
          taskResults: newResults,
          currentScreen: Math.min(prev.currentScreen + 1, totalScreens - 1),
        };
      });
    },
    [totalScreens]
  );

  const handleFinish = useCallback(() => {
    onFinish();
  }, [onFinish]);

  // If lesson not found, return null
  if (!lesson) {
    return null;
  }

  // Render appropriate screen based on current config
  const renderScreen = () => {
    const { type, objectiveIndex, screenIndex } = currentConfig;

    // Handle summary screen
    if (type === 'summary') {
      return (
        <SummaryScreen
          lesson={lesson}
          completedObjectives={state.completedObjectives}
          onFinish={handleFinish}
        />
      );
    }

    // Get the objective for this screen
    const objective = lesson.objectives[objectiveIndex];
    if (!objective) {
      return null;
    }

    switch (type) {
      case 'intro':
        return (
          <IntroScreen
            objective={objective}
            objectiveNumber={objectiveIndex + 1}
            totalObjectives={objectiveCount}
            lessonTitle={lesson.title}
            onNext={goToNextScreen}
            dayNumber={dayNumber}
            lessonNumber={lessonNumber}
          />
        );

      case 'content':
        return (
          <ContentScreen
            objective={objective}
            objectiveNumber={objectiveIndex + 1}
            onNext={goToNextScreen}
            dayNumber={dayNumber}
          />
        );

      case 'task':
        const TaskComponent = taskComponentMap[objective.task.type];
        if (!TaskComponent) {
          // Fallback if task type not found
          goToNextScreen();
          return null;
        }

        return (
          <TaskScreen
            objective={objective}
            objectiveNumber={objectiveIndex + 1}
            onComplete={(result) => handleTaskComplete(objectiveIndex, result)}
            TaskComponent={TaskComponent}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress indicator */}
      <View style={styles.progressWrapper}>
        <ProgressIndicator
          current={state.currentScreen + 1}
          total={totalScreens}
          color="#5b5fff"
        />
      </View>

      {/* Screen content */}
      <View style={styles.screenWrapper}>{renderScreen()}</View>
    </View>
  );
};

// ==================== STYLES ====================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1020',
  },
  progressWrapper: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  screenWrapper: {
    flex: 1,
  },
});

export default DynamicLessonScreen;
