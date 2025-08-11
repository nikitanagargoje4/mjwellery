import { Product, Category } from '../types/product';

export const categories: Category[] = [
  {
    id: 'all-jewellery',
    name: 'All Jewellery',
    description: 'Complete collection of traditional Maharashtrian jewelry',
    image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=800',
    subcategories: [
      { id: 'thushi', name: 'Thushi', description: 'Traditional Maharashtrian necklaces', image: '/thushi.png' },
      { id: 'earrings', name: 'Earrings', description: 'Elegant traditional earrings', image: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'bracelets', name: 'Bracelets', description: 'Beautiful traditional bracelets', image: 'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'rings', name: 'Rings', description: 'Exquisite traditional rings', image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'anklets', name: 'Anklets', description: 'Graceful traditional anklets', image: 'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'nath', name: 'Nath', description: 'Traditional nose rings', image: '/nath.png' }
    ]
  },
  {
    id: 'mangalsutra',
    name: 'Mangalsutra',
    description: 'Sacred marriage jewelry with traditional significance',
    image: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=800',
    subcategories: [
      { id: 'diamond-mangalsutra', name: 'Diamond', description: 'Diamond studded mangalsutras', image: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'daily-wear', name: 'Daily Wear', description: 'Comfortable everyday mangalsutras', image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'gold-polish', name: 'Gold Polish', description: 'Traditional gold polished designs', image: 'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ]
  },
  {
    id: 'nath-category',
    name: 'Nath',
    description: 'Traditional Maharashtrian nose jewelry',
    image: '/nath.png',
    subcategories: [
      { id: 'gold-nath', name: 'Gold', description: 'Pure gold nath designs', image: '/nath.png' },
      { id: 'moti-nath', name: 'Moti', description: 'Pearl studded nath', image: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'oxide-nath', name: 'Oxide', description: 'Oxidized silver nath', image: 'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'handmade-nath', name: 'Handmade', description: 'Handcrafted traditional nath', image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'custom-nath', name: 'Customise', description: 'Custom designed nath', image: '/nath.png' }
    ]
  },
  {
    id: 'oxide',
    name: 'Oxide',
    description: 'Oxidized silver jewelry with antique finish',
    image: 'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=800',
    subcategories: [
      { id: 'oxide-bangles', name: 'Bangles', description: 'Oxidized silver bangles', image: 'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'oxide-thushi', name: 'Thushi', description: 'Oxidized silver thushi sets', image: '/thushi.png' },
      { id: 'oxide-nath-sub', name: 'Nath', description: 'Oxidized silver nath', image: '/nath.png' }
    ]
  },
  {
    id: 'bridal',
    name: 'Bridal',
    description: 'Complete bridal jewelry collections',
    image: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=800',
    subcategories: [
      { id: 'maharashtrian-bridal', name: 'Maharashtrian', description: 'Traditional Maharashtrian bridal sets', image: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'south-indian-bridal', name: 'South Indian', description: 'South Indian bridal jewelry', image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ]
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Royal Thushi Set',
    price: '₹45,999',
    originalPrice: '₹52,999',
    image: '/thushi.png',
    modelImage: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'all-jewellery',
    subcategory: 'thushi',
    rating: 4.8,
    reviews: 124,
    description: 'Exquisite traditional Maharashtrian Thushi set crafted with 22K gold and adorned with precious pearls. This masterpiece represents the rich cultural heritage of Maharashtra and is perfect for weddings and special occasions.',
    specifications: {
      material: '22K Gold',
      weight: '45 grams',
      dimensions: '18 inches length',
      purity: '916 Hallmarked',
      gemstones: ['Natural Pearls', 'Ruby']
    },
    images: [
      '/thushi.png',
      'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: true,
    tags: ['traditional', 'wedding', 'gold', 'pearls', 'maharashtrian']
  },
  {
    id: 2,
    name: 'Maharani Necklace',
    price: '₹89,999',
    originalPrice: '₹99,999',
    image: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=400',
    modelImage: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'all-jewellery',
    subcategory: 'thushi',
    rating: 4.9,
    reviews: 89,
    description: 'A regal necklace fit for a queen, featuring intricate gold work and precious gemstones. This piece embodies the grandeur of Maratha royalty.',
    specifications: {
      material: '22K Gold',
      weight: '65 grams',
      dimensions: '20 inches length',
      purity: '916 Hallmarked',
      gemstones: ['Emerald', 'Ruby', 'Diamond']
    },
    images: [
      'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: true,
    tags: ['premium', 'royal', 'gold', 'gemstones', 'necklace']
  },
  {
    id: 3,
    name: 'Heritage Bangles Set',
    price: '₹32,999',
    originalPrice: '₹38,999',
    image: 'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=400',
    modelImage: 'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'all-jewellery',
    subcategory: 'bracelets',
    rating: 4.7,
    reviews: 67,
    description: 'Traditional gold bangles with intricate patterns representing prosperity and marital bliss. Perfect for brides and special occasions.',
    specifications: {
      material: '22K Gold',
      weight: '35 grams (pair)',
      dimensions: '2.5 inches diameter',
      purity: '916 Hallmarked'
    },
    images: [
      'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: false,
    tags: ['bridal', 'bangles', 'gold', 'traditional', 'pair']
  },
  {
    id: 4,
    name: 'Traditional Nath',
    price: '₹15,999',
    originalPrice: '₹18,999',
    image: '/nath.png',
    modelImage: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'nath-category',
    subcategory: 'gold-nath',
    rating: 4.6,
    reviews: 156,
    description: 'Authentic Maharashtrian Nath with delicate gold work and pearl drops. A symbol of marital status and traditional beauty.',
    specifications: {
      material: '22K Gold',
      weight: '8 grams',
      dimensions: '3 inches length',
      purity: '916 Hallmarked',
      gemstones: ['Natural Pearls']
    },
    images: [
      '/nath.png',
      'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: true,
    tags: ['nath', 'traditional', 'gold', 'pearls', 'bridal']
  },
  {
    id: 5,
    name: 'Diamond Mangalsutra',
    price: '₹125,999',
    originalPrice: '₹145,999',
    image: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=400',
    modelImage: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'mangalsutra',
    subcategory: 'diamond-mangalsutra',
    rating: 4.9,
    reviews: 203,
    description: 'Elegant diamond mangalsutra combining traditional significance with modern aesthetics. Perfect for the contemporary bride.',
    specifications: {
      material: '18K Gold',
      weight: '25 grams',
      dimensions: '16 inches length',
      purity: '750 Hallmarked',
      gemstones: ['Diamonds (0.5 carat total)']
    },
    images: [
      'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: true,
    tags: ['mangalsutra', 'diamond', 'modern', 'bridal', 'gold']
  },
  {
    id: 6,
    name: 'Oxidized Silver Bangles',
    price: '₹2,999',
    originalPrice: '₹3,999',
    image: 'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=400',
    modelImage: 'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'oxide',
    subcategory: 'oxide-bangles',
    rating: 4.4,
    reviews: 89,
    description: 'Beautifully crafted oxidized silver bangles with traditional motifs. Perfect for daily wear and ethnic occasions.',
    specifications: {
      material: 'Sterling Silver',
      weight: '40 grams (set of 4)',
      dimensions: '2.4 inches diameter',
      purity: '925 Silver'
    },
    images: [
      'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: false,
    tags: ['oxidized', 'silver', 'bangles', 'daily-wear', 'affordable']
  }
];

export const getProductsByCategory = (categoryId: string, subcategoryId?: string): Product[] => {
  return products.filter(product => {
    if (subcategoryId) {
      return product.category === categoryId && product.subcategory === subcategoryId;
    }
    return product.category === categoryId;
  });
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};