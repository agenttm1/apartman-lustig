"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import { X } from "lucide-react";
import { DayPicker, DateRange } from "react-day-picker";
import { format } from "date-fns";
import { hr } from "date-fns/locale";
import { supabase } from "@/lib/supabase";
import "react-day-picker/style.css";

export default function BookingForm({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [bookedDates, setBookedDates] = useState<{from: Date, to: Date}[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    async function fetchBookedDates() {
      const { data, error } = await supabase
        .from('reservations')
        .select('start_date, end_date')
        .in('status', ['confirmed', 'pending']); 
      
      if (data) {
        const formattedDates = data.map((res) => ({
          from: new Date(res.start_date),
          to: new Date(res.end_date)
        }));
        setBookedDates(formattedDates);
      }
    }
    fetchBookedDates();
  }, []);

  const disabledDates = [{ before: new Date() }, ...bookedDates];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateRange?.from || !dateRange?.to) {
      alert("Molimo odaberite datum dolaska i odlaska.");
      return;
    }
    setStatus("loading");

    // 1. SPREMANJE U SUPABASE BAZU
    const { data: newReservation, error: dbError } = await supabase
      .from('reservations')
      .insert([{
        guest_name: formData.name,
        guest_email: formData.email,
        start_date: format(dateRange.from, 'yyyy-MM-dd'),
        end_date: format(dateRange.to, 'yyyy-MM-dd'),
        message: formData.message,
        status: 'pending'
      }])
      .select('id')
      .single();

    if (dbError || !newReservation) {
      console.error("Greška baze:", dbError);
      setStatus("error");
      return;
    }

    const reservationId = newReservation.id;
    const formattedDates = `${format(dateRange.from, "dd.MM.yyyy.")} - ${format(dateRange.to, "dd.MM.yyyy.")}`;
    const statusLink = `http://localhost:3000/status/${reservationId}`;

    // 2. SLANJE MAIL-A PREKO EMAILJS-a
    // Ovdje upiši svoje prave EmailJS podatke (Service ID, Template ID, Public Key)
    const serviceID = "service_5qkecnz"; 
    const ownerTemplateID = "template_2qxt7ml";
    const guestTemplateID = "template_lprv7rh";
    const publicKey = "rzlxfCMQGh99FE4o7"; 

    try {
  // 2a. Slanje e-maila VLASNIKU (tebi)
   await emailjs.send(serviceID, ownerTemplateID, {
     guest_name: formData.name,
     guest_email: formData.email,
     dates: formattedDates,
     message: formData.message,
     reservation_id: reservationId
   }, publicKey);

  // 2b. Slanje e-maila GOSTU (potvrda o primitku)
   await emailjs.send(serviceID, guestTemplateID, {
     to_email: formData.email, // Varijabla koja šalje mail na gostovu adresu
     guest_name: formData.name,
     dates: formattedDates,
     status: "Na čekanju (Pending)",
     status_link: statusLink
   }, publicKey);
  
  } catch (err) {
    console.error("EmailJS greška pri slanju:", err);
  }
    // 3. PRIKAZ USPJEHA
    setStatus("success");
    setBookedDates(prev => [...prev, { from: dateRange.from!, to: dateRange.to! }]);
    
    setTimeout(() => {
      setIsOpen(false);
      setStatus("idle");
      setFormData({ name: "", email: "", message: "" });
      setDateRange(undefined);
    }, 3500);
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="inline-block cursor-pointer">
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl relative pointer-events-auto flex flex-col md:flex-row overflow-hidden max-h-[90vh] overflow-y-auto border border-amber-100">
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-emerald-900 transition-colors z-10"
                >
                  <X size={24} />
                </button>

                {/* LIJEVA STRANA: Kalendar */}
                <div className="w-full md:w-1/2 p-8 bg-[#FBF9F5] border-r border-amber-100/60 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold text-[#14362b] mb-4 font-serif">Odaberite datume</h3>
                  
                  <DayPicker
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    locale={hr}
                    disabled={disabledDates}
                    className="custom-calendar bg-white p-4 rounded-2xl shadow-sm border border-amber-100"
                  />
                  
                  <div className="mt-4 text-xs font-medium text-red-600/80 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span>
                    Sivi i prekriženi datumi su zauzeti.
                  </div>
                </div>

                {/* DESNA STRANA: Forma / Poruka o uspjehu */}
                <div className="w-full md:w-1/2 p-8 bg-white flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-[#14362b] mb-2 font-serif">Vaši podaci</h2>
                  <p className="text-gray-600 mb-8 text-sm">
                    {dateRange?.from && dateRange?.to 
                      ? `Odabrano: ${format(dateRange.from, "dd.MM.")} do ${format(dateRange.to, "dd.MM.")}` 
                      : "Prvo odaberite željene datume u kalendaru."}
                  </p>

                  {status === "success" ? (
                    <div className="bg-[#e5ede9] text-[#14362b] p-6 rounded-2xl text-center font-medium border border-[#14362b]/20 shadow-sm">
                      <p className="font-bold text-lg mb-1">Uspješno poslan upit!</p>
                      <p className="text-sm">Zabilježili smo vašu rezervaciju. Javit ćemo vam se uskoro s potvrdom.</p>
                    </div>
                  ) : (
                    <form onSubmit={sendEmail} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#14362b] mb-1">Ime i Prezime</label>
                        <input
                          type="text" name="name" required value={formData.name} onChange={handleChange}
                          placeholder="Unesite vaše ime..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#14362b] font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-[#14362b] focus:border-transparent outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#14362b] mb-1">E-mail adresa</label>
                        <input
                          type="email" name="email" required value={formData.email} onChange={handleChange}
                          placeholder="vas@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#14362b] font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-[#14362b] focus:border-transparent outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#14362b] mb-1">Dodatne napomene</label>
                        <textarea
                          name="message" rows={2} value={formData.message} onChange={handleChange}
                          placeholder="Imate li posebnih želja?"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#14362b] font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-[#14362b] focus:border-transparent outline-none text-sm resize-none"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        disabled={status === "loading" || !dateRange?.from || !dateRange?.to}
                        className="w-full py-4 px-6 bg-[#14362b] hover:bg-[#0d261e] text-[#d4af37] rounded-xl font-bold tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg cursor-pointer"
                      >
                        {status === "loading" ? "Slanje u tijeku..." : "Pošalji upit za rezervaciju"}
                      </button>
                      {status === "error" && (
                        <p className="text-red-600 text-xs text-center font-medium mt-2">Došlo je do pogreške pri spremanju. Pokušajte ponovno.</p>
                      )}
                    </form>
                  )}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}