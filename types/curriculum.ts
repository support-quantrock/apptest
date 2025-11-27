// Curriculum Types for 28-Day Trading Education Course

// ==================== TASK TYPES ====================

export type TaskType =
  | 'coin_flip'
  | 'multiple_choice'
  | 'true_false'
  | 'drag_and_drop'
  | 'matching'
  | 'slider'
  | 'sorting'
  | 'price_prediction'
  | 'chart_interaction'
  | 'simulation'
  | 'fill_blank'
  // New game types for Day 2 Mindset Day
  | 'master_lock'
  | 'arrow_precision'
  | 'puzzle_reveal'
  | 'time_attack'
  | 'build_mode'
  | 'mystery_box'
  | 'shoot_hit'
  | 'knowledge_race'
  | 'mind_lock'
  | 'final_precision';

export interface CoinFlipConfig {
  instruction: string;
  revealText: string;
}

export interface MultipleChoiceConfig {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface TrueFalseConfig {
  statement: string;
  correctAnswer: boolean;
  explanation: string;
}

export interface DragAndDropItem {
  id: string;
  label: string;
  icon?: string;
}

export interface DragAndDropTarget {
  id: string;
  label: string;
  acceptsIds: string[];
}

export interface DragAndDropConfig {
  items: DragAndDropItem[];
  targets: DragAndDropTarget[];
  instruction: string;
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface MatchingConfig {
  pairs: MatchingPair[];
  instruction: string;
}

export interface SliderConfig {
  question: string;
  min: number;
  max: number;
  step: number;
  labels: string[];
  revealAnswer: string;
}

export interface SortingConfig {
  items: string[];
  instruction: string;
  correctOrder: string[];
}

export interface PricePredictionConfig {
  scenario: string;
  question: string;
  options: ('UP' | 'DOWN' | 'SIDEWAYS')[];
  correctAnswer: 'UP' | 'DOWN' | 'SIDEWAYS';
  explanation: string;
}

export interface ChartInteractionMarker {
  x: number;
  y: number;
  correct: boolean;
  label: string;
}

export interface ChartInteractionConfig {
  chartType: 'candlestick' | 'line' | 'support_resistance' | 'trendline' | 'pattern';
  markers: ChartInteractionMarker[];
  instruction: string;
}

export interface SimulationConfig {
  asset: string;
  startPrice: number;
  targetPrice: number;
  scenario: string;
  instruction: string;
}

export interface FillBlankConfig {
  sentence: string;
  blanks: string[];
  options: string[];
  instruction: string;
}

// ==================== NEW GAME CONFIG TYPES (Day 2 Mindset Day) ====================

export interface MasterLockQuestion {
  question: string;
  options: Array<{ text: string; correct: boolean; digit: number }>;
}

export interface MasterLockConfig {
  questions: MasterLockQuestion[];
  correctCode: string;
  instruction: string;
}

export interface ArrowPrecisionTarget {
  id: string;
  label: string;
  correct: boolean;
}

export interface ArrowPrecisionConfig {
  targets: ArrowPrecisionTarget[];
  instruction: string;
}

export interface PuzzleRevealQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface PuzzleRevealConfig {
  questions: PuzzleRevealQuestion[];
  totalPieces: number;
  instruction: string;
}

export interface TimeAttackConfig {
  question: string;
  options: string[];
  correctIndex: number;
  timeLimit: number;
  instruction: string;
}

export interface BuildModeQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  blockLabel: string;
}

export interface BuildModeConfig {
  questions: BuildModeQuestion[];
  instruction: string;
}

export interface MysteryBoxOption {
  id: string;
  label: string;
  correct: boolean;
}

export interface MysteryBoxConfig {
  boxes: MysteryBoxOption[];
  instruction: string;
}

export interface ShootHitTarget {
  id: string;
  label: string;
  correct: boolean;
}

export interface ShootHitConfig {
  targets: ShootHitTarget[];
  instruction: string;
}

export interface KnowledgeRaceQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface KnowledgeRaceConfig {
  questions: KnowledgeRaceQuestion[];
  instruction: string;
}

export interface MindLockOption {
  id: string;
  label: string;
  correct: boolean;
}

export interface MindLockConfig {
  options: MindLockOption[];
  instruction: string;
}

export interface FinalPrecisionTarget {
  id: string;
  label: string;
  correct: boolean;
}

export interface FinalPrecisionConfig {
  targets: FinalPrecisionTarget[];
  instruction: string;
}

export type TaskConfig =
  | CoinFlipConfig
  | MultipleChoiceConfig
  | TrueFalseConfig
  | DragAndDropConfig
  | MatchingConfig
  | SliderConfig
  | SortingConfig
  | PricePredictionConfig
  | ChartInteractionConfig
  | SimulationConfig
  | FillBlankConfig
  // New game configs for Day 2 Mindset Day
  | MasterLockConfig
  | ArrowPrecisionConfig
  | PuzzleRevealConfig
  | TimeAttackConfig
  | BuildModeConfig
  | MysteryBoxConfig
  | ShootHitConfig
  | KnowledgeRaceConfig
  | MindLockConfig
  | FinalPrecisionConfig;

// ==================== OBJECTIVE & LESSON TYPES ====================

export interface TaskFeedback {
  correct: string;
  incorrect: string;
}

export interface ObjectiveTask {
  type: TaskType;
  config: TaskConfig;
  feedback: TaskFeedback;
}

export interface ObjectiveImage {
  icon: string; // Lucide icon name
  animation?: 'float' | 'pulse' | 'fade' | 'slide' | 'none';
  color?: string;
}

export interface Objective {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
  image?: ObjectiveImage;
  task: ObjectiveTask;
}

export interface CurriculumLesson {
  id: string;
  dayNumber: number;
  lessonNumber: number;
  title: string;
  description?: string;
  objectives: Objective[]; // Flexible array - can be 1-3+ objectives per lesson
  estimatedMinutes: number;
}

// ==================== DAY & REWARD TYPES ====================

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface DayReward {
  badge: Badge;
  xp: number;
  unlocks: string[];
}

// ==================== DAILY TEST TYPES ====================

export interface TestQuestion {
  id: string;
  type: TaskType;
  config: TaskConfig;
  feedback: TaskFeedback;
  points: number;
}

export interface DailyTest {
  id: string;
  dayNumber: number;
  title: string;
  description?: string;
  questions: TestQuestion[];
  passingScore: number; // percentage needed to pass
  estimatedMinutes: number;
}

export interface CurriculumDay {
  dayNumber: number;
  title: string;
  emoji: string;
  missionRank: string;
  theme: 'basics' | 'indicators' | 'multi_market' | 'advanced';
  lessons: CurriculumLesson[]; // Flexible array - can be 3-10+ lessons per day
  test?: DailyTest; // Daily test/challenge (optional - auto-generated if not provided)
  rewards: DayReward;
}

// ==================== FULL CURRICULUM TYPE ====================

export interface TradingCurriculum {
  id: string;
  name: string;
  version: string;
  totalDays: 28;
  defaultLessonsPerDay: 3; // Default, but days can override with variable lengths
  testsPerDay: 1;
  defaultObjectivesPerLesson: 3; // Default, but lessons can override with variable lengths
  days: CurriculumDay[];
}

// ==================== SCREEN FLOW TYPES ====================

export type ScreenType = 'intro' | 'content' | 'task' | 'summary';

export interface ScreenConfig {
  screenIndex: number;
  objectiveIndex: number;
  type: ScreenType;
}

// ==================== PROGRESS TYPES ====================

export interface ObjectiveProgress {
  objectiveId: string;
  completed: boolean;
  taskResult?: {
    correct: boolean;
    response: unknown;
    timestamp: string;
  };
}

export interface LessonProgress {
  lessonId: string;
  dayNumber: number;
  lessonNumber: number;
  started: boolean;
  completed: boolean;
  currentScreen: number;
  objectives: ObjectiveProgress[];
  startedAt?: string;
  completedAt?: string;
}

export interface DayProgress {
  dayNumber: number;
  unlocked: boolean;
  lessons: LessonProgress[];
  badgeEarned: boolean;
  xpEarned: number;
  completedAt?: string;
}

export interface CurriculumProgress {
  currentDay: number;
  totalXp: number;
  badges: string[];
  days: DayProgress[];
  streak: number;
  lastActivityAt?: string;
}

// ==================== COMPONENT PROPS TYPES ====================

export interface TaskComponentProps<T extends TaskConfig = TaskConfig> {
  config: T;
  onComplete: (result: { correct: boolean; response: unknown }) => void;
  feedback: TaskFeedback;
}

export interface ScreenComponentProps {
  objective: Objective;
  objectiveNumber: number;
  onNext: () => void;
}
