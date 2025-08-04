/**
 * Accessibility Utilities
 * 
 * This module provides functionality for improving accessibility
 * and ensuring WCAG compliance.
 */

// Define focus trap interface
export interface FocusTrapOptions {
  rootElement: HTMLElement;
  initialFocusElement?: HTMLElement;
  escapeDeactivates?: boolean;
  clickOutsideDeactivates?: boolean;
  returnFocusOnDeactivate?: boolean;
}

/**
 * Create a focus trap within a specified element
 * @param options - Focus trap configuration options
 * @returns Object with activate and deactivate methods
 */
export const createFocusTrap = (options: FocusTrapOptions) => {
  const {
    rootElement,
    initialFocusElement,
    escapeDeactivates = true,
    clickOutsideDeactivates = false,
    returnFocusOnDeactivate = true,
  } = options;
  
  // Get all focusable elements within the root element
  const getFocusableElements = (): HTMLElement[] => {
    const focusableSelectors = [
      'a[href]:not([tabindex="-1"])',
      'button:not([disabled]):not([tabindex="-1"])',
      'input:not([disabled]):not([tabindex="-1"])',
      'select:not([disabled]):not([tabindex="-1"])',
      'textarea:not([disabled]):not([tabindex="-1"])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]:not([tabindex="-1"])',
    ];
    
    const elements = rootElement.querySelectorAll(focusableSelectors.join(','));
    return Array.from(elements) as HTMLElement[];
  };
  
  // Store the element that had focus before activating the trap
  let previousActiveElement: HTMLElement | null = null;
  
  // Handle keydown events
  const handleKeyDown = (event: KeyboardEvent) => {
    // Handle escape key
    if (escapeDeactivates && event.key === 'Escape') {
      deactivate();
      return;
    }
    
    // Handle tab key to cycle through focusable elements
    if (event.key === 'Tab') {
      const focusableElements = getFocusableElements();
      
      if (focusableElements.length === 0) {
        return;
      }
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      // Shift + Tab: cycle backwards
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } 
      // Tab: cycle forwards
      else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }
  };
  
  // Handle click events outside the root element
  const handleClickOutside = (event: MouseEvent) => {
    if (clickOutsideDeactivates && !rootElement.contains(event.target as Node)) {
      deactivate();
    }
  };
  
  // Activate the focus trap
  const activate = () => {
    // Store the currently focused element
    previousActiveElement = document.activeElement as HTMLElement;
    
    // Set initial focus
    if (initialFocusElement) {
      initialFocusElement.focus();
    } else {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
    
    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    
    if (clickOutsideDeactivates) {
      document.addEventListener('click', handleClickOutside);
    }
  };
  
  // Deactivate the focus trap
  const deactivate = () => {
    // Remove event listeners
    document.removeEventListener('keydown', handleKeyDown);
    
    if (clickOutsideDeactivates) {
      document.removeEventListener('click', handleClickOutside);
    }
    
    // Return focus to the previously focused element
    if (returnFocusOnDeactivate && previousActiveElement) {
      previousActiveElement.focus();
    }
  };
  
  return {
    activate,
    deactivate,
  };
};

/**
 * Check if an element is visible to screen readers
 * @param element - The element to check
 * @returns Boolean indicating if the element is accessible to screen readers
 */
export const isScreenReaderAccessible = (element: HTMLElement): boolean => {
  const computedStyle = window.getComputedStyle(element);
  
  // Check if the element is visually hidden but still accessible to screen readers
  const isVisuallyHidden = 
    computedStyle.display === 'none' ||
    computedStyle.visibility === 'hidden' ||
    computedStyle.opacity === '0' ||
    (element.getAttribute('aria-hidden') === 'true');
  
  // Check if the element has accessible text
  const hasAccessibleText = 
    !!element.textContent?.trim() ||
    !!element.getAttribute('aria-label') ||
    !!element.getAttribute('aria-labelledby') ||
    !!element.getAttribute('title');
  
  return !isVisuallyHidden && hasAccessibleText;
};

/**
 * Generate an accessible announcement for screen readers
 * @param message - The message to announce
 * @param priority - The announcement priority
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  // Create or get the announcement element
  let announcementElement = document.getElementById('a11y-announcement');
  
  if (!announcementElement) {
    announcementElement = document.createElement('div');
    announcementElement.id = 'a11y-announcement';
    announcementElement.setAttribute('aria-live', priority);
    announcementElement.setAttribute('aria-atomic', 'true');
    announcementElement.style.position = 'absolute';
    announcementElement.style.width = '1px';
    announcementElement.style.height = '1px';
    announcementElement.style.padding = '0';
    announcementElement.style.overflow = 'hidden';
    announcementElement.style.clip = 'rect(0, 0, 0, 0)';
    announcementElement.style.whiteSpace = 'nowrap';
    announcementElement.style.border = '0';
    
    document.body.appendChild(announcementElement);
  }
  
  // Update the announcement element's content
  announcementElement.textContent = message;
};

/**
 * Check contrast ratio between foreground and background colors
 * @param foreground - Foreground color in hex format
 * @param background - Background color in hex format
 * @returns Contrast ratio (WCAG requires at least 4.5:1 for normal text)
 */
export const getContrastRatio = (foreground: string, background: string): number => {
  // Convert hex to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };
  
  // Calculate relative luminance
  const getLuminance = (color: { r: number; g: number; b: number }): number => {
    const { r, g, b } = color;
    const [rs, gs, bs] = [r / 255, g / 255, b / 255].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const foregroundRgb = hexToRgb(foreground);
  const backgroundRgb = hexToRgb(background);
  
  const foregroundLuminance = getLuminance(foregroundRgb);
  const backgroundLuminance = getLuminance(backgroundRgb);
  
  // Calculate contrast ratio
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  
  return (lighter + 0.05) / (darker + 0.05);
};
