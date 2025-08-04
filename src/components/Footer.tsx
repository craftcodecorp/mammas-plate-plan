import { MessageCircle, Mail, Instagram, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Meal Planner</h3>
            <p className="text-white/80 text-sm">
              Planejamento de refeições personalizadas para famílias brasileiras, 
              direto no seu WhatsApp.
            </p>
            <div className="flex gap-4">
              <MessageCircle className="w-5 h-5 text-whatsapp cursor-pointer hover:text-whatsapp/80" />
              <Mail className="w-5 h-5 text-white/80 cursor-pointer hover:text-white" />
              <Instagram className="w-5 h-5 text-white/80 cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold">Produto</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white">Como funciona</a></li>
              <li><a href="#" className="hover:text-white">Preços</a></li>
              <li><a href="#" className="hover:text-white">Teste grátis</a></li>
              <li><a href="#" className="hover:text-white">Perguntas frequentes</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Suporte</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white">Central de ajuda</a></li>
              <li><a href="#" className="hover:text-white">Contato</a></li>
              <li><a href="#" className="hover:text-white">WhatsApp</a></li>
              <li><a href="#" className="hover:text-white">Feedback</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white">Termos de uso</a></li>
              <li><a href="#" className="hover:text-white">Política de privacidade</a></li>
              <li><a href="#" className="hover:text-white">Cookies</a></li>
              <li><a href="#" className="hover:text-white">LGPD</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/80 text-sm flex items-center justify-center gap-2">
            © 2024 Meal Planner. Feito com <Heart className="w-4 h-4 text-red-400" /> para famílias brasileiras.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;