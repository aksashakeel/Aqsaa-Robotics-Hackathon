import React from 'react';
import {useUserPreferences} from '../../contexts/UserPreferencesContext';

export const Urdu = ({children}: {children: React.ReactNode}) => {
  const {showUrdu} = useUserPreferences();
  if (!showUrdu) return null;
  
  return (
    <div style={{
      backgroundColor: '#f0f9ff', 
      borderLeft: '4px solid #007bff', 
      padding: '10px', 
      margin: '10px 0',
      fontFamily: 'Noto Nastaliq Urdu, serif',
      direction: 'rtl'
    }}>
      <strong>اردو ترجمہ:</strong><br/>
      {children}
    </div>
  );
};

export const Beginner = ({children}: {children: React.ReactNode}) => {
  const {userLevel} = useUserPreferences();
  // Beginners see everything? Or just Beginner blocks?
  // Usually "Beginner" blocks are for beginners only (simplified explanations).
  // If user is Advanced, maybe they don't need it? Or they see everything?
  // Let's assume: Beginner sees Beginner + Common. Advanced sees Advanced + Common.
  if (userLevel !== 'beginner') return null;

  return (
    <div className="custom-block tip">
      <div className="custom-block-title">Beginner Concept</div>
      {children}
    </div>
  );
};

export const Advanced = ({children}: {children: React.ReactNode}) => {
  const {userLevel} = useUserPreferences();
  if (userLevel !== 'advanced') return null;

  return (
    <div className="custom-block danger">
      <div className="custom-block-title">Advanced Deep Dive</div>
      {children}
    </div>
  );
};
