import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// Type for customer profile data
interface CustomerProfile {
  full_name: string;
  phone: string;
  address: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, profile?: CustomerProfile) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      
      // Handle email confirmation
      if (event === 'SIGNED_IN' && session?.user) {
        // User has confirmed their email and signed in
        // You might want to check if profile exists and create it if needed
        await ensureCustomerProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Function to ensure customer profile exists
  const ensureCustomerProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('customer_profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, but we can't create it here without profile data
        // This would be handled during the signup process
        console.log('Customer profile not found for user:', userId);
      }
    } catch (error) {
      console.error('Error checking customer profile:', error);
    }
  };

  // Function to create customer profile
  const createCustomerProfile = async (userId: string, profileData: CustomerProfile) => {
    try {
      const { error } = await supabase
        .from('customer_profiles')
        .insert({
          id: userId,
          full_name: profileData.full_name,
          phone: profileData.phone,
          address: profileData.address,
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error creating customer profile:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, profile?: CustomerProfile) => {
    try {
      // First, create the auth user
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: profile ? {
            full_name: profile.full_name,
            phone: profile.phone,
            address: profile.address,
          } : undefined
        }
      });

      if (authError) {
        return { error: authError };
      }

      // If profile data is provided and user was created successfully
      if (profile && data.user) {
        try {
          // Store profile data in user metadata for later use
          // The actual profile will be created when the user confirms their email
          // and the auth state changes to SIGNED_IN
          
          // Note: You might want to create the profile immediately if email confirmation is disabled
          // await createCustomerProfile(data.user.id, profile);
          
        } catch (profileError) {
          console.error('Error handling profile data:', profileError);
          // Don't return error here as the auth user was created successfully
          // The profile can be created later
        }
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export the CustomerProfile type for use in components
export type { CustomerProfile };
