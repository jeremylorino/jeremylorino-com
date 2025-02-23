import Parser from 'rss-parser';
import { BlogPost } from '@/types';
import { MEDIUM_USERNAME } from './constants';

// Extend the Parser type to handle Medium-specific fields
interface MediumFeedItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  guid: string;
  'content:encoded': string;
  categories?: string[];
}

const parser = new Parser<any, MediumFeedItem>();

export async function getMediumPosts(): Promise<BlogPost[]> {
  try {
    const feed = await parser.parseURL(`https://medium.com/feed/${MEDIUM_USERNAME}`);
    
    return feed.items.map((item: MediumFeedItem): BlogPost => {
      const content = item['content:encoded'] || item.content || '';
      const summary = content
        .replace(/<[^>]*>/g, '')
        .split('\n')
        .filter(line => line.trim())
        .slice(0, 1)
        .join('')
        .slice(0, 200)
        .trim() + '...';

      return {
        id: item.guid,
        title: item.title,
        summary,
        url: item.link,
        publishedAt: item.pubDate,
      };
    });
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
} 