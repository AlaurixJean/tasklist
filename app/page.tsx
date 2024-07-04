'use client'
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AddTask from "@components/AddTask";
import { Flex, Spinner } from "@chakra-ui/react";
import { Itask } from "@types";
import Notask from "@components/Notask";
import Task from "@components/Task";
import { error } from "console";

export default function Home() {

  const [task, setTask] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [allTasks, setAllTasks] = useState([])

  const handleCreateTask = async()=>{
    setIsLoading(true)
    try{
      const response = await fetch("/api/task/new", {
        method: 'POST',
        body: JSON.stringify({
          task: task
        })
      })
      if(response.ok){
        setTask('')
        fethTasks()
      }
      else{
        console.log('error')
      }
    }catch(error){
      console.log(error)
    }
    setIsLoading(false)
  }
  const fethTasks = async() =>{
    try{
      const response = await fetch("/api/task/all")
      const data = await response.json()
      setAllTasks(data)
      setIsLoading(false)
    }catch(error){

    }
  }
  useEffect(() =>{
    fethTasks()
  }, [])

  const handleCompleteTask = async(id: string) => {
    try {
      const response = await fetch(`/api/task/complete/${id}`, {
        method: "PATCH"
      })
      if (response.ok) {
        await fethTasks()
      } else {
        console.log("Error Completing task")
      }
    } catch (error) {
      console.log("error complete task", error)
    }
  }
  const handleDeleteTask = async(id: string) => {
    try {
      const response =await fetch(`api/task/delete/${id}`,{
        method: "DELETE"
       
    })

    if (response.ok) {
      setAllTasks((prevTasks)=> prevTasks.filter((task: Itask)=> task._id !==id))
    }else{
      console.log('error')
    }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <Header/>
    <AddTask task={task} setTask={setTask} handleCreateTask={handleCreateTask}/>
    {isLoading? (
      <Spinner/>
    ) : (
      <>
        <Flex direction="column" p="2rem">
          {allTasks.length > 0 ?
            allTasks.map((individualTask: Itask) => (
              <Task key={individualTask._id} individualTask={individualTask} handleCompleteTask={handleCompleteTask} handleDeleteTask={handleDeleteTask} />
            )) : (
              <Notask/>
            )
          }
        </Flex>
      </>
    ) }
    </>
  );
}
