# A/B Testing Guide

This document explains how to use the A/B testing functionality in the Mamma's Plate Plan application.

## Table of Contents

1. [Overview](#overview)
2. [Configuration](#configuration)
3. [Basic Usage](#basic-usage)
4. [Advanced Usage](#advanced-usage)
5. [Tracking Conversions](#tracking-conversions)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

## Overview

A/B testing (also known as split testing) is a method of comparing two or more versions of a UI element or feature to determine which one performs better. Our implementation supports:

- Multiple experiment variants
- User-consistent variant assignment
- Conversion tracking
- Integration with Amplitude for advanced analytics (optional)
- Local fallback when external services are unavailable

## Configuration

### Environment Variables

The A/B testing functionality uses the following environment variables:

```
# A/B Testing
VITE_AMPLITUDE_API_KEY=your-amplitude-api-key
VITE_EXPERIMENT_API_KEY=your-experiment-api-key
```

These variables should be set in your `.env` file. If not provided, the system will fall back to a local implementation.

### Amplitude Integration

If you want to use Amplitude for A/B testing:

1. Create an account at [Amplitude](https://amplitude.com/)
2. Create a project and get your API key
3. Set the `VITE_AMPLITUDE_API_KEY` in your `.env` file
4. Set the `VITE_EXPERIMENT_API_KEY` for experiment configuration

## Basic Usage

### Running an Experiment

To run an A/B test in a component:

```tsx
import { useAnalytics } from '@/components/monitoring/use-analytics';

function MyComponent() {
  const { getExperimentVariant } = useAnalytics();
  
  // Define experiment configuration
  const experimentConfig = {
    id: 'button-color',
    name: 'Button Color Test',
    variants: ['blue', 'green', 'red'],
    defaultVariant: 'blue'
  };
  
  // Get the variant for this user
  const experiment = getExperimentVariant(
    experimentConfig.id,
    undefined, // Optional user ID
    experimentConfig
  );
  
  // Use the variant in your component
  return (
    <button style={{ backgroundColor: experiment.variant }}>
      Click Me
    </button>
  );
}
```

### Experiment Result

The `getExperimentVariant` function returns an `ExperimentResult` object with the following properties:

```typescript
interface ExperimentResult {
  variant: string;        // The assigned variant
  experimentId: string;   // The experiment ID
  experimentName: string; // The experiment name
  isDefault: boolean;     // Whether this is the default variant
}
```

## Advanced Usage

### User-Consistent Variants

To ensure a user always sees the same variant:

```tsx
function MyComponent() {
  const { getExperimentVariant } = useAnalytics();
  const { user } = useAuth(); // Your auth hook
  
  const experiment = getExperimentVariant(
    'pricing-model',
    user?.id, // Pass user ID for consistent assignment
    {
      id: 'pricing-model',
      name: 'Pricing Model Test',
      variants: ['monthly', 'annual', 'lifetime'],
      defaultVariant: 'monthly'
    }
  );
  
  // Use experiment.variant to determine which pricing model to show
}
```

### Multiple Experiments

You can run multiple experiments in the same component:

```tsx
function MyComponent() {
  const { getExperimentVariant } = useAnalytics();
  
  const colorExperiment = getExperimentVariant('button-color', userId, {
    id: 'button-color',
    name: 'Button Color Test',
    variants: ['blue', 'green', 'red'],
    defaultVariant: 'blue'
  });
  
  const textExperiment = getExperimentVariant('button-text', userId, {
    id: 'button-text',
    name: 'Button Text Test',
    variants: ['Buy Now', 'Get Started', 'Learn More'],
    defaultVariant: 'Buy Now'
  });
  
  return (
    <button style={{ backgroundColor: colorExperiment.variant }}>
      {textExperiment.variant}
    </button>
  );
}
```

## Tracking Conversions

To track when a user completes a desired action after seeing an experiment variant:

```tsx
function ProductCard() {
  const { getExperimentVariant, trackExperimentConversion } = useAnalytics();
  
  const experiment = getExperimentVariant('product-layout', userId, {
    id: 'product-layout',
    name: 'Product Card Layout',
    variants: ['compact', 'detailed'],
    defaultVariant: 'compact'
  });
  
  const handleAddToCart = () => {
    // Track the conversion for this experiment
    trackExperimentConversion(
      'product-layout',
      'add_to_cart',
      { productId: '123', price: 19.99 }
    );
    
    // Your add to cart logic
    addToCart(product);
  };
  
  return (
    <div className={`product-card ${experiment.variant}`}>
      {/* Product details */}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
```

## Best Practices

1. **Limit active experiments**: Run only a few experiments at a time to avoid confusing results
2. **Define clear success metrics**: Know what conversion you're tracking before starting
3. **Use meaningful variant names**: Choose descriptive names that make analysis easier
4. **Test significant changes**: Small tweaks often don't yield meaningful results
5. **Run tests long enough**: Allow sufficient time to gather statistically significant data
6. **Segment your users**: Consider analyzing results by user segments (new vs. returning, etc.)

## Troubleshooting

### Experiment Not Working

If your experiment isn't working as expected:

1. Check that environment variables are properly set
2. Verify that the experiment ID is consistent between variant assignment and conversion tracking
3. Look for console errors related to Amplitude initialization
4. Try using the local fallback implementation by removing the Amplitude API keys

### Inconsistent Variants

If users are seeing inconsistent variants:

1. Ensure you're passing a consistent user ID
2. Check that the experiment configuration isn't changing between renders
3. Verify that the experiment ID remains the same

### Missing Conversion Data

If conversion data isn't appearing in Amplitude:

1. Check that Amplitude is properly initialized
2. Verify that the experiment ID in `trackExperimentConversion` matches the one used in `getExperimentVariant`
3. Ensure the conversion event name is consistent across tracking calls
