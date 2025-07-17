
import React, { useState } from 'react';
import { X, Images, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
// import { storage } from '@/pages/Index';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface RoomType {
  id: string;
  name: string;
  price: number;
}

interface AdminPanelProps {
  images: {
    hero: string;
    about: string;
    amenities: string;
  };
  setImages: (images: any) => void;
  roomTypes: RoomType[];
  setRoomTypes: (roomTypes: RoomType[]) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ images, setImages, roomTypes, setRoomTypes, onClose }) => {
  const [uploading, setUploading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = async (file: File, imageType: string) => {
    if (!file) return;

    setUploading(imageType);

    try {
      // Create a reference to the file in Firebase Storage
      const imageRef = ref(storage, `hotel-images/${imageType}-${Date.now()}`);

      // Upload the file
      await uploadBytes(imageRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(imageRef);

      // Update the images state
      setImages((prev: any) => ({
        ...prev,
        [imageType]: downloadURL
      }));

      toast({
        title: "Image Updated!",
        description: `${imageType} image has been successfully updated.`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading the image. Please try again.",
        variant: "destructive",
      });
    }

    setUploading(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, imageType: string) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file, imageType);
    }
  };

  const handleRoomTypeChange = (index: number, field: 'name' | 'price', value: string) => {
    const updatedRoomTypes = [...roomTypes];
    if (field === 'price') {
      updatedRoomTypes[index][field] = parseInt(value) || 0;
    } else {
      updatedRoomTypes[index][field] = value;
    }
    setRoomTypes(updatedRoomTypes);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center">
            <Images className="w-6 h-6 text-amber-500 mr-3" />
            <h2 className="text-2xl font-bold text-slate-800">Admin Panel</h2>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          <p className="text-slate-600">
            Upload new images to update the website. Images will be stored in Firebase Storage.
          </p>

          {/* Hero Image */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-slate-700">Hero Section Image</Label>
            <div className="flex items-center space-x-4">
              <img
                src={images.hero}
                alt="Current hero"
                className="w-24 h-16 object-cover rounded-lg border border-slate-200"
              />
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'hero')}
                  disabled={uploading === 'hero'}
                  className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </div>
            {uploading === 'hero' && (
              <div className="flex items-center text-amber-600">
                <Upload className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </div>
            )}
          </div>

          {/* About Image */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-slate-700">About Section Image</Label>
            <div className="flex items-center space-x-4">
              <img
                src={images.about}
                alt="Current about"
                className="w-24 h-16 object-cover rounded-lg border border-slate-200"
              />
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'about')}
                  disabled={uploading === 'about'}
                  className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </div>
            {uploading === 'about' && (
              <div className="flex items-center text-amber-600">
                <Upload className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </div>
            )}
          </div>

          {/* Amenities Image */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-slate-700">Amenities Section Image</Label>
            <div className="flex items-center space-x-4">
              <img
                src={images.amenities}
                alt="Current amenities"
                className="w-24 h-16 object-cover rounded-lg border border-slate-200"
              />
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'amenities')}
                  disabled={uploading === 'amenities'}
                  className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </div>
            {uploading === 'amenities' && (
              <div className="flex items-center text-amber-600">
                <Upload className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </div>
            )}
          </div>

          {/* Room Types Management */}
          <div className="space-y-6">
            <div className="border-t border-slate-200 pt-8">
              <Label className="text-lg font-semibold text-slate-700 mb-4 block">Room Types & Pricing</Label>
              <div className="space-y-4">
                {roomTypes.map((room, index) => (
                  <div key={room.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Room Name</Label>
                      <Input
                        value={room.name}
                        onChange={(e) => handleRoomTypeChange(index, 'name', e.target.value)}
                        className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Price per Night (UGX)</Label>
                      <Input
                        type="number"
                        value={room.price}
                        onChange={(e) => handleRoomTypeChange(index, 'price', e.target.value)}
                        className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> You'll need to configure your Firebase project settings in the Index.tsx file
              with your actual Firebase configuration values for image uploads to work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};