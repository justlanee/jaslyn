import React, { useState, useMemo } from 'react';
import { portfolioData } from '../data/portfolioData';
import { SectionId, WindowId, WindowState } from '../types/portfolio';
import { UnderwaterBackground } from './UnderwaterBackground';
import { TopNavigation } from './TopNavigation';
import { MusicPlayer } from './MusicPlayer';
import { QuickLinks } from './QuickLinks';
import { OpenSourceProjects } from './OpenSourceProjects';
import { HomeWindow } from './HomeWindow';
import { ProjectsWindow } from './ProjectsWindow';
import { TechStackWindow } from './TechStackWindow';
import { ResumeWindow } from './ResumeWindow';
import { ContactWindow } from './ContactWindow';
import { StatusBar } from './StatusBar';

const INITIAL_WINDOWS: Record<WindowId, WindowState> = {
  music: {
    id: 'music',
    title: 'MY_MUSIC.EXE',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 12,
  },
  quicklinks: {
    id: 'quicklinks',
    title: 'QUICK_LINKS.EXE',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 13,
  },
  opensource: {
    id: 'opensource',
    title: 'OPEN_SOURCE.EXE',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 14,
  },
  home: {
    id: 'home',
    title: 'HOME.EXE',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
  },
  projects: {
    id: 'projects',
    title: 'PROJECTS.EXE',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 19,
  },
  techstack: {
    id: 'techstack',
    title: 'TECHSTACK.EXE',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 18,
  },
  resume: {
    id: 'resume',
    title: 'RESUME.EXE',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 17,
  },
  contact: {
    id: 'contact',
    title: 'CONTACT.EXE',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 16,
  },
};

