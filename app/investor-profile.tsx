import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useQuestionnaire } from '@/context/QuestionnaireContext';

import QuestionHeader from '@/components/questionnaire/QuestionHeader';
import AnimatedProgressBar from '@/components/questionnaire/AnimatedProgressBar';
import SingleChoiceCard from '@/components/questionnaire/SingleChoiceCard';
import SingleChoiceGrid from '@/components/questionnaire/SingleChoiceGrid';
import MultiSelectChips from '@/components/questionnaire/MultiSelectChips';
import RatingScale from '@/components/questionnaire/RatingScale';

const TOTAL_QUESTIONS = 25;

export default function InvestorProfile() {
  const params = useLocalSearchParams<{ symbol?: string; name?: string }>();
  const { answers, setAnswer } = useQuestionnaire();
  const [step, setStep] = useState(1);

  // Multi-select states
  const [selectedDebts, setSelectedDebts] = useState<string[]>(answers.currentDebts || []);
  const [selectedAssets, setSelectedAssets] = useState<string[]>(answers.assetClasses || []);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(answers.industriesInterested || []);

  useEffect(() => {
    if (params.symbol && params.name) {
      setAnswer('selectedAsset', { symbol: params.symbol, name: params.name });
    }
  }, [params.symbol, params.name]);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  const handleNext = () => {
    if (step < TOTAL_QUESTIONS) {
      setStep(step + 1);
    } else {
      // Complete questionnaire
      setAnswer('completedAt', new Date().toISOString());
      router.push('/investor-results');
    }
  };

  const handleSingleSelect = (key: string, value: string) => {
    setAnswer(key as any, value);
    setTimeout(handleNext, 300);
  };

  const toggleDebt = (value: string) => {
    const updated = selectedDebts.includes(value)
      ? selectedDebts.filter(d => d !== value)
      : [...selectedDebts, value];
    setSelectedDebts(updated);
    setAnswer('currentDebts', updated);
  };

  const toggleAsset = (value: string) => {
    const updated = selectedAssets.includes(value)
      ? selectedAssets.filter(a => a !== value)
      : [...selectedAssets, value];
    setSelectedAssets(updated);
    setAnswer('assetClasses', updated);
  };

  const toggleIndustry = (value: string) => {
    const updated = selectedIndustries.includes(value)
      ? selectedIndustries.filter(i => i !== value)
      : [...selectedIndustries, value];
    setSelectedIndustries(updated);
    setAnswer('industriesInterested', updated);
  };

  const renderQuestion = () => {
    switch (step) {
      // Question 1: Gender
      case 1:
        return (
          <SingleChoiceGrid
            title="What is your gender?"
            options={[
              { label: 'Male', value: 'male', icon: '👨' },
              { label: 'Female', value: 'female', icon: '👩' },
            ]}
            selectedValue={answers.gender}
            onSelect={(v) => handleSingleSelect('gender', v)}
          />
        );

      // Question 2: Age
      case 2:
        return (
          <SingleChoiceCard
            title="What is your age?"
            options={[
              { label: 'Under 30', value: '<30', icon: '🧑' },
              { label: '30 - 39', value: '30-39', icon: '👨' },
              { label: '40 - 49', value: '40-49', icon: '👨‍💼' },
              { label: '50 - 59', value: '50-59', icon: '👴' },
              { label: '60+', value: '60+', icon: '🧓' },
            ]}
            selectedValue={answers.ageRange}
            onSelect={(v) => handleSingleSelect('ageRange', v)}
          />
        );

      // Question 3: Education
      case 3:
        return (
          <SingleChoiceCard
            title="What is your education level?"
            options={[
              { label: 'High school or below', value: 'high_school', icon: '📚' },
              { label: 'University degree', value: 'university', icon: '🎓' },
              { label: 'Postgraduate studies', value: 'postgraduate', icon: '🎯' },
            ]}
            selectedValue={answers.educationLevel}
            onSelect={(v) => handleSingleSelect('educationLevel', v)}
          />
        );

      // Question 4: Monthly Income
      case 4:
        return (
          <SingleChoiceCard
            title="What is your monthly income?"
            options={[
              { label: 'Less than $5,000', value: '<5k', icon: '💵' },
              { label: '$5,000 – $10,000', value: '5k-10k', icon: '💰' },
              { label: '$10,000 – $25,000', value: '10k-25k', icon: '💎' },
              { label: 'More than $25,000', value: '>25k', icon: '🏆' },
            ]}
            selectedValue={answers.monthlyIncome}
            onSelect={(v) => handleSingleSelect('monthlyIncome', v)}
          />
        );

      // Question 5: Income Stability
      case 5:
        return (
          <SingleChoiceCard
            title="How stable is your income?"
            options={[
              { label: 'Not stable', value: 'not_stable', icon: '🔴' },
              { label: 'Stable', value: 'stable', icon: '🟡' },
              { label: 'Very stable', value: 'very_stable', icon: '🟢' },
            ]}
            selectedValue={answers.incomeStability}
            onSelect={(v) => handleSingleSelect('incomeStability', v)}
          />
        );

      // Question 6: Income Source
      case 6:
        return (
          <SingleChoiceGrid
            title="What is your current income source?"
            options={[
              { label: 'Employee', value: 'employee', icon: '💼' },
              { label: 'Business Owner', value: 'business_owner', icon: '🏢' },
              { label: 'Retired', value: 'retired', icon: '🌴' },
              { label: 'Student', value: 'student', icon: '🎓' },
            ]}
            selectedValue={answers.incomeSource}
            onSelect={(v) => handleSingleSelect('incomeSource', v)}
          />
        );

      // Question 7: Current Debts (Multi-select)
      case 7:
        return (
          <MultiSelectChips
            title="Do you currently have any debts?"
            options={[
              { label: 'Mortgage', value: 'mortgage', icon: '🏠' },
              { label: 'Auto loan', value: 'auto_loan', icon: '🚗' },
              { label: 'Student loan', value: 'student_loan', icon: '🎓' },
              { label: 'Credit card debt', value: 'credit_card', icon: '💳' },
              { label: 'No debts', value: 'no_debts', icon: '✅' },
            ]}
            selectedValues={selectedDebts}
            onToggle={toggleDebt}
            onContinue={handleNext}
          />
        );

      // Question 8: Investment Account
      case 8:
        return (
          <SingleChoiceCard
            title="Do you have an investment account?"
            options={[
              { label: 'Yes', value: 'yes', icon: '✅' },
              { label: 'No', value: 'no', icon: '❌' },
              { label: 'Planning to open one soon', value: 'planning', icon: '📋' },
            ]}
            selectedValue={answers.hasInvestmentAccount}
            onSelect={(v) => handleSingleSelect('hasInvestmentAccount', v)}
          />
        );

      // Question 9: Portfolio Size
      case 9:
        return (
          <SingleChoiceCard
            title="What is the size of your current investment portfolio?"
            options={[
              { label: 'Less than $10,000', value: '<10k', icon: '🪙' },
              { label: '$10,000 – $25,000', value: '10k-25k', icon: '💰' },
              { label: '$25,000 – $100,000', value: '25k-100k', icon: '💎' },
              { label: '$100,000 – $1M', value: '100k-1m', icon: '🏆' },
              { label: 'More than $1M', value: '>1m', icon: '👑' },
            ]}
            selectedValue={answers.portfolioSize}
            onSelect={(v) => handleSingleSelect('portfolioSize', v)}
          />
        );

      // Question 10: Investment Knowledge
      case 10:
        return (
          <SingleChoiceCard
            title="How much do you know about investing?"
            options={[
              { label: 'Nothing at all', value: 'nothing', icon: '🌱' },
              { label: 'A little knowledge', value: 'little', icon: '📖' },
              { label: 'Good knowledge', value: 'good', icon: '🧠' },
              { label: 'Expert level', value: 'expert', icon: '🎯' },
            ]}
            selectedValue={answers.investmentKnowledge}
            onSelect={(v) => handleSingleSelect('investmentKnowledge', v)}
          />
        );

      // Question 11: Asset Classes (Multi-select)
      case 11:
        return (
          <MultiSelectChips
            title="Which asset classes have you invested in before?"
            options={[
              { label: 'Stocks', value: 'stocks', icon: '📈' },
              { label: 'ETFs', value: 'etfs', icon: '📊' },
              { label: 'Crypto', value: 'crypto', icon: '₿' },
              { label: 'Bonds', value: 'bonds', icon: '📜' },
              { label: 'Real Estate', value: 'real_estate', icon: '🏢' },
              { label: 'None', value: 'none', icon: '🚫' },
            ]}
            selectedValues={selectedAssets}
            onToggle={toggleAsset}
            onContinue={handleNext}
          />
        );

      // Question 12: Investing Goal
      case 12:
        return (
          <SingleChoiceGrid
            title="What is your main goal from investing?"
            options={[
              { label: 'Capital growth', value: 'growth', icon: '📈' },
              { label: 'Extra income', value: 'income', icon: '💰' },
              { label: 'Capital protection', value: 'protection', icon: '🛡️' },
            ]}
            selectedValue={answers.investingGoal}
            onSelect={(v) => handleSingleSelect('investingGoal', v)}
            columns={3}
          />
        );

      // Question 13: Investment Timeline
      case 13:
        return (
          <SingleChoiceCard
            title="When will you need the invested money?"
            options={[
              { label: 'Less than 3 years', value: '<3y', icon: '⏰' },
              { label: '3 – 5 years', value: '3-5y', icon: '📅' },
              { label: 'More than 5 years', value: '>5y', icon: '🗓️' },
            ]}
            selectedValue={answers.investmentTimeline}
            onSelect={(v) => handleSingleSelect('investmentTimeline', v)}
          />
        );

      // Question 14: Portfolio Drop Response
      case 14:
        return (
          <SingleChoiceGrid
            title="If your portfolio dropped 20%, what would you do?"
            options={[
              { label: 'Sell immediately', value: 'sell', icon: '😰' },
              { label: 'Reduce and wait', value: 'reduce', icon: '😐' },
              { label: 'Do nothing', value: 'nothing', icon: '😎' },
              { label: 'Buy more', value: 'buy_more', icon: '💪' },
            ]}
            selectedValue={answers.portfolioDropResponse}
            onSelect={(v) => handleSingleSelect('portfolioDropResponse', v)}
          />
        );

      // Question 15: Market Fluctuations
      case 15:
        return (
          <SingleChoiceCard
            title="How do market fluctuations affect you?"
            options={[
              { label: 'I worry too much', value: 'worry_too_much', icon: '😟' },
              { label: 'I worry sometimes', value: 'worry_sometimes', icon: '😐' },
              { label: "I don't worry at all", value: 'no_worry', icon: '😌' },
            ]}
            selectedValue={answers.marketFluctuationImpact}
            onSelect={(v) => handleSingleSelect('marketFluctuationImpact', v)}
          />
        );

      // Question 16: Risk Tolerance
      case 16:
        return (
          <SingleChoiceCard
            title="What is your risk tolerance?"
            options={[
              { label: 'Low', value: 'low', icon: '🟢' },
              { label: 'Medium', value: 'medium', icon: '🟡' },
              { label: 'High', value: 'high', icon: '🔴' },
            ]}
            selectedValue={answers.riskTolerance}
            onSelect={(v) => handleSingleSelect('riskTolerance', v)}
          />
        );

      // Question 17: Risk Attitude
      case 17:
        return (
          <SingleChoiceCard
            title="What is your attitude towards investment risk?"
            options={[
              { label: 'Seek highest returns even with high risk', value: 'seek_highest', icon: '🚀' },
              { label: 'Accept moderate risk for better returns', value: 'accept_moderate', icon: '⚖️' },
              { label: 'Prefer safety even with lower returns', value: 'prefer_safety', icon: '🛡️' },
            ]}
            selectedValue={answers.riskAttitude}
            onSelect={(v) => handleSingleSelect('riskAttitude', v)}
          />
        );

      // Question 18: Financial Stress
      case 18:
        return (
          <SingleChoiceGrid
            title="How often do you feel stressed about your financial situation?"
            options={[
              { label: 'Most of the time', value: 'most_time', icon: '🤕' },
              { label: 'Always', value: 'always', icon: '😫' },
              { label: 'Rarely', value: 'rarely', icon: '😌' },
              { label: 'Sometimes', value: 'sometimes', icon: '😐' },
            ]}
            selectedValue={answers.financialStressFrequency}
            onSelect={(v) => handleSingleSelect('financialStressFrequency', v)}
          />
        );

      // Question 19: Retirement Planning
      case 19:
        return (
          <SingleChoiceCard
            title="Do you plan for your retirement?"
            options={[
              { label: 'Not yet, but I want to', value: 'not_yet', icon: '🤔' },
              { label: 'I save regularly for retirement', value: 'save_regularly', icon: '🐷' },
              { label: 'Relying on pension fund', value: 'rely_pension', icon: '🏦' },
            ]}
            selectedValue={answers.retirementPlanning}
            onSelect={(v) => handleSingleSelect('retirementPlanning', v)}
          />
        );

      // Question 20: Saving Habit
      case 20:
        return (
          <SingleChoiceGrid
            title="Do you have a habit of saving money?"
            options={[
              { label: "I want to save but I can't", value: 'want_but_cant', icon: '😔' },
              { label: "I don't save", value: 'dont_save', icon: '🙈' },
              { label: 'I save regularly', value: 'save_regularly', icon: '💪' },
              { label: 'I save sometimes', value: 'save_sometimes', icon: '🤷' },
            ]}
            selectedValue={answers.savingHabit}
            onSelect={(v) => handleSingleSelect('savingHabit', v)}
          />
        );

      // Question 21: Industries Interested (Multi-select)
      case 21:
        return (
          <MultiSelectChips
            title="Choose the industries you are interested in"
            options={[
              { label: 'Tech (Apple, Microsoft, Google)', value: 'tech', icon: '💻' },
              { label: 'Electric Vehicles (Tesla)', value: 'ev', icon: '🚗' },
              { label: 'Energy (Shell, Exxon)', value: 'energy', icon: '⚡' },
              { label: 'Healthcare (Pfizer)', value: 'healthcare', icon: '💊' },
              { label: "Retail (Amazon, McDonald's)", value: 'retail', icon: '🛒' },
              { label: 'Crypto (Bitcoin)', value: 'crypto', icon: '₿' },
            ]}
            selectedValues={selectedIndustries}
            onToggle={toggleIndustry}
            onContinue={handleNext}
          />
        );

      // Question 22: Quantrock Goal
      case 22:
        return (
          <SingleChoiceGrid
            title="What is your main goal in trying Quantrock?"
            options={[
              { label: 'Join the challenge', value: 'challenge', icon: '🏆' },
              { label: 'Prepare for real trading', value: 'prepare_trading', icon: '📊' },
              { label: 'Test my own strategy', value: 'test_strategy', icon: '🎯' },
              { label: 'Learn and build skills', value: 'learn', icon: '📚' },
            ]}
            selectedValue={answers.quantrockGoal}
            onSelect={(v) => handleSingleSelect('quantrockGoal', v)}
          />
        );

      // Question 23: Preferred Demo Portfolio Size
      case 23:
        return (
          <SingleChoiceCard
            title="What is your preferred demo portfolio size?"
            options={[
              { label: '$1,000', value: '1k', icon: '💵' },
              { label: '$10,000', value: '10k', icon: '💰' },
              { label: '$25,000', value: '25k', icon: '💎' },
              { label: '$50,000', value: '50k', icon: '🏆' },
              { label: '$100,000', value: '100k', icon: '👑' },
            ]}
            selectedValue={answers.preferredPortfolioSize}
            onSelect={(v) => handleSingleSelect('preferredPortfolioSize', v)}
          />
        );

      // Question 24: Investment Readiness
      case 24:
        return (
          <RatingScale
            title="Rate your readiness to invest"
            leftLabel="Totally prepared"
            rightLabel="I need more information"
            selectedValue={answers.investmentReadiness}
            onSelect={(v) => setAnswer('investmentReadiness', v as any)}
            onContinue={handleNext}
          />
        );

      // Question 25: Passive Income Knowledge
      case 25:
        return (
          <RatingScale
            title="Rate your knowledge about passive income"
            leftLabel="Totally prepared"
            rightLabel="I need more information"
            selectedValue={answers.passiveIncomeKnowledge}
            onSelect={(v) => setAnswer('passiveIncomeKnowledge', v as any)}
            onContinue={handleNext}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <QuestionHeader
        step={step}
        total={TOTAL_QUESTIONS}
        onBack={handleBack}
        onSkip={handleSkip}
        showBack={step > 1}
      />
      <AnimatedProgressBar step={step} total={TOTAL_QUESTIONS} />
      <Animated.View
        key={step}
        style={styles.questionContainer}
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(200)}
      >
        {renderQuestion()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  questionContainer: {
    flex: 1,
  },
});
