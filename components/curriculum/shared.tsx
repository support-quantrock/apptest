// Shared components for the curriculum system
// Animations, layouts, and common UI elements

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import * as LucideIcons from 'lucide-react-native';

import type { ObjectiveImage } from '../../types/curriculum';

// ==================== ANIMATED COMPONENTS ====================

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export const FloatingElement = ({
  children,
  delay = 0,
  duration = 2000,
}: FloatingElementProps) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
            delay: delay,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    animate();
  }, [delay, duration, floatAnim]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
};

interface PulsingElementProps {
  children: React.ReactNode;
  minScale?: number;
  maxScale?: number;
}

export const PulsingElement = ({
  children,
  minScale = 1,
  maxScale = 1.1,
}: PulsingElementProps) => {
  const pulseAnim = useRef(new Animated.Value(minScale)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: maxScale,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: minScale,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [minScale, maxScale, pulseAnim]);

  return (
    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
      {children}
    </Animated.View>
  );
};

interface FadeInElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export const FadeInElement = ({
  children,
  delay = 0,
  duration = 500,
}: FadeInElementProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      delay: delay,
      useNativeDriver: true,
    }).start();
  }, [delay, duration, fadeAnim]);

  return <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>;
};

interface SlideInElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

export const SlideInElement = ({
  children,
  delay = 0,
  duration = 500,
  direction = 'up',
}: SlideInElementProps) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: duration,
      delay: delay,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [delay, duration, slideAnim]);

  const getTransform = () => {
    switch (direction) {
      case 'left':
        return {
          translateX: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0],
          }),
        };
      case 'right':
        return {
          translateX: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        };
      case 'down':
        return {
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-30, 0],
          }),
        };
      case 'up':
      default:
        return {
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          }),
        };
    }
  };

  return (
    <Animated.View
      style={{
        opacity: slideAnim,
        transform: [getTransform()],
      }}
    >
      {children}
    </Animated.View>
  );
};

// ==================== LAYOUT COMPONENTS ====================

interface LessonLayoutProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
}

export const LessonLayout = ({ children, variant = 'light' }: LessonLayoutProps) => {
  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
        variant === 'dark' && styles.scrollContentDark,
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.card}>{children}</View>
      </View>
    </ScrollView>
  );
};

// ==================== ICON COMPONENT ====================

interface DynamicIconProps {
  name: string;
  size?: number;
  color?: string;
}

export const DynamicIcon = ({ name, size = 24, color = '#5b5fff' }: DynamicIconProps) => {
  // Get the icon component from lucide-react-native
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ size?: number; color?: string }>>)[name];

  if (!IconComponent) {
    // Fallback to a default icon if not found
    const FallbackIcon = LucideIcons.HelpCircle;
    return <FallbackIcon size={size} color={color} />;
  }

  return <IconComponent size={size} color={color} />;
};

// ==================== OBJECTIVE IMAGE COMPONENT ====================

interface ObjectiveImageDisplayProps {
  image?: ObjectiveImage;
  size?: 'small' | 'medium' | 'large';
}

export const ObjectiveImageDisplay = ({
  image,
  size = 'medium',
}: ObjectiveImageDisplayProps) => {
  if (!image) return null;

  const sizeStyles = {
    small: { width: 60, height: 60, iconSize: 28 },
    medium: { width: 100, height: 100, iconSize: 48 },
    large: { width: 140, height: 140, iconSize: 64 },
  };

  const { width, height, iconSize } = sizeStyles[size];
  const iconColor = image.color || '#5b5fff';

  const IconContent = (
    <View
      style={[
        styles.iconCircle,
        { width, height, borderRadius: width / 2, backgroundColor: `${iconColor}20` },
      ]}
    >
      <DynamicIcon name={image.icon} size={iconSize} color={iconColor} />
    </View>
  );

  // Apply animation based on type
  switch (image.animation) {
    case 'float':
      return <FloatingElement>{IconContent}</FloatingElement>;
    case 'pulse':
      return <PulsingElement>{IconContent}</PulsingElement>;
    case 'fade':
      return <FadeInElement duration={800}>{IconContent}</FadeInElement>;
    case 'slide':
      return <SlideInElement>{IconContent}</SlideInElement>;
    default:
      return IconContent;
  }
};

// ==================== FEEDBACK COMPONENT ====================

