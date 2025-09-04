import { useState } from 'react';

export const useNotification = () => {
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    show: false
  });

  const showNotification = (message, type = 'info') => {
    setNotification({
      message,
      type,
      show: true
    });
  };

  const hideNotification = () => {
    setNotification({
      message: '',
      type: '',
      show: false
    });
  };

  return {
    notification,
    showNotification,
    hideNotification
  };
};