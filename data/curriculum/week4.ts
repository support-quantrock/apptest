// Week 4: Advanced Trading Strategies (Days 22-28)

import type { CurriculumDay } from '../../types/curriculum';

// ==================== DAY 22: FOREX TRADING II ====================

const day22: CurriculumDay = {
  dayNumber: 22,
  title: 'Automation in Investing: Bots & Robo-Advisors',
  emoji: '💹',
  missionRank: 'Forex Master',
  theme: 'advanced',
  lessons: [
    {
      id: 'day22-lesson1',
      dayNumber: 22,
      lessonNumber: 1,
      title: 'Advanced Forex Concepts',
      description: 'Leverage, margin, and lot sizes',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day22-l1-obj1',
          title: 'Understanding Leverage',
          content:
            'Leverage allows you to control large positions with a small amount of capital. For example, 100:1 leverage means $1,000 controls $100,000. While leverage amplifies profits, it equally amplifies losses - use it wisely!',
          keyPoints: [
            'Leverage is borrowed capital from your broker',
            'Higher leverage = higher risk AND reward',
            'Most retail traders should use low leverage (10:1 or less)',
          ],
          image: { icon: 'Scale', animation: 'float', color: '#ef4444' },
          task: {
            type: 'slider',
            config: {
              question:
                'If you have $1,000 and use 50:1 leverage, how much can you control?',
              min: 10000,
              max: 100000,
              step: 10000,
              labels: ['$10K', '$25K', '$50K', '$75K', '$100K'],
              revealAnswer:
                '$50,000! With 50:1 leverage, multiply your capital by 50.',
            },
            feedback: {
              correct: 'Exactly! $1,000 × 50 = $50,000 buying power.',
              incorrect:
                'With 50:1 leverage, multiply your capital by 50: $1,000 × 50 = $50,000.',
            },
          },
        },
        {
          id: 'day22-l1-obj2',
          title: 'Margin Requirements',
          content:
            "Margin is the collateral required to open a leveraged position. If your account falls below the maintenance margin, you'll receive a margin call. Always maintain adequate margin to avoid forced liquidation of your positions.",
          keyPoints: [
            'Initial margin: amount needed to open position',
            'Maintenance margin: minimum to keep position open',
            'Margin call: broker demands more funds or closes position',
          ],
          image: { icon: 'Shield', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What happens during a margin call?',
              options: [
                'Your broker gives you free money',
                'You must add funds or positions get liquidated',
                'Your leverage increases automatically',
                'Trading is paused for 24 hours',
              ],
              correctIndex: 1,
            },
            feedback: {
              correct:
                'Right! A margin call requires you to add funds or face liquidation.',
              incorrect:
                'A margin call means you must deposit more funds or your broker will close positions.',
            },
          },
        },
        {
          id: 'day22-l1-obj3',
          title: 'Lot Sizes Explained',
          content:
            'Forex is traded in lots. A standard lot is 100,000 units of base currency, a mini lot is 10,000 units, and a micro lot is 1,000 units. Choosing the right lot size is crucial for proper risk management.',
          keyPoints: [
            'Standard lot: 100,000 units (~$10 per pip)',
            'Mini lot: 10,000 units (~$1 per pip)',
            'Micro lot: 1,000 units (~$0.10 per pip)',
          ],
          image: { icon: 'Layers', animation: 'slide', color: '#22c55e' },
          task: {
            type: 'sorting',
            config: {
              items: ['Micro Lot', 'Mini Lot', 'Standard Lot'],
              instruction: 'Sort lot sizes from smallest to largest:',
              correctOrder: ['Micro Lot', 'Mini Lot', 'Standard Lot'],
            },
            feedback: {
              correct:
                'Perfect! Micro (1K) < Mini (10K) < Standard (100K) units.',
              incorrect:
                'The order is: Micro (1,000) → Mini (10,000) → Standard (100,000).',
            },
          },
        },
      ],
    },
    {
      id: 'day22-lesson2',
      dayNumber: 22,
      lessonNumber: 2,
      title: 'Major Currency Pairs',
      description: 'Trading the most liquid forex pairs',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day22-l2-obj1',
          title: 'The Major Pairs',
          content:
            'Major pairs include the USD and are the most traded: EUR/USD, USD/JPY, GBP/USD, USD/CHF, AUD/USD, USD/CAD, and NZD/USD. These pairs have the tightest spreads and highest liquidity.',
          keyPoints: [
            'EUR/USD: Most traded pair globally',
            'USD/JPY: Second most liquid',
            'Majors have lowest spreads and costs',
          ],
          image: { icon: 'Globe', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'EUR/USD', right: 'Euro vs Dollar' },
                { left: 'USD/JPY', right: 'Dollar vs Yen' },
                { left: 'GBP/USD', right: 'Pound vs Dollar' },
                { left: 'AUD/USD', right: 'Aussie vs Dollar' },
              ],
              instruction: 'Match currency pairs with their nicknames:',
            },
            feedback: {
              correct: 'Excellent! You know your major pairs.',
              incorrect:
                "Let's review: EUR/USD, USD/JPY, GBP/USD (Cable), and AUD/USD (Aussie).",
            },
          },
        },
        {
          id: 'day22-l2-obj2',
          title: 'Cross Pairs',
          content:
            "Cross pairs (or crosses) don't include the USD. Popular crosses include EUR/GBP, EUR/JPY, and GBP/JPY. These can offer unique trading opportunities but typically have wider spreads.",
          keyPoints: [
            'Cross pairs exclude USD',
            'Often more volatile than majors',
            'Wider spreads = higher trading costs',
          ],
          image: { icon: 'GitBranch', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'true_false',
            config: {
              statement: 'EUR/GBP is a cross pair because it does not include USD.',
              correctAnswer: true,
              explanation:
                'Correct! Any pair without USD is considered a cross pair.',
            },
            feedback: {
              correct: "That's right! EUR/GBP is indeed a cross pair.",
              incorrect:
                'This is TRUE. Cross pairs are any pairs that exclude USD.',
            },
          },
        },
        {
          id: 'day22-l2-obj3',
          title: 'Trading Sessions',
          content:
            "Forex trades 24/5 across global sessions. The Asian session (Tokyo) is quieter, European session (London) has high volume, and American session (New York) overlaps with London for peak volatility. Each session has its character.",
          keyPoints: [
            'Asian: 00:00-09:00 GMT (quieter)',
            'European: 08:00-17:00 GMT (high volume)',
            'American: 13:00-22:00 GMT (volatile)',
          ],
          image: { icon: 'Clock', animation: 'slide', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Which forex session typically has the highest volume?',
              options: [
                'Asian (Tokyo) session',
                'European (London) session',
                'American (New York) session',
                'Weekend session',
              ],
              correctIndex: 1,
            },
            feedback: {
              correct:
                'Correct! London session has the highest volume and tightest spreads.',
              incorrect:
                'The London session handles the most forex volume globally.',
            },
          },
        },
      ],
    },
    {
      id: 'day22-lesson3',
      dayNumber: 22,
      lessonNumber: 3,
      title: 'Forex Trading Strategies',
      description: 'Popular approaches to forex trading',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day22-l3-obj1',
          title: 'Scalping',
          content:
            'Scalping involves making many trades for small profits, typically holding positions for seconds to minutes. Scalpers need low spreads, fast execution, and discipline. This style requires constant screen time.',
          keyPoints: [
            'Very short holding periods',
            'Small profits per trade, high volume',
            'Requires focus and quick decisions',
          ],
          image: { icon: 'Zap', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'coin_flip',
            config: {
              instruction:
                'Flip to reveal if scalping suits your personality...',
              revealText:
                'Scalping needs patience, discipline, and tolerance for screen time. Not for everyone!',
            },
            feedback: {
              correct: 'Great insight into scalping requirements!',
              incorrect: 'Great insight into scalping requirements!',
            },
          },
        },
        {
          id: 'day22-l3-obj2',
          title: 'Swing Trading',
          content:
            'Swing trading captures moves over days to weeks. Traders use technical and fundamental analysis to identify swings. This style suits people who cannot watch markets constantly but want active trading.',
          keyPoints: [
            'Hold for days to weeks',
            'Use daily and 4-hour charts',
            'Good for part-time traders',
          ],
          image: { icon: 'Activity', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Swing trading typically holds positions for:',
              options: [
                'Seconds to minutes',
                'Minutes to hours',
                'Days to weeks',
                'Months to years',
              ],
              correctIndex: 2,
            },
            feedback: {
              correct: 'Correct! Swing traders hold for days to weeks.',
              incorrect:
                'Swing trading captures moves over days to weeks, not shorter timeframes.',
            },
          },
        },
        {
          id: 'day22-l3-obj3',
          title: 'Position Trading',
          content:
            'Position trading is long-term, holding for weeks to months based on fundamental trends. This style requires patience, larger stop losses, and strong conviction. Less time-intensive but needs larger capital.',
          keyPoints: [
            'Longest-term active trading style',
            'Focus on fundamentals and major trends',
            'Wider stops, larger position requirements',
          ],
          image: { icon: 'Mountain', animation: 'slide', color: '#22c55e' },
          task: {
            type: 'sorting',
            config: {
              items: ['Scalping', 'Day Trading', 'Swing Trading', 'Position Trading'],
              instruction: 'Sort trading styles from shortest to longest holding period:',
              correctOrder: ['Scalping', 'Day Trading', 'Swing Trading', 'Position Trading'],
            },
            feedback: {
              correct: 'Perfect ordering of trading timeframes!',
              incorrect:
                'Order by holding time: Scalping < Day < Swing < Position trading.',
            },
          },
        },
      ],
    },
  ],
  rewards: {
    badge: {
      id: 'forex-master',
      name: 'Forex Master',
      icon: 'Globe2',
      description: 'Mastered advanced forex concepts',
    },
    xp: 220,
    unlocks: ['Day 23'],
  },
};

