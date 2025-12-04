import { getProjectBySlug } from '@/services/webflow/projects'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/projects"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Projects
      </Link>

      {project.coverImage && (
        <div className="relative w-full h-96 mb-8">
          <Image
            src={project.coverImage}
            alt={project.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
      <p className="text-xl text-gray-600 mb-8">{project.summary}</p>

      {project.content && (
        <div
          className="prose max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      )}

      <div className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="font-semibold">Status</dt>
            <dd className="text-gray-600">{project.status}</dd>
          </div>
          {project.projectType && (
            <div>
              <dt className="font-semibold">Project Type</dt>
              <dd className="text-gray-600">{project.projectType}</dd>
            </div>
          )}
          {project.totalPaid > 0 && (
            <div>
              <dt className="font-semibold">Total Paid</dt>
              <dd className="text-gray-600">
                ${project.totalPaid.toLocaleString()}
              </dd>
            </div>
          )}
        </dl>

        {(project.website ||
          project.github ||
          project.twitter ||
          project.discord) && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Links</h3>
            <div className="flex flex-wrap gap-4">
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Website
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  GitHub
                </a>
              )}
              {project.twitter && (
                <a
                  href={project.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Twitter
                </a>
              )}
              {project.discord && (
                <a
                  href={project.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Discord
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

