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
import type { Day } from '../../../types/challenge';

export const ProgramDetailsScreen = ({ route, navigation }: any) => {
  const { programId } = route.params;
  const [program, setProgram] = useState<any>(null);
  const [days, setDays] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgramData();
  }, []);

  const loadProgramData = async () => {
    try {
      setLoading(true);
      const [programData, daysData] = await Promise.all([
        adminService.getProgram(programId),
        adminService.getDays(programId),
      ]);
      setProgram(programData);
      setDays(daysData);
      navigation.setOptions({ title: programData.name });
    } catch (error: any) {
      console.error('Error loading program data:', error);
      Alert.alert('Error', 'Failed to load program details');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDay = (day: Day) => {
    Alert.alert(
      'Delete Day',
      `Are you sure you want to delete Day ${day.day_number}? This will delete all lessons and tests for this day.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await adminService.deleteDay(day.id);
              Alert.alert('Success', 'Day deleted successfully');
              loadProgramData();
            } catch (error: any) {
              Alert.alert('Error', 'Failed to delete day');
            }
          },
        },
      ]
    );
  };

  const renderDay = (day: any) => {
    const lessonCount = day.lessons?.[0]?.count || 0;
    const testCount = day.tests?.[0]?.count || 0;

    return (
      <TouchableOpacity
        key={day.id}
        style={styles.dayCard}
        onPress={() => navigation.navigate('DayDetails', { dayId: day.id, programId })}
      >
        <View style={styles.dayHeader}>
          <View style={styles.dayInfo}>
            <View style={styles.dayNumberBadge}>
              <Text style={styles.dayNumber}>Day {day.day_number}</Text>
            </View>
            <Text style={styles.dayTitle}>{day.title}</Text>
          </View>
          <View style={styles.dayActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('EditDay', { dayId: day.id, programId })}
            >
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => handleDeleteDay(day)}>
              <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {day.description && (
          <Text style={styles.dayDescription} numberOfLines={2}>
            {day.description}
          </Text>
        )}

        <View style={styles.dayStats}>
          <View style={styles.dayStat}>
            <Text style={styles.dayStatValue}>{lessonCount}</Text>
            <Text style={styles.dayStatLabel}>Lessons</Text>
          </View>
          <View style={styles.dayStat}>
            <Text style={styles.dayStatValue}>{testCount}</Text>
            <Text style={styles.dayStatLabel}>Tests</Text>
          </View>
          {day.is_locked && (
            <View style={styles.lockedBadge}>
              <Text style={styles.lockedText}>🔒 Locked</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading program...</Text>
      </View>
    );
  }

  if (!program) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Program not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Program Info Header */}
      <View style={styles.programInfo}>
        <Text style={styles.programName}>{program.name}</Text>
        <Text style={styles.programDescription}>{program.description}</Text>
        <View style={styles.programStats}>
          <View style={styles.programStat}>
            <Text style={styles.programStatLabel}>Duration</Text>
            <Text style={styles.programStatValue}>{program.duration_days} days</Text>
          </View>
          <View style={styles.programStat}>
            <Text style={styles.programStatLabel}>Difficulty</Text>
            <Text style={styles.programStatValue}>{program.difficulty_level}</Text>
          </View>
          <View style={styles.programStat}>
            <Text style={styles.programStatLabel}>Days Created</Text>
            <Text style={styles.programStatValue}>{days.length}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CreateDay', { programId })}
        >
          <Text style={styles.actionButtonText}>+ Add Day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={() => navigation.navigate('EditProgram', { programId })}
        >
          <Text style={styles.actionButtonText}>Edit Program</Text>
        </TouchableOpacity>
      </View>

      {/* Days List */}
      <ScrollView style={styles.content}>
        {days.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No days yet</Text>
            <Text style={styles.emptySubtext}>Add your first day to get started</Text>
          </View>
        ) : (
          <View style={styles.daysList}>{days.map(renderDay)}</View>
        )}
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
  programInfo: {
    backgroundColor: '#141b2d',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a2235',
  },
  programName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  programDescription: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 20,
    marginBottom: 16,
  },
  programStats: {
    flexDirection: 'row',
    gap: 20,
  },
  programStat: {
    flex: 1,
  },
  programStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  programStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4f46e5',
  },
  actionBar: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#0f1419',
    borderBottomWidth: 1,
    borderBottomColor: '#1a2235',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#374151',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  daysList: {
    padding: 16,
  },
  dayCard: {
    backgroundColor: '#141b2d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1a2235',
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dayInfo: {
    flex: 1,
  },
  dayNumberBadge: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  dayNumber: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  dayActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 16,
  },
  deleteIcon: {
    fontSize: 16,
  },
  dayDescription: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 20,
    marginBottom: 12,
  },
  dayStats: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  dayStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
  },
  dayStatLabel: {
    fontSize: 14,
    color: '#6b7280',
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#9ca3af',
    fontSize: 14,
  },
});