// ==================== DAY 23: INDICES TRADING ====================

const day23: CurriculumDay = {
  dayNumber: 23,
  title: 'Trading & Investment Strategies (Arbitrage, Momentum, Reversal, Swing)',
  emoji: '📊',
  missionRank: 'Index Trader',
  theme: 'advanced',
  lessons: [
    {
      id: 'day23-lesson1',
      dayNumber: 23,
      lessonNumber: 1,
      title: 'What Are Indices?',
      description: 'Understanding market benchmarks',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day23-l1-obj1',
          title: 'Index Basics',
          content:
            'A stock index measures the performance of a group of stocks. It provides a snapshot of market health. Instead of tracking individual stocks, indices show overall market direction.',
          keyPoints: [
            'Indices track baskets of stocks',
            'Represent market or sector performance',
            "You can't buy an index directly - use ETFs or derivatives",
          ],
          image: { icon: 'BarChart3', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement: 'You can directly buy shares of the S&P 500 index.',
              correctAnswer: false,
              explanation:
                "Indices aren't tradeable directly. You trade ETFs (like SPY) or futures that track them.",
            },
            feedback: {
              correct:
                "Correct! Indices can't be bought directly - use ETFs or derivatives.",
              incorrect:
                "False! You can't buy an index directly. Use ETFs like SPY or index futures.",
            },
          },
        },
        {
          id: 'day23-l1-obj2',
          title: 'Major US Indices',
          content:
            'The three major US indices are: S&P 500 (500 large companies), Dow Jones (30 blue-chip stocks), and Nasdaq (tech-heavy). Each tells a different story about the market.',
          keyPoints: [
            'S&P 500: Broad market benchmark',
            'Dow Jones: 30 industrial giants',
            'Nasdaq: Technology-focused',
          ],
          image: { icon: 'Flag', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'S&P 500', right: '500 large companies' },
                { left: 'Dow Jones', right: '30 blue-chip stocks' },
                { left: 'Nasdaq', right: 'Tech-heavy index' },
              ],
              instruction: 'Match each index with its description:',
            },
            feedback: {
              correct: 'Excellent! You know your US indices.',
              incorrect:
                'S&P 500 = 500 companies, Dow = 30 stocks, Nasdaq = tech-focused.',
            },
          },
        },
        {
          id: 'day23-l1-obj3',
          title: 'Global Indices',
          content:
            "Beyond the US, major indices include: FTSE 100 (UK), DAX (Germany), Nikkei 225 (Japan), and Hang Seng (Hong Kong). Trading global indices lets you access different economies and time zones.",
          keyPoints: [
            'FTSE 100: Top 100 UK companies',
            'DAX: 40 German blue chips',
            'Nikkei 225: Japanese market benchmark',
          ],
          image: { icon: 'Globe', animation: 'slide', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Which index represents the Japanese stock market?',
              options: ['FTSE 100', 'DAX', 'Nikkei 225', 'Hang Seng'],
              correctIndex: 2,
            },
            feedback: {
              correct: "Correct! The Nikkei 225 is Japan's main index.",
              incorrect:
                'The Nikkei 225 is the primary Japanese stock market index.',
            },
          },
        },
      ],
    },
    {
      id: 'day23-lesson2',
      dayNumber: 23,
      lessonNumber: 2,
      title: 'How to Trade Indices',
      description: 'Vehicles for index exposure',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day23-l2-obj1',
          title: 'Index ETFs',
          content:
            'ETFs (Exchange-Traded Funds) track indices and trade like stocks. SPY tracks S&P 500, QQQ tracks Nasdaq, DIA tracks Dow. ETFs offer easy, low-cost index exposure with real-time trading.',
          keyPoints: [
            'Trade like stocks on exchanges',
            'Low expense ratios',
            'SPY, QQQ, DIA are most popular',
          ],
          image: { icon: 'Package', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'fill_blank',
            config: {
              sentence: '___ is the ETF that tracks the S&P 500 index.',
              blanks: ['SPY'],
              options: ['SPY', 'QQQ', 'DIA', 'IWM'],
              instruction: 'Fill in the blank:',
            },
            feedback: {
              correct: 'SPY is the most traded S&P 500 ETF!',
              incorrect: 'SPY (SPDR S&P 500) tracks the S&P 500 index.',
            },
          },
        },
        {
          id: 'day23-l2-obj2',
          title: 'Index Futures',
          content:
            'Futures contracts let you trade indices with leverage. E-mini S&P 500 (ES) and Micro E-mini are popular. Futures trade nearly 24 hours and require margin accounts.',
          keyPoints: [
            'Leveraged exposure to indices',
            'Trade almost 24 hours',
            'E-mini contracts are most liquid',
          ],
          image: { icon: 'TrendingUp', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'true_false',
            config: {
              statement:
                'Index futures only trade during regular stock market hours.',
              correctAnswer: false,
              explanation:
                'Futures trade nearly 24 hours, offering pre/post market access.',
            },
            feedback: {
              correct: 'Right! Futures trade almost around the clock.',
              incorrect:
                'False! Index futures trade nearly 24 hours, 5 days a week.',
            },
          },
        },
        {
          id: 'day23-l2-obj3',
          title: 'Index CFDs',
          content:
            "CFDs (Contracts for Difference) let you speculate on index movements without owning underlying assets. Popular with retail traders for their flexibility and leverage. Note: CFDs aren't available in all countries.",
          keyPoints: [
            'Trade price movements without ownership',
            'Flexible leverage options',
            'Not available in some countries (like USA)',
          ],
          image: { icon: 'FileText', animation: 'slide', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What does CFD stand for?',
              options: [
                'Certified Financial Document',
                'Contract For Difference',
                'Current Fund Distribution',
                'Capital Finance Derivative',
              ],
              correctIndex: 1,
            },
            feedback: {
              correct:
                "Correct! CFD = Contract For Difference - you trade the price difference.",
              incorrect:
                'CFD stands for Contract For Difference - a derivative product.',
            },
          },
        },
      ],
    },
    {
      id: 'day23-lesson3',
      dayNumber: 23,
      lessonNumber: 3,
      title: 'Index Trading Strategies',
      description: 'Approaches to trading indices',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day23-l3-obj1',
          title: 'Trend Following',
          content:
            'Indices tend to trend over time due to economic growth. Trend following buys in uptrends and sells/shorts in downtrends. Use moving averages and trendlines to identify direction.',
          keyPoints: [
            'Follow the dominant trend direction',
            'Use 50 and 200-day moving averages',
            "Markets trend about 30% of the time",
          ],
          image: { icon: 'TrendingUp', animation: 'float', color: '#22c55e' },
          task: {
            type: 'price_prediction',
            config: {
              scenario:
                'S&P 500 is above its 50-day and 200-day moving averages, making higher highs.',
              question: 'What direction would a trend follower trade?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'UP',
              explanation:
                'Above key MAs with higher highs = uptrend. Trend followers would buy.',
            },
            feedback: {
              correct: 'Exactly! Trend followers buy in confirmed uptrends.',
              incorrect:
                'When price is above MAs and making higher highs, trend followers go long.',
            },
          },
        },
        {
          id: 'day23-l3-obj2',
          title: 'Mean Reversion',
          content:
            "Mean reversion strategies bet that extreme moves will reverse. When indices are oversold (RSI below 30), they may bounce. When overbought (RSI above 70), they may pull back. This works in ranging markets.",
          keyPoints: [
            'Buy oversold, sell overbought conditions',
            'Works best in ranging/choppy markets',
            'Use RSI and Bollinger Bands',
          ],
          image: { icon: 'RefreshCw', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question:
                'A mean reversion trader sees RSI at 25. What might they do?',
              options: [
                'Sell immediately',
                'Look for buying opportunity',
                'Close all positions',
                'Switch to trend following',
              ],
              correctIndex: 1,
            },
            feedback: {
              correct:
                'Correct! RSI at 25 is oversold - mean reversion traders look to buy.',
              incorrect:
                'RSI below 30 = oversold. Mean reversion traders look for buying opportunities.',
            },
          },
        },
        {
          id: 'day23-l3-obj3',
          title: 'Breakout Trading',
          content:
            'Breakout traders enter when indices break through key support/resistance levels. Volume confirmation is crucial. False breakouts are common, so use stop losses and wait for confirmation.',
          keyPoints: [
            'Enter on breaks of key levels',
            'Confirm with volume increase',
            'Use tight stops for false breakout protection',
          ],
          image: { icon: 'ArrowUpRight', animation: 'slide', color: '#5b5fff' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'identify', label: 'Identify key level', icon: 'Target' },
                { id: 'wait', label: 'Wait for break', icon: 'Clock' },
                { id: 'confirm', label: 'Confirm with volume', icon: 'BarChart' },
                { id: 'enter', label: 'Enter trade', icon: 'ArrowRight' },
              ],
              targets: [
                { id: 'step1', label: 'Step 1', acceptsIds: ['identify'] },
                { id: 'step2', label: 'Step 2', acceptsIds: ['wait'] },
                { id: 'step3', label: 'Step 3', acceptsIds: ['confirm'] },
                { id: 'step4', label: 'Step 4', acceptsIds: ['enter'] },
              ],
              instruction: 'Arrange the breakout trading steps in order:',
            },
            feedback: {
              correct: 'Perfect sequence for breakout trading!',
              incorrect:
                'The order is: Identify level → Wait for break → Confirm volume → Enter.',
            },
          },
        },
      ],
    },
  ],
  rewards: {
    badge: {
      id: 'index-trader',
      name: 'Index Trader',
      icon: 'BarChart3',
      description: 'Learned to trade market indices',
    },
    xp: 220,
    unlocks: ['Day 24'],
  },
};

