import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Map from "@/components/Map"; 
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { getDictionary } from '@/lib/dictionary';

type Props = {
  params: Promise<{ lang: 'hr' | 'en' | 'de' | 'hu' | 'cs' }>;
};

export default async function Home({ params }: Props) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-white">
      <Hero dict={dict.hero} />
      <BentoGrid dict={dict.bento} />
      <Map dict={dict.map} /> 
      <Gallery dict={dict.gallery} /> 
      <Footer dict={dict.footer} />
    </main>
  );
}