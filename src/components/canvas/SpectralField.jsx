import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Three formations the same points morph between as you scroll:
 *   A (0.00) — unstructured noise shell .... "raw sensor data"
 *   B (0.50) — ordered spectral cube ....... "structured, analysis-ready"
 *   C (1.00) — a single response surface ... "one decision"
 *
 * That morph IS the resume: raw signal → structure → decision.
 */
function buildFormations(count) {
  const a = new Float32Array(count * 3)
  const b = new Float32Array(count * 3)
  const c = new Float32Array(count * 3)
  const seed = new Float32Array(count)
  const band = new Float32Array(count)

  // Cube edge length for formation B (nearest cube that fits `count`).
  const edge = Math.max(2, Math.round(Math.cbrt(count)))
  const SPAN = 5.2

  for (let i = 0; i < count; i++) {
    const i3 = i * 3

    // --- A: noise shell, biased outward, deliberately uneven ---
    const th = Math.random() * Math.PI * 2
    const ph = Math.acos(2 * Math.random() - 1)
    const r = 3.4 + Math.pow(Math.random(), 0.6) * 3.2
    a[i3 + 0] = Math.sin(ph) * Math.cos(th) * r
    a[i3 + 1] = Math.sin(ph) * Math.sin(th) * r * 0.72
    a[i3 + 2] = Math.cos(ph) * r

    // --- B: regular lattice, a spectral cube ---
    const x = i % edge
    const y = Math.floor(i / edge) % edge
    const z = Math.floor(i / (edge * edge)) % edge
    b[i3 + 0] = (x / (edge - 1) - 0.5) * SPAN
    b[i3 + 1] = (y / (edge - 1) - 0.5) * SPAN * 0.62
    b[i3 + 2] = (z / (edge - 1) - 0.5) * SPAN

    // --- C: a smooth response surface (the fitted model) ---
    const u = (x / (edge - 1) - 0.5) * 2
    const v = (z / (edge - 1) - 0.5) * 2
    const d = Math.sqrt(u * u + v * v)
    c[i3 + 0] = u * 4.6
    c[i3 + 1] = Math.exp(-d * d * 1.5) * 2.1 - 0.55 + Math.sin(u * 3.1) * 0.16
    c[i3 + 2] = v * 4.6

    seed[i] = Math.random()
    // Spectral band index drives the colour ramp: cyan → violet → amber.
    band[i] = y / (edge - 1)
  }

  return { a, b, c, seed, band }
}

const VERT = /* glsl */ `
  attribute vec3 aPosB;
  attribute vec3 aPosC;
  attribute float aSeed;
  attribute float aBand;

  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;

  varying float vBand;
  varying float vFade;

  void main() {
    // Two-stage morph with a per-point stagger so the field resolves in
    // waves instead of snapping as one rigid body.
    float stagger = aSeed * 0.28;
    float p = clamp((uProgress - stagger) / (1.0 - 0.28), 0.0, 1.0);

    vec3 pos;
    if (p < 0.5) {
      pos = mix(position, aPosB, smoothstep(0.0, 1.0, p * 2.0));
    } else {
      pos = mix(aPosB, aPosC, smoothstep(0.0, 1.0, (p - 0.5) * 2.0));
    }

    // Residual jitter: strong while the data is "raw", ~0 once it is fitted.
    float noiseAmp = (1.0 - smoothstep(0.0, 0.85, p)) * 0.34;
    pos.x += sin(uTime * 0.6 + aSeed * 34.0) * noiseAmp;
    pos.y += cos(uTime * 0.5 + aSeed * 21.0) * noiseAmp;
    pos.z += sin(uTime * 0.45 + aSeed * 12.0) * noiseAmp;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (1.0 / -mv.z) * (0.75 + aSeed * 0.5);

    vBand = aBand;
    // Brightest in the hero, where the field is the only visual, then it
    // recedes as text density rises. Motion serves the copy, not the reverse.
    vFade = mix(1.0, 0.5, smoothstep(0.05, 0.55, p));
  }
`

