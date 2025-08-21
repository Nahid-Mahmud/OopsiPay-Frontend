import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function ReviewSection() {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4 ">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Loved by millions worldwide</h2>
          <p className="text-xl text-muted-foreground">See what our users say about their SwiftPay experience</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border border-border">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-black fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "SwiftPay has made sending money to my family abroad so much easier. The fees are transparent and the
                transfers are instant!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-black font-semibold">SA</span>
                </div>
                <div>
                  <div className="font-semibold">Sarah Ahmed</div>
                  <div className="text-sm text-muted-foreground">Small Business Owner</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-black fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "I love how I can track all my expenses in one place. The spending insights help me budget better every
                month."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-black font-semibold">MJ</span>
                </div>
                <div>
                  <div className="font-semibold">Michael Johnson</div>
                  <div className="text-sm text-muted-foreground">College Student</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-black fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "The security features give me peace of mind. Biometric login and instant notifications keep my money
                safe."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-black font-semibold">LP</span>
                </div>
                <div>
                  <div className="font-semibold">Lisa Park</div>
                  <div className="text-sm text-muted-foreground">Marketing Manager</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
