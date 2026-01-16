'use client';

import { useEffect, useRef, useState } from 'react';
import { User, Cpu, Brain, Shield, CheckCircle, ArrowRight } from 'lucide-react';

const pipelineSteps = [
  {
    icon: User,
    title: 'User Data',
    description: 'Alternative data collection',
    details: ['Demographics', 'Transaction History', 'Digital Footprint'],
    color: '#4F7FFF',
  },
  {
    icon: Cpu,
    title: 'Feature Engineering',
    description: 'Data transformation & extraction',
    details: ['150+ Features', 'Normalization', 'Missing Value Handling'],
    color: '#9B6BFF',
  },
  {
    icon: Brain,
    title: 'ML Models',
    description: 'Ensemble prediction',
    details: ['Logistic Regression', 'Random Forest', 'Gradient Boosting'],
    color: '#4F7FFF',
  },
  {
    icon: Shield,
    title: 'Fraud Detection',
    description: 'OCR & anomaly detection',
    details: ['Document Verification', 'Pattern Analysis', 'Risk Scoring'],
    color: '#FF5C5C',
  },
  {
    icon: CheckCircle,
    title: 'Decision',
    description: 'Explainable credit decision',
    details: ['Approval/Rejection', 'Risk Category', 'Explanation Report'],
    color: '#2EE59D',
  },
];

export default function AIPipeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section id="pipeline" ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <span className="text-[#4F7FFF] text-sm font-semibold tracking-wider uppercase mb-4 block">
          AI Decision Pipeline
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space)]">
          From Data to <span className="gradient-text">Decision</span>
        </h2>
        <p className="text-[#8A8FA3] max-w-2xl mx-auto">
          Our ML pipeline processes alternative data through multiple stages to deliver 
          accurate, fair, and explainable credit decisions.
        </p>
      </div>

      {/* Pipeline Visualization */}
      <div className="relative">
        {/* Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4F7FFF]/20 via-[#9B6BFF]/20 to-[#2EE59D]/20 -translate-y-1/2" />
        
        {/* Progress Line */}
        <div 
          className="hidden lg:block absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-[#4F7FFF] via-[#9B6BFF] to-[#2EE59D] -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(activeStep / (pipelineSteps.length - 1)) * 100}%` }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pipelineSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            const isPast = index < activeStep;

            return (
              <div
                key={step.title}
                className={`relative transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div
                  className={`glass-card rounded-xl p-6 text-center cursor-pointer ${
                    isActive ? 'border-[#4F7FFF]/50 shadow-lg shadow-[#4F7FFF]/10' : ''
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
                      isActive || isPast
                        ? 'bg-gradient-to-br from-[#4F7FFF] to-[#9B6BFF]'
                        : 'bg-[#1E2642]'
                    }`}
                  >
                    <Icon size={24} className={isActive || isPast ? 'text-white' : 'text-[#8A8FA3]'} />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-[#E8EBF3] mb-1">{step.title}</h3>
                  <p className="text-xs text-[#8A8FA3] mb-4">{step.description}</p>

                  {/* Details */}
                  <div className={`space-y-1 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                    {step.details.map((detail) => (
                      <div key={detail} className="text-xs text-[#8A8FA3] flex items-center justify-center gap-1">
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: step.color }} />
                        {detail}
                      </div>
                    ))}
                  </div>

                  {/* Confidence indicator */}
                  {isActive && (
                    <div className="mt-4 pt-4 border-t border-[#4F7FFF]/10">
                      <div className="text-xs text-[#8A8FA3]">Processing...</div>
                      <div className="h-1 bg-[#1E2642] rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full rounded-full animate-shimmer"
                          style={{ 
                            background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
                            backgroundSize: '200% 100%'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Arrow connector (mobile) */}
                {index < pipelineSteps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ArrowRight className="text-[#4F7FFF]/30 rotate-90" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Step Detail */}
      <div className="mt-12 glass-card rounded-xl p-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${pipelineSteps[activeStep].color}20` }}
          >
            {(() => {
              const Icon = pipelineSteps[activeStep].icon;
              return <Icon size={24} style={{ color: pipelineSteps[activeStep].color }} />;
            })()}
          </div>
          <div>
            <h4 className="font-semibold text-[#E8EBF3]">{pipelineSteps[activeStep].title}</h4>
            <p className="text-sm text-[#8A8FA3]">{pipelineSteps[activeStep].description}</p>
          </div>
          <div className="ml-auto text-right">
            <div className="text-2xl font-bold" style={{ color: pipelineSteps[activeStep].color }}>
              {activeStep + 1}/{pipelineSteps.length}
            </div>
            <div className="text-xs text-[#8A8FA3]">Pipeline Stage</div>
          </div>
        </div>
      </div>
    </section>
  );
}
