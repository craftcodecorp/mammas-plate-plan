import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import from next-themes package instead of local theme provider
import { useTheme as useNextTheme } from "next-themes";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/use-language";

/**
 * ThemeToggle component for switching between light and dark mode
 * 
 * This component uses the theme provider context to toggle between themes
 * and includes smooth animations for a better user experience.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useNextTheme();
  const { t } = useLanguage();

  return (
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
      <span className="sr-only">{t('ui.accessibility.sr.toggle_theme')}</span>
    </Button>
  );
}

export default ThemeToggle;
