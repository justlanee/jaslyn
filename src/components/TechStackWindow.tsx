import React from 'react';
import { Cpu, ArrowLeft, Terminal } from 'lucide-react';
import { SkillCategory, SectionId, WindowId } from '../types/portfolio';
import { WindowFrame } from './WindowFrame';

interface TechStackWindowProps {
  categories: SkillCategory[];
  searchQuery: string;
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

export const TechStackWindow: React.FC<TechStackWindowProps> = ({
  categories,
  searchQuery,
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
  const q = searchQuery.trim().toLowerCase();

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      skills: q
        ? cat.skills.filter(
            (s) =>
              s.name.toLowerCase().includes(q) ||
              s.tag.toLowerCase().includes(q) ||
              cat.category.toLowerCase().includes(q)
          )
        : cat.skills,
    }))
    .filter((cat) => cat.skills.length > 0);

  return (
    <WindowFrame
      id="techstack"
      title="TECHSTACK.EXE"
      icon={<Cpu size={13} />}
      isMinimized={isMinimized}
      isMaximized={isMaximized}
      isFocused={isFocused}
      zIndex={zIndex}
      onFocus={onFocus}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={onClose}
      className="main-stage-window techstack-window"
      statusBar={
        <div className="retro-status-row">
          <span>MODULES LOADED: {filteredCategories.length}</span>
          <span>ARCH: X86_64 // RETRO_KERNEL</span>
        </div>
      }
    >
      <div className="section-toolbar">
        <div className="section-toolbar__title">
          <Terminal size={14} aria-hidden="true" />
          <span>SYSTEM_CAPABILITIES // LANGUAGES, FRAMEWORKS & INFRASTRUCTURE</span>
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

      {filteredCategories.length === 0 ? (
        <div className="retro-empty-state">
          <p>No technical skills match "{searchQuery}".</p>
        </div>
      ) : (
        <div className="techstack-grid">
          {filteredCategories.map((group) => (
            <section key={group.id} className="retro-subpanel tech-group">
              <header className="retro-subpanel__header">
                <h3 className="retro-subpanel__title">{group.category}</h3>
                <span className="retro-subpanel__code">{group.code}</span>
              </header>
              <div className="retro-subpanel__content">
                <div className="tech-skill-list">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="tech-skill-item">
                      <div className="tech-skill-item__main">
                        <span className="tech-skill-item__bullet" aria-hidden="true">
                          ▸
                        </span>
                        <span className="tech-skill-item__name">{skill.name}</span>
                      </div>
                      <div className="tech-skill-item__badges">
                        <span className="retro-mini-tag">{skill.tag}</span>
                        <span className="tech-skill-item__level">{skill.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </WindowFrame>
  );
};
