import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  Alert,
} from 'react-native';
import { adminService } from '../../../services/adminService';
import type { Program } from '../../../types/challenge';

export const AdminDashboardScreen = ({ navigation }: any) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [setupNeeded, setSetupNeeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      setSetupNeeded(false);
      setErrorMessage('');
      const data = await adminService.getPrograms();
      setPrograms(data);
    } catch (error: any) {
      console.error('Error loading programs:', error);
      const errorMsg = error.message || String(error);

      // Check if it's a Supabase configuration issue
      if (errorMsg.includes('supabase') || errorMsg.includes('YOUR_SUPABASE') || errorMsg.includes('Invalid API key')) {
        setSetupNeeded(true);
        setErrorMessage('Supabase not configured');
      } else {
        setErrorMessage(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPrograms();
    setRefreshing(false);
  };

  const handleDeleteProgram = (program: Program) => {
    Alert.alert(
      'Delete Program',
      `Are you sure you want to delete "${program.name}"? This will delete all days, lessons, and tests.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await adminService.deleteProgram(program.id);
              Alert.alert('Success', 'Program deleted successfully');
              loadPrograms();
            } catch (error: any) {
              Alert.alert('Error', 'Failed to delete program');
            }
          },
        },
      ]
    );
  };

  const renderProgram = (program: Program) => (
    <TouchableOpacity
      key={program.id}
      style={styles.card}
      onPress={() => navigation.navigate('ProgramDetails', { programId: program.id })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitle}>
          <Text style={styles.programName} numberOfLines={1}>
            {program.name}
          </Text>
          <View style={[styles.badge, { backgroundColor: getTypeColor(program.type) }]}>
            <Text style={styles.badgeText}>{formatType(program.type)}</Text>
          </View>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('EditProgram', { programId: program.id })}
          >
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleDeleteProgram(program)}
          >
            <Text style={styles.deleteIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {program.description}
      </Text>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{program.duration_days}</Text>
          <Text style={styles.statLabel}>Days</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{program.total_lessons || 0}</Text>
          <Text style={styles.statLabel}>Lessons</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{program.total_tests || 0}</Text>
          <Text style={styles.statLabel}>Tests</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{program.participant_count || 0}</Text>
          <Text style={styles.statLabel}>Users</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const formatType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'skill_assessment':
        return '#6366f1';
      case 'invest_challenge':
        return '#10b981';
      case 'trading_challenge':
        return '#f59e0b';
      default:
        return '#8b5cf6';
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  if (setupNeeded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.setupContainer}>
          <Text style={styles.setupIcon}>⚙️</Text>
          <Text style={styles.setupTitle}>Setup Required</Text>
          <Text style={styles.setupMessage}>
            Supabase database not configured yet.
          </Text>

          <View style={styles.setupSteps}>
            <Text style={styles.stepTitle}>📋 Quick Setup (5 minutes):</Text>
            <Text style={styles.stepText}>1. Go to supabase.com/dashboard</Text>
            <Text style={styles.stepText}>2. Create a new project</Text>
            <Text style={styles.stepText}>3. Run supabase-schema.sql in SQL Editor</Text>
            <Text style={styles.stepText}>4. Get API keys from Project Settings</Text>
            <Text style={styles.stepText}>5. Update .env file with your keys</Text>
            <Text style={styles.stepText}>6. Restart the app</Text>
          </View>

          <TouchableOpacity style={styles.setupButton} onPress={loadPrograms}>
            <Text style={styles.setupButtonText}>🔄 Retry Connection</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.setupButton, styles.secondarySetupButton]}
            onPress={() => navigation.navigate('TestConnection')}
          >
            <Text style={styles.setupButtonText}>Test API Connection</Text>
          </TouchableOpacity>

          <View style={styles.docsBox}>
            <Text style={styles.docsText}>📖 See QUICKSTART_ADMIN.md for details</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateProgram')}
        >
          <Text style={styles.createButtonText}>+ New Program</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4f46e5" />
        }
      >
        {programs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No programs yet</Text>
            <Text style={styles.emptySubtext}>Create your first program to get started</Text>
          </View>
        ) : (
          <View style={styles.programsList}>{programs.map(renderProgram)}</View>
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
  setupContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  setupIcon: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 20,
  },
  setupTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  setupMessage: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 30,
  },
  setupSteps: {
    backgroundColor: '#141b2d',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1a2235',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4f46e5',
    marginBottom: 16,
  },
  stepText: {
    fontSize: 14,
    color: '#e5e7eb',
    marginBottom: 10,
    lineHeight: 20,
  },
  setupButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondarySetupButton: {
    backgroundColor: '#374151',
  },
  setupButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  docsBox: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  docsText: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#141b2d',
    borderBottomWidth: 1,
    borderBottomColor: '#1a2235',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  createButton: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  programsList: {
    padding: 16,
  },
  card: {
    backgroundColor: '#141b2d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1a2235',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  programName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  cardActions: {
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
    fontSize: 18,
  },
  deleteIcon: {
    fontSize: 18,
  },
  description: {
    color: '#9ca3af',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#1a2235',
    paddingTop: 12,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: '#4f46e5',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 4,
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
