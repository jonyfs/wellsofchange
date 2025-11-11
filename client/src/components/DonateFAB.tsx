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

export default function DonateFAB() {
  const { t } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isNavDonateVisible, setIsNavDonateVisible] = useState(true);

  useEffect(() => {
    const checkNavDonateVisibility = () => {
      const navDonateButton = document.querySelector('[data-testid="button-donate"]');
      
      if (!navDonateButton) {
        // Button doesn't exist, show FAB
        setIsNavDonateVisible(false);
        return;
      }

      // Check if button is visible (not hidden by display:none or visibility:hidden)
      const style = window.getComputedStyle(navDonateButton);
      const isDisplayed = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      
      // Also check if parent containers are visible (for mobile menu)
      let parent = navDonateButton.parentElement;
      let isParentVisible = true;
      while (parent && parent !== document.body) {
        const parentStyle = window.getComputedStyle(parent);
        if (parentStyle.display === 'none' || parentStyle.visibility === 'hidden') {
          isParentVisible = false;
          break;
        }
        parent = parent.parentElement;
      }

      setIsNavDonateVisible(isDisplayed && isParentVisible);
    };

    // Check initially
    checkNavDonateVisibility();

    // Check on resize (for mobile/desktop changes)
    window.addEventListener('resize', checkNavDonateVisibility);
    
    // Check periodically to catch menu open/close
    const interval = setInterval(checkNavDonateVisibility, 500);

    return () => {
      window.removeEventListener('resize', checkNavDonateVisibility);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Show FAB only when navbar donate button is not visible
    setIsVisible(!isNavDonateVisible);
  }, [isNavDonateVisible]);

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
            data-testid="button-donate-fab"
          >
            <Heart className="w-6 h-6" />
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
