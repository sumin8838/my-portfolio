// src/app/api/projects/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = await request.json()

  await dbConnect()
  const updated = await Project.findByIdAndUpdate(id, body, { new: true })

  return NextResponse.json(updated)
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  await dbConnect()
  await Project.findByIdAndDelete(id)

  return NextResponse.json({ message: 'Deleted' })
}
