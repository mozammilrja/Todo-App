'use client';

import React, { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import { addTask } from '@/features/tasks/tasksSlice';
import { addTaskToList } from '@/features/lists/listsSlice';
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';

export default function Home() {
  const dispatch = useAppDispatch();

  // Initialize with sample data matching the image
  useEffect(() => {
    const sampleTasks = [
      { title: 'Work out', time: '08:00', listId: 'personal' },
      { title: 'Design team meeting', time: '14:30', listId: 'work' },
      { title: 'Hand off the project', time: '19:00', listId: 'freelance' },
      { title: 'Read 5 pages of "sprint"', time: '22:30', listId: 'personal' },
    ];

    // Check if tasks already exist (to avoid duplicates on refresh)
    const existingTasks = localStorage.getItem('persist:todo-app-root');
    if (!existingTasks || !existingTasks.includes('"tasks":{')) {
      sampleTasks.forEach((task) => {
        const taskAction = dispatch(addTask({
          title: task.title,
          listId: task.listId,
          time: task.time,
        }));
        dispatch(addTaskToList({
          listId: task.listId,
          taskId: taskAction.payload.id,
        }));
      });
    }
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <MainContent />
    </div>
  );
}