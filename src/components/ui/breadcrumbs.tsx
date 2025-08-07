import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import { generateBreadcrumbs, generateBreadcrumbStructuredData } from '@/lib/seo/breadcrumb-utils';
import { 
  Breadcrumb, 
  BreadcrumbItem as BreadcrumbItemUI, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { useLanguage } from '@/lib/use-language';

interface BreadcrumbsProps {
  className?: string;
  showHomeIcon?: boolean;
  separator?: React.ReactNode;
  baseUrl?: string;
}

/**
 * SEO-friendly Breadcrumbs component
 * 
 * This component renders breadcrumbs with proper schema.org structured data for SEO.
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  className,
  showHomeIcon = true,
  separator,
  baseUrl = 'https://cardapiofacil.online',
}) => {
  const location = useLocation();
  const { language, t } = useLanguage();
  const breadcrumbs = generateBreadcrumbs(location.pathname, language);
  const structuredData = generateBreadcrumbStructuredData(breadcrumbs, baseUrl);

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs on the home page
  }

  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      
      {/* Breadcrumb UI */}
      <Breadcrumb className={className}>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={item.path}>
              {index > 0 && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
              <BreadcrumbItemUI>
                {item.isCurrentPage ? (
                  <BreadcrumbPage>
                    {index === 0 && showHomeIcon ? <Home className="h-4 w-4 mr-1" /> : null}
                    {t(item.label)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.path} className="flex items-center">
                      {index === 0 && showHomeIcon ? <Home className="h-4 w-4 mr-1" /> : null}
                      {t(item.label)}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItemUI>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default Breadcrumbs;
