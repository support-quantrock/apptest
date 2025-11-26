import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { Share2, Trophy, TrendingUp, Shield, Zap, ChevronRight } from 'lucide-react-native';
import { useQuestionnaire, QuestionnaireAnswers } from '@/context/QuestionnaireContext';

// Scoring calculation functions
const calculateInvestorPersonality = (answers: QuestionnaireAnswers): { score: number; label: string; color: string; emoji: string } => {
  let score = 0;

  // Q14 - Portfolio drop response
  if (answers.portfolioDropResponse === 'sell') score += 0;
  else if (answers.portfolioDropResponse === 'reduce') score += 3;
  else if (answers.portfolioDropResponse === 'nothing') score += 5;
  else if (answers.portfolioDropResponse === 'buy_more') score += 10;

  // Q15 - Market fluctuation impact
  if (answers.marketFluctuationImpact === 'worry_too_much') score += 0;
  else if (answers.marketFluctuationImpact === 'worry_sometimes') score += 5;
  else if (answers.marketFluctuationImpact === 'no_worry') score += 10;

  // Q16 - Risk tolerance
  if (answers.riskTolerance === 'low') score += 0;
  else if (answers.riskTolerance === 'medium') score += 5;
  else if (answers.riskTolerance === 'high') score += 10;

  // Q17 - Risk attitude
  if (answers.riskAttitude === 'prefer_safety') score += 0;
  else if (answers.riskAttitude === 'accept_moderate') score += 5;
  else if (answers.riskAttitude === 'seek_highest') score += 10;

  let label = '';
  let color = '';
  let emoji = '';

  if (score <= 10) {
    label = 'Conservative Investor';
    color = '#22c55e';
    emoji = '🛡️';
  } else if (score <= 20) {
    label = 'Balanced Investor';
    color = '#3b82f6';
    emoji = '⚖️';
  } else if (score <= 30) {
    label = 'Growth Investor';
    color = '#8b5cf6';
    emoji = '📈';
  } else {
    label = 'Aggressive Trader';
    color = '#ef4444';
    emoji = '🚀';
  }

  return { score, label, color, emoji };
};

const calculateFinancialLiteracy = (answers: QuestionnaireAnswers): { score: number; label: string; color: string; emoji: string } => {
  let score = 0;

  // Q10 - Investment knowledge
  if (answers.investmentKnowledge === 'nothing') score += 0;
  else if (answers.investmentKnowledge === 'little') score += 5;
  else if (answers.investmentKnowledge === 'good') score += 10;
  else if (answers.investmentKnowledge === 'expert') score += 15;

  // Q11 - Asset classes (max 10 points)
  const assetClasses = answers.assetClasses || [];
  if (!assetClasses.includes('none')) {
    const assetPoints = assetClasses.length * 2;
    score += Math.min(assetPoints, 10);
  }

  // Q25 - Passive income knowledge (1-5 scale, 1=best, 5=worst)
  const passiveKnowledge = answers.passiveIncomeKnowledge;
  if (passiveKnowledge === 1) score += 7;
  else if (passiveKnowledge === 2) score += 5;
  else if (passiveKnowledge === 3) score += 3;
  else if (passiveKnowledge === 4) score += 0;
  else if (passiveKnowledge === 5) score += 0;

  // Q24 - Investment readiness (1-5 scale, 1=best, 5=worst)
  const readiness = answers.investmentReadiness;
  if (readiness === 1) score += 8;
  else if (readiness === 2) score += 5;
  else if (readiness === 3) score += 3;
  else if (readiness === 4) score += 1;
  else if (readiness === 5) score += 0;

  let label = '';
  let color = '';
  let emoji = '';

  if (score <= 10) {
    label = 'Beginner';
    color = '#f59e0b';
    emoji = '🌱';
  } else if (score <= 20) {
    label = 'Intermediate';
    color = '#3b82f6';
    emoji = '📚';
  } else {
    label = 'Advanced';
    color = '#22c55e';
    emoji = '🎓';
  }

  return { score, label, color, emoji };
};

