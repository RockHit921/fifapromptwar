import { describe, it, expect } from 'vitest';
import { STADIUM_PROFILES, INITIAL_INCIDENTS, INITIAL_ECO_REWARDS } from '../../services/stadiumDataService';

describe('Stadium Data Profiles Service', () => {
  it('contains valid profiles for all 4 FIFA World Cup host venues', () => {
    expect(STADIUM_PROFILES).toHaveProperty('metlife');
    expect(STADIUM_PROFILES).toHaveProperty('azteca');
    expect(STADIUM_PROFILES).toHaveProperty('bcplace');
    expect(STADIUM_PROFILES).toHaveProperty('arrowhead');
  });

  it('ensures each venue has accessible gates and concessions', () => {
    Object.values(STADIUM_PROFILES).forEach((venue) => {
      expect(venue.gates.length).toBeGreaterThan(0);
      expect(venue.concessions.length).toBeGreaterThan(0);
      expect(venue.restrooms.length).toBeGreaterThan(0);
    });
  });

  it('loads initial active venue incidents and eco rewards', () => {
    expect(INITIAL_INCIDENTS.length).toBeGreaterThan(0);
    expect(INITIAL_ECO_REWARDS.length).toBeGreaterThan(0);
  });
});
