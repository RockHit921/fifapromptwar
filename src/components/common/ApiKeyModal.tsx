import React, { useState } from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { Key, X, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const ApiKeyModal: React.FC = () => {
  const { apiKeyModalOpen, setApiKeyModalOpen, apiKey, updateApiKey } = useStadiumState();
  const [inputKey, setInputKey] = useState(apiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!apiKeyModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateApiKey(inputKey);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setApiKeyModalOpen(false);
    }, 1000);
  };

  const handleClear = () => {
    setInputKey('');
    updateApiKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-panel rounded-2xl p-6 border border-white/20 shadow-2xl animate-pulse-slow">
        {/* Close button */}
        <button
          onClick={() => setApiKeyModalOpen(false)}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Google Gemini API Key
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <p className="text-xs text-slate-400">Power GenAI stadium intelligence & vision multimodal analytics</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Enter Google Gemini API Key:
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3 py-2 bg-slate-900/90 border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 transition"
            />
            <p className="mt-1 text-[11px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400 inline" />
              Stored locally in browser memory only.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200">
            <span className="font-semibold text-blue-300">💡 No API key? No problem!</span> ApexArena includes a built-in Gemini simulation engine so you can evaluate all features offline seamlessly.
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" /> API Key saved successfully!
            </div>
          )}

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition"
            >
              Clear Key
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setApiKeyModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md transition"
              >
                Save & Activate
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
