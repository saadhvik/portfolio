import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Three formations for the same set of points:
 *   NOISE   — unstructured shell ......... "raw sensor data"
 *   CUBE    — ordered spectral lattice ... "structured, analysis-ready"  (rest state)
 *   SURFACE — one fitted response surface  "one decision"
 *
 * On mount the points assemble NOISE -> CUBE over 1.8s, so the story lands
 * before a recruiter scrolls at all. Scrolling then carries CUBE -> SURFACE.
 */
function buildFormations(count) {
  const noise = new Float32Array(count * 3)
  const cube = new Float32Array(count * 3)
  const surface = new Float32Array(count * 3)
  const seed = new Float32Array(count)
  const band = new Float32Array(count)

  const edge = Math.max(2, Math.round(Math.cbrt(count)))
  const SPAN = 4.8

  for (let i = 0; i < count; i++) {
    const i3 = i * 3

    // --- NOISE: a loose shell, deliberately uneven ---
    const th = Math.random() * Math.PI * 2
    const ph = Math.acos(2 * Math.random() - 1)
    const r = 4.0 + Math.pow(Math.random(), 0.6) * 4.0
    noise[i3 + 0] = Math.sin(ph) * Math.cos(th) * r
    noise[i3 + 1] = Math.sin(ph) * Math.sin(th) * r
    noise[i3 + 2] = Math.cos(ph) * r

    // --- CUBE: regular lattice, the hyperspectral data cube ---
    const x = i % edge
    const y = Math.floor(i / edge) % edge
    const z = Math.floor(i / (edge * edge)) % edge
    const nx = x / (edge - 1) - 0.5
    const ny = y / (edge - 1) - 0.5
    const nz = z / (edge - 1) - 0.5
    cube[i3 + 0] = nx * SPAN
    cube[i3 + 1] = ny * SPAN * 0.78
    cube[i3 + 2] = nz * SPAN

    // --- SURFACE: a smooth fitted response surface ---
    const u = nx * 2
    const v = nz * 2
    const d = Math.sqrt(u * u + v * v)
    surface[i3 + 0] = u * 4.2
    surface[i3 + 1] = Math.exp(-d * d * 1.6) * 2.0 - 0.5 + Math.sin(u * 3.1) * 0.14
    surface[i3 + 2] = v * 4.2

    seed[i] = Math.random()
    // Spectral band index drives the colour ramp: cyan -> violet -> amber.
    band[i] = y / (edge - 1)
    // Points on the outer shell of the lattice are drawn larger, which gives
    // the cube a readable silhouette instead of a uniform fog.
    const onShell =
      x === 0 || y === 0 || z === 0 || x === edge - 1 || y === edge - 1 || z === edge - 1
    seed[i] = onShell ? 0.62 + Math.random() * 0.38 : Math.random() * 0.42
  }

  return { noise, cube, surface, seed, band }
}

const VERT = /* glsl */ `
  attribute vec3 aCube;
  attribute vec3 aSurface;
  attribute float aSeed;
  attribute float aBand;

  uniform float uProgress;   // 0 -> 1 as the hero scrolls away
  uniform float uAssemble;   // 0 -> 1 entrance, noise -> cube
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;

  varying float vBand;
  varying float vShell;

  void main() {
    // Per-point stagger so the lattice resolves in waves, not as a rigid body.
    float stagger = fract(aSeed * 7.3) * 0.3;
    float a = clamp((uAssemble - stagger) / (1.0 - 0.3), 0.0, 1.0);
    a = 1.0 - pow(1.0 - a, 3.0);                 // easeOutCubic

    vec3 assembled = mix(position, aCube, a);
    float p = smoothstep(0.0, 1.0, uProgress);
    vec3 pos = mix(assembled, aSurface, p);

    // Residual jitter: strong while the data is still raw, ~0 once fitted.
    float amp = (1.0 - a) * 0.5 + 0.035;
    pos.x += sin(uTime * 0.7 + aSeed * 34.0) * amp;
    pos.y += cos(uTime * 0.6 + aSeed * 21.0) * amp;
    pos.z += sin(uTime * 0.5 + aSeed * 12.0) * amp;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.45 + aSeed * 0.85) * (1.0 / -mv.z);

    vBand = aBand;
    vShell = aSeed;
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
  varying float vShell;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = dot(uv, uv);
    if (d > 0.25) discard;
    float alpha = smoothstep(0.25, 0.02, d);

    vec3 col = vBand < 0.5
      ? mix(uColorLow, uColorMid, vBand * 2.0)
      : mix(uColorMid, uColorHigh, (vBand - 0.5) * 2.0);

    // Interior points sit back; shell points carry the silhouette.
    float weight = 0.35 + vShell * 0.65;
    float a = alpha * uOpacity * weight;

    // Premultiplied output. The canvas is transparent and composited by the
    // browser as premultiplied, so straight alpha here makes the field vanish.
    gl_FragColor = vec4(col * a, a);
  }
`

export default function SpectralField({ scroll, count = 4096, theme = 'dark' }) {
  const material = useRef()
  const group = useRef()
  const pointer = useRef({ x: 0, y: 0 })
  const eased = useRef(0)
  const assemble = useRef(0)
  const start = useRef(0)

  const { noise, cube, surface, seed, band } = useMemo(() => buildFormations(count), [count])

  const palette = useMemo(
    () => ({
      // Ink on paper. On the light ground the points are pigment, so they
      // darken the page (source-over); on the dark ground they are light and
      // add. Same object, two honest renderings.
      light: { low: '#0F6E77', mid: '#5B3A96', high: '#A9541B', opacity: 0.92, size: 44 },
      dark: { low: '#4FD1C5', mid: '#B79CF5', high: '#E9A23B', opacity: 0.95, size: 46 },
    }),
    []
  )

  const uniforms = useMemo(
    () => {
      const p = palette[theme === 'light' ? 'light' : 'dark']
      return {
        uProgress: { value: 0 },
        uAssemble: { value: 0 },
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

    // Entrance: noise -> cube over a wall-clock 1.8s. Driven by elapsed time,
    // not accumulated deltas — a delta-sum with a per-frame clamp stretches to
    // many seconds on a slow GPU, leaving the object stuck as noise.
    if (start.current === 0) start.current = state.clock.elapsedTime
    assemble.current = Math.min(1, (state.clock.elapsedTime - start.current) / 1.8)

    // Critically-damped follow: the morph trails the scrollbar by ~120ms,
    // which reads as inertia without ever feeling laggy.
    eased.current += (scroll.current - eased.current) * (1 - Math.exp(-6.5 * d))

    const m = material.current
    if (m) {
      m.uniforms.uProgress.value = eased.current
      m.uniforms.uAssemble.value = assemble.current
      m.uniforms.uTime.value = state.clock.elapsedTime
    }

    if (group.current) {
      pointer.current.x += (state.pointer.x - pointer.current.x) * (1 - Math.exp(-3.5 * d))
      pointer.current.y += (state.pointer.y - pointer.current.y) * (1 - Math.exp(-3.5 * d))

      // Continuous slow rotation so the object reads as solid even at rest.
      group.current.rotation.y = state.clock.elapsedTime * 0.14 + pointer.current.x * 0.3
      group.current.rotation.x = -0.18 + eased.current * 0.5 + pointer.current.y * -0.18
    }
  })

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[noise, 3]} />
          <bufferAttribute attach="attributes-aCube" args={[cube, 3]} />
          <bufferAttribute attach="attributes-aSurface" args={[surface, 3]} />
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
