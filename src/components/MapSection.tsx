"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const DynamicMap = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 rounded-3xl animate-pulse flex items-center justify-center">
      <p className="text-gray-400">Učitavanje karte...</p>
    </div>
  ),
});

export default function MapSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 flex flex-col md:flex-row gap-12 items-center">
      
      {/* Tekstualni dio */}
      <div className="w-full md:w-1/3 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full w-max mb-6 font-medium">
          <MapPin size={20} />
          Savršena lokacija
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Pronađite nas u srcu Daruvara.
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Smješteni smo na idealnoj poziciji. Sve što trebate – od poznatih termalnih izvora, restorana do trgovina – nalazi se u neposrednoj blizini vašeg smještaja.
        </p>
        
        {/* Ovdje je ubačena prava adresa */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <p className="font-semibold text-gray-900 text-lg">Apartman Lustig</p>
          <p className="text-gray-600 mt-2">Ul. Antuna Matije Reljkovića 65</p>
          <p className="text-gray-600">43500 Daruvar, Hrvatska</p>
        </div>
      </div>

      {/* Mapa */}
      <div className="w-full md:w-2/3 h-[500px]">
        <DynamicMap />
      </div>

    </section>
  );
}