import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ChallengeProvider } from '@/context/ChallengeContext';
import { QuestionnaireProvider } from '@/context/QuestionnaireContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ChallengeProvider>
      <QuestionnaireProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </QuestionnaireProvider>
    </ChallengeProvider>
  );
}
