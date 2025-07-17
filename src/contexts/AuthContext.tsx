import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  failedAttempts: number;
  isLocked: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password
const MAX_ATTEMPTS = 3;
const LOCKOUT_TIME = 5 * 60 * 1000; // 5 minutes
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);

  useEffect(() => {
    // Check for existing session
    const sessionData = localStorage.getItem('adminSession');
    const attempts = localStorage.getItem('failedAttempts');
    const lockout = localStorage.getItem('lockoutTime');

    if (attempts) {
      setFailedAttempts(parseInt(attempts));
    }

    if (lockout) {
      const lockoutTimestamp = parseInt(lockout);
      if (Date.now() < lockoutTimestamp) {
        setLockoutTime(lockoutTimestamp);
      } else {
        localStorage.removeItem('lockoutTime');
        localStorage.removeItem('failedAttempts');
        setFailedAttempts(0);
      }
    }

    if (sessionData) {
      const { timestamp } = JSON.parse(sessionData);
      if (Date.now() - timestamp < SESSION_DURATION) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminSession');
      }
    }
  }, []);

  const isLocked = lockoutTime ? Date.now() < lockoutTime : false;

  const login = (password: string): boolean => {
    if (isLocked) return false;

    // Simple password hash for basic security
    const hash = btoa(password);
    const expectedHash = btoa(ADMIN_PASSWORD);

    if (hash === expectedHash) {
      setIsAuthenticated(true);
      setFailedAttempts(0);
      localStorage.setItem('adminSession', JSON.stringify({ timestamp: Date.now() }));
      localStorage.removeItem('failedAttempts');
      localStorage.removeItem('lockoutTime');
      return true;
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      localStorage.setItem('failedAttempts', newAttempts.toString());

      if (newAttempts >= MAX_ATTEMPTS) {
        const lockoutTimestamp = Date.now() + LOCKOUT_TIME;
        setLockoutTime(lockoutTimestamp);
        localStorage.setItem('lockoutTime', lockoutTimestamp.toString());
      }
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminSession');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, failedAttempts, isLocked }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
