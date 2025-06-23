'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { getUser } from '@/utils/auth'

export async function createTask(formData: FormData) {
    const supabase = await createClient()

    const user = await getUser();

    const data = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        user_id: user.user_uuid,
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

export async function deleteTask(taskID: string) {
    const supabase = await createClient()

    try {
        const user = await getUser();

        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskID)
            .eq('user_id', user.user_uuid);

        if (error) {
            redirect('/error');
        }

    } catch (error) {
        console.log(error)
        console.error('Error in deleteTask:', error);
        throw error;
    } finally {
        // revalidatePath('/', 'layout');
        // redirect('/dashboard');
    }
}

export async function getAllTasks() {
    const supabase = await createClient();

    try {
        const user = await getUser();

        const { data, error } = await supabase
            .from('tasks')
            .select(`id, title, description, user_id`)
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