import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getAdjacentPosts, getAllPosts, getPostBySlug } from '@/lib/blog';
import { formatPostDate, getCategoryBadgeClasses } from '@/lib/formatDate';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: 'Article Not Found' };
  }

  return {
    title: post.title,
    description: post.summary || post.subtitle,
    openGraph: {
      title: post.title,
      description: post.summary || post.subtitle,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `https://jeremylorino.com/blog/${post.slug}`,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = getAdjacentPosts(slug);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 md:py-14">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
          >
            <span aria-hidden="true">←</span> Back to all articles
          </Link>
        </div>

        <article>
          <header className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getCategoryBadgeClasses(post.category)}`}
              >
                {post.category}
              </span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <time dateTime={post.publishedAt}>
                  {formatPostDate(post.publishedAt)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl md:leading-[1.15]">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="mt-4 text-xl leading-relaxed text-gray-600">
                {post.subtitle}
              </p>
            )}

            <div className="mt-6 flex items-center gap-3 border-y border-gray-200 py-4">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-200">
                <Image
                  src="/headshot.jpg"
                  alt="Jeremy Lorino"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Jeremy Lorino</p>
                <p className="text-gray-500">
                  Software engineer, problem-solver, and adventurer at heart
                </p>
              </div>
            </div>
          </header>

          {post.coverImage && (
            <figure className="my-10">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.coverCaption || post.title}
                  className="h-auto w-full object-cover"
                />
              </div>
              {post.coverCaption && (
                <figcaption className="mt-3 text-center text-sm text-gray-500">
                  {post.coverCaption}
                </figcaption>
              )}
            </figure>
          )}

          <div className="mx-auto max-w-3xl">
            <MarkdownRenderer content={post.content} />

            <div className="mt-12 space-y-6 border-t border-gray-200 pt-8">
              {post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Topics:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {post.relatedProjectTitle && (
                <div className="flex flex-col justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50/60 p-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                      Related Project
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {post.relatedProjectTitle}
                    </p>
                  </div>
                  <Link
                    href="/projects"
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    View on Projects <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}

              {post.mediumUrl && (
                <p className="text-sm text-gray-500">
                  Originally published on{' '}
                  <a
                    href={post.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-700 underline decoration-gray-300 underline-offset-4 hover:text-blue-600 hover:decoration-blue-600"
                  >
                    Medium ↗
                  </a>
                </p>
              )}
            </div>

            {(previous || next) && (
              <nav
                aria-label="Article navigation"
                className="mt-10 grid gap-4 border-t border-gray-200 pt-8 sm:grid-cols-2"
              >
                {previous ? (
                  <Link
                    href={`/blog/${previous.slug}`}
                    className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-sm"
                  >
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      ← Older Article
                    </span>
                    <p className="mt-1.5 font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                      {previous.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}

                {next && (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group rounded-xl border border-gray-200 bg-white p-5 text-left transition-all hover:border-blue-200 hover:shadow-sm sm:text-right"
                  >
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Newer Article →
                    </span>
                    <p className="mt-1.5 font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                      {next.title}
                    </p>
                  </Link>
                )}
              </nav>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