interface TaskFeedbackDisplayProps {
  isCorrect: boolean;
  correctMessage: string;
  incorrectMessage: string;
}

export const TaskFeedbackDisplay = ({
  isCorrect,
  correctMessage,
  incorrectMessage,
}: TaskFeedbackDisplayProps) => {
  return (
    <FadeInElement duration={300}>
      <View
        style={[
          styles.feedbackContainer,
          isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect,
        ]}
      >
        <View style={styles.feedbackHeader}>
          <DynamicIcon
            name={isCorrect ? 'CheckCircle' : 'XCircle'}
            size={24}
            color={isCorrect ? '#22c55e' : '#ef4444'}
          />
          <Text
            style={[
              styles.feedbackTitle,
              isCorrect ? styles.feedbackTitleCorrect : styles.feedbackTitleIncorrect,
            ]}
          >
            {isCorrect ? 'Correct!' : 'Not quite!'}
          </Text>
        </View>
        <Text style={styles.feedbackText}>
          {isCorrect ? correctMessage : incorrectMessage}
        </Text>
      </View>
    </FadeInElement>
  );
};

// ==================== KEY POINTS COMPONENT ====================

interface KeyPointsDisplayProps {
  points: string[];
  isRtl?: boolean;
}

export const KeyPointsDisplay = ({ points, isRtl = false }: KeyPointsDisplayProps) => {
  if (!points || points.length === 0) return null;

  return (
    <View style={styles.keyPointsContainer}>
      {points.map((point, index) => (
        <SlideInElement key={index} delay={index * 100} direction={isRtl ? 'right' : 'left'}>
          <View style={[styles.keyPointItem, isRtl && styles.keyPointItemRtl]}>
            <View style={[styles.keyPointBullet, isRtl && styles.keyPointBulletRtl]} />
            <Text style={[styles.keyPointText, isRtl && styles.keyPointTextRtl]}>{point}</Text>
          </View>
        </SlideInElement>
      ))}
    </View>
  );
};

// ==================== PROGRESS INDICATOR ====================

interface ProgressIndicatorProps {
  current: number;
  total: number;
  color?: string;
}

export const ProgressIndicator = ({
  current,
  total,
  color = '#5b5fff',
}: ProgressIndicatorProps) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: current / total,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [current, total, progressAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            styles.progressFill,
            { width: progressWidth, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        {current}/{total}
      </Text>
    </View>
  );
};

// ==================== GAME HEADER ====================

interface GameHeaderProps {
  title: string;
  icon?: string;
}

export const GameHeader = ({ title, icon = 'Gamepad2' }: GameHeaderProps) => {
  return (
    <View style={styles.gameHeader}>
      <DynamicIcon name={icon} size={24} color="#5b5fff" />
      <Text style={styles.gameHeaderText}>{title}</Text>
    </View>
  );
};

// ==================== STYLES ====================

const styles = StyleSheet.create({
  // Layout styles
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#0b1020',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  scrollContentDark: {
    backgroundColor: '#050816',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(10, 14, 30, 0.95)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },

  // Icon circle
  iconCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Feedback styles
  feedbackContainer: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  feedbackCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  feedbackIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  feedbackTitleCorrect: {
    color: '#22c55e',
  },
  feedbackTitleIncorrect: {
    color: '#ef4444',
  },
  feedbackText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#c3c7e6',
  },

  // Key points styles
  keyPointsContainer: {
    marginTop: 16,
    gap: 8,
  },
  keyPointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  keyPointBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#5b5fff',
    marginTop: 7,
  },
  keyPointText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#c3c7e6',
  },
  // RTL styles for Arabic
  keyPointItemRtl: {
    flexDirection: 'row-reverse',
  },
  keyPointBulletRtl: {
    marginTop: 7,
  },
  keyPointTextRtl: {
    textAlign: 'right',
  },

  // Progress indicator styles
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#3a3f5c',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#8c92b5',
    fontWeight: '600',
  },

  // Game header styles
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  gameHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5b5fff',
    letterSpacing: 1,
  },
});

export default {
  FloatingElement,
  PulsingElement,
  FadeInElement,
  SlideInElement,
  LessonLayout,
  DynamicIcon,
  ObjectiveImageDisplay,
  TaskFeedbackDisplay,
  KeyPointsDisplay,
  ProgressIndicator,
  GameHeader,
};
