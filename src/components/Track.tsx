import React from 'react';
import { motion } from 'motion/react';
import { Racer, VehicleType } from '../types';
import { translations } from '../data/translations';
import { Trophy, Star, Sparkles } from 'lucide-react';

interface TrackProps {
  lang: 'mn' | 'en';
  racers: Racer[];
  playerVehicle: VehicleType;
  countdown: number | null;
  isActive: boolean;
  isCompleted: boolean;
}

export const Track: React.FC<TrackProps> = ({
  lang,
  racers,
  playerVehicle,
  countdown,
  isActive,
  isCompleted,
}) => {
  const t = translations[lang];

  // Determine track theme styling matching Geometric Balance
  const getTrackTheme = () => {
    switch (playerVehicle) {
      case 'rocket':
        return {
          bg: 'bg-white border-slate-200',
          lane: 'border border-slate-100 bg-slate-50/50',
          laneLine: 'border-dashed border-indigo-200/50',
          finish: 'text-indigo-400 font-bold italic tracking-tighter text-xl uppercase',
          finishIcon: <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />,
          decor: lang === 'mn' ? '🚀 САНСРЫН УРАЛДААНЫ ТОЙРОГ' : '🚀 COSMIC SPEEDWAY ORBIT',
        };
      case 'horse':
        return {
          bg: 'bg-white border-slate-200',
          lane: 'border border-slate-100 bg-emerald-50/20',
          laneLine: 'border-dashed border-emerald-200/50',
          finish: 'text-emerald-600 font-bold italic tracking-tighter text-xl uppercase',
          finishIcon: <Trophy className="w-4 h-4 text-emerald-500" />,
          decor: lang === 'mn' ? '🐎 ХҮЛЭГТНИЙ ТАЛЫН УРАЛДААН' : '🐎 STEPPE RACING DERBY',
        };
      case 'car':
      default:
        return {
          bg: 'bg-white border-slate-200',
          lane: 'border border-slate-100 bg-slate-50',
          laneLine: 'border-dashed border-slate-200',
          finish: 'text-slate-400 font-bold italic tracking-tighter text-xl uppercase',
          finishIcon: <Star className="w-4 h-4 text-slate-400" />,
          decor: lang === 'mn' ? '🏁 ГЕОМЕТРИК ХУРДНЫ ЗАМ' : '🏁 GEOMETRIC GRAND PRIX',
        };
    }
  };

  const theme = getTrackTheme();

  return (
    <div className={`relative rounded-2xl border p-5 sm:p-6 shadow-sm transition-all duration-300 ${theme.bg}`} id="racetrack-container">
      {/* Decorative track header */}
      <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2.5">
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          {theme.decor}
        </span>
        <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          {t.trackDistance}
        </div>
      </div>

      <div className="relative flex flex-col gap-4 min-h-[140px]">
        {/* Subtle grid lines background to enhance geometric look */}
        <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none opacity-20">
          <div className="border-b border-dashed border-slate-300 w-full" />
          <div className="border-b border-dashed border-slate-300 w-full" />
        </div>

        {racers.map((racer) => {
          const getRacerAnimationProps = () => {
            if (!isActive || racer.progress >= 100 || isCompleted) return {};
            switch (racer.emoji) {
              case '🐎':
                return {
                  animate: { y: [0, -5, 0] },
                  transition: { repeat: Infinity, duration: 0.35, ease: 'easeInOut' },
                };
              case '🚀':
                return {
                  animate: { y: [-0.8, 0.8, -0.8], x: [0, 0.5, 0] },
                  transition: { repeat: Infinity, duration: 0.15 },
                };
              case '🚗':
              default:
                return {
                  animate: { y: [-0.5, 0.5, -0.5] },
                  transition: { repeat: Infinity, duration: 0.1 },
                };
            }
          };

          const isPlayer = !racer.isBot;

          return (
            <div
              key={racer.id}
              className={`relative h-16 rounded-xl flex items-center px-4 overflow-hidden transition-colors ${theme.lane}`}
              id={`lane-${racer.id}`}
            >
              {/* Lane dashed centerline */}
              <div className={`absolute left-4 right-20 top-1/2 -translate-y-1/2 border-t h-0 ${theme.laneLine}`} />

              {/* Lane labels (Opponent vs Player) */}
              <div className="absolute left-3 top-1 select-none z-10 flex items-center gap-1">
                {isPlayer ? (
                  <span className="bg-indigo-600 text-white text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider shadow-xs">
                    {t.playerLabel}
                  </span>
                ) : (
                  <span className="bg-slate-200 text-slate-600 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                    {racer.name} <span className="text-[8px] font-normal text-slate-400">({t.botLabel})</span>
                  </span>
                )}
                {racer.progress >= 100 && (
                  <span className="text-[9px] px-1.5 py-0.5 bg-yellow-400 text-yellow-950 font-black rounded-full uppercase tracking-wider">
                    {t.finishLabel}
                  </span>
                )}
              </div>

              {/* Lane main race course zone */}
              <div className="absolute left-6 right-24 top-0 bottom-0 flex items-center">
                {/* Racer vehicle container */}
                <motion.div
                  className="absolute"
                  style={{ left: `${racer.progress}%` }}
                  animate={{ x: '-50%' }}
                  transition={{ type: 'spring', stiffness: 90, damping: 16 }}
                >
                  <motion.div 
                    className="relative flex items-center justify-center p-1"
                    {...getRacerAnimationProps()}
                  >
                    {/* Shadow / Speed lines effect behind the vehicle */}
                    {isActive && racer.progress < 100 && (
                      <span className="absolute right-full mr-1.5 flex gap-0.5 opacity-50">
                        <span className="w-2 h-1 bg-gradient-to-l from-indigo-500 to-transparent rounded-full animate-pulse" />
                      </span>
                    )}
                    
                    {/* Large Vehicle Emoji */}
                    <span className="text-4xl filter drop-shadow-md transition-transform duration-300 transform hover:scale-110 block cursor-default select-none">
                      {racer.emoji}
                    </span>

                    {/* Progress Percentage / WPM tag bubble */}
                    {isActive && (
                      <span className="absolute -top-4.5 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-[8px] font-mono font-bold text-white px-1.5 py-0.5 rounded-md shadow-sm whitespace-nowrap">
                        {racer.wpm !== undefined ? `${racer.wpm} WPM` : `${Math.round(racer.progress)}%`}
                      </span>
                    )}
                  </motion.div>
                </motion.div>
              </div>

              {/* Finish gate zone */}
              <div className="absolute right-4 top-0 bottom-0 flex items-center gap-1.5 select-none">
                {theme.finishIcon}
                <span className={theme.finish}>{t.finishLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Track Countdown Screen Overlap */}
      {countdown !== null && (
        <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center backdrop-blur-xs z-30 transition-all duration-300 rounded-2xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.1, 1], opacity: 1 }}
            key={countdown}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-indigo-200 to-white filter drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)] tracking-tighter">
              {countdown === 0 ? t.countdownStart : countdown}
            </span>
            <p className="text-indigo-300/60 font-mono text-xs tracking-widest uppercase mt-3 font-bold text-center px-4">
              {t.countdownDesc}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};
