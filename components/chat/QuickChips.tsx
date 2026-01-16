'use client';

import { Sparkles } from 'lucide-react';

interface QuickChipsProps {
  onChipClick: (template: string) => void;
}

const suggestions = [
  'Run full credit assessment',
  'Check fraud risk',
  'Explain last decision',
  'Compare models',
];

export default function QuickChips({ onChipClick }: QuickChipsProps) {
  return (
    <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
      <Sparkles size={14} className="text-[#4F7FFF] flex-shrink-0" />
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onChipClick(suggestion)}
          className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium text-[#8A8FA3] bg-[#1E2642]/50 border border-[#4F7FFF]/10 hover:text-[#4F7FFF] hover:border-[#4F7FFF]/30 hover:bg-[#4F7FFF]/5 transition-all whitespace-nowrap"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
