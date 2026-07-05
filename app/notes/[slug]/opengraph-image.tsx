import { ImageResponse } from 'next/og'
import { getNote } from '@/lib/content'

export const alt = 'Note — Rohan Tiwarekar'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getNote(slug)
  const title = note?.meta.title ?? 'Notes'
  const date = note?.meta.date ?? ''

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
        <div style={{ display: 'flex', fontSize: 24, color: '#888888', letterSpacing: 6 }}>
          NOTES · {date.toUpperCase()}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 76,
            fontWeight: 700,
            color: '#F2F1EE',
            letterSpacing: -2,
            lineHeight: 1.1,
          }}
        >
          {title}
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
