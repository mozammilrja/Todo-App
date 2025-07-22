"use client";

import MainContent from "@/components/MainContent";
import Sidebar from "@/components/Sidebar";
import { addTaskToList } from "@/features/lists/listsSlice";
import { addTask } from "@/features/tasks/tasksSlice";
import { useAppDispatch } from "@/hooks/useRedux";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const hasInitialized = localStorage.getItem("hasInitializedDefaultTasks");

    if (!hasInitialized) {
      const sampleTasks = [
        { title: "Work out", time: "08:00", listId: "personal" },
        { title: "Design team meeting", time: "14:30", listId: "work" },
        { title: "Hand off the project", time: "19:00", listId: "freelance" },
      ];

      const addTasks = async () => {
        for (const task of sampleTasks) {
          console.log("task", task);
          const taskAction = await dispatch(
            addTask({
              title: task.title,
              listId: task.listId,
              time: task.time,
            })
          );
          const taskId = taskAction.payload.id;
          dispatch(addTaskToList({ listId: task.listId, taskId }));
        }

        localStorage.setItem("hasInitializedDefaultTasks", "true");
      };

      addTasks();
    }
  }, [dispatch]);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-purple-700 via-purple-600 to-purple-700 text-white overflow-hidden">
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow"
        onClick={() => setShowSidebar(!showSidebar)}>
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {/* Decorative Circles */}
      <div className="absolute bottom-[-40px] left-[-50px] w-40 h-40 bg-[#f7a1cc] rounded-full z-[9999] pointer-events-none" />
      <div className="absolute top-[calc(35%-10px)] right-[-20px] w-40 h-40 bg-[#fac608] rounded-full z-0" />
      <div className="absolute top-[40px] left-[300px] w-[80px] h-[80px] bg-[#6ef7f7] rounded-full z-[50] pointer-events-none shadow-lg" />

      {/* Layout */}
      <div className="relative z-10 flex h-screen w-full px-10 py-20 box-border">
        <Sidebar
          isOpen={showSidebar || typeof window === "undefined"}
          onClose={() => setShowSidebar(false)}
        />
        <main className="flex-1 h-full bg-[#a18aff] border-[5px] border-white rounded-tr-[12px] rounded-br-[12px] p-6 shadow-2xl overflow-auto flex flex-col">
          <MainContent />
        </main>
      </div>
    </div>
  );
}
