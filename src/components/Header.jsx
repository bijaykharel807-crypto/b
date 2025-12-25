import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useNavigation } from '../context/NavigationContext.jsx'; // Import useNavigation

/** @typedef {import('../jsdoc-types').PageType} PageType */
/** @typedef {import('../jsdoc-types').NavigateFunction} NavigateFunction */

/**
 * @param {object} props 
 *                         
 */
export const Header = () => {
  const { itemCount } = useCart();
  const { currentPage, onNavigate } = useNavigation(); 

  const navLinks = [
    { name: 'Home', pageType: 'home', current: false },
    { name: 'Shop', pageType: 'shop', current: false },
    { name: 'About', pageType: 'about', current: false },
    { name: 'Contact', pageType: 'contact', current: false },
    { name: 'AI Product Gen.', pageType: 'aiProductDescription', current: false },
    { name: 'AI Slogan Gen.', pageType: 'aiSloganGenerator', current: false },
  ];

  const getNavLinkClass = (page) => {
    const baseClass = "text-slate-700 hover:text-indigo-600 font-medium transition-colors duration-300 cursor-pointer";
    return currentPage === page ? `${baseClass} text-indigo-600` : baseClass;
  };

  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-slate-800 cursor-pointer" onClick={() => onNavigate('home')}>
          Elegance
        </div>
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.pageType}
              className={getNavLinkClass(link.pageType)}
              onClick={() => onNavigate(link.pageType)}
              aria-current={currentPage === link.pageType ? 'page' : undefined}
            >
              {link.name}
            </a>
          ))}
        </nav>
        <div className="flex items-center space-x-6">
          
          <div
            className="relative cursor-pointer"
            onClick={() => onNavigate('cart')}
            role="button"
            tabIndex={0}
            aria-label={`Shopping cart with ${itemCount} items`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate('cart'); }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-slate-700 hover:text-indigo-600 transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>

          
          <button
            className="md:hidden text-slate-700 hover:text-indigo-600"
            aria-label="Open mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};