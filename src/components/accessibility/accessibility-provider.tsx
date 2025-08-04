import React, { createContext, useContext, useEffect, useState } from 'react';
import { announceToScreenReader } from '@/lib/accessibility/a11y-utils';

// Define context type
interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: 'normal' | 'large' | 'x-large';
  setFontSize: (size: 'normal' | 'large' | 'x-large') => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
}

// Create context with default values
const AccessibilityContext = createContext<AccessibilityContextType>({
  highContrast: false,
  toggleHighContrast: () => {},
  fontSize: 'normal',
  setFontSize: () => {},
  reduceMotion: false,
  toggleReduceMotion: () => {},
  announce: () => {},
});

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

/**
 * Accessibility Provider Component
 * 
 * This component manages accessibility features throughout the application
 * to ensure WCAG compliance.
 */
export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  // Initialize state from localStorage if available
  const [highContrast, setHighContrast] = useState(() => {
    const saved = localStorage.getItem('a11y_high_contrast');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [fontSize, setFontSizeState] = useState<'normal' | 'large' | 'x-large'>(() => {
    const saved = localStorage.getItem('a11y_font_size');
    return saved ? JSON.parse(saved) : 'normal';
  });
  
  const [reduceMotion, setReduceMotion] = useState(() => {
    const saved = localStorage.getItem('a11y_reduce_motion');
    // Also check user's system preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return saved ? JSON.parse(saved) : prefersReducedMotion;
  });
  
  // Toggle high contrast mode
  const toggleHighContrast = () => {
    setHighContrast(prev => {
      const newValue = !prev;
      localStorage.setItem('a11y_high_contrast', JSON.stringify(newValue));
      return newValue;
    });
  };
  
  // Set font size
  const setFontSize = (size: 'normal' | 'large' | 'x-large') => {
    setFontSizeState(size);
    localStorage.setItem('a11y_font_size', JSON.stringify(size));
  };
  
  // Toggle reduced motion
  const toggleReduceMotion = () => {
    setReduceMotion(prev => {
      const newValue = !prev;
      localStorage.setItem('a11y_reduce_motion', JSON.stringify(newValue));
      return newValue;
    });
  };
  
  // Announce messages to screen readers
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announceToScreenReader(message, priority);
  };
  
  // Apply accessibility settings to the document
  useEffect(() => {
    // Apply high contrast mode
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Apply font size
    document.documentElement.classList.remove('font-size-normal', 'font-size-large', 'font-size-x-large');
    document.documentElement.classList.add(`font-size-${fontSize}`);
    
    // Apply reduced motion
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [highContrast, fontSize, reduceMotion]);
  
  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if the user hasn't explicitly set a preference
      if (localStorage.getItem('a11y_reduce_motion') === null) {
        setReduceMotion(e.matches);
      }
    };
    
    // Add event listener (with compatibility check)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // For older browsers
      mediaQuery.addListener(handleChange);
    }
    
    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // For older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        fontSize,
        setFontSize,
        reduceMotion,
        toggleReduceMotion,
        announce,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

/**
 * Custom hook to use accessibility context
 */
export const useAccessibility = () => useContext(AccessibilityContext);

// Components moved to their own files for better code organization and to fix fast refresh issues
export { AccessibleIcon } from './accessible-icon';
export { SkipToContent } from './skip-to-content';
