
import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LandingHeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="flex justify-center items-center py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-100 min-h-[70vh] relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-80 h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-75"></div>
        <div className="absolute -bottom-10 left-32 w-72 h-72 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-150"></div>
        <div className="absolute top-10 right-32 w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-300"></div>
      </div>

      {/* Moving gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse opacity-30"></div>

      <div className="w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl px-8 py-16 md:px-16 md:py-20 flex flex-col items-center relative z-10 border border-white/30">
        {/* Enhanced main headline */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-900 bg-clip-text text-transparent block mb-4 drop-shadow-sm">
              Send Invoices.
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 bg-clip-text text-transparent block mb-4 drop-shadow-sm">
              Create Estimates.
            </span>
            <span className="bg-gradient-to-r from-indigo-600 via-purple-700 to-blue-800 bg-clip-text text-transparent block mb-6 drop-shadow-sm">
              Book Appointments.
            </span>
          </h1>
          
          {/* Enhanced decorative line with gradient */}
          <div className="w-32 h-2 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 mx-auto rounded-full mb-8 shadow-lg"></div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-relaxed drop-shadow-sm">
            Manage your entire service business
            <br className="hidden sm:block" />
            <span className="text-blue-700"> in one place — for free.</span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mt-8 font-medium">
            The complete business toolkit that helps service professionals 
            <span className="font-bold text-blue-700"> streamline operations, create professional documents,</span> and 
            <span className="font-bold text-blue-700"> grow their business</span> — all with enterprise-grade tools.
          </p>
        </div>

        {/* Enhanced CTA Section */}
        <div className="flex flex-col sm:flex-row w-full max-w-lg items-center gap-6 mb-8">
          <Button
            size="lg"
            className="rounded-full bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 hover:from-blue-700 hover:via-indigo-800 hover:to-purple-900 text-white font-bold px-12 h-16 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 w-full sm:flex-1 transform hover:scale-105 hover:-translate-y-1"
            onClick={() => navigate('/auth')}
          >
            Start Free Trial
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-3 border-blue-500 text-blue-800 font-bold px-12 h-16 text-lg transition-all duration-300 flex items-center gap-3 w-full sm:flex-1 hover:bg-blue-50 hover:border-blue-600 hover:shadow-xl transform hover:scale-105"
            onClick={() => {
              const pricingSection = document.getElementById("pricing");
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Play className="w-6 h-6" />
            <span>View Demo</span>
          </Button>
        </div>

        {/* Enhanced trust indicators */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-8 text-base text-gray-600 font-medium">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg animate-pulse"></div>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg animate-pulse delay-75"></div>
            <span>Free forever plan</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full shadow-lg animate-pulse delay-150"></div>
            <span>Setup in 2 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
