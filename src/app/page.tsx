import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import MapSection from "@/components/MapSection";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <BentoGrid />
      <MapSection /> 
      <Gallery /> 
      <Footer />
    </main>
  );
}