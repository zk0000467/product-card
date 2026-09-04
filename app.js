const { useState } = React;

function Button({ label, variant = 'primary', onClick }) {
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {label}
    </button>
  );
}

function Header({ title, subtitle, actionLabel }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-mark">S</div>
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="header-actions">
        <Button label={actionLabel} variant="secondary" />
      </div>
    </header>
  );
}

function Card({ children, className = '' }) {
  return <div className={`card ${className}`.trim()}>{children}</div>;
}

function ProductCard({ product, onAddToCart, isInCart }) {
  const { name, price, description, category, badge, rating, image } = product;

  return (
    <Card className="product-card">
      <div className="product-visual">
        <span className="badge">{badge}</span>
        <img className="product-image" src={image} alt={name} />
      </div>

      <div className="product-body">
        <div className="product-meta">
          <p className="category">{category}</p>
          <span className="rating">★ {rating}</span>
        </div>

        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>

        <div className="product-footer">
          <div className="price-box">
            <span className="price">PKR {price.toLocaleString()}</span>
            <span className="price-note">Free shipping</span>
          </div>

          <Button
            label={isInCart ? 'Added' : 'Add to cart'}
            variant="primary"
            onClick={() => onAddToCart(product)}
          />
        </div>
      </div>
    </Card>
  );
}

function Footer({ message }) {
  return <footer className="footer">{message}</footer>;
}

function App() {
  const products = [
    {
      id: 1,
      name: 'Aurora Headphones',
      category: 'Audio',
      price: 129,
      rating: 4.8,
      badge: 'Best Seller',
      image:
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
      description: 'Immersive wireless sound with plush memory foam and 30-hour battery life.',
    },
    {
      id: 2,
      name: 'Luma Smart Watch',
      category: 'Wearables',
      price: 199,
      rating: 4.9,
      badge: 'New',
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      description: 'Track workouts, sleep, and notifications in a sleek, lightweight design.',
    },
    {
      id: 3,
      name: 'Hydra Water Bottle',
      category: 'Lifestyle',
      price: 3499,
      rating: 4.7,
      badge: 'Popular',
      image:
        'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
      description: 'Double-wall insulated stainless steel that keeps drinks cold throughout the day.',
    },
    {
      id: 4,
      name: 'Orbit Desk Lamp',
      category: 'Workspace',
      price: 7499,
      rating: 4.6,
      badge: 'Featured',
      image:
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
      description: 'Adjustable warm lighting with a clean silhouette for focused work sessions.',
    },
    {
      id: 5,
      name: 'Cloud Running Shoes',
      category: 'Footwear',
      price: 15999,
      rating: 4.8,
      badge: 'Trending',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      description: 'Responsive cushioning and breathable comfort for daily runs and long walks.',
    },
    {
      id: 6,
      name: 'Brew Ceramic Set',
      category: 'Kitchen',
      price: 4999,
      rating: 4.5,
      badge: 'Limited',
      image:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
      description: 'A handcrafted pair of mugs for slow mornings, strong coffee, and good company.',
    },
  ];

  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((currentCart) => {
      if (currentCart.some((item) => item.id === product.id)) {
        return currentCart;
      }

      return [...currentCart, product];
    });
  };

  return (
    <div className="app-shell">
      <Header
        title="Shop Smart"
        subtitle="Explore premium gear built for everyday life."
        actionLabel={`Cart (${cart.length})`}
      />

      <div className="card-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            isInCart={cart.some((item) => item.id === product.id)}
          />
        ))}
      </div>

      <Footer
        message={
          cart.length > 0
            ? `${cart.length} item${cart.length === 1 ? '' : 's'} in your cart • Free shipping on orders over $50`
            : 'Your cart is empty • Free shipping on orders over PKR2000'
        }
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
