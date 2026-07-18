/**
 * Web Audio API Sound Beacon Synthesizer
 * Provides acoustic feedback for accessible navigation & venue alerts
 */

class AudioBeaconService {
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
   * Plays a pleasant navigation directional beep (High pitch = optimal route)
   */
  public playBeacon(pitchFrequency: number = 880, durationMs: number = 150): void {
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

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationMs / 1000);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + durationMs / 1000);
    } catch (e) {
      console.warn('Audio beacon playback unavailable:', e);
    }
  }

  /**
   * Plays a success chime for ticket validation or eco points reward
   */
  public playSuccessChime(): void {
    this.playBeacon(523.25, 120); // C5
    setTimeout(() => this.playBeacon(659.25, 120), 100); // E5
    setTimeout(() => this.playBeacon(783.99, 200), 200); // G5
  }

  /**
   * Plays an alert acoustic signal for congested gates or emergency incidents
   */
  public playAlertSignal(): void {
    this.playBeacon(300, 150);
    setTimeout(() => this.playBeacon(300, 150), 200);
  }
}

export const audioBeacon = new AudioBeaconService();
