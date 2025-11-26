// DailyTestScreen - Component for rendering daily tests/challenges
// Shows a series of questions from the day's lessons

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Trophy, Star, CheckCircle, XCircle, ChevronRight } from 'lucide-react-native';

import { getDailyTest, getCurriculumDay } from '../../data/curriculum';
import type { DailyTest, TestQuestion } from '../../types/curriculum';

import { taskComponentMap } from './tasks';
import {
  LessonLayout,
  ProgressIndicator,
  PulsingElement,
  FloatingElement,
  FadeInElement,
  SlideInElement,
} from './shared';

// ==================== TYPES ====================

interface DailyTestScreenProps {
  dayNumber: number;
  onFinish: (score: number, passed: boolean) => void;
}

interface TestState {
  currentQuestion: number;
  answers: Array<{ correct: boolean; response: unknown } | null>;
  showResult: boolean;
}

// ==================== INTRO SCREEN ====================

interface TestIntroProps {
  test: DailyTest;
  dayTitle: string;
  onStart: () => void;
}

const TestIntro = ({ test, dayTitle, onStart }: TestIntroProps) => {
  return (
    <LessonLayout>
      <FadeInElement>
        <View style={styles.testBadge}>
          <Text style={styles.testBadgeText}>DAILY CHALLENGE</Text>
        </View>
      </FadeInElement>

      <SlideInElement delay={100}>
        <View style={styles.trophyContainer}>
          <PulsingElement>
            <View style={styles.trophyCircle}>
              <Trophy size={48} color="#ffd166" />
            </View>
          </PulsingElement>
        </View>
      </SlideInElement>

      <SlideInElement delay={200}>
        <Text style={styles.testTitle}>{test.title}</Text>
      </SlideInElement>

      <SlideInElement delay={300}>
        <Text style={styles.dayTitleText}>{dayTitle}</Text>
      </SlideInElement>

      <SlideInElement delay={400}>
        <View style={styles.testInfo}>
          <View style={styles.testInfoItem}>
            <Text style={styles.testInfoLabel}>Questions</Text>
            <Text style={styles.testInfoValue}>{test.questions.length}</Text>
          </View>
          <View style={styles.testInfoDivider} />
          <View style={styles.testInfoItem}>
            <Text style={styles.testInfoLabel}>Pass Score</Text>
            <Text style={styles.testInfoValue}>{test.passingScore}%</Text>
          </View>
          <View style={styles.testInfoDivider} />
          <View style={styles.testInfoItem}>
            <Text style={styles.testInfoLabel}>Time</Text>
            <Text style={styles.testInfoValue}>~{test.estimatedMinutes} min</Text>
          </View>
        </View>
      </SlideInElement>

      <SlideInElement delay={500}>
        <Text style={styles.testDescription}>
          {test.description || 'Test your knowledge from today\'s lessons!'}
        </Text>
      </SlideInElement>

      <SlideInElement delay={600}>
        <TouchableOpacity style={styles.startButton} onPress={onStart}>
          <Text style={styles.startButtonText}>START CHALLENGE</Text>
          <ChevronRight size={20} color="#fff" />
        </TouchableOpacity>
      </SlideInElement>
    </LessonLayout>
  );
};

// ==================== QUESTION SCREEN ====================

interface QuestionScreenProps {
  question: TestQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (result: { correct: boolean; response: unknown }) => void;
}

const QuestionScreen = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuestionScreenProps) => {
  const TaskComponent = taskComponentMap[question.type];

  if (!TaskComponent) {
    // Skip unsupported question types
    onAnswer({ correct: true, response: 'skipped' });
    return null;
  }

  return (
    <LessonLayout>
      <FadeInElement>
        <View style={styles.questionHeader}>
          <View style={styles.questionBadge}>
            <Text style={styles.questionBadgeText}>
              QUESTION {questionNumber}/{totalQuestions}
            </Text>
          </View>
          <View style={styles.pointsBadge}>
            <Star size={14} color="#ffd166" />
            <Text style={styles.pointsText}>{question.points} pts</Text>
          </View>
        </View>
      </FadeInElement>

      <SlideInElement delay={100}>
        <View style={styles.taskContainer}>
          <TaskComponent
            config={question.config}
            onComplete={onAnswer}
            feedback={question.feedback}
          />
        </View>
      </SlideInElement>
    </LessonLayout>
  );
};

// ==================== RESULT SCREEN ====================

interface ResultScreenProps {
  test: DailyTest;
  answers: Array<{ correct: boolean; response: unknown } | null>;
  onFinish: () => void;
}

