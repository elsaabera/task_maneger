import { Task } from '@/types/task';

// Storage key for tasks
const TASKS_STORAGE_KEY = 'tasks';

// In a web environment, we'll use localStorage
// In a native environment, we would use AsyncStorage, but for this example
// we're focusing on web since that's the default platform
export const saveTasksToStorage = async (tasks: Task[]): Promise<void> => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export const loadTasksFromStorage = async (): Promise<Task[] | null> => {
  try {
    if (typeof localStorage !== 'undefined') {
      const tasksString = localStorage.getItem(TASKS_STORAGE_KEY);
      if (tasksString) {
        return JSON.parse(tasksString);
      }
    }
    return null;
  } catch (error) {
    console.error('Error loading tasks:', error);
    return null;
  }
};