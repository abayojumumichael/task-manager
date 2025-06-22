'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { getUser } from '@/utils/auth'

export async function createTask(formData: FormData) {
    const supabase = await createClient()
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
        console.error('Error getting session', sessionError?.message);
        return;
    }

    const userId: string = session.user.id;

    const data = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        user_id: userId
    }

    const { error } = await supabase
        .from('tasks')
        .insert(data)
    
    if (error) {
        redirect('/error')
    }
    
    revalidatePath('/', 'layout');
    redirect('/dashboard');
}

export async function getAllTasks() {
    const supabase = await createClient();
    
    try {
        const user = await getUser();
    
        const { data, error }  = await supabase
            .from('tasks')
            .select(`title, description`)
            .eq('user_id', user.user_uuid)

        if (error) {
            console.error('Error fetching tasks:', error);
            throw new Error('Failed to fetch tasks');
        }

        return data;
    } catch (error) {
        console.error('Error in getAllTasks:', error);
        throw error;
  }
}