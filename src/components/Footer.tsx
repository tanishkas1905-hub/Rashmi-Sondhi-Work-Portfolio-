import React from 'react';
import { ArrowUp, Mail, Phone, ExternalLink, Globe } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/90 bg-[#060910] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800/70">
          
          {/* Brand & Title */}
          <div className="space-y-1">
            <a href="#overview" className="text-base font-bold text-white tracking-tight hover:text-sky-300 transition-colors">
              {PERSONAL_DETAILS.name}
            </a>
            <p className="text-xs text-slate-400">
              {PERSONAL_DETAILS.title} · Durg, Chhattisgarh (Open to Remote)
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
            <a href="#overview" className="hover:text-white transition-colors">Overview</a>
            <a href="#projects" className="hover:text-white transition-colors">Creative Work</a>
            <a href="#pipeline" className="hover:text-white transition-colors">Agent Pipeline</a>
            <a href="#resume" className="hover:text-white transition-colors">Resume</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          {/* Back to Top */}
          <div>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-2 text-xs"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Live Deployments & Legal Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-400 font-medium">Live Deployed Artifacts:</span>
            <a
              href="https://physiotherapyservice.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-sky-500" />
              <span>PhysioTracker</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span>·</span>
            <a
              href="https://airpollutiontracking.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-emerald-500" />
              <span>Air Pollution Tracker</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div>
            © {new Date().getFullYear()} Rashmi Sondhi. Designed for production performance and agentic reliability.
          </div>
        </div>

      </div>
    </footer>
  );
};
