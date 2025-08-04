import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Clock, ShoppingCart } from "lucide-react";
import heroImage from "@/assets/hero-family-cooking.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Planejamento de
                <span className="block text-secondary-glow">Refeições Inteligente</span>
                <span className="block text-lg lg:text-xl font-normal text-white/90 mt-4">
                  Direto no seu WhatsApp
                </span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-lg">
                Receba semanalmente um cardápio personalizado e lista de compras 
                organizada, seja para sua família, restrições alimentares ou vida corrida.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-white/90">
                <MessageCircle className="w-5 h-5 text-secondary-glow" />
                <span className="text-sm">Via WhatsApp</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Users className="w-5 h-5 text-secondary-glow" />
                <span className="text-sm">Para todos os perfis</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Clock className="w-5 h-5 text-secondary-glow" />
                <span className="text-sm">Entrega semanal</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <ShoppingCart className="w-5 h-5 text-secondary-glow" />
                <span className="text-sm">Lista organizada</span>
              </div>
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