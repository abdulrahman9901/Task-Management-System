"use client";
import { useGlobalState } from "@/app/Context/globalProviders";
import Tasks from "./Components/Tasks/Tasks";

export default function Home() {
  const { tasks } = useGlobalState();
  return (
      <Tasks title="All Tasks" tasks={tasks} />
  );
}
