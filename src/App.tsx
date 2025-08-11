import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/Header';
import Hero from './components/Hero';
import BestsellerCollections from './components/BestsellerCollections';
import CulturalHighlights from './components/CulturalHighlights';
import Footer from './components/Footer';
import FloatingChat from './components/FloatingChat';
import CartDrawer from './components/CartDrawer';
import FavoritesDrawer from './components/FavoritesDrawer';
import CategoryPage from './components/CategoryPage';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <CartProvider>
          <div className="min-h-screen font-sans">
            <Header />
            <Routes>
              <Route path="/" element={
                <main>
                  <Hero />
                  <BestsellerCollections />
                  <CulturalHighlights />
                </main>
              } />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/category/:categoryId/:subcategoryId" element={<CategoryPage />} />
            </Routes>
            <Footer />
            <FloatingChat />
            <CartDrawer />
            <FavoritesDrawer />
          </div>
        </CartProvider>
      </FavoritesProvider>
    </Router>
  );
}

export default App;