// StoryScenes.tsx - Animated visual story scenes for Day 2 lessons
// Each lesson has a unique animated scene with characters, environments, and effects

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as LucideIcons from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ==================== ANIMATION HELPERS ====================

const useLoopAnimation = (duration: number = 2000, delay: number = 0) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration,
          delay,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [anim, duration, delay]);

  return anim;
};

const useEnterAnimation = (delay: number = 0) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 800,
      delay,
      easing: Easing.out(Easing.back(1.2)),
      useNativeDriver: true,
    }).start();
  }, [anim, delay]);

  return anim;
};

// ==================== PARTICLE EFFECTS ====================

const Particles = ({ count = 15, color = '#5b5fff' }: { count?: number; color?: string }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2000,
    duration: 3000 + Math.random() * 2000,
    size: 4 + Math.random() * 8,
  }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p) => (
        <FloatingParticle key={p.id} {...p} color={color} />
      ))}
    </View>
  );
};

const FloatingParticle = ({ left, delay, duration, size, color }: {
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}) => {
  const anim = useLoopAnimation(duration, delay);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });

  const opacity = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.8, 0.3],
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: `${left}%`,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    />
  );
};

// ==================== GUARDIAN CHARACTER ====================

interface GuardianProps {
  message: string;
  color?: string;
  icon?: string;
}

const Guardian = ({ message, color = '#5b5fff', icon = 'Shield' }: GuardianProps) => {
  const enterAnim = useEnterAnimation(200);
  const floatAnim = useLoopAnimation(2500);
  const glowAnim = useLoopAnimation(1500);

  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ size?: number; color?: string }>>)[icon] || LucideIcons.Shield;

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const scale = enterAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <Animated.View style={[styles.guardianContainer, { opacity: enterAnim, transform: [{ scale }] }]}>
      <Animated.View style={[styles.guardianGlow, { opacity: glowOpacity, backgroundColor: color }]} />
      <Animated.View style={[styles.guardianAvatar, { transform: [{ translateY }], borderColor: color }]}>
        <IconComponent size={40} color={color} />
      </Animated.View>
      <View style={[styles.speechBubble, { borderColor: color }]}>
        <Text style={styles.speechText}>{message}</Text>
        <View style={[styles.speechArrow, { borderTopColor: 'rgba(20, 25, 45, 0.95)' }]} />
      </View>
    </Animated.View>
  );
};

// ==================== SCENE 1: GATE OF TRANSFORMATION ====================

export const GateScene = () => {
  const gateAnim = useEnterAnimation(0);
  const glowAnim = useLoopAnimation(2000);
  const lockAnim = useLoopAnimation(1500);

  const gateScale = gateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.8],
  });

  const lockPulse = lockAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  });

  return (
    <View style={styles.sceneContainer}>
      <LinearGradient
        colors={['#0a0e1e', '#1a1f3a', '#0a0e1e']}
        style={StyleSheet.absoluteFill}
      />
      <Particles color="#5b5fff" count={20} />

      {/* Ancient Gate */}
      <Animated.View style={[styles.gateContainer, { opacity: gateAnim, transform: [{ scale: gateScale }] }]}>
        {/* Gate pillars */}
        <View style={styles.gatePillarLeft}>
          <LinearGradient colors={['#3a3f5c', '#1a1f3a']} style={styles.pillarGradient} />
        </View>
        <View style={styles.gatePillarRight}>
          <LinearGradient colors={['#3a3f5c', '#1a1f3a']} style={styles.pillarGradient} />
        </View>

        {/* Gate arch */}
        <View style={styles.gateArch}>
          <LinearGradient colors={['#5b5fff', '#3a3f5c']} style={styles.archGradient} />
        </View>

        {/* Glowing lock */}
        <Animated.View style={[styles.gateLock, { transform: [{ scale: lockPulse }] }]}>
          <Animated.View style={[styles.lockGlow, { opacity: glowOpacity }]} />
          <LucideIcons.Lock size={36} color="#ffd166" />
        </Animated.View>

        {/* Gate inscription */}
        <View style={styles.inscription}>
          <Text style={styles.inscriptionText}>بوابة المستثمر</Text>
        </View>
      </Animated.View>

      <Guardian
        message="لفتح هذه البوابة... يجب أن تفهم أول قانون للاستثمار"
        color="#5b5fff"
        icon="Shield"
      />
    </View>
  );
};

