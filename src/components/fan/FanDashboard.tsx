import React from 'react';
import { StadiumMap } from './StadiumMap';
import { MultilingualAssistant } from './MultilingualAssistant';
import { QueueTracker } from './QueueTracker';
import { EcoTracker } from './EcoTracker';
import { MatchSimulator } from './MatchSimulator';

export const FanDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
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

      {/* Lower Section: Queue Predictor & Eco Rewards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <QueueTracker />
        </div>
        <div className="lg:col-span-5">
          <EcoTracker />
        </div>
      </div>
    </div>
  );
};
