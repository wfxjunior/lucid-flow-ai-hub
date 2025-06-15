
import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LandingHeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="flex justify-center items-center py-10 px-3 bg-muted/60 min-h-[45vh]">
      <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl px-6 py-8 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-foreground" style={{lineHeight:"1.14"}}>
          Grow your business<br />
          with <span className="text-blue-700 font-extrabold">FeatherBiz</span>
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-6">
          The all-in-one platform that helps you manage clients, projects, and payments. Start your free trial and see results in 24 hours.
        </p>
        <div className="flex flex-col w-full items-center gap-4">
          <Button
            size="lg"
            className="rounded-full bg-blue-700 hover:bg-blue-800 text-white font-medium px-8 h-12 text-base shadow transition-all duration-200 w-full"
            onClick={() => navigate('/auth')}
          >
            Start Free Trial
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-2 border-blue-400 text-blue-800 font-medium px-8 h-12 text-base transition-all duration-200 flex items-center gap-2 w-full"
            onClick={() => {
              const pricingSection = document.getElementById("pricing");
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Play className="w-5 h-5 mr-1" />
            <span>See Plans</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
