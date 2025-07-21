"use client";

import React, { useState, useCallback } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { addTask } from "@/features/tasks/tasksSlice";
import { addTaskToList } from "@/features/lists/listsSlice";
import { Clock, Calendar } from "lucide-react";

interface TaskInputProps {
  listId: string;
}

const TaskInput = ({ listId }: TaskInputProps) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (taskTitle.trim()) {
        const taskAction = addTask({
          title: taskTitle.trim(),
          listId,
          time: taskTime || undefined,
        });

        dispatch(taskAction);
        dispatch(
          addTaskToList({
            listId,
            taskId: taskAction.payload.id,
          })
        );

        setTaskTitle("");
        setTaskTime("");
      }
    },
    [taskTitle, taskTime, listId, dispatch]
  );

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>

          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="What is your next task?"
            className="flex-1 text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
            autoComplete="off"
          />

          <div className="flex items-center space-x-2 text-gray-400">
            <input
              type="time"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              className="w-13 border-none outline-none bg-transparent text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            />
            {/* <Clock className="w-4 h-4 hover:text-gray-600 transition-colors cursor-pointer" /> */}
            <Calendar className="w-4 h-4 hover:text-gray-600 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default React.memo(TaskInput);
