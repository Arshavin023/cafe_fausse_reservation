import React from 'react';

function Gallery() {
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Restaurant Interior",
      title: "Elegant Dining Room"
    },
    {
      src: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Plated Dish",
      title: "Signature Wagyu Ribeye"
    },
    {
      src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      alt: "Kitchen Scene",
      title: "Open Kitchen Experience"
    },
    {
      src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      alt: "Gourmet Dish",
      title: "Pan-Seared Halibut"
    },
    {
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Restaurant Ambiance",
      title: "Intimate Atmosphere"
    },
    {
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2081&q=80",
      alt: "Delicious Pizza",
      title: "Artisan Wood-Fired Pizza"
    },
    {
      src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      alt: "Wine Selection",
      title: "Curated Wine Collection"
    },
    {
      src: "https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Dessert",
      title: "Decadent Chocolate Soufflé"
    },
    {
      src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      alt: "Bar Area",
      title: "Craft Cocktail Bar"
    }
  ];

  return (
    <div className="grid-container">
      <div className="grid-12">
        <h1 className="page-title">Gallery</h1>
        <p className="page-subtitle">
          Take a visual journey through Café Fausse - from our elegant dining spaces 
          to our exquisitely crafted dishes.
        </p>
      </div>

      <div className="grid-12">
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div key={index} className="gallery-item">
              <img 
                src={image.src} 
                alt={image.alt}
                title={image.title}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid-12">
        <div className="card-grid">
          <div className="card">
            <h3>🍽️ Culinary Artistry</h3>
            <p>
              Every dish is a masterpiece, carefully crafted by our award-winning chefs 
              using the finest ingredients and innovative techniques.
            </p>
          </div>

          <div className="card">
            <h3>🏛️ Elegant Ambiance</h3>
            <p>
              Our sophisticated interior design creates the perfect atmosphere for 
              intimate dinners, celebrations, and memorable dining experiences.
            </p>
          </div>

          <div className="card">
            <h3>👨‍🍳 Open Kitchen</h3>
            <p>
              Watch our talented culinary team in action through our open kitchen concept, 
              adding excitement and transparency to your dining experience.
            </p>
          </div>
        </div>
      </div>

      <div className="grid-12">
        <div className="card" style={{textAlign: 'center'}}>
          <h3>Ready to Experience It Yourself?</h3>
          <p>Book your table and become part of the Café Fausse story.</p>
          <div className="flex flex-center" style={{gap: '1rem', marginTop: '2rem'}}>
            <a href="/reservations" className="btn btn-primary">Make Reservation</a>
            <a href="/menu" className="btn btn-secondary">View Menu</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;