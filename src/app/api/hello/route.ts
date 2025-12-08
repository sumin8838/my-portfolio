// src/app/api/hello/route.ts

import { NextResponse } from 'next/server'

export async function GET() {
  const data = {
    message: 'Hello, Next.js!',
  }
  return NextResponse.json(data)
}
