import React from 'react';

interface AboutProps {
  aboutImage: string;
}

export const About: React.FC<AboutProps> = ({ aboutImage }) => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-slate-800 mb-6">
              Welcome to 
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent"> Grand Vista</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Nestled in the heart of the city, Grand Vista offers an unparalleled luxury experience. 
              Our meticulously designed suites and world-class amenities ensure every moment of your 
              stay is extraordinary.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              With breathtaking views, exceptional service, and attention to every detail, 
              we create memories that last a lifetime. Experience the perfect blend of modern 
              elegance and timeless comfort.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">150+</div>
                <div className="text-slate-600">Luxury Suites</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">24/7</div>
                <div className="text-slate-600">Concierge</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">5★</div>
                <div className="text-slate-600">Rating</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src={aboutImage}
              alt="Hotel Interior" 
              className="rounded-2xl shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};