const calculateFinancialStrength = (answers: QuestionnaireAnswers): { score: number; label: string; color: string; emoji: string } => {
  let score = 0;

  // Q4 - Monthly income
  if (answers.monthlyIncome === '<5k') score += 0;
  else if (answers.monthlyIncome === '5k-10k') score += 2;
  else if (answers.monthlyIncome === '10k-25k') score += 3;
  else if (answers.monthlyIncome === '>25k') score += 5;

  // Q5 - Income stability
  if (answers.incomeStability === 'not_stable') score += 0;
  else if (answers.incomeStability === 'stable') score += 2;
  else if (answers.incomeStability === 'very_stable') score += 3;

  // Q7 - Debts (take worst case)
  const debts = answers.currentDebts || [];
  if (debts.includes('no_debts')) {
    score += 5;
  } else if (debts.includes('credit_card')) {
    score += 0;
  } else if (debts.includes('student_loan') || debts.includes('auto_loan')) {
    score += 2;
  } else if (debts.includes('mortgage')) {
    score += 3;
  }

  let label = '';
  let color = '';
  let emoji = '';

  if (score <= 5) {
    label = 'Weak';
    color = '#ef4444';
    emoji = '⚠️';
  } else if (score <= 10) {
    label = 'Moderate';
    color = '#f59e0b';
    emoji = '💪';
  } else {
    label = 'Strong';
    color = '#22c55e';
    emoji = '💎';
  }

  return { score, label, color, emoji };
};

const calculateChallengeReadiness = (answers: QuestionnaireAnswers): { score: number; label: string; color: string; emoji: string; portfolioRange: string } => {
  let score = 0;

  // Q22 - Quantrock goal
  if (answers.quantrockGoal === 'challenge') score += 4;
  else if (answers.quantrockGoal === 'prepare_trading') score += 3;
  else if (answers.quantrockGoal === 'test_strategy') score += 2;
  else if (answers.quantrockGoal === 'learn') score += 1;

  // Q23 - Preferred portfolio size
  if (answers.preferredPortfolioSize === '1k') score += 0;
  else if (answers.preferredPortfolioSize === '10k') score += 2;
  else if (answers.preferredPortfolioSize === '25k') score += 4;
  else if (answers.preferredPortfolioSize === '50k') score += 7;
  else if (answers.preferredPortfolioSize === '100k') score += 10;

  // Q24 - Investment readiness (1-5 scale)
  const readiness = answers.investmentReadiness;
  if (readiness === 1) score += 3;
  else if (readiness === 2) score += 2;
  else if (readiness === 3) score += 1;
  else score += 0;

  let label = '';
  let color = '';
  let emoji = '';
  let portfolioRange = '';

  if (score <= 3) {
    label = 'Needs Learning';
    color = '#f59e0b';
    emoji = '📚';
    portfolioRange = '$1k – $25k';
  } else if (score <= 7) {
    label = 'Investment Ready';
    color = '#3b82f6';
    emoji = '🎯';
    portfolioRange = '$25k – $50k';
  } else {
    label = 'Full Challenge Ready';
    color = '#22c55e';
    emoji = '🏆';
    portfolioRange = '$50k – $100k';
  }

  return { score, label, color, emoji, portfolioRange };
};

const getSuggestedPortfolio = (
  financialStrength: { label: string },
  personality: { label: string },
  challengeReadiness: { label: string }
): { size: string; color: string } => {
  const strength = financialStrength.label;
  const type = personality.label;
  const readiness = challengeReadiness.label;

  if (strength === 'Weak' || type === 'Conservative Investor') {
    return { size: '$1k – $10k', color: '#f59e0b' };
  } else if (strength === 'Moderate' || type === 'Balanced Investor') {
    return { size: '$10k – $25k', color: '#3b82f6' };
  } else if (strength === 'Strong' && type === 'Growth Investor') {
    return { size: '$25k – $50k', color: '#8b5cf6' };
  } else if (strength === 'Strong' && type === 'Aggressive Trader' && readiness === 'Full Challenge Ready') {
    return { size: '$50k – $100k', color: '#22c55e' };
  }
  return { size: '$10k – $25k', color: '#3b82f6' };
};

