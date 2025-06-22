import { getAllTasks } from "./task-actions";
import TaskForm from "./task-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Dashboard() {
    const tasks = await getAllTasks();
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