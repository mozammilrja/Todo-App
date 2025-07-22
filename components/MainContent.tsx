// "use client";

// import React from "react";
// import { DragDropContext, DropResult } from "react-beautiful-dnd";
// import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
// import { moveTask, reorderTasks } from "@/features/lists/listsSlice";
// import { moveTaskToList } from "@/features/tasks/tasksSlice";
// import TodoList from "./TodoList";

// const MainContent = () => {
//   const dispatch = useAppDispatch();
//   const lists = useAppSelector((state) => state.lists.lists);
//   const mainFocus = useAppSelector((state) => state.lists.mainFocus);
//   const tasks = useAppSelector((state) => state.tasks.tasks);
//   const mainFocusTask = mainFocus ? tasks[mainFocus] : null;

//   const onDragEnd = (result: DropResult) => {
//     const { destination, source, draggableId } = result;

//     if (!destination) return;

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     )
//       return;

//     if (source.droppableId === destination.droppableId) {
//       dispatch(
//         reorderTasks({
//           listId: source.droppableId,
//           sourceIndex: source.index,
//           destIndex: destination.index,
//         })
//       );
//     } else {
//       dispatch(
//         moveTask({
//           taskId: draggableId,
//           sourceListId: source.droppableId,
//           destListId: destination.droppableId,
//           sourceIndex: source.index,
//           destIndex: destination.index,
//         })
//       );
//       dispatch(
//         moveTaskToList({
//           taskId: draggableId,
//           newListId: destination.droppableId,
//         })
//       );
//     }
//   };

//   return (
//     <div className="flex-1 relative overflow-hidden">
//       {/* Gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
//         {/* Decorative abstract shapes */}
//         <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-cyan-300 rounded-full opacity-80 -translate-y-10 translate-x-10 md:-translate-y-16 md:translate-x-16"></div>
//         <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-pink-300 rounded-full opacity-60 translate-y-16 -translate-x-16 md:translate-y-24 md:-translate-x-24"></div>
//         <div className="absolute bottom-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-yellow-300 rounded-full opacity-70 translate-y-8 translate-x-8 md:translate-y-12 md:translate-x-12"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 p-4 sm:p-6 md:p-8 h-full overflow-y-auto">
//         {/* Focus Header */}
//         <div className="text-center mb-6 md:mb-8">
//           <h1 className="text-white text-sm sm:text-base font-medium mb-1">
//             Today main focus
//           </h1>
//           <h2 className="text-white text-xl sm:text-2xl font-bold">
//             {mainFocusTask ? mainFocusTask.title : "Design team meeting"}
//           </h2>
//         </div>

//         {/* Task Lists */}
//         <DragDropContext onDragEnd={onDragEnd}>
//           <div className="max-w-full sm:max-w-3xl md:max-w-4xl mx-auto space-y-6">
//             {lists.map((list) => (
//               <TodoList key={list.id} listId={list.id} />
//             ))}
//           </div>
//         </DragDropContext>
//       </div>
//     </div>
//   );
// };

// export default MainContent;

// "use client";

// import React from "react";
// import { DragDropContext, DropResult } from "react-beautiful-dnd";
// import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
// import { moveTask, reorderTasks } from "@/features/lists/listsSlice";
// import { moveTaskToList } from "@/features/tasks/tasksSlice";
// import TodoList from "./TodoList";

// const MainContent = () => {
//   const dispatch = useAppDispatch();
//   const lists = useAppSelector((state) => state.lists.lists);
//   const mainFocus = useAppSelector((state) => state.lists.mainFocus);
//   const tasks = useAppSelector((state) => state.tasks.tasks);
//   const mainFocusTask = mainFocus ? tasks[mainFocus] : null;

//   const onDragEnd = (result: DropResult) => {
//     const { destination, source, draggableId } = result;

//     if (!destination) return;

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     )
//       return;

//     if (source.droppableId === destination.droppableId) {
//       dispatch(
//         reorderTasks({
//           listId: source.droppableId,
//           sourceIndex: source.index,
//           destIndex: destination.index,
//         })
//       );
//     } else {
//       dispatch(
//         moveTask({
//           taskId: draggableId,
//           sourceListId: source.droppableId,
//           destListId: destination.droppableId,
//           sourceIndex: source.index,
//           destIndex: destination.index,
//         })
//       );
//       dispatch(
//         moveTaskToList({
//           taskId: draggableId,
//           newListId: destination.droppableId,
//         })
//       );
//     }
//   };

