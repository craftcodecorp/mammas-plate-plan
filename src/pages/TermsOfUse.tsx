import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLayout from "@/components/layout/page-layout";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/use-language";

const TermsOfUse = () => {
  const location = useLocation();
  const { language, t } = useLanguage();
  
  // Base URL for canonical links
  const baseUrl = language === 'pt-BR' 
    ? 'https://cardapiofacil.online' 
    : 'https://cardapiofacil.online/en';
    
  // Generate canonical URL
  const canonical = `${baseUrl}${location.pathname}`;
  
  return (
    <PageLayout
      showBreadcrumbs={true}
      header={<Header />}
      seo={{
        title: t('seo.terms.title'),
        description: t('seo.terms.description'),
        canonical,
        openGraph: {
          title: t('seo.terms.title'),
          description: t('seo.terms.description'),
          type: 'website',
          url: canonical,
          image: `${baseUrl}/og-image.jpg`,
          siteName: "Cardápio Fácil"
        },
        additionalMetaTags: [
          { name: 'keywords', content: t('terms.keywords') }
        ]
      }}
    >
      <div className="min-h-screen bg-background">
        
        <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('terms.title')}</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              {t('terms.lastUpdated')} {new Date().toLocaleDateString(language === 'pt-BR' ? 'pt-BR' : 'en-US')}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.section1.title')}</h2>
              <p>
                {t('terms.section1.content')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.section2.title')}</h2>
              <p>
                {t('terms.section2.content')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.section3.title')}</h2>
              <p>
                {t('terms.section3.content')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.section4.title')}</h2>
              <p>
                {t('terms.section4.content')}
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>{t('terms.section4.item1')}</li>
                <li>{t('terms.section4.item2')}</li>
                <li>{t('terms.section4.item3')}</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.section5.title')}</h2>
              <p>
                {t('terms.section5.content')}
              </p>
              <p className="mt-2">
                {t('terms.section5.content2')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.section6.title')}</h2>
              <p>
                {t('terms.section6.content')}
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>{t('terms.section6.item1')}</li>
                <li>{t('terms.section6.item2')}</li>
                <li>{t('terms.section6.item3')}</li>
                <li>{t('terms.section6.item4')}</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.section7.title')}</h2>
              <p>
                {t('terms.section7.content1')}
              </p>
              <p className="mt-2">
                {t('terms.section7.content2')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.section8.title')}</h2>
              <p>
                {t('terms.section8.content')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.section9.title')}</h2>
              <p>
                {t('terms.section9.content')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.section10.title')}</h2>
              <p>
                {t('terms.section10.content')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.section11.title')}</h2>
              <p>
                {t('terms.section11.content')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('terms.section12.title')}</h2>
              <p>
                {t('terms.section12.content')}
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
    </PageLayout>
  );
};

export default TermsOfUse;
