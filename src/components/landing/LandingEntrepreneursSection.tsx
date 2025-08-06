import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Import entrepreneur photos
import entrepreneur01 from "@/assets/entrepreneurs/entrepreneur-01.jpg";
import entrepreneur02 from "@/assets/entrepreneurs/entrepreneur-02.jpg";
import entrepreneur03 from "@/assets/entrepreneurs/entrepreneur-03.jpg";
import entrepreneur04 from "@/assets/entrepreneurs/entrepreneur-04.jpg";
import entrepreneur05 from "@/assets/entrepreneurs/entrepreneur-05.jpg";
import entrepreneur06 from "@/assets/entrepreneurs/entrepreneur-06.jpg";
import entrepreneur07 from "@/assets/entrepreneurs/entrepreneur-07.jpg";
import entrepreneur08 from "@/assets/entrepreneurs/entrepreneur-08.jpg";
import entrepreneur09 from "@/assets/entrepreneurs/entrepreneur-09.jpg";
import entrepreneur10 from "@/assets/entrepreneurs/entrepreneur-10.jpg";
import entrepreneur11 from "@/assets/entrepreneurs/entrepreneur-11.jpg";
import entrepreneur12 from "@/assets/entrepreneurs/entrepreneur-12.jpg";
import entrepreneur13 from "@/assets/entrepreneurs/entrepreneur-13.jpg";
import entrepreneur14 from "@/assets/entrepreneurs/entrepreneur-14.jpg";
import entrepreneur15 from "@/assets/entrepreneurs/entrepreneur-15.jpg";
import entrepreneur16 from "@/assets/entrepreneurs/entrepreneur-16.jpg";

// Base entrepreneur photos to cycle through
const basePhotos = [
  entrepreneur01, entrepreneur02, entrepreneur03, entrepreneur04,
  entrepreneur05, entrepreneur06, entrepreneur07, entrepreneur08,
  entrepreneur09, entrepreneur10, entrepreneur11, entrepreneur12,
  entrepreneur13, entrepreneur14, entrepreneur15, entrepreneur16
];

// Generate more entrepreneurs like Attio's dense cloud
const entrepreneurs = Array.from({ length: 120 }, (_, i) => {
  const sizes = ['w-6 h-6', 'w-8 h-8', 'w-10 h-10', 'w-12 h-12'];
  const sizeWeights = [0.3, 0.3, 0.25, 0.15]; // More small sizes for density
  
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
    left: Math.random() * 85 + 7.5, // Better distribution
    top: Math.random() * 70 + 15, // Better distribution
    delay: Math.random() * 1, // Faster staggered animations
    floatDelay: Math.random() * 2, // Faster floating animation delay  
    duration: 2 + Math.random() * 1, // Shorter animation duration
  };
});

export const LandingEntrepreneursSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStopped, setAnimationStopped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !animationStopped) {
          // Stop animations after 5 seconds
          setTimeout(() => {
            setAnimationStopped(true);
          }, 5000);
        }
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
  }, [animationStopped]);

  return (
    <section 
      id="entrepreneurs-wall" 
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Entrepreneurs Cloud - positioned above text like Attio */}
        <div className={`relative h-72 lg:h-96 max-w-4xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {entrepreneurs.map((entrepreneur, index) => (
            <div
              key={entrepreneur.id}
              className={`absolute transition-all duration-700 ${!animationStopped ? 'animate-float' : ''} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{
                left: `${entrepreneur.left}%`,
                top: `${entrepreneur.top}%`,
                transform: 'translate(-50%, -50%)',
                transitionDelay: isVisible ? `${index * 8}ms` : '0ms',
                animationDelay: !animationStopped ? `${entrepreneur.floatDelay}s` : '0s',
                animationDuration: !animationStopped ? `${entrepreneur.duration}s` : '0s'
              }}
            >
              <Avatar className={`${entrepreneur.size} transition-all duration-300 hover:scale-125 hover:rotate-3 border border-border/20 shadow-lg hover:shadow-xl ${!animationStopped ? 'animate-pulse-subtle' : ''}`}>
                <AvatarImage
                  src={entrepreneur.avatar}
                  alt={`Entrepreneur ${entrepreneur.initials}`}
                  className="object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                  {entrepreneur.initials}
                </AvatarFallback>
              </Avatar>
            </div>
          ))}
        </div>

        {/* Section Header - positioned below like Attio */}
        <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1]">
            The platform behind{" "}
            <span className="text-muted-foreground">thousands of businesses.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button
              onClick={() => navigate('/auth')}
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 rounded-lg font-medium"
            >
              Start for free
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground px-8 py-3 font-medium"
            >
              Talk to sales
            </Button>
          </div>
        </div>
        
      </div>
    </section>
  );
};