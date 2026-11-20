import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProjectSection from '@/components/ProjectSection';
import { Project } from '@/types';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Endurance running milestones, CNC craftsmanship, and software engineering projects by Jeremy Lorino.',
};

const healthProjects: Project[] = [
  {
    title: 'Chevron Houston Marathon (2026)',
    description:
      'Crossed the finish line of my first full 26.2-mile marathon in 5:11:15 in January 2026 after building up through four half-marathons and 20-mile training runs.',
    links: [
      {
        label: 'Read the race recap →',
        href: '/blog/my-first-marathon-a-tactical-error-and-a-family-win',
      },
    ],
    status: 'Completed',
    tags: ['Running', 'Marathon', 'Endurance'],
  },
  {
    title: 'Half Marathon Series (2025)',
    description:
      'Completed four half-marathons across 2025—working through Peroneal Tendonitis, physical therapy, and hilly courses like the H-Town Half while building endurance for 26.2.',
    links: [
      {
        label: 'H-Town Half recap →',
        href: '/blog/h-town-half-marathon-a-humbling-hilly-finish',
      },
      {
        label: 'Training update →',
        href: '/blog/the-night-before-my-second-half-marathon-a-progress-update',
      },
    ],
    status: 'Completed',
    tags: ['Running', 'Half Marathon', 'Training'],
  },
  {
    title: 'First Half Marathon (2025)',
    description:
      'Finished my first 13.1-mile race on February 8, 2025 in 2:28:13—turning early-morning training miles into a family and mental-health milestone.',
    links: [
      {
        label: 'Race lessons →',
        href: '/blog/13-1-miles-down-lessons-from-my-first-half-marathon',
      },
      {
        label: 'Training story →',
        href: '/blog/from-miles-to-milestones-training-for-my-kids-my-mind-and-a-half-marathon',
      },
    ],
    status: 'Completed',
    tags: ['Running', 'Half Marathon', 'PR'],
  },
];

const technicalProjects: Project[] = [
  {
    title: 'Personal Website & Native Blog',
    description:
      'A Next.js static site hosted on Firebase Hosting with full local ownership of my essays, code snippets, and photography.',
    links: [
      {
        label: 'Browse articles →',
        href: '/blog',
      },
      {
        label: 'View on GitHub ↗',
        href: 'https://github.com/jeremylorino/jeremylorino-com',
        external: true,
      },
    ],
    status: 'Active',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'CNC Aluminum Chessmen',
    description:
      'Designed and machined solid aluminum chess pieces and a custom acrylic-topped board on a Haas CNC machine for a Houston community nonprofit.',
    links: [
      {
        label: 'Read the build story →',
        href: '/blog/creating-aluminum-chessmen',
      },
    ],
    status: 'Completed',
    tags: ['CNC', 'Machining', 'Chess', 'Community'],
  },
  {
    title: 'Cloud Functions & BigQuery Data Pipelines',
    description:
      'Open-source GCP architectures covering unit-tested Firebase Cloud Functions CI/CD pipelines and streaming Twitter data into BigQuery via Cloud Dataprep.',
    links: [
      {
        label: 'Cloud Functions CI/CD →',
        href: '/blog/cloud-functions-create-test-deploy',
      },
      {
        label: 'Twitter to BigQuery →',
        href: '/blog/stream-twitter-data-into-bigquery-with-cloud-dataprep',
      },
    ],
    status: 'Completed',
    tags: ['Google Cloud', 'Firebase', 'BigQuery', 'Node.js'],
  },
];

export default function Projects() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            My Projects
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Software engineering builds, CNC craftsmanship, and endurance running
            milestones.
          </p>
        </div>

        <ProjectSection
          title="Health & Fitness Projects"
          description="Tracking my journey in running and personal health achievements."
          projects={healthProjects}
        />

        <ProjectSection
          title="Technical & Maker Projects"
          description="Software engineering, cloud data pipelines, and CNC builds."
          projects={technicalProjects}
        />
      </main>
      <Footer />
    </>
  );
}
