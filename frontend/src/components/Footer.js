import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ApiService from '../services/api';
import { useNotification } from '../hooks/useNotification';
import Notification from './Notification';

function Footer() {
  const [email, setEmail] = useState('');
  const [unsubscribeEmail, setUnsubscribeEmail] = useState('');
  const [showUnsubscribe, setShowUnsubscribe] = useState(false);
  const { addNewsletterEmail } = useAppContext();
  const { notification, showNotification, hideNotification } = useNotification();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        await ApiService.subscribeNewsletter(email);
        addNewsletterEmail(email);
        setEmail('');
        showNotification('Thank you for subscribing to our newsletter!', 'success');
      } catch (error) {
        showNotification('Failed to subscribe. Please try again.', 'error');
      }
    }
  };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    if (unsubscribeEmail) {
      try {
        await ApiService.unsubscribeNewsletter(unsubscribeEmail);
        setUnsubscribeEmail('');
        setShowUnsubscribe(false);
        showNotification('You have been successfully unsubscribed from our newsletter.', 'success');
      } catch (error) {
        showNotification('Failed to unsubscribe. Please try again.', 'error');
      }
    }
  };

  return (
    <>
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
      
      <footer className="footer">
        <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>📍 123 Fine Dining Street<br />
          Culinary District, CD 12345</p>
          <p>📞 (555) 123-4567</p>
          <p>📧 info@cafefausse.com</p>
        </div>
        
        <div className="footer-section">
          <h3>Hours</h3>
          <p>Monday - Thursday: 11:00 AM - 10:00 PM<br />
          Friday - Saturday: 11:00 AM - 11:00 PM<br />
          Sunday: 10:00 AM - 9:00 PM</p>
        </div>
        
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Stay updated with our latest offers and events!</p>
          
          {!showUnsubscribe ? (
            <>
              <form onSubmit={handleNewsletterSubmit} className="flex" style={{gap: '10px', marginTop: '1rem'}}>
                <input 
                  type="email" 
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}}
                />
                <button type="submit" className="btn btn-secondary">Subscribe</button>
              </form>
              <button 
                onClick={() => setShowUnsubscribe(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ccc',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  marginTop: '0.5rem'
                }}
              >
                Unsubscribe
              </button>
            </>
          ) : (
            <>
              <form onSubmit={handleUnsubscribe} className="flex" style={{gap: '10px', marginTop: '1rem'}}>
                <input 
                  type="email" 
                  placeholder="Email to unsubscribe"
                  value={unsubscribeEmail}
                  onChange={(e) => setUnsubscribeEmail(e.target.value)}
                  required
                  style={{flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}}
                />
                <button type="submit" className="btn btn-secondary">Unsubscribe</button>
              </form>
              <button 
                onClick={() => {setShowUnsubscribe(false); setUnsubscribeEmail('');}}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ccc',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  marginTop: '0.5rem'
                }}
              >
                Back to Subscribe
              </button>
            </>
          )}
        </div>
        
        <div className="footer-section">
          <h3>Awards & Reviews</h3>
          <p>⭐⭐⭐⭐⭐ "Exceptional dining experience!"</p>
          <p>🏆 Best Fine Dining 2023</p>
          <p>🏆 Culinary Excellence Award</p>
        </div>
      </div>
    </footer>
    </>
  );
}

export default Footer;