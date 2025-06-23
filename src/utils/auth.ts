import { createClient } from '@/utils/supabase/server';

/**
 * Helper function to get authenticated user object from Supabase
 */
export async function getUser() {
  const supabase = await createClient();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error('User not found');
  }
  
    const { data: userInfo, error: userInfoError } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_uuid', user.id)
      .single();
      
    if (userInfoError) {
      throw new Error('User info not found');
    }
    
  return userInfo;
}