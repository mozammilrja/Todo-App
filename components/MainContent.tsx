import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { moveTask, reorderTasks } from "@/features/lists/listsSlice";
import { moveTaskToList } from "@/features/tasks/tasksSlice";
import TodoList from "./TodoList";

const MainContent = () => {
  const dispatch = useAppDispatch();
  const lists: any = useAppSelector((state) => state.lists.lists);

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
    <div className="relative h-screen overflow-hidden">
      {/* Foreground Content */}
      <div className="text-center mb-8 ">
        <h1 className="text-white text-lg font-medium mb-1">
          Today main focus
        </h1>
        <h2 className="text-white text-2xl font-bold">
          {mainFocusTask ? mainFocusTask.title : "Design team meeting"}
        </h2>
      </div>

      <div className="h-screen overflow-y-auto px-4 pt-6 pb-[300px] sm:px-6 md:px-8 auto-hide-scrollbar scroll-smooth">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="max-w-4xl mx-auto">
            {lists.map((list: any) => (
              <TodoList key={list.id} listId={list.id} />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default MainContent;
