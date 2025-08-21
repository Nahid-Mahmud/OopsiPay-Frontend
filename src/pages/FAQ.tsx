import ContactSupportSection from "@/components/modules/FAQ/ContactSupportSection";
import FAQHeroSection from "@/components/modules/FAQ/FAQHeroSection";
import FAQSection from "@/components/modules/FAQ/FAQSection";

export default function FAQ() {
  return (
    <div>
      <div className="bg-background pb-20">
        <FAQHeroSection />
      </div>
      <div className="bg-secondary pb-20">
        <FAQSection />
      </div>
      <div className="bg-background pb-20">
        <ContactSupportSection />
      </div>
    </div>
  );
}
