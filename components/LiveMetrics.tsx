'use client';

import { useEffect, useRef, useState } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Info, BarChart3 } from 'lucide-react';

const metrics = [
  {
    id: 'credit-score',
    label: 'Credit Risk Score',
    value: 742,
    max: 850,
    unit: '',
    color: '#2EE59D',
    icon: TrendingUp,
    tooltip: 'Composite score based on alternative data analysis. Higher scores indicate lower credit risk.',
  },
  {
    id: 'approval',
    label: 'Approval Probability',
    value: 87.3,
    max: 100,
    unit: '%',
    color: '#4F7FFF',
    icon: CheckCircle,
    tooltip: 'Likelihood of loan approval based on current profile and historical patterns.',
  },
  {
    id: 'fraud',
    label: 'Fraud Likelihood',
    value: 2.1,
    max: 100,
    unit: '%',
    color: '#FF5C5C',
    icon: AlertTriangle,
    tooltip: 'Risk assessment from OCR document verification and behavioral analysis.',
  },
];

export default function LiveMetrics() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0));
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setAnimatedValues(
        metrics.map((metric) => {
          const progress = currentStep / steps;
          const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
          return metric.value * eased;
        })
      );

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#9B6BFF] text-sm font-semibold tracking-wider uppercase mb-4 block">
            Real-Time Analytics
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space)]">
            Live AI <span className="gradient-text">Metrics</span>
          </h2>
          <p className="text-[#8A8FA3] max-w-2xl mx-auto">
            Monitor credit assessment metrics in real-time with full transparency into model predictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const animatedValue = animatedValues[index];
            const percentage = (animatedValue / metric.max) * 100;

            return (
              <div
                key={metric.id}
                className={`glass-card rounded-2xl p-8 relative overflow-hidden transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Background glow */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20"
                  style={{ backgroundColor: metric.color }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${metric.color}15` }}
                    >
                      <Icon size={24} style={{ color: metric.color }} />
                    </div>
                    <button
                      className="text-[#8A8FA3] hover:text-[#E8EBF3] transition-colors relative"
                      onMouseEnter={() => setActiveTooltip(metric.id)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <Info size={18} />
                      {activeTooltip === metric.id && (
                        <div className="absolute right-0 top-full mt-2 w-64 p-3 glass rounded-lg text-xs text-left z-20">
                          {metric.tooltip}
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Value */}
                  <div className="mb-4">
                    <div 
                      className="text-5xl font-bold font-[family-name:var(--font-space)] mb-1"
                      style={{ color: metric.color }}
                    >
                      {metric.id === 'credit-score' 
                        ? Math.round(animatedValue)
                        : animatedValue.toFixed(1)
                      }
                      <span className="text-2xl">{metric.unit}</span>
                    </div>
                    <div className="text-[#8A8FA3] text-sm">{metric.label}</div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="h-2 bg-[#1E2642] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: metric.color,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-[#8A8FA3]">
                      <span>0</span>
                      <span>{metric.max}{metric.unit}</span>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="mt-6 pt-4 border-t border-[#4F7FFF]/10 flex items-center justify-between">
                    <span className="text-xs text-[#8A8FA3]">Model: Ensemble v2.4</span>
                    <span 
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: `${metric.color}15`,
                        color: metric.color 
                      }}
                    >
                      {metric.id === 'fraud' ? 'LOW RISK' : 'OPTIMAL'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Preview */}
        <div className="mt-12 glass-card rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-[#4F7FFF]" />
              <span className="font-semibold">Score Distribution Analysis</span>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#2EE59D]" />
                Approved
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5C5C]" />
                Rejected
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4F7FFF]" />
                Review
              </span>
            </div>
          </div>
          
          {/* Simple bar chart visualization */}
          <div className="flex items-end justify-between h-40 gap-2">
            {[35, 45, 60, 75, 90, 85, 70, 55, 40, 30, 25, 20].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className="w-full rounded-t transition-all duration-500"
                  style={{ 
                    height: isVisible ? `${height}%` : '0%',
                    backgroundColor: height > 70 ? '#2EE59D' : height > 40 ? '#4F7FFF' : '#FF5C5C',
                    transitionDelay: `${i * 50}ms`
                  }}
                />
                <span className="text-[10px] text-[#8A8FA3]">{300 + i * 50}</span>
              </div>
            ))}
          </div>
          <div className="text-center text-xs text-[#8A8FA3] mt-4">Credit Score Range</div>
        </div>
      </div>
    </section>
  );
}
