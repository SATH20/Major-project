'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Shield, Activity } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#0A0F1F]/90 backdrop-blur-xl py-3 border-b border-[#4F7FFF]/10' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4F7FFF] to-[#9B6BFF] flex items-center justify-center">
            <Activity size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight font-[family-name:var(--font-space)]">
            Lend<span className="text-[#4F7FFF]">Nova</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#8A8FA3]">
          <a href="#pipeline" className="hover:text-[#4F7FFF] transition-colors">AI Pipeline</a>
          <a href="#features" className="hover:text-[#4F7FFF] transition-colors">Capabilities</a>
          <a href="#explainability" className="hover:text-[#4F7FFF] transition-colors">Explainability</a>
          <a href="#security" className="hover:text-[#4F7FFF] transition-colors">Security</a>
          <a href="#tech" className="hover:text-[#4F7FFF] transition-colors">Tech Stack</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="#architecture" className="text-sm font-medium hover:text-[#E8EBF3] text-[#8A8FA3] transition-colors flex items-center gap-2">
            <Shield size={16} />
            View Architecture
          </a>
          <button 
            onClick={() => router.push('/chat')}
            className="bg-gradient-to-r from-[#4F7FFF] to-[#9B6BFF] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-[#4F7FFF]/25 transition-all hover:-translate-y-0.5"
          >
            Run Assessment
          </button>
        </div>

        <button 
          className="md:hidden text-[#8A8FA3] hover:text-[#E8EBF3] transition-colors" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-b border-[#4F7FFF]/10 p-6 flex flex-col gap-4">
          <a href="#pipeline" className="text-[#8A8FA3] hover:text-[#4F7FFF] transition-colors">AI Pipeline</a>
          <a href="#features" className="text-[#8A8FA3] hover:text-[#4F7FFF] transition-colors">Capabilities</a>
          <a href="#explainability" className="text-[#8A8FA3] hover:text-[#4F7FFF] transition-colors">Explainability</a>
          <a href="#security" className="text-[#8A8FA3] hover:text-[#4F7FFF] transition-colors">Security</a>
          <div className="h-px bg-[#4F7FFF]/10 my-2"></div>
          <button 
            onClick={() => { router.push('/chat'); setIsMobileMenuOpen(false); }}
            className="bg-gradient-to-r from-[#4F7FFF] to-[#9B6BFF] text-white px-4 py-3 rounded-lg text-center font-semibold"
          >
            Run Assessment
          </button>
        </div>
      )}
    </nav>
  );
}
