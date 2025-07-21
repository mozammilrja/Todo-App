'use client';

import React, { useState } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import { addList } from '@/features/lists/listsSlice';
import { Plus } from 'lucide-react';

const COLORS = [
  '#F472B6', // Pink
  '#06B6D4', // Cyan
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#8B5CF6', // Violet
  '#F97316', // Orange
];

const AddListForm = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addList({ title: title.trim(), color: selectedColor }));
      setTitle('');
      setSelectedColor(COLORS[0]);
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 transition-colors p-2"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm">Add filter</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="List name"
        className="w-full p-2 border border-gray-200 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        autoFocus
      />
      
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-full border-2 ${
                selectedColor === color ? 'border-gray-400' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddListForm;