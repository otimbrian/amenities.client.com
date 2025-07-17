import React, { useState } from 'react';
import { Calendar, Mail, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

// import React from 'react';

type RoomType = {
  id: string;
  name: string;
  price: number;
};

interface BookingProps {
  roomTypes: RoomType[];
}

// const Booking: React.FC<BookingProps> = ({ roomTypes }) => {
//   // component implementation
// };


export const Booking: React.FC <BookingProps>= ({roomTypes}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
    roomType: 'standard',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS (replace with your actual IDs)
      const result = await emailjs.send(
        'service_613m127', // Replace with your EmailJS service ID
        'template_1cqs5tp', // Replace with your EmailJS template ID
        {
          to_email: 'admin@grandvista.com', // Admin email
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          check_in: formData.checkIn,
          check_out: formData.checkOut,
          guests: formData.guests,
          room_type: formData.roomType,
          special_requests: formData.specialRequests,
          message: `New booking request from ${formData.name}`
        },
        'Oe1UztTPM8At4WP1s' // Replace with your EmailJS public key
      );

      toast({
        title: "Booking Request Sent!",
        description: "We'll contact you within 24 hours to confirm your reservation.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '1',
        roomType: 'standard',
        specialRequests: ''
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Error",
        description: "There was an issue sending your booking request. Please try again or contact us directly.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="booking" className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <CalendarCheck className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-5xl font-bold text-slate-800 mb-6">
            Book Your <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Stay</span>
          </h2>
          <p className="text-xl text-slate-600">
            Reserve your luxury experience today
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-slate-700 font-medium">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-slate-700 font-medium">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone" className="text-slate-700 font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              <div>
                <Label htmlFor="guests" className="text-slate-700 font-medium">Number of Guests</Label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="checkIn" className="text-slate-700 font-medium">Check-in Date *</Label>
                <Input
                  id="checkIn"
                  name="checkIn"
                  type="date"
                  required
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              <div>
                <Label htmlFor="checkOut" className="text-slate-700 font-medium">Check-out Date *</Label>
                <Input
                  id="checkOut"
                  name="checkOut"
                  type="date"
                  required
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="roomType" className="text-slate-700 font-medium">Room Type</Label>
              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="standard">Standard Suite - UGX 299000/night</option>
                <option value="deluxe">Deluxe Suite - UGX 399000/night</option>
                <option value="premium">Premium Suite - UGX 599000/night</option>
                <option value="presidential">Presidential Suite - UGX 999000/night</option>
              </select>
            </div>

            <div>
              <Label htmlFor="specialRequests" className="text-slate-700 font-medium">Special Requests</Label>
              <Textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Any special requests or requirements..."
                className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {isSubmitting ? 'Sending Request...' : 'Send Booking Request'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};