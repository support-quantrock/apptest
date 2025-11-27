// Screen components for the curriculum system
// IntroScreen, ContentScreen, TaskScreen, SummaryScreen

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle, Trophy, Sparkles, ChevronRight } from 'lucide-react-native';

import type { Objective, CurriculumLesson, TaskFeedback } from '../../types/curriculum';
import {
  LessonLayout,
  ObjectiveImageDisplay,
  KeyPointsDisplay,
  FadeInElement,
  SlideInElement,
  PulsingElement,
  FloatingElement,
} from './shared';
import { StoryScene, KeyPointsScene } from './StoryScenes';

// ==================== INTRO SCREEN ====================

interface IntroScreenProps {
  objective: Objective;
  objectiveNumber: number;
  totalObjectives: number;
  lessonTitle: string;
  onNext: () => void;
  dayNumber?: number;
  lessonNumber?: number;
}

export const IntroScreen = ({
  objective,
  objectiveNumber,
  totalObjectives,
  lessonTitle,
  onNext,
  dayNumber = 1,
  lessonNumber = 1,
}: IntroScreenProps) => {
  // Check if this is Day 2 (Story Day with animated scenes)
  const isStoryDay = dayNumber === 2;

  return (
    <LessonLayout>
      {/* Objective badge */}
      <FadeInElement>
        <View style={styles.objectiveBadge}>
          <Text style={styles.objectiveBadgeText}>
            {isStoryDay ? `MISSION ${objectiveNumber}` : `OBJECTIVE ${objectiveNumber}/${totalObjectives}`}
          </Text>
        </View>
      </FadeInElement>

      {/* Lesson title */}
      <SlideInElement delay={100}>
        <Text style={styles.lessonTitle}>{lessonTitle}</Text>
      </SlideInElement>

      {/* Story Scene for Day 2, or Animated icon for other days */}
      <SlideInElement delay={200}>
        {isStoryDay ? (
          <StoryScene dayNumber={dayNumber} lessonNumber={lessonNumber} />
        ) : (
          <View style={styles.iconContainer}>
            <ObjectiveImageDisplay image={objective.image} size="large" />
          </View>
        )}
      </SlideInElement>

      {/* Objective title */}
      <SlideInElement delay={300}>
        <Text style={styles.objectiveTitle}>{objective.title}</Text>
      </SlideInElement>

      {/* Brief intro - hide for story day since guardian shows the message */}
      {!isStoryDay && (
        <SlideInElement delay={400}>
          <Text style={styles.introText}>
            Let's learn about {objective.title.toLowerCase()}
          </Text>
        </SlideInElement>
      )}

      {/* Continue button */}
      <SlideInElement delay={isStoryDay ? 400 : 500}>
        <TouchableOpacity style={styles.primaryButton} onPress={onNext}>
          <Text style={styles.primaryButtonText}>
            {isStoryDay ? 'START' : 'START LEARNING'}
          </Text>
          <ChevronRight size={20} color="#fff" />
        </TouchableOpacity>
      </SlideInElement>
    </LessonLayout>
  );
};

// ==================== CONTENT SCREEN ====================

interface ContentScreenProps {
  objective: Objective;
  objectiveNumber: number;
  onNext: () => void;
  dayNumber?: number;
  lessonNumber?: number;
}

