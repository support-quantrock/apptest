import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface QuestionnaireAnswers {
  // Demographics (1-7)
  gender: 'male' | 'female' | null;
  ageRange: '<30' | '30-39' | '40-49' | '50-59' | '60+' | null;
  educationLevel: 'high_school' | 'university' | 'postgraduate' | null;
  monthlyIncome: '<5k' | '5k-10k' | '10k-25k' | '>25k' | null;
  incomeStability: 'not_stable' | 'stable' | 'very_stable' | null;
  incomeSource: 'employee' | 'business_owner' | 'retired' | 'student' | null;
  currentDebts: string[];

  // Investment Profile (8-11)
  hasInvestmentAccount: 'yes' | 'no' | 'planning' | null;
  portfolioSize: '<10k' | '10k-25k' | '25k-100k' | '100k-1m' | '>1m' | null;
  investmentKnowledge: 'nothing' | 'little' | 'good' | 'expert' | null;
  assetClasses: string[];

  // Goals & Risk (12-17)
  investingGoal: 'growth' | 'income' | 'protection' | null;
  investmentTimeline: '<3y' | '3-5y' | '>5y' | null;
  portfolioDropResponse: 'sell' | 'reduce' | 'nothing' | 'buy_more' | null;
  marketFluctuationImpact: 'worry_too_much' | 'worry_sometimes' | 'no_worry' | null;
  riskTolerance: 'low' | 'medium' | 'high' | null;
  riskAttitude: 'seek_highest' | 'accept_moderate' | 'prefer_safety' | null;

  // Behavior (18-21)
  financialStressFrequency: 'most_time' | 'always' | 'rarely' | 'sometimes' | null;
  retirementPlanning: 'not_yet' | 'save_regularly' | 'rely_pension' | null;
  savingHabit: 'want_but_cant' | 'dont_save' | 'save_regularly' | 'save_sometimes' | null;
  industriesInterested: string[];

  // Platform (22-25)
  quantrockGoal: 'challenge' | 'prepare_trading' | 'test_strategy' | 'learn' | null;
  preferredPortfolioSize: '1k' | '10k' | '25k' | '50k' | '100k' | null;
  investmentReadiness: 1 | 2 | 3 | 4 | 5 | null;
  passiveIncomeKnowledge: 1 | 2 | 3 | 4 | 5 | null;

  // Metadata
  selectedAsset: { symbol: string; name: string } | null;
  completedAt: string | null;
}

const initialAnswers: QuestionnaireAnswers = {
  gender: null,
  ageRange: null,
  educationLevel: null,
  monthlyIncome: null,
  incomeStability: null,
  incomeSource: null,
  currentDebts: [],
  hasInvestmentAccount: null,
  portfolioSize: null,
  investmentKnowledge: null,
  assetClasses: [],
  investingGoal: null,
  investmentTimeline: null,
  portfolioDropResponse: null,
  marketFluctuationImpact: null,
  riskTolerance: null,
  riskAttitude: null,
  financialStressFrequency: null,
  retirementPlanning: null,
  savingHabit: null,
  industriesInterested: [],
  quantrockGoal: null,
  preferredPortfolioSize: null,
  investmentReadiness: null,
  passiveIncomeKnowledge: null,
  selectedAsset: null,
  completedAt: null,
};

interface QuestionnaireContextType {
  answers: QuestionnaireAnswers;
  setAnswer: <K extends keyof QuestionnaireAnswers>(key: K, value: QuestionnaireAnswers[K]) => void;
  resetAnswers: () => void;
  isCompleted: boolean;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

const STORAGE_KEY = '@questionnaire_answers';

export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(initialAnswers);

  useEffect(() => {
    loadAnswers();
  }, []);

  const loadAnswers = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAnswers(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load questionnaire answers:', error);
    }
  };

  const saveAnswers = async (newAnswers: QuestionnaireAnswers) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers));
    } catch (error) {
      console.error('Failed to save questionnaire answers:', error);
    }
  };

  const setAnswer = <K extends keyof QuestionnaireAnswers>(key: K, value: QuestionnaireAnswers[K]) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
  };

  const resetAnswers = () => {
    setAnswers(initialAnswers);
    AsyncStorage.removeItem(STORAGE_KEY);
  };

  const isCompleted = answers.completedAt !== null;

  return (
    <QuestionnaireContext.Provider value={{ answers, setAnswer, resetAnswers, isCompleted }}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (context === undefined) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
}
