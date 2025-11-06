import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function DonateFAB() {
  const { t } = useLanguage();

  const scrollToDonate = () => {
    const element = document.getElementById("mudanca");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      size="icon"
      onClick={scrollToDonate}
      className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full shadow-lg"
      data-testid="button-donate-fab"
    >
      <Heart className="w-6 h-6" />
    </Button>
  );
}