// ==================== DAY 24: ADVANCED CHART PATTERNS ====================

const day24: CurriculumDay = {
  dayNumber: 24,
  title: 'How to Use Quantrook to Select Stocks',
  emoji: '🎯',
  missionRank: 'Pattern Hunter',
  theme: 'advanced',
  lessons: [
    {
      id: 'day24-lesson1',
      dayNumber: 24,
      lessonNumber: 1,
      title: 'Complex Reversal Patterns',
      description: 'Head & shoulders, double tops/bottoms',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day24-l1-obj1',
          title: 'Head and Shoulders',
          content:
            'The head and shoulders pattern signals a trend reversal. It has three peaks: left shoulder, head (highest), and right shoulder. The neckline connects the lows. A break below the neckline confirms the reversal.',
          keyPoints: [
            'Three peaks with middle highest',
            'Neckline is key support level',
            'Break of neckline triggers sell signal',
          ],
          image: { icon: 'User', animation: 'float', color: '#ef4444' },
          task: {
            type: 'sorting',
            config: {
              items: ['Left Shoulder', 'Head', 'Right Shoulder', 'Neckline Break'],
              instruction: 'Order the H&S pattern formation from first to last:',
              correctOrder: ['Left Shoulder', 'Head', 'Right Shoulder', 'Neckline Break'],
            },
            feedback: {
              correct: 'Perfect! You understand H&S pattern formation.',
              incorrect:
                'Pattern forms: Left Shoulder → Head → Right Shoulder → Neckline Break.',
            },
          },
        },
        {
          id: 'day24-l1-obj2',
          title: 'Double Top',
          content:
            "A double top forms when price reaches a high twice but can't break through. It looks like an \"M\" shape. After the second peak fails, price often drops significantly. This pattern signals bearish reversal.",
          keyPoints: [
            'Two peaks at similar levels',
            'M-shaped pattern',
            'Break below the middle low confirms pattern',
          ],
          image: { icon: 'ChevronsUp', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'true_false',
            config: {
              statement: 'A double top pattern is bullish and signals prices will rise.',
              correctAnswer: false,
              explanation:
                'Double top is bearish! Two failed attempts to break higher = selling pressure.',
            },
            feedback: {
              correct: 'Correct! Double top is a bearish reversal pattern.',
              incorrect:
                'False! Double top is BEARISH - it signals a potential price decline.',
            },
          },
        },
        {
          id: 'day24-l1-obj3',
          title: 'Double Bottom',
          content:
            "A double bottom forms when price hits a low twice and bounces both times. It looks like a \"W\" shape. This pattern signals bullish reversal. Enter when price breaks above the middle high between the two bottoms.",
          keyPoints: [
            'Two lows at similar levels',
            'W-shaped pattern',
            'Break above the middle high confirms',
          ],
          image: { icon: 'ChevronsDown', animation: 'slide', color: '#22c55e' },
          task: {
            type: 'price_prediction',
            config: {
              scenario:
                'Bitcoin forms two lows at $30,000 with a peak at $35,000 between them. Price breaks above $35,000.',
              question: 'This double bottom breakout suggests price will go:',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'UP',
              explanation:
                'Double bottom with breakout above middle high = bullish signal!',
            },
            feedback: {
              correct: 'Correct! Double bottom breakout is bullish.',
              incorrect:
                'A double bottom with breakout above the middle high signals upward movement.',
            },
          },
        },
      ],
    },
    {
      id: 'day24-lesson2',
      dayNumber: 24,
      lessonNumber: 2,
      title: 'Continuation Patterns',
      description: 'Flags, pennants, and wedges',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day24-l2-obj1',
          title: 'Bull and Bear Flags',
          content:
            'Flags are short-term continuation patterns. A bull flag forms after a sharp rise, with price consolidating in a slight downward channel. A bear flag is the opposite. They signal the trend will likely continue.',
          keyPoints: [
            'Sharp move (flagpole) followed by consolidation (flag)',
            'Bull flag: down-sloping consolidation in uptrend',
            'Bear flag: up-sloping consolidation in downtrend',
          ],
          image: { icon: 'Flag', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'A bull flag typically forms during which market condition?',
              options: [
                'At market bottoms',
                'During an uptrend (as a pause)',
                'At market tops',
                'During downtrends',
              ],
              correctIndex: 1,
            },
            feedback: {
              correct: 'Exactly! Bull flags are pauses in uptrends.',
              incorrect:
                'Bull flags form during uptrends as brief consolidation before continuation.',
            },
          },
        },
        {
          id: 'day24-l2-obj2',
          title: 'Pennants',
          content:
            "Pennants are similar to flags but converge to a point (like a small triangle). They form after strong moves and represent indecision before the trend continues. Breakout direction is usually in the trend's direction.",
          keyPoints: [
            'Triangle-shaped consolidation',
            'Forms after strong price moves',
            'Usually continues in prior trend direction',
          ],
          image: { icon: 'Triangle', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'coin_flip',
            config: {
              instruction: 'Flip to see how pennants differ from flags...',
              revealText:
                'Pennants converge to a point (triangle shape), while flags are parallel channels!',
            },
            feedback: {
              correct: 'Key difference understood!',
              incorrect: 'Key difference understood!',
            },
          },
        },
        {
          id: 'day24-l2-obj3',
          title: 'Wedges',
          content:
            'Wedges are converging patterns where both trendlines slope in the same direction. Rising wedges are bearish (price breaks down). Falling wedges are bullish (price breaks up). Counter-intuitive but reliable!',
          keyPoints: [
            'Both lines slope same direction',
            'Rising wedge = bearish (breaks down)',
            'Falling wedge = bullish (breaks up)',
          ],
          image: { icon: 'ChevronRight', animation: 'slide', color: '#22c55e' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Rising Wedge', right: 'Bearish (breaks down)' },
                { left: 'Falling Wedge', right: 'Bullish (breaks up)' },
                { left: 'Bull Flag', right: 'Bullish continuation' },
                { left: 'Bear Flag', right: 'Bearish continuation' },
              ],
              instruction: 'Match patterns with their expected outcome:',
            },
            feedback: {
              correct: 'Excellent pattern recognition!',
              incorrect:
                'Rising wedge = bearish, Falling wedge = bullish. Flags continue the trend.',
            },
          },
        },
      ],
    },
    {
      id: 'day24-lesson3',
      dayNumber: 24,
      lessonNumber: 3,
      title: 'Triangle Patterns',
      description: 'Symmetrical, ascending, descending triangles',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day24-l3-obj1',
          title: 'Symmetrical Triangles',
          content:
            'Symmetrical triangles have converging trendlines with no clear bias - lower highs meet higher lows. They can break either direction, so wait for confirmed breakout. Often continue the prior trend.',
          keyPoints: [
            'Converging lines with no clear bias',
            'Can break either direction',
            'Often continues prior trend direction',
          ],
          image: { icon: 'Triangle', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement:
                'Symmetrical triangles always break to the upside.',
              correctAnswer: false,
              explanation:
                'Symmetrical triangles can break either way - wait for confirmation!',
            },
            feedback: {
              correct: 'Correct! Symmetrical triangles are neutral until breakout.',
              incorrect:
                'False! Symmetrical triangles can break either direction.',
            },
          },
        },
        {
          id: 'day24-l3-obj2',
          title: 'Ascending Triangles',
          content:
            'Ascending triangles have a flat top (resistance) and rising bottom (higher lows). Buyers are getting more aggressive. This is typically bullish - expect upside breakout through resistance.',
          keyPoints: [
            'Flat top, rising bottom',
            'Higher lows show buyer strength',
            'Usually bullish - breaks up',
          ],
          image: { icon: 'TrendingUp', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'price_prediction',
            config: {
              scenario:
                'ETH shows flat resistance at $2,000 with higher lows forming (ascending triangle).',
              question: 'Which direction is the most likely breakout?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'UP',
              explanation:
                'Ascending triangles with higher lows typically break upward!',
            },
            feedback: {
              correct: 'Correct! Ascending triangles are bullish patterns.',
              incorrect:
                'Ascending triangles (flat top, rising bottom) typically break upward.',
            },
          },
        },
        {
          id: 'day24-l3-obj3',
          title: 'Descending Triangles',
          content:
            'Descending triangles have a flat bottom (support) and falling top (lower highs). Sellers are getting more aggressive. This is typically bearish - expect downside breakout through support.',
          keyPoints: [
            'Flat bottom, falling top',
            'Lower highs show seller strength',
            'Usually bearish - breaks down',
          ],
          image: { icon: 'TrendingDown', animation: 'slide', color: '#ef4444' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'asc', label: 'Ascending Triangle', icon: 'ArrowUp' },
                { id: 'desc', label: 'Descending Triangle', icon: 'ArrowDown' },
                { id: 'sym', label: 'Symmetrical Triangle', icon: 'ArrowLeftRight' },
              ],
              targets: [
                { id: 'bullish', label: 'Bullish', acceptsIds: ['asc'] },
                { id: 'bearish', label: 'Bearish', acceptsIds: ['desc'] },
                { id: 'neutral', label: 'Neutral', acceptsIds: ['sym'] },
              ],
              instruction: 'Match each triangle to its typical bias:',
            },
            feedback: {
              correct: 'Perfect classification of triangle patterns!',
              incorrect:
                'Ascending = Bullish, Descending = Bearish, Symmetrical = Neutral.',
            },
          },
        },
      ],
    },
  ],
  rewards: {
    badge: {
      id: 'pattern-hunter',
      name: 'Pattern Hunter',
      icon: 'Target',
      description: 'Mastered advanced chart patterns',
    },
    xp: 230,
    unlocks: ['Day 25'],
  },
};

