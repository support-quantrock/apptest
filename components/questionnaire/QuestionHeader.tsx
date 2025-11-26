import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, X } from 'lucide-react-native';

interface QuestionHeaderProps {
  step: number;
  total: number;
  onBack?: () => void;
  onSkip: () => void;
  showBack?: boolean;
}

export default function QuestionHeader({ step, total, onBack, onSkip, showBack = true }: QuestionHeaderProps) {
  return (
    <View style={styles.header}>
      {showBack && step > 1 ? (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" strokeWidth={2} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.logo}>Quantrock</Text>

      <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
        <X size={24} color="#000" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  placeholder: {
    width: 32,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6366f1',
  },
  skipButton: {
    padding: 4,
  },
});