// ==================== SCENE 2: TARGET RANGE ====================

export const TargetRangeScene = () => {
  const enterAnim = useEnterAnimation(0);
  const arrowAnim = useLoopAnimation(1500);

  const arrowX = arrowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-50, 20, -50],
  });

  return (
    <View style={styles.sceneContainer}>
      <LinearGradient
        colors={['#1a1f3a', '#0a0e1e', '#1a1f3a']}
        style={StyleSheet.absoluteFill}
      />
      <Particles color="#ffd166" count={12} />

      {/* Targets */}
      <Animated.View style={[styles.targetsContainer, { opacity: enterAnim }]}>
        <View style={[styles.target, styles.targetLeft]}>
          <View style={styles.targetRing} />
          <Text style={styles.targetLabel}>السعر</Text>
        </View>
        <View style={[styles.target, styles.targetCenter]}>
          <View style={[styles.targetRing, styles.targetRingGold]} />
          <LucideIcons.Star size={24} color="#ffd166" />
          <Text style={[styles.targetLabel, styles.targetLabelGold]}>القيمة</Text>
        </View>
        <View style={[styles.target, styles.targetRight]}>
          <View style={styles.targetRing} />
          <Text style={styles.targetLabel}>الشهرة</Text>
        </View>
      </Animated.View>

      {/* Animated Arrow */}
      <Animated.View style={[styles.arrowContainer, { transform: [{ translateX: arrowX }] }]}>
        <LucideIcons.MoveRight size={32} color="#22c55e" />
      </Animated.View>

      <Guardian
        message="اضرب هدف المستثمر الحقيقي"
        color="#ffd166"
        icon="Target"
      />
    </View>
  );
};

// ==================== SCENE 3: PUZZLE REVEAL ====================

export const PuzzleScene = () => {
  const enterAnim = useEnterAnimation(0);
  const pieceAnims = [
    useLoopAnimation(2000, 0),
    useLoopAnimation(2000, 300),
    useLoopAnimation(2000, 600),
    useLoopAnimation(2000, 900),
  ];

  return (
    <View style={styles.sceneContainer}>
      <LinearGradient
        colors={['#0a1a0a', '#0a0e1e', '#0a1a0a']}
        style={StyleSheet.absoluteFill}
      />
      <Particles color="#22c55e" count={15} />

      {/* Puzzle Grid */}
      <Animated.View style={[styles.puzzleGrid, { opacity: enterAnim }]}>
        {pieceAnims.map((anim, i) => {
          const rotate = anim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '5deg'],
          });
          return (
            <Animated.View
              key={i}
              style={[
                styles.puzzlePiece,
                { transform: [{ rotate }] },
                i === 1 && styles.puzzlePieceRevealed,
              ]}
            >
              {i === 1 ? (
                <LucideIcons.Eye size={24} color="#22c55e" />
              ) : (
                <LucideIcons.HelpCircle size={20} color="#3a3f5c" />
              )}
            </Animated.View>
          );
        })}
      </Animated.View>

      {/* Hidden Image hint */}
      <View style={styles.hiddenImageHint}>
        <LucideIcons.TrendingUp size={48} color="rgba(34, 197, 94, 0.3)" />
      </View>

      <Guardian
        message="كل إجابة صحيحة تكشف قطعة من الصورة"
        color="#22c55e"
        icon="Puzzle"
      />
    </View>
  );
};

// ==================== SCENE 4: TIME ATTACK ====================

