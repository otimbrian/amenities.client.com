
import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section className="bg-slate-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Contact Information</h2>
          <p className="text-slate-300 text-lg">Get in touch with us for reservations and inquiries</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-slate-300">+1 (555) 123-4567</p>
            <p className="text-slate-300">+1 (555) 123-4568</p>
          </div>
          
          <div className="text-center">
            <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-slate-300">reservations@grandvista.com</p>
            <p className="text-slate-300">info@grandvista.com</p>
          </div>
          
          <div className="text-center">
            <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-slate-300">123 Luxury Avenue</p>
            <p className="text-slate-300">Downtown, NY 10001</p>
          </div>
          
          <div className="text-center">
            <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Front Desk</h3>
            <p className="text-slate-300">24/7 Available</p>
            <p className="text-slate-300">Always at your service</p>
          </div>
        </div>
        
        <div className="text-center mt-12 pt-8 border-t border-slate-700">
          <p className="text-slate-400">© 2024 Grand Vista Hotel. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};