// src/app/api/projects/route.ts

import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'

export async function GET() {
  await dbConnect()
  const projects = await Project.find().sort({ createdAt: -1 })
  return NextResponse.json(projects)
}

export async function POST(request: NextRequest) {
  await dbConnect()
  const body = await request.json()

  try {
    const created = await Project.create(body)
    return NextResponse.json(created)
  } catch (e) {
    return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  }
}
