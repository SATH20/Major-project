'use client';

import { ChevronLeft, ChevronRight, LogOut, Settings, BookOpen, User } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from '../icons/SocialIcons';
import { useRouter } from 'next/navigation';

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatSidebar({ isOpen, onToggle }: ChatSidebarProps) {
  const router = useRouter();

  return (
    <aside className={`${isOpen ? 'w-72' : 'w-16'} transition-all duration-300 bg-[#1c1c1c] border-r border-white/10 flex flex-col h-screen relative`}>
      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-6 w-6 h-6 bg-[#232323] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#3ECF8E] hover:border-[#3ECF8E]/50 transition-colors z-10"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <a href="/" className={`text-xl font-bold tracking-tight ${!isOpen && 'hidden'}`}>Sento</a>
        {!isOpen && <a href="/" className="text-xl font-bold">S</a>}
      </div>

      {/* Profile Section */}
      <div className={`p-4 border-b border-white/10 ${!isOpen && 'flex justify-center'}`}>
        <div className={`flex items-center gap-3 ${!isOpen && 'flex-col'}`}>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#3ECF8E] to-[#34b27b] flex-shrink-0 flex items-center justify-center text-[#121212] font-bold text-sm">
            AA
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">anamikaaradhya02</p>
              <p className="text-xs text-gray-500">@anamikaaradhya02</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <SidebarButton icon={Settings} label="Configure Content" isOpen={isOpen} onClick={() => {}} />
        <SidebarButton icon={BookOpen} label="Prompt Library" isOpen={isOpen} onClick={() => router.push('/library')} />
        <SidebarButton icon={User} label="Account Information" isOpen={isOpen} onClick={() => router.push('/account')} />
        
        <div className="h-px bg-white/10 my-4"></div>
        
        <SidebarButton icon={FacebookIcon} label="Connect Facebook" isOpen={isOpen} isSocialIcon onClick={() => {}} />
        <SidebarButton icon={InstagramIcon} label="Connect Instagram" isOpen={isOpen} isSocialIcon onClick={() => {}} />
      </nav>

      {/* Sign Out */}
      <div className="p-3 border-t border-white/10">
        <SidebarButton icon={LogOut} label="Sign Out" isOpen={isOpen} onClick={() => router.push('/')} />
      </div>
    </aside>
  );
}


interface SidebarButtonProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  isOpen: boolean;
  isSocialIcon?: boolean;
  onClick: () => void;
}

function SidebarButton({ icon: Icon, label, isOpen, isSocialIcon, onClick }: SidebarButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-[#3ECF8E] hover:bg-[#3ECF8E]/10 transition-colors group ${!isOpen && 'justify-center'}`}
    >
      {isSocialIcon ? (
        <Icon className="w-5 h-5 group-hover:text-[#3ECF8E] transition-colors" />
      ) : (
        <Icon size={20} className="group-hover:text-[#3ECF8E] transition-colors" />
      )}
      {isOpen && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}