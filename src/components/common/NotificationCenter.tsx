import React, { useState } from "react";
import { Bell, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: "info" | "alert" | "success" | "warning";
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (id: string) => void;
}

const NotificationCenter = ({
  notifications = [
    {
      id: "1",
      title: "New Dispatch Created",
      message:
        "A new high-priority dispatch has been created and assigned to Officer Johnson.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Task Status Updated",
      message: "Officer Smith has marked the security check task as complete.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      type: "success",
    },
    {
      id: "3",
      title: "Assistance Requested",
      message: "Officer Davis has requested backup at the north entrance.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: false,
      type: "alert",
    },
    {
      id: "4",
      title: "System Maintenance",
      message: "The system will undergo maintenance tonight from 2 AM to 4 AM.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      read: true,
      type: "warning",
    },
    {
      id: "5",
      title: "New User Registered",
      message: "A new dispatcher account has been created by the admin.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      type: "info",
    },
  ],
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onDismiss = () => {},
}: NotificationCenterProps) => {
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    }
  };

  const getTypeStyles = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700";
      case "alert":
        return "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700";
      case "success":
        return "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700";
      case "warning":
        return "bg-yellow-100 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700";
      default:
        return "bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-700";
    }
  };

  const getTypeBadge = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return (
          <Badge variant="secondary" className="bg-blue-500 hover:bg-blue-600">
            Info
          </Badge>
        );
      case "alert":
        return <Badge variant="destructive">Alert</Badge>;
      case "success":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
        );
      case "warning":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Warning
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 p-0">
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onMarkAllAsRead();
                  // In a real app, you would update the state here
                }}
              >
                Mark all as read
              </Button>
            )}
          </div>

          <ScrollArea className="h-[400px]">
            {notifications.length > 0 ? (
              <div className="flex flex-col">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-3 border-b last:border-b-0 transition-colors",
                      !notification.read && "bg-gray-50 dark:bg-gray-800/50",
                      getTypeStyles(notification.type),
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {notification.title}
                        </span>
                        {getTypeBadge(notification.type)}
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => {
                              onMarkAsRead(notification.id);
                              // In a real app, you would update the state here
                            }}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            onDismiss(notification.id);
                            // In a real app, you would update the state here
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {notification.message}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <Bell className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-gray-500">No notifications yet</p>
              </div>
            )}
          </ScrollArea>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-center text-center py-2 cursor-pointer">
            View all notifications
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NotificationCenter;
