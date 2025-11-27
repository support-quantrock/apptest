// Task components for the curriculum system
// All 11 interactive task types

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Slider from '@react-native-community/slider';

import type {
  TaskComponentProps,
  CoinFlipConfig,
  MultipleChoiceConfig,
  TrueFalseConfig,
  DragAndDropConfig,
  MatchingConfig,
  SliderConfig,
  SortingConfig,
  PricePredictionConfig,
  ChartInteractionConfig,
  SimulationConfig,
  FillBlankConfig,
  // New game types for Day 2 Mindset Day
  MasterLockConfig,
  ArrowPrecisionConfig,
  PuzzleRevealConfig,
  TimeAttackConfig,
  BuildModeConfig,
  MysteryBoxConfig,
  ShootHitConfig,
  KnowledgeRaceConfig,
  MindLockConfig,
  FinalPrecisionConfig,
} from '../../types/curriculum';

import {
  DynamicIcon,
  TaskFeedbackDisplay,
  GameHeader,
  PulsingElement,
} from './shared';

// ==================== 1. COIN FLIP TASK ====================

export const CoinFlipTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<CoinFlipConfig>) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const handleFlip = () => {
    if (isFlipping || isFlipped) return;
    setIsFlipping(true);

    Animated.sequence([
      Animated.timing(flipAnim, {
        toValue: 6,
        duration: 1500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsFlipped(true);
      setIsFlipping(false);

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
      ]).start();
    });
  };

  const handleContinue = () => {
    onComplete({ correct: true, response: 'flipped' });
  };

  const rotateY = flipAnim.interpolate({
    inputRange: [0, 6],
    outputRange: ['0deg', '2160deg'],
  });

  return (
    <View style={styles.taskWrapper}>
      <GameHeader title="FLIP TO REVEAL" icon="Coins" />

      <Text style={styles.instruction}>{config.instruction}</Text>

      <View style={styles.coinContainer}>
        <Animated.View
          style={[
            styles.coin,
            {
              transform: [{ rotateY }, { scale: bounceAnim }],
            },
          ]}
        >
          <View style={styles.coinInner}>
            <Text style={styles.coinText}>{isFlipped ? '!' : '?'}</Text>
          </View>
        </Animated.View>
      </View>

      {isFlipped && (
        <View style={styles.revealContainer}>
          <Text style={styles.revealText}>{config.revealText}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.actionButton, (isFlipping || isFlipped) && styles.actionButtonDisabled]}
        onPress={isFlipped ? handleContinue : handleFlip}
        disabled={isFlipping}
      >
        <Text style={styles.actionButtonText}>
          {isFlipping ? 'FLIPPING...' : isFlipped ? 'CONTINUE →' : 'FLIP COIN'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ==================== 2. MULTIPLE CHOICE TASK ====================

export const MultipleChoiceTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<MultipleChoiceConfig>) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedIndex(index);
    setShowFeedback(true);

    setTimeout(() => {
      onComplete({
        correct: index === config.correctIndex,
        response: config.options[index],
      });
    }, 2000);
  };

  const isCorrect = selectedIndex === config.correctIndex;

  return (
    <View style={styles.taskWrapper}>
      <Text style={styles.question}>{config.question}</Text>

      <View style={styles.optionsContainer}>
        {config.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrectOption = index === config.correctIndex;
          const showCorrect = showFeedback && isCorrectOption;
          const showIncorrect = showFeedback && isSelected && !isCorrectOption;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                isSelected && styles.optionButtonSelected,
                showCorrect && styles.optionButtonCorrect,
                showIncorrect && styles.optionButtonIncorrect,
              ]}
              onPress={() => handleSelect(index)}
              disabled={showFeedback}
            >
              <View style={styles.optionIndex}>
                <Text style={styles.optionIndexText}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>
              {showCorrect && (
                <DynamicIcon name="CheckCircle" size={20} color="#22c55e" />
              )}
              {showIncorrect && (
                <DynamicIcon name="XCircle" size={20} color="#ef4444" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={isCorrect}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 3. TRUE/FALSE TASK ====================

export const TrueFalseTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<TrueFalseConfig>) => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (answer: boolean) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    setTimeout(() => {
      onComplete({
        correct: answer === config.correctAnswer,
        response: answer,
      });
    }, 2000);
  };

  const isCorrect = selectedAnswer === config.correctAnswer;

  return (
    <View style={styles.taskWrapper}>
      <View style={styles.statementContainer}>
        <DynamicIcon name="Quote" size={24} color="#5b5fff" />
        <Text style={styles.statement}>{config.statement}</Text>
      </View>

      <View style={styles.trueFalseButtons}>
        <TouchableOpacity
          style={[
            styles.trueFalseButton,
            styles.trueButton,
            selectedAnswer === true && styles.trueFalseButtonSelected,
            showFeedback && config.correctAnswer === true && styles.trueFalseButtonCorrect,
            showFeedback && selectedAnswer === true && !isCorrect && styles.trueFalseButtonIncorrect,
          ]}
          onPress={() => handleSelect(true)}
          disabled={showFeedback}
        >
          <DynamicIcon name="Check" size={24} color={selectedAnswer === true ? '#fff' : '#22c55e'} />
          <Text
            style={[
              styles.trueFalseText,
              selectedAnswer === true && styles.trueFalseTextSelected,
            ]}
          >
            True
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.trueFalseButton,
            styles.falseButton,
            selectedAnswer === false && styles.trueFalseButtonSelected,
            showFeedback && config.correctAnswer === false && styles.trueFalseButtonCorrect,
            showFeedback && selectedAnswer === false && !isCorrect && styles.trueFalseButtonIncorrect,
          ]}
          onPress={() => handleSelect(false)}
          disabled={showFeedback}
        >
          <DynamicIcon name="X" size={24} color={selectedAnswer === false ? '#fff' : '#ef4444'} />
          <Text
            style={[
              styles.trueFalseText,
              selectedAnswer === false && styles.trueFalseTextSelected,
            ]}
          >
            False
          </Text>
        </TouchableOpacity>
      </View>

      {showFeedback && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>{config.explanation}</Text>
        </View>
      )}

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={isCorrect}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 4. DRAG AND DROP TASK ====================

