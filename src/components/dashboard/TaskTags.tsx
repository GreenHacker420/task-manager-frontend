
import { Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getTagColor } from '@/lib/taskUtils';

interface TaskTagsProps {
  tags: string[];
}

const TaskTags = ({ tags }: TaskTagsProps) => {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className="mb-3 flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className={`flex items-center gap-1 ${getTagColor(tag)}`}>
          <Tag size={10} />
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default TaskTags;
