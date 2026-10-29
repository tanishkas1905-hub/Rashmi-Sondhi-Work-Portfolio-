import React, { useState } from 'react';
import { 
  Briefcase, 
  Code2, 
  GraduationCap, 
  Award, 
  Printer, 
  Copy, 
  Check, 
  Search, 
  Calendar, 
  MapPin, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { 
  EXPERIENCES, 
  SKILL_CATEGORIES, 
  EDUCATION_AND_CERTS, 
  PERSONAL_DETAILS 
} from '../data/portfolioData';

interface InteractiveResumeProps {
  onOpenResumeModal: () => void;
  onNotify: (msg: string) => void;
}

export const InteractiveResume: React.FC<InteractiveResumeProps> = ({ onOpenResumeModal, onNotify }) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'skills' | 'education'>('experience');
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('All');
  const [copiedResume, setCopiedResume] = useState(false);

  const handleCopyResumeSummary = () => {
    const text = `RASHMI SONDHI - AI Full-Stack & Agentic AI Developer (7+ Years Exp)
Contact: ${PERSONAL_DETAILS.email} | ${PERSONAL_DETAILS.phone} | ${PERSONAL_DETAILS.location}
Portfolio: ${PERSONAL_DETAILS.portfolioSite}
Director & AI Solutions Developer at Shri Shyam Consulting (2022-Present). Expert in Python, FastAPI, n8n, LangGraph, Claude & Gemini API, React, TypeScript, PostgreSQL, and Docker.`;
    navigator.clipboard.writeText(text);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
    onNotify('Resume summary copied to clipboard');
  };

  // Filter skills based on search & category
  const filteredSkillCategories = SKILL_CATEGORIES.map((category) => {
    if (selectedSkillCategory !== 'All' && category.title !== selectedSkillCategory) {
      return null;
    }
    const matchingSkills = category.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(skillSearchQuery.toLowerCase()) ||
        s.tools.some((t) => t.toLowerCase().includes(skillSearchQuery.toLowerCase()))
    );
    if (matchingSkills.length === 0) return null;
    return {
      ...category,
      skills: matchingSkills,
    };
  }).filter(Boolean);

  return (
    <section id="resume" className="py-16 lg:py-24 border-t border-slate-800/80 bg-[#060910]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header & Export Toolbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-mono text-emerald-400">
              <span>04. Professional Record & Credentials</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>Interactive Resume</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Curriculum Vitae & Competency Matrix
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Explore 7+ years of engineering leadership, autonomous AI architecture, verifiable certifications, and multi-disciplinary software achievements.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyResumeSummary}
              className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copiedResume ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedResume ? 'Copied' : 'Copy Brief'}</span>
            </button>

            <button
              onClick={onOpenResumeModal}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-emerald-400 hover:from-sky-300 hover:to-emerald-300 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Printable ATS Resume</span>
            </button>
          </div>
        </div>

        {/* View Segmented Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto w-fit">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'experience'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-sky-400" />
            <span>Experience History ({EXPERIENCES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'skills'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Competency Matrix (6 Domains)</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'education'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Education & Certifications</span>
          </button>
        </div>

        {/* Tab 1: Experience History */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            {EXPERIENCES.map((exp, index) => (
              <div
                key={exp.id}
                className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors space-y-6"
              >
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                        {exp.period}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs text-slate-400 font-medium">
                        {exp.type}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                      <span>{exp.company}</span>
                      <span className="text-slate-600">·</span>
                      <span className="flex items-center gap-1 text-slate-400 text-xs">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Core metric callout */}
                  <div className="px-3.5 py-2 rounded-lg bg-sky-950/40 border border-sky-800/40 text-left sm:text-right shrink-0">
                    <span className="text-[11px] font-mono uppercase text-sky-300 block">Impact Metric</span>
                    <span className="text-xs font-bold text-white font-mono">{exp.coreMetric}</span>
                  </div>
                </div>

                {/* Key Accomplishments Bullet List */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-400">
                    Key Deliverables & Architectural Accomplishments:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Unboxed Tags */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="text-slate-400 font-medium">Verified Technologies:</span>
                  {exp.technologies.map((tech, tIdx) => (
                    <React.Fragment key={tech}>
                      <span className="text-slate-200 font-mono text-[11px]">{tech}</span>
                      {tIdx < exp.technologies.length - 1 && <span className="text-slate-600">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Skills Matrix */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            {/* Search & Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={skillSearchQuery}
                  onChange={(e) => setSkillSearchQuery(e.target.value)}
                  placeholder="Search skills (e.g. LangGraph, FastAPI, Docker, Gemini)..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Category Dropdown/Selector */}
              <select
                value={selectedSkillCategory}
                onChange={(e) => setSelectedSkillCategory(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="All">All Competency Domains</option>
                {SKILL_CATEGORIES.map((c) => (
                  <option key={c.title} value={c.title}>{c.title}</option>
                ))}
              </select>
            </div>

            {/* Competency Domain Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSkillCategories.map((category: any) => (
                <div
                  key={category.title}
                  className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4"
                >
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {category.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-800/80">
                    {category.skills.map((skill: any) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-200">{skill.name}</span>
                          <span className={`text-[11px] font-mono ${
                            skill.level === 'Expert' ? 'text-emerald-400' : 'text-sky-400'
                          }`}>
                            {skill.level}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {skill.tools.join(' · ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Education & Certifications */}
        {activeTab === 'education' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Education History (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-slate-400 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-sky-400" />
                <span>Academic Degrees & Foundations</span>
              </h3>

              <div className="space-y-4">
                {EDUCATION_AND_CERTS.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2"
                  >
                    <span className="text-xs font-mono text-sky-400 font-semibold block">
                      Accredited Qualification
                    </span>
                    <h4 className="text-base font-bold text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-slate-300">
                      {edu.institution}
                    </p>
                    <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                      <strong className="text-slate-300">Curriculum Scope:</strong> {edu.focus}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-slate-400 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Professional Certifications & Accreditations</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EDUCATION_AND_CERTS.certifications.map((cert) => (
                  <div
                    key={cert.badgeCode}
                    className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-emerald-400">
                        {cert.badgeCode}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">
                      {cert.title}
                    </h4>

                    <div className="text-xs text-sky-300 font-medium">
                      {cert.issuer}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
