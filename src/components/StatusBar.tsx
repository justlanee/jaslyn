import React, { useState, useEffect } from 'react';
import { WindowId, WindowState, SectionId } from '../types/portfolio';

interface StatusBarProps {
  windows: Record<WindowId, WindowState>;
  activeSection: SectionId;
  onRestoreWindow: (id: WindowId) => void;
  onSelectSection: (section: SectionId) => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  windows,
  activeSection,
  onRestoreWindow,
  onSelectSection,
}) => {
  const [clock, setClock] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateClock();
    const timer = window.setInterval(updateClock, 15000);
    return () => window.clearInterval(timer);
  }, []);

  const sidebarWindows: WindowId[] = ['music', 'quicklinks', 'opensource'];

  return (
    <footer className="desktop-taskbar" role="contentinfo" aria-label="Desktop status and window tray">
      <div className="desktop-taskbar__left">
        <button
          type="button"
          className="taskbar-start-btn"
          onClick={() => onSelectSection('home')}
        >
          <span className="status-led status-led--online" aria-hidden="true" />
          <span>RETRO_OS</span>
        </button>

        <div className="desktop-taskbar__tray" role="group" aria-label="System utilities">
          {sidebarWindows.map((winId) => {
            const win = windows[winId];
            const isHidden = !win.isOpen || win.isMinimized;
            return (
              <button
                key={winId}
                type="button"
                className={`taskbar-tab ${!isHidden ? 'taskbar-tab--open' : ''}`}
                onClick={() => onRestoreWindow(winId)}
                title={isHidden ? `Restore ${win.title}` : `Focus ${win.title}`}
              >
                <span>{win.title}</span>
                {isHidden && <span className="taskbar-tab__state">[+]</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="desktop-taskbar__right">
        <span className="taskbar-stat">ACTIVE: {activeSection.toUpperCase()}.EXE</span>
        <span className="taskbar-stat taskbar-stat--clock">{clock || '12:00 PM'}</span>
      </div>
    </footer>
  );
};
