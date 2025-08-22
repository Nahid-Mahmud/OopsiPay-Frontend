import HoverButton from "@/components/HoverButton";
import { Card } from "@/components/ui/card";

export default function HeroSection() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-violet-100 to-primary animate-gradient" />

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-4 h-4 bg-white rounded-full animate-float"
          style={{
            left: "10%",
            top: "20%",
          }}
        />
        <div
          className="absolute w-6 h-6 bg-white rounded-full animate-float-reverse"
          style={{
            right: "15%",
            top: "30%",
          }}
        />
        <div
          className="absolute w-3 h-3 bg-white rounded-full animate-float"
          style={{
            left: "80%",
            bottom: "40%",
          }}
        />
        <div
          className="absolute w-8 h-8 bg-white rounded-full animate-float-reverse"
          style={{
            left: "5%",
            bottom: "20%",
          }}
        />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="font-space-grotesk font-bold md:text-5xl text-3xl lg:text-7xl text-black leading-tight">
                SEND MONEY
                <br />
                <span className="text-primary">IN REAL TIME.</span>
              </h1>
              <p className="font-dm-sans text-xl text-black/80 max-w-lg">
                Money transfers between friends in 10 seconds or less. It's simple, optimized and Made in Bangladesh.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-dm-sans font-medium text-lg px-8 py-4 animate-pulse-glow"
              >
                Download App
              </Button> */}
              <HoverButton />
            </div>
          </div>

          {/* Right content - Phone mockup */}
          <div className="relative flex justify-center lg:justify-end ">
            <div className="relative animate-float ">
              {/* Phone mockup */}
              <div className="relative w-80 h-[600px] bg-gradient-to-b from-white/20 to-white/10 rounded-[3rem] p-4 backdrop-blur-sm border border-white/20">
                <div className="w-full h-full bg-green-50 rounded-[2.5rem] relative overflow-hidden ">
                  {/* Phone screen content */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex justify-between items-center text-black">
                      <span className="font-dm-sans font-medium">9:41</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-2 bg-black/60 rounded-sm"></div>
                        <div className="w-4 h-2 bg-black/60 rounded-sm"></div>
                        <div className="w-6 h-3 bg-black/60 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* App content */}
                  <div className="absolute top-20 left-4 right-4 bottom-4 ">
                    <div className="text-center space-y-6">
                      {/* Rocket illustration placeholder */}
                      <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-float-reverse">
                        <div className="w-16 h-16 bg-primary rounded-full"></div>
                      </div>

                      <div className="space-y-2">
                        <h2 className="font-space-grotesk font-bold text-2xl text-black">NICE!</h2>
                        <p className="font-dm-sans text-black/80">
                          YOU JUST SENT
                          <br />
                          €15 TO ALANA.
                        </p>
                      </div>

                      <div className="font-space-grotesk font-bold text-4xl text-black">OopsiPAY</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating UI elements around phone */}
              <Card className="absolute -top-4 -left-8 p-3 bg-white/90 backdrop-blur-sm animate-float-reverse">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="font-dm-sans text-sm font-medium">€25.00</span>
                </div>
              </Card>

              <Card className="absolute -bottom-8 -right-6 p-3 bg-white/90 backdrop-blur-sm animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span className="font-dm-sans text-sm font-medium">Sent</span>
                </div>
              </Card>

              <Card className="absolute top-1/2 -right-12 p-3 bg-white/90 backdrop-blur-sm animate-float-reverse">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="font-dm-sans text-sm font-medium">Instant</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
