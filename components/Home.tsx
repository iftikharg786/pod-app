
import React, { useState, useEffect } from 'react';
import { Category, Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface HomeProps {
  onCategorySelect: (category: Category) => void;
  onExploreProducts: () => void;
  onSelectProduct: (product: Product) => void;
}

const HERO_SLIDES = [
  {
    title: "CRAFT\nYOUR OWN",
    subtitle: "High-quality custom products designed by you.",
    cta: "Browse All",
    bg: "from-[#57A6A1] to-[#458C88]",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=60&w=800",
    icon: "✨",
    tag: "Limited Edition"
  },
  {
    title: "LUXE\nSTITCHES",
    subtitle: "Premium embroidery for your favorite hoodies.",
    cta: "Explore Embroidery",
    bg: "from-[#E8A0B2] to-[#D6899D]",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=60&w=800",
    icon: "🧵",
    tag: "Best for Gifting",
    category: "Embroidery" as Category
  },
  {
    title: "SHARP\nEDGES",
    subtitle: "Precision laser engraving on premium steel.",
    cta: "View Engraving",
    bg: "from-[#F59E0B] to-[#D97706]",
    image: "https://images.unsplash.com/photo-1574633962370-120092965abc?auto=format&fit=crop&q=60&w=800",
    icon: "🔥",
    tag: "Business Gifts",
    category: "Laser Engraving" as Category
  }
];

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=60&w=400";

const Home: React.FC<HomeProps> = ({ onCategorySelect, onExploreProducts, onSelectProduct }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories: { label: Category; icon: string; bg: string }[] = [
    { label: 'Embroidery', icon: '🧵', bg: 'bg-teal-50 text-teal-600' },
    { label: 'Printing', icon: '🎨', bg: 'bg-pink-50 text-pink-600' },
    { label: 'Laser Engraving', icon: '🔥', bg: 'bg-orange-50 text-orange-600' },
  ];

  const handleCtaClick = (slide: typeof HERO_SLIDES[0]) => {
    if (slide.category) {
      onCategorySelect(slide.category);
    } else {
      onExploreProducts();
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className="flex flex-col gap-8 p-6 pb-24 h-full overflow-y-auto no-scrollbar">
      {/* High-End Hero Slider */}
      <div className="relative h-72 w-full flex-shrink-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${slide.bg} text-white overflow-hidden shadow-2xl transition-all duration-700 ease-in-out transform ${
              index === currentSlide ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-full scale-95'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={slide.image} 
                className="w-full h-full object-cover opacity-40 mix-blend-overlay" 
                alt="Banner Background"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 h-full flex flex-col p-8">
              <span className="inline-block self-start px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                {slide.tag}
              </span>
              <h2 className="text-3xl font-poppins font-bold leading-tight mb-2 whitespace-pre-line italic drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-white/90 text-xs mb-auto font-medium max-w-[200px] drop-shadow-md">
                {slide.subtitle}
              </p>
              <button 
                onClick={() => handleCtaClick(slide)}
                className="bg-white text-gray-800 px-6 py-3 rounded-[1.2rem] font-bold text-[10px] shadow-xl active:scale-95 transition-transform uppercase tracking-widest w-fit mt-4"
              >
                {slide.cta}
              </button>
            </div>
          </div>
        ))}

        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <section className="flex-shrink-0">
        <div className="flex justify-between items-center mb-6 px-1">
          <h3 className="font-poppins font-bold text-xl text-[#1F2937]">Craft Styles</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => onCategorySelect(cat.label)}
              className="flex flex-col items-center justify-center p-5 bg-white rounded-[2rem] shadow-sm border border-gray-50 active:scale-95 transition-all group aspect-square"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-2xl text-2xl mb-3 group-hover:scale-110 transition-transform ${cat.bg}`}>
                {cat.icon}
              </div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest text-center leading-tight">
                {cat.label.replace(' ', '\n')}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Available Collections Grid - Now showing all mock products */}
      <section className="flex-shrink-0">
        <div className="flex justify-between items-center mb-6 px-1">
          <h3 className="font-poppins font-bold text-xl text-[#1F2937]">Available Collections</h3>
          <button onClick={onExploreProducts} className="text-[#57A6A1] text-xs font-bold uppercase tracking-widest">See All</button>
        </div>
        <div className="grid grid-cols-2 gap-4 pb-10">
          {MOCK_PRODUCTS.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col group active:scale-[0.98] transition-all p-3"
              onClick={() => onSelectProduct(product)}
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-gray-50 rounded-[2rem] mb-3">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={handleImageError}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[8px] font-black text-[#57A6A1] uppercase tracking-tighter shadow-sm">
                  {product.category}
                </div>
              </div>
              <div className="px-1 pb-1">
                <h3 className="font-bold text-xs text-gray-800 line-clamp-1">{product.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[#57A6A1] font-black text-xs">${product.basePrice}</span>
                  <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-[#57A6A1] text-[10px] font-bold">
                    +
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
