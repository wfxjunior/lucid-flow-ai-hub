
import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LandingHeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="flex justify-center items-center py-12 px-3 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-[50vh] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-150"></div>
      </div>

      <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl px-6 py-12 md:px-12 md:py-16 flex flex-col items-center relative z-10 border border-white/20">
        {/* Main headline with gradient */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent block mb-2">
              Create Professional Invoices & Estimates
            </span>
            <span className="text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold block">
              Book Appointments with Ease
            </span>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The complete business toolkit that helps service professionals 
            <span className="font-semibold text-blue-700"> manage clients, create estimates, send invoices,</span> and 
            <span className="font-semibold text-blue-700"> book appointments</span> — all in one powerful platform.
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row w-full max-w-md items-center gap-4">
          <Button
            size="lg"
            className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold px-8 h-14 text-base shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:flex-1 transform hover:scale-105"
            onClick={() => navigate('/auth')}
          >
            Start Free Trial
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-2 border-blue-400 text-blue-800 font-semibold px-8 h-14 text-base transition-all duration-300 flex items-center gap-2 w-full sm:flex-1 hover:bg-blue-50 hover:border-blue-500"
            onClick={() => {
              const pricingSection = document.getElementById("pricing");
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Play className="w-5 h-5" />
            <span>View Demo</span>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Free forever plan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Setup in 2 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
