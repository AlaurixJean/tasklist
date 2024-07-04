import Task from "@models/tasks";
import { connectToDB } from "@utils/database";

import { NextResponse } from "next/server";

import {DeleteTaskRequestParam} from "@types";

export const  DELETE = async(request: Request, {params}: DeleteTaskRequestParam) => {
    try {
        await connectToDB

        await Task.findByIdAndDelete(params.id)

        return NextResponse.json("Task deleted succesfilly", {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json("error deleting task", {status: 500})
    }
}