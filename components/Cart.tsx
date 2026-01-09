
import React from 'react';
import { CartItem } from '../types';
import ProductMockup from './ProductMockup';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onCheckout }) => {
  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const delivery = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-5xl mb-6 shadow-inner">🛒</div>
        <h3 className="text-xl font-poppins font-bold text-gray-800 mb-2">Your cart is empty</h3>
        <p className="text-gray-400 text-sm font-medium">Add some customizable magic to get started!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] pb-24">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-[2.5rem] p-4 flex gap-5 shadow-sm border border-gray-100 group animate-in slide-in-from-right duration-300">
            <div className="w-28 h-28 bg-[#F1F5F9] rounded-[2rem] overflow-hidden flex-shrink-0 border border-gray-50 relative">
              {/* Actual customized mockup shown in cart */}
              <ProductMockup 
                productId={item.productId} 
                customization={item.customization} 
                className="scale-110"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-800 text-sm leading-tight">{item.productName}</h4>
                  <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[8px] bg-[#57A6A1]/10 text-[#57A6A1] px-2.5 py-1 rounded-full uppercase font-black tracking-tighter">
                    {item.customization.side}
                  </span>
                  <span className="text-[8px] bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full uppercase font-black tracking-tighter">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-[8px] bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full uppercase font-black tracking-tighter">
                    {item.customization.productColor}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-poppins font-bold text-[#1F2937]">${item.totalPrice.toFixed(2)}</span>
                <span className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">{item.customization.printType}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary Card */}
      <div className="p-8 space-y-4 bg-white rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.03)] border-t border-gray-50">
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold text-gray-400">
            <span className="uppercase tracking-widest">Subtotal</span>
            <span className="text-gray-800 font-poppins">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-400">
            <span className="uppercase tracking-widest">Delivery Fee</span>
            <span className="text-gray-800 font-poppins">${delivery.toFixed(2)}</span>
          </div>
          <div className="h-px bg-gray-50 my-2" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-black text-gray-800 uppercase tracking-[0.2em]">Total</span>
            <span className="text-3xl font-poppins font-bold text-[#57A6A1] tracking-tighter">${total.toFixed(2)}</span>
          </div>
        </div>
        <button 
          onClick={onCheckout}
          className="w-full py-5 bg-[#57A6A1] text-white rounded-[2rem] font-bold text-lg shadow-2xl shadow-[#57A6A1]/30 active:scale-[0.98] transition-all uppercase tracking-widest mt-2"
        >
          Checkout Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
