import { Moon, Sun, Languages } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function ThemeLangToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, lang, toggleLang } = useApp();
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={toggleLang}
        className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        aria-label="Toggle language"
      >
        <Languages className="w-4 h-4" />
        <span className="text-xs font-semibold">{lang === "en" ? "ع" : "EN"}</span>
      </button>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </div>
  );
}
