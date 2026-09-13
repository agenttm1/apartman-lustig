"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Ovdje će ići prave rute tvojih slika iz public/gallery/ foldera
const images = [
  { id: 1, src: "/gallery/slika1.jpg", alt: "Dnevni boravak Apartmana Lustig" },
  { id: 2, src: "/gallery/slika2.jpg", alt: "Spavaća soba s bračnim krevetom" },
  { id: 3, src: "/gallery/slika3.jpg", alt: "Moderno opremljena kuhinja" },
  { id: 4, src: "/gallery/slika4.jpg", alt: "Kupaonica s tuš kabinom" },
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative w-full h-screen bg-[#0a1f18] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Naslov u tvom premium stilu */}
      <div className="absolute top-10 left-6 md:left-12 z-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-serif drop-shadow-md">
          Uđite, <span className="text-[#d4af37]">razgledajte.</span>
        </h2>
      </div>

      {/* Glavni kontejner za sliku */}
      <div className="relative w-[90vw] md:w-[70vw] h-[60vh] md:h-[75vh] rounded-3xl overflow-hidden shadow-2xl border border-[#d4af37]/20 group mt-10">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              style={{ objectFit: 'cover' }}
              priority
              className="transition-transform duration-2000 ease-out hover:scale-105"
            />
            
            {/* Suptilni overlay za tekst opisa slike na dnu */}
            <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/80 to-transparent p-6 md:p-8">
              <p className="text-white text-lg md:text-xl font-medium tracking-wide drop-shadow-lg">
                {images[currentIndex].alt}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Strelice za navigaciju (pojavljuju se kad pređeš mišem) */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-[#d4af37] hover:text-[#14362b] text-white rounded-full backdrop-blur-sm transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer z-10"
        >
          <ChevronLeft size={32} />
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-[#d4af37] hover:text-[#14362b] text-white rounded-full backdrop-blur-sm transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer z-10"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Indikatori (Male točkice na dnu) */}
      <div className="absolute bottom-8 flex gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === index ? "bg-[#d4af37] w-10" : "bg-white/40 hover:bg-white"
            }`}
          />
        ))}
      </div>
      
    </section>
  );
}