export const TimeAttackScene = () => {
  const enterAnim = useEnterAnimation(0);
  const timerAnim = useLoopAnimation(1000);
  const [countdown, setCountdown] = useState(9);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(c => c > 0 ? c - 1 : 9);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timerScale = timerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1],
  });

  const timerColor = countdown <= 3 ? '#ef4444' : '#ffd166';

  return (
    <View style={styles.sceneContainer}>
      <LinearGradient
        colors={['#1a0a0a', '#0a0e1e', '#1a0a0a']}
        style={StyleSheet.absoluteFill}
      />
      <Particles color="#ef4444" count={10} />

      {/* Timer Display */}
      <Animated.View style={[styles.timerContainer, { opacity: enterAnim }]}>
        <Animated.View style={[styles.timerCircle, { transform: [{ scale: timerScale }], borderColor: timerColor }]}>
          <Text style={[styles.timerText, { color: timerColor }]}>{countdown}</Text>
        </Animated.View>
        <View style={styles.timerLabel}>
          <LucideIcons.Timer size={20} color={timerColor} />
          <Text style={[styles.timerLabelText, { color: timerColor }]}>ثواني</Text>
        </View>
      </Animated.View>

      {/* Lightning Effects */}
      <View style={styles.lightningContainer}>
        <LucideIcons.Zap size={32} color="#ffd166" style={{ position: 'absolute', left: 20, top: 20 }} />
        <LucideIcons.Zap size={24} color="#ef4444" style={{ position: 'absolute', right: 30, top: 40 }} />
      </View>

      <Guardian
        message="أقوى مستثمر هو من يهزم مشاعره"
        color="#ef4444"
        icon="Timer"
      />
    </View>
  );
};

// ==================== SCENE 5: BUILD MODE ====================

export const BuildModeScene = () => {
  const enterAnim = useEnterAnimation(0);
  const blockAnims = [
    useEnterAnimation(200),
    useEnterAnimation(400),
    useEnterAnimation(600),
  ];

  return (
    <View style={styles.sceneContainer}>
      <LinearGradient
        colors={['#0a0e2e', '#1a1f4a', '#0a0e2e']}
        style={StyleSheet.absoluteFill}
      />
      <Particles color="#5b5fff" count={18} />

      {/* Tower */}
      <View style={styles.towerContainer}>
        {blockAnims.map((anim, i) => {
          const translateY = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0],
          });
          return (
            <Animated.View
              key={i}
              style={[
                styles.towerBlock,
                {
                  opacity: anim,
                  transform: [{ translateY }],
                  backgroundColor: i === 0 ? '#5b5fff' : i === 1 ? '#22c55e' : '#3a3f5c',
                },
              ]}
            >
              <LucideIcons.Building size={20} color="#fff" />
            </Animated.View>
          );
        })}

        {/* Foundation */}
        <View style={styles.towerFoundation}>
          <Text style={styles.foundationText}>التراكم</Text>
        </View>
      </View>

      <Guardian
        message="كل إجابة صحيحة تضيف لبنة جديدة"
        color="#5b5fff"
        icon="Building"
      />
    </View>
  );
};

// ==================== SCENE 6: MYSTERY BOX ====================

export const MysteryBoxScene = () => {
  const enterAnim = useEnterAnimation(0);
  const boxAnim1 = useLoopAnimation(2000, 0);
  const boxAnim2 = useLoopAnimation(2000, 500);

  const shake1 = boxAnim1.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -3, 0, 3, 0],
  });

  const shake2 = boxAnim2.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 3, 0, -3, 0],
  });

  return (
    <View style={styles.sceneContainer}>
      <LinearGradient
        colors={['#1a1a0a', '#0a0e1e', '#1a1a0a']}
        style={StyleSheet.absoluteFill}
      />
      <Particles color="#ffd166" count={15} />

      {/* Mystery Boxes */}
      <Animated.View style={[styles.boxesContainer, { opacity: enterAnim }]}>
        <Animated.View style={[styles.mysteryBox, { transform: [{ translateX: shake1 }] }]}>
          <LinearGradient colors={['#ffd166', '#f59e0b']} style={styles.boxGradient}>
            <LucideIcons.Sparkles size={28} color="#fff" />
            <Text style={styles.boxLabel}>فرصة لامعة</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.mysteryBox, { transform: [{ translateX: shake2 }] }]}>
          <LinearGradient colors={['#22c55e', '#16a34a']} style={styles.boxGradient}>
            <LucideIcons.Heart size={28} color="#fff" />
            <Text style={styles.boxLabel}>فرصة مناسبة</Text>
          </LinearGradient>
        </Animated.View>
      </Animated.View>

      <Guardian
        message="اختر الطريق الذي يسلكه المستثمر الحقيقي"
        color="#ffd166"
        icon="Gift"
      />
    </View>
  );
};

