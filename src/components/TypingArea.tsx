import React, { useRef, useEffect } from 'react';
import { Play, AlertTriangle, ShieldCheck } from 'lucide-react';
import { translations } from '../data/translations';

interface TypingAreaProps {
  lang: 'mn' | 'en';
  text: string;
  typedText: string;
  onType: (value: string) => void;
  isActive: boolean;
  isCompleted: boolean;
  countdown: number | null;
  onStart: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  lang,
  text,
  typedText,
  onType,
  isActive,
  isCompleted,
  countdown,
  onStart,
  isPaused,
  onTogglePause,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang];

  // Focus input automatically when the game becomes active and not paused
  useEffect(() => {
    if (isActive && !isCompleted && countdown === null && !isPaused) {
      inputRef.current?.focus();
    }
  }, [isActive, isCompleted, countdown, isPaused]);

  // Handle clicking on the text container to focus the input field
  const handleContainerClick = () => {
    if (isActive && !isCompleted && countdown === null && !isPaused) {
      inputRef.current?.focus();
    }
  };

  // Check if there is currently an error in the typed text
  const hasError = typedText.split('').some((char, idx) => char !== text[idx]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col gap-6">
      {/* Dynamic Status bar above text */}
      <div className="flex justify-between items-center text-xs font-mono border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-1.5 text-slate-400 uppercase tracking-widest font-bold text-[10px]">
          <span>{t.textToType}</span>
        </div>
        <div className="flex items-center gap-2">
          {isActive && !isCompleted && countdown === null && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePause();
              }}
              className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-100 text-amber-700 active:scale-95 transition-all mr-2"
              id="pause-toggle-btn"
            >
              {isPaused ? '▶️ ' + (lang === 'mn' ? 'Үргэлжлүүлэх' : 'Resume') : '⏸️ ' + (lang === 'mn' ? 'Түр зогсоох' : 'Pause')}
            </button>
          )}
          {hasError ? (
            <span className="flex items-center gap-1.5 text-red-500 font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-[10px] uppercase tracking-wider animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" /> {t.hasError}
            </span>
          ) : typedText.length > 0 ? (
            <span className="flex items-center gap-1.5 text-emerald-600 font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[10px] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> {t.noError}
            </span>
          ) : (
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">{t.readyToStart}</span>
          )}
        </div>
      </div>

      {/* Styled text box displaying paragraphs with colored characters */}
      <div
        onClick={handleContainerClick}
        className={`relative text-base sm:text-lg leading-relaxed text-slate-600 tracking-wide font-sans bg-slate-50/50 hover:bg-slate-50 rounded-xl p-5 sm:p-6 border border-slate-100 cursor-text select-none transition-all duration-300 min-h-[110px] ${
          isActive && !isCompleted && countdown === null && !isPaused ? 'ring-2 ring-indigo-100 border-indigo-200 bg-white' : ''
        }`}
        id="paragraph-box"
      >
        {text.split('').map((char, index) => {
          let className = 'transition-colors duration-150 ';
          if (index < typedText.length) {
            className += typedText[index] === char ? 'char-correct' : 'char-incorrect';
          } else if (index === typedText.length && isActive && countdown === null && !isPaused) {
            className += 'char-current';
          }

          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}

        {/* Visual prompt if game hasn't started yet */}
        {!isActive && !isCompleted && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-xs rounded-xl transition-all">
            <button
              onClick={onStart}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-6 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest"
              id="start-button-overlay"
            >
              <Play className="w-4 h-4 fill-white" /> {t.startBtnOverlay}
            </button>
          </div>
        )}

        {/* Visual prompt if game is paused */}
        {isActive && !isCompleted && isPaused && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xs rounded-xl transition-all z-20">
            <span className="text-sm font-black uppercase tracking-wider text-amber-600 mb-3.5 bg-amber-50 px-4 py-1.5 rounded-xl border border-amber-200 animate-pulse">
              ⏸️ {lang === 'mn' ? 'Түр зогссон' : 'Paused'}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePause();
              }}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-6 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest"
              id="resume-button-overlay"
            >
              <Play className="w-4 h-4 fill-white" /> {lang === 'mn' ? 'Үргэлжлүүлэх' : 'Resume'}
            </button>
          </div>
        )}
      </div>

      {/* Typing Input controls */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={(e) => onType(e.target.value)}
          disabled={!isActive || countdown !== null || isCompleted || isPaused}
          placeholder={
            !isActive
              ? (lang === 'mn' ? 'Эхлүүлэх товчийг дарж шивж эхэлнэ үү...' : 'Click the Start button or press Enter to begin...')
              : countdown !== null
              ? (lang === 'mn' ? 'Бэлэн, уралдаан эхлэхийг хүлээнэ үү...' : 'Get ready! Waiting for the countdown...')
              : isPaused
              ? (lang === 'mn' ? 'Уралдаан түр зогссон байна...' : 'Race is paused...')
              : (lang === 'mn' ? 'Энд зөв шивж эхэлнэ үү...' : 'Start typing the text here...')
          }
          className={`w-full text-base sm:text-lg font-sans px-5 py-4 rounded-xl border-2 outline-none transition-all duration-200 ${
            hasError
              ? 'border-red-300 bg-red-50/10 focus:border-red-500 focus:ring-4 focus:ring-red-100/50'
              : typedText.length > 0
              ? 'border-emerald-300 bg-emerald-50/10 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100/50'
              : 'border-slate-200 bg-slate-50/50 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100/50'
          } disabled:bg-slate-100/50 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed`}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          id="typing-input-field"
        />

        {/* Live typed characters progress indicator */}
        {isActive && countdown === null && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 rounded-b-xl overflow-hidden">
            <div
              className={`h-full transition-all duration-150 ${isPaused ? 'bg-amber-400' : hasError ? 'bg-red-400' : 'bg-emerald-500'}`}
              style={{ width: `${(typedText.length / text.length) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Helpful keyboard shortcut hints */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 gap-1 sm:gap-0">
        <span>{lang === 'mn' ? 'Алдаа гаргасан тохиолдолд буцааж арилгаад цааш үргэлжлүүлнэ.' : 'If you make a mistake, delete back and correct it to proceed.'}</span>
        <span>{lang === 'mn' ? 'Esc дарж дахин эхлүүлэх боломжтой' : 'Press ESC to quick restart / return to setup'}</span>
      </div>
    </div>
  );
};
