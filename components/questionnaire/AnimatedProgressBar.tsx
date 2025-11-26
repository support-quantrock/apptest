import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface AnimatedProgressBarProps {
  step: number;
  total: number;
}

export default function AnimatedProgressBar({ step, total }: AnimatedProgressBarProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withSpring((step / total) * 100, {
      damping: 15,
      stiffness: 100,
    });
  }, [step, total]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.progressInfo}>
        <Text style={styles.stepText}>
          <Text style={styles.currentStep}>{step}</Text>
          <Text style={styles.separator}> / </Text>
          <Text style={styles.totalSteps}>{total}</Text>
        </Text>
      </View>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressFill, animatedStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  progressInfo: {
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '600',
  },
  currentStep: {
    color: '#6366f1',
  },
  separator: {
    color: '#9ca3af',
  },
  totalSteps: {
    color: '#9ca3af',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
});