export const ContentScreen = ({
  objective,
  objectiveNumber,
  onNext,
  dayNumber = 1,
  lessonNumber = 1,
}: ContentScreenProps) => {
  const isStoryDay = dayNumber === 2;

  // For Day 2 (Story Day), show only key points with beautiful animated design
  if (isStoryDay) {
    return (
      <LessonLayout>
        {/* Animated Key Points Scene */}
        {objective.keyPoints && objective.keyPoints.length > 0 && (
          <KeyPointsScene
            keyPoints={objective.keyPoints}
            lessonNumber={lessonNumber}
            title={objective.title}
          />
        )}

        {/* Continue button */}
        <SlideInElement delay={600}>
          <TouchableOpacity style={styles.primaryButton} onPress={onNext}>
            <Text style={styles.primaryButtonText}>CONTINUE TO CHALLENGE</Text>
            <ChevronRight size={20} color="#fff" />
          </TouchableOpacity>
        </SlideInElement>
      </LessonLayout>
    );
  }

  // Standard content screen for other days
  return (
    <LessonLayout>
      {/* Small icon */}
      <FadeInElement>
        <View style={styles.smallIconContainer}>
          <ObjectiveImageDisplay image={objective.image} size="small" />
        </View>
      </FadeInElement>

      {/* Title */}
      <SlideInElement delay={100}>
        <Text style={styles.contentTitle}>{objective.title}</Text>
      </SlideInElement>

      {/* Main content */}
      <SlideInElement delay={200}>
        <Text style={styles.contentBody}>{objective.content}</Text>
      </SlideInElement>

      {/* Key points */}
      {objective.keyPoints && objective.keyPoints.length > 0 && (
        <SlideInElement delay={300}>
          <View style={styles.keyPointsSection}>
            <Text style={styles.keyPointsTitle}>Key Points</Text>
            <KeyPointsDisplay points={objective.keyPoints} />
          </View>
        </SlideInElement>
      )}

      {/* Continue button */}
      <SlideInElement delay={400}>
        <TouchableOpacity style={styles.primaryButton} onPress={onNext}>
          <Text style={styles.primaryButtonText}>CONTINUE</Text>
          <ChevronRight size={20} color="#fff" />
        </TouchableOpacity>
      </SlideInElement>
    </LessonLayout>
  );
};

// ==================== TASK SCREEN ====================

interface TaskScreenProps {
  objective: Objective;
  objectiveNumber: number;
  onComplete: (result: { correct: boolean; response: unknown }) => void;
  TaskComponent: React.ComponentType<{
    config: unknown;
    onComplete: (result: { correct: boolean; response: unknown }) => void;
    feedback: TaskFeedback;
  }>;
}

export const TaskScreen = ({
  objective,
  objectiveNumber,
  onComplete,
  TaskComponent,
}: TaskScreenProps) => {
  return (
    <LessonLayout>
      {/* Task header */}
      <FadeInElement>
        <View style={styles.taskHeader}>
          <View style={styles.taskBadge}>
            <Text style={styles.taskBadgeText}>TASK {objectiveNumber}</Text>
          </View>
        </View>
      </FadeInElement>

      {/* Task title */}
      <SlideInElement delay={100}>
        <Text style={styles.taskTitle}>{objective.title}</Text>
      </SlideInElement>

      {/* Task component */}
      <SlideInElement delay={200}>
        <View style={styles.taskContainer}>
          <TaskComponent
            config={objective.task.config}
            onComplete={onComplete}
            feedback={objective.task.feedback}
          />
        </View>
      </SlideInElement>
    </LessonLayout>
  );
};

// ==================== SUMMARY SCREEN ====================

interface SummaryScreenProps {
  lesson: CurriculumLesson;
  completedObjectives: boolean[];
  onFinish: () => void;
}

