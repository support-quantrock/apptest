// Curriculum Components - Main exports

// Shared components
export {
  FloatingElement,
  PulsingElement,
  FadeInElement,
  SlideInElement,
  LessonLayout,
  DynamicIcon,
  ObjectiveImageDisplay,
  TaskFeedbackDisplay,
  KeyPointsDisplay,
  ProgressIndicator,
  GameHeader,
} from './shared';

// Screen components
export {
  IntroScreen,
  ContentScreen,
  TaskScreen,
  SummaryScreen,
} from './screens';

// Task components
export {
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
} from './tasks';

// Main orchestrator
export { DynamicLessonScreen } from './DynamicLessonScreen';
