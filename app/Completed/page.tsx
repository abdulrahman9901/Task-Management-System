"use client";

import React from "react";
import Tasks from "../Components/Tasks/Tasks";
import { useGlobalState } from "../Context/globalProviders";

function page() {
  const { completedTasks } = useGlobalState();
  return <Tasks title="Completed Tasks" tasks={completedTasks} />;
}

export default page;
