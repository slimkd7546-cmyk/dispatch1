import React from "react";
import { cn } from "@/lib/utils";

interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
}

const Shimmer = ({
  width,
  height,
  rounded = "md",
  className,
  ...props
}: ShimmerProps) => {
  const roundedMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted/60 dark:bg-muted/30",
        roundedMap[rounded],
        className,
      )}
      style={{
        width: width,
        height: height,
      }}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-shimmer" />
    </div>
  );
};

export { Shimmer };
