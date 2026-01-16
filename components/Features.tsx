'use client';

import { useEffect, useRef, useState } from 'react';
import { Database, Scale, Brain, ScanEye, Lock, Zap } from 'lucide-react';

const features = [
  {
    icon: Database,
    title: 'Alternative Data Engine',
    description: 'Analyze non-traditional data sources including digital footprint, transaction patterns, and behavioral signals to assess creditworthiness for thin-file borrowers.',
    gradient: 'from-[#4F7FFF] to-[#6B8FFF]',
  },
  {
    icon: Scale,
    title: 'Bias-Reduced Scoring',
    description: 'Our models are trained with fairness constraints to minimize demographic bias while maintaining predictive accuracy across all population segments.',
    gradient: 'from-[#9B6BFF] to-[#B88BFF]',
  },
  {
    icon: Brain,
    title: 'Explainable AI (XAI)',
    description: 'Every credit decision comes with a detailed explanation of contributing factors, enabling transparency and regulatory compliance.',
    gradient: 'from-[#4F7FFF] to-[#9B6BFF]',
  },
  {
    icon: ScanEye,
    title: 'OCR Fraud Detection',
    description: 'Advanced document verification using optical character recognition to detect forged documents and identity fraud in real-time.',
    gradient: 'from-[#FF5C5C] to-[#FF8080]',
  },
  {
    icon: Lock,
    title: 'Secure Data Pipeline',
    description: 'End-to-end encryption with no raw PII storage. Data is processed in secure enclaves with audit trails for compliance.',
    gradient: 'from-[#2EE59D] to-[#5FFFB8]',
  },
  {
    icon: Zap,
    title: 'Real-Time Processing',
    description: 'Sub-second credit decisions powered by optimized ML inference. Process thousands of applications simultaneously.',
    gradient: 'from-[#FFB84D] to-[#FFD080]',
  },
];

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <span className="text-[#4F7FFF] text-sm font-semibold tracking-wider uppercase mb-4 block">
          Core Capabilities
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space)]">
          Built for <span className="gradient-text">Modern Lending</span>
        </h2>
        <p className="text-[#8A8FA3] max-w-2xl mx-auto">
          Enterprise-grade features designed for accuracy, fairness, and regulatory compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={feature.title}
              className={`glass-card rounded-2xl p-8 relative overflow-hidden cursor-pointer transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient glow on hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 ${
                  isHovered ? 'opacity-5' : ''
                }`}
              />

              {/* Top border glow */}
              <div 
                className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${feature.gradient} transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div 
                  className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.gradient} transition-transform duration-300 ${
                    isHovered ? 'scale-110' : ''
                  }`}
                >
                  <Icon size={24} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-[#E8EBF3] mb-3">{feature.title}</h3>
                <p className="text-[#8A8FA3] text-sm leading-relaxed">{feature.description}</p>

                {/* Learn more link */}
                <div 
                  className={`mt-6 flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                    isHovered ? 'text-[#4F7FFF] translate-x-2' : 'text-[#8A8FA3]'
                  }`}
                >
                  <span>Learn more</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
