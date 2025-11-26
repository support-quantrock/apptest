import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface RatingScaleProps {
  title: string;
  leftLabel: string;
  rightLabel: string;
  selectedValue: number | null;
  onSelect: (value: number) => void;
  onContinue: () => void;
}

export default function RatingScale({
  title,
  leftLabel,
  rightLabel,
  selectedValue,
  onSelect,
  onContinue
}: RatingScaleProps) {
  const ratings = [
    { value: 1, emoji: '👍', size: 'large' },
    { value: 2, emoji: '👍', size: 'small' },
    { value: 3, emoji: '😐', size: 'medium' },
    { value: 4, emoji: '👎', size: 'small' },
    { value: 5, emoji: '👎', size: 'large' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Animated.View
          style={styles.ratingsContainer}
          entering={FadeInDown.delay(100).springify()}
        >
          {ratings.map((rating) => (
            <TouchableOpacity
              key={rating.value}
              style={[
                styles.ratingButton,
                rating.size === 'small' && styles.ratingButtonSmall,
                rating.size === 'large' && styles.ratingButtonLarge,
                selectedValue === rating.value && styles.ratingButtonSelected,
              ]}
              onPress={() => onSelect(rating.value)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.emoji,
                rating.size === 'small' && styles.emojiSmall,
              ]}>
                {rating.emoji}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        <View style={styles.labelsContainer}>
          <Text style={styles.labelLeft}>{leftLabel}</Text>
          <Text style={styles.labelRight}>{rightLabel}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedValue && styles.continueButtonDisabled]}
          onPress={onContinue}
          disabled={!selectedValue}
        >
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 34,
  },
  ratingsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },
  ratingButton: {
    width: 60,
    height: 60,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingButtonSmall: {
    width: 50,
    height: 50,
  },
  ratingButtonLarge: {
    width: 68,
    height: 68,
  },
  ratingButtonSelected: {
    backgroundColor: '#e0e7ff',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  emoji: {
    fontSize: 32,
  },
  emojiSmall: {
    fontSize: 24,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  labelLeft: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
    maxWidth: '45%',
  },
  labelRight: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
    maxWidth: '45%',
    textAlign: 'right',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 16,
  },
  continueButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
});
