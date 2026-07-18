/**
 * @fileoverview Application-wide constants.
 */

/** Queue size thresholds for different congestion levels. */
export const QUEUE_THRESHOLDS = {
  OPTIMAL: 4,
  MODERATE: 12,
  CONGESTED: 25,
};

/** Gate wait time thresholds in minutes. */
export const GATE_WAIT_THRESHOLDS = {
  MODERATE: 5,
  CONGESTED: 12,
  EMERGENCY: 20,
};

/** Global simulation tick interval in milliseconds. */
export const SIMULATION_TICK_MS = 20000;

/** Default scanning duration in seconds. */
export const DEFAULT_SCAN_SECONDS = 4.5;

/** Default preparation time in minutes. */
export const DEFAULT_PREP_TIME_MIN = 1.8;

/** Frequencies used for various audio beacons (Hz). */
export const BEACON_FREQUENCIES = {
  C5: 523.25,
  E5: 659.25,
  G5: 783.99,
  ALERT: 300,
  NAVIGATION: 880,
};

/** Audio beacon durations in milliseconds. */
export const BEACON_DURATIONS = {
  SHORT: 120,
  MEDIUM: 150,
  LONG: 200,
};

/** Initial audio gain for beacons. */
export const AUDIO_GAIN_INITIAL = 0.15;

/** Final audio gain for beacons. */
export const AUDIO_GAIN_FINAL = 0.001;

/** Mapping of language names to their BCP 47 language tags. */
export const LANGUAGE_TAGS: Record<string, string> = {
  English: 'en-US',
  Spanish: 'es-ES',
  French: 'fr-FR',
  German: 'de-DE',
  Chinese: 'zh-CN',
  Japanese: 'ja-JP',
  Korean: 'ko-KR',
  Italian: 'it-IT',
  Portuguese: 'pt-BR',
  Russian: 'ru-RU',
  Hindi: 'hi-IN',
};

/** Array of supported language names. */
export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_TAGS);

/** Maximum word count for assistant responses. */
export const MAX_ASSISTANT_RESPONSE_WORDS = 120;

/** Regular expression pattern for validating API keys. */
export const API_KEY_PATTERN = /^AIzaSy[A-Za-z0-9_-]{33}$/;

/** Model name used for the Gemini API. */
export const GEMINI_MODEL_NAME = 'gemini-2.5-flash';

/** Name of the application. */
export const APP_NAME = 'ApexArena 2026';

/** Maximum cache age in minutes. */
export const CACHE_MAX_AGE_MINUTES = 10;

/** Color classes used for queue statuses. */
export const QUEUE_STATUS_COLORS = {
  OPTIMAL: 'text-green-500',
  MODERATE: 'text-yellow-500',
  CONGESTED: 'text-red-500',
  EMERGENCY: 'text-red-700 animate-pulse',
};
