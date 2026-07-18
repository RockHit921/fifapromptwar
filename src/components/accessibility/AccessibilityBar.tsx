import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useStadiumState } from '../../context/StadiumStateContext';
import { parseVoiceCommand } from '../../services/voiceCommandService';
import { createSpeechRecognizer } from '../../services/speechService';
import { audioBeacon } from '../../services/audioBeaconService';
import { Eye, Type, Sparkles, Mic, Palette } from 'lucide-react';

export const AccessibilityBar: React.FC = () => {
  const {
    highContrast,
    toggleHighContrast,
    dyslexiaFont,
    toggleDyslexiaFont,
    fontSize,
    setFontSize,
    announceForScreenReader,
  } = useAccessibility();

  const { setUserMode, selectedLanguage } = useStadiumState();
  const [colorBlindFilter, setColorBlindFilter] = useState<string>('none');
  const [isListeningCommand, setIsListeningCommand] = useState(false);

  const handleColorFilterChange = (filter: string) => {
    setColorBlindFilter(filter);
    document.documentElement.style.filter =
      filter === 'protanopia'
        ? 'sepia(0.6) hue-rotate(-20deg) contrast(1.1)'
        : filter === 'deuteranopia'
        ? 'sepia(0.5) hue-rotate(180deg)'
        : filter === 'tritanopia'
        ? 'sepia(0.5) hue-rotate(240deg)'
        : 'none';

    announceForScreenReader(`Color blindness filter set to ${filter}`);
  };

  const handleVoiceCommand = () => {
    setIsListeningCommand(true);
    audioBeacon.playBeacon(880, 100);

    const recognizer = createSpeechRecognizer(
      selectedLanguage,
      (transcript) => {
        setIsListeningCommand(false);
        const match = parseVoiceCommand(transcript);
        announceForScreenReader(match.feedbackMessage);

        if (match.action === 'SWITCH_MODE' && match.targetValue) {
          setUserMode(match.targetValue as any);
        } else if (match.action === 'TOGGLE_HIGH_CONTRAST') {
          toggleHighContrast();
        } else if (match.action === 'TOGGLE_DYSLEXIA') {
          toggleDyslexiaFont();
        } else if (match.action === 'PLAY_BEACON') {
          audioBeacon.playBeacon(1000, 200);
        } else if (match.action === 'SELECT_GATE') {
          audioBeacon.playSuccessChime();
        }
      },
      (err) => {
        setIsListeningCommand(false);
        console.warn('Voice command err:', err);
      }
    );

    if (recognizer.isSupported) {
      recognizer.start();
    } else {
      setIsListeningCommand(false);
      alert('Voice recognition not supported in this browser.');
    }
  };

  return (
    <div
      role="region"
      aria-label="Accessibility settings toolbar"
      className="bg-slate-950/90 border-b border-white/10 px-4 py-1.5 text-xs text-slate-300"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-bold text-amber-400 uppercase tracking-wider text-[10px]">
            <Sparkles className="w-3 h-3" /> Inclusive Assistive Suite
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            WCAG 2.1 AA Compliant • Sound Beacons & Voice Directives
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Hands-free Voice Directive Listener */}
          <button
            onClick={handleVoiceCommand}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold border transition ${
              isListeningCommand
                ? 'bg-red-600 text-white border-red-400 animate-pulse'
                : 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
            }`}
            title="Click and speak a command (e.g. 'Switch to Security Mode', 'Gate A')"
          >
            <Mic className="w-3 h-3" />
            <span>{isListeningCommand ? 'Listening Command...' : 'Voice Directive'}</span>
          </button>

          {/* Color Blindness Palette Selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-white/10 rounded px-1.5 py-0.5">
            <Palette className="w-3 h-3 text-blue-400" />
            <select
              value={colorBlindFilter}
              onChange={(e) => handleColorFilterChange(e.target.value)}
              className="bg-transparent text-[10px] text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="none" className="bg-slate-900">Normal Color</option>
              <option value="protanopia" className="bg-slate-900">Protanopia (Red Filter)</option>
              <option value="deuteranopia" className="bg-slate-900">Deuteranopia (Green Filter)</option>
              <option value="tritanopia" className="bg-slate-900">Tritanopia (Blue Filter)</option>
            </select>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={() => {
              toggleHighContrast();
              announceForScreenReader(`High contrast mode ${!highContrast ? 'enabled' : 'disabled'}`);
            }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border transition ${
              highContrast
                ? 'bg-yellow-400 text-black border-yellow-500 font-bold'
                : 'bg-slate-900 border-white/10 text-slate-300 hover:text-white'
            }`}
            aria-pressed={highContrast}
          >
            <Eye className="w-3 h-3" />
            <span>High Contrast</span>
          </button>

          {/* Dyslexic Font Toggle */}
          <button
            onClick={() => {
              toggleDyslexiaFont();
              announceForScreenReader(`Dyslexia friendly font ${!dyslexiaFont ? 'enabled' : 'disabled'}`);
            }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border transition ${
              dyslexiaFont
                ? 'bg-purple-500/30 border-purple-400 text-purple-200'
                : 'bg-slate-900 border-white/10 text-slate-300 hover:text-white'
            }`}
            aria-pressed={dyslexiaFont}
          >
            <Type className="w-3 h-3" />
            <span>OpenDyslexic</span>
          </button>

          {/* Text Resizer */}
          <div className="flex items-center gap-1 bg-slate-900 border border-white/10 rounded px-1.5 py-0.5">
            <span className="text-[10px] text-slate-400 font-bold mr-1">Text:</span>
            <button
              onClick={() => {
                setFontSize('normal');
                announceForScreenReader('Font size set to normal');
              }}
              className={`px-1 rounded text-[10px] font-bold ${fontSize === 'normal' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              A
            </button>
            <button
              onClick={() => {
                setFontSize('large');
                announceForScreenReader('Font size set to large');
              }}
              className={`px-1 rounded text-[11px] font-bold ${fontSize === 'large' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              A+
            </button>
            <button
              onClick={() => {
                setFontSize('xlarge');
                announceForScreenReader('Font size set to extra large');
              }}
              className={`px-1 rounded text-[12px] font-bold ${fontSize === 'xlarge' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              A++
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
