/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AgentWorkflowSimulator } from './components/AgentWorkflowSimulator';
import { ProjectsSection } from './components/ProjectsSection';
import { InteractiveResume } from './components/InteractiveResume';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { Project } from './data/portfolioData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleNotify = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const handleOpenContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenResume = () => {
    setResumeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-sky-500/30 selection:text-sky-300 font-sans">
      
      {/* Navigation Top Bar */}
      <Navbar
        onOpenContact={handleOpenContact}
        onOpenResume={handleOpenResume}
      />

      {/* Main Content Sections */}
      <main>
        {/* Split-Screen Hero */}
        <Hero
          onOpenContact={handleOpenContact}
          onOpenResume={handleOpenResume}
          onNotify={handleNotify}
        />

        {/* Autonomous Multi-Agent Pipeline Simulator */}
        <AgentWorkflowSimulator />

        {/* Selected Works & Creative Projects */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Interactive Resume & Competency Matrix */}
        <InteractiveResume
          onOpenResumeModal={handleOpenResume}
          onNotify={handleNotify}
        />

        {/* Contact & Ingestion Form */}
        <ContactSection onNotify={handleNotify} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Architectural Deep-Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* ATS Printable Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        onNotify={handleNotify}
      />

      {/* Visual Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900/95 text-white border border-emerald-500/40 shadow-xl backdrop-blur-md text-xs font-medium animate-bounce-subtle">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
