import React, { useState, useRef, useEffect } from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { askMultilingualAssistant } from '../../services/geminiService';
import { speakText, stopSpeaking, createSpeechRecognizer } from '../../services/speechService';
import type { ChatMessage } from '../../types';
import { Bot, Mic, MicOff, Send, Volume2, VolumeX, Sparkles, User, RefreshCw } from 'lucide-react';

export const MultilingualAssistant: React.FC = () => {
  const { stadium, selectedLanguage } = useStadiumState();
  const { announceForScreenReader } = useAccessibility();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: `⚽ Welcome to ${stadium.name}! I am your ApexArena Assistant. Ask me about gate wait times, concession queues, wheelchair routing, match rules, or eco rewards!`,
      language: selectedLanguage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      language: selectedLanguage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await askMultilingualAssistant(query, selectedLanguage, stadium.name);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.text,
        language: selectedLanguage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      announceForScreenReader(`AI Assistant says: ${res.text}`);

      // Auto TTS if voice mode is enabled
      speakText(res.text, selectedLanguage, () => setIsSpeaking(false));
      setIsSpeaking(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognizer = createSpeechRecognizer(
      selectedLanguage,
      (transcript) => {
        setIsListening(false);
        setInputQuery(transcript);
        handleSend(transcript);
      },
      (err) => {
        console.warn('Speech error:', err);
        setIsListening(false);
      }
    );

    if (recognizer.isSupported) {
      setIsListening(true);
      recognizer.start();
    } else {
      alert('Speech recognition is not supported in this browser environment.');
    }
  };

  const handleToggleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(text, selectedLanguage, () => setIsSpeaking(false));
    }
  };

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              Multilingual GenAI Companion
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h3>
            <p className="text-[11px] text-slate-400">
              Active Lang: <span className="text-amber-300 font-semibold">{selectedLanguage}</span>
            </p>
          </div>
        </div>

        {isSpeaking && (
          <button
            onClick={() => handleToggleSpeak('')}
            className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-xs flex items-center gap-1 animate-pulse"
          >
            <VolumeX className="w-3.5 h-3.5" /> Stop Speech
          </button>
        )}
      </div>

      {/* Quick Prompts Bar */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {[
          '🚀 Fastest Gate?',
          '🌮 Vegan & Halal Food?',
          '♿ Accessible Restrooms?',
          '🌱 Eco Transit Points?',
        ].map((promptText) => (
          <button
            key={promptText}
            onClick={() => handleSend(promptText)}
            className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-white/10 text-[11px] text-slate-300 hover:text-white hover:border-amber-400/50 transition cursor-pointer"
          >
            {promptText}
          </button>
        ))}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[360px] min-h-[260px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-tr-none'
                  : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-tl-none'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1 text-[10px] text-slate-400">
                <span className="font-semibold">{msg.sender === 'user' ? 'You' : 'ApexArena AI'}</span>
                <span>{msg.timestamp}</span>
              </div>

              <p className="whitespace-pre-wrap">{msg.text}</p>

              {msg.sender === 'ai' && (
                <div className="mt-2 flex items-center gap-2 pt-1 border-t border-white/5">
                  <button
                    onClick={() => handleToggleSpeak(msg.text)}
                    className="text-[10px] text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3" /> Listen
                  </button>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
            <span>Consulting Google Gemini Stadium Operations AI...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Field & Mic Controls */}
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
        <button
          onClick={toggleMic}
          className={`p-2.5 rounded-xl border transition-all ${
            isListening
              ? 'bg-red-600 text-white border-red-400 animate-pulse'
              : 'bg-slate-900/90 border-white/10 text-slate-300 hover:text-white hover:border-amber-400'
          }`}
          title={isListening ? 'Listening... Click to stop' : 'Click to speak query'}
          aria-label="Voice input microphone"
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Ask in ${selectedLanguage}... (e.g. Where is gate A?)`}
          className="flex-1 bg-slate-900/90 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputQuery.trim() || loading}
          className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 disabled:opacity-40 transition"
          aria-label="Send query"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
