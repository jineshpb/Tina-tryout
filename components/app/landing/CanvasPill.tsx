"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, OrthographicCamera } from "@react-three/drei"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"
import * as THREE from "three"
import { group } from "console"
import { LayerMaterial, Depth, Fresnel, Noise } from "lamina"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef, Suspense } from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { FaSpinner } from "react-icons/fa"

type GLTFResult = GLTF & {
  nodes: {
    Sphere_2: THREE.Mesh
    Sphere: THREE.Mesh
    Rectangle: THREE.Mesh
    Cube_2: THREE.Mesh
  }
  materials: {}
}

export default function CanvasPill({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Suspense
        fallback={
          <FaSpinner className="size-8 animate-spin text-zinc-400 dark:text-zinc-600" />
        }
      >
        <Canvas className="size-full">
          <CameraWithBreakpoints />
          <OrbitControls enableZoom={false} enablePan={false} />
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <ConcreteShape />
        </Canvas>
      </Suspense>
    </div>
  )
}

function CameraWithBreakpoints() {
  const { width } = useThree((state) => state.size)
  console.log(width)

  const zoom = width < 180 ? 10 : 16

  return <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={zoom} />
}

function ConcreteShape(props: JSX.IntrinsicElements["group"]) {
  const gradient = 1
  const materialRef = useRef<any>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  // Track mouse position
  const mouse = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    if (!materialRef.current || !groupRef.current) return

    // Animate material
    const sin = Math.sin(state.clock.elapsedTime / 2)
    const cos = Math.cos(state.clock.elapsedTime / 2)

    // Safely update layers if they exist
    const layers = materialRef.current.layers
    if (layers[0]) {
      layers[0].origin.set(cos / 2, sin / 2, 0)
      layers[0].near = 0.2 + sin * 0.1
      layers[0].far = 0.8 + cos * 0.1
    }

    if (layers[1]) layers[1].origin.set(cos, sin, cos)
    if (layers[3]) layers[3].origin.set(cos, sin, cos)
    if (layers[4]) layers[4].origin.set(cos, sin, cos)

    // Smooth mouse tracking
    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      (state.mouse.x * viewport.width) / 50,
      0.1,
    )
    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      (state.mouse.y * viewport.height) / 50,
      0.1,
    )

    // Apply rotation
    groupRef.current.rotation.x = mouse.current.y
    groupRef.current.rotation.y = mouse.current.x
  })

  const { nodes } = useGLTF(
    "/models/3_d_concrete_shape_copy.gltf",
  ) as GLTFResult

  return (
    <group {...props} dispose={null}>
      <group ref={groupRef} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_2.geometry}
          position={[0, 0, 0]}
          rotation={[0.627, 0, Math.PI / 4]}
        >
          <LayerMaterial ref={materialRef}>
            <Depth
              colorA="#ff0080"
              colorB="black"
              alpha={1}
              mode="normal"
              near={0.2 * gradient}
              far={0.8}
              origin={[0, 0, 0]}
            />
            <Depth
              colorA="green"
              colorB="#047857"
              alpha={0.1}
              mode="add"
              near={2 * gradient}
              far={2.5}
              origin={[0, 1, 1]}
            />
            <Noise
              mapping="local"
              type="white"
              scale={100}
              colorA="white"
              colorB="black"
              mode="subtract"
              alpha={0.1}
            />
            <Depth
              colorA="green"
              colorB="#10b981"
              alpha={0.5}
              mode="add"
              near={3 * gradient}
              far={3.5}
              origin={[0, 1, -1]}
            />
            <Depth
              colorA="white"
              colorB="red"
              alpha={1}
              mode="overlay"
              near={1.5 * gradient}
              far={2.5}
              origin={[1, -1, -1]}
            />
            <Fresnel
              mode="add"
              color="white"
              intensity={0.3}
              power={1.5}
              bias={0.05}
            />
          </LayerMaterial>
        </mesh>
      </group>
    </group>
  )
}
