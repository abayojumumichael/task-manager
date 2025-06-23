"use client";

import { getAllTasks } from "./task-actions";
import TaskForm from "./task-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteTask } from "./task-actions";
import { useEffect, useState } from "react";
import { Task } from "./Task";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>();
    const router = useRouter();

    const fetchTasks = async () => {
        const tasks = await getAllTasks();
        setTasks(tasks);
    }

    useEffect(() => {
        fetchTasks();
    }, []);


    return (
        <div className="flex flex-col gap-8 items-center">
            <TaskForm />
            <div className="w-full max-w-lg">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {Array.isArray(tasks) && tasks.length > 0 ? (
                            <ul className="space-y-4">
                                {tasks.map((task, idx) => (
                                    <li key={idx} className="border-b pb-2">
                                        <div className="font-semibold">{task.title}</div>
                                        <div className="text-muted-foreground text-sm">{task.description}</div>
                                        <Button
                                            variant="destructive"
                                            onClick={async () => {
                                                await deleteTask(task.id);
                                                router.refresh();
                                                window.location.reload();
                                            }}>
                                            Delete
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-muted-foreground">No tasks found.</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}