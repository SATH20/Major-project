'use client';

import { useState } from 'react';
import { 
  Search, Menu, ChevronRight, Copy, Check, Terminal, 
  ExternalLink, Layers, Cpu, Share2, Shield, Github
} from 'lucide-react';

interface CodeBlockProps {
  language: string;
  code: string;
}

function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-white/10 bg-[#000000]">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <span className="text-xs font-mono text-gray-400">{language}</span>
        <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors">
          {copied ? <Check size={14} className="text-[#3ECF8E]" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

interface NavLinkProps {
  id: string;
  title: string;
  active: boolean;
  scrollToSection: (id: string) => void;
}

function NavLink({ id, title, active, scrollToSection }: NavLinkProps) {
  return (
    <button 
      onClick={() => scrollToSection(id)}
      className={`text-left w-full px-3 py-1.5 text-sm transition-colors border-l-2 ${
        active 
          ? 'border-[#3ECF8E] text-[#3ECF8E] font-medium' 
          : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
      }`}
    >
      {title}
    </button>
  );
}


export default function DocsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('pre-requisites');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-[#3ECF8E] selection:text-black">
      
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-[#121212]/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu size={20} className="text-gray-400" />
          </button>
          <div className="flex items-center gap-2">
            <a href="/" className="font-bold text-xl tracking-tight">Sento</a>
            <span className="bg-white/10 text-xs px-2 py-0.5 rounded text-gray-400">docs</span>
          </div>
        </div>

        <div className="flex-1 max-w-xl px-4 hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#3ECF8E]" size={16} />
            <input 
              type="text" 
              placeholder="Search documentation..." 
              className="w-full bg-[#1c1c1c] border border-white/10 rounded-md py-1.5 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-[#3ECF8E]/50 transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <kbd className="bg-white/10 text-[10px] px-1.5 rounded text-gray-400">Ctrl</kbd>
              <kbd className="bg-white/10 text-[10px] px-1.5 rounded text-gray-400">K</kbd>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-400 hover:text-white text-sm hidden sm:block">Support</a>
          <a href="/chat" className="flex items-center gap-2 bg-[#3ECF8E] text-black px-3 py-1.5 rounded-md text-sm font-bold hover:bg-[#34b27b] transition-colors">
            Launch app <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <div className="flex pt-14 max-w-[1600px] mx-auto">
        
        {/* Left Sidebar */}
        <aside className={`
          fixed lg:sticky top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-[#121212] border-r border-white/10 overflow-y-auto z-40 transition-transform duration-300 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-6 space-y-8">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Getting Started</h4>
              <div className="space-y-1">
                <NavLink id="pre-requisites" title="Pre-requisites" active={activeSection === 'pre-requisites'} scrollToSection={scrollToSection} />
                <NavLink id="setup" title="How to Set Up" active={activeSection === 'setup'} scrollToSection={scrollToSection} />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Core Platform</h4>
              <div className="space-y-1">
                <NavLink id="features" title="Features" active={activeSection === 'features'} scrollToSection={scrollToSection} />
                <NavLink id="architecture" title="Architecture" active={activeSection === 'architecture'} scrollToSection={scrollToSection} />
                <NavLink id="flows" title="Automation Flows" active={activeSection === 'flows'} scrollToSection={scrollToSection} />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Reference</h4>
              <div className="space-y-1">
                <NavLink id="configuration" title="Configuration" active={activeSection === 'configuration'} scrollToSection={scrollToSection} />
                <NavLink id="api" title="API Reference" active={activeSection === 'api'} scrollToSection={scrollToSection} />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-10">
          <div className="max-w-3xl mx-auto space-y-12 pb-20">
            
            {/* Pre-requisites Section */}
            <section id="pre-requisites" className="scroll-mt-24">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-[#3ECF8E] mb-2 font-mono text-xs">
                  <span>Getting Started</span>
                  <ChevronRight size={12} />
                  <span>Installation</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">Pre-requisites</h1>
                <p className="text-gray-400 text-lg">Before running this project, make sure you have the following components set up.</p>
              </div>

              <PreRequisitesContent />
            </section>

            <hr className="border-white/10" />

            {/* Setup Section */}
            <section id="setup" className="scroll-mt-24">
              <h1 className="text-3xl font-bold mb-6">How to Set Up (Step-by-Step)</h1>
              <SetupContent />
            </section>

            <hr className="border-white/10" />

            {/* Features Section */}
            <section id="features" className="scroll-mt-24">
              <h1 className="text-3xl font-bold mb-6">Features</h1>
              <FeaturesContent />
            </section>

            <hr className="border-white/10" />

            {/* Architecture Section */}
            <section id="architecture" className="scroll-mt-24">
              <h1 className="text-3xl font-bold mb-6">Architecture</h1>
              <ArchitectureContent />
            </section>

            {/* Flows Section */}
            <section id="flows" className="scroll-mt-24">
              <h1 className="text-3xl font-bold mb-6">Automation Flows</h1>
              <FlowsContent />
            </section>

          </div>
        </main>

        {/* Right Sidebar (TOC) */}
        <aside className="hidden xl:block w-64 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-10">
          <h5 className="text-sm font-bold text-white mb-4">On this page</h5>
          <div className="space-y-3 border-l border-white/10">
            <a href="#pre-requisites" className={`block pl-4 text-sm hover:text-[#3ECF8E] transition-colors ${activeSection === 'pre-requisites' ? 'text-[#3ECF8E] border-l border-[#3ECF8E] -ml-[1px]' : 'text-gray-500'}`}>Pre-requisites</a>
            <a href="#setup" className={`block pl-4 text-sm hover:text-[#3ECF8E] transition-colors ${activeSection === 'setup' ? 'text-[#3ECF8E] border-l border-[#3ECF8E] -ml-[1px]' : 'text-gray-500'}`}>Step-by-Step Setup</a>
            <a href="#features" className={`block pl-4 text-sm hover:text-[#3ECF8E] transition-colors ${activeSection === 'features' ? 'text-[#3ECF8E] border-l border-[#3ECF8E] -ml-[1px]' : 'text-gray-500'}`}>Features</a>
            <a href="#architecture" className={`block pl-4 text-sm hover:text-[#3ECF8E] transition-colors ${activeSection === 'architecture' ? 'text-[#3ECF8E] border-l border-[#3ECF8E] -ml-[1px]' : 'text-gray-500'}`}>Architecture</a>
            <a href="#flows" className={`block pl-4 text-sm hover:text-[#3ECF8E] transition-colors ${activeSection === 'flows' ? 'text-[#3ECF8E] border-l border-[#3ECF8E] -ml-[1px]' : 'text-gray-500'}`}>Automation Flows</a>
          </div>
          
          <div className="mt-10 p-4 bg-[#1c1c1c] rounded-lg border border-white/5">
            <p className="text-xs font-bold text-gray-300 mb-2">View Source Code</p>
            <p className="text-xs text-gray-500 mb-3">Check out the project on GitHub.</p>
            <a 
              href="https://github.com/khushal1512/sento-ai/" 
              target="_blank"
              className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-xs font-medium rounded transition-colors text-white border border-white/10 flex items-center justify-center gap-2"
            >
              <Github size={14} /> GitHub
            </a>
          </div>
        </aside>

      </div>
    </div>
  );
}


function PreRequisitesContent() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded bg-blue-500/10 text-blue-400 text-sm">1</span>
          Docker (Required)
        </h2>
        <p className="text-gray-400 mb-4">This project runs entirely on Docker.</p>
        <div className="bg-[#1c1c1c] p-4 rounded-lg border border-white/5 mb-4">
          <p className="text-sm text-gray-300 mb-2">One-liner Docker installation:</p>
          <a href="https://docs.docker.com/get-docker/" target="_blank" className="text-[#3ECF8E] hover:underline flex items-center gap-1 text-sm">
            docs.docker.com/get-docker <ExternalLink size={12} />
          </a>
        </div>
        <p className="text-sm text-gray-400 mb-2">Verify installation:</p>
        <CodeBlock language="bash" code={`docker --version\ndocker compose version`} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded bg-yellow-500/10 text-yellow-400 text-sm">2</span>
          Google AI Credits (Required)
        </h2>
        <p className="text-gray-400 mb-4">This project uses Google Gemini & Veo for AI generation.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-[#1c1c1c] rounded border border-white/5">
            <h4 className="font-bold text-white mb-1">Veo 3.1</h4>
            <p className="text-xs text-gray-500">Video / Reel generation</p>
          </div>
          <div className="p-4 bg-[#1c1c1c] rounded border border-white/5">
            <h4 className="font-bold text-white mb-1">Imagen</h4>
            <p className="text-xs text-gray-500">Nano Banana models</p>
          </div>
          <div className="p-4 bg-[#1c1c1c] rounded border border-white/5">
            <h4 className="font-bold text-white mb-1">Gemini 2.5</h4>
            <p className="text-xs text-gray-500">Prompt enhancement</p>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg mb-4">
          <p className="text-red-200 text-sm flex items-start gap-2">
            <Shield size={16} className="mt-0.5 shrink-0" />
            Without credits, video generation will fail with rate-limit or quota errors. Ensure billing is enabled in Google Cloud.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded bg-purple-500/10 text-purple-400 text-sm">3</span>
          Kestra Setup (Orchestration)
        </h2>
        <p className="text-gray-400 mb-4">Kestra is used to orchestrate AI generation, media uploads, and publishing.</p>
        <div className="bg-[#1c1c1c] p-4 rounded-lg border border-white/5">
          <p className="text-sm text-gray-300 mb-3">Copy the <code className="bg-white/10 px-1 rounded">docker-compose.yml</code> from the GitHub repository:</p>
          <a 
            href="https://github.com/khushal1512/sento-ai/" 
            target="_blank" 
            className="text-[#3ECF8E] hover:underline flex items-center gap-2 text-sm font-medium"
          >
            <Github size={16} /> github.com/khushal1512/sento-ai <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}


function SetupContent() {
  const permissions = ['instagram_basic', 'instagram_content_publish', 'instagram_manage_comments', 'pages_read_engagement'];
  
  return (
    <div className="space-y-10">
      {/* Step 1 */}
      <div className="relative pl-8 border-l border-white/10">
        <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#121212] border border-white/20 text-xs flex items-center justify-center text-gray-400">1</span>
        <h3 className="text-xl font-bold mb-2 text-white">Facebook & Instagram Setup</h3>
        <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
          <li>Create a Facebook account</li>
          <li>Create a Facebook Page</li>
          <li>Create an Instagram Business Account (Must be <strong>PUBLIC</strong>)</li>
          <li>Connect the Instagram account to the Facebook Page</li>
        </ul>
      </div>

      {/* Step 2 */}
      <div className="relative pl-8 border-l border-white/10">
        <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#121212] border border-white/20 text-xs flex items-center justify-center text-gray-400">2</span>
        <h3 className="text-xl font-bold mb-2 text-white">Meta Developer Setup</h3>
        <p className="text-gray-400 mb-2">Go to <a href="https://developers.facebook.com" target="_blank" className="text-[#3ECF8E]">developers.facebook.com</a> and log in.</p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
          <li>Create a new app</li>
          <li>Select <strong>Other</strong> as app type</li>
          <li>Add <strong>Instagram</strong> product</li>
          <li>Click <strong>Instagram Setup</strong></li>
        </ul>
      </div>

      {/* Step 3 */}
      <div className="relative pl-8 border-l border-white/10">
        <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#121212] border border-white/20 text-xs flex items-center justify-center text-gray-400">3</span>
        <h3 className="text-xl font-bold mb-2 text-white">Generate Access Token</h3>
        <p className="text-gray-400 mb-2">In the Graph API Explorer, select the following permissions:</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {permissions.map(p => (
            <span key={p} className="px-2 py-1 bg-white/5 rounded text-xs font-mono text-gray-300 border border-white/10">{p}</span>
          ))}
        </div>
        <div className="bg-[#1c1c1c] p-3 rounded border border-white/5">
          <p className="text-xs text-gray-500 mb-1">Token Format check:</p>
          <code className="text-[#3ECF8E] font-mono text-sm">EAA...</code>
        </div>
      </div>

      {/* Step 4 */}
      <div className="relative pl-8 border-l border-white/10">
        <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#121212] border border-white/20 text-xs flex items-center justify-center text-gray-400">4</span>
        <h3 className="text-xl font-bold mb-2 text-white">Base64 Encode Secrets</h3>
        <p className="text-gray-400 mb-2">Encode your keys before adding them to docker-compose.</p>
        <CodeBlock language="bash" code={`echo "VALUE_HERE" | base64`} />
      </div>

      {/* Step 5 */}
      <div className="relative pl-8 border-l border-transparent">
        <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#3ECF8E] text-black text-xs font-bold flex items-center justify-center">✓</span>
        <h3 className="text-xl font-bold mb-2 text-white">Start the System</h3>
        <CodeBlock language="bash" code={`docker compose up -d`} />
        <p className="text-gray-400 mt-2">Open Kestra UI at <a href="http://localhost:8080" target="_blank" className="text-[#3ECF8E] hover:underline">http://localhost:8080</a></p>
      </div>
    </div>
  );
}


function FeaturesContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#1c1c1c] border border-white/10 p-6 rounded-xl hover:border-[#3ECF8E]/50 transition-colors">
        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 text-purple-400">
          <Cpu size={20} />
        </div>
        <h3 className="text-lg font-bold mb-2">AI Content Automation</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li className="flex items-center gap-2"><Check size={14} className="text-[#3ECF8E]" /> Prompt to Image (IG Feed)</li>
          <li className="flex items-center gap-2"><Check size={14} className="text-[#3ECF8E]" /> Prompt to Reel (IG Reels)</li>
          <li className="flex items-center gap-2"><Check size={14} className="text-[#3ECF8E]" /> Automatic Prompt Enhancement</li>
        </ul>
      </div>

      <div className="bg-[#1c1c1c] border border-white/10 p-6 rounded-xl hover:border-[#3ECF8E]/50 transition-colors">
        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 text-blue-400">
          <Share2 size={20} />
        </div>
        <h3 className="text-lg font-bold mb-2">Event-Driven Automation</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li className="flex items-center gap-2"><Check size={14} className="text-[#3ECF8E]" /> Webhook-based comments</li>
          <li className="flex items-center gap-2"><Check size={14} className="text-[#3ECF8E]" /> Auto-reply workflows</li>
          <li className="flex items-center gap-2"><Check size={14} className="text-[#3ECF8E]" /> Moderation automation</li>
        </ul>
      </div>

      <div className="bg-[#1c1c1c] border border-white/10 p-6 rounded-xl hover:border-[#3ECF8E]/50 transition-colors md:col-span-2">
        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 text-[#3ECF8E]">
          <Shield size={20} />
        </div>
        <h3 className="text-lg font-bold mb-2">Authorization & Security</h3>
        <p className="text-gray-400 text-sm mb-4">Enterprise-grade security standards built-in.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-black/40 p-3 rounded border border-white/5 text-sm text-gray-300">Secrets in Kestra</div>
          <div className="bg-black/40 p-3 rounded border border-white/5 text-sm text-gray-300">No hard-coded creds</div>
          <div className="bg-black/40 p-3 rounded border border-white/5 text-sm text-gray-300">Signature Verification</div>
        </div>
      </div>
    </div>
  );
}


function ArchitectureContent() {
  return (
    <>
      <p className="text-gray-400 mb-8">Sento leverages a containerized microservices architecture orchestrated by Kestra, ensuring scalability and isolation.</p>
      
      <div className="bg-[#1c1c1c] p-8 rounded-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#3ECF8E]/20 text-[#3ECF8E] rounded-xl flex items-center justify-center mx-auto mb-3 border border-[#3ECF8E]/30">
              <Terminal size={32} />
            </div>
            <p className="font-bold text-sm">Docker Host</p>
          </div>
          
          <div className="hidden md:block h-px w-20 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          
          <div className="text-center p-4 bg-black/40 rounded-lg border border-white/10">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Layers size={24} />
            </div>
            <p className="font-bold text-sm">Kestra Engine</p>
            <p className="text-xs text-gray-500 mt-1">Orchestrator</p>
          </div>

          <div className="hidden md:block h-px w-20 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-black/40 rounded border border-white/10 text-xs">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div> Google Gemini API
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-black/40 rounded border border-white/10 text-xs">
              <div className="w-2 h-2 rounded-full bg-pink-500"></div> Instagram Graph API
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
      </div>
    </>
  );
}


function FlowsContent() {
  return (
    <div className="space-y-6">
      <div className="border-l-2 border-[#3ECF8E] pl-6 py-2">
        <h3 className="text-xl font-bold text-white mb-2">1. Content Generation Flow</h3>
        <p className="text-gray-400 text-sm mb-4">How a user prompt becomes an Instagram post.</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm font-mono text-gray-300 flex-wrap">
          <span className="bg-[#1c1c1c] px-2 py-1 rounded border border-white/10">User Input</span>
          <span className="text-gray-500">→</span>
          <span className="bg-[#1c1c1c] px-2 py-1 rounded border border-white/10">Prompt Enhancer</span>
          <span className="text-gray-500">→</span>
          <span className="bg-[#1c1c1c] px-2 py-1 rounded border border-white/10">Image Gen</span>
          <span className="text-gray-500">→</span>
          <span className="bg-[#1c1c1c] px-2 py-1 rounded border border-white/10">Upload</span>
          <span className="text-gray-500">→</span>
          <span className="bg-[#1c1c1c] px-2 py-1 rounded border border-white/10 text-[#3ECF8E]">Publish</span>
        </div>
      </div>

      <div className="border-l-2 border-purple-500 pl-6 py-2">
        <h3 className="text-xl font-bold text-white mb-2">2. Comment Moderation</h3>
        <p className="text-gray-400 text-sm">Real-time handling of user interactions.</p>
        <div className="mt-3 grid gap-2">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            Webhook received from Meta
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            Verify Signature (Security)
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            Analyze Sentiment (AI)
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            Draft Reply or Hide Comment
          </div>
        </div>
      </div>
    </div>
  );
}