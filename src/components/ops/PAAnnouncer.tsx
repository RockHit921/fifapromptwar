import React, { useState } from 'react';
import { generatePAAnnouncement } from '../../services/geminiService';
import { speakText, stopSpeaking } from '../../services/speechService';
import { Megaphone, Volume2, Sparkles, RefreshCw, Radio } from 'lucide-react';

export const PAAnnouncer: React.FC = () => {
  const [incidentType, setIncidentType] = useState('Gate Congestion Reroute');
  const [location, setLocation] = useState('Gate C South General');
  const [actionInstruction, setActionInstruction] = useState(
    'Please proceed to Gate A North Express for immediate entry with zero wait time.'
  );
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState<Record<string, string>>({
    English: 'Attention spectators near Gate C: Please proceed to Gate A North Express for immediate entry with zero wait time.',
    Spanish: 'Atención espectadores cerca de la Puerta C: Por favor diríjanse a la Puerta A North Express para entrada inmediata sin espera.',
    French: 'Attention aux spectateurs près de la Porte C: Veuillez vous diriger vers la Porte A North Express pour un accès immédiat.',
  });

  const [broadcastingLang, setBroadcastingLang] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await generatePAAnnouncement(incidentType, location, actionInstruction, [
        'English',
        'Spanish',
        'French',
      ]);
      setAnnouncements(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBroadcastAudio = (lang: string, text: string) => {
    if (broadcastingLang === lang) {
      stopSpeaking();
      setBroadcastingLang(null);
    } else {
      setBroadcastingLang(lang);
      speakText(text, lang, () => setBroadcastingLang(null));
    }
  };

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              Multilingual Stadium PA Broadcast Generator
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </h3>
            <p className="text-[11px] text-slate-400">Gemini Powered Live Speech Broadcast Engine</p>
          </div>
        </div>
      </div>

      {/* Generator Form */}
      <form onSubmit={handleGenerate} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Scenario / Alert:</label>
            <input
              type="text"
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Stadium Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="text-xs">
          <label className="block text-slate-400 font-semibold mb-1">Instruction / Action Message:</label>
          <input
            type="text"
            value={actionInstruction}
            onChange={(e) => setActionInstruction(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 font-bold text-slate-950 text-xs hover:from-emerald-400 hover:to-teal-500 shadow-md transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>Generate Multilingual PA Announcements</span>
        </button>
      </form>

      {/* Announcements Output List */}
      <div className="space-y-2 pt-2 border-t border-white/10">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Generated Broadcast Translations
        </h4>

        {Object.entries(announcements).map(([lang, text]) => (
          <div key={lang} className="p-3 rounded-xl bg-slate-900/90 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-300">{lang} Announcement</span>
              <button
                onClick={() => handleBroadcastAudio(lang, text)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1 transition ${
                  broadcastingLang === lang
                    ? 'bg-red-600 border-red-400 text-white animate-pulse'
                    : 'bg-slate-800 border-white/10 text-slate-200 hover:text-white'
                }`}
              >
                {broadcastingLang === lang ? (
                  <Radio className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span>{broadcastingLang === lang ? 'Broadcasting...' : 'Broadcast Voice'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-200 italic">"{text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};
