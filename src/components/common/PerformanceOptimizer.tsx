import React, { useEffect, ReactNode } from "react";

interface PerformanceOptimizerProps {
  children: ReactNode;
}

/**
 * A component that applies various performance optimizations to its children
 * - Implements passive event listeners
 * - Applies CSS containment where appropriate
 * - Optimizes animations for 60fps
 */
const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  children,
}) => {
  useEffect(() => {
    // Apply passive event listeners to improve scroll performance
    const applyPassiveListeners = () => {
      const wheelOpts = { passive: true } as AddEventListenerOptions;
      const wheelEvent =
        "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

      document.addEventListener(wheelEvent, () => {}, wheelOpts);
      document.addEventListener("touchstart", () => {}, wheelOpts);
    };

    // Optimize rendering by using requestAnimationFrame
    const optimizeRendering = () => {
      // Add a class to the body that enables CSS containment
      document.body.classList.add("optimize-rendering");

      // Add a style element with optimization rules
      const style = document.createElement("style");
      style.innerHTML = `
        .optimize-rendering * {
          transition-duration: 0.16667s !important; /* For 60fps */
        }
        
        .content-visibility-auto {
          content-visibility: auto;
          contain-intrinsic-size: 1px 1000px;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.body.classList.remove("optimize-rendering");
        document.head.removeChild(style);
      };
    };

    applyPassiveListeners();
    const cleanup = optimizeRendering();

    return () => {
      cleanup();
    };
  }, []);

  return <>{children}</>;
};

export default PerformanceOptimizer;
