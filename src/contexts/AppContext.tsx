import { createContext, useContext, useState, ReactNode } from 'react';
import { ProfileType, DEMO_PROFILES, CitizenProfile } from '@/data/mockData';

type ViewMode = 'landing' | 'admin' | 'citizen';

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  profile: CitizenProfile;
  setProfileType: (type: ProfileType) => void;
  profileType: ProfileType;
  language: 'hi' | 'en';
  setLanguage: (lang: 'hi' | 'en') => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [profileType, setProfileTypeState] = useState<ProfileType>('farmer');
  const [language, setLanguage] = useState<'hi' | 'en'>('en');

  const profile = DEMO_PROFILES[profileType];

  const setProfileType = (type: ProfileType) => {
    setProfileTypeState(type);
  };

  return (
    <AppContext.Provider value={{ viewMode, setViewMode, profile, setProfileType, profileType, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