export const Desktop: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [focusedWindow, setFocusedWindow] = useState<WindowId>('home');
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(INITIAL_WINDOWS);
  const [topZ, setTopZ] = useState<number>(25);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const bringToFront = (id: WindowId) => {
    setFocusedWindow(id);
    setTopZ((prev) => {
      const next = prev + 1;
      setWindows((curr) => ({
        ...curr,
        [id]: {
          ...curr[id],
          zIndex: next,
        },
      }));
      return next;
    });
  };

  const handleSelectSection = (section: SectionId) => {
    setActiveSection(section);
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setFocusedWindow(section);
    setWindows((curr) => ({
      ...curr,
      [section]: {
        ...curr[section],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      },
    }));
  };

  const handleMinimize = (id: WindowId) => {
    setWindows((curr) => ({
      ...curr,
      [id]: {
        ...curr[id],
        isMinimized: !curr[id].isMinimized,
        isMaximized: false,
      },
    }));
  };

  const handleMaximize = (id: WindowId) => {
    bringToFront(id);
    setWindows((curr) => ({
      ...curr,
      [id]: {
        ...curr[id],
        isMaximized: !curr[id].isMaximized,
        isMinimized: false,
      },
    }));
  };

  const handleClose = (id: WindowId) => {
    if (id === 'home') return;
    setWindows((curr) => ({
      ...curr,
      [id]: {
        ...curr[id],
        isOpen: false,
        isMaximized: false,
      },
    }));

    // If closing the active primary section window, return gracefully to HOME.EXE
    if (id === activeSection) {
      setActiveSection('home');
      setFocusedWindow('home');
    }
  };

  const handleRestoreUtilityWindow = (id: WindowId) => {
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setFocusedWindow(id);
    setWindows((curr) => ({
      ...curr,
      [id]: {
        ...curr[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      },
    }));
  };

  const handleRestoreAll = () => {
    setWindows((curr) => ({
      ...curr,
      music: { ...curr.music, isOpen: true, isMinimized: false, isMaximized: false },
      quicklinks: { ...curr.quicklinks, isOpen: true, isMinimized: false, isMaximized: false },
      opensource: { ...curr.opensource, isOpen: true, isMinimized: false, isMaximized: false },
      [activeSection]: {
        ...curr[activeSection],
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
      },
    }));
  };

  // Compute how many utility panels are minimized or closed
  const closedOrMinimizedCount = useMemo(() => {
    const utilIds: WindowId[] = ['music', 'quicklinks', 'opensource'];
    return utilIds.filter((id) => !windows[id].isOpen || windows[id].isMinimized).length;
  }, [windows]);

  // Compute global search hit count across projects, open-source repos, and skills
  const searchMatchCount = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return 0;

    const projHits = portfolioData.projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    ).length;

    const osHits = portfolioData.openSourceProjects.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        o.tags.some((t) => t.toLowerCase().includes(q))
    ).length;

    const skillHits = portfolioData.techStack.reduce(
      (acc, cat) =>
        acc +
        cat.skills.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.tag.toLowerCase().includes(q)
        ).length,
      0
    );

    return projHits + osHits + skillHits;
  }, [searchQuery]);

  const currentStageWindow = windows[activeSection];

  return (
    <div className="retro-desktop">
      <UnderwaterBackground />

      <div className="retro-desktop__shell">
        {/* A. Top Navigation Bar */}
        <TopNavigation
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchMatchCount={searchMatchCount}
          closedWindowCount={closedOrMinimizedCount}
          onRestoreAllWindows={handleRestoreAll}
        />

        {/* B. Music Player Window beneath Top Navigation */}
        {windows.music.isOpen && (
          <div className="retro-desktop__music-row">
            <MusicPlayer
              track={portfolioData.audioTrack}
              isMinimized={windows.music.isMinimized}
              isMaximized={windows.music.isMaximized}
              isFocused={focusedWindow === 'music'}
              zIndex={windows.music.zIndex}
              onFocus={bringToFront}
              onMinimize={handleMinimize}
              onMaximize={handleMaximize}
              onClose={handleClose}
            />
          </div>
        )}

        {/* Search Filter Banner when active */}
        {searchQuery.trim().length > 0 && (
          <div className="search-filter-banner" role="status" aria-live="polite">
            <span>
              SEARCH_FILTER: <strong>"{searchQuery}"</strong> — {searchMatchCount} matching items across Projects, Open Source & Techstack.
            </span>
            <div className="search-filter-banner__actions">
              <button
                type="button"
                className="retro-chip-btn"
                onClick={() => handleSelectSection('projects')}
              >
                View Projects
              </button>
              <button
                type="button"
                className="retro-chip-btn"
                onClick={() => handleSelectSection('techstack')}
              >
                View Techstack
              </button>
              <button
                type="button"
                className="retro-chip-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Main Workspace: Left Sidebar + Center/Right Stage */}
        <main className="retro-desktop__workspace">
          {/* C & D. Left Sidebar Windows */}
          <aside className="retro-desktop__sidebar" aria-label="Quick links and open source sidebar">
            {windows.quicklinks.isOpen && (
              <QuickLinks
                links={portfolioData.quickLinks}
                isMinimized={windows.quicklinks.isMinimized}
                isMaximized={windows.quicklinks.isMaximized}
                isFocused={focusedWindow === 'quicklinks'}
                zIndex={windows.quicklinks.zIndex}
                onFocus={bringToFront}
                onMinimize={handleMinimize}
                onMaximize={handleMaximize}
                onClose={handleClose}
                onOpenResumeSection={handleSelectSection}
              />
            )}

            {windows.opensource.isOpen && (
              <OpenSourceProjects
                items={portfolioData.openSourceProjects}
                searchQuery={searchQuery}
                isMinimized={windows.opensource.isMinimized}
                isMaximized={windows.opensource.isMaximized}
                isFocused={focusedWindow === 'opensource'}
                zIndex={windows.opensource.zIndex}
                onFocus={bringToFront}
                onMinimize={handleMinimize}
                onMaximize={handleMaximize}
                onClose={handleClose}
              />
            )}
          </aside>

          {/* E & F. Primary Stage Window (HOME.EXE, PROJECTS.EXE, TECHSTACK.EXE, RESUME.EXE, CONTACT.EXE) */}
          <div className="retro-desktop__stage">
            {activeSection === 'home' && (
              <HomeWindow
                data={portfolioData}
                searchQuery={searchQuery}
                isMinimized={currentStageWindow.isMinimized}
                isMaximized={currentStageWindow.isMaximized}
                isFocused={focusedWindow === 'home'}
                zIndex={currentStageWindow.zIndex}
                onFocus={bringToFront}
                onMinimize={handleMinimize}
                onMaximize={handleMaximize}
                onNavigateSection={handleSelectSection}
              />
            )}

            {activeSection === 'projects' && (
              <ProjectsWindow
                projects={portfolioData.projects}
                searchQuery={searchQuery}
                isMinimized={currentStageWindow.isMinimized}
                isMaximized={currentStageWindow.isMaximized}
                isFocused={focusedWindow === 'projects'}
                zIndex={currentStageWindow.zIndex}
                onFocus={bringToFront}
                onMinimize={handleMinimize}
                onMaximize={handleMaximize}
                onClose={handleClose}
                onNavigateSection={handleSelectSection}
              />
            )}

            {activeSection === 'techstack' && (
              <TechStackWindow
                categories={portfolioData.techStack}
                searchQuery={searchQuery}
                isMinimized={currentStageWindow.isMinimized}
                isMaximized={currentStageWindow.isMaximized}
                isFocused={focusedWindow === 'techstack'}
                zIndex={currentStageWindow.zIndex}
                onFocus={bringToFront}
                onMinimize={handleMinimize}
                onMaximize={handleMaximize}
                onClose={handleClose}
                onNavigateSection={handleSelectSection}
              />
            )}

            {activeSection === 'resume' && (
              <ResumeWindow
                data={portfolioData}
                isMinimized={currentStageWindow.isMinimized}
                isMaximized={currentStageWindow.isMaximized}
                isFocused={focusedWindow === 'resume'}
                zIndex={currentStageWindow.zIndex}
                onFocus={bringToFront}
                onMinimize={handleMinimize}
                onMaximize={handleMaximize}
                onClose={handleClose}
                onNavigateSection={handleSelectSection}
              />
            )}

            {activeSection === 'contact' && (
              <ContactWindow
                contact={portfolioData.contact}
                isMinimized={currentStageWindow.isMinimized}
                isMaximized={currentStageWindow.isMaximized}
                isFocused={focusedWindow === 'contact'}
                zIndex={currentStageWindow.zIndex}
                onFocus={bringToFront}
                onMinimize={handleMinimize}
                onMaximize={handleMaximize}
                onClose={handleClose}
                onNavigateSection={handleSelectSection}
              />
            )}
          </div>
        </main>

        {/* Bottom System Taskbar / Status Tray */}
        <StatusBar
          windows={windows}
          activeSection={activeSection}
          onRestoreWindow={handleRestoreUtilityWindow}
          onSelectSection={handleSelectSection}
        />
      </div>
    </div>
  );
};
