// src/app/project/page.tsx

'use client'

import React, { useState, useEffect } from 'react'
import ProjectCard from './project'

interface Project {
  _id: string
  title: string
  description: string
  url: string
}

// ───────────────────────────────────────────
//   새 프로젝트 추가 컴포넌트
// ───────────────────────────────────────────
function AddProject({ onAdd }: { onAdd: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ title, description, url }),
    })

    setTitle('')
    setDescription('')
    setUrl('')

    onAdd() // DB에서 다시 불러오기
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: 400,
      }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="설명"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
      />
      <button type="submit">추가</button>
    </form>
  )
}

// ───────────────────────────────────────────
//   메인 페이지
// ───────────────────────────────────────────
export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])

  // DB에서 프로젝트 불러오기
  const loadProjects = async () => {
    const res = await fetch('/api/projects')
    const data = await res.json()
    setProjects(data)
  }

  useEffect(() => {
    loadProjects()
  }, [])

  // 수정
  const handleEditProject = async (_id: string) => {
    const text = prompt('새 제목을 입력하세요:')
    if (!text) return

    await fetch(`/api/projects/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title: text }),
    })

    loadProjects()
  }

  // 삭제
  const handleDeleteProject = async (_id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    await fetch(`/api/projects/${_id}`, { method: 'DELETE' })
    loadProjects()
  }

  return (
    <div className="flex flex-col space-y-12">
      {/* slide-up 애니메이션 */}
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

      {/* =========================
            새 프로젝트 추가
      ========================= */}
      <section className="slide-up" style={{ animationDelay: '0ms' }}>
        <h3 className="font-bold">새 프로젝트 추가</h3>
        <AddProject onAdd={loadProjects} />
      </section>

      {/* =========================
            프로젝트 목록
      ========================= */}
      <section className="slide-up" style={{ animationDelay: '300ms' }}>
        <h3 className="font-bold mb-4">예제 서비스</h3>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {projects.map((p) => (
            <ProjectCard
              key={p._id}
              project={p}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
