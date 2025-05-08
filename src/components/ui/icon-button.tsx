import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  tooltip?: string;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  tooltipAlign?: "start" | "center" | "end";
  active?: boolean;
  activeClassName?: string;
  badgeContent?: React.ReactNode;
  badgeClassName?: string;
}

const IconButton = ({
  icon,
  tooltip,
  tooltipSide = "bottom",
  tooltipAlign = "center",
  className,
  variant = "ghost",
  size = "icon",
  active = false,
  activeClassName = "bg-muted text-primary",
  badgeContent,
  badgeClassName,
  ...props
}: IconButtonProps) => {
  const button = (
    <Button
      variant={variant}
      size={size}
      className={cn("relative", active && activeClassName, className)}
      {...props}
    >
      {icon}
      {badgeContent && (
        <span
          className={cn(
            "absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground",
            badgeClassName,
          )}
        >
          {badgeContent}
        </span>
      )}
    </Button>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side={tooltipSide} align={tooltipAlign}>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
};

export { IconButton };
