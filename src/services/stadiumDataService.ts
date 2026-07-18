import type { StadiumInfo, StadiumId, IncidentAlert, EcoReward } from '../types';

export const STADIUM_PROFILES: Record<StadiumId, StadiumInfo> = {
  metlife: {
    id: 'metlife',
    name: 'MetLife Stadium (New York / New Jersey)',
    location: 'East Rutherford, NJ, USA',
    capacity: 82500,
    matchToday: {
      homeTeam: 'USA',
      awayTeam: 'Brazil',
      kickoff: '20:00 EST',
      stage: 'FIFA World Cup 2026 - Quarter Final',
      expectedAttendance: 81200,
    },
    gates: [
      { id: 'gate-a', name: 'Gate A (North Express)', status: 'optimal', currentWaitMinutes: 3, throughputPerMin: 140, accessible: true, latitude: 40.814, longitude: -74.074 },
      { id: 'gate-b', name: 'Gate B (East VIP & Family)', status: 'moderate', currentWaitMinutes: 9, throughputPerMin: 95, accessible: true, latitude: 40.813, longitude: -74.072 },
      { id: 'gate-c', name: 'Gate C (South General)', status: 'congested', currentWaitMinutes: 18, throughputPerMin: 180, accessible: false, latitude: 40.811, longitude: -74.074 },
      { id: 'gate-d', name: 'Gate D (West Transit Hub)', status: 'optimal', currentWaitMinutes: 4, throughputPerMin: 160, accessible: true, latitude: 40.813, longitude: -74.076 },
    ],
    concessions: [
      { id: 'conc-1', name: 'Liberty BBQ & Grill', sector: 'Section 104', category: 'Food & Drinks', waitTimeMinutes: 12, popularItem: 'Pull-Pork Sliders', isEcoCertified: true },
      { id: 'conc-2', name: 'Green pitch Vegan Tacos', sector: 'Section 118', category: 'Halal / Vegan', waitTimeMinutes: 4, popularItem: 'Plant-Based Birria', isEcoCertified: true },
      { id: 'conc-3', name: 'World Cup Official Merch', sector: 'Plaza South', category: 'Merchandise', waitTimeMinutes: 22, popularItem: 'Matchday Jersey', isEcoCertified: false },
      { id: 'conc-4', name: 'Hydration Station #3', sector: 'Section 220', category: 'Beverages', waitTimeMinutes: 2, popularItem: 'Electrolyte Refill', isEcoCertified: true },
    ],
    restrooms: [
      { id: 'rest-1', sector: 'Section 105', type: 'Accessible', waitTimeMinutes: 3, cleanlinessScore: 94 },
      { id: 'rest-2', sector: 'Section 112', type: 'All-Gender', waitTimeMinutes: 5, cleanlinessScore: 88 },
      { id: 'rest-3', sector: 'Section 204', type: 'Standard Women', waitTimeMinutes: 14, cleanlinessScore: 82 },
      { id: 'rest-4', sector: 'Section 206', type: 'Standard Men', waitTimeMinutes: 6, cleanlinessScore: 90 },
    ]
  },
  azteca: {
    id: 'azteca',
    name: 'Estadio Azteca (Mexico City)',
    location: 'Mexico City, Mexico',
    capacity: 87523,
    matchToday: {
      homeTeam: 'Mexico',
      awayTeam: 'Germany',
      kickoff: '18:00 CST',
      stage: 'FIFA World Cup 2026 - Opening Match',
      expectedAttendance: 86900,
    },
    gates: [
      { id: 'az-gate-1', name: 'Acceso Calzada de Tlalpan', status: 'congested', currentWaitMinutes: 22, throughputPerMin: 210, accessible: true, latitude: 19.302, longitude: -99.150 },
      { id: 'az-gate-2', name: 'Acceso Insurgentes Sur', status: 'optimal', currentWaitMinutes: 5, throughputPerMin: 165, accessible: true, latitude: 19.305, longitude: -99.152 },
      { id: 'az-gate-3', name: 'Acceso Acoxpa', status: 'moderate', currentWaitMinutes: 11, throughputPerMin: 130, accessible: false, latitude: 19.300, longitude: -99.148 },
    ],
    concessions: [
      { id: 'az-conc-1', name: 'Tacos Al Pastor Azteca', sector: 'Nivel 100', category: 'Food & Drinks', waitTimeMinutes: 15, popularItem: 'Tacos de Trompo', isEcoCertified: true },
      { id: 'az-conc-2', name: 'Agua Fresca Orgánica', sector: 'Nivel 200', category: 'Beverages', waitTimeMinutes: 3, popularItem: 'Horchata Natural', isEcoCertified: true },
    ],
    restrooms: [
      { id: 'az-rest-1', sector: 'Nivel 100 Norte', type: 'Accessible', waitTimeMinutes: 4, cleanlinessScore: 92 },
      { id: 'az-rest-2', sector: 'Nivel 200 Sur', type: 'All-Gender', waitTimeMinutes: 7, cleanlinessScore: 86 },
    ]
  },
  bcplace: {
    id: 'bcplace',
    name: 'BC Place (Vancouver)',
    location: 'Vancouver, BC, Canada',
    capacity: 54500,
    matchToday: {
      homeTeam: 'Canada',
      awayTeam: 'Japan',
      kickoff: '17:00 PST',
      stage: 'FIFA World Cup 2026 - Group Stage',
      expectedAttendance: 53800,
    },
    gates: [
      { id: 'bc-gate-a', name: 'Robson Gate', status: 'optimal', currentWaitMinutes: 2, throughputPerMin: 120, accessible: true, latitude: 49.276, longitude: -123.111 },
      { id: 'bc-gate-b', name: 'Beatty Gate', status: 'optimal', currentWaitMinutes: 4, throughputPerMin: 110, accessible: true, latitude: 49.277, longitude: -123.109 },
    ],
    concessions: [
      { id: 'bc-conc-1', name: 'Pacific Salmon Poutine', sector: 'Concourse Level 2', category: 'Food & Drinks', waitTimeMinutes: 8, popularItem: 'Maple Salmon Box', isEcoCertified: true }
    ],
    restrooms: [
      { id: 'bc-rest-1', sector: 'Gate A Concourse', type: 'Accessible', waitTimeMinutes: 2, cleanlinessScore: 98 }
    ]
  },
  arrowhead: {
    id: 'arrowhead',
    name: 'Arrowhead Stadium (Kansas City)',
    location: 'Kansas City, MO, USA',
    capacity: 76416,
    matchToday: {
      homeTeam: 'Argentina',
      awayTeam: 'France',
      kickoff: '19:00 CST',
      stage: 'FIFA World Cup 2026 - Round of 16',
      expectedAttendance: 76000,
    },
    gates: [
      { id: 'kc-gate-1', name: 'Lamar Hunt Gate', status: 'moderate', currentWaitMinutes: 10, throughputPerMin: 150, accessible: true, latitude: 39.048, longitude: -94.483 },
      { id: 'kc-gate-2', name: 'Founder Plaza Gate', status: 'optimal', currentWaitMinutes: 4, throughputPerMin: 140, accessible: true, latitude: 39.049, longitude: -94.481 },
    ],
    concessions: [
      { id: 'kc-conc-1', name: 'KC Smokehouse BBQ', sector: 'Main Concourse 120', category: 'Food & Drinks', waitTimeMinutes: 14, popularItem: 'Brisket Sandwich', isEcoCertified: true }
    ],
    restrooms: [
      { id: 'kc-rest-1', sector: 'Section 124', type: 'Accessible', waitTimeMinutes: 3, cleanlinessScore: 91 }
    ]
  }
};

