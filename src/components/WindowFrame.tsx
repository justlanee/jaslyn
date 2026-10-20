import React from 'react';
import { WindowId } from '../types/portfolio';

interface WindowFrameProps {
  id: WindowId;
  title: string;
  icon?: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  zIndex: number;
  canClose?: boolean;
  className?: string;
  bodyClassName?: string;
  statusBar?: React.ReactNode;
  onFocus: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onClose?: (id: WindowId) => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  id,
  title,
  icon,
  isMinimized,
  isMaximized,
  isFocused,
  zIndex,
  canClose = true,
  className = '',
  bodyClassName = '',
  statusBar,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  children,
}) => {
  const frameClasses = [
    'retro-window',
    isFocused ? 'retro-window--focused' : 'retro-window--unfocused',
    isMinimized ? 'retro-window--minimized' : '',
    isMaximized ? 'retro-window--maximized' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      id={`window-${id}`}
      className={frameClasses}
      style={{ zIndex }}
      aria-label={title}
      onMouseDown={() => onFocus(id)}
      onFocusCapture={() => onFocus(id)}
    >
      <header
        className="retro-window__titlebar"
        onDoubleClick={() => onMaximize(id)}
      >
        <div className="retro-window__title-group">
          {icon && <span className="retro-window__title-icon" aria-hidden="true">{icon}</span>}
          <h2 className="retro-window__title">{title}</h2>
        </div>

        <div className="retro-window__controls" role="group" aria-label={`${title} window controls`}>
          <button
            type="button"
            className="retro-win-btn retro-win-btn--min"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(id);
            }}
            aria-label={isMinimized ? `Restore ${title}` : `Minimize ${title}`}
            title={isMinimized ? 'Restore window' : 'Minimize window'}
          >
            <span aria-hidden="true">_</span>
          </button>

          <button
            type="button"
            className="retro-win-btn retro-win-btn--max"
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(id);
            }}
            aria-label={isMaximized ? `Restore ${title} size` : `Maximize ${title}`}
            title={isMaximized ? 'Restore size' : 'Maximize window'}
          >
            <span aria-hidden="true">{isMaximized ? '❐' : '□'}</span>
          </button>

          {canClose && onClose && (
            <button
              type="button"
              className="retro-win-btn retro-win-btn--close"
              onClick={(e) => {
                e.stopPropagation();
                onClose(id);
              }}
              aria-label={`Close ${title}`}
              title="Close window"
            >
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>
      </header>

      {!isMinimized && (
        <>
          <div className={`retro-window__body ${bodyClassName}`}>{children}</div>
          {statusBar && <footer className="retro-window__statusbar">{statusBar}</footer>}
        </>
      )}
    </section>
  );
};