export const DragAndDropTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<DragAndDropConfig>) => {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const unplacedItems = config.items.filter(
    (item) => !Object.values(placements).includes(item.id)
  );

  const handlePlaceItem = (targetId: string, itemId: string) => {
    setPlacements((prev) => ({ ...prev, [targetId]: itemId }));
  };

  const handleRemoveItem = (targetId: string) => {
    setPlacements((prev) => {
      const newPlacements = { ...prev };
      delete newPlacements[targetId];
      return newPlacements;
    });
  };

  const handleSubmit = () => {
    // Check if all targets are correctly filled
    const isCorrect = config.targets.every((target) => {
      const placedItemId = placements[target.id];
      return target.acceptsIds.includes(placedItemId);
    });

    setShowFeedback(true);

    setTimeout(() => {
      onComplete({ correct: isCorrect, response: placements });
    }, 2000);
  };

  const allPlaced = Object.keys(placements).length === config.targets.length;
  const isCorrect = config.targets.every((target) => {
    const placedItemId = placements[target.id];
    return target.acceptsIds.includes(placedItemId);
  });

  return (
    <View style={styles.taskWrapper}>
      <Text style={styles.instruction}>{config.instruction}</Text>

      {/* Available items */}
      <View style={styles.dragItemsContainer}>
        {unplacedItems.map((item) => (
          <View key={item.id} style={styles.dragItem}>
            {item.icon && <DynamicIcon name={item.icon} size={16} color="#5b5fff" />}
            <Text style={styles.dragItemText}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Drop targets */}
      <View style={styles.dropTargetsContainer}>
        {config.targets.map((target) => {
          const placedItem = config.items.find((i) => i.id === placements[target.id]);
          const isTargetCorrect = showFeedback && target.acceptsIds.includes(placements[target.id]);
          const isTargetIncorrect = showFeedback && placements[target.id] && !target.acceptsIds.includes(placements[target.id]);

          return (
            <View key={target.id} style={styles.dropTargetRow}>
              <Text style={styles.dropTargetLabel}>{target.label}</Text>
              <TouchableOpacity
                style={[
                  styles.dropZone,
                  placedItem && styles.dropZoneFilled,
                  isTargetCorrect && styles.dropZoneCorrect,
                  isTargetIncorrect && styles.dropZoneIncorrect,
                ]}
                onPress={() => {
                  if (placedItem) {
                    handleRemoveItem(target.id);
                  } else if (unplacedItems.length > 0) {
                    handlePlaceItem(target.id, unplacedItems[0].id);
                  }
                }}
                disabled={showFeedback}
              >
                {placedItem ? (
                  <View style={styles.placedItem}>
                    {placedItem.icon && <DynamicIcon name={placedItem.icon} size={16} color="#fff" />}
                    <Text style={styles.placedItemText}>{placedItem.label}</Text>
                  </View>
                ) : (
                  <Text style={styles.dropZonePlaceholder}>Tap to place</Text>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {!showFeedback && (
        <TouchableOpacity
          style={[styles.actionButton, !allPlaced && styles.actionButtonDisabled]}
          onPress={handleSubmit}
          disabled={!allPlaced}
        >
          <Text style={styles.actionButtonText}>CHECK ANSWER</Text>
        </TouchableOpacity>
      )}

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={isCorrect}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 5. MATCHING TASK ====================

export const MatchingTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<MatchingConfig>) => {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const handleLeftSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedLeft(index);
  };

  const handleRightSelect = (index: number) => {
    if (showFeedback || selectedLeft === null) return;
    setMatches((prev) => ({ ...prev, [selectedLeft]: index }));
    setSelectedLeft(null);
  };

  const handleSubmit = () => {
    const isCorrect = config.pairs.every((_, index) => matches[index] === index);
    setShowFeedback(true);

    setTimeout(() => {
      onComplete({ correct: isCorrect, response: matches });
    }, 2000);
  };

  const allMatched = Object.keys(matches).length === config.pairs.length;
  const isCorrect = config.pairs.every((_, index) => matches[index] === index);

  // Shuffle right side indices for display
  const shuffledRightIndices = useRef(
    [...Array(config.pairs.length).keys()].sort(() => Math.random() - 0.5)
  ).current;

  return (
    <View style={styles.taskWrapper}>
      <Text style={styles.instruction}>{config.instruction}</Text>

      <View style={styles.matchingContainer}>
        {/* Left column */}
        <View style={styles.matchingColumn}>
          {config.pairs.map((pair, index) => {
            const isMatched = matches[index] !== undefined;
            const isSelected = selectedLeft === index;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.matchingItem,
                  isSelected && styles.matchingItemSelected,
                  isMatched && styles.matchingItemMatched,
                ]}
                onPress={() => handleLeftSelect(index)}
                disabled={showFeedback || isMatched}
              >
                <Text style={styles.matchingItemText}>{pair.left}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Right column */}
        <View style={styles.matchingColumn}>
          {shuffledRightIndices.map((originalIndex) => {
            const pair = config.pairs[originalIndex];
            const isMatched = Object.values(matches).includes(originalIndex);
            const matchedFromIndex = Object.entries(matches).find(
              ([, v]) => v === originalIndex
            )?.[0];

            return (
              <TouchableOpacity
                key={originalIndex}
                style={[
                  styles.matchingItem,
                  styles.matchingItemRight,
                  isMatched && styles.matchingItemMatched,
                  showFeedback && matchedFromIndex !== undefined &&
                    Number(matchedFromIndex) === originalIndex && styles.matchingItemCorrect,
                  showFeedback && matchedFromIndex !== undefined &&
                    Number(matchedFromIndex) !== originalIndex && styles.matchingItemIncorrect,
                ]}
                onPress={() => handleRightSelect(originalIndex)}
                disabled={showFeedback || isMatched}
              >
                <Text style={styles.matchingItemText}>{pair.right}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {!showFeedback && (
        <TouchableOpacity
          style={[styles.actionButton, !allMatched && styles.actionButtonDisabled]}
          onPress={handleSubmit}
          disabled={!allMatched}
        >
          <Text style={styles.actionButtonText}>CHECK MATCHES</Text>
        </TouchableOpacity>
      )}

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={isCorrect}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 6. SLIDER TASK ====================

export const SliderTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<SliderConfig>) => {
  const [value, setValue] = useState((config.min + config.max) / 2);
  const [showReveal, setShowReveal] = useState(false);

  const handleSubmit = () => {
    setShowReveal(true);
  };

  const handleContinue = () => {
    onComplete({ correct: true, response: value });
  };

  return (
    <View style={styles.taskWrapper}>
      <GameHeader title="SET THE VALUE" icon="Sliders" />

      <Text style={styles.question}>{config.question}</Text>

      <Text style={styles.sliderValue}>
        {typeof value === 'number' && value >= 1000
          ? `$${value.toLocaleString()}`
          : value}
      </Text>

      <Slider
        style={styles.slider}
        minimumValue={config.min}
        maximumValue={config.max}
        step={config.step}
        value={value}
        onValueChange={setValue}
        minimumTrackTintColor="#5b5fff"
        maximumTrackTintColor="#3a3f5c"
        thumbTintColor="#5b5fff"
        disabled={showReveal}
      />

      <View style={styles.sliderLabels}>
        {config.labels.map((label, index) => (
          <Text key={index} style={styles.sliderLabel}>
            {label}
          </Text>
        ))}
      </View>

      {showReveal && (
        <View style={styles.revealContainer}>
          <Text style={styles.revealText}>{config.revealAnswer}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.actionButton}
        onPress={showReveal ? handleContinue : handleSubmit}
      >
        <Text style={styles.actionButtonText}>
          {showReveal ? 'CONTINUE →' : 'REVEAL ANSWER'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ==================== 7. SORTING TASK ====================

export const SortingTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<SortingConfig>) => {
  const [items, setItems] = useState([...config.items].sort(() => Math.random() - 0.5));
  const [showFeedback, setShowFeedback] = useState(false);

  const moveItem = (fromIndex: number, direction: 'up' | 'down') => {
    if (showFeedback) return;
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= items.length) return;

    const newItems = [...items];
    [newItems[fromIndex], newItems[toIndex]] = [newItems[toIndex], newItems[fromIndex]];
    setItems(newItems);
  };

  const handleSubmit = () => {
    const isCorrect = items.every((item, index) => item === config.correctOrder[index]);
    setShowFeedback(true);

    setTimeout(() => {
      onComplete({ correct: isCorrect, response: items });
    }, 2000);
  };

  const isCorrect = items.every((item, index) => item === config.correctOrder[index]);

  return (
    <View style={styles.taskWrapper}>
      <Text style={styles.instruction}>{config.instruction}</Text>

      <View style={styles.sortingContainer}>
        {items.map((item, index) => {
          const correctIndex = config.correctOrder.indexOf(item);
          const isInCorrectPosition = showFeedback && index === correctIndex;
          const isInWrongPosition = showFeedback && index !== correctIndex;

          return (
            <View
              key={item}
              style={[
                styles.sortingItem,
                isInCorrectPosition && styles.sortingItemCorrect,
                isInWrongPosition && styles.sortingItemIncorrect,
              ]}
            >
              <Text style={styles.sortingNumber}>{index + 1}</Text>
              <Text style={styles.sortingText}>{item}</Text>
              {!showFeedback && (
                <View style={styles.sortingButtons}>
                  <TouchableOpacity
                    style={styles.sortingArrow}
                    onPress={() => moveItem(index, 'up')}
                    disabled={index === 0}
                  >
                    <DynamicIcon
                      name="ChevronUp"
                      size={20}
                      color={index === 0 ? '#3a3f5c' : '#5b5fff'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.sortingArrow}
                    onPress={() => moveItem(index, 'down')}
                    disabled={index === items.length - 1}
                  >
                    <DynamicIcon
                      name="ChevronDown"
                      size={20}
                      color={index === items.length - 1 ? '#3a3f5c' : '#5b5fff'}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {!showFeedback && (
        <TouchableOpacity style={styles.actionButton} onPress={handleSubmit}>
          <Text style={styles.actionButtonText}>CHECK ORDER</Text>
        </TouchableOpacity>
      )}

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={isCorrect}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 8. PRICE PREDICTION TASK ====================

export const PricePredictionTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<PricePredictionConfig>) => {
  const [selectedAnswer, setSelectedAnswer] = useState<'UP' | 'DOWN' | 'SIDEWAYS' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (answer: 'UP' | 'DOWN' | 'SIDEWAYS') => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    setTimeout(() => {
      onComplete({
        correct: answer === config.correctAnswer,
        response: answer,
      });
    }, 2000);
  };

  const isCorrect = selectedAnswer === config.correctAnswer;

  const getIconName = (direction: 'UP' | 'DOWN' | 'SIDEWAYS') => {
    switch (direction) {
      case 'UP':
        return 'TrendingUp';
      case 'DOWN':
        return 'TrendingDown';
      case 'SIDEWAYS':
        return 'ArrowRight';
    }
  };

  const getColor = (direction: 'UP' | 'DOWN' | 'SIDEWAYS') => {
    switch (direction) {
      case 'UP':
        return '#22c55e';
      case 'DOWN':
        return '#ef4444';
      case 'SIDEWAYS':
        return '#f59e0b';
    }
  };

  return (
    <View style={styles.taskWrapper}>
      <GameHeader title="PREDICT" icon="Target" />

      <View style={styles.scenarioContainer}>
        <Text style={styles.scenarioText}>{config.scenario}</Text>
      </View>

      <Text style={styles.question}>{config.question}</Text>

      <View style={styles.predictionButtons}>
        {config.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = option === config.correctAnswer;
          const showCorrect = showFeedback && isCorrectOption;
          const showIncorrect = showFeedback && isSelected && !isCorrectOption;

          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.predictionButton,
                { borderColor: getColor(option) },
                isSelected && { backgroundColor: getColor(option) },
                showCorrect && styles.predictionButtonCorrect,
                showIncorrect && styles.predictionButtonIncorrect,
              ]}
              onPress={() => handleSelect(option)}
              disabled={showFeedback}
            >
              <DynamicIcon
                name={getIconName(option)}
                size={28}
                color={isSelected ? '#fff' : getColor(option)}
              />
              <Text
                style={[
                  styles.predictionText,
                  { color: isSelected ? '#fff' : getColor(option) },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {showFeedback && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>{config.explanation}</Text>
        </View>
      )}

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={isCorrect}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 9. CHART INTERACTION TASK ====================

export const ChartInteractionTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<ChartInteractionConfig>) => {
  const [selectedMarkers, setSelectedMarkers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleMarkerPress = (index: number) => {
    if (showFeedback) return;
    if (selectedMarkers.includes(index)) {
      setSelectedMarkers(selectedMarkers.filter((i) => i !== index));
    } else {
      setSelectedMarkers([...selectedMarkers, index]);
    }
  };

  const handleSubmit = () => {
    const correctMarkers = config.markers
      .map((m, i) => (m.correct ? i : -1))
      .filter((i) => i !== -1);

    const isCorrect =
      selectedMarkers.length === correctMarkers.length &&
      selectedMarkers.every((i) => correctMarkers.includes(i));

    setShowFeedback(true);

    setTimeout(() => {
      onComplete({ correct: isCorrect, response: selectedMarkers });
    }, 2000);
  };

  const correctMarkers = config.markers
    .map((m, i) => (m.correct ? i : -1))
    .filter((i) => i !== -1);

  const isCorrect =
    selectedMarkers.length === correctMarkers.length &&
    selectedMarkers.every((i) => correctMarkers.includes(i));

  return (
    <View style={styles.taskWrapper}>
      <Text style={styles.instruction}>{config.instruction}</Text>

      {/* Simple chart representation */}
      <View style={styles.chartContainer}>
        <View style={styles.chartArea}>
          {config.markers.map((marker, index) => {
            const isSelected = selectedMarkers.includes(index);
            const isCorrectMarker = marker.correct;
            const showCorrect = showFeedback && isCorrectMarker;
            const showIncorrect = showFeedback && isSelected && !isCorrectMarker;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.chartMarker,
                  { left: `${marker.x}%`, top: `${marker.y}%` },
                  isSelected && styles.chartMarkerSelected,
                  showCorrect && styles.chartMarkerCorrect,
                  showIncorrect && styles.chartMarkerIncorrect,
                ]}
                onPress={() => handleMarkerPress(index)}
                disabled={showFeedback}
              >
                <Text style={styles.chartMarkerLabel}>{marker.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {!showFeedback && (
        <TouchableOpacity
          style={[
            styles.actionButton,
            selectedMarkers.length === 0 && styles.actionButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={selectedMarkers.length === 0}
        >
          <Text style={styles.actionButtonText}>CHECK SELECTION</Text>
        </TouchableOpacity>
      )}

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={isCorrect}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 10. SIMULATION TASK ====================

export const SimulationTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<SimulationConfig>) => {
  const [showResult, setShowResult] = useState(false);

  const handleStart = () => {
    setShowResult(true);
  };

  const handleContinue = () => {
    onComplete({ correct: true, response: 'completed' });
  };

  return (
    <View style={styles.taskWrapper}>
      <GameHeader title="SIMULATION" icon="Play" />

      <View style={styles.simulationContainer}>
        <View style={styles.assetCard}>
          <Text style={styles.assetName}>{config.asset}</Text>
          <Text style={styles.assetPrice}>${config.startPrice.toLocaleString()}</Text>
        </View>

        <Text style={styles.scenarioText}>{config.scenario}</Text>

        {showResult && (
          <View style={styles.simulationResult}>
            <View style={styles.resultArrow}>
              <DynamicIcon
                name={config.targetPrice > config.startPrice ? 'TrendingUp' : 'TrendingDown'}
                size={32}
                color={config.targetPrice > config.startPrice ? '#22c55e' : '#ef4444'}
              />
            </View>
            <Text style={styles.targetPrice}>${config.targetPrice.toLocaleString()}</Text>
          </View>
        )}
      </View>

      <Text style={styles.instruction}>{config.instruction}</Text>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={showResult ? handleContinue : handleStart}
      >
        <Text style={styles.actionButtonText}>
          {showResult ? 'CONTINUE →' : 'RUN SIMULATION'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ==================== 11. FILL BLANK TASK ====================

export const FillBlankTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<FillBlankConfig>) => {
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>(
    new Array(config.blanks.length).fill(null)
  );
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (showFeedback) return;
    const nextBlankIndex = selectedOptions.findIndex((o) => o === null);
    if (nextBlankIndex === -1) return;

    const newOptions = [...selectedOptions];
    newOptions[nextBlankIndex] = option;
    setSelectedOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    if (showFeedback) return;
    const newOptions = [...selectedOptions];
    newOptions[index] = null;
    setSelectedOptions(newOptions);
  };

  const handleSubmit = () => {
    const isCorrect = selectedOptions.every(
      (option, index) => option === config.blanks[index]
    );
    setShowFeedback(true);

    setTimeout(() => {
      onComplete({ correct: isCorrect, response: selectedOptions });
    }, 2000);
  };

  const allFilled = selectedOptions.every((o) => o !== null);
  const isCorrect = selectedOptions.every(
    (option, index) => option === config.blanks[index]
  );

  // Parse sentence to show blanks
  const renderSentence = () => {
    const parts = config.sentence.split('___');
    return (
      <View style={styles.sentenceContainer}>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <Text style={styles.sentenceText}>{part}</Text>
            {index < parts.length - 1 && (
              <TouchableOpacity
                style={[
                  styles.blankSlot,
                  selectedOptions[index] && styles.blankSlotFilled,
                  showFeedback &&
                    selectedOptions[index] === config.blanks[index] &&
                    styles.blankSlotCorrect,
                  showFeedback &&
                    selectedOptions[index] !== config.blanks[index] &&
                    styles.blankSlotIncorrect,
                ]}
                onPress={() => handleRemoveOption(index)}
                disabled={showFeedback || !selectedOptions[index]}
              >
                <Text
                  style={[
                    styles.blankText,
                    selectedOptions[index] && styles.blankTextFilled,
                  ]}
                >
                  {selectedOptions[index] || '___'}
                </Text>
              </TouchableOpacity>
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  const usedOptions = selectedOptions.filter((o) => o !== null);

  return (
    <View style={styles.taskWrapper}>
      <Text style={styles.instruction}>{config.instruction}</Text>

      {renderSentence()}

      <View style={styles.optionChips}>
        {config.options.map((option, index) => {
          const isUsed = usedOptions.includes(option);

          return (
            <TouchableOpacity
              key={index}
              style={[styles.optionChip, isUsed && styles.optionChipUsed]}
              onPress={() => handleOptionSelect(option)}
              disabled={showFeedback || isUsed}
            >
              <Text style={[styles.optionChipText, isUsed && styles.optionChipTextUsed]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {!showFeedback && (
        <TouchableOpacity
          style={[styles.actionButton, !allFilled && styles.actionButtonDisabled]}
          onPress={handleSubmit}
          disabled={!allFilled}
        >
          <Text style={styles.actionButtonText}>CHECK ANSWER</Text>
        </TouchableOpacity>
      )}

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={isCorrect}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 12. MASTER LOCK TASK (Day 2 Game 1) ====================

export const MasterLockTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<MasterLockConfig>) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [code, setCode] = useState<string[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const unlockAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handleAnswer = (digit: number, correct: boolean) => {
    if (correct) {
      const newCode = [...code, digit.toString()];
      setCode(newCode);

      if (currentQuestion < config.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // All questions answered correctly - unlock!
        setIsUnlocked(true);
        Animated.spring(unlockAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          setShowFeedback(true);
          setTimeout(() => {
            onComplete({ correct: true, response: newCode.join('') });
          }, 2000);
        }, 1000);
      }
    } else {
      // Wrong answer - shake animation
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  };

  const currentQ = config.questions[currentQuestion];
  const lockScale = unlockAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <View style={styles.taskWrapper}>
      <GameHeader title="🔐 MASTER LOCK" icon="Lock" />

      {/* Lock Display */}
      <Animated.View style={[styles.lockContainer, { transform: [{ translateX: shakeAnim }, { scale: lockScale }] }]}>
        <View style={styles.lockBody}>
          <View style={styles.codeDisplay}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={[styles.codeDigit, code[i] && styles.codeDigitFilled]}>
                <Text style={styles.codeDigitText}>{code[i] || '?'}</Text>
              </View>
            ))}
          </View>
          {isUnlocked && (
            <View style={styles.unlockBadge}>
              <DynamicIcon name="Unlock" size={32} color="#22c55e" />
            </View>
          )}
        </View>
      </Animated.View>

      {!isUnlocked && currentQ && (
        <View style={styles.questionSection}>
          <Text style={styles.arabicQuestion}>{currentQ.question}</Text>
          <View style={styles.optionsGrid}>
            {currentQ.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.lockOption}
                onPress={() => handleAnswer(option.digit, option.correct)}
              >
                <Text style={styles.lockOptionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={true}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 13. ARROW PRECISION TASK (Day 2 Game 2) ====================

export const ArrowPrecisionTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<ArrowPrecisionConfig>) => {
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [arrowPosition, setArrowPosition] = useState<number | null>(null);
  const arrowAnim = useRef(new Animated.Value(0)).current;

  const handleTargetSelect = (targetId: string, index: number) => {
    if (showFeedback) return;

    setSelectedTarget(targetId);
    setArrowPosition(index);

    // Arrow flying animation
    Animated.sequence([
      Animated.timing(arrowAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowFeedback(true);
      const target = config.targets.find(t => t.id === targetId);
      setTimeout(() => {
        onComplete({ correct: target?.correct || false, response: targetId });
      }, 2000);
    });
  };

  const arrowTranslate = arrowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -150],
  });

  const isCorrect = selectedTarget ? config.targets.find(t => t.id === selectedTarget)?.correct : false;

  return (
    <View style={styles.taskWrapper}>
      <GameHeader title="🎯 ARROW PRECISION" icon="Target" />

      <Text style={styles.arabicInstruction}>{config.instruction}</Text>

      {/* Targets */}
      <View style={styles.targetsRow}>
        {config.targets.map((target, index) => (
          <TouchableOpacity
            key={target.id}
            style={[
              styles.archeryTarget,
              selectedTarget === target.id && styles.archeryTargetSelected,
              showFeedback && target.correct && styles.archeryTargetCorrect,
              showFeedback && selectedTarget === target.id && !target.correct && styles.archeryTargetIncorrect,
            ]}
            onPress={() => handleTargetSelect(target.id, index)}
            disabled={showFeedback}
          >
            <View style={styles.targetRings}>
              <View style={styles.targetOuter} />
              <View style={styles.targetMiddle} />
              <View style={styles.targetInner} />
            </View>
            <Text style={styles.targetLabel}>{target.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Arrow */}
      {arrowPosition !== null && (
        <Animated.View style={[styles.arrowContainer, { transform: [{ translateY: arrowTranslate }] }]}>
          <DynamicIcon name="ArrowUp" size={48} color="#ffd166" />
        </Animated.View>
      )}

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={isCorrect || false}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 14. PUZZLE REVEAL TASK (Day 2 Game 3) ====================

export const PuzzleRevealTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<PuzzleRevealConfig>) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [revealedPieces, setRevealedPieces] = useState<boolean[]>(Array(config.totalPieces).fill(false));
  const [showFeedback, setShowFeedback] = useState(false);
  const [allRevealed, setAllRevealed] = useState(false);

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === config.questions[currentQuestion].correctIndex;

    if (isCorrect) {
      const newRevealed = [...revealedPieces];
      newRevealed[currentQuestion] = true;
      setRevealedPieces(newRevealed);

      if (currentQuestion < config.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setAllRevealed(true);
        setShowFeedback(true);
        setTimeout(() => {
          onComplete({ correct: true, response: 'puzzle_complete' });
        }, 2000);
      }
    }
  };

  const currentQ = config.questions[currentQuestion];

  return (
    <View style={styles.taskWrapper}>
      <GameHeader title="🧩 PUZZLE REVEAL" icon="Puzzle" />

      <Text style={styles.arabicInstruction}>{config.instruction}</Text>

      {/* Puzzle Grid */}
      <View style={styles.puzzleGrid}>
        {Array(config.totalPieces).fill(0).map((_, index) => (
          <View
            key={index}
            style={[
              styles.puzzlePiece,
              revealedPieces[index] && styles.puzzlePieceRevealed,
            ]}
          >
            {revealedPieces[index] ? (
              <DynamicIcon name="CheckCircle" size={24} color="#22c55e" />
            ) : (
              <Text style={styles.puzzlePieceText}>?</Text>
            )}
          </View>
        ))}
      </View>

      {!allRevealed && currentQ && (
        <View style={styles.questionSection}>
          <Text style={styles.arabicQuestion}>{currentQ.question}</Text>
          <View style={styles.optionsContainer}>
            {currentQ.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.puzzleOption}
                onPress={() => handleAnswer(index)}
              >
                <Text style={styles.puzzleOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={true}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 15. TIME ATTACK TASK (Day 2 Game 4) ====================

export const TimeAttackTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<TimeAttackConfig>) => {
  const [timeLeft, setTimeLeft] = useState(config.timeLimit);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const timerAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (showFeedback || timedOut) return;

    Animated.timing(timerAnim, {
      toValue: 0,
      duration: config.timeLimit * 1000,
      useNativeDriver: false,
    }).start();

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimedOut(true);
          setShowFeedback(true);
          setTimeout(() => {
            onComplete({ correct: false, response: 'timeout' });
          }, 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSelect = (index: number) => {
    if (showFeedback || timedOut) return;

    setSelectedIndex(index);
    setShowFeedback(true);

    const isCorrect = index === config.correctIndex;
    setTimeout(() => {
      onComplete({ correct: isCorrect, response: config.options[index] });
    }, 2000);
  };

  const timerWidth = timerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const timerColor = timeLeft > 3 ? '#22c55e' : '#ef4444';
  const isCorrect = selectedIndex === config.correctIndex;

  return (
    <View style={styles.taskWrapper}>
      <GameHeader title="⏱️ TIME ATTACK" icon="Timer" />

      {/* Timer Bar */}
      <View style={styles.timerBarContainer}>
        <Animated.View style={[styles.timerBar, { width: timerWidth, backgroundColor: timerColor }]} />
        <Text style={styles.timerText}>{timeLeft}s</Text>
      </View>

      <Text style={styles.arabicInstruction}>{config.instruction}</Text>
      <Text style={styles.arabicQuestion}>{config.question}</Text>

      <View style={styles.optionsContainer}>
        {config.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeAttackOption,
              selectedIndex === index && styles.timeAttackOptionSelected,
              showFeedback && index === config.correctIndex && styles.timeAttackOptionCorrect,
              showFeedback && selectedIndex === index && !isCorrect && styles.timeAttackOptionIncorrect,
            ]}
            onPress={() => handleSelect(index)}
            disabled={showFeedback || timedOut}
          >
            <Text style={styles.timeAttackOptionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={isCorrect || false}
          correctMessage={feedback.correct}
          incorrectMessage={timedOut ? 'انتهى الوقت!' : feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 16. BUILD MODE TASK (Day 2 Game 5) ====================

export const BuildModeTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<BuildModeConfig>) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tower, setTower] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const blockAnim = useRef(new Animated.Value(0)).current;

  const handleAnswer = (selectedIndex: number) => {
    const question = config.questions[currentQuestion];
    const isCorrect = selectedIndex === question.correctIndex;

    if (isCorrect) {
      // Add block with animation
      Animated.sequence([
        Animated.timing(blockAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(blockAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]).start();

      const newTower = [...tower, question.blockLabel];
      setTower(newTower);

      if (currentQuestion < config.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowFeedback(true);
        setTimeout(() => {
          onComplete({ correct: true, response: newTower });
        }, 2000);
      }
    }
  };

  const currentQ = config.questions[currentQuestion];
  const blockTranslate = blockAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  return (
    <View style={styles.taskWrapper}>
      <GameHeader title="🏗️ BUILD MODE" icon="Building" />

      <Text style={styles.arabicInstruction}>{config.instruction}</Text>

      {/* Tower Display */}
      <View style={styles.towerContainer}>
        {tower.map((block, index) => (
          <Animated.View
            key={index}
            style={[
              styles.towerBlock,
              index === tower.length - 1 && { transform: [{ translateY: blockTranslate }] },
            ]}
          >
            <Text style={styles.towerBlockText}>{block}</Text>
          </Animated.View>
        ))}
        {tower.length === 0 && (
          <View style={styles.towerBase}>
            <Text style={styles.towerBaseText}>ابدأ البناء!</Text>
          </View>
        )}
      </View>

      {!showFeedback && currentQ && (
        <View style={styles.questionSection}>
          <Text style={styles.arabicQuestion}>{currentQ.question}</Text>
          <View style={styles.optionsContainer}>
            {currentQ.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.buildOption}
                onPress={() => handleAnswer(index)}
              >
                <Text style={styles.buildOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={true}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 17. MYSTERY BOX TASK (Day 2 Game 6) ====================

export const MysteryBoxTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<MysteryBoxConfig>) => {
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const boxAnim = useRef(new Animated.Value(0)).current;

  const handleBoxSelect = (boxId: string) => {
    if (showFeedback || isOpening) return;

    setSelectedBox(boxId);
    setIsOpening(true);

    // Box opening animation
    Animated.timing(boxAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.back(1.5)),
      useNativeDriver: true,
    }).start(() => {
      setShowFeedback(true);
      const box = config.boxes.find(b => b.id === boxId);
      setTimeout(() => {
        onComplete({ correct: box?.correct || false, response: boxId });
      }, 2000);
    });
  };

  const lidRotate = boxAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-110deg'],
  });

  const isCorrect = selectedBox ? config.boxes.find(b => b.id === selectedBox)?.correct : false;

  return (
    <View style={styles.taskWrapper}>
      <GameHeader title="🎁 MYSTERY BOX" icon="Gift" />

      <Text style={styles.arabicInstruction}>{config.instruction}</Text>

      <View style={styles.boxesRow}>
        {config.boxes.map((box) => (
          <TouchableOpacity
            key={box.id}
            style={[
              styles.mysteryBox,
              selectedBox === box.id && styles.mysteryBoxSelected,
              showFeedback && box.correct && styles.mysteryBoxCorrect,
              showFeedback && selectedBox === box.id && !box.correct && styles.mysteryBoxIncorrect,
            ]}
            onPress={() => handleBoxSelect(box.id)}
            disabled={showFeedback || isOpening}
          >
            {selectedBox === box.id && (
              <Animated.View style={[styles.boxLid, { transform: [{ rotateX: lidRotate }] }]}>
                <DynamicIcon name="Gift" size={24} color="#ffd166" />
              </Animated.View>
            )}
            <View style={styles.boxBody}>
              <Text style={styles.boxLabel}>{box.label}</Text>
            </View>
            {showFeedback && selectedBox === box.id && (
              <View style={styles.boxResult}>
                <DynamicIcon
                  name={box.correct ? 'CheckCircle' : 'XCircle'}
                  size={32}
                  color={box.correct ? '#22c55e' : '#ef4444'}
                />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={isCorrect || false}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 18. SHOOT & HIT TASK (Day 2 Game 7) ====================

export const ShootHitTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<ShootHitConfig>) => {
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const hitAnim = useRef(new Animated.Value(0)).current;
  const targetAnims = useRef(config.targets.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Animate targets moving
    config.targets.forEach((_, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(targetAnims[index], {
            toValue: 1,
            duration: 1500 + index * 300,
            useNativeDriver: true,
          }),
          Animated.timing(targetAnims[index], {
            toValue: 0,
            duration: 1500 + index * 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  const handleShoot = (targetId: string) => {
    if (showFeedback) return;

    setSelectedTarget(targetId);

    // Hit animation
    Animated.sequence([
      Animated.timing(hitAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(hitAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => {
      setShowFeedback(true);
      const target = config.targets.find(t => t.id === targetId);
      setTimeout(() => {
        onComplete({ correct: target?.correct || false, response: targetId });
      }, 2000);
    });
  };

  const isCorrect = selectedTarget ? config.targets.find(t => t.id === selectedTarget)?.correct : false;

  return (
    <View style={styles.taskWrapper}>
      <GameHeader title="🎯 SHOOT & HIT" icon="Crosshair" />

      <Text style={styles.arabicInstruction}>{config.instruction}</Text>

      <View style={styles.shootingRange}>
        {config.targets.map((target, index) => {
          const translateX = targetAnims[index].interpolate({
            inputRange: [0, 1],
            outputRange: [-30, 30],
          });

          return (
            <Animated.View
              key={target.id}
              style={[styles.shootTarget, { transform: [{ translateX }] }]}
            >
              <TouchableOpacity
                style={[
                  styles.shootTargetInner,
                  selectedTarget === target.id && styles.shootTargetHit,
                  showFeedback && target.correct && styles.shootTargetCorrect,
                  showFeedback && selectedTarget === target.id && !target.correct && styles.shootTargetIncorrect,
                ]}
                onPress={() => handleShoot(target.id)}
                disabled={showFeedback}
              >
                <DynamicIcon name="Target" size={32} color="#fff" />
                <Text style={styles.shootTargetText}>{target.label}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={isCorrect || false}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 19. KNOWLEDGE RACE TASK (Day 2 Game 8) ====================

export const KnowledgeRaceTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<KnowledgeRaceConfig>) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const carAnim = useRef(new Animated.Value(0)).current;

  const handleAnswer = (selectedIndex: number) => {
    const question = config.questions[currentQuestion];
    const isCorrect = selectedIndex === question.correctIndex;

    if (isCorrect) {
      const newProgress = progress + 1;
      setProgress(newProgress);

      // Move car animation
      Animated.spring(carAnim, {
        toValue: newProgress / config.questions.length,
        friction: 5,
        useNativeDriver: false,
      }).start();

      if (currentQuestion < config.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowFeedback(true);
        setTimeout(() => {
          onComplete({ correct: true, response: 'race_complete' });
        }, 2000);
      }
    }
  };

  const currentQ = config.questions[currentQuestion];
  const carPosition = carAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '85%'],
  });

  return (
    <View style={styles.taskWrapper}>
      <GameHeader title="🏎️ KNOWLEDGE RACE" icon="Car" />

      <Text style={styles.arabicInstruction}>{config.instruction}</Text>

      {/* Race Track */}
      <View style={styles.raceTrack}>
        <View style={styles.trackLine} />
        <Animated.View style={[styles.raceCar, { left: carPosition }]}>
          <Text style={styles.raceCarEmoji}>🏎️</Text>
        </Animated.View>
        <View style={styles.finishLine}>
          <Text style={styles.finishEmoji}>🏁</Text>
        </View>
      </View>

      <Text style={styles.progressText}>
        {progress} / {config.questions.length}
      </Text>

      {!showFeedback && currentQ && (
        <View style={styles.questionSection}>
          <Text style={styles.arabicQuestion}>{currentQ.question}</Text>
          <View style={styles.optionsContainer}>
            {currentQ.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.raceOption}
                onPress={() => handleAnswer(index)}
              >
                <Text style={styles.raceOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={true}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 20. MIND LOCK TASK (Day 2 Game 9) ====================

export const MindLockTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<MindLockConfig>) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const unlockAnim = useRef(new Animated.Value(0)).current;

  const handleSelect = (optionId: string) => {
    if (showFeedback) return;

    setSelectedOption(optionId);
    const option = config.options.find(o => o.id === optionId);

    if (option?.correct) {
      Animated.spring(unlockAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    }

    setShowFeedback(true);
    setTimeout(() => {
      onComplete({ correct: option?.correct || false, response: optionId });
    }, 2000);
  };

  const isCorrect = selectedOption ? config.options.find(o => o.id === selectedOption)?.correct : false;
  const lockRotate = unlockAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={styles.taskWrapper}>
      <GameHeader title="🧠 MIND LOCK" icon="Brain" />

      <Text style={styles.arabicInstruction}>{config.instruction}</Text>

      {/* Mind Lock Display */}
      <Animated.View style={[styles.mindLockContainer, { transform: [{ rotate: lockRotate }] }]}>
        <View style={styles.mindLockInner}>
          <DynamicIcon
            name={isCorrect && showFeedback ? 'Unlock' : 'Lock'}
            size={48}
            color={isCorrect && showFeedback ? '#22c55e' : '#5b5fff'}
          />
        </View>
      </Animated.View>

      <View style={styles.optionsContainer}>
        {config.options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.mindLockOption,
              selectedOption === option.id && styles.mindLockOptionSelected,
              showFeedback && option.correct && styles.mindLockOptionCorrect,
              showFeedback && selectedOption === option.id && !option.correct && styles.mindLockOptionIncorrect,
            ]}
            onPress={() => handleSelect(option.id)}
            disabled={showFeedback}
          >
            <Text style={styles.mindLockOptionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={isCorrect || false}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== 21. FINAL PRECISION TASK (Day 2 Game 10) ====================

export const FinalPrecisionTask = ({
  config,
  onComplete,
  feedback,
}: TaskComponentProps<FinalPrecisionConfig>) => {
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleSelect = (targetId: string) => {
    if (showFeedback) return;

    setSelectedTarget(targetId);
    setShowFeedback(true);

    const target = config.targets.find(t => t.id === targetId);
    setTimeout(() => {
      onComplete({ correct: target?.correct || false, response: targetId });
    }, 2000);
  };

  const isCorrect = selectedTarget ? config.targets.find(t => t.id === selectedTarget)?.correct : false;

  return (
    <View style={styles.taskWrapper}>
      <GameHeader title="🎯 FINAL PRECISION" icon="Trophy" />

      <Text style={styles.arabicInstruction}>{config.instruction}</Text>

      <View style={styles.finalTargetsContainer}>
        {config.targets.map((target) => (
          <Animated.View
            key={target.id}
            style={[
              styles.finalTargetWrapper,
              target.correct && !showFeedback && { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.finalTarget,
                selectedTarget === target.id && styles.finalTargetSelected,
                showFeedback && target.correct && styles.finalTargetCorrect,
                showFeedback && selectedTarget === target.id && !target.correct && styles.finalTargetIncorrect,
              ]}
              onPress={() => handleSelect(target.id)}
              disabled={showFeedback}
            >
              <Text style={styles.finalTargetText}>{target.label}</Text>
              {showFeedback && target.correct && (
                <DynamicIcon name="CheckCircle" size={24} color="#22c55e" />
              )}
              {showFeedback && selectedTarget === target.id && !target.correct && (
                <DynamicIcon name="XCircle" size={24} color="#ef4444" />
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {showFeedback && (
        <TaskFeedbackDisplay
          isCorrect={isCorrect || false}
          correctMessage={feedback.correct}
          incorrectMessage={feedback.incorrect}
        />
      )}
    </View>
  );
};

// ==================== TASK TYPE MAP ====================

export const taskComponentMap: Record<
  string,
  React.ComponentType<TaskComponentProps<any>>
> = {
  coin_flip: CoinFlipTask,
  multiple_choice: MultipleChoiceTask,
  true_false: TrueFalseTask,
  drag_and_drop: DragAndDropTask,
  matching: MatchingTask,
  slider: SliderTask,
  sorting: SortingTask,
  price_prediction: PricePredictionTask,
  chart_interaction: ChartInteractionTask,
  simulation: SimulationTask,
  fill_blank: FillBlankTask,
  // New games for Day 2 Mindset Day
  master_lock: MasterLockTask,
  arrow_precision: ArrowPrecisionTask,
  puzzle_reveal: PuzzleRevealTask,
  time_attack: TimeAttackTask,
  build_mode: BuildModeTask,
  mystery_box: MysteryBoxTask,
  shoot_hit: ShootHitTask,
  knowledge_race: KnowledgeRaceTask,
  mind_lock: MindLockTask,
  final_precision: FinalPrecisionTask,
};

// ==================== STYLES ====================

const styles = StyleSheet.create({
  taskWrapper: {
    width: '100%',
  },

  // Common styles
  instruction: {
    fontSize: 16,
    color: '#c3c7e6',
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f5f7ff',
    marginBottom: 20,
  },

  // Action button
  actionButton: {
    backgroundColor: '#5b5fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // Coin flip styles
  coinContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  coin: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fbbf24',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  coinInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fbbf24',
  },
  coinText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fbbf24',
  },
  revealContainer: {
    backgroundColor: 'rgba(91, 95, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  revealText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#c3c7e6',
    textAlign: 'center',
  },

  // Multiple choice styles
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 12,
  },
  optionButtonSelected: {
    borderColor: '#5b5fff',
    backgroundColor: 'rgba(91, 95, 255, 0.1)',
  },
  optionButtonCorrect: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  optionButtonIncorrect: {
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  optionIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionIndexText: {
    color: '#9bafff',
    fontWeight: '700',
    fontSize: 14,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: '#c3c7e6',
  },
  optionTextSelected: {
    color: '#f5f7ff',
  },

  // True/False styles
  statementContainer: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: 'rgba(91, 95, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  statement: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#f5f7ff',
    fontStyle: 'italic',
  },
  trueFalseButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  trueFalseButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
  },
  trueButton: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: '#22c55e',
  },
  falseButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: '#ef4444',
  },
  trueFalseButtonSelected: {
    backgroundColor: '#5b5fff',
    borderColor: '#5b5fff',
  },
  trueFalseButtonCorrect: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  trueFalseButtonIncorrect: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  trueFalseText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f5f7ff',
  },
  trueFalseTextSelected: {
    color: '#fff',
  },
  explanationContainer: {
    backgroundColor: 'rgba(255, 209, 102, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#ffd166',
  },

  // Drag and drop styles
  dragItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  dragItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  dragItemText: {
    color: '#f5f7ff',
    fontSize: 14,
  },
  dropTargetsContainer: {
    gap: 12,
  },
  dropTargetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dropTargetLabel: {
    width: 80,
    fontSize: 14,
    color: '#8c92b5',
  },
  dropZone: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#3a3f5c',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  dropZoneFilled: {
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
    borderStyle: 'solid',
    borderColor: '#5b5fff',
  },
  dropZoneCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderColor: '#22c55e',
  },
  dropZoneIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: '#ef4444',
  },
  dropZonePlaceholder: {
    color: '#8c92b5',
    fontSize: 14,
  },
  placedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  placedItemText: {
    color: '#f5f7ff',
    fontSize: 14,
  },

  // Matching styles
  matchingContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  matchingColumn: {
    flex: 1,
    gap: 8,
  },
  matchingItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  matchingItemRight: {
    backgroundColor: 'rgba(91, 95, 255, 0.1)',
  },
  matchingItemSelected: {
    borderColor: '#5b5fff',
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
  },
  matchingItemMatched: {
    opacity: 0.5,
  },
  matchingItemCorrect: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    opacity: 1,
  },
  matchingItemIncorrect: {
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    opacity: 1,
  },
  matchingItemText: {
    color: '#f5f7ff',
    fontSize: 13,
    textAlign: 'center',
  },

  // Slider styles
  sliderValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#f5f7ff',
    textAlign: 'center',
    marginVertical: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#8c92b5',
  },

  // Sorting styles
  sortingContainer: {
    gap: 8,
    marginBottom: 20,
  },
  sortingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  sortingItemCorrect: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  sortingItemIncorrect: {
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  sortingNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
    textAlign: 'center',
    lineHeight: 28,
    color: '#9bafff',
    fontWeight: '700',
    marginRight: 12,
  },
  sortingText: {
    flex: 1,
    color: '#f5f7ff',
    fontSize: 15,
  },
  sortingButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  sortingArrow: {
    padding: 4,
  },

  // Price prediction styles
  scenarioContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  scenarioText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#c3c7e6',
  },
  predictionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  predictionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  predictionButtonCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
  },
  predictionButtonIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
  },
  predictionText: {
    fontSize: 14,
    fontWeight: '700',
  },

  // Chart interaction styles
  chartContainer: {
    marginBottom: 20,
  },
  chartArea: {
    height: 200,
    backgroundColor: 'rgba(91, 95, 255, 0.1)',
    borderRadius: 12,
    position: 'relative',
  },
  chartMarker: {
    position: 'absolute',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#5b5fff',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  chartMarkerSelected: {
    backgroundColor: 'rgba(91, 95, 255, 0.3)',
    borderColor: '#9bafff',
  },
  chartMarkerCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderColor: '#22c55e',
  },
  chartMarkerIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderColor: '#ef4444',
  },
  chartMarkerLabel: {
    color: '#f5f7ff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Simulation styles
  simulationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  assetCard: {
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  assetName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f5f7ff',
    marginBottom: 8,
  },
  assetPrice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#5b5fff',
  },
  simulationResult: {
    alignItems: 'center',
    marginTop: 16,
  },
  resultArrow: {
    marginBottom: 8,
  },
  targetPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f5f7ff',
  },

  // Fill blank styles
  sentenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 20,
  },
  sentenceText: {
    fontSize: 16,
    color: '#c3c7e6',
    lineHeight: 32,
  },
  blankSlot: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#5b5fff',
    marginHorizontal: 4,
  },
  blankSlotFilled: {
    backgroundColor: 'rgba(91, 95, 255, 0.3)',
  },
  blankSlotCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderColor: '#22c55e',
  },
  blankSlotIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderColor: '#ef4444',
  },
  blankText: {
    fontSize: 16,
    color: '#8c92b5',
  },
  blankTextFilled: {
    color: '#f5f7ff',
    fontWeight: '600',
  },
  optionChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionChipUsed: {
    opacity: 0.3,
  },
  optionChipText: {
    color: '#f5f7ff',
    fontSize: 14,
  },
  optionChipTextUsed: {
    color: '#8c92b5',
  },

  // ==================== NEW GAME STYLES (Day 2 Mindset Day) ====================

  // Arabic text styles
  arabicQuestion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f5f7ff',
    textAlign: 'right',
    marginBottom: 16,
    lineHeight: 28,
  },
  arabicInstruction: {
    fontSize: 14,
    color: '#c3c7e6',
    textAlign: 'right',
    marginBottom: 20,
    lineHeight: 22,
  },

  // Master Lock styles
  lockContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  lockBody: {
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5b5fff',
  },
  codeDisplay: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  codeDigit: {
    width: 50,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3a3acc',
  },
  codeDigitFilled: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderColor: '#22c55e',
  },
  codeDigitText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f5f7ff',
  },
  unlockBadge: {
    marginTop: 16,
  },
  questionSection: {
    width: '100%',
  },
  optionsGrid: {
    gap: 12,
  },
  lockOption: {
    backgroundColor: 'rgba(91, 95, 255, 0.15)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(91, 95, 255, 0.3)',
  },
  lockOptionText: {
    fontSize: 16,
    color: '#f5f7ff',
    textAlign: 'right',
  },

  // Arrow Precision styles
  targetsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  archeryTarget: {
    alignItems: 'center',
    padding: 16,
  },
  archeryTargetSelected: {
    transform: [{ scale: 1.1 }],
  },
  archeryTargetCorrect: {
    opacity: 1,
  },
  archeryTargetIncorrect: {
    opacity: 0.5,
  },
  targetRings: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  targetOuter: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ef4444',
  },
  targetMiddle: {
    position: 'absolute',
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#ffd166',
  },
  targetInner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#22c55e',
  },
  targetLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#f5f7ff',
    fontWeight: '600',
    textAlign: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },

  // Puzzle Reveal styles
  puzzleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 24,
  },
  puzzlePiece: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3a3acc',
  },
  puzzlePieceRevealed: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderColor: '#22c55e',
  },
  puzzlePieceText: {
    fontSize: 24,
    color: '#8c92b5',
  },
  puzzleOption: {
    backgroundColor: 'rgba(91, 95, 255, 0.15)',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(91, 95, 255, 0.3)',
  },
  puzzleOptionText: {
    fontSize: 16,
    color: '#f5f7ff',
    textAlign: 'right',
  },

  // Time Attack styles
  timerBarContainer: {
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  timerBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: 20,
  },
  timerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  timeAttackOption: {
    backgroundColor: 'rgba(91, 95, 255, 0.15)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(91, 95, 255, 0.3)',
  },
  timeAttackOptionSelected: {
    borderColor: '#5b5fff',
  },
  timeAttackOptionCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderColor: '#22c55e',
  },
  timeAttackOptionIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderColor: '#ef4444',
  },
  timeAttackOptionText: {
    fontSize: 16,
    color: '#f5f7ff',
    textAlign: 'right',
  },

  // Build Mode styles
  towerContainer: {
    minHeight: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
  },
  towerBlock: {
    backgroundColor: 'rgba(91, 95, 255, 0.3)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 4,
    borderWidth: 2,
    borderColor: '#5b5fff',
    minWidth: 150,
  },
  towerBlockText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f5f7ff',
    textAlign: 'center',
  },
  towerBase: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  towerBaseText: {
    fontSize: 14,
    color: '#8c92b5',
    textAlign: 'center',
  },
  buildOption: {
    backgroundColor: 'rgba(91, 95, 255, 0.15)',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(91, 95, 255, 0.3)',
  },
  buildOptionText: {
    fontSize: 16,
    color: '#f5f7ff',
    textAlign: 'right',
  },

  // Mystery Box styles
  boxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  mysteryBox: {
    width: 140,
    height: 160,
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5b5fff',
    position: 'relative',
  },
  mysteryBoxSelected: {
    borderColor: '#ffd166',
    borderWidth: 3,
  },
  mysteryBoxCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderColor: '#22c55e',
  },
  mysteryBoxIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderColor: '#ef4444',
  },
  boxLid: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(91, 95, 255, 0.4)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxBody: {
    padding: 16,
  },
  boxLabel: {
    fontSize: 12,
    color: '#f5f7ff',
    textAlign: 'center',
    lineHeight: 18,
  },
  boxResult: {
    position: 'absolute',
    bottom: 16,
  },

  // Shoot & Hit styles
  shootingRange: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    minHeight: 150,
  },
  shootTarget: {
    alignItems: 'center',
  },
  shootTargetInner: {
    backgroundColor: 'rgba(91, 95, 255, 0.3)',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5b5fff',
  },
  shootTargetHit: {
    transform: [{ scale: 0.95 }],
  },
  shootTargetCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderColor: '#22c55e',
  },
  shootTargetIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderColor: '#ef4444',
  },
  shootTargetText: {
    marginTop: 8,
    fontSize: 12,
    color: '#f5f7ff',
    textAlign: 'center',
    maxWidth: 80,
  },

  // Knowledge Race styles
  raceTrack: {
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 30,
    marginBottom: 20,
    position: 'relative',
    justifyContent: 'center',
  },
  trackLine: {
    position: 'absolute',
    left: 30,
    right: 30,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
  raceCar: {
    position: 'absolute',
    bottom: 10,
  },
  raceCarEmoji: {
    fontSize: 32,
  },
  finishLine: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  finishEmoji: {
    fontSize: 32,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f5f7ff',
    textAlign: 'center',
    marginBottom: 16,
  },
  raceOption: {
    backgroundColor: 'rgba(91, 95, 255, 0.15)',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(91, 95, 255, 0.3)',
  },
  raceOptionText: {
    fontSize: 16,
    color: '#f5f7ff',
    textAlign: 'right',
  },

  // Mind Lock styles
  mindLockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  mindLockInner: {
    backgroundColor: 'rgba(91, 95, 255, 0.2)',
    padding: 32,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#5b5fff',
  },
  mindLockOption: {
    backgroundColor: 'rgba(91, 95, 255, 0.15)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(91, 95, 255, 0.3)',
  },
  mindLockOptionSelected: {
    borderColor: '#5b5fff',
  },
  mindLockOptionCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderColor: '#22c55e',
  },
  mindLockOptionIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderColor: '#ef4444',
  },
  mindLockOptionText: {
    fontSize: 16,
    color: '#f5f7ff',
    textAlign: 'right',
  },

  // Final Precision styles
  finalTargetsContainer: {
    gap: 12,
  },
  finalTargetWrapper: {
    width: '100%',
  },
  finalTarget: {
    backgroundColor: 'rgba(91, 95, 255, 0.15)',
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(91, 95, 255, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  finalTargetSelected: {
    borderColor: '#5b5fff',
  },
  finalTargetCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderColor: '#22c55e',
  },
  finalTargetIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderColor: '#ef4444',
  },
  finalTargetText: {
    fontSize: 16,
    color: '#f5f7ff',
    textAlign: 'right',
    flex: 1,
  },
});

export default {
  CoinFlipTask,
  MultipleChoiceTask,
  TrueFalseTask,
  DragAndDropTask,
  MatchingTask,
  SliderTask,
  SortingTask,
  PricePredictionTask,
  ChartInteractionTask,
  SimulationTask,
  FillBlankTask,
  // New games for Day 2 Mindset Day
  MasterLockTask,
  ArrowPrecisionTask,
  PuzzleRevealTask,
  TimeAttackTask,
  BuildModeTask,
  MysteryBoxTask,
  ShootHitTask,
  KnowledgeRaceTask,
  MindLockTask,
  FinalPrecisionTask,
  taskComponentMap,
};
