/**
 * Web Vitals Monitoring Utility
 * 
 * This module provides functionality for measuring and reporting Core Web Vitals
 * metrics to improve website performance.
 */

import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';
// Note: FID is deprecated in web-vitals v5+, using INP instead

// Define the types for metric data
type MetricName = 'CLS' | 'INP' | 'LCP' | 'FCP' | 'TTFB';

interface MetricData {
  name: MetricName;
  value: number;
  id: string;
  navigationType?: string;
}

// Define the reporter function type
type ReportHandler = (metric: MetricData) => void;

/**
 * Report Web Vitals metrics to your analytics service
 * @param metric - The metric data to report
 */
const reportMetric = (metric: MetricData): void => {
  // Log the metric to console
  console.log(`Web Vital: ${metric.name}`, metric);
  
  // Send to Google Analytics if available
  if (window.gtag) {
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_name: metric.name,
      metric_value: metric.value,
      metric_id: metric.id,
      non_interaction: true,
    });
  }
};

/**
 * Initialize Web Vitals monitoring
 * @param reportHandler - Optional custom report handler
 */
export const initWebVitals = (reportHandler: ReportHandler = reportMetric): void => {
  // Measure Cumulative Layout Shift (CLS)
  onCLS(metric => {
    reportHandler({
      name: 'CLS',
      value: metric.value,
      id: metric.id,
    });
  });
  
  // Measure Interaction to Next Paint (INP) - replaces FID in web-vitals v5+
  onINP(metric => {
    reportHandler({
      name: 'INP',
      value: metric.value,
      id: metric.id,
    });
  });
  
  // Measure Largest Contentful Paint (LCP)
  onLCP(metric => {
    reportHandler({
      name: 'LCP',
      value: metric.value,
      id: metric.id,
    });
  });
  
  // Measure First Contentful Paint (FCP)
  onFCP(metric => {
    reportHandler({
      name: 'FCP',
      value: metric.value,
      id: metric.id,
    });
  });
  
  // Measure Time to First Byte (TTFB)
  onTTFB(metric => {
    reportHandler({
      name: 'TTFB',
      value: metric.value,
      id: metric.id,
    });
  });
  
  console.log('Web Vitals monitoring initialized');
};

/**
 * Get performance hints based on Web Vitals metrics
 * @param metrics - Object containing the latest metrics
 * @returns Array of performance improvement suggestions
 */
export const getPerformanceHints = (metrics: Record<MetricName, number>): string[] => {
  const hints: string[] = [];
  
  // Check Largest Contentful Paint (LCP)
  if (metrics.LCP > 2500) {
    hints.push('Improve LCP: Optimize image loading, use server-side rendering, or implement caching strategies.');
  }
  
  // Check Interaction to Next Paint (INP)
  if (metrics.INP > 200) {
    hints.push('Improve INP: Break up long tasks, optimize JavaScript execution, or defer non-critical JavaScript.');
  }
  
  // Check Cumulative Layout Shift (CLS)
  if (metrics.CLS > 0.1) {
    hints.push('Improve CLS: Set explicit dimensions for images and embeds, avoid inserting content above existing content.');
  }
  
  return hints;
};
