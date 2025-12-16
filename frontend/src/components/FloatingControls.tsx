import React from 'react';
import {useUserPreferences} from '../contexts/UserPreferencesContext';
import styles from './FloatingControls.module.css'

export default function FloatingControls() {
  const {userLevel, setUserLevel, showUrdu, toggleUrdu} = useUserPreferences();

  return (
    <div className={styles.floatingContainer}>
      <div className={styles.controlGroup}>
        <label className={styles.label}>Level:</label>
        <div className={styles.toggleSwitch}>
          <button 
            className={`${styles.toggleBtn} ${userLevel === 'beginner' ? styles.active : ''}`}
            onClick={() => setUserLevel('beginner')}
          >
            Beginner
          </button>
          <button 
            className={`${styles.toggleBtn} ${userLevel === 'advanced' ? styles.active : ''}`}
            onClick={() => setUserLevel('advanced')}
          >
            Advanced
          </button>
        </div>
      </div>

      <div className={styles.controlGroup}>
        <label className={styles.label}>Urdu:</label>
        <button 
          className={`${styles.urduBtn} ${showUrdu ? styles.active : ''}`}
          onClick={toggleUrdu}
        >
          {showUrdu ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
}
