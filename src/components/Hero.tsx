"use client";

import { motion } from "framer-motion";
import { Dancing_Script } from "next/font/google";
import BookingForm from "@/components/BookingForm";

const handWrittenFont = Dancing_Script({ 
  subsets: ["latin"],
  weight: ["700"], 
});

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Pozadinski video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        Vaš preglednik ne podržava video tag.
      </video>

      {/* Zatamnjenje (Overlay) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Sadržaj */}
      <div className="relative z-20 text-center px-4 flex flex-col items-center mt-12">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`${handWrittenFont.className} text-7xl md:text-9xl text-white mb-4 drop-shadow-2xl`}
        >
          Apartman Lustig
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl drop-shadow-md font-light"
        >
          Vaša oaza mira i opuštanja u srcu Daruvara. Doživite savršen spoj modernog komfora i prirode.
        </motion.p>

        {/* Gumb za rezervaciju */}
        <BookingForm>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#14362b] text-white border-2 border-[#d4af37] px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-[#1b4839] transition-all tracking-wider cursor-pointer"
          >
            Rezerviraj Smještaj
          </motion.button>
        </BookingForm>
        
      </div>
    </section>
  );
}