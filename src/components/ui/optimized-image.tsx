import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholderSrc?: string;
  wrapperClassName?: string;
  effect?: 'blur' | 'black-and-white' | 'opacity';
}

/**
 * OptimizedImage component for lazy loading images with blur effect
 * 
 * This component uses react-lazy-load-image-component to optimize image loading
 * and provide a better user experience with placeholder effects.
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderSrc,
  wrapperClassName = '',
  effect = 'blur'
}) => {
  return (
    <LazyLoadImage
      alt={alt}
      src={src}
      width={width}
      height={height}
      effect={effect}
      placeholderSrc={placeholderSrc}
      wrapperClassName={wrapperClassName}
      className={className}
      threshold={0.3} // Start loading when 30% of the image is in the viewport
    />
  );
};

export default OptimizedImage;
