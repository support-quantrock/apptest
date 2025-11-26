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
  taskComponentMap,
};
