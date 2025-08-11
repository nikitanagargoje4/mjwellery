import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import AddToCartButton from './AddToCartButton';
import FavoriteButton from './FavoriteButton';

const BestsellerCollections = () => {
  const collections = [
    {
      id: 1,
      name: 'Royal Thushi Set',
      price: '₹4',
      originalPrice: '₹5',
      image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 124,
      category: 'Traditional'
    },
    {
      id: 2,
      name: 'Maharani Necklace',
      price: '₹8',
      originalPrice: '₹9',
      image: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 89,
      category: 'Premium'
    },
    {
      id: 3,
      name: 'Heritage Bangles',
      price: '₹3',
      originalPrice: '₹3',
      image: 'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      reviews: 67,
      category: 'Bridal'
    },
    {
      id: 4,
      name: 'Temple Earrings',
      price: '₹1',
      originalPrice: '₹2',
      image: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      reviews: 156,
      category: 'Traditional'
    },
    {
      id: 5,
      name: 'Kundan Maang Tikka',
      price: '₹2',
      originalPrice: '₹2',
      image: 'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 93,
      category: 'Bridal'
    },
    {
      id: 6,
      name: 'Antique Waist Chain',
      price: '₹3',
      originalPrice: '₹4',
      image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      reviews: 78,
      category: 'Heritage'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2" />
            Bestseller Collections
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
            Most Loved
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600"> Creations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our customers' favorite pieces, each crafted with meticulous attention to detail 
            and inspired by centuries of Maharashtrian artistry.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-amber-100"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-red-100 p-6 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-amber-300 shadow-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-col space-y-2">
                    <div className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors duration-200">
                      <FavoriteButton
                        item={{
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          originalPrice: item.originalPrice,
                          image: item.image,
                          category: item.category,
                          rating: item.rating,
                          reviews: item.reviews,
                        }}
                        size="md"
                      />
                    </div>
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-amber-50 transition-colors duration-200">
                      <ShoppingCart className="w-5 h-5 text-amber-600" />
                    </button>
                  </div>
                </div>

                {/* Discount Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                    {Math.round((1 - parseInt(item.price.replace(/[^\d]/g, '')) / parseInt(item.originalPrice.replace(/[^\d]/g, ''))) * 100)}% OFF
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-amber-500 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({item.reviews} reviews)</span>
                </div>
                
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-red-800 transition-colors">
                  {item.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-red-600">{item.price}</span>
                    <span className="text-lg text-gray-400 line-through">{item.originalPrice}</span>
                  </div>
                </div>

                <AddToCartButton
                  item={{
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    originalPrice: item.originalPrice,
                    image: item.image,
                    category: item.category,
                    rating: item.rating,
                    reviews: item.reviews,
                  }}
                  className="w-full mt-4 py-3"
                />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            View All Collections
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestsellerCollections;