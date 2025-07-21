'use client';

import React from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { Calendar, Settings } from 'lucide-react';
import SearchBar from './SearchBar';
import AddListForm from './AddListForm';

const Sidebar = () => {
  const { lists } = useAppSelector((state) => state.lists);
  const { tasks } = useAppSelector((state) => state.tasks);

  const getTaskCount = (listId: string) => {
    const list = lists.find(l => l.id === listId);
    return list ? list.tasks.length : 0;
  };

  return (
    <div className="w-80 bg-white h-full shadow-lg p-6 overflow-y-auto">
      {/* User Profile */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">Do-it</div>
          <div className="text-xs text-purple-500 font-medium">Hamza mameri</div>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Divider */}
      <div className="w-full h-px bg-gray-200 mb-6"></div>

      {/* Today Tasks */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-4 h-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-900">Today tasks</h3>
        </div>
        
        <div className="space-y-3">
          {lists.map((list) => (
            <div key={list.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: list.color }}
                ></div>
                <span className="text-sm text-gray-700">{list.title}</span>
              </div>
              <span className="text-xs text-gray-400">{getTaskCount(list.id)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add New List */}
      <AddListForm />

      {/* Scheduled Tasks */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-4 h-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-900">Scheduled tasks</h3>
        </div>
      </div>

      {/* Settings */}
      <div className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
        <Settings className="w-4 h-4" />
        <span className="text-sm">Settings</span>
      </div>
    </div>
  );
};

export default Sidebar;