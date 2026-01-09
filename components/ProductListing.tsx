
import React from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface ProductListingProps {
  onSelectProduct: (product: Product) => void;
  filterCategory?: string;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=60&w=400";

const ProductListing: React.FC<ProductListingProps> = ({ onSelectProduct, filterCategory }) => {
  const products = filterCategory 
    ? MOCK_PRODUCTS.filter(p => p.category === filterCategory)
    : MOCK_PRODUCTS;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4 pb-24 h-full overflow-y-auto no-scrollbar">
      {products.map((product) => (
        <div 
          key={product.id}
          className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col group active:scale-[0.98] transition-all p-3 h-fit"
          onClick={() => onSelectProduct(product)}
        >
          <div className="aspect-[4/5] relative overflow-hidden bg-gray-50 rounded-[1.5rem] mb-3">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={handleImageError}
            />
            <div className="absolute top-3 left-3 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg text-[9px] font-bold text-[#57A6A1] uppercase tracking-widest shadow-sm">
              {product.category}
            </div>
          </div>
          <div className="px-1 pb-1">
            <h3 className="font-bold text-xs text-gray-800 line-clamp-1">{product.name}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[#57A6A1] font-black text-sm">${product.basePrice}</span>
              <button className="text-[9px] bg-[#E8A0B2] text-white px-3 py-1.5 rounded-full font-bold uppercase tracking-widest shadow-md active:scale-95 transition-all">
                Custom
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
