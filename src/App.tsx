import { useState, useEffect, useRef, useCallback } from 'react';
import { VehicleType, Racer, RaceStats, HistoryItem, TyperacerText } from './types';
import { TYPERACER_TEXTS } from './data/texts';
import { translations } from './data/translations';
import { Track } from './components/Track';
import { Stats } from './components/Stats';
import { TypingArea } from './components/TypingArea';
import { SetupCard } from './components/SetupCard';
import { HistoryList } from './components/HistoryList';
import { playKeypress, playError, playVictory, toggleMute, getMuted } from './utils/audio';
import { RotateCcw, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const LOCAL_STORAGE_KEY_BEST_WPM = 'typeracer_best_wpm';
const LOCAL_STORAGE_KEY_TOTAL_RACES = 'typeracer_total_races';
const LOCAL_STORAGE_KEY_HISTORY = 'typeracer_history_list';
const LOCAL_STORAGE_KEY_LANG = 'typeracer_lang';

export default function App() {
  // Localization state
  const [lang, setLang] = useState<'mn' | 'en'>('en'); // Defaults to english

  // Gameplay Configuration state
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>('car');
  const [selectedCategory, setSelectedCategory] = useState<string>('all_en');
  const [textDifficulty, setTextDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [botDifficulty, setBotDifficulty] = useState<'none' | 'easy' | 'medium' | 'hard'>('medium');

  // Text & Typing state
  const defaultEnglishText = TYPERACER_TEXTS.find(t => t.lang === 'en') || TYPERACER_TEXTS[0];
  const [currentText, setCurrentText] = useState<TyperacerText>(defaultEnglishText);
  const [typedText, setTypedText] = useState<string>('');
  
  // Game Status state
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  
  // Stats and high scores
  const [bestWpm, setBestWpm] = useState<number>(0);
  const [totalRaces, setTotalRaces] = useState<number>(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Time tracking
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [totalKeysPressed, setTotalKeysPressed] = useState<number>(0);

  // Bot states
  const [botProgress, setBotProgress] = useState<number>(0);

  // Refs for intervals
  const timerIntervalRef = useRef<any>(null);
  const countdownIntervalRef = useRef<any>(null);
  const botIntervalRef = useRef<any>(null);
  const lastTimeRef = useRef<number>(0);

  // Get active vehicle emoji
  const getVehicleEmoji = (type: VehicleType) => {
    switch (type) {
      case 'rocket': return '🚀';
      case 'horse': return '🐎';
      case 'car':
      default: return '🚗';
    }
  };

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedBest = localStorage.getItem(LOCAL_STORAGE_KEY_BEST_WPM);
    if (savedBest) setBestWpm(parseInt(savedBest, 10));

    const savedTotal = localStorage.getItem(LOCAL_STORAGE_KEY_TOTAL_RACES);
    if (savedTotal) setTotalRaces(parseInt(savedTotal, 10));

    const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY_HISTORY);
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedLanguage = localStorage.getItem(LOCAL_STORAGE_KEY_LANG) as 'mn' | 'en' | null;
    if (savedLanguage === 'mn' || savedLanguage === 'en') {
      setLang(savedLanguage);
      setSelectedCategory(savedLanguage === 'mn' ? 'all_mn' : 'all_en');
      const filtered = TYPERACER_TEXTS.filter(t => t.lang === savedLanguage);
      if (filtered.length > 0) {
        setCurrentText(filtered[0]);
      }
    } else {
      setLang('en');
      setSelectedCategory('all_en');
      const filtered = TYPERACER_TEXTS.filter(t => t.lang === 'en');
      if (filtered.length > 0) {
        setCurrentText(filtered[0]);
      }
    }

    setIsMuted(getMuted());
  }, []);

  // Set initial text depending on selected category when loaded or reset
  const pickRandomText = useCallback((
    categoryFilter: string, 
    targetLang?: 'mn' | 'en', 
    difficultyFilter?: 'all' | 'easy' | 'medium' | 'hard'
  ) => {
    const activeLang = targetLang || lang;
    const activeDiff = difficultyFilter || textDifficulty;

    let filtered = categoryFilter.startsWith('all')
      ? TYPERACER_TEXTS.filter(t => t.lang === activeLang)
      : TYPERACER_TEXTS.filter(t => t.category === categoryFilter && t.lang === activeLang);
    
    // Filter by difficulty if set (and not 'all')
    if (activeDiff !== 'all') {
      const tempFiltered = filtered.filter(t => t.difficulty === activeDiff);
      // Fallback: if no text exists for that category + difficulty, use the original list
      if (tempFiltered.length > 0) {
        filtered = tempFiltered;
      }
    }
    
    if (filtered.length === 0) return TYPERACER_TEXTS[0];
    
    // Pick different text if possible
    let chosen = filtered[Math.floor(Math.random() * filtered.length)];
    if (filtered.length > 1 && chosen.id === currentText.id) {
      const candidates = filtered.filter(t => t.id !== currentText.id);
      chosen = candidates[Math.floor(Math.random() * candidates.length)];
    }
    return chosen;
  }, [currentText, lang, textDifficulty]);

  // Audio volume toggling
  const handleToggleMute = () => {
    const muted = toggleMute();
    setIsMuted(muted);
  };

  // Compute character correctness to calculate user progress
  let correctPrefixLength = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentText.text[i]) {
      correctPrefixLength++;
    } else {
      break; // Stop counting at the first error
    }
  }

  const playerProgress = currentText.text.length > 0 
    ? (correctPrefixLength / currentText.text.length) * 100 
    : 0;

  // Calculate live statistics
  const calculateLiveWpm = () => {
    if (elapsedTime <= 0) return 0;
    // Standard formula: (Correct Characters / 5) / (Time elapsed in minutes)
    const wordsCount = correctPrefixLength / 5;
    const minutes = elapsedTime / 60;
    return Math.round(wordsCount / minutes);
  };

  const calculateAccuracy = () => {
    if (totalKeysPressed === 0) return 100;
    const accuracy = Math.max(0, Math.min(100, Math.round(((totalKeysPressed - errorsCount) / totalKeysPressed) * 100)));
    return accuracy;
  };

  const currentWpm = calculateLiveWpm();
  const currentAccuracy = calculateAccuracy();

  // Primary stats package
  const liveStats: RaceStats = {
    wpm: currentWpm,
    accuracy: currentAccuracy,
    errors: errorsCount,
    timeElapsed: elapsedTime,
    typedChars: typedText.length,
    isCompleted,
  };

  // Stop all active timers
  const clearAllTimers = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (botIntervalRef.current) {
      clearInterval(botIntervalRef.current);
      botIntervalRef.current = null;
    }
  };

  // Clean up all active intervals when the component unmounts
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  // Reset current game states
  const resetGame = () => {
    clearAllTimers();
    setTypedText('');
    setIsActive(false);
    setIsCompleted(false);
    setIsPaused(false);
    setCountdown(null);
    setElapsedTime(0);
    setErrorsCount(0);
    setTotalKeysPressed(0);
    setBotProgress(0);
  };

  // Select a new random text and reset game
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    const chosenText = pickRandomText(category, lang, textDifficulty);
    setCurrentText(chosenText);
    resetGame();
  };

  // Select a new text difficulty level and reset game
  const handleSelectDifficulty = (difficulty: 'all' | 'easy' | 'medium' | 'hard') => {
    setTextDifficulty(difficulty);
    const chosenText = pickRandomText(selectedCategory, lang, difficulty);
    setCurrentText(chosenText);
    resetGame();
  };

  // Switch between Mongolian and English
  const handleLanguageChange = (newLang: 'mn' | 'en') => {
    setLang(newLang);
    localStorage.setItem(LOCAL_STORAGE_KEY_LANG, newLang);
    const defaultCat = newLang === 'mn' ? 'all_mn' : 'all_en';
    setSelectedCategory(defaultCat);
    const chosenText = pickRandomText(defaultCat, newLang, textDifficulty);
    setCurrentText(chosenText);
    resetGame();
  };

  // Rematch with the exact same paragraph
  const handleRematch = () => {
    resetGame();
    startRaceCountdown();
  };

  // Start a new race with a fresh text
  const handleNextRace = () => {
    const chosenText = pickRandomText(selectedCategory, lang, textDifficulty);
    setCurrentText(chosenText);
    resetGame();
    startRaceCountdown();
  };

  // Initialize the race countdown
  const startRaceCountdown = () => {
    resetGame();
    setCountdown(3);
    playKeypress(); // Initial pulse click

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          startActiveRace();
          return null;
        }
        playKeypress();
        return prev - 1;
      });
    }, 1000);
  };

  // Commences typing race and bot opponent
  const startActiveRace = () => {
    setIsActive(true);
    setElapsedTime(0);
    setErrorsCount(0);
    setTotalKeysPressed(0);
    setBotProgress(0);
    lastTimeRef.current = Date.now();

    // Keypress click at 0 start
    playKeypress();

    // 1. Core game ticking timer using millisecond-precision Date.now() to prevent drift
    timerIntervalRef.current = setInterval(() => {
      const duration = (Date.now() - lastTimeRef.current) / 1000;
      setElapsedTime(duration);
    }, 100);

    // 2. Realistic competitor bot logic
    if (botDifficulty !== 'none') {
      let botTargetWpm = 20;
      if (botDifficulty === 'medium') botTargetWpm = 35;
      if (botDifficulty === 'hard') botTargetWpm = 55;

      const botCharsPerSec = (botTargetWpm * 5) / 60;

      botIntervalRef.current = setInterval(() => {
        setBotProgress((prev) => {
          if (prev >= 100) {
            return 100;
          }
          // Fluctuating micro movements to simulate actual human bursts
          const randomFactor = 0.85 + Math.random() * 0.3; // fluctuating speed multiplier
          const charsTyped = (0.1 * botCharsPerSec) * randomFactor;
          const percentIncrease = (charsTyped / currentText.text.length) * 100;
          const nextProgress = prev + percentIncrease;

          return Math.min(nextProgress, 100);
        });
      }, 100);
    }
  };

  // Toggle Pause/Resume state
  const handleTogglePause = () => {
    if (!isActive || isCompleted || countdown !== null) return;

    if (isPaused) {
      // Resume
      setIsPaused(false);
      lastTimeRef.current = Date.now() - (elapsedTime * 1000);

      // 1. Restart timer interval using millisecond-precision Date.now() to prevent drift
      timerIntervalRef.current = setInterval(() => {
        const duration = (Date.now() - lastTimeRef.current) / 1000;
        setElapsedTime(duration);
      }, 100);

      // 2. Restart bot interval
      if (botDifficulty !== 'none') {
        let botTargetWpm = 20;
        if (botDifficulty === 'medium') botTargetWpm = 35;
        if (botDifficulty === 'hard') botTargetWpm = 55;

        const botCharsPerSec = (botTargetWpm * 5) / 60;

        botIntervalRef.current = setInterval(() => {
          setBotProgress((prev) => {
            if (prev >= 100) {
              return 100;
            }
            const randomFactor = 0.85 + Math.random() * 0.3;
            const charsTyped = (0.1 * botCharsPerSec) * randomFactor;
            const percentIncrease = (charsTyped / currentText.text.length) * 100;
            const nextProgress = prev + percentIncrease;

            return Math.min(nextProgress, 100);
          });
        }, 100);
      }
    } else {
      // Pause
      setIsPaused(true);
      clearAllTimers();
    }
  };

  // Monitor race completion triggers
  useEffect(() => {
    if (isActive && !isCompleted && typedText === currentText.text) {
      handleRaceFinish();
    }
  }, [typedText, currentText, isActive, isCompleted]);

  // Triggers when user successfully completes the entire text
  const handleRaceFinish = () => {
    // Stop all active timers immediately to freeze the clock
    clearAllTimers();
    
    // Capture the exact millisecond-precision duration at finish
    const finalDuration = Math.max(0.1, (Date.now() - lastTimeRef.current) / 1000);
    setElapsedTime(finalDuration);
    
    setIsCompleted(true);
    playVictory();

    // Calculate exact final WPM based on the precise duration
    const wordsCount = currentText.text.length / 5;
    const finalWpm = Math.round(wordsCount / (finalDuration / 60));
    const finalAccuracy = calculateAccuracy();

    // 1. Update personal best records
    let isNewBest = false;
    if (finalWpm > bestWpm) {
      setBestWpm(finalWpm);
      localStorage.setItem(LOCAL_STORAGE_KEY_BEST_WPM, finalWpm.toString());
      isNewBest = true;
    }

    // 2. Update total races counter
    const nextTotal = totalRaces + 1;
    setTotalRaces(nextTotal);
    localStorage.setItem(LOCAL_STORAGE_KEY_TOTAL_RACES, nextTotal.toString());

    // 3. Save to history list
    const today = new Date();
    const dateStr = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')} ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;
    
    const newHistoryItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      date: dateStr,
      wpm: finalWpm,
      accuracy: finalAccuracy,
      errors: errorsCount,
      duration: finalDuration,
      textSnippet: currentText.text.substring(0, 40),
      vehicleEmoji: getVehicleEmoji(selectedVehicle),
    };

    const updatedHistory = [newHistoryItem, ...history].slice(0, 10); // Keep last 10 entries
    setHistory(updatedHistory);
    localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));
  };

  // Keyboard character typing handler
  const handleType = (value: string) => {
    if (!isActive || isCompleted || countdown !== null || isPaused) return;

    // Reject long strings (copy pastes) to enforce fair typing
    if (value.length > typedText.length + 5) {
      return; 
    }

    setTotalKeysPressed((prev) => prev + 1);

    // Detect if we introduced a mistake
    if (value.length > typedText.length) {
      const charIndex = value.length - 1;
      const typedChar = value[charIndex];
      const correctChar = currentText.text[charIndex];

      if (typedChar !== correctChar) {
        setErrorsCount((prev) => prev + 1);
        playError();
      } else {
        playKeypress();
      }
    } else {
      // User pressed backspace
      playKeypress();
    }

    setTypedText(value);
  };

  // Clear race history
  const handleClearHistory = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_HISTORY);
    localStorage.removeItem(LOCAL_STORAGE_KEY_BEST_WPM);
    localStorage.removeItem(LOCAL_STORAGE_KEY_TOTAL_RACES);
    setHistory([]);
    setBestWpm(0);
    setTotalRaces(0);
  };

  // List of active racers on track
  const getActiveRacers = (): Racer[] => {
    const list: Racer[] = [
      {
        id: 'player',
        name: lang === 'mn' ? 'Та' : 'You',
        emoji: getVehicleEmoji(selectedVehicle),
        progress: playerProgress,
        isBot: false,
        color: 'text-neutral-900',
        wpm: currentWpm,
      },
    ];

    if (botDifficulty !== 'none') {
      let botTargetWpm = 20;
      let botName = lang === 'mn' ? 'Бот Эхлэгч' : 'Beginner Bot';
      let botEmoji = '🤖';
      if (botDifficulty === 'medium') {
        botTargetWpm = 35;
        botName = lang === 'mn' ? 'Бот Дундаж' : 'Regular Bot';
        botEmoji = '🤖';
      } else if (botDifficulty === 'hard') {
        botTargetWpm = 55;
        botName = lang === 'mn' ? 'Бот Мэргэжилтэн' : 'Pro Bot';
        botEmoji = '🤖⚡';
      }

      // Calculate live bot WPM fluctuation
      let liveBotWpm = botTargetWpm;
      if (isActive && !isCompleted && countdown === null && elapsedTime > 0) {
        const speedWave = Math.sin(elapsedTime * 2.5) * (botTargetWpm * 0.12);
        liveBotWpm = Math.max(10, Math.round(botTargetWpm + speedWave));
      } else if (botProgress >= 100) {
        liveBotWpm = botTargetWpm;
      } else {
        liveBotWpm = 0;
      }

      list.push({
        id: 'bot',
        name: botName,
        emoji: botEmoji,
        progress: botProgress,
        isBot: true,
        color: 'text-neutral-500',
        wpm: liveBotWpm,
      });
    }

    return list;
  };

  // Listen to keyboard shortcut (Esc) to quickly restart/setup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentText, selectedCategory]);

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans antialiased pb-12" id="app-root-container">
      {/* Top Header Panel */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/95 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-indigo-600/10">
              🏎️
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-mono font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
                Typeracer <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded-full uppercase tracking-wider">{lang === 'mn' ? 'Монгол' : 'English'}</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider mt-0.5">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Portfolio Navigation Tabs */}
          <nav className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200" id="portfolio-nav-tabs">
            <button
              onClick={() => resetGame()}
              className="text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-lg bg-white text-indigo-600 shadow-3xs"
            >
              {lang === 'mn' ? '🎮 Тоглох' : '🎮 Play'}
            </button>
            <a
              href="https://bold-erdene.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 transition-all flex items-center gap-1"
              id="typeracer-portfolio-tab"
            >
              ⌨️ Typeracer
            </a>
          </nav>
          
          <div className="flex items-center gap-2.5">
            {/* Language Toggle buttons */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200" id="lang-toggle-container">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1.5 rounded-lg transition-all ${
                  lang === 'en'
                    ? 'bg-white text-indigo-600 shadow-3xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                id="lang-btn-en"
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('mn')}
                className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1.5 rounded-lg transition-all ${
                  lang === 'mn'
                    ? 'bg-white text-indigo-600 shadow-3xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                id="lang-btn-mn"
              >
                MN
              </button>
            </div>

            {/* Quick action button */}
            {isActive || isCompleted ? (
              <button
                onClick={resetGame}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 active:scale-95 transition-all"
                id="reset-to-setup-btn"
              >
                <RotateCcw className="w-3.5 h-3.5" /> {t.backToSetup}
              </button>
            ) : (
              <button
                onClick={startRaceCountdown}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl shadow-xs active:scale-95 transition-all"
                id="start-race-top-btn"
              >
                <Play className="w-3.5 h-3.5 fill-white text-white" /> {t.raceBtn}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 flex flex-col gap-6">
        
        {/* Game Race Track Component */}
        <Track
          lang={lang}
          racers={getActiveRacers()}
          playerVehicle={selectedVehicle}
          countdown={countdown}
          isActive={isActive}
          isCompleted={isCompleted}
        />

        {/* Live / Final Stats Board */}
        <Stats lang={lang} stats={liveStats} bestWpm={bestWpm} />

        {/* Dynamic Area Container */}
        <AnimatePresence mode="wait">
          {isActive || isCompleted ? (
            <motion.div
              key="typing-pane"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-5"
            >
              <TypingArea
                lang={lang}
                text={currentText.text}
                typedText={typedText}
                onType={handleType}
                isActive={isActive}
                isCompleted={isCompleted}
                countdown={countdown}
                onStart={startRaceCountdown}
                isPaused={isPaused}
                onTogglePause={handleTogglePause}
              />

              {/* Race Action Controls */}
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-xs"
                >
                  <div className="text-center sm:text-left">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                      {lang === 'mn' ? 'Уралдаан амжилттай дууслаа! 🎉' : 'Race Finished Successfully! 🎉'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {lang === 'mn' ? 'Та дараах товчлууруудаас сонгон шинээр уралдаж хурдаа улам ахиулаарай.' : 'Choose an action below to practice again and boost your typing speed.'}
                    </p>
                  </div>
                  <div className="flex gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={handleRematch}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-4 py-3 rounded-xl transition-all active:scale-95"
                      id="rematch-btn"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> {t.rematch}
                    </button>
                    <button
                      onClick={handleNextRace}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all active:scale-95 shadow-sm shadow-indigo-600/10"
                      id="next-race-btn"
                    >
                      <Play className="w-3.5 h-3.5 fill-white text-white" /> {t.nextRace}
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="setup-pane"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* Launcher/Intro banner */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6" id="welcome-banner">
                <div className="relative z-10 max-w-lg">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/15 px-3 py-1 rounded-full border border-indigo-400/20">
                    {t.bannerTag}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight mt-3">
                    {t.bannerTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2 font-medium">
                    {t.bannerDesc}
                  </p>
                </div>
                <button
                  onClick={startRaceCountdown}
                  className="relative z-10 w-full md:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95"
                  id="primary-start-race-btn"
                >
                  <Play className="w-4 h-4 fill-slate-950 text-slate-950" /> {t.bannerBtn}
                </button>
                {/* Background decoration lines representing motion */}
                <div className="absolute top-0 bottom-0 right-0 w-1/3 bg-gradient-to-r from-transparent to-white/5 skew-x-12 select-none pointer-events-none" />
              </div>

              {/* Settings and setup panel */}
              <SetupCard
                lang={lang}
                selectedVehicle={selectedVehicle}
                onSelectVehicle={setSelectedVehicle}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                textDifficulty={textDifficulty}
                onSelectTextDifficulty={handleSelectDifficulty}
                botDifficulty={botDifficulty}
                onSelectBotDifficulty={setBotDifficulty}
                bestWpm={bestWpm}
                totalRaces={totalRaces}
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* History Log Section */}
        <HistoryList lang={lang} history={history} onClearHistory={handleClearHistory} />

      </main>

      {/* Footer Attribution - Simple and Humble */}
      <footer className="max-w-4xl mx-auto px-4 border-t border-slate-200 mt-8 pt-6 text-center text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
        <p>{lang === 'mn' ? '© 2026 Typeracer • Монгол хэлээр бичих ур чадварыг хөгжүүлэгч тоглоом' : '© 2026 Typeracer • Speed Typing Practice App'}</p>
      </footer>
    </div>
  );
}
