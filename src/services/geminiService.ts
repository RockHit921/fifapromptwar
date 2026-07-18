import { GoogleGenAI } from '@google/genai';
import type { VisionAnalysisResult, IncidentAlert } from '../types';
import { lruCache } from './cacheService';

// Storage key for user-provided Gemini API key
const GEMINI_API_KEY_STORAGE = 'apexarena_gemini_api_key';

export function getStoredApiKey(): string {
  return localStorage.getItem(GEMINI_API_KEY_STORAGE) || '';
}

export function setStoredApiKey(key: string): void {
  localStorage.setItem(GEMINI_API_KEY_STORAGE, key.trim());
}

/**
 * Gets initialized GoogleGenAI instance or returns null if no key is provided
 */
function getGenAIClient(): GoogleGenAI | null {
  const apiKey = getStoredApiKey() || import.meta.env.VITE_GEMINI_API_KEY || '';
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

/**
 * Fan & Visitor Assistant powered by Google Gemini 2.5/3.5 Flash
 */
export async function askMultilingualAssistant(
  userQuery: string,
  targetLanguage: string = 'English',
  stadiumContext: string = 'MetLife Stadium'
): Promise<{ text: string; source: 'gemini' | 'demo' }> {
  const cacheKey = `assistant:${stadiumContext}:${targetLanguage}:${userQuery.toLowerCase().trim()}`;
  const cached = lruCache.get<{ text: string; source: 'gemini' | 'demo' }>(cacheKey);
  if (cached) {
    return cached;
  }

  const ai = getGenAIClient();

  const systemPrompt = `You are ApexArena, the official FIFA World Cup 2026 Smart Stadium AI Assistant operating at ${stadiumContext}.
You assist fans, families, and visitors with stadium navigation, gate entry wait times, accessible facilities, concession dietary items (Halal, Vegan, Gluten-free), transit options, match rules, and eco-sustainability rewards.
Respond warmly, concisely, and accurately in ${targetLanguage}. Keep answers under 120 words. Include helpful emoji.`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${userQuery}` }] }
        ],
      });

      const responseText = response.text || '';
      if (responseText) {
        const result = { text: responseText, source: 'gemini' as const };
        lruCache.set(cacheKey, result);
        return result;
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to smart demo response:', err);
    }
  }

  // Smart Demo Response Engine (when API key is absent or offline)
  const demoResult = { text: generateDemoAssistantResponse(userQuery, stadiumContext), source: 'demo' as const };
  lruCache.set(cacheKey, demoResult);
  return demoResult;
}

/**
 * Multilingual PA Announcement Generator for Operations Staff
 */
export async function generatePAAnnouncement(
  incidentType: string,
  location: string,
  actionInstruction: string,
  targetLanguages: string[] = ['English', 'Spanish', 'French']
): Promise<Record<string, string>> {
  const ai = getGenAIClient();
  const languagesList = targetLanguages.join(', ');

  const prompt = `You are the Head of Security and Tournament Operations for FIFA World Cup 2026.
Generate a clear, urgent, professional stadium Public Address (PA) broadcast message for the following scenario:
- Incident: ${incidentType}
- Location: ${location}
- Action Required: ${actionInstruction}

Provide the announcement script strictly in JSON format where keys are language names (${languagesList}) and values are the spoken PA text.
Example JSON: { "English": "...", "Spanish": "...", "French": "..." }`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const rawText = response.text || '';
      const cleanJson = rawText.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return parsed;
    } catch (err) {
      console.warn('Gemini PA generation fallback:', err);
    }
  }

  // Fallback demo PA translations
  return {
    English: `Attention spectators near ${location}: ${actionInstruction}. Venue staff are assisting. Thank you for your cooperation.`,
    Spanish: `Atención espectadores cerca de ${location}: ${actionInstruction}. El personal del estadio está asistiendo. Gracias por su cooperación.`,
    French: `Attention aux spectateurs près de ${location}: ${actionInstruction}. Le personnel du stade intervient. Merci de votre coopération.`,
  };
}

/**
 * CCTV Snapshot Multimodal Vision Analysis for Gate Overcrowding and Hazard Detection
 */
export async function analyzeCCTVImage(
  base64Image: string,
  locationName: string = 'Gate C South General'
): Promise<VisionAnalysisResult> {
  const ai = getGenAIClient();

  if (ai) {
    try {
      // Strip header prefix if present
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: base64Data,
                },
              },
              {
                text: `You are an AI Safety & Crowd Analysis Agent evaluating a CCTV camera feed from ${locationName} during FIFA World Cup 2026.
Analyze crowd density, hazard risks (bottlenecks, blocked emergency exits, slips, physical altercations, scanner backlog), estimated person count, safety score (0 to 100), and tactical recommendations for security staff.
Return response STRICTLY in valid JSON matching this schema:
{
  "crowdDensity": "Low" | "Moderate" | "High" | "Dangerous Overcrowding",
  "estimatedPeopleCount": number,
  "hazardDetected": boolean,
  "hazardDescription": "string",
  "safetyScore": number,
  "aiRecommendations": ["string", "string"]
}`,
              },
            ],
          },
        ],
      });

      const rawText = response.text || '';
      const cleanJson = rawText.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanJson) as VisionAnalysisResult;
    } catch (err) {
      console.warn('Gemini Vision analysis fallback:', err);
    }
  }

  // Demo Vision Analysis result
  return {
    crowdDensity: 'High',
    estimatedPeopleCount: 148,
    hazardDetected: true,
    hazardDescription: `Crowd bottleneck detected at turnstiles due to high arrival velocity at ${locationName}.`,
    safetyScore: 68,
    aiRecommendations: [
      'Open auxiliary gate A2 for express digital ticket scanning.',
      'Deploy 4 multilingual stewards to manage line queue formation.',
      'Trigger mobile app alert encouraging fans to use West Transit Gate.',
    ],
  };
}

/**
 * Intelligent Dispatch Playbook Generator for Active Incidents
 */
export async function generateDispatchPlaybook(incident: IncidentAlert): Promise<string> {
  const ai = getGenAIClient();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Generate a step-by-step incident response playbook for FIFA Stadium Command Center.
Incident: ${incident.type} at ${incident.location} (Severity: ${incident.severity}).
Summary: ${incident.summary}
Provide 3 concise tactical action steps for venue volunteers and emergency responders.`,
              },
            ],
          },
        ],
      });
      if (response.text) return response.text;
    } catch (err) {
      console.warn('Playbook generation fallback:', err);
    }
  }

  return `1. Emergency Response Protocol: Dispatch Sector Steward Lead to ${incident.location}.\n2. Crowd Flow Redirection: Activate LED directional signage toward Gate A.\n3. Log & Verify: Confirm resolution with Operations Center within 10 minutes.`;
}

