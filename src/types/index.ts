export type BlogCategory =
  | 'Running & Endurance'
  | 'Engineering & Makers'
  | 'Leadership & Strategy'
  | 'Family & Philosophy';

export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  category: BlogCategory;
  tags: string[];
  coverImage?: string;
  coverCaption?: string;
  mediumUrl: string;
  relatedProjectTitle?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Project {
  title: string;
  description: string;
  url?: string;
  links?: ProjectLink[];
  status: string;
  tags: string[];
}
