import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskFilter } from '@/types/task';
import { saveTasksToStorage, loadTasksFromStorage } from '@/utils/storage';

interface TaskContextType {
  tasks: Task[];
  filter: TaskFilter;
  addTask: (title: string, description?: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: TaskFilter) => void;
  filteredTasks: Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks from storage on first render
  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await loadTasksFromStorage();
      if (storedTasks) {
        setTasks(storedTasks);
      }
      setIsLoaded(true);
    };

    loadTasks();
  }, []);

  // Save tasks to storage whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, isLoaded]);

  // Add a new task
  const addTask = (title: string, description?: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
  };

  // Toggle task completion status
  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Get filtered tasks based on current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filter,
        addTask,
        toggleTask,
        deleteTask,
        setFilter,
        filteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook for using the task context
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};