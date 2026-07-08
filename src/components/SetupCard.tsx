import React from 'react';
import { VehicleType } from '../types';
import { TEXT_CATEGORIES } from '../data/texts';
import { translations } from '../data/translations';
import { Volume2, VolumeX, Trophy } from 'lucide-react';

interface SetupCardProps {
  lang: 'mn' | 'en';
  selectedVehicle: VehicleType;
  onSelectVehicle: (vehicle: VehicleType) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  textDifficulty: 'all' | 'easy' | 'medium' | 'hard';
  onSelectTextDifficulty: (diff: 'all' | 'easy' | 'medium' | 'hard') => void;
  botDifficulty: 'none' | 'easy' | 'medium' | 'hard';
  onSelectBotDifficulty: (diff: 'none' | 'easy' | 'medium' | 'hard') => void;
  bestWpm: number;
  totalRaces: number;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const SetupCard: React.FC<SetupCardProps> = ({
  lang,
  selectedVehicle,
  onSelectVehicle,
  selectedCategory,
  onSelectCategory,
  textDifficulty,
  onSelectTextDifficulty,
  botDifficulty,
  onSelectBotDifficulty,
  bestWpm,
  totalRaces,
  isMuted,
  onToggleMute,
}) => {
  const t = translations[lang];

  const vehicles: { id: VehicleType; name: string; emoji: string; desc: string }[] = lang === 'mn' ? [
    { id: 'car', name: 'Спортын машин', emoji: '🚗', desc: 'Уралдааны зам' },
    { id: 'rocket', name: 'Сансрын пуужин', emoji: '🚀', desc: 'Орбит тойрог зам' },
    { id: 'horse', name: 'Монгол морь', emoji: '🐎', desc: 'Ногоон тал' },
  ] : [
    { id: 'car', name: 'Sports Car', emoji: '🚗', desc: 'Racing track' },
    { id: 'rocket', name: 'Space Rocket', emoji: '🚀', desc: 'Orbiting track' },
    { id: 'horse', name: 'Mongol Horse', emoji: '🐎', desc: 'Green steppe' },
  ];

  const difficulties = lang === 'mn' ? [
    { id: 'none', name: 'Ганцаараа', desc: 'Өөрийгөө сорих', speed: 0 },
    { id: 'easy', name: 'Эхлэгч бот', desc: 'Удаан хурдтай', speed: 20 },
    { id: 'medium', name: 'Дундаж бот', desc: 'Ердийн хурдтай', speed: 35 },
    { id: 'hard', name: 'Мэргэжлийн бот', desc: 'Маш хурдан', speed: 55 },
  ] as const : [
    { id: 'none', name: 'Solo Run', desc: 'Challenge yourself', speed: 0 },
    { id: 'easy', name: 'Beginner Bot', desc: 'Slow speed', speed: 20 },
    { id: 'medium', name: 'Regular Bot', desc: 'Normal speed', speed: 35 },
    { id: 'hard', name: 'Pro Bot', desc: 'Very fast', speed: 55 },
  ] as const;

  const activeCategories = TEXT_CATEGORIES.filter(cat => cat.lang === lang);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="setup-dashboard">
      {/* Configuration Card (2 columns wide on desktop) */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col gap-6">
        {/* Vehicles Selection */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">
              {t.setupVehicle}
            </h3>
            <button
              onClick={onToggleMute}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition-all flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold"
              id="mute-toggle"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-red-500" />
                  <span>{t.muteSound}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t.soundOn}</span>
                </>
              )}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {vehicles.map((v) => {
              const isSelected = selectedVehicle === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => onSelectVehicle(v.id)}
                  className={`flex items-center gap-3.5 p-4 rounded-xl border-2 text-left transition-all duration-200 transform active:scale-95 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                      : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                  }`}
                  id={`vehicle-btn-${v.id}`}
                >
                  <span className="text-3xl filter drop-shadow-xs">{v.emoji}</span>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                      {v.name}
                    </p>
                    <p className={`text-[10px] mt-0.5 font-mono ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {v.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Selection */}
        <div>
          <h3 className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 mb-3">
            {t.setupCategory}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {activeCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                  id={`category-btn-${cat.id}`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Difficulty Selection */}
        <div>
          <h3 className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 mb-3">
            {t.setupDifficulty}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {([
              { id: 'all', name: t.diffAll },
              { id: 'easy', name: t.diffEasy },
              { id: 'medium', name: t.diffMedium },
              { id: 'hard', name: t.diffHard },
            ] as const).map((diff) => {
              const isSelected = textDifficulty === diff.id;
              return (
                <button
                  key={diff.id}
                  onClick={() => onSelectTextDifficulty(diff.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                  id={`text-diff-btn-${diff.id}`}
                >
                  <span>{diff.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bot Opponents Selection */}
        <div>
          <h3 className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 mb-3">
            {t.setupBot}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {difficulties.map((diff) => {
              const isSelected = botDifficulty === diff.id;
              return (
                <button
                  key={diff.id}
                  onClick={() => onSelectBotDifficulty(diff.id)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border-2 text-center transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                  id={`bot-btn-${diff.id}`}
                >
                  <span className={`text-[11px] font-bold uppercase tracking-wide ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                    {diff.name}
                  </span>
                  <span className={`text-[9px] font-mono mt-1 font-bold ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {diff.id === 'none' ? diff.desc : `${diff.speed} WPM`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* High Scores & Stats Sidebar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between gap-5">
        <div>
          <h3 className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
            <Trophy className="w-3.5 h-3.5 text-indigo-600" /> {lang === 'mn' ? 'Миний Амжилтууд' : 'My Achievements'}
          </h3>
          <div className="flex flex-col gap-3">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">{t.bestSpeed}</p>
                <p className="text-xl font-mono font-bold text-slate-700 mt-0.5">
                  {bestWpm > 0 ? `${bestWpm} WPM` : (lang === 'mn' ? 'Байхгүй' : 'None')}
                </p>
              </div>
              <div className="text-2xl text-amber-500 animate-bounce">🏆</div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">{t.totalRaces}</p>
                <p className="text-xl font-mono font-bold text-slate-700 mt-0.5">
                  {totalRaces} {t.racesCount}
                </p>
              </div>
              <div className="text-2xl text-indigo-600">🏁</div>
            </div>
          </div>
        </div>

        {/* Encouraging advice/tips for typing speed */}
        <div className="bg-slate-50/50 rounded-xl p-4 border border-dashed border-slate-200">
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            {t.tipsTitle}
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed mt-1.5">
            {t.tipsText}
          </p>
        </div>
      </div>
    </div>
  );
};
