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
  Image,
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
          <Text style={styles.inscriptionText}>Investor's Gate</Text>
        </View>
      </Animated.View>

      <Guardian
        message="To open this gate... you must understand the first law of investing"
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
          <Text style={styles.targetLabel}>Price</Text>
        </View>
        <View style={[styles.target, styles.targetCenter]}>
          <View style={[styles.targetRing, styles.targetRingGold]} />
          <LucideIcons.Star size={24} color="#ffd166" />
          <Text style={[styles.targetLabel, styles.targetLabelGold]}>Value</Text>
        </View>
        <View style={[styles.target, styles.targetRight]}>
          <View style={styles.targetRing} />
          <Text style={styles.targetLabel}>Hype</Text>
        </View>
      </Animated.View>

      {/* Animated Arrow */}
      <Animated.View style={[styles.arrowContainer, { transform: [{ translateX: arrowX }] }]}>
        <LucideIcons.MoveRight size={32} color="#22c55e" />
      </Animated.View>

      <Guardian
        message="Hit the target of the true investor"
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
        message="Each correct answer reveals a piece of the picture"
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
          <Text style={[styles.timerLabelText, { color: timerColor }]}>seconds</Text>
        </View>
      </Animated.View>

      {/* Lightning Effects */}
      <View style={styles.lightningContainer}>
        <LucideIcons.Zap size={32} color="#ffd166" style={{ position: 'absolute', left: 20, top: 20 }} />
        <LucideIcons.Zap size={24} color="#ef4444" style={{ position: 'absolute', right: 30, top: 40 }} />
      </View>

      <Guardian
        message="The strongest investor is one who conquers their emotions"
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
          <Text style={styles.foundationText}>Compounding</Text>
        </View>
      </View>

      <Guardian
        message="Each correct answer adds a new block"
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
            <Text style={styles.boxLabel}>Shiny Opportunity</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.mysteryBox, { transform: [{ translateX: shake2 }] }]}>
          <LinearGradient colors={['#22c55e', '#16a34a']} style={styles.boxGradient}>
            <LucideIcons.Heart size={28} color="#fff" />
            <Text style={styles.boxLabel}>Right Opportunity</Text>
          </LinearGradient>
        </Animated.View>
      </Animated.View>

      <Guardian
        message="Choose the path that a true investor takes"
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
          <Text style={styles.shootTargetLabel}>Intelligence</Text>
        </View>

        <Animated.View style={[styles.shootTarget, styles.shootTargetMain, { transform: [{ scale: targetScale }] }]}>
          <LucideIcons.CheckCircle size={28} color="#22c55e" />
          <Text style={[styles.shootTargetLabel, styles.shootTargetLabelMain]}>Discipline</Text>
        </Animated.View>

        <View style={styles.shootTarget}>
          <LucideIcons.Dice4 size={24} color="#8c92b5" />
          <Text style={styles.shootTargetLabel}>Luck</Text>
        </View>
      </Animated.View>

      {/* Crosshair */}
      <View style={styles.crosshairContainer}>
        <LucideIcons.Crosshair size={48} color="rgba(34, 197, 94, 0.5)" />
      </View>

      <Guardian
        message="Hit what makes a true investor"
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
        message="Learning is the fuel... Go!"
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
        message="Each code = information... Unlock the mind"
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

        <Text style={styles.finalTitle}>The Mastery Test</Text>
      </Animated.View>

      <Guardian
        message="You've learned the foundation... Prove your readiness"
        color="#22c55e"
        icon="Trophy"
      />
    </View>
  );
};

// ==================== KEY POINTS SCENE (Content Screen) ====================

// Icon mapping for each lesson's key points
const lessonKeyPointIcons: Record<number, string[]> = {
  1: ['TrendingUp', 'Shield', 'Lightbulb'],
  2: ['DollarSign', 'Scale', 'Trophy'],
  3: ['Eye', 'TrendingUp', 'Target'],
  4: ['Heart', 'AlertTriangle', 'Brain'],
  5: ['Clock', 'Coins', 'Building'],
  6: ['Sparkles', 'Heart', 'Filter'],
  7: ['CheckCircle', 'Brain', 'Award'],
  8: ['BookOpen', 'TrendingUp', 'Zap'],
  9: ['Search', 'FileText', 'Shield'],
  10: ['CheckCircle', 'Eye', 'Brain', 'Heart', 'TrendingUp'],
};

