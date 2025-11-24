# 🎯 Admin Dashboard Setup Guide

## 📋 Overview

This guide will help you set up a complete local admin dashboard to manage your challenge content (Programs, Days, Lessons, and Tests).

---

## ✅ What's Already Created

### 1. Database Schema
- File: `supabase-schema.sql`
- Contains complete database structure for all tables

### 2. Configuration
- `config/supabase.config.ts` - Supabase client setup
- `config/api.config.ts` - API configuration

### 3. Services
- `services/adminService.ts` - Complete CRUD operations for all entities

### 4. Admin Screens
- `app/screens/admin/AdminDashboardScreen.tsx` - Main dashboard
- `app/screens/admin/ProgramDetailsScreen.tsx` - Program management

---

## 🚀 Setup Instructions

### Step 1: Set Up Supabase

1. **Create a Supabase Project**
   ```
   Go to: https://supabase.com/dashboard
   Click: "New Project"
   Fill in: Name, Database Password, Region
   ```

2. **Get Your API Credentials**
   ```
   Project Settings → API
   Copy: Project URL and anon/public key
   ```

3. **Run the Database Schema**
   ```sql
   - Go to SQL Editor in Supabase Dashboard
   - Copy contents of supabase-schema.sql
   - Click "Run"
   ```

### Step 2: Configure Environment

Update `.env` file:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Update `config/supabase.config.ts` with your credentials.

### Step 3: Add Navigation

Update your `App.tsx` to include admin routes:

```typescript
import { AdminDashboardScreen } from './app/screens/admin/AdminDashboardScreen';
import { ProgramDetailsScreen } from './app/screens/admin/ProgramDetailsScreen';

// Add to your Stack.Navigator:
<Stack.Screen
  name="AdminDashboard"
  component={AdminDashboardScreen}
  options={{ title: 'Admin Dashboard' }}
/>
<Stack.Screen
  name="ProgramDetails"
  component={ProgramDetailsScreen}
  options={{ title: 'Program Details' }}
/>
```

---

## 📱 Creating Remaining Admin Screens

### Day Details Screen

Create: `app/screens/admin/DayDetailsScreen.tsx`

```typescript
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
      navigation.setOptions({ title: `Day ${dayData.day_number}` });
    } catch (error: any) {
      Alert.alert('Error', 'Failed to load day details');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = (lesson: any) => {
    Alert.alert(
      'Delete Lesson',
      `Are you sure you want to delete "${lesson.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await adminService.deleteLesson(lesson.id);
              Alert.alert('Success', 'Lesson deleted');
              loadDayData();
            } catch (error: any) {
              Alert.alert('Error', 'Failed to delete lesson');
            }
          },
        },
      ]
    );
  };

  const handleDeleteTest = (test: any) => {
    Alert.alert(
      'Delete Test',
      `Are you sure you want to delete "${test.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await adminService.deleteTest(test.id);
              Alert.alert('Success', 'Test deleted');
              loadDayData();
            } catch (error: any) {
              Alert.alert('Error', 'Failed to delete test');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Day Info */}
        <View style={styles.header}>
          <Text style={styles.title}>{day?.title}</Text>
          <Text style={styles.description}>{day?.description}</Text>
        </View>

        {/* Add Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('CreateLesson', { dayId, programId })}
          >
            <Text style={styles.addButtonText}>+ Add Lesson</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('CreateTest', { dayId, programId })}
          >
            <Text style={styles.addButtonText}>+ Add Test</Text>
          </TouchableOpacity>
        </View>

        {/* Lessons Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lessons ({lessons.length})</Text>
          {lessons.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              style={styles.item}
              onPress={() =>
                navigation.navigate('EditLesson', { lessonId: lesson.id, dayId, programId })
              }
            >
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{lesson.title}</Text>
                <Text style={styles.itemMeta}>
                  {lesson.lesson_type} • {lesson.duration_minutes} min
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteLesson(lesson)}>
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tests ({tests.length})</Text>
          {tests.map((test) => (
            <TouchableOpacity
              key={test.id}
              style={styles.item}
              onPress={() =>
                navigation.navigate('EditTest', { testId: test.id, dayId, programId })
              }
            >
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{test.title}</Text>
                <Text style={styles.itemMeta}>
                  {test.test_type} • {test.duration_minutes} min • Pass: {test.passing_score}%
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteTest(test)}>
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
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
  header: {
    padding: 20,
    backgroundColor: '#141b2d',
    borderBottomWidth: 1,
    borderBottomColor: '#1a2235',
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
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
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
    marginBottom: 8,
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
    marginBottom: 4,
  },
  itemMeta: {
    fontSize: 12,
    color: '#9ca3af',
  },
  deleteIcon: {
    fontSize: 18,
  },
});
```

---

## 🔨 Quick Form Components

Create a reusable form component: `components/AdminFormInput.tsx`

```typescript
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

export const AdminFormInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#141b2d',
    borderWidth: 1,
    borderColor: '#1a2235',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
});
```

---

## 📝 Usage Examples

### Creating a Program

```typescript
const newProgram = {
  name: 'Financial Literacy 101',
  type: 'skill_assessment',
  description: 'Learn the basics of personal finance',
  duration_days: 30,
  difficulty_level: 'beginner',
  is_active: true,
};

await adminService.createProgram(newProgram);
```

### Creating a Day

```typescript
const newDay = {
  program_id: 'your-program-id',
  day_number: 1,
  title: 'Introduction to Finance',
  description: 'Learn the fundamentals',
  display_order: 1,
  is_locked: false,
};

await adminService.createDay(newDay);
```

### Creating a Lesson

```typescript
const newLesson = {
  day_id: 'your-day-id',
  program_id: 'your-program-id',
  title: 'What is Money?',
  content: 'Money is a medium of exchange...',
  lesson_type: 'article',
  duration_minutes: 15,
  display_order: 1,
  is_mandatory: true,
};

await adminService.createLesson(newLesson);
```

### Creating a Test

```typescript
const newTest = {
  day_id: 'your-day-id',
  program_id: 'your-program-id',
  title: 'Day 1 Quiz',
  description: 'Test your knowledge',
  test_type: 'quiz',
  duration_minutes: 30,
  passing_score: 70,
  max_attempts: 3,
  display_order: 1,
};

await adminService.createTest(newTest);
```

---

## 🎨 Features Included

✅ Program Management (Create, Read, Update, Delete)
✅ Day Management with ordering
✅ Lesson Management with multiple pages
✅ Test Management with questions
✅ Statistics and analytics
✅ Search functionality
✅ Beautiful UI with dark theme
✅ Real-time updates
✅ Error handling
✅ Confirmation dialogs

---

## 🔄 Next Steps

1. **Add Authentication** - Protect admin routes
2. **Add Image Upload** - For thumbnails and lesson images
3. **Add Rich Text Editor** - For lesson content
4. **Add Drag & Drop** - For reordering items
5. **Add Export/Import** - For bulk content management

---

## 📞 Need Help?

- Check Supabase docs: https://supabase.com/docs
- Review the database schema in `supabase-schema.sql`
- Test API calls in `services/adminService.ts`
- Use the test connection screen to verify setup

---

## 🎉 You're Ready!

Your admin dashboard is now set up and ready to manage challenge content!
