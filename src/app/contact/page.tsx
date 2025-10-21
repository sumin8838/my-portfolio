import Image from 'next/image'

export default function ProfileCard() {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '1.5rem',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '1rem',
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
              rel="noopener noreferrer"
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
  )
}
