import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-6 px-4 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Jeremy Lorino
        </Link>
        <div className="space-x-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <Link href="/projects" className="hover:text-blue-600">Projects</Link>
        </div>
      </nav>
    </header>
  );
} 