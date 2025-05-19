
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Settings,
  Users,
  LayoutDashboard,
  ChartBar,
  CalendarDays,
  Menu,
  X,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const isMobileHook = useIsMobile();
  const [expanded, setExpanded] = useState(!isMobileHook);
  const { user } = useAuth();

  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: Home,
    },
    {
      path: "/calendar",
      name: "Calendar",
      icon: CalendarDays,
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: ChartBar,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: User,
    },
    {
      path: "/settings",
      name: "Settings",
      icon: Settings,
    },
  ];

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-sm transition-all duration-300 ${
        expanded ? "w-64" : "w-20"
      } h-screen relative z-10`}
    >
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <div className={cn("flex items-center", !expanded && "justify-center w-full")}>
          {expanded && (
            <span className="text-xl font-bold dark:text-white">Taskify</span>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className={`${expanded ? "" : "mx-auto"} text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300`}
        >
          {expanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                pathname === item.path || pathname.startsWith(`${item.path}/`)
                  ? "bg-gray-100 text-primary-600 dark:bg-gray-700 dark:text-gray-200"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              } ${!expanded ? "justify-center" : ""}`}
            >
              <item.icon size={18} className={expanded ? "mr-3" : ""} />
              {expanded && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
      </div>

      {expanded && user && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium dark:text-white">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
