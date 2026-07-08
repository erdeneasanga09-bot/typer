import React from 'react';
import { HistoryItem } from '../types';
import { translations } from '../data/translations';
import { Trash2, History as HistoryIcon, Calendar, Zap, Target } from 'lucide-react';

interface HistoryListProps {
  lang: 'mn' | 'en';
  history: HistoryItem[];
  onClearHistory: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ lang, history, onClearHistory }) => {
  const t = translations[lang];

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center" id="empty-history">
        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3 border border-slate-100">
          <HistoryIcon className="w-5 h-5" />
        </div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">{t.historyEmptyTitle}</h4>
        <p className="text-xs text-slate-400 mt-1.5 max-w-xs mx-auto">
          {t.historyEmptyDesc}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col gap-4" id="history-section">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h3 className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold flex items-center gap-1.5">
          <HistoryIcon className="w-4 h-4 text-indigo-600" /> {t.historyTitle} ({history.length})
        </h3>
        <button
          onClick={onClearHistory}
          className="text-[9px] font-bold uppercase tracking-wider text-red-500 bg-red-50/50 hover:bg-red-50 hover:text-red-600 transition-all flex items-center gap-1 px-3 py-1.5 rounded-full border border-red-100 active:scale-95"
          id="clear-history-btn"
        >
          <Trash2 className="w-3 h-3" /> {t.clearHistory}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-mono uppercase text-slate-400 tracking-widest">
              <th className="py-3 font-bold">{t.colDate}</th>
              <th className="py-3 font-bold">{t.colVehicle}</th>
              <th className="py-3 font-bold">{t.colSpeed}</th>
              <th className="py-3 font-bold">{t.colAccuracy}</th>
              <th className="py-3 font-bold">{t.colErrors}</th>
              <th className="py-3 font-bold">{t.colText}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-600 font-medium">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-all duration-150">
                <td className="py-3 font-mono text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {item.date}
                </td>
                <td className="py-3 text-lg filter drop-shadow-xs select-none pl-1">
                  {item.vehicleEmoji}
                </td>
                <td className="py-3">
                  <span className="flex items-center gap-1 font-mono font-bold text-slate-800 text-xs bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md w-fit shadow-3xs">
                    <Zap className="w-3 h-3 text-indigo-600 fill-indigo-50" />
                    {item.wpm}
                  </span>
                </td>
                <td className="py-3">
                  <span className="flex items-center gap-1 font-mono text-emerald-600">
                    <Target className="w-3.5 h-3.5 text-emerald-500" />
                    {item.accuracy}%
                  </span>
                </td>
                <td className="py-3">
                  <span className="font-mono text-red-500 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                    {item.errors}
                  </span>
                </td>
                <td className="py-3 max-w-[200px] truncate text-slate-400 italic font-normal">
                  {item.textSnippet}...
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
