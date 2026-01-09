
import React from 'react';
import { Product, Customization } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ProductMockupProps {
  product?: Product;
  productId?: string;
  customization: Customization;
  className?: string;
  interactive?: boolean;
  onUpdatePosition?: (x: number, y: number) => void;
}

const ProductMockup: React.FC<ProductMockupProps> = ({ 
  product, 
  productId, 
  customization, 
  className = "", 
  interactive = false,
  onUpdatePosition 
}) => {
  const finalProduct = product || MOCK_PRODUCTS.find(p => p.id === productId);
  if (!finalProduct) return null;

  const isDarkProduct = ['black', 'navy', 'slate', 'dark grey'].includes(customization.productColor.toLowerCase());

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!interactive || !onUpdatePosition) return;
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    
    // Constrain to reasonable bounds
    onUpdatePosition(Math.max(10, Math.min(90, x)), Math.max(10, Math.min(90, y)));
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      {/* Base Product Image */}
      <img 
        src={finalProduct.image} 
        alt="Product Base" 
        className="w-[90%] h-[90%] object-contain transition-all duration-500"
        style={{ 
          filter: isDarkProduct ? 'brightness(0.3) contrast(1.1)' : 'brightness(1)',
        }}
      />
      
      {/* Interactive/Display Overlay Area */}
      <div 
        className={`absolute inset-0 z-20 ${interactive ? 'cursor-move' : ''}`}
        onMouseDown={interactive ? (e) => handleDrag(e) : undefined}
        onTouchMove={interactive ? (e) => handleDrag(e) : undefined}
      >
        <div 
          className="absolute flex flex-col items-center justify-center pointer-events-none transition-all duration-75"
          style={{ 
            left: `${customization.posX}%`, 
            top: `${customization.posY}%`,
            transform: 'translate(-50%, -50%)',
            maxWidth: '40%'
          }}
        >
          {customization.image && (
            <img 
              src={customization.image} 
              className="w-full h-auto drop-shadow-lg" 
              style={{ transform: `scale(${customization.scale})` }}
              alt="Custom Branding" 
            />
          )}
          
          {customization.text && (
            <span 
              className="w-full break-words font-bold text-center leading-tight drop-shadow-md"
              style={{ 
                fontFamily: customization.fontFamily,
                fontSize: `${(customization.fontSize || 24) * customization.scale * 0.5}px`,
                color: customization.fontColor,
                textShadow: isDarkProduct ? '0px 0px 4px rgba(255,255,255,0.3)' : '0px 0px 2px rgba(0,0,0,0.1)'
              }}
            >
              {customization.text}
            </span>
          )}
        </div>
      </div>

      {/* Side Indicator Badge */}
      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-gray-100 shadow-sm">
        <span className="text-[8px] font-black text-[#57A6A1] uppercase tracking-widest">{customization.side} View</span>
      </div>
    </div>
  );
};

export default ProductMockup;
