import Link from 'next/link';
import BlogPostCard from '@/components/BlogPostCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { getAllPosts } from '@/lib/blog';

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />

        <section className="border-t border-gray-200/80 bg-white px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Recent Writing
                </h2>
                <p className="mt-2 text-gray-600">
                  Essays on engineering, endurance running, and family life.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 font-semibold text-blue-600 transition-colors hover:text-blue-800"
              >
                View all {allPosts.length} articles <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