export const INITIAL_INCIDENTS: IncidentAlert[] = [
  {
    id: 'inc-101',
    timestamp: '20:12 EST',
    location: 'Gate C (South General)',
    type: 'Gate Congestion',
    severity: 'high',
    status: 'active',
    summary: 'Turnstile scanner #4 disconnected. Queue wait surged to 18 mins.',
    recommendedAction: 'Reroute incoming spectators to Gate A North Express via stadium PA & mobile app alert.',
  },
  {
    id: 'inc-102',
    timestamp: '20:05 EST',
    location: 'Section 114 - Row 12',
    type: 'Medical Assist',
    severity: 'medium',
    status: 'investigating',
    summary: 'Spectator reported feeling dizzy. Volunteer #42 on site.',
    recommendedAction: 'Dispatch Mobile Paramedic Unit 3 with hydration pack.',
  },
  {
    id: 'inc-103',
    timestamp: '19:48 EST',
    location: 'Plaza South Concourse',
    type: 'Ticket Scanning Glitch',
    severity: 'low',
    status: 'resolved',
    summary: 'NFC reader firmware patch applied. Scan throughput back to normal.',
    recommendedAction: 'Monitor scan latency for next 15 minutes.',
  }
];

export const INITIAL_ECO_REWARDS: EcoReward[] = [
  {
    id: 'eco-1',
    title: 'Zero-Emission Transit',
    points: 150,
    description: 'Arrived at the stadium using Light Rail, Metro, or Electric Shuttle.',
    iconName: 'Train',
    completed: true,
  },
  {
    id: 'eco-2',
    title: 'Reusable Cup Champion',
    points: 100,
    description: 'Used a souvenir reusable cup at any certified eco concession.',
    iconName: 'CupSoda',
    completed: false,
  },
  {
    id: 'eco-3',
    title: 'Smart Waste Sorting',
    points: 75,
    description: 'Scanned QR code at AI Waste Sorting Bin in Plaza Section 100.',
    iconName: 'Recycle',
    completed: false,
  },
  {
    id: 'eco-4',
    title: 'Off-Peak Gate Entry',
    points: 120,
    description: 'Entered stadium >60 minutes before kickoff to smooth crowd flow.',
    iconName: 'Clock',
    completed: true,
  }
];
