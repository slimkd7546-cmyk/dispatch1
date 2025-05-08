import React, { useState, useEffect, memo } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholderColor?: string;
  loadingEffect?: 'fade' | 'blur' | 'none';
}

/**
 * A performance-optimized image component that:
 * - Lazy loads images when they enter the viewport
 * - Shows a placeholder while loading
 * - Supports smooth fade-in transitions
 * - Optimizes image loading with width/height attributes
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderColor = '#f3f4f6',
  loadingEffect = 'fade',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    // Use Intersection Observer to detect when image is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading when image is 200px from viewport
    );

    // Get current element to observe
    const element = document.getElementById(`lazy-img-${src.replace(/[^a-zA-Z0-9]/g, '-')}`);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
      observer.disconnect();
    };
  }, [src]);

  useEffect(() => {
    // Start loading image when in view
    if (isInView) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        // Handle error - could set a fallback image here
        console.error(`Failed to load image: ${src}`);
      };
    }
  }, [isInView, src]);

  // Generate unique ID for the image
  const imageId = `lazy-img-${src.replace(/[^a-zA-Z0-9]/g, '-')}`;

  // Determine the appropriate loading effect classes
  const getEffectClasses = () => {
    if (!isLoaded) return '';
    
    switch (loadingEffect) {
      case 'fade':
        return 'animate-fade-in';
      case 'blur':
        return 'animate-fade-in filter-none';
      default:
        return '';
    }
  };

  return (
    <div 
      id={imageId}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: placeholderColor,
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
      }}
    >
      {imgSrc && (
        <img
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover ${getEffectClasses()} ${loadingEffect === 'blur' && !isLoaded ? 'filter blur-sm' : ''}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      )}
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default memo(LazyImage);
