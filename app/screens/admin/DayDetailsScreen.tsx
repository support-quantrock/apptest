import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import { adminService } from '../../../services/adminService';

export const DayDetailsScreen = ({ route, navigation }: any) => {
  const { dayId, programId } = route.params;
  const [day, setDay] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDayData();
  }, []);

  const loadDayData = async () => {
    try {
      setLoading(true);
      const [dayData, lessonsData, testsData] = await Promise.all([
        adminService.getDay(dayId),
        adminService.getLessons(dayId),
        adminService.getTests(dayId),
      ]);
      setDay(dayData);
      setLessons(lessonsData);
      setTests(testsData);
      navigation.setOptions({ title: `Day ${dayData.day_number}: ${dayData.title}` });
    } catch (error: any) {
      console.error('Error loading day data:', error);
      Alert.alert('Error', 'Failed to load day details');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = (lesson: any) => {
    Alert.alert('Delete Lesson', `Are you sure you want to delete "${lesson.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await adminService.deleteLesson(lesson.id);
            Alert.alert('Success', 'Lesson deleted successfully');
            loadDayData();
          } catch (error: any) {
            Alert.alert('Error', 'Failed to delete lesson');
          }
        },
      },
    ]);
  };

  const handleDeleteTest = (test: any) => {
    Alert.alert('Delete Test', `Are you sure you want to delete "${test.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await adminService.deleteTest(test.id);
            Alert.alert('Success', 'Test deleted successfully');
            loadDayData();
          } catch (error: any) {
            Alert.alert('Error', 'Failed to delete test');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading day details...</Text>
      </View>
    );
  }

  if (!day) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Day not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Day Info */}
      <View style={styles.header}>
        <View style={styles.dayBadge}>
          <Text style={styles.dayNumber}>Day {day.day_number}</Text>
        </View>
        <Text style={styles.title}>{day.title}</Text>
        {day.description && <Text style={styles.description}>{day.description}</Text>}
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{lessons.length}</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{tests.length}</Text>
            <Text style={styles.statLabel}>Tests</Text>
          </View>
          {day.is_locked && (
            <View style={styles.lockedBadge}>
              <Text style={styles.lockedText}>🔒 Locked</Text>
            </View>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => Alert.alert('Coming Soon', 'Lesson creation form coming soon!')}
        >
          <Text style={styles.addButtonText}>+ Add Lesson</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => Alert.alert('Coming Soon', 'Test creation form coming soon!')}
        >
          <Text style={styles.addButtonText}>+ Add Test</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Lessons Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Lessons ({lessons.length})</Text>
          {lessons.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No lessons yet</Text>
            </View>
          ) : (
            lessons.map((lesson) => (
              <View key={lesson.id} style={styles.item}>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>{lesson.title}</Text>
                  <Text style={styles.itemMeta}>
                    {lesson.lesson_type} • {lesson.duration_minutes} min
                    {lesson.is_mandatory && ' • Required'}
                  </Text>
                  {lesson.description && (
                    <Text style={styles.itemDescription} numberOfLines={2}>
                      {lesson.description}
                    </Text>
                  )}
                  {lesson.pages && lesson.pages.length > 0 && (
                    <Text style={styles.itemPages}>📄 {lesson.pages.length} pages</Text>
                  )}
                </View>
                <View style={styles.itemActions}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => Alert.alert('Coming Soon', 'Edit lesson form coming soon!')}
                  >
                    <Text style={styles.editIcon}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleDeleteLesson(lesson)}
                  >
                    <Text style={styles.deleteIcon}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Tests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Tests ({tests.length})</Text>
          {tests.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No tests yet</Text>
            </View>
          ) : (
            tests.map((test) => (
              <View key={test.id} style={styles.item}>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>{test.title}</Text>
                  <Text style={styles.itemMeta}>
                    {test.test_type} • {test.duration_minutes} min • Pass: {test.passing_score}%
                    {test.is_mandatory && ' • Required'}
                  </Text>
                  {test.description && (
                    <Text style={styles.itemDescription} numberOfLines={2}>
                      {test.description}
                    </Text>
                  )}
                  <View style={styles.testStats}>
                    <Text style={styles.testStat}>Max Attempts: {test.max_attempts}</Text>
                    {test.questions && test.questions[0]?.count && (
                      <Text style={styles.testStat}>
                        Questions: {test.questions[0].count}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.itemActions}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => Alert.alert('Coming Soon', 'Edit test form coming soon!')}
                  >
                    <Text style={styles.editIcon}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleDeleteTest(test)}
                  >
                    <Text style={styles.deleteIcon}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e1a',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0e1a',
  },
  loadingText: {
    color: '#9ca3af',
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
  header: {
    padding: 20,
    backgroundColor: '#141b2d',
    borderBottomWidth: 1,
    borderBottomColor: '#1a2235',
  },
  dayBadge: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  dayNumber: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 20,
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  lockedBadge: {
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  lockedText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#0f1419',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#141b2d',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1a2235',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  itemMeta: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginTop: 8,
  },
  itemPages: {
    fontSize: 12,
    color: '#4f46e5',
    marginTop: 8,
  },
  testStats: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  testStat: {
    fontSize: 12,
    color: '#10b981',
  },
  itemActions: {
    flexDirection: 'column',
    gap: 8,
    marginLeft: 12,
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 18,
  },
  deleteIcon: {
    fontSize: 18,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 14,
  },
});
