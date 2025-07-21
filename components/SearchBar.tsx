"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setSearchQuery, clearSearchQuery } from "@/features/app/appSlice";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.app.searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClearSearch = () => {
    dispatch(clearSearchQuery());
  };

  return (
    <div className="relative mb-6 w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-10 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
