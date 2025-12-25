import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../components/Button.jsx';
import { PRODUCTS } from '../constants.js';
import { DescriptionStyle } from '../types.js';

import { TypewriterText } from '../components/TypewriterText.jsx';
import { generateProductDescription } from '../services/geminiService.js';
;

/** @typedef {import('../jsdoc-types').PageType} PageType */
/** @typedef {import('../jsdoc-types').Product} Product */
/** @typedef {import('../jsdoc-types').NavigateFunction} NavigateFunction */

/**
 * @param {NavigateFunction} onNavigate - Function to handle navigation.
 */
export const ProductAIDescriptionPage = ({ onNavigate }) => {
  /** @type {React.useState<string | undefined>} */
  const [selectedProductId, setSelectedProductId] = useState(undefined);
  /** @type {React.useState<Product | undefined>} */
  const [selectedProduct, setSelectedProduct] = useState(undefined);
  /** @type {React.useState<string>} */
  const [generatedDescription, setGeneratedDescription] = useState('');
  /** @type {React.useState<boolean>} */
  const [loadingDescription, setLoadingDescription] = useState(false);
  /** @type {React.useState<string | null>} */
  const [geminiError, setGeminiError] = useState(null);
  /** @type {React.useState<typeof DescriptionStyle[number]>} */
  const [selectedStyle, setSelectedStyle] = useState('minimalist');
  /** @type {React.useState<boolean>} */
  const [isTypewriting, setIsTypewriting] = useState(false);

  useEffect(() => {
    if (selectedProductId) {
      const product = PRODUCTS.find(p => p.id === selectedProductId);
      setSelectedProduct(product);
      setGeneratedDescription(product ? product.description : ''); // Initialize with current description
      setGeminiError(null);
      setIsTypewriting(false);
    } else {
      setSelectedProduct(undefined);
      setGeneratedDescription('');
      setGeminiError(null);
      setIsTypewriting(false);
    }
  }, [selectedProductId]);

  const handleGenerateDescription = useCallback(async () => {
    if (!selectedProduct) {
      setGeminiError("Please select a product first.");
      return;
    }

    setLoadingDescription(true);
    setGeminiError(null);
    setIsTypewriting(false);

    try {
      const newDescription = await generateProductDescription({
        productName: selectedProduct.name,
        currentDescription: generatedDescription,
        style: selectedStyle
      });

      setGeneratedDescription(newDescription);
      setIsTypewriting(true);
    } catch (error) {
      console.error('Failed to generate description:', error);
      setGeminiError(error.message || 'Failed to generate description.');
    } finally {
      setLoadingDescription(false);
    }
  }, [selectedProduct, generatedDescription, selectedStyle]);

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-12">AI Product Description Generator</h1>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
    
        <div className="mb-8">
          <label htmlFor="product-select" className="block text-lg font-semibold text-slate-700 mb-3">
            Select a Product
          </label>
          <select
            id="product-select"
            value={selectedProductId || ''}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl text-lg font-bold focus:border-indigo-500 outline-none transition-all appearance-none bg-white bg-no-repeat bg-right-1rem bg-center-y"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236B7280'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")` }}
            aria-label="Select a product for AI description generation"
          >
            <option value="" disabled>-- Choose a product --</option>
            {PRODUCTS.map(product => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>

        {selectedProduct && (
          <div className="mb-10 p-6 bg-slate-50 rounded-lg border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{selectedProduct.name}</h3>
            <p className="text-lg text-slate-700 leading-relaxed italic min-h-[100px]">
              {isTypewriting ? <TypewriterText text={generatedDescription} /> : generatedDescription}
            </p>
          </div>
        )}

        
        <div className="relative group p-[2px] rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-xy">
          <div className="bg-white rounded-[14px] p-8 shadow-inner relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Generated AI</h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-6" role="radiogroup" aria-label="Description style selection">
              {DescriptionStyle.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedStyle === style
                    ? 'bg-slate-800 text-white shadow-md'
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                  role="radio"
                  aria-checked={selectedStyle === style}
                  aria-label={`${style} description style`}
                >
                  {style}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={handleGenerateDescription}
              disabled={loadingDescription || !selectedProduct}
              className="w-full py-4 relative overflow-hidden group/ai"
              aria-label="Refine product description with Gemini AI"
            >
              <span className={loadingDescription ? 'opacity-0' : 'opacity-100'}>
                ✨ Refine Description with Gemini
              </span>
              {loadingDescription && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                  <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mr-2" role="status" aria-label="Loading"></div>
                  <span className="text-indigo-600 font-bold">Dreaming up copy...</span>
                </div>
              )}
            </Button>

            {geminiError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center space-x-3 animate-fade-in" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-600 text-sm font-medium leading-tight">{geminiError}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};