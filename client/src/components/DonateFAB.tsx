import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import DonationDialog from "./DonationDialog";

/**
 * A floating donate button, shown only while the one in the navigation bar is out of sight.
 *
 * Visibility follows the navigation button's own position, watched by the browser and reported when
 * it changes. The previous version asked the same question on a 500ms timer, reading computed
 * styles and walking the parent chain, for as long as the page stayed open. That forced layout on a
 * timer and kept a phone busy while its owner was only reading.
 */
export default function DonateFAB() {
  const { t } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const navDonateButton = document.querySelector('[data-testid="button-donate"]');

    // No button in the navigation means nothing can hide, so the floating one is the only way to
    // donate and stays.
    if (!navDonateButton) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(navDonateButton);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            onClick={() => setDialogOpen(true)}
            className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 bg-[hsl(var(--golden))] hover:bg-[hsl(var(--golden))] text-[hsl(var(--golden-foreground))] border border-[hsl(var(--golden-border))] hover-elevate active-elevate-2 no-default-hover-elevate no-default-active-elevate ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
            }`}
            aria-label={t("nav.donate")}
            aria-hidden={!isVisible}
            tabIndex={isVisible ? 0 : -1}
            data-testid="button-donate-fab"
          >
            <Heart className="w-6 h-6" aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{t("nav.donate")}</p>
        </TooltipContent>
      </Tooltip>

      <DonationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
