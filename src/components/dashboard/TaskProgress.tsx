
interface TaskProgressProps {
  progress: number;
  type?: string;
}

const TaskProgress = ({ progress, type }: TaskProgressProps) => {
  if (progress === undefined) return null;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="progress-bar dark:bg-gray-700">
        <div 
          className={`progress-bar-inner ${
            type === 'Main Task' ? 'progress-bar-primary' : 'progress-bar-secondary'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default TaskProgress;
