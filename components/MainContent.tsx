import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { moveTask, reorderTasks } from "@/features/lists/listsSlice";
import { moveTaskToList } from "@/features/tasks/tasksSlice";
import TodoList from "./TodoList";

const MainContent = () => {
  const dispatch = useAppDispatch();
  const lists: any = useAppSelector((state) => state.lists.lists);
  console.log("lists", lists);

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
      <div className="relative z-10 h-full md:p-10 text-white bg-transparent">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="text-left">
            <p className="text-base md:text-lg font-medium">Today main focus</p>
            <h2 className="text-2xl md:text-3xl font-bold">
              {mainFocusTask ? mainFocusTask.title : "Design team meeting"}
            </h2>
          </div>
          <div className="h-screen overflow-y-auto p-4 space-y-6 custom-thin-scroll">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="space-y-6">
                {lists.map((list) => (
                  <TodoList key={list.id} listId={list.id} />
                ))}
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
