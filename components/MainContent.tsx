"use client";

import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { moveTask, reorderTasks } from "@/features/lists/listsSlice";
import { moveTaskToList } from "@/features/tasks/tasksSlice";
import TodoList from "./TodoList";

const MainContent = () => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector((state) => state.lists.lists);
  const mainFocus = useAppSelector((state) => state.lists.mainFocus);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const mainFocusTask = mainFocus ? tasks[mainFocus] : null;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (source.droppableId === destination.droppableId) {
      dispatch(
        reorderTasks({
          listId: source.droppableId,
          sourceIndex: source.index,
          destIndex: destination.index,
        })
      );
    } else {
      dispatch(
        moveTask({
          taskId: draggableId,
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          sourceIndex: source.index,
          destIndex: destination.index,
        })
      );
      dispatch(
        moveTaskToList({
          taskId: draggableId,
          newListId: destination.droppableId,
        })
      );
    }
  };

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
        {/* Decorative abstract shapes */}
        <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-cyan-300 rounded-full opacity-80 -translate-y-10 translate-x-10 md:-translate-y-16 md:translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-pink-300 rounded-full opacity-60 translate-y-16 -translate-x-16 md:translate-y-24 md:-translate-x-24"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-yellow-300 rounded-full opacity-70 translate-y-8 translate-x-8 md:translate-y-12 md:translate-x-12"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8 h-full overflow-y-auto">
        {/* Focus Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-white text-sm sm:text-base font-medium mb-1">
            Today main focus
          </h1>
          <h2 className="text-white text-xl sm:text-2xl font-bold">
            {mainFocusTask ? mainFocusTask.title : "Design team meeting"}
          </h2>
        </div>

        {/* Task Lists */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="max-w-full sm:max-w-3xl md:max-w-4xl mx-auto space-y-6">
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
