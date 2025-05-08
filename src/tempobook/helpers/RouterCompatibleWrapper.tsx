import React, { ReactNode } from "react";

interface RouterCompatibleWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * A simple wrapper component that prevents router context issues in storyboards
 * by isolating components from the router context.
 */
const RouterCompatibleWrapper = ({
  children,
  className = "",
}: RouterCompatibleWrapperProps) => {
  return <div className={className}>{children}</div>;
};

export default RouterCompatibleWrapper;
