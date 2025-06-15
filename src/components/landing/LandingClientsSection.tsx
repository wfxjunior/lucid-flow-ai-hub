
import React from "react";

const clients = [
  {
    name: "TechNova",
    img: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.png",
  },
  {
    name: "Graystone Group",
    img: "/lovable-uploads/photo-1527576539890-dfa815648363.png",
  },
  {
    name: "EcoDeer Solutions",
    img: "/lovable-uploads/photo-1485833077593-4278bba3f11f.png",
  },
  {
    name: "SheepCloud",
    img: "/lovable-uploads/photo-1452960962994-acf4fd70b632.png",
  },
];

export const LandingClientsSection = () => (
  <section className="py-12 sm:py-16 bg-background">
    <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
      <h3 className="text-md sm:text-lg font-semibold text-muted-foreground mb-8 tracking-wide text-center uppercase">
        Empresas que confiam na FeatherBiz
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-7 w-full max-w-3xl items-center">
        {clients.map((client) => (
          <div
            key={client.name}
            className="flex flex-col items-center group"
          >
            <div className="w-[90px] h-[56px] flex items-center justify-center">
              <img
                src={client.img}
                alt={client.name}
                title={client.name}
                className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:shadow-md transition-all duration-300"
                style={{
                  filter: "grayscale(100%)",
                }}
                loading="lazy"
                draggable={false}
              />
            </div>
            <span className="sr-only">{client.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
