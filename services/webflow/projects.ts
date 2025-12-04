import { kv } from '@/lib/kv'
import { createWebflowClient, listCollectionItems } from './client'
import type { WebflowProject } from './types'
import type { Project, ProjectSummary } from '@/types/project'

const CACHE_TTL = 259200 // 3 days in seconds

export async function getAllPublishedProjects(): Promise<Project[]> {
  const apiToken = process.env.WEBFLOW_API_TOKEN
  const collectionId = process.env.WEBFLOW_COLLECTION_ID_PROJECTS

  if (!apiToken || !collectionId) {
    throw new Error('Webflow API credentials not configured')
  }

  const cacheKey = 'webflow:projects:published'
  let cached: Project[] | null = null
  
  // Try to get from cache, but don't fail if KV is not configured
  try {
    cached = await kv.get<Project[]>(cacheKey)
  } catch (error) {
    // KV not configured or unavailable, continue without cache
    console.warn('KV cache unavailable, fetching directly from Webflow')
  }

  if (cached) {
    return cached
  }

  const client = createWebflowClient(apiToken)
  const allProjects = await listCollectionItems<WebflowProject>(
    client,
    collectionId
  )

  // Filter to only published projects
  const publishedProjects = allProjects.filter(
    (project) => !project.isDraft && !project.isArchived
  )

  // Transform to our Project type
  const projects: Project[] = publishedProjects.map((project) => ({
    id: project.id,
    name: project.fieldData.name,
    slug: project.fieldData.slug,
    summary: project.fieldData.summary,
    content: project.fieldData.content,
    coverImage: project.fieldData['cover-image']?.url,
    status: project.fieldData.status,
    projectType: project.fieldData['project-type'],
    hidden: project.fieldData.hidden,
    recurring: project.fieldData.recurring,
    totalPaid: project.fieldData['total-paid'],
    serviceFeesCollected: project.fieldData['service-fees-collected'],
    website: project.fieldData['website-link'],
    github: project.fieldData['github-link'],
    twitter: project.fieldData['twitter-link'],
    discord: project.fieldData['discord-link'],
    telegram: project.fieldData['telegram-link'],
    reddit: project.fieldData['reddit-link'],
    facebook: project.fieldData['facebook-link'],
    lastPublished: project.lastPublished,
    lastUpdated: project.lastUpdated,
    createdOn: project.createdOn,
  }))

  // Cache the results (if KV is available)
  try {
    await kv.set(cacheKey, projects, { ex: CACHE_TTL })
  } catch (error) {
    // KV not configured or unavailable, continue without caching
    console.warn('KV cache unavailable, skipping cache write')
  }

  return projects
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getAllPublishedProjects()
  return projects.find((p) => p.slug === slug) || null
}

export async function getProjectSummaries(): Promise<ProjectSummary[]> {
  const projects = await getAllPublishedProjects()
  return projects.map((project) => ({
    id: project.id,
    name: project.name,
    slug: project.slug,
    summary: project.summary,
    coverImage: project.coverImage,
    status: project.status,
    projectType: project.projectType,
    totalPaid: project.totalPaid,
  }))
}

