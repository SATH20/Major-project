'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Info, TrendingUp, TrendingDown } from 'lucide-react';

const featureImportance = [
  { name: 'Payment History', value: 35, impact: 'positive', description: 'Consistent on-time payments across accounts' },
  { name: 'Credit Utilization', value: 25, impact: 'positive', description: 'Low utilization ratio (< 30%)' },
  { name: 'Account Age', value: 15, impact: 'neutral', description: 'Average account age of 2.3 years' },
  { name: 'Income Stability', value: 12, impact: 'positive', description: 'Stable employment for 18+ months' },
  { name: 'Debt-to-Income', value: 8, impact: 'negative', description: 'DTI ratio slightly above optimal' },
  { name: 'Recent Inquiries', value: 5, impact: 'neutral', description: '2 hard inquiries in last 6 months' },
];

export default function ExplainableAI() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState(featureImportance.map(() => 0));
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
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

    const duration = 1500;
    const steps = 40;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setAnimatedValues(
        featureImportance.map((feature) => {
          const progress = currentStep / steps;
          return feature.value * progress;
        })
      );

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isVisible]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return '#2EE59D';
      case 'negative': return '#FF5C5C';
      default: return '#4F7FFF';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingUp size={14} className="text-[#2EE59D]" />;
      case 'negative': return <TrendingDown size={14} className="text-[#FF5C5C]" />;
      default: return <Info size={14} className="text-[#4F7FFF]" />;
    }
  };

  return (
    <section id="explainability" ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Explanation */}
        <div className="space-y-8">
          <div>
            <span className="text-[#9B6BFF] text-sm font-semibold tracking-wider uppercase mb-4 block">
              Explainable AI
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space)]">
              Understand Every <span className="gradient-text">Decision</span>
            </h2>
            <p className="text-[#8A8FA3] leading-relaxed">
              LendNova provides complete transparency into credit decisions. Every prediction 
              comes with a detailed breakdown of contributing factors, enabling borrowers to 
              understand and improve their creditworthiness.
            </p>
          </div>

          {/* Decision Summary */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#2EE59D]/10 flex items-center justify-center">
                <CheckCircle className="text-[#2EE59D]" size={24} />
              </div>
              <div>
                <div className="font-semibold text-[#E8EBF3]">Application Approved</div>
                <div className="text-sm text-[#8A8FA3]">Decision made at 2:34 PM</div>
              </div>
            </div>
            
            <div className="bg-[#0A0F1F]/50 rounded-lg p-4 text-sm text-[#8A8FA3]">
              <p className="mb-2">
                <span className="text-[#2EE59D] font-medium">Primary factors:</span> Strong payment history 
                and low credit utilization demonstrate responsible credit management.
              </p>
              <p>
                <span className="text-[#FFB84D] font-medium">Improvement area:</span> Reducing debt-to-income 
                ratio could improve future credit terms.
              </p>
            </div>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-lg p-4">
              <div className="text-2xl font-bold text-[#2EE59D] mb-1">6</div>
              <div className="text-xs text-[#8A8FA3]">Factors Analyzed</div>
            </div>
            <div className="glass rounded-lg p-4">
              <div className="text-2xl font-bold text-[#4F7FFF] mb-1">94%</div>
              <div className="text-xs text-[#8A8FA3]">Confidence Level</div>
            </div>
          </div>
        </div>

        {/* Right: Feature Importance Chart */}
        <div 
          className={`glass-card rounded-2xl p-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-[#E8EBF3]">Feature Importance</h3>
            <span className="text-xs text-[#8A8FA3]">Click for details</span>
          </div>

          <div className="space-y-4">
            {featureImportance.map((feature, index) => (
              <div 
                key={feature.name}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedFeature === index ? 'scale-[1.02]' : ''
                }`}
                onClick={() => setSelectedFeature(selectedFeature === index ? null : index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getImpactIcon(feature.impact)}
                    <span className="text-sm text-[#E8EBF3]">{feature.name}</span>
                  </div>
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: getImpactColor(feature.impact) }}
                  >
                    {Math.round(animatedValues[index])}%
                  </span>
                </div>
                
                <div className="h-3 bg-[#1E2642] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${animatedValues[index]}%`,
                      backgroundColor: getImpactColor(feature.impact),
                      transitionDelay: `${index * 100}ms`,
                    }}
                  />
                </div>

                {/* Expanded details */}
                {selectedFeature === index && (
                  <div className="mt-3 p-3 bg-[#0A0F1F]/50 rounded-lg text-xs text-[#8A8FA3] animate-fadeIn">
                    {feature.description}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-6 border-t border-[#4F7FFF]/10 flex justify-center gap-6 text-xs">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#2EE59D]" />
              Positive Impact
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5C5C]" />
              Negative Impact
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#4F7FFF]" />
              Neutral
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
