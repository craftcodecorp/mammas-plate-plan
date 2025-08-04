import React from 'react';

/**
 * Accessible Icon Component
 * 
 * This component ensures icons have proper accessibility attributes.
 */
export const AccessibleIcon: React.FC<{
  icon: React.ReactNode;
  label: string;
  className?: string;
}> = ({ icon, label, className }) => (
  <span className={className} role="img" aria-label={label}>
    {icon}
  </span>
);

export default AccessibleIcon;
