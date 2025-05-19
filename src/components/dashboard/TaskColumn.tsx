
import { useState } from 'react';
import { Task } from '@/lib/taskUtils';
import TaskCard from './TaskCard';
import TimeTracker from './TimeTracker';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onDrop?: (taskId: string, status: string) => void;
  onTaskEdit?: (updatedTask: Task) => void;
  onTimeUpdate?: (taskId: string, timeSpent: number, isRunning: boolean) => void;
}

const TaskColumn = ({ title, tasks, onDrop, onTaskEdit, onTimeUpdate }: TaskColumnProps) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);

    const taskId = e.dataTransfer.getData('taskId');
    if (taskId && onDrop) {
      onDrop(taskId, title);
    }
  };

  const handleTimeUpdate = (taskId: string, timeSpent: number, isRunning: boolean) => {
    if (onTimeUpdate) {
      onTimeUpdate(taskId, timeSpent, isRunning);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="uppercase tracking-wider text-xs font-bold text-gray-500 dark:text-gray-400 p-2">
        {title} ({tasks.length})
      </div>
      <div
        className={`bg-gray-50 dark:bg-gray-800 rounded-lg flex-1 p-4 task-column overflow-y-auto transition-colors ${
          isOver ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-300 dark:border-blue-700' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id || task._id || Math.random().toString()}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('taskId', task.id || task._id || '');
              }}
            >
              <TaskCard
                task={task}
                onEdit={onTaskEdit}
              />
              {task.timeTracking && (
                <div className="mt-2 ml-2">
                  <TimeTracker
                    task={task}
                    onUpdate={handleTimeUpdate}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskColumn;
