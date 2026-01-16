'use client';

import { useState, useEffect, useRef } from 'react';
import { GitCompare, CheckCircle, Star, BarChart3 } from 'lucide-react';

interface ModelData {
  name: string;
  accuracy: number;
  explainability: number;
  latency: string;
  recommended?: boolean;
}

interface ModelComparisonCardProps {
  models: ModelData[];
}

export default function ModelComparisonCard({ models }: ModelComparisonCardProps) {
  const [animatedValues, setAnimatedValues] = useState(models.map(() => ({ accuracy: 0, explainability: 0 })));
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
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedValues(models.map((m) => ({
        accuracy: m.accuracy * eased,
        explainability: m.explainability * eased,
      })));

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [models]);

  const getModelColor = (index: number) => {
    const colors = ['#4F7FFF', '#9B6BFF', '#2EE59D'];
    return colors[index % colors.length];
  };

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden animate-fadeIn">
      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#4F7FFF]/10 rounded-full blur-[60px]" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#9B6BFF]/10 rounded-full blur-[60px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F7FFF] to-[#2EE59D] flex items-center justify-center">
              <GitCompare size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#E8EBF3]">Model Comparison</h3>
              <p className="text-xs text-[#8A8FA3]">Performance Analysis</p>
            </div>
          </div>
        </div>

        {/* Models Grid */}
        <div className="space-y-4 mb-6">
          {models.map((model, index) => (
            <div 
              key={model.name}
              className={`p-4 rounded-xl border transition-all ${
                model.recommended 
                  ? 'bg-[#2EE59D]/5 border-[#2EE59D]/30' 
                  : 'bg-[#0A0F1F]/30 border-[#4F7FFF]/10 hover:border-[#4F7FFF]/30'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getModelColor(index) }}
                  />
                  <span className="font-medium text-[#E8EBF3]">{model.name}</span>
                </div>
                {model.recommended && (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#2EE59D]/10 text-[#2EE59D] text-xs font-semibold">
                    <Star size={12} fill="currentColor" />
                    Recommended
                  </span>
                )}
              </div>

              {/* Accuracy Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#8A8FA3]">Accuracy</span>
                  <span className="text-[#E8EBF3] font-semibold">{animatedValues[index].accuracy.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-[#1E2642] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${animatedValues[index].accuracy}%`,
                      backgroundColor: getModelColor(index),
                    }}
                  />
                </div>
              </div>

              {/* Explainability Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#8A8FA3]">Explainability</span>
                  <span className="text-[#E8EBF3] font-semibold">{animatedValues[index].explainability.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-[#1E2642] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${animatedValues[index].explainability}%`,
                      backgroundColor: getModelColor(index),
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>

              {/* Latency */}
              <div className="flex justify-between text-xs">
                <span className="text-[#8A8FA3]">Latency</span>
                <span className="text-[#4F7FFF] font-mono">{model.latency}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="p-4 bg-[#0A0F1F]/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={16} className="text-[#4F7FFF]" />
            <span className="text-sm font-medium text-[#E8EBF3]">Analysis Summary</span>
          </div>
          <p className="text-xs text-[#8A8FA3]">
            Gradient Boosting provides the best balance of accuracy and explainability for this assessment. 
            Consider Logistic Regression for faster inference in high-volume scenarios.
          </p>
        </div>
      </div>
    </div>
  );
}
