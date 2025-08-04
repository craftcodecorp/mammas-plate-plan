/**
 * Image utilities for the application
 * 
 * This file contains helper functions and constants related to images
 */

// Import existing images
import heroImageFamily from "../assets/hero-family-cooking.jpg";
// Using the family image for all hero slides since the other images are empty (0 bytes)

// Define image maps for different sections
export const heroImages = {
  // Using the family image for all hero slides until proper images are available
  mothers: heroImageFamily,
  special: heroImageFamily,
  professionals: heroImageFamily,
  family: heroImageFamily,
};

// Low-quality image placeholders (could be base64 encoded tiny images)
export const placeholders = {
  // Using the family image for all placeholders until proper images are available
  mothers: heroImageFamily,
  special: heroImageFamily,
  professionals: heroImageFamily,
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
