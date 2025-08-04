import React from 'react';

/**
 * Skip to Content Link Component
 * 
 * This component provides a keyboard-accessible way to skip to the main content.
 */
export const SkipToContent: React.FC<{ contentId: string }> = ({ contentId }) => {
  return (
    <a
      href={`#${contentId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
    >
      Skip to content
    </a>
  );
};

export default SkipToContent;
