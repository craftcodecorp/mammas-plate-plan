import { Calendar, ShoppingCart, Utensils, Heart, Clock, Users } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/animated-elements";
import { useLanguage } from "@/lib/use-language";

// Define feature icons in order they'll be used
const featureIcons = [Calendar, ShoppingCart, Utensils, Heart, Clock, Users];

// Create features array dynamically using translation keys
const createFeatures = (t: (key: string) => string) => [
  {
    icon: featureIcons[0],
    title: t('features.component.card1.title'),
    description: t('features.component.card1.description')
  },
  {
    icon: featureIcons[1],
    title: t('features.component.card2.title'),
    description: t('features.component.card2.description')
  },
  {
    icon: featureIcons[2],
    title: t('features.component.card3.title'),
    description: t('features.component.card3.description')
  },
  {
    icon: featureIcons[3],
    title: t('features.component.card4.title'),
    description: t('features.component.card4.description')
  },
  {
    icon: featureIcons[4],
    title: t('features.component.card5.title'),
    description: t('features.component.card5.description')
  },
  {
    icon: featureIcons[5],
    title: t('features.component.card6.title'),
    description: t('features.component.card6.description')
  }
];

const Features = () => {
  const { t } = useLanguage();
  
  // Generate features using the translation function
  const features = createFeatures(t);
  
  return (
    <section className="py-20 bg-gradient-subtle" id="features">
      <div className="container mx-auto px-4">
        <FadeInUp className="text-center mb-16">
          <ScaleIn>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('features.component.heading')}
            </h2>
          </ScaleIn>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('features.component.subheading')}
          </p>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={index}>
                <div 
                  className="bg-card p-6 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-primary rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Features;