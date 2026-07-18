import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Sun, Wind, AlertTriangle, Shield } from 'lucide-react';
import { useStadiumState } from '../../context/StadiumStateContext';

export const WeatherSafetyMonitor: React.FC = () => {
  const { stadium } = useStadiumState();
  const [riskLevel, setRiskLevel] = useState<'Low' | 'Moderate' | 'High' | 'Extreme'>('High');

  useEffect(() => {
    // Simulated dynamic changes
    const timer = setInterval(() => {
      setRiskLevel(prev => prev === 'High' ? 'Extreme' : 'High');
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-card p-6 h-full border-red-500/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Thermometer className="h-6 w-6 text-red-400" />
          <h2 className="text-xl font-bold text-white tracking-wide">Weather Safety Monitor</h2>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${riskLevel === 'Extreme' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
          {riskLevel} RISK LEVEL
        </div>
      </div>

      <div className="mb-4 text-sm text-slate-400">
        Monitoring conditions at {stadium.name}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center text-slate-400 mb-2">
            <Thermometer className="h-4 w-4 mr-2" /> Temperature
          </div>
          <div className="text-2xl font-bold text-white">92°F <span className="text-sm text-slate-500">/ 33°C</span></div>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center text-slate-400 mb-2">
            <Droplets className="h-4 w-4 mr-2" /> Humidity
          </div>
          <div className="text-2xl font-bold text-white">65%</div>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center text-slate-400 mb-2">
            <Sun className="h-4 w-4 mr-2" /> UV Index
          </div>
          <div className="text-2xl font-bold text-amber-400">8.5 <span className="text-sm text-slate-500">(Very High)</span></div>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center text-slate-400 mb-2">
            <Wind className="h-4 w-4 mr-2" /> Heat Index
          </div>
          <div className="text-2xl font-bold text-red-400">103°F <span className="text-sm text-slate-500">/ 39°C</span></div>
        </div>
      </div>

      <h3 className="text-md font-semibold text-white mb-4 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-emerald-400" /> AI Automated Recommendations
      </h3>

      <div className="space-y-3">
        <div className="flex items-start space-x-3 bg-red-900/20 p-3 rounded-lg border border-red-500/20">
          <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-bold text-white">Deploy Cooling Stations</div>
            <div className="text-xs text-slate-300">Activate mist sprayers at North and South Plazas immediately.</div>
          </div>
        </div>
        <div className="flex items-start space-x-3 bg-orange-900/20 p-3 rounded-lg border border-orange-500/20">
          <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-bold text-white">Water Distribution</div>
            <div className="text-xs text-slate-300">Dispatch extra water to Section 100-115 (Direct sunlight exposure).</div>
          </div>
        </div>
      </div>
    </div>
  );
};
