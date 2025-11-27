// Week 1: Days 1-7 - Trading Basics
import type { CurriculumDay } from '../../types/curriculum';

// ==================== DAY 1 ====================
const day1: CurriculumDay = {
  dayNumber: 1,
  title: 'Welcome to the Marketplace',
  emoji: '🏪',
  missionRank: 'Level 1 – Rookie Trader',
  theme: 'basics',
  lessons: [
    {
      id: 'day1_lesson1',
      dayNumber: 1,
      lessonNumber: 1,
      title: 'What Is Trading?',
      description: 'Understand the basics of buying and selling in financial markets.',
      objectives: [
        {
          id: 'day1_l1_obj1',
          title: 'Understand What Trading Really Is',
          content: 'Trading is the act of buying and selling assets to make a profit from price changes. You are exchanging one thing (money) for another (an asset like a stock, gold, oil, or crypto), hoping its value will increase.',
          keyPoints: ['Buy low → Sell high = Profit', 'Sell high → Buy low = Profit (short selling)', 'Trading happens every second around the world'],
          image: { icon: 'ArrowLeftRight', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'coin_flip',
            config: { instruction: 'Collect 5 "Buy" coins and 5 "Sell" coins by tapping when they appear.', revealText: 'Great! You understand the basic buy/sell concept.' },
            feedback: { correct: 'You collected all coins! Trading is about timing your buys and sells.', incorrect: 'Keep trying to collect all the coins!' }
          }
        },
        {
          id: 'day1_l1_obj2',
          title: 'Compare Trader vs Investor',
          content: 'Traders focus on short-term price movements and use charts. Investors focus on long-term value and company fundamentals. Think of it like: Trader = Ninja (fast, precise, tactical) vs Investor = Farmer (slow, patient, grows wealth over time).',
          keyPoints: ['Trader: Daily/weekly decisions', 'Investor: Months/years horizon', 'Both can be profitable'],
          image: { icon: 'Users', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'hold5years', label: 'Hold for 5 years', icon: '📅' },
                { id: 'sell10min', label: 'Sell in 10 minutes', icon: '⏱️' },
                { id: 'earnings', label: 'Analyze earnings', icon: '📊' },
                { id: 'breakout', label: 'Wait for chart breakout', icon: '📈' }
              ],
              targets: [
                { id: 'trader', label: 'TRADER', acceptsIds: ['sell10min', 'breakout'] },
                { id: 'investor', label: 'INVESTOR', acceptsIds: ['hold5years', 'earnings'] }
              ],
              instruction: 'Drag each action to either TRADER or INVESTOR'
            },
            feedback: { correct: 'You understand the difference between traders and investors!', incorrect: 'Remember: Traders are short-term, Investors are long-term.' }
          }
        },
        {
          id: 'day1_l1_obj3',
          title: 'Learn the Buy–Sell Profit Formula',
          content: 'Every trade is based on one simple equation: Profit = Exit Price – Entry Price. Example: Buy Bitcoin at $25,000 → Sell at $26,000 = $1,000 profit.',
          keyPoints: ['Profit = Exit Price - Entry Price', 'Works for stocks, gold, oil, crypto, forex', 'Loss occurs when Exit < Entry'],
          image: { icon: 'Calculator', animation: 'none', color: '#ffd166' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'You buy a stock at $50 and sell at $65. What is your profit?',
              options: ['$10', '$15', '$20', '$50'],
              correctIndex: 1
            },
            feedback: { correct: 'Correct! $65 - $50 = $15 profit.', incorrect: 'Remember: Profit = Exit Price - Entry Price. $65 - $50 = $15.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day1_lesson2',
      dayNumber: 1,
      lessonNumber: 2,
      title: 'Market Types',
      description: 'Recognize all major tradable markets.',
      objectives: [
        {
          id: 'day1_l2_obj1',
          title: 'Know the Four Main Markets',
          content: 'You can trade in four major categories: Stocks (companies like Apple, Tesla), Commodities (Gold, Oil), Crypto (Bitcoin, Ethereum), and Forex (currency pairs like EUR/USD).',
          keyPoints: ['Stocks: Company ownership', 'Commodities: Physical goods', 'Crypto: Digital currencies', 'Forex: Currency exchange'],
          image: { icon: 'LayoutGrid', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'xauusd', label: 'XAU/USD', icon: '🪙' },
                { id: 'aapl', label: 'AAPL', icon: '🍎' },
                { id: 'btc', label: 'Bitcoin', icon: '₿' },
                { id: 'eurusd', label: 'EUR/USD', icon: '💱' }
              ],
              targets: [
                { id: 'commodities', label: 'Commodities', acceptsIds: ['xauusd'] },
                { id: 'stocks', label: 'Stocks', acceptsIds: ['aapl'] },
                { id: 'crypto', label: 'Crypto', acceptsIds: ['btc'] },
                { id: 'forex', label: 'Forex', acceptsIds: ['eurusd'] }
              ],
              instruction: 'Drag each asset to its correct market category'
            },
            feedback: { correct: 'Perfect! You know where each asset belongs.', incorrect: 'XAU=Gold(Commodity), AAPL=Stock, BTC=Crypto, EUR/USD=Forex.' }
          }
        },
        {
          id: 'day1_l2_obj2',
          title: 'Understand Risk Levels',
          content: 'Different markets have different risk levels. Crypto is highest risk/reward. Oil is highly volatile. Gold is a safe haven. Stocks are medium risk. Forex requires precision but is more stable.',
          keyPoints: ['Crypto: ⭐⭐⭐⭐⭐ (Highest)', 'Oil: ⭐⭐⭐⭐', 'Stocks: ⭐⭐⭐', 'Gold/Forex: ⭐⭐'],
          image: { icon: 'Gauge', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'sorting',
            config: {
              items: ['Crypto', 'Government Bonds', 'Oil', 'Gold'],
              instruction: 'Sort from HIGHEST to LOWEST risk',
              correctOrder: ['Crypto', 'Oil', 'Gold', 'Government Bonds']
            },
            feedback: { correct: 'You understand risk levels! Crypto is most volatile, bonds are safest.', incorrect: 'Crypto > Oil > Gold > Bonds in terms of risk.' }
          }
        },
        {
          id: 'day1_l2_obj3',
          title: 'Identify Which Markets Fit Your Style',
          content: 'Love fast moves? Try Crypto or Oil. Prefer stability? Forex. Like business analysis? Stocks. Like safe moves? Gold. Your personality determines your best fit.',
          keyPoints: ['Fast movers: Crypto, Oil', 'Stable: Forex', 'Analytical: Stocks', 'Safe: Gold'],
          image: { icon: 'Target', animation: 'none', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'If you prefer analyzing company earnings and news, which market fits you best?',
              options: ['Crypto', 'Forex', 'Stocks', 'Oil'],
              correctIndex: 2
            },
            feedback: { correct: 'Stocks are perfect for fundamental analysis lovers!', incorrect: 'Stocks are best for those who like analyzing companies.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day1_lesson3',
      dayNumber: 1,
      lessonNumber: 3,
      title: 'How Prices Move',
      description: 'Understand WHY charts move up and down.',
      objectives: [
        {
          id: 'day1_l3_obj1',
          title: 'Learn the Principle of Supply & Demand',
          content: 'Price rises when more people want to buy than sell (demand > supply). Price falls when more people want to sell than buy (supply > demand). It\'s like iPhones - high demand means higher prices.',
          keyPoints: ['More buyers = Price goes UP', 'More sellers = Price goes DOWN', 'Simple economics applies to all markets'],
          image: { icon: 'Scale', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'Breaking news: A major company announces they\'re buying $1 billion worth of Bitcoin.',
              question: 'What happens to Bitcoin\'s price?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'UP',
              explanation: 'Big buyers increase demand, pushing price up.'
            },
            feedback: { correct: 'Correct! More demand = higher prices.', incorrect: 'When big buyers enter, demand increases, pushing prices UP.' }
          }
        },
        {
          id: 'day1_l3_obj2',
          title: 'Know Market Players',
          content: 'Markets have different players: Retail traders (people like you), Institutions (banks, hedge funds), Market makers (liquidity providers), and Algorithms (trading robots). Institutions move markets - retail traders follow.',
          keyPoints: ['Retail: Individual traders', 'Institutions: The "big money"', 'Market makers: Provide liquidity', 'Algorithms: Automated trading'],
          image: { icon: 'Users', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Retail Trader', right: 'Individual investors like you' },
                { left: 'Institution', right: 'Banks and hedge funds' },
                { left: 'Market Maker', right: 'Provides liquidity to markets' },
                { left: 'Algorithm', right: 'Computer-automated trading' }
              ],
              instruction: 'Match each market player to their description'
            },
            feedback: { correct: 'You know all the market players!', incorrect: 'Review: Retail=individuals, Institutions=big money, Market Makers=liquidity, Algos=computers.' }
          }
        },
        {
          id: 'day1_l3_obj3',
          title: 'Learn What Creates Volatility',
          content: 'Price jumps happen due to: News, Economic releases, Big orders, Sudden high volume, Fear or excitement. Volatility = opportunity + risk.',
          keyPoints: ['News creates sudden moves', 'Volume confirms moves', 'Fear and greed drive markets', 'Volatility is both opportunity and risk'],
          image: { icon: 'Zap', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'When is it typically MOST dangerous to trade?',
              options: ['During quiet market hours', 'Right before major economic news', 'When volume is low', 'On weekends'],
              correctIndex: 1
            },
            feedback: { correct: 'News events cause unpredictable volatility - risky for beginners!', incorrect: 'Major news events cause extreme volatility - very risky to trade around.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  test: {
    id: 'day1_test',
    dayNumber: 1,
    title: 'Day 1 Challenge',
    description: 'Test your knowledge of trading basics',
    questions: [
      {
        id: 'day1_q1',
        type: 'multiple_choice',
        config: {
          question: 'What is the profit formula in trading?',
          options: ['Entry Price - Exit Price', 'Exit Price - Entry Price', 'Entry Price × Exit Price', 'Entry Price + Exit Price'],
          correctIndex: 1
        },
        feedback: { correct: 'Profit = Exit Price - Entry Price', incorrect: 'Remember: Profit = Exit Price - Entry Price' },
        points: 25
      },
      {
        id: 'day1_q2',
        type: 'true_false',
        config: {
          statement: 'Traders focus on long-term value while investors focus on short-term price movements.',
          correctAnswer: false,
          explanation: 'It\'s the opposite: Traders focus on short-term, Investors on long-term.'
        },
        feedback: { correct: 'Correct! Traders = short-term, Investors = long-term', incorrect: 'Traders = short-term, Investors = long-term' },
        points: 25
      },
      {
        id: 'day1_q3',
        type: 'multiple_choice',
        config: {
          question: 'Which market is considered the HIGHEST risk?',
          options: ['Gold', 'Government Bonds', 'Crypto', 'Forex'],
          correctIndex: 2
        },
        feedback: { correct: 'Crypto is the most volatile market!', incorrect: 'Crypto has the highest volatility and risk.' },
        points: 25
      },
      {
        id: 'day1_q4',
        type: 'multiple_choice',
        config: {
          question: 'What causes prices to move in markets?',
          options: ['Only news events', 'Supply and demand', 'Only institutional traders', 'Random chance'],
          correctIndex: 1
        },
        feedback: { correct: 'Supply and demand is the fundamental driver!', incorrect: 'Supply and demand drives all price movement.' },
        points: 25
      }
    ],
    passingScore: 75,
    estimatedMinutes: 5
  },
  rewards: {
    badge: { id: 'rookie_trader', name: 'Rookie Trader', icon: '🎖️', description: 'Completed Day 1 of the Trading Challenge' },
    xp: 100,
    unlocks: ['day_2']
  }
};

// ==================== DAY 2: THE MINDSET DAY ====================
const day2: CurriculumDay = {
  dayNumber: 2,
  title: 'The Mindset Day',
  emoji: '🧠',
  missionRank: 'Level 2 – Mind Master',
  theme: 'basics',
  lessons: [
    // Lesson 1: The Gate of Mental Transformation
    {
      id: 'day2_lesson1',
      dayNumber: 2,
      lessonNumber: 1,
      title: 'The Gate of Mental Transformation',
      description: 'Enter the temple of success through mental preparation.',
      objectives: [
        {
          id: 'day2_l1_obj1',
          title: 'The Guardian\'s First Test',
          content: 'At the Temple of Success, a gate rises before you. The Guardian says: "Before you enter, you must know: Those who chase money lose it. Those who master their minds find it." Success in investing isn\'t about getting rich quick. It\'s about the long journey, patience, and wisdom. The mindset is the true gateway.',
          keyPoints: ['Chase money = lose it', 'Master your mind = find success', 'Investing is a long journey'],
          image: { icon: 'Brain', animation: 'pulse', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What is the key to the gate of success in investing?',
              options: ['Quick profits', 'Daily trading', 'The right mindset', 'Following tips'],
              correctIndex: 2
            },
            feedback: { correct: '🔓 The gate opens! You understand that mindset is everything.', incorrect: 'The Guardian shakes his head. Success starts with the right mindset, not shortcuts.' }
          }
        }
      ],
      estimatedMinutes: 3
    },
    // Lesson 2: The Value Mindset
    {
      id: 'day2_lesson2',
      dayNumber: 2,
      lessonNumber: 2,
      title: 'The Value Mindset',
      description: 'Learn to see true value, not just price.',
      objectives: [
        {
          id: 'day2_l2_obj1',
          title: 'The Archer\'s Wisdom',
          content: 'An expert archer stands before targets. Some are shiny but worthless. Others seem plain but contain gold. He says: "The average eye sees the price. The investor\'s eye sees the value." Value is not what something costs today. It\'s what it will be worth tomorrow. Train your eye to see what others miss.',
          keyPoints: ['Price ≠ Value', 'See what others miss', 'Focus on future worth'],
          image: { icon: 'Target', animation: 'float', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What does the investor\'s eye focus on?',
              options: ['The current price', 'The company logo', 'The underlying value', 'The trading volume'],
              correctIndex: 2
            },
            feedback: { correct: '🎯 Arrow hits the golden target! You see true value.', incorrect: 'The archer says: Look deeper. Value hides beneath the surface price.' }
          }
        }
      ],
      estimatedMinutes: 3
    },
    // Lesson 3: The Investor Sees the Big Picture
    {
      id: 'day2_lesson3',
      dayNumber: 2,
      lessonNumber: 3,
      title: 'The Big Picture Vision',
      description: 'Zoom out to see what really matters.',
      objectives: [
        {
          id: 'day2_l3_obj1',
          title: 'The Puzzle Master\'s Lesson',
          content: 'A mysterious room with scattered puzzle pieces. Each piece is one small event: a news headline, a quarterly report, a price drop. The Puzzle Master says: "Amateurs panic at one piece. Masters see the full picture." One bad day doesn\'t break a company. One good day doesn\'t make it great. Zoom out. See the whole puzzle.',
          keyPoints: ['Don\'t panic at single events', 'Zoom out for perspective', 'See patterns, not noise'],
          image: { icon: 'Puzzle', animation: 'pulse', color: '#a855f7' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What does a wise investor do when seeing a single negative news headline?',
              options: ['Sell everything immediately', 'Panic and call their broker', 'Look at the bigger picture first', 'Stop investing forever'],
              correctIndex: 2
            },
            feedback: { correct: '🧩 Puzzle piece placed! You understand the big picture matters.', incorrect: 'The Puzzle Master sighs. One piece doesn\'t show the whole image.' }
          }
        }
      ],
      estimatedMinutes: 3
    },
    // Lesson 4: Emotional Control
    {
      id: 'day2_lesson4',
      dayNumber: 2,
      lessonNumber: 4,
      title: 'Emotional Control',
      description: 'Master your emotions before they master you.',
      objectives: [
        {
          id: 'day2_l4_obj1',
          title: 'The Time Pressure Test',
          content: 'A countdown appears: "Make a decision NOW!" Markets flash red and green. Everyone is screaming buy or sell. But a calm voice cuts through: "The market rewards the patient, not the panicked." When emotions run high, profits run low. The best investors make decisions from logic, not fear or greed.',
          keyPoints: ['Patience beats panic', 'Logic over emotion', 'Calm under pressure wins'],
          image: { icon: 'Timer', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'When markets are crashing and everyone is panicking, what should you do?',
              options: ['Join the panic selling', 'Buy more immediately', 'Step back and think calmly', 'Check social media for tips'],
              correctIndex: 2
            },
            feedback: { correct: '⏱️ Time\'s up but you stayed calm! Emotional control mastered.', incorrect: 'Panic decisions destroy portfolios. Step back, breathe, think.' }
          }
        }
      ],
      estimatedMinutes: 3
    },
    // Lesson 5: The Power of Compounding
    {
      id: 'day2_lesson5',
      dayNumber: 2,
      lessonNumber: 5,
      title: 'The Power of Compounding',
      description: 'Watch small gains build into mountains.',
      objectives: [
        {
          id: 'day2_l5_obj1',
          title: 'The Tower Builder',
          content: 'You stand before an empty lot. The Builder says: "Place one brick. Then another. And another." Day 1: 1 brick. Day 30: 30 bricks. Day 365: A tower. Compounding is the 8th wonder of the world. Small, consistent gains stack into massive wealth over time. The patient builder wins.',
          keyPoints: ['Small gains compound', 'Consistency beats intensity', 'Time is your greatest ally'],
          image: { icon: 'Building', animation: 'float', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What builds true wealth over time?',
              options: ['One big lucky bet', 'Consistent small gains', 'Day trading every hour', 'Following hot tips'],
              correctIndex: 1
            },
            feedback: { correct: '🏗️ Another brick placed! Your tower grows through compounding.', incorrect: 'The Builder shakes his head. Towers are built one brick at a time, not all at once.' }
          }
        }
      ],
      estimatedMinutes: 3
    },
    // Lesson 6: Don't Chase Opportunities
    {
      id: 'day2_lesson6',
      dayNumber: 2,
      lessonNumber: 6,
      title: 'The Patience Principle',
      description: 'Learn why the best investors wait.',
      objectives: [
        {
          id: 'day2_l6_obj1',
          title: 'The Mystery Box Challenge',
          content: 'Three boxes appear. One glows and buzzes with excitement. One is plain and quiet. One is hidden in shadow. The crowd rushes to the glowing box. But the Wise One whispers: "The loudest opportunity is often the emptiest. Real value hides in plain sight." FOMO (Fear of Missing Out) destroys portfolios.',
          keyPoints: ['Loud ≠ Good', 'Avoid FOMO', 'Real value is quiet'],
          image: { icon: 'Gift', animation: 'pulse', color: '#ec4899' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'A stock is all over the news and everyone is buying it. What should you do?',
              options: ['Buy immediately before it\'s too late', 'Research it carefully first', 'Take out a loan to buy more', 'Tell all your friends to buy'],
              correctIndex: 1
            },
            feedback: { correct: '🎁 You chose wisely! The quiet box held the real treasure.', incorrect: 'The crowd chased the shiny box and found nothing. Research before you rush.' }
          }
        }
      ],
      estimatedMinutes: 3
    },
    // Lesson 7: Discipline Before Intelligence
    {
      id: 'day2_lesson7',
      dayNumber: 2,
      lessonNumber: 7,
      title: 'Discipline Over Intelligence',
      description: 'Why disciplined investors beat smart ones.',
      objectives: [
        {
          id: 'day2_l7_obj1',
          title: 'The Shooting Range',
          content: 'Two shooters stand at the range. One is brilliant but impulsive, firing randomly. The other is average but disciplined, following a strict process. The Instructor says: "The disciplined shooter hits 8/10. The genius hits 3/10." In investing, following your rules beats being clever. Discipline compounds. Impulse destroys.',
          keyPoints: ['Rules beat randomness', 'Discipline beats genius', 'Process over impulse'],
          image: { icon: 'Crosshair', animation: 'float', color: '#3b82f6' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What matters more for investing success?',
              options: ['High IQ', 'Following a disciplined process', 'Insider information', 'Luck'],
              correctIndex: 1
            },
            feedback: { correct: '🎯 Direct hit! Discipline beats brilliance every time.', incorrect: 'The genius missed again. Discipline and process beat raw intelligence.' }
          }
        }
      ],
      estimatedMinutes: 3
    },
    // Lesson 8: The Growth Mindset
    {
      id: 'day2_lesson8',
      dayNumber: 2,
      lessonNumber: 8,
      title: 'The Growth Mindset',
      description: 'Turn losses into lessons.',
      objectives: [
        {
          id: 'day2_l8_obj1',
          title: 'The Knowledge Race',
          content: 'A race track appears. But it\'s not about speed. It\'s about learning. The Race Master says: "Every loss is a lesson. Every mistake is a teacher. The investor who stops learning stops earning." Fixed mindset: "I failed, I\'m done." Growth mindset: "I failed, what can I learn?" Winners see setbacks as setups for comebacks.',
          keyPoints: ['Failures are lessons', 'Never stop learning', 'Growth mindset wins'],
          image: { icon: 'GraduationCap', animation: 'pulse', color: '#10b981' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'You made a bad investment and lost money. What\'s the best response?',
              options: ['Give up investing forever', 'Blame the market', 'Analyze what went wrong and learn', 'Pretend it never happened'],
              correctIndex: 2
            },
            feedback: { correct: '🏎️ You pull ahead! Every loss is tuition in the school of investing.', incorrect: 'The race isn\'t about never falling. It\'s about learning from every fall.' }
          }
        }
      ],
      estimatedMinutes: 3
    },
    // Lesson 9: Calculate Every Step
    {
      id: 'day2_lesson9',
      dayNumber: 2,
      lessonNumber: 9,
      title: 'Calculate Every Step',
      description: 'Plan your moves like a chess master.',
      objectives: [
        {
          id: 'day2_l9_obj1',
          title: 'The Mind Lock Puzzle',
          content: 'A complex lock with multiple symbols. Each decision unlocks one symbol. The Lock Master says: "Random guessing = endless failure. Calculated moves = certain success." Before every investment, calculate: Entry point, Exit point, Maximum loss you\'ll accept, Expected return. Plan the trade, trade the plan.',
          keyPoints: ['Plan every move', 'Know your exit before entry', 'Calculate risk vs reward'],
          image: { icon: 'Lock', animation: 'float', color: '#8b5cf6' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Before making any investment, what should you calculate first?',
              options: ['How much you could brag about', 'Entry, exit, and risk levels', 'What others are buying', 'The company\'s logo design'],
              correctIndex: 1
            },
            feedback: { correct: '🔐 Lock opened! You think like a strategic investor.', incorrect: 'The lock stays shut. Plan your entry, exit, and risk before every trade.' }
          }
        }
      ],
      estimatedMinutes: 3
    },
    // Lesson 10: The Day of Mastery
    {
      id: 'day2_lesson10',
      dayNumber: 2,
      lessonNumber: 10,
      title: 'The Day of Mastery',
      description: 'Final test: Prove your mindset transformation.',
      objectives: [
        {
          id: 'day2_l10_obj1',
          title: 'The Final Precision Test',
          content: 'You stand at the Temple\'s inner chamber. The Guardian returns: "You\'ve learned the lessons. Now prove them." The path to investing success isn\'t about finding the next hot stock. It\'s about mastering yourself: your emotions, your discipline, your patience, your learning. The mindset IS the strategy.',
          keyPoints: ['Master yourself first', 'Mindset is the strategy', 'You are ready'],
          image: { icon: 'Trophy', animation: 'pulse', color: '#ffd166' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What is the most important thing you learned today?',
              options: ['How to pick winning stocks', 'Quick trading techniques', 'The right mindset is the foundation of success', 'How to time the market'],
              correctIndex: 2
            },
            feedback: { correct: '🏆 MASTERY ACHIEVED! You\'ve unlocked the investor\'s mindset. The real journey begins now.', incorrect: 'The Guardian gives you another chance. Remember: mindset is everything.' }
          }
        }
      ],
      estimatedMinutes: 3
    }
  ],
  test: {
    id: 'day2_test',
    dayNumber: 2,
    title: 'The Mindset Challenge',
    description: 'Test your investor mindset transformation',
    questions: [
      {
        id: 'day2_q1',
        type: 'multiple_choice',
        config: {
          question: 'What does a successful investor focus on more than price?',
          options: ['Trading volume', 'Value', 'Headlines', 'Other investors\' opinions'],
          correctIndex: 1
        },
        feedback: { correct: 'Value is what matters!', incorrect: 'Remember: Price is what you pay, value is what you get.' },
        points: 20
      },
      {
        id: 'day2_q2',
        type: 'true_false',
        config: {
          statement: 'When everyone is panicking and selling, the best investors stay calm and think logically.',
          correctAnswer: true,
          explanation: 'Emotional control separates winners from losers.'
        },
        feedback: { correct: 'Calm under pressure wins!', incorrect: 'Panic selling is usually the worst decision.' },
        points: 20
      },
      {
        id: 'day2_q3',
        type: 'multiple_choice',
        config: {
          question: 'What builds true wealth over time?',
          options: ['One big bet', 'Consistent small gains that compound', 'Day trading', 'Following hot tips'],
          correctIndex: 1
        },
        feedback: { correct: 'Compounding is the 8th wonder of the world!', incorrect: 'Small, consistent gains compound into massive wealth.' },
        points: 20
      },
      {
        id: 'day2_q4',
        type: 'multiple_choice',
        config: {
          question: 'What should you do when you make a bad investment?',
          options: ['Give up', 'Blame others', 'Analyze and learn from it', 'Ignore it'],
          correctIndex: 2
        },
        feedback: { correct: 'Every loss is a lesson!', incorrect: 'Growth mindset: Learn from every mistake.' },
        points: 20
      },
      {
        id: 'day2_q5',
        type: 'multiple_choice',
        config: {
          question: 'What is more important than intelligence in investing?',
          options: ['Luck', 'Discipline', 'Insider tips', 'Speed'],
          correctIndex: 1
        },
        feedback: { correct: 'Discipline beats brilliance!', incorrect: 'Disciplined process beats random genius.' },
        points: 20
      }
    ],
    passingScore: 70,
    estimatedMinutes: 5
  },
  rewards: {
    badge: { id: 'mind_master', name: 'Mind Master', icon: '🧠', description: 'Mastered the investor mindset' },
    xp: 150,
    unlocks: ['day_3']
  }
};

