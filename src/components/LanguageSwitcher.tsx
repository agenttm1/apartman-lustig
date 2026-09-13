"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
// OVO JE NOVO: Importiramo router za mijenjanje URL-a
import { useRouter, usePathname } from "next/navigation"; 

const languages = [
  { code: "hr", name: "Hrvatski", flag: "🇭🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // OVO JE NOVO: Pripremamo alate za mijenjanje linkova
  const router = useRouter();
  const pathname = usePathname(); // Npr. "/hr/nesto" ili "/en"

  // OVO JE NOVO: Određujemo koji je jezik TRENUTNO aktivan na temelju URL-a
  const currentLangCode = pathname.split('/')[1] || 'hr'; 
  const currentLang = languages.find(l => l.code === currentLangCode) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // OVO JE NOVO: Funkcija koja zapravo mijenja jezik
  const handleSelect = (langCode: string) => {
    setIsOpen(false);
    
    // Ako korisnik klikne na jezik na kojem već je, ne radi ništa
    if (langCode === currentLangCode) return;

    // Uzimamo trenutnu putanju (npr. "/hr/galerija")
    const segments = pathname.split('/');
    
    // Mijenjamo stari jezik (segments[1]) u novi jezik
    segments[1] = langCode;
    
    // Spajamo nazad u link (npr. "/en/galerija")
    const newPath = segments.join('/');
    
    // Šaljemo korisnika na novi link
    router.push(newPath);
  };

  return (
    <div ref={dropdownRef} className="fixed top-6 right-6 z-[100]">
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#14362b]/90 backdrop-blur-md text-white px-4 py-2.5 rounded-full border border-[#d4af37]/30 shadow-xl hover:bg-[#0a1f18] transition-all duration-300 cursor-pointer"
      >
        <Globe size={18} className="text-[#d4af37]" />
        <span className="font-semibold text-sm uppercase tracking-wider">{currentLang.code}</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-40 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50 cursor-pointer ${
                  currentLang.code === lang.code 
                    ? "bg-amber-50/50 text-[#14362b] font-bold" 
                    : "text-gray-700 font-medium"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}