import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-gray-500 sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} Jeremy Lorino. Built with Next.js.</p>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>
          <Link href="/projects" className="hover:text-blue-600">
            Projects
          </Link>
          <a
            href="https://github.com/jeremylorino"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            GitHub
          </a>
          <a
            href="https://medium.com/@jeremylorino"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            Medium
          </a>
        </div>
      </div>
    </footer>
  );
}
