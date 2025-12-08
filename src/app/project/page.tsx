// src/app/project/page.tsx

'use client'
import React, { useState } from 'react'
import ProjectCard from './project'

interface Project {
  id: number
  title: string
  description: string
  url: string
}

function AddProject({ onAdd }: { onAdd: (p: Project) => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return
    const newProject: Project = {
      id: Date.now(),
      title,
      description,
      url,
    }
    onAdd(newProject)
    setTitle('')
    setDescription('')
    setUrl('')
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

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'clerk-app',
      description: 'clerk 실습에 대한 예제',
      url: 'https://clerk-app-murex.vercel.app/',
    },
    {
      id: 2,
      title: '예제 서비스 A',
      description: '강의 중 예제 A 설명',
      url: 'https://example-a.vercel.app',
    },
  ])

  const handleAddProject = (project: Project) => {
    setProjects((prev) => [project, ...prev])
  }

  const handleEditProject = (id: number) => {
    const text = prompt('새 제목을 입력하세요:')
    if (!text) return
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, title: text } : p))
    )
  }

  const handleDeleteProject = (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="flex flex-col space-y-12">
      {/* 통일된 slide-up 애니메이션 */}
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
        <AddProject onAdd={handleAddProject} />
      </section>

      {/* =========================
          예제 서비스
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
              key={p.id}
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
