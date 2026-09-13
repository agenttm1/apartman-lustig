import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Nedostaju parametri' }, { status: 400 });
    }

    // 1. Ažuriranje statusa u bazi s admin pravima
    const { data: reservation, error } = await supabase
      .from('reservations')
      .update({ status: status })
      .eq('id', id)
      .select('guest_email, guest_name, start_date, end_date')
      .single();

    if (error || !reservation) {
      console.error("Greška baze:", error);
      return NextResponse.json({ error: 'Greška pri ažuriranju baze' }, { status: 500 });
    }

    // 2. Automatsko slanje e-maila gostu preko EmailJS-a
    const dates = `${format(new Date(reservation.start_date), "dd.MM.")} - ${format(new Date(reservation.end_date), "dd.MM.yyyy.")}`;
    const statusText = status === 'confirmed' ? 'Potvrđeno ✅' : 'Odbijeno ❌';

    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_5qkecnz',
          template_id: 'template_lprv7rh',
          user_id: 'rzlxfCMQGh99FE4o7',
          template_params: {
            to_email: reservation.guest_email,
            guest_name: reservation.guest_name,
            dates: dates,
            status: statusText,
            status_link: `http://localhost:3000/status/${id}`
          }
        })
      });
    } catch (emailErr) {
      console.error("EmailJS greška:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Serverska greška:", err);
    return NextResponse.json({ error: 'Serverska greška' }, { status: 500 });
  }
}