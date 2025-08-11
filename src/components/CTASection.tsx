import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, Gift, Loader2 } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { validateName, validateWhatsApp, validateSelect, formatWhatsAppNumber, prepareWhatsAppNumber } from "@/lib/form-validation";
import { notifyLandingPageSignup } from "../lib/whatsapp-service";
import { createPartialProfile } from "@/lib/user-service";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/lib/use-language";
import { useFormAnalytics, FormStage, FieldInteraction } from "@/lib/analytics/form-analytics";
import axios from 'axios';

const CTASection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { 
    trackFormView, 
    trackFieldInteraction, 
    trackFormStage, 
    trackFormSubmission, 
    trackSignupCompletion,
    FormStage,
    FieldInteraction
  } = useFormAnalytics();
  
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
  
  // Track if form has been started
  const formStarted = useRef(false);
  
  // Define validateForm before using it in useEffect
  const validateForm = useCallback((showAllErrors = false) => {
    const nameError = validateName(formData.name);
    const whatsappError = validateWhatsApp(formData.whatsapp);
    const familySizeError = validateSelect(formData.familySize);
    const termsError = !formData.acceptedTerms ? t('cta.form.terms.error') : "";
    const privacyError = !formData.acceptedPrivacyPolicy ? t('cta.form.privacy.error') : "";
    
    // Only show errors for fields that have been touched or if showAllErrors is true
    setErrors({
      name: (showAllErrors || formTouched.name) ? (nameError || "") : "",
      whatsapp: (showAllErrors || formTouched.whatsapp) ? (whatsappError || "") : "",
      familySize: (showAllErrors || formTouched.familySize) ? (familySizeError || "") : "",
      dietaryRestrictions: "",
      acceptedTerms: (showAllErrors || formTouched.acceptedTerms) ? termsError : "",
      acceptedPrivacyPolicy: (showAllErrors || formTouched.acceptedPrivacyPolicy) ? privacyError : ""
    });
    
    return !nameError && !whatsappError && !familySizeError && !termsError && !privacyError;
  }, [formData, formTouched, t]);
  
  // Format WhatsApp number as user types
  useEffect(() => {
    if (formData.whatsapp && formTouched.whatsapp) {
      const formatted = formatWhatsAppNumber(formData.whatsapp);
      if (formatted !== formData.whatsapp) {
        setFormData({...formData, whatsapp: formatted});
      }
    }
  }, [formData, formTouched.whatsapp]);
  
  // Track form view when component mounts
  useEffect(() => {
    // Track form view when component mounts
    trackFormView('landing_page_signup', 'landing_page');
  }, [trackFormView]);
  
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
    
    if (formTouched.acceptedTerms) {
      setErrors(prev => ({
        ...prev,
        acceptedTerms: !formData.acceptedTerms ? t('cta.form.terms.error') : ""
      }));
    }
    
    if (formTouched.acceptedPrivacyPolicy) {
      setErrors(prev => ({
        ...prev,
        acceptedPrivacyPolicy: !formData.acceptedPrivacyPolicy ? t('cta.form.privacy.error') : ""
      }));
    }
  }, [formData, formTouched, t]);
  
  const validateField = (fieldName: keyof typeof formData, value: string) => {
    switch (fieldName) {
      case 'name':
        setErrors(prev => ({ ...prev, name: validateName(value) || "" }));
        break;
      case 'whatsapp':
        setErrors(prev => ({ ...prev, whatsapp: validateWhatsApp(value) || "" }));
        break;
      case 'familySize':
        setErrors(prev => ({ ...prev, familySize: validateSelect(value) || "" }));
        break;
      default:
        break;
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Track field interaction
    trackFieldInteraction('landing_page_signup', name, FieldInteraction.CHANGE);
    
    // Validate the changed field
    validateField(name as keyof typeof formData, value);
    
    // If this is the first interaction, track form started
    if (!formStarted.current) {
      formStarted.current = true;
      trackFormStage('landing_page_signup', FormStage.STARTED);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission attempt
    trackFormStage('landing_page_signup', FormStage.ATTEMPTED);
    
    // Mark all fields as touched to show validation errors
    setFormTouched({
      name: true,
      whatsapp: true,
      familySize: true,
      dietaryRestrictions: true,
      acceptedTerms: true,
      acceptedPrivacyPolicy: true
    });
    
    if (!validateForm(true)) {
      // Track validation errors
      const errorFields = Object.entries(errors)
        .filter(([_, value]) => value)
        .map(([key]) => key);
      
      trackFormStage('landing_page_signup', FormStage.FAILED, {
        error_type: 'validation',
        error_fields: errorFields
      });
      
      // Track each field with error
      errorFields.forEach(field => {
        trackFieldInteraction('landing_page_signup', field, FieldInteraction.ERROR);
      });
      
      const formErrorTitle = t('cta.form.error.title');
      const formErrorDescription = t('cta.form.error.description');
      
      toast({
        title: formErrorTitle,
        description: formErrorDescription,
        variant: "destructive"
      });
      return;
    }
    
    // Form is valid
    trackFormStage('landing_page_signup', FormStage.VALIDATED);
    setIsSubmitting(true);
    
    try {
      // Step 1: Create partial profile in User Management Service
      // This follows the documented flow where landing page creates a partial profile
      // that will later be completed during WhatsApp onboarding
      const profileResponse = await createPartialProfile({
        name: formData.name,
        phoneNumber: prepareWhatsAppNumber(formData.whatsapp),
        source: 'landing_page',
        familySize: formData.familySize,
        dietaryRestrictions: formData.dietaryRestrictions || undefined,
        acceptedTerms: formData.acceptedTerms,
        acceptedPrivacyPolicy: formData.acceptedPrivacyPolicy
      });
      
      if (!profileResponse.success) {
        // Track profile creation failure
        trackFormStage('landing_page_signup', FormStage.FAILED, {
          error_type: 'api',
          error: profileResponse.error?.message || "Unknown error",
          error_code: profileResponse.error?.code || "UNKNOWN_ERROR"
        });
        
        // Check if it's a validation error or server error
        const errorCode = profileResponse.error?.code || "UNKNOWN_ERROR";
        
        // Handle validation errors differently from server errors
        if (errorCode === 'VALIDATION_ERROR') {
          // This is a form validation error from the server
          const validationTitle = t('cta.form.validation.title');
          const validationDescription = profileResponse.error?.message || t('cta.form.validation.description');
          
          toast({
            title: validationTitle,
            description: validationDescription,
            variant: "destructive"
          });
        } else {
          // This is a server error, not related to form validation
          const serverErrorTitle = t('cta.form.serverError.title');
          const serverErrorDescription = t('cta.form.serverError.description');
          
          toast({
            title: serverErrorTitle,
            description: serverErrorDescription,
            variant: "destructive"
          });
          
          // Log the server error for debugging
          console.error("Server error during profile creation:", profileResponse.error);
        }
        
        // Don't proceed with form submission
        return;
      }
      
      // Track form submission
      trackFormStage('landing_page_signup', FormStage.SUBMITTED);
      
      // Track successful profile creation with detailed analytics
      trackFormSubmission('landing_page_signup', true, {
        userId: profileResponse.data?.id,
        familySize: formData.familySize,
        hasDietaryRestrictions: !!formData.dietaryRestrictions && formData.dietaryRestrictions !== 'none',
        dietaryType: formData.dietaryRestrictions || 'none'
      }, {
        source: 'landing_page'
      });
      
      // Step 2: Notify WhatsApp Service of the landing page signup
      // The WhatsApp Service will handle sending the welcome message and managing the onboarding flow
      // This follows the architecture where all WhatsApp communication goes through the WhatsApp Service
      const whatsappResponse = await notifyLandingPageSignup(
        profileResponse.data?.id || 'unknown',
        formData
      );
      
      // Track WhatsApp notification status
      const whatsappStatus = whatsappResponse.success ? 'success' : 'failed';
      
      if (whatsappResponse.success) {
        // Track complete signup conversion
        trackSignupCompletion(
          profileResponse.data?.id || 'unknown',
          'landing_page',
          { 
            whatsapp_status: whatsappStatus,
            profile_status: 'PENDING' // Partial profile status as per documentation
          }
        );
        
        // Track completion stage
        trackFormStage('landing_page_signup', FormStage.COMPLETED, {
          whatsapp_status: whatsappStatus,
          profile_id: profileResponse.data?.id
        });
        
        // Navigate to thank you page with form data and instructions to check WhatsApp
        navigate("/thank-you", { 
          state: { 
            formData,
            profileId: profileResponse.data?.id,
            whatsappNotified: true
          } 
        });
      } else {
        // Even if WhatsApp message fails, we can still proceed since the profile was created
        console.warn("WhatsApp instruction message failed to send, but partial profile was created");
        
        // Track partial completion
        trackFormStage('landing_page_signup', FormStage.COMPLETED, {
          whatsapp_status: 'failed',
          partial_completion: true,
          profile_id: profileResponse.data?.id
        });
        
        // Still navigate to thank you page, but with a flag indicating WhatsApp notification failure
        navigate("/thank-you", { 
          state: { 
            formData,
            profileId: profileResponse.data?.id,
            whatsappNotified: false
          } 
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      
      // Track form submission error
      trackFormStage('landing_page_signup', FormStage.FAILED, {
        error_type: 'exception',
        error_message: error instanceof Error ? error.message : 'Unknown error'
      });
      
      // Check if it's an axios error with response data
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status;
        const errorData = error.response.data;
        
        if (statusCode === 400 && errorData?.code === 'VALIDATION_ERROR') {
          // This is a validation error from the API
          const validationErrorTitle = t('cta.form.validation.title');
          const validationErrorDescription = errorData.message || t('cta.form.validation.description');
          
          toast({
            title: validationErrorTitle,
            description: validationErrorDescription,
            variant: "destructive"
          });
        } else if (statusCode >= 500) {
          // This is a server error
          const serverErrorTitle = t('cta.form.serverError.title');
          const serverErrorDescription = t('cta.form.serverError.description');
          
          toast({
            title: serverErrorTitle,
            description: serverErrorDescription,
            variant: "destructive"
          });
        } else {
          // Other API errors
          const errorTitle = t('cta.form.error.title');
          const errorDescription = errorData?.message || t('cta.form.error.description');
          
          toast({
            title: errorTitle,
            description: errorDescription,
            variant: "destructive"
          });
        }
      } else {
        // Generic error handling for non-API errors
        const genericErrorTitle = t('cta.form.error.title');
        const genericErrorDescription = error instanceof Error ? error.message : t('cta.form.error.description');
        
        toast({
          title: genericErrorTitle,
          description: genericErrorDescription,
          variant: "destructive"
        });
      }
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
                    name="name"
                    placeholder={t('cta.form.name.placeholder')}
                    value={formData.name}
                    onChange={handleInputChange}
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
                    name="whatsapp"
                    type="tel"
                    placeholder={t('cta.form.whatsapp.placeholder')}
                    value={formData.whatsapp}
                    onChange={(e) => {
                      // Only allow numeric input and formatting characters
                      const value = e.target.value.replace(/[^0-9()\s-]/g, '');
                      setFormData({...formData, whatsapp: value});
                      trackFieldInteraction('landing_page_signup', 'whatsapp', FieldInteraction.CHANGE);
                      
                      // If this is the first interaction, track form started
                      if (!formStarted.current) {
                        formStarted.current = true;
                        trackFormStage('landing_page_signup', FormStage.STARTED);
                      }
                    }}
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
                    
                    // Track field interaction
                    trackFieldInteraction('landing_page_signup', 'familySize', FieldInteraction.CHANGE);
                    
                    // Validate the changed field
                    validateField('familySize', value);
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