import React, { useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from '../constants.js';
import { Button } from '../components/Button.jsx';
import { useCart } from '../context/CartContext.jsx';
import { ProductCard } from '../components/ProductCard.jsx';

/** @typedef {import('../jsdoc-types').Product} Product */
/** @typedef {import('../jsdoc-types').PageType} PageType */
/** @typedef {import('../jsdoc-types').NavigateFunction} NavigateFunction */

/**
 * @param {object} props
 * @param {string} props.productId 
 * @param {NavigateFunction} props.onNavigate 
 */
export const ProductDetailPage = ({ productId, onNavigate }) => {
  /** @type {React.useState<Product | null>} */
  const [product, setProduct] = useState(null);
  /** @type {React.useState<number>} */
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = PRODUCTS.find((p) => p.id === productId);
    setProduct(foundProduct || null);
    setQuantity(1);
  }, [productId]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      addToCart(product, quantity);
      onNavigate('cart');
    }
  }, [product, quantity, addToCart, onNavigate]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-screen">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <Button onClick={() => onNavigate('shop')}>Back to Shop</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <div className="lg:sticky lg:top-24 h-fit group">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        </div>

        
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold text-slate-900 mb-2 leading-tight">{product.name}</h1>
          <p className="text-3xl font-bold text-indigo-600 mb-8">${product.price.toFixed(2)}</p>

          <div className="prose prose-slate max-w-none mb-10">
            <div className="text-xl text-slate-700 leading-relaxed italic border-l-4 border-indigo-200 pl-6 min-h-[100px]">
              {product.description}
            </div>
          </div>

          <div className="flex items-center space-x-6 mb-10">
            <div className="flex flex-col">
              <label htmlFor="quantity-input" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Quantity</label>
              <input
                id="quantity-input"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-24 p-3 border-2 border-slate-100 rounded-xl text-center text-lg font-bold focus:border-indigo-500 outline-none transition-all"
                aria-label="Select quantity"
              />
            </div>
            <div className="flex-grow pt-6">
              <Button variant="secondary" size="lg" onClick={handleAddToCart} className="w-full h-[58px] shadow-lg shadow-indigo-200">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="mt-32 pt-20 border-t border-slate-100">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-16 underline decoration-indigo-200 underline-offset-8">You may also enjoy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {PRODUCTS.filter(p => p.id !== productId).slice(0, 3).map(relatedProduct => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
};