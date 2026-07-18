export type UserMode = 'fan' | 'ops';

export type StadiumId = 'metlife' | 'azteca' | 'bcplace' | 'arrowhead';

export interface StadiumInfo {
  id: StadiumId;
  name: string;
  location: string;
  capacity: number;
  gates: StadiumGate[];
  concessions: ConcessionStand[];
  restrooms: RestroomInfo[];
  matchToday: {
    homeTeam: string;
    awayTeam: string;
    kickoff: string;
    stage: string;
    expectedAttendance: number;
  };
}

export interface StadiumGate {
  id: string;
  name: string;
  status: 'optimal' | 'moderate' | 'congested' | 'emergency';
  currentWaitMinutes: number;
  throughputPerMin: number;
  accessible: boolean;
  latitude: number;
  longitude: number;
}

export interface ConcessionStand {
  id: string;
  name: string;
  sector: string;
  category: 'Food & Drinks' | 'Merchandise' | 'Halal / Vegan' | 'Beverages';
  waitTimeMinutes: number;
  popularItem: string;
  isEcoCertified: boolean;
}

export interface RestroomInfo {
  id: string;
  sector: string;
  type: 'All-Gender' | 'Accessible' | 'Standard Men' | 'Standard Women';
  waitTimeMinutes: number;
  cleanlinessScore: number; // 0 to 100
}

export interface IncidentAlert {
  id: string;
  timestamp: string;
  location: string;
  type: 'Crowd Bottleneck' | 'Medical Assist' | 'Lost Child' | 'Ticket Scanning Glitch' | 'Gate Congestion' | 'HVAC Alert';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'investigating' | 'resolved';
  summary: string;
  recommendedAction: string;
}

export interface VisionAnalysisResult {
  crowdDensity: 'Low' | 'Moderate' | 'High' | 'Dangerous Overcrowding';
  estimatedPeopleCount: number;
  hazardDetected: boolean;
  hazardDescription?: string;
  safetyScore: number; // 0 - 100
  aiRecommendations: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  language: string;
  timestamp: string;
  audioUrl?: string;
  intent?: string;
}

export interface EcoReward {
  id: string;
  title: string;
  points: number;
  description: string;
  iconName: string;
  completed: boolean;
}
