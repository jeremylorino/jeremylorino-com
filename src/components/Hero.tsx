import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl md:leading-[1.15]">
            Hi, I&apos;m Jeremy Lorino—a software engineer, problem-solver, and
            adventurer at heart.
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            I&apos;m a software engineer with a passion for leadership, process
            improvement, and problem-solving. I balance family life, career
            growth, and physical challenges like running and marathons. I value
            fairness, transparency, and actionable insights, and I love exploring
            topics like industrial automation, decentralized agriculture, and
            mentoring others.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Read my articles
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-800 transition-colors hover:bg-gray-300"
            >
              Explore my projects
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-[320px] overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm sm:h-[400px]">
            <Image
              src="/headshot.jpg"
              alt="Jeremy Lorino headshot"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="relative h-[320px] overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm sm:h-[400px]">
            <Image
              src="/running.jpg"
              alt="Jeremy Lorino running"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
