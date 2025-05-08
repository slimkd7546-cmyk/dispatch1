import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  iconContainerClassName?: string;
}

const ActionCard = ({
  icon,
  title,
  description,
  onClick,
  className,
  iconClassName,
  iconContainerClassName,
}: ActionCardProps) => {
  return (
    <Card
      className={cn(
        "hover:bg-accent/50 cursor-pointer transition-colors",
        className,
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <div
            className={cn(
              "p-2 rounded-full bg-primary/10",
              iconContainerClassName,
            )}
          >
            <div className={cn("h-6 w-6 text-primary", iconClassName)}>
              {icon}
            </div>
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ActionCard };
