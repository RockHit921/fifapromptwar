import { LANGUAGE_TAGS } from '../constants';

/**
 * Text-to-Speech (TTS) Announcement service. Synthesizes and plays spoken text.
 * @param {string} text - The text to be spoken.
 * @param {string} [language='English'] - The language name (e.g., 'English', 'Spanish').
 * @param {() => void} [onEnd] - Optional callback triggered when speech ends.
 * @returns {boolean} True if speech synthesis is supported and initiated, false otherwise.
 */
export function speakText(
  text: string,
  language: string = 'English',
  onEnd?: () => void
): boolean {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const langTag = LANGUAGE_TAGS[language] || 'en-US';
  utterance.lang = langTag;
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  // Attempt to select a voice matching language tag
  const voices = window.speechSynthesis.getVoices();
  const matchingVoice = voices.find((v) => v.lang.startsWith(langTag.slice(0, 2)));
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return true;
}

/**
 * Stops any ongoing text-to-speech synthesis immediately.
 */
export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Speech-to-Text (STT) Recognition service. Creates a speech recognition instance.
 * @param {string} [language='English'] - The expected spoken language.
 * @param {(transcript: string) => void} onResult - Callback receiving the transcribed text.
 * @param {(error: string) => void} onError - Callback receiving error messages.
 * @returns {{ start: () => void; stop: () => void; isSupported: boolean }} An object with methods to start/stop recognition and a support flag.
 */
export function createSpeechRecognizer(
  language: string = 'English',
  onResult: (transcript: string) => void,
  onError: (error: string) => void
): { start: () => void; stop: () => void; isSupported: boolean } {
  // @ts-ignore - Webkit SpeechRecognition fallback
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return {
      start: () => onError('Speech recognition is not supported in your browser.'),
      stop: () => {},
      isSupported: false,
    };
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = LANGUAGE_TAGS[language] || 'en-US';

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    onError(event.error || 'Speech recognition failed.');
  };

  return {
    start: () => recognition.start(),
    stop: () => recognition.stop(),
    isSupported: true,
  };
}
