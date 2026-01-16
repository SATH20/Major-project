'use client';

import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle, Eye, RefreshCw, ShieldCheck, FileText } from 'lucide-react';

interface FraudResultCardProps {
  fraudProbability: number;
  flags: string[];
  extractedFields: { label: string; value: string; masked?: boolean }[];
  onViewExtracted: () => void;
  onRerunOCR: () => void;
  onMarkVerified: () => void;
}

export default function FraudResultCard({
  fraudProbability,
  flags,
  extractedFields,
  onViewExtracted,
  onRerunOCR,
  onMarkVerified,
}: FraudResultCardProps) {
  const [animatedProb, setAnimatedProb] = useState(0);
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
      setAnimatedProb(fraudProbability * progress);

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [fraudProbability]);

  const isHighRisk = fraudProbability > 30;
  const isMediumRisk = fraudProbability > 10 && fraudProbability <= 30;

  const getAlertStyle = () => {
    if (isHighRisk) return { bg: 'bg-[#FF5C5C]/10', border: 'border-[#FF5C5C]/30', text: 'text-[#FF5C5C]' };
    if (isMediumRisk) return { bg: 'bg-[#FFB84D]/10', border: 'border-[#FFB84D]/30', text: 'text-[#FFB84D]' };
    return { bg: 'bg-[#2EE59D]/10', border: 'border-[#2EE59D]/30', text: 'text-[#2EE59D]' };
  };

  const alertStyle = getAlertStyle();

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden animate-fadeIn">
      {/* Glow effect */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] ${isHighRisk ? 'bg-[#FF5C5C]/10' : 'bg-[#2EE59D]/10'}`} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${alertStyle.bg}`}>
              {isHighRisk ? (
                <AlertTriangle size={20} className={alertStyle.text} />
              ) : (
                <ShieldCheck size={20} className={alertStyle.text} />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-[#E8EBF3]">Fraud & OCR Analysis</h3>
              <p className="text-xs text-[#8A8FA3]">Document Verification Complete</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${alertStyle.bg} ${alertStyle.border} ${alertStyle.text}`}>
            {isHighRisk ? 'HIGH ALERT' : isMediumRisk ? 'REVIEW' : 'VERIFIED'}
          </span>
        </div>

        {/* Fraud Probability */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#8A8FA3]">Fraud Probability</span>
            <span className={`font-semibold ${alertStyle.text}`}>{animatedProb.toFixed(1)}%</span>
          </div>
          <div className="h-3 bg-[#1E2642] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                isHighRisk ? 'bg-[#FF5C5C]' : isMediumRisk ? 'bg-[#FFB84D]' : 'bg-[#2EE59D]'
              }`}
              style={{ width: `${animatedProb}%` }}
            />
          </div>
        </div>

        {/* Flags */}
        {flags.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-[#8A8FA3] uppercase tracking-wider mb-3">Detected Flags</p>
            <div className="flex flex-wrap gap-2">
              {flags.map((flag, idx) => (
                <span 
                  key={idx}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${alertStyle.bg} ${alertStyle.border} ${alertStyle.text}`}
                >
                  {flag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Extracted Fields Preview */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-[#8A8FA3] uppercase tracking-wider mb-3">Extracted Fields</p>
          <div className="bg-[#0A0F1F]/50 rounded-lg p-4 space-y-2">
            {extractedFields.slice(0, 4).map((field, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-[#8A8FA3]">{field.label}</span>
                <span className="text-[#E8EBF3] font-mono">
                  {field.masked ? '••••••' + field.value.slice(-4) : field.value}
                </span>
              </div>
            ))}
            {extractedFields.length > 4 && (
              <p className="text-xs text-[#4F7FFF] text-center pt-2">+{extractedFields.length - 4} more fields</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={onViewExtracted}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass border border-[#4F7FFF]/20 text-[#E8EBF3] font-semibold hover:border-[#4F7FFF]/50 transition-all"
          >
            <Eye size={18} />
            View Extracted
          </button>
          <button 
            onClick={onRerunOCR}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass border border-[#4F7FFF]/20 text-[#E8EBF3] font-semibold hover:border-[#4F7FFF]/50 transition-all"
          >
            <RefreshCw size={18} />
            Re-run OCR
          </button>
          <button 
            onClick={onMarkVerified}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2EE59D]/10 border border-[#2EE59D]/30 text-[#2EE59D] font-semibold hover:bg-[#2EE59D]/20 transition-all"
          >
            <CheckCircle size={18} />
            Mark Verified
          </button>
        </div>
      </div>
    </div>
  );
}
