import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, Gift, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateName, validateWhatsApp, validateSelect, formatWhatsAppNumber, prepareWhatsAppNumber } from "@/lib/form-validation";
import { sendWelcomeMessage } from "@/lib/whatsapp-service";
import { createPartialProfile } from "@/lib/user-service";
import { useToast } from "@/components/ui/use-toast";

const CTASection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    familySize: "",
    dietaryRestrictions: "",
    acceptedTerms: false,
    acceptedPrivacyPolicy: false
  });
  
  const [errors, setErrors] = useState({
    name: "",
    whatsapp: "",
    familySize: "",
    dietaryRestrictions: "",
    acceptedTerms: "",
    acceptedPrivacyPolicy: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formTouched, setFormTouched] = useState({
    name: false,
    whatsapp: false,
    familySize: false,
    dietaryRestrictions: false,
    acceptedTerms: false,
    acceptedPrivacyPolicy: false
  });
  
  // Format WhatsApp number as user types
  useEffect(() => {
    if (formData.whatsapp && formTouched.whatsapp) {
      setFormData(prev => ({
        ...prev,
        whatsapp: formatWhatsAppNumber(prev.whatsapp)
      }));
    }
  }, [formData.whatsapp, formTouched.whatsapp]);
  
  // Validate form fields when they change
  useEffect(() => {
    if (formTouched.name) {
      setErrors(prev => ({
        ...prev,
        name: validateName(formData.name) || ""
      }));
    }
    
    if (formTouched.whatsapp) {
      setErrors(prev => ({
        ...prev,
        whatsapp: validateWhatsApp(formData.whatsapp) || ""
      }));
    }
    
    if (formTouched.familySize) {
      setErrors(prev => ({
        ...prev,
        familySize: validateSelect(formData.familySize) || ""
      }));
    }
  }, [formData, formTouched]);
  
  const validateForm = () => {
    const nameError = validateName(formData.name);
    const whatsappError = validateWhatsApp(formData.whatsapp);
    const familySizeError = validateSelect(formData.familySize);
    const termsError = !formData.acceptedTerms ? "Você precisa aceitar os termos de uso" : "";
    const privacyError = !formData.acceptedPrivacyPolicy ? "Você precisa aceitar a política de privacidade" : "";
    
    setErrors({
      name: nameError || "",
      whatsapp: whatsappError || "",
      familySize: familySizeError || "",
      dietaryRestrictions: "",
      acceptedTerms: termsError,
      acceptedPrivacyPolicy: privacyError
    });
    
    return !nameError && !whatsappError && !familySizeError && !termsError && !privacyError;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched to show validation errors
    setFormTouched({
      name: true,
      whatsapp: true,
      familySize: true,
      dietaryRestrictions: true,
      acceptedTerms: true,
      acceptedPrivacyPolicy: true
    });
    
    if (!validateForm()) {
      toast({
        title: "Por favor, corrija os erros no formulário",
        description: "Alguns campos precisam ser preenchidos corretamente.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // First create partial profile in User Management Service
      const profileResponse = await createPartialProfile({
        name: formData.name,
        phoneNumber: prepareWhatsAppNumber(formData.whatsapp),
        familySize: formData.familySize,
        dietaryRestrictions: formData.dietaryRestrictions || undefined,
        acceptedTerms: formData.acceptedTerms,
        acceptedPrivacyPolicy: formData.acceptedPrivacyPolicy
      });
      
      if (!profileResponse.success) {
        throw new Error(profileResponse.error?.message || "Falha ao criar perfil");
      }
      
      // Then send welcome message via WhatsApp
      const messageSent = await sendWelcomeMessage(formData);
      
      if (messageSent) {
        // Navigate to thank you page with form data
        navigate("/thank-you", { state: { formData } });
      } else {
        // Even if WhatsApp message fails, we can still proceed since the profile was created
        console.warn("WhatsApp message failed to send, but profile was created");
        navigate("/thank-you", { state: { formData } });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao processar seu cadastro",
        description: error instanceof Error ? error.message : "Por favor, tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="signup-form" className="py-20 bg-gradient-hero relative overflow-hidden">
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
              <span className="font-semibold">7 dias grátis • Sem compromisso</span>
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
                    onBlur={() => setFormTouched({...formTouched, name: true})}
                    className={errors.name ? "border-red-500" : ""}
                    disabled={isSubmitting}
                    required
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    placeholder="(11) 99999-9999"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    onBlur={() => setFormTouched({...formTouched, whatsapp: true})}
                    className={errors.whatsapp ? "border-red-500" : ""}
                    disabled={isSubmitting}
                    required
                  />
                  {errors.whatsapp && (
                    <p className="text-sm text-red-500">{errors.whatsapp}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="familySize">Composição familiar</Label>
                <Select 
                  value={formData.familySize} 
                  onValueChange={(value) => {
                    setFormData({...formData, familySize: value});
                    setFormTouched({...formTouched, familySize: true});
                  }}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={errors.familySize ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecione o perfil da sua família" />
                  </SelectTrigger>
                  {errors.familySize && (
                    <p className="text-sm text-red-500">{errors.familySize}</p>
                  )}
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
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Começar teste grátis de 7 dias
                  </>
                )}
              </Button>

              <div className="space-y-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={formData.acceptedTerms}
                    onCheckedChange={(checked) => {
                      setFormData({...formData, acceptedTerms: checked === true});
                      setFormTouched({...formTouched, acceptedTerms: true});
                    }}
                    className={errors.acceptedTerms ? "border-red-500" : ""}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Aceito os <a href="/terms-of-use" className="text-primary underline">termos de uso</a>
                  </label>
                </div>
                {errors.acceptedTerms && (
                  <p className="text-sm text-red-500 mt-1">{errors.acceptedTerms}</p>
                )}
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="privacy" 
                    checked={formData.acceptedPrivacyPolicy}
                    onCheckedChange={(checked) => {
                      setFormData({...formData, acceptedPrivacyPolicy: checked === true});
                      setFormTouched({...formTouched, acceptedPrivacyPolicy: true});
                    }}
                    className={errors.acceptedPrivacyPolicy ? "border-red-500" : ""}
                  />
                  <label
                    htmlFor="privacy"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Aceito a <a href="/privacy-policy" className="text-primary underline">política de privacidade</a>
                  </label>
                </div>
                {errors.acceptedPrivacyPolicy && (
                  <p className="text-sm text-red-500 mt-1">{errors.acceptedPrivacyPolicy}</p>
                )}
                
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Seu primeiro cardápio chegará em até 24 horas após a confirmação do cadastro.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;