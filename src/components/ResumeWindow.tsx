import React, { useState } from 'react';
import { FileText, Download, ExternalLink, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PortfolioData, SectionId, WindowId } from '../types/portfolio';
import { WindowFrame } from './WindowFrame';

interface ResumeWindowProps {
  data: PortfolioData;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  zIndex: number;
  onFocus: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onClose: (id: WindowId) => void;
  onNavigateSection: (section: SectionId) => void;
}

export const ResumeWindow: React.FC<ResumeWindowProps> = ({
  data,
  isMinimized,
  isMaximized,
  isFocused,
  zIndex,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  onNavigateSection,
}) => {
  const [showEmbed, setShowEmbed] = useState<boolean>(false);
  const { resume, profile, experience, education, projects, techStack, contact } = data;

  return (
    <WindowFrame
      id="resume"
      title={`RESUME.EXE - [${resume.fileName}]`}
      icon={<FileText size={13} />}
      isMinimized={isMinimized}
      isMaximized={isMaximized}
      isFocused={isFocused}
      zIndex={zIndex}
      onFocus={onFocus}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={onClose}
      className="main-stage-window resume-window"
      statusBar={
        <div className="retro-status-row">
          <span>DOCUMENT: {resume.fileName}</span>
          <span>CANDIDATE: JASLYN KAYE TORRES</span>
        </div>
      }
    >
      <div className="section-toolbar">
        <div className="section-toolbar__filters">
          <a
            href={resume.pdfUrl}
            download={resume.fileName}
            className="retro-btn retro-btn--primary"
          >
            <Download size={13} />
            <span>Download {resume.fileName}</span>
          </a>

          <a
            href={resume.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="retro-btn"
          >
            <ExternalLink size={13} />
            <span>Open Original PDF</span>
          </a>

          <button
            type="button"
            className="retro-btn"
            onClick={() => setShowEmbed((prev) => !prev)}
          >
            <span>{showEmbed ? 'Show Formatted CV View' : 'View Embedded PDF Document'}</span>
          </button>
        </div>

        <button
          type="button"
          className="retro-btn"
          onClick={() => onNavigateSection('home')}
        >
          <ArrowLeft size={12} />
          <span>Back to HOME.EXE</span>
        </button>
      </div>

      <div className="resume-notice">
        <CheckCircle2 size={14} aria-hidden="true" />
        <span>{resume.summary}</span>
      </div>

      {showEmbed ? (
        <div className="resume-embed-container">
          <object
            data={resume.pdfUrl}
            type="application/pdf"
            className="resume-embed-object"
            aria-label="Embedded Resume PDF of Jaslyn Kaye Torres"
          >
            <div className="retro-empty-state">
              <p>
                Your browser cannot render inline PDF objects directly. Click{' '}
                <a href={resume.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#4df0ff' }}>
                  Open Original PDF
                </a>{' '}
                to view or download <code>{resume.fileName}</code>.
              </p>
            </div>
          </object>
        </div>
      ) : (
        <div className="resume-sheet">
          <header className="resume-sheet__header">
            <div>
              <h3 className="resume-sheet__name">{profile.name}</h3>
              <p className="resume-sheet__tagline">{profile.tagline}</p>
            </div>
            <div className="resume-sheet__meta">
              <span>📍 {contact.location}</span>
              <span>✉️ {contact.email}</span>
              <span>📱 {contact.phone}</span>
              <span>🔗 github.com/justlanee</span>
            </div>
          </header>

          <section className="resume-sheet__section">
            <h4 className="resume-sheet__section-title">SUMMARY</h4>
            <p className="timeline-item__desc">
              Motivated Computer Engineering student with a strong foundation in hardware design,
              embedded systems, and digital circuit simulation, combined with practical office
              administration and data management experience. Eager to learn, adapt, and apply
              emerging engineering concepts and programming skills to solve complex technical
              challenges in embedded systems, hardware development, or IT infrastructure.
            </p>
          </section>

          <section className="resume-sheet__section">
            <h4 className="resume-sheet__section-title">EXPERIENCE</h4>
            {experience.map((exp) => (
              <div key={exp.id} className="resume-sheet__item">
                <div className="resume-sheet__row">
                  <strong>{exp.role}</strong>
                  <span>{exp.period}</span>
                </div>
                <div className="resume-sheet__sub">
                  {exp.organization} • {exp.location}
                </div>
                <ul className="timeline-item__bullets">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="resume-sheet__section">
            <h4 className="resume-sheet__section-title">ENGINEERING & SOFTWARE PROJECTS</h4>
            {projects.map((proj) => (
              <div key={proj.id} className="resume-sheet__item">
                <div className="resume-sheet__row">
                  <strong>{proj.title}</strong>
                  <span>{proj.category}</span>
                </div>
                <p className="timeline-item__desc">{proj.description}</p>
              </div>
            ))}
          </section>

          <section className="resume-sheet__section">
            <h4 className="resume-sheet__section-title">EDUCATION</h4>
            {education.map((edu) => (
              <div key={edu.id} className="resume-sheet__item">
                <div className="resume-sheet__row">
                  <strong>{edu.degree}</strong>
                  <span>{edu.period}</span>
                </div>
                <div className="resume-sheet__sub">
                  {edu.institution} • {edu.location}
                </div>
                <p className="timeline-item__desc">{edu.details}</p>
              </div>
            ))}
          </section>

          <section className="resume-sheet__section">
            <h4 className="resume-sheet__section-title">TECHNICAL SKILLS</h4>
            <div className="skills-mini-grid">
              {techStack.map((cat) => (
                <div key={cat.id} className="skills-mini-group">
                  <span className="skills-mini-group__title">{cat.category}:</span>
                  <div className="skills-mini-group__chips">
                    {cat.skills.map((s) => (
                      <span key={s.name} className="retro-mini-tag">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </WindowFrame>
  );
};
