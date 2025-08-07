import * as React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Clock, ShoppingCart, Baby, Heart, Briefcase } from "lucide-react";
import { scrollToSignupForm } from "@/lib/scroll-utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import OptimizedImage from "@/components/ui/optimized-image";
import { heroImages, placeholders, generateColorPlaceholder, ResponsiveImageSet } from "@/lib/image-utils";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/use-language";

// Define slide icons for features
const slideFeatureIcons = [
  [Baby, Users, Clock, ShoppingCart], // Slide 1 icons
  [Heart, Users, Clock, ShoppingCart], // Slide 2 icons
  [Briefcase, Users, Clock, ShoppingCart] // Slide 3 icons
];

// Create carousel slides dynamically using translation keys
const createCarouselSlides = (t: (key: string) => string) => [
  {
    title: t('hero.slide1.title'),
    subtitle: t('hero.slide1.subtitle'),
    tagline: t('hero.slide1.tagline'),
    description: t('hero.slide1.description'),
    image: heroImages.mothers,
    placeholder: placeholders.mothers,
    alt: t('hero.slide1.alt'),
    features: [
      { icon: slideFeatureIcons[0][0], text: t('hero.slide1.feature1') },
      { icon: slideFeatureIcons[0][1], text: t('hero.slide1.feature2') },
      { icon: slideFeatureIcons[0][2], text: t('hero.slide1.feature3') },
      { icon: slideFeatureIcons[0][3], text: t('hero.slide1.feature4') }
    ]
  },
  {
    title: t('hero.slide2.title'),
    subtitle: t('hero.slide2.subtitle'),
    tagline: t('hero.slide2.tagline'),
    description: t('hero.slide2.description'),
    image: heroImages.special,
    placeholder: placeholders.special,
    alt: t('hero.slide2.alt'),
    features: [
      { icon: slideFeatureIcons[1][0], text: t('hero.slide2.feature1') },
      { icon: slideFeatureIcons[1][1], text: t('hero.slide2.feature2') },
      { icon: slideFeatureIcons[1][2], text: t('hero.slide2.feature3') },
      { icon: slideFeatureIcons[1][3], text: t('hero.slide2.feature4') }
    ]
  },
  {
    title: t('hero.slide3.title'),
    subtitle: t('hero.slide3.subtitle'),
    tagline: t('hero.slide3.tagline'),
    description: t('hero.slide3.description'),
    image: heroImages.professionals,
    placeholder: placeholders.professionals,
    alt: t('hero.slide3.alt'),
    features: [
      { icon: slideFeatureIcons[2][0], text: t('hero.slide3.feature1') },
      { icon: slideFeatureIcons[2][1], text: t('hero.slide3.feature2') },
      { icon: slideFeatureIcons[2][2], text: t('hero.slide3.feature3') },
      { icon: slideFeatureIcons[2][3], text: t('hero.slide3.feature4') }
    ]
  }
];

const Hero = () => {
  const { t } = useLanguage();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  
  // Generate carousel slides using the translation function
  const carouselSlides = createCarouselSlides(t);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent>
            {carouselSlides.map((slide, index) => (
              <CarouselItem key={index} className="overflow-visible">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                  {/* Carousel Content */}
                  <div className="text-white">
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                          {slide.title}
                          <span className="block text-secondary-glow">{slide.subtitle}</span>
                          <span className="block text-lg lg:text-xl font-normal text-white/90 mt-4">
                            {slide.tagline}
                          </span>
                        </h1>
                        
                        <p className="text-xl text-white/90 max-w-lg">
                          {slide.description}
                        </p>
                      </div>

                      {/* Key Features */}
                      <div className="grid grid-cols-2 gap-4">
                        {slide.features.map((feature, featureIndex) => {
                          const Icon = feature.icon;
                          return (
                            <div key={featureIndex} className="flex items-center gap-3 text-white/90">
                              <Icon className="w-5 h-5 text-secondary-glow" />
                              <span className="text-sm">{feature.text}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* CTA */}
                      <div className="space-y-4">
                        <Button 
                          variant="cta" 
                          size="lg"
                          className="text-lg px-8 py-6 h-auto"
                          onClick={scrollToSignupForm}
                        >
                          {t('hero.cta.trial')}
                        </Button>
                        
                        <p className="text-sm text-white/80">
                          {t('hero.cta.no_commitment')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hero Image */}
                  <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-strong h-[500px]">
                      <picture>
                        <source media="(min-width: 1280px)" srcSet={slide.image.web} />
                        <source media="(min-width: 768px)" srcSet={slide.image.tablet} />
                        <source media="(min-width: 480px)" srcSet={slide.image.mobile} />
                        <OptimizedImage
                          src={slide.image.web}
                          placeholderSrc={slide.image.small}
                          alt={slide.alt}
                          className="w-full h-full object-cover"
                          effect="blur"
                          wrapperClassName="w-full h-full"
                        />
                      </picture>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    {/* Floating WhatsApp Badge */}
                    <div 
                      className="absolute -bottom-4 -left-4 bg-whatsapp text-whatsapp-foreground px-4 py-2 rounded-full shadow-medium flex items-center gap-2 cursor-pointer hover:bg-whatsapp/90 transition-colors"
                      onClick={scrollToSignupForm}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">{t('hero.whatsapp.badge')}</span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white/30 text-white border-white/40 hover:bg-white/40 shadow-md z-10" />
          <CarouselNext className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white/30 text-white border-white/40 hover:bg-white/40 shadow-md z-10" />
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;