const ResultScreen = ({ test, answers, onFinish }: ResultScreenProps) => {
  const correctCount = answers.filter((a) => a?.correct).length;
  const totalQuestions = test.questions.length;
  const score = Math.round((correctCount / totalQuestions) * 100);
  const passed = score >= test.passingScore;

  return (
    <LessonLayout>
      <FadeInElement>
        <View style={styles.resultContainer}>
          <PulsingElement>
            <View style={[styles.resultCircle, passed ? styles.resultCirclePassed : styles.resultCircleFailed]}>
              {passed ? (
                <Trophy size={48} color="#ffd166" />
              ) : (
                <XCircle size={48} color="#ef4444" />
              )}
            </View>
          </PulsingElement>
        </View>
      </FadeInElement>

      <SlideInElement delay={100}>
        <Text style={[styles.resultTitle, passed ? styles.resultTitlePassed : styles.resultTitleFailed]}>
          {passed ? 'Challenge Complete!' : 'Keep Practicing!'}
        </Text>
      </SlideInElement>

      <SlideInElement delay={200}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Your Score</Text>
          <Text style={[styles.scoreValue, passed ? styles.scoreValuePassed : styles.scoreValueFailed]}>
            {score}%
          </Text>
          <Text style={styles.scoreDetail}>
            {correctCount}/{totalQuestions} correct
          </Text>
        </View>
      </SlideInElement>

      <SlideInElement delay={300}>
        <View style={styles.questionsReview}>
          {test.questions.map((q, index) => {
            const answer = answers[index];
            const isCorrect = answer?.correct;

            return (
              <View key={q.id} style={styles.questionReviewItem}>
                {isCorrect ? (
                  <CheckCircle size={20} color="#22c55e" />
                ) : (
                  <XCircle size={20} color="#ef4444" />
                )}
                <Text style={styles.questionReviewText}>Question {index + 1}</Text>
                <Text style={[styles.questionReviewPoints, isCorrect && styles.questionReviewPointsEarned]}>
                  {isCorrect ? `+${q.points}` : '0'} pts
                </Text>
              </View>
            );
          })}
        </View>
      </SlideInElement>

      <SlideInElement delay={400}>
        <TouchableOpacity
          style={[styles.finishButton, passed ? styles.finishButtonPassed : styles.finishButtonFailed]}
          onPress={onFinish}
        >
          <Text style={styles.finishButtonText}>
            {passed ? 'CONTINUE' : 'TRY AGAIN LATER'}
          </Text>
        </TouchableOpacity>
      </SlideInElement>
    </LessonLayout>
  );
};

// ==================== MAIN COMPONENT ====================

export const DailyTestScreen = ({ dayNumber, onFinish }: DailyTestScreenProps) => {
  const test = getDailyTest(dayNumber);
  const day = getCurriculumDay(dayNumber);

  const [state, setState] = useState<TestState>({
    currentQuestion: -1, // -1 = intro screen
    answers: [],
    showResult: false,
  });

  const handleStart = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestion: 0,
      answers: new Array(test?.questions.length || 0).fill(null),
    }));
  }, [test]);

  const handleAnswer = useCallback(
    (result: { correct: boolean; response: unknown }) => {
      setState((prev) => {
        const newAnswers = [...prev.answers];
        newAnswers[prev.currentQuestion] = result;

        const isLastQuestion = prev.currentQuestion >= (test?.questions.length || 0) - 1;

        return {
          ...prev,
          answers: newAnswers,
          currentQuestion: isLastQuestion ? prev.currentQuestion : prev.currentQuestion + 1,
          showResult: isLastQuestion,
        };
      });
    },
    [test]
  );

  const handleFinish = useCallback(() => {
    const correctCount = state.answers.filter((a) => a?.correct).length;
    const totalQuestions = test?.questions.length || 1;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= (test?.passingScore || 70);
    onFinish(score, passed);
  }, [state.answers, test, onFinish]);

  if (!test || !day) {
    return null;
  }

  // Show intro screen
  if (state.currentQuestion === -1) {
    return <TestIntro test={test} dayTitle={day.title} onStart={handleStart} />;
  }

  // Show result screen
  if (state.showResult) {
    return <ResultScreen test={test} answers={state.answers} onFinish={handleFinish} />;
  }

  // Show question
  const currentQuestion = test.questions[state.currentQuestion];

  return (
    <View style={styles.container}>
      <View style={styles.progressWrapper}>
        <ProgressIndicator
          current={state.currentQuestion + 1}
          total={test.questions.length}
          color="#ffd166"
        />
      </View>
      <QuestionScreen
        question={currentQuestion}
        questionNumber={state.currentQuestion + 1}
        totalQuestions={test.questions.length}
        onAnswer={handleAnswer}
      />
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

  // Test badge
  testBadge: {
    backgroundColor: 'rgba(255, 209, 102, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 24,
  },
  testBadgeText: {
    color: '#ffd166',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // Trophy
  trophyContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  trophyCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 209, 102, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Test info
  testTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f5f7ff',
    textAlign: 'center',
    marginBottom: 8,
  },
  dayTitleText: {
    fontSize: 16,
    color: '#9bafff',
    textAlign: 'center',
    marginBottom: 24,
  },
  testInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  testInfoItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  testInfoLabel: {
    fontSize: 12,
    color: '#8c92b5',
    marginBottom: 4,
  },
  testInfoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f5f7ff',
  },
  testInfoDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  testDescription: {
    fontSize: 16,
    color: '#c3c7e6',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },

  // Start button
  startButton: {
    backgroundColor: '#ffd166',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // Question screen
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionBadge: {
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  questionBadgeText: {
    color: '#9bafff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 209, 102, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  pointsText: {
    color: '#ffd166',
    fontSize: 12,
    fontWeight: '700',
  },
  taskContainer: {
    marginTop: 8,
  },

  // Result screen
  resultContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultCirclePassed: {
    backgroundColor: 'rgba(255, 209, 102, 0.2)',
  },
  resultCircleFailed: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  resultTitlePassed: {
    color: '#22c55e',
  },
  resultTitleFailed: {
    color: '#ef4444',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#8c92b5',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 64,
    fontWeight: '700',
    marginBottom: 4,
  },
  scoreValuePassed: {
    color: '#22c55e',
  },
  scoreValueFailed: {
    color: '#ef4444',
  },
  scoreDetail: {
    fontSize: 16,
    color: '#c3c7e6',
  },
  questionsReview: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  questionReviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  questionReviewText: {
    flex: 1,
    fontSize: 14,
    color: '#c3c7e6',
  },
  questionReviewPoints: {
    fontSize: 14,
    color: '#8c92b5',
    fontWeight: '600',
  },
  questionReviewPointsEarned: {
    color: '#22c55e',
  },
  finishButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  finishButtonPassed: {
    backgroundColor: '#22c55e',
  },
  finishButtonFailed: {
    backgroundColor: '#5b5fff',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default DailyTestScreen;
