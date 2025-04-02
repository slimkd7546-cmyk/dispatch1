import React, { useState } from "react";
import {
  Search,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/components/ui/theme-provider";
import { ThemeProvider } from "@/components/ui/theme-provider";

interface HeaderProps {
  title?: string;
  onMenuToggle?: () => void;
  userRole?: "Admin" | "Dispatcher" | "Officer" | "Reviewer";
  userName?: string;
  userAvatar?: string;
}

const Header = ({
  title = "Dashboard",
  onMenuToggle = () => {},
  userRole = "Dispatcher",
  userName = "Jane Doe",
  userAvatar = "",
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Simple theme toggle component
  const ThemeToggle = () => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Simple notification center component
  const NotificationCenter = () => {
    const notifications = [
      {
        id: 1,
        title: "New dispatch assigned",
        message: "You have been assigned to a new dispatch #1234",
        time: "5 minutes ago",
        read: false,
      },
      {
        id: 2,
        title: "Task status updated",
        message: "Officer Smith has completed task #5678",
        time: "1 hour ago",
        read: true,
      },
      {
        id: 3,
        title: "System maintenance",
        message: "Scheduled maintenance in 2 hours",
        time: "2 hours ago",
        read: true,
      },
    ];

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-teal-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="border-b p-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Notifications</h4>
              <Button variant="ghost" size="sm" className="text-xs">
                Mark all as read
              </Button>
            </div>
          </div>
          <div className="max-h-80 overflow-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-b p-4 ${notification.read ? "" : "bg-muted/50"}`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <h5 className="font-medium">{notification.title}</h5>
                  <span className="text-xs text-muted-foreground">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
              </div>
            ))}
          </div>
          <div className="p-3 text-center">
            <Button variant="ghost" size="sm" className="w-full text-sm">
              View all notifications
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <h1 className="text-xl font-semibold">{title}</h1>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4 md:justify-between">
          <div className="hidden md:flex md:w-full md:max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5 md:hidden" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Search</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <NotificationCenter />

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    {userAvatar ? (
                      <AvatarImage src={userAvatar} alt={userName} />
                    ) : (
                      <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userRole}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => {
                    // Clear authentication
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("userRole");
                    window.location.href = "/";
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </ThemeProvider>
  );
};

export default Header;
