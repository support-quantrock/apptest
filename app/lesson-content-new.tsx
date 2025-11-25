import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { X, TextAlignJustify as AlignJustify, Headphones, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
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

export default function LessonContent() {
  const params = useLocalSearchParams();
  const day = params.day ? parseInt(params.day as string) : 1;
  const lesson = params.lesson ? parseInt(params.lesson as string) : 1;

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
    router.push('/qchat');
  };

  const renderScreen = () => {
    if (day !== 1 || lesson !== 1) {
      // For other lessons, you can add different screen flows here
      return <Lesson1Screen1 />;
    }

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

  const renderProgressIndicator = () => {
    const progress = (currentScreen / totalScreens) * 100;
    return (
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={28} color="#f5f7ff" strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          {renderProgressIndicator()}
          <TouchableOpacity style={styles.iconButton}>
            <AlignJustify size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Headphones size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Navigation Controls */}
      {currentScreen < totalScreens && (
        <View style={styles.navigationControls}>
          {currentScreen > 1 && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={handlePrevious}
            >
              <ChevronLeft size={24} color="#f5f7ff" strokeWidth={2} />
            </TouchableOpacity>
          )}
          <View style={styles.navSpacer} />
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleNext}
          >
            <ChevronRight size={24} color="#f5f7ff" strokeWidth={2} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#0b1020',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    width: 100,
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
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(91, 95, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  navigationControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: '#0b1020',
  },
  navSpacer: {
    flex: 1,
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
