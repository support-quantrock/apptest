import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Option {
  label: string;
  value: string;
  icon?: string;
}

interface SingleChoiceGridProps {
  title: string;
  options: Option[];
  onSelect: (value: string) => void;
  selectedValue?: string | null;
  columns?: 2 | 3;
}

const { width } = Dimensions.get('window');

export default function SingleChoiceGrid({
  title,
  options,
  onSelect,
  selectedValue,
  columns = 2
}: SingleChoiceGridProps) {
  const cardWidth = (width - 60) / columns;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.optionsContainer, { gap: 12 }]}>
        {options.map((option, index) => (
          <Animated.View
            key={option.value}
            entering={FadeInDown.delay(index * 80).springify()}
            style={{ width: cardWidth }}
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
    marginBottom: 32,
    lineHeight: 34,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  optionCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 20,
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  optionCardSelected: {
    backgroundColor: '#6366f1',
  },
  optionIcon: {
    fontSize: 48,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    lineHeight: 20,
  },
  optionLabelSelected: {
    color: '#fff',
  },
});
