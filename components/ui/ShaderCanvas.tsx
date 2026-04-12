'use client'

import { useRef, useEffect } from 'react'

/* ─────────────────────────────────────────────
   Vertex shader — positions a fullscreen quad
───────────────────────────────────────────── */
const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

/* ─────────────────────────────────────────────
   Fragment shader — domain-warped FBM

   Three modes driven by u_focus (0 → 1):
   · Idle   (0): soft, organic, clearly visible flow
   · Focused (1): flow tightens — warp reduces, contrast
                  increases slightly (structure emerging)

   u_mouse: creates a visible pressure/push field
   around the cursor — radius is intentionally large.
───────────────────────────────────────────── */
const FRAG = `
precision mediump float;

uniform float u_t;
uniform vec2  u_res;
uniform vec2  u_mouse;
uniform float u_focus;

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 17.5);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i),             hash(i + vec2(1,0)), f.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(0.80, 0.60, -0.60, 0.80);
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p = m * p * 2.1 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv    = gl_FragCoord.xy / u_res;
  vec2 coord = uv * 2.2;
  float t    = u_t * 0.052;

  /* ── Cursor: large-radius pressure field ─────────────────
     Increasing the push radius (lower decay = 1.5 vs old 2.8)
     makes the cursor clearly "touch" the environment.        */
  vec2  toM = uv - u_mouse;
  float md  = length(toM);
  vec2  mf  = toM * 0.9 * exp(-md * 1.5);

  /* ── Domain warp — less on focus (flow tightens) ─────────
     idle: warp = 1.80 → chaotic, organic
     focus: warp = 0.75 → structured, intentional           */
  float warp = mix(1.80, 0.75, u_focus);

  vec2 q = vec2(
    fbm(coord + t        + mf * 0.65),
    fbm(coord + vec2(5.2, 1.3) + t * 0.78)
  );
  float f = fbm(coord + warp * q + mf + t * 0.28);

  /* ── Warm / cool variation ───────────────────────────── */
  float w = fbm(coord * 0.48 + vec2(40.0, 80.0) + t * 0.013) - 0.5;

  /* ── Colour ───────────────────────────────────────────────
     contrast factor: idle 0.21, focus 0.27
     clamp floor 0.73 → range is ~27% (clearly visible flow) */
  float s = f * mix(0.21, 0.27, u_focus);

  vec3 col = vec3(
    0.970 - s * 0.70 + w * 0.018,
    0.966 - s * 0.76 + w * 0.010,
    0.954 - s * 0.92 - w * 0.014
  );

  gl_FragColor = vec4(clamp(col, 0.73, 1.0), 1.0);
}
`

/* ─────────────────────────────────────────────
   ShaderCanvas
   Accepts an optional focusRef — a plain object
   ref whose .current is lerped toward each frame.
   Zero React re-renders, zero event overhead.
───────────────────────────────────────────── */
export default function ShaderCanvas({
  className = '',
  focusRef,
}: {
  className?: string
  focusRef?: { current: number }
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const mkShader = (src: string, type: number) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, mkShader(VERT, gl.VERTEX_SHADER))
    gl.attachShader(prog, mkShader(FRAG, gl.FRAGMENT_SHADER))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uT     = gl.getUniformLocation(prog, 'u_t')
    const uRes   = gl.getUniformLocation(prog, 'u_res')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uFocus = gl.getUniformLocation(prog, 'u_focus')

    /* Mouse springs toward target in render loop */
    let mx = 0.5, my = 0.5
    let tx = 0.5, ty = 0.5

    /* Focus lerped smoothly — 0.055 ≈ 0.8s settle */
    let focusCurrent = 0

    const onMouse = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth
      ty = 1.0 - e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const resize = () => {
      const MAX = 1024
      const w = Math.min(canvas.offsetWidth, MAX)
      const h = Math.min(canvas.offsetHeight, MAX)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width  = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let visible = true
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(canvas)

    let raf = 0
    const t0 = performance.now()

    const render = () => {
      raf = requestAnimationFrame(render)
      if (!visible) return

      mx += (tx - mx) * 0.07
      my += (ty - my) * 0.07

      const focusTarget = focusRef?.current ?? 0
      focusCurrent += (focusTarget - focusCurrent) * 0.055

      gl.uniform1f(uT,     (performance.now() - t0) / 1000)
      gl.uniform2f(uRes,   canvas.width, canvas.height)
      gl.uniform2f(uMouse, mx, my)
      gl.uniform1f(uFocus, focusCurrent)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      ro.disconnect()
      io.disconnect()
    }
  }, [focusRef])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}
