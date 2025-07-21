import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@/types';

const initialState: AppState = {
  searchQuery: '',
  sidebarOpen: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    
    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },
    
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  clearSearchQuery,
  toggleSidebar,
  setSidebarOpen,
} = appSlice.actions;

export default appSlice.reducer;