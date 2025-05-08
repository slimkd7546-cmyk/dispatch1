import React from "react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType =
  | "pending"
  | "in-progress"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "active"
  | "inactive"
  | "warning"
  | "error"
  | "success"
  | "info"
  | string;

interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  status: StatusType;
  showDot?: boolean;
  size?: "sm" | "md" | "lg";
}

const getStatusConfig = (status: StatusType) => {
  const statusMap: Record<
    string,
    { variant: BadgeProps["variant"]; dotColor: string }
  > = {
    // Task/Dispatch statuses
    pending: { variant: "secondary", dotColor: "bg-yellow-500" },
    "in-progress": { variant: "default", dotColor: "bg-blue-500" },
    in_progress: { variant: "default", dotColor: "bg-blue-500" },
    completed: { variant: "outline", dotColor: "bg-green-500" },
    cancelled: { variant: "destructive", dotColor: "bg-red-500" },

    // General statuses
    active: { variant: "default", dotColor: "bg-green-500" },
    inactive: { variant: "outline", dotColor: "bg-gray-400" },

    // Alert levels
    warning: { variant: "secondary", dotColor: "bg-yellow-500" },
    error: { variant: "destructive", dotColor: "bg-red-500" },
    success: { variant: "outline", dotColor: "bg-green-500" },
    info: { variant: "secondary", dotColor: "bg-blue-500" },
  };

  return statusMap[status] || { variant: "outline", dotColor: "bg-gray-400" };
};

const StatusBadge = ({
  status,
  showDot = true,
  size = "md",
  className,
  children,
  ...props
}: StatusBadgeProps) => {
  const { variant, dotColor } = getStatusConfig(status);
  const displayText = children || status.replace(/-|_/g, " ");

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "px-3 py-1",
  };

  return (
    <Badge
      variant={variant}
      className={cn(
        "capitalize",
        sizeClasses[size],
        showDot && "pl-1.5",
        className,
      )}
      {...props}
    >
      {showDot && (
        <span
          className={cn(
            "mr-1.5 inline-block h-1.5 w-1.5 rounded-full",
            dotColor,
          )}
        />
      )}
      {displayText}
    </Badge>
  );
};

export { StatusBadge };
