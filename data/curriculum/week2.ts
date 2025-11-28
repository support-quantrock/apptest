// Week 2: Days 8-14 - Indicators
import type { CurriculumDay } from '../../types/curriculum';

// ==================== DAY 8 ====================
const day8: CurriculumDay = {
  dayNumber: 8,
  title: 'Cryptocurrencies & Blockchain + Tokenizing Real-World Assets (RWA)',
  emoji: '📊',
  missionRank: 'Level 8 – Indicator Novice',
  theme: 'indicators',
  lessons: [
    {
      id: 'day8_lesson1',
      dayNumber: 8,
      lessonNumber: 1,
      title: 'SMA vs EMA',
      description: 'Learn the two main types of moving averages.',
      objectives: [
        {
          id: 'day8_l1_obj1',
          title: 'Understand SMA',
          content: 'SMA (Simple Moving Average) is the average of closing prices over a selected period. It\'s smooth but slow to react. SMA 20 = average of last 20 candles.',
          keyPoints: ['Simple average of prices', 'Smooth but laggy', 'Good for identifying trends'],
          image: { icon: 'LineChart', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What does SMA stand for?',
              options: ['Smart Market Analysis', 'Simple Moving Average', 'Stock Market Average', 'Systematic Moving Algorithm'],
              correctIndex: 1
            },
            feedback: { correct: 'Simple Moving Average!', incorrect: 'SMA = Simple Moving Average - the basic average of prices.' }
          }
        },
        {
          id: 'day8_l1_obj2',
          title: 'Understand EMA',
          content: 'EMA (Exponential Moving Average) gives more weight to recent prices. It reacts faster than SMA. Preferred by most traders for quicker signals.',
          keyPoints: ['Weighted toward recent prices', 'Faster reaction', 'Better for short-term'],
          image: { icon: 'Zap', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'EMA reacts faster to price changes than SMA because it gives more weight to recent prices.',
              correctAnswer: true,
              explanation: 'The exponential weighting makes EMA more responsive.'
            },
            feedback: { correct: 'EMA is faster because of exponential weighting!', incorrect: 'EMA weights recent prices more heavily, making it react faster.' }
          }
        },
        {
          id: 'day8_l1_obj3',
          title: 'When to Use SMA vs EMA',
          content: 'Use SMA for: Higher timeframes, Trend direction, Long-term analysis. Use EMA for: Scalping, Quick signals, Momentum shifts. Most traders prefer EMA for active trading.',
          keyPoints: ['SMA = slower, trend direction', 'EMA = faster, active trading', 'Choose based on your style'],
          image: { icon: 'Scale', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'scalping', label: 'Scalping', icon: '⚡' },
                { id: 'longterm', label: 'Long-term trend', icon: '📅' },
                { id: 'quick', label: 'Quick signals', icon: '🎯' },
                { id: 'direction', label: 'Overall direction', icon: '🧭' }
              ],
              targets: [
                { id: 'sma', label: 'Better for SMA', acceptsIds: ['longterm', 'direction'] },
                { id: 'ema', label: 'Better for EMA', acceptsIds: ['scalping', 'quick'] }
              ],
              instruction: 'Match each use case to the better MA type'
            },
            feedback: { correct: 'You know when to use each MA!', incorrect: 'SMA=slower/long-term, EMA=faster/short-term.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day8_lesson2',
      dayNumber: 8,
      lessonNumber: 2,
      title: 'Key MA Periods',
      description: 'Learn the most important moving average settings.',
      objectives: [
        {
          id: 'day8_l2_obj1',
          title: 'Short-Term MAs (9, 20, 21)',
          content: 'Short-term MAs like 9 EMA, 20 EMA, 21 EMA track recent momentum. They\'re close to price and react quickly. Used for entries and short-term direction.',
          keyPoints: ['9/20/21 = short-term', 'Quick reaction', 'Good for entries'],
          image: { icon: 'Gauge', animation: 'float', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Which MA would react fastest to a sudden price move?',
              options: ['9 EMA', '50 SMA', '200 SMA', '100 EMA'],
              correctIndex: 0
            },
            feedback: { correct: '9 EMA is the fastest of these options!', incorrect: 'Smaller periods react faster - 9 EMA is quickest here.' }
          }
        },
        {
          id: 'day8_l2_obj2',
          title: 'Medium-Term MAs (50)',
          content: 'The 50 MA is the most watched medium-term indicator. It represents about 2 months of trading. Often acts as dynamic support/resistance.',
          keyPoints: ['50 MA = ~2 months', 'Widely watched', 'Dynamic S/R'],
          image: { icon: 'Target', animation: 'pulse', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement: 'The 50 MA often acts as dynamic support in uptrends and resistance in downtrends.',
              correctAnswer: true,
              explanation: 'MAs can act as moving support/resistance levels.'
            },
            feedback: { correct: 'MAs act as dynamic S/R levels!', incorrect: 'Price often bounces off MAs like they\'re support/resistance.' }
          }
        },
        {
          id: 'day8_l2_obj3',
          title: 'Long-Term MAs (100, 200)',
          content: 'The 200 MA is the most important long-term indicator. Above 200 MA = bullish territory. Below 200 MA = bearish territory. It defines the major trend.',
          keyPoints: ['200 MA = major trend', 'Above = bullish', 'Below = bearish'],
          image: { icon: 'Mountain', animation: 'none', color: '#ef4444' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'A stock is trading below its 200-day moving average.',
              question: 'What is the overall trend bias?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'DOWN',
              explanation: 'Below the 200 MA indicates bearish long-term trend.'
            },
            feedback: { correct: 'Below 200 MA = bearish territory!', incorrect: 'Trading below the 200 MA suggests a bearish long-term trend.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day8_lesson3',
      dayNumber: 8,
      lessonNumber: 3,
      title: 'MA Crossovers',
      description: 'Trade using moving average crosses.',
      objectives: [
        {
          id: 'day8_l3_obj1',
          title: 'Golden Cross',
          content: 'Golden Cross: Short-term MA crosses ABOVE long-term MA (e.g., 50 crosses above 200). This is a major bullish signal. Often marks the start of new uptrends.',
          keyPoints: ['Short crosses above long', 'Major bullish signal', 'Confirms trend change'],
          image: { icon: 'ArrowUpRight', animation: 'float', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'A Golden Cross occurs when a short-term MA crosses above a long-term MA.',
              correctAnswer: true,
              explanation: 'Golden = bullish cross (short above long).'
            },
            feedback: { correct: 'Golden Cross = bullish crossover!', incorrect: 'Golden Cross is when shorter MA crosses above longer MA.' }
          }
        },
        {
          id: 'day8_l3_obj2',
          title: 'Death Cross',
          content: 'Death Cross: Short-term MA crosses BELOW long-term MA. This is a major bearish signal. Often marks the start of downtrends. The opposite of Golden Cross.',
          keyPoints: ['Short crosses below long', 'Major bearish signal', 'Warns of downtrend'],
          image: { icon: 'ArrowDownRight', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'The 50-day MA just crossed below the 200-day MA (Death Cross).',
              question: 'What is the likely trend direction?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'DOWN',
              explanation: 'Death Cross signals bearish momentum ahead.'
            },
            feedback: { correct: 'Death Cross = bearish signal!', incorrect: 'Death Cross (short below long) signals bearish trend ahead.' }
          }
        },
        {
          id: 'day8_l3_obj3',
          title: 'Using Crossovers Safely',
          content: 'Crossovers are lagging - they confirm trends, not predict them. Wait for additional confirmation. Works best in trending markets. Avoid in choppy/sideways markets.',
          keyPoints: ['MAs lag price', 'Confirm, don\'t predict', 'Avoid choppy markets'],
          image: { icon: 'AlertTriangle', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'MA crossover signals work WORST in which market condition?',
              options: ['Strong uptrend', 'Strong downtrend', 'Choppy/sideways market', 'Trending market'],
              correctIndex: 2
            },
            feedback: { correct: 'Crossovers fail in choppy markets!', incorrect: 'In sideways/choppy markets, MAs give many false signals.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'indicator_novice', name: 'Indicator Novice', icon: '📊', description: 'Mastered moving averages' },
    xp: 100,
    unlocks: ['day_9']
  }
};

// ==================== DAY 9 ====================
const day9: CurriculumDay = {
  dayNumber: 9,
  title: 'Understanding Web3, DeFi, and the Future of Money',
  emoji: '📈',
  missionRank: 'Level 9 – Momentum Reader',
  theme: 'indicators',
  lessons: [
    {
      id: 'day9_lesson1',
      dayNumber: 9,
      lessonNumber: 1,
      title: 'RSI Basics',
      description: 'Understand the Relative Strength Index.',
      objectives: [
        {
          id: 'day9_l1_obj1',
          title: 'What is RSI?',
          content: 'RSI (Relative Strength Index) measures momentum and potential reversals. It ranges from 0 to 100. Above 70 = Overbought. Below 30 = Oversold.',
          keyPoints: ['Range: 0-100', 'Above 70 = overbought', 'Below 30 = oversold'],
          image: { icon: 'Gauge', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'RSI reading of 85 indicates the market is:',
              options: ['Oversold', 'Overbought', 'Neutral', 'In a downtrend'],
              correctIndex: 1
            },
            feedback: { correct: 'Above 70 = overbought!', incorrect: 'RSI above 70 means overbought - potential pullback ahead.' }
          }
        },
        {
          id: 'day9_l1_obj2',
          title: 'How RSI Moves',
          content: 'RSI rises when: Price moves up strongly, Buyers dominate. RSI falls when: Sellers dominate, Downtrend accelerates. RSI midpoint (50) shows trend strength - above 50 = bullish bias.',
          keyPoints: ['Rising RSI = bullish momentum', 'Falling RSI = bearish momentum', '50 line = trend bias'],
          image: { icon: 'ArrowUpDown', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'RSI staying above 50 generally indicates bullish momentum.',
              correctAnswer: true,
              explanation: 'The 50 level acts as a bullish/bearish divider.'
            },
            feedback: { correct: 'RSI above 50 = bullish bias!', incorrect: 'RSI above 50 suggests bulls are in control.' }
          }
        },
        {
          id: 'day9_l1_obj3',
          title: 'RSI Timeframe Tips',
          content: 'RSI on small timeframes has more noise. RSI on higher timeframes is more reliable. RSI can stay overbought/oversold for extended periods in strong trends.',
          keyPoints: ['Higher TF = more reliable', 'Small TF = more noise', 'Can stay extreme in trends'],
          image: { icon: 'Clock', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'In a very strong uptrend, RSI can:',
              options: ['Never go above 70', 'Stay overbought for a long time', 'Always stay below 50', 'Become invalid'],
              correctIndex: 1
            },
            feedback: { correct: 'RSI can stay overbought in strong trends!', incorrect: 'Strong trends can keep RSI in extreme zones for extended periods.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day9_lesson2',
      dayNumber: 9,
      lessonNumber: 2,
      title: 'Overbought/Oversold',
      description: 'Trade the extremes properly.',
      objectives: [
        {
          id: 'day9_l2_obj1',
          title: 'Overbought Psychology',
          content: '"Overbought" means buyers may be exhausted. It does NOT mean price will instantly fall. It means: Trend is strong but near potential exhaustion, Smart money may start exiting. Wait for confirmation.',
          keyPoints: ['Not automatic sell signal', 'Shows potential exhaustion', 'Wait for confirmation'],
          image: { icon: 'Battery', animation: 'float', color: '#ef4444' },
          task: {
            type: 'true_false',
            config: {
              statement: 'You should immediately sell whenever RSI goes above 70.',
              correctAnswer: false,
              explanation: 'Overbought doesn\'t mean instant reversal - wait for confirmation.'
            },
            feedback: { correct: 'Never sell JUST because RSI is high!', incorrect: 'Overbought is a warning, not an automatic sell signal.' }
          }
        },
        {
          id: 'day9_l2_obj2',
          title: 'Oversold Psychology',
          content: '"Oversold" means sellers may be exhausted. It signals: Possible reversal, Buyers preparing to re-enter. Good for watching dip-buying opportunities, but still need confirmation.',
          keyPoints: ['Not automatic buy signal', 'Shows potential bounce', 'Confirm before buying'],
          image: { icon: 'BatteryLow', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'RSI drops to 25 at a major support level, then starts turning up.',
              question: 'What is the likely setup?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'UP',
              explanation: 'Oversold + support + RSI turning up = bullish setup.'
            },
            feedback: { correct: 'Oversold at support with RSI turning up = bullish!', incorrect: 'Multiple confluences (oversold + support + RSI upturn) suggest bounce.' }
          }
        },
        {
          id: 'day9_l2_obj3',
          title: 'When NOT to Use RSI Extremes',
          content: 'RSI extremes fail during: Strong trending markets, News spikes, Low liquidity times. Don\'t fade strong trends just because RSI is extreme. Trend > RSI.',
          keyPoints: ['Don\'t fight strong trends', 'News makes RSI unreliable', 'Trend is king'],
          image: { icon: 'AlertTriangle', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'RSI has been above 70 for 10 days during a strong rally. You should:',
              options: ['Keep shorting until it works', 'Respect the trend, don\'t fight it', 'Ignore RSI completely', 'Double your short position'],
              correctIndex: 1
            },
            feedback: { correct: 'Respect the trend! Don\'t fight strong momentum.', incorrect: 'In strong trends, RSI can stay extreme for long periods. Don\'t fight it.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day9_lesson3',
      dayNumber: 9,
      lessonNumber: 3,
      title: 'RSI Divergence',
      description: 'Find hidden reversal signals.',
      objectives: [
        {
          id: 'day9_l3_obj1',
          title: 'Regular Divergence',
          content: 'Bullish Divergence: Price makes Lower Low, RSI makes Higher Low → Trend reversal UP. Bearish Divergence: Price makes Higher High, RSI makes Lower High → Trend reversal DOWN.',
          keyPoints: ['Price and RSI disagree', 'Signals potential reversal', 'Very powerful signal'],
          image: { icon: 'GitBranch', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Bullish Divergence', right: 'Price: Lower Low, RSI: Higher Low' },
                { left: 'Bearish Divergence', right: 'Price: Higher High, RSI: Lower High' }
              ],
              instruction: 'Match each divergence type to its definition'
            },
            feedback: { correct: 'You understand divergence!', incorrect: 'Bullish: Price LL + RSI HL. Bearish: Price HH + RSI LH.' }
          }
        },
        {
          id: 'day9_l3_obj2',
          title: 'Hidden Divergence',
          content: 'Hidden Bullish: Price Higher Low + RSI Lower Low = Trend CONTINUATION up. Hidden Bearish: Price Lower High + RSI Higher High = Trend CONTINUATION down. Shows trend strength.',
          keyPoints: ['Signals continuation', 'Opposite of regular', 'Confirms trend'],
          image: { icon: 'Eye', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Hidden divergence signals trend continuation, while regular divergence signals reversal.',
              correctAnswer: true,
              explanation: 'Regular = reversal, Hidden = continuation.'
            },
            feedback: { correct: 'Regular = reversal, Hidden = continuation!', incorrect: 'Hidden divergence suggests the trend will continue.' }
          }
        },
        {
          id: 'day9_l3_obj3',
          title: 'Divergence Confirmation',
          content: 'Never trade divergence alone. Add confirmation: Support/resistance levels, Price action patterns, Trendline breaks, Volume spikes. Divergence + confirmation = high probability.',
          keyPoints: ['Don\'t trade alone', 'Add S/R confirmation', 'Volume helps'],
          image: { icon: 'CheckCircle', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'sorting',
            config: {
              items: ['Trade divergence immediately', 'Wait for price confirmation', 'Check support/resistance', 'Verify with volume'],
              instruction: 'Sort from BEST to WORST divergence trading practices',
              correctOrder: ['Check support/resistance', 'Verify with volume', 'Wait for price confirmation', 'Trade divergence immediately']
            },
            feedback: { correct: 'Always confirm divergence!', incorrect: 'Best practice: Check S/R, verify volume, wait for confirmation.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'momentum_reader', name: 'Momentum Reader', icon: '📈', description: 'Mastered RSI indicator' },
    xp: 100,
    unlocks: ['day_10']
  }
};

// ==================== DAY 10 ====================
const day10: CurriculumDay = {
  dayNumber: 10,
  title: 'Risk Management & Financial Discipline',
  emoji: '📉',
  missionRank: 'Level 10 – Wave Analyzer',
  theme: 'indicators',
  lessons: [
    {
      id: 'day10_lesson1',
      dayNumber: 10,
      lessonNumber: 1,
      title: 'MACD Basics',
      description: 'Understand the MACD indicator components.',
      objectives: [
        {
          id: 'day10_l1_obj1',
          title: 'MACD Components',
          content: 'MACD has 3 parts: MACD Line (fast-moving), Signal Line (slow-moving), Histogram (shows difference between the two). Standard settings: 12, 26, 9.',
          keyPoints: ['MACD line = fast', 'Signal line = slow', 'Histogram = difference'],
          image: { icon: 'BarChart3', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'MACD Line', right: 'Fast-moving trend line' },
                { left: 'Signal Line', right: 'Slow-moving trigger line' },
                { left: 'Histogram', right: 'Shows distance between lines' }
              ],
              instruction: 'Match each MACD component to its description'
            },
            feedback: { correct: 'You know MACD components!', incorrect: 'MACD=fast, Signal=slow, Histogram=the gap between them.' }
          }
        },
        {
          id: 'day10_l1_obj2',
          title: 'How MACD Works',
          content: 'MACD measures the distance between two EMAs (12 & 26). Bigger distance = stronger trend. Histogram growing = momentum building. Histogram shrinking = momentum fading.',
          keyPoints: ['Measures EMA distance', 'Growing histogram = strong', 'Shrinking = weakening'],
          image: { icon: 'Activity', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'When the MACD histogram bars get bigger, it shows momentum is increasing.',
              correctAnswer: true,
              explanation: 'Growing histogram = growing momentum.'
            },
            feedback: { correct: 'Bigger histogram = stronger momentum!', incorrect: 'Histogram size directly shows momentum strength.' }
          }
        },
        {
          id: 'day10_l1_obj3',
          title: 'MACD Zero Line',
          content: 'MACD above zero = bullish dominance. MACD below zero = bearish dominance. Crossing zero = significant momentum shift. The zero line is a key reference point.',
          keyPoints: ['Above zero = bullish', 'Below zero = bearish', 'Zero cross = shift'],
          image: { icon: 'Minus', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'MACD crosses from below zero to above zero with increasing histogram.',
              question: 'What does this suggest?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'UP',
              explanation: 'Crossing above zero with growing histogram is bullish.'
            },
            feedback: { correct: 'Zero line cross up is bullish!', incorrect: 'MACD crossing above zero indicates bullish momentum taking over.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day10_lesson2',
      dayNumber: 10,
      lessonNumber: 2,
      title: 'MACD Crossovers',
      description: 'Trade MACD signal line crosses.',
      objectives: [
        {
          id: 'day10_l2_obj1',
          title: 'Signal Line Crossover',
          content: 'Bullish Crossover: MACD line crosses ABOVE signal line. Bearish Crossover: MACD line crosses BELOW signal line. These are primary MACD trading signals.',
          keyPoints: ['MACD above signal = bullish', 'MACD below signal = bearish', 'Classic entry signals'],
          image: { icon: 'ArrowUpRight', animation: 'float', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'A bullish MACD crossover occurs when the MACD line crosses above the signal line.',
              correctAnswer: true,
              explanation: 'MACD crossing above signal = bullish signal.'
            },
            feedback: { correct: 'MACD above signal = bullish crossover!', incorrect: 'When MACD line goes above signal line, it\'s a bullish cross.' }
          }
        },
        {
          id: 'day10_l2_obj2',
          title: 'Early vs Late Crossovers',
          content: 'Early crossovers: Lower confirmation, higher reward. Late crossovers: Higher confirmation, lower reward. MACD is a lagging indicator - crossovers confirm, not predict.',
          keyPoints: ['Early = risky but bigger reward', 'Late = safer but smaller reward', 'MACD lags price'],
          image: { icon: 'Clock', animation: 'pulse', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'MACD signals are considered:',
              options: ['Leading indicators', 'Lagging indicators', 'Coincident indicators', 'Random'],
              correctIndex: 1
            },
            feedback: { correct: 'MACD is a lagging indicator!', incorrect: 'MACD confirms trends after they start - it\'s lagging.' }
          }
        },
        {
          id: 'day10_l2_obj3',
          title: 'Avoiding False Signals',
          content: 'Fake crossovers occur in: Sideways markets, Low volume periods, Choppy conditions. Best filter: Only take crossovers in the direction of the higher timeframe trend.',
          keyPoints: ['Avoid in choppy markets', 'Follow higher TF trend', 'Volume confirms'],
          image: { icon: 'AlertTriangle', animation: 'none', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'MACD crossover signals are LEAST reliable when:',
              options: ['In a strong trend', 'With high volume', 'In a choppy/sideways market', 'On daily charts'],
              correctIndex: 2
            },
            feedback: { correct: 'Choppy markets give false MACD signals!', incorrect: 'MACD crossovers are unreliable in sideways/choppy conditions.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day10_lesson3',
      dayNumber: 10,
      lessonNumber: 3,
      title: 'Histogram Power',
      description: 'Read momentum through the histogram.',
      objectives: [
        {
          id: 'day10_l3_obj1',
          title: 'Histogram Expansion',
          content: 'When histogram bars grow: Trend is accelerating, Momentum is strong. Great for: Continuation trades, Adding to positions. Don\'t fight expanding histograms.',
          keyPoints: ['Growing bars = accelerating', 'Trend is strong', 'Don\'t fight it'],
          image: { icon: 'TrendingUp', animation: 'float', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Growing MACD histogram bars indicate the current trend is gaining strength.',
              correctAnswer: true,
              explanation: 'Expanding histogram = accelerating momentum.'
            },
            feedback: { correct: 'Growing histogram = stronger trend!', incorrect: 'Histogram expansion shows momentum building.' }
          }
        },
        {
          id: 'day10_l3_obj2',
          title: 'Histogram Contraction',
          content: 'Shrinking histogram = momentum weakening. This warns of: Possible reversal, Consolidation coming. It often precedes crossovers. Early warning system.',
          keyPoints: ['Shrinking = weakening', 'Warns of change', 'Precedes crossovers'],
          image: { icon: 'TrendingDown', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'Price is in uptrend but MACD histogram bars are getting smaller.',
              question: 'What might happen next?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'SIDEWAYS',
              explanation: 'Shrinking histogram suggests momentum fading - possible pause or reversal.'
            },
            feedback: { correct: 'Shrinking histogram warns of slowing momentum!', incorrect: 'When histogram shrinks, the trend is losing steam.' }
          }
        },
        {
          id: 'day10_l3_obj3',
          title: 'Zero Line Cross Strategy',
          content: 'Histogram crossing zero = new trend signal. Works well on 1H, 4H, Daily charts. Combine with price action for best results. Simple but effective strategy.',
          keyPoints: ['Zero cross = trend shift', 'Best on higher TFs', 'Combine with PA'],
          image: { icon: 'Crosshair', animation: 'none', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'On which timeframes does the MACD histogram zero cross work best?',
              options: ['1 minute', '5 minutes', '1H, 4H, Daily', 'Tick charts'],
              correctIndex: 2
            },
            feedback: { correct: 'Higher timeframes = better MACD signals!', incorrect: 'MACD works best on 1H, 4H, and Daily timeframes.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'wave_analyzer', name: 'Wave Analyzer', icon: '📉', description: 'Mastered MACD indicator' },
    xp: 100,
    unlocks: ['day_11']
  }
};

// ==================== DAY 11 ====================
const day11: CurriculumDay = {
  dayNumber: 11,
  title: 'Investor & Trader Psychology (Behavioral Finance)',
  emoji: '📊',
  missionRank: 'Level 11 – Market Pulse Reader',
  theme: 'indicators',
  lessons: [
    {
      id: 'day11_lesson1',
      dayNumber: 11,
      lessonNumber: 1,
      title: 'Volume Basics',
      description: 'Understand what volume tells us.',
      objectives: [
        {
          id: 'day11_l1_obj1',
          title: 'What Volume Means',
          content: 'Volume = number of units traded in a period. High volume = strong interest/conviction. Low volume = weak interest/uncertainty. Volume confirms price moves.',
          keyPoints: ['Volume = trading activity', 'High = strong interest', 'Low = weak interest'],
          image: { icon: 'BarChart2', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement: 'High volume during a price move suggests the move has strong conviction behind it.',
              correctAnswer: true,
              explanation: 'Volume validates the strength of price moves.'
            },
            feedback: { correct: 'Volume confirms the strength of moves!', incorrect: 'High volume shows many traders agree with the move.' }
          }
        },
        {
          id: 'day11_l1_obj2',
          title: 'Volume Spikes',
          content: 'Sudden high volume signals: Breakouts, Trend reversals, Big traders entering/exiting. A volume spike is a clue that something important is happening.',
          keyPoints: ['Spikes = important event', 'Watch for breakouts', 'Smart money moving'],
          image: { icon: 'Zap', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'A huge volume spike usually indicates:',
              options: ['Nothing important', 'Something significant happening', 'Time to ignore the chart', 'Market is closed'],
              correctIndex: 1
            },
            feedback: { correct: 'Volume spikes = pay attention!', incorrect: 'Big volume means something important is happening.' }
          }
        },
        {
          id: 'day11_l1_obj3',
          title: 'Volume at Key Levels',
          content: 'Volume at support/resistance reveals strength. High volume at resistance = strong sellers. High volume at support = strong buyers. Low volume at levels = weak, may break.',
          keyPoints: ['High volume = level is strong', 'Low volume = level is weak', 'Confirms S/R strength'],
          image: { icon: 'Layers', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'Price approaches resistance with very low volume.',
              question: 'What is more likely?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'UP',
              explanation: 'Low volume at resistance suggests weak sellers - may break through.'
            },
            feedback: { correct: 'Low volume resistance often breaks!', incorrect: 'Weak volume at resistance suggests it might not hold.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day11_lesson2',
      dayNumber: 11,
      lessonNumber: 2,
      title: 'Breakouts With Volume',
      description: 'Confirm breakouts with volume.',
      objectives: [
        {
          id: 'day11_l2_obj1',
          title: 'Valid Breakout Signals',
          content: 'True breakout needs: Strong candle, Above-average volume, Close outside the level. Without volume, breakouts often fail. Volume is the fuel for breakouts.',
          keyPoints: ['Need strong volume', 'Low volume = suspect', 'Volume fuels moves'],
          image: { icon: 'Rocket', animation: 'float', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'A breakout with very low volume is just as reliable as one with high volume.',
              correctAnswer: false,
              explanation: 'Low volume breakouts often fail (fakeouts).'
            },
            feedback: { correct: 'Low volume breakouts are suspicious!', incorrect: 'Breakouts need volume to be reliable.' }
          }
        },
        {
          id: 'day11_l2_obj2',
          title: 'Fakeouts (Low Volume Breakouts)',
          content: 'If breakout has low volume = likely fake. Why? Not enough buyers/sellers to sustain. Manipulation possible. Best to wait for volume confirmation.',
          keyPoints: ['Low volume = fakeout risk', 'Wait for confirmation', 'Don\'t chase low volume'],
          image: { icon: 'AlertTriangle', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Price breaks above resistance but volume is 50% below average. You should:',
              options: ['Buy immediately', 'Wait and see if volume confirms', 'Short immediately', 'Ignore it completely'],
              correctIndex: 1
            },
            feedback: { correct: 'Wait for volume confirmation!', incorrect: 'Low volume breakouts are suspect - wait for confirmation.' }
          }
        },
        {
          id: 'day11_l2_obj3',
          title: 'Volume at Retests',
          content: 'After breakout, price often retests the level. Volume at retest reveals truth: High volume = continuation likely. Low volume = safe to enter on retest.',
          keyPoints: ['Retest = entry opportunity', 'Low volume retest = good', 'High volume = watch out'],
          image: { icon: 'IterationCw', animation: 'none', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement: 'A low-volume retest of a breakout level is often a good entry opportunity.',
              correctAnswer: true,
              explanation: 'Low volume retest = lack of selling pressure = safe entry.'
            },
            feedback: { correct: 'Low volume retests are good entries!', incorrect: 'If retest has low volume, sellers aren\'t interested - good sign.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day11_lesson3',
      dayNumber: 11,
      lessonNumber: 3,
      title: 'Fakeouts & Traps',
      description: 'Avoid volume-based traps.',
      objectives: [
        {
          id: 'day11_l3_obj1',
          title: 'Stop Hunt Explained',
          content: 'Stop hunt = price quickly hits stop losses then reverses. Often caused by institutions. Clue: Low volume during the spike. Price quickly returns to range after.',
          keyPoints: ['Quick spike then reversal', 'Targets stop losses', 'Low volume during spike'],
          image: { icon: 'Target', animation: 'float', color: '#ef4444' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Stop hunts typically show low volume during the spike and price quickly reverses.',
              correctAnswer: true,
              explanation: 'Real moves have volume; stop hunts are quick and low volume.'
            },
            feedback: { correct: 'Stop hunts are quick, low-volume spikes!', incorrect: 'Stop hunts lack volume conviction and reverse quickly.' }
          }
        },
        {
          id: 'day11_l3_obj2',
          title: 'Liquidity Grabs',
          content: 'Markets hunt liquidity at: Swing highs/lows, Support/resistance edges, Round numbers. These areas have stop losses that get "grabbed" before real moves.',
          keyPoints: ['Targets obvious levels', 'Stop losses cluster there', 'Often precedes real move'],
          image: { icon: 'Search', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Where do stop losses typically cluster?',
              options: ['Random places', 'Just above/below swing highs and lows', 'Only at round numbers', 'Never at support/resistance'],
              correctIndex: 1
            },
            feedback: { correct: 'Stops cluster at obvious levels!', incorrect: 'Swing highs/lows are where most traders place stops.' }
          }
        },
        {
          id: 'day11_l3_obj3',
          title: 'Avoiding Trap Entries',
          content: 'To avoid traps: Don\'t enter at the breakout candle, Wait for volume confirmation, Use wider stop losses, Wait for retests. Patience prevents trap losses.',
          keyPoints: ['Don\'t chase', 'Wait for confirmation', 'Patience pays'],
          image: { icon: 'Shield', animation: 'none', color: '#22c55e' },
          task: {
            type: 'sorting',
            config: {
              items: ['Enter immediately on breakout', 'Wait for retest', 'Check volume', 'Use tight stop at breakout level'],
              instruction: 'Sort from SAFEST to RISKIEST practices',
              correctOrder: ['Check volume', 'Wait for retest', 'Use tight stop at breakout level', 'Enter immediately on breakout']
            },
            feedback: { correct: 'Patience and confirmation are safest!', incorrect: 'Safest: Check volume, wait for retest. Riskiest: Chase immediately.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'market_pulse', name: 'Market Pulse Reader', icon: '📊', description: 'Mastered volume analysis' },
    xp: 100,
    unlocks: ['day_12']
  }
};

// ==================== DAY 12 ====================
const day12: CurriculumDay = {
  dayNumber: 12,
  title: 'Economic Analysis',
  emoji: '🛡️',
  missionRank: 'Level 12 – Risk Commander',
  theme: 'indicators',
  lessons: [
    {
      id: 'day12_lesson1',
      dayNumber: 12,
      lessonNumber: 1,
      title: 'Stop Losses',
      description: 'Protect your capital.',
      objectives: [
        {
          id: 'day12_l1_obj1',
          title: 'Why Stop Losses Matter',
          content: 'Stop loss = automatic exit that protects your account. Without SL, one bad trade can destroy months of gains. Professional traders ALWAYS use stop losses. No exceptions.',
          keyPoints: ['Protects your capital', 'Automatic exit', 'Non-negotiable for pros'],
          image: { icon: 'Shield', animation: 'float', color: '#ef4444' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Professional traders sometimes trade without stop losses.',
              correctAnswer: false,
              explanation: 'Professionals ALWAYS protect their capital with stops.'
            },
            feedback: { correct: 'Pros ALWAYS use stop losses!', incorrect: 'Every professional trader uses stop losses - no exceptions.' }
          }
        },
        {
          id: 'day12_l1_obj2',
          title: 'Types of Stop Losses',
          content: 'Technical SL: Based on chart structure (below support). Percentage SL: Fixed % of entry (e.g., 2%). ATR SL: Based on volatility. Time SL: Exit if trade doesn\'t work by X time.',
          keyPoints: ['Technical = structure-based', 'Percentage = fixed %', 'ATR = volatility-based'],
          image: { icon: 'ListChecks', animation: 'pulse', color: '#5b5fff' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Technical SL', right: 'Placed below support/above resistance' },
                { left: 'Percentage SL', right: 'Fixed % away from entry' },
                { left: 'ATR-based SL', right: 'Based on market volatility' }
              ],
              instruction: 'Match each SL type to its description'
            },
            feedback: { correct: 'You know the SL types!', incorrect: 'Technical=structure, Percentage=fixed %, ATR=volatility.' }
          }
        },
        {
          id: 'day12_l1_obj3',
          title: 'SL Placement Mistakes',
          content: 'Common mistakes: Too tight SL (stopped out by noise), Too wide SL (unnecessary risk), SL inside normal volatility range. Place SL where your trade idea is proven wrong.',
          keyPoints: ['Not too tight', 'Not too wide', 'Behind structure'],
          image: { icon: 'AlertTriangle', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Where should you place your stop loss?',
              options: ['As tight as possible', 'Where the trade idea is invalidated', 'As far away as possible', 'Random distance'],
              correctIndex: 1
            },
            feedback: { correct: 'SL goes where your idea is proven wrong!', incorrect: 'Place SL at the point where your trade thesis is invalidated.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day12_lesson2',
      dayNumber: 12,
      lessonNumber: 2,
      title: 'Position Sizing',
      description: 'Size your trades correctly.',
      objectives: [
        {
          id: 'day12_l2_obj1',
          title: 'Risk Per Trade',
          content: 'Risk = amount you\'re willing to lose per trade. Professionals risk 1-2% per trade maximum. Beginners often risk too much → blow accounts. Small risk = survival.',
          keyPoints: ['Risk 1-2% max', 'Consistent risk', 'Survival first'],
          image: { icon: 'Percent', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Professional traders typically risk how much per trade?',
              options: ['10-20%', '5-10%', '1-2%', '50%'],
              correctIndex: 2
            },
            feedback: { correct: '1-2% is professional risk per trade!', incorrect: 'Professionals risk only 1-2% of their account per trade.' }
          }
        },
        {
          id: 'day12_l2_obj2',
          title: 'Position Size Calculation',
          content: 'Formula: Position Size = (Account Risk $) / (SL Distance). Example: $100 risk ÷ $10 SL distance = 10 shares. Always calculate before entering.',
          keyPoints: ['Calculate before entry', 'Risk ÷ SL distance', 'Never skip this step'],
          image: { icon: 'Calculator', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'If you risk $50 and your SL is $5 away from entry, how many shares?',
              options: ['5 shares', '10 shares', '50 shares', '250 shares'],
              correctIndex: 1
            },
            feedback: { correct: '$50 ÷ $5 = 10 shares!', incorrect: 'Position Size = Risk $ ÷ SL Distance. $50 ÷ $5 = 10.' }
          }
        },
        {
          id: 'day12_l2_obj3',
          title: 'Scaling In/Out',
          content: 'Scale in: Add to position gradually. Scale out: Take profits in portions. Benefits: Reduces risk, Locks some profit, Stays in runners. Professional technique.',
          keyPoints: ['Add positions gradually', 'Take partial profits', 'Reduces average risk'],
          image: { icon: 'Layers', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Taking partial profits (scaling out) allows you to lock in gains while staying in the trade.',
              correctAnswer: true,
              explanation: 'Scaling out secures profits while keeping upside exposure.'
            },
            feedback: { correct: 'Scaling out is a smart risk management technique!', incorrect: 'Partial profits reduce risk while maintaining position.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day12_lesson3',
      dayNumber: 12,
      lessonNumber: 3,
      title: 'Risk-Reward Ratio',
      description: 'Make your math work.',
      objectives: [
        {
          id: 'day12_l3_obj1',
          title: 'R:R Basics',
          content: 'R:R = potential reward compared to risk. 1:1 = win $1 for every $1 risked. 1:2 = win $2 for every $1 risked. Higher R:R = more forgiveness for losers.',
          keyPoints: ['Reward vs Risk ratio', 'Higher = better math', 'Aim for 1:2 minimum'],
          image: { icon: 'Scale', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'A trade with 1:3 R:R means:',
              options: ['Risk $3 to make $1', 'Risk $1 to make $3', 'Risk and reward are equal', 'It\'s a bad trade'],
              correctIndex: 1
            },
            feedback: { correct: '1:3 means risking $1 to potentially make $3!', incorrect: '1:3 R:R = Risk $1 for potential $3 reward.' }
          }
        },
        {
          id: 'day12_l3_obj2',
          title: 'Win Rate vs R:R',
          content: 'You don\'t need high win rate to be profitable. Example: 30% win rate + 1:3 R:R = PROFITABLE. The math: Win 3x$3 = $9, Lose 7x$1 = $7. Net +$2.',
          keyPoints: ['Win rate isn\'t everything', 'R:R compensates', 'Math matters more'],
          image: { icon: 'Calculator', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'A trader with only 40% win rate can still be profitable with good R:R ratios.',
              correctAnswer: true,
              explanation: 'Low win rate + high R:R can be very profitable.'
            },
            feedback: { correct: 'Win rate + R:R together determine profitability!', incorrect: 'R:R can compensate for lower win rates.' }
          }
        },
        {
          id: 'day12_l3_obj3',
          title: 'Finding Quality Setups',
          content: 'Good setup criteria: Clear entry point, Defined stop loss, Obvious target, Minimum 1:2 R:R. If a trade doesn\'t meet these, skip it. Quality over quantity.',
          keyPoints: ['Clear entry/exit', 'Minimum 1:2 R:R', 'Skip poor setups'],
          image: { icon: 'CheckCircle', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'sorting',
            config: {
              items: ['Trade has 1:0.5 R:R', 'Trade has 1:2 R:R', 'Trade has 1:3 R:R', 'Trade has 1:1 R:R'],
              instruction: 'Sort from BEST to WORST R:R setups',
              correctOrder: ['Trade has 1:3 R:R', 'Trade has 1:2 R:R', 'Trade has 1:1 R:R', 'Trade has 1:0.5 R:R']
            },
            feedback: { correct: 'Higher R:R = better trade math!', incorrect: '1:3 > 1:2 > 1:1 > 1:0.5. Always seek higher R:R.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'risk_commander', name: 'Risk Commander', icon: '🛡️', description: 'Mastered risk management basics' },
    xp: 100,
    unlocks: ['day_13']
  }
};

// ==================== DAY 13 ====================
const day13: CurriculumDay = {
  dayNumber: 13,
  title: 'Fundamental Analysis',
  emoji: '💰',
  missionRank: 'Level 13 – Capital Guardian',
  theme: 'indicators',
  lessons: [
    {
      id: 'day13_lesson1',
      dayNumber: 13,
      lessonNumber: 1,
      title: 'Understanding Drawdown',
      description: 'Manage losing periods.',
      objectives: [
        {
          id: 'day13_l1_obj1',
          title: 'What is Drawdown?',
          content: 'Drawdown = the drop from your highest account value to a lower point. Example: Peak $10,000 → Drop to $9,000 = 10% drawdown. All traders experience drawdowns.',
          keyPoints: ['Peak to trough decline', 'Measured in %', 'Everyone has them'],
          image: { icon: 'TrendingDown', animation: 'float', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Your account peaks at $5,000 then drops to $4,500. What\'s the drawdown?',
              options: ['5%', '10%', '15%', '$500'],
              correctIndex: 1
            },
            feedback: { correct: '$500 ÷ $5,000 = 10% drawdown!', incorrect: 'Drawdown = ($5,000 - $4,500) ÷ $5,000 = 10%.' }
          }
        },
        {
          id: 'day13_l1_obj2',
          title: 'Max Drawdown Limits',
          content: 'Professional limits: Daily loss: 2-3%. Weekly loss: 6-8%. Max drawdown: 20-25%. If exceeded → stop trading. These rules protect your capital.',
          keyPoints: ['Daily limit: 2-3%', 'Weekly limit: 6-8%', 'Stop when hit'],
          image: { icon: 'AlertTriangle', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'true_false',
            config: {
              statement: 'If you hit your daily loss limit, you should keep trading to make it back.',
              correctAnswer: false,
              explanation: 'When you hit limits, STOP. Don\'t chase losses.'
            },
            feedback: { correct: 'Stop when you hit limits!', incorrect: 'Hitting limits = stop trading. Never chase losses.' }
          }
        },
        {
          id: 'day13_l1_obj3',
          title: 'Recovery from Drawdowns',
          content: 'Recovery math is brutal: 50% loss needs 100% gain to recover. 20% loss needs 25% to recover. Prevention > Recovery. Smaller drawdowns = easier recovery.',
          keyPoints: ['Recovery needs more %', 'Prevention is key', 'Keep drawdowns small'],
          image: { icon: 'ArrowUp', animation: 'none', color: '#22c55e' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: '10% drawdown', right: 'Needs ~11% to recover' },
                { left: '25% drawdown', right: 'Needs ~33% to recover' },
                { left: '50% drawdown', right: 'Needs 100% to recover' }
              ],
              instruction: 'Match each drawdown to recovery needed'
            },
            feedback: { correct: 'Bigger drawdowns need exponentially more to recover!', incorrect: 'Losses need more % gain to recover. Keep drawdowns small.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day13_lesson2',
      dayNumber: 13,
      lessonNumber: 2,
      title: 'Risk Profile',
      description: 'Know your risk tolerance.',
      objectives: [
        {
          id: 'day13_l2_obj1',
          title: 'Risk Appetite',
          content: 'Low risk: Steady growth, small positions. Medium risk: Balanced approach. High risk: Aggressive, larger positions. Your personality determines your ideal style.',
          keyPoints: ['Know yourself', 'Match style to personality', 'Be honest'],
          image: { icon: 'User', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'If you can\'t sleep when you have open trades, you\'re probably:',
              options: ['Low risk tolerance', 'Taking too much risk', 'Both A and B', 'A natural trader'],
              correctIndex: 2
            },
            feedback: { correct: 'If trades keep you up, reduce your risk!', incorrect: 'Sleepless nights = too much risk for your comfort level.' }
          }
        },
        {
          id: 'day13_l2_obj2',
          title: 'Aligning Strategy with Risk',
          content: 'Low risk → Swing trading, longer holds. Medium → Intraday setups. High → Scalping, crypto. Mismatch between strategy and risk tolerance = emotional mistakes.',
          keyPoints: ['Match strategy to risk', 'Mismatch = mistakes', 'Be realistic'],
          image: { icon: 'Crosshair', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'swing', label: 'Swing Trading', icon: '📅' },
                { id: 'scalp', label: 'Scalping', icon: '⚡' },
                { id: 'crypto', label: 'Crypto Day Trading', icon: '₿' },
                { id: 'longterm', label: 'Long-term Positions', icon: '🏦' }
              ],
              targets: [
                { id: 'low', label: 'Low Risk', acceptsIds: ['swing', 'longterm'] },
                { id: 'high', label: 'High Risk', acceptsIds: ['scalp', 'crypto'] }
              ],
              instruction: 'Match trading styles to risk levels'
            },
            feedback: { correct: 'You understand risk-style matching!', incorrect: 'Scalping/Crypto=high risk, Swing/Long-term=lower risk.' }
          }
        },
        {
          id: 'day13_l2_obj3',
          title: 'Money Protection Rules',
          content: 'Key rules: 3-loss rule (stop after 3 losses), Daily profit target (stop when reached), Reduce size after losses, Lock profits weekly. These keep you in the game.',
          keyPoints: ['Stop after 3 losses', 'Have profit targets', 'Reduce after losses'],
          image: { icon: 'Lock', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'true_false',
            config: {
              statement: 'The 3-loss rule means you stop trading for the day after 3 consecutive losing trades.',
              correctAnswer: true,
              explanation: '3 losses = time to step away and reset.'
            },
            feedback: { correct: 'Stop after 3 losses to prevent tilt!', incorrect: '3 losses in a row = stop trading, review what\'s wrong.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day13_lesson3',
      dayNumber: 13,
      lessonNumber: 3,
      title: 'Advanced Stop Tactics',
      description: 'Sophisticated stop loss strategies.',
      objectives: [
        {
          id: 'day13_l3_obj1',
          title: 'ATR-Based Stops',
          content: 'ATR (Average True Range) measures volatility. Use ATR × 1.5-2 for stop distance. This adjusts to market conditions. Volatile markets = wider stops. Calm markets = tighter stops.',
          keyPoints: ['ATR measures volatility', 'Multiply by 1.5-2', 'Adapts to conditions'],
          image: { icon: 'Activity', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement: 'ATR-based stops automatically adjust to market volatility.',
              correctAnswer: true,
              explanation: 'ATR changes with volatility, so stops adapt.'
            },
            feedback: { correct: 'ATR stops adapt to volatility!', incorrect: 'ATR-based stops widen in volatile markets, tighten in calm ones.' }
          }
        },
        {
          id: 'day13_l3_obj2',
          title: 'Structure-Based Stops',
          content: 'Place stops behind structure: Below swing lows for longs, Above swing highs for shorts. This puts your stop where it\'s "supposed to be" - where the trade idea fails.',
          keyPoints: ['Behind swing points', 'Where idea is wrong', 'Natural invalidation'],
          image: { icon: 'Layers', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'For a long trade, your stop should be:',
              options: ['Above the entry', 'Below recent swing low', 'At a random distance', 'As tight as possible'],
              correctIndex: 1
            },
            feedback: { correct: 'Stop below swing low = structural protection!', incorrect: 'Long stops go below swing lows - where bulls lose control.' }
          }
        },
        {
          id: 'day13_l3_obj3',
          title: 'Trailing Stops',
          content: 'Trailing stop moves with price: Protects profits as price advances, Locks gains automatically, Lets winners run. Types: Fixed distance, Swing trailing, ATR trailing.',
          keyPoints: ['Moves with profit', 'Locks gains', 'Lets winners run'],
          image: { icon: 'GitBranch', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Fixed trailing', right: 'Moves a set distance behind price' },
                { left: 'Swing trailing', right: 'Moves to each new swing low/high' },
                { left: 'ATR trailing', right: 'Distance based on volatility' }
              ],
              instruction: 'Match trailing stop types to descriptions'
            },
            feedback: { correct: 'You know trailing stop methods!', incorrect: 'Fixed=set distance, Swing=structure, ATR=volatility-based.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'capital_guardian', name: 'Capital Guardian', icon: '💰', description: 'Mastered advanced risk management' },
    xp: 100,
    unlocks: ['day_14']
  }
};

// ==================== DAY 14 ====================
const day14: CurriculumDay = {
  dayNumber: 14,
  title: 'Financial Analysis',
  emoji: '🎯',
  missionRank: 'Level 14 – Indicator Specialist',
  theme: 'indicators',
  lessons: [
    {
      id: 'day14_lesson1',
      dayNumber: 14,
      lessonNumber: 1,
      title: 'Moving Average Test',
      description: 'Test your MA knowledge.',
      objectives: [
        {
          id: 'day14_l1_obj1',
          title: 'MA Fundamentals',
          content: 'Review: SMA = simple average, EMA = weighted to recent. Short MAs (9, 20) = fast. Long MAs (50, 200) = trend direction. Golden Cross = bullish, Death Cross = bearish.',
          keyPoints: ['EMA faster than SMA', 'Higher periods = trend', 'Crosses signal changes'],
          image: { icon: 'LineChart', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'The 200 MA is most useful for determining:',
              options: ['Scalping entries', 'Long-term trend direction', 'Exact entry points', 'Volume'],
              correctIndex: 1
            },
            feedback: { correct: '200 MA shows the major trend!', incorrect: '200 MA is the key long-term trend indicator.' }
          }
        },
        {
          id: 'day14_l1_obj2',
          title: 'MA Crossover Quiz',
          content: 'Golden Cross: Short MA crosses ABOVE long MA = bullish. Death Cross: Short MA crosses BELOW long MA = bearish. These are lagging but significant signals.',
          keyPoints: ['Golden = bullish cross', 'Death = bearish cross', 'Lagging signals'],
          image: { icon: 'ArrowUpDown', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'The 50 MA just crossed above the 200 MA (Golden Cross).',
              question: 'What is the bias?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'UP',
              explanation: 'Golden Cross is a major bullish signal.'
            },
            feedback: { correct: 'Golden Cross = bullish bias!', incorrect: 'Golden Cross (short above long) is a bullish signal.' }
          }
        },
        {
          id: 'day14_l1_obj3',
          title: 'MA Limitations',
          content: 'MAs fail in: Choppy markets, Rapid reversals, Low volume. They work best in: Trending markets, Higher timeframes. Don\'t rely on MAs alone.',
          keyPoints: ['Fail in choppy markets', 'Best in trends', 'Combine with other tools'],
          image: { icon: 'AlertTriangle', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Moving averages are most effective in choppy, sideways markets.',
              correctAnswer: false,
              explanation: 'MAs give false signals in choppy markets - they work best in trends.'
            },
            feedback: { correct: 'MAs struggle in choppy markets!', incorrect: 'MAs are trend-following - they fail when there\'s no trend.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day14_lesson2',
      dayNumber: 14,
      lessonNumber: 2,
      title: 'Momentum Indicators Test',
      description: 'Test RSI and MACD knowledge.',
      objectives: [
        {
          id: 'day14_l2_obj1',
          title: 'RSI Mastery Test',
          content: 'RSI: 0-100 range. Above 70 = overbought. Below 30 = oversold. 50 = bullish/bearish divide. Divergence = powerful signal. Can stay extreme in strong trends.',
          keyPoints: ['70/30 extremes', 'Divergence matters', 'Don\'t fight trends'],
          image: { icon: 'Gauge', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'RSI > 70', right: 'Overbought (potential top)' },
                { left: 'RSI < 30', right: 'Oversold (potential bottom)' },
                { left: 'Bullish Divergence', right: 'Price: Lower Low, RSI: Higher Low' }
              ],
              instruction: 'Match RSI conditions to meanings'
            },
            feedback: { correct: 'You understand RSI!', incorrect: '>70=overbought, <30=oversold, divergence=price/RSI disagree.' }
          }
        },
        {
          id: 'day14_l2_obj2',
          title: 'MACD Mastery Test',
          content: 'MACD Line, Signal Line, Histogram. Bullish: MACD above signal. Bearish: MACD below signal. Zero line = trend bias. Histogram shows momentum strength.',
          keyPoints: ['Crossovers = signals', 'Zero line = bias', 'Histogram = momentum'],
          image: { icon: 'BarChart3', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'A shrinking MACD histogram often warns of a potential trend change.',
              correctAnswer: true,
              explanation: 'Shrinking histogram = weakening momentum.'
            },
            feedback: { correct: 'Shrinking histogram = momentum fading!', incorrect: 'When histogram contracts, momentum is weakening - potential change coming.' }
          }
        },
        {
          id: 'day14_l2_obj3',
          title: 'Combining Indicators',
          content: 'Best practice: Combine indicators for confirmation. RSI + MACD + Price Action = powerful. Don\'t use too many - pick 2-3. Each should tell you something different.',
          keyPoints: ['Confirm with multiple', '2-3 indicators max', 'Different perspectives'],
          image: { icon: 'Layers', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'The best indicator strategy is:',
              options: ['Use 10+ indicators', 'Use 2-3 that complement each other', 'Use only 1 indicator', 'Don\'t use any indicators'],
              correctIndex: 1
            },
            feedback: { correct: '2-3 complementary indicators is optimal!', incorrect: '2-3 indicators that show different things is the sweet spot.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day14_lesson3',
      dayNumber: 14,
      lessonNumber: 3,
      title: 'Risk Management Test',
      description: 'Final test on risk concepts.',
      objectives: [
        {
          id: 'day14_l3_obj1',
          title: 'Position Sizing Quiz',
          content: 'Risk 1-2% per trade. Position Size = Risk $ ÷ SL Distance. Calculate before every trade. Never skip this step. Proper sizing = survival.',
          keyPoints: ['1-2% rule', 'Calculate every time', 'Survival first'],
          image: { icon: 'Calculator', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: '$10,000 account, 1% risk, $2 stop loss distance. Position size?',
              options: ['50 shares', '100 shares', '500 shares', '1000 shares'],
              correctIndex: 0
            },
            feedback: { correct: '$100 risk ÷ $2 = 50 shares!', incorrect: '1% of $10K = $100 risk. $100 ÷ $2 = 50 shares.' }
          }
        },
        {
          id: 'day14_l3_obj2',
          title: 'R:R Understanding',
          content: 'R:R determines profitability. 1:2 minimum recommended. Win rate + R:R together determine success. Low win rate + high R:R can be very profitable.',
          keyPoints: ['1:2 minimum', 'Both metrics matter', 'Math over emotions'],
          image: { icon: 'Scale', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'With a 1:3 R:R, you can be profitable even with a 35% win rate.',
              correctAnswer: true,
              explanation: '35 wins × $3 = $105, 65 losses × $1 = $65. Net profit $40.'
            },
            feedback: { correct: 'Good R:R compensates for lower win rate!', incorrect: 'The math: 35×$3=$105 profit, 65×$1=$65 loss = Net +$40.' }
          }
        },
        {
          id: 'day14_l3_obj3',
          title: 'Week 2 Complete!',
          content: 'Congratulations! You\'ve learned: Moving Averages, RSI, MACD, Volume, Risk Management. You\'re ready for Week 3: Multi-Market Trading!',
          keyPoints: ['Indicators mastered', 'Risk understood', 'Ready for markets'],
          image: { icon: 'Trophy', animation: 'pulse', color: '#ffd166' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What is the MOST important thing in trading?',
              options: ['Finding the perfect indicator', 'Risk management', 'Trading every day', 'Being right all the time'],
              correctIndex: 1
            },
            feedback: { correct: 'Risk management is #1! Protect your capital.', incorrect: 'Risk management is more important than anything else.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'indicator_specialist', name: 'Indicator Specialist', icon: '🎯', description: 'Completed Week 2 - Indicator Mastery' },
    xp: 150,
    unlocks: ['day_15', 'week_3']
  }
};

export const week2Days: CurriculumDay[] = [day8, day9, day10, day11, day12, day13, day14];
