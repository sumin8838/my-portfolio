// src/app/page.tsx

'use client'

import Link from 'next/link'
import React from 'react'
import { useUser } from '@clerk/nextjs'

export default function HomePage() {
  const { user } = useUser()

  return (
    <>
      <h1 className="text-2xl mb-4 font-bold">최수민의 포트폴리오</h1>

      <div className="mb-4 bg-gray-100 p-4 m-4 rounded-lg">
        <Link
          href="https://github.com/sumin8838"
          className="text-xl text-yellow-900 font-bold"
          target="blank_"
        >
          github
        </Link>
        <p className="mb-2">최수민의 github 페이지로 이동합니다.</p>
      </div>

      <div className="mb-4 bg-gray-100 p-4 m-4 rounded-lg">
        {user ? (
          <p className="mb-2">포트폴리오에 오신 걸 환영합니다.</p>
        ) : (
          <p className="mb-2">포트폴리오를 확인하려면 로그인하세요.</p>
        )}
      </div>
    </>
  )
}
