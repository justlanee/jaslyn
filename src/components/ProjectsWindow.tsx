import React, { useState } from 'react';
import { FolderKanban, ExternalLink, Code2, ArrowLeft, Cpu, FileText } from 'lucide-react';
import { ProjectItem, SectionId, WindowId } from '../types/portfolio';
import { WindowFrame } from './WindowFrame';

interface ProjectsWindowProps {
  projects: ProjectItem[];
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

export const ProjectsWindow: React.FC<ProjectsWindowProps> = ({
  projects,
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
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', ...Array.from(new Set(projects.map((p) => p.category)))];

  const q = searchQuery.trim().toLowerCase();
  const filteredProjects = projects.filter((proj) => {
    const matchesCategory =
      selectedCategory === 'ALL' || proj.category === selectedCategory;
    const matchesSearch =
      !q ||
      proj.title.toLowerCase().includes(q) ||
      proj.description.toLowerCase().includes(q) ||
      proj.category.toLowerCase().includes(q) ||
      (proj.role && proj.role.toLowerCase().includes(q)) ||
      proj.technologies.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <WindowFrame
      id="projects"
      title="PROJECTS.EXE"
      icon={<FolderKanban size={13} />}
      isMinimized={isMinimized}
      isMaximized={isMaximized}
      isFocused={isFocused}
      zIndex={zIndex}
      onFocus={onFocus}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={onClose}
      className="main-stage-window projects-window"
      statusBar={
        <div className="retro-status-row">
          <span>DISPLAYING {filteredProjects.length} OF {projects.length} PROJECTS</span>
          <span>FILTER: {selectedCategory}</span>
        </div>
      }
    >
      <div className="section-toolbar">
        <div className="section-toolbar__filters" role="tablist" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`retro-chip-btn ${
                selectedCategory === cat ? 'retro-chip-btn--active' : ''
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
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

      {filteredProjects.length === 0 ? (
        <div className="retro-empty-state">
          <p>No projects found matching your filter criteria.</p>
          <button
            type="button"
            className="retro-btn"
            onClick={() => setSelectedCategory('ALL')}
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project) => {
            const isInProgress = project.status === 'IN_PROGRESS';
            return (
              <article key={project.id} className="project-card">
                <header className="project-card__header">
                  <div>
                    <span className="project-card__category">
                      {project.category}
                      {project.role ? ` • Role: ${project.role}` : ''}
                    </span>
                    <h3 className="project-card__title">{project.title}</h3>
                  </div>
                  <span
                    className="project-card__status"
                    style={isInProgress ? { color: '#ffe066' } : undefined}
                  >
                    <span
                      className={`status-led ${
                        isInProgress ? 'status-led--warn' : 'status-led--online'
                      }`}
                      aria-hidden="true"
                    />
                    {project.status === 'IN_PROGRESS' ? 'IN PROGRESS' : project.status}
                  </span>
                </header>

                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__tech">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="cyan-focus-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <footer className="project-card__actions">
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="retro-btn retro-btn--primary"
                    >
                      <Code2 size={13} />
                      <span>GitHub Repository</span>
                      <ExternalLink size={11} />
                    </a>
                  ) : isInProgress ? (
                    <span className="retro-mini-tag" style={{ borderColor: '#ffe066', color: '#ffe066' }}>
                      Active Capstone Build (A.Y. 2026–2027)
                    </span>
                  ) : (
                    <span className="retro-mini-tag">
                      <Cpu size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      Hardware / Lab Build
                    </span>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="retro-btn"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </footer>
              </article>
            );
          })}
        </div>
      )}
    </WindowFrame>
  );
};
