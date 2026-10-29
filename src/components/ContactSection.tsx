import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Copy, 
  Check, 
  ExternalLink,
  Clock,
  Sparkles
} from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';

interface ContactSectionProps {
  onNotify: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNotify }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    projectType: 'Agentic AI Architecture',
    budgetRange: 'Enterprise / Standard',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const quickTemplates = [
    { label: 'Agentic AI Pipeline', text: 'Hi Rashmi, we are looking to build an autonomous multi-agent workflow using n8n and LLM orchestration (Claude/Gemini). Would love to discuss requirements.' },
    { label: 'Full-Stack Web App', text: 'Hi Rashmi, we have an enterprise web app requirement needing React, TypeScript, and FastAPI with zero-downtime CI/CD deployment.' },
    { label: 'Full-Time Remote Hire', text: 'Hi Rashmi, we reviewed your 7+ years track record in AI systems and would like to interview you for a Senior AI Full-Stack engineering role.' },
  ];

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      onNotify('Email copied to clipboard');
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      onNotify('Phone number copied to clipboard');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onNotify('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onNotify('Inquiry submitted successfully! Rashmi will respond within 24 hours.');
    }, 1200);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 border-t border-slate-800/80 bg-[#080c14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-mono text-sky-400">
            <span>05. Direct Engagement & Collaboration</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>Initiate Discussion</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Connect with Rashmi Sondhi
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Available for high-impact Agentic AI engineering, full-stack application development, autonomous workflow automation, and senior technical roles (Remote & Global).
          </p>
        </div>

        {/* 2-Column Split: Direct Channels & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Hub (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
              <h3 className="text-base font-bold text-white tracking-tight">
                Verified Contact Channels
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Email Channel */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Mail className="w-4 h-4 text-sky-400" />
                      Direct Email
                    </span>
                    <button
                      onClick={() => handleCopy(PERSONAL_DETAILS.email, 'email')}
                      className="text-sky-400 hover:text-sky-300 flex items-center gap-1"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <a
                    href={`mailto:${PERSONAL_DETAILS.email}`}
                    className="block text-white font-mono text-xs sm:text-sm hover:text-sky-300 transition-colors truncate"
                  >
                    {PERSONAL_DETAILS.email}
                  </a>
                </div>

                {/* Phone Channel */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      Direct Phone / WhatsApp
                    </span>
                    <button
                      onClick={() => handleCopy(PERSONAL_DETAILS.phone, 'phone')}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white font-mono text-xs sm:text-sm">
                      {PERSONAL_DETAILS.phone}
                    </span>
                    <a
                      href={PERSONAL_DETAILS.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-[11px] font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors flex items-center gap-1"
                    >
                      <span>WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Location & Availability Channel */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                    <span>Location & Availability</span>
                  </div>
                  <div className="text-white font-medium text-xs sm:text-sm">
                    {PERSONAL_DETAILS.location}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Collaborating with distributed international engineering teams across multiple time zones.
                  </p>
                </div>

              </div>

              {/* Turnaround expectation strip */}
              <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Typical response turnaround: within 12–24 business hours</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Project Inquiry & Collaboration Form
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Fill in project specifications or choose a quick starter template.
                  </p>
                </div>
              </div>

              {/* Quick Template Starters */}
              <div className="space-y-1.5">
                <span className="text-xs text-slate-400 font-medium">Quick Starters:</span>
                <div className="flex flex-wrap gap-2">
                  {quickTemplates.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, message: item.text }))}
                      className="px-3 py-1.5 text-xs rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {submitted ? (
                <div className="p-8 rounded-xl bg-slate-950/80 border border-emerald-500/50 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Inquiry Dispatched!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your message regarding <strong className="text-sky-300">{formData.projectType}</strong> has been logged. Rashmi Sondhi will review your brief and reply via <strong className="text-white">{formData.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        organization: '',
                        projectType: 'Agentic AI Architecture',
                        budgetRange: 'Enterprise / Standard',
                        message: '',
                      });
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Nair"
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="priya@company.com"
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Organization / Company */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Acme Health or Venture Labs"
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                      />
                    </div>

                    {/* Project Domain / Engagement Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Area of Engagement *
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500 transition-colors"
                      >
                        <option value="Agentic AI Architecture">Agentic AI & Multi-Agent Architecture</option>
                        <option value="Full-Stack Web Development">Full-Stack Web Application (React / FastAPI)</option>
                        <option value="Workflow Automation (n8n/LLM)">Workflow Automation & n8n / Webhooks</option>
                        <option value="Full-Time Remote Position">Full-Time Senior Engineering Role</option>
                        <option value="Technical Consulting & Mentoring">Consulting, Training or Robotics</option>
                      </select>
                    </div>

                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Message & Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your project scope, target timeline, or technical challenges..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-emerald-400 hover:from-sky-300 hover:to-emerald-300 rounded-lg transition-all shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Transmitting Ingestion...' : 'Send Message'}</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
