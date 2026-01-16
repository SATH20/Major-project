'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Shield, Cpu, Zap, Tag, Brain } from 'lucide-react';
import QuickChips from './QuickChips';
import RiskResultCard from './RiskResultCard';
import FraudResultCard from './FraudResultCard';
import ExplainabilityCard from './ExplainabilityCard';
import ModelComparisonCard from './ModelComparisonCard';
import PipelineLoader from './PipelineLoader';

interface ChatAreaProps {
  sidebarOpen: boolean;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  cardType?: 'risk' | 'fraud' | 'explain' | 'compare' | 'loading';
  data?: any;
  timestamp: Date;
}

// Mock data generators
const generateRiskData = () => ({
  score: Math.floor(Math.random() * 300) + 550,
  approvalProbability: Math.floor(Math.random() * 30) + 65,
  riskBand: Math.random() > 0.6 ? 'Low' : Math.random() > 0.3 ? 'Medium' : 'High' as 'Low' | 'Medium' | 'High',
  modelUsed: 'Gradient Boosting Ensemble v2.4',
  confidence: Math.floor(Math.random() * 10) + 88,
});

const generateFraudData = () => ({
  fraudProbability: Math.random() * 15 + 1,
  flags: Math.random() > 0.7 ? ['Document age mismatch', 'Unusual pattern'] : [],
  extractedFields: [
    { label: 'Full Name', value: 'John Smith', masked: false },
    { label: 'ID Number', value: '1234567890', masked: true },
    { label: 'Date of Birth', value: '1990-05-15', masked: false },
    { label: 'Address', value: '123 Main St, City', masked: false },
    { label: 'Income', value: '$75,000', masked: false },
    { label: 'Employer', value: 'Tech Corp Inc.', masked: false },
  ],
});

const generateExplainData = () => ({
  factors: [
    { name: 'Payment History', impact: 'positive' as const, value: 35, description: 'Consistent on-time payments across all accounts for the past 24 months.' },
    { name: 'Credit Utilization', impact: 'positive' as const, value: 25, description: 'Low utilization ratio of 23%, well below the recommended 30% threshold.' },
    { name: 'Account Age', impact: 'neutral' as const, value: 15, description: 'Average account age of 2.3 years. Longer history would improve score.' },
    { name: 'Income Stability', impact: 'positive' as const, value: 12, description: 'Stable employment for 18+ months with consistent income growth.' },
    { name: 'Debt-to-Income', impact: 'negative' as const, value: 8, description: 'DTI ratio of 38% is slightly above the optimal 35% threshold.' },
    { name: 'Recent Inquiries', impact: 'neutral' as const, value: 5, description: '2 hard inquiries in the last 6 months from credit applications.' },
  ],
  decisionSummary: 'The applicant demonstrates strong creditworthiness based on consistent payment history and responsible credit utilization. The primary positive factors are the excellent payment track record (35% weight) and low credit utilization (25% weight). The slightly elevated debt-to-income ratio (8% negative impact) is the main area for improvement. Overall, the risk profile supports approval with standard terms.',
});

const generateCompareData = () => ({
  models: [
    { name: 'Logistic Regression', accuracy: 89.2, explainability: 95, latency: '12ms', recommended: false },
    { name: 'Random Forest', accuracy: 94.1, explainability: 72, latency: '45ms', recommended: false },
    { name: 'Gradient Boosting', accuracy: 96.8, explainability: 85, latency: '38ms', recommended: true },
  ],
});

