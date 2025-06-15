
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const LandingCTASection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartFreeTrial = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      const professionalPlan = {
        id: "professional",
        name: "Professional",
        stripePrice: 2900,
        recurring: true
      };
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceAmount: professionalPlan.stripePrice,
          planName: professionalPlan.name,
          planId: professionalPlan.id,
          recurring: professionalPlan.recurring,
          trialPeriodDays: 7,
          annualBilling: false
        }
      });
      if (error) throw error;
      if (data?.url) window.open(data.url, '_blank');
      else throw new Error('No checkout URL received');
    } catch (error) {
      console.error('Error starting free trial:', error);
      toast({
        title: "Error",
        description: "There was an error starting your free trial. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleTryItFree = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" })
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6">
          Ready to grow your business?
        </h2>
        <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 sm:mb-10 max-w-2xl mx-auto">
          Join thousands of businesses already using FeatherBiz to streamline operations and boost productivity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={handleStartFreeTrial}
            size="lg"
            className="bg-background text-primary hover:bg-background/90 transition-all duration-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
          >
            Try it Free
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <Button 
            variant="outline"
            size="lg"
            onClick={handleTryItFree}
            className="border-2 border-primary-foreground/20 text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary transition-all duration-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
          >
            Get Free Demo
          </Button>
        </div>
        <p className="text-primary-foreground/60 text-sm mt-4 sm:mt-6">
          No credit card required • 7-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
};
