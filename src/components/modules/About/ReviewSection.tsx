import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Marquee from "react-fast-marquee";

export default function ReviewSection() {
  const reviews = [
    {
      name: "Sarah Ahmed",
      role: "Small Business Owner",
      initials: "SA",
      review:
        "OopsiPAY has made sending money to my family abroad so much easier. The fees are transparent and the transfers are instant!",
    },
    {
      name: "Michael Johnson",
      role: "College Student",
      initials: "MJ",
      review:
        "I love how I can track all my expenses in one place. The spending insights help me budget better every month.",
    },
    {
      name: "Lisa Park",
      role: "Marketing Manager",
      initials: "LP",
      review:
        "The security features give me peace of mind. Biometric login and instant notifications keep my money safe.",
    },
    {
      name: "David Chen",
      role: "Freelancer",
      initials: "DC",
      review:
        "The instant payments feature has revolutionized how I receive payments from clients. No more waiting days for transfers!",
    },
    {
      name: "Emma Wilson",
      role: "Entrepreneur",
      initials: "EW",
      review:
        "OopsiPAY's analytics dashboard gives me incredible insights into my business cash flow. It's like having a financial advisor in my pocket.",
    },
    {
      name: "James Rodriguez",
      role: "Teacher",
      initials: "JR",
      review:
        "Setting up automatic savings goals has helped me save more than ever before. The app makes financial planning so simple.",
    },
  ];

  return (
    <section className="py-20">
      <div className=" mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Loved by millions worldwide</h2>
          <p className="text-xl text-muted-foreground">See what our users say about their OopsiPAY experience</p>
        </div>

        <Marquee
          gradient={true}
          // gradientColor="hsl(var(--background))"
          gradientWidth={100}
          speed={50}
          pauseOnHover={true}
          className=""
        >
          {reviews.map((review, index) => (
            <Card key={index} className="border border-border mx-4 w-80 h-80 flex-shrink-0 flex flex-col">
              <CardContent className="pt-6 flex-1 flex flex-col">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-black fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 flex-1">"{review.review}"</p>
                <div className="flex items-center mt-auto">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-3 border">
                    <span className="text-black font-semibold">{review.initials}</span>
                  </div>
                  <div>
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-sm text-muted-foreground">{review.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
