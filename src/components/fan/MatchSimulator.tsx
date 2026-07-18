import React, { useState } from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { audioBeacon } from '../../services/audioBeaconService';
import { Play, Flame, Sliders, Users, Flag, Clock, Sparkles } from 'lucide-react';

export const MatchSimulator: React.FC = () => {
  const { simulateLiveQueueTick } = useStadiumState();
  const [activePhase, setActivePhase] = useState<string>('pre-match');
  const [scannerSpeed, setScannerSpeed] = useState<number>(4.5);

  const handleSetPhase = (phase: string) => {
    setActivePhase(phase);
    audioBeacon.playBeacon(600, 150);

    // Trigger state tick
    simulateLiveQueueTick();
  };

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              Live FIFA Match Timeline & Crowd Physics Simulator
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h3>
            <p className="text-[10px] text-slate-400">Simulate matchday crowd flow dynamics & gate capacity</p>
          </div>
        </div>
      </div>

      {/* Match Phase Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => handleSetPhase('pre-match')}
          className={`p-2 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
            activePhase === 'pre-match'
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
              : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Pre-Match Inflow</span>
        </button>

        <button
          onClick={() => handleSetPhase('kickoff')}
          className={`p-2 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
            activePhase === 'kickoff'
              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
              : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <Flag className="w-4 h-4 text-amber-400" />
          <span>Kickoff Gate Surge</span>
        </button>

        <button
          onClick={() => handleSetPhase('halftime')}
          className={`p-2 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
            activePhase === 'halftime'
              ? 'bg-orange-500/20 border-orange-400 text-orange-300'
              : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-orange-400" />
          <span>45' Halftime Rush</span>
        </button>

        <button
          onClick={() => handleSetPhase('egress')}
          className={`p-2 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
            activePhase === 'egress'
              ? 'bg-red-500/20 border-red-400 text-red-300'
              : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <Play className="w-4 h-4 text-red-400" />
          <span>85' Rapid Egress</span>
        </button>
      </div>

      {/* Interactive Turnstile Speed Tuning Slider */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-blue-400" /> NFC Scanner Processing Time:
          </span>
          <span className="font-bold text-amber-300 font-mono">{scannerSpeed.toFixed(1)}s / spectator</span>
        </div>

        <input
          type="range"
          min="1.5"
          max="8.0"
          step="0.5"
          value={scannerSpeed}
          onChange={(e) => {
            setScannerSpeed(parseFloat(e.target.value));
            audioBeacon.playBeacon(400 + parseFloat(e.target.value) * 50, 50);
          }}
          className="w-full accent-amber-400 cursor-pointer"
        />

        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>1.5s (Ultra Express)</span>
          <span>4.5s (Standard)</span>
          <span>8.0s (Manual Ticket Inspect)</span>
        </div>
      </div>
    </div>
  );
};
