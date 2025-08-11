import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Jewelry collection data for different slides
  const jewelrySlides = [
    {
      id: 1,
      title: "Gold Threads.",
      subtitle: "Stories of the Past.",
      description: "Discover timeless elegance in our exquisite collection of traditional Maharashtrian jewelry, where each piece carries the legacy of generations.",
      image: "/thushi.png",
      alt: "Traditional Gold Necklace Set",
      category: "Heritage Necklace Collection"
    },
    {
      id: 2,
      title: "Gold Threads.",
      subtitle: "Royal Elegance.",
      description: "Experience the grandeur of Maharashtrian royalty with our authentic Thushi earrings, handcrafted by master artisans using traditional techniques.",
      image: "/nath.png",
      alt: "Traditional Thushi Earrings",
      category: "Royal Thushi Collection"
    },
    {
      id: 3,
      title: "Gold Threads.",
      subtitle: "Bridal Splendor.",
      description: "Adorn yourself with our magnificent bridal bangles collection, featuring intricate designs that symbolize prosperity and marital bliss.",
      image: "https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Traditional Bridal Bangles",
      category: "Bridal Bangle Collection"
    },
    {
      id: 4,
      title: "Gold Threads.",
      subtitle: "Sacred Beauty.",
      description: "Embrace tradition with our exquisite Nath collection, featuring delicate nose rings that have adorned Maharashtrian brides for centuries.",
      image: "https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Traditional Maharashtrian Nath",
      category: "Sacred Nath Collection"
    },
    {
      id: 5,
      title: "Gold Threads.",
      subtitle: "Graceful Steps.",
      description: "Complete your traditional ensemble with our elegant anklet collection, designed to add grace and melody to every step you take.",
      image: "https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Traditional Gold Anklets",
      category: "Elegant Anklet Collection"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % jewelrySlides.length);
      }, 4500); // 4.5 seconds per slide

      return () => clearInterval(interval);
    }
  }, [isHovered, jewelrySlides.length]);

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + jewelrySlides.length) % jewelrySlides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % jewelrySlides.length);
  };

  const currentJewelry = jewelrySlides[currentSlide];

  return (
    <section 
      className="relative h-screen bg-gradient-to-br from-red-900 via-purple-900 to-amber-900 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-amber-400/30 hover:border-amber-400"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-amber-400/30 hover:border-amber-400"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Sparkles className="w-8 h-8 text-amber-400 mr-3" />
                <span className="text-amber-400 font-medium tracking-wider uppercase text-sm transition-all duration-500">
                  {currentJewelry.category}
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6 transition-all duration-500">
                {currentJewelry.title}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                  {currentJewelry.subtitle}
                </span>
              </h1>
              
              <p className="text-xl text-amber-100 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 transition-all duration-500">
                {currentJewelry.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl">
                  <span className="flex items-center">
                    Explore Collection
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black font-bold py-4 px-8 rounded-full transition-all duration-300">
                  View Heritage Story
                </button>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src={currentJewelry.image}
                  alt={currentJewelry.alt}
                  className="w-full h-full object-cover transition-all duration-700"
                  key={currentJewelry.id} // Force re-render for smooth transitions
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-amber-400 rounded-full animate-pulse opacity-80"></div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-purple-500 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute top-1/2 -right-8 w-8 h-8 bg-red-500 rounded-full animate-pulse opacity-70"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {jewelrySlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-amber-400 w-8'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-300 ease-linear"
          style={{
            width: `${((currentSlide + 1) / jewelrySlides.length) * 100}%`
          }}
        />
      </div>
    </section>
  );
};

export default Hero;