//   return (
//     <div className="flex-1 relative overflow-hidden">
//       {/* Gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
//         {/* Decorative abstract shapes */}
//         <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-cyan-300 rounded-full opacity-80 -translate-y-10 translate-x-10 md:-translate-y-16 md:translate-x-16"></div>
//         <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-pink-300 rounded-full opacity-60 translate-y-16 -translate-x-16 md:translate-y-24 md:-translate-x-24"></div>
//         <div className="absolute bottom-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-yellow-300 rounded-full opacity-70 translate-y-8 translate-x-8 md:translate-y-12 md:translate-x-12"></div>
//       </div>

//       {/* Main Content */}

//       <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-primary via-purple-secondary to-purple-primary text-white px-[30px] py-[10px]">
//         {/* Header (Non-scrollable) */}
//         <header className="py-4">
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//         </header>

//         {/* Main Content (Scrollable) */}
//         <main className="flex-1 overflow-y-auto">
//           <div className="relative z-10 pt-[10px] px-4 sm:px-6 md:px-8 max-w-full sm:max-w-3xl md:max-w-4xl mx-auto space-y-6">
//             {/* Focus Header */}
//             <div className="text-center mb-6 md:mb-8">
//               <h1 className="text-white text-sm sm:text-base font-medium mb-1">
//                 Today main focus
//               </h1>
//               <h2 className="text-white text-xl sm:text-2xl font-bold">
//                 Design team meeting
//               </h2>
//             </div>

//             {/* Task Lists */}
//             <DragDropContext onDragEnd={onDragEnd}>
//               {lists.map((list) => (
//                 <TodoList key={list.id} listId={list.id} />
//               ))}
//             </DragDropContext>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainContent;

// "use client";
// import { Clock, PlusCircle } from "lucide-react";

// const tasks = [
//   {
//     id: 1,
//     title: "Work out",
//     time: "8:00 am",
//     color: "bg-pink-400",
//     done: true,
//   },
//   {
//     id: 2,
//     title: "Design team meeting",
//     time: "2:30 pm",
//     color: "bg-yellow-400",
//   },
//   {
//     id: 3,
//     title: "Hand off the project",
//     time: "7:00 pm",
//     color: "bg-cyan-400",
//   },
//   {
//     id: 4,
//     title: 'Read 5 pages of "sprint"',
//     time: "10:30 pm",
//     color: "bg-pink-400",
//   },
//   // Add more to test scroll
//   ...Array.from({ length: 20 }, (_, i) => ({
//     id: i + 5,
//     title: `Extra task ${i + 1}`,
//     time: "12:00 pm",
//     color: "bg-cyan-400",
//   })),
// ];

// export default function MainContent() {
//   return (
//     <div className="relative flex flex-col h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white px-[30px] py-[10px] overflow-hidden">
//       {/* Abstract background shapes */}
//       <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-cyan-300 rounded-full opacity-80 -translate-y-10 translate-x-10 md:-translate-y-16 md:translate-x-16"></div>
//       <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-pink-300 rounded-full opacity-60 translate-y-16 -translate-x-16 md:translate-y-24 md:-translate-x-24"></div>
//       <div className="absolute bottom-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-yellow-300 rounded-full opacity-70 translate-y-8 translate-x-8 md:translate-y-12 md:translate-x-12"></div>

//       {/* Foreground Content */}
//       <div className="relative z-10 flex flex-col h-full rounded-2xl bg-[#d3bfff] text-gray-900 overflow-hidden">
//         {/* Header (fixed) */}
//         <div className="p-6">
//           <p className="text-base font-medium text-white">Today main focus</p>
//           <h2 className="text-2xl font-bold text-white">Design team meeting</h2>
//         </div>

//         {/* Input */}
//         <div className="px-6 mb-4">
//           <div className="bg-white rounded-full px-6 py-3 flex items-center justify-between shadow">
//             <div className="flex items-center gap-3">
//               <span className="w-3 h-3 rounded-full bg-pink-400" />
//               <span className="w-3 h-3 rounded-full bg-cyan-400" />
//               <span className="w-3 h-3 rounded-full bg-yellow-400" />
//               <input
//                 type="text"
//                 placeholder="What is your next task?"
//                 className="ml-4 outline-none w-full bg-transparent placeholder-gray-400"
//               />
//             </div>
//             <Clock className="text-gray-400 w-5 h-5 mr-2" />
//             <PlusCircle className="text-purple-500 w-6 h-6" />
//           </div>
//         </div>

//         {/* Scrollable Task List */}
//         <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
//           {tasks.map((task) => (
//             <div
//               key={task.id}
//               className="bg-white rounded-xl flex items-center justify-between px-6 py-4 shadow">
//               <div className="flex items-center gap-4">
//                 <span className={`w-4 h-4 rounded-full ${task.color}`} />
//                 <p className="text-gray-800 font-medium">{task.title}</p>
//               </div>
//               <p className="text-gray-500 text-sm">{task.time}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
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