// Fallback logic helper
function generateDemoAssistantResponse(query: string, stadium: string): string {
  const q = query.toLowerCase();

  if (q.includes('gate') || q.includes('entry') || q.includes('line') || q.includes('queue')) {
    return `🏟️ Welcome to ${stadium}! Currently, Gate A North Express has the fastest entry time (under 3 minutes). Gate C is currently experiencing higher volume (~18 mins). We recommend proceeding to Gate A or D for seamless entry!`;
  }
  if (q.includes('food') || q.includes('eat') || q.includes('vegan') || q.includes('halal') || q.includes('drink') || q.includes('tacos')) {
    return `🌮 For food & beverages, Green Pitch Vegan Tacos (Section 118) currently has a 4-minute wait time and offers certified sustainable eco-friendly meals. Liberty BBQ in Section 104 is also highly rated!`;
  }
  if (q.includes('restroom') || q.includes('bathroom') || q.includes('toilet') || q.includes('accessible')) {
    return `♿ Accessible and All-Gender restrooms in Section 105 & 112 are open with clean scores of 94% and minimal wait times (<3 mins). Follow the blue glowing icons on your stadium map!`;
  }
  if (q.includes('transit') || q.includes('bus') || q.includes('train') || q.includes('park') || q.includes('eco')) {
    return `🚆 Taking the Light Rail or Express Shuttle to Gate D earns you 150 Eco-Reward points! Scanners at Gate D can validate your eco-transit pass directly.`;
  }
  return `⚽ Hello! I am your ApexArena Assistant for ${stadium}. I can help you with turn-by-turn gate directions, food queues, accessible facilities, emergency assistance, and match day info. How can I assist your World Cup experience today?`;
}
