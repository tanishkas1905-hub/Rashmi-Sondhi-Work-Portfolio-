import React, { useEffect } from 'react';
import { X, ExternalLink, ShieldCheck, CheckCircle2, ArrowRight, Layers, Workflow, Globe } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0a0f1d] border border-slate-700/80 rounded-2xl shadow-2xl text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0a0f1d]/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400">
              {project.category}
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-xs text-slate-400 font-mono">System Deep Dive</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Header & Title Area */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-base text-sky-300 font-medium">
              {project.subtitle}
            </p>
            
            {/* Unboxed Metadata Strip */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
              {project.tags.map((tag, i) => (
                <React.Fragment key={tag}>
                  <span className="text-slate-300 font-mono">{tag}</span>
                  {i < project.tags.length - 1 && <span className="text-slate-600">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Media Container with Fallback */}
          <div className="relative rounded-xl overflow-hidden border border-slate-700/70 bg-slate-900 aspect-video group">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent opacity-60" />
            
            {project.liveUrl && (
              <div className="absolute bottom-4 right-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg shadow-lg flex items-center gap-1.5 transition-all"
                >
                  <Globe className="w-3.5 h-3.5 text-sky-600" />
                  <span>Launch Live Netlify App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* In-depth Narrative */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-slate-400">
              Architecture Overview
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* System Pipeline Sequence Flow */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-slate-400 flex items-center gap-2">
              <Workflow className="w-4 h-4 text-emerald-400" />
              <span>Step-by-Step Architectural Pipeline</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {project.systemFlow.map((flow) => (
                <div key={flow.step} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="text-[11px] font-mono text-emerald-400 font-semibold">
                    {flow.step}
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    {flow.description}
                  </p>
                  <div className="text-[10px] font-mono text-sky-400 pt-1 border-t border-slate-800/80 truncate">
                    {flow.tech}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dual Columns: Engineering Highlights & Measurable Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Highlights */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                <span>Technical Specifications</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {project.architectureHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Outcomes */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Measurable Outcomes</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {project.keyOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Engineered by <strong className="text-white">Rashmi Sondhi</strong> · Shri Shyam Consulting
            </div>

            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-emerald-400 hover:from-sky-300 hover:to-emerald-300 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <span>Open Live Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Close Deep Dive
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
