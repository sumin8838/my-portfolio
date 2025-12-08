// src/app/contact/page.tsx

import Image from 'next/image'

// GitHub Repo 타입
interface GitHubRepo {
  id: number
  name: string
  html_url: string
}

// GitHub Repo 가져오기
async function getRepos(): Promise<GitHubRepo[]> {
  const res = await fetch('https://api.github.com/users/sumin8838/repos', {
    next: { revalidate: 60 },
  })
  return res.json()
}

// 팀원 데이터
const teamMembers = [
  {
    name: '김가연',
    github: 'https://github.com/bora120',
    portfolio:
      'https://portfoilo2-2.vercel.app/sign-in?redirect_url=https%3A%2F%2Fportfoilo2-2.vercel.app%2F',
  },
  {
    name: '조은수',
    github: 'https://github.com/myyonop',
    portfolio: 'https://web-s-portfolio.vercel.app/',
  },
  {
    name: '천서연',
    github: 'https://github.com/westkiteS2',
    portfolio: 'https://webserver-portfolio-final-2025-2.vercel.app/',
  },
  {
    name: '최수민',
    github: 'https://github.com/sumin8838',
    portfolio: 'https://my-portfolio-five-psi-32.vercel.app/',
  },
]

// 공통 카드 스타일
const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '1.5rem',
  borderRadius: '1rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
}

export default async function ContactPage() {
  const repos = await getRepos()

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

        @media (prefers-reduced-motion: reduce) {
          .slide-up {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* =====================================
          내 소개
      ===================================== */}
      <section
        className="slide-up"
        style={{
          animationDelay: '0ms',
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '1.5rem',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        }}
      >
        <Image
          src="/profile.png"
          alt="Profile"
          width={300}
          height={200}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '0.5rem',
            border: '1px solid rgba(0,0,0,0.1)',
          }}
        />

        <div>
          <h1 className="text-2xl font-bold mb-5">최수민</h1>
          <ul style={{ margin: 5, paddingLeft: '1.2rem', lineHeight: '1.6' }}>
            <li>중부대학교 정보보호학전공 재학</li>
            <li>수업 프로젝트 리스트</li>
            <li>Birth : 2005.07.30.</li>
            <li>
              GitHub:{' '}
              <a
                href="https://github.com/sumin8838"
                target="_blank"
                style={{ color: '#0070f3', textDecoration: 'underline' }}
              >
                github.com/sumin8838
              </a>
            </li>
            <li>Insta: ra.nupu</li>
            <li>Phone: 010-4521-8838</li>
          </ul>
        </div>
      </section>

      {/* =====================================
          팀원 소개
      ===================================== */}
      <section
        className="slide-up"
        style={{ ...cardStyle, animationDelay: '400ms' }}
      >
        <h2 className="text-xl font-semibold mb-6">팀원 소개</h2>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          }}
        >
          {teamMembers.map((m) => (
            <div
              key={m.name}
              className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm"
            >
              <h3 className="font-semibold mb-3">{m.name}</h3>

              <a
                href={m.github}
                target="_blank"
                className="block text-blue-600 hover:underline mb-2"
              >
                GitHub →
              </a>

              <a
                href={m.portfolio}
                target="_blank"
                className="block text-blue-600 hover:underline"
              >
                Portfolio →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================
          GitHub 리포지터리
      ===================================== */}
      <section
        className="slide-up"
        style={{ ...cardStyle, animationDelay: '800ms' }}
      >
        <h2 className="text-xl font-semibold mb-6">GitHub 프로젝트</h2>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          }}
        >
          {repos.map((repo: GitHubRepo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              className="
                block p-4 rounded-xl bg-white border border-gray-200 shadow-sm
                transition-all duration-200
                hover:underline hover:font-bold hover:scale-[1.02]
              "
            >
              <h3 className="text-base font-semibold">{repo.name}</h3>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
