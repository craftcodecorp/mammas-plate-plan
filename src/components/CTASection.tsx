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
import { useLanguage } from "@/lib/use-language";

const CTASection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
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
    const termsError = !formData.acceptedTerms ? t('cta.form.terms.error') : "";
    const privacyError = !formData.acceptedPrivacyPolicy ? t('cta.form.privacy.error') : "";
    
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
        title: t('cta.form.error.title'),
        description: t('cta.form.error.description'),
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
        title: t('cta.form.error.title'),
        description: error instanceof Error ? error.message : t('cta.form.error.description'),
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
              {t('cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-6">
              {t('cta.subtitle')}
            </p>
            
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full">
              <Gift className="w-5 h-5 text-secondary-glow" />
              <span className="font-semibold">{t('cta.freeTrial')}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-strong p-8 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {t('cta.form.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('cta.form.description')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    {t('cta.form.name.label')}
                  </Label>
                  <Input
                    id="name"
                    placeholder={t('cta.form.name.placeholder')}
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
                  <Label htmlFor="whatsapp" className="text-foreground">
                    {t('cta.form.whatsapp.label')}
                  </Label>
                  <Input
                    id="whatsapp"
                    placeholder={t('cta.form.whatsapp.placeholder')}
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
                <Label htmlFor="familySize" className="text-foreground">
                  {t('cta.form.familySize.label')}
                </Label>
                <Select 
                  value={formData.familySize} 
                  onValueChange={(value) => {
                    setFormData({...formData, familySize: value});
                    setFormTouched({...formTouched, familySize: true});
                  }}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={errors.familySize ? "border-red-500" : ""}>
                    <SelectValue placeholder={t('cta.form.familySize.placeholder')} />
                  </SelectTrigger>
                  {errors.familySize && (
                    <p className="text-sm text-red-500">{errors.familySize}</p>
                  )}
                  <SelectContent>
                    <SelectItem value="1">{t('cta.form.familySize.option.1')}</SelectItem>
                    <SelectItem value="2">{t('cta.form.familySize.option.2')}</SelectItem>
                    <SelectItem value="3">{t('cta.form.familySize.option.3')}</SelectItem>
                    <SelectItem value="4">{t('cta.form.familySize.option.4')}</SelectItem>
                    <SelectItem value="5+">{t('cta.form.familySize.option.5')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietaryRestrictions" className="text-foreground">
                  {t('cta.form.dietaryRestrictions.label')}
                </Label>
                <Select 
                  value={formData.dietaryRestrictions} 
                  onValueChange={(value) => setFormData({...formData, dietaryRestrictions: value})}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('cta.form.dietaryRestrictions.placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{t('cta.form.dietaryRestrictions.option.none')}</SelectItem>
                    <SelectItem value="vegetarian">{t('cta.form.dietaryRestrictions.option.vegetarian')}</SelectItem>
                    <SelectItem value="lactose">{t('cta.form.dietaryRestrictions.option.lactose')}</SelectItem>
                    <SelectItem value="gluten">{t('cta.form.dietaryRestrictions.option.gluten')}</SelectItem>
                    <SelectItem value="diabetic">{t('cta.form.dietaryRestrictions.option.diabetic')}</SelectItem>
                    <SelectItem value="multiple">{t('cta.form.dietaryRestrictions.option.multiple')}</SelectItem>
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
                    {t('cta.form.button.loading')}
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t('cta.form.button.submit')}
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
                    {t('cta.form.terms.text')} <a href="/terms-of-use" className="text-primary underline">{t('cta.form.terms.link')}</a>
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
                    {t('cta.form.privacy.text')} <a href="/privacy-policy" className="text-primary underline">{t('cta.form.privacy.link')}</a>
                  </label>
                </div>
                {errors.acceptedPrivacyPolicy && (
                  <p className="text-sm text-red-500 mt-1">{errors.acceptedPrivacyPolicy}</p>
                )}
                
                <p className="text-center text-sm text-muted-foreground mt-2">
                  {t('cta.form.confirmation')}
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