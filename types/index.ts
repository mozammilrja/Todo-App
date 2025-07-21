export interface Task {
  id: string;
  title: string;
  completed: boolean;
  time?: string;
  timestamp: number;
  listId: string;
}

export interface TodoList {
  id: string;
  title: string;
  color: string;
  tasks: string[]; // Array of task IDs
}

export interface RootState {
  lists: ListsState;
  tasks: TasksState;
  app: AppState;
}

export interface ListsState {
  lists: TodoList[];
  mainFocus?: string; // Task ID of main focus
}

export interface TasksState {
  tasks: { [key: string]: Task };
}

export interface AppState {
  searchQuery: string;
  sidebarOpen: boolean;
}

export type CategoryColor = 'personal' | 'freelance' | 'work';

export const CATEGORY_COLORS = {
  personal: '#F472B6', // Pink
  freelance: '#06B6D4', // Cyan
  work: '#F59E0B', // Amber
} as const;