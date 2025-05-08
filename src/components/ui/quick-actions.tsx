import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  iconClassName?: string;
}

const QuickAction = ({
  icon,
  label,
  onClick,
  className,
  iconClassName,
}: QuickActionProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "h-auto py-4 flex flex-col items-center justify-center gap-2",
        className,
      )}
      onClick={onClick}
    >
      <div className={cn("h-5 w-5 text-teal-600", iconClassName)}>{icon}</div>
      <span className="text-sm">{label}</span>
    </Button>
  );
};

interface QuickActionsProps {
  actions: QuickActionProps[];
  className?: string;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: "none" | "sm" | "md" | "lg";
}

const QuickActions = ({
  actions,
  className,
  columns = { sm: 2, md: 3, lg: 4 },
  gap = "md",
}: QuickActionsProps) => {
  const gapClasses = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  const getColumnsClass = () => {
    const classes = [];
    if (columns.sm) classes.push(`grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    return classes.join(" ");
  };

  return (
    <div className={cn("grid", getColumnsClass(), gapClasses[gap], className)}>
      {actions.map((action, index) => (
        <QuickAction key={index} {...action} />
      ))}
    </div>
  );
};

export { QuickActions, QuickAction };
