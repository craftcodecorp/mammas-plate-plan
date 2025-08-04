import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/use-language";
import { Language } from "@/lib/language-utils";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * LanguageSwitcher component for switching between available languages
 * 
 * This component uses the language context to toggle between languages
 * and includes smooth animations for a better user experience.
 */
export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "pt-BR", label: t("language.pt"), flag: "🇧🇷" },
    { code: "en-US", label: t("language.en"), flag: "🇺🇸" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-9 h-9 bg-background/50 backdrop-blur-sm"
        >
          <motion.div
            whileHover={{ rotate: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Globe className="h-4 w-4" />
          </motion.div>
          <span className="sr-only">{t("language.toggle")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2 ${
              language === lang.code ? "bg-muted" : ""
            }`}
          >
            <span className="text-base mr-1">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
