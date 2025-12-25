import React from 'react';
import { Button } from './Button.jsx';

/** @typedef {import('../jsdoc-types').Product} Product */

/**
 * @param {object} props
 * @param {Product | null | undefined} props.product 
 * @param {(page: string, productId?: string) => void} props.onNavigate 
 */
export const ProductCard = ({ product, onNavigate }) => {
  if (!product) {
    console.warn("ProductCard received a null or undefined product prop.");
    return null;
  }

  const imageUrl = product.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image'; 
  const productName = product.name || 'Product Name Missing'; 

  return (
    <div
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer"
    
      onClick={() => onNavigate('productDetail', product.id)}
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium text-slate-800 mb-2">{productName}</h3>
        
        <p className="text-2xl font-bold text-indigo-600">${product.price?.toFixed(2) || 'N/A'}</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          variant="secondary"
          size="md"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('productDetail', product.id);
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};