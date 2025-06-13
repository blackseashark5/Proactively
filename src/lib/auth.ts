import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  role?: 'user' | 'admin';
}

export const auth = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Fetch user role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', data.user.id)
      .single();

    return {
      ...data,
      user: {
        ...data.user,
        role: roleData?.role || 'user'
      } as AuthUser
    };
  },

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) throw error;

    // Create user role
    if (data.user) {
      await supabase.from('user_roles').insert({
        user_id: data.user.id,
        role: 'user'
      });
    }

    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    // Fetch user role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    return {
      ...user,
      role: roleData?.role || 'user'
    };
  }
};