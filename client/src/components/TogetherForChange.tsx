import { useState } from "react";
import CTACard from "./CTACard";
import { Heart, Share2, Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import teamImage from "@assets/geetanjal-khanna-8CwoHpZe3qE-unsplash_1762442531910.jpg";
import thirstImage from "@assets/Gemini_Generated_Image_iwxnbdiwxnbdiwxn_1762546643721.png";
import healthImage from "@assets/Gemini_Generated_Image_fb0vhcfb0vhcfb0v_1762546768964.png";
import permanenceImage from "@assets/Gemini_Generated_Image_18n9en18n9en18n9_1762549321923.png";
import prosperityImage from "@assets/Gemini_Generated_Image_zfl4lmzfl4lmzfl4_1762549484377.png";
import dignityImage from "@assets/Gemini_Generated_Image_k16da4k16da4k16d_1762549738344.png";
import realtimeImage from "@assets/Gemini_Generated_Image_z0m031z0m031z0m0_1762553059692.png";
import DonationDialog from "./DonationDialog";

export default function TogetherForChange() {
  const { t } = useLanguage();
  const [donationDialogOpen, setDonationDialogOpen] = useState(false);

  const handleDonate = () => {
    console.log("Donate action triggered");
    setDonationDialogOpen(true);
  };

  const handleShare = () => {
    console.log("Share action triggered");
    if (navigator.share) {
      navigator.share({
        title: "Wells of Change",
        text: t("hero.title"),
        url: window.location.href,
      });
    } else {
      alert("Share: " + window.location.href);
    }
  };

  const handleVolunteer = () => {
    console.log("Volunteer action triggered");
    alert(t("change.volunteerButton") + " - Coming soon!");
  };

  return (
    <section id="join-us" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-6" data-testid="text-change-title">
            {t("change.title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-change-intro">
            <span dangerouslySetInnerHTML={{ __html: t("change.intro") }} />
          </p>
          <div className="rounded-md overflow-hidden mb-8">
            <img
              src={teamImage}
              alt="Wells of Change team with solar panels in Campo Formoso"
              className="w-full h-auto max-h-96 object-cover"
              data-testid="img-volunteers"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <CTACard
            icon={Heart}
            title={t("change.investTitle")}
            description={t("change.investDesc")}
            buttonText={t("change.investButton")}
            onClick={handleDonate}
          />
          <CTACard
            icon={Share2}
            title={t("change.shareTitle")}
            description={t("change.shareDesc")}
            buttonText={t("change.shareButton")}
            onClick={handleShare}
          />
          <CTACard
            icon={Users}
            title={t("change.volunteerTitle")}
            description={t("change.volunteerDesc")}
            buttonText={t("change.volunteerButton")}
            onClick={handleVolunteer}
          />
        </div>

        <div className="bg-primary/5 rounded-md p-8 md:p-12 space-y-6">
          <h3 className="font-display font-semibold text-2xl md:text-3xl text-center mb-8" data-testid="text-transformation-title">
            {t("change.transformationTitle")}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={thirstImage}
                  alt="Clean water - Thirst to Satiety"
                  className="w-full h-full object-cover rounded-md"
                  data-testid="img-transform-1"
                />
              </div>
              <p className="text-lg font-semibold text-center" data-testid="text-transform-1">
                {t("change.transform1")}
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={healthImage}
                  alt="Health - Disease to Health"
                  className="w-full h-full object-cover rounded-md"
                  data-testid="img-transform-2"
                />
              </div>
              <p className="text-lg font-semibold text-center" data-testid="text-transform-2">
                {t("change.transform2")}
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={permanenceImage}
                  alt="Permanence - Migration to Permanence"
                  className="w-full h-full object-cover rounded-md"
                  data-testid="img-transform-3"
                />
              </div>
              <p className="text-lg font-semibold text-center" data-testid="text-transform-3">
                {t("change.transform3")}
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={prosperityImage}
                  alt="Prosperity - Survival to Prosperity"
                  className="w-full h-full object-cover rounded-md"
                  data-testid="img-transform-4"
                />
              </div>
              <p className="text-lg font-semibold text-center" data-testid="text-transform-4">
                {t("change.transform4")}
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={dignityImage}
                  alt="Dignity - Despair to Dignity"
                  className="w-full h-full object-cover rounded-md"
                  data-testid="img-transform-5"
                />
              </div>
              <p className="text-lg font-semibold text-center" data-testid="text-transform-5">
                {t("change.transform5")}
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={realtimeImage}
                  alt="Real-time monitoring"
                  className="w-full h-full object-cover rounded-md"
                  data-testid="img-transform-6"
                />
              </div>
              <p className="text-lg font-semibold text-primary text-center" data-testid="text-transform-6">
                {t("change.transform6")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="font-display font-bold text-3xl md:text-4xl mb-6" data-testid="text-manifesto-title">
            {t("change.manifestoTitle")}
          </h3>
          <p className="text-xl font-semibold text-primary mb-4" data-testid="text-manifesto-tagline">
            {t("change.manifestoTagline")}
          </p>
          <div className="space-y-3 text-base md:text-lg">
            <p data-testid="text-manifesto-1">
              <span dangerouslySetInnerHTML={{ __html: t("change.manifesto1") }} />
            </p>
            <p data-testid="text-manifesto-2">
              <span dangerouslySetInnerHTML={{ __html: t("change.manifesto2") }} />
            </p>
            <p data-testid="text-manifesto-3">
              <span dangerouslySetInnerHTML={{ __html: t("change.manifesto3") }} />
            </p>
          </div>
          <p className="text-lg font-semibold mt-8" data-testid="text-manifesto-closing">
            {t("change.manifestoClosing")}
          </p>
          <p className="text-xl font-bold text-primary" data-testid="text-manifesto-final">
            {t("change.manifestoFinal")}
          </p>
        </div>
      </div>

      <DonationDialog
        open={donationDialogOpen}
        onOpenChange={setDonationDialogOpen}
      />
    </section>
  );
}
