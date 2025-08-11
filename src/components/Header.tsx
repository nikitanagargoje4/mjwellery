import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, Heart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { categories } from '../data/products';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { state, toggleCart } = useCart();
  const { state: favoritesState, toggleFavorites } = useFavorites();

  const handleCategoryClick = (categoryId: string, subcategoryId?: string) => {
    const url = subcategoryId ? `/category/${categoryId}/${subcategoryId}` : `/category/${categoryId}`;
    window.location.href = url;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center">
            {/* Clickable logo that redirects to home page */}
            <Link to="/" className="flex items-center" aria-label="Go to homepage">
              <img src="/logo4.png" alt="Mrugaya Jewelry - Company Logo" className="h-24 w-auto hover:opacity-90 transition-opacity duration-200" />
            </Link>
          </div>




          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {/* Home navigation link */}
            <Link 
              to="/" 
              className="text-gray-800 hover:text-red-900 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(category.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-gray-800 hover:text-red-900 font-medium transition-colors duration-200">
                  <span>{category.name}</span>
                  {category.subcategories && category.subcategories.length > 0 && <ChevronDown className="w-4 h-4" />}
                </button>
                
                {activeDropdown === category.id && category.subcategories && category.subcategories.length > 0 && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-amber-200 py-2">
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className="block w-full text-left px-4 py-2 text-sm font-medium text-red-900 hover:bg-amber-50 transition-colors duration-200"
                    >
                      View All {category.name}
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        onClick={() => handleCategoryClick(category.id, subcategory.id)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-red-900 transition-colors duration-200"
                      >
                        {subcategory.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-red-900 transition-colors duration-200">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-700 hover:text-red-900 transition-colors duration-200">
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleFavorites}
              className="p-2 text-gray-700 hover:text-red-900 transition-colors duration-200 relative group"
            >
              <Heart className="w-5 h-5" />
              {favoritesState.count > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {favoritesState.count}
                </span>
              )}
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                My Favorites ({favoritesState.count})
              </div>
            </button>
            <button 
              onClick={toggleCart}
              className="p-2 text-gray-700 hover:text-red-900 transition-colors duration-200 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {state.itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-amber-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="border-b border-amber-100 pb-2">
                <button 
                  onClick={() => handleCategoryClick(category.id)}
                  className="w-full text-left font-medium text-gray-800 py-2 hover:text-red-900"
                >
                  {category.name}
                </button>
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="pl-4 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        onClick={() => handleCategoryClick(category.id, subcategory.id)}
                        className="block py-1 text-sm text-gray-600 hover:text-red-900"
                      >
                        {subcategory.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;