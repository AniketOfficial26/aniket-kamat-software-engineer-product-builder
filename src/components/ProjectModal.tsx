import React, { useEffect } from 'react';
import { Project } from '../portfolio.config';
import { X, ExternalLink, Github, AlertCircle, CheckCircle2, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenGuide: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenGuide }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop click dismiss */}
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#0E1017] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-zinc-900/40">
          <div>
            <div className="text-xs font-mono text-[#BEF264] uppercase tracking-wider mb-1">
              {project.categoryLabel}
            </div>
            <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-white">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-300">
          
          {/* Optional Project Image */}
          {project.image && (
            <div className="rounded-xl overflow-hidden border border-white/10 bg-zinc-950 aspect-[16/9] relative">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {'visualType' in project && (project as any).visualType && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                  {(project as any).visualType}
                </div>
              )}
            </div>
          )}

          {/* Context Badge / Status Bar */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/60 p-3 rounded-lg border border-white/5">
            <span className="text-[#BEF264]">PROJECT STATUS:</span>
            <span className="text-white font-medium">{project.contextTag}</span>
          </div>

          {/* Full Description */}
          <div>
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Overview & Architecture
            </h4>
            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Engineering Highlights */}
          <div>
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
              Key Engineering Highlights
            </h4>
            <ul className="space-y-2.5">
              {project.keyHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#BEF264] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used (Zero-pill text format) */}
          <div>
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300 p-3 rounded-lg bg-zinc-900/40 border border-white/5">
              {project.technologies.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span className="text-white font-medium">{tech}</span>
                  {idx < project.technologies.length - 1 && (
                    <span aria-hidden="true" className="text-zinc-600 select-none">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Caveat & Academic/Honesty Notice */}
          {project.caveatNote && (
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-amber-500/20 text-xs text-zinc-400 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-amber-300">Project Transparency Note: </strong>
                {project.caveatNote}
              </p>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-zinc-900/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#090A0F] bg-[#BEF264] hover:bg-[#d9f99d] rounded-lg transition-colors shadow-sm"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : null}

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
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 border border-white/10 rounded-lg transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
                {project.isSourcePlaceholder && (
                  <span className="text-[10px] text-zinc-400">(placeholder)</span>
                )}
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
