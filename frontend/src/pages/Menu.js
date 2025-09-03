import React from 'react';

function Menu() {
  const menuData = {
    starters: [
      { name: "Truffle Arancini", description: "Crispy risotto balls with truffle oil and parmesan", price: "$18" },
      { name: "Seared Scallops", description: "Pan-seared scallops with cauliflower purée and pancetta", price: "$24" },
      { name: "Burrata Caprese", description: "Fresh burrata with heirloom tomatoes and basil oil", price: "$20" },
      { name: "Beef Carpaccio", description: "Thinly sliced beef with arugula, capers, and lemon", price: "$22" }
    ],
    mains: [
      { name: "Wagyu Ribeye", description: "12oz premium wagyu with roasted vegetables and red wine jus", price: "$85" },
      { name: "Pan-Seared Halibut", description: "Fresh halibut with lemon butter sauce and seasonal vegetables", price: "$42" },
      { name: "Duck Confit", description: "Slow-cooked duck leg with cherry gastrique and potato gratin", price: "$38" },
      { name: "Lobster Risotto", description: "Creamy risotto with fresh lobster and saffron", price: "$48" },
      { name: "Lamb Rack", description: "Herb-crusted rack of lamb with mint chimichurri", price: "$52" }
    ],
    desserts: [
      { name: "Chocolate Soufflé", description: "Dark chocolate soufflé with vanilla bean ice cream", price: "$16" },
      { name: "Crème Brûlée", description: "Classic vanilla custard with caramelized sugar", price: "$14" },
      { name: "Tiramisu", description: "Traditional Italian dessert with coffee and mascarpone", price: "$15" },
      { name: "Seasonal Fruit Tart", description: "Fresh seasonal fruits with pastry cream", price: "$13" }
    ],
    beverages: [
      { name: "House Wine Selection", description: "Curated wines from premium vineyards", price: "$12-85" },
      { name: "Craft Cocktails", description: "Signature cocktails made with premium spirits", price: "$16-20" },
      { name: "Artisan Coffee", description: "Freshly roasted coffee from local roasters", price: "$6-8" },
      { name: "Premium Tea Selection", description: "Finest teas from around the world", price: "$5-7" }
    ]
  };

  return (
    <div className="grid-container">
      <div className="grid-12">
        <h1 className="page-title">Our Menu</h1>
        <p className="page-subtitle">
          Discover our carefully curated selection of dishes, crafted with the finest ingredients 
          and prepared by our award-winning culinary team.
        </p>
      </div>

      {Object.entries(menuData).map(([category, items]) => (
        <div key={category} className="grid-12">
          <div className="menu-category">
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div className="menu-items">
              {items.map((item, index) => (
                <div key={index} className="menu-item">
                  <div className="menu-item-info">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="menu-item-price">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="grid-12">
        <div className="card" style={{textAlign: 'center', marginTop: '3rem'}}>
          <h3>Ready to Dine?</h3>
          <p>Reserve your table now and experience our exceptional cuisine.</p>
          <a href="/reservations" className="btn btn-primary">Make a Reservation</a>
        </div>
      </div>
    </div>
  );
}

export default Menu;