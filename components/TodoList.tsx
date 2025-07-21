"use client";

import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { updateList, deleteList } from "@/features/lists/listsSlice";
import TaskItem from "./TaskItem";
import TaskInput from "./TaskInput";
import { Edit2, Trash2, Check, X } from "lucide-react";

interface TodoListProps {
  listId: string;
}

const TodoList = ({ listId }: TodoListProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  const list = useAppSelector((state) =>
    state.lists.lists.find((l) => l.id === listId)
  );
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const searchQuery = useAppSelector((state) => state.app.searchQuery);

  if (!list) return null;

  let listTasks = list.tasks.map((taskId) => tasks[taskId]).filter(Boolean);

  // Filter tasks based on search query
  if (searchQuery.trim()) {
    listTasks = listTasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== list.title) {
      dispatch(updateList({ id: listId, title: editTitle.trim() }));
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(list.title);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete "${list.title}" list?`)
    ) {
      dispatch(deleteList(listId));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleEdit = () => {
    setEditTitle(list.title);
    setIsEditing(true);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
      {/* List Header */}
      <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: list.color }}
          />
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              className="text-lg font-semibold bg-transparent border-b-2 border-purple-500 focus:outline-none"
              autoFocus
            />
          ) : (
            <h2 className="text-lg font-semibold text-gray-800">
              {list.title}
            </h2>
          )}
          <span className="text-sm text-gray-500">({list.tasks.length})</span>
        </div>

        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:bg-green-50 rounded">
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-red-600 hover:bg-red-50 rounded">
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded">
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      <TaskInput listId={listId} />

      <div className="px-[10px]">
        <Droppable droppableId={listId}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`w-full  mt-[50px] space-y-4 min-h-[100px] transition-all duration-200 ${
                snapshot.isDraggingOver ? "bg-white/20 rounded-2xl p-4" : ""
              }`}>
              {listTasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  taskId={task.id}
                  index={index}
                  listId={listId}
                />
              ))}
              {provided.placeholder}

              {listTasks.length === 0 && searchQuery && (
                <div className="text-center py-8 text-white/60">
                  No tasks found matching "{searchQuery}"
                </div>
              )}

              {listTasks.length === 0 && !searchQuery && (
                <div className="text-center py-8 text-white/60">
                  No tasks yet. Add your first task above!
                </div>
              )}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TodoList;
