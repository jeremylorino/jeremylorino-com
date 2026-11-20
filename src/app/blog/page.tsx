import type { Metadata } from 'next';
import BlogList from '@/components/BlogList';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getAllPosts, getCategories } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Essays and field notes on software engineering, marathons, leadership, and family life.',
};

export default function Blog() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Articles &amp; Field Notes
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            {posts.length} essays on software engineering, endurance running,
            leadership, and raising a family.
          </p>
        </div>

        <BlogList posts={posts} categories={categories} />
      </main>
      <Footer />
    </>
  );
}