// ==================== DAY 25: TRADING PSYCHOLOGY ====================

const day25: CurriculumDay = {
  dayNumber: 25,
  title: 'Building a Smart Portfolio & Asset Diversification',
  emoji: '🧠',
  missionRank: 'Mind Master',
  theme: 'advanced',
  lessons: [
    {
      id: 'day25-lesson1',
      dayNumber: 25,
      lessonNumber: 1,
      title: 'Emotions in Trading',
      description: 'Understanding fear, greed, and FOMO',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day25-l1-obj1',
          title: 'Fear and Greed',
          content:
            'Fear causes traders to exit winning trades too early or avoid good setups. Greed leads to overtrading, excessive position sizes, and holding losers too long. Both emotions can destroy accounts.',
          keyPoints: [
            'Fear: Exit too early, miss opportunities',
            'Greed: Overtrade, oversized positions',
            'Both lead to poor decision-making',
          ],
          image: { icon: 'Heart', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Fear', right: 'Exiting winners too early' },
                { left: 'Greed', right: 'Taking oversized positions' },
                { left: 'FOMO', right: 'Chasing pumping assets' },
                { left: 'Revenge trading', right: 'Trading to recover losses' },
              ],
              instruction: 'Match each emotion with its typical behavior:',
            },
            feedback: {
              correct: 'Excellent emotional awareness!',
              incorrect:
                'Understanding these emotion-behavior links is key to improvement.',
            },
          },
        },
        {
          id: 'day25-l1-obj2',
          title: 'FOMO - Fear of Missing Out',
          content:
            "FOMO drives traders to chase pumping assets at terrible prices. When you see something mooning, the easy gains are usually over. Chasing FOMO leads to buying tops and selling bottoms. There's always another opportunity.",
          keyPoints: [
            'Chasing leads to buying tops',
            'If everyone is talking about it, you are late',
            'Missed opportunities come back in different forms',
          ],
          image: { icon: 'Rocket', animation: 'float', color: '#f59e0b' },
          task: {
            type: 'price_prediction',
            config: {
              scenario:
                'A coin just pumped 200% in an hour. Everyone on social media is buying. You feel the urge to buy.',
              question:
                'What typically happens to FOMO buyers in this scenario?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'DOWN',
              explanation:
                'FOMO buyers usually catch the top. The best time to buy was before the hype.',
            },
            feedback: {
              correct: 'Wise! FOMO buying usually leads to losses.',
              incorrect:
                'FOMO buyers typically catch the top and suffer losses as the pump fades.',
            },
          },
        },
        {
          id: 'day25-l1-obj3',
          title: 'Revenge Trading',
          content:
            "After a loss, the urge to \"win it back\" is powerful. Revenge trading leads to larger positions, worse setups, and more losses. The market doesn't owe you anything. Step away after big losses.",
          keyPoints: [
            'Desire to quickly recover losses',
            'Leads to poor decisions and larger losses',
            'Take breaks after significant losses',
          ],
          image: { icon: 'Angry', animation: 'slide', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question:
                "You just lost 10% of your account. What's the best response?",
              options: [
                'Double your next position to win it back',
                'Take a break and review what went wrong',
                'Keep trading to stay in the market',
                'Switch to a more volatile asset',
              ],
              correctIndex: 1,
            },
            feedback: {
              correct: 'Perfect! Taking a break prevents revenge trading spiral.',
              incorrect:
                'After a significant loss, take a break and analyze. Never revenge trade.',
            },
          },
        },
      ],
    },
    {
      id: 'day25-lesson2',
      dayNumber: 25,
      lessonNumber: 2,
      title: 'Cognitive Biases',
      description: 'Mental traps that hurt traders',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day25-l2-obj1',
          title: 'Confirmation Bias',
          content:
            "Confirmation bias makes us seek information that supports our existing beliefs and ignore contradicting evidence. If you're bullish, you'll see only bullish signals. Always actively seek opposing viewpoints.",
          keyPoints: [
            'We filter for agreeing information',
            'Dangerous when we ignore warning signs',
            'Actively seek bearish views when bullish (and vice versa)',
          ],
          image: { icon: 'CheckCircle', animation: 'pulse', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement:
                'If you are bullish on a stock, you should only read positive analysis to stay confident.',
              correctAnswer: false,
              explanation:
                'This is confirmation bias! Always seek opposing viewpoints to make balanced decisions.',
            },
            feedback: {
              correct: 'Correct! Seeking only confirming info is dangerous.',
              incorrect:
                'False! Seeking only confirming information leads to blind spots and losses.',
            },
          },
        },
        {
          id: 'day25-l2-obj2',
          title: 'Anchoring Bias',
          content:
            'Anchoring makes us fixate on specific prices. If you bought BTC at $60K, you might wait to \"break even\" even when fundamentals changed. The market doesn\'t care about your entry price.',
          keyPoints: [
            'Fixating on entry prices or historical levels',
            "Your entry price is irrelevant to future movement",
            'Make decisions based on current information',
          ],
          image: { icon: 'Anchor', animation: 'float', color: '#f59e0b' },
          task: {
            type: 'coin_flip',
            config: {
              instruction: 'Flip to reveal a truth about anchoring...',
              revealText:
                'The market has no memory of YOUR entry price. Only current supply, demand, and sentiment matter.',
            },
            feedback: {
              correct: 'Important insight about anchoring!',
              incorrect: 'Important insight about anchoring!',
            },
          },
        },
        {
          id: 'day25-l2-obj3',
          title: 'Sunk Cost Fallacy',
          content:
            'The sunk cost fallacy makes us hold losers because we\'ve already lost so much. "I\'ve already lost 50%, I might as well hold." This logic is flawed. Each moment is a fresh decision point.',
          keyPoints: [
            'Holding losers because of prior losses',
            "Past losses shouldn't influence future decisions",
            "Ask: Would I buy this today at this price?",
          ],
          image: { icon: 'Trash2', animation: 'slide', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question:
                "You're down 60% on a stock with worsening fundamentals. What question helps overcome sunk cost fallacy?",
              options: [
                'How much more can I lose?',
                'Would I buy this stock today at this price?',
                'What was my original target price?',
                'When will it recover to my entry?',
              ],
              correctIndex: 1,
            },
            feedback: {
              correct: 'Exactly! Each day is a fresh buy/sell decision.',
              incorrect:
                "Ask: \"Would I buy this today?\" If no, consider selling regardless of past losses.",
            },
          },
        },
      ],
    },
    {
      id: 'day25-lesson3',
      dayNumber: 25,
      lessonNumber: 3,
      title: 'Building Mental Discipline',
      description: 'Developing a winning mindset',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day25-l3-obj1',
          title: 'Trading Plan Discipline',
          content:
            'A trading plan defines your rules: entry criteria, exit rules, position sizing, and risk limits. Following your plan removes emotion from decisions. No plan = gambling.',
          keyPoints: [
            'Written rules before any trade',
            'Define entries, exits, and risk BEFORE trading',
            'Following the plan is more important than any single trade',
          ],
          image: { icon: 'FileText', animation: 'float', color: '#22c55e' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'entry', label: 'Entry Criteria', icon: 'LogIn' },
                { id: 'exit', label: 'Exit Rules', icon: 'LogOut' },
                { id: 'size', label: 'Position Size', icon: 'Sliders' },
                { id: 'risk', label: 'Risk Limits', icon: 'Shield' },
              ],
              targets: [
                { id: 'plan', label: 'Trading Plan Components', acceptsIds: ['entry', 'exit', 'size', 'risk'] },
              ],
              instruction: 'Drag all essential trading plan components:',
            },
            feedback: {
              correct: 'All essential plan components identified!',
              incorrect:
                'A complete trading plan needs: Entry criteria, Exit rules, Position sizing, and Risk limits.',
            },
          },
        },
        {
          id: 'day25-l3-obj2',
          title: 'Journal Your Trades',
          content:
            'A trading journal tracks every trade with your reasoning, emotions, and results. Reviewing your journal reveals patterns: when you trade well and when you make mistakes. This is how you improve.',
          keyPoints: [
            'Record every trade and your reasoning',
            'Note your emotional state',
            'Review weekly to find patterns',
          ],
          image: { icon: 'BookOpen', animation: 'pulse', color: '#5b5fff' },
          task: {
            type: 'sorting',
            config: {
              items: [
                'Entry reason',
                'Position size',
                'Emotional state',
                'Result & lessons',
              ],
              instruction: 'What should a trade journal entry include? (Select all)',
              correctOrder: [
                'Entry reason',
                'Position size',
                'Emotional state',
                'Result & lessons',
              ],
            },
            feedback: {
              correct: 'Complete journal entry components!',
              incorrect:
                'Include: Entry reason, Position size, Emotional state, and Results/lessons.',
            },
          },
        },
        {
          id: 'day25-l3-obj3',
          title: 'Accepting Losses',
          content:
            'Losses are tuition fees for trading education. Even the best traders lose 40-50% of their trades. What matters is that winners are bigger than losers. Accept losses as part of the game.',
          keyPoints: [
            'Losses are inevitable and normal',
            'Focus on win SIZE not win RATE',
            'Small losses + big wins = profitability',
          ],
          image: { icon: 'Shield', animation: 'slide', color: '#22c55e' },
          task: {
            type: 'slider',
            config: {
              question:
                'Professional traders typically win what percentage of their trades?',
              min: 30,
              max: 90,
              step: 10,
              labels: ['30%', '45%', '60%', '75%', '90%'],
              revealAnswer:
                'Many successful traders win only 40-50% of trades! They profit by having bigger winners than losers.',
            },
            feedback: {
              correct: 'You understand that win rate is not everything!',
              incorrect:
                "Many pros win only 40-50% of trades. Profitability comes from win SIZE, not rate.",
            },
          },
        },
      ],
    },
  ],
  rewards: {
    badge: {
      id: 'mind-master',
      name: 'Mind Master',
      icon: 'Brain',
      description: 'Mastered trading psychology',
    },
    xp: 240,
    unlocks: ['Day 26'],
  },
};

