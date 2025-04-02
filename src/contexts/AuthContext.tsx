import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import * as authApi from '@/api/auth';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'employer' | 'admin';
  profileImage?: string;
  company?: string; // Added the company property to the User interface
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { 
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const mockUsers = {
  'candidate@example.com': {
    id: 'mock-candidate-id',
    email: 'candidate@example.com',
    firstName: 'John',
    lastName: 'Candidate',
    role: 'user' as const,
    profileImage: null
  },
  'employer@example.com': {
    id: 'mock-employer-id',
    email: 'employer@example.com',
    firstName: 'Jane',
    lastName: 'Employer',
    role: 'employer' as const,
    profileImage: null
  },
  'admin@example.com': {
    id: 'mock-admin-id',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as const,
    profileImage: null
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [useMockAuth, setUseMockAuth] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check localStorage for existing token
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userData = await authApi.getProfile();
      setUser({
        id: userData._id || userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        profileImage: userData.profileImage
      });
      setUseMockAuth(false);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      
      // Try to extract user info from token
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Decode the token to get user info (simplified JWT decoding)
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          
          const { id, role } = JSON.parse(jsonPayload);
          
          // Find matching mock user
          const mockUser = Object.values(mockUsers).find(m => 
            m.id === id || m.role === role
          );
          
          if (mockUser) {
            setUser(mockUser);
            setUseMockAuth(true);
            console.log('Using mock authentication');
            return;
          }
        }
      } catch (err) {
        console.error('Token parsing error:', err);
      }
      
      localStorage.removeItem('token');
      setUseMockAuth(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Try API login first
      const response = await authApi.login({ email, password });
      
      // Save token to localStorage
      localStorage.setItem('token', response.token);
      
      setUser({
        id: response.user.id,
        email: response.user.email,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        role: response.user.role,
        profileImage: response.user.profileImage
      });
      
      setUseMockAuth(false);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${response.user.firstName}!`,
      });
    } catch (error) {
      console.error('Login error:', error);
      
      // Fallback to mock auth for demo if API fails
      const mockUser = mockUsers[email];
      if (mockUser && (password === 'password123' || (email === 'admin@example.com' && password === 'admin123'))) {
        // Create a mock token
        const mockToken = btoa(JSON.stringify({ id: mockUser.id, role: mockUser.role }));
        localStorage.setItem('token', mockToken);
        
        setUser(mockUser);
        setUseMockAuth(true);
        
        toast({
          title: "Demo login successful",
          description: `Welcome to demo mode, ${mockUser.firstName}!`,
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<void> => {
    setIsLoading(true);
    
    try {
      const response = await authApi.register(userData);
      
      // Save token to localStorage
      localStorage.setItem('token', response.token);
      
      setUser({
        id: response.user.id,
        email: response.user.email,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        role: response.user.role,
        profileImage: response.user.profileImage
      });
      
      toast({
        title: "Registration successful",
        description: `Welcome to AI Job Nexus, ${response.user.firstName}!`,
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "There was a problem creating your account",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('token');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    setIsLoading(true);
    
    try {
      const response = await authApi.updateProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        profileImage: data.profileImage
      });
      
      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          profileImage: response.user.profileImage
        };
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
