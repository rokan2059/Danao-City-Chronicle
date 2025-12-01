import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://picsum.photos/seed/danao/1920/1080" 
          alt="Danao City Scenery" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-gray-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <span className="inline-block py-1 px-3 rounded-full bg-danao-500/20 border border-danao-400 text-danao-100 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm">
          Cebu, Philippines
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-white mb-6 leading-tight drop-shadow-lg">
          Discover Danao City
        </h1>
        <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
          Where industrial heritage meets eco-adventure. Experience the vibrant spirit of the Karansa Festival and the serenity of nature.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('blog-content')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Read the Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
