
import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Moon, Sun, Save } from "lucide-react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user previously set dark mode preference
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    // Update the DOM
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Save preference
    localStorage.setItem("darkMode", String(newMode));
    
    toast({
      title: `${newMode ? "Dark" : "Light"} mode activated`,
      description: `UI has been switched to ${newMode ? "dark" : "light"} mode.`
    });
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
            { label: 'Settings', link: '/settings' }
          ]}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6 dark:text-white">Settings</h1>
            
            <div className="grid gap-6">
              {/* Appearance Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how the application looks and feels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {darkMode ? <Moon className="h-5 w-5 text-blue-500" /> : <Sun className="h-5 w-5 text-yellow-500" />}
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={toggleDarkMode}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* More settings sections can be added here */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
