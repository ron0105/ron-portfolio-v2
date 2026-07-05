import { ImageResponse } from 'next/og'
import { getEpisode } from '@/lib/content'

export const alt = 'Learn With Ron — episode'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ep = getEpisode(slug)
  const question = ep?.meta.question ?? 'Learn With Ron'
  const num = ep ? `EP ${String(ep.meta.episode).padStart(3, '0')}` : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0D0D0D',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#FF4D00',
              color: '#0D0D0D',
              fontSize: 26,
              fontWeight: 700,
              padding: '10px 24px',
              borderRadius: 8,
            }}
          >
            {num}
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#888888', letterSpacing: 6 }}>
            LEARN WITH RON
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 700,
            color: '#F2F1EE',
            letterSpacing: -2,
            lineHeight: 1.1,
          }}
        >
          {question}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 24, color: '#555555', letterSpacing: 4 }}>
            BUILDWITHRON.COM
          </div>
          <div style={{ display: 'flex', width: 120, height: 8, backgroundColor: '#FF4D00' }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
