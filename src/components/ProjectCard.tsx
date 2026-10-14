import React, { useRef, useState } from 'react';
import { Project } from '../portfolio.config';
import { ExternalLink, Github, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectCardProps {
  project: Project & { visualType?: string };
  onSelect: (project: Project) => void;
  onOpenGuide: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, onOpenGuide }) => {
  const cardRef = useRef<HTMLElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Gentle restrained tilt (max 4.5 degrees)
    const rotX = -((y - centerY) / centerY) * 4.5;
    const rotY = ((x - centerX) / centerX) * 4.5;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
      }}
      className="group relative flex flex-col justify-between rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-[#bef264]/40 hover:shadow-2xl hover:shadow-[#bef264]/5 transition-colors duration-300 overflow-hidden"
    >
      <div>
        {/* 16:9 Cover Image Slot */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950 border-b border-white/5">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} cover visual`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 font-mono text-xs">
              <span>{project.title} Visual</span>
            </div>
          )}

          {/* Scrim Overlay & Visual Type Indicator */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />

          {/* Visual Type Pill/Label (Distinguishing Mockup vs Hardware Visual) */}
          {project.visualType && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 pointer-events-none">
              {project.visualType}
            </div>
          )}

          {/* Category Tag on bottom edge of image */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs font-mono text-[#bef264] uppercase tracking-wider">
            <span>{project.categoryLabel}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Unboxed Metadata & Status */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
            <span className="text-zinc-500 font-mono text-[11px]">
              {project.contextTag}
            </span>
            {project.liveUrl && (
              <span className="text-[#bef264] text-[11px] font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#bef264]" />
                <span>Live</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#bef264] transition-colors">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5 line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Technologies Used (Unboxed Text with Separator) */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400 font-mono">
            {project.technologies.map((tech, idx) => (
              <React.Fragment key={tech}>
                <span className="text-zinc-300">{tech}</span>
                {idx < project.technologies.length - 1 && (
                  <span aria-hidden="true" className="text-zinc-600 select-none">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-white/5 mt-2">
        <button
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#bef264] transition-colors py-1 cursor-pointer"
          aria-label={`View full details for ${project.title}`}
        >
          <span>Details & Specs</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>

        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-[#bef264] rounded-lg border border-white/10 hover:border-white/20 transition-colors"
              title="Visit live deployment on Vercel"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (project.isSourcePlaceholder) {
                  e.preventDefault();
                  onOpenGuide();
                }
              }}
              className="p-2 text-zinc-400 hover:text-white rounded-lg border border-white/10 hover:border-white/20 transition-colors"
              title={project.isSourcePlaceholder ? 'Source URL is a placeholder (click to see config)' : 'View GitHub repository'}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};
