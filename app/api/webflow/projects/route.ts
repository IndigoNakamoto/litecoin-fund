import { NextResponse } from 'next/server'
import { getAllPublishedProjects } from '@/services/webflow/projects'

export async function GET() {
  try {
    const projects = await getAllPublishedProjects()
    return NextResponse.json({ projects })
  } catch (error: any) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects', details: error.message },
      { status: 500 }
    )
  }
}

