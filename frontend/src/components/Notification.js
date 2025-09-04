import React, { useState, useEffect } from 'react';

const Notification = ({ message, type, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, onClose, duration]);

  if (!message) return null;

  const getNotificationStyle = (type) => {
    const baseStyle = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      maxWidth: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      animation: 'slideIn 0.3s ease-out',
      fontWeight: '500'
    };

    switch (type) {
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: '#d4edda',
          color: '#155724',
          border: '1px solid #c3e6cb'
        };
      case 'error':
        return {
          ...baseStyle,
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb'
        };
      case 'warning':
        return {
          ...baseStyle,
          backgroundColor: '#fff3cd',
          color: '#856404',
          border: '1px solid #ffeaa7'
        };
      case 'info':
        return {
          ...baseStyle,
          backgroundColor: '#d1ecf1',
          color: '#0c5460',
          border: '1px solid #bee5eb'
        };
      default:
        return baseStyle;
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '';
    }
  };

  return (
    <div style={getNotificationStyle(type)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>{getIcon(type)}</span>
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          marginLeft: '15px',
          opacity: 0.7
        }}
      >
        ×
      </button>
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Notification;