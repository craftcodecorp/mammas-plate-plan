import * as React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Clock, ShoppingCart, Baby, Heart, Briefcase } from "lucide-react";
import { scrollToSignupForm } from "@/lib/scroll-utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import OptimizedImage from "@/components/ui/optimized-image";
import { heroImages, placeholders, generateColorPlaceholder } from "@/lib/image-utils";

const carouselSlides = [
  {
    title: "Planejamento de",
    subtitle: "Refeições para Mães",
    tagline: "Introdução alimentar e receitas práticas",
    description: "Receba cardápios especiais para bebês iniciando sólidos e receitas práticas para toda a família, sem complicação.",
    image: heroImages.mothers,
    placeholder: placeholders.mothers,
    alt: "Mãe preparando refeição saudável para bebê",
    features: [
      { icon: Baby, text: "Introdução alimentar" },
      { icon: Users, text: "Para toda família" },
      { icon: Clock, text: "Receitas rápidas" },
      { icon: ShoppingCart, text: "Lista organizada" }
    ]
  },
  {
    title: "Planejamento de",
    subtitle: "Refeições Especiais",
    tagline: "Respeitando suas restrições alimentares",
    description: "Cardápios personalizados para vegetarianos, intolerantes à lactose, celíacos e outras necessidades específicas.",
    image: heroImages.special,
    placeholder: placeholders.special,
    alt: "Pessoa preparando refeição com alimentos para dietas especiais",
    features: [
      { icon: Heart, text: "Sem restrições" },
      { icon: Users, text: "Nutrição balanceada" },
      { icon: Clock, text: "Entrega semanal" },
      { icon: ShoppingCart, text: "Ingredientes certos" }
    ]
  },
  {
    title: "Planejamento de",
    subtitle: "Refeições Práticas",
    tagline: "Para profissionais ocupados",
    description: "Cardápios otimizados para quem tem pouco tempo, mas não abre mão de uma alimentação saudável e saborosa.",
    image: heroImages.professionals,
    placeholder: placeholders.professionals,
    alt: "Profissional ocupado preparando refeição rápida e saudável",
    features: [
      { icon: Briefcase, text: "Vida corrida" },
      { icon: Users, text: "Casais e solteiros" },
      { icon: Clock, text: "Preparo rápido" },
      { icon: ShoppingCart, text: "Compra eficiente" }
    ]
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [api, setApi] = React.useState<CarouselApi>();
  
  React.useEffect(() => {
    if (!api) return;
    
    const handleSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };
    
    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
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
                          Comece seu teste de 14 dias grátis
                        </Button>
                        
                        <p className="text-sm text-white/80">
                          ✨ Sem compromisso • Cancele quando quiser
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hero Image */}
                  <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-strong h-[500px]">
                      <OptimizedImage
                        src={slide.image}
                        placeholderSrc={generateColorPlaceholder(800, 500, '#e0e0e0')}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                        effect="blur"
                        wrapperClassName="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    {/* Floating WhatsApp Badge */}
                    <div 
                      className="absolute -bottom-4 -left-4 bg-whatsapp text-whatsapp-foreground px-4 py-2 rounded-full shadow-medium flex items-center gap-2 cursor-pointer hover:bg-whatsapp/90 transition-colors"
                      onClick={scrollToSignupForm}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Receba no WhatsApp</span>
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