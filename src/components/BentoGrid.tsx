"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Wifi, 
  Car, 
  Tv, 
  Utensils, 
  Home, 
  Ban, 
  BedDouble, 
  Sofa, 
  Bath, 
  Users,
  Waves,
  MapPin
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BentoGrid() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".bento-item", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <section ref={container} className="w-full max-w-7xl mx-auto px-4 py-24">
      
      {/* Glavni naslov */}
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight font-serif">
          Sve što trebate, <span className="text-[#14362b]">i više.</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Dizajniran za vaš potpuni komfor, Apartman Lustig nudi prostranost i vrhunske sadržaje 
          kako biste se osjećali kao kod kuće.
        </p>
      </div>

      {/* Savršen 3x3 Grid Layout za OPREMU APARTMANA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px] mb-6">
        
        {/* VELIKI BLOK (Sobe i Raspored) - Zauzima 2 stupca i 2 reda */}
        <div className="bento-item md:col-span-2 md:row-span-2 bg-[#FBF9F5] border border-amber-200/60 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
          <div>
            <h3 className="text-3xl font-bold text-[#14362b] mb-3 font-serif">Prostranost i Udobnost</h3>
            <p className="text-gray-700 text-lg mb-8 max-w-lg">
              Savršen raspored za obitelji ili grupe. Dovoljno prostora za miran san i zajedničko opuštanje.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-50 flex items-center gap-4 hover:border-amber-200 transition-colors">
              <BedDouble className="text-[#d4af37] w-8 h-8 shrink-0" />
              <div>
                <p className="font-bold text-gray-900">Dvokrevetna soba</p>
                <p className="text-sm text-gray-500">Udobnost za dvoje</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-50 flex items-center gap-4 hover:border-amber-200 transition-colors">
              <Users className="text-[#d4af37] w-8 h-8 shrink-0" />
              <div>
                <p className="font-bold text-gray-900">Trokrevetna soba</p>
                <p className="text-sm text-gray-500">Mogućnost dječjeg krevetića</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-50 flex items-center gap-4 hover:border-amber-200 transition-colors">
              <Sofa className="text-[#d4af37] w-8 h-8 shrink-0" />
              <div>
                <p className="font-bold text-gray-900">Dnevni boravak</p>
                <p className="text-sm text-gray-500">Velik i prostran prostor</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-50 flex items-center gap-4 hover:border-amber-200 transition-colors">
              <Bath className="text-[#d4af37] w-8 h-8 shrink-0" />
              <div>
                <p className="font-bold text-gray-900">Kupaonica</p>
                <p className="text-sm text-gray-500">Moderna i opremljena</p>
              </div>
            </div>
          </div>
        </div>

        {/* MALI BLOK 1 - Mediji */}
        <div className="bento-item bg-blue-50 border border-blue-100 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex gap-4">
            <Tv className="w-8 h-8 text-blue-600" />
            <Wifi className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Multimedija</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              TV prijemnik u boravku te osiguran besplatan pristup internetu.
            </p>
          </div>
        </div>

        {/* MALI BLOK 2 - Parking */}
        <div className="bento-item bg-[#14362b] text-white rounded-3xl p-6 flex flex-col justify-between overflow-hidden relative shadow-lg hover:shadow-xl transition-shadow">
          <div className="absolute -right-4 -top-4 opacity-10">
            <Car className="w-40 h-40" />
          </div>
          <Car className="w-10 h-10 text-[#d4af37] relative z-10" />
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Privatni Parking</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Vaše vozilo je na sigurnom. Osiguran prostrani parking uz sami objekt.
            </p>
          </div>
        </div>

        {/* MALI BLOK 3 - Pristupačnost */}
        <div className="bento-item bg-emerald-50 border border-emerald-100 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <Home className="w-9 h-9 text-emerald-600" />
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Laka dostupnost</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Smješten u prizemlju kuće, pogodan i za osobe smanjene pokretljivosti.
            </p>
          </div>
        </div>

        {/* MALI BLOK 4 - Pravila (Pušenje i Ljubimci) */}
        <div className="bento-item bg-rose-50 border border-rose-100 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
          <Ban className="w-9 h-9 text-rose-500 group-hover:scale-110 transition-transform" />
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Kućni red</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong className="text-rose-600 font-medium">Nije dozvoljeno pušenje</strong> niti boravak kućnih ljubimaca.
            </p>
          </div>
        </div>

        {/* MALI BLOK 5 - Kuhinja */}
        <div className="bento-item bg-orange-50 border border-orange-100 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <Utensils className="w-9 h-9 text-orange-500" />
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Opremljena kuhinja</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sve potrebno za brzu i jednostavnu pripremu omiljenih obroka.
            </p>
          </div>
        </div>

      </div>

      {/* NOVI PANORAMSKI BLOK ZA LOKACIJU - Ispod grid-a */}
      <div className="bento-item w-full bg-gradient-to-br from-[#e6f3ff] to-cyan-50 border border-cyan-100 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 mt-6 group">
        {/* Pozadinska apstraktna ikona vode */}
        <div className="absolute -left-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
          <Waves className="w-64 h-64 text-cyan-500" />
        </div>
        
        <div className="relative z-10 md:w-2/3">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-100 p-2 rounded-full">
              <MapPin className="text-cyan-600 w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">
              Savršena lokacija za odmor
            </h3>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            Smješteni smo u mirnom okruženju prekrasne prirode. U neposrednoj blizini našeg apartmana nalaze se <strong className="text-cyan-800">sportski ribnjak (jezero)</strong>, 
            popularni <strong className="text-cyan-800">Termalni vodeni park Aquae Balisse</strong>, 
            ljekovite <strong className="text-cyan-800">Daruvarske toplice</strong> te <strong className="text-cyan-800">Veteranski centar</strong>.
          </p>
        </div>

        <div className="relative z-10 flex gap-4 md:w-1/3 justify-end w-full">
          {/* Male kartice za isticanje glavnih točaka */}
          <div className="flex flex-col gap-3 w-full max-w-[200px]">
             <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-cyan-50 flex items-center gap-3">
                <Waves className="text-cyan-500 w-5 h-5" />
                <span className="font-semibold text-gray-800 text-sm">Aquae Balisse</span>
             </div>
             <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-cyan-50 flex items-center gap-3">
                <Home className="text-emerald-500 w-5 h-5" />
                <span className="font-semibold text-gray-800 text-sm">Daruvarske toplice</span>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}