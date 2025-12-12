'use client';

import { useState, useEffect } from 'react';
import { Send, Plus, ChevronDown, Check, ImageIcon, Film, CheckCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from '../icons/SocialIcons';

interface ChatAreaProps {
  sidebarOpen: boolean;
}

type LoadingStep = {
  label: string;
  completed: boolean;
};

export default function ChatArea({ sidebarOpen }: ChatAreaProps) {
  const [message, setMessage] = useState('');
  const [contentType, setContentType] = useState<'Post' | 'Reel'>('Post');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastContentType, setLastContentType] = useState<'Post' | 'Reel'>('Post');

  const username = 'Khushal Agarwal';

  const getStepsForType = (type: 'Post' | 'Reel'): LoadingStep[] => {
    if (type === 'Post') {
      return [
        { label: 'Received request', completed: false },
        { label: 'Enhancing the prompt', completed: false },
        { label: 'Generating the image', completed: false },
        { label: 'Generating a caption', completed: false },
        { label: 'Posting the content', completed: false },
      ];
    }
    return [
      { label: 'Received request', completed: false },
      { label: 'Enhancing the prompt', completed: false },
      { label: 'Generating the video', completed: false },
      { label: 'Adding audio', completed: false },
      { label: 'Generating a caption', completed: false },
      { label: 'Posting the content', completed: false },
    ];
  };

  useEffect(() => {
    if (!isLoading || currentStepIndex >= loadingSteps.length) return;

    const timer = setTimeout(() => {
      setLoadingSteps(prev => 
        prev.map((step, idx) => 
          idx === currentStepIndex ? { ...step, completed: true } : step
        )
      );
      setCurrentStepIndex(prev => prev + 1);
    }, 15000);

    return () => clearTimeout(timer);
  }, [isLoading, currentStepIndex, loadingSteps.length]);

  useEffect(() => {
    if (isLoading && currentStepIndex >= loadingSteps.length && loadingSteps.length > 0) {
      setTimeout(() => {
        setIsLoading(false);
        setLoadingSteps([]);
        setCurrentStepIndex(0);
        setShowSuccess(true);
      }, 1000);
    }
  }, [currentStepIndex, loadingSteps.length, isLoading]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const steps = getStepsForType(contentType);
    setLoadingSteps(steps);
    setCurrentStepIndex(0);
    setIsLoading(true);
    setShowSuccess(false);
    setLastContentType(contentType);

    try {
      const url = contentType === 'Post'
        ? 'http://localhost:8080/api/v1/executions/webhook/company.social.media/agentic_image_poster/my-image-secret'
        : 'http://localhost:8080/api/v1/executions/webhook/company.social.agent/agentic_video_director/secret-key-123';

      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: message }),
      });
    } catch (error) {
      console.error('Error sending request:', error);
    }

    setMessage('');
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView steps={loadingSteps} currentStepIndex={currentStepIndex} contentType={contentType} />;
    }
    if (showSuccess) {
      return <SuccessCard contentType={lastContentType} onDismiss={() => setShowSuccess(false)} />;
    }
    return <WelcomeMessage username={username} />;
  };

  return (
    <main className={`flex-1 flex flex-col h-screen overflow-hidden ${sidebarOpen ? '' : ''}`}>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="min-h-full flex items-center justify-center">
          {renderContent()}
        </div>
      </div>

      <div className="p-6 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-3 flex items-center gap-3 focus-within:border-[#3ECF8E]/50 transition-colors">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#232323] text-gray-400 hover:text-[#3ECF8E] hover:bg-[#3ECF8E]/10 transition-colors border border-white/5">
              <Plus size={20} />
            </button>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Command Sento"
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base"
              disabled={isLoading}
            />

            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#232323] text-gray-300 hover:text-[#3ECF8E] transition-colors border border-white/5 text-sm font-medium"
                disabled={isLoading}
              >
                {contentType}
                <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div className="absolute bottom-full mb-2 right-0 bg-[#232323] border border-white/10 rounded-lg overflow-hidden shadow-xl min-w-[100px]">
                  <button 
                    onClick={() => { setContentType('Post'); setDropdownOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-[#3ECF8E]/10 hover:text-[#3ECF8E] transition-colors ${contentType === 'Post' ? 'text-[#3ECF8E]' : 'text-gray-300'}`}
                  >
                    Post
                  </button>
                  <button 
                    onClick={() => { setContentType('Reel'); setDropdownOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-[#3ECF8E]/10 hover:text-[#3ECF8E] transition-colors ${contentType === 'Reel' ? 'text-[#3ECF8E]' : 'text-gray-300'}`}
                  >
                    Reel
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={handleSend}
              disabled={isLoading || !message.trim()}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#3ECF8E] text-[#121212] hover:bg-[#34b27b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}


interface SuccessCardProps {
  contentType: 'Post' | 'Reel';
  onDismiss: () => void;
}

function SuccessCard({ contentType, onDismiss }: SuccessCardProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-xl border border-[#3ECF8E]/30 bg-[#1c1c1c] overflow-hidden shadow-2xl">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-[#3ECF8E]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-[#3ECF8E]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Content Posted!</h2>
          <p className="text-gray-400 mb-6">Your {contentType.toLowerCase()} has been successfully published.</p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#232323] rounded-lg border border-white/10">
              <InstagramIcon className="w-5 h-5 text-pink-500" />
              <span className="text-sm text-gray-300">Instagram</span>
              <Check size={14} className="text-[#3ECF8E]" />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#232323] rounded-lg border border-white/10">
              <FacebookIcon className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-300">Facebook</span>
              <Check size={14} className="text-[#3ECF8E]" />
            </div>
          </div>

          <button 
            onClick={onDismiss}
            className="w-full py-3 bg-[#3ECF8E] text-[#121212] rounded-lg font-bold hover:bg-[#34b27b] transition-colors"
          >
            Create Another
          </button>
        </div>
      </div>
    </div>
  );
}

interface LoadingViewProps {
  steps: LoadingStep[];
  currentStepIndex: number;
  contentType: 'Post' | 'Reel';
}

function LoadingView({ steps, currentStepIndex, contentType }: LoadingViewProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-xl border border-white/10 bg-[#1c1c1c] overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3ECF8E] to-transparent opacity-50"></div>
        <div className="p-4 border-b border-white/10 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="space-y-2 mb-8">
            <p className="text-[#3ECF8E] font-bold mb-4 font-mono">// Sento Output</p>
            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {step.completed ? (
                    <Check size={16} className="text-[#3ECF8E]" />
                  ) : idx === currentStepIndex ? (
                    <div className="w-4 h-4 border-2 border-[#3ECF8E] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-600"></div>
                  )}
                  <span className={`text-sm ${step.completed ? 'text-gray-400' : idx === currentStepIndex ? 'text-white' : 'text-gray-600'}`}>
                    {step.label}...
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[#3ECF8E] font-bold font-mono">// {contentType} Preview</p>
            <ContentSkeleton contentType={contentType} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentSkeleton({ contentType }: { contentType: 'Post' | 'Reel' }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#232323] overflow-hidden max-w-[200px]">
      <div className="relative aspect-square bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] animate-shimmer"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {contentType === 'Post' ? (
            <ImageIcon size={32} className="text-gray-700" />
          ) : (
            <Film size={32} className="text-gray-700" />
          )}
        </div>
      </div>
      
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#1a1a1a] animate-pulse"></div>
          <div className="h-2 w-16 bg-[#1a1a1a] rounded animate-pulse"></div>
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-full bg-[#1a1a1a] rounded animate-pulse"></div>
          <div className="h-2 w-3/4 bg-[#1a1a1a] rounded animate-pulse"></div>
        </div>
        <div className="flex gap-1.5 pt-1">
          <div className="h-2 w-10 bg-[#3ECF8E]/20 rounded animate-pulse"></div>
          <div className="h-2 w-12 bg-[#3ECF8E]/20 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

function WelcomeMessage({ username }: { username: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showSubtext, setShowSubtext] = useState(false);
  const fullText = `Hi ${username}`;

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setShowSubtext(false);
    
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowSubtext(true), 300);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {displayedText.startsWith('Hi ') ? (
          <>
            Hi <span className="text-[#3ECF8E]">{displayedText.slice(3)}</span>
          </>
        ) : (
          displayedText
        )}
        <span className="animate-pulse">|</span>
      </h1>
      <p className={`text-xl md:text-2xl text-gray-400 transition-opacity duration-500 ${showSubtext ? 'opacity-100' : 'opacity-0'}`}>
        What content should we post today?
      </p>
    </div>
  );
}