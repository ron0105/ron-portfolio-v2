import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Rohan Tiwarekar — Founder & Builder'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
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
        <div style={{ display: 'flex', width: 120, height: 8, backgroundColor: '#FF4D00' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 88, fontWeight: 700, color: '#F2F1EE', letterSpacing: -2 }}>
            Rohan Tiwarekar<span style={{ color: '#FF4D00' }}>.</span>
          </div>
          <div style={{ display: 'flex', fontSize: 32, color: '#888888', marginTop: 24 }}>
            Building a company and filming the journey
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#555555', letterSpacing: 4 }}>
          BUILDWITHRON.COM
        </div>
      </div>
    ),
    { ...size }
  )
}
