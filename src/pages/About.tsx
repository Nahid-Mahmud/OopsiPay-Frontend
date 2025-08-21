import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Wallet,
  ArrowRightLeft,
  Send,
  Star,
  Zap,
  Globe,
  Smartphone,
  CreditCard,
  TrendingUp,
  Lock,
} from "lucide-react";
import HoverButton from "@/components/HoverButton";

export default function About() {
  return (
    <div className="relative">
      <section className="">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="p-3 bg-accent/10 rounded-2xl mr-4">
                <Wallet className="h-12 w-12 text-black" />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground">
                Oopsi<span className="text-black">Pay</span>
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

      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Everything you need in one wallet</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From daily transactions to international transfers, SwiftPay makes managing your money effortless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-accent/20">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Send className="h-6 w-6 text-black" />
                  </div>
                  <CardTitle className="text-lg">Send Money</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Send money to friends and family instantly. Just enter their phone number or email address.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-accent/20">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <CreditCard className="h-6 w-6 text-black" />
                  </div>
                  <CardTitle className="text-lg">Add Money</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Top up your wallet from your bank account, debit card, or credit card in seconds.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-accent/20">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <ArrowRightLeft className="h-6 w-6 text-black" />
                  </div>
                  <CardTitle className="text-lg">Withdraw Funds</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Transfer money back to your bank account or withdraw cash at thousands of partner locations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-accent/20">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-black" />
                  </div>
                  <CardTitle className="text-lg">Track Spending</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get insights into your spending habits with detailed transaction history and smart categorization.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-accent/20">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Lock className="h-6 w-6 text-black" />
                  </div>
                  <CardTitle className="text-lg">Secure & Private</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Your data is encrypted and protected with biometric authentication and fraud monitoring.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-border hover:shadow-lg transition-all duration-300 hover:border-accent/20">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Smartphone className="h-6 w-6 text-black" />
                  </div>
                  <CardTitle className="text-lg">Mobile First</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Designed for your smartphone with offline capabilities and seamless synchronization.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Get started in minutes</h2>
            <p className="text-xl text-muted-foreground">Join millions who trust SwiftPay with their money</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-black-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Download & Sign Up</h3>
              <p className="text-muted-foreground">
                Download the app and create your account with just your phone number. Verification takes seconds.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-black-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Add Your Details</h3>
              <p className="text-muted-foreground">
                Complete your profile and link your bank account or card for seamless money management.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-black-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Start Transacting</h3>
              <p className="text-muted-foreground">
                Send money, pay bills, and manage your finances with confidence. Your digital wallet is ready!
              </p>
            </div>
          </div>
        </div>
      </section>

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
                  "I love how I can track all my expenses in one place. The spending insights help me budget better
                  every month."
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

      <section className="py-20 ">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-black-foreground mb-6">
            Ready to simplify your finances?
          </h2>
          <p className="text-xl text-black-foreground/90 mb-8 max-w-2xl mx-auto">
            Join millions who trust SwiftPay for secure, instant, and hassle-free money management. Download now and get
            started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
              Download for iOS
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent-foreground text-black-foreground hover:bg-accent-foreground hover:text-black px-8 py-4 text-lg bg-transparent"
            >
              Download for Android
            </Button>
          </div>
          <p className="text-black-foreground/70 mt-6 text-sm">
            Free to download • No monthly fees • Available worldwide
          </p>
        </div>
      </section>
    </div>
  );
}
