import React, { useEffect } from 'react';

export const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animate-fade-in {
        animation: fadeIn 1s ease-out forwards;
      }

      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-slide-up {
        animation: slideUp 0.8s ease-out forwards;
      }

      @keyframes gradient-xy {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      .animate-gradient-xy {
        background-size: 200% 200%;
        animation: gradient-xy 5s ease infinite;
      }

      .animate-fade-in-delay {
        animation: fadeIn 1.2s ease-out 0.3s forwards;
        opacity: 0;
      }
      .animate-fade-in-delay-more {
        animation: fadeIn 1.2s ease-out 0.6s forwards;
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []); 

  return null; 
};
