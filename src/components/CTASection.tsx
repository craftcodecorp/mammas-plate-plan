import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Gift } from "lucide-react";
import { useState } from "react";

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    familySize: "",
    dietaryRestrictions: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the integration with your form handling service
    console.log("Form submitted:", formData);
    // For now, just show an alert
    alert("Obrigado! Em breve você receberá seu primeiro cardápio no WhatsApp!");
  };

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Pronto para transformar a alimentação da sua família?
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Comece seu teste gratuito agora e receba seu primeiro cardápio em 24 horas!
            </p>
            
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full">
              <Gift className="w-5 h-5 text-secondary-glow" />
              <span className="font-semibold">14 dias grátis • Sem compromisso</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-strong p-8 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Cadastre-se gratuitamente
              </h3>
              <p className="text-muted-foreground">
                Leva menos de 2 minutos para começar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Maria Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    placeholder="(11) 99999-9999"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="familySize">Composição familiar</Label>
                <Select 
                  value={formData.familySize} 
                  onValueChange={(value) => setFormData({...formData, familySize: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o perfil da sua família" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Apenas eu</SelectItem>
                    <SelectItem value="couple">Casal sem filhos</SelectItem>
                    <SelectItem value="baby">Casal com bebê (até 2 anos)</SelectItem>
                    <SelectItem value="children">Família com crianças (2-12 anos)</SelectItem>
                    <SelectItem value="teens">Família com adolescentes</SelectItem>
                    <SelectItem value="mixed">Família mista (várias idades)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary">Restrições alimentares</Label>
                <Select 
                  value={formData.dietaryRestrictions} 
                  onValueChange={(value) => setFormData({...formData, dietaryRestrictions: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Alguma restrição ou preferência?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhuma restrição</SelectItem>
                    <SelectItem value="vegetarian">Vegetariano</SelectItem>
                    <SelectItem value="lactose">Sem lactose</SelectItem>
                    <SelectItem value="gluten">Sem glúten</SelectItem>
                    <SelectItem value="diabetic">Diabético</SelectItem>
                    <SelectItem value="multiple">Múltiplas restrições</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                variant="cta" 
                size="lg" 
                className="w-full text-lg py-6 h-auto"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Começar teste grátis de 14 dias
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Ao cadastrar-se, você concorda com nossos termos de uso e política de privacidade.
                Seu primeiro cardápio chegará em até 24 horas.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;