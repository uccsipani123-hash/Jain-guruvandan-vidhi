import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractiveVidhiSteps } from './components/InteractiveVidhiSteps';
import { LineByLineMeanings } from './components/LineByLineMeanings';
import { ThirtyTwoDoshas } from './components/ThirtyTwoDoshas';
import { PracticeMode } from './components/PracticeMode';
import { JainQuiz } from './components/JainQuiz';
import { AuthorContact } from './components/AuthorContact';
import { PrintableVidhi } from './components/PrintableVidhi';
import { GlossaryModal } from './components/GlossaryModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('steps');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [glossaryInitialTerm, setGlossaryInitialTerm] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(
      sectionId === 'steps' ? 'vidhi-steps' :
      sectionId === 'meanings' ? 'line-by-line-meanings' :
      sectionId === 'doshas' ? 'doshas-section' :
      sectionId === 'practice' ? 'practice-section' :
      sectionId === 'quiz' ? 'quiz-section' :
      sectionId === 'contact' ? 'contact-section' : 'vidhi-steps'
    );
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenGlossary = (termId?: string) => {
    setGlossaryInitialTerm(termId || null);
    setIsGlossaryOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      
      {/* Top Bar adhering to constitution */}
      <Header 
        onSelectTab={scrollToSection} 
        activeTab={activeTab} 
        onOpenGlossary={handleOpenGlossary}
      />

      {/* Main Content Area */}
      <main className="flex-1 print:hidden">
        
        {/* Hero Section */}
        <HeroSection
          onStartVidhi={() => scrollToSection('steps')}
          onViewMeanings={() => scrollToSection('meanings')}
          onViewDoshas={() => scrollToSection('doshas')}
          onOpenGlossary={handleOpenGlossary}
        />

        {/* 1. Step by step interactive vidhi with SVG visuals & audio */}
        <InteractiveVidhiSteps onOpenGlossary={handleOpenGlossary} />

        {/* 2. Deep Line by Line and Word by Word Meanings & Practice repetition */}
        <LineByLineMeanings onOpenGlossary={handleOpenGlossary} />

        {/* 3. 32 Doshas of Guru Vandan with Avoidance Remedies */}
        <ThirtyTwoDoshas />

        {/* 4. Practice Mode & Daily Checklist */}
        <PracticeMode />

        {/* 5. Jain Quiz Knowledge Check */}
        <JainQuiz />

        {/* 6. Author and Contact Section (Sanjeev Sipani, Mansarovar Jaipur) */}
        <AuthorContact />

      </main>

      {/* Popup Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        initialTermId={glossaryInitialTerm}
      />

      {/* Dedicated Printable Layout (visible only when printing) */}
      <PrintableVidhi />

      {/* Reverent Footer */}
      <Footer />

    </div>
  );
}
