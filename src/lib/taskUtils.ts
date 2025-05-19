
import axios from 'axios';

// Define the API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export interface Subtask {
  id?: string;
  _id?: string;
  text: string;
  completed: boolean;
  authorId: string;
}

export interface Task {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  status: 'Draft' | 'In Progress' | 'Editing' | 'Done';
  type?: 'Main Task' | 'Secondary Task' | 'Tertiary Task';
  progress?: number;
  subtasks: Subtask[];
  tags?: string[];
  priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
  comments?: number;
  files?: number;
  starred?: boolean;
  dueDate?: string;
  createdAt?: string;
  assignedTo?: string | { id?: string; _id?: string; name: string; email: string; avatar?: string };
  category?: string;
  timeTracking?: {
    timeSpent: number; // in minutes
    isRunning: boolean;
    lastStarted?: number; // timestamp
  };
}

export function getTagColor(tag: string): string {
  const tagColors: Record<string, string> = {
    'Important': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Urgent': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    'Review': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Design': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Development': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Bug': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Feature': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    'Documentation': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  };

  return tagColors[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
}

// Get tasks by status from API
export const getTasksByStatus = async (status: string): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      params: { status }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks by status:', error);
    return [];
  }
};

// Get all tasks
export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all tasks:', error);
    return [];
  }
};

// Get task by ID
export const getTaskById = async (id: string): Promise<Task | null> => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with ID ${id}:`, error);
    return null;
  }
};

// Create a new task
export const createTask = async (taskData: Partial<Task>): Promise<Task | null> => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update a task
export const updateTask = async (id: string, taskData: Partial<Task>): Promise<Task | null> => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${id}:`, error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting task with ID ${id}:`, error);
    throw error;
  }
};

// Add a subtask to a task
export const addSubtask = async (taskId: string, text: string): Promise<Task | null> => {
  try {
    const response = await axios.post(`${API_URL}/tasks/${taskId}/subtasks`, { text });
    return response.data;
  } catch (error) {
    console.error(`Error adding subtask to task with ID ${taskId}:`, error);
    throw error;
  }
};

// Update a subtask
export const updateSubtask = async (
  taskId: string,
  subtaskId: string,
  updates: { text?: string; completed?: boolean }
): Promise<Task | null> => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}/subtasks/${subtaskId}`, updates);
    return response.data;
  } catch (error) {
    console.error(`Error updating subtask with ID ${subtaskId}:`, error);
    throw error;
  }
};

// Delete a subtask
export const deleteSubtask = async (taskId: string, subtaskId: string): Promise<Task | null> => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}/subtasks/${subtaskId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting subtask with ID ${subtaskId}:`, error);
    throw error;
  }
};

// Add missing exports for RightSidebar
export const completedTasksData = [
  { count: 120, author: 'John Doe' },
  { count: 95, author: 'Jane Smith' },
  { count: 157, author: 'Alex Johnson' },
  { count: 84, author: 'Sam Wilson' }
];

export const efficiencyData = [
  { efficiency: 85, author: 'John Doe' },
  { efficiency: 76, author: 'Jane Smith' },
  { efficiency: 92, author: 'Alex Johnson' },
  { efficiency: 68, author: 'Sam Wilson' }
];

export const planData = [
  { time: '09:00', task: 'Morning team standup' },
  { time: '11:00', task: 'Client consultation call' },
  { time: '13:30', task: 'Lunch break' },
  { time: '14:30', task: 'Design review session' },
  { time: '16:00', task: 'Development planning' }
];
