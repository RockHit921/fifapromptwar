import type { StadiumGate } from '../types';
import {
  DEFAULT_SCAN_SECONDS,
  DEFAULT_PREP_TIME_MIN,
  QUEUE_THRESHOLDS
} from '../constants';

/**
 * Calculates the real-time gate wait time in minutes.
 * Uses a basic throughput model based on active scanners and queue length.
 * @param {number} queueLength - The total number of people currently in the line.
 * @param {number} activeScanners - The number of operational turnstiles/scanners.
 * @param {number} [averageScanSeconds=DEFAULT_SCAN_SECONDS] - The average time it takes to scan one ticket.
 * @returns {number} The estimated wait time in minutes (rounded up). Returns 999 if the gate is closed (0 scanners).
 */
export function calculateGateWaitTime(
  queueLength: number,
  activeScanners: number,
  averageScanSeconds: number = DEFAULT_SCAN_SECONDS
): number {
  if (activeScanners <= 0) return 999; // Gate closed
  const peoplePerScanner = queueLength / activeScanners;
  const totalSeconds = peoplePerScanner * averageScanSeconds;
  return Math.ceil(totalSeconds / 60);
}

/**
 * Predicts the concession queue wait time in minutes.
 * @param {number} ordersInQueue - The current number of unfulfilled orders.
 * @param {number} staffCount - The number of active staff members preparing orders.
 * @returns {number} The estimated wait time in minutes (rounded up). Returns 45 if no staff is available.
 */
export function calculateConcessionWaitTime(
  ordersInQueue: number,
  staffCount: number
): number {
  if (staffCount <= 0) return 45;
  return Math.ceil((ordersInQueue * DEFAULT_PREP_TIME_MIN) / staffCount);
}

/**
 * Returns the gate queue status category, including label and UI color class, based on wait time.
 * @param {number} waitMinutes - The calculated wait time in minutes.
 * @returns {{ status: 'optimal' | 'moderate' | 'congested' | 'emergency'; label: string; colorClass: string; }} The categorized status.
 */
export function getQueueStatusCategory(waitMinutes: number): {
  status: 'optimal' | 'moderate' | 'congested' | 'emergency';
  label: string;
  colorClass: string;
} {
  if (waitMinutes <= QUEUE_THRESHOLDS.OPTIMAL) {
    return { status: 'optimal', label: 'Optimal (<5m)', colorClass: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40' };
  } else if (waitMinutes <= QUEUE_THRESHOLDS.MODERATE) {
    return { status: 'moderate', label: 'Moderate (5-12m)', colorClass: 'text-amber-400 bg-amber-950/60 border-amber-500/40' };
  } else if (waitMinutes <= QUEUE_THRESHOLDS.CONGESTED) {
    return { status: 'congested', label: 'Congested (12-25m)', colorClass: 'text-orange-400 bg-orange-950/60 border-orange-500/40' };
  } else {
    return { status: 'emergency', label: 'Critical (>25m)', colorClass: 'text-red-400 bg-red-950/60 border-red-500/40' };
  }
}

/**
 * Recommends the best alternative gate for a fan based on current wait times.
 * Avoids gates that are in an 'emergency' status.
 * @param {string} currentGateId - The ID of the gate the fan is currently at or considering.
 * @param {StadiumGate[]} gates - The list of all available stadium gates.
 * @returns {StadiumGate | null} The alternative gate with the lowest wait time, or null if none are available.
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
