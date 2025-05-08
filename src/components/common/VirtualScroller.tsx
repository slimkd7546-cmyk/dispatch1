import React, { useState, useEffect, useRef, ReactNode, memo } from 'react';

interface VirtualScrollerProps {
  items: any[];
  height: number;
  itemHeight: number;
  renderItem: (item: any, index: number) => ReactNode;
  overscan?: number;
  className?: string;
  onEndReached?: () => void;
  endReachedThreshold?: number;
}

/**
 * A virtualized scroller component that only renders items visible in the viewport
 * Significantly improves performance for long lists
 */
const VirtualScroller: React.FC<VirtualScrollerProps> = ({
  items,
  height,
  itemHeight,
  renderItem,
  overscan = 5,
  className = '',
  onEndReached,
  endReachedThreshold = 200,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalHeight = items.length * itemHeight;

  // Calculate which items should be visible
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + height) / itemHeight) + overscan
  );

  // Handle scroll events
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    setScrollTop(scrollTop);

    // Check if we've scrolled near the end
    if (
      onEndReached &&
      scrollHeight - scrollTop - clientHeight < endReachedThreshold
    ) {
      onEndReached();
    }
  };

  // Optimize by using requestAnimationFrame for scroll handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    const handleRealScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollTop(container.scrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('scroll', handleRealScroll);
    return () => container.removeEventListener('scroll', handleRealScroll);
  }, []);

  // Visible items to render
  const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => {
    const actualIndex = startIndex + index;
    return (
      <div
        key={actualIndex}
        style={{
          position: 'absolute',
          top: actualIndex * itemHeight,
          height: itemHeight,
          left: 0,
          right: 0,
        }}
        className="transition-opacity duration-200"
      >
        {renderItem(item, actualIndex)}
      </div>
    );
  });

  return (
    <div
      ref={containerRef}
      className={`relative overflow-auto ${className}`}
      style={{ height, width: '100%' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems}
      </div>
    </div>
  );
};

export default memo(VirtualScroller);
