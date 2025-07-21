"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateList, deleteList } from "@/features/lists/listsSlice";
import { Edit2, Trash2, Check, X } from "lucide-react";

interface ListHeaderProps {
  listId: string;
  title: string;
  color: string;
  taskCount: number;
}

const ListHeader = ({ listId, title, color, taskCount }: ListHeaderProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== title) {
      dispatch(updateList({ id: listId, title: editTitle.trim() }));
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(title);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${title}" list?`)) {
      dispatch(deleteList(listId));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    else if (e.key === "Escape") handleCancel();
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 p-3 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-3 flex-wrap">
        <div
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className="text-base sm:text-lg font-semibold bg-transparent border-b-2 border-purple-500 focus:outline-none"
            autoFocus
          />
        ) : (
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            {title}
          </h2>
        )}

        <span className="text-sm text-gray-500">({taskCount})</span>
      </div>

      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1 text-green-600 hover:bg-green-50 rounded"
              aria-label="Save title">
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
              aria-label="Cancel editing">
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded"
              aria-label="Edit list title">
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
              aria-label="Delete list">
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ListHeader;
