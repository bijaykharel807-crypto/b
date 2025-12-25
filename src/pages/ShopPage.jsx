import React from 'react';
import { ProductCard } from '../components/ProductCard.jsx';
import { PRODUCTS } from '../constants.js';

/** @typedef {import('../jsdoc-types').PageType} PageType */
/** @typedef {import('../jsdoc-types').NavigateFunction} NavigateFunction */

/**
 * @param {NavigateFunction} onNavigate 
 */
export const ShopPage = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-16 text-slate-800">Our Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
};