import React from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Minus } from "lucide-react";

interface StatTrendProps {
  value: string | number;
  trend: "up" | "down" | "neutral";
  className?: string;
  showIcon?: boolean;
  iconSize?: number;
  iconClassName?: string;
  textClassName?: string;
}

const StatTrend = ({
  value,
  trend,
  className,
  showIcon = true,
  iconSize = 14,
  iconClassName,
  textClassName,
}: StatTrendProps) => {
  return (
    <div
      className={cn(
        "flex items-center text-xs",
        trend === "up" && "text-green-500",
        trend === "down" && "text-red-500",
        trend === "neutral" && "text-muted-foreground",
        className,
      )}
    >
      {showIcon && (
        <span className={cn("mr-1", iconClassName)}>
          {trend === "up" && <ChevronUp size={iconSize} />}
          {trend === "down" && <ChevronDown size={iconSize} />}
          {trend === "neutral" && <Minus size={iconSize} />}
        </span>
      )}
      <span className={cn(textClassName)}>{value}</span>
    </div>
  );
};

export { StatTrend };
