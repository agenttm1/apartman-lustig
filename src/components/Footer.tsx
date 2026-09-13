import { Phone, Mail, MapPin, Clock, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1f18] text-gray-300 py-16 border-t border-[#d4af37]/20 relative overflow-hidden">
      {/* Suptilni pozadinski ukras */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#d4af37] to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        
        {/* LIJEVA STRANA: O nama / Brend */}
        <div className="flex flex-col items-start">
          <h3 className="text-3xl font-serif text-white mb-6 tracking-wide drop-shadow-md">Apartman Lustig</h3>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed max-w-xs">
            Vaša oaza mira i opuštanja. Savršen spoj modernog komfora i predivne prirode za odmor koji ćete pamtiti.
          </p>
          <div className="flex space-x-4">
            <a href="#" title="Naš web" className="p-2 bg-[#14362b] rounded-full hover:bg-[#d4af37] hover:text-[#0a1f18] transition-all duration-300">
              <Globe size={20} />
            </a>
          </div>
        </div>

        {/* SREDINA: Radno vrijeme i Info */}
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-[#d4af37]">Informacije</h4>
          <ul className="space-y-4 text-sm">
            
            <li className="flex items-center gap-3 hover:text-white transition-colors">
              <MapPin size={18} className="text-[#d4af37]" />
              <span>Ul. Antuna Matije Reljkovića 65 Daruvar, Hrvatska </span>
            </li>
          </ul>
        </div>

        {/* DESNA STRANA: Kontakt */}
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-[#d4af37]">Kontakt</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="tel:+385997593010" className="flex items-center gap-3 hover:text-[#d4af37] transition-colors group">
                <div className="p-2 bg-[#14362b] rounded-lg group-hover:bg-[#d4af37]/20 transition-colors">
                  <Phone size={18} className="text-[#d4af37]" />
                </div>
                <span className="text-lg font-medium">+385 99 759 3010</span>
              </a>
            </li>
            <li>
              <a href="mailto:apartman.lustig65@gmail.com" className="flex items-center gap-3 hover:text-[#d4af37] transition-colors group mt-2">
                <div className="p-2 bg-[#14362b] rounded-lg group-hover:bg-[#d4af37]/20 transition-colors">
                  <Mail size={18} className="text-[#d4af37]" />
                </div>
                <span className="text-base">apartman.lustig65@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
        
      </div>

      {/* DONJI DIO: Copyright i Watermark */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© {currentYear} Apartman Lustig. Sva prava pridržana.</p>
        <p className="mt-4 md:mt-0 tracking-wider">
          Developed by <span className="text-[#d4af37] font-bold">TM Studio</span>
        </p>
      </div>
    </footer>
  );
}