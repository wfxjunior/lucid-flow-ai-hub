import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Import entrepreneur photos
import entrepreneur01 from "@/assets/entrepreneurs/entrepreneur-01.jpg";
import entrepreneur02 from "@/assets/entrepreneurs/entrepreneur-02.jpg";
import entrepreneur03 from "@/assets/entrepreneurs/entrepreneur-03.jpg";
import entrepreneur04 from "@/assets/entrepreneurs/entrepreneur-04.jpg";
import entrepreneur05 from "@/assets/entrepreneurs/entrepreneur-05.jpg";
import entrepreneur06 from "@/assets/entrepreneurs/entrepreneur-06.jpg";
import entrepreneur07 from "@/assets/entrepreneurs/entrepreneur-07.jpg";
import entrepreneur08 from "@/assets/entrepreneurs/entrepreneur-08.jpg";

// Base entrepreneur photos to cycle through
const basePhotos = [
  entrepreneur01, entrepreneur02, entrepreneur03, entrepreneur04,
  entrepreneur05, entrepreneur06, entrepreneur07, entrepreneur08
];

// Generate fewer entrepreneurs for a cleaner look like Attio
const entrepreneurs = Array.from({ length: 60 }, (_, i) => {
  const sizes = ['w-8 h-8', 'w-10 h-10', 'w-12 h-12'];
  const sizeWeights = [0.3, 0.5, 0.2]; // Mostly small to medium sizes
  
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
    avatar: basePhotos[i % basePhotos.length],
    size: selectedSize,
    left: Math.random() * 85 + 7.5, // More centered distribution
    top: Math.random() * 70 + 15, // More centered distribution
    delay: Math.random() * 1.5, // Faster animations
  };
});

export const LandingEntrepreneursSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const section = document.getElementById('entrepreneurs-wall');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section 
      id="entrepreneurs-wall" 
      className="py-20 sm:py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Entrepreneurs Cloud - positioned above text like Attio */}
        <div className={`relative h-80 sm:h-96 lg:h-[420px] max-w-5xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {entrepreneurs.map((entrepreneur, index) => (
            <div
              key={entrepreneur.id}
              className={`absolute transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{
                left: `${entrepreneur.left}%`,
                top: `${entrepreneur.top}%`,
                transform: 'translate(-50%, -50%)',
                transitionDelay: isVisible ? `${index * 20}ms` : '0ms'
              }}
            >
              <Avatar className={`${entrepreneur.size} transition-all duration-300 hover:scale-110 border-2 border-white shadow-sm grayscale-[0.3] hover:grayscale-0`}>
                <AvatarImage
                  src={entrepreneur.avatar}
                  alt={`Entrepreneur ${entrepreneur.initials}`}
                  className="object-cover"
                  loading="lazy"
                />
                <AvatarFallback className="bg-gray-100 text-gray-600 text-xs font-medium">
                  {entrepreneur.initials}
                </AvatarFallback>
              </Avatar>
            </div>
          ))}
        </div>

        {/* Section Header - positioned below like Attio */}
        <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            The platform behind
            <br />
            <span className="text-gray-600">thousands of businesses.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Start for free
            </button>
            <button className="text-gray-600 px-6 py-3 font-medium hover:text-gray-900 transition-colors">
              Talk to sales
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
};