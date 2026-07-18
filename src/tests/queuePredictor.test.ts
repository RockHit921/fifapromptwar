import { describe, it, expect } from 'vitest';
import {
  calculateGateWaitTime,
  calculateConcessionWaitTime,
  getQueueStatusCategory,
  findBestAlternativeGate,
} from '../services/queuePredictor';
import type { StadiumGate } from '../types';

describe('Queue Predictor Service', () => {
  it('calculates gate wait time accurately', () => {
    // 120 spectators, 3 active scanners, 4.5 sec avg scan = 180 sec = 3 min
    const wait = calculateGateWaitTime(120, 3, 4.5);
    expect(wait).toBe(3);
  });

  it('returns 999 if active scanners is zero', () => {
    const wait = calculateGateWaitTime(100, 0);
    expect(wait).toBe(999);
  });

  it('calculates concession wait time correctly', () => {
    // 10 orders, 2 staff members, 1.8 min avg = 9 mins
    const wait = calculateConcessionWaitTime(10, 2);
    expect(wait).toBe(9);
  });

  it('categorizes queue statuses into optimal, moderate, congested, and emergency', () => {
    expect(getQueueStatusCategory(3).status).toBe('optimal');
    expect(getQueueStatusCategory(10).status).toBe('moderate');
    expect(getQueueStatusCategory(18).status).toBe('congested');
    expect(getQueueStatusCategory(30).status).toBe('emergency');
  });

  it('finds best alternative gate with lowest wait time', () => {
    const mockGates: StadiumGate[] = [
      { id: 'g1', name: 'Gate 1', status: 'congested', currentWaitMinutes: 20, throughputPerMin: 100, accessible: true, latitude: 0, longitude: 0 },
      { id: 'g2', name: 'Gate 2', status: 'optimal', currentWaitMinutes: 3, throughputPerMin: 150, accessible: true, latitude: 0, longitude: 0 },
      { id: 'g3', name: 'Gate 3', status: 'moderate', currentWaitMinutes: 10, throughputPerMin: 120, accessible: false, latitude: 0, longitude: 0 },
    ];

    const bestAlt = findBestAlternativeGate('g1', mockGates);
    expect(bestAlt).not.toBeNull();
    expect(bestAlt?.id).toBe('g2');
    expect(bestAlt?.currentWaitMinutes).toBe(3);
  });
});
