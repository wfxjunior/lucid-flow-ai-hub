
import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// Import testimonial photos
import sarahJohnsonPhoto from "@/assets/testimonials/sarah-johnson.jpg";
import michaelChenPhoto from "@/assets/testimonials/michael-chen.jpg";
import elenaRodriguezPhoto from "@/assets/testimonials/elena-rodriguez.jpg";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, Johnson & Associates",
    content: "When I first opened FeatherBiz, I instantly got the feeling this was the next generation of business management. The AI features and seamless workflow have transformed how we operate.",
    rating: 5,
    avatar: sarahJohnsonPhoto
  },
  {
    name: "Michael Chen",
    role: "Founder, TechStart Solutions",
    content: "FeatherBiz has completely revolutionized our business operations. The automation features save us hours every day, and the analytics provide insights we never had before.",
    rating: 5,
    avatar: michaelChenPhoto
  },
  {
    name: "Elena Rodriguez",
    role: "Operations Manager, GrowthCorp",
    content: "The most intuitive business platform I've ever used. Everything just works seamlessly together - from project management to financial tracking.",
    rating: 5,
    avatar: elenaRodriguezPhoto
  }
];

export const LandingTestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const section = document.getElementById('testimonials-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-16 sm:py-24 lg:py-32 bg-muted/20">
      <div id="testimonials-section" className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Featured Testimonial */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-foreground text-foreground" />
              ))}
            </div>
            
            <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-foreground mb-8 leading-relaxed px-4">
              "{currentTestimonial.content}"
            </blockquote>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-border/20"
              />
              <div className="text-center sm:text-left">
                <div className="font-semibold text-foreground">{currentTestimonial.name}</div>
                <div className="text-muted-foreground text-sm">{currentTestimonial.role}</div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full border border-border/50 hover:border-border hover:bg-muted/50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-foreground' : 'bg-muted-foreground/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full border border-border/50 hover:border-border hover:bg-muted/50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Trusted by section */}
        <div className={`mt-16 pt-16 border-t border-border/20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm text-muted-foreground mb-8 font-medium">
            Trusted by thousands of businesses worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-60">
            <div className="text-base sm:text-lg font-bold text-muted-foreground">TechCorp</div>
            <div className="text-base sm:text-lg font-bold text-muted-foreground">GrowthCo</div>
            <div className="text-base sm:text-lg font-bold text-muted-foreground">InnovateLab</div>
            <div className="text-base sm:text-lg font-bold text-muted-foreground">ScaleUp</div>
          </div>
        </div>
      </div>
    </section>
  );
};
