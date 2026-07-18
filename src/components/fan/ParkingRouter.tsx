import React from 'react';
import { Car, Zap, Bus } from 'lucide-react';

export const ParkingRouter: React.FC = () => {
  const parkingLots = [
    { id: 'lot-a', name: 'North Express Deck A', capacity: 92, status: 'Full', evChargers: 4, shuttleMin: 2 },
    { id: 'lot-b', name: 'East Transit Deck B', capacity: 48, status: 'Open', evChargers: 12, shuttleMin: 5 },
    { id: 'lot-c', name: 'West Eco Surface Lot C', capacity: 26, status: 'Optimal', evChargers: 8, shuttleMin: 3 },
  ];

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Smart Parking & EV Shuttle Router
            </h3>
            <p className="text-[11px] text-slate-400">Live lot capacity & zero-emission transit</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {parkingLots.map((lot) => (
          <div key={lot.id} className="p-3 rounded-xl bg-slate-900/80 border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-white">
              <span>{lot.name}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                  lot.capacity >= 90
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : lot.capacity >= 50
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {lot.status} ({lot.capacity}%)
              </span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
              <div
                className={`h-full ${
                  lot.capacity >= 90 ? 'bg-red-500' : lot.capacity >= 50 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${lot.capacity}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <span className="flex items-center gap-1 text-amber-300">
                <Zap className="w-3 h-3 text-amber-400" /> {lot.evChargers} EV Ports Available
              </span>
              <span className="flex items-center gap-1 text-emerald-300">
                <Bus className="w-3 h-3 text-emerald-400" /> Shuttle: {lot.shuttleMin}m
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
