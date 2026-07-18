import React from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { getQueueStatusCategory, findBestAlternativeGate } from '../../services/queuePredictor';
import { Clock, Utensils, Accessibility, RefreshCw, AlertCircle } from 'lucide-react';

export const QueueTracker: React.FC = () => {
  const { stadium, simulateLiveQueueTick } = useStadiumState();

  const congestedGate = stadium.gates.find((g) => g.status === 'congested' || g.status === 'emergency');
  const bestAlt = congestedGate ? findBestAlternativeGate(congestedGate.id, stadium.gates) : null;

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">
            Smart Queue & Wait Predictor
          </h3>
        </div>

        <button
          onClick={simulateLiveQueueTick}
          className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-amber-400 text-xs flex items-center gap-1"
          title="Simulate live queue throughput refresh"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Feeds</span>
        </button>
      </div>

      {/* AI Alternative Gate Recommendation Banner */}
      {congestedGate && bestAlt && (
        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-2.5 text-xs text-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300">Crowd Flow Recommendation:</span>
            <p className="mt-0.5 text-slate-300">
              {congestedGate.name} is congested ({congestedGate.currentWaitMinutes} mins).
              Reroute to <span className="font-bold text-emerald-400">{bestAlt.name}</span> save approx{' '}
              <span className="font-extrabold text-white">{congestedGate.currentWaitMinutes - bestAlt.currentWaitMinutes} minutes</span>!
            </p>
          </div>
        </div>
      )}

      {/* Gates Queue Section */}
      <div>
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Stadium Entrance Gates
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {stadium.gates.map((gate) => {
            const statusCat = getQueueStatusCategory(gate.currentWaitMinutes);
            return (
              <div
                key={gate.id}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-white text-xs flex items-center gap-1">
                    {gate.name}
                    {gate.accessible && (
                      <span title="Step-free wheelchair ramp">
                        <Accessibility className="w-3 h-3 text-blue-400 inline" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {gate.throughputPerMin} scans/min
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-white text-sm">
                    {gate.currentWaitMinutes} min
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${statusCat.colorClass}`}>
                    {statusCat.label.split(' ')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Concession Stand Queues */}
      <div>
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Utensils className="w-3.5 h-3.5 text-amber-400" />
          Concessions & Dietary Wait Times
        </h4>
        <div className="space-y-2">
          {stadium.concessions.map((conc) => (
            <div
              key={conc.id}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs"
            >
              <div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  {conc.name}
                  {conc.isEcoCertified && (
                    <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">
                      Eco-Certified
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400">
                  {conc.sector} • Popular: <span className="text-amber-300 font-medium">{conc.popularItem}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-bold text-slate-200">{conc.waitTimeMinutes}m wait</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
