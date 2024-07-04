import Task from "@models/tasks";
import { connectToDB } from "@utils/database";

import { NextResponse } from 'next/server'

import {DeleteTaskRequestParam } from "@types";

export const PATCH = async(request: Request, { params }: DeleteTaskRequestParam) => {

    try {
        await connectToDB();
        const existingTask = await Task.findById(params.id)

        if(!existingTask) {
            return new Response('Task not found', { status: 404 })
        }

        existingTask.completed = true

        await existingTask.save()

        return new Response("Task updated successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting task", { status: 500 });
    }
    
}