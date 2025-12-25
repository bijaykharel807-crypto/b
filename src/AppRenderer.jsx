import React from 'react';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { BackToTopButton } from './components/BackToTopButton.jsx';
import { useNavigation } from './context/NavigationContext.jsx';

/** @typedef {import('./jsdoc-types').PageType} PageType */
/** @typedef {import('./jsdoc-types').NavigateFunction} NavigateFunction */

/**
 * @param {object} props
 * @param {Record<PageType, (props: { onNavigate: NavigateFunction, productId?: string }) => JSX.Element>} props.routes - The routes configuration object.
 * @returns {JSX.Element} The main renderer component, handling page display.
 */
export const AppRenderer = ({ routes }) => {
  const { currentPage, currentProductId, onNavigate } = useNavigation();

  const CurrentPageComponent = routes[currentPage] || routes.home; 
  let content;
  if (currentPage === 'productDetail' && currentProductId) {
    content = <CurrentPageComponent productId={currentProductId} onNavigate={onNavigate} />;
  } else if (CurrentPageComponent) {
    content = <CurrentPageComponent onNavigate={onNavigate} />;
  } else {
    content = <routes.home onNavigate={onNavigate} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow">
        {content}
      </main>
      
      
    </div>
  );
};
