import fs from 'node:fs';
import path from 'node:path';
import { BlogCategory, BlogPost } from '@/types';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const CATEGORY_ORDER: BlogCategory[] = [
  'Running & Endurance',
  'Engineering & Makers',
  'Leadership & Strategy',
  'Family & Philosophy',
];

function parseScalar(raw: string): string {
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    try {
      if (trimmed.startsWith('"')) {
        return JSON.parse(trimmed) as string;
      }
      return trimmed.slice(1, -1);
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  return trimmed;
}

function parseFrontmatter(fileContents: string): {
  data: Record<string, string | string[]>;
  content: string;
} {
  const normalized = fileContents.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { data: {}, content: normalized };
  }

  const endIdx = normalized.indexOf('\n---\n', 4);
  if (endIdx === -1) {
    return { data: {}, content: normalized };
  }

  const rawFrontmatter = normalized.slice(4, endIdx);
  const content = normalized.slice(endIdx + 5).trim();
  const data: Record<string, string | string[]> = {};

  let currentArrayKey: string | null = null;

  for (const line of rawFrontmatter.split('\n')) {
    if (!line.trim()) continue;

    if (currentArrayKey && /^\s+-\s+/.test(line)) {
      const itemVal = parseScalar(line.replace(/^\s+-\s+/, ''));
      const existing = data[currentArrayKey];
      if (Array.isArray(existing)) {
        existing.push(itemVal);
      }
      continue;
    }

    currentArrayKey = null;
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    const rest = line.slice(colonIdx + 1).trim();

    if (rest === '') {
      data[key] = [];
      currentArrayKey = key;
    } else {
      data[key] = parseScalar(rest);
    }
  }

  return { data, content };
}

function readPostFile(filename: string): BlogPost {
  const slug = filename.replace(/\.md$/, '');
  const fullPath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = parseFrontmatter(raw);

  const tagsRaw = data.tags;
  const tags = Array.isArray(tagsRaw) ? tagsRaw : [];

  return {
    slug,
    title: typeof data.title === 'string' ? data.title : slug,
    subtitle: typeof data.subtitle === 'string' ? data.subtitle : undefined,
    summary: typeof data.summary === 'string' ? data.summary : '',
    content,
    publishedAt: typeof data.publishedAt === 'string' ? data.publishedAt : '',
    updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : undefined,
    readingTime: typeof data.readingTime === 'string' ? data.readingTime : '3 min read',
    category: (typeof data.category === 'string'
      ? data.category
      : 'Family & Philosophy') as BlogCategory,
    tags,
    coverImage: typeof data.coverImage === 'string' ? data.coverImage : undefined,
    coverCaption: typeof data.coverCaption === 'string' ? data.coverCaption : undefined,
    mediumUrl: typeof data.mediumUrl === 'string' ? data.mediumUrl : '',
    relatedProjectTitle:
      typeof data.relatedProjectTitle === 'string' ? data.relatedProjectTitle : undefined,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.md'));
  const posts = files.map(readPostFile);

  return posts.sort((a, b) => {
    if (a.publishedAt === b.publishedAt) {
      return a.title.localeCompare(b.title);
    }
    return a.publishedAt > b.publishedAt ? -1 : 1;
  });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filename = `${slug}.md`;
  const fullPath = path.join(BLOG_DIR, filename);
  if (!fs.existsSync(fullPath)) {
    return undefined;
  }
  return readPostFile(filename);
}

export function getAdjacentPosts(slug: string): {
  previous?: BlogPost;
  next?: BlogPost;
} {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    next: idx > 0 ? posts[idx - 1] : undefined,
    previous: idx < posts.length - 1 ? posts[idx + 1] : undefined,
  };
}

export function getCategories(): BlogCategory[] {
  return CATEGORY_ORDER;
}

export { formatPostDate } from './formatDate';
