import { Phone, Mail, MapPin, Clock, Globe } from "lucide-react";

// OVDJE DEFINIRAMO ŠTO FOOTER OČEKUJE
interface FooterProps {
  dict: {
    about: string;
    infoTitle: string;
    address: string;
    contactTitle: string;
    rights: string;
  };
}

export default function Footer({ dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1f18] text-gray-300 py-16 border-t border-[#d4af37]/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        
        {/* O nama / Brend */}
        <div className="flex flex-col items-start">
          <h3 className="text-3xl font-serif text-white mb-6 tracking-wide drop-shadow-md">Apartman Lustig</h3>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed max-w-xs">
            {dict.about}
          </p>
          <div className="flex space-x-4">
            <a href="#" title="Naš web" className="p-2 bg-[#14362b] rounded-full hover:bg-[#d4af37] hover:text-[#0a1f18] transition-all duration-300">
              <Globe size={20} />
            </a>
          </div>
        </div>

        {/* Informacije */}
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-[#d4af37]">{dict.infoTitle}</h4>
          <ul className="space-y-4 text-sm">
           
            <li className="flex items-center gap-3 hover:text-white transition-colors">
              <MapPin size={18} className="text-[#d4af37]" />
              <span>{dict.address}</span>
            </li>
          </ul>
        </div>

        {/* Kontakt */}
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-[#d4af37]">{dict.contactTitle}</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="tel:+385915274369" className="flex items-center gap-3 hover:text-[#d4af37] transition-colors group">
                <div className="p-2 bg-[#14362b] rounded-lg group-hover:bg-[#d4af37]/20 transition-colors">
                  <Phone size={18} className="text-[#d4af37]" />
                </div>
                <span className="text-lg font-medium">+385 91 527 4369</span>
              </a>
            </li>
            <li>
              <a href="tel:+385997593010" className="flex items-center gap-3 hover:text-[#d4af37] transition-colors group">
                <div className="p-2 bg-[#14362b] rounded-lg group-hover:bg-[#d4af37]/20 transition-colors">
                  <Phone size={18} className="text-[#d4af37]" />
                </div>
                <span className="text-lg font-medium">+385 99 759 3010</span>
              </a>
            </li>
            <li>
              <a href="mailto:info@apartman-lustig.com" className="flex items-center gap-3 hover:text-[#d4af37] transition-colors group mt-2">
                <div className="p-2 bg-[#14362b] rounded-lg group-hover:bg-[#d4af37]/20 transition-colors">
                  <Mail size={18} className="text-[#d4af37]" />
                </div>
                <span className="text-base">info@apartman-lustig.com</span>
              </a>
            </li>
          </ul>
        </div>
        
      </div>

     {/* Copyright i TM Studio Instagram link */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© {currentYear} Apartman Lustig. {dict.rights}</p>
        
        <p className="mt-4 md:mt-0 tracking-wider flex items-center gap-1">
          Developed by{" "}
          <a 
            href="https://instagram.com/tmstudios31" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#d4af37] font-bold hover:underline transition-all duration-300"
          >
            TM Studio
          </a>
        </p>
      </div>
    </footer>
  );
}