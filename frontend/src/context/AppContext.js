import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [reservations, setReservations] = useState([]);
  const [newsletterEmails, setNewsletterEmails] = useState([]);

  const addReservation = (reservation) => {
    setReservations(prev => [...prev, { ...reservation, id: Date.now() }]);
  };

  const addNewsletterEmail = (email) => {
    setNewsletterEmails(prev => [...prev, email]);
  };

  const value = {
    reservations,
    newsletterEmails,
    addReservation,
    addNewsletterEmail
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}