import React from 'react';
import Header from './components/Header';
import products from './products';
import './App.css';
import { CartProvider } from './contexts/useCart';
import Product from './components/Product';

export default function App() {
  return (
    <CartProvider>
      <div className="app">
        {/* header */}
        <Header />

        <main>
          <div className="products-list">
            {products.map((product, index) =>(
              <Product key={index} product={product} />
            ))}
          </div>
        </main>
      </div>
    </CartProvider>

  );
}
