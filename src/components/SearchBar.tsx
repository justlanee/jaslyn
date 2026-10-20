import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  matchCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  matchCount,
}) => {
  return (
    <div className="retro-search" role="search">
      <label htmlFor="desktop-global-search" className="sr-only">
        Search portfolio projects, skills, and sections
      </label>
      <Search className="retro-search__icon" size={14} aria-hidden="true" />
      <input
        id="desktop-global-search"
        type="search"
        className="retro-search__input"
        placeholder="Find: C++, IoT, Projects..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label="Find C++, IoT, Projects, or skills"
      />
      {query.trim().length > 0 && (
        <>
          <span className="retro-search__badge" aria-live="polite">
            {matchCount} {matchCount === 1 ? 'hit' : 'hits'}
          </span>
          <button
            type="button"
            className="retro-search__clear"
            onClick={() => onQueryChange('')}
            aria-label="Clear search query"
            title="Clear search"
          >
            <X size={12} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
};
