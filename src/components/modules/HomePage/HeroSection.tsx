import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Play,
  Sparkles,
  Smartphone,
  Shield,
  Zap,
} from "lucide-react";
import Logo from "@/assets/icons/Logo";

export default function HeroSection() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Seamless Mobile Payments",
      description: "Send and receive money with just a few taps on your phone",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Bank-Level Security",
      description:
        "Your transactions are protected with military-grade encryption",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast Transfers",
      description: "Instant money transfers, 24/7, anywhere in the world",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70"></div>

        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200 rounded-full opacity-20 animate-pulse animation-delay-1000"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.1) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="flex-1 max-w-2xl">
            <div className="flex flex-col items-start gap-8">
              {/* Logo and badge */}
              <div className="flex flex-col items-start gap-6">
                <div className="rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur-sm border border-gray-100">
                  <Logo />
                </div>

                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  The future of digital payments is here
                </div>
              </div>

              {/* Main headline */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                  Turn Every Payment into a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Style Statement
                  </span>
                </h1>

                <p className="text-xl text-gray-600 max-w-2xl">
                  Experience the next generation of digital payments with
                  seamless transactions, enhanced security, and beautiful design
                  that makes managing money a pleasure.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold rounded-xl"
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold rounded-xl"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* Rotating features */}
              <div className="mt-8 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm w-full">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {features[currentFeature].icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {features[currentFeature].title}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {features[currentFeature].description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentFeature
                          ? "w-6 bg-primary"
                          : "w-2 bg-gray-300"
                      }`}
                      onClick={() => setCurrentFeature(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right content - App mockup */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone mockup */}
              <div className="relative w-80 h-[580px]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-[40px] p-1.5 shadow-2xl">
                  <div className="h-full w-full bg-gray-900 rounded-[36px] overflow-hidden p-3">
                    {/* Screen content */}
                    <div className="h-full w-full bg-gradient-to-b from-blue-50 to-purple-50 rounded-[30px] overflow-hidden relative">
                      {/* App interface mockup */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-6">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                            <Logo />
                          </div>
                          <h3 className="font-bold text-gray-900 text-xl mb-2">
                            Wallet App
                          </h3>
                          <p className="text-gray-600">Beautiful interface</p>
                          <p className="text-gray-600">Secure transactions</p>

                          {/* Animated balance */}
                          <div className="mt-8 bg-white rounded-2xl p-4 shadow-lg mx-auto w-48">
                            <div className="text-sm text-gray-500">Balance</div>
                            <div className="text-2xl font-bold text-gray-900">
                              $1,247.89
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Floating elements */}
                      <div className="absolute top-10 left-10 w-8 h-8 bg-blue-500/20 rounded-full animate-float"></div>
                      <div className="absolute bottom-16 right-12 w-6 h-6 bg-purple-500/20 rounded-full animate-float animation-delay-1000"></div>
                      <div className="absolute top-24 right-16 w-4 h-4 bg-blue-500/10 rounded-full animate-float animation-delay-2000"></div>
                    </div>
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-lg z-10"></div>
              </div>

              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">+$50.00</div>
                    <div className="text-xs text-gray-500">Received</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 animate-float animation-delay-1500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Payment</div>
                    <div className="text-xs text-gray-500">Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="text-sm text-gray-500 mb-2">Scroll to explore</div>
          <ChevronDown className="h-6 w-6 text-gray-400 animate-bounce" />
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
