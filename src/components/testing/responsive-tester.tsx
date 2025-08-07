import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { detectBrowser, BrowserInfo } from '@/lib/compatibility/browser-detection';

// Define common device sizes for testing
const deviceSizes = [
  { name: 'Mobile S', width: 320, height: 568 },
  { name: 'Mobile M', width: 375, height: 667 },
  { name: 'Mobile L', width: 425, height: 812 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Laptop', width: 1024, height: 768 },
  { name: 'Laptop L', width: 1440, height: 900 },
  { name: 'Desktop', width: 1920, height: 1080 },
];

// Define orientation types
type Orientation = 'portrait' | 'landscape';

interface ResponsiveTesterProps {
  onlyInDevelopment?: boolean;
}

/**
 * Responsive Tester Component
 * 
 * This component provides tools for testing the application's
 * responsiveness across different device sizes.
 * Only shown in development mode by default.
 */
export const ResponsiveTester: React.FC<ResponsiveTesterProps> = ({
  onlyInDevelopment = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSize, setCurrentSize] = useState<{ width: number; height: number } | null>(null);
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  
  // Check if we're in development mode
  const isDevelopment = import.meta.env.MODE === 'development';
  
  // Get browser information and viewport size on mount
  useEffect(() => {
    const getInfo = async () => {
      try {
        const info = await detectBrowser();
        setBrowserInfo(info);
      } catch (error) {
        console.error('Error detecting browser:', error);
      }
    };
    
    getInfo();
    
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    // Initial update
    updateViewportSize();
    
    // Update on resize
    window.addEventListener('resize', updateViewportSize);
    
    return () => {
      window.removeEventListener('resize', updateViewportSize);
    };
  }, []);
  
  // Toggle visibility of the tester panel
  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };
  
  // Set the current test size
  const setTestSize = (width: number, height: number) => {
    setCurrentSize({ width, height });
    
    // Set orientation based on dimensions
    setOrientation(width > height ? 'landscape' : 'portrait');
    
    // Add a class to the document body for CSS targeting
    document.body.classList.add('responsive-testing');
    document.body.style.setProperty('--test-width', `${width}px`);
    document.body.style.setProperty('--test-height', `${height}px`);
  };
  
  // Reset to normal view
  const resetView = () => {
    setCurrentSize(null);
    document.body.classList.remove('responsive-testing');
    document.body.style.removeProperty('--test-width');
    document.body.style.removeProperty('--test-height');
  };
  
  // Toggle orientation
  const toggleOrientation = () => {
    if (!currentSize) return;
    
    const newOrientation: Orientation = orientation === 'portrait' ? 'landscape' : 'portrait';
    setOrientation(newOrientation);
    
    // Swap width and height
    setCurrentSize({
      width: currentSize.height,
      height: currentSize.width,
    });
    
    // Update CSS variables
    document.body.style.setProperty('--test-width', `${currentSize.height}px`);
    document.body.style.setProperty('--test-height', `${currentSize.width}px`);
  };
  
  // Don't render in production if onlyInDevelopment is true
  if (onlyInDevelopment && !isDevelopment) {
    return null; // Don't render anything in production
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleVisibility}
        className="bg-white shadow-md"
      >
        {isVisible ? 'Hide Tester' : 'Responsive Tester'}
      </Button>
      
      {isVisible && (
        <div className="mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 max-w-md">
          <h3 className="text-lg font-semibold mb-2">Responsive Testing</h3>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-1">Current Viewport</h4>
            <p className="text-sm">
              {viewportSize.width} × {viewportSize.height}px
            </p>
          </div>
          
          {browserInfo && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Browser Info</h4>
              <p className="text-sm">
                {browserInfo.name} {browserInfo.version}
                {browserInfo.isMobile ? ' (Mobile)' : browserInfo.isTablet ? ' (Tablet)' : ' (Desktop)'}
              </p>
            </div>
          )}
          
          {currentSize && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Testing Size</h4>
              <p className="text-sm">
                {currentSize.width} × {currentSize.height}px ({orientation})
              </p>
              <div className="mt-2 flex space-x-2">
                <Button size="sm" variant="outline" onClick={toggleOrientation}>
                  Rotate
                </Button>
                <Button size="sm" variant="outline" onClick={resetView}>
                  Reset
                </Button>
              </div>
            </div>
          )}
          
          <div className="mb-2">
            <h4 className="text-sm font-medium mb-1">Test Devices</h4>
            <div className="grid grid-cols-2 gap-2">
              {deviceSizes.map((device) => (
                <Button
                  key={device.name}
                  size="sm"
                  variant="outline"
                  onClick={() => setTestSize(device.width, device.height)}
                  className="text-xs"
                >
                  {device.name} ({device.width}×{device.height})
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <Button size="sm" variant="default" onClick={toggleVisibility}>
              Close
            </Button>
          </div>
        </div>
      )}
      
      {/* Add styles for responsive testing */}
      {isVisible && (
        <style>{`
          body.responsive-testing {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f0f0f0;
            height: 100vh;
            overflow: hidden;
          }
          
          body.responsive-testing #root {
            width: var(--test-width);
            height: var(--test-height);
            overflow: auto;
            border: 2px solid #333;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            background-color: white;
            transform-origin: center center;
          }
        `}</style>
      )}
    </div>
  );
};

export default ResponsiveTester;
