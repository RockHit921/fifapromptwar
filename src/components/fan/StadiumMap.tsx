import React, { useState } from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { audioBeacon } from '../../services/audioBeaconService';
import { TicketScannerModal } from './TicketScannerModal';
import { MapPin, Navigation, Accessibility, Clock, Volume2, Layers, Ticket } from 'lucide-react';
import { getQueueStatusCategory } from '../../services/queuePredictor';

export const StadiumMap: React.FC = () => {
  const { stadium } = useStadiumState();
  const { announceForScreenReader } = useAccessibility();
  const [selectedGate, setSelectedGate] = useState<string | null>('gate-a');
  const [showAccessibleRoute, setShowAccessibleRoute] = useState(false);
  const [mapStyleMode, setMapStyleMode] = useState<'vector' | 'satellite'>('vector');
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const activeGateObj = stadium.gates.find((g) => g.id === selectedGate) || stadium.gates[0];

  const handleSelectGate = (gateId: string, name: string) => {
    setSelectedGate(gateId);
    audioBeacon.playBeacon(880, 100);
    announceForScreenReader(`Selected ${name} on stadium map.`);
  };

  const handleTriggerBeaconSound = () => {
    audioBeacon.playBeacon(1200, 250);
    announceForScreenReader(`Emitted acoustic audio beacon for ${activeGateObj.name}`);
  };

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col h-full">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            Interactive Stadium Vector Navigator
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Map Layer Mode Toggle */}
          <button
            onClick={() => setMapStyleMode((prev) => (prev === 'vector' ? 'satellite' : 'vector'))}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
              mapStyleMode === 'satellite'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                : 'bg-slate-900 border-white/10 text-slate-300 hover:text-white'
            }`}
            title="Toggle Google Maps Satellite Overlay View"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{mapStyleMode === 'satellite' ? 'Satellite View' : 'Tactical Vector'}</span>
          </button>

          {/* Accessible Step-Free Route */}
          <button
            onClick={() => {
              setShowAccessibleRoute((prev) => !prev);
              audioBeacon.playBeacon(900, 150);
              announceForScreenReader(`Accessible express route ${!showAccessibleRoute ? 'enabled' : 'disabled'}`);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
              showAccessibleRoute
                ? 'bg-blue-600 text-white border-blue-400 shadow-md glow-emerald'
                : 'bg-slate-900/80 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <Accessibility className="w-3.5 h-3.5" />
            <span>{showAccessibleRoute ? 'Step-Free Active' : 'Step-Free Route'}</span>
          </button>

          {/* Digital NFC Pass Scanner Modal Trigger */}
          <button
            onClick={() => setIsScannerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:from-emerald-400 hover:to-teal-500 shadow-md transition"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Scan Pass</span>
          </button>
        </div>
      </div>

      {/* SVG Map Container */}
      <div
        className={`relative w-full aspect-[16/10] rounded-xl border border-white/10 overflow-hidden flex items-center justify-center p-2 transition-all ${
          mapStyleMode === 'satellite'
            ? 'bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 border-emerald-500/30'
            : 'bg-slate-950/80'
        }`}
      >
        <svg viewBox="0 0 800 500" className="w-full h-full select-none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <radialGradient id="pitchGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={mapStyleMode === 'satellite' ? '#059669' : '#10b981'} stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="800" height="500" fill="url(#grid)" />

          {/* Outer Stadium Concourse Ring */}
          <ellipse
            cx="400"
            cy="250"
            rx="360"
            ry="210"
            fill={mapStyleMode === 'satellite' ? 'rgba(6, 78, 59, 0.4)' : 'none'}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />

          {/* Stadium Seating Bowl Ring */}
          <ellipse
            cx="400"
            cy="250"
            rx="310"
            ry="170"
            fill={mapStyleMode === 'satellite' ? 'rgba(15, 23, 42, 0.85)' : 'rgba(30, 41, 59, 0.6)'}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="3"
          />

          {/* Pitch Field Glow */}
          <rect x="260" y="160" width="280" height="180" rx="12" fill="url(#pitchGlow)" stroke="#10b981" strokeWidth="2" />

          {/* Soccer Field Markings */}
          <rect x="270" y="170" width="260" height="160" fill="none" stroke="rgba(16, 185, 129, 0.6)" strokeWidth="1.5" />
          <line x1="400" y1="170" x2="400" y2="330" stroke="rgba(16, 185, 129, 0.6)" strokeWidth="1.5" />
          <circle cx="400" cy="250" r="35" fill="none" stroke="rgba(16, 185, 129, 0.6)" strokeWidth="1.5" />

          {/* Accessible Express Step-Free Route Path */}
          {showAccessibleRoute && (
            <path
              d="M 120 250 Q 240 130 400 130 Q 560 130 680 250"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeDasharray="8 8"
              className="animate-pulse"
            />
          )}

          {/* Sectors Labels */}
          <text x="400" y="100" fill="#9ca3af" fontSize="11" fontWeight="bold" textAnchor="middle">NORTH STAND (SEC 100-112)</text>
          <text x="400" y="410" fill="#9ca3af" fontSize="11" fontWeight="bold" textAnchor="middle">SOUTH STAND (SEC 120-132)</text>
          <text x="130" y="255" fill="#9ca3af" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(-90 130 255)">WEST CONCOURSE</text>
          <text x="670" y="255" fill="#9ca3af" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(90 670 255)">EAST CONCOURSE</text>

          {/* Interactive Gate Pin 1 - Gate A (North) */}
          <g
            className="cursor-pointer group"
            onClick={() => handleSelectGate('gate-a', 'Gate A North Express')}
          >
            <circle cx="400" cy="50" r="22" fill={selectedGate === 'gate-a' ? '#fbbf24' : '#10b981'} opacity="0.2" className="animate-ping" />
            <circle cx="400" cy="50" r="16" fill={selectedGate === 'gate-a' ? '#fbbf24' : '#10b981'} stroke="#ffffff" strokeWidth="2" />
            <text x="400" y="54" fill="#090d16" fontSize="10" fontWeight="extrabold" textAnchor="middle">A</text>
            <text x="400" y="24" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Gate A (3m)</text>
          </g>

          {/* Interactive Gate Pin 2 - Gate B (East) */}
          <g
            className="cursor-pointer group"
            onClick={() => handleSelectGate('gate-b', 'Gate B East VIP')}
          >
            <circle cx="730" cy="250" r="16" fill={selectedGate === 'gate-b' ? '#fbbf24' : '#f59e0b'} stroke="#ffffff" strokeWidth="2" />
            <text x="730" y="254" fill="#090d16" fontSize="10" fontWeight="extrabold" textAnchor="middle">B</text>
            <text x="730" y="280" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Gate B (9m)</text>
          </g>

          {/* Interactive Gate Pin 3 - Gate C (South) */}
          <g
            className="cursor-pointer group"
            onClick={() => handleSelectGate('gate-c', 'Gate C South General')}
          >
            <circle cx="400" cy="450" r="16" fill={selectedGate === 'gate-c' ? '#fbbf24' : '#ef4444'} stroke="#ffffff" strokeWidth="2" />
            <text x="400" y="454" fill="#090d16" fontSize="10" fontWeight="extrabold" textAnchor="middle">C</text>
            <text x="400" y="480" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Gate C (18m)</text>
          </g>

          {/* Interactive Gate Pin 4 - Gate D (West Transit) */}
          <g
            className="cursor-pointer group"
            onClick={() => handleSelectGate('gate-d', 'Gate D West Transit')}
          >
            <circle cx="70" cy="250" r="16" fill={selectedGate === 'gate-d' ? '#fbbf24' : '#10b981'} stroke="#ffffff" strokeWidth="2" />
            <text x="70" y="254" fill="#090d16" fontSize="10" fontWeight="extrabold" textAnchor="middle">D</text>
            <text x="70" y="280" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Gate D (4m)</text>
          </g>

          {/* Concession & Restroom Icons */}
          <circle cx="280" cy="110" r="8" fill="#3b82f6" />
          <text x="280" y="113" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">♿</text>

          <circle cx="520" cy="110" r="8" fill="#10b981" />
          <text x="520" y="113" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">🌮</text>

          <circle cx="280" cy="390" r="8" fill="#10b981" />
          <text x="280" y="393" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">🥤</text>

          <circle cx="520" cy="390" r="8" fill="#3b82f6" />
          <text x="520" y="393" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">♿</text>
        </svg>
      </div>

      {/* Selected Gate Intelligence Bar */}
      {activeGateObj && (
        <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <div>
              <span className="font-bold text-white">{activeGateObj.name}</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <span>Throughput: {activeGateObj.throughputPerMin} fans/min</span>
                {activeGateObj.accessible && (
                  <span className="text-blue-400 flex items-center gap-0.5">
                    <Accessibility className="w-3 h-3" /> Step-Free Ramp
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTriggerBeaconSound}
              className="px-2 py-1 rounded bg-blue-950/60 border border-blue-500/40 text-blue-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
              title="Emit audio direction beacon for blind & low-vision fans"
            >
              <Volume2 className="w-3 h-3 text-blue-400" /> Audio Beacon
            </button>

            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-200">Est. Line:</span>
              <span className="font-extrabold text-white text-sm">{activeGateObj.currentWaitMinutes} min</span>
            </div>

            {(() => {
              const statusCat = getQueueStatusCategory(activeGateObj.currentWaitMinutes);
              return (
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusCat.colorClass}`}>
                  {statusCat.label}
                </span>
              );
            })()}
          </div>
        </div>
      )}

      {/* Ticket Scanner Modal */}
      <TicketScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
    </div>
  );
};
