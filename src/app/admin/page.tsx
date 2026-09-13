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
      fetchReservations(); // Osvježi tablicu
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
      <div className="min-h-screen flex items-center justify-center bg-[#14362b]">
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
    <div className="min-h-screen bg-[#FBF9F5] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#14362b] mb-8 font-serif">Admin Panel - Apartman Lustig</h1>
        
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

        {/* TABLICA REZERVACIJA I BLOKADA */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-[#14362b]">Sve rezervacije i blokade</h2>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-xs font-bold uppercase text-gray-500">Gost / Naziv</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-500">Datumi</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-500">Status</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-500">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-[#14362b]">{res.guest_name}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {format(new Date(res.start_date), "dd.MM.yyyy.", { locale: hr })} - {format(new Date(res.end_date), "dd.MM.yyyy.", { locale: hr })}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${res.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : res.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="p-4 space-x-3">
                    {res.status !== 'confirmed' && (
                      <button onClick={() => updateStatus(res.id, 'confirmed')} className="text-emerald-700 font-bold hover:underline text-sm cursor-pointer">
                        Potvrdi
                      </button>
                    )}
                    {res.status !== 'cancelled' && (
                      <button onClick={() => updateStatus(res.id, 'cancelled')} className="text-red-600 font-bold hover:underline text-sm cursor-pointer">
                        Odbij
                      </button>
                    )}
                    <button onClick={() => handleDelete(res.id)} className="text-gray-400 hover:text-red-600 text-sm font-medium cursor-pointer">
                      Obriši
                    </button>
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-400">Nema evidentiranih rezervacija.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}