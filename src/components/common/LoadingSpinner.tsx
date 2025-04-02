import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

const LoadingSpinner = ({
  size = "medium",
  color = "text-teal-600",
}: LoadingSpinnerProps) => {
  const sizeClass =
    size === "small" ? "w-4 h-4" : size === "medium" ? "w-8 h-8" : "w-12 h-12";

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClass} ${color} animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