// AI-generated cartoon images for each lesson's key points using Pollinations.ai
const lessonKeyPointImages: Record<number, string[]> = {
  // Lesson 1: The Gate of Transformation - Investor mindset
  1: [
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20investor%20looking%20through%20telescope%20at%20distant%20mountain%20peak%20with%20upward%20stock%20chart%20long%20term%20vision%20flat%20design%20vibrant%20blue%20colors?width=400&height=300&seed=101',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20disciplined%20person%20following%20checklist%20plan%20organized%20focused%20investment%20flat%20design%20vibrant%20blue%20colors?width=400&height=300&seed=102',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20glowing%20brain%20with%20gears%20lightbulb%20positive%20mindset%20success%20thinking%20flat%20design%20vibrant%20blue%20colors?width=400&height=300&seed=103',
  ],
  // Lesson 2: The Value Mindset - Value investing
  2: [
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20golden%20scale%20balancing%20diamond%20gem%20value%20versus%20price%20tag%20investment%20concept%20flat%20design%20vibrant%20gold%20colors?width=400&height=300&seed=201',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20fluctuating%20price%20waves%20on%20top%20stable%20value%20foundation%20rock%20solid%20base%20investing%20flat%20design%20vibrant%20gold%20colors?width=400&height=300&seed=202',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20wise%20investor%20character%20with%20magnifying%20glass%20analyzing%20stocks%20value%20investing%20warren%20buffett%20style%20flat%20design%20gold%20colors?width=400&height=300&seed=203',
  ],
  // Lesson 3: Seeing the Big Picture - Long-term trends
  3: [
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20person%20standing%20on%20mountain%20top%20viewing%20full%20landscape%20panorama%20seeing%20trends%20big%20picture%20flat%20design%20vibrant%20green%20colors?width=400&height=300&seed=301',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20person%20above%20maze%20seeing%20clear%20path%20to%20exit%20bird%20eye%20view%20perspective%20flat%20design%20vibrant%20green%20colors?width=400&height=300&seed=302',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20compass%20with%20wide%20map%20showing%20direction%20navigation%20true%20path%20investing%20journey%20flat%20design%20vibrant%20green%20colors?width=400&height=300&seed=303',
  ],
  // Lesson 4: Controlling Emotions - Psychology
  4: [
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20scared%20investor%20running%20away%20from%20small%20dip%20in%20stock%20chart%20fear%20selling%20too%20early%20panic%20flat%20design%20red%20colors?width=400&height=300&seed=401',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20greedy%20person%20chasing%20rocket%20that%20already%20launched%20too%20late%20buying%20high%20fomo%20flat%20design%20red%20colors?width=400&height=300&seed=402',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20zen%20calm%20investor%20meditating%20peacefully%20while%20stock%20charts%20fluctuate%20around%20emotional%20control%20flat%20design%20red%20colors?width=400&height=300&seed=403',
  ],
  // Lesson 5: Power of Compounding - Growth
  5: [
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20snowball%20rolling%20downhill%20getting%20bigger%20compound%20growth%20effect%20wealth%20building%20flat%20design%20vibrant%20blue%20purple%20colors?width=400&height=300&seed=501',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20small%20coins%20growing%20into%20mountain%20of%20gold%20over%20timeline%20wealth%20accumulation%20flat%20design%20vibrant%20blue%20purple%20colors?width=400&height=300&seed=502',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20hourglass%20with%20coins%20multiplying%20inside%20time%20is%20money%20patient%20investing%20flat%20design%20vibrant%20blue%20purple%20colors?width=400&height=300&seed=503',
  ],
  // Lesson 6: Don't Chase Opportunities
  6: [
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20glittering%20gold%20trap%20versus%20simple%20door%20with%20warm%20light%20right%20opportunity%20wisdom%20flat%20design%20vibrant%20gold%20colors?width=400&height=300&seed=601',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20person%20chasing%20butterflies%20missing%20beautiful%20flower%20garden%20nearby%20wrong%20priorities%20flat%20design%20vibrant%20gold%20colors?width=400&height=300&seed=602',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20puzzle%20piece%20finding%20perfect%20match%20right%20fit%20opportunity%20personality%20match%20flat%20design%20vibrant%20gold%20colors?width=400&height=300&seed=603',
  ],
  // Lesson 7: Discipline Before Intelligence
  7: [
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20focused%20person%20following%20roadmap%20step%20by%20step%20discipline%20planning%20consistency%20flat%20design%20vibrant%20green%20colors?width=400&height=300&seed=701',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20genius%20scattered%20papers%20chaos%20failing%20without%20discipline%20smart%20but%20disorganized%20flat%20design%20vibrant%20green%20colors?width=400&height=300&seed=702',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20regular%20person%20crossing%20finish%20line%20winning%20trophy%20methodical%20disciplined%20approach%20success%20flat%20design%20vibrant%20green%20colors?width=400&height=300&seed=703',
  ],
  // Lesson 8: Growth Mindset - Learning
  8: [
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20person%20falling%20down%20but%20collecting%20books%20knowledge%20learning%20from%20failure%20lessons%20flat%20design%20vibrant%20blue%20purple%20colors?width=400&height=300&seed=801',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20trophy%20being%20built%20brick%20by%20brick%20step%20by%20step%20achievement%20progress%20results%20flat%20design%20vibrant%20blue%20purple%20colors?width=400&height=300&seed=802',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20brain%20character%20lifting%20weights%20exercising%20getting%20stronger%20continuous%20learning%20growth%20flat%20design%20vibrant%20blue%20purple%20colors?width=400&height=300&seed=803',
  ],
  // Lesson 9: Calculate Every Step - Research
  9: [
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20detective%20investor%20with%20magnifying%20glass%20analyzing%20stock%20charts%20research%20investigation%20flat%20design%20vibrant%20gold%20colors?width=400&height=300&seed=901',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20dice%20gambling%20with%20big%20red%20X%20mark%20guessing%20equals%20loss%20no%20gambling%20flat%20design%20vibrant%20gold%20colors?width=400&height=300&seed=902',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20superhero%20powered%20by%20data%20books%20information%20knowledge%20is%20power%20strength%20flat%20design%20vibrant%20gold%20colors?width=400&height=300&seed=903',
  ],
  // Lesson 10: The Mastery Test - All concepts
  10: [
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20checklist%20with%20green%20checkmarks%20discipline%20organized%20planning%20success%20flat%20design%20vibrant%20green%20colors?width=400&height=300&seed=1001',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20shining%20diamond%20gem%20representing%20true%20value%20precious%20investing%20flat%20design%20vibrant%20green%20colors?width=400&height=300&seed=1002',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20eagle%20flying%20high%20with%20panoramic%20view%20big%20picture%20perspective%20vision%20flat%20design%20vibrant%20green%20colors?width=400&height=300&seed=1003',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20balanced%20scale%20with%20heart%20and%20brain%20emotional%20control%20balance%20wisdom%20flat%20design%20vibrant%20green%20colors?width=400&height=300&seed=1004',
    'https://image.pollinations.ai/prompt/cartoon%20illustration%20plant%20growing%20through%20stages%20seedling%20to%20tree%20continuous%20growth%20progress%20flat%20design%20vibrant%20green%20colors?width=400&height=300&seed=1005',
  ],
};

