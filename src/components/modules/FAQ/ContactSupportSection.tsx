import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function ContactSupportSection() {
  return (
    <section className="pt-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you 24/7. Choose your preferred way to
            get in touch.
          </p>
        </div>

        <Link to="/contact" className="flex items-center justify-center mt-4">
          <Button variant={"outline"}>Contact Support</Button>
        </Link>
      </div>
    </section>
  );
}
