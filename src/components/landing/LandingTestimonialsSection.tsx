
import React, { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content: "FeatherBiz transformed our operations. We've increased efficiency by 40% and our team loves the intuitive interface.",
    rating: 5,
    avatar: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.png"
  },
  {
    name: "Michael Chen",
    role: "Freelance Designer",
    content: "As a solo entrepreneur, FeatherBiz gives me enterprise-level tools without the complexity. Perfect for growing businesses.",
    rating: 5,
    avatar: "/lovable-uploads/photo-1527576539890-dfa815648363.png"
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Manager",
    content: "The automation features save us hours every week. It's like having an extra team member that never sleeps.",
    rating: 5,
    avatar: "/lovable-uploads/photo-1485833077593-4278bba3f11f.png"
  },
  {
    name: "David Thompson",
    role: "Small Business Owner",
    content: "I was skeptical about switching platforms, but FeatherBiz made the transition seamless. Our productivity has never been higher.",
    rating: 5,
    avatar: "/lovable-uploads/photo-1452960962994-acf4fd70b632.png"
  }
];

const partnerLogos = [
  { name: "TechNova", img: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.png" },
  { name: "Graystone", img: "/lovable-uploads/photo-1527576539890-dfa815648363.png" },
  { name: "EcoDeer", img: "/lovable-uploads/photo-1485833077593-4278bba3f11f.png" },
  { name: "SheepCloud", img: "/lovable-uploads/photo-1452960962994-acf4fd70b632.png" },
];

export const LandingTestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 sm:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-medium mb-6">
            Customer Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Loved by businesses
            <br />
            <span className="text-blue-600">everywhere</span>
          </h2>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto mb-20">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 sm:p-12">
            <div className="flex items-center mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-8 font-light">
              "{testimonials[currentIndex].content}"
            </blockquote>
            
            <div className="flex items-center">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <div className="font-semibold text-gray-900">{testimonials[currentIndex].name}</div>
                <div className="text-gray-600">{testimonials[currentIndex].role}</div>
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Partner Logos */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-8 uppercase tracking-wide font-medium">
            Trusted by innovative companies
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <img
                  src={logo.img}
                  alt={logo.name}
                  className="h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};