export default function ChatArea({ sidebarOpen: _sidebarOpen }: ChatAreaProps) {
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('lendnova_chat_history');
    if (stored) {
      const parsed = JSON.parse(stored);
      setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('lendnova_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleChipClick = (template: string) => {
    setMessage(template);
  };

  const simulatePipeline = async (cardType: 'risk' | 'fraud' | 'explain' | 'compare') => {
    setIsProcessing(true);
    setPipelineStep(0);

    // Add loading message with unique ID
    const loadingId = `assistant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setMessages(prev => [...prev, {
      id: loadingId,
      type: 'assistant',
      content: 'Processing...',
      cardType: 'loading',
      timestamp: new Date(),
    }]);

    // Simulate pipeline steps
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setPipelineStep(i);
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate result data
    let data: any;
    switch (cardType) {
      case 'risk': data = generateRiskData(); break;
      case 'fraud': data = generateFraudData(); break;
      case 'explain': data = generateExplainData(); break;
      case 'compare': data = generateCompareData(); break;
    }

    // Replace loading with result
    setMessages(prev => prev.map(m => 
      m.id === loadingId 
        ? { ...m, content: 'Analysis complete', cardType, data }
        : m
    ));

    setIsProcessing(false);
    setPipelineStep(0);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    // Add user message with unique ID
    const userMessage: Message = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage('');

    // Intelligently determine card type based on message content
    let cardType: 'risk' | 'fraud' | 'explain' | 'compare' = 'risk';
    const lowerMessage = currentMessage.toLowerCase();
    
    if (lowerMessage.includes('fraud') || lowerMessage.includes('ocr') || lowerMessage.includes('document') || lowerMessage.includes('upload') || lowerMessage.includes('verify')) {
      cardType = 'fraud';
    } else if (lowerMessage.includes('explain') || lowerMessage.includes('why') || lowerMessage.includes('factor') || lowerMessage.includes('reason')) {
      cardType = 'explain';
    } else if (lowerMessage.includes('compare') || lowerMessage.includes('model') || lowerMessage.includes('accuracy')) {
      cardType = 'compare';
    }

    await simulatePipeline(cardType);
  };

  const handleExplain = () => simulatePipeline('explain');
  const handleCompare = () => simulatePipeline('compare');

  const renderMessage = (msg: Message) => {
    if (msg.type === 'user') {
      return (
        <div key={msg.id} className="flex justify-end mb-4 animate-fadeIn">
          <div className="max-w-xl glass-card rounded-2xl rounded-tr-sm px-4 py-3">
            <p className="text-[#E8EBF3]">{msg.content}</p>
            <p className="text-xs text-[#8A8FA3] mt-1">{msg.timestamp.toLocaleTimeString()}</p>
          </div>
        </div>
      );
    }

    if (msg.cardType === 'loading') {
      return (
        <div key={msg.id} className="mb-4 max-w-2xl">
          <PipelineLoader currentStep={pipelineStep} />
        </div>
      );
    }

    return (
      <div key={msg.id} className="mb-4 max-w-2xl">
        {msg.cardType === 'risk' && msg.data && (
          <RiskResultCard 
            {...msg.data}
            onExplain={handleExplain}
            onCompare={handleCompare}
          />
        )}
        {msg.cardType === 'fraud' && msg.data && (
          <FraudResultCard 
            {...msg.data}
            onViewExtracted={() => {}}
            onRerunOCR={() => simulatePipeline('fraud')}
            onMarkVerified={() => {}}
          />
        )}
        {msg.cardType === 'explain' && msg.data && (
          <ExplainabilityCard {...msg.data} />
        )}
        {msg.cardType === 'compare' && msg.data && (
          <ModelComparisonCard {...msg.data} />
        )}
      </div>
    );
  };

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="min-h-full flex items-center justify-center">
            <WelcomeScreen />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {messages.map(renderMessage)}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area - Clean & Minimal */}
      <div className="p-4 pb-6">
        <div className="max-w-2xl mx-auto">
          <QuickChips onChipClick={handleChipClick} />
          
          <div className="relative">
            {/* Glow effect behind input */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4F7FFF]/20 via-[#9B6BFF]/20 to-[#4F7FFF]/20 rounded-2xl blur-xl opacity-50" />
            
            <div className="relative glass-card rounded-2xl p-2 flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isProcessing && handleSend()}
                placeholder="Describe borrower or ask a question..."
                className="flex-1 bg-transparent text-[#E8EBF3] placeholder-[#8A8FA3] outline-none text-sm px-4 py-3"
                disabled={isProcessing}
              />

              {/* Send Button */}
              <button 
                onClick={handleSend}
                disabled={isProcessing}
                className="h-11 px-6 rounded-xl bg-gradient-to-r from-[#4F7FFF] to-[#9B6BFF] text-white font-medium text-sm hover:shadow-lg hover:shadow-[#4F7FFF]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing</span>
                  </>
                ) : (
                  <>
                    <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    <span>Analyze</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Subtle hint */}
          <p className="text-center text-xs text-[#8A8FA3]/60 mt-3">
            Press Enter to send • AI-powered credit analysis
          </p>
        </div>
      </div>
    </main>
  );
}


function WelcomeScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`text-center max-w-2xl transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Logo */}
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4F7FFF] to-[#9B6BFF] flex items-center justify-center mx-auto mb-6 animate-float">
        <Brain size={40} className="text-white" />
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space)]">
        <span className="gradient-text">LendNova</span> Risk Assistant
      </h1>
      
      <p className="text-lg text-[#8A8FA3] mb-8 max-w-xl mx-auto">
        Run credit risk scoring, OCR fraud checks, and explainable decisions.
      </p>

      {/* Status Chips */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <StatusChip icon={Shield} label="Secure" color="#2EE59D" />
        <StatusChip icon={Cpu} label="Model: Gradient Boosting" color="#9B6BFF" />
        <StatusChip icon={Zap} label="Latency: Live" color="#4F7FFF" />
        <StatusChip icon={Tag} label="v1.0" color="#8A8FA3" />
      </div>

      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <QuickStartCard 
          title="Run Assessment"
          description="Enter borrower details to get instant credit risk scoring"
          gradient="from-[#4F7FFF] to-[#6B8FFF]"
        />
        <QuickStartCard 
          title="Upload Documents"
          description="OCR-powered document verification and fraud detection"
          gradient="from-[#9B6BFF] to-[#B88BFF]"
        />
        <QuickStartCard 
          title="Explain Decisions"
          description="Understand the factors behind every credit decision"
          gradient="from-[#2EE59D] to-[#5FFFB8]"
        />
      </div>
    </div>
  );
}

function StatusChip({ icon: Icon, label, color }: { icon: any; label: string; color: string }) {
  return (
    <div 
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm"
      style={{ borderColor: `${color}30` }}
    >
      <Icon size={14} style={{ color }} />
      <span className="text-[#8A8FA3]">{label}</span>
    </div>
  );
}

function QuickStartCard({ title, description, gradient }: { title: string; description: string; gradient: string }) {
  return (
    <div className="glass-card rounded-xl p-5 text-left cursor-pointer hover:border-[#4F7FFF]/40 transition-all group">
      <div className={`w-10 h-10 rounded-lg mb-3 bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <Brain size={20} className="text-white" />
      </div>
      <h3 className="font-semibold text-[#E8EBF3] mb-1">{title}</h3>
      <p className="text-xs text-[#8A8FA3]">{description}</p>
    </div>
  );
}
