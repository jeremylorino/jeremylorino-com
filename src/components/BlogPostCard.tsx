import { BlogPost } from '@/types';
import Link from 'next/link';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-2xl font-bold mb-3">
        <Link href={post.url} className="hover:text-blue-600">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 mb-4">{post.summary}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString()}
        </span>
        <Link 
          href={post.url}
          className="text-blue-600 hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
} 