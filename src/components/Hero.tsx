import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Mail, Phone, MapPin, Play, Terminal, ExternalLink } from 'lucide-react';
import { PERSONAL_DETAILS, KEY_METRICS } from '../data/portfolioData';

interface HeroProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
  onNotify: (msg: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onOpenResume, onNotify }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      onNotify('Email address copied to clipboard');
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      onNotify('Phone number copied to clipboard');
    }
  };

  return (
    <section id="overview" className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 -z-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen Hero: 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typographic Hierarchy & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial kicker */}
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-mono text-sky-400">
              <span>01. Strategy & Architecture</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>Full-Stack AI Developer</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              Architecting Autonomous AI Agent Workflows & Scalable Web Solutions.
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Hello, I'm <strong className="font-semibold text-white">{PERSONAL_DETAILS.name}</strong>. With over{' '}
              <span className="font-semibold text-sky-400">7+ years of engineering experience</span>, I bridge complex business workflows, multi-agent orchestration, and low-code/code automation into autonomous AI pipelines, specialized content engines, and production web platforms.
            </p>

            {/* Quick Contact & Availability Strip */}
            <div className="pt-2 pb-1 border-y border-slate-800/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{PERSONAL_DETAILS.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href={`mailto:${PERSONAL_DETAILS.email}`} className="hover:text-white transition-colors">
                  {PERSONAL_DETAILS.email}
                </a>
                <button
                  onClick={() => handleCopy(PERSONAL_DETAILS.email, 'email')}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                  title="Copy email"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href={`tel:${PERSONAL_DETAILS.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {PERSONAL_DETAILS.phone}
                </a>
                <button
                  onClick={() => handleCopy(PERSONAL_DETAILS.phone, 'phone')}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                  title="Copy phone"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-emerald-400 hover:from-sky-300 hover:to-emerald-300 rounded-lg transition-all shadow-md shadow-sky-500/20 flex items-center gap-2"
              >
                <span>Explore Creative Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#pipeline"
                className="px-5 py-2.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4 text-emerald-400" />
                <span>Simulate Agent Pipeline</span>
              </a>

              <button
                onClick={onOpenResume}
                className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Terminal className="w-4 h-4 text-sky-400" />
                <span>View Resume</span>
              </button>
            </div>

            {/* Key Focus Tech Tags */}
            <div className="pt-2 text-xs text-slate-400 flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-medium">Core Stack:</span>
              <span>Python & FastAPI</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>LangGraph & n8n</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Claude & Gemini API</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>React & Next.js</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>PostgreSQL & Docker</span>
            </div>

          </div>

          {/* Right Column: High-Fidelity Editorial Visual Container (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Decorative Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/60 shadow-2xl group">
                <img
                  src="/src/assets/images/hero_rashmi_portrait_1793291884151.jpg"
                  alt="Rashmi Sondhi, Director & AI Solutions Developer"
                  referrerPolicy="no-referrer"
                  className="w-full h-[430px] object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
                
                {/* Contrast Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/40 to-transparent" />

                {/* Overlaid Editorial Meta Box */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 text-left">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-white tracking-tight">Rashmi Sondhi</span>
                    <span className="text-[11px] font-mono text-emerald-400">Director & AI Solutions</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Shri Shyam Consulting · Leading multi-agent LLM systems, robotics training, and enterprise web solutions.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Durg, Chhattisgarh (Open to Remote)</span>
                    <span className="text-sky-400 font-mono">Active 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width Metric Strip row below the hero split */}
        <div className="mt-14 pt-8 border-t border-slate-800/90 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {KEY_METRICS.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200">
                {metric.label}
              </div>
              <div className="text-xs text-slate-400">
                {metric.subtext}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
