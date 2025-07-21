'use client';

import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { moveTask, reorderTasks } from '@/features/lists/listsSlice';
import { moveTaskToList } from '@/features/tasks/tasksSlice';
import TodoList from './TodoList';

const MainContent = () => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector((state) => state.lists.lists);
  const mainFocus = useAppSelector((state) => state.lists.mainFocus);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const mainFocusTask = mainFocus ? tasks[mainFocus] : null;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same list
      dispatch(reorderTasks({
        listId: source.droppableId,
        sourceIndex: source.index,
        destIndex: destination.index,
      }));
    } else {
      // Moving between lists
      dispatch(moveTask({
        taskId: draggableId,
        sourceListId: source.droppableId,
        destListId: destination.droppableId,
        sourceIndex: source.index,
        destIndex: destination.index,
      }));
      
      dispatch(moveTaskToList({
        taskId: draggableId,
        newListId: destination.droppableId,
      }));
    }
  };

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Background matching the exact image */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
        {/* Abstract shapes matching the image */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-300 rounded-full opacity-80 -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-300 rounded-full opacity-60 translate-y-24 -translate-x-24"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-yellow-300 rounded-full opacity-70 translate-y-12 translate-x-12"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 h-full overflow-y-auto">
        {/* Header matching the exact image */}
        <div className="text-center mb-8">
          <h1 className="text-white text-lg font-medium mb-1">Today main focus</h1>
          <h2 className="text-white text-2xl font-bold">
            {mainFocusTask ? mainFocusTask.title : 'Design team meeting'}
          </h2>
        </div>

        {/* Tasks Lists */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="max-w-4xl mx-auto">
            {lists.map((list) => (
              <TodoList key={list.id} listId={list.id} />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default MainContent;