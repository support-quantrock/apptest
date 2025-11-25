// Lesson1Screens.tsx
// React Native components for your 10 onboarding / lesson screens

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Image } from "expo-image";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Coins,
  Target,
  BookOpen,
  BarChart3,
  LineChart,
  PieChart,
  Lightbulb,
  Trophy,
  Zap,
  Brain,
  Gamepad2,
  CircleDollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  CheckCircle,
} from "lucide-react-native";

// Animated floating component
const FloatingElement = ({ children, delay = 0, duration = 2000 }: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) => {
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
  }, []);

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

// Pulsing element
const PulsingElement = ({ children }: { children: React.ReactNode }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
      {children}
    </Animated.View>
  );
};

// Shared layout wrapper for all lesson screens
const LessonScreen = ({ children, variant = "light" }: {
  children: React.ReactNode;
  variant?: "light" | "dark";
}) => {
  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
        variant === "dark" && styles.scrollContentDark,
      ]}
    >
      <View style={styles.container}>
        <View style={styles.card}>{children}</View>
      </View>
    </ScrollView>
  );
};

/* ─────────────────────────────
 * Screen 1 - Ben Introduction
 * ────────────────────────────*/
export const Lesson1Screen1 = () => {
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
      ])
    ).start();
  }, []);

  const rotate = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '20deg'],
  });

  return (
    <LessonScreen>
      {/* Animated Avatar with wave */}
      <View style={styles.illustrationContainer}>
        <View style={styles.avatarCircle}>
          <Image
            source={{ uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" }}
            style={styles.avatarImage}
            contentFit="cover"
          />
        </View>
        <Animated.View style={[styles.waveHand, { transform: [{ rotate }] }]}>
          <Text style={styles.waveEmoji}>👋</Text>
        </Animated.View>

        {/* Floating icons around avatar */}
        <View style={styles.floatingIconsContainer}>
          <FloatingElement delay={0}>
            <View style={[styles.floatingIcon, { top: 0, left: 20 }]}>
              <TrendingUp size={20} color="#22c55e" />
            </View>
          </FloatingElement>
          <FloatingElement delay={500}>
            <View style={[styles.floatingIcon, { top: 30, right: 10 }]}>
              <DollarSign size={20} color="#ffd166" />
            </View>
          </FloatingElement>
          <FloatingElement delay={1000}>
            <View style={[styles.floatingIcon, { bottom: 20, left: 0 }]}>
              <BarChart3 size={20} color="#5b5fff" />
            </View>
          </FloatingElement>
        </View>
      </View>

      <Text style={styles.eyebrow}>Hey, future trader!</Text>
      <Text style={styles.body}>
        I'm Ben. Over the next 28 days, I'll guide you through the trading
        challenge. You'll learn how to think like a trader – one decision at a
        time.
      </Text>
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 2 - What is Trading
 * ────────────────────────────*/
export const Lesson1Screen2 = () => {
  const priceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(priceAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(priceAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = priceAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -30, 0],
  });

  return (
    <LessonScreen>
      {/* Trading illustration */}
      <View style={styles.tradingIllustration}>
        <View style={styles.chartBackground}>
          {/* Animated price line */}
          <Animated.View style={[styles.priceLine, { transform: [{ translateY }] }]}>
            <View style={styles.pricePoint}>
              <CircleDollarSign size={32} color="#ffd166" />
            </View>
          </Animated.View>

          {/* Buy/Sell indicators */}
          <View style={styles.tradeIndicators}>
            <View style={styles.buyIndicator}>
              <ArrowUpRight size={24} color="#22c55e" />
              <Text style={styles.buyText}>BUY</Text>
            </View>
            <View style={styles.sellIndicator}>
              <ArrowDownRight size={24} color="#ef4444" />
              <Text style={styles.sellText}>SELL</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.heading}>But first, the big question – what is trading?</Text>
      <Text style={styles.body}>
        Trading is the buying and selling of assets like stocks, currencies, or
        crypto.
      </Text>
      <Text style={styles.body}>
        But really, it's about one thing:{" "}
        <Text style={styles.highlight}>using price movement to make a profit.</Text>
      </Text>
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 3 - Coin Flip Game
 * ────────────────────────────*/
export const Lesson1Screen3 = ({ onFlip }: { onFlip?: () => void }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setResult(null);

    Animated.sequence([
      Animated.timing(flipAnim, {
        toValue: 6,
        duration: 1500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setResult('tails');
      setIsFlipping(false);

      // Bounce effect
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onFlip) {
          setTimeout(onFlip, 800);
        }
      });
    });
  };

  const rotateY = flipAnim.interpolate({
    inputRange: [0, 6],
    outputRange: ['0deg', '2160deg'],
  });

  return (
    <LessonScreen>
      <View style={styles.gameHeader}>
        <Gamepad2 size={24} color="#5b5fff" />
        <Text style={styles.gameHeaderText}>GAME TIME</Text>
      </View>

      <Text style={styles.subheading}>Your first task</Text>
      <Text style={styles.body}>
        Flip a coin: if it lands on Tails, you win; Heads, you lose.
      </Text>

      {/* Animated Coin */}
      <View style={styles.coinContainer}>
        <Animated.View
          style={[
            styles.coin,
            {
              transform: [
                { rotateY },
                { scale: bounceAnim }
              ]
            }
          ]}
        >
          <View style={styles.coinInner}>
            {result === 'tails' ? (
              <Text style={styles.coinText}>T</Text>
            ) : (
              <Text style={styles.coinText}>$</Text>
            )}
          </View>
        </Animated.View>

        {result && (
          <View style={styles.resultBadge}>
            <Text style={styles.resultText}>TAILS - YOU WIN!</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.flipButton, isFlipping && styles.flipButtonDisabled]}
        onPress={handleFlip}
        disabled={isFlipping || result !== null}
      >
        <Text style={styles.flipButtonText}>
          {isFlipping ? 'FLIPPING...' : result ? 'CONTINUE →' : 'FLIP COIN'}
        </Text>
      </TouchableOpacity>
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 4 - Probability Question
 * ────────────────────────────*/
export const Lesson1Screen4 = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<'yes' | 'no' | null>(null);

  return (
    <LessonScreen>
      {/* Probability visualization */}
      <View style={styles.probabilityContainer}>
        <View style={styles.probabilityCircle}>
          <View style={styles.probabilityFilled} />
          <View style={styles.probabilityEmpty} />
          <Text style={styles.probabilityText}>40%</Text>
        </View>
        <View style={styles.oddsLabels}>
          <Text style={styles.oddsWin}>Win</Text>
          <Text style={styles.oddsLose}>Lose (60%)</Text>
        </View>
      </View>

      <Text style={styles.heading}>Nice, you won this time!</Text>
      <Text style={styles.body}>
        Now imagine the coin lands on Heads 60% of the time.
      </Text>
      <Text style={styles.body}>
        That gives you just a 40% chance to win.
      </Text>
      <Text style={styles.question}>Would you still play?</Text>

      {/* Interactive Yes/No buttons */}
      <View style={styles.answerButtons}>
        <TouchableOpacity
          style={[
            styles.answerButton,
            selectedAnswer === 'yes' && styles.answerButtonSelected
          ]}
          onPress={() => setSelectedAnswer('yes')}
        >
          <Text style={[
            styles.answerButtonText,
            selectedAnswer === 'yes' && styles.answerButtonTextSelected
          ]}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.answerButton,
            styles.answerButtonNo,
            selectedAnswer === 'no' && styles.answerButtonSelectedNo
          ]}
          onPress={() => setSelectedAnswer('no')}
        >
          <Text style={[
            styles.answerButtonText,
            selectedAnswer === 'no' && styles.answerButtonTextSelected
          ]}>No</Text>
        </TouchableOpacity>
      </View>
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 5 - Mindset Shift
 * ────────────────────────────*/
export const Lesson1Screen5 = () => {
  return (
    <LessonScreen>
      {/* Brain illustration */}
      <View style={styles.mindsetIllustration}>
        <PulsingElement>
          <View style={styles.brainCircle}>
            <Brain size={48} color="#5b5fff" />
          </View>
        </PulsingElement>

        {/* Floating tools */}
        <FloatingElement delay={0}>
          <View style={[styles.toolIcon, { position: 'absolute', top: 10, left: 30 }]}>
            <LineChart size={24} color="#22c55e" />
          </View>
        </FloatingElement>
        <FloatingElement delay={300}>
          <View style={[styles.toolIcon, { position: 'absolute', top: 20, right: 30 }]}>
            <BarChart3 size={24} color="#ffd166" />
          </View>
        </FloatingElement>
        <FloatingElement delay={600}>
          <View style={[styles.toolIcon, { position: 'absolute', bottom: 10, left: 50 }]}>
            <Target size={24} color="#ef4444" />
          </View>
        </FloatingElement>
      </View>

      <Text style={styles.heading}>That's the mindset shift.</Text>
      <Text style={styles.body}>
        If you rely on luck, you'll lose.
      </Text>
      <Text style={styles.body}>
        Traders don't gamble – they look for favorable odds and manage risk.
      </Text>
      <Text style={styles.body}>
        You'll use charts, patterns, and tools to stack the probabilities in your
        favor.
      </Text>
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 6 - 28 Day Roadmap
 * ────────────────────────────*/
export const Lesson1Screen6 = () => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <LessonScreen>
      {/* Calendar/Timeline visualization */}
      <View style={styles.timelineContainer}>
        <View style={styles.timelineLine}>
          <Animated.View style={[styles.timelineProgress, { width: progressWidth }]} />
        </View>

        <View style={styles.milestonesRow}>
          <View style={styles.milestone}>
            <View style={[styles.milestoneCircle, styles.milestoneActive]}>
              <BookOpen size={16} color="#fff" />
            </View>
            <Text style={styles.milestoneLabel}>Day 1</Text>
          </View>
          <View style={styles.milestone}>
            <View style={styles.milestoneCircle}>
              <LineChart size={16} color="#8c92b5" />
            </View>
            <Text style={styles.milestoneLabel}>Charts</Text>
          </View>
          <View style={styles.milestone}>
            <View style={styles.milestoneCircle}>
              <Target size={16} color="#8c92b5" />
            </View>
            <Text style={styles.milestoneLabel}>Setups</Text>
          </View>
          <View style={styles.milestone}>
            <View style={styles.milestoneCircle}>
              <Trophy size={16} color="#8c92b5" />
            </View>
            <Text style={styles.milestoneLabel}>Day 28</Text>
          </View>
        </View>
      </View>

      <Text style={styles.heading}>Over the next 28 days, you'll learn how to:</Text>

      <View style={styles.checklistItem}>
        <CheckCircle size={20} color="#22c55e" />
        <Text style={styles.checklistText}>Read charts</Text>
      </View>
      <View style={styles.checklistItem}>
        <CheckCircle size={20} color="#22c55e" />
        <Text style={styles.checklistText}>Spot setups</Text>
      </View>
      <View style={styles.checklistItem}>
        <CheckCircle size={20} color="#22c55e" />
        <Text style={styles.checklistText}>Build your strategy</Text>
      </View>
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 7 - Capital Question
 * ────────────────────────────*/
export const Lesson1Screen7 = () => {
  return (
    <LessonScreen>
      {/* Money illustration */}
      <View style={styles.moneyIllustration}>
        <FloatingElement>
          <View style={styles.moneyStack}>
            <DollarSign size={48} color="#22c55e" />
          </View>
        </FloatingElement>
        <View style={styles.questionMark}>
          <Text style={styles.questionMarkText}>?</Text>
        </View>
      </View>

      <View style={styles.gameHeader}>
        <Sparkles size={20} color="#5b5fff" />
        <Text style={styles.gameHeaderText}>SET THE VALUE</Text>
      </View>

      <Text style={styles.subheading}>Quick check</Text>
      <Text style={styles.body}>
        Most traders start by losing money before they learn.
      </Text>
      <Text style={styles.question}>
        How much do you think you need to start trading?
      </Text>
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 8 (Slider)
 * ────────────────────────────*/
export const Lesson1Screen8 = ({ onNext }: { onNext?: () => void }) => {
  const [value, setValue] = useState(100);

  return (
    <LessonScreen>
      {/* Money visualization based on slider */}
      <View style={styles.moneyVisualization}>
        {[...Array(Math.min(5, Math.ceil(value / 200)))].map((_, i) => (
          <FloatingElement key={i} delay={i * 200}>
            <View style={styles.moneyIcon}>
              <DollarSign size={28} color="#22c55e" />
            </View>
          </FloatingElement>
        ))}
      </View>

      <Text style={styles.subheading}>Set an amount</Text>
      <Text style={styles.sliderValue}>${value.toFixed(0)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1000}
        step={10}
        value={value}
        onValueChange={setValue}
        minimumTrackTintColor="#5b5fff"
        maximumTrackTintColor="#3a3f5c"
        thumbTintColor="#5b5fff"
      />
      <View style={styles.sliderLabels}>
        <Text style={styles.sliderLabel}>$0</Text>
        <Text style={styles.sliderLabel}>$500</Text>
        <Text style={styles.sliderLabel}>$1,000</Text>
      </View>

      {onNext && (
        <TouchableOpacity style={styles.continueButton} onPress={onNext}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      )}
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 9 - Simulator Explanation
 * ────────────────────────────*/
export const Lesson1Screen9 = () => {
  const coinsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(coinsAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(coinsAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const coinScale = coinsAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  });

  return (
    <LessonScreen>
      {/* Coins illustration */}
      <View style={styles.coinsIllustration}>
        <Animated.View style={[styles.coinsStack, { transform: [{ scale: coinScale }] }]}>
          <Coins size={64} color="#ffd166" />
        </Animated.View>
        <View style={styles.coinsAmount}>
          <Text style={styles.coinsAmountText}>1,000</Text>
          <Text style={styles.coinsLabel}>coins</Text>
        </View>
      </View>

      <Text style={styles.heading}>You don't need real money to learn how to trade.</Text>
      <Text style={styles.body}>
        You can earn <Text style={styles.highlight}>1,000 coins</Text> (they're
        not real) by completing each lesson – and more if you keep up your
        streak.
      </Text>
      <Text style={styles.body}>
        Use these coins in our simulator.
      </Text>
      <Text style={styles.body}>
        It runs on real market data, and updates live as prices change.
      </Text>
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 10 - Recap
 * ────────────────────────────*/
export const Lesson1Screen10 = ({ onFinish }: { onFinish?: () => void }) => {
  return (
    <LessonScreen>
      {/* Celebration illustration */}
      <View style={styles.celebrationContainer}>
        <PulsingElement>
          <View style={styles.trophyCircle}>
            <Trophy size={48} color="#ffd166" />
          </View>
        </PulsingElement>
        <FloatingElement delay={0}>
          <View style={[styles.confetti, { left: 20, top: 10 }]}>
            <Sparkles size={20} color="#5b5fff" />
          </View>
        </FloatingElement>
        <FloatingElement delay={300}>
          <View style={[styles.confetti, { right: 20, top: 20 }]}>
            <Zap size={20} color="#22c55e" />
          </View>
        </FloatingElement>
      </View>

      <Text style={styles.heading}>That's it for Lesson 1! Let's recap:</Text>

      <View style={styles.recapItem}>
        <View style={styles.recapBullet} />
        <Text style={styles.recapText}>Trading is NOT <Text style={styles.highlight}>gambling</Text>,</Text>
      </View>
      <View style={styles.recapItem}>
        <View style={styles.recapBullet} />
        <Text style={styles.recapText}>Trading is about stacking <Text style={styles.highlight}>probabilities</Text>,</Text>
      </View>
      <View style={styles.recapItem}>
        <View style={styles.recapBullet} />
        <Text style={styles.recapText}>You don't need to risk real money – use the <Text style={styles.highlight}>simulator</Text>.</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.body}>
        Next up: the 3 core trading decisions every trader makes daily. See you
        there!
      </Text>

      {onFinish && (
        <TouchableOpacity style={styles.finishButton} onPress={onFinish}>
          <Text style={styles.finishButtonText}>FINISH LESSON</Text>
        </TouchableOpacity>
      )}
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Styles
 * ────────────────────────────*/

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#0b1020",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  scrollContentDark: {
    backgroundColor: "#050816",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(10, 14, 30, 0.95)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },

  // Typography
  eyebrow: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9bafff",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f5f7ff",
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#dde3ff",
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: "#c3c7e6",
    marginBottom: 8,
  },
  highlight: {
    color: "#ffd166",
    fontWeight: "600",
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f5f7ff",
    marginTop: 12,
  },
  bullet: {
    fontSize: 15,
    lineHeight: 22,
    color: "#c3c7e6",
    marginBottom: 4,
  },

  // Screen 1 - Avatar
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
    height: 180,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#5b5fff",
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  waveHand: {
    position: "absolute",
    top: 10,
    right: 80,
  },
  waveEmoji: {
    fontSize: 32,
  },
  floatingIconsContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  floatingIcon: {
    position: "absolute",
    backgroundColor: "rgba(91, 95, 255, 0.2)",
    padding: 8,
    borderRadius: 12,
  },

  // Screen 2 - Trading
  tradingIllustration: {
    height: 160,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  chartBackground: {
    width: "100%",
    height: 140,
    backgroundColor: "rgba(91, 95, 255, 0.1)",
    borderRadius: 16,
    position: "relative",
    overflow: "hidden",
  },
  priceLine: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -16,
  },
  pricePoint: {
    backgroundColor: "rgba(255, 209, 102, 0.2)",
    padding: 8,
    borderRadius: 20,
  },
  tradeIndicators: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  buyIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    padding: 8,
    borderRadius: 8,
  },
  buyText: {
    color: "#22c55e",
    fontWeight: "600",
    marginLeft: 4,
    fontSize: 12,
  },
  sellIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    padding: 8,
    borderRadius: 8,
  },
  sellText: {
    color: "#ef4444",
    fontWeight: "600",
    marginLeft: 4,
    fontSize: 12,
  },

  // Screen 3 - Coin Flip
  gameHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  gameHeaderText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5b5fff",
    letterSpacing: 1,
  },
  coinContainer: {
    alignItems: "center",
    marginVertical: 32,
  },
  coin: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fbbf24",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#fbbf24",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  coinInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f59e0b",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fbbf24",
  },
  coinText: {
    fontSize: 48,
    fontWeight: "700",
    color: "#fbbf24",
  },
  resultBadge: {
    marginTop: 16,
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  resultText: {
    color: "#22c55e",
    fontWeight: "700",
    fontSize: 14,
  },
  flipButton: {
    backgroundColor: "#5b5fff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  flipButtonDisabled: {
    opacity: 0.6,
  },
  flipButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },

  // Screen 4 - Probability
  probabilityContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  probabilityCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  probabilityFilled: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "40%",
    backgroundColor: "#22c55e",
  },
  probabilityEmpty: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "60%",
    backgroundColor: "#ef4444",
  },
  probabilityText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    zIndex: 1,
  },
  oddsLabels: {
    flexDirection: "row",
    gap: 20,
    marginTop: 12,
  },
  oddsWin: {
    color: "#22c55e",
    fontWeight: "600",
  },
  oddsLose: {
    color: "#ef4444",
    fontWeight: "600",
  },
  answerButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  answerButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    borderWidth: 2,
    borderColor: "#22c55e",
  },
  answerButtonNo: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderColor: "#ef4444",
  },
  answerButtonSelected: {
    backgroundColor: "#22c55e",
  },
  answerButtonSelectedNo: {
    backgroundColor: "#ef4444",
  },
  answerButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f5f7ff",
  },
  answerButtonTextSelected: {
    color: "#fff",
  },

  // Screen 5 - Mindset
  mindsetIllustration: {
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    position: "relative",
  },
  brainCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(91, 95, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  toolIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 8,
    borderRadius: 12,
  },

  // Screen 6 - Timeline
  timelineContainer: {
    marginBottom: 24,
  },
  timelineLine: {
    height: 4,
    backgroundColor: "#3a3f5c",
    borderRadius: 2,
    marginBottom: 16,
    overflow: "hidden",
  },
  timelineProgress: {
    height: "100%",
    backgroundColor: "#5b5fff",
    borderRadius: 2,
  },
  milestonesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  milestone: {
    alignItems: "center",
  },
  milestoneCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#3a3f5c",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  milestoneActive: {
    backgroundColor: "#5b5fff",
  },
  milestoneLabel: {
    fontSize: 12,
    color: "#8c92b5",
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  checklistText: {
    fontSize: 16,
    color: "#f5f7ff",
  },

  // Screen 7 - Money Question
  moneyIllustration: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    position: "relative",
  },
  moneyStack: {
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    padding: 20,
    borderRadius: 30,
  },
  questionMark: {
    position: "absolute",
    right: 60,
    top: 10,
    backgroundColor: "rgba(91, 95, 255, 0.3)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  questionMarkText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#5b5fff",
  },

  // Screen 8 - Slider
  moneyVisualization: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
    height: 60,
    alignItems: "center",
  },
  moneyIcon: {
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    padding: 8,
    borderRadius: 12,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderValue: {
    fontSize: 48,
    fontWeight: "700",
    color: "#f5f7ff",
    textAlign: "center",
    marginVertical: 16,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#8c92b5",
  },
  sliderHint: {
    fontSize: 13,
    color: "#8c92b5",
    textAlign: "center",
  },

  // Screen 9 - Coins
  coinsIllustration: {
    alignItems: "center",
    marginBottom: 24,
  },
  coinsStack: {
    backgroundColor: "rgba(255, 209, 102, 0.2)",
    padding: 24,
    borderRadius: 40,
    marginBottom: 12,
  },
  coinsAmount: {
    alignItems: "center",
  },
  coinsAmountText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffd166",
  },
  coinsLabel: {
    fontSize: 14,
    color: "#8c92b5",
  },

  // Screen 10 - Celebration
  celebrationContainer: {
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
    height: 120,
  },
  trophyCircle: {
    backgroundColor: "rgba(255, 209, 102, 0.2)",
    padding: 24,
    borderRadius: 40,
  },
  confetti: {
    position: "absolute",
  },
  recapItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  recapBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#5b5fff",
    marginTop: 6,
  },
  recapText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#c3c7e6",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginVertical: 20,
  },

  // Buttons
  finishButton: {
    backgroundColor: "#5b5fff",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  finishButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  continueButton: {
    backgroundColor: "#5b5fff",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
});

export default {
  Lesson1Screen1,
  Lesson1Screen2,
  Lesson1Screen3,
  Lesson1Screen4,
  Lesson1Screen5,
  Lesson1Screen6,
  Lesson1Screen7,
  Lesson1Screen8,
  Lesson1Screen9,
  Lesson1Screen10,
};
