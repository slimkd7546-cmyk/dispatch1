import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatedContainer } from "@/components/ui/animated-container";

interface DataCardProps {
  title: React.ReactNode;
  value: React.ReactNode;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  animation?:
    | "fade"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "scale"
    | "none";
  delay?: number;
  onClick?: () => void;
}

const DataCard = ({
  title,
  value,
  icon,
  description,
  footer,
  trend,
  trendValue,
  className,
  iconClassName,
  valueClassName,
  animation = "fade",
  delay = 0,
  onClick,
}: DataCardProps) => {
  return (
    <AnimatedContainer animation={animation} delay={delay}>
      <Card
        className={cn(
          "overflow-hidden transition-all hover:shadow-md",
          onClick && "cursor-pointer hover:border-primary/50",
          className,
        )}
        onClick={onClick}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon && (
            <div className={cn("text-muted-foreground", iconClassName)}>
              {icon}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className={cn("text-2xl font-bold", valueClassName)}>
            {value}
          </div>
          {description && (
            <CardDescription className="mt-1">{description}</CardDescription>
          )}
          {trend && trendValue && (
            <div className="flex items-center mt-1 text-xs">
              <span
                className={cn(
                  "flex items-center",
                  trend === "up" && "text-green-500",
                  trend === "down" && "text-red-500",
                  trend === "neutral" && "text-muted-foreground",
                )}
              >
                {trend === "up" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3 h-3 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {trend === "down" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3 h-3 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-.916.369l-4.453-1.675a.75.75 0 01.526-1.406l3.094 1.161A19.422 19.422 0 007.596 7.47L3.29 11.77a.75.75 0 01-1.06 0l-1.01-1.009a.75.75 0 010-1.06l.999-.999z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {trend === "neutral" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3 h-3 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {trendValue}
              </span>
            </div>
          )}
        </CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </AnimatedContainer>
  );
};

export { DataCard };
