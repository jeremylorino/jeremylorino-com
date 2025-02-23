import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  url?: string;
  status: string;
  tags: string[];
}

interface ProjectSectionProps {
  title: string;
  description: string;
  projects: Project[];
}

export default function ProjectSection({ title, description, projects }: ProjectSectionProps) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-lg text-gray-600 mb-8">{description}</p>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="px-2 py-1 bg-gray-100 text-sm rounded-full text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">{project.status}</span>
            </div>
            {project.url && (
              <Link 
                href={project.url}
                className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 