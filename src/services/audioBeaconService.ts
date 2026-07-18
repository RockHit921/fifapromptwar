/**
 * Web Audio API Sound Beacon Synthesizer
 * Provides acoustic feedback for accessible navigation & venue alerts
 */

import {
  BEACON_FREQUENCIES,
  BEACON_DURATIONS,
  AUDIO_GAIN_INITIAL,
  AUDIO_GAIN_FINAL
} from '../constants';

/**
 * Web Audio API Sound Beacon Synthesizer.
 * Provides acoustic feedback for accessible navigation & venue alerts.
 */
export class AudioBeaconService {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  /**
   * Plays a customizable audio beacon beep.
   * @param {number} [pitchFrequency=BEACON_FREQUENCIES.NAVIGATION] - The frequency of the beep in Hz.
   * @param {number} [durationMs=BEACON_DURATIONS.MEDIUM] - The duration of the beep in milliseconds.
   */
  public playBeacon(
    pitchFrequency: number = BEACON_FREQUENCIES.NAVIGATION,
    durationMs: number = BEACON_DURATIONS.MEDIUM
  ): void {
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = pitchFrequency;

      gain.gain.setValueAtTime(AUDIO_GAIN_INITIAL, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(AUDIO_GAIN_FINAL, this.ctx.currentTime + durationMs / 1000);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + durationMs / 1000);
    } catch (e) {
      console.warn('Audio beacon playback unavailable:', e);
    }
  }

  /**
   * Plays a success chime, typically for ticket validation or eco points reward.
   */
  public playSuccessChime(): void {
    this.playBeacon(BEACON_FREQUENCIES.C5, BEACON_DURATIONS.SHORT);
    setTimeout(() => this.playBeacon(BEACON_FREQUENCIES.E5, BEACON_DURATIONS.SHORT), 100);
    setTimeout(() => this.playBeacon(BEACON_FREQUENCIES.G5, BEACON_DURATIONS.LONG), 200);
  }

  /**
   * Plays an alert acoustic signal for congested gates or emergency incidents.
   */
  public playAlertSignal(): void {
    this.playBeacon(BEACON_FREQUENCIES.ALERT, BEACON_DURATIONS.MEDIUM);
    setTimeout(() => this.playBeacon(BEACON_FREQUENCIES.ALERT, BEACON_DURATIONS.MEDIUM), 200);
  }

  /**
   * Stops any ongoing audio beacon playback immediately.
   * Actually not fully implemented as oscillators aren't tracked, but placeholder.
   */
  public stopBeacon(): void {
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend();
      setTimeout(() => this.ctx?.resume(), 100);
    }
  }
}

export const audioBeaconService = new AudioBeaconService();

/** @deprecated Use audioBeaconService instead */
export const audioBeacon = audioBeaconService;
