import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Globe, Layers, Sparkles } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<string>('All');

  const categories = [
    'All',
    'Agentic AI',
    'Healthcare',
    'Environmental',
    'Knowledge & RAG',
  ];

  const filteredProjects =
    filter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-16 lg:py-24 border-t border-slate-800/80 bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-mono text-sky-400">
              <span>03. Selected Works & Systems</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>Production Artifacts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Featured Engineering & AI Deployments
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Real-world systems combining autonomous agents, real-time REST data streams, responsive healthcare interfaces, and grounded LLM reasoning.
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  filter === cat
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Box Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, index) => {
            // Asymmetric layout: First project takes 7 cols, second takes 5 cols, third takes 6 cols, fourth takes 6 cols
            const colSpan =
              index === 0
                ? 'lg:col-span-7'
                : index === 1
                ? 'lg:col-span-5'
                : 'lg:col-span-6';

            return (
              <div
                key={project.id}
                className={`group relative flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/40 hover:bg-slate-900/70 hover:border-slate-700 transition-all duration-300 overflow-hidden ${colSpan}`}
              >
                {/* Media Presentation */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-slate-800/70">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  
                  {/* Subtle Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Overlaid Live Badges if available */}
                  {project.liveUrl && (
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-[11px] font-semibold text-slate-950 bg-white/95 hover:bg-white rounded-lg shadow-md backdrop-blur-sm flex items-center gap-1.5 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe className="w-3 h-3 text-sky-600" />
                        <span>Live Netlify App</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </a>
                    </div>
                  )}

                  {/* Category in bottom-left */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-sky-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-5">
                  <div className="space-y-2.5">
                    
                    {/* Unboxed Metadata (Tags separated by middot) */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 font-mono">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <React.Fragment key={tag}>
                          <span className="text-slate-300">{tag}</span>
                          {i < Math.min(project.tags.length, 4) - 1 && (
                            <span className="text-slate-600">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Action Row */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition-colors group/btn"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Architecture & Deep Dive</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
