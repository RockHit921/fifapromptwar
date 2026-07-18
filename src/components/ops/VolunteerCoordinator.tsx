import React from 'react';
import { Users, MapPin, Clock, CheckCircle2, Radio } from 'lucide-react';
import { useStadiumState } from '../../context/StadiumStateContext';

export const VolunteerCoordinator: React.FC = () => {
  const { stadium } = useStadiumState();

  const teams = [
    { id: 1, name: 'Alpha Squad', zone: 'North Gate', status: 'Active', count: 12 },
    { id: 2, name: 'Bravo Team', zone: 'Concourse A', status: 'Active', count: 8 },
    { id: 3, name: 'Charlie Unit', zone: 'South Plaza', status: 'Dispatched', count: 15 },
    { id: 4, name: 'Delta Force', zone: 'East VIP', status: 'On Break', count: 6 },
  ];

  const tasks = [
    { id: 101, title: 'Queue Management Assistance', zone: 'South Plaza', priority: 'High', time: '2m ago' },
    { id: 102, title: 'Restock Accessibility Kits', zone: 'Info Desk B', priority: 'Medium', time: '15m ago' },
    { id: 103, title: 'Direct crowd to Gate C', zone: 'Concourse A', priority: 'High', time: 'Just now' },
  ];

  return (
    <div className="glass-card p-6 h-full border-blue-500/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white tracking-wide">Volunteer Coordinator</h2>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>41 Active</span>
        </div>
      </div>

      <div className="mb-4 text-sm text-slate-400">
        Managing volunteer deployment at {stadium.name}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
            <MapPin className="h-4 w-4 mr-2" /> Team Deployment
          </h3>
          <div className="space-y-3">
            {teams.map(team => (
              <div key={team.id} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 flex justify-between items-center">
                <div>
                  <div className="text-sm font-bold text-white">{team.name}</div>
                  <div className="text-xs text-slate-400">{team.zone} • {team.count} members</div>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase
                  ${team.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 
                    team.status === 'Dispatched' ? 'bg-blue-500/20 text-blue-400' : 
                    'bg-slate-500/20 text-slate-400'}`}>
                  {team.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
            <CheckCircle2 className="h-4 w-4 mr-2" /> Active Tasks
          </h3>
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-sm font-bold text-white">{task.title}</div>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase
                    ${task.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {task.priority}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
                  <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> {task.zone}</span>
                  <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {task.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
