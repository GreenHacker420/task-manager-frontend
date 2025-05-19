
import { Edit } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

interface TaskHeaderProps {
  title: string;
  children: React.ReactNode;
}

const TaskHeader = ({ title, children }: TaskHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-medium text-gray-800 dark:text-gray-200">{title}</h3>
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <Edit size={16} />
          </button>
        </DialogTrigger>
        {children}
      </Dialog>
    </div>
  );
};

export default TaskHeader;
