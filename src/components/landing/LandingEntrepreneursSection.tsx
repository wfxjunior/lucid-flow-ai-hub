import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Generate diverse entrepreneur data for social proof
const entrepreneurs = Array.from({ length: 72 }, (_, i) => ({
  id: i + 1,
  initials: String.fromCharCode(65 + (i % 26)) + String.fromCharCode(65 + ((i + 1) % 26)),
  avatar: `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=100&h=100&fit=crop&crop=face&auto=format&q=60`,
}));

export const LandingEntrepreneursSection = () => {
  return (
    <section 
      id="entrepreneurs-wall" 
      className="featherbiz-entrepreneurs-wall py-16 sm:py-20 lg:py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Trusted by Entrepreneurs in Over{" "}
            <span className="text-blue-600">100 Countries</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join the global movement of small business owners and entrepreneurs growing with FeatherBiz
          </p>
        </div>

        {/* Entrepreneurs Grid */}
        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 xl:grid-cols-16 gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto">
          {entrepreneurs.map((entrepreneur) => (
            <div
              key={entrepreneur.id}
              className="group"
            >
              <Avatar className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform duration-200 hover:scale-105 grayscale hover:grayscale-0">
                <AvatarImage
                  src={entrepreneur.avatar}
                  alt={`Entrepreneur ${entrepreneur.initials}`}
                  className="object-cover"
                  loading="lazy"
                />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs sm:text-sm font-medium">
                  {entrepreneur.initials}
                </AvatarFallback>
              </Avatar>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            Thousands of entrepreneurs worldwide trust FeatherBiz to streamline their business operations and drive growth
          </p>
        </div>
        
      </div>
    </section>
  );
};