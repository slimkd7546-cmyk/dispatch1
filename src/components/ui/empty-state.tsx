import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  className?: string;
  iconClassName?: string;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  actionIcon,
  onAction,
  className,
  iconClassName,
}: EmptyStateProps) => {
  return (
    <div className={cn("flex flex-col p-8 w-full h-full", className)}>
      {icon && (
        <div className={cn("mb-4 text-muted-foreground", iconClassName)}>
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4" variant="outline" size="sm">
          {actionIcon && <span className="mr-2">{actionIcon}</span>}
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export { EmptyState };
