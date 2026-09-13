"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { hr } from "date-fns/locale";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Clock, XCircle, ArrowLeft } from "lucide-react";

export default function StatusPage() {
  const params = useParams();
  const id = params?.id as string;

  // Koristimo <any> da potpuno ugasimo TypeScript greške za ovaj dio
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    async function fetchReservation() {
      const { data, error: dbError } = await supabase
        .from("reservations")
        .select("*")
        .eq("id", id)
        .single();

      if (dbError || !data) {
        setError(true);
      } else {
        setReservation(data);
      }
      setLoading(false);
    }

    fetchReservation();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14362b]"></div>
      </div>
    );
  }

  if (error || !reservation) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-amber-100">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#14362b] mb-2 font-serif">Greška</h2>
          <p className="text-gray-600 mb-6">Rezervacija nije pronađena ili je link neispravan.</p>
          <Link href="/" className="inline-block bg-[#14362b] text-[#d4af37] px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105">
            Povratak na naslovnicu
          </Link>
        </div>
      </div>
    );
  }

  // Određivanje izgleda statusa
  let statusIcon;
  let statusText = "Na čekanju";
  let statusColor = "text-amber-700";
  let statusBg = "bg-amber-50 border-amber-200";
  
  if (reservation.status === "confirmed") {
    statusIcon = <CheckCircle className="w-10 h-10 text-emerald-600 mb-2" />;
    statusText = "Rezervacija Potvrđena";
    statusColor = "text-emerald-700";
    statusBg = "bg-emerald-50 border-emerald-200";
  } else if (reservation.status === "cancelled") {
    statusIcon = <XCircle className="w-10 h-10 text-red-600 mb-2" />;
    statusText = "Termin je zauzet / Odbijeno";
    statusColor = "text-red-700";
    statusBg = "bg-red-50 border-red-200";
  } else {
    statusIcon = <Clock className="w-10 h-10 text-amber-600 mb-2" />;
  }

  const formattedStart = format(new Date(reservation.start_date), "dd. MMMM yyyy.", { locale: hr });
  const formattedEnd = format(new Date(reservation.end_date), "dd. MMMM yyyy.", { locale: hr });

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl max-w-lg w-full border border-amber-100 relative"
      >
        <Link href="/" className="absolute top-6 left-6 text-gray-400 hover:text-[#14362b] transition-colors flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} /> Nazad
        </Link>

        <div className="text-center mt-6 mb-8">
          <h1 className="text-3xl font-bold text-[#14362b] font-serif mb-2">Apartman Lustig</h1>
          <p className="text-gray-500 text-sm uppercase tracking-widest">Status Vašeg Upita</p>
        </div>

        <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${statusBg} mb-8`}>
          {statusIcon}
          <h2 className={`text-xl font-bold ${statusColor}`}>{statusText}</h2>
          {reservation.status === "pending" && (
            <p className="text-sm text-center mt-2 text-amber-800/80">
              Vaš upit je zaprimljen. Domaćin će uskoro provjeriti raspoloživost i potvrditi rezervaciju.
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <span className="text-gray-500 text-sm">Gost</span>
            <span className="font-bold text-[#14362b]">{reservation.guest_name}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <span className="text-gray-500 text-sm">Datum dolaska</span>
            <span className="font-bold text-[#14362b]">{formattedStart}</span>
          </div>
          <div className="flex justify-between items-center pb-2">
            <span className="text-gray-500 text-sm">Datum odlaska</span>
            <span className="font-bold text-[#14362b]">{formattedEnd}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}