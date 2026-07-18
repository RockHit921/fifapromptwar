import React, { useState } from 'react';
import { analyzeCCTVImage } from '../../services/geminiService';
import type { VisionAnalysisResult } from '../../types';
import { Eye, AlertTriangle, Sparkles, Upload, RefreshCw, CheckCircle2, Target } from 'lucide-react';

export const VisionAnalyzer: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<string>('gate-c-crowd');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<VisionAnalysisResult | null>(null);

  // Sample SVG Data URLs representing CCTV frames
  const PRESET_FEEDS: Record<string, { name: string; svgData: string }> = {
    'gate-c-crowd': {
      name: 'Gate C South Turnstile CCTV (Heavy Surge)',
      svgData: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%230f172a"/><text x="20" y="30" fill="%23ef4444" font-family="sans-serif" font-size="12" font-weight="bold">CAM-04 GATE C SOUTH [LIVE 20:14:02]</text><rect x="40" y="70" width="320" height="140" fill="%231e293b" stroke="%23ef4444" stroke-width="2"/><g fill="%23ef4444"><circle cx="80" cy="100" r="10"/><circle cx="110" cy="105" r="10"/><circle cx="140" cy="95" r="10"/><circle cx="170" cy="110" r="10"/><circle cx="200" cy="100" r="10"/><circle cx="230" cy="105" r="10"/><circle cx="260" cy="98" r="10"/><circle cx="290" cy="110" r="10"/><circle cx="95" cy="135" r="10"/><circle cx="125" cy="140" r="10"/><circle cx="155" cy="130" r="10"/><circle cx="185" cy="145" r="10"/><circle cx="215" cy="135" r="10"/><circle cx="245" cy="140" r="10"/><circle cx="275" cy="130" r="10"/><circle cx="110" cy="170" r="10"/><circle cx="140" cy="175" r="10"/><circle cx="170" cy="165" r="10"/><circle cx="200" cy="180" r="10"/><circle cx="230" cy="170" r="10"/></g><text x="200" y="230" fill="%23f87171" font-family="sans-serif" font-size="11" text-anchor="middle">WARNING: DENSE CROWD BACKLOG AT TURNSTILES 1-4</text></svg>`,
    },
    'gate-a-normal': {
      name: 'Gate A North Express CCTV (Smooth Flow)',
      svgData: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%230f172a"/><text x="20" y="30" fill="%2310b981" font-family="sans-serif" font-size="12" font-weight="bold">CAM-01 GATE A NORTH [LIVE 20:14:02]</text><rect x="40" y="70" width="320" height="140" fill="%231e293b" stroke="%2310b981" stroke-width="2"/><g fill="%2310b981"><circle cx="100" cy="110" r="10"/><circle cx="180" cy="130" r="10"/><circle cx="260" cy="115" r="10"/></g><text x="200" y="230" fill="%2334d399" font-family="sans-serif" font-size="11" text-anchor="middle">OPTIMAL THROUGHPUT - NO BOTTLENECKS DETECTED</text></svg>`,
    },
  };

  const currentSvg = customImage || PRESET_FEEDS[selectedPreset].svgData;

  const handleRunVisionAI = async () => {
    setLoading(true);
    setAnalysisResult(null);
    try {
      const locationName = customImage ? 'Uploaded CCTV Feed' : PRESET_FEEDS[selectedPreset].name;
      const res = await analyzeCCTVImage(currentSvg, locationName);
      setAnalysisResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          setAnalysisResult(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              Gemini Vision CCTV Safety Auditor
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            </h3>
            <p className="text-[11px] text-slate-400">Multimodal AI crowd & hazard inspection</p>
          </div>
        </div>
      </div>

      {/* CCTV Selector & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-lg p-1">
          <button
            onClick={() => {
              setCustomImage(null);
              setSelectedPreset('gate-c-crowd');
              setAnalysisResult(null);
            }}
            className={`px-2.5 py-1 rounded text-xs font-semibold ${
              !customImage && selectedPreset === 'gate-c-crowd'
                ? 'bg-red-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Gate C (Surge)
          </button>
          <button
            onClick={() => {
              setCustomImage(null);
              setSelectedPreset('gate-a-normal');
              setAnalysisResult(null);
            }}
            className={`px-2.5 py-1 rounded text-xs font-semibold ${
              !customImage && selectedPreset === 'gate-a-normal'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Gate A (Normal)
          </button>
        </div>

        <label className="px-3 py-1 rounded-lg bg-slate-900 border border-white/10 text-xs text-slate-300 hover:text-white hover:border-amber-400 transition cursor-pointer flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5 text-amber-400" />
          <span>Upload CCTV Image</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* CCTV Preview Container with Interactive Bounding Box Overlay */}
      <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
        <img
          src={currentSvg}
          alt="CCTV Camera Frame"
          className="w-full h-full object-cover"
        />

        {/* Gemini Vision AI Bounding Box Annotations */}
        {analysisResult && (
          <div className="absolute inset-0 pointer-events-none p-4">
            {analysisResult.hazardDetected ? (
              <div className="absolute top-12 left-16 right-16 bottom-10 border-2 border-dashed border-red-500 bg-red-500/10 rounded-lg animate-pulse flex items-start justify-between p-2">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-md">
                  <Target className="w-3 h-3" /> HAZARD #1: OVERCROWDED BOTTLENECK
                </span>
                <span className="text-red-300 text-[10px] font-mono font-bold bg-slate-950/80 px-1.5 py-0.5 rounded">
                  EST. {analysisResult.estimatedPeopleCount} FANS
                </span>
              </div>
            ) : (
              <div className="absolute top-14 left-20 right-20 bottom-12 border-2 border-emerald-500 bg-emerald-500/10 rounded-lg flex items-start justify-between p-2">
                <span className="bg-emerald-600 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> OPTIMAL FLOW VERIFIED
                </span>
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
            <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />
            <span className="text-xs text-amber-300 font-semibold">
              Gemini Vision AI is inspecting frame bounding vectors...
            </span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={handleRunVisionAI}
        disabled={loading}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-emerald-600 to-amber-500 font-bold text-slate-950 text-xs hover:opacity-90 shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span>Inspect Frame with Google Gemini Vision</span>
      </button>

      {/* Vision Analysis Output Card */}
      {analysisResult && (
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/15 space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold">Safety Score:</span>
              <span
                className={`font-extrabold text-sm ${
                  analysisResult.safetyScore >= 80
                    ? 'text-emerald-400'
                    : analysisResult.safetyScore >= 60
                    ? 'text-amber-400'
                    : 'text-red-400'
                }`}
              >
                {analysisResult.safetyScore} / 100
              </span>
            </div>

            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                analysisResult.hazardDetected
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {analysisResult.crowdDensity} Density
            </span>
          </div>

          {analysisResult.hazardDetected && (
            <div className="flex items-start gap-2 text-xs text-red-300 bg-red-950/40 border border-red-500/30 p-2.5 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Hazard Detected:</span>
                <p className="mt-0.5 text-slate-300">{analysisResult.hazardDescription}</p>
              </div>
            </div>
          )}

          <div>
            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              AI Security Recommendations:
            </h5>
            <ul className="space-y-1">
              {analysisResult.aiRecommendations.map((rec, idx) => (
                <li key={idx} className="text-xs text-slate-200 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
