
import React, { useState, useRef } from 'react';
import { Product, Customization, PlacementSide, Category } from '../types';
import ProductMockup from './ProductMockup';

interface CustomizerProps {
  product: Product;
  onAddToCart: (customization: Customization, quantity: number) => void;
  onBack: () => void;
}

const SIDES: PlacementSide[] = ['Front', 'Back', 'Left', 'Right', 'Top', 'Bottom'];
const PRINT_TYPES: Category[] = ['Printing', 'Embroidery', 'Laser Engraving'];

const POSITION_PRESETS = [
  { label: 'Center', x: 50, y: 50 },
  { label: 'Left Chest', x: 35, y: 35 },
  { label: 'Right Chest', x: 65, y: 35 },
  { label: 'Bottom Left', x: 25, y: 75 },
  { label: 'Bottom Right', x: 75, y: 75 },
];

const Customizer: React.FC<CustomizerProps> = ({ product, onAddToCart, onBack }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'logo'>('text');
  const [customization, setCustomization] = useState<Customization>({
    text: '',
    fontFamily: 'sans-serif',
    fontSize: 24,
    fontColor: '#000000',
    side: 'Front',
    posX: 50,
    posY: 50,
    scale: 1,
    printType: product.category,
    productColor: product.colors[0],
    image: undefined,
    size: product.sizes ? product.sizes[0] : undefined,
  });
  const [quantity, setQuantity] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomization({ ...customization, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const applyPreset = (x: number, y: number) => {
    setCustomization({ ...customization, posX: x, posY: y });
  };

  const totalPrice = (product.basePrice * quantity) + (customization.text ? 5 : 0) + (customization.image ? 10 : 0);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* 1. Header with Back Button - Themed Green */}
      <div className="px-6 py-4 bg-[#57A6A1] flex items-center justify-between shadow-lg sticky top-0 z-30">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-2xl text-white border border-white/20 active:scale-90 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="flex flex-col items-center text-center">
          <span className="text-[9px] font-black text-white/80 uppercase tracking-[0.3em] mb-0.5 leading-none">DESIGNING</span>
          <h2 className="text-xs font-poppins font-black text-white uppercase tracking-widest leading-none">{product.name}</h2>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* 2. ALWAYS VISIBLE PREVIEW (STICKY TOP) */}
        <div className="sticky top-0 z-20 w-full bg-[#F8FAFC] p-4 pb-2">
          <div className="w-full aspect-square bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative flex items-center justify-center group">
            <ProductMockup 
              product={product} 
              customization={customization} 
              interactive={true} 
              onUpdatePosition={(x, y) => setCustomization({ ...customization, posX: x, posY: y })}
            />
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[7px] font-black text-white uppercase tracking-widest pointer-events-none transition-opacity group-hover:opacity-100">
               Live Design Center
            </div>
          </div>
        </div>

        {/* 3. CONTROLS */}
        <div className="px-6 pb-40 space-y-6 mt-2">
          
          {/* Main Product Options Card */}
          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm space-y-5">
            <div className="grid grid-cols-2 gap-4">
               {/* Size Selector */}
               {product.sizes && (
                <div>
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Size</label>
                  <select 
                    value={customization.size}
                    onChange={(e) => setCustomization({...customization, size: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-bold text-[10px] outline-none"
                  >
                    {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}
              {/* Print Type Selector */}
              <div>
                <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Print Method</label>
                <select 
                  value={customization.printType}
                  onChange={(e) => setCustomization({...customization, printType: e.target.value as Category})}
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-bold text-[10px] outline-none"
                >
                  {PRINT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Product Color</label>
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setCustomization({...customization, productColor: color})}
                    className={`w-10 h-10 rounded-xl border-2 transition-all flex-shrink-0 flex items-center justify-center ${
                      customization.productColor === color ? 'border-[#57A6A1] scale-110 shadow-sm' : 'border-transparent bg-gray-50'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg border border-black/5" style={{ backgroundColor: color.toLowerCase() === 'white' ? '#fcfcfc' : color.toLowerCase() === 'natural' ? '#f5f5dc' : color.toLowerCase() }} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Placement & Side Card */}
          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
             <div className="flex justify-between items-center">
               <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Side & Placement</label>
               <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-[60%]">
                {SIDES.slice(0, 2).map(s => (
                  <button 
                    key={s}
                    onClick={() => setCustomization({...customization, side: s})}
                    className={`px-3 py-1.5 rounded-lg font-bold text-[8px] uppercase tracking-tighter transition-all ${customization.side === s ? 'bg-[#57A6A1] text-white' : 'bg-gray-50 text-gray-400'}`}
                  >
                    {s}
                  </button>
                ))}
               </div>
             </div>
             
             <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
               {POSITION_PRESETS.map(preset => (
                 <button 
                  key={preset.label}
                  onClick={() => applyPreset(preset.x, preset.y)}
                  className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[8px] font-bold text-gray-500 hover:border-[#57A6A1] hover:text-[#57A6A1] whitespace-nowrap"
                 >
                   {preset.label}
                 </button>
               ))}
             </div>
          </div>

          {/* Text/Logo Tabs */}
          <div className="space-y-4">
            <div className="flex gap-2 p-1.5 bg-gray-100/50 rounded-2xl border border-gray-100">
              <button onClick={() => setActiveTab('text')} className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'text' ? 'bg-white text-[#57A6A1] shadow-sm' : 'text-gray-400'}`}>✍️ Custom Text</button>
              <button onClick={() => setActiveTab('logo')} className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'logo' ? 'bg-white text-[#57A6A1] shadow-sm' : 'text-gray-400'}`}>🖼️ Your Logo</button>
            </div>

            <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
              {activeTab === 'text' ? (
                <div className="space-y-4">
                  <input 
                    type="text"
                    value={customization.text}
                    onChange={(e) => setCustomization({...customization, text: e.target.value.toUpperCase()})}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-800 text-sm placeholder:text-gray-300"
                    placeholder="ENTER YOUR MESSAGE..."
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select 
                      className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl font-bold text-[9px] outline-none"
                      value={customization.fontFamily}
                      onChange={(e) => setCustomization({...customization, fontFamily: e.target.value})}
                    >
                      <option value="sans-serif">MODERN SANS</option>
                      <option value="cursive">LUXE SCRIPT</option>
                      <option value="serif">SERIF</option>
                    </select>
                    <input 
                      type="color"
                      value={customization.fontColor}
                      onChange={(e) => setCustomization({...customization, fontColor: e.target.value})}
                      className="w-full h-[45px] p-1 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-8 border-2 border-dashed border-[#57A6A1]/20 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-teal-50/30 transition-colors"
                  >
                    <div className="text-2xl">{customization.image ? '✅ Image Ready' : '📤 Upload Design'}</div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Tap to browse files</span>
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Adjust Design Size</span>
                  <span className="text-[9px] font-bold text-[#57A6A1]">{Math.round(customization.scale * 100)}%</span>
                </div>
                <input 
                  type="range" min="0.5" max="2" step="0.1"
                  value={customization.scale}
                  onChange={(e) => setCustomization({...customization, scale: parseFloat(e.target.value)})}
                  className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#57A6A1]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. STICKY BOTTOM ACTION BAR */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-40 flex items-center justify-between gap-4">
        <div className="flex items-center bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-white rounded-xl shadow-sm font-bold text-[#57A6A1]">-</button>
          <span className="font-bold w-10 text-center text-sm">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-white rounded-xl shadow-sm font-bold text-[#57A6A1]">+</button>
        </div>
        
        <button 
          onClick={() => onAddToCart(customization, quantity)}
          className="flex-1 py-4 bg-[#57A6A1] text-white rounded-[1.5rem] font-bold text-sm shadow-xl shadow-[#57A6A1]/20 active:scale-95 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <span>Add to Bag</span>
          <span className="opacity-40">•</span>
          <span>${totalPrice.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};

export default Customizer;