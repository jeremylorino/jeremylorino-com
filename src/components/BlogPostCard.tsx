import Link from 'next/link';
import { formatPostDate, getCategoryBadgeClasses } from '@/lib/formatDate';
import { BlogPost } from '@/types';

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const href = `/blog/${post.slug}`;

  if (featured) {
    return (
      <article className="group overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm transition-all hover:border-blue-200 hover:shadow-md">
        <div className={`grid ${post.coverImage ? 'lg:grid-cols-5' : ''}`}>
          {post.coverImage && (
            <Link
              href={href}
              className="relative block aspect-[16/10] overflow-hidden bg-gray-100 lg:col-span-2 lg:aspect-auto lg:min-h-[280px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.coverCaption || post.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>
          )}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-3">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 text-sm text-gray-500">
                <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                  Latest
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryBadgeClasses(post.category)}`}
                >
                  {post.category}
                </span>
                <span>{formatPostDate(post.publishedAt)}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                <Link href={href} className="transition-colors hover:text-blue-600">
                  {post.title}
                </Link>
              </h2>

              {post.subtitle && (
                <p className="mt-2 text-base font-medium text-gray-700">
                  {post.subtitle}
                </p>
              )}

              <p className="mt-3 leading-relaxed text-gray-600">{post.summary}</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={href}
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
              >
                Read article <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-sm transition-all hover:border-blue-200 hover:shadow-md">
      {post.coverImage && (
        <Link
          href={href}
          className="relative block aspect-[16/9] overflow-hidden bg-gray-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.coverCaption || post.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${getCategoryBadgeClasses(post.category)}`}
            >
              {post.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>

          <h2 className="mt-3 text-xl font-bold tracking-tight text-gray-900">
            <Link href={href} className="transition-colors hover:text-blue-600">
              {post.title}
            </Link>
          </h2>

          <p className="mt-2.5 text-sm leading-relaxed text-gray-600">
            {post.summary}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-4 text-sm">
          <time dateTime={post.publishedAt} className="text-gray-500">
            {formatPostDate(post.publishedAt)}
          </time>
          <Link
            href={href}
            className="font-semibold text-blue-600 transition-colors hover:text-blue-800"
          >
            Read article →
          </Link>
        </div>
      </div>
    </article>
  );
}
