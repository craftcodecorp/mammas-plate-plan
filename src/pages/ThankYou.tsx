import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {};

  // Redirect to home if accessed directly without form data
  useEffect(() => {
    if (!location.state?.formData) {
      navigate("/");
    }
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-strong p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Obrigado pelo seu cadastro!
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Estamos preparando seu cardápio personalizado.
          </p>
        </div>
        
        <div className="bg-muted/50 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-lg mb-4">Resumo do seu perfil:</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nome:</span>
              <span className="font-medium">{formData.name || "Não informado"}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Composição familiar:</span>
              <span className="font-medium">
                {formData.familySize === "single" && "Apenas eu"}
                {formData.familySize === "couple" && "Casal sem filhos"}
                {formData.familySize === "baby" && "Casal com bebê (até 2 anos)"}
                {formData.familySize === "children" && "Família com crianças (2-12 anos)"}
                {formData.familySize === "teens" && "Família com adolescentes"}
                {formData.familySize === "mixed" && "Família mista (várias idades)"}
                {!formData.familySize && "Não informado"}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Restrições alimentares:</span>
              <span className="font-medium">
                {formData.dietaryRestrictions === "none" && "Nenhuma restrição"}
                {formData.dietaryRestrictions === "vegetarian" && "Vegetariano"}
                {formData.dietaryRestrictions === "lactose" && "Sem lactose"}
                {formData.dietaryRestrictions === "gluten" && "Sem glúten"}
                {formData.dietaryRestrictions === "diabetic" && "Diabético"}
                {formData.dietaryRestrictions === "multiple" && "Múltiplas restrições"}
                {!formData.dietaryRestrictions && "Não informado"}
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
              <h3 className="font-semibold mb-1">Aguarde mensagem no WhatsApp</h3>
              <p className="text-muted-foreground text-sm">
                Enviaremos uma mensagem para {formData.whatsapp || "seu número"} em até 24 horas com seu primeiro cardápio semanal.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Seu teste gratuito começou</h3>
              <p className="text-muted-foreground text-sm">
                Você tem acesso a 14 dias de cardápios personalizados. Não se preocupe, avisaremos antes do término.
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
            Voltar para a página inicial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
