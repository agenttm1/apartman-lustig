"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Obavezan uvoz CSS-a za Leaflet
import L from "leaflet";

// Koordinate za Daruvar (možeš ih kasnije fino podesiti na točnu adresu)
const position: [number, number] = [45.599304, 17.223476];

// Kreiranje modernog custom pina pomoću čistog HTML-a i CSS-a
const customIcon = L.divIcon({
  className: "bg-transparent", // Uklanjamo defaultni Leaflet okvir
  html: `
    <div style="
      background-color: #2563eb; 
      width: 3rem; 
      height: 3rem; 
      border-radius: 50% 50% 50% 0; 
      transform: rotate(-45deg); 
      border: 3px solid white; 
      box-shadow: 0 4px 6px rgba(0,0,0,0.3); 
      display: flex; 
      align-items: center; 
      justify-content: center;
    ">
      <div style="width: 1rem; height: 1rem; background-color: white; border-radius: 50%;"></div>
    </div>
  `,
  iconSize: [48, 48], // Veličina cijelog bloka
  iconAnchor: [24, 48], // Točka koja točno dodiruje tlo (sredina dolje)
  popupAnchor: [0, -48], // Gdje iskače prozorčić u odnosu na pin
});

export default function Map() {
  return (
    // z-0 osigurava da mapa ne prekriva padajuće izbornike ili modale
    <div className="w-full h-full relative z-0 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={false} // Isključujemo zoom na scroll da ne smeta pri čitanju stranice
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup className="rounded-xl">
            <div className="text-center p-1">
              <h3 className="font-bold text-gray-900">Apartman Lustig</h3>
              <p className="text-sm text-gray-600">Vaša oaza u Daruvaru</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}