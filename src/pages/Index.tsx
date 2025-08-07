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
  const { language } = useLanguage();
  
  // Base URL for canonical links
  const baseUrl = language === 'pt-BR' 
    ? 'https://mammas-plate-plan.netlify.app' 
    : 'https://mammas-plate-plan.netlify.app/en';
    
  // Generate canonical URL
  const canonical = `${baseUrl}${location.pathname}`;
  
  return (
    <PageLayout
      showBreadcrumbs={false}
      seo={{
        title: "Mamma's Plate Plan - Planejamento de refeições saudáveis",
        description: "Planejamento de refeições saudáveis e deliciosas para toda a família. Economize tempo e dinheiro com nosso serviço de cardápio fácil.",
        canonical,
        openGraph: {
          title: "Mamma's Plate Plan - Planejamento de refeições saudáveis",
          description: "Planejamento de refeições saudáveis e deliciosas para toda a família. Economize tempo e dinheiro com nosso serviço de cardápio fácil.",
          type: 'website',
          url: canonical,
          image: `${baseUrl}/og-image.jpg`,
          siteName: "Mamma's Plate Plan"
        },
        twitter: {
          card: 'summary_large_image',
          site: '@mammasplateplan',
          creator: '@mammasplateplan',
          image: `${baseUrl}/twitter-image.jpg`
        },
        additionalMetaTags: [
          { name: 'keywords', content: 'planejamento de refeições, cardápio semanal, receitas saudáveis, economia de tempo, economia de dinheiro' }
        ]
      }}
    >
      <div className="min-h-screen">
        <Header />
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