// Color themes for each lesson
const lessonColors: Record<number, { primary: string; secondary: string; gradient: [string, string, string] }> = {
  1: { primary: '#5b5fff', secondary: '#9bafff', gradient: ['#0a0e2e', '#1a1f4a', '#0a0e2e'] },
  2: { primary: '#ffd166', secondary: '#ffe4a0', gradient: ['#1a1a0a', '#0a0e1e', '#1a1a0a'] },
  3: { primary: '#22c55e', secondary: '#86efac', gradient: ['#0a1a0a', '#0a0e1e', '#0a1a0a'] },
  4: { primary: '#ef4444', secondary: '#fca5a5', gradient: ['#1a0a0a', '#0a0e1e', '#1a0a0a'] },
  5: { primary: '#5b5fff', secondary: '#9bafff', gradient: ['#0a0e2e', '#1a1f4a', '#0a0e2e'] },
  6: { primary: '#ffd166', secondary: '#ffe4a0', gradient: ['#1a1a0a', '#0a0e1e', '#1a1a0a'] },
  7: { primary: '#22c55e', secondary: '#86efac', gradient: ['#0a1a0a', '#0a0e1e', '#0a1a0a'] },
  8: { primary: '#5b5fff', secondary: '#9bafff', gradient: ['#0a0e2e', '#1a1f4a', '#0a0e2e'] },
  9: { primary: '#ffd166', secondary: '#ffe4a0', gradient: ['#1a1a0a', '#0a0e1e', '#1a1a0a'] },
  10: { primary: '#22c55e', secondary: '#86efac', gradient: ['#0a1a0a', '#0a0e1e', '#1a0a1a'] },
};

