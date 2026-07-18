import React, { useState } from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { audioBeacon } from '../../services/audioBeaconService';
import { QrCode, CheckCircle2, X, Sparkles, Ticket } from 'lucide-react';

export const TicketScannerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { stadium, toggleEcoReward } = useStadiumState();
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [ticketType, setTicketType] = useState<'standard' | 'accessible'>('accessible');

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScanStatus('scanning');
    audioBeacon.playBeacon(700, 100);

    setTimeout(() => {
      setScanStatus('success');
      audioBeacon.playSuccessChime();
      toggleEcoReward('eco-1');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-panel rounded-2xl p-6 border border-white/20 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Digital NFC Match Pass & QR Scanner
            </h3>
            <p className="text-xs text-slate-400">{stadium.name}</p>
          </div>
        </div>

        {scanStatus !== 'success' ? (
          <div className="space-y-4 text-center">
            {/* Simulated QR Code Card */}
            <div className="p-4 rounded-2xl bg-white text-slate-950 mx-auto w-48 h-48 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
              <QrCode className="w-32 h-32 text-slate-900" />
              <span className="text-[10px] font-mono font-bold mt-1">FIFA-2026-PASS-SEC104</span>

              {scanStatus === 'scanning' && (
                <div className="absolute inset-0 bg-emerald-500/20 border-b-4 border-emerald-500 animate-pulse"></div>
              )}
            </div>

            <div className="flex items-center justify-center gap-4 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                <input
                  type="radio"
                  name="ticket"
                  checked={ticketType === 'accessible'}
                  onChange={() => setTicketType('accessible')}
                  className="accent-emerald-400"
                />
                <span>Wheelchair Step-Free Pass</span>
              </label>
            </div>

            <button
              onClick={handleSimulateScan}
              disabled={scanStatus === 'scanning'}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 font-extrabold text-slate-950 text-xs hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>{scanStatus === 'scanning' ? 'Scanning Pass at Turnstile...' : 'Simulate Gate NFC Scan'}</span>
            </button>
          </div>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-lg font-bold text-white">Turnstile Gate Cleared!</h4>
            <p className="text-xs text-emerald-300">
              Welcome to {stadium.name}! +150 Eco Points awarded for zero-emission arrival.
            </p>

            <button
              onClick={() => {
                setScanStatus('idle');
                onClose();
              }}
              className="px-6 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition"
            >
              Close & Enter Stadium
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
