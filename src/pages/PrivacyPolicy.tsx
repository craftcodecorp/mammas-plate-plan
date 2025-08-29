import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLayout from "@/components/layout/page-layout";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/use-language";

const PrivacyPolicy = () => {
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
        title: t('seo.privacy.title'),
        description: t('seo.privacy.description'),
        canonical,
        openGraph: {
          title: t('seo.privacy.title'),
          description: t('seo.privacy.description'),
          type: 'website',
          url: canonical,
          image: `${baseUrl}/og-image.jpg`,
          siteName: "Cardápio Fácil"
        },
        additionalMetaTags: [
          { name: 'keywords', content: t('privacy.keywords') }
        ]
      }}
    >
      <div className="min-h-screen bg-background">
        
        <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('privacy.title')}</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              {t('privacy.lastUpdated')} {new Date().toLocaleDateString(language === 'pt-BR' ? 'pt-BR' : 'en-US')}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.section1.title')}</h2>
              <p>
                {t('privacy.section1.content1')}
              </p>
              <p className="mt-2">
                {t('privacy.section1.content2')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.section2.title')}</h2>
              <p>
                {t('privacy.section2.content')}
              </p>
              
              <h3 className="text-xl font-medium mt-4 mb-2">{t('privacy.section2.1.title')}</h3>
              <p>
                {t('privacy.section2.1.content')}
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>{t('privacy.section2.1.item1')}</li>
                <li>{t('privacy.section2.1.item2')}</li>
                <li>{t('privacy.section2.1.item3')}</li>
                <li>{t('privacy.section2.1.item4')}</li>
                <li>{t('privacy.section2.1.item5')}</li>
                <li>{t('privacy.section2.1.item6')}</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-4 mb-2">{t('privacy.section2.2.title')}</h3>
              <p>
                {t('privacy.section2.2.content')}
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>{t('privacy.section2.2.item1')}</li>
                <li>{t('privacy.section2.2.item2')}</li>
                <li>{t('privacy.section2.2.item3')}</li>
                <li>{t('privacy.section2.2.item4')}</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.section3.title')}</h2>
              <p>
                {t('privacy.section3.content')}
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>{t('privacy.section3.item1')}</li>
                <li>{t('privacy.section3.item2')}</li>
                <li>{t('privacy.section3.item3')}</li>
                <li>{t('privacy.section3.item4')}</li>
                <li>{t('privacy.section3.item5')}</li>
                <li>{t('privacy.section3.item6')}</li>
                <li>{t('privacy.section3.item7')}</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.section4.title')}</h2>
              <p>
                {t('privacy.section4.content')}
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>{t('privacy.section4.item1')}</li>
                <li>{t('privacy.section4.item2')}</li>
                <li>{t('privacy.section4.item3')}</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.section5.title')}</h2>
              <p>
                {t('privacy.section5.content')}
              </p>
              <p className="mt-2">
                {t('privacy.section5.content2')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.section6.title')}</h2>
              <p>
                {t('privacy.section6.content')}
              </p>
              <p className="mt-2">
                {t('privacy.section6.content2')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.section7.title')}</h2>
              <p>
                {t('privacy.section7.content')}
              </p>
              <p className="mt-2">
                {t('privacy.section7.content2')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.section8.title')}</h2>
              <p>
                {t('privacy.section8.content')}
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>{t('privacy.section8.item1').split(':')[0]}:</strong> {t('privacy.section8.item1').split(':')[1]}</li>
                <li><strong>{t('privacy.section8.item2').split(':')[0]}:</strong> {t('privacy.section8.item2').split(':')[1]}</li>
                <li><strong>{t('privacy.section8.item3').split(':')[0]}:</strong> {t('privacy.section8.item3').split(':')[1]}</li>
                <li><strong>{t('privacy.section8.item4').split(':')[0]}:</strong> {t('privacy.section8.item4').split(':')[1]}</li>
                <li><strong>{t('privacy.section8.item5').split(':')[0]}:</strong> {t('privacy.section8.item5').split(':')[1]}</li>
                <li><strong>{t('privacy.section8.item6').split(':')[0]}:</strong> {t('privacy.section8.item6').split(':')[1]}</li>
                <li><strong>{t('privacy.section8.item7').split(':')[0]}:</strong> {t('privacy.section8.item7').split(':')[1]}</li>
              </ul>
              <p className="mt-2">
                {t('privacy.section8.content2')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.section9.title')}</h2>
              <p>
                {t('privacy.section9.content1')}
              </p>
              <p className="mt-2">
                {t('privacy.section9.content2')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.section10.title')}</h2>
              <p>
                {t('privacy.section10.content')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.section11.title')}</h2>
              <p>
                {t('privacy.section11.content1')}
              </p>
              <p className="mt-2">
                {t('privacy.section11.content2')}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.section12.title')}</h2>
              <p>
                {t('privacy.section12.content')}
              </p>
              <ul className="list-none mt-2">
                <li><strong>{t('privacy.section12.email')}</strong> {t('privacy.section12.emailAddress')}</li>
                <li><strong>{t('privacy.section12.address')}</strong> {t('privacy.section12.addressValue')}</li>
                <li><strong>{t('privacy.section12.dpo')}</strong> {t('privacy.section12.dpoEmail')}</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
