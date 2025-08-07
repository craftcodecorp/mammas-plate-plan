import { Button } from "@/components/ui/button";
import { Check, Gift } from "lucide-react";
import { scrollToSignupForm } from "@/lib/scroll-utils";
import { useLanguage } from "@/lib/use-language";

const Pricing = () => {
  const { t } = useLanguage();
  
  // Define features array using translation keys
  const features = [
    t('pricing.component.features.1'),
    t('pricing.component.features.2'),
    t('pricing.component.features.3'),
    t('pricing.component.features.4'),
    t('pricing.component.features.5'),
    t('pricing.component.features.6'),
    t('pricing.component.features.7')
  ];
  
  return (
    <section id="pricing" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('pricing.component.heading')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.component.subheading')}
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-card rounded-2xl shadow-medium p-8 border-2 border-primary/20 relative overflow-visible mt-6">
            {/* Popular Badge */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-gradient-secondary text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
                <Gift className="w-4 h-4 flex-shrink-0" />
                {t('pricing.component.badge')}
              </div>
            </div>

            <div className="text-center mb-8 pt-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {t('pricing.component.plan.title')}
              </h3>
              
              <div className="mb-4">
                <span className="text-4xl font-bold text-primary">{t('pricing.component.plan.price')}</span>
                <span className="text-muted-foreground">{t('pricing.component.plan.period')}</span>
              </div>
              
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Gift className="w-4 h-4" />
                {t('pricing.component.plan.trial')}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-1 bg-primary/10 rounded-full">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              variant="cta" 
              size="lg" 
              className="w-full text-lg py-6 h-auto"
              onClick={scrollToSignupForm}
            >
              {t('pricing.component.cta')}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              {t('pricing.component.disclaimer')}
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('pricing.component.customization') }}>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;