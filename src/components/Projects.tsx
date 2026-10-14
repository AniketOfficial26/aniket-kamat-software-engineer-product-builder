import React, { useState } from 'react';
import { portfolioConfig, Project } from '../portfolio.config';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsProps {
  onOpenGuide: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenGuide }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web & Full-Stack' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'hardware', label: 'Embedded & Hardware' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? portfolioConfig.projects
    : portfolioConfig.projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header & Interactive Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
        >
          <div className="max-w-2xl">
            <div className="text-[clamp(0.6875rem,0.8vw,0.8125rem)] font-mono tracking-wider uppercase text-[#BEF264] mb-3">
              03. Selected Work
            </div>
            <h2 className="text-[clamp(2.15rem,4vw+0.25rem,3.15rem)] font-bold tracking-tight text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-[clamp(1rem,1.1vw+0.15rem,1.15rem)] text-zinc-300 leading-relaxed">
              Real systems spanning deployed web platforms, mobile application architectures, machine learning models, and embedded hardware prototypes.
            </p>
          </div>

          {/* Interactive Filter Tabs - Button elements with clean segmented styling */}
          <div 
            className="flex items-center flex-wrap gap-1.5 p-1.5 bg-zinc-900/60 border border-white/10 rounded-xl"
            role="tablist"
            aria-label="Filter projects by discipline"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid with 3D Hover Tilt & 16:9 Image Placement */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setActiveProject(p)}
                onOpenGuide={onOpenGuide}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Project Modal Dialog */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onOpenGuide={onOpenGuide}
        />

      </div>
    </section>
  );
};
