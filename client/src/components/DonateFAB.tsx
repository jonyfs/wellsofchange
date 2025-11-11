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

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB when scrolled down more than 100px (navbar is hidden/minimized)
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            onClick={() => setDialogOpen(true)}
            className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
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
