import Header from '@/components/Header';
import ProjectSection from '@/components/ProjectSection';

const healthProjects = [
  {
    title: "Marathon Training 2024",
    description: "Training for my first full marathon in 2026, focusing on a well-rounded approach that combines endurance runs, cross-training, and smart recovery. My goal is to steadily build up mileage while balancing work, family, and personal commitments.",
    status: "In Progress",
    tags: ["Running", "Marathon", "Training"]
  },
  {
    title: "Half Marathon Training 2025",
    description: "Refining my half marathon performance with a targeted training plan that blends speed work, tempo runs, and steady mileage. This approach helps me push my limits while still balancing a busy schedule.",
    status: "In Progress",
    tags: ["Running", "Half Marathon", "Training"]
  },
  {
    title: "First Half Marathon",
    description: "Completed my first half marathon in 2025. This achievement marked a significant milestone in my running journey.",
    url: "https://medium.com/@jeremylorino/from-miles-to-milestones-training-for-my-kids-my-mind-and-a-half-marathon-7dd4352e517e",
    status: "Completed",
    tags: ["Running", "Half Marathon", "PR"]
  }
];

const technicalProjects = [
  {
    title: "Personal Website",
    description: "A Next.js-powered portfolio and blog site showcasing my professional work and sharing insights about software engineering and leadership.",
    url: "https://github.com/jeremylorino",
    status: "Active",
    tags: ["Next.js", "TypeScript", "Tailwind"]
  },
];

export default function Projects() {
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">My Projects</h1>
        
        <ProjectSection 
          title="Health & Fitness Projects"
          description="Tracking my journey in running and personal health achievements."
          projects={healthProjects}
        />
        
        <ProjectSection 
          title="Technical Projects"
          description="Software engineering projects focusing on automation, web development, and open source contributions."
          projects={technicalProjects}
        />
      </div>
    </div>
  );
} 