export const SummaryScreen = ({
  lesson,
  completedObjectives,
  onFinish,
}: SummaryScreenProps) => {
  const allCompleted = completedObjectives.every(Boolean);
  const completedCount = completedObjectives.filter(Boolean).length;

  return (
    <LessonLayout>
      {/* Celebration icon */}
      <FadeInElement>
        <View style={styles.celebrationContainer}>
          <PulsingElement>
            <View style={styles.trophyCircle}>
              <Trophy size={48} color="#ffd166" />
            </View>
          </PulsingElement>
          <FloatingElement delay={0}>
            <View style={[styles.confetti, { left: 20, top: 10 }]}>
              <Sparkles size={20} color="#5b5fff" />
            </View>
          </FloatingElement>
          <FloatingElement delay={300}>
            <View style={[styles.confetti, { right: 20, top: 20 }]}>
              <Sparkles size={20} color="#22c55e" />
            </View>
          </FloatingElement>
        </View>
      </FadeInElement>

      {/* Completion title */}
      <SlideInElement delay={100}>
        <Text style={styles.summaryTitle}>
          {allCompleted ? 'Lesson Complete!' : 'Great Progress!'}
        </Text>
      </SlideInElement>

      {/* Lesson title */}
      <SlideInElement delay={200}>
        <Text style={styles.lessonCompletedText}>{lesson.title}</Text>
      </SlideInElement>

      {/* Objectives recap */}
      <SlideInElement delay={300}>
        <View style={styles.objectivesRecap}>
          <Text style={styles.recapHeader}>What you learned:</Text>
          {lesson.objectives.map((obj, index) => (
            <View key={obj.id} style={styles.recapItem}>
              <CheckCircle
                size={20}
                color={completedObjectives[index] ? '#22c55e' : '#3a3f5c'}
              />
              <Text
                style={[
                  styles.recapText,
                  !completedObjectives[index] && styles.recapTextIncomplete,
                ]}
              >
                {obj.title}
              </Text>
            </View>
          ))}
        </View>
      </SlideInElement>

      {/* Score */}
      <SlideInElement delay={400}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Tasks Completed</Text>
          <Text style={styles.scoreValue}>
            {completedCount}/{lesson.objectives.length}
          </Text>
        </View>
      </SlideInElement>

      {/* Finish button */}
      <SlideInElement delay={500}>
        <TouchableOpacity style={styles.finishButton} onPress={onFinish}>
          <Text style={styles.finishButtonText}>
            {allCompleted ? 'COMPLETE LESSON' : 'CONTINUE'}
          </Text>
        </TouchableOpacity>
      </SlideInElement>
    </LessonLayout>
  );
};

// ==================== STYLES ====================

const styles = StyleSheet.create({
  // Intro screen styles
  objectiveBadge: {
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  objectiveBadgeText: {
    color: '#9bafff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  lessonTitle: {
    fontSize: 14,
    color: '#8c92b5',
    marginBottom: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
    height: 160,
    justifyContent: 'center',
  },
  objectiveTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f5f7ff',
    textAlign: 'center',
    marginBottom: 12,
  },
  introText: {
    fontSize: 16,
    color: '#c3c7e6',
    textAlign: 'center',
    marginBottom: 32,
  },

  // Content screen styles
  smallIconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f5f7ff',
    marginBottom: 16,
  },
  contentBody: {
    fontSize: 16,
    lineHeight: 24,
    color: '#c3c7e6',
    marginBottom: 20,
  },
  keyPointsSection: {
    marginBottom: 24,
  },
  keyPointsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9bafff',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Task screen styles
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  taskBadge: {
    backgroundColor: 'rgba(255, 209, 102, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  taskBadgeText: {
    color: '#ffd166',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f5f7ff',
    marginBottom: 20,
  },
  taskContainer: {
    marginTop: 8,
  },

  // Summary screen styles
  celebrationContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
    height: 120,
  },
  trophyCircle: {
    backgroundColor: 'rgba(255, 209, 102, 0.2)',
    padding: 24,
    borderRadius: 40,
  },
  confetti: {
    position: 'absolute',
  },
  summaryTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f5f7ff',
    textAlign: 'center',
    marginBottom: 8,
  },
  lessonCompletedText: {
    fontSize: 16,
    color: '#9bafff',
    textAlign: 'center',
    marginBottom: 24,
  },
  objectivesRecap: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  recapHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8c92b5',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  recapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  recapText: {
    flex: 1,
    fontSize: 15,
    color: '#f5f7ff',
  },
  recapTextIncomplete: {
    color: '#8c92b5',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#8c92b5',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#22c55e',
  },

  // Button styles
  primaryButton: {
    backgroundColor: '#5b5fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  finishButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // RTL styles for Arabic
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});

export default {
  IntroScreen,
  ContentScreen,
  TaskScreen,
  SummaryScreen,
};
