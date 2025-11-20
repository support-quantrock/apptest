import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Check, ChevronDown, GraduationCap } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { router } from 'expo-router';

interface ChallengeInfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ChallengeInfoModal: React.FC<ChallengeInfoModalProps> = ({ visible, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expandedAnimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(isExpanded ? 2000 : 0, { duration: 300 }),
      opacity: withTiming(isExpanded ? 1 : 0, { duration: 300 }),
      overflow: 'hidden',
    };
  });

  const arrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(isExpanded ? '180deg' : '0deg', { duration: 300 }) }],
    };
  });

  const handleStartLearning = () => {
    onClose();
    router.push('/(tabs)/qchat');
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <LinearGradient
                colors={['#1e40af', '#1e3a8a']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientCard}
              >
                <View style={[styles.iconContainer, styles.iconContainerBlue]}>
                  <GraduationCap size={28} color="#60a5fa" strokeWidth={2} />
                </View>

                <Text style={styles.cardTitle}>Quantrock Skill Challenge</Text>
                <Text style={[styles.cardSubtitle, styles.cardSubtitleBlue]}>
                  Build Your Trading Foundation
                </Text>

                <Text style={[styles.cardDescription, styles.cardDescriptionWhite]}>
                  Master the fundamentals of trading through our comprehensive 20-day skill challenge. Learn essential trading concepts, develop critical analytical skills, and build confidence in a structured, step-by-step learning environment designed to transform beginners into knowledgeable traders.
                </Text>

                <View style={[styles.highlightBox, styles.highlightBoxBlue]}>
                  <Text style={styles.highlightTitle}>What You'll Learn:</Text>
                  <View style={styles.highlightItem}>
                    <Check size={16} color="#60a5fa" strokeWidth={3} />
                    <Text style={styles.highlightText}>
                      20 progressive daily lessons covering all trading essentials
                    </Text>
                  </View>
                  <View style={styles.highlightItem}>
                    <Check size={16} color="#60a5fa" strokeWidth={3} />
                    <Text style={styles.highlightText}>
                      Interactive challenges to reinforce your knowledge
                    </Text>
                  </View>
                  <View style={styles.highlightItem}>
                    <Check size={16} color="#60a5fa" strokeWidth={3} />
                    <Text style={styles.highlightText}>
                      Real-world trading scenarios and decision-making practice
                    </Text>
                  </View>
                  <View style={styles.highlightItem}>
                    <Check size={16} color="#60a5fa" strokeWidth={3} />
                    <Text style={styles.highlightText}>
                      Track your progress and earn achievement badges
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.expandButton}
                  onPress={() => setIsExpanded(!isExpanded)}
                >
                  <Text style={styles.expandButtonText}>Challenge Details</Text>
                  <Animated.View style={arrowAnimatedStyle}>
                    <ChevronDown size={24} color="#60a5fa" strokeWidth={2} />
                  </Animated.View>
                </TouchableOpacity>

                <Animated.View style={expandedAnimatedStyle}>
                  <View style={styles.featuresList}>
                    <View style={styles.featureItem}>
                      <Check size={20} color="#60a5fa" strokeWidth={3} />
                      <Text style={styles.featureText}>
                        Complete 4 lessons each day at your own pace
                      </Text>
                    </View>

                    <View style={styles.featureItem}>
                      <Check size={20} color="#60a5fa" strokeWidth={3} />
                      <Text style={styles.featureText}>
                        Learn market analysis, risk management, and trading psychology
                      </Text>
                    </View>

                    <View style={styles.featureItem}>
                      <Check size={20} color="#60a5fa" strokeWidth={3} />
                      <Text style={styles.featureText}>
                        Access to interactive quizzes and practical exercises
                      </Text>
                    </View>

                    <View style={styles.featureItem}>
                      <Check size={20} color="#60a5fa" strokeWidth={3} />
                      <Text style={styles.featureText}>
                        Build a solid foundation before live trading
                      </Text>
                    </View>

                    <View style={styles.featureItem}>
                      <Check size={20} color="#60a5fa" strokeWidth={3} />
                      <Text style={styles.featureText}>
                        Earn certificates upon completion of each module
                      </Text>
                    </View>

                    <View style={styles.featureItem}>
                      <Check size={20} color="#60a5fa" strokeWidth={3} />
                      <Text style={styles.featureText}>
                        Unlock advanced trading strategies as you progress
                      </Text>
                    </View>
                  </View>
                </Animated.View>

                <TouchableOpacity
                  style={[styles.button, styles.buttonBlue]}
                  onPress={handleStartLearning}
                >
                  <Text style={styles.buttonText}>Start Learning</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxHeight: '90%',
    backgroundColor: '#0a0a0a',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  card: {
    marginTop: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradientCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    alignSelf: 'center',
  },
  iconContainerBlue: {
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardSubtitleBlue: {
    color: '#fff',
  },
  cardDescription: {
    fontSize: 11,
    color: '#94a3b8',
    lineHeight: 17,
    marginBottom: 16,
    textAlign: 'center',
  },
  cardDescriptionWhite: {
    color: '#fff',
  },
  highlightBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  highlightBoxBlue: {
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  highlightTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
    flex: 1,
    lineHeight: 16,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 6,
  },
  expandButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  featuresList: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 10,
    fontWeight: '500',
    flex: 1,
    lineHeight: 16,
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonBlue: {
    borderColor: '#60a5fa',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
});
