import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'

export default async function DashboardPage() {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) {
    return (
      <div>Sign in to view this page. 이 페이지를 보려면 로그인하세요.</div>
    )
  }

  const user = await currentUser()
  console.log(user)

  return (
    <section
      color="#f7f4ee"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '1.5rem',
        alignItems: 'center',
      }}
    >
      <div>
        <h1 className="text-xl font-bold mb-5">
          최수민의 포트폴리오에 오신 걸 환영합니다.
        </h1>
        <div className="mb-5">
          <p>Welcome, {user?.firstName}</p>
          <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
          <p>사용자 등록일: {user?.createdAt}</p>
        </div>
      </div>
    </section>
  )
}
