/**
 * Represents the result of parsing a voice command.
 */
export interface VoiceCommandMatch {
  /** The action recognized from the voice command. */
  action: 'SWITCH_MODE' | 'TOGGLE_HIGH_CONTRAST' | 'TOGGLE_DYSLEXIA' | 'SELECT_GATE' | 'PLAY_BEACON' | 'UNKNOWN';
  /** The specific target value associated with the action, if any. */
  targetValue?: string;
  /** A human-readable feedback message describing the action taken. */
  feedbackMessage: string;
}

/**
 * Parses a transcribed speech string and returns the corresponding voice command action.
 * @param {string} speechText - The text transcribed from user speech.
 * @returns {VoiceCommandMatch} The matched command action and feedback message.
 */
export function parseVoiceCommand(speechText: string): VoiceCommandMatch {
  const text = speechText.toLowerCase().trim();

  if (text.includes('security') || text.includes('operations') || text.includes('command center')) {
    return {
      action: 'SWITCH_MODE',
      targetValue: 'ops',
      feedbackMessage: 'Switching view to Security Operations Command Center.',
    };
  }

  if (text.includes('fan') || text.includes('visitor') || text.includes('portal')) {
    return {
      action: 'SWITCH_MODE',
      targetValue: 'fan',
      feedbackMessage: 'Switching view to Fan Experience Portal.',
    };
  }

  if (text.includes('contrast') || text.includes('high contrast')) {
    return {
      action: 'TOGGLE_HIGH_CONTRAST',
      feedbackMessage: 'Toggling High Contrast Accessibility mode.',
    };
  }

  if (text.includes('dyslexia') || text.includes('font')) {
    return {
      action: 'TOGGLE_DYSLEXIA',
      feedbackMessage: 'Toggling Dyslexia-friendly font styling.',
    };
  }

  if (text.includes('gate a')) {
    return {
      action: 'SELECT_GATE',
      targetValue: 'gate-a',
      feedbackMessage: 'Navigating to Gate A North Express.',
    };
  }

  if (text.includes('gate b')) {
    return {
      action: 'SELECT_GATE',
      targetValue: 'gate-b',
      feedbackMessage: 'Navigating to Gate B East VIP.',
    };
  }

  if (text.includes('gate c')) {
    return {
      action: 'SELECT_GATE',
      targetValue: 'gate-c',
      feedbackMessage: 'Navigating to Gate C South General.',
    };
  }

  if (text.includes('audio') || text.includes('beacon') || text.includes('sound')) {
    return {
      action: 'PLAY_BEACON',
      feedbackMessage: 'Emitting navigation acoustic beacon sound.',
    };
  }

  return {
    action: 'UNKNOWN',
    feedbackMessage: `Voice directive "${speechText}" unmapped. Try saying "Switch to Security Mode" or "Navigate to Gate A".`,
  };
}
