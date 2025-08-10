import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "@/components/layout/page-layout";
import { useLanguage } from "@/lib/use-language";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useLanguage();
  const formData = location.state?.formData || {};
  const whatsappNotified = location.state?.whatsappNotified;
  const profileId = location.state?.profileId;
  
  // Base URL for canonical links
  const baseUrl = language === 'pt-BR' 
    ? 'https://cardapiofacil.online' 
    : 'https://cardapiofacil.online/en';
    
  // Generate canonical URL
  const canonical = `${baseUrl}${location.pathname}`;

  // Redirect to home if accessed directly without form data
  useEffect(() => {
    if (!location.state?.formData) {
      navigate("/");
    }
  }, [location.state, navigate]);

  return (
    <PageLayout
      showBreadcrumbs={false}
      seo={{
        title: t('seo.thankyou.title'),
        description: t('seo.thankyou.description'),
        canonical,
        openGraph: {
          title: t('seo.thankyou.title'),
          description: t('seo.thankyou.description'),
          type: 'website',
          url: canonical,
          image: `${baseUrl}/og-image.jpg`,
          siteName: "Mamma's Plate Plan"
        },
        additionalMetaTags: [
          { name: 'robots', content: 'noindex, follow' }
        ]
      }}
    >
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-strong p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('thankyou.title')}
          </h1>
          
          <p className="text-xl text-muted-foreground">
            {t('thankyou.subtitle')}
          </p>
        </div>
        
        <div className="bg-muted/50 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-lg mb-4">{t('thankyou.profile.title')}</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('thankyou.profile.name')}</span>
              <span className="font-medium">{formData.name || t('thankyou.profile.notInformed')}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('thankyou.profile.family')}</span>
              <span className="font-medium">
                {formData.familySize === "single" && t('thankyou.family.single')}
                {formData.familySize === "couple" && t('thankyou.family.couple')}
                {formData.familySize === "baby" && t('thankyou.family.baby')}
                {formData.familySize === "children" && t('thankyou.family.children')}
                {formData.familySize === "teens" && t('thankyou.family.teens')}
                {formData.familySize === "mixed" && t('thankyou.family.mixed')}
                {!formData.familySize && t('thankyou.profile.notInformed')}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('thankyou.profile.restrictions')}</span>
              <span className="font-medium">
                {formData.dietaryRestrictions === "none" && t('thankyou.diet.none')}
                {formData.dietaryRestrictions === "vegetarian" && t('thankyou.diet.vegetarian')}
                {formData.dietaryRestrictions === "lactose" && t('thankyou.diet.lactose')}
                {formData.dietaryRestrictions === "gluten" && t('thankyou.diet.gluten')}
                {formData.dietaryRestrictions === "diabetic" && t('thankyou.diet.diabetic')}
                {formData.dietaryRestrictions === "multiple" && t('thankyou.diet.multiple')}
                {!formData.dietaryRestrictions && t('thankyou.profile.notInformed')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{t('thankyou.whatsapp.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {whatsappNotified 
                  ? t('thankyou.whatsapp.message').replace('{whatsapp}', formData.whatsapp || t('thankyou.whatsapp.defaultNumber'))
                  : t('thankyou.whatsapp.alternativeMessage').replace('{whatsapp}', formData.whatsapp || t('thankyou.whatsapp.defaultNumber'))}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{t('thankyou.trial.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('thankyou.trial.message')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            className="px-8"
          >
            {t('thankyou.button.home')}
          </Button>
        </div>
      </div>
    </div>
    </PageLayout>
  );
};

export default ThankYou;
