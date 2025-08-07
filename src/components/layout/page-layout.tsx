import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/lib/use-language';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { generateBreadcrumbs } from '@/lib/seo/breadcrumb-utils';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  className?: string;
  containerClassName?: string;
  breadcrumbsClassName?: string;
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
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  
  // Generate breadcrumbs based on current path
  const breadcrumbs = generateBreadcrumbs(location.pathname, language);

  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      {showBreadcrumbs && (
        <div className={cn('container mx-auto px-4 py-4', breadcrumbsClassName)}>
          <Breadcrumbs 
            items={breadcrumbs} 
            className="text-sm"
            baseUrl={language === 'pt-BR' 
              ? 'https://mammas-plate-plan.netlify.app' 
              : 'https://mammas-plate-plan.netlify.app/en'}
          />
        </div>
      )}
      
      <div className={cn('flex-grow', containerClassName)}>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
