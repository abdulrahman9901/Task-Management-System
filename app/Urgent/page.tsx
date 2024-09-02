"use client";

import React from "react";
import Tasks from "../Components/Tasks/Tasks";
import { useGlobalState } from "../Context/globalProviders";

function Page() {
  const { urgentTasks } = useGlobalState();
  return <Tasks title="Urgent Tasks" tasks={urgentTasks} />;
}

export default Page;
