export interface Project {
  id: string
  name: string
  slug: string
  summary: string
  content?: string
  coverImage?: string
  status: string
  projectType?: string
  hidden: boolean
  recurring: boolean
  totalPaid: number
  serviceFeesCollected: number
  website?: string
  github?: string
  twitter?: string
  discord?: string
  telegram?: string
  reddit?: string
  facebook?: string
  lastPublished: string
  lastUpdated: string
  createdOn: string
}

export interface ProjectSummary {
  id: string
  name: string
  slug: string
  summary: string
  coverImage?: string
  status: string
  projectType?: string
  totalPaid: number
}

