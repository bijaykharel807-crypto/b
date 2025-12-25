import React, { createContext, useContext, useCallback, useState } from 'react';

/** @typedef {import('../jsdoc-types').PageType} PageType */
/** @typedef {import('../jsdoc-types').NavigateFunction} NavigateFunction */

/**
 * @typedef {object} NavigationContextType
 * @property {PageType} currentPage
 * @property {string | undefined} currentProductId
 * @property {NavigateFunction} onNavigate
 */

const NavigationContext = createContext(undefined);

export const NavigationProvider = ({ children }) => {
  /** @type {React.useState<PageType>} */
  const [currentPage, setCurrentPage] = useState('home');
  /** @type {React.useState<string | undefined>} */
  const [currentProductId, setCurrentProductId] = useState(undefined);

  /**
   * @type {NavigateFunction}
   */
  const handleNavigate = useCallback((page, productId) => {
    setCurrentPage(page);
    setCurrentProductId(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const contextValue = {
    currentPage,
    currentProductId,
    onNavigate: handleNavigate,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
