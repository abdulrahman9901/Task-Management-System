"use client";

import React from "react";
import Tasks from "../Components/Tasks/Tasks";
import { useGlobalState } from "../Context/globalProviders";

function page() {
  const { backlogTasks } = useGlobalState();
  return <Tasks title="Backlog Tasks" tasks={backlogTasks} />;
}

export default page;
