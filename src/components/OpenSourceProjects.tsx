import React from 'react';
import { FolderGit2, ExternalLink } from 'lucide-react';
import { OpenSourceItem, WindowId } from '../types/portfolio';
import { WindowFrame } from './WindowFrame';

interface OpenSourceProjectsProps {
  items: OpenSourceItem[];
  searchQuery: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  zIndex: number;
  onFocus: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onClose: (id: WindowId) => void;
}

export const OpenSourceProjects: React.FC<OpenSourceProjectsProps> = ({
  items,
  searchQuery,
  isMinimized,
  isMaximized,
  isFocused,
  zIndex,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
}) => {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filtered = normalizedQuery
    ? items.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.description.toLowerCase().includes(normalizedQuery) ||
          p.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
      )
    : items;

  return (
    <WindowFrame
      id="opensource"
      title="OPEN_SOURCE.EXE"
      icon={<FolderGit2 size={13} />}
      isMinimized={isMinimized}
      isMaximized={isMaximized}
      isFocused={isFocused}
      zIndex={zIndex}
      onFocus={onFocus}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={onClose}
      className="opensource-window"
      statusBar={
        <div className="retro-status-row">
          <span>{filtered.length} repos mounted</span>
          <span>GIT // MASTER</span>
        </div>
      }
    >
      {filtered.length === 0 ? (
        <div className="retro-empty-state">
          <p>No open-source repositories match "{searchQuery}".</p>
        </div>
      ) : (
        <ul className="os-list" aria-label="Open source repositories">
          {filtered.map((repo) => (
            <li key={repo.id} className="os-card">
              <div className="os-card__header">
                <span className="os-card__folder" aria-hidden="true">
                  📁
                </span>
                <a
                  href={repo.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="os-card__title-link"
                >
                  <span>{repo.name}</span>
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
              </div>
              {repo.description && (
                <p className="os-card__desc">{repo.description}</p>
              )}
              {repo.tags.length > 0 && (
                <div className="os-card__tags">
                  {repo.tags.map((tag) => (
                    <span key={tag} className="retro-mini-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </WindowFrame>
  );
};
