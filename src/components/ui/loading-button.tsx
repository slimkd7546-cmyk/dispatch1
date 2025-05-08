import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  spinner?: React.ReactNode;
}

const LoadingButton = ({
  children,
  isLoading = false,
  loadingText,
  spinner,
  disabled,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      className={cn(className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <>
          {spinner || <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loadingText || children}
        </>
      )}
      {!isLoading && children}
    </Button>
  );
};

export { LoadingButton };
