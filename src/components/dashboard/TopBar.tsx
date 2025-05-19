
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ChevronDown, Bell, PanelRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TopBarProps {
  pageTitle?: string;
  breadcrumbs?: Array<{ label: string; link?: string }>;
  showRightSidebar?: boolean;
  onToggleRightSidebar?: () => void;
}

const TopBar = ({
  pageTitle = "Dashboard",
  breadcrumbs,
  showRightSidebar = false,
  onToggleRightSidebar
}: TopBarProps) => {
  const { user, logout } = useAuth();
  const [notifications] = useState([
    { id: 1, text: "New task assigned to you", time: "5m ago" },
    { id: 2, text: "Your task was completed", time: "1h ago" },
    { id: 3, text: "Meeting reminder: Team sync", time: "2h ago" },
  ]);

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 py-4 px-6 flex items-center justify-between">
      <div>
        {/* Page title or breadcrumbs */}
        {breadcrumbs ? (
          <div className="flex items-center text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">&gt;</span>}
                {crumb.link ? (
                  <Link to={crumb.link} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-gray-900 dark:text-white">{crumb.label}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-xl font-medium text-gray-900 dark:text-white">{pageTitle}</h1>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* Right Sidebar Toggle */}
        {onToggleRightSidebar && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onToggleRightSidebar}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <PanelRight
                    size={20}
                    className={`transition-transform duration-300 ${showRightSidebar ? '' : 'rotate-180'}`}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showRightSidebar ? "Hide sidebar" : "Show sidebar"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative outline-none">
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              {notifications.length}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start py-2">
                <span>{notification.text}</span>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm text-blue-600">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center outline-none">
            <div className="mr-2 text-right hidden sm:block">
              <div className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'Name Surname'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Administrator</div>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>
                {user?.name ? getInitials(user.name) : 'NS'}
              </AvatarFallback>
            </Avatar>
            <ChevronDown size={16} className="ml-1 text-gray-600 dark:text-gray-300" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;
