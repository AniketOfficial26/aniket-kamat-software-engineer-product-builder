import React, { useState } from 'react';
import { portfolioConfig } from '../portfolio.config';
import { ArrowDown, Copy, Check, FileText, Github, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenGuide }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioConfig.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Coordinated entrance animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden z-10">
      {/* Subtle background ambient glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#bef264]/6 via-[#8b5cf6]/5 to-transparent blur-3xl pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Split-screen Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typographic Hierarchy with Fluid Clamp Scale */}
          <motion.div 
            className="lg:col-span-8 flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Lead Kicker - Clean unboxed metadata with separators */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-2 text-[clamp(0.6875rem,0.8vw,0.8125rem)] font-mono tracking-wider uppercase text-[#BEF264] mb-4"
            >
              <span>Software Engineering</span>
              <span aria-hidden="true" className="text-zinc-600">/</span>
              <span>Applied AI</span>
              <span aria-hidden="true" className="text-zinc-600">/</span>
              <span>Thoughtful Product Design</span>
            </motion.div>

            {/* Primary Headline with Fluid clamp() (64-80px on desktop) */}
            <motion.h1 
              variants={itemVariants}
              className="text-[clamp(2.75rem,5.5vw+0.5rem,5.25rem)] font-extrabold tracking-tight text-white leading-[1.08] mb-6 [text-wrap:balance]"
            >
              {portfolioConfig.personal.heroHeadline}
            </motion.h1>

            {/* Supporting Text with Fluid clamp() (16-19px) */}
            <motion.p 
              variants={itemVariants}
              className="text-[clamp(1.05rem,1.2vw+0.15rem,1.25rem)] text-zinc-300 font-normal leading-relaxed mb-8 max-w-2xl"
            >
              {portfolioConfig.personal.heroSupportingText}
            </motion.p>

            {/* Primary & Secondary Actions */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#090A0F] bg-[#BEF264] hover:bg-[#d9f99d] active:scale-[0.98] rounded-xl transition-all duration-150 shadow-md shadow-[#bef264]/10 hover:shadow-lg hover:shadow-[#bef264]/20 cursor-pointer"
              >
                <span>Explore my work</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-white/20 active:scale-[0.98] rounded-xl transition-all duration-150 cursor-pointer"
              >
                <span>Let's connect</span>
              </a>
            </motion.div>

            {/* Quick Contact & Placeholders Bar */}
            <motion.div 
              variants={itemVariants}
              className="w-full pt-6 border-t border-white/10 flex flex-wrap items-center gap-y-3 gap-x-6 text-[clamp(0.6875rem,0.8vw,0.8125rem)] text-zinc-400"
            >
              {/* Quick Copy Email */}
              <button
                onClick={handleCopyEmail}
                className="group flex items-center gap-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Click to copy email address"
              >
                <span className="font-mono">{portfolioConfig.personal.email}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-[#BEF264]" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
                )}
                {copied && <span className="text-[#BEF264] text-[11px] font-mono">Copied!</span>}
              </button>

              <span aria-hidden="true" className="text-zinc-700 hidden sm:inline">|</span>

              {/* GitHub Link */}
              <a
                href={portfolioConfig.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                title="GitHub Profile (Configure in portfolio.config.ts)"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                {portfolioConfig.personal.isGithubPlaceholder && (
                  <span className="text-[10px] text-zinc-500 font-mono">(placeholder)</span>
                )}
              </a>

              {/* LinkedIn Link */}
              <a
                href={portfolioConfig.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                title="LinkedIn Profile (Configure in portfolio.config.ts)"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                {portfolioConfig.personal.isLinkedinPlaceholder && (
                  <span className="text-[10px] text-zinc-500 font-mono">(placeholder)</span>
                )}
              </a>

              {/* Resume Link */}
              <a
                href={portfolioConfig.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (portfolioConfig.personal.isResumePlaceholder) {
                    e.preventDefault();
                    onOpenGuide();
                  }
                }}
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                title="Resume PDF link"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
                {portfolioConfig.personal.isResumePlaceholder && (
                  <span className="text-[10px] text-amber-400/80 font-mono">(config needed)</span>
                )}
              </a>
            </motion.div>

          </motion.div>

          {/* Right spatial clearance: Unobstructed space allowing the persistent 3D sculpture to float freely */}
          <div className="hidden lg:block lg:col-span-4 pointer-events-none" aria-hidden="true" />

        </div>

        {/* Full-width Innovation Foundation Strip Below Split */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-16 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors">
            <div className="text-[clamp(0.6875rem,0.8vw,0.8125rem)] font-mono text-[#BEF264] mb-1">FOUNDATION 01</div>
            <h3 className="text-base font-semibold text-white mb-1.5">Curious Experimentation</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Innovation begins with questioning how systems operate, exploring edges, and iterating rapidly until concepts become tangible.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors">
            <div className="text-[clamp(0.6875rem,0.8vw,0.8125rem)] font-mono text-[#BEF264] mb-1">FOUNDATION 02</div>
            <h3 className="text-base font-semibold text-white mb-1.5">Silicon to Software</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Grounded perspective across embedded microcontrollers, memory constraints, full-stack web, and intelligent algorithms.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors">
            <div className="text-[clamp(0.6875rem,0.8vw,0.8125rem)] font-mono text-[#BEF264] mb-1">FOUNDATION 03</div>
            <h3 className="text-base font-semibold text-white mb-1.5">Practical Human Utility</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Meaningful technology is not about complexity for its own sake—it is about creating tools that are thoughtful and useful.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
