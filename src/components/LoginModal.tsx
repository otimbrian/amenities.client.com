import React, { useState } from 'react';
import { X, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, failedAttempts, isLocked } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLocked) {
      setError('Too many failed attempts. Please try again in 5 minutes.');
      return;
    }

    const success = login(password);
    
    if (success) {
      onClose();
    } else {
      setError(`Invalid password. ${3 - failedAttempts - 1} attempts remaining.`);
      setPassword('');
    }
  };

  const getRemainingLockoutTime = () => {
    // This is a simple approximation - in a real app you'd want more precise timing
    return Math.ceil(5 - (failedAttempts * 1.67)); // Rough estimate
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center">
            <Lock className="w-6 h-6 text-amber-500 mr-3" />
            <h2 className="text-2xl font-bold text-slate-800">Admin Access</h2>
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

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-lg font-semibold text-slate-700">
              Enter Admin Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              disabled={isLocked}
              className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          {error && (
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {isLocked && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                Account locked due to too many failed attempts. Please try again in 5 minutes.
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={!password || isLocked}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
          >
            {isLocked ? 'Account Locked' : 'Login'}
          </Button>

          <div className="text-center">
            <p className="text-xs text-slate-500">
              Session expires after 1 hour of inactivity
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};