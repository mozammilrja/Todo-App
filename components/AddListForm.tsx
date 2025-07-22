"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { addList } from "@/features/lists/listsSlice";
import { Plus } from "lucide-react";
import { useAppSelector } from "@/hooks/useRedux"; // Import the selector hook

const COLORS = [
  "#F472B6", // Pink
  "#06B6D4", // Cyan
  "#F59E0B", // Amber
  "#10B981", // Emerald
  "#8B5CF6", // Violet
  "#F97316", // Orange
];

const AddListForm = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    // Capitalize the first letter
    const capitalizedTitle =
      trimmedTitle.charAt(0).toUpperCase() + trimmedTitle.slice(1);

    dispatch(addList({ title: capitalizedTitle, color: selectedColor }));
    setTitle("");
    setSelectedColor(COLORS[0]);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 transition-colors p-2 w-full sm:w-auto">
        <Plus className="w-4 h-4" />
        <span className="text-sm">Add filter</span>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-sm mb-4 w-full max-w-md mx-auto">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="List name"
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white text-black"
        autoFocus
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Color Picker */}
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                selectedColor === color
                  ? "border-gray-500 scale-110"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto px-4 py-2 text-sm text-gray-600 border border-gray-300 hover:bg-gray-100 rounded">
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddListForm;
