import React from 'react';
import { ExternalLink, Link2 } from 'lucide-react';
import { QuickLinkItem, SectionId, WindowId } from '../types/portfolio';
import { WindowFrame } from './WindowFrame';

interface QuickLinksProps {
  links: QuickLinkItem[];
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  zIndex: number;
  onFocus: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onClose: (id: WindowId) => void;
  onOpenResumeSection: (section: SectionId) => void;
}

export const QuickLinks: React.FC<QuickLinksProps> = ({
  links,
  isMinimized,
  isMaximized,
  isFocused,
  zIndex,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  onOpenResumeSection,
}) => {
  return (
    <WindowFrame
      id="quicklinks"
      title="QUICK_LINKS.EXE"
      icon={<Link2 size={13} />}
      isMinimized={isMinimized}
      isMaximized={isMaximized}
      isFocused={isFocused}
      zIndex={zIndex}
      onFocus={onFocus}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={onClose}
      className="quicklinks-window"
      statusBar={
        <div className="retro-status-row">
          <span>{links.length} shortcuts</span>
          <span className="retro-status-online">
            <span className="status-led status-led--online" aria-hidden="true" /> LINK_OK
          </span>
        </div>
      }
    >
      <ul className="quicklinks-list" aria-label="External profile links">
        {links.map((item) => {
          const isResumeItem = item.id === 'resume-pdf';
          return (
            <li key={item.id} className="quicklinks-list__item">
              {isResumeItem ? (
                <button
                  type="button"
                  className="quicklink-btn"
                  onClick={() => onOpenResumeSection('resume')}
                >
                  <span
                    className="quicklink-btn__badge"
                    style={{ backgroundColor: item.badgeColor }}
                    aria-hidden="true"
                  >
                    {item.badge}
                  </span>
                  <span className="quicklink-btn__label">{item.label}</span>
                  <ExternalLink size={12} className="quicklink-btn__ext" aria-hidden="true" />
                </button>
              ) : (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quicklink-btn"
                >
                  <span
                    className="quicklink-btn__badge"
                    style={{ backgroundColor: item.badgeColor }}
                    aria-hidden="true"
                  >
                    {item.badge}
                  </span>
                  <span className="quicklink-btn__label">{item.label}</span>
                  <ExternalLink size={12} className="quicklink-btn__ext" aria-hidden="true" />
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </WindowFrame>
  );
};
