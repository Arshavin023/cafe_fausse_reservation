import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

function Footer() {
  const [email, setEmail] = useState('');
  const { addNewsletterEmail } = useAppContext();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      addNewsletterEmail(email);
      setEmail('');
      alert('Thank you for subscribing to our newsletter!');
    }
  };

  return (
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
          <h3>Newsletter Signup</h3>
          <p>Stay updated with our latest offers and events!</p>
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
        </div>
        
        <div className="footer-section">
          <h3>Awards & Reviews</h3>
          <p>⭐⭐⭐⭐⭐ "Exceptional dining experience!"</p>
          <p>🏆 Best Fine Dining 2023</p>
          <p>🏆 Culinary Excellence Award</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;