import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Option {
  label: string;
  value: string;
  icon?: string;
}

interface SingleChoiceCardProps {
  title: string;
  subtitle?: string;
  options: Option[];
  onSelect: (value: string) => void;
  selectedValue?: string | null;
}

export default function SingleChoiceCard({ title, subtitle, options, onSelect, selectedValue }: SingleChoiceCardProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, !subtitle && styles.titleNoSubtitle]}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <Animated.View
            key={option.value}
            entering={FadeInDown.delay(index * 80).springify()}
          >
            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedValue === option.value && styles.optionCardSelected,
              ]}
              onPress={() => onSelect(option.value)}
              activeOpacity={0.7}
            >
              {option.icon && (
                <Text style={styles.optionIcon}>{option.icon}</Text>
              )}
              <Text
                style={[
                  styles.optionLabel,
                  selectedValue === option.value && styles.optionLabelSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 34,
  },
  titleNoSubtitle: {
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  optionCardSelected: {
    backgroundColor: '#6366f1',
  },
  optionIcon: {
    fontSize: 28,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  optionLabelSelected: {
    color: '#fff',
  },
});
