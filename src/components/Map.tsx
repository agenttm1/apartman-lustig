"use client";

import { Navigation } from "lucide-react";

export default function Map() {
  // Koordinate za Daruvar
  const lat = 45.599304;
  const lng = 17.223476;

  // Link za prikaz same karte unutar okvira (Iframe)
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  
  // Magični link: Ovo automatski aktivira upute za vožnju do tvojih koordinata
  const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="w-full h-full min-h-100 relative z-0 rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50">
      
      {/* Google Maps Embed */}
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full z-0"
      ></iframe>

      {/* Zatamnjeni sloj pri dnu da bi gumb bio čitljiviji */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>

      {/* Lebdeći gumb za navigaciju (Premium TM Studio dizajn) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 w-[90%] max-w-sm">
        <a
          href={navUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-[#14362b] text-white px-6 py-4 rounded-2xl shadow-2xl hover:bg-[#0a1f18] hover:-translate-y-1 border border-[#d4af37]/30 transition-all duration-300 group cursor-pointer"
        >
          <div className="bg-[#d4af37] p-2 rounded-full text-[#14362b] group-hover:scale-110 transition-transform duration-300">
            <Navigation size={20} className="fill-current" />
          </div>
          <span className="font-bold tracking-wide uppercase text-sm">Pokreni navigaciju</span>
        </a>
      </div>
      
    </div>
  );
}