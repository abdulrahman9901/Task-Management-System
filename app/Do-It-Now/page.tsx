"use client";

import React from "react";
import Tasks from "../Components/Tasks/Tasks";
import { useGlobalState } from "../Context/globalProviders";

function Page() {
  const { doItNowTasks } = useGlobalState();
  return <Tasks title="Critical Tasks" tasks={doItNowTasks} />;
}

export default Page;
