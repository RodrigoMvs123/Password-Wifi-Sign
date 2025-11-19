import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../store/CartContext';

const Sidebar = () => {
  const location = useLocation();
  const { cart } = useCart();
  const itemCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/customize', label: 'Customize', icon: '☁️' },
    { path: '/cart', label: 'Cart', icon: '🛒', count: itemCount },
    { path: '/about', label: 'About', icon: 'ℹ️' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-20 md:w-64 bg-white border-r border-slate-200 z-50 flex flex-col shadow-sm">
      <div className="p-6 flex items-center justify-center md:justify-start gap-3 border-b border-slate-100">
        <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold">P</div>
        <span className="hidden md:block font-bold text-xl tracking-tight text-slate-800">Password</span>
      </div>
      
      <nav className="flex-1 py-8 flex flex-col gap-2 px-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-sky-50 text-sky-600 font-medium' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="hidden md:block">{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="hidden md:flex ml-auto bg-sky-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] items-center justify-center">
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="hidden md:block text-xs text-slate-400 text-center">
          © 2025 Password Inc.
        </div>
      </div>
    </div>
  );
};

export default Sidebar;