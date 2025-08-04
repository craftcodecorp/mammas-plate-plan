import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { ExperimentVariant, trackConversion, useABTest } from '@/lib/ab-testing';

interface ABTestCTAProps extends ButtonProps {
  experimentName: string;
  controlText: string;
  variantAText: string;
  variantBText: string;
  onClickEvent: string;
}

/**
 * A/B Test CTA Button Component
 * 
 * This component renders different button variants based on A/B test assignment
 * and tracks conversions when clicked.
 */
export const ABTestCTA: React.FC<ABTestCTAProps> = ({
  experimentName,
  controlText,
  variantAText,
  variantBText,
  onClickEvent,
  onClick,
  ...props
}) => {
  // Set up the A/B test
  const { variant, isLoaded } = useABTest({
    name: experimentName,
    variants: ['control', 'variant-a', 'variant-b'],
    defaultVariant: 'control',
  });

  // Determine which text to show based on the variant
  const getButtonText = (variant: ExperimentVariant): string => {
    switch (variant) {
      case 'variant-a':
        return variantAText;
      case 'variant-b':
        return variantBText;
      default:
        return controlText;
    }
  };

  // Handle the button click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the conversion
    trackConversion(experimentName, variant, onClickEvent);
    
    // Call the original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  // Show a loading state or the default text while the experiment is loading
  if (!isLoaded) {
    return <Button {...props} onClick={handleClick}>{controlText}</Button>;
  }

  return (
    <Button 
      {...props} 
      onClick={handleClick}
      data-test-variant={variant}
    >
      {getButtonText(variant)}
    </Button>
  );
};

export default ABTestCTA;
