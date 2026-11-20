import Link from 'next/link';
import { Project, ProjectLink } from '@/types';

interface ProjectSectionProps {
  title: string;
  description: string;
  projects: Project[];
}

function resolveLinks(project: Project): ProjectLink[] {
  if (project.links && project.links.length > 0) {
    return project.links;
  }
  if (project.url) {
    return [
      {
        label: 'Learn more →',
        href: project.url,
        external: project.url.startsWith('http'),
      },
    ];
  }
  return [];
}

export default function ProjectSection({
  title,
  description,
  projects,
}: ProjectSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
      <p className="mb-8 text-lg text-gray-600">{description}</p>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => {
          const projectLinks = resolveLinks(project);
          const isCompleted = project.status.toLowerCase() === 'completed';

          return (
            <div
              key={project.title}
              className="flex flex-col justify-between rounded-xl border border-gray-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {project.title}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20'
                        : 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="mb-5 leading-relaxed text-gray-600">
                  {project.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {projectLinks.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-100 pt-4 text-sm font-semibold">
                    {projectLinks.map((item) =>
                      item.external ? (
                        <a
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 transition-colors hover:text-blue-800"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-blue-600 transition-colors hover:text-blue-800"
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
