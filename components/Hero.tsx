'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Play, TrendingUp, Shield, Brain } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto z-10 min-h-screen flex flex-col justify-center">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-[#8A8FA3] hover:border-[#4F7FFF]/30 transition-colors cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-[#2EE59D] animate-pulse"></span>
            <span>AI-Powered Credit Intelligence</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight font-[family-name:var(--font-space)]">
            Intelligent Credit Scoring for{' '}
            <span className="gradient-text">First-Time Borrowers</span>
          </h1>
          
          <p className="text-lg text-[#8A8FA3] max-w-xl leading-relaxed">
            LendNova leverages alternative data sources and explainable ML models to provide 
            fair, transparent credit decisions. Reduce bias, detect fraud, and understand 
            every prediction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#demo" 
              className="group bg-gradient-to-r from-[#4F7FFF] to-[#9B6BFF] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-[#4F7FFF]/25 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Run Credit Assessment
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#architecture" 
              className="glass text-[#E8EBF3] px-8 py-4 rounded-xl font-semibold text-lg hover:border-[#4F7FFF]/40 transition-all flex items-center justify-center gap-2"
            >
              <Play size={20} className="text-[#4F7FFF]" />
              View Architecture
            </a>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex items-center gap-2 text-sm text-[#8A8FA3]">
              <Shield size={16} className="text-[#2EE59D]" />
              <span>Bank-Grade Security</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#8A8FA3]">
              <Brain size={16} className="text-[#9B6BFF]" />
              <span>Explainable AI</span>
            </div>
          </div>
        </div>

        <CreditScoreVisual />
      </div>
    </section>
  );
}

function CreditScoreVisual() {
  const [score, setScore] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const targetScore = 742;
  const targetConfidence = 94;
  const animationRef = useRef<boolean>(false);

  useEffect(() => {
    if (animationRef.current) return;
    animationRef.current = true;

    const duration = 2000;
    const steps = 60;
    const scoreIncrement = targetScore / steps;
    const confidenceIncrement = targetConfidence / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setScore(Math.min(Math.round(scoreIncrement * currentStep), targetScore));
      setConfidence(Math.min(Math.round(confidenceIncrement * currentStep), targetConfidence));
      
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  const getScoreColor = (s: number) => {
    if (s >= 700) return '#2EE59D';
    if (s >= 600) return '#4F7FFF';
    if (s >= 500) return '#FFB84D';
    return '#FF5C5C';
  };

  return (
    <div className="relative">
      <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F7FFF]/20 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#9B6BFF]/20 rounded-full blur-[60px]" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-[#8A8FA3]">Credit Assessment Result</span>
            <span className="px-3 py-1 rounded-full bg-[#2EE59D]/10 text-[#2EE59D] text-xs font-semibold">
              LOW RISK
            </span>
          </div>

          {/* Score Display */}
          <div className="text-center mb-8">
            <div className="text-7xl font-bold font-[family-name:var(--font-space)] mb-2" style={{ color: getScoreColor(score) }}>
              {score}
            </div>
            <div className="text-[#8A8FA3] text-sm">Credit Risk Score</div>
          </div>

          {/* Confidence Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#8A8FA3]">Model Confidence</span>
              <span className="text-[#4F7FFF] font-semibold">{confidence}%</span>
            </div>
            <div className="h-2 bg-[#1E2642] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#4F7FFF] to-[#9B6BFF] rounded-full transition-all duration-1000 progress-bar"
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-4">
            <MetricBox label="Approval" value="87%" color="#2EE59D" />
            <MetricBox label="Fraud Risk" value="2.1%" color="#FF5C5C" />
            <MetricBox label="Data Points" value="47" color="#4F7FFF" />
          </div>

          {/* Model Info */}
          <div className="mt-6 pt-6 border-t border-[#4F7FFF]/10">
            <div className="flex items-center justify-between text-xs text-[#8A8FA3]">
              <span>Model: Gradient Boosting Ensemble</span>
              <span className="flex items-center gap-1">
                <TrendingUp size={12} className="text-[#2EE59D]" />
                98.2% Accuracy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-4 -right-4 glass px-3 py-2 rounded-lg text-xs font-medium text-[#9B6BFF] animate-float">
        <Brain size={14} className="inline mr-1" />
        XAI Enabled
      </div>
      <div className="absolute -bottom-4 -left-4 glass px-3 py-2 rounded-lg text-xs font-medium text-[#2EE59D] animate-float" style={{ animationDelay: '1s' }}>
        <Shield size={14} className="inline mr-1" />
        Fraud Protected
      </div>
    </div>
  );
}

function MetricBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-[#0A0F1F]/50 rounded-lg p-3 text-center">
      <div className="text-lg font-bold" style={{ color }}>{value}</div>
      <div className="text-xs text-[#8A8FA3]">{label}</div>
    </div>
  );
}
