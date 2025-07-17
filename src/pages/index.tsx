
import React, { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Amenities } from '@/components/Amenities';
import { Booking } from '@/components/Booking';
import { Contact } from '@/components/Contact';
import { AdminPanel } from '@/components/AdminPanel';
import { LoginModal } from '@/components/LoginModal';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { LogOut } from 'lucide-react';

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyAU9LRdkdOYIqQhtXytewfXw3DJ6t95ICU",
  authDomain: "music-app-b5889.firebaseapp.com",
  projectId: "music-app-b5889",
  storageBucket: "music-app-b5889.appspot.com",
  messagingSenderId: "888199501647",
  appId: "1:888199501647:web:18a233732d14fa7302973a",
  measurementId: "G-HLHP75F07V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

const IndexContent = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [images, setImages] = useState({
    hero: 'https://firebasestorage.googleapis.com/v0/b/music-app-b5889.appspot.com/o/hotel-images%2Fhero-1752093559587?alt=media&token=94768a63-7d1c-4066-85b1-e500650dcdbe',
    about: 'https://firebasestorage.googleapis.com/v0/b/music-app-b5889.appspot.com/o/hotel-images%2Fabout-1752093742805?alt=media&token=4e3ee9ef-2523-40c2-8567-4b5fcfd8eef6',
    // hero: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=800&fit=crop',
    // about: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    amenities: 'https://firebasestorage.googleapis.com/v0/b/music-app-b5889.appspot.com/o/hotel-images%2Famenities-1752093891438?alt=media&token=59442075-d25c-41ca-aabb-bf8f11739e92',
    // amenities: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop'
  });

  const [roomTypes, setRoomTypes] = useState([
    { id: 'standard', name: 'Standard Suite', price: 299 },
    { id: 'deluxe', name: 'Deluxe Suite', price: 399 },
    { id: 'premium', name: 'Premium Suite', price: 599 },
    { id: 'presidential', name: 'Presidential Suite', price: 999 }
  ]);

  const { isAuthenticated, logout } = useAuth();

  // Secret key combination to show admin access (Ctrl+Alt+A)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key === 'a') {
        event.preventDefault();
        if (isAuthenticated) {
          setShowAdmin(true);
        } else {
          setShowLogin(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  const handleAdminAccess = () => {
    if (isAuthenticated) {
      setShowAdmin(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowAdmin(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Hero heroImage={images.hero} />
      <About aboutImage={images.about} />
      <Amenities amenitiesImage={images.amenities} />
      <Booking roomTypes={roomTypes} />
      <Contact />

      {/* Admin Access Button - More discrete */}
      <button
        onClick={handleAdminAccess}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white px-3 py-2 rounded-full shadow-lg hover:from-slate-700 hover:to-slate-800 transition-all duration-300 z-50 text-sm opacity-70 hover:opacity-100"
        title="Admin Panel (Ctrl+Alt+A)"
      >
        {isAuthenticated ? 'Admin' : '•••'}
      </button>

      {/* Logout Button - Only shown when authenticated */}
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="fixed bottom-4 right-20 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-full shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 z-50 text-sm"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      )}

      {/* Login Modal */}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}

      {/* Admin Panel - Only accessible when authenticated */}
      {showAdmin && isAuthenticated && (
        <AdminPanel
          images={images}
          setImages={setImages}
          roomTypes={roomTypes}
          setRoomTypes={setRoomTypes}
          onClose={() => setShowAdmin(false)}
        />
      )}

      {/* Helper text for admin access */}
      <div className="fixed bottom-2 left-4 text-xs text-slate-400 z-40">
        Press Ctrl+Alt+A for admin access
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <IndexContent />
    </AuthProvider>
  );
};

export default Index;
