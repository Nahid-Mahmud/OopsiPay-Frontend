import AboutHeroSection from "@/components/modules/About/AboutHeroSection";
import FeaturesSection from "@/components/modules/About/FeaturesSection";
import GetStartedSection from "@/components/modules/About/GetStartedSection";
import ReviewSection from "@/components/modules/About/ReviewSection";

export default function About() {
  return (
    <div>
      <div className="bg-background pb-20">
        <AboutHeroSection />
      </div>
      <div className="bg-secondary pb-20">
        <FeaturesSection />
      </div>
      <div className=" bg-background">
        <GetStartedSection />
      </div>
      <div className="pb-20 bg-secondary">
        <ReviewSection />
      </div>
    </div>
  );
}