// ==================== DAY 3 ====================
const day3: CurriculumDay = {
  dayNumber: 3,
  title: 'Candlesticks Mastery I',
  emoji: '🕯️',
  missionRank: 'Level 3 – Candle Tamer',
  theme: 'basics',
  lessons: [
    {
      id: 'day3_lesson1',
      dayNumber: 3,
      lessonNumber: 1,
      title: 'Bullish Candles',
      description: 'Learn to identify buyer-controlled candles.',
      objectives: [
        {
          id: 'day3_l1_obj1',
          title: 'Understand Bullish Candles',
          content: 'A bullish candle forms when price closes HIGHER than it opens. The body is typically green/white. It shows buyers are in control and pushing prices up.',
          keyPoints: ['Close > Open = Bullish', 'Usually green/white color', 'Buyers are winning'],
          image: { icon: 'TrendingUp', animation: 'float', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'A candle opens at $100 and closes at $110. What type is it?',
              options: ['Bearish', 'Bullish', 'Neutral', 'Doji'],
              correctIndex: 1
            },
            feedback: { correct: 'Close > Open = Bullish candle!', incorrect: 'When close is higher than open, it\'s bullish (buyers won).' }
          }
        },
        {
          id: 'day3_l1_obj2',
          title: 'Long Bullish Candles',
          content: 'Long bullish candle = strong buying pressure. Often signals: Breakouts, Trend continuation, Strong momentum. The longer the body, the stronger the buyers.',
          keyPoints: ['Long body = strong momentum', 'Signals breakouts', 'Shows conviction'],
          image: { icon: 'ArrowBigUp', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'A very long green candle indicates strong buying pressure.',
              correctAnswer: true,
              explanation: 'Long bodies show one side has strong control.'
            },
            feedback: { correct: 'Long green candles = strong buyers!', incorrect: 'Long candle bodies indicate strong momentum in that direction.' }
          }
        },
        {
          id: 'day3_l1_obj3',
          title: 'Weak Bullish Candles',
          content: 'Small-bodied bullish candles = weak buyers. Often occur in: Consolidation periods, Before reversals, When trend is weakening. Watch for these warning signs.',
          keyPoints: ['Small body = weak momentum', 'May signal reversal coming', 'Less reliable for entries'],
          image: { icon: 'Minus', animation: 'none', color: '#94a3b8' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What does a small-bodied candle typically indicate?',
              options: ['Strong trend', 'Indecision or weak momentum', 'Guaranteed reversal', 'Time to buy more'],
              correctIndex: 1
            },
            feedback: { correct: 'Small bodies show indecision!', incorrect: 'Small candle bodies indicate weak momentum or market indecision.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day3_lesson2',
      dayNumber: 3,
      lessonNumber: 2,
      title: 'Bearish Candles',
      description: 'Learn to identify seller-controlled candles.',
      objectives: [
        {
          id: 'day3_l2_obj1',
          title: 'Understand Bearish Candles',
          content: 'A bearish candle forms when price closes LOWER than it opens. The body is typically red/black. It shows sellers are in control and pushing prices down.',
          keyPoints: ['Close < Open = Bearish', 'Usually red/black color', 'Sellers are winning'],
          image: { icon: 'TrendingDown', animation: 'float', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'A candle opens at $100 and closes at $90. What type is it?',
              options: ['Bullish', 'Bearish', 'Neutral', 'Hammer'],
              correctIndex: 1
            },
            feedback: { correct: 'Close < Open = Bearish candle!', incorrect: 'When close is lower than open, it\'s bearish (sellers won).' }
          }
        },
        {
          id: 'day3_l2_obj2',
          title: 'Strong Bearish Candles',
          content: 'Long red candles indicate powerful selling. They signal trend continuation downward or the start of a bearish move. The longer the body, the stronger the sellers.',
          keyPoints: ['Long red = strong selling', 'Signals downtrend continuation', 'Watch for these at resistance'],
          image: { icon: 'ArrowBigDown', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'You see 3 consecutive long red candles breaking through a support level.',
              question: 'What is the likely next move?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'DOWN',
              explanation: 'Strong bearish momentum suggests continuation down.'
            },
            feedback: { correct: 'Strong selling momentum often continues!', incorrect: 'Multiple long bearish candles suggest continued downward pressure.' }
          }
        },
        {
          id: 'day3_l2_obj3',
          title: 'Weak Bearish Candles',
          content: 'Small body red candles = seller strength is fading. Could indicate: Trend exhaustion, Potential reversal, Consolidation phase. These are warning signs for shorts.',
          keyPoints: ['Small red = weak sellers', 'May signal bounce coming', 'Be cautious shorting'],
          image: { icon: 'Minus', animation: 'none', color: '#f87171' },
          task: {
            type: 'true_false',
            config: {
              statement: 'After multiple large red candles, seeing small red candles might indicate seller exhaustion.',
              correctAnswer: true,
              explanation: 'Shrinking candles often signal momentum fading.'
            },
            feedback: { correct: 'Shrinking candles often mean the move is running out of steam!', incorrect: 'When candles get smaller, it often means the dominant side is losing strength.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day3_lesson3',
      dayNumber: 3,
      lessonNumber: 3,
      title: 'Candle Components',
      description: 'Understand the anatomy of candlesticks.',
      objectives: [
        {
          id: 'day3_l3_obj1',
          title: 'The Body',
          content: 'The body represents the battle between buyers and sellers. It shows where price opened and closed. Long body = strong momentum. Small body = indecision.',
          keyPoints: ['Body = Open to Close range', 'Long body = conviction', 'Small body = indecision'],
          image: { icon: 'Square', animation: 'none', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What does the candle body represent?',
              options: ['The highest price', 'The range between open and close', 'Trading volume', 'Time duration'],
              correctIndex: 1
            },
            feedback: { correct: 'The body shows the open-to-close range!', incorrect: 'The body is the thick part showing where price opened and closed.' }
          }
        },
        {
          id: 'day3_l3_obj2',
          title: 'The Wicks (Shadows)',
          content: 'Wicks show price rejection. Long upper wick = sellers pushed price down from highs. Long lower wick = buyers pushed price up from lows. Wicks tell the story of the battle.',
          keyPoints: ['Upper wick = selling pressure', 'Lower wick = buying pressure', 'Long wicks = strong rejection'],
          image: { icon: 'GitCommitVertical', animation: 'float', color: '#f59e0b' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Long Upper Wick', right: 'Sellers rejected higher prices' },
                { left: 'Long Lower Wick', right: 'Buyers rejected lower prices' },
                { left: 'No Wicks', right: 'One side had complete control' }
              ],
              instruction: 'Match each wick type to its meaning'
            },
            feedback: { correct: 'You understand what wicks tell us!', incorrect: 'Wicks show rejection - upper=sellers pushed down, lower=buyers pushed up.' }
          }
        },
        {
          id: 'day3_l3_obj3',
          title: 'Reading Candle Psychology',
          content: 'Each candle tells an emotional story of the market. Learn to interpret: Fear, Greed, Panic, FOMO, Rejection. The candle is a window into trader psychology.',
          keyPoints: ['Candles reflect emotions', 'Big moves = strong emotion', 'Wicks = rejection/regret'],
          image: { icon: 'Brain', animation: 'pulse', color: '#a855f7' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'A candle with a long lower wick and small body at the bottom of a downtrend suggests:',
              options: ['More selling coming', 'Buyers stepping in (potential reversal)', 'Nothing meaningful', 'Time to short'],
              correctIndex: 1
            },
            feedback: { correct: 'Long lower wicks at lows show buyers defending!', incorrect: 'Long lower wicks show buyers rejected lower prices - potential reversal signal.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'candle_tamer', name: 'Candle Tamer', icon: '🕯️', description: 'Mastered basic candlestick analysis' },
    xp: 100,
    unlocks: ['day_4']
  }
};

// ==================== DAY 4 ====================
const day4: CurriculumDay = {
  dayNumber: 4,
  title: 'Candlestick Mastery II',
  emoji: '🎯',
  missionRank: 'Level 4 – Pattern Hunter',
  theme: 'basics',
  lessons: [
    {
      id: 'day4_lesson1',
      dayNumber: 4,
      lessonNumber: 1,
      title: 'Reversal Patterns',
      description: 'Identify when trends are about to change.',
      objectives: [
        {
          id: 'day4_l1_obj1',
          title: 'Identify Reversal Patterns',
          content: 'Reversal patterns signal when the market might change direction. Key patterns: Hammer, Shooting Star, Engulfing, Morning/Evening Star. They appear at the END of trends, not the middle.',
          keyPoints: ['Reversals appear at trend ends', 'Need confirmation', 'Location matters most'],
          image: { icon: 'RefreshCw', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement: 'A reversal pattern in the middle of a chart with no clear trend is a strong signal.',
              correctAnswer: false,
              explanation: 'Reversal patterns need a trend to reverse!'
            },
            feedback: { correct: 'Patterns need context - they must be at trend extremes!', incorrect: 'Reversal patterns are meaningless without a trend to reverse.' }
          }
        },
        {
          id: 'day4_l1_obj2',
          title: 'Bullish vs Bearish Reversals',
          content: 'Bullish reversals occur after downtrends (signal price going up). Bearish reversals occur after uptrends (signal price going down). Always check the preceding trend first.',
          keyPoints: ['Bullish reversals: at bottoms', 'Bearish reversals: at tops', 'Trend context is essential'],
          image: { icon: 'ArrowUpDown', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'hammer', label: 'Hammer', icon: '🔨' },
                { id: 'shooting', label: 'Shooting Star', icon: '⭐' },
                { id: 'bulleng', label: 'Bullish Engulfing', icon: '📈' },
                { id: 'beareng', label: 'Bearish Engulfing', icon: '📉' }
              ],
              targets: [
                { id: 'bullish', label: 'Bullish Reversal', acceptsIds: ['hammer', 'bulleng'] },
                { id: 'bearish', label: 'Bearish Reversal', acceptsIds: ['shooting', 'beareng'] }
              ],
              instruction: 'Classify each pattern as bullish or bearish'
            },
            feedback: { correct: 'You know your reversal patterns!', incorrect: 'Hammer/Bullish Engulfing=bullish, Shooting Star/Bearish Engulfing=bearish.' }
          }
        },
        {
          id: 'day4_l1_obj3',
          title: 'Pattern Position Matters',
          content: 'The position of the pattern is MORE important than its shape. At support = stronger bullish signal. At resistance = stronger bearish signal. Near news = dangerous. In middle = meaningless.',
          keyPoints: ['Position > Shape', 'Support/Resistance adds strength', 'Avoid patterns near news'],
          image: { icon: 'MapPin', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'A hammer pattern at a major support level is:',
              options: ['Meaningless', 'A weaker signal', 'A stronger bullish signal', 'A bearish signal'],
              correctIndex: 2
            },
            feedback: { correct: 'Support + bullish pattern = strong signal!', incorrect: 'When bullish patterns appear at support, they\'re much more reliable.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day4_lesson2',
      dayNumber: 4,
      lessonNumber: 2,
      title: 'Continuation Patterns',
      description: 'Recognize when trends will keep going.',
      objectives: [
        {
          id: 'day4_l2_obj1',
          title: 'Recognize Continuation Signals',
          content: 'Continuation patterns show the trend will keep going. Examples: Marubozu (no wicks), Rising Three, Falling Three. They indicate momentum is still strong.',
          keyPoints: ['Shows trend strength', 'Momentum continues', 'Good for adding to positions'],
          image: { icon: 'FastForward', animation: 'float', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'A Marubozu (candle with no wicks) shows extremely strong momentum.',
              correctAnswer: true,
              explanation: 'No wicks means one side had complete control all session.'
            },
            feedback: { correct: 'Marubozu = pure momentum with no rejection!', incorrect: 'A candle with no wicks shows absolute dominance by one side.' }
          }
        },
        {
          id: 'day4_l2_obj2',
          title: 'Trend Strength Indicators',
          content: 'Strong trends have: Big candles, Small retracements, No long wicks, Growing volume. Weak trends have: Small candles, Random wicks, Too much back-and-forth.',
          keyPoints: ['Strong: Big candles, small pullbacks', 'Weak: Small candles, long wicks', 'Volume confirms strength'],
          image: { icon: 'Gauge', animation: 'pulse', color: '#5b5fff' },
          task: {
            type: 'sorting',
            config: {
              items: ['Big green candles', 'Long wicks everywhere', 'Small retracements', 'Candles alternating red/green'],
              instruction: 'Sort from STRONGEST to WEAKEST trend signs',
              correctOrder: ['Big green candles', 'Small retracements', 'Candles alternating red/green', 'Long wicks everywhere']
            },
            feedback: { correct: 'You can read trend strength!', incorrect: 'Big candles + small pullbacks = strong, long wicks + alternating = weak.' }
          }
        },
        {
          id: 'day4_l2_obj3',
          title: 'Spotting Fake Continuations',
          content: 'Fake continuations occur when: Trend is exhausted, Volume is low, Candle is inconsistent, Support/resistance is nearby. Learn to avoid these traps.',
          keyPoints: ['Low volume = suspicious', 'Near S/R = caution', 'Exhausted trends fake out'],
          image: { icon: 'AlertTriangle', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Which scenario is MOST likely to be a fake continuation?',
              options: ['High volume breakout', 'Strong candle after pullback', 'Low volume push into resistance', 'Trend with big candles'],
              correctIndex: 2
            },
            feedback: { correct: 'Low volume + resistance = likely fake!', incorrect: 'Fake continuations often have low volume and happen near key levels.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day4_lesson3',
      dayNumber: 4,
      lessonNumber: 3,
      title: 'Engulfings, Dojis & Hammers',
      description: 'Master the most important single-candle patterns.',
      objectives: [
        {
          id: 'day4_l3_obj1',
          title: 'Engulfing Patterns',
          content: 'Bullish Engulfing: Big green candle completely covers previous red candle. Bearish Engulfing: Big red candle completely covers previous green candle. Shows sudden power shift.',
          keyPoints: ['New candle must fully cover previous', 'Shows power shift', 'Very reliable at key levels'],
          image: { icon: 'Maximize2', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement: 'For a valid engulfing pattern, the second candle must completely cover the body of the first candle.',
              correctAnswer: true,
              explanation: 'The "engulfing" means complete coverage of the previous body.'
            },
            feedback: { correct: 'Engulfing = complete coverage of previous body!', incorrect: 'The key is that the second candle fully covers the first candle\'s body.' }
          }
        },
        {
          id: 'day4_l3_obj2',
          title: 'Doji Patterns',
          content: 'Dojis indicate indecision - market is balanced. Types: Neutral Doji (cross), Long-legged (long wicks), Dragonfly (long lower wick), Gravestone (long upper wick).',
          keyPoints: ['Small/no body = indecision', 'Dragonfly = bullish hint', 'Gravestone = bearish hint'],
          image: { icon: 'Plus', animation: 'none', color: '#94a3b8' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Neutral Doji', right: 'Small cross, complete indecision' },
                { left: 'Dragonfly Doji', right: 'Long lower wick, buyers defended' },
                { left: 'Gravestone Doji', right: 'Long upper wick, sellers defended' }
              ],
              instruction: 'Match each doji type to its meaning'
            },
            feedback: { correct: 'You understand doji variations!', incorrect: 'Dragonfly=buyers won late, Gravestone=sellers won late, Neutral=total balance.' }
          }
        },
        {
          id: 'day4_l3_obj3',
          title: 'Hammer Family',
          content: 'Hammer (at bottom): Long lower wick, small body at top = buyers rejected lows = bullish. Hanging Man (at top): Same shape but bearish because it\'s at resistance. Location determines meaning.',
          keyPoints: ['Hammer at bottom = bullish', 'Hanging Man at top = bearish', 'Same shape, different location'],
          image: { icon: 'Hammer', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'A candle with a long lower wick and small body appears at the TOP of an uptrend. This is:',
              options: ['A Hammer (bullish)', 'A Hanging Man (bearish warning)', 'A Doji', 'Meaningless'],
              correctIndex: 1
            },
            feedback: { correct: 'At the top, this shape is a bearish Hanging Man!', incorrect: 'Same shape at different locations = different meaning. At top = Hanging Man (bearish).' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'pattern_hunter', name: 'Pattern Hunter', icon: '🎯', description: 'Mastered candlestick patterns' },
    xp: 100,
    unlocks: ['day_5']
  }
};

// ==================== DAY 5 ====================
const day5: CurriculumDay = {
  dayNumber: 5,
  title: 'Support & Resistance',
  emoji: '🏰',
  missionRank: 'Level 5 – Zone Master',
  theme: 'basics',
  lessons: [
    {
      id: 'day5_lesson1',
      dayNumber: 5,
      lessonNumber: 1,
      title: 'Identifying Support & Resistance',
      description: 'Find the key price levels that matter.',
      objectives: [
        {
          id: 'day5_l1_obj1',
          title: 'What Support & Resistance Are',
          content: 'Support: Price level where buyers enter and push price up (floor). Resistance: Price level where sellers enter and push price down (ceiling). Prices bounce at these levels repeatedly.',
          keyPoints: ['Support = floor (buying zone)', 'Resistance = ceiling (selling zone)', 'Price respects these levels'],
          image: { icon: 'Layers', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Support', right: 'Level where buyers defend price' },
                { left: 'Resistance', right: 'Level where sellers push price down' },
                { left: 'Breakout', right: 'When price breaks through a level' }
              ],
              instruction: 'Match each term to its definition'
            },
            feedback: { correct: 'You understand the basics of S/R!', incorrect: 'Support=buyers defend, Resistance=sellers defend, Breakout=level broken.' }
          }
        },
        {
          id: 'day5_l1_obj2',
          title: 'Turning Points = Strong Zones',
          content: 'Strong zones form where price previously: Reversed strongly (V-shapes), Paused then exploded, Created a new trend. These historical turning points become future battlegrounds.',
          keyPoints: ['Look for V-shaped reversals', 'Explosion points matter', 'History marks future zones'],
          image: { icon: 'GitBranch', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'A price level where the market previously reversed sharply is likely to act as support or resistance in the future.',
              correctAnswer: true,
              explanation: 'Price has memory - levels that mattered before often matter again.'
            },
            feedback: { correct: 'Price has memory - key levels repeat!', incorrect: 'Historical turning points often become future support/resistance.' }
          }
        },
        {
          id: 'day5_l1_obj3',
          title: 'More Touches = Stronger (Usually)',
          content: 'A support/resistance level becomes stronger each time price touches and respects it. BUT: If touched too many times, it often breaks. 2-3 touches = strong. 5+ touches = weakening.',
          keyPoints: ['2-3 touches = confirmed zone', 'Too many touches = weakens', 'Eventually all levels break'],
          image: { icon: 'Target', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'A support level has been tested 7 times. What is most likely?',
              options: ['It\'s extremely strong', 'It\'s likely to break soon', 'It doesn\'t matter', 'Time to buy heavily'],
              correctIndex: 1
            },
            feedback: { correct: 'Too many tests often precede a break!', incorrect: 'Levels tested too many times become weak and often break.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day5_lesson2',
      dayNumber: 5,
      lessonNumber: 2,
      title: 'Breakouts vs Rejections',
      description: 'Know when levels hold or fail.',
      objectives: [
        {
          id: 'day5_l2_obj1',
          title: 'Identifying a True Breakout',
          content: 'True breakout needs: Strong candle, High volume, Close ABOVE/BELOW the level (not just wick through). Weak breakout = fakeout. Wait for confirmation.',
          keyPoints: ['Strong candle required', 'Volume confirms', 'Close matters, not just wick'],
          image: { icon: 'Rocket', animation: 'float', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Price pushes above resistance with a long wick but closes back below. This is:',
              options: ['A confirmed breakout', 'A fakeout/rejection', 'Time to buy', 'A strong signal'],
              correctIndex: 1
            },
            feedback: { correct: 'Closing back below = rejection/fakeout!', incorrect: 'If price can\'t close above the level, it\'s not a true breakout.' }
          }
        },
        {
          id: 'day5_l2_obj2',
          title: 'Spotting Rejections',
          content: 'Rejection = price tries to break level but fails. Signs: Wick above resistance (couldn\'t hold), Wick below support (buyers defended), Candle closes back inside range.',
          keyPoints: ['Wick through but close inside = rejection', 'Often followed by opposite move', 'Good reversal signal'],
          image: { icon: 'Ban', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'Price spikes above resistance creating a long wick, then closes back below the resistance level with a red candle.',
              question: 'What is the likely next move?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'DOWN',
              explanation: 'Failed breakout often leads to opposite direction move.'
            },
            feedback: { correct: 'Failed breakouts often reverse!', incorrect: 'When breakouts fail (fakeouts), price often moves the opposite direction.' }
          }
        },
        {
          id: 'day5_l2_obj3',
          title: 'Using Breakouts for Entries',
          content: 'Best entries: Break-and-retest strategy. Wait for breakout, wait for price to come back and test the level, enter when it holds. This confirms the breakout was real.',
          keyPoints: ['Wait for retest', 'Retest confirms breakout', 'Safer than chasing'],
          image: { icon: 'IterationCw', animation: 'none', color: '#5b5fff' },
          task: {
            type: 'sorting',
            config: {
              items: ['Enter immediately on breakout', 'Wait for retest', 'Enter after retest holds', 'Place stop loss'],
              instruction: 'Sort the ideal breakout trading sequence',
              correctOrder: ['Wait for retest', 'Enter after retest holds', 'Place stop loss', 'Enter immediately on breakout']
            },
            feedback: { correct: 'Patient retest entries are safest!', incorrect: 'Best sequence: Wait for retest → Enter when it holds → Place SL. Don\'t chase!' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day5_lesson3',
      dayNumber: 5,
      lessonNumber: 3,
      title: 'Drawing Clean Zones',
      description: 'Learn to draw effective S/R levels.',
      objectives: [
        {
          id: 'day5_l3_obj1',
          title: 'Use Zones, Not Lines',
          content: 'Price doesn\'t respect exact lines - it respects AREAS. Draw zones that cover the cluster of reactions. Include candle bodies and wicks in the zone.',
          keyPoints: ['Zones > Lines', 'Cover the reaction area', 'Include bodies and wicks'],
          image: { icon: 'RectangleHorizontal', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Drawing a thin line for support/resistance is more accurate than drawing a zone.',
              correctAnswer: false,
              explanation: 'Zones are more realistic because price rarely respects exact lines.'
            },
            feedback: { correct: 'Zones are more practical than exact lines!', incorrect: 'Price respects areas, not exact lines. Always use zones.' }
          }
        },
        {
          id: 'day5_l3_obj2',
          title: 'Higher Timeframe Zones Are Stronger',
          content: 'Daily & Weekly zones overrule 15-minute zones. Hierarchy: Monthly > Weekly > Daily > 4H > 1H. Always check higher timeframes for major levels.',
          keyPoints: ['Higher TF = Stronger zones', 'Daily/Weekly most important', 'Lower TF for fine-tuning'],
          image: { icon: 'Layers', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'sorting',
            config: {
              items: ['Weekly support', '15-minute resistance', 'Daily support', '1-hour resistance'],
              instruction: 'Sort from STRONGEST to WEAKEST zones',
              correctOrder: ['Weekly support', 'Daily support', '1-hour resistance', '15-minute resistance']
            },
            feedback: { correct: 'Higher timeframes dominate!', incorrect: 'Weekly > Daily > 1H > 15m. Higher timeframes are more significant.' }
          }
        },
        {
          id: 'day5_l3_obj3',
          title: 'Avoid Overdrawing',
          content: 'Beginner mistake: drawing too many levels clutters your chart. Correct method: 2-3 key supports, 2-3 key resistances, everything else is noise. Keep charts clean.',
          keyPoints: ['Less is more', '2-3 S/R levels max', 'Clean charts = clear thinking'],
          image: { icon: 'Eraser', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'How many support/resistance levels should you typically have on a chart?',
              options: ['As many as possible', '2-3 key levels each', 'Only 1', 'None, just use indicators'],
              correctIndex: 1
            },
            feedback: { correct: '2-3 key levels keeps your analysis clear!', incorrect: 'Too many levels creates confusion. Focus on 2-3 most important ones.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'zone_master', name: 'Zone Master', icon: '🏰', description: 'Mastered support and resistance' },
    xp: 100,
    unlocks: ['day_6']
  }
};

// ==================== DAY 6 ====================
const day6: CurriculumDay = {
  dayNumber: 6,
  title: 'Trendlines & Channels',
  emoji: '📐',
  missionRank: 'Level 6 – Trend Rider',
  theme: 'basics',
  lessons: [
    {
      id: 'day6_lesson1',
      dayNumber: 6,
      lessonNumber: 1,
      title: 'Understanding Trends',
      description: 'Learn to identify market direction.',
      objectives: [
        {
          id: 'day6_l1_obj1',
          title: 'Uptrends',
          content: 'Uptrend = Higher Highs (HH) + Higher Lows (HL). Each peak is higher than the last. Each dip doesn\'t go as low as the previous. This shows buyers are in control.',
          keyPoints: ['HH + HL = Uptrend', 'Buyers in control', 'Buy the dips'],
          image: { icon: 'TrendingUp', animation: 'float', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'An uptrend is defined by higher highs AND higher lows.',
              correctAnswer: true,
              explanation: 'Both conditions must be met for a true uptrend.'
            },
            feedback: { correct: 'Both HH and HL define an uptrend!', incorrect: 'An uptrend needs BOTH higher highs and higher lows.' }
          }
        },
        {
          id: 'day6_l1_obj2',
          title: 'Downtrends',
          content: 'Downtrend = Lower Highs (LH) + Lower Lows (LL). Each peak is lower than the last. Each dip goes lower than before. This shows sellers are in control.',
          keyPoints: ['LH + LL = Downtrend', 'Sellers in control', 'Sell the rallies'],
          image: { icon: 'TrendingDown', animation: 'float', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'In a downtrend, each rally peak is:',
              options: ['Higher than the previous', 'Lower than the previous', 'The same height', 'Random'],
              correctIndex: 1
            },
            feedback: { correct: 'Lower Highs define a downtrend!', incorrect: 'Downtrends have Lower Highs - each bounce fails at a lower level.' }
          }
        },
        {
          id: 'day6_l1_obj3',
          title: 'Trend Reversal Clues',
          content: 'Trend reversals appear when: Structure breaks (HH/HL or LH/LL fails), Candle momentum shifts, Key support/resistance breaks. These are early warning signs.',
          keyPoints: ['Structure break = warning', 'Failed HH or HL = possible reversal', 'Wait for confirmation'],
          image: { icon: 'RefreshCw', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'In an uptrend, price makes a new high but then drops below the previous low (breaking the HL pattern).',
              question: 'What is this signaling?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'DOWN',
              explanation: 'Breaking the HL structure suggests the uptrend may be reversing.'
            },
            feedback: { correct: 'Breaking structure often signals reversal!', incorrect: 'When price breaks the trend structure (HL broken in uptrend), it warns of reversal.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day6_lesson2',
      dayNumber: 6,
      lessonNumber: 2,
      title: 'Drawing Trendlines',
      description: 'Connect the dots for trend analysis.',
      objectives: [
        {
          id: 'day6_l2_obj1',
          title: 'Connecting Swing Lows (Uptrend)',
          content: 'In an uptrend, draw a line connecting 2-3 swing lows. This creates a diagonal support line. Don\'t force trendlines - they should be obvious.',
          keyPoints: ['Connect swing lows in uptrend', 'Need 2-3 touches minimum', 'Should be obvious, not forced'],
          image: { icon: 'PenTool', animation: 'float', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'A valid uptrend trendline connects the swing LOWS (dips) of the trend.',
              correctAnswer: true,
              explanation: 'Trendlines connect the lows in uptrends, highs in downtrends.'
            },
            feedback: { correct: 'Uptrend lines connect the lows!', incorrect: 'In uptrends, draw lines under the swing lows to show support.' }
          }
        },
        {
          id: 'day6_l2_obj2',
          title: 'Connecting Swing Highs (Downtrend)',
          content: 'In a downtrend, draw a line connecting 2-3 swing highs. This creates a diagonal resistance line. Same rules apply - don\'t force it.',
          keyPoints: ['Connect swing highs in downtrend', 'Creates resistance line', 'Must look natural'],
          image: { icon: 'PenTool', animation: 'float', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'In a downtrend, a trendline should connect:',
              options: ['The swing lows', 'The swing highs', 'Random points', 'Only the first and last candle'],
              correctIndex: 1
            },
            feedback: { correct: 'Downtrend lines connect the highs!', incorrect: 'In downtrends, connect the swing highs to show resistance.' }
          }
        },
        {
          id: 'day6_l2_obj3',
          title: 'Trendline Breaks',
          content: 'When price breaks a trendline, it signals: Reversal, Consolidation, or Momentum shift. Strong breaks require: Volume, Close outside the line, Not just a wick through.',
          keyPoints: ['Breaks signal change', 'Need volume confirmation', 'Close matters, not just wick'],
          image: { icon: 'Scissors', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'A trendline break is most reliable when:',
              options: ['Price wicks through briefly', 'Price closes beyond the line with volume', 'It happens on a 1-minute chart', 'The line was just drawn'],
              correctIndex: 1
            },
            feedback: { correct: 'Close + volume = real break!', incorrect: 'Real breaks need price to CLOSE beyond the line with good volume.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day6_lesson3',
      dayNumber: 6,
      lessonNumber: 3,
      title: 'Channels',
      description: 'Trade within parallel boundaries.',
      objectives: [
        {
          id: 'day6_l3_obj1',
          title: 'What Is a Channel?',
          content: 'A channel is two parallel trendlines forming boundaries. Types: Ascending channel (upward), Descending channel (downward), Sideways channel (range). Price bounces between the lines.',
          keyPoints: ['Two parallel lines', 'Price bounces between', 'Shows clear range'],
          image: { icon: 'GitBranch', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'ascending', label: 'Upward sloping lines', icon: '📈' },
                { id: 'descending', label: 'Downward sloping lines', icon: '📉' },
                { id: 'sideways', label: 'Horizontal lines', icon: '➡️' }
              ],
              targets: [
                { id: 'asc_channel', label: 'Ascending Channel', acceptsIds: ['ascending'] },
                { id: 'desc_channel', label: 'Descending Channel', acceptsIds: ['descending'] },
                { id: 'range', label: 'Sideways Channel', acceptsIds: ['sideways'] }
              ],
              instruction: 'Match each description to the channel type'
            },
            feedback: { correct: 'You understand channel types!', incorrect: 'Ascending=up, Descending=down, Sideways=horizontal.' }
          }
        },
        {
          id: 'day6_l3_obj2',
          title: 'Trading Inside Channels',
          content: 'Strategy: Buy at the bottom of ascending channels, Sell at the top of descending channels. The channel boundaries act as dynamic support/resistance.',
          keyPoints: ['Buy at channel bottom', 'Sell at channel top', 'Boundaries = S/R'],
          image: { icon: 'ArrowUpDown', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'Price is in an ascending channel and just touched the lower trendline (channel bottom).',
              question: 'What is the typical trading action?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'UP',
              explanation: 'Buying at channel bottom expects bounce to channel top.'
            },
            feedback: { correct: 'Buy at channel bottom, expect bounce!', incorrect: 'Channel bottoms are buying opportunities, expecting price to bounce up.' }
          }
        },
        {
          id: 'day6_l3_obj3',
          title: 'Channel Breakouts',
          content: 'When price breaks out of a channel, expect strong momentum in the breakout direction. Rules: Confirm with volume, Retest entries are safer, Breakouts often lead to big moves.',
          keyPoints: ['Breakouts = strong moves', 'Volume confirms', 'Wait for retest'],
          image: { icon: 'Rocket', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'true_false',
            config: {
              statement: 'When price breaks above an ascending channel, it often signals even stronger bullish momentum.',
              correctAnswer: true,
              explanation: 'Breaking above resistance shows buyers are overwhelming sellers.'
            },
            feedback: { correct: 'Breaking channel resistance is very bullish!', incorrect: 'Upside channel breakouts often lead to accelerated moves higher.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'trend_rider', name: 'Trend Rider', icon: '📐', description: 'Mastered trendlines and channels' },
    xp: 100,
    unlocks: ['day_7']
  }
};

// ==================== DAY 7 ====================
const day7: CurriculumDay = {
  dayNumber: 7,
  title: 'Week 1 Challenge Test',
  emoji: '🏆',
  missionRank: 'Level 7 – Apprentice Trader',
  theme: 'basics',
  lessons: [
    {
      id: 'day7_lesson1',
      dayNumber: 7,
      lessonNumber: 1,
      title: 'Pattern Recognition Test',
      description: 'Test your candlestick knowledge.',
      objectives: [
        {
          id: 'day7_l1_obj1',
          title: 'Candlestick Identification',
          content: 'Time to test everything you\'ve learned about candlesticks! Remember: Bullish = close > open (green), Bearish = close < open (red), Long body = strong momentum, Small body = indecision.',
          keyPoints: ['Green = bullish', 'Red = bearish', 'Body size = momentum'],
          image: { icon: 'CandlestickChart', animation: 'pulse', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'A candle with a very long lower wick and small body at the TOP of an uptrend is called:',
              options: ['Hammer', 'Hanging Man', 'Doji', 'Marubozu'],
              correctIndex: 1
            },
            feedback: { correct: 'At the top = Hanging Man (bearish warning)!', incorrect: 'Same shape, but at top of uptrend = Hanging Man (bearish).' }
          }
        },
        {
          id: 'day7_l1_obj2',
          title: 'Pattern Recognition',
          content: 'Reversal patterns occur at trend extremes. Engulfing patterns show sudden power shifts. Dojis show indecision. Location and context are crucial.',
          keyPoints: ['Context matters', 'Location determines meaning', 'Confirm before trading'],
          image: { icon: 'Search', animation: 'float', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'A bullish engulfing pattern at a major support level is a stronger signal than one in the middle of a range.',
              correctAnswer: true,
              explanation: 'S/R levels add confluence to patterns.'
            },
            feedback: { correct: 'Context and location strengthen patterns!', incorrect: 'Patterns at key levels are much more reliable.' }
          }
        },
        {
          id: 'day7_l1_obj3',
          title: 'Candle Psychology Quiz',
          content: 'Every candle tells a story about buyer/seller battles. Long wicks show rejection. Big bodies show conviction. Dojis show balance.',
          keyPoints: ['Wicks = rejection', 'Bodies = control', 'Dojis = balance'],
          image: { icon: 'Brain', animation: 'pulse', color: '#a855f7' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Long upper wick', right: 'Sellers rejected higher prices' },
                { left: 'Long green body', right: 'Strong buyer control' },
                { left: 'Doji', right: 'Neither side won' }
              ],
              instruction: 'Match the candle feature to its meaning'
            },
            feedback: { correct: 'You read candles like a pro!', incorrect: 'Upper wick=selling pressure, Green body=buyers, Doji=indecision.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day7_lesson2',
      dayNumber: 7,
      lessonNumber: 2,
      title: 'Support/Resistance Test',
      description: 'Test your S/R knowledge.',
      objectives: [
        {
          id: 'day7_l2_obj1',
          title: 'Level Identification',
          content: 'Support = buying zone (floor). Resistance = selling zone (ceiling). Look for multiple touches, strong reversals, and historical significance.',
          keyPoints: ['Support = floor', 'Resistance = ceiling', 'Multiple touches = stronger'],
          image: { icon: 'Layers', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'A level that price has touched 3 times and bounced from is:',
              options: ['Weak', 'Confirmed and strong', 'About to break', 'Irrelevant'],
              correctIndex: 1
            },
            feedback: { correct: '3 touches confirms a level!', incorrect: 'Multiple touches validate a support/resistance level.' }
          }
        },
        {
          id: 'day7_l2_obj2',
          title: 'Breakout vs Fakeout Test',
          content: 'True breakouts need: Strong candle, Volume, Close beyond level. Fakeouts have: Weak candle, Low volume, Close back inside level.',
          keyPoints: ['Strong close = real', 'Volume confirms', 'Wick through = fakeout'],
          image: { icon: 'CheckCircle', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'Price pushes above resistance with high volume and a strong green candle that closes above the level.',
              question: 'Is this likely a real breakout?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'UP',
              explanation: 'Strong candle + volume + close above = confirmed breakout.'
            },
            feedback: { correct: 'All signs point to real breakout!', incorrect: 'Strong close + high volume = real breakout, expect continuation.' }
          }
        },
        {
          id: 'day7_l2_obj3',
          title: 'Zone Drawing Quiz',
          content: 'Use zones, not lines. Higher timeframes are stronger. Don\'t overdraw - keep it clean with 2-3 key levels.',
          keyPoints: ['Zones > lines', 'Higher TF = stronger', 'Less is more'],
          image: { icon: 'PenTool', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'sorting',
            config: {
              items: ['Draw thin exact lines', 'Use 2-3 key zones', 'Check higher timeframes first', 'Draw 10+ levels'],
              instruction: 'Sort from BEST to WORST S/R practices',
              correctOrder: ['Check higher timeframes first', 'Use 2-3 key zones', 'Draw thin exact lines', 'Draw 10+ levels']
            },
            feedback: { correct: 'You know best practices!', incorrect: 'Best: Check higher TF, use few zones. Worst: Too many lines.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day7_lesson3',
      dayNumber: 7,
      lessonNumber: 3,
      title: 'Trend Analysis Test',
      description: 'Final test on trends and trendlines.',
      objectives: [
        {
          id: 'day7_l3_obj1',
          title: 'Trend Identification',
          content: 'Uptrend = HH + HL. Downtrend = LH + LL. Sideways = No clear pattern. Always identify the trend before making any trade decision.',
          keyPoints: ['HH+HL = Up', 'LH+LL = Down', 'Trend is your friend'],
          image: { icon: 'TrendingUp', animation: 'float', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Price makes a Higher High, then a Higher Low, then another Higher High. This is:',
              options: ['Downtrend', 'Uptrend', 'Sideways', 'Reversal'],
              correctIndex: 1
            },
            feedback: { correct: 'HH + HL = Uptrend!', incorrect: 'Higher Highs and Higher Lows define an uptrend.' }
          }
        },
        {
          id: 'day7_l3_obj2',
          title: 'Trendline Mastery',
          content: 'Uptrend lines connect lows. Downtrend lines connect highs. Need 2-3 touches. Don\'t force trendlines that aren\'t obvious.',
          keyPoints: ['Up = connect lows', 'Down = connect highs', 'Must be obvious'],
          image: { icon: 'PenTool', animation: 'pulse', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement: 'If you have to adjust your trendline multiple times to make it fit, it\'s probably not a valid trendline.',
              correctAnswer: true,
              explanation: 'Good trendlines should be obvious and natural.'
            },
            feedback: { correct: 'Don\'t force trendlines!', incorrect: 'Valid trendlines should be obvious - if you\'re forcing it, it\'s not real.' }
          }
        },
        {
          id: 'day7_l3_obj3',
          title: 'Week 1 Final Challenge',
          content: 'Congratulations on completing Week 1! You\'ve learned: Trading basics, Candlesticks, Support/Resistance, Trendlines, and Channels. You\'re ready for Week 2: Indicators!',
          keyPoints: ['Week 1 complete!', 'Foundation established', 'Ready for indicators'],
          image: { icon: 'Trophy', animation: 'pulse', color: '#ffd166' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What is the most important thing to check BEFORE entering any trade?',
              options: ['The color of the candle', 'The overall trend direction', 'The time of day', 'Your account balance'],
              correctIndex: 1
            },
            feedback: { correct: 'Trend is king! Always know the trend before trading.', incorrect: 'Always identify the trend first - it\'s the foundation of all trading.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'apprentice_trader', name: 'Apprentice Trader', icon: '🏆', description: 'Completed Week 1 of the Trading Challenge' },
    xp: 150,
    unlocks: ['day_8', 'week_2']
  }
};

export const week1Days: CurriculumDay[] = [day1, day2, day3, day4, day5, day6, day7];
