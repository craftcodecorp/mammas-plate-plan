/**
 * Breadcrumb Utilities
 * 
 * This module provides functionality for generating breadcrumbs with proper SEO structured data.
 */

export interface BreadcrumbItem {
  label: string;
  path: string;
  isCurrentPage?: boolean;
}

interface RouteConfig {
  path: string;
  breadcrumbLabel: string;
  parent?: string;
}

// Define the routes and their breadcrumb configurations
const routeConfigs: RouteConfig[] = [
  { path: '/', breadcrumbLabel: 'Home' },
  { path: '/privacy-policy', breadcrumbLabel: 'Política de Privacidade', parent: '/' },
  { path: '/terms-of-use', breadcrumbLabel: 'Termos de Uso', parent: '/' },
  { path: '/thank-you', breadcrumbLabel: 'Obrigado', parent: '/' },
];

/**
 * Get the breadcrumb label for a given path
 */
const getBreadcrumbLabel = (path: string): string => {
  const route = routeConfigs.find(route => route.path === path);
  return route?.breadcrumbLabel || path;
};

/**
 * Get the parent path for a given path
 */
const getParentPath = (path: string): string | undefined => {
  const route = routeConfigs.find(route => route.path === path);
  return route?.parent;
};

/**
 * Generate breadcrumb items for a given path
 */
export const generateBreadcrumbs = (currentPath: string, language = 'pt-BR'): BreadcrumbItem[] => {
  // Start with the current page
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // Add the current page
  let path = currentPath;
  while (path) {
    const label = getBreadcrumbLabel(path);
    breadcrumbs.unshift({
      label,
      path,
      isCurrentPage: path === currentPath,
    });
    
    // Get the parent path
    path = getParentPath(path) || '';
  }
  
  return breadcrumbs;
};

/**
 * Generate structured data for breadcrumbs
 */
export const generateBreadcrumbStructuredData = (items: BreadcrumbItem[], baseUrl: string): string => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': `${baseUrl}${item.path}`,
    })),
  };
  
  return JSON.stringify(structuredData);
};
