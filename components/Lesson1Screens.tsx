// Lesson1Screens.tsx
// React Native components for your 10 onboarding / lesson screens

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";

// Shared layout wrapper for all lesson screens
const LessonScreen = ({ imageSource, children, variant = "light" }: {
  imageSource?: any;
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
        {imageSource && (
          <Image
            source={imageSource}
            style={styles.heroImage}
            resizeMode="contain"
          />
        )}
        <View style={styles.card}>{children}</View>
      </View>
    </ScrollView>
  );
};

/* ─────────────────────────────
 * Screen 1
 * ────────────────────────────*/
export const Lesson1Screen1 = () => (
  <LessonScreen>
    <Text style={styles.eyebrow}>Hey, future trader!</Text>
    <Text style={styles.body}>
      I'm Ben. Over the next 28 days, I'll guide you through the trading
      challenge. You'll learn how to think like a trader – one decision at a
      time.
    </Text>
  </LessonScreen>
);

/* ─────────────────────────────
 * Screen 2
 * ────────────────────────────*/
export const Lesson1Screen2 = () => (
  <LessonScreen>
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

/* ─────────────────────────────
 * Screen 3
 * ────────────────────────────*/
export const Lesson1Screen3 = () => (
  <LessonScreen>
    <Text style={styles.eyebrow}>GAME TIME</Text>
    <Text style={styles.subheading}>Your first task</Text>
    <Text style={styles.body}>
      Flip a coin: if it lands on Tails, you win; Heads, you lose.
    </Text>
  </LessonScreen>
);

/* ─────────────────────────────
 * Screen 4
 * ────────────────────────────*/
export const Lesson1Screen4 = () => (
  <LessonScreen>
    <Text style={styles.heading}>Nice, you won this time!</Text>
    <Text style={styles.body}>
      Now imagine the coin lands on Heads 60% of the time.
    </Text>
    <Text style={styles.body}>
      That gives you just a 40% chance to win.
    </Text>
    <Text style={styles.question}>Would you still play?</Text>
  </LessonScreen>
);

/* ─────────────────────────────
 * Screen 5
 * ────────────────────────────*/
export const Lesson1Screen5 = () => (
  <LessonScreen>
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

/* ─────────────────────────────
 * Screen 6
 * ────────────────────────────*/
export const Lesson1Screen6 = () => (
  <LessonScreen>
    <Text style={styles.heading}>Over the next 28 days, you'll learn how to:</Text>
    <Text style={styles.bullet}>– Read charts</Text>
    <Text style={styles.bullet}>– Spot setups</Text>
    <Text style={styles.bullet}>– Build your strategy</Text>
  </LessonScreen>
);

/* ─────────────────────────────
 * Screen 7
 * ────────────────────────────*/
export const Lesson1Screen7 = () => (
  <LessonScreen>
    <Text style={styles.eyebrow}>SET THE VALUE</Text>
    <Text style={styles.subheading}>Quick check</Text>
    <Text style={styles.body}>
      Most traders start by losing money before they learn.
    </Text>
    <Text style={styles.question}>
      How much do you think you need to start trading?
    </Text>
  </LessonScreen>
);

/* ─────────────────────────────
 * Screen 8 (Slider)
 * ────────────────────────────*/
export const Lesson1Screen8 = ({ onNext }: { onNext?: () => void }) => {
  const [value, setValue] = useState(100);

  return (
    <LessonScreen>
      <Text style={styles.subheading}>Set an amount</Text>
      <Text style={styles.sliderValue}>${value.toFixed(0)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1000}
        step={10}
        value={value}
        onValueChange={setValue}
        minimumTrackTintColor="#2f80ed"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#2f80ed"
      />
      <Text style={styles.sliderHint}>(Slider showing ${value} selected)</Text>

      {onNext && (
        <TouchableOpacity style={styles.continueButton} onPress={onNext}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      )}
    </LessonScreen>
  );
};

/* ─────────────────────────────
 * Screen 9
 * ────────────────────────────*/
export const Lesson1Screen9 = () => (
  <LessonScreen>
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

/* ─────────────────────────────
 * Screen 10
 * ────────────────────────────*/
export const Lesson1Screen10 = ({ onFinish }: { onFinish?: () => void }) => (
  <LessonScreen>
    <Text style={styles.heading}>That's it for Lesson 1! Let's recap:</Text>
    <Text style={styles.bullet}>– Trading is NOT gambling,</Text>
    <Text style={styles.bullet}>– Trading is about stacking probabilities,</Text>
    <Text style={styles.bullet}>
      – You don't need to risk real money to learn – use the simulator.
    </Text>

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

/* ─────────────────────────────
 * Styles
 * ────────────────────────────*/

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#0b1020",
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  scrollContentDark: {
    backgroundColor: "#050816",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: 260,
    marginBottom: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(10, 14, 30, 0.95)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
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
  slider: {
    width: "100%",
    marginVertical: 16,
  },
  sliderValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#f5f7ff",
    textAlign: "center",
    marginTop: 8,
  },
  sliderHint: {
    fontSize: 13,
    color: "#8c92b5",
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginVertical: 16,
  },
  finishButton: {
    backgroundColor: "#5b5fff",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
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
    marginTop: 24,
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
