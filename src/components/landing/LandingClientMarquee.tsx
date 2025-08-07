
import React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const logos = [
  { name: "Granola", img: "/lovable-uploads/408e377f-da3b-4a34-a0e8-6876855c7d8c.png" },
  { name: "Bravado", img: "/lovable-uploads/2daa1247-4a06-4fb8-b5bc-d594e51a8327.png" },
  { name: "LEGORA", img: "/lovable-uploads/75bbdd25-6026-4ad6-ae91-58bed40723b2.png" },
  { name: "Flatfile", img: "/lovable-uploads/3006bb68-786d-4cee-9bd2-993dadce8f41.png" },
  { name: "Railway", img: "/lovable-uploads/6f7c59da-55f2-444e-9e9a-2f242a85a430.png" },
  { name: "Modal", img: "/lovable-uploads/a295e1b3-9430-4dd8-aa69-5d48750ee442.png" },
  { name: "public.com", img: "/lovable-uploads/ec5a4370-5537-4b7a-932a-a0e0e31ceb3b.png" },
  { name: "Plain", img: "/lovable-uploads/1c9949ce-dc8b-4a49-82f7-d6430559ddf4.png" },
  { name: "passionfroot", img: "/lovable-uploads/2b04e39f-4214-4c69-a3bb-4e5a1a93a685.png" },
  { name: "Replicate", img: "/lovable-uploads/3f0ddade-bcb8-46e7-82f2-a6ab8fa6107b.png" },
];

export const LandingClientMarquee: React.FC = () => {
  const row1 = logos.slice(0, Math.ceil(logos.length / 2));
  const row2 = logos.slice(Math.ceil(logos.length / 2));

  return (
    <section
      aria-label="Trusted by thousands of businesses worldwide"
      className="py-12 sm:py-16 bg-background border-t"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-sm sm:text-base font-medium text-muted-foreground tracking-wide uppercase">
          Trusted by thousands of businesses worldwide
        </h2>

          <div className="mt-8 relative rounded-2xl border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-md p-4 sm:p-6">
            {/* Edge fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background/90 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background/90 to-transparent z-10" />

            <div className="space-y-6">
              {/* Row 1 */}
              <Carousel
                opts={{ align: "start", loop: true, dragFree: true }}
                plugins={[AutoScroll({ playOnInit: true, speed: 0.35, stopOnMouseEnter: true, stopOnFocusIn: true, stopOnInteraction: false })]}
                className="w-full"
              >
                <CarouselContent className="-ml-3">
                  {row1.concat(row1).map((logo, idx) => (
                    <CarouselItem
                      key={`${logo.name}-${idx}`}
                      className="pl-3 basis-1/3 sm:basis-1/6"
                    >
                      <div className="h-14 sm:h-16 flex items-center justify-center">
                        <img
                          src={logo.img}
                          alt={`${logo.name} logo`}
                          title={logo.name}
                          loading="lazy"
                          draggable={false}
                          className="max-h-10 sm:max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity hover-scale grayscale hover:grayscale-0"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Row 2 (reverse direction by RTL trick) */}
              <div dir="rtl">
                <Carousel
                  opts={{ align: "start", loop: true, dragFree: true }}
                  plugins={[AutoScroll({ playOnInit: true, speed: 0.32, stopOnMouseEnter: true, stopOnFocusIn: true, stopOnInteraction: false })]}
                  className="w-full"
                >
                  <CarouselContent className="-ml-3">
                    {row2.concat(row2).map((logo, idx) => (
                      <CarouselItem
                        key={`${logo.name}-r-${idx}`}
                        className="pl-3 basis-1/3 sm:basis-1/6"
                      >
                        <div className="h-14 sm:h-16 flex items-center justify-center">
                          <img
                            src={logo.img}
                            alt={`${logo.name} logo`}
                            title={logo.name}
                            loading="lazy"
                            draggable={false}
                            className="max-h-10 sm:max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity hover-scale grayscale hover:grayscale-0"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};
