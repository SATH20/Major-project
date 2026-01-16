'use client';

import { Activity, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#4F7FFF]/10 bg-[#0A0F1F] py-16 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4F7FFF] to-[#9B6BFF] flex items-center justify-center">
                <Activity size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight font-[family-name:var(--font-space)]">
                Lend<span className="text-[#4F7FFF]">Nova</span>
              </span>
            </div>
            <p className="text-[#8A8FA3] text-sm leading-relaxed">
              AI-powered creditworthiness prediction system for first-time borrowers. Making fair, explainable credit decisions using machine learning.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[#E8EBF3] font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="#features" className="text-[#8A8FA3] hover:text-[#4F7FFF] transition-colors text-sm">Features</a>
              <a href="#pipeline" className="text-[#8A8FA3] hover:text-[#4F7FFF] transition-colors text-sm">How It Works</a>
              <a href="#security" className="text-[#8A8FA3] hover:text-[#4F7FFF] transition-colors text-sm">Security</a>
              <a href="#explainability" className="text-[#8A8FA3] hover:text-[#4F7FFF] transition-colors text-sm">ML Models</a>
            </div>
          </div>

          {/* Project Info */}
          <div className="space-y-4">
            <h4 className="text-[#E8EBF3] font-semibold">Project Info</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#4F7FFF]/10 text-[#4F7FFF] rounded-full text-xs font-medium">
                Academic Project
              </span>
              <span className="px-3 py-1 bg-[#9B6BFF]/10 text-[#9B6BFF] rounded-full text-xs font-medium">
                Machine Learning
              </span>
              <span className="px-3 py-1 bg-[#2EE59D]/10 text-[#2EE59D] rounded-full text-xs font-medium">
                Credit Risk Analysis
              </span>
            </div>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#8A8FA3] hover:text-[#4F7FFF] transition-colors text-sm"
            >
              <Github size={16} />
              View on GitHub
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#4F7FFF]/10 text-center">
          <p className="text-[#8A8FA3] text-sm">
            © 2024 LendNova. Academic Research Project.
          </p>
        </div>
      </div>
    </footer>
  );
}
