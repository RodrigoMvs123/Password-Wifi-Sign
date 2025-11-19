import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../store/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-4xl">
          🛒
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 max-w-xs">Looks like you haven't designed any signs yet.</p>
        <Link 
          to="/customize" 
          className="bg-sky-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-sky-500 transition-colors"
        >
          Start Designing
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {cart.items.map((item) => (
            <div key={item.createdAt} className="p-6 flex flex-col sm:flex-row gap-6 border-b border-slate-100 last:border-0 items-center">
              {/* Small Preview */}
              <div className="w-32 h-24 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">☁️</span>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-slate-900">{item.name}</h3>
                <div className="text-sm text-slate-500 mt-1">
                  Password: <span className="font-mono font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-700">{item.customPassword}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => updateQuantity(item.createdAt, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 text-slate-600"
                    disabled={item.quantity <= 1}
                  >-</button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.createdAt, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 text-slate-600"
                  >+</button>
                </div>
                
                <div className="font-bold text-slate-900 w-24 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button 
                  onClick={() => removeFromCart(item.createdAt)}
                  className="text-slate-400 hover:text-red-500 transition-colors p-2"
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mt-4">
            <Link to="/customize" className="text-slate-500 hover:text-sky-600 font-medium">
                ← Continue Shopping
            </Link>

            <div className="w-full md:w-80 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between mb-2 text-slate-600">
                    <span>Subtotal</span>
                    <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-6 text-slate-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-slate-100 mb-6">
                    <span className="font-bold text-lg text-slate-900">Total</span>
                    <span className="font-bold text-lg text-slate-900">${cart.total.toFixed(2)}</span>
                </div>
                <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-sky-600 text-white py-3 rounded-xl font-bold hover:bg-sky-500 transition-colors shadow-lg shadow-sky-100"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;