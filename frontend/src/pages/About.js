import React from 'react';

function About() {
  return (
    <div className="grid-container">
      <div className="grid-12">
        <h1 className="page-title">About Café Fausse</h1>
        <p className="page-subtitle">
          Discover the story behind our passion for exceptional dining and culinary excellence.
        </p>
      </div>

      <div className="grid-6">
        <div className="card">
          <h3>Our Story</h3>
          <p>
            Founded in 2010 by renowned chef Marie Dubois and sommelier Jean-Pierre Laurent, 
            Café Fausse began as a dream to create an intimate dining experience that celebrates 
            the finest in French-inspired cuisine.
          </p>
          <p>
            Our name, "Fausse," meaning "false" in French, represents our philosophy of breaking 
            traditional boundaries while maintaining the authenticity of exceptional flavors. 
            We believe in creating "false" expectations only to exceed them with genuine excellence.
          </p>
        </div>
      </div>

      <div className="grid-6">
        <div className="card">
          <h3>Our Mission</h3>
          <p>
            To provide an unparalleled dining experience where every detail matters, from the 
            carefully sourced ingredients to the warm, attentive service that makes each guest 
            feel truly special.
          </p>
          <p>
            We are committed to sustainability, supporting local farmers and producers while 
            maintaining the highest standards of culinary excellence that have earned us 
            recognition in the culinary world.
          </p>
        </div>
      </div>

      <div className="grid-12">
        <div className="card">
          <h3>Meet Our Team</h3>
          <div className="card-grid">
            <div className="card">
              <h4>👨‍🍳 Chef Marie Dubois</h4>
              <p><strong>Executive Chef & Co-Owner</strong></p>
              <p>
                With over 20 years of culinary experience in Michelin-starred restaurants across 
                France and New York, Chef Dubois brings innovative techniques to classic dishes. 
                Her passion for seasonal ingredients drives our ever-evolving menu.
              </p>
            </div>

            <div className="card">
              <h4>🍷 Jean-Pierre Laurent</h4>
              <p><strong>Head Sommelier & Co-Owner</strong></p>
              <p>
                A certified sommelier with expertise in French and international wines, 
                Jean-Pierre curates our extensive wine collection and creates perfect pairings 
                for every dish on our menu.
              </p>
            </div>

            <div className="card">
              <h4>👨‍💼 Isabella Chen</h4>
              <p><strong>General Manager</strong></p>
              <p>
                With a background in hospitality management from the finest establishments, 
                Isabella ensures that every aspect of your dining experience exceeds expectations, 
                from reservation to farewell.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-12">
        <div className="card">
          <h3>🏆 Awards & Recognition</h3>
          <div className="flex flex-wrap" style={{gap: '2rem', justifyContent: 'center', marginTop: '2rem'}}>
            <div style={{textAlign: 'center'}}>
              <h4>⭐ Michelin Guide</h4>
              <p>Bib Gourmand 2021-2024</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <h4>🍷 Wine Spectator</h4>
              <p>Award of Excellence 2022-2024</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <h4>🏅 Local Choice Awards</h4>
              <p>Best Fine Dining 2020-2024</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <h4>⭐ TripAdvisor</h4>
              <p>Certificate of Excellence 2019-2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-6">
        <div className="card">
          <h3>🌱 Our Commitment</h3>
          <p>
            We source our ingredients from local farms within 50 miles of our restaurant, 
            ensuring freshness while supporting our community. Our seafood is sustainably 
            sourced, and we work directly with artisan producers for specialty items.
          </p>
          <p>
            Our commitment extends to our staff - we provide ongoing training, competitive 
            wages, and a positive work environment that reflects in the service we provide.
          </p>
        </div>
      </div>

      <div className="grid-6">
        <div className="card">
          <h3>📍 Location & Atmosphere</h3>
          <p>
            Located in the heart of the culinary district, our 80-seat restaurant features 
            an elegant interior with warm lighting, exposed brick, and an open kitchen where 
            guests can watch our chefs at work.
          </p>
          <p>
            The intimate setting is perfect for romantic dinners, business meetings, and 
            special celebrations. Our private dining room accommodates up to 16 guests for 
            exclusive events.
          </p>
        </div>
      </div>

      <div className="grid-12">
        <div className="card" style={{textAlign: 'center'}}>
          <h3>Experience Café Fausse</h3>
          <p>Join us for an unforgettable dining experience where passion meets perfection.</p>
          <a href="/reservations" className="btn btn-primary">Make a Reservation</a>
        </div>
      </div>
    </div>
  );
}

export default About;