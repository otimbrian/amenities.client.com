
import React from 'react';

interface AmenitiesProps {
  amenitiesImage: string;
}

export const Amenities: React.FC<AmenitiesProps> = ({ amenitiesImage }) => {
  const amenities = [
    { title: 'Spa & Wellness', description: 'Rejuvenate your body and mind' },
    { title: 'Fine Dining', description: 'Michelin-starred restaurant on-site' },
    { title: 'Rooftop Pool', description: 'Infinity pool with city views' },
    { title: 'Fitness Center', description: '24/7 state-of-the-art equipment' },
    { title: 'Business Center', description: 'Modern meeting and conference facilities' },
    { title: 'Valet Parking', description: 'Complimentary valet service' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-100 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-800 mb-6">
            World-Class <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Amenities</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Every detail has been carefully crafted to exceed your expectations
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src={amenitiesImage}
              alt="Hotel Amenities" 
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {amenities.map((amenity, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100"
              >
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{amenity.title}</h3>
                <p className="text-slate-600">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
