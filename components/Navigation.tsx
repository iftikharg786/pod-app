
import React from 'react';

interface NavProps {
  currentView: string;
  setView: (view: string) => void;
  cartCount: number;
}

const Navigation: React.FC<NavProps> = ({ currentView, setView, cartCount }) => {
  const tabs = [
    { 
      id: 'home', 
      label: 'Home',
      icon: (active: boolean) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 transition-all duration-300 ${active ? 'scale-110' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    { 
      id: 'products', 
      label: 'Shop',
      icon: (active: boolean) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 transition-all duration-300 ${active ? 'scale-110 rotate-12' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      )
    },
    { 
      id: 'cart', 
      label: 'Cart',
      count: cartCount,
      icon: (active: boolean) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 transition-all duration-300 ${active ? 'translate-x-1' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>
      )
    },
    { 
      id: 'orders', 
      label: 'Orders',
      icon: (active: boolean) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 transition-all duration-300 ${active ? 'scale-110 -translate-y-1' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
        </svg>
      )
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#57A6A1] border-t border-[#458C88] px-4 py-3 flex justify-around items-center z-50 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.2)]">
      {tabs.map((tab) => {
        const active = currentView === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`flex flex-col items-center p-2 relative transition-all duration-300 group ${
              active ? 'text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            <div className="relative">
              {tab.icon(active)}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#57A6A1] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-md animate-pulse">
                  {tab.count}
                </span>
              )}
            </div>
            <span className={`text-[9px] font-bold mt-1 uppercase tracking-widest transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-60'}`}>
              {tab.label}
            </span>
            {active && (
              <div className="absolute -bottom-1 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;