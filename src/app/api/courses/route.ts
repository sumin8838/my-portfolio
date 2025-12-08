// src/app/api/courses/route.ts

import { NextResponse } from 'next/server'
import courses from './data.json'

export async function GET() {
  return NextResponse.json(courses)
}
