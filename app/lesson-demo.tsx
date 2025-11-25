/**
 * Lesson Demo - Simplified implementation showing how to use Lesson1Screens
 * This is a working example you can test by navigating to /lesson-demo
 */

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { X, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Lesson1Screen1,
  Lesson1Screen2,
  Lesson1Screen3,
  Lesson1Screen4,
  Lesson1Screen5,
  Lesson1Screen6,
  Lesson1Screen7,
  Lesson1Screen8,
  Lesson1Screen9,
  Lesson1Screen10,
} from '../components/Lesson1Screens';

export default function LessonDemo() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const totalScreens = 10;

  const handleNext = () => {
    if (currentScreen < totalScreens) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handlePrevious = () => {
    if (currentScreen > 1) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleFinish = () => {
    // Navigate back to challenge tab
    router.push('/qchat');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <Lesson1Screen1 />;
      case 2:
        return <Lesson1Screen2 />;
      case 3:
        return <Lesson1Screen3 />;
      case 4:
        return <Lesson1Screen4 />;
      case 5:
        return <Lesson1Screen5 />;
      case 6:
        return <Lesson1Screen6 />;
      case 7:
        return <Lesson1Screen7 />;
      case 8:
        return <Lesson1Screen8 />;
      case 9:
        return <Lesson1Screen9 />;
      case 10:
        return <Lesson1Screen10 onFinish={handleFinish} />;
      default:
        return <Lesson1Screen1 />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with close button and progress */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <X size={28} color="#f5f7ff" strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentScreen} / {totalScreens}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(currentScreen / totalScreens) * 100}%` },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Lesson Screen Content */}
      <View style={styles.content}>{renderScreen()}</View>

      {/* Navigation Controls */}
      {currentScreen < totalScreens && (
        <View style={styles.navigation}>
          {currentScreen > 1 && (
            <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
              <ChevronLeft size={24} color="#fff" strokeWidth={2} />
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <ChevronRight size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1020',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#0b1020',
    gap: 16,
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    gap: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#9bafff',
    fontWeight: '600',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5b5fff',
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: '#0b1020',
  },
  navButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5b5fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});
