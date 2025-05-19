
import { BarChart, Circle } from 'lucide-react';
import { completedTasksData, efficiencyData, planData } from '@/lib/taskUtils';

const RightSidebar = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border-l dark:border-gray-700 w-full lg:w-80 xl:w-96 p-6 overflow-y-auto h-screen">
      {/* User profile */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-bold text-xl dark:text-white">Name Surname</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Administrator and UX Designer</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
          NS
        </div>
      </div>

      {/* Completed tasks */}
      <div className="mb-8">
        <h3 className="uppercase tracking-wider text-xs font-bold text-gray-500 dark:text-gray-400 mb-4">
          Completed Tasks
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {completedTasksData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-gradient-to-b from-blue-400 to-purple-500 h-16 rounded-lg flex items-end justify-center p-1">
                <div className="bg-white dark:bg-gray-700 rounded w-full" style={{ height: `${Math.min(100, (item.count / 250) * 100)}%` }}></div>
              </div>
              <p className="mt-2 font-bold dark:text-white">{item.count}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Author {item.author.split(' ')[1]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Efficiency */}
      <div className="mb-8">
        <h3 className="uppercase tracking-wider text-xs font-bold text-gray-500 dark:text-gray-400 mb-4">
          Efficiency
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {efficiencyData.map((item, index) => {
            // Determine indicator color class
            const indicatorClass = `indicator-${item.author.split(' ')[1].toLowerCase()}`;

            return (
              <div key={index} className="text-center">
                <div className="relative h-16 w-16 mx-auto">
                  <Circle className="text-gray-200 dark:text-gray-700 w-full h-full" strokeWidth={4} />
                  <svg className="absolute top-0 left-0" width="64" height="64">
                    <circle
                      cx="32"
                      cy="32"
                      r="30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${item.efficiency * 1.88} 188`}
                      transform="rotate(-90 32 32)"
                      className={indicatorClass}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-lg dark:text-white">
                    {item.efficiency}
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Author {item.author.split(' ')[1]}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Plan */}
      <div>
        <h3 className="uppercase tracking-wider text-xs font-bold text-gray-500 dark:text-gray-400 mb-4">
          Plan
        </h3>
        <div className="space-y-2">
          {planData.map((item, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-700 p-2 rounded-r flex justify-between items-center"
            >
              <span className="text-sm font-medium dark:text-white">{item.time}</span>
              <span className="text-xs text-gray-600 dark:text-gray-300 w-2/3 truncate text-right">{item.task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
