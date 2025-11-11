import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Copy, Building2, Hash, CreditCard } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DonationDialog({ open, onOpenChange }: DonationDialogProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>("");

  const pixCNPJ = "43.933.784/0001-13";
  const bankDetails = {
    bank: "Banco do Brasil",
    agency: "597-5",
    account: "42176-6",
    accountType: "Conta Corrente",
  };

  useEffect(() => {
    if (open) {
      // Generate QR Code for PIX CNPJ key
      const cnpjOnly = pixCNPJ.replace(/[^\d]/g, "");
      console.log("Generating QR code for PIX CNPJ:", cnpjOnly);
      
      QRCode.toDataURL(cnpjOnly, {
        width: 160,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      }).then(url => {
        console.log("QR code generated successfully");
        setQrCodeDataURL(url);
      }).catch(error => {
        console.error("Error generating QR code:", error);
      });
    }
  }, [open, pixCNPJ]);

  const copyToClipboard = (text: string, labelKey: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: t("donate.copied"),
      description: t("donate.copiedDescription").replace("{label}", t(labelKey)),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] sm:max-w-sm p-4 sm:p-6">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-lg sm:text-xl font-bold text-center">
            {t("donate.title")}
          </DialogTitle>
          <DialogDescription className="text-center text-xs sm:text-sm">
            {t("donate.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-1">
          {/* PIX Section */}
          <div className="space-y-2">
            <div className="text-center">
              <h3 className="font-semibold text-sm sm:text-base mb-0.5">{t("donate.pixTitle")}</h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                {t("donate.pixDescription")}
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-2 rounded-md border border-primary/20">
                {qrCodeDataURL ? (
                  <img 
                    src={qrCodeDataURL} 
                    alt="PIX QR Code"
                    width={140}
                    height={140}
                    className="block w-[140px] h-[140px] sm:w-[160px] sm:h-[160px]"
                    data-testid="img-pix-qrcode"
                  />
                ) : (
                  <div 
                    className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] flex items-center justify-center text-muted-foreground text-[10px]"
                    data-testid="qrcode-loading"
                  >
                    Gerando QR Code...
                  </div>
                )}
              </div>
            </div>

            {/* PIX CNPJ */}
            <div className="bg-muted/50 rounded-md p-2">
              <div className="flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <Hash className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">CNPJ</p>
                    <p className="font-mono text-xs sm:text-sm font-semibold truncate" data-testid="text-pix-cnpj">
                      {pixCNPJ}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2"
                  onClick={() => copyToClipboard(pixCNPJ, "donate.labelCNPJ")}
                  data-testid="button-copy-cnpj"
                >
                  <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-[10px] sm:text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t("donate.or") || "ou"}
              </span>
            </div>
          </div>

          {/* Bank Transfer Section */}
          <div className="space-y-2">
            <div className="text-center">
              <h3 className="font-semibold text-sm sm:text-base mb-0.5">
                {t("donate.transferTitle")}
              </h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                {t("donate.transferDescription")}
              </p>
            </div>

            <div className="bg-muted/50 rounded-md p-2 space-y-1.5">
              {/* Bank */}
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Banco</p>
                  <p className="text-xs sm:text-sm font-semibold truncate" data-testid="text-bank-name">{bankDetails.bank}</p>
                </div>
              </div>

              {/* Agency and Account on same line */}
              <div className="grid grid-cols-2 gap-1.5">
                <div className="flex items-center gap-1 min-w-0">
                  <Hash className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Agência</p>
                    <p className="font-mono text-xs sm:text-sm font-semibold truncate" data-testid="text-bank-agency">
                      {bankDetails.agency}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 min-w-0">
                  <CreditCard className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Conta</p>
                    <p className="font-mono text-xs sm:text-sm font-semibold truncate" data-testid="text-bank-account">
                      {bankDetails.account}
                    </p>
                  </div>
                </div>
              </div>

              {/* CNPJ */}
              <div className="flex items-center gap-1.5">
                <Hash className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground">CNPJ</p>
                  <p className="font-mono text-xs sm:text-sm font-semibold truncate" data-testid="text-bank-cnpj">
                    {pixCNPJ}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Thank you message */}
          <div className="text-center pt-0.5">
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {t("donate.thankYou")}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
