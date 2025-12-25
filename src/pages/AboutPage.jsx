import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../components/Button.jsx';
import { AboutStyle } from '../types.js';
import { generateAboutDescription } from '../services/geminiService.js';
import { TypewriterText } from '../components/TypewriterText.jsx';

const initialPhilosophy = `In a world of fast-paced consumption, we choose to slow down. Our collection is curated with a focus on longevity over trends. We work exclusively with artisans who prioritize ethical sourcing and traditional craftsmanship. From the initial concept to the final touch, we ensure that every product not only meets but exceeds your expectations, bringing a sophisticated touch to your everyday life.`;

export const AboutPage = () => {
  const [philosophyText, setPhilosophyText] = useState(initialPhilosophy);
  const [loadingPhilosophy, setLoadingPhilosophy] = useState(false);
  const [geminiError, setGeminiError] = useState(null);
  const [selectedAboutStyle, setSelectedAboutStyle] = useState('visionary');
  const [isTypewriting, setIsTypewriting] = useState(false);

  const handleGeneratePhilosophy = useCallback(async () => {
    setLoadingPhilosophy(true);
    setGeminiError(null);
    setIsTypewriting(false);

    try {
      const newPhilosophy = await generateAboutDescription({
        currentPhilosophy: philosophyText,
        style: selectedAboutStyle
      });

      setPhilosophyText(newPhilosophy);
      setIsTypewriting(true);
    } catch (error) {
      console.error('Failed to generate about description:', error);
      setGeminiError(error.message || 'Failed to generate philosophy.');
    } finally {
      setLoadingPhilosophy(false);
    }
  }, [philosophyText, selectedAboutStyle]);

  return (
    <div className="min-h-screen">
      
      <section className="bg-slate-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">Our Story</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Crafting elegance since 2010. We believe that the objects we surround ourselves with should tell a story of quality, passion, and timeless design.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <img 
              src="https://picsum.photos/id/175/800/600" 
              alt="Design Philosophy" 
              className="rounded-xl shadow-2xl"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Philosophy</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6 italic min-h-[150px]">
              {isTypewriting ? <TypewriterText text={philosophyText} /> : philosophyText}
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-indigo-600 text-xl mb-2">Sustainable</h4>
                <p className="text-slate-600">Committed to natural materials and eco-friendly processes.</p>
              </div>
              <div>
                <h4 className="font-bold text-indigo-600 text-xl mb-2">Artisan</h4>
                <p className="text-slate-600">Hand-selected pieces from master craftsmen worldwide.</p>
              </div>
            </div>

           
            <div className="relative group p-[2px] rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-xy mt-12">
              <div className="bg-white rounded-[14px] p-8 shadow-inner relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Generated AI</h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-6" role="radiogroup" aria-label="Philosophy style selection">
                  {AboutStyle.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedAboutStyle(style)}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                        selectedAboutStyle === style 
                        ? 'bg-slate-800 text-white shadow-md' 
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                      }`}
                      role="radio"
                      aria-checked={selectedAboutStyle === style}
                      aria-label={`${style} philosophy style`}
                    >
                      {style}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={handleGeneratePhilosophy}
                  disabled={loadingPhilosophy}
                  className="w-full py-4 relative overflow-hidden group/ai"
                  aria-label="Refine company philosophy with Gemini AI"
                >
                  <span className={loadingPhilosophy ? 'opacity-0' : 'opacity-100'}>
                    ✨ Refine Philosophy with Gemini
                  </span>
                  {loadingPhilosophy && (
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
      </section>

      
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">The Visionaries</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Julian Vane', role: 'Founder & Curator', img: 'https://picsum.photos/id/64/400/400' },
              { name: 'Elena Rossi', role: 'Head of Design', img: 'https://picsum.photos/id/65/400/400' },
              { name: 'Marcus Thorne', role: 'Sustainability Lead', img: 'https://picsum.photos/id/66/400/400' }
            ].map((member, i) => (
              <div key={i} className="group">
                <div className="relative overflow-hidden rounded-full w-48 h-48 mx-auto mb-6 border-4 border-indigo-500 transition-transform duration-500 group-hover:scale-110">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-indigo-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};