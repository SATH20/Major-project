import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AIPipeline from '@/components/AIPipeline';
import LiveMetrics from '@/components/LiveMetrics';
import ExplainableAI from '@/components/ExplainableAI';
import Footer from '@/components/Footer';
import BackgroundGrid from '@/components/BackgroundGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0F1F] text-[#E8EBF3] font-sans">
      <BackgroundGrid />
      <Navbar />
      <Hero />
      <AIPipeline />
      <LiveMetrics />
      <Features />
      <ExplainableAI />
      <Footer />
    </div>
  );
}
