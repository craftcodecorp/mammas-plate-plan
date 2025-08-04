/**
 * Browser Detection and Compatibility Utility
 * 
 * This module provides functionality for detecting browser capabilities
 * and providing appropriate fallbacks.
 */

// Browser detection interface
export interface BrowserInfo {
  name: string;
  version: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  supportsWebP: boolean;
  supportsIntersectionObserver: boolean;
  supportsLocalStorage: boolean;
  supportsFetch: boolean;
  supportsGrid: boolean;
  supportsFlexbox: boolean;
  supportsES6: boolean;
}

/**
 * Detect browser information and capabilities
 * @returns Browser information object
 */
export const detectBrowser = async (): Promise<BrowserInfo> => {
  // Get user agent
  const userAgent = navigator.userAgent;
  
  // Detect browser name and version
  let name = 'Unknown';
  let version = 'Unknown';
  
  if (userAgent.indexOf('Firefox') > -1) {
    name = 'Firefox';
    version = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
  } else if (userAgent.indexOf('Edge') > -1 || userAgent.indexOf('Edg/') > -1) {
    name = 'Edge';
    version = userAgent.match(/Edge\/([0-9.]+)/)?.[1] || 
              userAgent.match(/Edg\/([0-9.]+)/)?.[1] || 'Unknown';
  } else if (userAgent.indexOf('Chrome') > -1) {
    name = 'Chrome';
    version = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
  } else if (userAgent.indexOf('Safari') > -1) {
    name = 'Safari';
    version = userAgent.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
  } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
    name = 'Internet Explorer';
    version = userAgent.match(/MSIE ([0-9.]+)/)?.[1] || 'Unknown';
  }
  
  // Detect device type
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);
  const isDesktop = !isMobile || isTablet;
  
  // Check WebP support
  const supportsWebP = await checkWebPSupport();
  
  // Check feature support
  const supportsIntersectionObserver = 'IntersectionObserver' in window;
  const supportsLocalStorage = checkLocalStorageSupport();
  const supportsFetch = 'fetch' in window;
  const supportsGrid = checkCSSSupport('grid');
  const supportsFlexbox = checkCSSSupport('flex');
  const supportsES6 = checkES6Support();
  
  return {
    name,
    version,
    isMobile,
    isTablet,
    isDesktop,
    supportsWebP,
    supportsIntersectionObserver,
    supportsLocalStorage,
    supportsFetch,
    supportsGrid,
    supportsFlexbox,
    supportsES6,
  };
};

/**
 * Check if WebP image format is supported
 * @returns Promise resolving to boolean indicating WebP support
 */
const checkWebPSupport = async (): Promise<boolean> => {
  if (!createImageBitmap) return false;
  
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  
  try {
    return createImageBitmap(blob).then(() => true, () => false);
  } catch (e) {
    return false;
  }
};

/**
 * Check if localStorage is supported and available
 * @returns Boolean indicating localStorage support
 */
const checkLocalStorageSupport = (): boolean => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Check if a CSS feature is supported
 * @param property - CSS property to check
 * @returns Boolean indicating CSS feature support
 */
const checkCSSSupport = (property: string): boolean => {
  try {
    return property in document.documentElement.style;
  } catch (e) {
    return false;
  }
};

/**
 * Check if ES6 features are supported
 * @returns Boolean indicating ES6 support
 */
const checkES6Support = (): boolean => {
  try {
    // Test arrow functions
    eval('() => {}');
    // Test let/const
    eval('let a = 1; const b = 2;');
    // Test template literals
    eval('`test`');
    // Test destructuring
    eval('const {a, b} = {a: 1, b: 2}');
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Get appropriate image format based on browser support
 * @param webpPath - Path to WebP image
 * @param fallbackPath - Path to fallback image (e.g., JPEG or PNG)
 * @returns The appropriate image path
 */
export const getCompatibleImagePath = (webpPath: string, fallbackPath: string): string => {
  // Check for WebP support in localStorage (cached from previous check)
  const webpSupport = localStorage.getItem('supports_webp');
  
  if (webpSupport === 'true') {
    return webpPath;
  } else if (webpSupport === 'false') {
    return fallbackPath;
  } else {
    // If not cached, use fallback for now and update asynchronously
    checkWebPSupport().then(supported => {
      localStorage.setItem('supports_webp', supported.toString());
    });
    return fallbackPath;
  }
};

/**
 * Provide a polyfill for a feature if needed
 * @param feature - Feature to check
 * @param polyfillUrl - URL to the polyfill script
 * @returns Promise that resolves when the polyfill is loaded (if needed)
 */
export const loadPolyfillIfNeeded = async (
  feature: keyof BrowserInfo,
  polyfillUrl: string
): Promise<void> => {
  const browserInfo = await detectBrowser();
  
  if (!browserInfo[feature]) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = polyfillUrl;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load polyfill: ${polyfillUrl}`));
      document.head.appendChild(script);
    });
  }
};
