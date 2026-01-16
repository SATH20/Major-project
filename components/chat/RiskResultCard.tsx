'use client';

import { useState, useEffect, useRef } from 'react';
import { TrendingUp, Download, Brain, GitCompare, Shield } from 'lucide-react';

interface RiskResultCardProps {
  score: number;
  approvalProbability: number;
  riskBand: 'Low' | 'Medium' | 'High';
  modelUsed: string;
  confidence: number;
  onExplain: () => void;
  onCompare: () => void;
}

export default function RiskResultCard({
  score,
  approvalProbability,
  riskBand,
  modelUsed,
  confidence,
  onExplain,
  onCompare,
}: RiskResultCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedApproval, setAnimatedApproval] = useState(0);
  const [animatedConfidence, setAnimatedConfidence] = useState(0);
  const animationRef = useRef<boolean>(false);

  useEffect(() => {
    if (animationRef.current) return;
    animationRef.current = true;

    const duration = 2000;
    const steps = 60;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedScore(Math.round(score * eased));
      setAnimatedApproval(Math.round(approvalProbability * eased));
      setAnimatedConfidence(Math.round(confidence * eased));

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [score, approvalProbability, confidence]);

  const getScoreColor = () => {
    if (animatedScore >= 700) return '#2EE59D';
    if (animatedScore >= 550) return '#FFB84D';
    return '#FF5C5C';
  };

  const getRiskBadgeStyle = () => {
    switch (riskBand) {
      case 'Low': return 'bg-[#2EE59D]/10 text-[#2EE59D] border-[#2EE59D]/30';
      case 'Medium': return 'bg-[#FFB84D]/10 text-[#FFB84D] border-[#FFB84D]/30';
      case 'High': return 'bg-[#FF5C5C]/10 text-[#FF5C5C] border-[#FF5C5C]/30';
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden animate-fadeIn">
      {/* Glow effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F7FFF]/10 rounded-full blur-[60px]" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#9B6BFF]/10 rounded-full blur-[50px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F7FFF] to-[#9B6BFF] flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#E8EBF3]">Credit Risk Assessment</h3>
              <p className="text-xs text-[#8A8FA3]">Analysis Complete</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskBadgeStyle()}`}>
            {riskBand.toUpperCase()} RISK
          </span>
        </div>

        {/* Score Display */}
        <div className="text-center mb-6 py-4">
          <div 
            className="text-7xl font-bold font-[family-name:var(--font-space)] mb-2 animate-counter"
            style={{ color: getScoreColor() }}
          >
            {animatedScore}
          </div>
          <div className="text-[#8A8FA3] text-sm">Credit Risk Score (0-1000)</div>
        </div>

        {/* Approval Probability */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#8A8FA3]">Approval Probability</span>
            <span className="text-[#4F7FFF] font-semibold">{animatedApproval}%</span>
          </div>
          <div className="h-3 bg-[#1E2642] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#4F7FFF] to-[#9B6BFF] rounded-full transition-all duration-1000 progress-bar"
              style={{ width: `${animatedApproval}%` }}
            />
          </div>
        </div>

        {/* Model Info */}
        <div className="flex items-center justify-between p-3 bg-[#0A0F1F]/50 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <Brain size={16} className="text-[#9B6BFF]" />
            <span className="text-sm text-[#8A8FA3]">{modelUsed}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-[#2EE59D]" />
            <span className="text-sm font-semibold text-[#2EE59D]">{animatedConfidence}% Confidence</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={onExplain}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#4F7FFF] to-[#9B6BFF] text-white font-semibold hover:shadow-lg hover:shadow-[#4F7FFF]/25 transition-all hover:-translate-y-0.5"
          >
            <Brain size={18} />
            Explain
          </button>
          <button 
            onClick={onCompare}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass border border-[#4F7FFF]/20 text-[#E8EBF3] font-semibold hover:border-[#4F7FFF]/50 transition-all"
          >
            <GitCompare size={18} />
            Compare Models
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-xl glass border border-[#4F7FFF]/20 text-[#8A8FA3] hover:text-[#4F7FFF] hover:border-[#4F7FFF]/50 transition-all">
            <Download size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
