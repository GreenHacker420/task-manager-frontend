
import { useState, useEffect } from 'react';
import { Play, Pause, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDuration } from '@/lib/timeUtils';
import { Task } from '@/lib/taskUtils';

interface TimeTrackerProps {
  task: Task;
  onUpdate: (taskId: string, timeSpent: number, isRunning: boolean) => void;
}

const TimeTracker = ({ task, onUpdate }: TimeTrackerProps) => {
  const [isRunning, setIsRunning] = useState(task.timeTracking?.isRunning || false);
  const [timeSpent, setTimeSpent] = useState(task.timeTracking?.timeSpent || 0); // in minutes
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize from task
    if (task.timeTracking) {
      setIsRunning(task.timeTracking.isRunning);
      setTimeSpent(task.timeTracking.timeSpent);
    }
  }, [task]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeSpent(prev => prev + 1/60); // Add 1 second converted to minutes
      }, 1000);

      setTimerInterval(interval);
    } else if (timerInterval) {
      clearInterval(timerInterval);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    const newIsRunning = !isRunning;
    setIsRunning(newIsRunning);
    const taskId = task.id || task._id || '';
    onUpdate(taskId, timeSpent, newIsRunning);
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      <Clock size={14} className="text-gray-500" />
      <span className="font-mono">{formatDuration(timeSpent)}</span>
      <Button
        variant="outline"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={toggleTimer}
      >
        {isRunning ? (
          <Pause size={12} className="text-red-500" />
        ) : (
          <Play size={12} className="text-green-500" />
        )}
      </Button>
    </div>
  );
};

export default TimeTracker;
