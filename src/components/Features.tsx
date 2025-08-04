import { Calendar, ShoppingCart, Utensils, Heart, Clock, Users } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/animated-elements";

const features = [
  {
    icon: Calendar,
    title: "Cardápio Personalizado",
    description: "Refeições planejadas com base no perfil da sua família, idade das crianças e preferências alimentares."
  },
  {
    icon: ShoppingCart,
    title: "Lista de Compras Organizada",
    description: "Ingredientes organizados por categoria com checkboxes para uma compra mais eficiente."
  },
  {
    icon: Utensils,
    title: "Culinária Brasileira",
    description: "Pratos que fazem parte da nossa cultura, com ingredientes sazonais e de fácil acesso."
  },
  {
    icon: Heart,
    title: "Nutrição Balanceada",
    description: "Refeições equilibradas para famílias, pessoas com restrições alimentares e profissionais ocupados."
  },
  {
    icon: Clock,
    title: "Praticidade Total",
    description: "Sem aplicativo, sem login, sem complicação. Tudo direto no seu WhatsApp."
  },
  {
    icon: Users,
    title: "Para Todos os Perfis",
    description: "Famílias com bebês, pessoas com restrições alimentares e profissionais com pouco tempo para cozinhar."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-gradient-subtle" id="features">
      <div className="container mx-auto px-4">
        <FadeInUp className="text-center mb-16">
          <ScaleIn>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Tudo que você precisa
            </h2>
          </ScaleIn>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simplificamos o planejamento das refeições para mães ocupadas, pessoas com 
            restrições alimentares e profissionais com rotina corrida.
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