import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Option {
  label: string;
  value: string;
  icon?: string;
}

interface MultiSelectChipsProps {
  title: string;
  options: Option[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  onContinue: () => void;
}

export default function MultiSelectChips({
  title,
  options,
  selectedValues,
  onToggle,
  onContinue
}: MultiSelectChipsProps) {
  const hasSelection = selectedValues.length > 0;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{title}</Text>
        <View style={styles.chipsContainer}>
          {options.map((option, index) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <Animated.View
                key={option.value}
                entering={FadeInDown.delay(index * 60).springify()}
              >
                <TouchableOpacity
                  style={[
                    styles.chip,
                    isSelected && styles.chipSelected,
                  ]}
                  onPress={() => onToggle(option.value)}
                  activeOpacity={0.7}
                >
                  {option.icon && (
                    <Text style={styles.chipIcon}>{option.icon}</Text>
                  )}
                  <Text
                    style={[
                      styles.chipLabel,
                      isSelected && styles.chipLabelSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !hasSelection && styles.continueButtonDisabled]}
          onPress={onContinue}
          disabled={!hasSelection}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 34,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  chip: {
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chipSelected: {
    backgroundColor: '#6366f1',
  },
  chipIcon: {
    fontSize: 20,
  },
  chipLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  chipLabelSelected: {
    color: '#fff',
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
