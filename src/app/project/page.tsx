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
    <>
      <section>
        <h3 className="font-bold">새 프로젝트 추가</h3>
        <AddProject onAdd={handleAddProject} />
      </section>

      <section>
        <h3 className="font-bold">예제 서비스</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
    </>
  )
}
