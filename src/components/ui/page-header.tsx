import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedContainer } from "@/components/ui/animated-container";

interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actionsClassName?: string;
  animated?: boolean;
}

const PageHeader = ({
  title,
  description,
  actions,
  breadcrumbs,
  className,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  animated = true,
}: PageHeaderProps) => {
  const content = (
    <div
      className={cn(
        "flex flex-col space-y-2 pb-4 pt-2 md:flex-row md:items-center md:justify-between md:space-y-0",
        className,
      )}
    >
      <div>
        {breadcrumbs && <div className="mb-1">{breadcrumbs}</div>}
        <h1 className={cn("text-3xl font-bold tracking-tight", titleClassName)}>
          {title}
        </h1>
        {description && (
          <p className={cn("mt-1 text-muted-foreground", descriptionClassName)}>
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div
          className={cn(
            "flex flex-col gap-2 sm:flex-row sm:items-center",
            actionsClassName,
          )}
        >
          {actions}
        </div>
      )}
    </div>
  );

  if (animated) {
    return (
      <AnimatedContainer animation="slide-down" duration={0.3}>
        {content}
      </AnimatedContainer>
    );
  }

  return content;
};

export { PageHeader };
