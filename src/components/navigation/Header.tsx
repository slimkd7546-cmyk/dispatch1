import React, { useState, useCallback, memo } from "react";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
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
  MessageSquare,
} from "lucide-react";
import MessageIndicator from "@/components/messaging/MessageIndicator";
import ChatButton from "@/components/messaging/ChatButton";
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
import { useAuthContext, AuthProvider } from "@/context/AuthContext";

interface HeaderProps {
  title?: string;
  onMenuToggle?: () => void;
  userRole?: "Admin" | "Dispatcher" | "Officer" | "Reviewer";
  userName?: string;
  userAvatar?: string;
  onToggleMessaging?: () => void;
  messagingPanelOpen?: boolean;
}

const HeaderContent = ({
  title = "Dashboard",
  onMenuToggle = () => {},
  userRole = "Dispatcher",
  userName = "Jane Doe",
  userAvatar = "",
  onToggleMessaging = () => {},
  messagingPanelOpen = false,
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { logout } = useAuthContext();

  // Memoize event handlers
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [],
  );
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
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 lg:px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="md:hidden hover:bg-muted/80 transition-colors"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4 md:justify-between">
        <div className="hidden md:flex md:w-full md:max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 transition-all focus-visible:ring-teal-500 border-muted/60"
              value={searchQuery}
              onChange={handleSearchChange}
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "relative",
                    messagingPanelOpen && "bg-muted text-primary",
                  )}
                  aria-label="Messages"
                  onClick={onToggleMessaging}
                >
                  <MessageSquare className="h-5 w-5" />
                  <MessageIndicator className="absolute -top-1 -right-1" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {messagingPanelOpen ? "Close Messages" : "Open Messages"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

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
                  <p className="text-sm font-medium leading-none">{userName}</p>
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
                  logout();
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
  );
};

const MemoizedHeaderContent = memo(HeaderContent);

const Header = (props: HeaderProps) => {
  return (
    <AuthProvider>
      <MemoizedHeaderContent {...props} />
    </AuthProvider>
  );
};

export default memo(Header);
