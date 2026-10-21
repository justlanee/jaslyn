import React from 'react';
import { Monitor, Briefcase, GraduationCap, Award, Cpu, ArrowUpRight } from 'lucide-react';
import { PortfolioData, SectionId, WindowId } from '../types/portfolio';
import { WindowFrame } from './WindowFrame';
import { ImageViewer } from './ImageViewer';

interface HomeWindowProps {
  data: PortfolioData;
  searchQuery: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  zIndex: number;
  onFocus: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onNavigateSection: (section: SectionId) => void;
}

function renderHighlightedText(text: string, highlights: string[]) {
  if (!highlights || highlights.length === 0) return text;
  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    const isMatch = highlights.some((h) => h.toLowerCase() === part.toLowerCase());
    return isMatch ? (
      <strong key={idx} className="bio-highlight">
        {part}
      </strong>
    ) : (
      <React.Fragment key={idx}>{part}</React.Fragment>
    );
  });
}

export const HomeWindow: React.FC<HomeWindowProps> = ({
  data,
  searchQuery,
  isMinimized,
  isMaximized,
  isFocused,
  zIndex,
  onFocus,
  onMinimize,
  onMaximize,
  onNavigateSection,
}) => {
  const { profile, experience, education, techStack, achievements } = data;
  const q = searchQuery.trim().toLowerCase();

  const filteredFocus = q
    ? profile.focusAreas.filter((f) => f.toLowerCase().includes(q))
    : profile.focusAreas;

  return (
    <WindowFrame
      id="home"
      title="HOME.EXE"
      icon={<Monitor size={13} />}
      isMinimized={isMinimized}
      isMaximized={isMaximized}
      isFocused={isFocused}
      zIndex={zIndex}
      canClose={false}
      onFocus={onFocus}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      className="main-stage-window home-window"
      bodyClassName="home-window__body"
      statusBar={
        <div className="retro-status-row">
          <span>USER: {profile.name.toUpperCase()}</span>
          <span>LOC: {profile.location}</span>
          <span className="retro-status-online">
            <span className="status-led status-led--online" aria-hidden="true" /> READY
          </span>
        </div>
      }
    >
      <div className="home-grid">
        {/* LEFT COLUMN: Developer Identity + Framed Image Viewer */}
        <div className="home-grid__left">
          <div className="identity-header">
            <h1 className="identity-header__name">{profile.name}</h1>
            <p className="identity-header__tagline">{profile.tagline}</p>
          </div>

          <ImageViewer
            imageUrl={profile.avatarUrl}
            fileName={profile.avatarFileName}
            photos={profile.photos}
            altText={`Portrait of ${profile.name}`}
            statusText={profile.statusText}
          />

          <div className="identity-actions">
            <button
              type="button"
              className="retro-btn retro-btn--primary"
              onClick={() => onNavigateSection('projects')}
            >
              <span>OPEN PROJECTS.EXE</span>
              <ArrowUpRight size={13} />
            </button>
            <button
              type="button"
              className="retro-btn"
              onClick={() => onNavigateSection('resume')}
            >
              <span>RESUME.EXE</span>
            </button>
            <button
              type="button"
              className="retro-btn"
              onClick={() => onNavigateSection('contact')}
            >
              <span>CONTACT</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Biography + Experience + Education + Skills + Achievements */}
        <div className="home-grid__right">
          {/* BIOGRAPHY SUB-PANEL */}
          <article className="retro-subpanel bio-panel">
            <div className="retro-subpanel__header">
              <span className="retro-subpanel__title">{profile.bioTitle}</span>
              <span className="retro-subpanel__code">BIO_README.TXT</span>
            </div>
            <div className="retro-subpanel__content">
              {profile.bioParagraphs.map((para, index) => (
                <p key={index} className="bio-panel__paragraph">
                  {renderHighlightedText(para.text, para.highlights)}
                </p>
              ))}
              {profile.goals && (
                <p className="bio-panel__goals">
                  <strong className="bio-highlight">Objective:</strong> {profile.goals}
                </p>
              )}

              <div className="focus-section">
                <span className="focus-section__label">Focus:</span>
                <div className="focus-section__tags">
                  {(filteredFocus.length > 0 ? filteredFocus : profile.focusAreas).map(
                    (area) => (
                      <span key={area} className="cyan-focus-tag">
                        {area}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </article>

          {/* EXPERIENCE SUB-PANEL */}
          <article className="retro-subpanel">
            <div className="retro-subpanel__header">
              <span className="retro-subpanel__title">
                <Briefcase size={13} aria-hidden="true" /> Experience
              </span>
              <span className="retro-subpanel__code">EXP_LOG.DAT</span>
            </div>
            <div className="retro-subpanel__content">
              <div className="timeline-list">
                {experience.map((exp) => (
                  <div key={exp.id} className="timeline-item">
                    <div className="timeline-item__top">
                      <h3 className="timeline-item__role">{exp.role}</h3>
                      <span className="timeline-item__period">{exp.period}</span>
                    </div>
                    <div className="timeline-item__meta">
                      <span>{exp.organization}</span>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>
                    <ul className="timeline-item__bullets">
                      {exp.highlights.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* EDUCATION SUB-PANEL */}
          <article className="retro-subpanel">
            <div className="retro-subpanel__header">
              <span className="retro-subpanel__title">
                <GraduationCap size={13} aria-hidden="true" /> Education
              </span>
              <span className="retro-subpanel__code">EDU_SYS.INI</span>
            </div>
            <div className="retro-subpanel__content">
              <div className="timeline-list">
                {education.map((edu) => (
                  <div key={edu.id} className="timeline-item">
                    <div className="timeline-item__top">
                      <h3 className="timeline-item__role">{edu.degree}</h3>
                      <span className="timeline-item__period">{edu.period}</span>
                    </div>
                    <div className="timeline-item__meta">
                      <span>{edu.institution}</span>
                      <span>•</span>
                      <span>{edu.location}</span>
                    </div>
                    <p className="timeline-item__desc">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* TECHNICAL SKILLS SUMMARY SUB-PANEL */}
          <article className="retro-subpanel">
            <div className="retro-subpanel__header">
              <span className="retro-subpanel__title">
                <Cpu size={13} aria-hidden="true" /> Technical Skills Overview
              </span>
              <button
                type="button"
                className="retro-inline-link"
                onClick={() => onNavigateSection('techstack')}
              >
                Open TECHSTACK.EXE →
              </button>
            </div>
            <div className="retro-subpanel__content">
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
            </div>
          </article>

          {/* ACHIEVEMENTS & CERTIFICATIONS SUB-PANEL */}
          <article className="retro-subpanel">
            <div className="retro-subpanel__header">
              <span className="retro-subpanel__title">
                <Award size={13} aria-hidden="true" /> Engineering Highlights & Academic Background
              </span>
              <span className="retro-subpanel__code">BADGES.SYS</span>
            </div>
            <div className="retro-subpanel__content">
              <div className="achievements-list">
                {achievements.map((ach) => (
                  <div key={ach.id} className="achievement-row">
                    <div className="achievement-row__header">
                      <strong>{ach.title}</strong>
                      <span className="timeline-item__period">
                        {ach.issuer} // {ach.year}
                      </span>
                    </div>
                    <p className="achievement-row__detail">{ach.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </WindowFrame>
  );
};
