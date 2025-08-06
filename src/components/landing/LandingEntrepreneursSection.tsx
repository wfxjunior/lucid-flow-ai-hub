import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Generate diverse entrepreneur data with organic positioning
const entrepreneurs = Array.from({ length: 120 }, (_, i) => {
  const sizes = ['w-8 h-8', 'w-10 h-10', 'w-12 h-12', 'w-14 h-14', 'w-16 h-16'];
  const sizeWeights = [0.15, 0.25, 0.35, 0.2, 0.05]; // Mostly medium sizes
  
  let randomSize = Math.random();
  let cumulativeWeight = 0;
  let selectedSize = sizes[0];
  
  for (let j = 0; j < sizes.length; j++) {
    cumulativeWeight += sizeWeights[j];
    if (randomSize <= cumulativeWeight) {
      selectedSize = sizes[j];
      break;
    }
  }
  
  return {
    id: i + 1,
    initials: String.fromCharCode(65 + (i % 26)) + String.fromCharCode(65 + ((i + 1) % 26)),
    avatar: `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=100&h=100&fit=crop&crop=face&auto=format&q=60`,
    size: selectedSize,
    left: Math.random() * 90 + 5, // 5% to 95% from left
    top: Math.random() * 80 + 10, // 10% to 90% from top
    delay: Math.random() * 2, // Animation delay
  };
});

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

        {/* Entrepreneurs Cloud */}
        <div className="relative h-96 sm:h-[500px] lg:h-[600px] max-w-6xl mx-auto overflow-hidden">
          {entrepreneurs.map((entrepreneur) => (
            <div
              key={entrepreneur.id}
              className="absolute group animate-fade-in"
              style={{
                left: `${entrepreneur.left}%`,
                top: `${entrepreneur.top}%`,
                animationDelay: `${entrepreneur.delay}s`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Avatar className={`${entrepreneur.size} transition-all duration-300 hover:scale-110 hover:z-10 relative grayscale hover:grayscale-0 opacity-70 hover:opacity-100`}>
                <AvatarImage
                  src={entrepreneur.avatar}
                  alt={`Entrepreneur ${entrepreneur.initials}`}
                  className="object-cover"
                  loading="lazy"
                />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-medium">
                  {entrepreneur.initials}
                </AvatarFallback>
              </Avatar>
            </div>
          ))}
          
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50/30 via-transparent to-gray-50/30 pointer-events-none" />
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