"use client";

import React from "react";
import Tasks from "../Components/Tasks/Tasks";
import { useGlobalState } from "../Context/globalProviders";

function page() {
  const { importantTasks } = useGlobalState();
  return <Tasks title="Important Tasks" tasks={importantTasks} />;
}

export default page;
