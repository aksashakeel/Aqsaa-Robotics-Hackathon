import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';

type UserLevel = 'beginner' | 'advanced';

interface UserPreferences {
  userLevel: UserLevel;
  showUrdu: boolean;
  setUserLevel: (level: UserLevel) => void;
  toggleUrdu: () => void;
}

const UserPreferencesContext = createContext<UserPreferences | undefined>(undefined);

export const UserPreferencesProvider = ({children}: {children: ReactNode}) => {
  const [userLevel, setUserLevel] = useState<UserLevel>('beginner');
  const [showUrdu, setShowUrdu] = useState<boolean>(false);

  // Persist preferences (optional, basic implementation)
  useEffect(() => {
    const storedLevel = localStorage.getItem('userLevel') as UserLevel;
    const storedUrdu = localStorage.getItem('showUrdu') === 'true';
    if (storedLevel) setUserLevel(storedLevel);
    if (storedUrdu) setShowUrdu(storedUrdu);
  }, []);

  const handleSetUserLevel = (level: UserLevel) => {
    setUserLevel(level);
    localStorage.setItem('userLevel', level);
  };

  const handleToggleUrdu = () => {
    const newState = !showUrdu;
    setShowUrdu(newState);
    localStorage.setItem('showUrdu', String(newState));
  };

  return (
    <UserPreferencesContext.Provider value={{
      userLevel,
      showUrdu,
      setUserLevel: handleSetUserLevel,
      toggleUrdu: handleToggleUrdu
    }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};
