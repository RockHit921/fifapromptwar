import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserMode, StadiumId, StadiumInfo, IncidentAlert, EcoReward } from '../types';
import { STADIUM_PROFILES, INITIAL_INCIDENTS, INITIAL_ECO_REWARDS } from '../services/stadiumDataService';
import { getStoredApiKey, setStoredApiKey } from '../services/geminiService';

interface StadiumStateContextType {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  activeStadiumId: StadiumId;
  setActiveStadiumId: (id: StadiumId) => void;
  stadium: StadiumInfo;
  incidents: IncidentAlert[];
  ecoRewards: EcoReward[];
  toggleEcoReward: (rewardId: string) => void;
  resolveIncident: (incidentId: string) => void;
  addIncident: (newIncident: Omit<IncidentAlert, 'id' | 'timestamp'>) => void;
  apiKeyModalOpen: boolean;
  setApiKeyModalOpen: (open: boolean) => void;
  apiKey: string;
  updateApiKey: (key: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  simulateLiveQueueTick: () => void;
}

const StadiumStateContext = createContext<StadiumStateContextType | undefined>(undefined);

export const StadiumStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userMode, setUserMode] = useState<UserMode>('fan');
  const [activeStadiumId, setActiveStadiumId] = useState<StadiumId>('metlife');
  const [stadiums, setStadiums] = useState<Record<StadiumId, StadiumInfo>>(STADIUM_PROFILES);
  const [incidents, setIncidents] = useState<IncidentAlert[]>(INITIAL_INCIDENTS);
  const [ecoRewards, setEcoRewards] = useState<EcoReward[]>(INITIAL_ECO_REWARDS);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>(() => getStoredApiKey());
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

  const stadium = stadiums[activeStadiumId];

  const updateApiKey = (key: string) => {
    setApiKey(key);
    setStoredApiKey(key);
  };

  const toggleEcoReward = (rewardId: string) => {
    setEcoRewards((prev) =>
      prev.map((r) => (r.id === rewardId ? { ...r, completed: !r.completed } : r))
    );
  };

  const resolveIncident = (incidentId: string) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === incidentId ? { ...inc, status: 'resolved' } : inc))
    );
  };

  const addIncident = (newInc: Omit<IncidentAlert, 'id' | 'timestamp'>) => {
    const id = `inc-${Date.now().toString().slice(-4)}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fullInc: IncidentAlert = { ...newInc, id, timestamp };
    setIncidents((prev) => [fullInc, ...prev]);
  };

  const simulateLiveQueueTick = () => {
    setStadiums((prev) => {
      const current = prev[activeStadiumId];
      const updatedGates = current.gates.map((g) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2 mins
        const newWait = Math.max(1, g.currentWaitMinutes + delta);
        let status: 'optimal' | 'moderate' | 'congested' | 'emergency' = 'optimal';
        if (newWait > 20) status = 'emergency';
        else if (newWait > 12) status = 'congested';
        else if (newWait > 5) status = 'moderate';

        return { ...g, currentWaitMinutes: newWait, status };
      });

      return {
        ...prev,
        [activeStadiumId]: {
          ...current,
          gates: updatedGates,
        },
      };
    });
  };

  // Automatic subtle simulation tick every 20 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      simulateLiveQueueTick();
    }, 20000);
    return () => clearInterval(timer);
  }, [activeStadiumId]);

  return (
    <StadiumStateContext.Provider
      value={{
        userMode,
        setUserMode,
        activeStadiumId,
        setActiveStadiumId,
        stadium,
        incidents,
        ecoRewards,
        toggleEcoReward,
        resolveIncident,
        addIncident,
        apiKeyModalOpen,
        setApiKeyModalOpen,
        apiKey,
        updateApiKey,
        selectedLanguage,
        setSelectedLanguage,
        simulateLiveQueueTick,
      }}
    >
      {children}
    </StadiumStateContext.Provider>
  );
};

export const useStadiumState = () => {
  const context = useContext(StadiumStateContext);
  if (!context) {
    throw new Error('useStadiumState must be used within StadiumStateProvider');
  }
  return context;
};
