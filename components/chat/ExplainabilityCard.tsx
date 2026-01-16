'use client';

import { useState, useEffect, useRef } from 'react';
import { Brain, TrendingUp, TrendingDown, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface Factor {
  name: string;
  impact: 'positive' | 'negative' | 'neutral';
  value: number;
  description: string;
}

interface ExplainabilityCardProps {
  factors: Factor[];
  decisionSummary: string;
}

export default function ExplainabilityCard({ factors, decisionSummary }: ExplainabilityCardProps) {
  const [animatedValues, setAnimatedValues] = useState(factors.map(() => 0));
  const [expanded, setExpanded] = useState(false);
  const [selectedFactor, setSelectedFactor] = useState<number | null>(null);
  const animationRef = useRef<boolean>(false);

  useEffect(() => {
    if (animationRef.current) return;
    animationRef.current = true;

    const duration = 1500;
    const steps = 40;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setAnimatedValues(factors.map((f) => f.value * progress));

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [factors]);

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
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden animate-fadeIn">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#9B6BFF]/10 rounded-full blur-[60px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9B6BFF] to-[#4F7FFF] flex items-center justify-center">
              <Brain size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#E8EBF3]">Decision Explainability</h3>
              <p className="text-xs text-[#8A8FA3]">Top Contributing Factors</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#9B6BFF]/10 text-[#9B6BFF] border border-[#9B6BFF]/30">
            XAI ENABLED
          </span>
        </div>

        {/* Factor Bars */}
        <div className="space-y-4 mb-6">
          {factors.map((factor, index) => (
            <div 
              key={factor.name}
              className="cursor-pointer"
              onClick={() => setSelectedFactor(selectedFactor === index ? null : index)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getImpactIcon(factor.impact)}
                  <span className="text-sm text-[#E8EBF3]">{factor.name}</span>
                </div>
                <span 
                  className="text-sm font-semibold"
                  style={{ color: getImpactColor(factor.impact) }}
                >
                  {factor.impact === 'positive' ? '+' : factor.impact === 'negative' ? '-' : ''}{Math.round(animatedValues[index])}%
                </span>
              </div>
              
              <div className="h-2 bg-[#1E2642] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${animatedValues[index]}%`,
                    backgroundColor: getImpactColor(factor.impact),
                    transitionDelay: `${index * 100}ms`,
                  }}
                />
              </div>

              {/* Expanded details */}
              {selectedFactor === index && (
                <div className="mt-2 p-3 bg-[#0A0F1F]/50 rounded-lg text-xs text-[#8A8FA3] animate-fadeIn">
                  {factor.description}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 text-xs mb-6">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#2EE59D]" />
            Positive
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5C5C]" />
            Negative
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#4F7FFF]" />
            Neutral
          </span>
        </div>

        {/* Expandable Summary */}
        <div className="border-t border-[#4F7FFF]/10 pt-4">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between text-sm text-[#8A8FA3] hover:text-[#E8EBF3] transition-colors"
          >
            <span className="font-medium">Why this decision?</span>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          {expanded && (
            <div className="mt-4 p-4 bg-[#0A0F1F]/50 rounded-lg text-sm text-[#8A8FA3] leading-relaxed animate-fadeIn">
              {decisionSummary}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
