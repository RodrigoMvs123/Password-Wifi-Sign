import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import ProductCustomizer from './components/ProductCustomizer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import About from './components/About';
import { CartProvider } from './store/CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 ml-20 md:ml-64 transition-all duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/customize" element={<ProductCustomizer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              {/* Fallback Route */}
              <Route path="*" element={<div className="p-12 text-center">Page not found</div>} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </CartProvider>
  );
};

export default App;