// ==================== DAY 26: BUILDING YOUR TRADING SYSTEM ====================

const day26: CurriculumDay = {
  dayNumber: 26,
  title: 'Financial Freedom & Building Your Investment Goals',
  emoji: '⚙️',
  missionRank: 'System Builder',
  theme: 'advanced',
  lessons: [
    {
      id: 'day26-lesson1',
      dayNumber: 26,
      lessonNumber: 1,
      title: 'System Components',
      description: 'Elements of a complete trading system',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day26-l1-obj1',
          title: 'Market Selection',
          content:
            'Your system starts with choosing markets: Forex, crypto, stocks, commodities? Each has different characteristics. Focus on 1-3 markets initially. Specialization beats diversification when learning.',
          keyPoints: [
            'Choose markets matching your schedule and capital',
            'Start with 1-3 markets to specialize',
            'Understand each market\'s unique behavior',
          ],
          image: { icon: 'Compass', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'When building your first trading system, how many markets should you focus on?',
              options: [
                'As many as possible for diversification',
                '1-3 markets to specialize',
                'Only Bitcoin',
                'At least 10 different markets',
              ],
              correctIndex: 1,
            },
            feedback: {
              correct: 'Correct! Specialization beats diversification when learning.',
              incorrect:
                'Start with 1-3 markets. Specialization helps you learn patterns and quirks.',
            },
          },
        },
        {
          id: 'day26-l1-obj2',
          title: 'Timeframe Selection',
          content:
            'Your timeframe determines trade frequency and style. Daily charts suit part-time traders. 1-hour charts for active traders. 5-minute charts for full-time day traders. Match timeframe to your lifestyle.',
          keyPoints: [
            'Daily/4H: Swing trading, part-time friendly',
            '1H/15min: Active trading, needs more time',
            '5min/1min: Day trading, full-time commitment',
          ],
          image: { icon: 'Clock', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Daily charts', right: 'Part-time traders' },
                { left: '1-hour charts', right: 'Active traders' },
                { left: '5-minute charts', right: 'Full-time day traders' },
              ],
              instruction: 'Match timeframes with suitable trader types:',
            },
            feedback: {
              correct: 'Great timeframe matching!',
              incorrect:
                'Daily = part-time, 1H = active, 5min = full-time day traders.',
            },
          },
        },
        {
          id: 'day26-l1-obj3',
          title: 'Entry Rules',
          content:
            'Entry rules define exactly when to buy or sell. Use specific criteria: indicator values, pattern completions, price levels. Vague entries lead to inconsistent results. Be precise and testable.',
          keyPoints: [
            'Specific, measurable conditions',
            'Multiple confirmations reduce false signals',
            'Write rules that anyone could follow',
          ],
          image: { icon: 'Target', animation: 'slide', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement:
                'A good entry rule is: "Buy when the chart looks bullish."',
              correctAnswer: false,
              explanation:
                'Too vague! Good rules are specific: "Buy when RSI crosses above 30 AND price closes above 20 EMA."',
            },
            feedback: {
              correct: 'Correct! Rules must be specific and measurable.',
              incorrect:
                'False! Rules must be specific. Example: "Buy when RSI > 30 AND price > 20 EMA."',
            },
          },
        },
      ],
    },
    {
      id: 'day26-lesson2',
      dayNumber: 26,
      lessonNumber: 2,
      title: 'Exit Strategies',
      description: 'When and how to close positions',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day26-l2-obj1',
          title: 'Stop Loss Placement',
          content:
            'Stops should be placed at levels where your trade thesis is invalidated, not at random percentages. Use structure: below support for longs, above resistance for shorts. Give trades room to breathe.',
          keyPoints: [
            'Place at logical invalidation points',
            'Use price structure, not arbitrary %',
            'Too tight = stopped out too often',
          ],
          image: { icon: 'ShieldOff', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Where should you place a stop loss for a long trade?',
              options: [
                'Always 2% below entry',
                'Below the nearest support level',
                'As tight as possible',
                'Stops are not necessary',
              ],
              correctIndex: 1,
            },
            feedback: {
              correct: 'Correct! Use structural levels like support for stop placement.',
              incorrect:
                'Place stops at logical invalidation points, like below support for longs.',
            },
          },
        },
        {
          id: 'day26-l2-obj2',
          title: 'Take Profit Targets',
          content:
            'Take profits can be fixed (risk:reward ratio), trailing (follow price), or at key levels (resistance). Having a target prevents holding through reversals. Consider scaling out partially.',
          keyPoints: [
            'Fixed targets: 2:1 or 3:1 risk:reward',
            'Trailing stops: Lock in profits as price moves',
            'Scale out: Take partial profits at levels',
          ],
          image: { icon: 'DollarSign', animation: 'float', color: '#22c55e' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'fixed', label: 'Fixed R:R Target', icon: 'Target' },
                { id: 'trail', label: 'Trailing Stop', icon: 'TrendingUp' },
                { id: 'scale', label: 'Scale Out', icon: 'Layers' },
              ],
              targets: [
                { id: 'exit', label: 'Exit Strategy Types', acceptsIds: ['fixed', 'trail', 'scale'] },
              ],
              instruction: 'Drag all valid exit strategy types:',
            },
            feedback: {
              correct: 'You know your exit strategy options!',
              incorrect:
                'Valid exits: Fixed targets, Trailing stops, and Scaling out.',
            },
          },
        },
        {
          id: 'day26-l2-obj3',
          title: 'Time-Based Exits',
          content:
            'Sometimes a trade just does nothing. Time-based exits close positions that haven\'t moved as expected. Example: "If not in profit after 5 bars, exit." This frees capital for better opportunities.',
          keyPoints: [
            'Exit if trade stagnates',
            'Opportunity cost of stuck capital',
            'Define maximum time to give a trade',
          ],
          image: { icon: 'Timer', animation: 'slide', color: '#5b5fff' },
          task: {
            type: 'coin_flip',
            config: {
              instruction: 'Flip to reveal why time exits matter...',
              revealText:
                "Money in a stagnant trade can't work elsewhere. Time is a resource - use it wisely!",
            },
            feedback: {
              correct: 'Time is money in trading!',
              incorrect: 'Time is money in trading!',
            },
          },
        },
      ],
    },
    {
      id: 'day26-lesson3',
      dayNumber: 26,
      lessonNumber: 3,
      title: 'System Testing',
      description: 'Validating your trading system',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day26-l3-obj1',
          title: 'Backtesting',
          content:
            'Backtesting applies your rules to historical data. This reveals expected win rate, average win/loss, and drawdowns. Test on years of data including different market conditions.',
          keyPoints: [
            'Test rules on historical data',
            'Include bull, bear, and sideways markets',
            'Document all results',
          ],
          image: { icon: 'History', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'sorting',
            config: {
              items: ['Bull market', 'Bear market', 'Sideways market', 'High volatility'],
              instruction: 'What market conditions should you backtest? (All are important)',
              correctOrder: ['Bull market', 'Bear market', 'Sideways market', 'High volatility'],
            },
            feedback: {
              correct: 'Test in all market conditions!',
              incorrect: 'A robust system should be tested in all market conditions.',
            },
          },
        },
        {
          id: 'day26-l3-obj2',
          title: 'Paper Trading',
          content:
            "Paper trading tests your system in real-time without real money. Trade your system for 1-3 months minimum. This reveals execution issues backtesting misses: slippage, emotions, and real-time decision-making.",
          keyPoints: [
            'Real-time testing without risk',
            'Reveals execution challenges',
            'Paper trade for 1-3 months minimum',
          ],
          image: { icon: 'FileEdit', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'slider',
            config: {
              question: 'How long should you paper trade before going live?',
              min: 1,
              max: 12,
              step: 1,
              labels: ['1 week', '1 month', '3 months', '6 months', '12 months'],
              revealAnswer:
                '1-3 months minimum! This gives time to experience different market conditions.',
            },
            feedback: {
              correct: 'Good understanding of paper trading duration!',
              incorrect:
                'Paper trade for at least 1-3 months before risking real capital.',
            },
          },
        },
        {
          id: 'day26-l3-obj3',
          title: 'Going Live',
          content:
            'When paper trading is profitable, start live with small size. Scale up gradually as you prove consistency. Many traders blow up by sizing too big too soon. Patience in scaling is key.',
          keyPoints: [
            'Start small when going live',
            'Scale size only after proving consistency',
            'Emotions hit different with real money',
          ],
          image: { icon: 'Rocket', animation: 'slide', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'After profitable paper trading, what should you do?',
              options: [
                'Go all in with maximum size',
                'Start small and scale up gradually',
                'Skip live trading and teach others',
                'Backtest more before ever going live',
              ],
              correctIndex: 1,
            },
            feedback: {
              correct: 'Perfect! Start small, scale with proven consistency.',
              incorrect:
                'Always start live trading with small size and scale up gradually.',
            },
          },
        },
      ],
    },
  ],
  rewards: {
    badge: {
      id: 'system-builder',
      name: 'System Builder',
      icon: 'Wrench',
      description: 'Built a complete trading system',
    },
    xp: 250,
    unlocks: ['Day 27'],
  },
};

