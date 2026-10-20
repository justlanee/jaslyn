import React from 'react';
import { Heart, Home, FolderKanban, Cpu, FileText, Mail, RotateCcw } from 'lucide-react';
import { SectionId } from '../types/portfolio';
import { SearchBar } from './SearchBar';

interface TopNavigationProps {
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchMatchCount: number;
  closedWindowCount: number;
  onRestoreAllWindows: () => void;
}

const NAV_ITEMS: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Home size={14} /> },
  { id: 'projects', label: 'My Projects', icon: <FolderKanban size={14} /> },
  { id: 'techstack', label: 'My Techstack', icon: <Cpu size={14} /> },
  { id: 'resume', label: 'Resume', icon: <FileText size={14} /> },
  { id: 'contact', label: 'Contact', icon: <Mail size={14} /> },
];

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeSection,
  onSelectSection,
  searchQuery,
  onSearchChange,
  searchMatchCount,
  closedWindowCount,
  onRestoreAllWindows,
}) => {
  return (
    <header className="top-nav" role="banner">
      <div className="top-nav__left">
        <button
          type="button"
          className="top-nav__heart-btn"
          onClick={() => onSelectSection('home')}
          aria-label="Return to Home Desktop"
          title="RETRO_OS // Return Home"
        >
          <Heart size={15} className="top-nav__heart-icon" fill="currentColor" />
        </button>

        <SearchBar
          query={searchQuery}
          onQueryChange={onSearchChange}
          matchCount={searchMatchCount}
        />
      </div>

      <nav className="top-nav__menu" aria-label="Primary Portfolio Navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`retro-nav-btn ${isActive ? 'retro-nav-btn--active' : ''}`}
              onClick={() => onSelectSection(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="retro-nav-btn__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="retro-nav-btn__label">{item.label}</span>
            </button>
          );
        })}

        {closedWindowCount > 0 && (
          <button
            type="button"
            className="retro-nav-btn retro-nav-btn--restore"
            onClick={onRestoreAllWindows}
            title="Restore minimized or closed desktop panels"
          >
            <RotateCcw size={13} aria-hidden="true" />
            <span>Restore ({closedWindowCount})</span>
          </button>
        )}
      </nav>
    </header>
  );
};
