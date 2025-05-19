
import { useState } from 'react';
import { Task, getTagColor } from '@/lib/taskUtils';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';
import { generateTaskDescription, improveTaskDescription } from '@/lib/aiUtils';

// Import new components
import TaskHeader from './TaskHeader';
import TaskSubtasks from './TaskSubtasks';
import TaskTags from './TaskTags';
import TaskProgress from './TaskProgress';
import TaskMetadata from './TaskMetadata';

interface TaskCardProps {
  task: Task;
  onEdit?: (updatedTask: Task) => void;
}

const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const [editedTask, setEditedTask] = useState<Task>({ ...task });
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const { toast } = useToast();

  const getTaskBorderClass = () => {
    switch (task.type) {
      case 'Main Task': return 'border-l-4 border-purple-500';
      case 'Secondary Task': return 'border-l-4 border-blue-500';
      case 'Tertiary Task': return 'border-l-4 border-yellow-500';
      default: return 'border-l-4 border-gray-500';
    }
  };

  const getAvatarColorClass = (authorId: string) => {
    // If authorId is a MongoDB ObjectId, use a consistent color based on the first character
    if (authorId && authorId.length > 10) {
      const firstChar = authorId.charAt(0);
      switch (firstChar) {
        case '0': case '1': case '2': return 'bg-blue-500 text-white';
        case '3': case '4': case '5': return 'bg-green-500 text-white';
        case '6': case '7': case '8': return 'bg-purple-500 text-white';
        case '9': case 'a': case 'b': return 'bg-red-500 text-white';
        case 'c': case 'd': case 'e': return 'bg-yellow-500 text-white';
        case 'f': default: return 'bg-gray-500 text-white';
      }
    }

    // For mock data with simple authorIds
    switch (authorId) {
      case 'a': return 'bg-blue-500 text-white';
      case 'b': return 'bg-green-500 text-white';
      case 'c': return 'bg-purple-500 text-white';
      case 'd': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleSaveTask = () => {
    if (onEdit) {
      onEdit(editedTask);
    }

    toast({
      title: "Task Updated",
      description: "Your task has been updated successfully."
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedTask({
      ...editedTask,
      title: e.target.value
    });
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask({
      ...editedTask,
      progress: parseInt(e.target.value) || 0
    });
  };

  const handleToggleTag = (tag: string) => {
    const currentTags = editedTask.tags || [];
    if (currentTags.includes(tag)) {
      setEditedTask({
        ...editedTask,
        tags: currentTags.filter(t => t !== tag)
      });
    } else {
      setEditedTask({
        ...editedTask,
        tags: [...currentTags, tag]
      });
    }
  };

  const handleAIAssist = async () => {
    setIsGeneratingAI(true);
    try {
      const improvedTitle = await improveTaskDescription(editedTask.title);
      setEditedTask({
        ...editedTask,
        title: improvedTitle
      });

      toast({
        title: "AI Assistance",
        description: "Task description enhanced with AI"
      });
    } catch (error) {
      toast({
        title: "AI Error",
        description: "Failed to generate description. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Render task card with new components
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm ${getTaskBorderClass()} transition-all duration-200`}>
      <div className="p-4">
        <TaskHeader title={task.title}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Task Title</label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={handleAIAssist}
                    disabled={isGeneratingAI}
                  >
                    <Sparkles size={14} className="text-purple-500" />
                    {isGeneratingAI ? "Enhancing..." : "AI Enhance"}
                  </Button>
                </div>

                {isGeneratingAI ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-3/4" />
                  </div>
                ) : (
                  <Textarea
                    value={editedTask.title}
                    onChange={handleTextChange}
                    placeholder="Task title"
                    className="resize-none"
                  />
                )}
              </div>

              {editedTask.progress !== undefined && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Progress: {editedTask.progress}%</label>
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={editedTask.progress}
                    onChange={handleProgressChange}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <div className="flex gap-2 flex-wrap">
                  {["Important", "Urgent", "Review", "Design", "Development", "Bug", "Feature", "Documentation"].map(tag => (
                    <Badge
                      key={tag}
                      variant={editedTask.tags?.includes(tag) ? "default" : "outline"}
                      className={`cursor-pointer ${editedTask.tags?.includes(tag) ? getTagColor(tag) : ''}`}
                      onClick={() => handleToggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <div className="flex gap-2">
                  {["Low", "Medium", "High", "Urgent"].map((priority) => (
                    <Badge
                      key={priority}
                      variant={editedTask.priority === priority ? "default" : "outline"}
                      className={`cursor-pointer ${
                        priority === 'Low' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                        priority === 'Medium' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        priority === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      } ${editedTask.priority !== priority ? '!bg-transparent' : ''}`}
                      onClick={() => setEditedTask({...editedTask, priority: priority as 'Low' | 'Medium' | 'High' | 'Urgent'})}
                    >
                      {priority}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveTask}>Save Changes</Button>
              </div>
            </div>
          </DialogContent>
        </TaskHeader>

        <TaskSubtasks subtasks={task.subtasks} getAvatarColorClass={getAvatarColorClass} />
        <TaskTags tags={task.tags || []} />
        <TaskProgress progress={task.progress || 0} type={task.type} />
        <TaskMetadata
          dueDate={task.dueDate}
          comments={task.comments}
          files={task.files}
          starred={task.starred}
        />
      </div>
    </div>
  );
};

export default TaskCard;