// ==================== DAY 27: PORTFOLIO MANAGEMENT ====================

const day27: CurriculumDay = {
  dayNumber: 27,
  title: 'Violations & Prohibited Practices in Financial Markets',
  emoji: '📁',
  missionRank: 'Portfolio Pro',
  theme: 'advanced',
  lessons: [
    {
      id: 'day27-lesson1',
      dayNumber: 27,
      lessonNumber: 1,
      title: 'Diversification',
      description: 'Spreading risk across assets',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day27-l1-obj1',
          title: 'Why Diversify?',
          content:
            'Diversification reduces risk by spreading capital across different assets. When one asset falls, others may rise or stay stable. "Don\'t put all eggs in one basket" is timeless investing wisdom.',
          keyPoints: [
            'Reduces impact of single asset losses',
            'Different assets react differently to events',
            'Smooths overall portfolio returns',
          ],
          image: { icon: 'PieChart', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement:
                'Putting 100% of your portfolio in one asset is a good strategy because it maximizes potential gains.',
              correctAnswer: false,
              explanation:
                'Concentration maximizes risk too! Diversification protects against catastrophic losses.',
            },
            feedback: {
              correct: 'Correct! Concentration is risky - diversify!',
              incorrect:
                'False! 100% in one asset means 100% loss potential. Always diversify.',
            },
          },
        },
        {
          id: 'day27-l1-obj2',
          title: 'Correlation Matters',
          content:
            "Effective diversification requires uncorrelated assets. BTC and ETH often move together (high correlation). BTC and Gold may move differently (lower correlation). Diversifying into correlated assets doesn't reduce risk much.",
          keyPoints: [
            'Correlated assets move together',
            'True diversification needs uncorrelated assets',
            'Mix asset classes: stocks, bonds, commodities, crypto',
          ],
          image: { icon: 'GitMerge', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'BTC and ETH', right: 'High correlation' },
                { left: 'Stocks and Bonds', right: 'Often negative correlation' },
                { left: 'Gold and USD', right: 'Often inverse' },
              ],
              instruction: 'Match asset pairs with their typical correlation:',
            },
            feedback: {
              correct: 'Good correlation awareness!',
              incorrect:
                'BTC/ETH move together. Stocks/Bonds often inverse. Gold/USD often inverse.',
            },
          },
        },
        {
          id: 'day27-l1-obj3',
          title: 'Over-Diversification',
          content:
            'Too much diversification dilutes returns and is hard to manage. Owning 50+ positions means no single winner matters much. Find balance: enough diversification to reduce risk, but concentrated enough for meaningful gains.',
          keyPoints: [
            'Too many positions dilute returns',
            '10-20 positions often optimal for active traders',
            'Know every position well',
          ],
          image: { icon: 'Layers', animation: 'slide', color: '#ef4444' },
          task: {
            type: 'slider',
            config: {
              question: 'For active traders, how many positions is often optimal?',
              min: 5,
              max: 50,
              step: 5,
              labels: ['5', '15', '25', '35', '50'],
              revealAnswer:
                '10-20 positions often balances diversification with manageability and return potential.',
            },
            feedback: {
              correct: 'Good balance understanding!',
              incorrect:
                '10-20 positions often optimal - enough diversification without diluting returns.',
            },
          },
        },
      ],
    },
    {
      id: 'day27-lesson2',
      dayNumber: 27,
      lessonNumber: 2,
      title: 'Rebalancing',
      description: 'Maintaining target allocations',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day27-l2-obj1',
          title: 'What Is Rebalancing?',
          content:
            'As assets move differently, your allocation drifts from targets. If stocks rally, they become overweight. Rebalancing sells winners and buys losers to restore targets. This enforces "buy low, sell high."',
          keyPoints: [
            'Allocation drifts as prices change',
            'Sell winners, buy losers to rebalance',
            'Enforces disciplined profit-taking',
          ],
          image: { icon: 'RefreshCw', animation: 'float', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question:
                'Your target is 50% stocks, 50% crypto. Stocks rallied to 70%. What does rebalancing involve?',
              options: [
                'Buy more stocks',
                'Sell stocks, buy crypto',
                'Do nothing',
                'Sell everything',
              ],
              correctIndex: 1,
            },
            feedback: {
              correct: 'Correct! Sell the overweight position, buy the underweight.',
              incorrect:
                'Rebalancing means selling stocks (overweight) and buying crypto (underweight).',
            },
          },
        },
        {
          id: 'day27-l2-obj2',
          title: 'Rebalancing Frequency',
          content:
            'Rebalance on a schedule (monthly, quarterly) or by threshold (when allocation drifts 5%+). Too frequent = excessive trading costs. Too rare = drift too far from targets. Quarterly rebalancing is common.',
          keyPoints: [
            'Calendar-based: Monthly, quarterly, annually',
            'Threshold-based: When drift exceeds limit',
            'Quarterly rebalancing is popular',
          ],
          image: { icon: 'Calendar', animation: 'pulse', color: '#5b5fff' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'calendar', label: 'Calendar-Based', icon: 'Calendar' },
                { id: 'threshold', label: 'Threshold-Based', icon: 'Percent' },
              ],
              targets: [
                { id: 'rebal', label: 'Rebalancing Methods', acceptsIds: ['calendar', 'threshold'] },
              ],
              instruction: 'What are the two main rebalancing approaches?',
            },
            feedback: {
              correct: 'Calendar and threshold-based are the main methods!',
              incorrect:
                'The two approaches are: Calendar-based (fixed dates) and Threshold-based (drift limits).',
            },
          },
        },
        {
          id: 'day27-l2-obj3',
          title: 'Tax Considerations',
          content:
            'Rebalancing can trigger taxable events. In tax-advantaged accounts (401k, IRA), rebalance freely. In taxable accounts, consider tax-loss harvesting and holding periods. Consult a tax professional.',
          keyPoints: [
            'Selling creates taxable events',
            'Tax-advantaged accounts: Rebalance freely',
            'Consider long-term vs short-term gains',
          ],
          image: { icon: 'Receipt', animation: 'slide', color: '#f59e0b' },
          task: {
            type: 'true_false',
            config: {
              statement:
                'In a 401k or IRA, rebalancing does not trigger immediate taxes.',
              correctAnswer: true,
              explanation:
                'Tax-advantaged accounts let you rebalance without immediate tax consequences.',
            },
            feedback: {
              correct: 'Correct! Tax-advantaged accounts defer taxes.',
              incorrect:
                'True! 401k and IRA accounts are tax-advantaged - rebalancing is tax-free inside them.',
            },
          },
        },
      ],
    },
    {
      id: 'day27-lesson3',
      dayNumber: 27,
      lessonNumber: 3,
      title: 'Performance Tracking',
      description: 'Measuring and improving results',
      estimatedMinutes: 8,
      objectives: [
        {
          id: 'day27-l3-obj1',
          title: 'Key Metrics',
          content:
            'Track these metrics: Total return, win rate, average win vs loss, maximum drawdown, and Sharpe ratio. These reveal if your strategy is working and where to improve.',
          keyPoints: [
            'Total return: Overall profit/loss',
            'Win rate: Percentage of winning trades',
            'Max drawdown: Largest peak-to-trough decline',
          ],
          image: { icon: 'BarChart2', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'sorting',
            config: {
              items: ['Total Return', 'Win Rate', 'Max Drawdown', 'Sharpe Ratio'],
              instruction: 'Arrange key trading metrics (all are important):',
              correctOrder: ['Total Return', 'Win Rate', 'Max Drawdown', 'Sharpe Ratio'],
            },
            feedback: {
              correct: 'All these metrics matter for evaluation!',
              incorrect:
                'Key metrics: Total Return, Win Rate, Max Drawdown, and Sharpe Ratio.',
            },
          },
        },
        {
          id: 'day27-l3-obj2',
          title: 'Comparing to Benchmarks',
          content:
            'Compare your performance to relevant benchmarks. If trading stocks, compare to S&P 500. If trading crypto, compare to BTC. Beating benchmarks shows your strategy adds value beyond just holding.',
          keyPoints: [
            'Use relevant benchmarks',
            'Beat the benchmark to prove alpha',
            'If underperforming, consider indexing',
          ],
          image: { icon: 'Scale', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question:
                'You made 15% trading stocks this year. The S&P 500 made 20%. How did you do?',
              options: [
                'Great - you made money!',
                'Poor - you underperformed the benchmark',
                'Neither - impossible to evaluate',
                'Excellent - 15% is always good',
              ],
              correctIndex: 1,
            },
            feedback: {
              correct:
                'Correct. Making money is good, but you underperformed just holding SPY!',
              incorrect:
                'While 15% is positive, underperforming the 20% benchmark means holding index was better.',
            },
          },
        },
        {
          id: 'day27-l3-obj3',
          title: 'Continuous Improvement',
          content:
            'Review performance monthly/quarterly. Identify what works and what does not. Refine rules, eliminate unprofitable setups, and double down on strengths. Trading is a process of constant improvement.',
          keyPoints: [
            'Regular performance reviews',
            'Cut what does not work',
            'Scale what does work',
          ],
          image: { icon: 'TrendingUp', animation: 'slide', color: '#ef4444' },
          task: {
            type: 'coin_flip',
            config: {
              instruction: 'Flip to reveal the key to long-term trading success...',
              revealText:
                'The best traders never stop learning and adapting. Markets evolve - you must too!',
            },
            feedback: {
              correct: 'Continuous improvement is the edge!',
              incorrect: 'Continuous improvement is the edge!',
            },
          },
        },
      ],
    },
  ],
  rewards: {
    badge: {
      id: 'portfolio-pro',
      name: 'Portfolio Pro',
      icon: 'Briefcase',
      description: 'Mastered portfolio management',
    },
    xp: 260,
    unlocks: ['Day 28'],
  },
};

