import { MessageCircle, Mail, Instagram, Heart } from "lucide-react";
import { scrollToSignupForm } from "@/lib/scroll-utils";
import { useLanguage } from "@/lib/use-language";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t('ui.brand')}</h3>
            <p className="text-white/80 text-sm">
              {t('footer.brand.description')}
            </p>
            <div className="flex gap-4">
              <MessageCircle className="w-5 h-5 text-whatsapp cursor-pointer hover:text-whatsapp/80" />
              <Mail className="w-5 h-5 text-white/80 cursor-pointer hover:text-white" />
              <Instagram className="w-5 h-5 text-white/80 cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.product')}</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#how-it-works" className="hover:text-white">{t('footer.how_it_works')}</a></li>
              <li><a href="#pricing" className="hover:text-white">{t('footer.pricing')}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSignupForm(); }} className="hover:text-white">{t('footer.free_trial')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.faq')}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.support')}</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white">{t('footer.help_center')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.contact')}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSignupForm(); }} className="hover:text-white">{t('footer.whatsapp')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.feedback')}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="/terms-of-use" className="hover:text-white">{t('footer.terms')}</a></li>
              <li><a href="/privacy-policy" className="hover:text-white">{t('footer.privacy')}</a></li>
              <li><a href="/terms-of-use#cookies" className="hover:text-white">{t('footer.cookies')}</a></li>
              <li><a href="/privacy-policy#lgpd" className="hover:text-white">{t('footer.lgpd')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-sm flex items-center justify-center gap-2">
              {t('footer.copyright')} <Heart className="w-4 h-4 text-red-400" /> {t('footer.copyright.for')}
            </p>
            <div className="text-white/80 text-sm text-center md:text-right">
              <p><strong>{t('footer.company')}</strong> CraftCode</p>
              <p><strong>{t('footer.cnpj')}</strong> 32.279.133/0001-35</p>
              <p>{t('footer.solution')}</p>
              <a href="https://craftcode.com.br" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">🔗 craftcode.com.br</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;