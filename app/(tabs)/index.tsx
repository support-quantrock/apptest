import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Timer, Check, GraduationCap, ChevronDown, Search, Star, Bell, User, Zap, Calendar, TrendingUp, Award, Target, DollarSign, Unlock, Trophy, Brain, FileText, BookOpen, Crown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { router } from 'expo-router';
import { useChallengeContext } from '@/context/ChallengeContext';

export default function HomeScreen() {
  const { st, setSt } = useChallengeContext();
  const [isFirstCardExpanded, setIsFirstCardExpanded] = useState(false);
  const [isSecondCardExpanded, setIsSecondCardExpanded] = useState(false);
  const [isThirdCardExpanded, setIsThirdCardExpanded] = useState(false);

  const firstCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(isFirstCardExpanded ? 2000 : 0, { duration: 300 }),
      opacity: withTiming(isFirstCardExpanded ? 1 : 0, { duration: 300 }),
      overflow: 'hidden',
    };
  });

  const secondCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(isSecondCardExpanded ? 2000 : 0, { duration: 300 }),
      opacity: withTiming(isSecondCardExpanded ? 1 : 0, { duration: 300 }),
      overflow: 'hidden',
    };
  });

  const thirdCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(isThirdCardExpanded ? 2000 : 0, { duration: 300 }),
      opacity: withTiming(isThirdCardExpanded ? 1 : 0, { duration: 300 }),
      overflow: 'hidden',
    };
  });

  const firstArrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(isFirstCardExpanded ? '180deg' : '0deg', { duration: 300 }) }],
    };
  });

  const secondArrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(isSecondCardExpanded ? '180deg' : '0deg', { duration: 300 }) }],
    };
  });

  const thirdArrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(isThirdCardExpanded ? '180deg' : '0deg', { duration: 300 }) }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.avatarButton}>
            <View style={styles.avatar}>
              <User size={24} color="#fff" strokeWidth={2} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Star size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>

      <View style={styles.profileCard}>
        <LinearGradient
          colors={['#065f46', '#064e3b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileGradient}>

          <View style={styles.glowBorder} />

          <View style={styles.badgeTopRow}>
            <View style={[styles.badge, { borderColor: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.2)' }]}>
              <Text style={[styles.badgeText, { color: '#ffffff' }]}>Beginners</Text>
            </View>
          </View>

          <View style={styles.topRow}>
            <View style={styles.avatarContainerColumn}>
              <View style={[styles.avatarContainer, { borderColor: '#22c55e' }]}>
                <View style={styles.avatarIconWrapper}>
                  <Timer size={32} color="#22c55e" strokeWidth={2} />
                </View>
              </View>
            </View>

            <View style={styles.profileTitleContainer}>
              <Text style={styles.profileTitle}>Learn Challenge</Text>
              <Text style={styles.profileSubtitleSmall}>Free Simulator Training  (Optional)</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.profileSubtitle}>
              Designed for beginners who want to build a solid foundation in trading and gradually develop essential investment skills. It's ideal for newcomers, university students, and even high-school learners who wish to practice trading safely through a free, risk-free virtual portfolio simulator.
            </Text>
          </View>

          <View style={styles.rewardsSectionBordered}>
            <Text style={styles.rewardsTitleBorderedGreen}>Rewards & Benefits:</Text>
            <View style={styles.rewardsGridTwo}>
              <View style={styles.rewardsColumnTwo}>
                <View style={styles.rewardItemRow}>
                  <Crown size={16} color="#22c55e" strokeWidth={2} />
                  <Text style={styles.rewardTextRow}>Premium upgrade</Text>
                </View>
                <View style={styles.rewardItemRow}>
                  <Trophy size={16} color="#22c55e" strokeWidth={2} />
                  <Text style={styles.rewardTextRow}>Name on Leaderboard</Text>
                </View>
              </View>
              <View style={styles.rewardsColumnTwo}>
                <View style={styles.rewardItemRow}>
                  <Calendar size={16} color="#22c55e" strokeWidth={2} />
                  <Text style={styles.rewardTextRow}>28 days of skill challenges</Text>
                </View>
                <View style={styles.rewardItemRow}>
                  <Brain size={16} color="#22c55e" strokeWidth={2} />
                  <Text style={styles.rewardTextRow}>Investor Personality Assessment</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.expandButtonCenter}
            onPress={() => setIsFirstCardExpanded(!isFirstCardExpanded)}>
            <Animated.View style={firstArrowAnimatedStyle}>
              <ChevronDown size={24} color="#fff" strokeWidth={2} />
            </Animated.View>
          </TouchableOpacity>

          <Animated.View style={firstCardAnimatedStyle}>
            <View style={styles.expandedCardDetails}>
              <Text style={styles.detailsTitle}>Monthly Prizes</Text>
              <Text style={styles.detailSubtitle}>The winner is announced on the first day of every month and receives:</Text>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.detailText}>Their name listed on the monthly Leaderboard</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.detailText}>One month of free Premium subscription</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.detailText}>Direct nomination to the next stage: the Investment Challenge</Text>
              </View>

              <Text style={[styles.detailsTitle, { marginTop: 16 }]}>Challenge Rules</Text>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.detailText}>Start anytime</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.detailText}>28-day duration (can continue indefinitely)</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.detailText}>Complete 28 days of daily skill lessons</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.detailText}>70%+ success rate in daily exercises</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.detailText}>Daily loss limit: 5%</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.detailText}>Total loss limit: 10%</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.detailText}>Target profit threshold: 6%</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.detailText}>Maximum asset weight: 10%</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.detailText}>Minimum trades: 30</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.detailText}>Allowed assets: S&P 500 stocks / Gold / EUR/USD / Bitcoin</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.detailText}>Account leverage: 1:1</Text>
              </View>
            </View>
          </Animated.View>

          <TouchableOpacity style={[styles.joinButtonBottom, { borderColor: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.2)' }]} onPress={() => { setSt(1); router.push('/challenge-signup?mode=free'); }}>
            <Text style={styles.joinButtonBottomText}>Start Learning Challenge</Text>
          </TouchableOpacity>

        </LinearGradient>
      </View>

      <View style={[styles.profileCard, { shadowColor: '#a78bfa' }]}>
        <LinearGradient
          colors={['#7c3aed', '#4c1d95']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileGradient}>

          <View style={[styles.glowBorder, { borderColor: 'rgba(167, 139, 250, 0.5)' }]} />

          <View style={styles.badgeTopRow}>
            <View style={[styles.badge, { borderColor: '#a78bfa', backgroundColor: 'rgba(167, 139, 250, 0.2)' }]}>
              <Text style={[styles.badgeText, { color: '#ffffff' }]}>Qualified</Text>
            </View>
          </View>

          <View style={styles.topRow}>
            <View style={styles.avatarContainerColumn}>
              <View style={[styles.avatarContainer, { borderColor: '#a78bfa' }]}>
                <View style={styles.avatarIconWrapper}>
                  <Zap size={32} color="#a78bfa" strokeWidth={2} />
                </View>
              </View>
            </View>

            <View style={styles.profileTitleContainer}>
              <Text style={styles.profileTitle}>Invest Challenge</Text>
              <Text style={styles.profileSubtitleSmall}>Exclusively for Premium Pro Members</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.profileSubtitle}>
              Designed for qualifieds users, professionals, and Premium members, it offers real financial prizes within an advanced simulation environment that mimics the strategies of investors and hedge funds, without any actual risk. Participants manage a virtual portfolio of up to $100,000 to trade in a 100% realistic market for 28 days
            </Text>
          </View>

          <View style={styles.rewardsSectionBordered}>
            <Text style={styles.rewardsTitleBordered}>Rewards & Benefits:</Text>
            <View style={styles.rewardsGridTwo}>
              <View style={styles.rewardsColumnTwo}>
                <View style={styles.rewardItemRow}>
                  <DollarSign size={16} color="#a78bfa" strokeWidth={2} />
                  <Text style={styles.rewardTextRow}>Cash prize up to $1,000</Text>
                </View>
                <View style={styles.rewardItemRow}>
                  <Unlock size={16} color="#a78bfa" strokeWidth={2} />
                  <Text style={styles.rewardTextRow}>Full access to all features</Text>
                </View>
                <View style={styles.rewardItemRow}>
                  <Trophy size={16} color="#a78bfa" strokeWidth={2} />
                  <Text style={styles.rewardTextRow}>Name on Leaderboard</Text>
                </View>
                <View style={styles.rewardItemRow}>
                  <Brain size={16} color="#a78bfa" strokeWidth={2} />
                  <Text style={styles.rewardTextRow}>Investor Personality Assessment</Text>
                </View>
              </View>
              <View style={styles.rewardsColumnTwo}>
                <View style={styles.rewardItemRow}>
                  <FileText size={16} color="#a78bfa" strokeWidth={2} />
                  <Text style={styles.rewardTextRow}>Quantrock Certificate</Text>
                </View>
                <View style={styles.rewardItemRow}>
                  <Star size={16} color="#a78bfa" strokeWidth={2} />
                  <Text style={styles.rewardTextRow}>Premium upgrade</Text>
                </View>
                <View style={styles.rewardItemRow}>
                  <BookOpen size={16} color="#a78bfa" strokeWidth={2} />
                  <Text style={styles.rewardTextRow}>500+ lessons</Text>
                </View>
                <View style={styles.rewardItemRow}>
                  <Target size={16} color="#a78bfa" strokeWidth={2} />
                  <Text style={styles.rewardTextRow}>28 days of skill challenges</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.expandButtonCenter}
            onPress={() => setIsThirdCardExpanded(!isThirdCardExpanded)}>
            <Animated.View style={thirdArrowAnimatedStyle}>
              <ChevronDown size={24} color="#fff" strokeWidth={2} />
            </Animated.View>
          </TouchableOpacity>

          <Animated.View style={thirdCardAnimatedStyle}>
            <View style={styles.expandedCardDetails}>
              <Text style={styles.detailsTitle}>Premium Pro Membership Benefits</Text>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Direct access to the Investment Challenge</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Real-time analysis of global banks' recommendations</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Tracking of hedge funds' and top politicians' trades</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Smart Money Flow – Insight into institutional money movements</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Comprehensive performance analytics highlighting your strengths and weaknesses</Text>
              </View>

              <Text style={[styles.detailsTitle, { marginTop: 16 }]}>Challenge Rules</Text>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Start anytime</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>28-day duration (can continue indefinitely)</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Complete 28 days of daily skill lessons</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>70%+ success rate in daily exercises</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Daily loss limit: 5%</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Total loss limit: 10%</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Target profit threshold: 6%+</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Maximum asset weight: 10%</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Minimum trades: 30</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Allowed assets: S&P 500 stocks / Gold / EUR/USD / Bitcoin</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Account leverage: 1:1</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={[styles.bulletPoint, { backgroundColor: '#a78bfa' }]} />
                <Text style={styles.detailText}>Winner can rejoin after 90 days</Text>
              </View>
            </View>
          </Animated.View>

          <TouchableOpacity style={[styles.joinButtonBottom, { borderColor: '#a78bfa', backgroundColor: 'rgba(167, 139, 250, 0.2)' }]} onPress={() => { setSt(2); router.push('/challenge-signup'); }}>
            <Text style={styles.joinButtonBottomText}>Start Investment Challenge</Text>
          </TouchableOpacity>

        </LinearGradient>
      </View>

      {/* Third card (Quantrock Skill Challenge) is now accessible via info icon in qchat page */}

      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About the Challenge</Text>
        <Text style={styles.aboutSubtitle}>
          The largest investment challenge that combines training, competition, and real rewards.
        </Text>
        <Text style={styles.aboutDescription}>
          Quantrock's Investment Simulation Challenge is designed to bridge the gap between academic knowledge and real-world trading practice. It takes you on a 28-day investment journey filled with practical learning, where participants receive daily interactive lessons and exercises aimed at enhancing their trading and investment skills step by step.
          {'\n\n'}
          The challenge offers professionals, beginners, university students, and high-school students a realistic and risk-free experience. You will take on the role of a portfolio manager and executive trader inside a professional simulation environment that reflects the workflow of expert investors and replicates the markets with 100% accuracy.
          {'\n\n'}
          This experience blends hands-on training, real competitive challenges, and tangible rewards—providing a realistic simulation that helps you develop your investment skills, strengthen your practical abilities, and progressively advance toward higher levels of professionalism.
        </Text>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 6,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerLeft: {
    flex: 1,
  },
  avatarButton: {
    width: 40,
    height: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e3a8a',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  iconButton: {
    width: 24,
    height: 24,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 20,
  },
  card: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
  iconContainerGreen: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  iconContainerBlue: {
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  iconContainerPurple: {
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderColor: 'rgba(167, 139, 250, 0.3)',
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
  cardSubtitlePurple: {
    color: '#fff',
  },
  cardSubtitleGreen: {
    color: '#fff',
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
  buttonGreen: {
    borderColor: '#22c55e',
  },
  buttonBlue: {
    borderColor: '#60a5fa',
  },
  buttonPurple: {
    borderColor: '#a78bfa',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  aboutSection: {
    marginTop: 8,
    marginBottom: 32,
    padding: 24,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  aboutSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 16,
    lineHeight: 20,
  },
  aboutDescription: {
    fontSize: 11,
    color: '#cbd5e1',
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  highlightBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  highlightBoxGreen: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
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
  benefitsBox: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  benefitsBoxPurple: {
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  benefitsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
    flex: 1,
    lineHeight: 16,
  },
  joinText: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 17,
  },
  joinTextPurple: {
    color: '#fff',
  },
  roundsContainer: {
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  roundsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  roundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  roundText: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  profileCard: {
    marginBottom: 24,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  profileGradient: {
    padding: 16,
    borderRadius: 24,
    position: 'relative',
  },
  glowBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.5)',
  },
  badgeTopRow: {
    marginBottom: 12,
    alignItems: 'center',
  },
  badge: {
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  avatarContainerColumn: {
    alignItems: 'center',
    gap: 8,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  avatarIconWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTitleContainer: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  descriptionSection: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  profileSubtitleSmall: {
    fontSize: 10,
    color: '#a78bfa',
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  visitButton: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderWidth: 2,
    borderColor: '#22c55e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visitButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  joinButtonBottom: {
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  joinButtonBottomText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoGrid: {
    flex: 1,
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  infoValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  expandButtonCenter: {
    paddingVertical: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  expandedCardDetails: {
    marginTop: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  detailSubtitle: {
    fontSize: 12,
    color: '#cbd5e1',
    marginBottom: 12,
    lineHeight: 18,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 10,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
    marginTop: 6,
  },
  detailText: {
    flex: 1,
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  rewardsSection: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  rewardsSectionBordered: {
    marginTop: 8,
    marginHorizontal: 16,
    padding: 12,
  },
  rewardsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  rewardsTitleBordered: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.4)',
    borderRadius: 8,
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  rewardsTitleBorderedGreen: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.4)',
    borderRadius: 8,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  rewardsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  rewardsColumn: {
    flex: 1,
    gap: 10,
  },
  rewardItem: {
    alignItems: 'center',
    gap: 4,
  },
  rewardIcon: {
    fontSize: 20,
  },
  rewardText: {
    fontSize: 9,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 12,
  },
  rewardsGridTwo: {
    flexDirection: 'row',
    gap: 16,
  },
  rewardsColumnTwo: {
    flex: 1,
    gap: 8,
  },
  rewardItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rewardTextRow: {
    fontSize: 10,
    color: '#cbd5e1',
    flex: 1,
    lineHeight: 14,
  },
});
