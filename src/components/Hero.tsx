
import React from 'react';
import { Hotel } from 'lucide-react';

interface HeroProps {
  heroImage: string;
}

export const Hero: React.FC<HeroProps> = ({ heroImage }) => {
  return (
    <section className="relative h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${heroImage}")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-800/50"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Hotel className="w-16 h-16 text-amber-400 mr-4" />
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
              Grand Vista
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-amber-100 mb-8 font-light">
            Experience luxury and comfort in the heart of the city
          </p>
          <button 
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-amber-600 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Book Your Stay
          </button>
        </div>
      </div>
    </section>
  );
};