import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ApiService from '../services/api';

function Reservations() {
  const { addReservation } = useAppContext();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    phoneNumber: '',
    timeSlot: '',
    numberOfGuests: '',
    tableNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
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
      
      // Add to local context as well
      addReservation(response.reservation);
      
      alert(`Reservation confirmed! Table ${response.reservation.table_number} has been reserved for ${formData.customerName}.`);
      
      // Reset form
      setFormData({
        customerName: '',
        customerEmail: '',
        phoneNumber: '',
        timeSlot: '',
        numberOfGuests: '',
        tableNumber: ''
      });
      setErrors({});
      
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid-container">
      <div className="grid-12">
        <h1 className="page-title">Make a Reservation</h1>
        <p className="page-subtitle">
          Reserve your table at Café Fausse for an unforgettable dining experience.
        </p>
      </div>

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

            {errors.submit && (
              <p style={{color: 'red', fontSize: '0.9rem', marginBottom: '1rem'}}>
                {errors.submit}
              </p>
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

export default Reservations;