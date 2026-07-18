import React from 'react';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { StadiumStateProvider, useStadiumState } from './context/StadiumStateContext';
import { AccessibilityBar } from './components/accessibility/AccessibilityBar';
import { TelemetryHUD } from './components/common/TelemetryHUD';
import { Header } from './components/common/Header';
import { ApiKeyModal } from './components/common/ApiKeyModal';
import { FanDashboard } from './components/fan/FanDashboard';
import { OpsCommandCenter } from './components/ops/OpsCommandCenter';
import { ShieldCheck, Sparkles, Globe2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { userMode } = useStadiumState();

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {userMode === 'fan' ? <FanDashboard /> : <OpsCommandCenter />}
    </main>
  );
};

export function App() {
  return (
    <AccessibilityProvider>
      <StadiumStateProvider>
        <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
          <AccessibilityBar />
          <TelemetryHUD />
          <Header />
          <ApiKeyModal />

          <div className="flex-1">
            <MainContent />
          </div>

          {/* Footer */}
          <footer className="glass-panel border-t border-white/10 mt-12 py-6 px-4 text-xs text-slate-400">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  ApexArena OS © 2026 FIFA World Cup Smart Stadium Solution • Built for Hack2Skill PromptWar 4
                </span>
              </div>

              <div className="flex items-center gap-4 text-slate-300">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Powered by Google Gemini
                </span>
                <span className="flex items-center gap-1">
                  <Globe2 className="w-3.5 h-3.5 text-blue-400" /> Multilingual Speech-to-Speech
                </span>
              </div>
            </div>
          </footer>
        </div>
      </StadiumStateProvider>
    </AccessibilityProvider>
  );
}

export default App;
