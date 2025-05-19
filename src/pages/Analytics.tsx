
import Sidebar from '@/components/sidebar/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { ChartBar } from 'lucide-react';

// Sample data for analytics
const weeklyData = [
  { name: 'Mon', completed: 5, created: 8 },
  { name: 'Tue', completed: 7, created: 5 },
  { name: 'Wed', completed: 10, created: 7 },
  { name: 'Thu', completed: 8, created: 12 },
  { name: 'Fri', completed: 12, created: 4 },
  { name: 'Sat', completed: 3, created: 1 },
  { name: 'Sun', completed: 2, created: 3 },
];

const taskTypeData = [
  { name: 'Main Tasks', value: 35, color: '#8B5CF6' },
  { name: 'Secondary Tasks', value: 45, color: '#3B82F6' },
  { name: 'Tertiary Tasks', value: 20, color: '#F59E0B' },
];

const monthlyProgressData = [
  { name: 'Jan', progress: 65 },
  { name: 'Feb', progress: 70 },
  { name: 'Mar', progress: 62 },
  { name: 'Apr', progress: 75 },
  { name: 'May', progress: 80 },
  { name: 'Jun', progress: 85 },
];

const Analytics = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar 
          breadcrumbs={[
            { label: 'Analytics', link: '/analytics' }
          ]}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6 flex items-center dark:text-white">
              <ChartBar className="mr-2" /> Analytics Dashboard
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Performance Chart */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Weekly Task Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer config={{ 
                      completed: { color: "#10B981" },
                      created: { color: "#3B82F6" }
                    }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="completed" 
                            stroke="var(--color-completed)" 
                            activeDot={{ r: 8 }} 
                            strokeWidth={3} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="created" 
                            stroke="var(--color-created)" 
                            strokeWidth={3} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Task Types Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Task Types Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={taskTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {taskTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Efficiency Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer config={{ 
                      progress: { color: "#8B5CF6" } 
                    }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyProgressData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="progress" fill="var(--color-progress)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
