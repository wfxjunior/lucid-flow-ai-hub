
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content: "FeatherBiz transformed our operations. We've increased efficiency by 40% and our team loves the intuitive interface.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Freelance Designer",
    content: "As a solo entrepreneur, FeatherBiz gives me enterprise-level tools without the complexity. Perfect for growing businesses.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Manager",
    content: "The automation features save us hours every week. It's like having an extra team member that never sleeps.",
    rating: 5
  },
  {
    name: "David Thompson",
    role: "Small Business Owner",
    content: "I was skeptical about switching platforms, but FeatherBiz made the transition seamless. Our productivity has never been higher.",
    rating: 5
  }
];

export const LandingTestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Customer Stories
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Loved by businesses everywhere
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            See how companies like yours use FeatherBiz to grow faster and work smarter
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background p-6 sm:p-8 rounded-2xl shadow-sm border">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 fill-current" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</div>
                <div className="text-muted-foreground text-xs sm:text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
