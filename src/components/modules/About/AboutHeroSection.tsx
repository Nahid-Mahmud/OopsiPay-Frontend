import HoverButton from "@/components/HoverButton";
import MatrixText from "@/components/kokonutui/matrix-text";
import { Badge } from "@/components/ui/badge";
import { Globe, Shield, Wallet, Zap } from "lucide-react";

export default function AboutHeroSection() {
  return (
    <section className="">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center">
          <div className="flex items-center justify-center ">
            <div className="p-3 bg-accent/10 rounded-2xl mr-4">
              <Wallet className="h-12 w-12 text-black" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold ">
              <MatrixText text="OopsiPAY" className="min-h-0 mb-0 p-0" />
            </h1>
          </div>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Your money, simplified. Send, receive, and manage your finances with the security and ease you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <HoverButton />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <Shield className="h-3 w-3 mr-1" />
              Bank-level security
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <Zap className="h-3 w-3 mr-1" />
              Instant transfers
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <Globe className="h-3 w-3 mr-1" />
              Global reach
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
