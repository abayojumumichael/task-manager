'use client'
import { useState } from "react"

import { createTask } from "./task-actions"

import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function TaskForm() {
    const [title, setTitle] = useState<string | null>(null)
    const [description, setDescription] = useState<string | null>(null)

    return (
        <Card className="w-full max-w-sm">
            <form>
                <CardHeader>
                    <CardTitle>Create a task</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="form-widget">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                            id="title"
                            type="text"
                            name="title"
                            value={title || ''}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                            id="description"
                            type="text"
                            name="description"
                            value={description || ''}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardAction>
                    <Button formAction={createTask}>Confirm Task</Button>
                </CardAction>
            </form>
        </Card>
    )
}