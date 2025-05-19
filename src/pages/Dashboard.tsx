
import { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import TaskColumn from '@/components/dashboard/TaskColumn';
import RightSidebar from '@/components/dashboard/RightSidebar';
import AddTaskDialog from '@/components/dashboard/AddTaskDialog';
import DashboardFilters from '@/components/dashboard/DashboardFilters';
import { Task, getTasksByStatus } from '@/lib/taskUtils';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const Dashboard = () => {
  const [draftTasks, setDraftTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [editingTasks, setEditingTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(() => {
    // Check localStorage for saved preference, default to false if not found
    const savedPreference = localStorage.getItem('showRightSidebar');
    return savedPreference !== null ? savedPreference === 'true' : false;
  });

  // Filters
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const { toast } = useToast();

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);

        // Fetch tasks for each status
        const [draft, inProgress, editing, done] = await Promise.all([
          getTasksByStatus('Draft'),
          getTasksByStatus('In Progress'),
          getTasksByStatus('Editing'),
          getTasksByStatus('Done')
        ]);

        // Update state with fetched tasks
        setDraftTasks(draft || []);
        setInProgressTasks(inProgress || []);
        setEditingTasks(editing || []);
        setDoneTasks(done || []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast({
          title: "Error",
          description: "Failed to load tasks. Please try again.",
          variant: "destructive"
        });

        // Initialize with empty arrays to prevent errors
        setDraftTasks([]);
        setInProgressTasks([]);
        setEditingTasks([]);
        setDoneTasks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [toast]);

  const handleDrop = (taskId: string, newStatus: string) => {
    // Ensure all task arrays exist before spreading
    const draft = draftTasks || [];
    const inProgress = inProgressTasks || [];
    const editing = editingTasks || [];
    const done = doneTasks || [];

    // Find the task in all columns
    const allTasks = [...draft, ...inProgress, ...editing, ...done];
    const taskToMove = allTasks.find(task => task && (task.id === taskId || task._id === taskId));

    if (!taskToMove) return;

    // Remove from current column
    if (taskToMove.status === 'Draft') {
      setDraftTasks(prev => (prev || []).filter(t => t && (t.id !== taskId && t._id !== taskId)));
    } else if (taskToMove.status === 'In Progress') {
      setInProgressTasks(prev => (prev || []).filter(t => t && (t.id !== taskId && t._id !== taskId)));
    } else if (taskToMove.status === 'Editing') {
      setEditingTasks(prev => (prev || []).filter(t => t && (t.id !== taskId && t._id !== taskId)));
    } else if (taskToMove.status === 'Done') {
      setDoneTasks(prev => (prev || []).filter(t => t && (t.id !== taskId && t._id !== taskId)));
    }

    // Add to new column with properly typed status
    const validStatus = newStatus as 'Draft' | 'In Progress' | 'Editing' | 'Done';
    const updatedTask = { ...taskToMove, status: validStatus };

    if (newStatus === 'Draft') {
      setDraftTasks(prev => [...(prev || []), updatedTask]);
    } else if (newStatus === 'In Progress') {
      setInProgressTasks(prev => [...(prev || []), updatedTask]);
    } else if (newStatus === 'Editing') {
      setEditingTasks(prev => [...(prev || []), updatedTask]);
    } else if (newStatus === 'Done') {
      setDoneTasks(prev => [...(prev || []), updatedTask]);
    }

    toast({
      title: "Task Moved",
      description: `${taskToMove.title} moved to ${newStatus}`
    });
  };

  const handleTaskEdit = (updatedTask: Task) => {
    // Get task ID (either id or _id)
    const taskId = updatedTask.id || updatedTask._id;

    // Update task in the correct column
    if (updatedTask.status === 'Draft') {
      setDraftTasks(prev => (prev || []).map(t => t && (t.id === taskId || t._id === taskId) ? updatedTask : t));
    } else if (updatedTask.status === 'In Progress') {
      setInProgressTasks(prev => (prev || []).map(t => t && (t.id === taskId || t._id === taskId) ? updatedTask : t));
    } else if (updatedTask.status === 'Editing') {
      setEditingTasks(prev => (prev || []).map(t => t && (t.id === taskId || t._id === taskId) ? updatedTask : t));
    } else if (updatedTask.status === 'Done') {
      setDoneTasks(prev => (prev || []).map(t => t && (t.id === taskId || t._id === taskId) ? updatedTask : t));
    }
  };

  const handleAddTask = (newTask: Task) => {
    // Add task to the appropriate column based on status
    if (newTask.status === 'Draft') {
      setDraftTasks(prev => [...(prev || []), newTask]);
    } else if (newTask.status === 'In Progress') {
      setInProgressTasks(prev => [...(prev || []), newTask]);
    } else if (newTask.status === 'Editing') {
      setEditingTasks(prev => [...(prev || []), newTask]);
    } else if (newTask.status === 'Done') {
      setDoneTasks(prev => [...(prev || []), newTask]);
    }
  };

  const handleTimeUpdate = (taskId: string, timeSpent: number, isRunning: boolean) => {
    // Find task in all columns
    const updateTaskInColumn = (tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
      // Handle null or undefined tasks
      if (!tasks) {
        setTasks([]);
        return;
      }

      const updatedTasks = tasks.map(task => {
        if (task && (task.id === taskId || task._id === taskId)) {
          return {
            ...task,
            timeTracking: {
              timeSpent,
              isRunning,
              lastStarted: isRunning ? Date.now() : undefined
            }
          };
        }
        return task;
      });
      setTasks(updatedTasks);
    };

    updateTaskInColumn(draftTasks || [], setDraftTasks);
    updateTaskInColumn(inProgressTasks || [], setInProgressTasks);
    updateTaskInColumn(editingTasks || [], setEditingTasks);
    updateTaskInColumn(doneTasks || [], setDoneTasks);
  };

  const filterTasks = (tasks: Task[]) => {
    // Handle null or undefined tasks
    if (!tasks) return [];

    return tasks.filter(task => {
      // Skip null or undefined tasks
      if (!task) return false;

      // Apply text search
      const matchesSearch = searchQuery === '' ||
        (task.title && task.title.toLowerCase().includes(searchQuery.toLowerCase()));

      // Apply tag filters
      const matchesTags = activeFilters.length === 0 ||
        (task.tags && task.tags.some(tag => activeFilters.includes(tag)));

      // Apply priority filter
      const matchesPriority = !priorityFilter || priorityFilter === "all" || task.priority === priorityFilter;

      // Apply category filter
      const matchesCategory = !categoryFilter || categoryFilter === "all" || task.category === categoryFilter;

      return matchesSearch && matchesTags && matchesPriority && matchesCategory;
    });
  };

  // Get all available categories from tasks
  const getAllCategories = () => {
    // Ensure all task arrays exist before spreading
    const draft = draftTasks || [];
    const inProgress = inProgressTasks || [];
    const editing = editingTasks || [];
    const done = doneTasks || [];

    const allTasks = [...draft, ...inProgress, ...editing, ...done];
    const categories = new Set<string>();

    allTasks.forEach(task => {
      if (task && task.category) {
        categories.add(task.category);
      }
    });

    return Array.from(categories);
  };

  const resetFilters = () => {
    setActiveFilters([]);
    setPriorityFilter('all');
    setCategoryFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar
          breadcrumbs={[
            { label: 'Tasks', link: '/tasks' },
            { label: 'Today' }
          ]}
          showRightSidebar={showRightSidebar}
          onToggleRightSidebar={() => {
            const newValue = !showRightSidebar;
            setShowRightSidebar(newValue);
            localStorage.setItem('showRightSidebar', String(newValue));
          }}
        />

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-hidden p-4">
          {/* Dashboard Title & Actions */}
          <div className="px-2 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold mb-2 md:mb-0 dark:text-white">Task Management</h1>

            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <AddTaskDialog onAddTask={handleAddTask} />
              <Link to="/calendar">
                <Button variant="outline" size="icon" className="h-10 w-10" title="Calendar View">
                  <Calendar size={16} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Filters */}
          <DashboardFilters
            onSearchChange={setSearchQuery}
            onTagFilterChange={setActiveFilters}
            onPriorityFilterChange={setPriorityFilter}
            onCategoryFilterChange={setCategoryFilter}
            onResetFilters={resetFilters}
            categories={getAllCategories()}
          />

          {/* Task Columns */}
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Loading tasks...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-180px)] overflow-hidden">
              <TaskColumn
                title="Draft"
                tasks={filterTasks(draftTasks)}
                onDrop={handleDrop}
                onTaskEdit={handleTaskEdit}
                onTimeUpdate={handleTimeUpdate}
              />
              <TaskColumn
                title="In Progress"
                tasks={filterTasks(inProgressTasks)}
                onDrop={handleDrop}
                onTaskEdit={handleTaskEdit}
                onTimeUpdate={handleTimeUpdate}
              />
              <TaskColumn
                title="Editing"
                tasks={filterTasks(editingTasks)}
                onDrop={handleDrop}
                onTaskEdit={handleTaskEdit}
                onTimeUpdate={handleTimeUpdate}
              />
              <TaskColumn
                title="Done"
                tasks={filterTasks(doneTasks)}
                onDrop={handleDrop}
                onTaskEdit={handleTaskEdit}
                onTimeUpdate={handleTimeUpdate}
              />
            </div>
          )}
        </main>
      </div>

      {/* Right Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out transform ${
          showRightSidebar
            ? 'translate-x-0 opacity-100 w-auto'
            : 'translate-x-full opacity-0 w-0 overflow-hidden'
        }`}
        aria-hidden={!showRightSidebar}
      >
        <RightSidebar />
      </div>
    </div>
  );
};

export default Dashboard;
