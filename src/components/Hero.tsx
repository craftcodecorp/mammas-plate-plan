import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Clock, ShoppingCart, Baby, Heart, Briefcase } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import heroImage from "@/assets/hero-family-cooking.jpg";

const carouselSlides = [
  {
    title: "Planejamento de",
    subtitle: "Refeições para Mães",
    tagline: "Introdução alimentar e receitas práticas",
    description: "Receba cardápios especiais para bebês iniciando sólidos e receitas práticas para toda a família, sem complicação.",
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
    features: [
      { icon: Briefcase, text: "Vida corrida" },
      { icon: Users, text: "Casais e solteiros" },
      { icon: Clock, text: "Preparo rápido" },
      { icon: ShoppingCart, text: "Compra eficiente" }
    ]
  }
];

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Carousel Content */}
          <div className="text-white">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {carouselSlides.map((slide, index) => (
                  <CarouselItem key={index}>
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
                        >
                          Comece seu teste de 14 dias grátis
                        </Button>
                        
                        <p className="text-sm text-white/80">
                          ✨ Sem compromisso • Cancele quando quiser
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/20 text-white border-white/30 hover:bg-white/30" />
              <CarouselNext className="right-4 bg-white/20 text-white border-white/30 hover:bg-white/30" />
            </Carousel>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img 
                src={heroImage} 
                alt="Família brasileira cozinhando juntos" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating WhatsApp Badge */}
            <div className="absolute -bottom-4 -left-4 bg-whatsapp text-whatsapp-foreground px-4 py-2 rounded-full shadow-medium flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Receba no WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;