// ==================== SCENE 7: SHOOT & HIT ====================

export const ShootHitScene = () => {
  const enterAnim = useEnterAnimation(0);
  const targetAnim = useLoopAnimation(1500);

  const targetScale = targetAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.05, 1],
  });

  return (
    <View style={styles.sceneContainer}>
      <LinearGradient
        colors={['#0a1a0a', '#0a0e1e', '#0a1a0a']}
        style={StyleSheet.absoluteFill}
      />
      <Particles color="#22c55e" count={12} />

      {/* Targets */}
      <Animated.View style={[styles.shootTargetsContainer, { opacity: enterAnim }]}>
        <View style={styles.shootTarget}>
          <LucideIcons.Brain size={24} color="#8c92b5" />
          <Text style={styles.shootTargetLabel}>الذكاء</Text>
        </View>

        <Animated.View style={[styles.shootTarget, styles.shootTargetMain, { transform: [{ scale: targetScale }] }]}>
          <LucideIcons.CheckCircle size={28} color="#22c55e" />
          <Text style={[styles.shootTargetLabel, styles.shootTargetLabelMain]}>الانضباط</Text>
        </Animated.View>

        <View style={styles.shootTarget}>
          <LucideIcons.Dice4 size={24} color="#8c92b5" />
          <Text style={styles.shootTargetLabel}>الحظ</Text>
        </View>
      </Animated.View>

      {/* Crosshair */}
      <View style={styles.crosshairContainer}>
        <LucideIcons.Crosshair size={48} color="rgba(34, 197, 94, 0.5)" />
      </View>

      <Guardian
        message="اضرب الذي يصنع المستثمر الحقيقي"
        color="#22c55e"
        icon="Crosshair"
      />
    </View>
  );
};

// ==================== SCENE 8: KNOWLEDGE RACE ====================

export const KnowledgeRaceScene = () => {
  const enterAnim = useEnterAnimation(0);
  const carAnim = useLoopAnimation(2000);

  const carX = carAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  return (
    <View style={styles.sceneContainer}>
      <LinearGradient
        colors={['#0a0e2e', '#1a1f4a', '#0a0e2e']}
        style={StyleSheet.absoluteFill}
      />
      <Particles color="#5b5fff" count={15} />

      {/* Race Track */}
      <Animated.View style={[styles.raceTrack, { opacity: enterAnim }]}>
        <View style={styles.trackLine} />
        <View style={[styles.trackLine, { top: 60 }]} />

        {/* Racing Car */}
        <Animated.View style={[styles.raceCar, { transform: [{ translateX: carX }] }]}>
          <LinearGradient colors={['#5b5fff', '#3a3f5c']} style={styles.carBody}>
            <LucideIcons.Car size={24} color="#fff" />
          </LinearGradient>
        </Animated.View>

        {/* Finish Line */}
        <View style={styles.finishLine}>
          <LucideIcons.Flag size={28} color="#22c55e" />
        </View>
      </Animated.View>

      <Guardian
        message="التعلم هو الوقود... انطلق!"
        color="#5b5fff"
        icon="GraduationCap"
      />
    </View>
  );
};

// ==================== SCENE 9: MIND LOCK ====================

