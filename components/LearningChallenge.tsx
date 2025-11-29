import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BookOpen, CircleCheck as CheckCircle, Crown, Book, ChevronDown, Info, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { router } from 'expo-router';
import { ChallengeInfoModal } from './ChallengeInfoModal';
import { tradingCurriculum, getCurriculumDay } from '../data/curriculum';

const TOTAL_DAYS = 28;
const DEFAULT_LESSONS_PER_DAY = 3; // Default if no curriculum data (actual count comes from curriculum)

const ICON_CONFIG = {
  completedIcon: {
    size: 24,
    color: '#fff',
    fill: '#5b5fff',
    circleSize: 60,
  },
  activeIcon: {
    size: 20,
    color: '#fff',
    circleSize: 60,
  },
  lockedIcon: {
    size: 20,
    color: '#94a3b8',
    circleSize: 60,
  },
};

export default function LearningChallenge() {
  const [selectedDay, setSelectedDay] = useState(2); // Currently active day
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());
  const [calendarPage, setCalendarPage] = useState(0); // 0 = days 1-9, 1 = days 10-18, 2 = days 19-28

  // Simulated completion status - Day 1 and 5 completed, Day 2 is active
  const completedDays = [1, 5];
  const currentDay = 11; // User is on day 11

  const handleLessonPress = (dayNumber: number, lessonId: number) => {
    router.push(`/lesson-content?day=${dayNumber}&lesson=${lessonId}`);
  };

  const toggleDayExpansion = (dayNumber: number) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dayNumber)) {
        newSet.delete(dayNumber);
      } else {
        newSet.add(dayNumber);
      }
      return newSet;
    });
  };

  const generateDays = () => {
    const generatedDays = [];
    for (let day = 1; day <= TOTAL_DAYS; day++) {
      const curriculumDay = getCurriculumDay(day);
      // Get lesson count from curriculum data, default to 3 if not available
      const lessonCount = curriculumDay?.lessons.length || DEFAULT_LESSONS_PER_DAY;
      const totalItems = lessonCount + 1; // lessons + 1 test
      const lessons = [];
      for (let lesson = 1; lesson <= totalItems; lesson++) {
        const isTest = lesson === totalItems; // Last item is the daily test
        // All lessons and tests are unlocked for testing
        lessons.push({
          id: lesson,
          completed: false,
          locked: false,
          isTest,
          isDaily: isTest,
        });
      }
      generatedDays.push({
        day,
        lessons,
        lessonCount, // Store for use in renderLesson
        title: curriculumDay?.title || `Day ${day}`,
        emoji: curriculumDay?.emoji || '📚',
        theme: curriculumDay?.theme || 'basics',
      });
    }
    return generatedDays;
  };

  const days = generateDays();

  const renderLesson = (lessonData: any, dayNumber: number, lessonIndex: number, totalItems: number) => {
    // Odd days (1, 3, 5...) go right to left, Even days (2, 4, 6...) go left to right
    const isOddDay = dayNumber % 2 === 1;
    const isLastLesson = lessonIndex === totalItems - 1;
    const isTest = lessonData.isTest;

    // Dynamic zigzag padding calculation based on total items
    // First item has no extra padding, last item has maximum padding (60%)
    const maxPadding = 60;
    const paddingStep = totalItems > 1 ? maxPadding / (totalItems - 1) : 0;
    const paddingPercent = `${Math.round(lessonIndex * paddingStep)}%`;

    let extraPadding: { paddingRight?: string; paddingLeft?: string } = {};
    if (lessonIndex > 0) {
      extraPadding = isOddDay ? { paddingRight: paddingPercent } : { paddingLeft: paddingPercent };
    }

    const lesson = lessonData;
    if (lesson.locked) {
      return (
        <View key={`day-${dayNumber}-lesson-${lessonIndex}`} style={[styles.lessonItem, extraPadding]}>
          <View style={styles.lessonContainer}>
            <View style={[styles.lessonCircle, styles.lessonLocked]}>
              {isLastLesson ? (
                <Crown size={ICON_CONFIG.lockedIcon.size} color={ICON_CONFIG.lockedIcon.color} strokeWidth={2} />
              ) : (
                <BookOpen size={ICON_CONFIG.lockedIcon.size} color={ICON_CONFIG.lockedIcon.color} strokeWidth={2} />
              )}
            </View>
          </View>
        </View>
      );
    }

    if (lesson.completed) {
      return (
        <TouchableOpacity
          key={`day-${dayNumber}-lesson-${lessonIndex}`}
          style={[styles.lessonItem, extraPadding]}
          onPress={() => handleLessonPress(dayNumber, lesson.id)}>
          <View style={styles.lessonContainer}>
            <View style={[
              styles.lessonCircle,
              {
                width: ICON_CONFIG.completedIcon.circleSize,
                height: ICON_CONFIG.completedIcon.circleSize,
                borderRadius: ICON_CONFIG.completedIcon.circleSize / 2,
                backgroundColor: '#5b5fff',
            //    justifyContent: 'center',
             //   alignItems: 'center',
              }
            ]}>
              <CheckCircle
                size={ICON_CONFIG.completedIcon.size}
                color={ICON_CONFIG.completedIcon.color}
                strokeWidth={2}
                fill={ICON_CONFIG.completedIcon.fill}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    if (lesson.isDaily) {
      return (
        <TouchableOpacity
          key={`day-${dayNumber}-lesson-${lessonIndex}`}
          style={[styles.lessonItem, extraPadding]}
          onPress={() => handleLessonPress(dayNumber, lesson.id)}>
          <View style={styles.lessonContainer}>

            <View style={[styles.lessonCircle, styles.lessonActive]}>
              {isLastLesson ? (
                <Crown size={ICON_CONFIG.activeIcon.size} color={ICON_CONFIG.activeIcon.color} strokeWidth={2} />
              ) : (
                <Book size={ICON_CONFIG.activeIcon.size} color={ICON_CONFIG.activeIcon.color} strokeWidth={2} />
              )}
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={`day-${dayNumber}-lesson-${lessonIndex}`}
        style={[styles.lessonItem, extraPadding]}
        onPress={() => handleLessonPress(dayNumber, lesson.id)}>
        <View style={styles.lessonContainer}>
          <View style={[styles.lessonCircle, styles.lessonActive]}>
            {isLastLesson ? (
              <Crown size={ICON_CONFIG.activeIcon.size} color={ICON_CONFIG.activeIcon.color} strokeWidth={2} />
            ) : (
              <BookOpen size={ICON_CONFIG.activeIcon.size} color={ICON_CONFIG.activeIcon.color} strokeWidth={2} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Get visible days for current calendar page (9 days per page, left to right order)
  const getVisibleDays = () => {
    const startDay = calendarPage * 9 + 1;
    const endDay = Math.min(startDay + 8, TOTAL_DAYS);
    const days = [];
    for (let i = startDay; i <= endDay; i++) {
      days.push(i);
    }
    return days;
  };

  const getDayStatus = (day: number) => {
    if (completedDays.includes(day)) return 'completed';
    if (day === selectedDay) return 'active';
    return 'pending';
  };

  return (
    <View style={styles.container}>
      {/* Progress Header */}
      <View style={styles.progressHeader}>
        <View style={styles.progressHeaderLeft}>
          <Text style={styles.dayCountHighlight}>Day {currentDay}</Text>
          <Text style={styles.dayCountText}> out of {TOTAL_DAYS}</Text>
        </View>
        <Text style={styles.progressTitle}>Your progress</Text>
      </View>

      {/* Calendar Card */}
      <View style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            style={[styles.calendarNavButton, calendarPage === 0 && styles.calendarNavButtonDisabled]}
            onPress={() => setCalendarPage(Math.max(calendarPage - 1, 0))}
          >
            <ChevronLeft size={24} color={calendarPage === 0 ? "#d1d5db" : "#fff"} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.calendarTitle}>Calendar</Text>
          <TouchableOpacity
            style={[styles.calendarNavButton, calendarPage === 2 && styles.calendarNavButtonDisabled]}
            onPress={() => setCalendarPage(Math.min(calendarPage + 1, 2))}
          >
            <ChevronRight size={24} color={calendarPage === 2 ? "#d1d5db" : "#fff"} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarDivider} />

        <View style={styles.calendarDays}>
          {getVisibleDays().map((day) => {
            const status = getDayStatus(day);
            return (
              <TouchableOpacity
                key={day}
                style={[
                  styles.calendarDayBox,
                  status === 'active' && styles.calendarDayBoxActive,
                ]}
                onPress={() => setSelectedDay(day)}
              >
                <Text style={[
                  styles.calendarDayText,
                  status === 'active' && styles.calendarDayTextActive,
                ]}>D{day}</Text>
                <View style={styles.calendarDayIndicator}>
                  {status === 'completed' && (
                    <View style={styles.completedIndicator}>
                      <CheckCircle size={14} color="#22c55e" strokeWidth={3} fill="#22c55e" />
                    </View>
                  )}
                  {status === 'active' && (
                    <View style={styles.activeIndicator} />
                  )}
                  {status === 'pending' && (
                    <View style={styles.pendingIndicator} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.challengeHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.challengeTitle}>28 day Skill challenge</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => setShowInfoModal(true)}
          >
            <Info size={20} color="#60a5fa" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ChallengeInfoModal
        visible={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />

      <ScrollView style={styles.daysScroll} showsVerticalScrollIndicator={false}>
        {days.map((dayData) => (
          <View key={dayData.day} style={styles.daySection}>
            <View style={styles.dayHeaderContainer}>
              <View style={styles.dayLabelContainer}>
                <Text style={styles.dayEmoji}>{dayData.emoji}</Text>
                <Text style={styles.dayLabel}>Day {String(dayData.day).padStart(2, '0')}</Text>
              </View>
              <View style={styles.dayObjectiveContainer}>
                <Text style={styles.dayObjective} numberOfLines={1}>{dayData.title}</Text>
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => toggleDayExpansion(dayData.day)}
                >
                  <ChevronDown
                    size={20}
                    color="#6b7280"
                    strokeWidth={2}
                    style={[
                      styles.arrowIcon,
                      expandedDays.has(dayData.day) && styles.arrowIconExpanded
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {expandedDays.has(dayData.day) && (
              <View style={styles.dayDetailsContainer}>
                <Text style={styles.dayDetailsText}>
                  {getCurriculumDay(dayData.day)?.lessons.map(l => l.title).join(' • ')}
                </Text>
              </View>
            )}
            <View style={styles.dayLine} />

            <View style={styles.lessonsContainer}>
              {dayData.lessons.map((lesson, index) => renderLesson(lesson, dayData.day, index, dayData.lessons.length))}
            </View>
          </View>
        ))}

        <LinearGradient
          colors={['#7c3aed', '#5b21b6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.premiumCard}>
          <Text style={styles.premiumTitle}>🔓 Unlock Premium Account</Text>
          <Text style={styles.premiumDescription}>
            Get access to advanced features, exclusive content, and personalized coaching to accelerate your trading journey.
          </Text>

          <View style={styles.premiumFeatures}>
            <View style={styles.premiumFeatureItem}>
              <CheckCircle size={20} color="#fff" strokeWidth={2} />
              <Text style={styles.premiumFeatureText}>Unlimited portfolio sizes</Text>
            </View>
            <View style={styles.premiumFeatureItem}>
              <CheckCircle size={20} color="#fff" strokeWidth={2} />
              <Text style={styles.premiumFeatureText}>Advanced analytics & insights</Text>
            </View>
            <View style={styles.premiumFeatureItem}>
              <CheckCircle size={20} color="#fff" strokeWidth={2} />
              <Text style={styles.premiumFeatureText}>Priority support</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.premiumButton} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.premiumButtonText}>Upgrade Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  // Progress Header Styles
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  progressHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  dayCountHighlight: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5b5fff',
  },
  dayCountText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  // Calendar Card Styles
  calendarCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  calendarNavButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5b5fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarNavButtonDisabled: {
    backgroundColor: '#f3f4f6',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  calendarDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 16,
  },
  calendarDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  calendarDayBox: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    minWidth: 32,
  },
  calendarDayBoxActive: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#5b5fff',
  },
  calendarDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 6,
  },
  calendarDayTextActive: {
    color: '#5b5fff',
    fontWeight: '700',
  },
  calendarDayIndicator: {
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedIndicator: {
    // CheckCircle icon handles the display
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5b5fff',
  },
  pendingIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    backgroundColor: 'transparent',
  },
  challengeHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  challengeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
    flex: 1,
  },
  infoButton: {
    padding: 8,
    marginBottom: 16,
  },
  daysScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  daySection: {
    marginBottom: 32,
  },
  dayHeaderContainer: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayEmoji: {
    fontSize: 20,
  },
  dayLabel: {
    fontSize: 18,
    color: '#1f2937',
    fontWeight: '700',
  },
  dayObjectiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayObjective: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  arrowButton: {
    padding: 4,
  },
  arrowIcon: {
    transition: 'transform 0.3s',
  },
  arrowIconExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  dayDetailsContainer: {
    backgroundColor: '#f9fafb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  dayDetailsText: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 20,
  },
  dayLine: {
    position: 'absolute',
    left: 0,
    top: 80,
    width: 0,
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: -1,
  },
  lessonsContainer: {
    alignItems: 'center',
    gap: 24,
  },
  lessonItem: {
    width: '100%',
  },
  lessonContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  dailyLessonLabel: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 8,
  },
  dailyLessonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  lessonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  lessonCompleted: {
    backgroundColor: '#5b5fff',
    borderWidth: 3,
    borderTopColor: '#7c7cff',
    borderLeftColor: '#7c7cff',
    borderRightColor: '#3a3acc',
    borderBottomColor: '#3a3acc',
    elevation: 12,
    shadowColor: '#5b5fff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  lessonActive: {
    backgroundColor: '#5b5fff',
    borderWidth: 3,
    borderTopColor: '#7c7cff',
    borderLeftColor: '#7c7cff',
    borderRightColor: '#3a3acc',
    borderBottomColor: '#3a3acc',
    elevation: 12,
    shadowColor: '#5b5fff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  lessonLocked: {
    backgroundColor: '#e2e8f0',
    borderWidth: 3,
    borderTopColor: '#f1f5f9',
    borderLeftColor: '#f1f5f9',
    borderRightColor: '#cbd5e1',
    borderBottomColor: '#cbd5e1',
    elevation: 4,
    shadowColor: '#94a3b8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  premiumCard: {
    marginTop: 32,
    marginBottom: 32,
    padding: 24,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  premiumDescription: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.9,
  },
  premiumFeatures: {
    marginBottom: 24,
    gap: 12,
  },
  premiumFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  premiumFeatureText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  premiumButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  premiumButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7c3aed',
  },
});