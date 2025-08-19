
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

export const LandingCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, hsl(var(--primary) / 0.08) 0%, transparent 50%)
          `
        }}
      />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl mb-8"
          >
            <Zap className="w-8 h-8 text-primary" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6"
          >
            Ready to transform{" "}
            <span className="text-primary">your business?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Join thousands of businesses already using FeatherBiz to streamline operations, boost productivity, and drive growth.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="font-medium">Enterprise-grade security</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="font-medium">5-minute setup</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="font-medium">Free forever plan available</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Button
              onClick={() => navigate('/signup?trial=7d&source=cta')}
              size="xl"
              className="group h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
            >
              Start your free trial
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Trust Signal */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground mt-6"
          >
            No credit card required • Cancel anytime • 30-day money-back guarantee
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
