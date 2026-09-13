"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { hr } from "date-fns/locale";

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reservations, setReservations] = useState<any[]>([]);

  // Stanja za ručno blokiranje datuma
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Lustig2026") {
      setIsAuthenticated(true);
      fetchReservations();
    } else {
      alert("Pogrešna lozinka!");
    }
  };

  const fetchReservations = async () => {
    const { data } = await supabase.from("reservations").select("*").order("created_at", { ascending: false });
    setReservations(data || []);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchReservations();
    }
  }, [isAuthenticated]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        setReservations(reservations.map(res => res.id === id ? { ...res, status: newStatus } : res));
      } else {
        alert("Greška prilikom spremanja u bazu.");
      }
    } catch (err) {
      console.error("Greška:", err);
    }
  };

  // Funkcija za ručno blokiranje termina
  const handleBlockDates = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockStart || !blockEnd) {
      alert("Molimo odaberite oba datuma.");
      return;
    }

    const { error } = await supabase.from("reservations").insert([{
      guest_name: "🔒 Blokirano (Vlasnik)",
      guest_email: "vlasnik@apartman.internal",
      start_date: blockStart,
      end_date: blockEnd,
      message: "Ručno blokiran termin od strane administratora.",
      status: "confirmed" // Ovo automatski zatvara datume na kalendaru!
    }]);

    if (error) {
      alert("Greška pri blokiranju datuma.");
      console.error(error);
    } else {
      alert("Termin uspješno blokiran i zatvoren na kalendaru!");
      setBlockStart("");
      setBlockEnd("");
      fetchReservations(); // Osvježi listu
    }
  };

  // Funkcija za brisanje rezervacije/blokade
  const handleDelete = async (id: string) => {
    if (confirm("Jeste li sigurni da želite obrisati ovu stavku?")) {
      await supabase.from("reservations").delete().eq("id", id);
      setReservations(reservations.filter(res => res.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#14362b] px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-[#14362b]">Admin Login</h2>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 text-black outline-none focus:ring-2 focus:ring-[#14362b]"
            placeholder="Lozinka"
          />
          <button type="submit" className="w-full bg-[#14362b] text-[#d4af37] py-3 rounded-lg font-bold cursor-pointer">
            Uđi u sustav
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#14362b] mb-8 font-serif">Admin Panel - Apartman Lustig</h1>
        
        {/* SEKCIJA ZA RUČNO BLOKIRANJE DATUMA */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 mb-8">
          <h2 className="text-lg font-bold text-[#14362b] mb-4">Ručno blokiraj datume (Zatvori kalendar)</h2>
          <form onSubmit={handleBlockDates} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Od datuma</label>
              <input 
                type="date" 
                value={blockStart} 
                onChange={(e) => setBlockStart(e.target.value)}
                className="w-full p-3 border rounded-xl text-black outline-none focus:ring-2 focus:ring-[#14362b]"
                required
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Do datuma</label>
              <input 
                type="date" 
                value={blockEnd} 
                onChange={(e) => setBlockEnd(e.target.value)}
                className="w-full p-3 border rounded-xl text-black outline-none focus:ring-2 focus:ring-[#14362b]"
                required
              />
            </div>
            <button type="submit" className="w-full md:w-auto bg-[#14362b] text-[#d4af37] px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-[#0d261e] transition-colors">
              Blokiraj termin
            </button>
          </form>
        </div>

        {/* LISTA REZERVACIJA I BLOKADA */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
          <h2 className="text-lg font-bold text-[#14362b] mb-6">Sve rezervacije i blokade</h2>
          
          {/* Svaka rezervacija je sada u svojoj odvojenoj kartici (boxu) s razmakom space-y-4 */}
          <div className="space-y-4">
            {reservations.map((res) => (
              <div 
                key={res.id} 
                className="bg-[#FBF9F5] border border-amber-200/60 rounded-2xl p-5 flex flex-col gap-4 shadow-sm"
              >
                {/* Gornji dio kartice: Ime i Status */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-[#14362b] text-base">{res.guest_name}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${res.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : res.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                    {res.status}
                  </span>
                </div>

                {/* Sredina: Datumi i Poruka */}
                <div>
                  <p className="text-sm text-gray-700 font-semibold flex items-center gap-2">
                   {format(new Date(res.start_date), "dd.MM.yyyy.", { locale: hr })} - {format(new Date(res.end_date), "dd.MM.yyyy.", { locale: hr })}
                  </p>
                  {res.message && (
                    <p className="text-xs text-gray-600 mt-2 italic bg-white p-2.5 rounded-xl border border-amber-100">
                      "{res.message}"
                    </p>
                  )}
                </div>

                {/* Donji dio: Gumbi za akcije jasno odvojeni */}
                <div className="flex items-center gap-2 pt-3 border-t border-amber-200/40 flex-wrap">
                  {res.status !== 'confirmed' && (
                    <button onClick={() => updateStatus(res.id, 'confirmed')} className="bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-sm">
                      Potvrdi
                    </button>
                  )}
                  {res.status !== 'cancelled' && (
                    <button onClick={() => updateStatus(res.id, 'cancelled')} className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer">
                      Odbij
                    </button>
                  )}
                  <button onClick={() => handleDelete(res.id)} className="bg-gray-200 text-gray-700 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl font-medium text-xs transition-colors cursor-pointer ml-auto">
                    Obriši
                  </button>
                </div>

              </div>
            ))}
            
            {reservations.length === 0 && (
              <div className="p-8 text-center text-gray-400">Nema evidentiranih rezervacija.</div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}