// ==================== DAY 28: FINAL CHALLENGE ====================

const day28: CurriculumDay = {
  dayNumber: 28,
  title: '⚡ Final Day: Practical Application + Case Study + Final Exam',
  emoji: '🏆',
  missionRank: 'Trading Master',
  theme: 'advanced',
  lessons: [
    {
      id: 'day28-lesson1',
      dayNumber: 28,
      lessonNumber: 1,
      title: 'Technical Analysis Mastery',
      description: 'Test your chart reading skills',
      estimatedMinutes: 10,
      objectives: [
        {
          id: 'day28-l1-obj1',
          title: 'Pattern Recognition Test',
          content:
            "Time to prove your pattern recognition skills! You've learned about candlesticks, chart patterns, and indicators. Now let's see if you can identify patterns in real scenarios.",
          keyPoints: [
            'Apply all pattern knowledge',
            'Combine multiple signals',
            'Think like a professional trader',
          ],
          image: { icon: 'Eye', animation: 'pulse', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question:
                'You see: Head & Shoulders pattern, RSI at 75, price at resistance, and decreasing volume. What is the bias?',
              options: [
                'Strongly bullish - buy more',
                'Strongly bearish - multiple sell signals',
                'Neutral - signals are mixed',
                'Need more information',
              ],
              correctIndex: 1,
            },
            feedback: {
              correct:
                'Excellent! H&S + overbought RSI + resistance + declining volume = bearish confluence!',
              incorrect:
                'All signals point bearish: H&S reversal, overbought RSI, resistance, weak volume.',
            },
          },
        },
        {
          id: 'day28-l1-obj2',
          title: 'Multi-Timeframe Analysis',
          content:
            'Professional traders analyze multiple timeframes. The higher timeframe shows the trend, lower timeframe shows entry. Alignment across timeframes increases probability of success.',
          keyPoints: [
            'Higher TF: Direction and major levels',
            'Lower TF: Entry timing and precision',
            'Look for alignment across timeframes',
          ],
          image: { icon: 'Layers', animation: 'float', color: '#f59e0b' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Daily chart', right: 'Overall trend direction' },
                { left: '4-hour chart', right: 'Key levels and structure' },
                { left: '1-hour chart', right: 'Entry timing' },
                { left: '15-min chart', right: 'Precise execution' },
              ],
              instruction: 'Match timeframes with their primary use:',
            },
            feedback: {
              correct: 'Perfect multi-timeframe understanding!',
              incorrect:
                'Higher TF = trend/direction. Lower TF = entries/execution.',
            },
          },
        },
        {
          id: 'day28-l1-obj3',
          title: 'Indicator Confluence',
          content:
            'No single indicator is perfect. Confluence means multiple indicators agreeing. When RSI, MACD, and price action all signal the same direction, probability increases significantly.',
          keyPoints: [
            'Multiple confirming signals > single signal',
            'Combine trend, momentum, and volume indicators',
            'More confluence = higher probability trade',
          ],
          image: { icon: 'Crosshair', animation: 'slide', color: '#22c55e' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'trend', label: 'Moving Averages (Trend)', icon: 'TrendingUp' },
                { id: 'momentum', label: 'RSI/MACD (Momentum)', icon: 'Activity' },
                { id: 'volume', label: 'Volume (Confirmation)', icon: 'BarChart' },
              ],
              targets: [
                { id: 'conf', label: 'Confluence System', acceptsIds: ['trend', 'momentum', 'volume'] },
              ],
              instruction: 'Build a confluence system with different indicator types:',
            },
            feedback: {
              correct: 'Excellent! Trend + Momentum + Volume = strong confluence.',
              incorrect:
                'A good confluence system combines: Trend (MAs), Momentum (RSI/MACD), and Volume.',
            },
          },
        },
      ],
    },
    {
      id: 'day28-lesson2',
      dayNumber: 28,
      lessonNumber: 2,
      title: 'Risk & Psychology Test',
      description: 'Prove your risk management mastery',
      estimatedMinutes: 10,
      objectives: [
        {
          id: 'day28-l2-obj1',
          title: 'Position Sizing Challenge',
          content:
            "You have a $10,000 account and risk 2% per trade. Your stop loss is 5% below entry. How much can you buy? This is a critical skill every trader must master.",
          keyPoints: [
            'Risk amount = Account × Risk percentage',
            'Position size = Risk amount ÷ Stop loss distance',
            'Never risk more than you can afford to lose',
          ],
          image: { icon: 'Calculator', animation: 'float', color: '#ef4444' },
          task: {
            type: 'slider',
            config: {
              question:
                '$10,000 account, 2% risk ($200), 5% stop loss. What position size?',
              min: 1000,
              max: 10000,
              step: 1000,
              labels: ['$1K', '$2.5K', '$4K', '$5.5K', '$7K', '$8.5K', '$10K'],
              revealAnswer:
                '$4,000! If you lose 5% on $4,000 = $200 = 2% of your account.',
            },
            feedback: {
              correct: 'Perfect position sizing! $4,000 × 5% = $200 = 2% risk.',
              incorrect:
                'Position = Risk ÷ Stop = $200 ÷ 5% = $4,000. This way a 5% loss equals $200.',
            },
          },
        },
        {
          id: 'day28-l2-obj2',
          title: 'Psychology Scenario',
          content:
            "You're up 50% on a position. It starts pulling back. Your target was 100%. Greed says hold for more, fear says take profit now. What's the disciplined approach?",
          keyPoints: [
            'Stick to your original plan',
            'Consider partial profit-taking',
            'Move stop to break-even to lock in gains',
          ],
          image: { icon: 'Brain', animation: 'pulse', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question:
                'Up 50%, target is 100%, position pulling back. Best disciplined action?',
              options: [
                'Sell everything to lock in profit',
                'Hold and hope it reaches 100%',
                'Take partial profit, move stop to breakeven',
                'Add more to average up',
              ],
              correctIndex: 2,
            },
            feedback: {
              correct:
                'Perfect! Partial profit secures gains while trailing stop protects and allows upside.',
              incorrect:
                'Taking partial profit + breakeven stop is disciplined: secures gains while allowing for more.',
            },
          },
        },
        {
          id: 'day28-l2-obj3',
          title: 'Bias Check',
          content:
            "You're heavily invested in a coin. Negative news comes out, but you dismiss it as FUD. You only read positive analysis. Which bias is this, and why is it dangerous?",
          keyPoints: [
            'Confirmation bias: Seeking only agreeing info',
            'Leads to ignoring real risks',
            'Challenge your own positions actively',
          ],
          image: { icon: 'AlertTriangle', animation: 'slide', color: '#f59e0b' },
          task: {
            type: 'true_false',
            config: {
              statement:
                'Ignoring negative news about your holdings and only reading bullish analysis is a safe way to stay confident.',
              correctAnswer: false,
              explanation:
                'This is confirmation bias! It leads to ignoring real risks and can result in major losses.',
            },
            feedback: {
              correct:
                'Correct! Confirmation bias is dangerous. Always seek opposing viewpoints.',
              incorrect:
                'False! This is confirmation bias and very dangerous. Seek bearish views on your bullish positions.',
            },
          },
        },
      ],
    },
    {
      id: 'day28-lesson3',
      dayNumber: 28,
      lessonNumber: 3,
      title: 'Graduation Challenge',
      description: 'Your final trading test',
      estimatedMinutes: 10,
      objectives: [
        {
          id: 'day28-l3-obj1',
          title: 'Complete Trade Plan',
          content:
            "Create a complete trade plan: BTC is at $40,000, showing a bull flag pattern. 50 EMA is at $38,000 (support). RSI is 55 (neutral). You want to trade this setup with $10,000 capital and 1% risk.",
          keyPoints: [
            'Entry: On bull flag breakout',
            'Stop: Below flag low or 50 EMA (~$38,000)',
            'Target: Flag pole projection',
          ],
          image: { icon: 'ClipboardCheck', animation: 'float', color: '#22c55e' },
          task: {
            type: 'sorting',
            config: {
              items: [
                'Identify bull flag pattern',
                'Set stop below $38K support',
                'Calculate position size for 1% risk',
                'Enter on breakout confirmation',
                'Set target using flag pole',
              ],
              instruction: 'Order the steps for this trade setup:',
              correctOrder: [
                'Identify bull flag pattern',
                'Set stop below $38K support',
                'Calculate position size for 1% risk',
                'Enter on breakout confirmation',
                'Set target using flag pole',
              ],
            },
            feedback: {
              correct: 'Excellent trade planning sequence!',
              incorrect:
                'Pattern → Stop → Position size → Entry → Target. Plan before you trade!',
            },
          },
        },
        {
          id: 'day28-l3-obj2',
          title: 'Market Selection',
          content:
            "You've learned about forex, crypto, stocks, commodities, and indices. Each market has unique characteristics. True trading mastery means knowing which market suits your style and schedule.",
          keyPoints: [
            'Match markets to your lifestyle',
            'Specialize before diversifying',
            'Each market has unique personalities',
          ],
          image: { icon: 'Globe2', animation: 'pulse', color: '#5b5fff' },
          task: {
            type: 'simulation',
            config: {
              asset: 'PORTFOLIO',
              startPrice: 0,
              targetPrice: 0,
              scenario:
                'You work 9-5 and can only trade evenings. You have $5,000 to start.',
              instruction:
                'Which market is BEST suited for this situation? (Crypto or Forex - both trade 24/7 and allow smaller positions)',
            },
            feedback: {
              correct: 'Great market selection reasoning!',
              incorrect:
                'Crypto and Forex suit this situation: 24/7 trading and smaller position sizes work with limited capital and evening schedule.',
            },
          },
        },
        {
          id: 'day28-l3-obj3',
          title: 'Your Trading Journey',
          content:
            'Congratulations! You\'ve completed the 28-Day Trading Challenge. You learned technical analysis, indicators, multiple markets, risk management, and trading psychology. But remember: this is just the beginning.',
          keyPoints: [
            'Knowledge is foundation - practice makes perfect',
            'Start small, scale with proven consistency',
            'Never stop learning and adapting',
          ],
          image: { icon: 'Award', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'coin_flip',
            config: {
              instruction: 'Flip to reveal your trading mantra...',
              revealText:
                '🏆 "Protect your capital, follow your plan, stay humble, keep learning. The market will always be there tomorrow." You are now ready! 🚀',
            },
            feedback: {
              correct: 'Congratulations, Trading Master! 🎉',
              incorrect: 'Congratulations, Trading Master! 🎉',
            },
          },
        },
      ],
    },
  ],
  rewards: {
    badge: {
      id: 'trading-master',
      name: 'Trading Master',
      icon: 'Crown',
      description: 'Completed the 28-Day Trading Challenge!',
    },
    xp: 500,
    unlocks: ['Advanced Trading Content', 'Community Access', 'Live Trading Tools'],
  },
};

// ==================== EXPORT ====================

export const week4Days: CurriculumDay[] = [
  day22,
  day23,
  day24,
  day25,
  day26,
  day27,
  day28,
];
