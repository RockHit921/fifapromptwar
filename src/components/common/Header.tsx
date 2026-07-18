import React from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import type { StadiumId } from '../../types';
import { Key, ShieldAlert, Users, Radio, Sparkles, Volume2 } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    userMode,
    setUserMode,
    activeStadiumId,
    setActiveStadiumId,
    stadium,
    setApiKeyModalOpen,
    apiKey,
    selectedLanguage,
    setSelectedLanguage,
  } = useStadiumState();

  const { announceForScreenReader } = useAccessibility();

  const handleModeChange = (mode: 'fan' | 'ops') => {
    setUserMode(mode);
    announceForScreenReader(`Switched view to ${mode === 'fan' ? 'Fan Experience' : 'Operations Command Center'}`);
  };

  const handleStadiumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value as StadiumId;
    setActiveStadiumId(id);
    announceForScreenReader(`Selected venue changed to ${id}`);
  };

  return (
    <header className="glass-panel border-b border-white/10 sticky top-0 z-40 px-4 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Match Status */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-blue-600 flex items-center justify-center shadow-lg glow-gold">
              <Sparkles className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-300 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                ApexArena 2026
              </h1>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                FIFA World Cup OS
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {stadium.matchToday.stage}: <span className="text-slate-200 font-semibold">{stadium.matchToday.homeTeam} vs {stadium.matchToday.awayTeam}</span> ({stadium.matchToday.kickoff})
            </p>
          </div>
        </div>

        {/* Stadium Selector & Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Venue Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-white/10 rounded-lg px-2.5 py-1.5">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <select
              value={activeStadiumId}
              onChange={handleStadiumChange}
              className="bg-transparent text-xs sm:text-sm font-medium text-slate-100 focus:outline-none cursor-pointer"
              aria-label="Select FIFA Stadium Venue"
            >
              <option value="metlife" className="bg-slate-900 text-white">MetLife Stadium (NY/NJ)</option>
              <option value="azteca" className="bg-slate-900 text-white">Estadio Azteca (Mexico City)</option>
              <option value="bcplace" className="bg-slate-900 text-white">BC Place (Vancouver)</option>
              <option value="arrowhead" className="bg-slate-900 text-white">Arrowhead Stadium (KC)</option>
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-slate-900/80 border border-white/10 rounded-lg px-2 py-1.5">
            <Volume2 className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
              aria-label="Select Assistant Language"
            >
              <option value="English" className="bg-slate-900">🇺🇸 English</option>
              <option value="Spanish" className="bg-slate-900">🇲🇽 Español</option>
              <option value="French" className="bg-slate-900">🇫🇷 Français</option>
              <option value="Portuguese" className="bg-slate-900">🇧🇷 Português</option>
              <option value="German" className="bg-slate-900">🇩🇪 Deutsch</option>
              <option value="Arabic" className="bg-slate-900">🇸🇦 العربية</option>
              <option value="Japanese" className="bg-slate-900">🇯🇵 日本語</option>
              <option value="Korean" className="bg-slate-900">🇰🇷 한국어</option>
              <option value="Hindi" className="bg-slate-900">🇮🇳 हिन्दी</option>
              <option value="Chinese" className="bg-slate-900">🇨🇳 中文</option>
            </select>
          </div>

          {/* Gemini Key Config Button */}
          <button
            onClick={() => setApiKeyModalOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              apiKey
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
                : 'bg-amber-950/60 border-amber-500/40 text-amber-300 hover:bg-amber-900/60'
            }`}
            title="Configure Google Gemini API Key"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{apiKey ? 'Gemini Active' : 'Set Gemini Key'}</span>
          </button>

          {/* Dual Persona Switcher */}
          <div className="flex p-1 bg-slate-900/90 border border-white/10 rounded-xl">
            <button
              onClick={() => handleModeChange('fan')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                userMode === 'fan'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Fan Portal</span>
            </button>
            <button
              onClick={() => handleModeChange('ops')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                userMode === 'ops'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Ops Command</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
