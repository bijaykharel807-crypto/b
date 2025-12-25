import React from 'react'
import { Header } from './components/Header'

import { GlobalStyles } from './components/GlobalStyles'
import { Button } from './components/Button'
import { BackToTopButton } from './components/BackToTopButton'
import { ProductCard } from './components/ProductCard'
import { TypewriterText } from './components/TypewriterText'
import { PRODUCTS } from './constants'
import { HomePage } from './pages/HomePage'
import { ProductAIDescriptionPage } from './pages/ProductAIDescriptionPage'
import { AboutPage } from './pages/AboutPage'
import { AISloganGeneratorPage } from './pages/AISloganGeneratorPage'
import { ShopPage } from './pages/ShopPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { CartPage } from './pages/CartPage'
import { ContactPage } from './pages/ContactPage'
import { AppRenderer } from './AppRenderer'
import { Footer } from './components/Footer'

const appRoutes = {
  home: HomePage,
  shop: ShopPage,
  productDetail: ProductDetailPage,
  cart: CartPage,
  about: AboutPage,
  contact: ContactPage,
  aiProductDescription: ProductAIDescriptionPage,
  aiSloganGenerator: AISloganGeneratorPage,
};



function App() {
  return (
    <>
     <Header/> 
     
     <GlobalStyles/>
     

     <BackToTopButton/>

      <AppRenderer routes={appRoutes} />
     

     
     
     
    
     
     <TypewriterText/>
     <Footer/>
    </>
  )
}

export default App
