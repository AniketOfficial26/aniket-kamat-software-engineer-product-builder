import React from 'react';
import { portfolioConfig } from '../portfolio.config';
import { Layers, Lightbulb, Compass, Cpu, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  const { aboutStory } = portfolioConfig;

  return (
    <section id="about" className="py-20 md:py-28 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header with Motion Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-2xl mb-16"
        >
          <div className="text-[clamp(0.6875rem,0.8vw,0.8125rem)] font-mono tracking-wider uppercase text-[#BEF264] mb-3">
            01. Narrative & Approach
          </div>
          <h2 className="text-[clamp(2.15rem,4vw+0.25rem,3.15rem)] font-bold tracking-tight text-white mb-4">
            How I Think & Build
          </h2>
          <p className="text-[clamp(1.05rem,1.2vw+0.15rem,1.25rem)] text-zinc-300 leading-relaxed">
            {aboutStory.lead}
          </p>
        </motion.div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Story Text with Motion */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-7 space-y-6 text-zinc-300 text-[clamp(1rem,1vw+0.15rem,1.125rem)] leading-relaxed"
          >
            {aboutStory.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="font-normal text-zinc-300">
                {paragraph}
              </p>
            ))}

            {/* Innovation Highlights (Zero Job Hunting Copy) */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
                <div className="flex items-center gap-2 text-xs font-mono text-[#BEF264] mb-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>CURIOSITY-LED PROCESS</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Understanding root mechanics before writing code, probing boundaries, and validating ideas with working prototypes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-2">
                  <Cpu className="w-4 h-4" />
                  <span>CROSS-DISCIPLINARY CRAFT</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Synthesizing electronics, full-stack software, and machine learning into intuitive, human-centered products.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Innovation & Engineering Principles */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Guiding Innovation Principles
              </div>

              {aboutStory.principles.map((principle, index) => (
                <div
                  key={principle.title}
                  className="p-5 rounded-xl bg-zinc-900/30 border border-white/5 hover:border-white/15 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-[#BEF264]">
                      0{index + 1}.
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      {principle.title}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-6">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Focus Summary Box */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                <Layers className="w-3.5 h-3.5 text-[#BEF264]" />
                <span>MULTIDISCIPLINARY SPECTRUM</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                From low-level registers and physical sensors to cross-platform mobile apps and cloud architectures—building software that stands on firm foundations.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
