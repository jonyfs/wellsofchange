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
      // Generate PIX QR Code with CNPJ as key
      const cnpjOnly = pixCNPJ.replace(/[^\d]/g, "");
      console.log("Generating QR code for CNPJ:", cnpjOnly);
      
      QRCode.toDataURL(cnpjOnly, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      }).then(url => {
        console.log("QR code generated successfully as data URL");
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
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {t("donate.title") || "Faça sua Doação"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t("donate.subtitle") || "Sua contribuição transforma vidas. Escolha a forma de pagamento abaixo."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* PIX Section */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">{t("donate.pixTitle") || "PIX - QR Code"}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("donate.pixDescription") || "Escaneie o QR Code ou copie o CNPJ"}
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-md border-2 border-primary/20">
                {qrCodeDataURL ? (
                  <img 
                    src={qrCodeDataURL} 
                    alt="PIX QR Code"
                    width={256}
                    height={256}
                    className="block"
                    data-testid="img-pix-qrcode"
                  />
                ) : (
                  <div 
                    className="w-64 h-64 flex items-center justify-center text-muted-foreground"
                    data-testid="qrcode-loading"
                  >
                    Gerando QR Code...
                  </div>
                )}
              </div>
            </div>

            {/* PIX CNPJ */}
            <div className="bg-muted/50 rounded-md p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Hash className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">CNPJ</p>
                    <p className="font-mono font-semibold truncate" data-testid="text-pix-cnpj">
                      {pixCNPJ}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(pixCNPJ, "donate.labelCNPJ")}
                  data-testid="button-copy-cnpj"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t("donate.or") || "ou"}
              </span>
            </div>
          </div>

          {/* Bank Transfer Section */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">
                {t("donate.transferTitle") || "Transferência Bancária"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("donate.transferDescription") || "Use os dados abaixo para transferência"}
              </p>
            </div>

            <div className="bg-muted/50 rounded-md p-4 space-y-3">
              {/* Bank */}
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Banco</p>
                  <p className="font-semibold" data-testid="text-bank-name">{bankDetails.bank}</p>
                </div>
              </div>

              {/* Agency */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <Hash className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Agência</p>
                    <p className="font-mono font-semibold" data-testid="text-bank-agency">
                      {bankDetails.agency}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.agency, "donate.labelAgency")}
                  data-testid="button-copy-agency"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              {/* Account */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <CreditCard className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">{bankDetails.accountType}</p>
                    <p className="font-mono font-semibold" data-testid="text-bank-account">
                      {bankDetails.account}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.account, "donate.labelAccount")}
                  data-testid="button-copy-account"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              {/* CNPJ */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <Hash className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">CNPJ</p>
                    <p className="font-mono font-semibold" data-testid="text-bank-cnpj">
                      {pixCNPJ}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(pixCNPJ, "donate.labelCNPJ")}
                  data-testid="button-copy-bank-cnpj"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Thank you message */}
          <div className="text-center pt-2">
            <p className="text-sm text-muted-foreground">
              {t("donate.thankYou") || "Obrigado por fazer a diferença! Cada contribuição transforma vidas."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
