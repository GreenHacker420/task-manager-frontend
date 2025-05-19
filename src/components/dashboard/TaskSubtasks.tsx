
import { Check } from 'lucide-react';
import { Subtask } from '@/lib/taskUtils';

interface TaskSubtasksProps {
  subtasks: Subtask[];
  getAvatarColorClass: (authorId: string) => string;
}

const TaskSubtasks = ({ subtasks, getAvatarColorClass }: TaskSubtasksProps) => {
  if (!subtasks.length) return null;

  return (
    <div className="space-y-2 mb-4">
      {subtasks.map((subtask, index) => (
        <div key={subtask.id || subtask._id || index} className="flex items-start gap-2 text-sm">
          <div className={`flex-shrink-0 w-5 h-5 rounded-full ${getAvatarColorClass(subtask.authorId)} flex items-center justify-center text-xs`}>
            {subtask.authorId ? subtask.authorId.toString().charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="text-gray-600 dark:text-gray-300 flex-1 line-clamp-1">{subtask.text}</span>
          {subtask.completed && (
            <Check size={16} className="text-green-500 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskSubtasks;
