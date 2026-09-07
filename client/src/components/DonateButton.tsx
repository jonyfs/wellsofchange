import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

/**
 * The donate button, in the golden accent that belongs to nothing else on the site.
 *
 * It exists because the same 200-character list of classes was written out three times, in the
 * desktop navigation, the mobile menu and the floating button, and three copies of a colour are
 * three chances for one of them to drift.
 *
 * The `no-default-*` classes turn off the elevate system's own hover and active treatment, because
 * this button supplies its own.
 */
export default function DonateButton({
  onClick,
  className,
  testId,
}: {
  onClick: () => void;
  className?: string;
  testId: string;
}) {
  const { t } = useLanguage();

  return (
    <Button
      onClick={onClick}
      className={cn(
        "bg-[hsl(var(--golden))] hover:bg-[hsl(var(--golden))] text-[hsl(var(--golden-foreground))]",
        "border border-[hsl(var(--golden-border))] font-semibold shadow-md",
        "hover-elevate active-elevate-2 no-default-hover-elevate no-default-active-elevate",
        className
      )}
      data-testid={testId}
    >
      {t("nav.donate")}
    </Button>
  );
}
