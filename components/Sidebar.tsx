"use client";

import React from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { Calendar, Settings } from "lucide-react";
import SearchBar from "./SearchBar";
import AddListForm from "./AddListForm";
import clsx from "clsx";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { lists } = useAppSelector((state) => state.lists);

  const getTaskCount = (listId: string) => {
    const list = lists.find((l) => l.id === listId);
    return list ? list.tasks.length : 0;
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full bg-white w-72 p-6 z-50 shadow-md transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          }
        )}>
        {/* User Profile */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profile"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Do-it</div>
            <div className="text-xs text-purple-500 font-medium">
              Hamza mameri
            </div>
          </div>
        </div>

        {/* Search */}
        <SearchBar />
        <div className="w-full h-px bg-gray-200 my-6" />

        {/* Today Tasks */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-medium text-gray-900">Today tasks</h3>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[80px] pr-2 auto-hide-scrollbar scroll-smooth">
            {lists.map((list) => (
              <div key={list.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: list.color }}></div>
                  <span className="text-sm text-gray-700">{list.title}</span>
                </div>
                <span className="text-xs text-gray-400">
                  {getTaskCount(list.id)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Add List */}
        <AddListForm />

        {/* Scheduled Tasks */}
        <div className="mb-0">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-medium text-gray-900">
              Scheduled tasks
            </h3>
          </div>
        </div>

        {/* Settings */}
        <div className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
