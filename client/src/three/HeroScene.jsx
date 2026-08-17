import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Environment, Lightformer, Float } from '@react-three/drei'

/**
 * One lightweight 3D element: a distorted metallic blob in the palette's
 * warm gold, lit to throw bronze reflections. Low poly (64 segments),
 * no textures, DPR capped — cheap to render, expensive to look at.
 * Rotation eases toward the mouse; scroll adds slow parallax spin.
 */
function GoldBlob() {
  const mesh = useRef()
  const pointer = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const m = mesh.current
    if (!m) return
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04

    const scroll = typeof window !== 'undefined' ? window.scrollY * 0.0006 : 0
    m.rotation.y += delta * 0.12
    m.rotation.x = pointer.current.y * 0.35 + scroll
    m.rotation.z = pointer.current.x * 0.25
    m.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08
  })

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={mesh} scale={1.55}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color="#c9a961"
          metalness={0.92}
          roughness={0.18}
          distort={0.34}
          speed={1.6}
        />
      </mesh>
    </Float>
  )
}

export default function HeroScene() {
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const checkState = () => {
      const isModal = !!window.isProjectModalOpen
      const isScrolledPast = window.scrollY > window.innerHeight * 1.15
      setPaused(isModal || isScrolledPast)
    }

    checkState()
    window.addEventListener('modal-toggle', checkState)
    window.addEventListener('scroll', checkState, { passive: true })
    window.addEventListener('resize', checkState)

    return () => {
      window.removeEventListener('modal-toggle', checkState)
      window.removeEventListener('scroll', checkState)
      window.removeEventListener('resize', checkState)
    }
  }, [])

  return (
    <Canvas
      frameloop={paused ? 'never' : 'always'}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none', display: paused ? 'none' : 'block' }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 3, 5]} intensity={1.4} color="#e8cf9a" />
      <directionalLight position={[-5, -2, -4]} intensity={0.5} color="#7d6537" />
      <GoldBlob />
      {/* Local env map (no HDR download): two warm panels for metallic reflections */}
      <Environment resolution={64}>
        <Lightformer intensity={2.2} color="#e8cf9a" position={[3, 2, 4]} scale={[6, 3, 1]} />
        <Lightformer intensity={0.8} color="#d4af7a" position={[-4, -1, -2]} rotation-y={Math.PI} scale={[5, 2, 1]} />
        <Lightformer intensity={0.4} color="#f2ede4" position={[0, 4, 0]} rotation-x={-Math.PI / 2} scale={[4, 4, 1]} />
      </Environment>
    </Canvas>
  )
}
