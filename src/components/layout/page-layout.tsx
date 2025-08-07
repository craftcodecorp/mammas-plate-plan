import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/lib/use-language';
import { Breadcrumbs } from '../ui/breadcrumbs';
import SEOHead from '@/components/seo/seo-head';
import { SEOMetadata } from '@/lib/seo/seo-utils';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  className?: string;
  containerClassName?: string;
  breadcrumbsClassName?: string;
  seo?: SEOMetadata;
  structuredData?: string;
  header?: React.ReactNode;
}

/**
 * Page Layout component with breadcrumbs
 * 
 * This component provides a consistent layout for pages with optional breadcrumbs
 * that include proper schema.org structured data for SEO.
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showBreadcrumbs = true,
  className,
  containerClassName,
  breadcrumbsClassName,
  seo,
  structuredData,
  header,
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  
  // Base URL for canonical links and structured data
  const baseUrl = language === 'pt-BR' 
    ? 'https://mammas-plate-plan.netlify.app' 
    : 'https://mammas-plate-plan.netlify.app/en';
    
  // Generate canonical URL
  const canonical = `${baseUrl}${location.pathname}`;

  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      {/* SEO Head with metadata */}
      {seo && (
        <SEOHead
          {...seo}
          canonical={seo.canonical || canonical}
          structuredData={structuredData}
          additionalLinkTags={[
            ...(seo.additionalLinkTags || []),
            // Add hreflang tags for multi-language support
            {
              rel: 'alternate',
              href: `https://mammas-plate-plan.netlify.app${location.pathname}`,
              hrefLang: 'pt-BR'
            },
            {
              rel: 'alternate',
              href: `https://mammas-plate-plan.netlify.app/en${location.pathname}`,
              hrefLang: 'en'
            }
          ]}
        />
      )}
      
      {/* Header is rendered first */}
      {header}
      
      {/* Add padding to account for fixed header */}
      <div className="pt-20">  {/* This padding pushes content below the fixed header */}
        {/* Breadcrumbs are rendered after the header */}
        {showBreadcrumbs && (
          <div className={cn('container mx-auto px-4 py-4', breadcrumbsClassName)}>
            <Breadcrumbs 
              className="text-sm"
              baseUrl={baseUrl}
            />
          </div>
        )}
        
        <div className={cn('flex-grow', containerClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
