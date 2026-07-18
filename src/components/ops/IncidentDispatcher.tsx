import React, { useState } from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { generateDispatchPlaybook } from '../../services/geminiService';
import type { IncidentAlert } from '../../types';
import { ShieldAlert, CheckCircle2, FileText, Sparkles, RefreshCw } from 'lucide-react';

export const IncidentDispatcher: React.FC = () => {
  const { incidents, resolveIncident, addIncident } = useStadiumState();
  const [selectedIncident, setSelectedIncident] = useState<IncidentAlert | null>(incidents[0] || null);
  const [playbook, setPlaybook] = useState<string>('');
  const [loadingPlaybook, setLoadingPlaybook] = useState<boolean>(false);

  // New incident modal state
  const [newLocation, setNewLocation] = useState('');
  const [newType, setNewType] = useState<IncidentAlert['type']>('Gate Congestion');
  const [newSummary, setNewSummary] = useState('');

  const handleGeneratePlaybook = async (inc: IncidentAlert) => {
    setSelectedIncident(inc);
    setLoadingPlaybook(true);
    setPlaybook('');
    try {
      const res = await generateDispatchPlaybook(inc);
      setPlaybook(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPlaybook(false);
    }
  };

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation || !newSummary) return;

    addIncident({
      location: newLocation,
      type: newType,
      severity: 'high',
      status: 'active',
      summary: newSummary,
      recommendedAction: 'Dispatch Sector Steward & notify Security Operations.',
    });

    setNewLocation('');
    setNewSummary('');
  };

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              Incident Dispatch & Emergency Router
            </h3>
            <p className="text-[11px] text-slate-400">GenAI Playbook Generation & Volunteer Dispatch</p>
          </div>
        </div>
      </div>

      {/* Incidents List */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Active Venue Incidents ({incidents.filter((i) => i.status !== 'resolved').length})
        </h4>

        {incidents.map((inc) => (
          <div
            key={inc.id}
            className={`p-3 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              inc.status === 'resolved'
                ? 'bg-slate-900/40 border-white/5 opacity-60'
                : inc.severity === 'high'
                ? 'bg-red-950/40 border-red-500/40'
                : 'bg-slate-900/80 border-white/10'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-white">{inc.type}</span>
                <span className="text-[11px] text-slate-400">@ {inc.location}</span>
                <span className="text-[10px] text-slate-500">{inc.timestamp}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{inc.summary}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {inc.status !== 'resolved' ? (
                <>
                  <button
                    onClick={() => handleGeneratePlaybook(inc)}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Playbook
                  </button>
                  <button
                    onClick={() => resolveIncident(inc.id)}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 transition flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Resolve
                  </button>
                </>
              ) : (
                <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-xs font-semibold">
                  Resolved
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Generated AI Playbook Display */}
      {selectedIncident && (playbook || loadingPlaybook) && (
        <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-300 font-bold border-b border-amber-500/20 pb-1.5">
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4" /> AI Emergency Dispatch Playbook ({selectedIncident.type})
            </span>
          </div>

          {loadingPlaybook ? (
            <div className="flex items-center gap-2 text-xs text-amber-200">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating tactical volunteer dispatch instructions...</span>
            </div>
          ) : (
            <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">{playbook}</p>
          )}
        </div>
      )}

      {/* Trigger New Incident Form */}
      <form onSubmit={handleCreateIncident} className="p-3 rounded-xl bg-slate-900/90 border border-white/10 space-y-2">
        <h4 className="text-xs font-bold text-slate-300">Report New Incident to Dispatch:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Location (e.g. Gate B East)"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as any)}
            className="bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="Gate Congestion">Gate Congestion</option>
            <option value="Medical Assist">Medical Assist</option>
            <option value="Crowd Bottleneck">Crowd Bottleneck</option>
            <option value="Lost Child">Lost Child</option>
            <option value="Ticket Scanning Glitch">Ticket Scanning Glitch</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Brief Summary of Situation..."
          value={newSummary}
          onChange={(e) => setNewSummary(e.target.value)}
          className="w-full bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          disabled={!newLocation || !newSummary}
          className="w-full py-2 rounded-lg bg-red-600 font-bold text-white text-xs hover:bg-red-500 disabled:opacity-40 transition"
        >
          Dispatch Emergency Alert
        </button>
      </form>
    </div>
  );
};
