import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { SalesContactModal } from "@/components/SalesContactModal";

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

// Fictional names and job titles
const entrepreneurData = [
  { name: "Ana Silva", role: "CEO & Founder" },
  { name: "Carlos Mendes", role: "Tech Entrepreneur" },
  { name: "Maria Santos", role: "Creative Director" },
  { name: "João Pereira", role: "Business Consultant" },
  { name: "Sofia Costa", role: "Marketing Strategist" },
  { name: "Pedro Alves", role: "Product Manager" },
  { name: "Lucia Ferreira", role: "Innovation Lead" },
  { name: "Miguel Torres", role: "Sales Director" },
  { name: "Rita Oliveira", role: "Operations Manager" },
  { name: "Bruno Cardoso", role: "Growth Hacker" },
  { name: "Carla Rodrigues", role: "Brand Specialist" },
  { name: "Tiago Sousa", role: "Digital Nomad" },
  { name: "Helena Castro", role: "UX Designer" },
  { name: "André Martins", role: "Data Analyst" },
  { name: "Beatriz Lima", role: "Content Creator" },
  { name: "Nuno Dias", role: "Startup Advisor" }
];

// Generate entrepreneurs in strategic organic clusters like the reference
const createCluster = (centerX, centerY, count, radius) => {
  const cluster = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 2 * Math.PI + Math.random() * 0.5;
    const distance = Math.random() * radius;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    cluster.push({ x: Math.max(5, Math.min(95, x)), y: Math.max(10, Math.min(90, y)) });
  }
  return cluster;
};

// Create multiple organic clusters
const cluster1 = createCluster(25, 35, 25, 20); // Left cluster
const cluster2 = createCluster(75, 25, 30, 25); // Top right cluster  
const cluster3 = createCluster(45, 65, 20, 18); // Bottom center cluster
const cluster4 = createCluster(65, 55, 25, 22); // Right cluster
const cluster5 = createCluster(30, 70, 15, 15); // Bottom left cluster
const scattered = Array.from({ length: 15 }, () => ({ 
  x: Math.random() * 90 + 5, 
  y: Math.random() * 80 + 10 
})); // Scattered individuals

const allPositions = [...cluster1, ...cluster2, ...cluster3, ...cluster4, ...cluster5, ...scattered];

const entrepreneurs = Array.from({ length: 130 }, (_, i) => {
  const sizes = ['w-6 h-6', 'w-7 h-7', 'w-8 h-8', 'w-10 h-10', 'w-12 h-12'];
  const sizeWeights = [0.25, 0.25, 0.25, 0.15, 0.1]; // Varied sizes for depth
  
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
  
  const position = allPositions[i % allPositions.length];
  const dataIndex = i % entrepreneurData.length;
  
  return {
    id: i + 1,
    initials: String.fromCharCode(65 + (i % 26)) + String.fromCharCode(65 + ((i + 1) % 26)),
    avatar: basePhotos[i % basePhotos.length],
    name: entrepreneurData[dataIndex].name,
    role: entrepreneurData[dataIndex].role,
    size: selectedSize,
    left: position.x + (Math.random() - 0.5) * 3, // Small random offset for organic feel
    top: position.y + (Math.random() - 0.5) * 3,
    delay: Math.random() * 1.2,
    floatDelay: Math.random() * 3,
    duration: 2.5 + Math.random() * 1.5,
  };
});

export const LandingEntrepreneursSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStopped, setAnimationStopped] = useState(false);
  const [showSalesModal, setShowSalesModal] = useState(false);
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
      className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/8 rounded-full blur-2xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Entrepreneurs Cloud - Enhanced organic clustered arrangement */}
        <div className={`relative h-80 lg:h-[500px] max-w-5xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-60 blur-xl" />
          
          <TooltipProvider>
            {entrepreneurs.map((entrepreneur, index) => {
              const isLarge = entrepreneur.size.includes('w-12') || entrepreneur.size.includes('w-10');
              const isMedium = entrepreneur.size.includes('w-8');
              
              return (
                <div
                  key={entrepreneur.id}
                  className={`absolute transition-all duration-700 ${!animationStopped ? 'animate-float' : ''} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{
                    left: `${entrepreneur.left}%`,
                    top: `${entrepreneur.top}%`,
                    transform: 'translate(-50%, -50%)',
                    transitionDelay: isVisible ? `${index * 6}ms` : '0ms',
                    animationDelay: !animationStopped ? `${entrepreneur.floatDelay}s` : '0s',
                    animationDuration: !animationStopped ? `${entrepreneur.duration}s` : '0s',
                    zIndex: isLarge ? 30 : isMedium ? 20 : 10,
                  }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative group">
                        {/* Glow effect for larger avatars */}
                        {isLarge && (
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}
                        
                        <Avatar className={`
                          ${entrepreneur.size} 
                          transition-all duration-500 
                          hover:scale-110 hover:rotate-2 
                          border-2 border-background/80 
                          shadow-lg hover:shadow-2xl 
                          hover:border-primary/30 
                          ${!animationStopped ? 'animate-pulse-subtle' : ''} 
                          cursor-pointer
                          backdrop-blur-sm
                          ${isLarge ? 'ring-2 ring-primary/20 ring-offset-2 ring-offset-background' : ''}
                          ${isMedium ? 'ring-1 ring-primary/10 ring-offset-1 ring-offset-background' : ''}
                        `}>
                          <AvatarImage
                            src={entrepreneur.avatar}
                            alt={`${entrepreneur.name} - ${entrepreneur.role}`}
                            className={`
                              object-cover 
                              transition-all duration-500
                              ${isLarge ? 'grayscale-0 saturate-110' : 'grayscale-[0.3] hover:grayscale-0'}
                              hover:saturate-120
                              group-hover:brightness-110
                            `}
                            loading="lazy"
                          />
                          <AvatarFallback className="bg-muted/80 text-muted-foreground text-xs font-medium backdrop-blur-sm">
                            {entrepreneur.initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-popover/95 backdrop-blur-md border border-border/50">
                      <div className="text-center">
                        <p className="font-medium text-sm text-popover-foreground">{entrepreneur.name}</p>
                        <p className="text-xs text-muted-foreground">{entrepreneur.role}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              );
            })}
          </TooltipProvider>
        </div>

        {/* Section Header - Enhanced with better typography */}
        <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent mb-6 leading-[1.1]">
            The platform behind{" "}
            <span className="bg-gradient-to-r from-muted-foreground to-muted-foreground/70 bg-clip-text">thousands of businesses.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button
              onClick={() => navigate('/auth')}
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Start for free
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowSalesModal(true)}
              className="text-muted-foreground hover:text-foreground px-8 py-3 font-medium border border-border/50 hover:border-border hover:bg-muted/30 transition-all duration-300"
            >
              Talk to sales
            </Button>
          </div>
        </div>
        
      </div>
      
      <SalesContactModal 
        open={showSalesModal} 
        onOpenChange={setShowSalesModal} 
      />
    </section>
  );
};