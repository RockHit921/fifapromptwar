import React from 'react';
import { CrowdHeatmap } from './CrowdHeatmap';
import { VisionAnalyzer } from './VisionAnalyzer';
import { IncidentDispatcher } from './IncidentDispatcher';
import { PAAnnouncer } from './PAAnnouncer';
import { WeatherSafetyMonitor } from './WeatherSafetyMonitor';
import { VolunteerCoordinator } from './VolunteerCoordinator';

export const OpsCommandCenter: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Section: Radar Heatmap & CCTV Vision Auditor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <CrowdHeatmap />
        </div>
        <div className="lg:col-span-6">
          <VisionAnalyzer />
        </div>
      </div>

      {/* Bottom Section: Incident Dispatcher & PA Broadcaster */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <IncidentDispatcher />
        </div>
        <div className="lg:col-span-6">
          <PAAnnouncer />
        </div>
      </div>

      {/* Weather Safety & Volunteer Coordination */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <WeatherSafetyMonitor />
        </div>
        <div className="lg:col-span-6">
          <VolunteerCoordinator />
        </div>
      </div>
    </div>
  );
};
