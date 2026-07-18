import React, { useState } from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { audioBeacon } from '../../services/audioBeaconService';
import { ShieldAlert, AlertTriangle, CheckCircle2, X, MapPin, Radio, PhoneCall } from 'lucide-react';

export const EmergencySosModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { stadium, addIncident } = useStadiumState();
  const [sosDispatched, setSosDispatched] = useState(false);
  const [locationText, setLocationText] = useState('Section 104, Row 14, Seat 8');

  if (!isOpen) return null;

  const handleTriggerSOS = () => {
    setSosDispatched(true);
    audioBeacon.playAlertSignal();

    addIncident({
      location: `${stadium.name} - ${locationText}`,
      type: 'Medical Assist',
      severity: 'critical',
      status: 'active',
      summary: `EMERGENCY SOS BEACON DISPATCHED BY FAN @ ${locationText}`,
      recommendedAction: 'Dispatch Immediate Mobile Medic & Sector Steward Lead.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-panel rounded-2xl p-6 border border-red-500/40 shadow-2xl glow-red">
        <button
          onClick={() => {
            setSosDispatched(false);
            onClose();
          }}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-red-600/30 text-red-400 border border-red-500/40 animate-pulse">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Emergency Fan SOS Beacon
            </h3>
            <p className="text-xs text-red-300">FIFA Tournament Medical & Safety Assistance</p>
          </div>
        </div>

        {!sosDispatched ? (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1 text-xs">
              <label className="block text-slate-400 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Confirm Your Exact Seat / Location:
              </label>
              <input
                type="text"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                className="w-full bg-slate-950 border border-white/15 rounded-lg px-3 py-2 text-white font-bold focus:outline-none focus:border-red-400"
              />
            </div>

            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200">
              <span className="font-bold flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-red-400" /> Tapping SOS immediately notifies Security Operations Command & dispatches nearby stewards with defibrillators.
              </span>
            </div>

            <button
              onClick={handleTriggerSOS}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 font-black text-white text-sm hover:from-red-500 hover:to-rose-600 shadow-xl transition flex items-center justify-center gap-2 cursor-pointer animate-pulse"
            >
              <Radio className="w-5 h-5 animate-spin" />
              <span>DISPATCH EMERGENCY SOS BEACON NOW</span>
            </button>
          </div>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-lg font-bold text-white">Emergency Response Dispatched!</h4>
            <p className="text-xs text-slate-200">
              Paramedics and Sector Steward Lead are en route to <span className="font-bold text-amber-300">{locationText}</span>. Stay in your location.
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 flex items-center justify-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Stadium Command Hotline: <strong className="text-white">1-800-FIFA-SOS</strong></span>
            </div>

            <button
              onClick={() => {
                setSosDispatched(false);
                onClose();
              }}
              className="px-6 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition"
            >
              Close Alert Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
