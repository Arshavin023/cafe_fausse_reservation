const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async createReservation(reservationData) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create reservation');
      }
      
      return data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  }

  async subscribeNewsletter(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to subscribe to newsletter');
      }
      
      return data;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  }

  async getReservations() {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch reservations');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  }

  async unsubscribeNewsletter(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to unsubscribe from newsletter');
      }
      
      return data;
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      throw error;
    }
  }

  async checkNewsletterStatus(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter/status/${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to check newsletter status');
      }
      
      return data;
    } catch (error) {
      console.error('Error checking newsletter status:', error);
      throw error;
    }
  }

  async getCustomer(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch customer');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  }

  async registerCustomer(customerData) {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to register customer');
      }
      
      return data;
    } catch (error) {
      console.error('Error registering customer:', error);
      throw error;
    }
  }
}

export default new ApiService();