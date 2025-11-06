import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage, Language } from "@/lib/i18n";

export default function LanguageFAB() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "pt-BR", label: "Português", flag: "🇧🇷" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
      {isOpen && (
        <div className="flex flex-col gap-2 bg-card border rounded-md shadow-lg p-2 animate-in fade-in slide-in-from-bottom-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={language === lang.code ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className="justify-start min-w-[140px]"
              data-testid={`button-lang-${lang.code}`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.label}
            </Button>
          ))}
        </div>
      )}

      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full shadow-lg"
        data-testid="button-language-fab"
      >
        <div className="flex flex-col items-center">
          <Languages className="w-5 h-5" />
          {currentLanguage && (
            <span className="text-xs mt-0.5">{currentLanguage.flag}</span>
          )}
        </div>
      </Button>
    </div>
  );
}
