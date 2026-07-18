import { useCallback, useEffect } from 'react';
import { audioBeaconService } from '../services/audioBeaconService';

/**
 * Custom hook to interact with the audio beacon service.
 * @returns {{ playBeacon: (freq?: number, duration?: number) => void, playSuccessChime: () => void, playAlertSignal: () => void, stopBeacon: () => void }} The beacon control methods.
 */
export function useAudioBeacon() {
  const playBeacon = useCallback((freq?: number, duration?: number) => {
    audioBeaconService.playBeacon(freq, duration);
  }, []);

  const playSuccessChime = useCallback(() => {
    audioBeaconService.playSuccessChime();
  }, []);

  const playAlertSignal = useCallback(() => {
    audioBeaconService.playAlertSignal();
  }, []);

  const stopBeacon = useCallback(() => {
    audioBeaconService.stopBeacon();
  }, []);

  useEffect(() => {
    return () => {
      audioBeaconService.stopBeacon();
    };
  }, []);

  return { playBeacon, playSuccessChime, playAlertSignal, stopBeacon };
}
