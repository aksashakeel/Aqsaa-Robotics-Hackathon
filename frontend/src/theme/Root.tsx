import React from 'react';
import {UserPreferencesProvider} from '../contexts/UserPreferencesContext';

import Chatbot from '../components/Chatbot';

// Default implementation, that you can customize
export default function Root({children}) {
  return (
    <UserPreferencesProvider>
      {children}

      <Chatbot />
    </UserPreferencesProvider>
  );
}