// Animated Progress Circle Component
const AnimatedCircle = ({ score, maxScore, color, delay = 0 }: { score: number; maxScore: number; color: string; delay?: number }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(delay, withTiming(score / maxScore, { duration: 1500 }));
  }, [score, maxScore, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${interpolate(progress.value, [0, 1], [0, 100])}%`,
  }));

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarBg}>
        <Animated.View style={[styles.progressBarFill, { backgroundColor: color }, animatedStyle]} />
      </View>
      <Text style={[styles.scoreText, { color }]}>{score}/{maxScore}</Text>
    </View>
  );
};

export default function InvestorResults() {
  const { answers } = useQuestionnaire();
  const [showContent, setShowContent] = useState(false);

  const personality = calculateInvestorPersonality(answers);
  const literacy = calculateFinancialLiteracy(answers);
  const strength = calculateFinancialStrength(answers);
  const readiness = calculateChallengeReadiness(answers);
  const suggestedPortfolio = getSuggestedPortfolio(strength, personality, readiness);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500);
  }, []);

  const handleShare = async () => {
    try {
      const message = `🎯 My Quantrock Investor Profile

${personality.emoji} Investor Type: ${personality.label}
${literacy.emoji} Financial Literacy: ${literacy.label}
${strength.emoji} Financial Strength: ${strength.label}
${readiness.emoji} Challenge Readiness: ${readiness.label}

💼 Suggested Portfolio: ${suggestedPortfolio.size}

Start your investment journey with Quantrock!
#Quantrock #Investing #Trading`;

      await Share.share({
        message,
        title: 'My Quantrock Investor Profile',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleContinue = () => {
    router.push('/dashboard');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.header}>
            <Text style={styles.congratsText}>Congratulations!</Text>
            <Text style={styles.title}>Your Investor Profile</Text>
          </Animated.View>

          {/* Main Personality Card */}
          <Animated.View entering={FadeInDown.delay(400).springify()}>
            <LinearGradient
              colors={[personality.color + '40', personality.color + '20']}
              style={styles.mainCard}
            >
              <Text style={styles.mainEmoji}>{personality.emoji}</Text>
              <Text style={[styles.mainLabel, { color: personality.color }]}>{personality.label}</Text>
              <View style={styles.mainScoreContainer}>
                <Text style={styles.mainScoreValue}>{personality.score}</Text>
                <Text style={styles.mainScoreMax}>/40</Text>
              </View>
              <Text style={styles.sectionTitle}>Investment Personality</Text>
            </LinearGradient>
          </Animated.View>

          {/* Score Cards Grid */}
          {showContent && (
            <View style={styles.cardsGrid}>
              {/* Financial Literacy */}
              <Animated.View entering={FadeInDown.delay(600).springify()} style={styles.scoreCard}>
                <View style={[styles.cardIconContainer, { backgroundColor: literacy.color + '30' }]}>
                  <Text style={styles.cardEmoji}>{literacy.emoji}</Text>
                </View>
                <Text style={styles.cardTitle}>Financial Literacy (QLS)</Text>
                <Text style={[styles.cardLabel, { color: literacy.color }]}>{literacy.label}</Text>
                <AnimatedCircle score={literacy.score} maxScore={30} color={literacy.color} delay={800} />
              </Animated.View>

              {/* Financial Strength */}
              <Animated.View entering={FadeInDown.delay(800).springify()} style={styles.scoreCard}>
                <View style={[styles.cardIconContainer, { backgroundColor: strength.color + '30' }]}>
                  <Text style={styles.cardEmoji}>{strength.emoji}</Text>
                </View>
                <Text style={styles.cardTitle}>Financial Strength</Text>
                <Text style={[styles.cardLabel, { color: strength.color }]}>{strength.label}</Text>
                <AnimatedCircle score={strength.score} maxScore={15} color={strength.color} delay={1000} />
              </Animated.View>

              {/* Challenge Readiness */}
              <Animated.View entering={FadeInDown.delay(1000).springify()} style={styles.scoreCard}>
                <View style={[styles.cardIconContainer, { backgroundColor: readiness.color + '30' }]}>
                  <Text style={styles.cardEmoji}>{readiness.emoji}</Text>
                </View>
                <Text style={styles.cardTitle}>Challenge Readiness</Text>
                <Text style={[styles.cardLabel, { color: readiness.color }]}>{readiness.label}</Text>
                <AnimatedCircle score={readiness.score} maxScore={10} color={readiness.color} delay={1200} />
              </Animated.View>
            </View>
          )}

          {/* Suggested Portfolio */}
          {showContent && (
            <Animated.View entering={FadeInUp.delay(1200).springify()}>
              <LinearGradient
                colors={['#6366f1', '#8b5cf6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.portfolioCard}
              >
                <View style={styles.portfolioHeader}>
                  <Trophy size={32} color="#fff" />
                  <Text style={styles.portfolioTitle}>Suggested Portfolio</Text>
                </View>
                <Text style={styles.portfolioSize}>{suggestedPortfolio.size}</Text>
                <Text style={styles.portfolioDesc}>
                  Based on your profile, this portfolio size is recommended to start your investment journey.
                </Text>
              </LinearGradient>
            </Animated.View>
          )}

          {/* Action Buttons */}
          {showContent && (
            <Animated.View entering={FadeInUp.delay(1400).springify()} style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Share2 size={20} color="#6366f1" />
                <Text style={styles.shareButtonText}>Share Results</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Start Trading</Text>
                <ChevronRight size={20} color="#fff" />
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Breakdown Section */}
          {showContent && (
            <Animated.View entering={FadeInUp.delay(1600).springify()} style={styles.breakdownSection}>
              <Text style={styles.breakdownTitle}>Score Breakdown</Text>

              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Investment Personality</Text>
                <Text style={[styles.breakdownValue, { color: personality.color }]}>
                  {personality.score}/40 • {personality.label}
                </Text>
              </View>

              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Financial Literacy (QLS)</Text>
                <Text style={[styles.breakdownValue, { color: literacy.color }]}>
                  {literacy.score}/30 • {literacy.label}
                </Text>
              </View>

              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Financial Strength</Text>
                <Text style={[styles.breakdownValue, { color: strength.color }]}>
                  {strength.score}/15 • {strength.label}
                </Text>
              </View>

              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Challenge Readiness</Text>
                <Text style={[styles.breakdownValue, { color: readiness.color }]}>
                  {readiness.score}/10 • {readiness.label}
                </Text>
              </View>
            </Animated.View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  congratsText: {
    fontSize: 16,
    color: '#a78bfa',
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  mainCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  mainEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  mainLabel: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  mainScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  mainScoreValue: {
    fontSize: 48,
    fontWeight: '800',
    color: '#fff',
  },
  mainScoreMax: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
  },
  sectionTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
  cardsGrid: {
    gap: 12,
    marginBottom: 20,
  },
  scoreCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardEmoji: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '700',
    minWidth: 45,
  },
  portfolioCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  portfolioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  portfolioTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  portfolioSize: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  portfolioDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 16,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6366f1',
  },
  continueButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#6366f1',
    borderRadius: 14,
    paddingVertical: 16,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  breakdownSection: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  breakdownLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    flex: 1,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
});
