/**
 * Lesson 2 Screens - Day 1, Lesson 2: Buy, Sell, or Hold
 * 10 interactive screens teaching trading fundamentals
 */

import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useState, useEffect, useRef } from 'react';
import { Gamepad2, Sparkles, TrendingUp, TrendingDown, Pause } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Image placeholders - replace with actual lesson images when available
// Add images to /assets folder: lesson2-screen1.jpeg, lesson2-screen2.jpeg, etc.
const LESSON_IMAGES = {
  screen1: { uri: '/assets/lesson2-screen1.jpeg' },
  screen2: { uri: '/assets/lesson2-screen2.jpeg' },
  screen3: { uri: '/assets/lesson2-screen3.jpeg' },
  screen4: { uri: '/assets/lesson2-screen4.jpeg' },
  screen5: { uri: '/assets/lesson2-screen5.jpeg' },
  screen6: { uri: '/assets/lesson2-screen6.jpeg' },
  screen7: { uri: '/assets/lesson2-screen7.jpeg' },
  screen8: { uri: '/assets/lesson2-screen8.jpeg' },
  screen9: { uri: '/assets/lesson2-screen9.jpeg' },
  screen10: { uri: '/assets/lesson2-screen10.jpeg' },
};

/* ─────────────────────────────
 * Reusable Layout Component
 * ────────────────────────────*/
const LessonScreen = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.screenContainer}>
    <View style={styles.contentCard}>
      {children}
    </View>
  </View>
);

/* ─────────────────────────────
 * Animation Components
 * ────────────────────────────*/
const FloatingElement = ({ children, delay = 0, duration = 3000 }: { children: React.ReactNode; delay?: number; duration?: number }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    const timeout = setTimeout(animate, delay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
};

const PulsingElement = ({ children, scale = 1.1 }: { children: React.ReactNode; scale?: number }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: scale,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      {children}
    </Animated.View>
  );
};

/* ─────────────────────────────
 * Screen 1 - Buy, Sell, Hold Introduction
 * ────────────────────────────*/