const FRAG = /* glsl */ `
  // No precision qualifier here on purpose: three.js prepends matching
  // qualifiers to both stages, and re-declaring it can desync varying
  // precision between vertex/fragment and fail to link on some GPUs.
  uniform vec3 uColorLow;
  uniform vec3 uColorMid;
  uniform vec3 uColorHigh;
  uniform float uOpacity;

  varying float vBand;
  varying float vFade;

  void main() {
    // Round, soft-edged point. Discarding the corners keeps overdraw cheap.
    vec2 uv = gl_PointCoord - 0.5;
    float d = dot(uv, uv);
    if (d > 0.25) discard;
    float alpha = smoothstep(0.25, 0.02, d);

    vec3 col = vBand < 0.5
      ? mix(uColorLow, uColorMid, vBand * 2.0)
      : mix(uColorMid, uColorHigh, (vBand - 0.5) * 2.0);

    float a = alpha * uOpacity * vFade;
    // Premultiplied output. The canvas is transparent and composited by the
    // browser as premultiplied, so emitting straight alpha here makes the
    // whole field vanish on dark backgrounds.
    gl_FragColor = vec4(col * a, a);
  }
`

export default function SpectralField({ scroll, count = 5832, theme = 'dark' }) {
  const points = useRef()
  const material = useRef()
  const group = useRef()
  const pointer = useRef({ x: 0, y: 0 })
  const eased = useRef(0)

  const { a, b, c, seed, band } = useMemo(() => buildFormations(count), [count])

  // Light mode needs its own ramp. On a white ground, additive neon reads as
  // screen dust; saturated dark inks read as a plotted scatter, which is the
  // intent. Opacity drops too so body copy always wins the contrast fight.
  const palette = useMemo(
    () => ({
      dark:  { low: '#22D3EE', mid: '#A78BFA', high: '#FBBF24', opacity: 0.9, size: 48 },
      light: { low: '#0E7490', mid: '#5B21B6', high: '#B45309', opacity: 0.4, size: 40 },
    }),
    []
  )

  const uniforms = useMemo(
    () => {
      const p = palette[theme === 'light' ? 'light' : 'dark']
      return {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uSize: { value: p.size },
        uPixelRatio: { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2) },
        uOpacity: { value: p.opacity },
        uColorLow: { value: new THREE.Color(p.low) },
        uColorMid: { value: new THREE.Color(p.mid) },
        uColorHigh: { value: new THREE.Color(p.high) },
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // Theme swap re-tints the same geometry — no rebuild, no reallocation.
  useEffect(() => {
    const m = material.current
    if (!m) return
    const p = palette[theme === 'light' ? 'light' : 'dark']
    m.uniforms.uOpacity.value = p.opacity
    m.uniforms.uSize.value = p.size
    m.uniforms.uColorLow.value.set(p.low)
    m.uniforms.uColorMid.value.set(p.mid)
    m.uniforms.uColorHigh.value.set(p.high)
  }, [theme, palette])

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05)
    const target = scroll.current

    // Critically-damped follow: the field trails the scrollbar by ~120ms,
    // which reads as inertia without ever feeling laggy.
    eased.current += (target - eased.current) * (1 - Math.exp(-6.5 * d))

    if (material.current) {
      material.current.uniforms.uProgress.value = eased.current
      material.current.uniforms.uTime.value = state.clock.elapsedTime
    }

    if (group.current) {
      const px = state.pointer.x
      const py = state.pointer.y
      pointer.current.x += (px - pointer.current.x) * (1 - Math.exp(-3.5 * d))
      pointer.current.y += (py - pointer.current.y) * (1 - Math.exp(-3.5 * d))

      group.current.rotation.y = eased.current * Math.PI * 0.85 + pointer.current.x * 0.16
      group.current.rotation.x = -0.12 + eased.current * 0.42 + pointer.current.y * -0.1
      group.current.position.y = eased.current * -0.8
    }
  })

  return (
    <group ref={group}>
      <points ref={points} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[a, 3]} />
          <bufferAttribute attach="attributes-aPosB" args={[b, 3]} />
          <bufferAttribute attach="attributes-aPosC" args={[c, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[seed, 1]} />
          <bufferAttribute attach="attributes-aBand" args={[band, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={VERT}
          fragmentShader={FRAG}
          transparent
          depthWrite={false}
          /* Colour channels add (glow on dark); alpha uses source-over so the
             canvas builds real coverage and composites over the page correctly.
             THREE.AdditiveBlending alone leaves dst alpha ~0 and the field
             disappears entirely on a transparent canvas. */
          blending={THREE.CustomBlending}
          blendEquation={THREE.AddEquation}
          blendSrc={THREE.OneFactor}
          blendDst={theme === 'dark' ? THREE.OneFactor : THREE.OneMinusSrcAlphaFactor}
          blendEquationAlpha={THREE.AddEquation}
          blendSrcAlpha={THREE.OneFactor}
          blendDstAlpha={THREE.OneMinusSrcAlphaFactor}
        />
      </points>
    </group>
  )
}
