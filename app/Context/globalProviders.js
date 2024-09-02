"use client";

import React, { createContext, useState, useContext , useEffect } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import {useUser} from "@clerk/nextjs";


export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const theme = themes[selectedTheme];

  const { user } = useUser();


    const openModal = () => {
      setModal(true);
    };

    const closeModal = () => {
      setModal(false);
    };

    const collapseMenu = () => {
      setCollapsed(!collapsed);
    };

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");

      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setTasks(sorted);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

const deleteTask = async (id) => {
  setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

  try {
    await axios.delete(`/api/tasks/${id}`);
    toast.success("Task deleted");
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
    allTasks();
  }
};


const updateTask = async (updatedTask) => {
 setTasks((prevTasks) =>
   prevTasks.map((task) =>
     task.id === updatedTask.id
       ? { ...task, isCompleted: updatedTask.isCompleted }
       : task
   )
 );
  try {
    await axios.put(`/api/tasks`, updatedTask);
    toast.success("Task updated");
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
    allTasks();
  }
};


  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  const doItNowTasks = tasks.filter(
    (task) =>  !task.isCompleted &&  task.isImportant && task.isUrgent
  );
  const importantTasks = tasks.filter(
    (task) => !task.isCompleted && task.isImportant && !task.isUrgent
  );
  const urgentTasks = tasks.filter(
    (task) => !task.isCompleted && !task.isImportant && task.isUrgent
  );
  const backlogTasks = tasks.filter(
    (task) => !task.isCompleted && !task.isImportant && !task.isUrgent
  );

  useEffect(() => {
    if (user) allTasks();
  }, [user]);
  
  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
        urgentTasks,
        doItNowTasks,
        backlogTasks,
        updateTask,
        modal,
        openModal,
        closeModal,
        allTasks,
        collapsed,
        collapseMenu,
        setSelectedTheme,
        selectedTheme,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalUpdate = () => useContext(GlobalUpdateContext);

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};