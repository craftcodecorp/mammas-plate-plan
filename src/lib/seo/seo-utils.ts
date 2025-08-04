/**
 * SEO Utilities
 * 
 * This module provides functionality for optimizing the website for search engines.
 */

// Define the SEO metadata interface
export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    type?: 'website' | 'article' | 'product';
    url?: string;
    image?: string;
    siteName?: string;
    locale?: string;
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    creator?: string;
    image?: string;
  };
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  additionalLinkTags?: Array<{
    rel: string;
    href: string;
    sizes?: string;
    type?: string;
  }>;
}

/**
 * Generate structured data for a recipe
 * @param recipe - Recipe data
 * @returns JSON-LD structured data string
 */
export const generateRecipeStructuredData = (recipe: {
  name: string;
  description: string;
  image: string;
  prepTime: string; // ISO 8601 duration format (e.g., "PT15M")
  cookTime: string; // ISO 8601 duration format
  totalTime: string; // ISO 8601 duration format
  recipeYield: string;
  recipeIngredient: string[];
  recipeInstructions: string[];
  author: {
    name: string;
    url?: string;
  };
  datePublished: string; // ISO 8601 date format
}): string => {
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.description,
    image: recipe.image,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    totalTime: recipe.totalTime,
    recipeYield: recipe.recipeYield,
    recipeIngredient: recipe.recipeIngredient,
    recipeInstructions: recipe.recipeInstructions.map(step => ({
      '@type': 'HowToStep',
      text: step,
    })),
    author: {
      '@type': 'Person',
      name: recipe.author.name,
      url: recipe.author.url,
    },
    datePublished: recipe.datePublished,
  };
  
  return JSON.stringify(structuredData);
};

/**
 * Generate structured data for an organization
 * @param org - Organization data
 * @returns JSON-LD structured data string
 */
export const generateOrganizationStructuredData = (org: {
  name: string;
  url: string;
  logo: string;
  description?: string;
  sameAs?: string[];
}): string => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    logo: org.logo,
    description: org.description,
    sameAs: org.sameAs,
  };
  
  return JSON.stringify(structuredData);
};

/**
 * Generate a sitemap XML string
 * @param urls - Array of URL objects
 * @returns Sitemap XML string
 */
export const generateSitemap = (urls: Array<{
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}>): string => {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(item => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${item.url}</loc>\n`;
    
    if (item.lastModified) {
      sitemap += `    <lastmod>${item.lastModified}</lastmod>\n`;
    }
    
    if (item.changeFrequency) {
      sitemap += `    <changefreq>${item.changeFrequency}</changefreq>\n`;
    }
    
    if (item.priority !== undefined) {
      sitemap += `    <priority>${item.priority}</priority>\n`;
    }
    
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  return sitemap;
};

/**
 * Generate robots.txt content
 * @param rules - Array of rule objects
 * @param sitemapUrl - URL to the sitemap
 * @returns Robots.txt content string
 */
export const generateRobotsTxt = (
  rules: Array<{
    userAgent: string;
    allow?: string[];
    disallow?: string[];
  }>,
  sitemapUrl?: string
): string => {
  let robotsTxt = '';
  
  rules.forEach(rule => {
    robotsTxt += `User-agent: ${rule.userAgent}\n`;
    
    if (rule.allow) {
      rule.allow.forEach(path => {
        robotsTxt += `Allow: ${path}\n`;
      });
    }
    
    if (rule.disallow) {
      rule.disallow.forEach(path => {
        robotsTxt += `Disallow: ${path}\n`;
      });
    }
    
    robotsTxt += '\n';
  });
  
  if (sitemapUrl) {
    robotsTxt += `Sitemap: ${sitemapUrl}\n`;
  }
  
  return robotsTxt;
};
