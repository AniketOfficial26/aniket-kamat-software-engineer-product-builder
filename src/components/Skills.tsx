import React from 'react';
import { portfolioConfig } from '../portfolio.config';
import { Code2, Smartphone, Brain, Database, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

export const Skills: React.FC = () => {
  const { skillGroups } = portfolioConfig;

  // Icon mapping for clear categorical representation
  const getGroupIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 className="w-4 h-4 text-[#BEF264]" />;
      case 1:
        return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 2:
        return <Brain className="w-4 h-4 text-purple-400" />;
      case 3:
        return <Database className="w-4 h-4 text-blue-400" />;
      case 4:
        return <Cpu className="w-4 h-4 text-amber-400" />;
      default:
        return <Code2 className="w-4 h-4 text-[#BEF264]" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-white/10 relative">
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
            02. Technical Capabilities
          </div>
          <h2 className="text-[clamp(2.15rem,4vw+0.25rem,3.15rem)] font-bold tracking-tight text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-[clamp(1rem,1.1vw+0.15rem,1.15rem)] text-zinc-300 leading-relaxed">
            Acquired through coursework, academic capstone projects, engineering internships, and continuous hands-on building. Grouped by functional discipline without artificial scoring metrics.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
              className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-white/15 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-zinc-800/80 border border-white/5">
                    {getGroupIcon(index)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {group.name}
                    </h3>
                  </div>
                </div>

                {/* Subtitle / Discipline description */}
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                  {group.description}
                </p>
              </div>

              {/* Zero-Pill Skill Item Presentation */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs font-medium text-zinc-300">
                  {group.skills.map((skill, sIdx) => (
                    <React.Fragment key={skill}>
                      <span className="text-zinc-200 hover:text-[#BEF264] transition-colors py-0.5">
                        {skill}
                      </span>
                      {sIdx < group.skills.length - 1 && (
                        <span aria-hidden="true" className="text-zinc-600 select-none">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note on honest engineering assessment */}
        <div className="mt-12 p-4 rounded-xl bg-zinc-950/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BEF264]" />
            <span className="text-zinc-300 font-medium">Authentic Engineering Standard</span>
            <span className="hidden sm:inline text-zinc-600">—</span>
            <span>Skills reflect real project utilization, coursework, and practical implementations.</span>
          </div>
          <a
            href="#projects"
            className="text-[#BEF264] hover:underline whitespace-nowrap"
          >
            See where these skills were applied &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};
