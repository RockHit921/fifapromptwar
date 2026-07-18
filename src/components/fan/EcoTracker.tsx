import React from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { Leaf, Award, CheckCircle2, Circle, Train, CupSoda, Recycle, Clock, Sparkles } from 'lucide-react';

export const EcoTracker: React.FC = () => {
  const { ecoRewards, toggleEcoReward } = useStadiumState();

  const totalPoints = ecoRewards
    .filter((r) => r.completed)
    .reduce((sum, r) => sum + r.points, 0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Train':
        return <Train className="w-4 h-4 text-emerald-400" />;
      case 'CupSoda':
        return <CupSoda className="w-4 h-4 text-emerald-400" />;
      case 'Recycle':
        return <Recycle className="w-4 h-4 text-emerald-400" />;
      default:
        return <Clock className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col h-full space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              EcoGoal Sustainability Rewards
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </h3>
            <p className="text-[11px] text-slate-400">Green matchday actions</p>
          </div>
        </div>

        {/* Score Badge */}
        <div className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-slate-950 font-extrabold text-xs flex items-center gap-1 shadow-md glow-emerald">
          <Award className="w-4 h-4" />
          <span>{totalPoints} Eco Points</span>
        </div>
      </div>

      {/* Reward Checklist */}
      <div className="space-y-2 pt-1">
        {ecoRewards.map((reward) => (
          <div
            key={reward.id}
            onClick={() => toggleEcoReward(reward.id)}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
              reward.completed
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-slate-900/70 border-white/10 text-slate-300 hover:border-emerald-500/30'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5">{getIcon(reward.iconName)}</div>
              <div>
                <div className="font-bold text-xs text-white flex items-center gap-2">
                  {reward.title}
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                    +{reward.points} pts
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{reward.description}</p>
              </div>
            </div>

            <div className="shrink-0 mt-0.5">
              {reward.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <Circle className="w-5 h-5 text-slate-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
