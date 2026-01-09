
import React from 'react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBack, onBack }) => {
  const isDefaultTitle = !title || title === 'home' || title === 'Shop';

  return (
    <header className="bg-[#57A6A1] px-6 py-6 flex flex-col items-center justify-center sticky top-0 z-40 shadow-lg border-b border-[#458C88]">
      {/* Brand Identity at Top */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-[#57A6A1] shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4Z"/></svg>
        </div>
        <h1 className="text-lg font-poppins font-black text-white uppercase tracking-[0.2em]">CUSTOMIFY</h1>
      </div>
      
      {!isDefaultTitle && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2">
          {showBack && (
            <button 
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-2xl text-white border border-white/20 active:scale-90 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          )}
        </div>
      )}
      
      {!isDefaultTitle && (
        <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">{title}</span>
      )}
    </header>
  );
};

export default Header;