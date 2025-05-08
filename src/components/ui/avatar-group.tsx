import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface AvatarGroupProps {
  users: User[];
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showTooltip?: boolean;
}

const AvatarGroup = ({
  users,
  max = 3,
  size = "md",
  className,
  showTooltip = true,
}: AvatarGroupProps) => {
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base",
  };

  const visibleUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visibleUsers.map((user) => (
        <div
          key={user.id}
          className="relative"
          {...(showTooltip && { "data-tooltip": user.name })}
        >
          <Avatar className={cn("ring-2 ring-background", sizeClasses[size])}>
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-muted text-muted-foreground ring-2 ring-background",
            sizeClasses[size],
          )}
          {...(showTooltip && {
            "data-tooltip": `${remainingCount} more`,
          })}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export { AvatarGroup };
