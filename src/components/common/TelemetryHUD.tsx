import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Zap, Radio, Volume2 } from 'lucide-react';

export const TelemetryHUD: React.FC = () => {
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(42);
  const [activeSensors, setActiveSensors] = useState(128);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const checkFps = () => {
      frameCount++;
      const now = performance.now();
      if (now >= lastTime + 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(checkFps);
    };

    const animId = requestAnimationFrame(checkFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Subtle telemetry variance simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLatency(38 + Math.floor(Math.random() * 12));
      setActiveSensors(124 + Math.floor(Math.random() * 8));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-950/80 border-b border-white/5 px-4 py-1 text-[11px] font-mono text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-bold text-emerald-400">
            <Activity className="w-3 h-3 animate-pulse" /> TELEMETRY ACTIVE
          </span>
          <span className="text-slate-700">|</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Cpu className="w-3 h-3 text-blue-400" /> System FPS: <span className="text-white font-bold">{fps}</span>
          </span>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="hidden sm:flex items-center gap-1 text-slate-300">
            <Zap className="w-3 h-3 text-amber-400" /> GenAI Latency: <span className="text-amber-300 font-bold">{latency}ms</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-300">
            <Radio className="w-3 h-3 text-emerald-400" /> IoT Sensors: <span className="text-white font-bold">{activeSensors} Online</span>
          </span>
          <span className="text-slate-700 hidden md:inline">|</span>
          <span className="hidden md:flex items-center gap-1 text-slate-300">
            <Volume2 className="w-3 h-3 text-purple-400" /> Web Audio Beacon: <span className="text-emerald-400 font-bold">Ready</span>
          </span>
        </div>
      </div>
    </div>
  );
};
