'use client';

import { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, LogOut, Settings, 
  FileText, Upload, BarChart3, Brain, GitCompare, 
  ClipboardList, User, Plus, Shield, AlertTriangle, CheckCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface Assessment {
  id: string;
  borrowerName: string;
  timestamp: string;
  riskBand: 'Low' | 'Medium' | 'High';
  score: number;
}

const navItems = [
  { icon: Plus, label: 'New Assessment', id: 'new' },
  { icon: User, label: 'Borrower Profile', id: 'profile' },
  { icon: Upload, label: 'Upload Documents (OCR)', id: 'upload' },
  { icon: BarChart3, label: 'Risk Dashboard', id: 'dashboard' },
  { icon: Brain, label: 'Explainability', id: 'explain' },
  { icon: GitCompare, label: 'Model Comparison', id: 'compare' },
  { icon: ClipboardList, label: 'Audit Logs', id: 'audit' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

const mockAssessments: Assessment[] = [
  { id: '1', borrowerName: 'John D.', timestamp: '2 min ago', riskBand: 'Low', score: 742 },
  { id: '2', borrowerName: 'Sarah M.', timestamp: '15 min ago', riskBand: 'Medium', score: 612 },
  { id: '3', borrowerName: 'Alex K.', timestamp: '1 hour ago', riskBand: 'High', score: 485 },
  { id: '4', borrowerName: 'Maria L.', timestamp: '3 hours ago', riskBand: 'Low', score: 789 },
];

export default function ChatSidebar({ isOpen, onToggle }: ChatSidebarProps) {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('new');
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    // Load from localStorage or use mock data
    const stored = localStorage.getItem('lendnova_assessments');
    if (stored) {
      setAssessments(JSON.parse(stored));
    } else {
      setAssessments(mockAssessments);
    }
  }, []);

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-[#2EE59D]/10 text-[#2EE59D] border-[#2EE59D]/20';
      case 'Medium': return 'bg-[#FFB84D]/10 text-[#FFB84D] border-[#FFB84D]/20';
      case 'High': return 'bg-[#FF5C5C]/10 text-[#FF5C5C] border-[#FF5C5C]/20';
      default: return 'bg-[#4F7FFF]/10 text-[#4F7FFF] border-[#4F7FFF]/20';
    }
  };

  return (
    <aside className={`${isOpen ? 'w-72' : 'w-16'} transition-all duration-300 glass border-r border-[#4F7FFF]/10 flex flex-col h-screen relative z-20`}>
      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-6 w-6 h-6 bg-[#1E2642] border border-[#4F7FFF]/20 rounded-full flex items-center justify-center text-[#8A8FA3] hover:text-[#4F7FFF] hover:border-[#4F7FFF]/50 transition-colors z-10"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* Logo */}
      <div className="p-4 border-b border-[#4F7FFF]/10">
        <a href="/" className={`flex items-center gap-2 ${!isOpen && 'justify-center'}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F7FFF] to-[#9B6BFF] flex items-center justify-center">
            <Brain size={18} className="text-white" />
          </div>
          {isOpen && <span className="text-xl font-bold gradient-text">LendNova</span>}
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button 
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${!isOpen && 'justify-center'} ${
                isActive 
                  ? 'bg-gradient-to-r from-[#4F7FFF]/20 to-[#9B6BFF]/10 text-[#4F7FFF] border border-[#4F7FFF]/20' 
                  : 'text-[#8A8FA3] hover:text-[#E8EBF3] hover:bg-[#1E2642]/50'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-[#4F7FFF]' : 'group-hover:text-[#4F7FFF] transition-colors'} />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
        
        {isOpen && (
          <>
            <div className="h-px bg-[#4F7FFF]/10 my-4"></div>
            
            {/* Recent Assessments */}
            <div className="px-2">
              <p className="text-xs font-semibold text-[#8A8FA3] uppercase tracking-wider mb-3">Recent Assessments</p>
              <div className="space-y-2">
                {assessments.slice(0, 4).map((assessment) => (
                  <div 
                    key={assessment.id}
                    className="glass-card rounded-lg p-3 cursor-pointer hover:border-[#4F7FFF]/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[#E8EBF3]">{assessment.borrowerName}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getRiskBadgeColor(assessment.riskBand)}`}>
                        {assessment.riskBand}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8A8FA3]">{assessment.timestamp}</span>
                      <span className="text-xs font-semibold text-[#4F7FFF]">{assessment.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Sign Out */}
      <div className="p-3 border-t border-[#4F7FFF]/10">
        <button 
          onClick={() => router.push('/')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#8A8FA3] hover:text-[#FF5C5C] hover:bg-[#FF5C5C]/10 transition-colors group ${!isOpen && 'justify-center'}`}
        >
          <LogOut size={20} className="group-hover:text-[#FF5C5C] transition-colors" />
          {isOpen && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
