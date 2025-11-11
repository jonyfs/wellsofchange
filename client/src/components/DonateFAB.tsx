import { useState } from "react";
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

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            onClick={() => setDialogOpen(true)}
            className="fixed bottom-6 right-24 z-50 h-14 w-14 rounded-full shadow-lg"
            data-testid="button-donate-fab"
          >
            <Heart className="w-6 h-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{t("donate")}</p>
        </TooltipContent>
      </Tooltip>

      <DonationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
