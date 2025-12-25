import React from 'react';
import { Button } from '../components/Button.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { PRODUCTS } from '../constants.js';

/** @typedef {import('../jsdoc-types').PageType} PageType */
/** @typedef {import('../jsdoc-types').NavigateFunction} NavigateFunction */

/**
 * @param {NavigateFunction} onNavigate 
 */
export const HomePage = ({ onNavigate }) => {
  const featuredProducts = PRODUCTS.slice(0, 4); 

  return (
    <div className="min-h-screen">
      
      <section className="relative h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center text-white">
        <img
          src="https://picsum.photos/id/1060/1920/1080"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover object-center animate-fade-in"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center p-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            Curated Elegance for Your Home
          </h1>
          <p className="text-lg sm:text-xl mb-10 opacity-90 animate-fade-in-delay">
            Discover a world of exquisite designs and unparalleled craftsmanship.
          </p>
          <Button variant="primary" size="lg" onClick={() => onNavigate('shop')} className="animate-fade-in-delay-more">
            Shop The Collection
          </Button>
        </div>
      </section>

      
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-800">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" onClick={() => onNavigate('shop')}>
            View All Products
          </Button>
        </div>
      </section>

      
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <img
              src="https://picsum.photos/id/400/900/600"
              alt="Craftsmanship"
              className="rounded-lg shadow-lg object-cover w-full h-96"
            />
          </div>
          <div className="md:w-1/2 text-left">
            <h3 className="text-3xl font-bold mb-6 text-slate-800">Our Commitment to Quality</h3>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              At Elegance, we believe in the timeless beauty of handcrafted items. Each piece in our collection is
              carefully selected for its exceptional quality, unique design, and sustainable origins. We partner with
              artisans who share our passion for excellence and dedication to their craft.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              From the initial concept to the final touch, we ensure that every product not only meets but exceeds
              your expectations, bringing a sophisticated touch to your everyday life.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};