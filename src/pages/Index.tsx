import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageLayout from "@/components/layout/page-layout";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/use-language";

const Index = () => {
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
      showBreadcrumbs={false}
      header={<Header />}
      seo={{
        title: t('seo.home.title'),
        description: t('seo.home.description'),
        canonical,
        openGraph: {
          title: t('seo.home.title'),
          description: t('seo.home.description'),
          type: 'website',
          url: canonical,
          image: `${baseUrl}/og-image.jpg`,
          siteName: "Cardápio Fácil"
        },
        twitter: {
          card: 'summary_large_image',
          site: '@cardapiofacil',
          creator: '@cardapiofacil',
          image: `${baseUrl}/twitter-image.jpg`
        },
        additionalMetaTags: [
          { name: 'keywords', content: t('seo.home.keywords') }
        ]
      }}
    >
      <div className="min-h-screen">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Blog />
        <FAQ />
        <CTASection />
        <Footer />
      </div>
    </PageLayout>
  );
};

export default Index;
