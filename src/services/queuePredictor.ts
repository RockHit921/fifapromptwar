import type { StadiumGate } from '../types';

/**
 * Calculates real-time gate wait time in minutes
 * @param queueLength Number of people in line
 * @param activeScanners Number of active turnstiles/scanners
 * @param averageScanSeconds Average seconds per ticket scan (default: 4.5s)
 */
export function calculateGateWaitTime(
  queueLength: number,
  activeScanners: number,
  averageScanSeconds: number = 4.5
): number {
  if (activeScanners <= 0) return 999; // Gate closed
  const peoplePerScanner = queueLength / activeScanners;
  const totalSeconds = peoplePerScanner * averageScanSeconds;
  return Math.ceil(totalSeconds / 60);
}

/**
 * Predicts concession queue wait time
 */
export function calculateConcessionWaitTime(
  ordersInQueue: number,
  staffCount: number
): number {
  if (staffCount <= 0) return 45;
  const avgPrepTimeMin = 1.8; // average 1.8 mins per order
  return Math.ceil((ordersInQueue * avgPrepTimeMin) / staffCount);
}

/**
 * Returns gate queue status badge class & text
 */
export function getQueueStatusCategory(waitMinutes: number): {
  status: 'optimal' | 'moderate' | 'congested' | 'emergency';
  label: string;
  colorClass: string;
} {
  if (waitMinutes <= 4) {
    return { status: 'optimal', label: 'Optimal (<5m)', colorClass: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40' };
  } else if (waitMinutes <= 12) {
    return { status: 'moderate', label: 'Moderate (5-12m)', colorClass: 'text-amber-400 bg-amber-950/60 border-amber-500/40' };
  } else if (waitMinutes <= 25) {
    return { status: 'congested', label: 'Congested (12-25m)', colorClass: 'text-orange-400 bg-orange-950/60 border-orange-500/40' };
  } else {
    return { status: 'emergency', label: 'Critical (>25m)', colorClass: 'text-red-400 bg-red-950/60 border-red-500/40' };
  }
}

/**
 * Recommends alternative gate for a fan given current location and gate wait times
 */
export function findBestAlternativeGate(
  currentGateId: string,
  gates: StadiumGate[]
): StadiumGate | null {
  const alternativeGates = gates.filter((g) => g.id !== currentGateId && g.status !== 'emergency');
  if (alternativeGates.length === 0) return null;

  return alternativeGates.reduce((best, current) => {
    return current.currentWaitMinutes < best.currentWaitMinutes ? current : best;
  }, alternativeGates[0]);
}
