import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { AvatarPhoto } from '../types/portfolio';

interface ImageViewerProps {
  imageUrl: string;
  fileName: string;
  photos?: AvatarPhoto[];
  altText: string;
  statusText: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  imageUrl,
  fileName,
  photos,
  altText,
  statusText,
}) => {
  const gallery: AvatarPhoto[] =
    photos && photos.length > 0
      ? photos
      : [{ url: imageUrl, fileName, caption: altText }];

  const [photoIdx, setPhotoIdx] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(100);
  const [imgError, setImgError] = useState<boolean>(false);

  const activePhoto = gallery[photoIdx] || gallery[0];

  const handleZoomIn = () => setZoom((z) => Math.min(150, z + 25));
  const handleZoomOut = () => setZoom((z) => Math.max(75, z - 25));
  const handleReset = () => setZoom(100);

  const handlePrevPhoto = () => {
    setImgError(false);
    setPhotoIdx((i) => (i - 1 + gallery.length) % gallery.length);
  };

  const handleNextPhoto = () => {
    setImgError(false);
    setPhotoIdx((i) => (i + 1) % gallery.length);
  };

  return (
    <div className="image-viewer" aria-label={`Image viewer: ${activePhoto.fileName}`}>
      <div className="image-viewer__titlebar">
        <span className="image-viewer__title">
          IMAGE_VIEWER.EXE - [{activePhoto.fileName}]
        </span>
        <div className="image-viewer__toolbar">
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                className="retro-mini-icon-btn"
                onClick={handlePrevPhoto}
                aria-label="Previous photo"
                title="Previous photo"
              >
                <ChevronLeft size={11} />
              </button>
              <button
                type="button"
                className="retro-mini-icon-btn"
                onClick={handleNextPhoto}
                aria-label="Next photo"
                title="Next photo"
              >
                <ChevronRight size={11} />
              </button>
            </>
          )}
          <button
            type="button"
            className="retro-mini-icon-btn"
            onClick={handleZoomOut}
            aria-label="Zoom out profile photo"
            title="Zoom Out"
          >
            <ZoomOut size={11} />
          </button>
          <button
            type="button"
            className="retro-mini-icon-btn"
            onClick={handleReset}
            aria-label="Reset zoom level"
            title="Reset Zoom"
          >
            <RotateCcw size={11} />
          </button>
          <button
            type="button"
            className="retro-mini-icon-btn"
            onClick={handleZoomIn}
            aria-label="Zoom in profile photo"
            title="Zoom In"
          >
            <ZoomIn size={11} />
          </button>
        </div>
      </div>

      <div className="image-viewer__viewport">
        {!imgError ? (
          <img
            src={activePhoto.url}
            alt={activePhoto.caption || altText}
            className="image-viewer__img"
            style={{ transform: `scale(${zoom / 100})` }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="image-viewer__fallback" role="img" aria-label={altText}>
            <span className="image-viewer__fallback-code">[MISSING: {activePhoto.fileName}]</span>
            <p>Place your photo in public/assets/ and update avatarUrl in portfolioData.ts</p>
          </div>
        )}
      </div>

      <div className="image-viewer__statusbar">
        <span>
          FILE: {activePhoto.fileName} ({photoIdx + 1}/{gallery.length})
        </span>
        <span>ZOOM: {zoom}%</span>
        <span className="retro-status-online">
          <span className="status-led status-led--online" aria-hidden="true" />
          {statusText}
        </span>
      </div>
    </div>
  );
};
