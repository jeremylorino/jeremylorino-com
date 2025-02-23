import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Hi, I&apos;m Jeremy Lorino—a software engineer, problem-solver, and adventurer at heart.
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            I&apos;m a software engineer with a passion for leadership, process improvement, and problem-solving. 
            I balance family life, career growth, and physical challenges like running and preparing for marathons. 
            I value fairness, transparency, and actionable insights, and I love exploring topics like industrial automation, 
            decentralized agriculture, and mentoring others.
          </p>
          <div className="space-x-4">
            <Link href="/blog" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Check out my latest articles
            </Link>
            <Link href="/projects" className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
              Learn about my projects
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image 
              src="/headshot.jpg" 
              alt="Jeremy Lorino headshot" 
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image 
              src="/running.jpg" 
              alt="Jeremy Lorino running" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 