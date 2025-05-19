
import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Task, getTasksByStatus } from '@/lib/taskUtils';
import { format, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  // Fetch all tasks regardless of status
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Fetch tasks for each status
        const [draftTasks, inProgressTasks, editingTasks, doneTasks] = await Promise.all([
          getTasksByStatus('Draft'),
          getTasksByStatus('In Progress'),
          getTasksByStatus('Editing'),
          getTasksByStatus('Done')
        ]);

        // Update state with fetched tasks
        setTasks([
          ...(draftTasks || []),
          ...(inProgressTasks || []),
          ...(editingTasks || []),
          ...(doneTasks || [])
        ]);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast({
          title: "Error",
          description: "Failed to load tasks. Please try again.",
          variant: "destructive"
        });

        // Initialize with empty array to prevent errors
        setTasks([]);
      }
    };

    fetchTasks();
  }, [toast]);

  // Get tasks for selected date
  const getTasksForDate = (date: Date | undefined): Task[] => {
    if (!date) return [];

    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return isSameDay(taskDate, date);
    });
  };

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  // Get dates that have tasks
  const getHighlightedDates = () => {
    const dates: Date[] = [];

    tasks.forEach(task => {
      if (task.dueDate) {
        dates.push(new Date(task.dueDate));
      }
    });

    return dates;
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
            { label: 'Calendar', link: '/calendar' }
          ]}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6 flex items-center dark:text-white">
              <CalendarIcon className="mr-2" /> Task Calendar
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Calendar Widget */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md pointer-events-auto border"
                    modifiers={{
                      highlighted: getHighlightedDates()
                    }}
                    modifiersClassNames={{
                      highlighted: "bg-blue-100 dark:bg-blue-900 font-bold text-blue-900 dark:text-blue-100"
                    }}
                  />
                </CardContent>
              </Card>

              {/* Tasks for Selected Date */}
              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>
                    {selectedDate ? (
                      <span>Tasks for {format(selectedDate, 'MMMM d, yyyy')}</span>
                    ) : (
                      <span>Select a date</span>
                    )}
                  </CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus size={16} className="mr-2" /> Add Task
                  </Button>
                </CardHeader>
                <CardContent>
                  {selectedDateTasks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No tasks scheduled for this date
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedDateTasks.map(task => (
                        <div
                          key={task.id}
                          className="p-4 border rounded-md shadow-sm bg-card"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{task.title}</h3>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge>{task.status}</Badge>
                                {task.priority && (
                                  <Badge variant={task.priority === 'Urgent' ? 'destructive' : 'outline'}>
                                    {task.priority}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div>
                              {task.progress !== undefined && (
                                <span className="text-xs font-medium">
                                  {task.progress}% complete
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CalendarView;
