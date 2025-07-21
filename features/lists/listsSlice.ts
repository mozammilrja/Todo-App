import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoList, ListsState } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const initialState: ListsState = {
  lists: [
    {
      id: 'personal',
      title: 'Personal',
      color: '#F472B6',
      tasks: [],
    },
    {
      id: 'freelance',
      title: 'Freelance',
      color: '#06B6D4',
      tasks: [],
    },
    {
      id: 'work',
      title: 'Work',
      color: '#F59E0B',
      tasks: [],
    },
  ],
  mainFocus: undefined,
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: {
      reducer: (state, action: PayloadAction<TodoList>) => {
        state.lists.push(action.payload);
      },
      prepare: (payload: { title: string; color: string }) => ({
        payload: {
          id: uuidv4(),
          title: payload.title,
          color: payload.color,
          tasks: [],
        },
      }),
    },
    
    updateList: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const list = state.lists.find(l => l.id === action.payload.id);
      if (list) {
        list.title = action.payload.title;
      }
    },
    
    deleteList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter(l => l.id !== action.payload);
      if (state.mainFocus) {
        const mainFocusExists = state.lists.some(list => 
          list.tasks.includes(state.mainFocus!)
        );
        if (!mainFocusExists) {
          state.mainFocus = undefined;
        }
      }
    },
    
    addTaskToList: (state, action: PayloadAction<{ listId: string; taskId: string }>) => {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (list && !list.tasks.includes(action.payload.taskId)) {
        list.tasks.push(action.payload.taskId);
      }
    },
    
    removeTaskFromList: (state, action: PayloadAction<{ listId: string; taskId: string }>) => {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (list) {
        list.tasks = list.tasks.filter(id => id !== action.payload.taskId);
      }
      if (state.mainFocus === action.payload.taskId) {
        state.mainFocus = undefined;
      }
    },
    
    moveTask: (state, action: PayloadAction<{
      taskId: string;
      sourceListId: string;
      destListId: string;
      sourceIndex: number;
      destIndex: number;
    }>) => {
      const { taskId, sourceListId, destListId, sourceIndex, destIndex } = action.payload;
      
      const sourceList = state.lists.find(l => l.id === sourceListId);
      if (sourceList) {
        sourceList.tasks.splice(sourceIndex, 1);
      }
      
      const destList = state.lists.find(l => l.id === destListId);
      if (destList) {
        destList.tasks.splice(destIndex, 0, taskId);
      }
    },
    
    reorderTasks: (state, action: PayloadAction<{
      listId: string;
      sourceIndex: number;
      destIndex: number;
    }>) => {
      const { listId, sourceIndex, destIndex } = action.payload;
      const list = state.lists.find(l => l.id === listId);
      
      if (list && sourceIndex !== destIndex) {
        const [reorderedTask] = list.tasks.splice(sourceIndex, 1);
        list.tasks.splice(destIndex, 0, reorderedTask);
      }
    },
    
    setMainFocus: (state, action: PayloadAction<string | undefined>) => {
      state.mainFocus = action.payload;
    },
  },
});

export const {
  addList,
  updateList,
  deleteList,
  addTaskToList,
  removeTaskFromList,
  moveTask,
  reorderTasks,
  setMainFocus,
} = listsSlice.actions;

export default listsSlice.reducer;