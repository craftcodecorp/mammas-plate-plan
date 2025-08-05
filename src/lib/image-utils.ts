/**
 * Image utilities for the application
 * 
 * This file contains helper functions and constants related to images
 */

// Import optimized images for different screen sizes
// Mothers meal planning
import mothersWeb from "../assets/hero-images/optimized/mothers-meal-planning-web.jpg";
import mothersTablet from "../assets/hero-images/optimized/mothers-meal-planning-tablet.jpg";
import mothersMobile from "../assets/hero-images/optimized/mothers-meal-planning-mobile.jpg";
import mothersSmall from "../assets/hero-images/optimized/mothers-meal-planning-small.jpg";

// Special dietary meal planning
import specialWeb from "../assets/hero-images/optimized/special-dietary-web.jpg";
import specialTablet from "../assets/hero-images/optimized/special-dietary-tablet.jpg";
import specialMobile from "../assets/hero-images/optimized/special-dietary-mobile.jpg";
import specialSmall from "../assets/hero-images/optimized/special-dietary-small.jpg";

// Busy professionals meal planning
import professionalsWeb from "../assets/hero-images/optimized/busy-professionals-web.jpg";
import professionalsTablet from "../assets/hero-images/optimized/busy-professionals-tablet.jpg";
import professionalsMobile from "../assets/hero-images/optimized/busy-professionals-mobile.jpg";
import professionalsSmall from "../assets/hero-images/optimized/busy-professionals-small.jpg";

// Family cooking (keeping original for now)
import heroImageFamily from "../assets/hero-family-cooking.jpg";

// Define responsive image sets for different sections
export interface ResponsiveImageSet {
  web: string;
  tablet: string;
  mobile: string;
  small: string;
}

export const heroImages: Record<string, ResponsiveImageSet> = {
  mothers: {
    web: mothersWeb,
    tablet: mothersTablet,
    mobile: mothersMobile,
    small: mothersSmall,
  },
  special: {
    web: specialWeb,
    tablet: specialTablet,
    mobile: specialMobile,
    small: specialSmall,
  },
  professionals: {
    web: professionalsWeb,
    tablet: professionalsTablet,
    mobile: professionalsMobile,
    small: professionalsSmall,
  },
  family: {
    web: heroImageFamily,
    tablet: heroImageFamily,
    mobile: heroImageFamily,
    small: heroImageFamily,
  },
};

// Low-quality image placeholders
export const placeholders = {
  mothers: mothersSmall,
  special: specialSmall,
  professionals: professionalsSmall,
  family: heroImageFamily,
};

/**
 * Generate image dimensions based on aspect ratio
 * @param width - The desired width
 * @param aspectRatio - The aspect ratio (width/height)
 * @returns The calculated dimensions
 */
export const getImageDimensions = (width: number, aspectRatio: number = 16/9) => {
  const height = Math.round(width / aspectRatio);
  return { width, height };
};

/**
 * Generate a color placeholder for images
 * @param width - The width of the placeholder
 * @param height - The height of the placeholder
 * @param color - The background color (hex code)
 * @returns A data URL for the placeholder
 */
export const generateColorPlaceholder = (width: number, height: number, color: string = '#f0f0f0'): string => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='${color.replace('#', '%23')}' /%3E%3C/svg%3E`;
};
