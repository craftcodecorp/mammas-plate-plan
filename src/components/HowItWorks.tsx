import { UserPlus, MessageCircle, Calendar } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "1",
    title: "Crie seu perfil",
    description: "Conte sobre sua família, idades das crianças, restrições alimentares e preferências."
  },
  {
    icon: MessageCircle,
    step: "2", 
    title: "Receba no WhatsApp",
    description: "Toda segunda-feira receba seu cardápio da semana e lista de compras organizada."
  },
  {
    icon: Calendar,
    step: "3",
    title: "Cozinhe e aproveite",
    description: "Siga o planejamento e tenha mais tempo para curtir momentos em família."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Como funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Em apenas 3 passos simples, você terá um planejamento completo 
            de refeições para toda a semana.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform translate-x-1/2 z-0"></div>
                )}
                
                <div className="relative z-10">
                  {/* Step Number & Icon */}
                  <div className="relative mx-auto w-16 h-16 mb-6">
                    <div className="absolute inset-0 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;