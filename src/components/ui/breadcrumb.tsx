import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItemProps {
  href?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  isCurrent?: boolean;
  className?: string;
}

const BreadcrumbItem = ({
  href,
  label,
  icon,
  isCurrent,
  className,
}: BreadcrumbItemProps) => {
  const content = (
    <div
      className={cn(
        "flex items-center text-sm",
        isCurrent
          ? "font-medium text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </div>
  );

  if (href && !isCurrent) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
};

interface BreadcrumbProps {
  items: BreadcrumbItemProps[];
  className?: string;
  separator?: React.ReactNode;
  homeHref?: string;
  showHomeIcon?: boolean;
}

const Breadcrumb = ({
  items,
  className,
  separator = <ChevronRight className="h-3 w-3 text-muted-foreground" />,
  homeHref = "/",
  showHomeIcon = true,
}: BreadcrumbProps) => {
  const allItems = showHomeIcon
    ? [
        {
          href: homeHref,
          label: "Home",
          icon: <Home className="h-3 w-3" />,
        },
        ...items,
      ]
    : items;

  return (
    <nav className={cn("flex items-center space-x-1", className)}>
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;

        return (
          <React.Fragment key={index}>
            <BreadcrumbItem {...item} isCurrent={isLast} />
            {!isLast && <span className="mx-1">{separator}</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export { Breadcrumb, BreadcrumbItem };