interface KeyPointCardProps {
  point: string;
  index: number;
  icon: string;
  color: string;
  totalPoints: number;
  imageUrl?: string;
}

const KeyPointCard = ({ point, index, icon, color, totalPoints, imageUrl }: KeyPointCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const enterAnim = useEnterAnimation(index * 250);
  const floatAnim = useLoopAnimation(3000, index * 400);
  const glowAnim = useLoopAnimation(2000, index * 200);
  const shimmerAnim = useLoopAnimation(2500, index * 150);
  const loadingPulse = useLoopAnimation(1500, 0);

  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ size?: number; color?: string }>>)[icon] || LucideIcons.Star;

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.15, 0.4, 0.15],
  });

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.7, 0.3],
  });

  const loadingOpacity = loadingPulse.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.6, 0.3],
  });

  const scale = enterAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1],
  });

  return (
    <Animated.View
      style={[
        styles.keyPointCardWithImage,
        {
          opacity: enterAnim,
          transform: [{ scale }, { translateY }],
        },
      ]}
    >
      {/* Background glow effect */}
      <Animated.View
        style={[
          styles.keyPointGlowLarge,
          { backgroundColor: color, opacity: glowOpacity },
        ]}
      />

      {/* Image section */}
      {imageUrl && !imageError && (
        <View style={styles.keyPointImageContainer}>
          {/* Loading placeholder */}
          {imageLoading && (
            <Animated.View
              style={[
                styles.keyPointImagePlaceholder,
                { backgroundColor: color, opacity: loadingOpacity }
              ]}
            >
              <LucideIcons.ImageIcon size={32} color="#ffffff80" />
            </Animated.View>
          )}
          <Image
            source={{ uri: imageUrl }}
            style={[styles.keyPointImage, imageLoading && { opacity: 0 }]}
            resizeMode="cover"
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />
          {/* Image overlay gradient */}
          {!imageLoading && (
            <LinearGradient
              colors={['transparent', 'rgba(20, 25, 45, 0.8)', 'rgba(20, 25, 45, 0.95)']}
              style={styles.keyPointImageOverlay}
            />
          )}
          {/* Shimmer effect on image */}
          {!imageLoading && (
            <Animated.View
              style={[
                styles.keyPointImageShimmer,
                { opacity: shimmerOpacity },
              ]}
            >
              <LinearGradient
                colors={['transparent', `${color}30`, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          )}
        </View>
      )}

      {/* Content section */}
      <View style={styles.keyPointContentSection}>
        {/* Icon and badge row */}
        <View style={styles.keyPointHeaderRow}>
          <View style={[styles.keyPointIconContainerSmall, { backgroundColor: `${color}25`, borderColor: `${color}50` }]}>
            <IconComponent size={22} color={color} />
          </View>
          <View style={[styles.keyPointBadgeSmall, { backgroundColor: color }]}>
            <Text style={styles.keyPointBadgeTextSmall}>{index + 1}</Text>
          </View>
        </View>

        {/* Text content */}
        <Text style={styles.keyPointCardTextWithImage}>{point}</Text>

        {/* Decorative accent line */}
        <View style={[styles.keyPointAccentLine, { backgroundColor: color }]} />
      </View>

      {/* Border glow */}
      <View style={[styles.keyPointBorderGlow, { borderColor: `${color}40` }]} />
    </Animated.View>
  );
};

interface KeyPointsSceneProps {
  keyPoints: string[];
  lessonNumber: number;
  title: string;
}

export const KeyPointsScene = ({ keyPoints, lessonNumber, title }: KeyPointsSceneProps) => {
  const colors = lessonColors[lessonNumber] || lessonColors[1];
  const icons = lessonKeyPointIcons[lessonNumber] || ['Star', 'Star', 'Star'];
  const images = lessonKeyPointImages[lessonNumber] || [];
  const titleAnim = useEnterAnimation(0);
  const subtitleAnim = useEnterAnimation(100);
  const decorAnim = useLoopAnimation(3000);

  const decorScale = decorAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1],
  });

  return (
    <View style={styles.keyPointsSceneContainer}>
      <LinearGradient
        colors={colors.gradient}
        style={StyleSheet.absoluteFill}
      />
      <Particles color={colors.primary} count={15} />

      {/* Header */}
      <View style={styles.keyPointsHeader}>
        <Animated.View style={{ opacity: titleAnim }}>
          <View style={styles.keyPointsTitleRow}>
            <LucideIcons.Sparkles size={22} color={colors.primary} />
            <Text style={[styles.keyPointsSceneTitle, { color: colors.primary }]}>
              Key Points
            </Text>
            <LucideIcons.Sparkles size={22} color={colors.primary} />
          </View>
        </Animated.View>
        <Animated.View style={{ opacity: subtitleAnim }}>
          <Text style={styles.keyPointsSceneSubtitle}>{title}</Text>
        </Animated.View>
      </View>

      {/* Key Points Cards with Images */}
      <View style={styles.keyPointsCardsContainerWithImages}>
        {keyPoints.map((point, index) => (
          <KeyPointCard
            key={index}
            point={point}
            index={index}
            icon={icons[index] || 'Star'}
            color={colors.primary}
            totalPoints={keyPoints.length}
            imageUrl={images[index]}
          />
        ))}
      </View>

      {/* Bottom decoration with animation */}
      <View style={styles.keyPointsBottomDecor}>
        <Animated.View style={[styles.decorDot, { backgroundColor: colors.primary, transform: [{ scale: decorScale }] }]} />
        <View style={[styles.decorLine, { backgroundColor: `${colors.primary}40` }]} />
        <Animated.View style={[styles.decorDot, { backgroundColor: colors.primary, transform: [{ scale: decorScale }] }]} />
      </View>
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

  // Key Points Scene Styles
  keyPointsSceneContainer: {
    width: '100%',
    minHeight: 400,
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  keyPointsHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  keyPointsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  keyPointsSceneTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  keyPointsSceneSubtitle: {
    fontSize: 14,
    color: '#8c92b5',
    textAlign: 'center',
  },
  keyPointsCardsContainer: {
    gap: 16,
  },
  keyPointsCardsContainerWithImages: {
    gap: 20,
  },
  keyPointCard: {
    backgroundColor: 'rgba(20, 25, 45, 0.9)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    position: 'relative',
    overflow: 'hidden',
  },
  // New image-enhanced card styles
  keyPointCardWithImage: {
    backgroundColor: 'rgba(20, 25, 45, 0.95)',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  keyPointGlowLarge: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  keyPointImageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
    overflow: 'hidden',
  },
  keyPointImage: {
    width: '100%',
    height: '100%',
  },
  keyPointImagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyPointImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  keyPointImageShimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  keyPointContentSection: {
    padding: 16,
    paddingTop: 12,
  },
  keyPointHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  keyPointIconContainerSmall: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  keyPointBadgeSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyPointBadgeTextSmall: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  keyPointCardTextWithImage: {
    fontSize: 15,
    lineHeight: 24,
    color: '#f5f7ff',
    textAlign: 'left',
    marginBottom: 12,
  },
  keyPointAccentLine: {
    width: 50,
    height: 3,
    borderRadius: 2,
  },
  keyPointBorderGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    borderWidth: 1,
    pointerEvents: 'none',
  },
  // Legacy styles kept for compatibility
  keyPointGlow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  keyPointIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  keyPointBadge: {
    position: 'absolute',
    top: -6,
    left: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyPointBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  keyPointCardText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    color: '#f5f7ff',
    textAlign: 'left',
  },
  keyPointLine: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 2,
    borderRadius: 1,
  },
  keyPointsBottomDecor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    gap: 12,
  },
  decorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  decorLine: {
    width: 60,
    height: 2,
    borderRadius: 1,
  },
});

export default StoryScene;
