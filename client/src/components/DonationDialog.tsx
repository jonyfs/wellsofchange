import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { QrCodePix } from "qrcode-pix";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Building2, Hash, CreditCard, Globe, MapPin, Landmark, User } from "lucide-react";
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
  const [pixPayload, setPixPayload] = useState<string>("");

  const pixCNPJ = "43.933.784/0001-13";
  const bankDetails = {
    bank: "Banco do Brasil",
    agency: "597-5",
    account: "42176-6",
    accountType: "Conta Corrente",
  };

  // What a foreign bank asks for. The beneficiary name is the one registered with the bank, not the
  // trading name: a mismatch is the usual reason an international transfer is returned.
  const internationalDetails = {
    swift: "BRASBRRJBHE",
    iban: "BR3300000000005970000421766C1",
    beneficiary: "Associação Internacional, Poços Mudando as Vidas nas Sociedades",
    beneficiaryAddress:
      "Rua das Laranjeiras, 29, loja 218 · Laranjeiras · Rio de Janeiro, RJ · Brasil · CEP 22240-000",
    bankAddress:
      "SAUN Quadra 5, Lote B · Edifício Banco do Brasil, 15º andar · Brasília, DF · Brasil · CEP 70040-250",
  };

  useEffect(() => {
    if (open) {
      // Generate PIX BR Code using qrcode-pix (browser-compatible)
      const cnpjOnly = pixCNPJ.replace(/[^\d]/g, "");
      console.log("Generating PIX BR Code for CNPJ:", cnpjOnly);
      
      const qrCodePix = QrCodePix({
        version: '01',
        key: cnpjOnly,
        name: 'WELLS OF CHANGE',
        city: 'CAMPO FORMOSO',
        transactionId: 'WOC' + Date.now().toString().slice(-8),
        message: 'Doacao para Wells of Change',
        // No value parameter = variable amount (donor chooses)
      });

      const brCode = qrCodePix.payload();
      setPixPayload(brCode);
      console.log("PIX BR Code generated:", brCode);
      
      // Generate QR Code from BR Code
      QRCode.toDataURL(brCode, {
        width: 160,
        margin: 1,
        errorCorrectionLevel: 'M',
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      }).then(url => {
        console.log("PIX QR code image generated successfully");
        setQrCodeDataURL(url);
      }).catch(error => {
        console.error("Error generating QR code image:", error);
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
          <Tabs defaultValue="brazil" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-9">
              <TabsTrigger value="brazil" className="text-[11px] sm:text-xs" data-testid="tab-donate-brazil">
                🇧🇷 {t("donate.tabBrazil")}
              </TabsTrigger>
              <TabsTrigger value="international" className="text-[11px] sm:text-xs" data-testid="tab-donate-international">
                🌎 {t("donate.tabInternational")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="brazil" className="space-y-3 mt-3">
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
            </TabsContent>

            <TabsContent value="international" className="space-y-2 mt-3">
              <div className="text-center">
                <h3 className="font-semibold text-sm sm:text-base mb-0.5">{t("donate.intlTitle")}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  {t("donate.intlDescription")}
                </p>
              </div>

              <div className="bg-muted/50 rounded-md p-2 space-y-1.5">
                {/* Bank */}
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{t("donate.labelBank")}</p>
                    <p className="text-xs sm:text-sm font-semibold truncate" data-testid="text-intl-bank">
                      {bankDetails.bank}
                    </p>
                  </div>
                </div>

                {/* SWIFT */}
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{t("donate.labelSwift")}</p>
                      <p className="font-mono text-xs sm:text-sm font-semibold truncate" data-testid="text-intl-swift">
                        {internationalDetails.swift}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => copyToClipboard(internationalDetails.swift, "donate.labelSwift")}
                    data-testid="button-copy-swift"
                  >
                    <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </Button>
                </div>

                {/* IBAN */}
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <Hash className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{t("donate.labelIban")}</p>
                      <p className="font-mono text-[11px] sm:text-xs font-semibold break-all" data-testid="text-intl-iban">
                        {internationalDetails.iban}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => copyToClipboard(internationalDetails.iban, "donate.labelIban")}
                    data-testid="button-copy-iban"
                  >
                    <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </Button>
                </div>

                {/* Branch and account */}
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="flex items-center gap-1 min-w-0">
                    <Hash className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{t("donate.labelBranch")}</p>
                      <p className="font-mono text-xs sm:text-sm font-semibold truncate" data-testid="text-intl-branch">
                        {bankDetails.agency}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 min-w-0">
                    <CreditCard className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{t("donate.labelAccount")}</p>
                      <p className="font-mono text-xs sm:text-sm font-semibold truncate" data-testid="text-intl-account">
                        {bankDetails.account}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Beneficiary */}
                <div className="flex items-start justify-between gap-1.5">
                  <div className="flex items-start gap-1.5 flex-1 min-w-0">
                    <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{t("donate.labelBeneficiary")}</p>
                      <p className="text-[11px] sm:text-xs font-semibold leading-snug" data-testid="text-intl-beneficiary">
                        {internationalDetails.beneficiary}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 flex-shrink-0"
                    onClick={() => copyToClipboard(internationalDetails.beneficiary, "donate.labelBeneficiary")}
                    data-testid="button-copy-beneficiary"
                  >
                    <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </Button>
                </div>

                {/* Beneficiary address */}
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      {t("donate.labelBeneficiaryAddress")}
                    </p>
                    <p className="text-[11px] sm:text-xs leading-snug" data-testid="text-intl-beneficiary-address">
                      {internationalDetails.beneficiaryAddress}
                    </p>
                  </div>
                </div>

                {/* Bank address */}
                <div className="flex items-start gap-1.5">
                  <Landmark className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{t("donate.labelBankAddress")}</p>
                    <p className="text-[11px] sm:text-xs leading-snug" data-testid="text-intl-bank-address">
                      {internationalDetails.bankAddress}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed" data-testid="text-intl-fee">
                {t("donate.intlFee")}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed" data-testid="text-intl-help">
                {t("donate.intlHelp")}
              </p>
            </TabsContent>
          </Tabs>

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
