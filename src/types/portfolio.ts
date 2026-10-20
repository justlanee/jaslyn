export type SectionId = 'home' | 'projects' | 'techstack' | 'resume' | 'contact';

export type WindowId =
  | 'music'
  | 'quicklinks'
  | 'opensource'
  | 'home'
  | 'projects'
  | 'techstack'
  | 'resume'
  | 'contact';

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface QuickLinkItem {
  id: string;
  label: string;
  badge: string;
  badgeColor: string;
  url: string;
  isDownload?: boolean;
}

export interface OpenSourceItem {
  id: string;
  name: string;
  repoUrl: string;
  description: string;
  tags: string[];
  stars?: string;
  isPlaceholder?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  role?: string;
  category: string;
  description: string;
  technologies: string[];
  repoUrl?: string;
  demoUrl?: string;
  docUrl?: string;
  status: 'ONLINE' | 'IN_PROGRESS' | 'HARDWARE' | 'COMPLETED';
  featured?: boolean;
  isPlaceholder?: boolean;
}

export interface SkillCategory {
  id: string;
  category: string;
  code: string;
  skills: {
    name: string;
    level: string;
    tag: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  highlights: string[];
  isPlaceholder?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  details: string;
  isPlaceholder?: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  detail: string;
}

export interface TrackItem {
  title: string;
  artist: string;
  src: string;
  youtubeUrl?: string;
  youtubeId?: string;
  durationLabel: string;
  useSynthFallback?: boolean;
}

export interface AvatarPhoto {
  url: string;
  fileName: string;
  caption: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    handle: string;
    tagline: string;
    avatarUrl: string;
    avatarFileName: string;
    photos: AvatarPhoto[];
    statusText: string;
    location: string;
    bioTitle: string;
    bioParagraphs: {
      text: string;
      highlights: string[];
    }[];
    goals: string;
    focusAreas: string[];
  };
  audioTrack: TrackItem;
  quickLinks: QuickLinkItem[];
  openSourceProjects: OpenSourceItem[];
  projects: ProjectItem[];
  techStack: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  achievements: AchievementItem[];
  resume: {
    fileName: string;
    pdfUrl: string;
    lastUpdated: string;
    summary: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    availability: string;
    githubUrl: string;
    instagramUrl?: string;
    facebookUrl?: string;
    linkedinUrl: string;
  };
}
