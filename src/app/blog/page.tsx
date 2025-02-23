import Header from '@/components/Header';
import BlogPostCard from '@/components/BlogPostCard';
import { getMediumPosts } from '@/lib/medium';

// Mark page as dynamic to ensure fresh data
export const revalidate = 3600; // Revalidate every hour

export default async function Blog() {
  const posts = await getMediumPosts();

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No posts found. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 