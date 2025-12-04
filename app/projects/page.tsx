import { getAllPublishedProjects } from '@/services/webflow/projects'
import Link from 'next/link'
import Image from 'next/image'

export default async function ProjectsPage() {
  const projects = await getAllPublishedProjects()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            {project.coverImage && (
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={project.coverImage}
                  alt={project.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-600 text-sm line-clamp-3">
              {project.summary}
            </p>
            {project.totalPaid > 0 && (
              <p className="mt-4 text-sm font-medium">
                Total Paid: ${project.totalPaid.toLocaleString()}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

