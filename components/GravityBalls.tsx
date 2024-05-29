import * as THREE from "three"
import { InstancedMesh, Matrix4 } from "three"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Outlines, Environment, useTexture } from "@react-three/drei"
import { Physics, usePlane, useSphere } from "@react-three/cannon"
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing"
import { Suspense, useEffect, useRef } from "react"
import Loader from "./Loader"
import { BufferGeometry, Material, NormalBufferAttributes } from "three"

const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const baubleMaterial = new THREE.MeshStandardMaterial({
  color: "#10B981",
  roughness: 1,
  envMapIntensity: 1,
})

export const GravityBalls = () => (
  <Canvas
    shadows
    gl={{ antialias: false }}
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }}
    style={{ background: "transparent" }} // Ensure canvas has transparent background
  >
    <Suspense fallback={<Loader />}>
      <ambientLight intensity={0.5} />

      <spotLight
        intensity={1}
        angle={0.2}
        penumbra={1}
        position={[30, 30, 30]}
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <Physics gravity={[1, 1, 0]} iterations={10}>
        <Pointer />
        <Borders />

        <Clump />
      </Physics>
      <Environment files="/adamsbridge.hdr" />
      <EffectComposer enableNormalPass multisampling={0}>
        <N8AO
          halfRes
          color="black"
          aoRadius={2}
          intensity={1}
          aoSamples={6}
          denoiseSamples={4}
        />
        <SMAA />
      </EffectComposer>
    </Suspense>
  </Canvas>
)

function Clump({
  centerPosition = [0, 0, 0],
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
  ...props
}) {
  const texture = useTexture("/cross.jpg")
  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: 0.2,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [
      centerPosition[0] + (Math.random() - 0.5) * 20,
      centerPosition[1] + (Math.random() - 0.5) * 20,
      centerPosition[2] + (Math.random() - 0.5) * 20,
    ],
  }))

  const scrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      scrollRef.current = scrollPosition
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useFrame((state) => {
    const { elapsedTime } = state.clock
    const scrollOffset = scrollRef.current * 0.01
    for (let i = 0; i < 40; i++) {
      // Get current whereabouts of the instanced sphere
      ;(
        ref.current as InstancedMesh<
          BufferGeometry,
          Material | Material[],
          THREE.InstancedMeshEventMap
        >
      )?.getMatrixAt(i, mat)
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
      api
        .at(i)
        .applyForce(
          vec
            .setFromMatrixPosition(mat)
            .normalize()
            .multiplyScalar(-5)
            .toArray(),
          [0, 0, 0],
        )
    }
  })

  return (
    <instancedMesh
      ref={
        ref as React.Ref<
          InstancedMesh<
            BufferGeometry<NormalBufferAttributes>,
            Material | Material[],
            THREE.InstancedMeshEventMap
          >
        >
      }
      castShadow
      receiveShadow
      args={[sphereGeometry, baubleMaterial, 40]}
      material-map={texture}
    ></instancedMesh>
  )
}

function Borders() {
  const { viewport } = useThree()
  return (
    <>
      <mesh
        position={[0, -viewport.height / 2 + 1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[viewport.width, 2]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh
        position={[-viewport.width / 2 - 1, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        position={[viewport.width / 2 + 1, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <mesh
        position={[0, viewport.height / 2 + 1, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh position={[0, 0, -1]} rotation={[0, 0, 0]} />
      <mesh position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
    </>
  )
}

// function Plane({
//   position = [0, 0, 0],
//   rotation = [],

//   ...props
// }: {
//   position: number[]
//   rotation?: number[]
//   props: any
// }) {
//   const [, api] = usePlane(() => props)
//   useEffect(
//     () => api.position.set(position[0], position[1], position[2]),
//     [api, position],
//   )
// }

function Pointer() {
  const viewport = useThree((state) => state.viewport)
  const [, api] = useSphere(() => ({
    type: "Kinematic",
    args: [3],
    position: [0, 0, 0],
  }))
  return useFrame((state) => {
    const { pointer } = state
    api.position.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0,
    )
  })
}
