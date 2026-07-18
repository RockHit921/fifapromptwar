import React, { useState } from 'react';
import { Radio } from 'lucide-react';

export const CrowdHeatmap: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('gate-c');

  const sectors = [
    { id: 'gate-c', name: 'Gate C South Entrance', density: 88, status: 'Critical', color: 'bg-red-500' },
    { id: 'gate-b', name: 'Gate B East VIP', density: 54, status: 'Moderate', color: 'bg-amber-500' },
    { id: 'gate-a', name: 'Gate A North Express', density: 22, status: 'Optimal', color: 'bg-emerald-500' },
    { id: 'plaza-s', name: 'Plaza South Concourse', density: 76, status: 'High', color: 'bg-orange-500' },
    { id: 'sec-104', name: 'Section 104 BBQ Area', density: 62, status: 'Moderate', color: 'bg-amber-500' },
  ];

  const activeSector = sectors.find((s) => s.id === selectedSector) || sectors[0];

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              AI Stadium Crowd Density & Flow Radar
            </h3>
            <p className="text-[11px] text-slate-400">Live IoT sensor & gate throughput telemetry</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Live Stream
        </span>
      </div>

      {/* Radar Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Visual Radar Container */}
        <div className="md:col-span-6 relative aspect-square bg-slate-950/90 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center p-4">
          {/* Concentric Radar Rings */}
          <div className="absolute w-4/5 h-4/5 rounded-full border border-emerald-500/20"></div>
          <div className="absolute w-3/5 h-3/5 rounded-full border border-emerald-500/30"></div>
          <div className="absolute w-2/5 h-2/5 rounded-full border border-emerald-500/40"></div>
          <div className="absolute w-1/5 h-1/5 rounded-full border border-emerald-500/60"></div>

          {/* Radar Line Sweep Animation */}
          <div className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left border-l border-emerald-400/60 bg-gradient-to-tr from-emerald-500/20 to-transparent animate-radar"></div>

          {/* Hotspots */}
          <div
            onClick={() => setSelectedSector('gate-c')}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-red-500/40 border-2 border-red-400 animate-ping cursor-pointer"
            title="Gate C Critical Density"
          ></div>
          <div
            onClick={() => setSelectedSector('gate-a')}
            className="absolute top-10 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-emerald-500/40 border-2 border-emerald-400 cursor-pointer"
            title="Gate A Optimal"
          ></div>
          <div
            onClick={() => setSelectedSector('plaza-s')}
            className="absolute bottom-24 right-12 w-7 h-7 rounded-full bg-orange-500/40 border-2 border-orange-400 cursor-pointer"
            title="Plaza South High"
          ></div>

          <div className="absolute bottom-2 left-2 text-[10px] text-emerald-400 font-mono">
            SEC: {activeSector.name} | DENSITY: {activeSector.density}%
          </div>
        </div>

        {/* Sector Analytics List */}
        <div className="md:col-span-6 space-y-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Sector Congestion Index
          </h4>

          {sectors.map((sec) => (
            <div
              key={sec.id}
              onClick={() => setSelectedSector(sec.id)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                selectedSector === sec.id
                  ? 'bg-slate-900 border-amber-400'
                  : 'bg-slate-900/60 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-white">{sec.name}</span>
                <span className="font-mono text-slate-300">{sec.density}% capacity</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div
                  className={`h-full ${sec.color}`}
                  style={{ width: `${sec.density}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