export const Lesson2Screen1 = () => {
  return (
    <LessonScreen>
      <Text style={styles.description}>
        It may sound obvious:{'\n'}
        – <Text style={styles.buyText}>Buy</Text> when you believe the price will rise,{'\n'}
        – <Text style={styles.sellText}>Sell</Text> to lock profit or limit loss,{'\n'}
        – <Text style={styles.holdText}>Hold</Text> if you're uncertain – or expect recovery.
      </Text>

      <Text style={styles.emphasisText}>
        But in trading, timing defines the outcome.
      </Text>

      {/* Animated trading icons */}
      <View style={styles.tradingIconsRow}>
        <FloatingElement delay={0}>
          <View style={[styles.actionIcon, styles.buyIcon]}>
            <TrendingUp size={32} color="#fff" strokeWidth={2} />
          </View>
        </FloatingElement>
        <FloatingElement delay={500}>
          <View style={[styles.actionIcon, styles.sellIcon]}>
            <TrendingDown size={32} color="#fff" strokeWidth={2} />
          </View>
        </FloatingElement>
        <FloatingElement delay={1000}>
          <View style={[styles.actionIcon, styles.holdIcon]}>
            <Pause size={32} color="#fff" strokeWidth={2} />
          </View>
        </FloatingElement>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={LESSON_IMAGES.screen1}
          style={styles.heroImage}
          contentFit="contain"
        />
      </View>
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 2 - Analysis Introduction
 * ────────────────────────────*/
export const Lesson2Screen2 = () => {
  return (
    <LessonScreen>
      <Text style={styles.description}>
        So, when do you act? Prices move constantly.
      </Text>

      <Text style={styles.description}>
        To make a decision, traders use <Text style={styles.highlightText}>analysis</Text>, which can be either technical or fundamental.
      </Text>

      <Text style={styles.emphasisText}>
        But today, you'll skip the theory and jump right into practice – with me.
      </Text>

      <View style={styles.imageContainer}>
        <FloatingElement duration={4000}>
          <Image
            source={LESSON_IMAGES.screen2}
            style={styles.heroImage}
            contentFit="contain"
          />
        </FloatingElement>
      </View>
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 3 - First Trade Setup (BUY)
 * ────────────────────────────*/
export const Lesson2Screen3 = ({ onBuy }: { onBuy?: () => void }) => {
  const [showButton, setShowButton] = useState(true);

  const handleBuy = () => {
    setShowButton(false);
    if (onBuy) {
      setTimeout(onBuy, 800);
    }
  };

  return (
    <LessonScreen>
      <View style={styles.gameHeader}>
        <Gamepad2 size={20} color="#5b5fff" strokeWidth={2} />
        <Text style={styles.gameHeaderText}>GAME TIME</Text>
      </View>

      <Text style={styles.gameTitle}>Your first trade</Text>

      <Text style={styles.description}>
        Coca-Cola is trading at <Text style={styles.priceText}>$60</Text>. Analysts predict a move to <Text style={styles.targetText}>$72</Text>.
      </Text>

      <Text style={styles.questionText}>Do you take the setup?</Text>

      <View style={styles.imageContainer}>
        <Image
          source={LESSON_IMAGES.screen3}
          style={styles.chartImage}
          contentFit="contain"
        />
      </View>

      {showButton && (
        <PulsingElement scale={1.05}>
          <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
            <Text style={styles.buyButtonText}>BUY</Text>
          </TouchableOpacity>
        </PulsingElement>
      )}

      {!showButton && (
        <View style={styles.confirmationBadge}>
          <Text style={styles.confirmationText}>✓ Position opened at $60</Text>
        </View>
      )}
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 4 - Chart Animation (Price Dip)
 * ────────────────────────────*/
export const Lesson2Screen4 = () => {
  const priceAnim = useRef(new Animated.Value(0)).current;
  const [currentPrice, setCurrentPrice] = useState(60);

  useEffect(() => {
    // Animate price dip then recovery
    Animated.sequence([
      Animated.timing(priceAnim, {
        toValue: -8,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.timing(priceAnim, {
        toValue: 2,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start();

    // Update displayed price
    priceAnim.addListener(({ value }) => {
      setCurrentPrice(Math.round(60 + value));
    });

    return () => priceAnim.removeAllListeners();
  }, []);

  return (
    <LessonScreen>
      <View style={styles.priceDisplay}>
        <Text style={styles.priceLabel}>Current Price</Text>
        <Animated.Text style={[
          styles.currentPriceText,
          { color: currentPrice >= 60 ? '#22c55e' : '#ef4444' }
        ]}>
          ${currentPrice}
        </Animated.Text>
        <Text style={[
          styles.pnlText,
          { color: currentPrice >= 60 ? '#22c55e' : '#ef4444' }
        ]}>
          {currentPrice >= 60 ? '+' : ''}{currentPrice - 60} per share
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={LESSON_IMAGES.screen4}
          style={styles.fullChartImage}
          contentFit="contain"
        />
      </View>
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 5 - Hold Decision
 * ────────────────────────────*/
export const Lesson2Screen5 = ({ onHold }: { onHold?: () => void }) => {
  const [showButton, setShowButton] = useState(true);

  const handleHold = () => {
    setShowButton(false);
    if (onHold) {
      setTimeout(onHold, 800);
    }
  };

  return (
    <LessonScreen>
      <View style={styles.gameHeader}>
        <Gamepad2 size={20} color="#5b5fff" strokeWidth={2} />
        <Text style={styles.gameHeaderText}>GAME TIME</Text>
      </View>

      <Text style={styles.gameTitle}>What now?</Text>

      <Text style={styles.description}>
        The stock dipped, then bounced.{'\n'}
        You're up <Text style={styles.profitText}>$2 per share</Text>. Many traders exit here.
      </Text>

      <Text style={styles.questionText}>But will you stick to the plan?</Text>

      <View style={styles.imageContainer}>
        <Image
          source={LESSON_IMAGES.screen5}
          style={styles.chartImage}
          contentFit="contain"
        />
      </View>

      {showButton && (
        <PulsingElement scale={1.05}>
          <TouchableOpacity style={styles.holdButton} onPress={handleHold}>
            <Text style={styles.holdButtonText}>HOLD</Text>
          </TouchableOpacity>
        </PulsingElement>
      )}

      {!showButton && (
        <View style={styles.confirmationBadge}>
          <Text style={styles.confirmationText}>✓ Holding position...</Text>
        </View>
      )}
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 6 - Price Rising to Target
 * ────────────────────────────*/
export const Lesson2Screen6 = () => {
  const priceAnim = useRef(new Animated.Value(62)).current;
  const [currentPrice, setCurrentPrice] = useState(62);

  useEffect(() => {
    Animated.timing(priceAnim, {
      toValue: 68,
      duration: 2500,
      useNativeDriver: false,
    }).start();

    priceAnim.addListener(({ value }) => {
      setCurrentPrice(Math.round(value));
    });

    return () => priceAnim.removeAllListeners();
  }, []);

  return (
    <LessonScreen>
      <View style={styles.priceDisplay}>
        <Text style={styles.priceLabel}>Price Rising...</Text>
        <Text style={[styles.currentPriceText, { color: '#22c55e' }]}>
          ${currentPrice}
        </Text>
        <Text style={[styles.pnlText, { color: '#22c55e' }]}>
          +{currentPrice - 60} per share
        </Text>
        <Text style={styles.targetLabel}>Target: $72</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={LESSON_IMAGES.screen6}
          style={styles.fullChartImage}
          contentFit="contain"
        />
      </View>
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 7 - Target Reached (SELL)
 * ────────────────────────────*/
export const Lesson2Screen7 = ({ onSell }: { onSell?: () => void }) => {
  const [showButton, setShowButton] = useState(true);
  const celebrateAnim = useRef(new Animated.Value(0)).current;

  const handleSell = () => {
    setShowButton(false);
    Animated.spring(celebrateAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    if (onSell) {
      setTimeout(onSell, 1200);
    }
  };

  return (
    <LessonScreen>
      <View style={styles.priceDisplay}>
        <Text style={styles.targetReachedLabel}>🎯 TARGET REACHED!</Text>
        <Text style={[styles.currentPriceText, { color: '#22c55e' }]}>
          $72
        </Text>
        <Text style={[styles.pnlText, { color: '#22c55e', fontSize: 20 }]}>
          +$12 per share
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={LESSON_IMAGES.screen7}
          style={styles.fullChartImage}
          contentFit="contain"
        />
      </View>

      {showButton && (
        <PulsingElement scale={1.05}>
          <TouchableOpacity style={styles.sellButton} onPress={handleSell}>
            <Text style={styles.sellButtonText}>SELL</Text>
          </TouchableOpacity>
        </PulsingElement>
      )}

      {!showButton && (
        <Animated.View style={[
          styles.profitBadge,
          {
            transform: [{ scale: celebrateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1],
            }) }],
            opacity: celebrateAnim,
          }
        ]}>
          <Text style={styles.profitBadgeText}>💰 PROFIT SECURED!</Text>
        </Animated.View>
      )}
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 8 - Trade Summary
 * ────────────────────────────*/
export const Lesson2Screen8 = () => {
  return (
    <LessonScreen>
      <Text style={styles.congratsText}>Great job!</Text>

      <Text style={styles.description}>
        You made a <Text style={styles.profitText}>$12 profit</Text> in under 3 minutes.{'\n'}
        If only trading were always that simple.
      </Text>

      <Text style={styles.emphasisText}>
        But what matters is what you just practiced:
      </Text>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryDot, { backgroundColor: '#22c55e' }]} />
          <Text style={styles.summaryText}>
            <Text style={styles.buyText}>Buy</Text> = you expect upside
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryDot, { backgroundColor: '#ef4444' }]} />
          <Text style={styles.summaryText}>
            <Text style={styles.sellText}>Sell</Text> = you lock the result
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryDot, { backgroundColor: '#3b82f6' }]} />
          <Text style={styles.summaryText}>
            <Text style={styles.holdText}>Hold</Text> = you stay exposed
          </Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={LESSON_IMAGES.screen8}
          style={styles.heroImage}
          contentFit="contain"
        />
      </View>
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 9 - Matching Game
 * ────────────────────────────*/
export const Lesson2Screen9 = ({ onNext }: { onNext?: () => void }) => {
  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const actions = ['Buy', 'Sell', 'Hold'];
  const definitions = [
    { id: 'exit', text: 'Exit to secure profit or limit loss' },
    { id: 'stay', text: 'Stay in the trade, accepting current risk' },
    { id: 'enter', text: 'Enter the trade with upside expectation' },
  ];

  const correctMatches: { [key: string]: string } = {
    'Buy': 'enter',
    'Sell': 'exit',
    'Hold': 'stay',
  };

  const handleActionPress = (action: string) => {
    if (matches[action]) return;
    setSelectedAction(action);
  };

  const handleDefinitionPress = (defId: string) => {
    if (!selectedAction) return;
    if (Object.values(matches).includes(defId)) return;

    const newMatches = { ...matches, [selectedAction]: defId };
    setMatches(newMatches);
    setSelectedAction(null);

    // Check if all matched correctly
    if (Object.keys(newMatches).length === 3) {
      const allCorrect = Object.entries(newMatches).every(
        ([action, def]) => correctMatches[action] === def
      );
      if (allCorrect && onNext) {
        setTimeout(onNext, 1500);
      }
    }
  };

  const isMatched = (action: string) => !!matches[action];
  const isDefinitionMatched = (defId: string) => Object.values(matches).includes(defId);
  const isCorrectMatch = (action: string) => matches[action] === correctMatches[action];

  return (
    <LessonScreen>
      <View style={styles.gameHeader}>
        <Sparkles size={20} color="#5b5fff" strokeWidth={2} />
        <Text style={styles.gameHeaderText}>SELECT THE MATCH</Text>
      </View>

      <Text style={styles.gameTitle}>Practice time!</Text>

      <Text style={styles.description}>
        Match each trading action with what it actually does.
      </Text>

      {/* Actions */}
      <View style={styles.matchingContainer}>
        <View style={styles.actionsColumn}>
          {actions.map((action) => (
            <TouchableOpacity
              key={action}
              style={[
                styles.matchItem,
                styles[`${action.toLowerCase()}Match` as keyof typeof styles],
                selectedAction === action && styles.matchItemSelected,
                isMatched(action) && (isCorrectMatch(action) ? styles.matchItemCorrect : styles.matchItemIncorrect),
              ]}
              onPress={() => handleActionPress(action)}
              disabled={isMatched(action)}
            >
              <Text style={[
                styles.matchItemText,
                (selectedAction === action || isMatched(action)) && styles.matchItemTextSelected,
              ]}>
                {action}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Definitions */}
        <View style={styles.definitionsColumn}>
          {definitions.map((def) => (
            <TouchableOpacity
              key={def.id}
              style={[
                styles.definitionItem,
                isDefinitionMatched(def.id) && styles.definitionItemMatched,
              ]}
              onPress={() => handleDefinitionPress(def.id)}
              disabled={isDefinitionMatched(def.id) || !selectedAction}
            >
              <Text style={[
                styles.definitionText,
                isDefinitionMatched(def.id) && styles.definitionTextMatched,
              ]}>
                {def.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {Object.keys(matches).length === 3 && (
        <View style={styles.matchResultBadge}>
          <Text style={styles.matchResultText}>✓ All matched correctly!</Text>
        </View>
      )}
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 10 - Lesson Recap
 * ────────────────────────────*/
export const Lesson2Screen10 = ({ onFinish }: { onFinish?: () => void }) => {
  const celebrateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(celebrateAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LessonScreen>
      <Animated.View style={{
        transform: [{ scale: celebrateAnim }],
        opacity: celebrateAnim,
      }}>
        <Text style={styles.trophyEmoji}>🏆</Text>
      </Animated.View>

      <Text style={styles.congratsTitle}>Lesson Complete!</Text>

      <Text style={styles.description}>
        Today, you made your first trade decision.{'\n'}
        You saw a setup, handled the dip, and learned why profits aren't real until they're booked.
      </Text>

      <Text style={styles.nextUpText}>
        Next up: the difference between trading and investing.
      </Text>

      <View style={styles.imageContainer}>
        <Image
          source={LESSON_IMAGES.screen10}
          style={styles.heroImage}
          contentFit="contain"
        />
      </View>

      <TouchableOpacity style={styles.finishButton} onPress={onFinish}>
        <Text style={styles.finishButtonText}>FINISH LESSON</Text>
      </TouchableOpacity>
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Styles
 * ────────────────────────────*/
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#0b1020',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentCard: {
    flex: 1,
    backgroundColor: 'rgba(10, 14, 30, 0.95)',
    borderRadius: 24,
    padding: 24,
  },
  description: {
    fontSize: 18,
    lineHeight: 28,
    color: '#e0e6ff',
    marginBottom: 16,
  },
  emphasisText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#ffd166',
    fontWeight: '600',
    marginBottom: 24,
  },
  highlightText: {
    color: '#5b5fff',
    fontWeight: '700',
  },
  buyText: {
    color: '#22c55e',
    fontWeight: '700',
  },
  sellText: {
    color: '#ef4444',
    fontWeight: '700',
  },
  holdText: {
    color: '#3b82f6',
    fontWeight: '700',
  },
  tradingIconsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 24,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyIcon: {
    backgroundColor: '#22c55e',
  },
  sellIcon: {
    backgroundColor: '#ef4444',
  },
  holdIcon: {
    backgroundColor: '#3b82f6',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  heroImage: {
    width: SCREEN_WIDTH - 80,
    height: 200,
    borderRadius: 16,
  },
  chartImage: {
    width: SCREEN_WIDTH - 80,
    height: 180,
    borderRadius: 12,
  },
  fullChartImage: {
    width: SCREEN_WIDTH - 60,
    height: 240,
    borderRadius: 12,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  gameHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5b5fff',
    letterSpacing: 1,
  },
  gameTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f5f7ff',
    marginBottom: 16,
  },
  priceText: {
    color: '#ffd166',
    fontWeight: '700',
  },
  targetText: {
    color: '#22c55e',
    fontWeight: '700',
  },
  profitText: {
    color: '#22c55e',
    fontWeight: '700',
  },
  questionText: {
    fontSize: 18,
    color: '#9bafff',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  buyButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
  },
  holdButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  holdButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
  },
  sellButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  sellButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
  },
  confirmationBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  confirmationText: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: '600',
  },
  priceDisplay: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(91, 95, 255, 0.1)',
    borderRadius: 16,
  },
  priceLabel: {
    fontSize: 14,
    color: '#9bafff',
    marginBottom: 8,
  },
  currentPriceText: {
    fontSize: 48,
    fontWeight: '700',
  },
  pnlText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  targetLabel: {
    fontSize: 14,
    color: '#9bafff',
    marginTop: 8,
  },
  targetReachedLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffd166',
    marginBottom: 8,
  },
  profitBadge: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  profitBadgeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  congratsText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffd166',
    textAlign: 'center',
    marginBottom: 16,
  },
  summaryContainer: {
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  summaryText: {
    fontSize: 16,
    color: '#e0e6ff',
  },
  matchingContainer: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 16,
  },
  actionsColumn: {
    flex: 1,
    gap: 12,
  },
  definitionsColumn: {
    flex: 2,
    gap: 12,
  },
  matchItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  buyMatch: {
    borderColor: 'rgba(34, 197, 94, 0.5)',
  },
  sellMatch: {
    borderColor: 'rgba(239, 68, 68, 0.5)',
  },
  holdMatch: {
    borderColor: 'rgba(59, 130, 246, 0.5)',
  },
  matchItemSelected: {
    backgroundColor: 'rgba(91, 95, 255, 0.3)',
    borderColor: '#5b5fff',
  },
  matchItemCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderColor: '#22c55e',
  },
  matchItemIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderColor: '#ef4444',
  },
  matchItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e0e6ff',
  },
  matchItemTextSelected: {
    color: '#fff',
  },
  definitionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  definitionItemMatched: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderColor: '#22c55e',
  },
  definitionText: {
    fontSize: 14,
    color: '#9bafff',
    lineHeight: 20,
  },
  definitionTextMatched: {
    color: '#22c55e',
  },
  matchResultBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  matchResultText: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: '600',
  },
  trophyEmoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 16,
  },
  congratsTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffd166',
    textAlign: 'center',
    marginBottom: 24,
  },
  nextUpText: {
    fontSize: 16,
    color: '#9bafff',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 24,
  },
  finishButton: {
    backgroundColor: '#5b5fff',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
