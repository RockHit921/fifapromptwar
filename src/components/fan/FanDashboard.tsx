import React, { useState } from 'react';
import { StadiumMap } from './StadiumMap';
import { MultilingualAssistant } from './MultilingualAssistant';
import { QueueTracker } from './QueueTracker';
import { EcoTracker } from './EcoTracker';
import { MatchSimulator } from './MatchSimulator';
import { ParkingRouter } from './ParkingRouter';
import { BagPolicyValidator } from './BagPolicyValidator';
import { EmergencySosModal } from './EmergencySosModal';
import { ShieldAlert, Radio } from 'lucide-react';

export const FanDashboard: React.FC = () => {
  const [isSosOpen, setIsSosOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Action Bar with Emergency SOS Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/90 border border-white/10 shadow-lg">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-white">
            FIFA Matchday Fan Services & Safety Control
          </span>
        </div>

        <button
          onClick={() => setIsSosOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white text-xs font-black hover:from-red-500 hover:to-rose-600 shadow-lg glow-red transition flex items-center gap-1.5 cursor-pointer animate-pulse"
        >
          <ShieldAlert className="w-4 h-4 text-white" />
          <span>EMERGENCY FAN SOS</span>
        </button>
      </div>

      {/* Interactive FIFA Matchday Timeline Simulator Bar */}
      <MatchSimulator />

      {/* Upper Section: Map & Multilingual Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <StadiumMap />
        </div>
        <div className="lg:col-span-5">
          <MultilingualAssistant />
        </div>
      </div>

      {/* Middle Section: Queue Predictor & Eco Rewards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <QueueTracker />
        </div>
        <div className="lg:col-span-5">
          <EcoTracker />
        </div>
      </div>

      {/* Lower Section: Smart Parking Router & FIFA Bag Policy AI Checker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <ParkingRouter />
        </div>
        <div className="lg:col-span-6">
          <BagPolicyValidator />
        </div>
      </div>

      {/* Emergency SOS Modal */}
      <EmergencySosModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
    </div>
  );
};
