import MatrixText from "@/components/kokonutui/matrix-text";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, MessageCircle, Search } from "lucide-react";

export default function FAQHeroSection() {
  return (
    <section className=" pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-accent/10 rounded-2xl mr-4">
              <HelpCircle className="h-12 w-12 text-black" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold">
              <MatrixText text="FAQ" className="min-h-0 mb-0 p-0" />
            </h1>
          </div>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Find answers to the most commonly asked questions about OopsiPAY. Get help with your account, transactions,
            and security features.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <Search className="h-3 w-3 mr-1" />
              Quick answers
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <MessageCircle className="h-3 w-3 mr-1" />
              24/7 support
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <HelpCircle className="h-3 w-3 mr-1" />
              Expert guidance
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
