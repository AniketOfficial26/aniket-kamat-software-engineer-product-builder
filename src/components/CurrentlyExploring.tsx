import React from 'react';
import { portfolioConfig } from '../portfolio.config';
import { motion } from 'motion/react';

export const CurrentlyExploring: React.FC = () => {
  const { currentlyExploring } = portfolioConfig;

  return (
    <section id="exploring" className="py-20 md:py-28 border-t border-white/10 relative">
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
            04. Active Focus
          </div>
          <h2 className="text-[clamp(2.15rem,4vw+0.25rem,3.15rem)] font-bold tracking-tight text-white mb-4">
            Currently Exploring
          </h2>
          <p className="text-[clamp(1rem,1.1vw+0.15rem,1.15rem)] text-zinc-300 leading-relaxed">
            The software industry evolves quickly. Here are the core technical domains I am actively studying, prototyping in, and deepening my engineering knowledge on.
          </p>
        </motion.div>

        {/* Exploration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentlyExploring.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="p-6 sm:p-7 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-white/15 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Index & Focus Area */}
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-4 pb-3 border-b border-white/5">
                  <span className="text-[#BEF264]">AREA 0{index + 1}</span>
                  <span className="text-zinc-400 font-sans">{item.focus}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Status footer with clean static indicator */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BEF264]" />
                <span>Active Research & Prototyping</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
