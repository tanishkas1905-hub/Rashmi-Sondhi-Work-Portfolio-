import React, { useEffect, useState } from 'react';
import { X, Printer, Copy, Check, Download, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { PERSONAL_DETAILS, EXPERIENCES, SKILL_CATEGORIES, EDUCATION_AND_CERTS, PROJECTS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onNotify }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyTextResume = () => {
    const plainText = `
RASHMI SONDHI
Durg, Chhattisgarh (Open to Remote)
Phone: ${PERSONAL_DETAILS.phone} | Email: ${PERSONAL_DETAILS.email}
Portfolio: ${PERSONAL_DETAILS.portfolioSite}
Live Projects: 
- PhysioTracker: https://physiotherapyservice.netlify.app/
- Air Pollution Tracker: https://airpollutiontracking.netlify.app

PROFESSIONAL SUMMARY
${PERSONAL_DETAILS.summary}

PROFESSIONAL EXPERIENCE

${EXPERIENCES.map(
  (exp) => `${exp.role} | ${exp.company}
${exp.location} | ${exp.period}
${exp.highlights.map((h) => `• ${h}`).join('\n')}
Technologies: ${exp.technologies.join(', ')}
`
).join('\n')}

CORE COMPETENCIES & TECHNICAL SKILLS
${SKILL_CATEGORIES.map(
  (cat) => `• ${cat.title}: ${cat.skills.map((s) => `${s.name} (${s.tools.join(', ')})`).join('; ')}`
).join('\n')}

AI & FULL-STACK PROJECTS
${PROJECTS.map(
  (p) => `• ${p.title} (${p.category})
  Tech Stack: ${p.tags.join(', ')}
  Summary: ${p.summary}
  ${p.liveUrl ? `Live App: ${p.liveUrl}` : ''}`
).join('\n\n')}

EDUCATION & CERTIFICATIONS
• Bachelor's Degree: BA
• Diploma in Electronics and Telecommunication
Certifications:
${EDUCATION_AND_CERTS.certifications.map((c) => `• ${c.title} (${c.issuer}) - ${c.description}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onNotify('Plain-text ATS resume copied to clipboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl max-h-[94vh] flex flex-col bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controls (Excluded during print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              ATS-Optimized Resume Document
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">Standardized Single / Dual Page Export</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyTextResume}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Plain Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet Canvas */}
        <div className="overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 font-sans print:p-0 print:overflow-visible">
          
          {/* Resume Header */}
          <div className="border-b-2 border-slate-900 pb-5 mb-6 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 uppercase">
              {PERSONAL_DETAILS.name}
            </h1>
            <div className="text-sm font-semibold text-slate-700 mt-1">
              {PERSONAL_DETAILS.title}
            </div>

            {/* Contact details bar */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-600 mt-2 font-mono">
              <span>{PERSONAL_DETAILS.location}</span>
              <span>·</span>
              <span>{PERSONAL_DETAILS.phone}</span>
              <span>·</span>
              <span>{PERSONAL_DETAILS.email}</span>
              <span>·</span>
              <a href={PERSONAL_DETAILS.portfolioSite} target="_blank" rel="noreferrer" className="text-sky-700 underline">
                airpollutiontracking.netlify.app
              </a>
              <span>·</span>
              <a href="https://physiotherapyservice.netlify.app/" target="_blank" rel="noreferrer" className="text-sky-700 underline">
                physiotherapyservice.netlify.app
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 font-mono">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              {PERSONAL_DETAILS.summary}
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5 font-mono">
              Core Competencies & Technical Skills
            </h2>
            <div className="space-y-1.5 text-xs text-slate-800">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.title} className="leading-snug">
                  <strong className="font-semibold text-slate-950">{cat.title}: </strong>
                  <span className="text-slate-700">
                    {cat.skills.map((s) => `${s.name} (${s.tools.join(', ')})`).join(' · ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3 font-mono">
              Professional Experience
            </h2>
            
            <div className="space-y-5">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm font-bold text-slate-950">
                      {exp.role} <span className="font-normal text-slate-600">| {exp.company}</span>
                    </h3>
                    <div className="text-xs text-slate-600 font-mono">
                      {exp.location} · {exp.period}
                    </div>
                  </div>

                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700 leading-relaxed">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>

                  <div className="text-[11px] text-slate-600 pt-0.5">
                    <strong className="text-slate-800">Key Tech:</strong> {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3 font-mono">
              Selected AI & Full-Stack Projects
            </h2>
            
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-xs font-bold text-slate-950">
                      {proj.title}
                    </h3>
                    {proj.liveUrl && (
                      <span className="text-xs text-sky-800 font-mono">
                        Live: {proj.liveUrl}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {proj.summary}
                  </p>
                  <div className="text-[11px] text-slate-600 font-mono">
                    <strong>Stack:</strong> {proj.tags.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 font-mono">
                Education
              </h2>
              <div className="space-y-2 text-xs text-slate-700">
                {EDUCATION_AND_CERTS.education.map((edu, idx) => (
                  <div key={idx}>
                    <div className="font-bold text-slate-950">{edu.degree}</div>
                    <div className="text-[11px] text-slate-600">{edu.institution} · {edu.focus}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 font-mono">
                Certifications & Accreditations
              </h2>
              <div className="space-y-1.5 text-xs text-slate-700">
                {EDUCATION_AND_CERTS.certifications.map((c) => (
                  <div key={c.badgeCode}>
                    <strong className="font-semibold text-slate-900">{c.title}</strong>
                    <span className="text-[11px] text-slate-600"> ({c.issuer})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
