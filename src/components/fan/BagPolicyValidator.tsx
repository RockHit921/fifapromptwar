import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Sparkles, ShoppingBag } from 'lucide-react';

export const BagPolicyValidator: React.FC = () => {
  const [bagType, setBagType] = useState('clear');
  const [width, setWidth] = useState(12);
  const [height, setHeight] = useState(12);

  const isCompliant = bagType === 'clear' && width <= 12 && height <= 12;

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1">
              FIFA Bag Policy AI Checker
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </h3>
            <p className="text-[11px] text-slate-400">Validate clear tote & clutch dimensions</p>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 space-y-2 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Select Bag Type:</label>
          <select
            value={bagType}
            onChange={(e) => setBagType(e.target.value)}
            className="w-full bg-slate-950 border border-white/15 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="clear">Clear Plastic / Vinyl Tote</option>
            <option value="clutch">Small Clutch Purse (Unclear)</option>
            <option value="backpack">Standard Backpack / Duffel</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-slate-400 text-[11px]">Width (Inches):</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full bg-slate-950 border border-white/15 rounded-lg px-2.5 py-1 text-white font-bold"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-[11px]">Height (Inches):</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full bg-slate-950 border border-white/15 rounded-lg px-2.5 py-1 text-white font-bold"
            />
          </div>
        </div>

        <div
          className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
            isCompliant
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-red-950/40 border-red-500/40 text-red-200'
          }`}
        >
          {isCompliant ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          )}

          <div>
            <span className="font-bold">
              {isCompliant ? 'APPROVED FOR GATE SCANNER ENTRY' : 'NON-COMPLIANT WITH FIFA RULES'}
            </span>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {isCompliant
                ? 'Your clear bag complies with FIFA 2026 express security guidelines (12" x 12" x 6").'
                : 'Backpacks or unclear bags larger than 4.5" x 6.5" must be checked at Gate A Lockers.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
