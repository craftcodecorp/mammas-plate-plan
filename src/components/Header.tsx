import React from "react";
import { scrollToSignupForm } from "@/lib/scroll-utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/lib/use-language";
import LanguageSwitcher from "@/components/ui/language-switcher";

/**
 * Header component with navigation and theme toggle
 */
const Header = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Handle scroll event to change header appearance
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { name: t('nav.how_it_works'), href: "#how-it-works" },
    { name: t('nav.pricing'), href: "#pricing" },
    { name: t('nav.faq'), href: "#faq" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-md shadow-sm py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-xl font-bold text-foreground">Cardápio Fácil</span>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-full w-9 h-9 bg-background/50 backdrop-blur-sm"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              >
                {theme === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </motion.div>
              <span className="sr-only">{t('theme.toggle')}</span>
            </Button>

            {/* CTA Button */}
            <Button 
              variant="cta" 
              size="sm"
              onClick={scrollToSignupForm}
              className="hidden md:flex"
            >
              {t('nav.free_trial')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
