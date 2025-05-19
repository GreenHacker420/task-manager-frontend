
import { Clock, MessageSquare, FileText, Star } from 'lucide-react';

interface TaskMetadataProps {
  dueDate?: string;
  comments?: number;
  files?: number;
  starred?: boolean;
}

const TaskMetadata = ({ dueDate, comments, files, starred }: TaskMetadataProps) => {
  return (
    <div className="flex justify-between items-center mt-3">
      <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
        {dueDate && (
          <div className="mb-3 text-xs flex items-center text-gray-500 dark:text-gray-400">
            <Clock size={12} className="mr-1" />
            Due: {dueDate}
          </div>
        )}
        
        {comments !== undefined && comments > 0 && (
          <div className="flex items-center text-xs">
            <MessageSquare size={14} className="mr-1" />
            <span>{comments}</span>
          </div>
        )}
        
        {files !== undefined && files > 0 && (
          <div className="flex items-center text-xs">
            <FileText size={14} className="mr-1" />
            <span>{files}</span>
          </div>
        )}
      </div>
      
      {starred && (
        <Star size={16} className="text-yellow-400 fill-yellow-400" />
      )}
    </div>
  );
};

export default TaskMetadata;
