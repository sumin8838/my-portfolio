// src/app/home/page.tsx

import { auth, currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'

// ===========================
// 최근 프로젝트 가져오기
// ===========================
async function getLatestRepo(username: string) {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=1`,
      {
        next: { revalidate: 60 },
        headers: { 'User-Agent': 'portfolio-app' },
      }
    )

    if (!res.ok) return null
    const data = await res.json()
    return data[0]
  } catch {
    return null
  }
}

export default async function DashboardPage() {
  const { isAuthenticated } = await auth()
  if (!isAuthenticated) {
    return (
      <div>Sign in to view this page. 이 페이지를 보려면 로그인하세요.</div>
    )
  }

  const user = await currentUser()

  // 가입 날짜 포맷
  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  const latestRepo = await getLatestRepo('sumin8838')

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-8">
      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(35px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .slide-up {
          animation-name: slideUp;
          animation-duration: 1800ms;
          animation-timing-function: cubic-bezier(.16,.84,.44,1);
          animation-fill-mode: both;
        }
      `}</style>

      {/* ============================
          사용자 정보 카드
      ============================ */}
      <section
        className="bg-white p-6 rounded-xl shadow-md flex items-center gap-6 slide-up"
        style={{ animationDelay: '0ms' }}
      >
        {user?.imageUrl && (
          <Image
            src={user.imageUrl}
            alt="User Avatar"
            width={80}
            height={80}
            className="rounded-full"
          />
        )}

        <div>
          <h1 className="text-2xl font-bold mb-2">
            안녕하세요, {user?.firstName}님
          </h1>
          <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
          <p className="text-sm text-gray-600 mt-1">가입일: {formattedDate}</p>
        </div>
      </section>

      {/* ============================
          최근 프로젝트 (자동 표시)
      ============================ */}
      <section
        className="bg-white p-6 rounded-xl shadow-md slide-up"
        style={{ animationDelay: '300ms' }}
      >
        <h2 className="text-lg font-semibold mb-4">최근 프로젝트</h2>

        {latestRepo ? (
          <a
            href={latestRepo.html_url}
            target="_blank"
            className="block p-4 rounded-lg hover:bg-gray-50 transition"
          >
            <p className="font-semibold text-lg">{latestRepo.name}</p>
            <p className="text-xs text-gray-500 mt-2">
              최근 업데이트:{' '}
              {new Date(latestRepo.updated_at).toLocaleDateString('ko-KR')}
            </p>
          </a>
        ) : (
          <p className="text-gray-500 text-sm">
            최근 프로젝트 정보를 불러올 수 없습니다.
          </p>
        )}
      </section>

      {/* ============================
          GitHub 활동 그래프
      ============================ */}
      <section
        className="bg-white p-6 rounded-xl shadow-md slide-up"
        style={{ animationDelay: '600ms' }}
      >
        <h2 className="text-lg font-semibold mb-4">GitHub 활동 그래프</h2>

        <div className="w-full flex justify-center">
          <img
            src="https://ghchart.rshah.org/sumin8838"
            alt="GitHub Contribution Graph"
            className="rounded-lg border w-full max-w-3xl"
          />
        </div>
      </section>
    </div>
  )
}
