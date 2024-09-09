import { ReactNode } from "react";
import themes from '@/app/Context/themes'
import type { Clerk } from "@clerk/types";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface GlobalContextType {
  theme: (typeof themes)[0];
  tasks: Task[];
}

export interface GlobalUpdateContextType {
  setSelectedTheme: React.Dispatch<React.SetStateAction<number>>;
}

export interface GlobalProviderProps {
  children: ReactNode;
}

declare global {
  interface Window {
    Clerk: Clerk;
  }
}