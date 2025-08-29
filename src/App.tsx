import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/language-provider";
import { HelmetProvider } from "react-helmet-async";
import { getOrganizationStructuredData } from "@/lib/seo/organization-data";
import SEOHead from "@/components/seo/seo-head";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

// Generate organization structured data for SEO
const organizationStructuredData = getOrganizationStructuredData();

const App = () => (
  <HelmetProvider>
    {/* Global SEO settings */}
    <SEOHead
      title="Cardápio Fácil - Planejamento de refeições saudáveis"
      description="Planejamento de refeições saudáveis e deliciosas para toda a família"
      canonical="https://cardapiofacil.online"
      openGraph={{
        title: "Cardápio Fácil - Planejamento de refeições saudáveis",
        description: "Planejamento de refeições saudáveis e deliciosas para toda a família",
        type: "website",
        url: "https://cardapiofacil.online",
        image: "https://cardapiofacil.online/og-image.jpg",
        siteName: "Cardápio Fácil"
      }}
      twitter={{
        card: "summary_large_image",
        site: "@cardapiofacil",
        creator: "@cardapiofacil",
        image: "https://cardapiofacil.online/twitter-image.jpg"
      }}
      additionalMetaTags={[
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#ffffff" }
      ]}
      additionalLinkTags={[
        { rel: "icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
        { rel: "manifest", href: "/site.webmanifest" }
      ]}
      structuredData={organizationStructuredData}
    />
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LanguageProvider defaultLanguage="pt-BR">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
