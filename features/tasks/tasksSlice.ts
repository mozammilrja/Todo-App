import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const initialState: TasksState = {
  tasks: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.tasks[action.payload.id] = action.payload;
      },
      prepare: (payload: {
        title: string;
        listId: string;
        time?: string;
      }) => {
        const id = uuidv4();
        return {
          payload: {
            id,
            title: payload.title,
            completed: false,
            time: payload.time,
            timestamp: Date.now(),
            listId: payload.listId,
          },
        };
      },
    },
    
    updateTask: (state, action: PayloadAction<{
      id: string;
      updates: Partial<Omit<Task, 'id' | 'timestamp'>>;
    }>) => {
      const { id, updates } = action.payload;
      const task = state.tasks[id];
      
      if (task) {
        Object.assign(task, updates);
      }
    },
    
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks[action.payload];
      if (task) {
        task.completed = !task.completed;
      }
    },
    
    deleteTask: (state, action: PayloadAction<string>) => {
      delete state.tasks[action.payload];
    },
    
    moveTaskToList: (state, action: PayloadAction<{
      taskId: string;
      newListId: string;
    }>) => {
      const { taskId, newListId } = action.payload;
      const task = state.tasks[taskId];
      
      if (task) {
        task.listId = newListId;
      }
    },
  },
});

export const {
  addTask,
  updateTask,
  toggleTask,
  deleteTask,
  moveTaskToList,
} = tasksSlice.actions;

export default tasksSlice.reducer;