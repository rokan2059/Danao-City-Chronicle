import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-danao-600 rounded-lg flex items-center justify-center text-white font-bold font-serif">
            D
          </div>
          <h1 className={`font-serif font-bold text-xl tracking-wide ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            DANAO<span className="text-danao-500">.EXPLORE</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex gap-8">
          {['History', 'Adventure', 'Culture', 'Food'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.toLowerCase());
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else if (item.toLowerCase() === 'history') {
                   // Fallback if content hasn't loaded yet
                   document.getElementById('blog-content')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`text-sm font-medium uppercase tracking-wider hover:text-danao-500 transition-colors ${scrolled ? 'text-gray-600' : 'text-white/90'}`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;