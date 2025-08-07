import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "@/components/layout/page-layout";
import { useLanguage } from "@/lib/use-language";

const NotFound = () => {
  const location = useLocation();
  const { language, t } = useLanguage();
  
  // Base URL for canonical links
  const baseUrl = language === 'pt-BR' 
    ? 'https://cardapiofacil.online' 
    : 'https://cardapiofacil.online/en';
    
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLayout
      showBreadcrumbs={false}
      seo={{
        title: t('seo.notfound.title'),
        description: t('seo.notfound.description'),
        canonical: `${baseUrl}/404`,
        openGraph: {
          title: t('seo.notfound.title'),
          description: t('seo.notfound.description'),
          type: 'website',
          url: `${baseUrl}/404`,
        },
        additionalMetaTags: [
          { name: 'robots', content: 'noindex, nofollow' }
        ]
      }}
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('notfound.error')}</h1>
          <p className="text-xl text-gray-600 mb-4">{t('notfound.message')}</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            {t('notfound.return')}
          </a>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
