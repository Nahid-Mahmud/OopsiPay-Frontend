import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

export default function FeaturesAnimation() {
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { bg: "bg-gradient-to-br from-primary to-secondary", title: "SEND MONEY", subtitle: "IN REAL TIME." },
    { bg: "bg-gradient-to-br from-secondary to-primary", title: "RECEIVE MONEY", subtitle: "INSTANTLY." },
    {
      bg: "bg-gradient-to-br from-primary via-secondary to-primary",
      title: "TRACK PAYMENTS",
      subtitle: "IN REAL TIME.",
    },
    {
      bg: "bg-gradient-to-br from-secondary via-primary to-secondary",
      title: "SECURE WALLET",
      subtitle: "ALWAYS SAFE.",
    },
  ];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const textSections = document.querySelectorAll(".scroll-text-section");

    textSections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",

        onEnter: () => {
          console.log(`[v0] Entering section ${index}`);
          setCurrentImageIndex(index);
          // Animate image change with scale effect
          if (leftImageRef.current) {
            gsap.fromTo(
              leftImageRef.current,
              { scale: 1 },
              {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
              }
            );
          }
        },
        onEnterBack: () => {
          console.log(`[v0] Entering back section ${index}`);
          setCurrentImageIndex(index);
          if (leftImageRef.current) {
            gsap.fromTo(
              leftImageRef.current,
              { scale: 1 },
              {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
              }
            );
          }
        },
        markers: false, // Set to true for debugging
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative">
      <div className="min-h-screen overflow-x-hidden border-red-600 border">
        <div className="min-h-[400vh] absolute inset-0 flex">
          {/* Scrolling left side with text content */}
          <div ref={rightContentRef} className="w-1/2 relative z-20">
            {/* Section 1 */}
            <div className="scroll-text-section min-h-screen flex items-center justify-center bg-white p-12">
              <div className="max-w-lg space-y-6">
                <h3 className="font-space-grotesk font-bold text-4xl text-black">Send Money Instantly</h3>
                <p className="font-dm-sans text-lg text-black/80 leading-relaxed">
                  Transfer money to friends and family in real-time. No waiting, no delays. Just instant transfers that
                  work across all European banks.
                </p>
                <ul className="space-y-3 font-dm-sans text-black/70">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>10 second transfers</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>24/7 availability</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>No hidden fees</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div className="scroll-text-section min-h-screen flex items-center justify-center bg-gray-50 p-12">
              <div className="max-w-lg space-y-6">
                <h3 className="font-space-grotesk font-bold text-4xl text-black">Receive Payments</h3>
                <p className="font-dm-sans text-lg text-black/80 leading-relaxed">
                  Get paid instantly from anyone, anywhere in Europe. Your money arrives in seconds, not days.
                </p>
                <ul className="space-y-3 font-dm-sans text-black/70">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Instant notifications</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Automatic receipts</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Transaction history</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="scroll-text-section min-h-screen flex items-center justify-center bg-white p-12">
              <div className="max-w-lg space-y-6">
                <h3 className="font-space-grotesk font-bold text-4xl text-black">Track Everything</h3>
                <p className="font-dm-sans text-lg text-black/80 leading-relaxed">
                  Monitor all your transactions in real-time. Complete transparency with every payment you make or
                  receive.
                </p>
                <ul className="space-y-3 font-dm-sans text-black/70">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Real-time tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Detailed analytics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Export statements</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div className="scroll-text-section min-h-screen flex items-center justify-center bg-gray-50 p-12">
              <div className="max-w-lg space-y-6">
                <h3 className="font-space-grotesk font-bold text-4xl text-black">Secure & Safe</h3>
                <p className="font-dm-sans text-lg text-black/80 leading-relaxed">
                  Your money is protected by bank-level security. Made in Europe with the highest privacy standards.
                </p>
                <ul className="space-y-3 font-dm-sans text-black/70">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>256-bit encryption</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>GDPR compliant</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>European regulations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="sticky right-0 top-0 w-1/2 h-screen z-10 overflow-hidden">
            <div
              ref={leftImageRef}
              className={`w-full h-full transition-all duration-700 ease-out ${images[currentImageIndex].bg} flex items-center justify-center`}
            >
              <div className="text-center space-y-4">
                <h2 className="font-space-grotesk font-bold text-6xl text-white">{images[currentImageIndex].title}</h2>
                <p className="font-space-grotesk font-bold text-4xl text-secondary">
                  {images[currentImageIndex].subtitle}
                </p>
                {/* Phone mockup that changes with scroll */}
                <div className="relative w-64 h-[480px] bg-gradient-to-b from-white/20 to-white/10 rounded-[2.5rem] p-3 backdrop-blur-sm border border-white/20 mx-auto mt-8">
                  <div className="w-full h-full bg-white rounded-[2rem] relative overflow-hidden">
                    <div className="absolute top-4 left-4 right-4">
                      <div className="flex justify-between items-center text-black">
                        <span className="font-dm-sans font-medium text-sm">9:41</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-1.5 bg-black/60 rounded-sm"></div>
                          <div className="w-3 h-1.5 bg-black/60 rounded-sm"></div>
                          <div className="w-4 h-2 bg-black/60 rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-16 left-4 right-4 bottom-4 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div
                          className={`w-24 h-24 rounded-full mx-auto ${
                            currentImageIndex === 0
                              ? "bg-primary"
                              : currentImageIndex === 1
                              ? "bg-secondary"
                              : currentImageIndex === 2
                              ? "bg-primary"
                              : "bg-secondary"
                          } animate-pulse flex items-center justify-center`}
                        >
                          <div className="w-8 h-8 bg-white rounded-full"></div>
                        </div>
                        <div className="text-black font-dm-sans text-sm">
                          {currentImageIndex === 0 && "Sending €25..."}
                          {currentImageIndex === 1 && "Received €50!"}
                          {currentImageIndex === 2 && "Transaction #1234"}
                          {currentImageIndex === 3 && "Secure & Protected"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
