import React from 'react';
import { RaceStats } from '../types';
import { translations } from '../data/translations';
import { Zap, Target, AlertCircle, Clock, Award, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsProps {
  lang: 'mn' | 'en';
  stats: RaceStats;
  bestWpm: number;
}

export const Stats: React.FC<StatsProps> = ({ lang, stats, bestWpm }) => {
  const t = translations[lang];

  const getSpeedRating = (wpm: number) => {
    if (wpm < 20) return { title: t.ratingBeginner, color: 'text-slate-500 bg-slate-100', desc: lang === 'mn' ? 'Уйгагүй сургуулилаарай!' : 'Keep practicing and never give up!' };
    if (wpm < 40) return { title: t.ratingIntermediate, color: 'text-indigo-600 bg-indigo-50', desc: lang === 'mn' ? 'Маш сайн, улам хурдлаарай!' : 'Great job! Keep pushing your limits!' };
    if (wpm < 60) return { title: t.ratingExpert, color: 'text-emerald-600 bg-emerald-50', desc: lang === 'mn' ? 'Маш хурдан бөгөөд чадварлаг шивэгч!' : 'Super fast! You are a highly skilled typist!' };
    if (wpm < 80) return { title: t.ratingMaster, color: 'text-indigo-700 bg-indigo-50 border border-indigo-100', desc: lang === 'mn' ? 'Гайхалтай! Та бараг л мэргэжлийн түвшнийх.' : 'Fantastic! You are nearly a professional typist.' };
    return { title: t.ratingLegend, color: 'text-rose-600 bg-rose-50 border border-rose-200', desc: lang === 'mn' ? 'Хорвоогийн хамгийн хурдан шивэгч!' : 'Legendary speed! The absolute best!' };
  };

  const rating = getSpeedRating(stats.wpm);

  return (
    <div className="flex flex-col gap-4 w-full" id="stats-dashboard">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* WPM (Speed) Card */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">{t.accuracy === 'Accuracy' ? 'Speed (WPM)' : 'Хурд (WPM)'}</span>
            <Zap className="w-4 h-4 text-indigo-600 fill-indigo-50" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-slate-800">
                {stats.wpm}
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider pl-1">{t.wpmUnit}</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{t.wordsPerMin}</p>
          </div>
        </motion.div>

        {/* Accuracy Card */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">{t.accuracy}</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-slate-800">
                {stats.accuracy}
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider pl-1">%</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{t.correctRatio}</p>
          </div>
        </motion.div>

        {/* Errors Card */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">{t.errors}</span>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-red-500">
                {stats.errors}
              </span>
              <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider pl-1">{t.errorsUnit}</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{t.errorLetters}</p>
          </div>
        </motion.div>

        {/* Time Elapsed Card */}
        <motion.div
          whileHover={{ y: -2 }}
          className={`bg-white rounded-2xl border p-4.5 shadow-sm flex flex-col justify-between transition-all duration-300 ${
            stats.isCompleted ? 'border-emerald-300 bg-emerald-50/10 shadow-xs shadow-emerald-500/5' : stats.isPaused ? 'border-amber-300 bg-amber-50/10 shadow-xs shadow-amber-500/5' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">{t.duration}</span>
            {stats.isCompleted ? (
              <span className="text-[9px] font-black font-mono text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                ● {lang === 'mn' ? 'Зогссон' : 'Stopped'}
              </span>
            ) : stats.isPaused ? (
              <span className="text-[9px] font-black font-mono text-amber-600 bg-amber-100/60 px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 animate-pulse">
                ⏸️ {lang === 'mn' ? 'Түр зогссон' : 'Paused'}
              </span>
            ) : (
              <Clock className={`w-4 h-4 text-indigo-500 ${stats.timeElapsed > 0 ? 'animate-pulse' : ''}`} />
            )}
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl sm:text-4xl font-mono font-bold transition-colors ${stats.isCompleted ? 'text-emerald-600' : stats.isPaused ? 'text-amber-600' : 'text-slate-800'}`}>
                {stats.timeElapsed.toFixed(1)}
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider pl-1">{t.durationUnit}</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
              {stats.isCompleted ? (lang === 'mn' ? 'Уралдаан дууссан' : 'Race ended') : stats.isPaused ? (lang === 'mn' ? 'Хугацааг зогсоосон' : 'Timer paused') : t.timeElapsed}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Completion Extra Info Card */}
      {stats.isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-xs flex-shrink-0 flex items-center justify-center">
              <Award className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider ${rating.color}`}>
                  {rating.title}
                </span>
                {bestWpm > 0 && stats.wpm >= bestWpm && (
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                    <Star className="w-3 h-3 fill-amber-600 text-amber-600 animate-spin-slow" /> {t.newRecord}
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-slate-800 mt-1.5">
                {t.completedTitle}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {rating.desc}
              </p>
            </div>
          </div>
          <div className="flex flex-row sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">{t.bestSpeed}</span>
            <span className="text-xl font-mono font-bold text-slate-700 sm:mt-0.5">
              {Math.max(bestWpm, stats.wpm)} WPM
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
