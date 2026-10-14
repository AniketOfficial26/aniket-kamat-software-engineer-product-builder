import React from 'react';
import { portfolioConfig } from '../portfolio.config';
import { ArrowUp, Github, Linkedin, FileText, Settings2 } from 'lucide-react';

interface FooterProps {
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#07080C] text-zinc-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand & Mission Statement */}
          <div>
            <div className="text-white font-bold text-base tracking-tight mb-1">
              {portfolioConfig.personal.fullName}
            </div>
            <p className="text-zinc-500 max-w-md">
              {portfolioConfig.personal.education} · {portfolioConfig.personal.focusPhilosophy}
            </p>
          </div>

          {/* Direct Navigation Links */}
          <div className="flex flex-wrap items-center gap-5 text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#exploring" className="hover:text-white transition-colors">Exploring</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <button
              onClick={onOpenGuide}
              className="text-[#BEF264] hover:underline flex items-center gap-1 font-mono"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Config Guide</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {portfolioConfig.personal.fullName}. Built with React, TypeScript & Tailwind CSS.
          </div>

          <div className="flex items-center gap-6">
            <span>Production-ready portfolio</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
