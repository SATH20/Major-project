'use client';

import { useState, useEffect } from 'react';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatArea from '@/components/chat/ChatArea';
import BackgroundGrid from '@/components/BackgroundGrid';

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-[#E8EBF3] font-sans flex relative">
      <BackgroundGrid />
      <ChatSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <ChatArea sidebarOpen={sidebarOpen} />
    </div>
  );
}