export const MindLockScene = () => {
  const enterAnim = useEnterAnimation(0);
  const brainAnim = useLoopAnimation(2000);

  const brainScale = brainAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.08, 1],
  });

  const glowOpacity = brainAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.6, 0.3],
  });

  return (
    <View style={styles.sceneContainer}>
      <LinearGradient
        colors={['#1a1a0a', '#0a0e1e', '#1a1a0a']}
        style={StyleSheet.absoluteFill}
      />
      <Particles color="#ffd166" count={15} />

      {/* Brain with Lock */}
      <Animated.View style={[styles.mindLockContainer, { opacity: enterAnim }]}>
        <Animated.View style={[styles.brainGlow, { opacity: glowOpacity }]} />
        <Animated.View style={[styles.brainContainer, { transform: [{ scale: brainScale }] }]}>
          <LucideIcons.Brain size={64} color="#ffd166" />
          <View style={styles.miniLock}>
            <LucideIcons.Lock size={20} color="#5b5fff" />
          </View>
        </Animated.View>

        {/* Symbols */}
        <View style={styles.symbolsContainer}>
          <View style={styles.symbol}><Text style={styles.symbolText}>📊</Text></View>
          <View style={styles.symbol}><Text style={styles.symbolText}>📈</Text></View>
          <View style={styles.symbol}><Text style={styles.symbolText}>💡</Text></View>
        </View>
      </Animated.View>

      <Guardian
        message="كل رمز = معلومة... افتح قفل العقل"
        color="#ffd166"
        icon="Brain"
      />
    </View>
  );
};

// ==================== SCENE 10: FINAL PRECISION ====================

export const FinalPrecisionScene = () => {
  const enterAnim = useEnterAnimation(0);
  const trophyAnim = useLoopAnimation(1500);
  const starAnims = [
    useLoopAnimation(2000, 0),
    useLoopAnimation(2000, 300),
    useLoopAnimation(2000, 600),
  ];

  const trophyScale = trophyAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1],
  });

  return (
    <View style={styles.sceneContainer}>
      <LinearGradient
        colors={['#0a1a0a', '#0a0e1e', '#1a0a1a']}
        style={StyleSheet.absoluteFill}
      />
      <Particles color="#22c55e" count={25} />

      {/* Trophy */}
      <Animated.View style={[styles.finalContainer, { opacity: enterAnim }]}>
        <Animated.View style={[styles.trophyContainer, { transform: [{ scale: trophyScale }] }]}>
          <View style={styles.trophyGlow} />
          <LucideIcons.Trophy size={72} color="#ffd166" />
        </Animated.View>

        {/* Floating Stars */}
        {starAnims.map((anim, i) => {
          const y = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -20],
          });
          return (
            <Animated.View
              key={i}
              style={[
                styles.floatingStar,
                {
                  left: 30 + i * 80,
                  transform: [{ translateY: y }],
                },
              ]}
            >
              <LucideIcons.Star size={20} color="#ffd166" fill="#ffd166" />
            </Animated.View>
          );
        })}

        <Text style={styles.finalTitle}>اختبار الاحتراف</Text>
      </Animated.View>

      <Guardian
        message="لقد تعلمت الأساس... أثبت جاهزيتك"
        color="#22c55e"
        icon="Trophy"
      />
    </View>
  );
};

// ==================== SCENE SELECTOR ====================

interface StorySceneProps {
  lessonNumber: number;
  dayNumber: number;
}

export const StoryScene = ({ lessonNumber, dayNumber }: StorySceneProps) => {
  // Only show story scenes for Day 2
  if (dayNumber !== 2) return null;

  switch (lessonNumber) {
    case 1: return <GateScene />;
    case 2: return <TargetRangeScene />;
    case 3: return <PuzzleScene />;
    case 4: return <TimeAttackScene />;
    case 5: return <BuildModeScene />;
    case 6: return <MysteryBoxScene />;
    case 7: return <ShootHitScene />;
    case 8: return <KnowledgeRaceScene />;
    case 9: return <MindLockScene />;
    case 10: return <FinalPrecisionScene />;
    default: return null;
  }
};

// ==================== STYLES ====================

