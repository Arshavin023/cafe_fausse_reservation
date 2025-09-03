import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Café Fausse</h1>
          <p>Experience Fine Dining at Its Finest</p>
          <Link to="/reservations" className="btn btn-primary">Make a Reservation</Link>
        </div>
      </section>

      {/* Main Content */}
      <div className="grid-container">
        <div className="grid-12">
          <h2 className="page-title">Elegant Fine Dining Experience</h2>
          <p className="page-subtitle">
            Discover culinary excellence in an atmosphere of refined elegance. 
            Our award-winning chefs create memorable dining experiences using the finest ingredients.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="card-grid">
          <div className="card">
            <h3>🍽️ Exquisite Menu</h3>
            <p>Savor our carefully crafted dishes made from the finest ingredients, 
            featuring both classic and contemporary culinary creations.</p>
            <Link to="/menu" className="btn btn-secondary">View Menu</Link>
          </div>

          <div className="card">
            <h3>🏆 Award-Winning</h3>
            <p>Recognized for culinary excellence and outstanding service, 
            we've earned multiple prestigious dining awards.</p>
            <Link to="/about" className="btn btn-secondary">Our Story</Link>
          </div>

          <div className="card">
            <h3>🌟 Premium Experience</h3>
            <p>Enjoy an intimate dining atmosphere with personalized service 
            and attention to every detail of your experience.</p>
            <Link to="/gallery" className="btn btn-secondary">View Gallery</Link>
          </div>
        </div>

        {/* Quick Info Section */}
        <div className="grid-12">
          <div className="card" style={{textAlign: 'center'}}>
            <h3>Reserve Your Table Today</h3>
            <p>Experience the finest dining in our elegant restaurant. 
            Book your reservation online for a seamless dining experience.</p>
            <div className="flex flex-center" style={{gap: '2rem', marginTop: '2rem'}}>
              <Link to="/reservations" className="btn btn-primary">Make Reservation</Link>
              <Link to="/menu" className="btn btn-secondary">View Menu</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;