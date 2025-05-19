
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DashboardFiltersProps {
  onSearchChange: (query: string) => void;
  onTagFilterChange: (tags: string[]) => void;
  onPriorityFilterChange: (priority: string) => void;
  onCategoryFilterChange: (category: string) => void;
  onResetFilters: () => void;
  categories: string[];
}

const DashboardFilters = ({
  onSearchChange,
  onTagFilterChange,
  onPriorityFilterChange,
  onCategoryFilterChange,
  onResetFilters,
  categories
}: DashboardFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const availableTags = ["Important", "Urgent", "Review", "Design", "Development", "Bug", "Feature", "Documentation"];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  const toggleFilter = (filter: string) => {
    let newFilters: string[];
    
    if (activeFilters.includes(filter)) {
      newFilters = activeFilters.filter(f => f !== filter);
    } else {
      newFilters = [...activeFilters, filter];
    }
    
    setActiveFilters(newFilters);
    onTagFilterChange(newFilters);
  };

  const handlePriorityChange = (value: string) => {
    setPriorityFilter(value);
    onPriorityFilterChange(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    onCategoryFilterChange(value);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveFilters([]);
    setPriorityFilter('all');
    setCategoryFilter('all');
    onResetFilters();
  };

  return (
    <div className="px-2 mb-4 flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-8 w-full"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-2">
        <div className="flex flex-wrap gap-1 items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">Tags:</span>
          {availableTags.map(filter => (
            <Badge 
              key={filter}
              variant={activeFilters.includes(filter) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>

        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <Select value={priorityFilter} onValueChange={handlePriorityChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="ghost" size="sm" onClick={resetFilters}>Clear</Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilters;
