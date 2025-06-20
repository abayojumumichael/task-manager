'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

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

export async function getTasks() {
    const supabase = await createClient();
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
        console.error('Error getting session', sessionError?.message);
        return null;
    }
    
    const userId: string = session.user.id;
    
    const { data: tasks, error}  = await supabase
        .from('tasks')
        .select(`title, description`)
        .eq('user_id', userId)
    
    console.log(tasks);

    if (error) {
        console.log(error);
    }
}