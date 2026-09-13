"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MapPin, Wifi, Car, Tv, Utensils, TreePine } from "lucide-react";

// Moramo registrirati ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BentoGrid() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Animiramo sve elemente koji imaju klasu 'bento-item'
    gsap.from(".bento-item", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%", // Animacija kreće kada vrh sekcije dođe do 80% visine ekrana
        toggleActions: "play none none reverse", // Ponovno se animira ako se korisnik vrati gore
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15, // Svaki blok kasni 0.15 sekundi za prethodnim (kaskadni efekt)
      ease: "power3.out",
    });
  }, { scope: container }); // Scope ograničava animaciju samo na ovaj kontejner

  return (
    <section ref={container} className="w-full max-w-7xl mx-auto px-4 py-24">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Sve što trebate, <span className="text-[#14362b]">i više.</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Dizajniran za vaš potpuni komfor, Apartman Lustig nudi vrhunske sadržaje 
          kako biste se osjećali kao kod kuće, a istovremeno pobjegli od svakodnevice.
        </p>
      </div>

      {/* Tailwind CSS Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        
        {/* Veliki blok (zauzima 2 stupca i 2 reda na većim ekranima) */}
        <div className="bento-item md:col-span-2 md:row-span-2 bg-[#FBF9F5] border border-amber-100 rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group">
          <div className="absolute top-8 right-8 bg-white p-4 rounded-full shadow-sm z-10 group-hover:scale-110 transition-transform">
            <MapPin className="w-8 h-8 text-[#14362b]" />
          </div>
          {/* Ovdje možeš kasnije staviti sliku toplica kao pozadinu bloka */}
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Neposredna blizina toplica</h3>
            <p className="text-gray-700 max-w-md text-lg">
              Samo 5 minuta lagane šetnje dijeli vas od najpoznatijih Daruvarskih termalnih izvora i wellness oaza.
            </p>
          </div>
        </div>

        {/* Manji blok - Wi-Fi */}
        <div className="bento-item bg-gray-50 border border-gray-100 rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
          <Wifi className="w-10 h-10 text-gray-800" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">Optički Internet</h3>
            <p className="text-gray-600">Superbrzi Wi-Fi za streamanje i rad na daljinu bez prekida.</p>
          </div>
        </div>

        {/* Manji blok - Parking */}
        <div className="bento-item bg-gray-900 text-white rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative">
          <div className="absolute -right-4 -top-4 opacity-10">
            <Car className="w-40 h-40" />
          </div>
          <Car className="w-10 h-10 text-[#14362b] relative z-10" />
          <div className="relative z-10">
            <h3 className="text-xl font-bold">Privatni Parking</h3>
            <p className="text-gray-300">Vaš automobil je na sigurnom. Besplatno parkirno mjesto odmah ispred apartmana.</p>
          </div>
        </div>

        {/* Široki blok - Kuhinja */}
        <div className="bento-item md:col-span-2 bg-orange-50 rounded-3xl p-8 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Potpuno opremljena kuhinja</h3>
            <p className="text-gray-700">Od aparata za kavu do pećnice – spremno za vaše kulinarske majstorije.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm hidden sm:block">
            <Utensils className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        {/* Manji blok - Zabava */}
        <div className="bento-item bg-purple-50 rounded-3xl p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
          <Tv className="w-10 h-10 text-purple-600" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">Smart TV</h3>
            <p className="text-gray-600">Netflix, YouTube i ugodne večeri uz filmove.</p>
          </div>
        </div>

      </div>
    </section>
  );
}