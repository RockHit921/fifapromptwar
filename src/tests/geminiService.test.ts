import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStoredApiKey,
  setStoredApiKey,
  askMultilingualAssistant,
  generatePAAnnouncement,
  analyzeCCTVImage,
} from '../services/geminiService';

describe('Gemini Service & Fallback Engine', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and retrieves Gemini API key from localStorage', () => {
    expect(getStoredApiKey()).toBe('');
    setStoredApiKey('AIzaSyTestKey123');
    expect(getStoredApiKey()).toBe('AIzaSyTestKey123');
  });

  it('returns structured demo assistant response when no API key is present', async () => {
    const res = await askMultilingualAssistant('Which gate has the shortest line?', 'English', 'MetLife Stadium');
    expect(res.source).toBe('demo');
    expect(res.text).toContain('Gate A North Express');
  });

  it('generates multilingual PA announcements with fallback structure', async () => {
    const res = await generatePAAnnouncement('Gate Congestion', 'Gate C', 'Reroute to Gate A', ['English', 'Spanish']);
    expect(res).toHaveProperty('English');
    expect(res).toHaveProperty('Spanish');
    expect(res.English).toContain('Gate C');
  });

  it('analyzes CCTV image SVG and outputs VisionAnalysisResult schema', async () => {
    const dummySvg = 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=';
    const result = await analyzeCCTVImage(dummySvg, 'Gate C');
    expect(result).toHaveProperty('crowdDensity');
    expect(result).toHaveProperty('safetyScore');
    expect(result.aiRecommendations.length).toBeGreaterThan(0);
  });
});
