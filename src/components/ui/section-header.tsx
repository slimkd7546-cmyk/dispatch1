import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actionClassName?: string;
}

const SectionHeader = ({
  title,
  description,
  action,
  className,
  titleClassName,
  descriptionClassName,
  actionClassName,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1 pb-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0",
        className,
      )}
    >
      <div>
        <h2
          className={cn("text-xl font-semibold tracking-tight", titleClassName)}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "text-sm text-muted-foreground",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className={cn("flex items-center", actionClassName)}>{action}</div>
      )}
    </div>
  );
};

export { SectionHeader };
