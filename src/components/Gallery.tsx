"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Ovdje će ići prave rute tvojih slika iz public/gallery/ foldera
const images = [
  { id: 1, src: "/gallery/slika1.jpg", alt: "Dnevni boravak Apartmana Lustig" },
  { id: 2, src: "/gallery/slika2.jpg", alt: "Spavaća soba s bračnim krevetom" },
  { id: 3, src: "/gallery/slika3.jpg", alt: "Moderno opremljena kuhinja" },
  { id: 4, src: "/gallery/slika4.jpg", alt: "Kupaonica s tuš kabinom" },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Ako nema slika, prekini izvršavanje
    if (!scrollWrapperRef.current || !sectionRef.current) return;

    const sections = gsap.utils.toArray(".gallery-item");

    // Kreiramo horizontalnu animaciju
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1), // Pomičemo sve slike na lijevo osim prve
      ease: "none", // Bez ubrzavanja/usporavanja, glatko skrolanje
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true, // Zaključava vertikalno skrolanje
        scrub: 1, // 'Scrub' veže animaciju za poziciju scrollbar-a (1 sekunda kašnjenja za glatkiji osjećaj)
        // Koliko dugo treba skrolati da bi se prikazale sve slike. 
        // Što više pomnožimo, to korisnik mora više "vrtjeti" mišem za prelazak slika.
        end: () => "+=" + scrollWrapperRef.current!.offsetWidth * 2, 
      },
    });
  }, { scope: sectionRef });

  return (
    // sectionRef je element koji se "pin-a" (zaključava)
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-gray-950 flex items-center"
    >
      <div className="absolute top-10 left-10 z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-md">
          Uđite, <span className="text-blue-400">razgledajte.</span>
        </h2>
      </div>

      {/* Kontejner u kojem se slike pomiču horizontalno */}
      <div 
        ref={scrollWrapperRef} 
        className="flex w-max items-center h-full pt-16 px-10"
      >
        {images.map((image) => (
          <div 
            key={image.id} 
            className="gallery-item w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] mr-10 relative rounded-2xl overflow-hidden shrink-0 shadow-2xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill // Slika se širi na cijeli kontejner
              style={{ objectFit: 'cover' }} // Poput background-size: cover
              sizes="(max-width: 768px) 85vw, 60vw"
              priority={image.id === 1} // Prvu sliku učitavamo odmah
              className="hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        ))}
      </div>
    </section>
  );
}