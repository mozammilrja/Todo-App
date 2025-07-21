"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { addTask } from "@/features/tasks/tasksSlice";
import { addTaskToList } from "@/features/lists/listsSlice";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import { Menu } from "lucide-react";

export default function Home() {
  const dispatch = useAppDispatch();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const sampleTasks = [
      { title: "Work out", time: "08:00", listId: "personal" },
      { title: "Design team meeting", time: "14:30", listId: "work" },
      { title: "Hand off the project", time: "19:00", listId: "freelance" },
      { title: 'Read 5 pages of "sprint"', time: "22:30", listId: "personal" },
    ];

    const existingTasks = localStorage.getItem("persist:todo-app-root");
    if (!existingTasks || !existingTasks.includes('"tasks":{')) {
      sampleTasks.forEach((task) => {
        const taskAction = dispatch(
          addTask({
            title: task.title,
            listId: task.listId,
            time: task.time,
          })
        );
        dispatch(
          addTaskToList({
            listId: task.listId,
            taskId: taskAction.payload.id,
          })
        );
      });
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
      {/* Hamburger toggle (mobile only) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow"
        onClick={() => setShowSidebar(!showSidebar)}>
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {/* Sidebar */}
      <Sidebar
        isOpen={showSidebar || typeof window === "undefined"}
        onClose={() => setShowSidebar(false)}
      />

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4">
        <MainContent />
      </div>
    </div>
  );
}
