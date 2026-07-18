import { describe, it, expect } from 'vitest';
import { parseVoiceCommand } from '../services/voiceCommandService';

describe('Voice Command Service', () => {
  it('parses directives to switch to Security Operations mode', () => {
    const res = parseVoiceCommand('Switch to security operations mode');
    expect(res.action).toBe('SWITCH_MODE');
    expect(res.targetValue).toBe('ops');
  });

  it('parses directives to switch to Fan experience mode', () => {
    const res = parseVoiceCommand('Open fan portal');
    expect(res.action).toBe('SWITCH_MODE');
    expect(res.targetValue).toBe('fan');
  });

  it('parses directives for high contrast accessibility', () => {
    const res = parseVoiceCommand('Turn on high contrast mode');
    expect(res.action).toBe('TOGGLE_HIGH_CONTRAST');
  });

  it('parses directives for gate navigation', () => {
    const res = parseVoiceCommand('Take me to Gate A');
    expect(res.action).toBe('SELECT_GATE');
    expect(res.targetValue).toBe('gate-a');
  });

  it('handles unrecognized speech gracefully', () => {
    const res = parseVoiceCommand('Random unknown phrase 123');
    expect(res.action).toBe('UNKNOWN');
  });
});