const styles = StyleSheet.create({
  sceneContainer: {
    width: '100%',
    height: 320,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },

  // Particles
  particle: {
    position: 'absolute',
    bottom: 50,
  },

  // Guardian
  guardianContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  guardianGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    top: -10,
  },
  guardianAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(20, 25, 45, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 10,
  },
  speechBubble: {
    backgroundColor: 'rgba(20, 25, 45, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    maxWidth: '90%',
  },
  speechText: {
    color: '#f5f7ff',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  speechArrow: {
    position: 'absolute',
    top: -8,
    left: '50%',
    marginLeft: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },

  // Gate Scene
  gateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  gatePillarLeft: {
    position: 'absolute',
    left: 40,
    top: 30,
    width: 30,
    height: 120,
    borderRadius: 4,
    overflow: 'hidden',
  },
  gatePillarRight: {
    position: 'absolute',
    right: 40,
    top: 30,
    width: 30,
    height: 120,
    borderRadius: 4,
    overflow: 'hidden',
  },
  pillarGradient: {
    flex: 1,
  },
  gateArch: {
    width: 160,
    height: 30,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    overflow: 'hidden',
    marginTop: 10,
  },
  archGradient: {
    flex: 1,
  },
  gateLock: {
    marginTop: 30,
    padding: 16,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 209, 102, 0.1)',
  },
  lockGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffd166',
    top: -8,
    left: -8,
  },
  inscription: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
    borderRadius: 8,
  },
  inscriptionText: {
    color: '#9bafff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Target Range Scene
  targetsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  target: {
    alignItems: 'center',
  },
  targetLeft: {},
  targetCenter: {},
  targetRight: {},
  targetRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#3a3f5c',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  targetRingGold: {
    borderColor: '#ffd166',
    backgroundColor: 'rgba(255, 209, 102, 0.1)',
  },
  targetLabel: {
    color: '#8c92b5',
    fontSize: 12,
  },
  targetLabelGold: {
    color: '#ffd166',
    fontWeight: '600',
  },
  arrowContainer: {
    position: 'absolute',
    left: 20,
    top: 80,
  },

  // Puzzle Scene
  puzzleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    paddingTop: 30,
  },
  puzzlePiece: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(58, 63, 92, 0.5)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3f5c',
  },
  puzzlePieceRevealed: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderColor: '#22c55e',
  },
  hiddenImageHint: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
  },

  // Time Attack Scene
  timerContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  timerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  timerText: {
    fontSize: 48,
    fontWeight: '700',
  },
  timerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  timerLabelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  lightningContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Build Mode Scene
  towerContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  towerBlock: {
    width: 80,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  towerFoundation: {
    width: 120,
    height: 30,
    backgroundColor: '#3a3f5c',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  foundationText: {
    color: '#f5f7ff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Mystery Box Scene
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  mysteryBox: {
    width: 100,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
  },
  boxGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  boxLabel: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },

  // Shoot & Hit Scene
  shootTargetsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  shootTarget: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(58, 63, 92, 0.3)',
  },
  shootTargetMain: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  shootTargetLabel: {
    color: '#8c92b5',
    fontSize: 12,
    marginTop: 6,
  },
  shootTargetLabelMain: {
    color: '#22c55e',
    fontWeight: '600',
  },
  crosshairContainer: {
    position: 'absolute',
    top: 30,
    alignSelf: 'center',
  },

  // Knowledge Race Scene
  raceTrack: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  trackLine: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: 80,
    height: 4,
    backgroundColor: '#3a3f5c',
    borderRadius: 2,
  },
  raceCar: {
    marginTop: 20,
    marginLeft: 20,
  },
  carBody: {
    width: 60,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishLine: {
    position: 'absolute',
    right: 30,
    top: 60,
  },

  // Mind Lock Scene
  mindLockContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  brainGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ffd166',
    top: 10,
  },
  brainContainer: {
    position: 'relative',
  },
  miniLock: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: 'rgba(10, 14, 30, 0.9)',
    padding: 6,
    borderRadius: 12,
  },
  symbolsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  symbol: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbolText: {
    fontSize: 20,
  },

  // Final Precision Scene
  finalContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  trophyContainer: {
    position: 'relative',
  },
  trophyGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 209, 102, 0.3)',
    top: -14,
    left: -14,
  },
  floatingStar: {
    position: 'absolute',
    top: 10,
  },
  finalTitle: {
    color: '#ffd166',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
  },
});

export default StoryScene;
