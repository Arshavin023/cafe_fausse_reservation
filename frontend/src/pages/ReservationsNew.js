import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ApiService from '../services/api';
import { useNotification } from '../hooks/useNotification';
import Notification from '../components/Notification';

function ReservationsNew() {
  const { addReservation } = useAppContext();
  const { notification, showNotification, hideNotification } = useNotification();
  
  const [customerType, setCustomerType] = useState(''); // 'new' or 'existing'
  const [existingEmail, setExistingEmail] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    phoneNumber: '',
    timeSlot: '',
    numberOfGuests: '',
    saveCustomerInfo: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCustomerTypeSelect = (type) => {
    setCustomerType(type);
    setFormData({
      customerName: '',
      customerEmail: '',
      phoneNumber: '',
      timeSlot: '',
      numberOfGuests: '',
      saveCustomerInfo: false
    });
    setExistingEmail('');
    setCustomerData(null);
    setErrors({});
  };

  const handleExistingCustomerLookup = async () => {
    if (!existingEmail) {
      showNotification('Please enter your email address', 'error');
      return;
    }

    setLookupLoading(true);
    try {
      const response = await ApiService.getCustomer(existingEmail);
      setCustomerData(response.customer);
      setFormData(prev => ({
        ...prev,
        customerName: response.customer.name || '',
        customerEmail: response.customer.email || '',
        phoneNumber: response.customer.phone || ''
      }));
      showNotification('Customer information loaded successfully!', 'success');
    } catch (error) {
      showNotification('Customer not found. Please check your email or register as a new customer.', 'error');
      setCustomerData(null);
    } finally {
      setLookupLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Email is invalid';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Time slot is required';
    }

    if (!formData.numberOfGuests) {
      newErrors.numberOfGuests = 'Number of guests is required';
    } else if (formData.numberOfGuests < 1 || formData.numberOfGuests > 12) {
      newErrors.numberOfGuests = 'Number of guests must be between 1 and 12';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await ApiService.createReservation(formData);
      
      addReservation(response.reservation);
      
      showNotification(
        `Reservation confirmed! Table ${response.reservation.table_number} has been reserved for ${formData.customerName}.`,
        'success'
      );
      
      // Reset form
      setFormData({
        customerName: '',
        customerEmail: '',
        phoneNumber: '',
        timeSlot: '',
        numberOfGuests: '',
        saveCustomerInfo: false
      });
      setCustomerType('');
      setExistingEmail('');
      setCustomerData(null);
      setErrors({});
      
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!customerType) {
    return (
      <div className="grid-container">
        {notification.show && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={hideNotification}
          />
        )}
        
        <div className="grid-12">
          <h1 className="page-title">Make a Reservation</h1>
          <p className="page-subtitle">
            Reserve your table at Café Fausse for an unforgettable dining experience.
          </p>
        </div>

        <div className="grid-12">
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <h3>Are you a new or existing customer?</h3>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
              Existing customers can skip filling out their details by using their email.
            </p>
            
            <div className="flex flex-center" style={{ gap: '2rem' }}>
              <button
                onClick={() => handleCustomerTypeSelect('new')}
                className="btn btn-primary"
                style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
              >
                New Customer
              </button>
              
              <button
                onClick={() => handleCustomerTypeSelect('existing')}
                className="btn btn-secondary"
                style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
              >
                Existing Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid-container">
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
      
      <div className="grid-12">
        <h1 className="page-title">Make a Reservation</h1>
        <div className="flex flex-between" style={{ marginBottom: '2rem' }}>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            {customerType === 'new' ? 'New Customer Registration' : 'Existing Customer Reservation'}
          </p>
          <button
            onClick={() => handleCustomerTypeSelect('')}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
          >
            Change Customer Type
          </button>
        </div>
      </div>

      {customerType === 'existing' && !customerData && (
        <div className="grid-12">
          <div className="form-container">
            <h3>Enter Your Email</h3>
            <p>We'll look up your information to make the reservation process faster.</p>
            
            <div className="flex" style={{ gap: '1rem', marginTop: '1rem' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={existingEmail}
                onChange={(e) => setExistingEmail(e.target.value)}
                style={{ flex: 1 }}
              />
              <button
                onClick={handleExistingCustomerLookup}
                className="btn btn-primary"
                disabled={lookupLoading}
              >
                {lookupLoading ? 'Looking up...' : 'Find Me'}
              </button>
            </div>
          </div>
        </div>
      )}

      {(customerType === 'new' || (customerType === 'existing' && customerData)) && (
        <div className="grid-12">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="customerName">Full Name *</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  readOnly={customerType === 'existing' && customerData}
                />
                {errors.customerName && <p style={{color: 'red', fontSize: '0.9rem'}}>{errors.customerName}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="customerEmail">Email Address *</label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  required
                  readOnly={customerType === 'existing' && customerData}
                />
                {errors.customerEmail && <p style={{color: 'red', fontSize: '0.9rem'}}>{errors.customerEmail}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  readOnly={customerType === 'existing' && customerData}
                />
              </div>

              <div className="form-group">
                <label htmlFor="timeSlot">Date & Time *</label>
                <input
                  type="datetime-local"
                  id="timeSlot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 16)}
                  required
                />
                {errors.timeSlot && <p style={{color: 'red', fontSize: '0.9rem'}}>{errors.timeSlot}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="numberOfGuests">Number of Guests *</label>
                <select
                  id="numberOfGuests"
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select number of guests</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
                {errors.numberOfGuests && <p style={{color: 'red', fontSize: '0.9rem'}}>{errors.numberOfGuests}</p>}
              </div>

              {customerType === 'new' && (
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      name="saveCustomerInfo"
                      checked={formData.saveCustomerInfo}
                      onChange={(e) => setFormData({...formData, saveCustomerInfo: e.target.checked})}
                    />
                    Save my information for future reservations
                  </label>
                  <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                    We'll securely store your information to make future bookings easier.
                  </p>
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{width: '100%'}}
                disabled={loading}
              >
                {loading ? 'Making Reservation...' : 'Reserve Table'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid-12">
        <div className="card" style={{marginTop: '2rem'}}>
          <h3>Reservation Policy</h3>
          <p>To ensure efficient seating and combat no-shows, we require credit card information for all reservations. 
          A small authorization hold will be placed on your card (not a charge). In case of a no-show, 
          this may be converted to a charge. We appreciate your understanding.</p>
          
          <h4 style={{marginTop: '1rem'}}>Hours</h4>
          <p>Monday - Thursday: 11:00 AM - 10:00 PM<br />
          Friday - Saturday: 11:00 AM - 11:00 PM<br />
          Sunday: 10:00 AM - 9:00 PM</p>
        </div>
      </div>
    </div>
  );
}

export default ReservationsNew;