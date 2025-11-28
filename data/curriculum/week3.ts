// Week 3: Days 15-21 - Multi-Market Trading Part 1
import type { CurriculumDay } from '../../types/curriculum';

// ==================== DAY 15 ====================
const day15: CurriculumDay = {
  dayNumber: 15,
  title: 'Technical Analysis',
  emoji: '📈',
  missionRank: 'Level 15 – Equity Explorer',
  theme: 'multi_market',
  lessons: [
    {
      id: 'day15_lesson1',
      dayNumber: 15,
      lessonNumber: 1,
      title: 'Understanding Stocks',
      description: 'Learn the fundamentals of stock trading.',
      objectives: [
        {
          id: 'day15_l1_obj1',
          title: 'What is a Stock?',
          content: 'A stock = fractional ownership of a company. When you buy shares, you own part of that business. Types: Blue-chip (Apple, Microsoft), Growth (Tesla), Dividend stocks, Penny stocks (risky).',
          keyPoints: ['Ownership in company', 'Different types exist', 'Penny stocks are risky'],
          image: { icon: 'Building2', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'When you buy stock, you own:',
              options: ['A loan to the company', 'A piece of the company', 'Nothing tangible', 'Company debt'],
              correctIndex: 1
            },
            feedback: { correct: 'Stocks = ownership!', incorrect: 'Buying stock means owning a piece of the company.' }
          }
        },
        {
          id: 'day15_l1_obj2',
          title: 'Stock Market Hours',
          content: 'US markets: 9:30 AM - 4:00 PM EST (Mon-Fri). Pre-market: 4:00 AM - 9:30 AM. After-hours: 4:00 PM - 8:00 PM. Opening and closing hours are most volatile.',
          keyPoints: ['Regular: 9:30-4:00 EST', 'Opening = volatile', 'Closed weekends'],
          image: { icon: 'Clock', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'The first hour of trading (9:30-10:30 AM EST) is typically the most volatile.',
              correctAnswer: true,
              explanation: 'Opening hour sees the most activity and volatility.'
            },
            feedback: { correct: 'Opening hour is most volatile!', incorrect: 'The market open brings high volume and volatility.' }
          }
        },
        {
          id: 'day15_l1_obj3',
          title: 'Why Stock Prices Move',
          content: 'Stock prices move due to: Earnings reports, News and announcements, CEO changes, Market conditions, Industry trends, Supply and demand. Fundamentals + sentiment drive prices.',
          keyPoints: ['Earnings matter most', 'News creates volatility', 'Supply/demand rules'],
          image: { icon: 'TrendingUp', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'earnings', label: 'Earnings Beat', icon: '💰' },
                { id: 'lawsuit', label: 'Major Lawsuit', icon: '⚖️' },
                { id: 'newceo', label: 'Beloved CEO Retires', icon: '👔' },
                { id: 'product', label: 'Hit Product Launch', icon: '🚀' }
              ],
              targets: [
                { id: 'bullish', label: 'Likely Bullish', acceptsIds: ['earnings', 'product'] },
                { id: 'bearish', label: 'Likely Bearish', acceptsIds: ['lawsuit', 'newceo'] }
              ],
              instruction: 'Classify each event as bullish or bearish for stock price'
            },
            feedback: { correct: 'You understand stock catalysts!', incorrect: 'Good news=bullish, Bad news=bearish for stock prices.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day15_lesson2',
      dayNumber: 15,
      lessonNumber: 2,
      title: 'Market Sectors',
      description: 'Understand sector rotation and selection.',
      objectives: [
        {
          id: 'day15_l2_obj1',
          title: 'Sector Types',
          content: 'Main sectors: Technology, Energy, Finance, Healthcare, Consumer, Industrials, Utilities. Each sector moves differently and has unique characteristics.',
          keyPoints: ['11 main sectors', 'Each behaves differently', 'Know the leaders'],
          image: { icon: 'PieChart', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Apple, Microsoft', right: 'Technology' },
                { left: 'ExxonMobil, Chevron', right: 'Energy' },
                { left: 'JPMorgan, Goldman', right: 'Finance' },
                { left: 'Pfizer, Johnson & Johnson', right: 'Healthcare' }
              ],
              instruction: 'Match companies to their sectors'
            },
            feedback: { correct: 'You know the major sector players!', incorrect: 'Tech=Apple/Microsoft, Energy=Oil companies, Finance=Banks, Healthcare=Pharma.' }
          }
        },
        {
          id: 'day15_l2_obj2',
          title: 'Sector Rotation',
          content: 'Money flows between sectors based on economic cycles. Strong sector = good opportunities. Weak sector = avoid or short. Follow the money flow.',
          keyPoints: ['Money rotates between sectors', 'Follow strength', 'Avoid weak sectors'],
          image: { icon: 'RefreshCw', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Trading stocks in a sector that\'s showing relative strength is generally easier than fighting against weak sectors.',
              correctAnswer: true,
              explanation: 'Trade with sector strength, not against it.'
            },
            feedback: { correct: 'Always trade with sector strength!', incorrect: 'Strong sectors offer easier trades than fighting weak ones.' }
          }
        },
        {
          id: 'day15_l2_obj3',
          title: 'Finding Opportunities',
          content: 'Look for: Sector-wide news, Strong leaders outperforming, Laggards for shorts, Relative strength vs market. Sector analysis helps find the best stocks to trade.',
          keyPoints: ['Leaders outperform', 'Laggards underperform', 'Compare to market'],
          image: { icon: 'Search', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'If the Technology sector is up 5% but AAPL is up 8%, AAPL is showing:',
              options: ['Weakness', 'Relative strength', 'No pattern', 'Bearish divergence'],
              correctIndex: 1
            },
            feedback: { correct: 'AAPL is outperforming = relative strength!', incorrect: 'When a stock beats its sector, it shows relative strength.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day15_lesson3',
      dayNumber: 15,
      lessonNumber: 3,
      title: 'Stock Volatility',
      description: 'Handle stock-specific volatility events.',
      objectives: [
        {
          id: 'day15_l3_obj1',
          title: 'Earnings Volatility',
          content: 'Every quarter, companies report earnings. Earnings cause: Huge gaps up/down, Fast moves, Trend reversals or continuations. High risk, high reward events.',
          keyPoints: ['Quarterly reports', 'Can gap 10-20%', 'Very risky to hold'],
          image: { icon: 'Calendar', animation: 'float', color: '#ef4444' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Holding stocks through earnings is considered a high-risk strategy due to potential gaps.',
              correctAnswer: true,
              explanation: 'Earnings can cause stocks to gap 10-20%+ either direction.'
            },
            feedback: { correct: 'Earnings = high risk!', incorrect: 'Stocks can gap dramatically after earnings - very risky.' }
          }
        },
        {
          id: 'day15_l3_obj2',
          title: 'News Volatility',
          content: 'News impacts stocks instantly: Product launches, FDA approvals, Lawsuits, CEO changes, Government actions. News trades are fast - require quick decisions.',
          keyPoints: ['News moves fast', 'Be prepared', 'Or avoid news trades'],
          image: { icon: 'Newspaper', animation: 'pulse', color: '#5b5fff' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'Breaking: FDA rejects drug company\'s main product application.',
              question: 'What happens to the stock?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'DOWN',
              explanation: 'FDA rejection is very bearish for pharma stocks.'
            },
            feedback: { correct: 'Bad news = stock drops!', incorrect: 'Regulatory rejections crush pharma stocks.' }
          }
        },
        {
          id: 'day15_l3_obj3',
          title: 'Market Sentiment',
          content: 'Sentiment = emotional state of the market. Indicators: Fear & Greed Index, VIX (fear gauge), Social media buzz. Extreme fear = buying opportunity. Extreme greed = caution.',
          keyPoints: ['Fear = opportunity', 'Greed = caution', 'VIX measures fear'],
          image: { icon: 'Heart', animation: 'none', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'When the VIX (fear index) spikes to extreme highs, smart traders often:',
              options: ['Panic sell', 'Look for buying opportunities', 'Ignore it', 'Go all-in short'],
              correctIndex: 1
            },
            feedback: { correct: 'Extreme fear often marks bottoms!', incorrect: 'High VIX = high fear = often good buying opportunity.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'equity_explorer', name: 'Equity Explorer', icon: '📈', description: 'Mastered stock trading basics' },
    xp: 100,
    unlocks: ['day_16']
  }
};

// ==================== DAY 16 ====================
const day16: CurriculumDay = {
  dayNumber: 16,
  title: 'Quantitative Analysis',
  emoji: '🪙',
  missionRank: 'Level 16 – Metal Master',
  theme: 'multi_market',
  lessons: [
    {
      id: 'day16_lesson1',
      dayNumber: 16,
      lessonNumber: 1,
      title: 'Understanding Gold',
      description: 'Learn why gold is special.',
      objectives: [
        {
          id: 'day16_l1_obj1',
          title: 'Why Gold Is Important',
          content: 'Gold is: A safe-haven asset (people buy during crisis), Hedge against inflation, Inversely correlated with USD. When stock markets crash, gold often rises.',
          keyPoints: ['Safe haven asset', 'Crisis hedge', 'Inverse to USD'],
          image: { icon: 'Coins', animation: 'float', color: '#ffd166' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Gold typically rises when there\'s fear and uncertainty in financial markets.',
              correctAnswer: true,
              explanation: 'Gold is a safe haven - money flows to it during fear.'
            },
            feedback: { correct: 'Gold rises on fear!', incorrect: 'When markets panic, investors buy gold for safety.' }
          }
        },
        {
          id: 'day16_l1_obj2',
          title: 'Gold\'s Volatility Patterns',
          content: 'Gold is volatile during: US session (most active), Economic data releases (CPI, NFP), Geopolitical events. Moves are often sharp and clean compared to other assets.',
          keyPoints: ['US session = active', 'News moves gold fast', 'Clean trends'],
          image: { icon: 'Activity', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Gold is MOST volatile during which trading session?',
              options: ['Asian session', 'European session', 'US session', 'Weekend'],
              correctIndex: 2
            },
            feedback: { correct: 'US session = most gold volatility!', incorrect: 'The US session sees the most gold trading activity.' }
          }
        },
        {
          id: 'day16_l1_obj3',
          title: 'Gold Correlations',
          content: 'Gold correlates with: USD (inverse - when USD rises, gold falls), JPY (both safe havens), Bond yields (inverse), Inflation expectations (positive).',
          keyPoints: ['Inverse to USD', 'Inverse to yields', 'Positive with inflation'],
          image: { icon: 'GitBranch', animation: 'none', color: '#5b5fff' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'The US Dollar Index (DXY) is surging higher today.',
              question: 'What is gold likely doing?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'DOWN',
              explanation: 'Gold moves inversely to USD - strong dollar = weak gold.'
            },
            feedback: { correct: 'Strong USD = weak gold!', incorrect: 'Gold and USD are inversely correlated.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day16_lesson2',
      dayNumber: 16,
      lessonNumber: 2,
      title: 'Gold Trading Techniques',
      description: 'Strategies for trading gold.',
      objectives: [
        {
          id: 'day16_l2_obj1',
          title: 'Key Gold Levels',
          content: 'Gold respects psychological levels: 1800, 1850, 1900, 1950, 2000. These round numbers create huge reactions. Also watch previous swing highs/lows.',
          keyPoints: ['Round numbers matter', 'Watch 50s and 100s', 'Previous highs/lows'],
          image: { icon: 'Target', animation: 'float', color: '#ffd166' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Psychological round numbers like $2000 often act as major support/resistance in gold.',
              correctAnswer: true,
              explanation: 'Round numbers attract attention and orders.'
            },
            feedback: { correct: 'Round numbers are key levels!', incorrect: 'Traders watch round numbers closely - they matter.' }
          }
        },
        {
          id: 'day16_l2_obj2',
          title: 'Trendline Trading on Gold',
          content: 'Gold trends beautifully. Trendlines + EMA 50/200 work exceptionally well on gold. The metal respects technical analysis better than many assets.',
          keyPoints: ['Gold respects trendlines', 'EMA 50/200 important', 'Clean technical moves'],
          image: { icon: 'TrendingUp', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Which EMAs are most important for gold trading?',
              options: ['EMA 5 and 10', 'EMA 50 and 200', 'EMA 100 and 150', 'No EMAs work on gold'],
              correctIndex: 1
            },
            feedback: { correct: 'EMA 50 and 200 are key for gold!', incorrect: 'The 50 and 200 EMAs are widely watched in gold trading.' }
          }
        },
        {
          id: 'day16_l2_obj3',
          title: 'Gold Breakout Strategy',
          content: 'Gold produces powerful breakouts during: US session openings, News events, Volume spikes. Entry rules: Confirm breakout, Wait for retest, Enter with SL below structure.',
          keyPoints: ['US session breakouts', 'Wait for retest', 'Use proper SL'],
          image: { icon: 'Rocket', animation: 'none', color: '#5b5fff' },
          task: {
            type: 'sorting',
            config: {
              items: ['Chase the breakout immediately', 'Wait for breakout confirmation', 'Wait for retest', 'Enter with stop loss below structure'],
              instruction: 'Sort the CORRECT breakout trading sequence',
              correctOrder: ['Wait for breakout confirmation', 'Wait for retest', 'Enter with stop loss below structure', 'Chase the breakout immediately']
            },
            feedback: { correct: 'Patient entries work best!', incorrect: 'Confirm → Retest → Enter with SL. Don\'t chase.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day16_lesson3',
      dayNumber: 16,
      lessonNumber: 3,
      title: 'Gold Risk Rules',
      description: 'Special considerations for gold.',
      objectives: [
        {
          id: 'day16_l3_obj1',
          title: 'Position Sizing for Gold',
          content: 'Gold moves FAST. Use smaller positions than forex or stocks. Rule: Reduce position size by 30-50% compared to your normal size. Gold can move $50+ in a day.',
          keyPoints: ['Smaller size than forex', 'Reduce by 30-50%', 'Fast moves'],
          image: { icon: 'Scale', animation: 'float', color: '#ef4444' },
          task: {
            type: 'true_false',
            config: {
              statement: 'You should use the same position size for gold as you do for less volatile assets.',
              correctAnswer: false,
              explanation: 'Gold\'s volatility requires smaller positions.'
            },
            feedback: { correct: 'Reduce size for gold!', incorrect: 'Gold is volatile - use smaller positions to manage risk.' }
          }
        },
        {
          id: 'day16_l3_obj2',
          title: 'Avoid Gold During News',
          content: 'CPI, NFP, FOMC = gold chaos. Slippage is high, spreads widen dramatically. Best to close positions before or avoid trading during these events unless experienced.',
          keyPoints: ['CPI/NFP = chaos', 'Spreads widen', 'Avoid unless expert'],
          image: { icon: 'AlertTriangle', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'During major economic releases, gold spreads typically:',
              options: ['Stay the same', 'Get tighter', 'Widen significantly', 'Disappear'],
              correctIndex: 2
            },
            feedback: { correct: 'Spreads widen during news!', incorrect: 'News events cause spreads to widen dramatically.' }
          }
        },
        {
          id: 'day16_l3_obj3',
          title: 'Gold Trading Hours',
          content: 'Best times to trade gold: London open (3 AM EST), US open (8:30 AM EST), Overlap (8-11 AM EST). Avoid: Asian session (choppy), Late US session (low volume).',
          keyPoints: ['London/US open best', 'Overlap = prime time', 'Asian = choppy'],
          image: { icon: 'Clock', animation: 'none', color: '#5b5fff' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'london', label: 'London Open (3 AM EST)', icon: '🇬🇧' },
                { id: 'asian', label: 'Asian Session', icon: '🌏' },
                { id: 'overlap', label: 'London/US Overlap', icon: '🔥' },
                { id: 'lateUS', label: 'Late US Session', icon: '🌙' }
              ],
              targets: [
                { id: 'good', label: 'Good for Trading', acceptsIds: ['london', 'overlap'] },
                { id: 'avoid', label: 'Better to Avoid', acceptsIds: ['asian', 'lateUS'] }
              ],
              instruction: 'Classify each session for gold trading'
            },
            feedback: { correct: 'You know the best gold trading times!', incorrect: 'London open and overlap are best. Asian and late US are slow.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'metal_master', name: 'Metal Master', icon: '🪙', description: 'Mastered gold trading' },
    xp: 100,
    unlocks: ['day_17']
  }
};

// ==================== DAY 17 ====================
const day17: CurriculumDay = {
  dayNumber: 17,
  title: 'Investing in ETFs & REITs',
  emoji: '🛢️',
  missionRank: 'Level 17 – Energy Trader',
  theme: 'multi_market',
  lessons: [
    {
      id: 'day17_lesson1',
      dayNumber: 17,
      lessonNumber: 1,
      title: 'Understanding Oil',
      description: 'Learn the oil market fundamentals.',
      objectives: [
        {
          id: 'day17_l1_obj1',
          title: 'Oil Market Basics',
          content: 'Oil (Crude) is the world\'s most traded commodity. Types: WTI (US benchmark), Brent (Global benchmark). Oil powers economies, so it\'s heavily watched and traded.',
          keyPoints: ['WTI = US oil', 'Brent = Global oil', 'Powers the economy'],
          image: { icon: 'Droplet', animation: 'float', color: '#1a1a1a' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'WTI', right: 'US benchmark crude oil' },
                { left: 'Brent', right: 'Global benchmark crude oil' }
              ],
              instruction: 'Match each oil type to its description'
            },
            feedback: { correct: 'You know oil benchmarks!', incorrect: 'WTI is US-based, Brent is the global standard.' }
          }
        },
        {
          id: 'day17_l1_obj2',
          title: 'What Moves Oil Prices',
          content: 'Oil moves due to: OPEC decisions (supply), Global demand (economic growth), Inventory reports (weekly), Geopolitical events (wars, sanctions), Weather (hurricanes).',
          keyPoints: ['OPEC controls supply', 'Demand from growth', 'Inventory data weekly'],
          image: { icon: 'TrendingUp', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'OPEC announces they will cut oil production by 2 million barrels per day.',
              question: 'What happens to oil prices?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'UP',
              explanation: 'Less supply = higher prices.'
            },
            feedback: { correct: 'Supply cuts = price up!', incorrect: 'When supply decreases, prices typically rise.' }
          }
        },
        {
          id: 'day17_l1_obj3',
          title: 'Oil Volatility',
          content: 'Oil is EXTREMELY volatile. Can move 5-10% in a day. Causes: Geopolitical surprises, Inventory shocks, OPEC surprises. Requires strict risk management.',
          keyPoints: ['Very volatile', '5-10% daily moves', 'Strict risk needed'],
          image: { icon: 'Zap', animation: 'none', color: '#ef4444' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Oil is one of the most volatile commodities, capable of 5-10% moves in a single day.',
              correctAnswer: true,
              explanation: 'Oil volatility is extreme compared to most assets.'
            },
            feedback: { correct: 'Oil volatility is legendary!', incorrect: 'Oil can indeed move 5-10% in a day - extremely volatile.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day17_lesson2',
      dayNumber: 17,
      lessonNumber: 2,
      title: 'Oil Trading Strategies',
      description: 'Approaches to trading oil.',
      objectives: [
        {
          id: 'day17_l2_obj1',
          title: 'Inventory Reports',
          content: 'EIA reports weekly oil inventories (Wednesday 10:30 AM EST). Build (more oil) = bearish. Draw (less oil) = bullish. Major market-moving event every week.',
          keyPoints: ['Wednesday 10:30 AM', 'Build = bearish', 'Draw = bullish'],
          image: { icon: 'BarChart', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'EIA reports oil inventories fell by 10 million barrels (major draw).',
              question: 'What happens to oil prices?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'UP',
              explanation: 'Big inventory draw = bullish for oil.'
            },
            feedback: { correct: 'Less supply = higher prices!', incorrect: 'Inventory draws (less oil in storage) are bullish.' }
          }
        },
        {
          id: 'day17_l2_obj2',
          title: 'OPEC Events',
          content: 'OPEC meetings move oil dramatically. Production cuts = bullish. Production increases = bearish. Watch the calendar for OPEC meetings and prepare positions accordingly.',
          keyPoints: ['Cuts = bullish', 'Increases = bearish', 'Watch OPEC calendar'],
          image: { icon: 'Calendar', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Before a major OPEC meeting with uncertain outcome, you should:',
              options: ['Go all-in long', 'Go all-in short', 'Reduce position size or stay out', 'Ignore it'],
              correctIndex: 2
            },
            feedback: { correct: 'Uncertainty = reduce risk!', incorrect: 'When outcome is uncertain, reduce exposure or avoid.' }
          }
        },
        {
          id: 'day17_l2_obj3',
          title: 'Technical Levels for Oil',
          content: 'Oil respects: Round numbers ($70, $75, $80), Previous highs/lows, Trendlines. These levels create strong reactions. Combine with inventory/OPEC catalysts.',
          keyPoints: ['Round numbers key', 'Previous extremes', 'Combine with news'],
          image: { icon: 'Target', animation: 'none', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Technical analysis is useless on oil because it\'s purely driven by fundamentals.',
              correctAnswer: false,
              explanation: 'Oil respects technical levels very well.'
            },
            feedback: { correct: 'Technicals work on oil!', incorrect: 'Oil actually respects technical levels quite well.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day17_lesson3',
      dayNumber: 17,
      lessonNumber: 3,
      title: 'Oil Risk Management',
      description: 'Survive oil\'s volatility.',
      objectives: [
        {
          id: 'day17_l3_obj1',
          title: 'Position Sizing for Oil',
          content: 'Due to extreme volatility: Use 50% smaller positions than stocks, Never risk more than 1% per trade, Use wider stops to avoid noise. Oil can wipe accounts fast.',
          keyPoints: ['50% smaller than normal', '1% max risk', 'Wider stops needed'],
          image: { icon: 'Shield', animation: 'float', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'For oil trading, your position size should be:',
              options: ['Same as other assets', 'Larger due to opportunities', 'Smaller due to volatility', 'It doesn\'t matter'],
              correctIndex: 2
            },
            feedback: { correct: 'Smaller positions for oil!', incorrect: 'Oil\'s volatility demands smaller position sizes.' }
          }
        },
        {
          id: 'day17_l3_obj2',
          title: 'Avoiding Oil Traps',
          content: 'Common traps: Trading during inventory (slippage), Fighting OPEC trends, Overleveraging, Holding through weekends (gap risk). Discipline saves accounts.',
          keyPoints: ['Don\'t fight OPEC', 'Weekend gap risk', 'Avoid news trading'],
          image: { icon: 'AlertTriangle', animation: 'pulse', color: '#f59e0b' },
          task: {
            type: 'sorting',
            config: {
              items: ['Hold large position through weekend', 'Use tight stops on oil', 'Fight OPEC trend', 'Use conservative position size'],
              instruction: 'Sort from SAFEST to RISKIEST oil trading practices',
              correctOrder: ['Use conservative position size', 'Use tight stops on oil', 'Fight OPEC trend', 'Hold large position through weekend']
            },
            feedback: { correct: 'Conservative sizing is safest!', incorrect: 'Small positions best, weekend holds riskiest.' }
          }
        },
        {
          id: 'day17_l3_obj3',
          title: 'Best Times for Oil',
          content: 'Best: US open (8:30 AM EST), Inventory (Wed 10:30 AM), London/US overlap. Avoid: Asian session (low volume), Right before inventory (uncertainty).',
          keyPoints: ['US session best', 'Inventory time volatile', 'Asian choppy'],
          image: { icon: 'Clock', animation: 'none', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement: 'The best time to trade oil is typically during the US trading session.',
              correctAnswer: true,
              explanation: 'US session has the most oil trading volume and best moves.'
            },
            feedback: { correct: 'US session = best oil trading!', incorrect: 'Oil is most active during US hours.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'energy_trader', name: 'Energy Trader', icon: '🛢️', description: 'Mastered oil trading' },
    xp: 100,
    unlocks: ['day_18']
  }
};

// ==================== DAY 18 ====================
const day18: CurriculumDay = {
  dayNumber: 18,
  title: 'Hedge Funds, Investment Funds & Family Offices',
  emoji: '₿',
  missionRank: 'Level 18 – Digital Asset Explorer',
  theme: 'multi_market',
  lessons: [
    {
      id: 'day18_lesson1',
      dayNumber: 18,
      lessonNumber: 1,
      title: 'Crypto Fundamentals',
      description: 'Understand cryptocurrency markets.',
      objectives: [
        {
          id: 'day18_l1_obj1',
          title: 'What is Cryptocurrency?',
          content: 'Crypto = decentralized digital currency. No banks, no governments. Key cryptos: Bitcoin (BTC), Ethereum (ETH), Altcoins. 24/7 trading, no market close.',
          keyPoints: ['Decentralized', '24/7 markets', 'BTC and ETH lead'],
          image: { icon: 'Bitcoin', animation: 'float', color: '#f7931a' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Unlike stocks, cryptocurrency markets trade 24 hours a day, 7 days a week.',
              correctAnswer: true,
              explanation: 'Crypto never closes - trades around the clock.'
            },
            feedback: { correct: 'Crypto is 24/7!', incorrect: 'Crypto markets are always open - even weekends.' }
          }
        },
        {
          id: 'day18_l1_obj2',
          title: 'Bitcoin Dominance',
          content: 'Bitcoin is the leader. BTC dominance = BTC market cap ÷ Total crypto market cap. High dominance = BTC outperforming alts. Low dominance = altcoins outperforming.',
          keyPoints: ['BTC leads the market', 'Dominance = BTC strength', 'Alts follow BTC'],
          image: { icon: 'Crown', animation: 'pulse', color: '#ffd166' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'When Bitcoin dominance is falling, it typically means:',
              options: ['Bitcoin is crashing', 'Altcoins are outperforming', 'Market is closing', 'Everyone is selling'],
              correctIndex: 1
            },
            feedback: { correct: 'Low dominance = altcoin season!', incorrect: 'Falling BTC dominance means altcoins are gaining relative strength.' }
          }
        },
        {
          id: 'day18_l1_obj3',
          title: 'Crypto Volatility',
          content: 'Crypto is the MOST volatile asset class. 10-20% daily moves are common. 50%+ crashes happen. Amazing opportunities but extreme risk. Not for the faint of heart.',
          keyPoints: ['Most volatile asset', '10-20% daily normal', 'Huge risk and reward'],
          image: { icon: 'Zap', animation: 'none', color: '#ef4444' },
          task: {
            type: 'sorting',
            config: {
              items: ['Government Bonds', 'Blue-chip Stocks', 'Gold', 'Cryptocurrency'],
              instruction: 'Sort from LEAST to MOST volatile',
              correctOrder: ['Government Bonds', 'Blue-chip Stocks', 'Gold', 'Cryptocurrency']
            },
            feedback: { correct: 'Crypto is the most volatile!', incorrect: 'Bonds < Stocks < Gold < Crypto in volatility.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day18_lesson2',
      dayNumber: 18,
      lessonNumber: 2,
      title: 'Crypto Price Drivers',
      description: 'What moves cryptocurrency prices.',
      objectives: [
        {
          id: 'day18_l2_obj1',
          title: 'News and Events',
          content: 'Crypto moves on: Regulatory news (SEC, bans), Exchange hacks, Whale movements, Elon tweets, Halvings (BTC supply cut). News moves crypto faster than any other asset.',
          keyPoints: ['Regulation is key', 'Whale watching', 'News moves fast'],
          image: { icon: 'Newspaper', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'Breaking: A major country announces they\'re banning cryptocurrency trading.',
              question: 'What happens to BTC?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'DOWN',
              explanation: 'Regulatory bans are bearish for crypto.'
            },
            feedback: { correct: 'Bans crush crypto!', incorrect: 'Negative regulatory news causes crypto to drop.' }
          }
        },
        {
          id: 'day18_l2_obj2',
          title: 'Market Sentiment',
          content: 'Crypto sentiment swings wildly: Fear & Greed Index, Social media hype, Funding rates (futures), Exchange flows. "When in doubt, zoom out" - long-term trends matter.',
          keyPoints: ['Sentiment swings extreme', 'Social media matters', 'Zoom out for clarity'],
          image: { icon: 'Heart', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Social media sentiment can significantly impact cryptocurrency prices in the short term.',
              correctAnswer: true,
              explanation: 'Crypto is heavily influenced by social media and influencers.'
            },
            feedback: { correct: 'Social media moves crypto!', incorrect: 'Crypto is very susceptible to social media influence.' }
          }
        },
        {
          id: 'day18_l2_obj3',
          title: 'BTC Correlation',
          content: 'Most altcoins follow Bitcoin. If BTC dumps, alts dump harder. If BTC pumps, alts may pump more. Always watch BTC when trading alts. BTC leads the market.',
          keyPoints: ['Alts follow BTC', 'BTC dumps = alts dump worse', 'Always watch BTC'],
          image: { icon: 'GitBranch', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'When Bitcoin drops 10%, altcoins typically:',
              options: ['Rise to compensate', 'Drop even more (15-20%+)', 'Stay unchanged', 'Moon'],
              correctIndex: 1
            },
            feedback: { correct: 'Alts drop harder than BTC!', incorrect: 'Altcoins are more volatile - they fall harder when BTC drops.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day18_lesson3',
      dayNumber: 18,
      lessonNumber: 3,
      title: 'Crypto Trading Tips',
      description: 'Survive and thrive in crypto.',
      objectives: [
        {
          id: 'day18_l3_obj1',
          title: 'Position Sizing',
          content: 'Use 25-50% of your normal position size. Crypto can move against you 20% while you sleep. Never invest more than you can afford to lose. Seriously.',
          keyPoints: ['25-50% of normal size', 'Can move 20% overnight', 'Only risk what you can lose'],
          image: { icon: 'Scale', animation: 'float', color: '#ef4444' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Due to crypto\'s extreme volatility, position sizes should be smaller than other markets.',
              correctAnswer: true,
              explanation: 'Smaller positions protect against wild swings.'
            },
            feedback: { correct: 'Small crypto positions = survival!', incorrect: 'Crypto volatility demands smaller positions.' }
          }
        },
        {
          id: 'day18_l3_obj2',
          title: 'Leverage Warning',
          content: 'Crypto + high leverage = disaster recipe. Liquidations happen in seconds. Most crypto traders who use high leverage (10x+) blow their accounts. Stick to low or no leverage.',
          keyPoints: ['High leverage = blown accounts', 'Liquidations happen fast', 'Low/no leverage safer'],
          image: { icon: 'AlertTriangle', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What leverage is recommended for beginner crypto traders?',
              options: ['100x', '50x', '2-3x or none', '20x'],
              correctIndex: 2
            },
            feedback: { correct: 'Low leverage or none for beginners!', incorrect: 'Beginners should use 2-3x max, or no leverage at all.' }
          }
        },
        {
          id: 'day18_l3_obj3',
          title: 'Security First',
          content: 'Crypto security: Use strong passwords, Enable 2FA everywhere, Don\'t keep large amounts on exchanges, Beware of scams and phishing. Lost crypto is gone forever.',
          keyPoints: ['2FA is essential', 'Don\'t keep funds on exchanges', 'Scams everywhere'],
          image: { icon: 'Shield', animation: 'none', color: '#22c55e' },
          task: {
            type: 'sorting',
            config: {
              items: ['Leave all crypto on exchange', 'Enable 2FA', 'Click random links', 'Use hardware wallet for savings'],
              instruction: 'Sort from BEST to WORST security practices',
              correctOrder: ['Enable 2FA', 'Use hardware wallet for savings', 'Leave all crypto on exchange', 'Click random links']
            },
            feedback: { correct: 'Security first in crypto!', incorrect: '2FA essential, hardware wallets for savings, never click random links.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'digital_explorer', name: 'Digital Asset Explorer', icon: '₿', description: 'Learned crypto trading basics' },
    xp: 100,
    unlocks: ['day_19']
  }
};

// ==================== DAY 19 ====================
const day19: CurriculumDay = {
  dayNumber: 19,
  title: 'Fixed Income',
  emoji: '🚀',
  missionRank: 'Level 19 – Crypto Specialist',
  theme: 'multi_market',
  lessons: [
    {
      id: 'day19_lesson1',
      dayNumber: 19,
      lessonNumber: 1,
      title: 'Technical Analysis for Crypto',
      description: 'Apply TA to cryptocurrency.',
      objectives: [
        {
          id: 'day19_l1_obj1',
          title: 'Crypto Respects TA',
          content: 'Despite volatility, crypto respects technical analysis well. Support/resistance, trendlines, patterns all work. Higher timeframes (4H, Daily) are more reliable than lower.',
          keyPoints: ['TA works on crypto', 'Higher TF better', 'Classic patterns work'],
          image: { icon: 'LineChart', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Technical analysis doesn\'t work on cryptocurrency because it\'s too volatile.',
              correctAnswer: false,
              explanation: 'TA actually works very well on crypto, especially higher timeframes.'
            },
            feedback: { correct: 'TA works on crypto!', incorrect: 'Crypto respects TA well - it\'s a technical trader\'s market.' }
          }
        },
        {
          id: 'day19_l1_obj2',
          title: 'Key Crypto Indicators',
          content: 'Best indicators for crypto: RSI (overbought/oversold), MACD (momentum), Volume (confirmation), Moving averages (trend). Same tools, adjusted for volatility.',
          keyPoints: ['RSI for extremes', 'Volume confirms moves', 'MAs for trend'],
          image: { icon: 'BarChart3', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'RSI', right: 'Spot overbought/oversold extremes' },
                { left: 'Volume', right: 'Confirm breakouts and moves' },
                { left: 'Moving Averages', right: 'Identify trend direction' }
              ],
              instruction: 'Match each indicator to its crypto use'
            },
            feedback: { correct: 'You know crypto indicators!', incorrect: 'RSI=extremes, Volume=confirmation, MAs=trend.' }
          }
        },
        {
          id: 'day19_l1_obj3',
          title: 'Psychological Levels',
          content: 'Crypto loves round numbers: BTC $30K, $40K, $50K. ETH $2K, $3K, $4K. These create massive support/resistance. Watch for reactions at these levels.',
          keyPoints: ['Round numbers huge', 'Create S/R zones', 'Whole thousands matter'],
          image: { icon: 'Target', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Bitcoin approaching $50,000 from below is likely to:',
              options: ['Blast through easily', 'Face resistance at $50K', 'Reverse immediately', 'Go sideways forever'],
              correctIndex: 1
            },
            feedback: { correct: 'Round numbers create resistance!', incorrect: '$50K is a major psychological level - expect resistance.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day19_lesson2',
      dayNumber: 19,
      lessonNumber: 2,
      title: 'Altcoin Strategies',
      description: 'Trade altcoins effectively.',
      objectives: [
        {
          id: 'day19_l2_obj1',
          title: 'Altcoin Selection',
          content: 'Choose alts wisely: Top 20 by market cap (safer), Strong team and use case, High volume (liquidity), Not pure hype. Avoid: Low liquidity coins, meme coins (unless you know what you\'re doing).',
          keyPoints: ['Stick to top 20', 'Need good volume', 'Avoid low liquidity'],
          image: { icon: 'ListFilter', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'top10', label: 'Top 10 market cap', icon: '✅' },
                { id: 'lowvol', label: 'Very low volume', icon: '⚠️' },
                { id: 'meme', label: 'Random meme coin', icon: '🐕' },
                { id: 'usecase', label: 'Strong use case', icon: '💪' }
              ],
              targets: [
                { id: 'good', label: 'Good for Trading', acceptsIds: ['top10', 'usecase'] },
                { id: 'risky', label: 'Very Risky', acceptsIds: ['lowvol', 'meme'] }
              ],
              instruction: 'Classify each altcoin characteristic'
            },
            feedback: { correct: 'You can evaluate altcoins!', incorrect: 'Top coins with use cases good; low volume and memes risky.' }
          }
        },
        {
          id: 'day19_l2_obj2',
          title: 'Alt Season',
          content: '"Alt season" = when altcoins massively outperform Bitcoin. Signs: BTC dominance falling, Alts making new highs, Social media hype increasing. Great opportunity but also great risk.',
          keyPoints: ['BTC dominance drops', 'Alts outperform BTC', 'High reward, high risk'],
          image: { icon: 'Rocket', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Alt season is typically identified by falling Bitcoin dominance and altcoins outperforming.',
              correctAnswer: true,
              explanation: 'Alt season = BTC dominance down, alts up.'
            },
            feedback: { correct: 'You understand alt season!', incorrect: 'Alt season: BTC dominance falls as money flows to altcoins.' }
          }
        },
        {
          id: 'day19_l2_obj3',
          title: 'Alt Trading Rules',
          content: 'Rules: Always watch BTC first, Use even smaller size than BTC, Take profits regularly (alts dump fast), Never marry an altcoin. Alts can go to zero - BTC usually survives.',
          keyPoints: ['Watch BTC first', 'Take profits often', 'Alts can go to zero'],
          image: { icon: 'Shield', animation: 'none', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'Before trading any altcoin, you should first check:',
              options: ['Twitter hype', 'Bitcoin\'s trend', 'The meme potential', 'Nothing, just buy'],
              correctIndex: 1
            },
            feedback: { correct: 'Always check BTC first!', incorrect: 'BTC leads the market - always check it before trading alts.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day19_lesson3',
      dayNumber: 19,
      lessonNumber: 3,
      title: 'Crypto Risk Management',
      description: 'Advanced crypto risk strategies.',
      objectives: [
        {
          id: 'day19_l3_obj1',
          title: 'Dollar Cost Averaging (DCA)',
          content: 'DCA = invest fixed amounts regularly. Instead of timing the market, you buy at all prices. Reduces impact of volatility. Great for long-term crypto accumulation.',
          keyPoints: ['Buy regularly', 'Reduces timing risk', 'Good for long-term'],
          image: { icon: 'Calendar', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Dollar cost averaging helps reduce the risk of buying at the wrong time.',
              correctAnswer: true,
              explanation: 'DCA spreads your purchases across different prices.'
            },
            feedback: { correct: 'DCA reduces timing risk!', incorrect: 'By buying regularly, you average out price fluctuations.' }
          }
        },
        {
          id: 'day19_l3_obj2',
          title: 'Portfolio Allocation',
          content: 'Suggested crypto allocation: BTC 50-60%, ETH 20-30%, Selected alts 10-20%. Never more than 10-20% of total investment portfolio in crypto. Diversification matters.',
          keyPoints: ['BTC 50-60%', 'ETH 20-30%', 'Alts 10-20%'],
          image: { icon: 'PieChart', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What should make up the largest portion of a crypto portfolio?',
              options: ['Random altcoins', 'Meme coins', 'Bitcoin', 'The newest ICO'],
              correctIndex: 2
            },
            feedback: { correct: 'BTC should be the foundation!', incorrect: 'Bitcoin is the safest and should be 50-60% of crypto holdings.' }
          }
        },
        {
          id: 'day19_l3_obj3',
          title: 'Taking Profits',
          content: 'Critical in crypto: Take profits on the way up. Don\'t wait for "the top." Scale out in portions (25% at 2x, 25% at 3x, etc.). You can\'t go broke taking profits.',
          keyPoints: ['Take profits on the way up', 'Scale out in portions', 'Don\'t wait for "the top"'],
          image: { icon: 'DollarSign', animation: 'none', color: '#ffd166' },
          task: {
            type: 'sorting',
            config: {
              items: ['Never sell, HODL forever', 'Take some profit at 2x', 'Scale out gradually', 'Wait for the exact top'],
              instruction: 'Sort from BEST to WORST profit-taking strategies',
              correctOrder: ['Scale out gradually', 'Take some profit at 2x', 'Wait for the exact top', 'Never sell, HODL forever']
            },
            feedback: { correct: 'Scaling out is the smartest approach!', incorrect: 'Best: Scale out gradually. Never selling or waiting for exact top are risky.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'crypto_specialist', name: 'Crypto Specialist', icon: '🚀', description: 'Mastered advanced crypto trading' },
    xp: 100,
    unlocks: ['day_20']
  }
};

// ==================== DAY 20 ====================
const day20: CurriculumDay = {
  dayNumber: 20,
  title: 'Sustainability & ESG Investing',
  emoji: '💱',
  missionRank: 'Level 20 – Currency Hunter',
  theme: 'multi_market',
  lessons: [
    {
      id: 'day20_lesson1',
      dayNumber: 20,
      lessonNumber: 1,
      title: 'Forex Fundamentals',
      description: 'Understand currency markets.',
      objectives: [
        {
          id: 'day20_l1_obj1',
          title: 'What is Forex?',
          content: 'Forex = foreign exchange, trading currencies against each other. The LARGEST market: $6+ trillion daily volume. 24/5 trading (Mon-Fri). Always traded in pairs: EUR/USD, GBP/USD, etc.',
          keyPoints: ['$6T daily volume', '24/5 markets', 'Always in pairs'],
          image: { icon: 'Currency', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Forex is the largest financial market in the world by daily volume.',
              correctAnswer: true,
              explanation: '$6+ trillion daily makes forex the biggest.'
            },
            feedback: { correct: 'Forex is the biggest market!', incorrect: 'With $6+ trillion daily, forex is the world\'s largest market.' }
          }
        },
        {
          id: 'day20_l1_obj2',
          title: 'Currency Pairs',
          content: 'Pairs have: Base currency (first) and Quote currency (second). EUR/USD at 1.10 means 1 EUR = 1.10 USD. Majors: EUR/USD, GBP/USD, USD/JPY, USD/CHF. Cross pairs: EUR/GBP, etc.',
          keyPoints: ['Base/Quote structure', 'Majors most liquid', 'Know the major pairs'],
          image: { icon: 'ArrowLeftRight', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'EUR/USD', right: 'Euro vs US Dollar' },
                { left: 'GBP/USD', right: 'British Pound vs US Dollar' },
                { left: 'USD/JPY', right: 'US Dollar vs Japanese Yen' }
              ],
              instruction: 'Match each pair to its currencies'
            },
            feedback: { correct: 'You know forex pairs!', incorrect: 'EUR/USD=Euro vs Dollar, GBP/USD=Pound vs Dollar, USD/JPY=Dollar vs Yen.' }
          }
        },
        {
          id: 'day20_l1_obj3',
          title: 'Pips and Lots',
          content: 'Pip = smallest price move (usually 0.0001). Lot = position size. Standard lot = 100,000 units. Mini lot = 10,000. Micro lot = 1,000. Pip value depends on lot size.',
          keyPoints: ['Pip = 0.0001', 'Lot = position size', 'Start with micro lots'],
          image: { icon: 'Calculator', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'A beginner should start trading forex with:',
              options: ['Standard lots (100K)', 'Mini lots (10K)', 'Micro lots (1K)', 'Maximum leverage'],
              correctIndex: 2
            },
            feedback: { correct: 'Micro lots for beginners!', incorrect: 'Start with micro lots (1K) to learn with minimal risk.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day20_lesson2',
      dayNumber: 20,
      lessonNumber: 2,
      title: 'Forex Sessions',
      description: 'Trade the right times.',
      objectives: [
        {
          id: 'day20_l2_obj1',
          title: 'Trading Sessions',
          content: 'Three main sessions: Sydney/Tokyo (Asian), London (European), New York (US). Each has different characteristics. Overlaps = most volume and volatility.',
          keyPoints: ['Asian, London, New York', 'Overlaps = volatility', '24 hour rotation'],
          image: { icon: 'Globe', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'asian', label: 'Asian Session', icon: '🌏' },
                { id: 'london', label: 'London Session', icon: '🇬🇧' },
                { id: 'ny', label: 'New York Session', icon: '🗽' }
              ],
              targets: [
                { id: 'low', label: 'Lower Volatility', acceptsIds: ['asian'] },
                { id: 'high', label: 'Higher Volatility', acceptsIds: ['london', 'ny'] }
              ],
              instruction: 'Classify sessions by typical volatility'
            },
            feedback: { correct: 'You know session characteristics!', incorrect: 'Asian = quieter, London/NY = more volatile.' }
          }
        },
        {
          id: 'day20_l2_obj2',
          title: 'Best Trading Hours',
          content: 'Best times: London open (3 AM EST), New York open (8 AM EST), London/NY overlap (8-12 PM EST). Avoid: Asian session for major pairs (choppy), Sunday open (gaps).',
          keyPoints: ['London/NY overlap best', 'Avoid Asian for majors', 'Sunday can gap'],
          image: { icon: 'Clock', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'The London/New York session overlap (8 AM - 12 PM EST) typically has the highest forex volume.',
              correctAnswer: true,
              explanation: 'Two major centers trading simultaneously = highest volume.'
            },
            feedback: { correct: 'Overlap = peak volume!', incorrect: 'When London and NY both trade, volume is highest.' }
          }
        },
        {
          id: 'day20_l2_obj3',
          title: 'Session-Based Strategies',
          content: 'Asian: Range trading, quiet pairs. London: Breakouts, trend starts. New York: Trend continuation, reversals at extremes. Match strategy to session.',
          keyPoints: ['Asian = ranges', 'London = breakouts', 'NY = continuation'],
          image: { icon: 'Target', animation: 'none', color: '#f59e0b' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Asian Session', right: 'Range trading' },
                { left: 'London Open', right: 'Breakout trading' },
                { left: 'New York', right: 'Trend continuation' }
              ],
              instruction: 'Match sessions to their typical strategies'
            },
            feedback: { correct: 'You match strategies to sessions!', incorrect: 'Asian=ranges, London=breakouts, NY=trends.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day20_lesson3',
      dayNumber: 20,
      lessonNumber: 3,
      title: 'Forex Fundamentals',
      description: 'Economic factors affecting currencies.',
      objectives: [
        {
          id: 'day20_l3_obj1',
          title: 'Interest Rates',
          content: 'Central banks set interest rates. Higher rates = stronger currency (attracts investment). Lower rates = weaker currency. Fed, ECB, BOE decisions move markets.',
          keyPoints: ['Higher rates = stronger', 'Central banks decide', 'Big market movers'],
          image: { icon: 'Percent', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'The Federal Reserve unexpectedly raises interest rates by 0.5%.',
              question: 'What happens to USD?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'UP',
              explanation: 'Higher rates attract investment, strengthening currency.'
            },
            feedback: { correct: 'Rate hikes strengthen currency!', incorrect: 'Higher rates = stronger currency as money flows in.' }
          }
        },
        {
          id: 'day20_l3_obj2',
          title: 'Economic Data',
          content: 'Key releases: NFP (US jobs), CPI (inflation), GDP (growth), PMI (manufacturing). Better than expected = bullish for currency. Worse = bearish. Calendar is essential.',
          keyPoints: ['NFP moves USD', 'CPI = inflation', 'Use economic calendar'],
          image: { icon: 'Calendar', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'true_false',
            config: {
              statement: 'Non-Farm Payrolls (NFP) is one of the most important economic releases for USD.',
              correctAnswer: true,
              explanation: 'NFP is the premier US jobs report.'
            },
            feedback: { correct: 'NFP is crucial for USD!', incorrect: 'NFP (jobs data) is a major USD mover.' }
          }
        },
        {
          id: 'day20_l3_obj3',
          title: 'News Trading Caution',
          content: 'News trading is risky: Spreads widen dramatically, Slippage is high, Whipsaws common. Better to trade the aftermath than the event itself. Let volatility settle.',
          keyPoints: ['Spreads widen', 'Slippage happens', 'Trade aftermath'],
          image: { icon: 'AlertTriangle', animation: 'none', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'During major forex news releases, spreads typically:',
              options: ['Stay the same', 'Get tighter', 'Widen significantly', 'Disappear'],
              correctIndex: 2
            },
            feedback: { correct: 'Spreads widen during news!', incorrect: 'News events cause spreads to widen dramatically.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'currency_hunter', name: 'Currency Hunter', icon: '💱', description: 'Learned forex trading basics' },
    xp: 100,
    unlocks: ['day_21']
  }
};

// ==================== DAY 21 ====================
const day21: CurriculumDay = {
  dayNumber: 21,
  title: 'Artificial Intelligence in Trading & Analysis',
  emoji: '🌍',
  missionRank: 'Level 21 – Multi-Market Trader',
  theme: 'multi_market',
  lessons: [
    {
      id: 'day21_lesson1',
      dayNumber: 21,
      lessonNumber: 1,
      title: 'Stocks & Commodities Test',
      description: 'Test your knowledge of stocks, gold, and oil.',
      objectives: [
        {
          id: 'day21_l1_obj1',
          title: 'Stock Market Quiz',
          content: 'Review: Stocks = company ownership. Earnings move stocks. Sectors rotate. Trade with sector strength, not against it. News and sentiment drive short-term moves.',
          keyPoints: ['Earnings matter', 'Sector strength', 'News moves prices'],
          image: { icon: 'TrendingUp', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'The riskiest time to hold a stock is:',
              options: ['During a trend', 'Through an earnings announcement', 'On a quiet Tuesday', 'When volume is high'],
              correctIndex: 1
            },
            feedback: { correct: 'Earnings can cause huge gaps!', incorrect: 'Earnings announcements can cause 10-20%+ gaps.' }
          }
        },
        {
          id: 'day21_l1_obj2',
          title: 'Gold Trading Quiz',
          content: 'Review: Gold = safe haven. Inverse to USD. Best during London/US overlap. Use smaller position sizes. Respects technicals well.',
          keyPoints: ['Safe haven', 'Inverse to USD', 'Smaller positions'],
          image: { icon: 'Coins', animation: 'pulse', color: '#ffd166' },
          task: {
            type: 'price_prediction',
            config: {
              scenario: 'Stock markets are crashing and fear is spreading globally.',
              question: 'What typically happens to gold?',
              options: ['UP', 'DOWN', 'SIDEWAYS'],
              correctAnswer: 'UP',
              explanation: 'Gold is a safe haven - rises during fear.'
            },
            feedback: { correct: 'Gold rises on fear!', incorrect: 'Gold is a safe haven - money flows to it during crises.' }
          }
        },
        {
          id: 'day21_l1_obj3',
          title: 'Oil Trading Quiz',
          content: 'Review: Oil is extremely volatile. OPEC decisions matter. Inventory reports weekly. Use conservative position sizes. WTI and Brent are key benchmarks.',
          keyPoints: ['OPEC moves prices', 'Inventory data weekly', 'Very volatile'],
          image: { icon: 'Droplet', animation: 'none', color: '#1a1a1a' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'OPEC production cut', right: 'Bullish for oil' },
                { left: 'Inventory build', right: 'Bearish for oil' },
                { left: 'Geopolitical tension', right: 'Usually bullish for oil' }
              ],
              instruction: 'Match each event to its oil price impact'
            },
            feedback: { correct: 'You understand oil catalysts!', incorrect: 'Cuts/tensions=bullish, builds=bearish.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day21_lesson2',
      dayNumber: 21,
      lessonNumber: 2,
      title: 'Crypto Quiz',
      description: 'Test your cryptocurrency knowledge.',
      objectives: [
        {
          id: 'day21_l2_obj1',
          title: 'Crypto Fundamentals Quiz',
          content: 'Review: Crypto = most volatile. 24/7 markets. BTC leads. Smaller positions essential. Security is critical. Take profits on the way up.',
          keyPoints: ['Most volatile', 'BTC leads', 'Security first'],
          image: { icon: 'Bitcoin', animation: 'float', color: '#f7931a' },
          task: {
            type: 'true_false',
            config: {
              statement: 'When Bitcoin drops significantly, altcoins typically drop even more.',
              correctAnswer: true,
              explanation: 'Altcoins are more volatile than BTC.'
            },
            feedback: { correct: 'Alts drop harder than BTC!', incorrect: 'Altcoins have higher volatility - they amplify BTC moves.' }
          }
        },
        {
          id: 'day21_l2_obj2',
          title: 'Crypto Risk Quiz',
          content: 'Review: Small positions, low leverage, DCA for long-term, scale out profits, BTC as foundation. Never invest more than you can afford to lose.',
          keyPoints: ['Small positions', 'Low leverage', 'Take profits'],
          image: { icon: 'Shield', animation: 'pulse', color: '#ef4444' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'What percentage of a crypto portfolio should Bitcoin typically represent?',
              options: ['0-10%', '20-30%', '50-60%', '100%'],
              correctIndex: 2
            },
            feedback: { correct: 'BTC should be 50-60% of crypto holdings!', incorrect: 'Bitcoin should be the foundation - 50-60% of crypto portfolio.' }
          }
        },
        {
          id: 'day21_l2_obj3',
          title: 'Altcoin Strategy Quiz',
          content: 'Review: Watch BTC first. Stick to top market caps. High volume needed. Alt season = BTC dominance falling. Take profits aggressively.',
          keyPoints: ['BTC first', 'Top coins safer', 'Take profits often'],
          image: { icon: 'Rocket', animation: 'none', color: '#22c55e' },
          task: {
            type: 'sorting',
            config: {
              items: ['Check BTC trend', 'Verify alt has good volume', 'Look at social media hype', 'Analyze the chart'],
              instruction: 'Sort the altcoin trading checklist from FIRST to LAST',
              correctOrder: ['Check BTC trend', 'Analyze the chart', 'Verify alt has good volume', 'Look at social media hype']
            },
            feedback: { correct: 'BTC first, then analysis!', incorrect: 'Always: BTC trend → Chart → Volume → Other factors.' }
          }
        }
      ],
      estimatedMinutes: 5
    },
    {
      id: 'day21_lesson3',
      dayNumber: 21,
      lessonNumber: 3,
      title: 'Forex & Final Test',
      description: 'Complete the multi-market challenge.',
      objectives: [
        {
          id: 'day21_l3_obj1',
          title: 'Forex Quiz',
          content: 'Review: Largest market. 24/5 trading. Pairs structure. Sessions matter. Interest rates drive long-term. Economic data creates volatility.',
          keyPoints: ['Largest market', 'Sessions matter', 'Rates drive trend'],
          image: { icon: 'Currency', animation: 'float', color: '#5b5fff' },
          task: {
            type: 'matching',
            config: {
              pairs: [
                { left: 'Asian Session', right: 'Lower volatility, range trading' },
                { left: 'London Open', right: 'Breakouts, high volatility' },
                { left: 'London/NY Overlap', right: 'Highest volume' }
              ],
              instruction: 'Match sessions to their characteristics'
            },
            feedback: { correct: 'You know forex sessions!', incorrect: 'Asian=quiet, London=breakouts, Overlap=highest volume.' }
          }
        },
        {
          id: 'day21_l3_obj2',
          title: 'Multi-Market Comparison',
          content: 'Different markets, different characteristics. Crypto: Most volatile, 24/7. Forex: Largest, 24/5. Stocks: News-driven, limited hours. Gold/Oil: Event-driven.',
          keyPoints: ['Each market unique', 'Match style to market', 'Diversification helps'],
          image: { icon: 'LayoutGrid', animation: 'pulse', color: '#22c55e' },
          task: {
            type: 'drag_and_drop',
            config: {
              items: [
                { id: 'crypto', label: 'Most Volatile', icon: '₿' },
                { id: 'forex', label: 'Largest Volume', icon: '💱' },
                { id: 'stocks', label: 'Earnings Driven', icon: '📈' },
                { id: 'gold', label: 'Safe Haven', icon: '🪙' }
              ],
              targets: [
                { id: 'correct', label: 'Correct Market', acceptsIds: ['crypto', 'forex', 'stocks', 'gold'] }
              ],
              instruction: 'Match each characteristic to its market (all are correct matches)'
            },
            feedback: { correct: 'You understand all markets!', incorrect: 'Crypto=volatile, Forex=largest, Stocks=earnings, Gold=safe haven.' }
          }
        },
        {
          id: 'day21_l3_obj3',
          title: 'Week 3 Complete!',
          content: 'Congratulations! You\'ve learned to trade: Stocks, Gold, Oil, Cryptocurrency, and Forex. You\'re now a multi-market trader! Week 4: Advanced strategies await.',
          keyPoints: ['Multi-market knowledge', '5 markets covered', 'Ready for advanced'],
          image: { icon: 'Trophy', animation: 'pulse', color: '#ffd166' },
          task: {
            type: 'multiple_choice',
            config: {
              question: 'The MOST important skill across ALL markets is:',
              options: ['Finding the perfect entry', 'Risk management', 'Using maximum leverage', 'Trading every day'],
              correctIndex: 1
            },
            feedback: { correct: 'Risk management is universal!', incorrect: 'No matter the market, risk management is #1.' }
          }
        }
      ],
      estimatedMinutes: 5
    }
  ],
  rewards: {
    badge: { id: 'multi_market_trader', name: 'Multi-Market Trader', icon: '🌍', description: 'Completed Week 3 - Multi-Market Trading' },
    xp: 150,
    unlocks: ['day_22', 'week_4']
  }
};

export const week3Days: CurriculumDay[] = [day15, day16, day17, day18, day19, day20, day21];
