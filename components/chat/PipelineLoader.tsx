'use client';

import { useState, useEffect } from 'react';
import { User, Cpu, Brain, Shield, CheckCircle, ArrowRight } from 'lucide-react';

interface PipelineLoaderProps {
  currentStep: number;
  totalSteps?: number;
}

const pipelineSteps = [
  { icon: User, label: 'User Data', color: '#4F7FFF' },
  { icon: Cpu, label: 'Features', color: '#9B6BFF' },
  { icon: Brain, label: 'Model', color: '#4F7FFF' },
  { icon: Shield, label: 'Fraud', color: '#FF5C5C' },
  { icon: CheckCircle, label: 'Decision', color: '#2EE59D' },
];

export default function PipelineLoader({ currentStep, totalSteps = 5 }: PipelineLoaderProps) {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % pipelineSteps.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-6 animate-fadeIn">
      <div className="text-center mb-6">
        <h3 className="font-semibold text-[#E8EBF3] mb-1">Processing Pipeline</h3>
        <p className="text-xs text-[#8A8FA3]">Analyzing borrower data...</p>
      </div>

      {/* Pipeline Visualization */}
      <div className="flex items-center justify-between mb-6">
        {pipelineSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;
          const isPulsing = index === pulseIndex && index <= currentStep;

          return (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-[#4F7FFF] to-[#9B6BFF]' 
                      : 'bg-[#1E2642]'
                  } ${isCurrent ? 'animate-pulse-glow scale-110' : ''} ${isPulsing ? 'scale-105' : ''}`}
                  style={isActive ? { boxShadow: `0 0 20px ${step.color}40` } : {}}
                >
                  <Icon size={20} className={isActive ? 'text-white' : 'text-[#8A8FA3]'} />
                </div>
                <span className={`text-xs mt-2 ${isActive ? 'text-[#E8EBF3]' : 'text-[#8A8FA3]'}`}>
                  {step.label}
                </span>
              </div>
              
              {index < pipelineSteps.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 relative">
                  <div className="absolute inset-0 bg-[#1E2642]" />
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#4F7FFF] to-[#9B6BFF] transition-all duration-500"
                    style={{ width: index < currentStep ? '100%' : '0%' }}
                  />
                  {index === currentStep && (
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#4F7FFF] to-transparent animate-shimmer"
                      style={{ width: '50%', backgroundSize: '200% 100%' }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-[#8A8FA3]">Progress</span>
          <span className="text-[#4F7FFF] font-semibold">{Math.round((currentStep / (totalSteps - 1)) * 100)}%</span>
        </div>
        <div className="h-2 bg-[#1E2642] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#4F7FFF] to-[#9B6BFF] rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step Info */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
          <div className="w-2 h-2 rounded-full bg-[#4F7FFF] animate-pulse" />
          <span className="text-[#8A8FA3]">{pipelineSteps[currentStep]?.label || 'Processing'}...</span>
        </div>
      </div>
    </div>
  );
}
